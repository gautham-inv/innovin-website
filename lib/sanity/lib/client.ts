import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId, studioUrl} from '@/lib/sanity/lib/api'
import {token} from './token'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  ...(token && { token }), // Only include token if it exists
  stega: {
    studioUrl,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true
      }

      return props.filterDefault(props)
    },
  },
})

