/**
 * Cloudflare Pages middleware — runs before every /api/* function.
 * Handles CORS preflight and rate limiting only.
 *
 * Turnstile verification is handled inline inside each individual function
 * (contact-messages.js, applications.js) — following the article approach.
 */

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

function getRateLimitKey(request) {
    return request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "unknown";
}

function isRateLimited(key) {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.set(key, { windowStart: now, count: 1 });
        return false;
    }

    entry.count++;
    return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function cleanupRateLimitMap() {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap) {
        if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
            rateLimitMap.delete(key);
        }
    }
}

function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };
}

export async function onRequest(context) {
    const { request, next } = context;

    // Handle CORS preflight for all /api/* routes
    if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders() });
    }

    // Rate limit all POST requests
    if (request.method === "POST") {
        const ip = getRateLimitKey(request);
        if (isRateLimited(ip)) {
            if (Math.random() < 0.05) cleanupRateLimitMap();
            return new Response(
                JSON.stringify({ error: "Too many requests. Please try again later." }),
                { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders() } }
            );
        }
    }

    return next();
}
