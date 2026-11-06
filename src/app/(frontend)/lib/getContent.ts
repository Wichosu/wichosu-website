import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { BlogEntry, BookReview } from '@/payload-types'

/**
 * Cached per request, so `generateMetadata` and the page component share a
 * single database query.
 */
export const getBlogEntry = cache(async (slug: string): Promise<BlogEntry | null> => {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'blog-entry',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    overrideAccess: false,
  })

  return docs[0] ?? null
})

export const getBookReview = cache(async (slug: string): Promise<BookReview | null> => {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'book-review',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    overrideAccess: false,
  })

  return docs[0] ?? null
})
