/**
 * Cloudflare Pages Function — accepts the resume file and uploads it
 * directly to Supabase Storage.
 *
 * Set these in Cloudflare Pages Dashboard → Settings → Environment Variables:
 *   NEXT_PUBLIC_SUPABASE_URL      (e.g. https://xxxx.supabase.co)
 *   SUPABASE_SERVICE_ROLE_KEY     (from Supabase Project Settings → API → service_role)
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

        let fileName, fileType, fileBuffer;

        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            const file = formData.get("file");

            if (!file || typeof file === "string") {
                return jsonResponse({ error: "No file provided in form data" }, 400);
            }

            fileName = file.name;
            fileType = file.type || "application/pdf";
            fileBuffer = await file.arrayBuffer();
        } else {
            const body = await request.json();
            fileName = body.fileName;
            fileType = body.fileType || "application/pdf";

            if (body.fileData) {
                const binaryString = atob(body.fileData);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                fileBuffer = bytes.buffer;
            } else {
                return jsonResponse({ error: "No file data provided in JSON" }, 400);
            }
        }

        if (!fileName) {
            return jsonResponse({ error: "Missing fileName" }, 400);
        }

        const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
            console.error("Missing env vars: URL or Service Role Key");
            return jsonResponse({ error: "Server configuration error: SUPABASE_SERVICE_ROLE_KEY might be missing in Cloudflare" }, 500);
        }

        // Generate unique file path
        // We put it in the root of the 'resumes' bucket to avoid complex nested path issues
        const timestamp = Date.now();
        const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const storagePath = `${timestamp}-${sanitizedFileName}`;

        // Upload file directly to Supabase Storage via REST API
        // PUT works for both new and existing files when upsert is used
        // URL format: /storage/v1/object/<bucket>/<path>
        const uploadUrl = `${supabaseUrl}/storage/v1/object/resumes/${storagePath}`;

        const uploadResponse = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${supabaseKey}`,
                'apikey': supabaseKey,
                'Content-Type': fileType,
                'x-upsert': 'true',
            },
            body: fileBuffer,
        });

        if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            console.error("Supabase Storage Error:", uploadResponse.status, errorText);
            return jsonResponse({
                error: "Supabase storage upload failed",
                status: uploadResponse.status,
                details: errorText,
            }, uploadResponse.status);
        }

        // Construct the public URL correctly
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/resumes/${storagePath}`;

        return jsonResponse({
            success: true,
            publicUrl,
            filePath: storagePath // This is what goes to the database
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
