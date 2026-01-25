import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const payload = await getPayload({ config })
  const { slug } = await params

  const blogEntry = await payload.find({
    collection: 'blog-entry',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  })

  if (!blogEntry.docs[0]) {
    return {
      title: 'Blog entry not found',
    }
  }

  return {
    title: blogEntry.docs[0].title,
    description: blogEntry.docs[0].metaDescription ?? 'No description',
    openGraph: {
      title: blogEntry.docs[0].title,
      description: blogEntry.docs[0].metaDescription ?? 'No description',
      images: [
        {
          url: blogEntry.docs[0].image ?? '',
          width: 800,
          height: 600,
        },
      ],
    },
  }
}

export default async function Page({ params }: Props) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const blogEntry = await payload.find({
    collection: 'blog-entry',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  })

  if (!blogEntry.docs[0]) {
    return <div className="text-center text-4xl font-medium mt-8">Blog entry not found</div>
  }

  return (
    <section>
      <h1 className="text-4xl font-medium text-center mt-8">{blogEntry.docs[0].title}</h1>
      <p className="text-center mt-2 mb-6">
        {new Date(blogEntry.docs[0].date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      {blogEntry.docs[0].image && (
        <picture className="block mx-auto max-w-96 max-h-80 lg:max-h-96 mb-6 rounded-md overflow-hidden">
          <source srcSet={blogEntry.docs[0].image} />
          <Image
            className="aspect-square object-cover max-w-96 max-h-80 lg:max-h-96"
            src={blogEntry.docs[0].image}
            alt={blogEntry.docs[0].title}
            width={500}
            height={500}
          />
        </picture>
      )}
      <RichText
        data={blogEntry.docs[0].content}
        className="prose prose-neutral max-w-4xl mx-auto text-lg lg:text-xl"
      />
    </section>
  )
}
