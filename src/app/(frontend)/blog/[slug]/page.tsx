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
  })

  if (!blogEntry.docs[0]) {
    return <div>Blog entry not found</div>
  }

  return (
    <>
      <h1>{blogEntry.docs[0].title}</h1>
      <p>{new Date(blogEntry.docs[0].date).toLocaleDateString()}</p>
      <RichText data={blogEntry.docs[0].content} />
    </>
  )
}
