import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, eventCategory, eventValue, pageUrl, userAgent } = body;

    // Validate required fields
    if (!eventName) {
      return NextResponse.json(
        { error: "eventName is required" },
        { status: 400 }
      );
    }

    // Call Supabase Edge Function
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
      console.error("Supabase URL missing");
      // Return success to not break user experience
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Call Edge Function to handle database operations
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseAnonKey) {
      console.error("Supabase anon key missing");
      // Return success to not break user experience
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/track-analytics`;
    
    const response = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        eventName,
        eventCategory,
        eventValue,
        pageUrl,
        userAgent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Edge Function error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        url: edgeFunctionUrl,
      });
      
      // Log specific error cases
      if (response.status === 404) {
        console.error("❌ Edge Function 'track-analytics' not found. Please deploy it to Supabase.");
      } else if (response.status === 500) {
        console.error("❌ Edge Function error:", errorText);
      }
      
      // Return success even on error to not break user experience
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const data = await response.json();

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error tracking analytics event:", error);
    // Return success even on error to not break user experience
    return NextResponse.json({ success: true }, { status: 200 });
  }
}

