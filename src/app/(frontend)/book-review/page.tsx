import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Wrap } from '../components/Wrap'
import { BookCover } from '../components/BookCover'
import { EmptyState } from '../components/EmptyState'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Book reviews — Wichosu',
  description: "What I've been reading, and what I made of it.",
}

export default async function BookReviewsIndexPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'book-review',
    limit: 200,
    sort: '-date',
    depth: 0,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      image: true,
      author: true,
      rating: true,
      date: true,
    },
  })

  return (
    <Wrap className="pb-2xl">
      <header className="pt-xl pb-l">
        <p className="text-2xs tracking-[0.2em] text-ink-3 uppercase">Library</p>
        <h1 className="mt-2xs font-display text-3xl leading-none tracking-[-0.02em] text-ink md:text-4xl">
          Book reviews
        </h1>
        <p className="mt-s max-w-[52ch] text-md leading-[1.55] text-ink-2">
          What I&apos;ve been reading, and what I made of it.
        </p>
        <div className="mt-m flex flex-wrap items-baseline justify-between gap-s">
          <p className="text-2xs tracking-[0.14em] text-ink-3 uppercase">
            {docs.length} {docs.length === 1 ? 'review' : 'reviews'}
          </p>
          <p className="text-2xs tracking-[0.14em] text-ink-3 uppercase">Newest first</p>
        </div>
      </header>

      {docs.length > 0 ? (
        <div className="grid grid-cols-2 gap-m border-t border-line pt-l md:grid-cols-3 lg:grid-cols-4">
          {docs.map((review) => (
            <BookCover
              key={review.id}
              title={review.title}
              slug={review.slug}
              author={review.author}
              image={review.image}
              rating={review.rating}
              date={review.date}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="The shelf is empty."
          body="Reviews are on their way. Writing is already here."
          href="/blog"
          linkLabel="Read the writing"
        />
      )}
    </Wrap>
  )
}
