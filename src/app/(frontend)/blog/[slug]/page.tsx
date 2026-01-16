import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const payload = await getPayload({ config })

  const blogEntry = await payload.find({
    collection: 'blog-entry',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
    depth: 2,
  })

  if (!blogEntry.docs[0]) {
    return <div>Blog entry not found</div>
  }

  return (
    <section>
      <h1 className="text-4xl font-medium text-center mt-8">{blogEntry.docs[0].title}</h1>
      <p className="text-center mt-2 mb-8">
        {new Date(blogEntry.docs[0].date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <RichText
        data={blogEntry.docs[0].content}
        className="prose prose-neutral max-w-4xl mx-auto"
      />
    </section>
  )
}
