import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Webhook API route for on-demand revalidation
 * 
 * Flow:
 * 1. Sanity CMS publishes/updates a job
 * 2. Sanity webhook fires → POST to /api/revalidate
 * 3. This route calls revalidatePath() for affected pages
 * 4. Next.js regenerates static HTML for those pages
 * 5. New static pages replace old ones on CDN
 * 
 * Configure in Sanity:
 * - Webhook URL: https://your-site.vercel.app/api/revalidate
 * - Trigger: document.publish, document.unpublish
 * - Filter: _type == "job"
 */

export async function POST(request: NextRequest) {
    try {
        // Verify webhook secret (optional but recommended)
        const secret = request.headers.get('x-sanity-webhook-secret')
        const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

        if (expectedSecret && secret !== expectedSecret) {
            return NextResponse.json(
                { message: 'Invalid secret' },
                { status: 401 }
            )
        }

        // Parse webhook payload
        const body = await request.json()

        // Log webhook payload for debugging
        console.log('Webhook received:', JSON.stringify(body, null, 2))

        // Sanity webhook payload structure:
        // {
        //   _type: "job",
        //   _id: "...",
        //   slug: { current: "sde" },
        //   ...
        // }

        const documentType = body._type
        const slug = body.slug?.current || body.slug

        // Handle both slug formats: { current: "slug" } or just "slug"
        const jobSlug = typeof slug === 'string' ? slug : slug?.current

        // Only revalidate job-related pages
        if (documentType === 'job' && jobSlug) {
            // Revalidate the specific career detail page
            revalidatePath(`/careers/${jobSlug}`)

            // Also revalidate the careers listing page
            revalidatePath('/careers')

            console.log(`✅ Revalidated: /careers/${jobSlug} and /careers`)

            return NextResponse.json({
                revalidated: true,
                paths: [`/careers/${jobSlug}`, '/careers'],
                message: `Successfully revalidated career pages for ${jobSlug}`,
            })
        }

        // Log if slug is missing
        if (documentType === 'job' && !jobSlug) {
            console.warn('Job document received but slug is missing:', body)
        }

        // If document type doesn't match or slug is missing, return success but don't revalidate
        return NextResponse.json({
            revalidated: false,
            message: `Skipped revalidation for document type: ${documentType}`,
        })
    } catch (error) {
        console.error('Error revalidating:', error)
        return NextResponse.json(
            {
                message: 'Error revalidating',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}

// Optional: Add GET endpoint for testing
export async function GET() {
    return NextResponse.json({
        message: 'Revalidation webhook endpoint is active',
        usage: 'POST to this endpoint with Sanity webhook payload',
    })
}
