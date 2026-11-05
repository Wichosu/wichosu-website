import React from 'react'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'

import { ContentImage } from '../../components/ContentImage'
import { formatDate } from '../../lib/formatDate'
import { getBookReview } from '../../lib/getContent'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params
  const review = await getBookReview(slug)

  if (!review) {
    return {
      title: 'Book review not found',
    }
  }

  const description = `Read the review for ${review.title} by ${review.author}`

  return {
    title: review.title,
    description,
    openGraph: {
      title: review.title,
      description,
      ...(review.image ? { images: [{ url: review.image, width: 800, height: 600 }] } : {}),
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const review = await getBookReview(slug)

  if (!review) {
    notFound()
  }

  // `'★'.repeat()` throws for non-integers, and older rows may be out of range.
  const rating = Math.max(1, Math.min(5, Math.round(review.rating)))

  return (
    <section>
      <h1 className="text-4xl font-medium text-center mt-8">{review.title}</h1>
      <p className="text-center mt-2 mb-2 text-xl font-medium">By {review.author}</p>
      <p className="text-center mb-6">{formatDate(review.date)}</p>

      {review.image && (
        <ContentImage
          src={review.image}
          alt={review.title}
          wrapperClassName="block mx-auto max-w-96 max-h-80 lg:max-h-96 mb-6 rounded-md overflow-hidden"
          className="aspect-square object-contain max-w-96 max-h-80 lg:max-h-96"
        />
      )}

      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="text-2xl font-bold flex items-center justify-center gap-2">
          Rating: {rating}/5
          <span className="text-yellow-500">
            {'★'.repeat(rating)}
            {'☆'.repeat(5 - rating)}
          </span>
        </div>
        <a
          href={review.amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          View on Amazon
        </a>
      </div>

      <div className="prose prose-neutral max-w-4xl mx-auto text-lg lg:text-xl">
        <RichText data={review.content} />
      </div>
    </section>
  )
}
