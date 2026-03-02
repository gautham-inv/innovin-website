/**
 * Cloudflare Pages Function — replaces app/api/applications/route.ts
 *
 * Set these in Cloudflare Pages Dashboard → Settings → Environment Variables:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   SLACK_WEBHOOK_URL_APPLICATIONS
 *   ADMIN_DASHBOARD_URL
 */

export async function onRequestPost(context) {
    const { request, env } = context;

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

        if (!name || !email || !whatsapp || !specialization || !cgpa || !college || !yearOfGrad || !backlogs || !resumeUrl) {
            return jsonResponse({ error: "Missing required fields" }, 400);
        }

        const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
            console.error("Supabase env vars missing");
            return jsonResponse({ error: "Server configuration error" }, 500);
        }

        const response = await fetch(`${supabaseUrl}/functions/v1/submit-application`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${supabaseAnonKey}`,
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
            console.error("Edge Function error:", errorText, "status:", response.status);

            let errorMessage = "Failed to save application";
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.error || errorMessage;
            } catch {
                errorMessage = errorText || errorMessage;
            }

            return jsonResponse({ error: errorMessage, details: errorText }, response.status || 500);
        }

        const data = await response.json();

        // Slack notification
        const slackWebhookUrl = env.SLACK_WEBHOOK_URL_APPLICATIONS;
        if (slackWebhookUrl && data?.data?.id) {
            const adminBaseUrl = env.ADMIN_DASHBOARD_URL || "http://localhost:3001";
            const applicationUrl = `${adminBaseUrl}/applications/${data.data.id}`;
            const jobTitleText = (jobTitle || "General").toString();
            await notifySlack(
                slackWebhookUrl,
                `New application received: ${name} — ${jobTitleText}\n<${applicationUrl}|View in Admin Dashboard>`
            );
        }

        return jsonResponse({ success: true, data }, 201);
    } catch (error) {
        console.error("Error processing application:", error);
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
