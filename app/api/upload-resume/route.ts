import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileName, fileType, fileData } = body;

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: "Missing fileName or fileType" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (!supabaseUrl) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Call Edge Function for resume upload (service role key is in Edge Function)
    // Edge Functions require Authorization header with anon key or service role key
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseAnonKey) {
      console.error("Supabase anon key missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/upload-resume`;
    
    const response = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        fileName,
        fileType,
        fileData,
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
            error: "Upload service is not available. Please contact support.",
            details: "Edge Function not found. It may need to be deployed.",
          },
          { status: 503 }
        );
      }
      
      // Try to parse error as JSON
      let errorMessage = "Failed to get upload URL";
      let errorDetails: any = null;
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error || errorMessage;
        errorDetails = {
          message: errorJson.details || errorJson.message,
          code: errorJson.code,
        };
      } catch {
        errorMessage = errorText || errorMessage;
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
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling upload-resume Edge Function:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

