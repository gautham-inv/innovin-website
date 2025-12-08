import {defineQuery} from 'next-sanity'

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

// Job queries
const jobFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  heading,
  location,
  employmentType,
  "datePosted": coalesce(datePosted, _updatedAt),
  dateExpires,
  isActive,
`

export const allJobsQuery = defineQuery(`
  *[_type == "job" && defined(slug.current) && isActive == true] | order(datePosted desc, _updatedAt desc) {
    ${jobFields}
  }
`)

export const jobQuery = defineQuery(`
  *[_type == "job" && slug.current == $slug] [0] {
    ${jobFields}
    jobDescription[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    },
    rolesAndResponsibilities[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    },
    qualifications[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    },
    benefits[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference}
      }
    },
  }
`)

export const jobSlugs = defineQuery(`
  *[_type == "job" && defined(slug.current) && isActive == true]
  {"slug": slug.current}
`)

