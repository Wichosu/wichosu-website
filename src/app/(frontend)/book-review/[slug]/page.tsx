import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Wrap } from '../../components/Wrap'
import { PostMeta } from '../../components/PostMeta'
import { BookPlate } from '../../components/BookPlate'
import { Stars } from '../../components/Stars'
import { readingTime } from '../../lib/readingTime'
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

  const payload = await getPayload({ config })

  const [older, newer] = await Promise.all([
    payload.find({
      collection: 'book-review',
      where: {
        and: [{ date: { less_than: review.date } }, { id: { not_equals: review.id } }],
      },
      sort: '-date',
      limit: 1,
      depth: 0,
      overrideAccess: false,
      select: { title: true, slug: true },
    }),
    payload.find({
      collection: 'book-review',
      where: {
        and: [{ date: { greater_than: review.date } }, { id: { not_equals: review.id } }],
      },
      sort: 'date',
      limit: 1,
      depth: 0,
      overrideAccess: false,
      select: { title: true, slug: true },
    }),
  ])

  const previous = older.docs[0]
  const next = newer.docs[0]

  return (
    <Wrap>
      <article className="mx-auto max-w-[760px] pt-xl pb-2xl">
        <header>
          <p className="text-2xs tracking-[0.2em] text-ink-3 uppercase">Book review</p>

          <div className="mt-s grid gap-l sm:grid-cols-[200px_1fr] sm:items-start">
            <div className="w-[160px] sm:w-full">
              <BookPlate
                title={review.title}
                slug={review.slug}
                author={review.author}
                image={review.image}
              />
            </div>

            <div>
              <h1 className="font-display text-3xl leading-[1.02] tracking-[-0.02em] text-ink">
                {review.title}
              </h1>

              <p className="mt-2xs text-md text-ink-2 italic">by {review.author}</p>

              <div className="mt-s flex flex-wrap items-center gap-x-m gap-y-2xs">
                <Stars rating={rating} />
                <PostMeta date={review.date} readingTime={readingTime(review.content)} />
              </div>

              <a
                href={review.amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-m inline-block border-b border-accent pb-3xs text-xs tracking-[0.14em] text-accent uppercase"
              >
                Buy on Amazon <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div aria-hidden="true" className="mt-l h-px bg-line" />
        </header>

        <RichText data={review.content} className="article-body mt-l" />

        <nav
          aria-label="More book reviews"
          className="mt-3xl grid gap-m border-t border-line pt-l sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/book-review/${previous.slug}`}
              className="group border border-line p-m transition-colors duration-150 hover:border-accent"
            >
              <span className="text-2xs tracking-[0.14em] text-ink-3 uppercase">Previous</span>
              <span className="mt-2xs block font-display text-body leading-snug text-ink transition-colors duration-150 group-hover:text-accent">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}

          {next ? (
            <Link
              href={`/book-review/${next.slug}`}
              className="group border border-line p-m transition-colors duration-150 hover:border-accent sm:text-right"
            >
              <span className="text-2xs tracking-[0.14em] text-ink-3 uppercase">Next</span>
              <span className="mt-2xs block font-display text-body leading-snug text-ink transition-colors duration-150 group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </nav>
      </article>
    </Wrap>
  )
}
