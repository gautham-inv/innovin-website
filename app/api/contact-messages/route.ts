import { NextRequest, NextResponse } from "next/server";
import { notifySlack } from "@/lib/slack";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Call Supabase Edge Function
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
      console.error("Supabase URL missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Call Edge Function to handle database operations
    // Edge Functions require Authorization header
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseAnonKey) {
      console.error("Supabase anon key missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/submit-contact-message`;

    const response = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Edge Function error:", errorText);
      console.error("Edge Function status:", response.status);

      // Handle 404 - Edge Function not deployed
      if (response.status === 404) {
        return NextResponse.json(
          {
            error: "Contact form service is not available. Please contact support directly.",
            details: "Edge Function not found. It may need to be deployed.",
          },
          { status: 503 }
        );
      }

      // Try to parse error as JSON, fallback to text
      let errorMessage = "Failed to save message";
      let errorDetails: string | null = null;

      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorMessage;

        // Extract details - handle both string and object cases
        if (errorJson.details) {
          if (typeof errorJson.details === 'string') {
            errorDetails = errorJson.details;
          } else if (typeof errorJson.details === 'object' && errorJson.details.message) {
            errorDetails = errorJson.details.message;
          } else {
            errorDetails = JSON.stringify(errorJson.details);
          }
        } else if (errorJson.message) {
          errorDetails = errorJson.message;
        } else if (errorJson.code) {
          errorDetails = `Error code: ${errorJson.code}${errorJson.hint ? ` - ${errorJson.hint}` : ''}`;
        }
      } catch (parseError) {
        errorMessage = errorText.includes("Failed to save message")
          ? "Failed to save message. Please check server logs."
          : errorText || errorMessage;
        errorDetails = errorText;
      }

      return NextResponse.json(
        {
          error: errorMessage,
          details: errorDetails,
        },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();

    // Slack notification to contact messages channel (only minimal info)
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL_CONTACT;
    if (slackWebhookUrl && data?.data?.id) {
      const adminBaseUrl = process.env.ADMIN_DASHBOARD_URL || "http://localhost:3001";
      const messageUrl = `${adminBaseUrl}/messages/${data.data.id}`;

      await notifySlack(
        slackWebhookUrl,
        `New contact message: ${name} — Contact\n<${messageUrl}|View in Admin Dashboard>`
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

