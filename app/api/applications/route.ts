import { NextRequest, NextResponse } from "next/server";
import { notifySlack } from "@/lib/slack";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      jobId,
      jobTitle,
      name,
      email,
      whatsapp,
      specialization,
      cgpa,
      college,
      yearOfGrad,
      backlogs,
      resumeUrl,
    } = body;

    // Validate required fields
    if (!name || !email || !whatsapp || !specialization || !cgpa || !college || !yearOfGrad || !backlogs || !resumeUrl) {
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

    const response = await fetch(`${supabaseUrl}/functions/v1/submit-application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        job_id: jobId || null,
        job_title: jobTitle || null,
        name,
        email,
        whatsapp,
        specialization,
        cgpa: parseFloat(cgpa),
        college,
        year_of_grad: yearOfGrad,
        backlogs,
        resume_url: resumeUrl,
        is_read: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Edge Function error response:", errorText);
      console.error("Edge Function status:", response.status);
      
      // Try to parse error as JSON, fallback to text
      let errorMessage = "Failed to save application";
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      return NextResponse.json(
        { error: errorMessage, details: errorText },
        { status: response.status || 500 }
      );
    }

    const data = await response.json();

    // Slack notification (only minimal info)
    await notifySlack(
      `New application received: ${name} — ${(jobTitle || "General").toString()}`
    );

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

