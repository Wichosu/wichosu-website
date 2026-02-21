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

  const bookReview = await payload.find({
    collection: 'book-review',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  })

  if (!bookReview.docs[0]) {
    return {
      title: 'Book review not found',
    }
  }

  const review = bookReview.docs[0]

  return {
    title: review.title,
    description: `Read the review for ${review.title} by ${review.author}`,
    openGraph: {
      title: review.title,
      description: `Read the review for ${review.title} by ${review.author}`,
      images: [
        {
          url: review.image ?? '',
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

  const bookReview = await payload.find({
    collection: 'book-review',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 2,
  })

  if (!bookReview.docs[0]) {
    return <div className="text-center text-4xl font-medium mt-8">Book review not found</div>
  }

  const review = bookReview.docs[0]

  return (
    <section>
      <h1 className="text-4xl font-medium text-center mt-8">{review.title}</h1>
      <p className="text-center mt-2 mb-2 text-xl font-medium">By {review.author}</p>
      <p className="text-center mb-6">
        {new Date(review.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      {review.image && (
        <picture className="block mx-auto max-w-96 max-h-80 lg:max-h-96 mb-6 rounded-md overflow-hidden">
          <source srcSet={review.image} />
          <Image
            className="aspect-square object-contain max-w-96 max-h-80 lg:max-h-96"
            src={review.image}
            alt={review.title}
            width={500}
            height={500}
          />
        </picture>
      )}

      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="text-2xl font-bold flex items-center justify-center gap-2">
          Rating: {review.rating}/5
          <span className="text-yellow-500">
            {'★'.repeat(review.rating)}
            {'☆'.repeat(5 - review.rating)}
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
