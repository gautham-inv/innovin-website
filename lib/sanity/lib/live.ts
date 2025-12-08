import {defineLive} from 'next-sanity'
import {client} from './client'
import {token} from './token'

/**
 * Use defineLive to enable:
 * - SSG: Fetches at build time for static generation
 * - SSR: Live preview in Sanity Studio (requires Server Actions)
 * - Webhook-driven revalidation: Pages regenerate via /api/revalidate webhook
 * 
 * Note: Server Actions are only used for live preview functionality.
 * Production pages are SSG and updated via webhook-triggered revalidation.
 * Learn more: https://github.com/sanity-io/next-sanity?tab=readme-ov-file#1-configure-definelive
 */

export const {sanityFetch, SanityLive} = defineLive({
  client,
  // Required for showing draft content when the Sanity Presentation Tool is used, or to enable the Vercel Toolbar Edit Mode
  serverToken: token || undefined,
  // Required for stand-alone live previews, the token is only shared to the browser if it's a valid Next.js Draft Mode session
  browserToken: token || undefined,
})

