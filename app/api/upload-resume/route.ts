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
    console.log("Calling Edge Function:", edgeFunctionUrl);
    console.log("Request payload:", { fileName, fileType, hasFileData: !!fileData });
    
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

    console.log("Edge Function response status:", response.status);
    console.log("Edge Function response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Edge Function error response (raw):", errorText);
      console.error("Edge Function status:", response.status);
      console.error("Edge Function URL called:", edgeFunctionUrl);
      
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
        console.error("Parsed error JSON:", JSON.stringify(errorJson, null, 2));
        errorMessage = errorJson.error || errorMessage;
        errorDetails = {
          message: errorJson.details || errorJson.message,
          code: errorJson.code,
        };
      } catch (parseError) {
        console.error("Failed to parse error as JSON:", parseError);
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

