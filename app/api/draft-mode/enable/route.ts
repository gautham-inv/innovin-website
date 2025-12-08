import {defineEnableDraftMode} from 'next-sanity/draft-mode'

import {client} from '@/lib/sanity/lib/client'
import {token} from '@/lib/sanity/lib/token'

/**
 * defineEnableDraftMode() is used to enable draft mode for Sanity live preview.
 * Set the route of this file as the previewMode.enable option for presentationTool 
 * in your sanity.config.ts
 * 
 * This enables SSR for live preview in Sanity Studio.
 * Learn more: https://github.com/sanity-io/next-sanity?tab=readme-ov-file#5-integrating-with-sanity-presentation-tool--visual-editing
 */

export const {GET} = defineEnableDraftMode({
  client: client.withConfig({token: token || undefined}),
})

