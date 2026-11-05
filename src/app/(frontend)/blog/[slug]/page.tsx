import React from 'react'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'

import { ContentImage } from '../../components/ContentImage'
import { formatDate } from '../../lib/formatDate'
import { getBlogEntry } from '../../lib/getContent'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params
  const entry = await getBlogEntry(slug)

  if (!entry) {
    return {
      title: 'Blog entry not found',
    }
  }

  const description = entry.metaDescription ?? 'No description'

  return {
    title: entry.title,
    description,
    openGraph: {
      title: entry.title,
      description,
      ...(entry.image ? { images: [{ url: entry.image, width: 800, height: 600 }] } : {}),
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const entry = await getBlogEntry(slug)

  if (!entry) {
    notFound()
  }

  return (
    <section>
      <h1 className="text-4xl font-medium text-center mt-8">{entry.title}</h1>
      <p className="text-center mt-2 mb-6">{formatDate(entry.date)}</p>
      {entry.image && (
        <ContentImage
          src={entry.image}
          alt={entry.title}
          wrapperClassName="block mx-auto max-w-96 max-h-80 lg:max-h-96 mb-6 rounded-md overflow-hidden"
          className="aspect-square object-cover max-w-96 max-h-80 lg:max-h-96"
        />
      )}
      <RichText
        data={entry.content}
        className="prose prose-neutral max-w-4xl mx-auto text-lg lg:text-xl"
      />
    </section>
  )
}
