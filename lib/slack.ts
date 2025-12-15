type SlackWebhookPayload = {
  text: string;
};

export async function notifySlack(text: string) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const payload: SlackWebhookPayload = { text };
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("Slack webhook failed:", { status: res.status, body });
    }
  } catch (err) {
    // Don't break user flows for Slack failures
    console.error("Slack webhook error:", err);
  } finally {
    clearTimeout(timeout);
  }
}


