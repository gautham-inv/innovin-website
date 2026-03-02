/**
 * Cloudflare Pages Function — replaces app/api/upload-resume/route.ts
 *
 * Set these in Cloudflare Pages Dashboard → Settings → Environment Variables:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const body = await request.json();
        const { fileName, fileType, fileData } = body;

        if (!fileName || !fileType) {
            return jsonResponse({ error: "Missing fileName or fileType" }, 400);
        }

        const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error("Supabase env vars missing");
            return jsonResponse({ error: "Server configuration error" }, 500);
        }

        const edgeFunctionUrl = `${supabaseUrl}/functions/v1/upload-resume`;

        const response = await fetch(edgeFunctionUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${supabaseAnonKey}`,
            },
            body: JSON.stringify({ fileName, fileType, fileData }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Edge Function error:", errorText, "status:", response.status);

            if (response.status === 404) {
                return jsonResponse({ error: "Upload service unavailable. Please contact support." }, 503);
            }

            let errorMessage = "Failed to get upload URL";
            let errorDetails = null;
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.error || errorMessage;
                errorDetails = { message: errorJson.details || errorJson.message, code: errorJson.code };
            } catch {
                errorMessage = errorText || errorMessage;
                errorDetails = errorText;
            }

            return jsonResponse({ error: errorMessage, details: errorDetails }, response.status || 500);
        }

        const data = await response.json();
        return jsonResponse(data);
    } catch (error) {
        console.error("Error calling upload-resume Edge Function:", error);
        return jsonResponse({ error: "Internal server error" }, 500);
    }
}

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
}
