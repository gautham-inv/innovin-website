/**
 * Cloudflare Pages Function — proxies resume uploads to the Supabase Edge Function,
 * which handles the actual storage upload via the Supabase SDK.
 *
 * Set these in Cloudflare Pages Dashboard → Settings → Environment Variables:
 *   NEXT_PUBLIC_SUPABASE_URL        (e.g. https://xxxx.supabase.co)
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY   (from Supabase Project Settings → API → anon/public)
 */

export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders(),
    });
}

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const contentType = request.headers.get("Content-Type") || "";

        let fileName, fileType, fileData;

        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            const file = formData.get("file");

            if (!file || typeof file === "string") {
                return jsonResponse({ error: "No file provided in form data" }, 400);
            }

            fileName = file.name;
            fileType = file.type || "application/pdf";

            const buffer = await file.arrayBuffer();
            const bytes = new Uint8Array(buffer);
            const chunks = [];
            const chunkSize = 8192;
            for (let i = 0; i < bytes.length; i += chunkSize) {
                chunks.push(String.fromCharCode(...bytes.subarray(i, i + chunkSize)));
            }
            fileData = btoa(chunks.join(""));
        } else {
            const body = await request.json();
            fileName = body.fileName;
            fileType = body.fileType || "application/pdf";
            fileData = body.fileData;

            if (!fileData) {
                return jsonResponse({ error: "No file data provided in JSON" }, 400);
            }
        }

        if (!fileName) {
            return jsonResponse({ error: "Missing fileName" }, 400);
        }

        const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error("Missing env vars:", { hasUrl: !!supabaseUrl, hasKey: !!supabaseAnonKey });
            return jsonResponse({ error: "Server configuration error" }, 500);
        }

        const edgeFnUrl = `${supabaseUrl}/functions/v1/upload-resume`;

        const edgeResponse = await fetch(edgeFnUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${supabaseAnonKey}`,
            },
            body: JSON.stringify({ fileName, fileType, fileData }),
        });

        if (!edgeResponse.ok) {
            const errorText = await edgeResponse.text();
            console.error("Supabase Edge Function error:", edgeResponse.status, errorText);

            let parsed;
            try { parsed = JSON.parse(errorText); } catch { parsed = { error: errorText }; }

            return jsonResponse({
                error: parsed.error || "Upload failed via Edge Function",
                details: parsed.details || errorText,
            }, edgeResponse.status);
        }

        const data = await edgeResponse.json();

        // Map edge function response to what the frontend expects
        return jsonResponse({
            success: true,
            publicUrl: data.resumeUrl,
            filePath: data.filePath,
        });

    } catch (error) {
        console.error("Critical upload-resume error:", error);
        return jsonResponse({ error: "Internal server error", details: error.message }, 500);
    }
}

function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };
}

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
            ...corsHeaders(),
        },
    });
}
