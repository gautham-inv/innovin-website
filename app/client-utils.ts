'use client'

import {isCorsOriginError} from 'next-sanity'
import {toast} from 'sonner'

export function handleError(error: unknown) {
  if (isCorsOriginError(error)) {
    // If the error is a CORS origin error, let's display that specific error.
    const {addOriginUrl} = error
    toast.error(`Sanity Live couldn't connect`, {
      description: `Your origin is blocked by CORS policy`,
      duration: Infinity,
      action: addOriginUrl
        ? {
            label: 'Manage',
            onClick: () => window.open(addOriginUrl.toString(), '_blank'),
          }
        : undefined,
    })
  } else if (error instanceof Error) {
    console.error(error)
    toast.error(error.name, {description: error.message, duration: Infinity})
  } else if (error instanceof Event) {
    // Handle Event objects (e.g., from unhandled promise rejections)
    const event = error as PromiseRejectionEvent | ErrorEvent | Event
    const reason = 'reason' in event ? event.reason : null
    const message = 'message' in event ? event.message : event.type
    
    console.error('Event error:', event)
    
    if (reason instanceof Error) {
      toast.error(reason.name, {description: reason.message, duration: Infinity})
    } else if (reason) {
      toast.error('Promise rejection', {
        description: String(reason),
        duration: Infinity,
      })
    } else {
      toast.error('Event error', {
        description: message || 'An unexpected event occurred',
        duration: Infinity,
      })
    }
  } else {
    console.error(error)
    toast.error('Unknown error', {
      description: 'Check the console for more details',
      duration: Infinity,
    })
  }
}

