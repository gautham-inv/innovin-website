/**
 * Cloudflare Pages Function — replaces app/api/contact-messages/route.ts
 *
 * Set these in Cloudflare Pages Dashboard → Settings → Environment Variables:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   SLACK_WEBHOOK_URL_CONTACT
 *   ADMIN_DASHBOARD_URL
 */

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return jsonResponse({ error: "Missing required fields" }, 400);
        }

        const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error("Supabase env vars missing");
            return jsonResponse({ error: "Server configuration error" }, 500);
        }

        const edgeFunctionUrl = `${supabaseUrl}/functions/v1/submit-contact-message`;

        const response = await fetch(edgeFunctionUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${supabaseAnonKey}`,
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Edge Function error:", errorText, "status:", response.status);

            if (response.status === 404) {
                return jsonResponse({ error: "Contact form service unavailable. Please contact us directly." }, 503);
            }

            let errorMessage = "Failed to save message";
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.error || errorMessage;
            } catch {
                errorMessage = errorText || errorMessage;
            }

            return jsonResponse({ error: errorMessage }, response.status || 500);
        }

        const data = await response.json();

        // Slack notification
        const slackWebhookUrl = env.SLACK_WEBHOOK_URL_CONTACT;
        if (slackWebhookUrl && data?.data?.id) {
            const adminBaseUrl = env.ADMIN_DASHBOARD_URL || "http://localhost:3001";
            const messageUrl = `${adminBaseUrl}/messages/${data.data.id}`;
            await notifySlack(
                slackWebhookUrl,
                `New contact message: ${name} — Contact\n<${messageUrl}|View in Admin Dashboard>`
            );
        }

        return jsonResponse({ success: true, data }, 201);
    } catch (error) {
        console.error("Error processing contact message:", error);
        return jsonResponse({ error: "Internal server error" }, 500);
    }
}

async function notifySlack(webhookUrl, text) {
    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
    } catch (err) {
        console.error("Slack notification failed:", err);
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
