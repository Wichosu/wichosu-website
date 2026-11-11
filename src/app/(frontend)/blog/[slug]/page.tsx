import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Wrap } from '../../components/Wrap'
import { PostMeta } from '../../components/PostMeta'
import { readingTime } from '../../lib/readingTime'
import { categoryNames } from '../../lib/categoryNames'
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

  const payload = await getPayload({ config })

  const [older, newer] = await Promise.all([
    payload.find({
      collection: 'blog-entry',
      where: {
        and: [{ date: { less_than: entry.date } }, { id: { not_equals: entry.id } }],
      },
      sort: '-date',
      limit: 1,
      depth: 0,
      overrideAccess: false,
      select: { title: true, slug: true },
    }),
    payload.find({
      collection: 'blog-entry',
      where: {
        and: [{ date: { greater_than: entry.date } }, { id: { not_equals: entry.id } }],
      },
      sort: 'date',
      limit: 1,
      depth: 0,
      overrideAccess: false,
      select: { title: true, slug: true },
    }),
  ])

  const categories = categoryNames(entry.category)
  const previous = older.docs[0]
  const next = newer.docs[0]

  return (
    <Wrap>
      <article className="mx-auto max-w-[760px] pt-xl pb-2xl">
        <header>
          <p className="text-2xs tracking-[0.2em] text-ink-3 uppercase">Writing</p>

          <h1 className="mt-s font-display text-3xl leading-[1.02] tracking-[-0.02em] text-ink">
            {entry.title}
          </h1>

          {entry.metaDescription && (
            <p className="mt-s text-md leading-[1.55] text-ink-2">{entry.metaDescription}</p>
          )}

          <PostMeta
            className="mt-m"
            date={entry.date}
            readingTime={readingTime(entry.content)}
            categories={categories}
          />

          <div aria-hidden="true" className="mt-m h-px bg-line" />
        </header>

        <RichText data={entry.content} className="article-body mt-l" />

        <nav
          aria-label="More writing"
          className="mt-3xl grid gap-m border-t border-line pt-l sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/blog/${previous.slug}`}
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
              href={`/blog/${next.slug}`}
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
