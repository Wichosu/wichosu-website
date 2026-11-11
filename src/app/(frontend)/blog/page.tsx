import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Wrap } from '../components/Wrap'
import { EntryRow } from '../components/EntryRow'
import { EmptyState } from '../components/EmptyState'
import { readingTime } from '../lib/readingTime'
import { categoryNames } from '../lib/categoryNames'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Writing — Wichosu',
  description: 'Essays and notes on building for the web, in public.',
}

export default async function WritingIndexPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'blog-entry',
    limit: 200,
    sort: '-date',
    depth: 1,
    overrideAccess: false,
    select: {
      title: true,
      metaDescription: true,
      date: true,
      slug: true,
      category: true,
      content: true,
    },
  })

  const groups = new Map<number, Array<(typeof docs)[number]>>()

  for (const entry of docs) {
    const year = new Date(entry.date).getUTCFullYear()
    const group: Array<(typeof docs)[number]> = groups.get(year) ?? []
    group.push(entry)
    groups.set(year, group)
  }

  return (
    <Wrap className="pb-2xl">
      <header className="pt-xl pb-l">
        <p className="text-2xs tracking-[0.2em] text-ink-3 uppercase">Archive</p>
        <h1 className="mt-2xs font-display text-3xl leading-none tracking-[-0.02em] text-ink md:text-4xl">
          Writing
        </h1>
        <p className="mt-s max-w-[52ch] text-md leading-[1.55] text-ink-2">
          Essays and notes on building for the web, in public.
        </p>
        <p className="mt-m text-2xs tracking-[0.14em] text-ink-3 uppercase">
          {docs.length} {docs.length === 1 ? 'entry' : 'entries'}
        </p>
      </header>

      {docs.length > 0 ? (
        Array.from(groups.entries()).map(([year, entries]) => (
          <section
            key={year}
            className="grid gap-s border-t border-line py-l md:grid-cols-[8rem_1fr] md:gap-xl"
          >
            <h2 className="font-display text-2xl leading-none text-ink-3">{year}</h2>

            <div>
              {entries.map((entry) => (
                <EntryRow
                  key={entry.id}
                  title={entry.title}
                  href={`/blog/${entry.slug}`}
                  date={entry.date}
                  dek={entry.metaDescription}
                  categories={categoryNames(entry.category)}
                  readingTime={readingTime(entry.content)}
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        <EmptyState
          title="Nothing filed here yet."
          body="The first entry is being written. In the meantime, there are book reviews."
          href="/book-review"
          linkLabel="Read a book review"
        />
      )}
    </Wrap>
  )
}
