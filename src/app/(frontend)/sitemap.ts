import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  const blogEntries = await payload.find({
    collection: 'blog-entry',
    limit: 0,
  })

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not defined')
  }

  const blogUrls: MetadataRoute.Sitemap = blogEntries.docs.map((entry) => ({
    url: `${baseUrl}/blog/${entry.slug}`,
    priority: 0.9,
  }))

  return [
    {
      url: baseUrl,
      priority: 1,
    },
    ...blogUrls,
  ]
}
