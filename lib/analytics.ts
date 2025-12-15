"use client";

import { sendGAEvent } from '@next/third-parties/google';

export function trackEvent(
  eventName: string,
  eventCategory?: string,
  eventValue?: string
) {
  // Send to Google Analytics
  if (typeof window !== 'undefined') {
    sendGAEvent('event', eventName, {
      category: eventCategory,
      value: eventValue,
    });

    // Also send to our database via API
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventCategory,
        eventValue,
        pageUrl: window.location.href,
        userAgent: navigator.userAgent,
      }),
    })
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Analytics tracking failed:', error);
      } else {
        console.log('✅ Analytics event tracked:', eventName);
      }
    })
    .catch((error) => {
      console.error('❌ Failed to track event:', error);
    });
  }
}

