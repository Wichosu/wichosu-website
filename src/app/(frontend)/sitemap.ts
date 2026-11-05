import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import { absoluteUrl } from '@/lib/site'

// Generated per request so deployments do not need a live database at build time.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  const [blogEntries, bookReviews] = await Promise.all([
    payload.find({
      collection: 'blog-entry',
      limit: 0,
      depth: 0,
      overrideAccess: false,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'book-review',
      limit: 0,
      depth: 0,
      overrideAccess: false,
      select: { slug: true, updatedAt: true },
    }),
  ])

  const blogUrls: MetadataRoute.Sitemap = blogEntries.docs.map((entry) => ({
    url: absoluteUrl(`/blog/${entry.slug}`),
    lastModified: entry.updatedAt,
    priority: 0.9,
  }))

  const bookReviewUrls: MetadataRoute.Sitemap = bookReviews.docs.map((review) => ({
    url: absoluteUrl(`/book-review/${review.slug}`),
    lastModified: review.updatedAt,
    priority: 0.8,
  }))

  return [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      priority: 1,
    },
    ...blogUrls,
    ...bookReviewUrls,
  ]
}
