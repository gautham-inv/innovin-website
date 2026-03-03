/**
 * Cloudflare Pages Function — handles contact form submissions.
 * Verifies Turnstile token inline, then forwards to Supabase Edge Function.
 *
 * Env vars (Cloudflare Pages → Settings → Environment Variables):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   TURNSTILE_SECRET_KEY
 *   SLACK_WEBHOOK_URL_CONTACT
 *   ADMIN_DASHBOARD_URL
 */

async function verifyTurnstile(token, secretKey) {
    const response = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            body: new URLSearchParams({
                secret: secretKey,
                response: token,
            }),
        }
    );
    return response.json();
}

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const body = await request.json();
        const { name, email, message, turnstileToken } = body;

        // 1. Verify Turnstile token
        if (!turnstileToken) {
            return jsonResponse({ error: "CAPTCHA verification required" }, 400);
        }

        // Skip Turnstile in dev (no secret key configured)
        const turnstileSecret = env.TURNSTILE_SECRET_KEY;
        if (turnstileSecret) {
            const verification = await verifyTurnstile(turnstileToken, turnstileSecret);
            if (!verification.success) {
                console.error("Turnstile failed:", verification["error-codes"]);
                return jsonResponse({ error: "CAPTCHA verification failed. Please try again." }, 403);
            }
        } else {
            console.warn("TURNSTILE_SECRET_KEY not set — skipping verification (dev mode)");
        }

        // 2. Validate fields
        if (!name || !email || !message) {
            return jsonResponse({ error: "Missing required fields" }, 400);
        }

        const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error("Supabase env vars missing");
            return jsonResponse({ error: "Server configuration error" }, 500);
        }

        // 3. Forward to Supabase
        const response = await fetch(`${supabaseUrl}/functions/v1/submit-contact-message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${supabaseAnonKey}`,
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Supabase Edge Function error:", errorText);

            if (response.status === 404) {
                return jsonResponse({ error: "Contact form service unavailable. Please contact us directly." }, 503);
            }

            let errorMessage = "Failed to save message";
            try {
                errorMessage = JSON.parse(errorText).error || errorMessage;
            } catch {
                errorMessage = errorText || errorMessage;
            }

            return jsonResponse({ error: errorMessage }, response.status || 500);
        }

        const data = await response.json();

        // 4. Slack notification
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
