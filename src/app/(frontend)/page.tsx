import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'

import { Hero } from './components/Hero'
import { Wrap } from './components/Wrap'
import { SectionHeader } from './components/SectionHeader'
import { PostMeta } from './components/PostMeta'
import { BookCover } from './components/BookCover'
import { EmptyState } from './components/EmptyState'
import { readingTime } from './lib/readingTime'
import { categoryNames } from './lib/categoryNames'
import { formatShortDate } from './lib/formatDate'

export const dynamic = 'force-dynamic'

const projects = [
  {
    name: 'Baulchino',
    description: 'A website that hosts resources to help Mandarin Chinese learners.',
    href: 'https://baulchino.com',
    linkLabel: 'Visit Baulchino',
    image: '/baulchino.png',
    alt: 'Screenshot of the Baulchino homepage',
    fit: 'object-cover',
    framed: true,
  },
  {
    name: 'Wichosu Personal Website',
    description: "My own personal website — the one you're reading.",
    href: 'https://github.com/Wichosu',
    linkLabel: 'View on GitHub',
    image: '/logo.png',
    alt: 'Wichosu logo',
    fit: 'object-contain',
    framed: false,
  },
] as const

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [blogEntries, bookReviews] = await Promise.all([
    payload.find({
      collection: 'blog-entry',
      limit: 4,
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
    }),
    payload.find({
      collection: 'book-review',
      limit: 3,
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
    }),
  ])

  const [lead, ...rest] = blogEntries.docs

  return (
    <>
      <Wrap>
        <Hero />

        <section className="py-xl">
          <SectionHeader index="01" title="Latest writing" href="/blog" linkLabel="All writing" />

          {lead ? (
            <div className="grid gap-xl md:grid-cols-[1.35fr_1fr]">
              <article>
                <PostMeta
                  date={lead.date}
                  readingTime={readingTime(lead.content)}
                  categories={categoryNames(lead.category)}
                />

                <h3 className="mt-s font-display text-2xl leading-[1.04] tracking-[-0.01em] text-ink">
                  <Link
                    href={`/blog/${lead.slug}`}
                    className="transition-colors duration-150 hover:text-accent"
                  >
                    {lead.title}
                  </Link>
                </h3>

                {lead.metaDescription && (
                  <p className="mt-s max-w-[54ch] text-md leading-[1.55] text-ink-2">
                    {lead.metaDescription}
                  </p>
                )}

                <Link
                  href={`/blog/${lead.slug}`}
                  className="mt-m inline-block border-b border-accent pb-3xs text-xs tracking-[0.14em] text-accent uppercase"
                >
                  Read the entry <span aria-hidden="true">→</span>
                </Link>
              </article>

              {rest.length > 0 && (
                <ul className="border-t border-line">
                  {rest.map((entry) => (
                    <li key={entry.id} className="border-b border-line">
                      <Link
                        href={`/blog/${entry.slug}`}
                        className="group flex items-baseline justify-between gap-m py-s"
                      >
                        <span className="font-display text-body leading-snug text-ink transition-colors duration-150 group-hover:text-accent">
                          {entry.title}
                        </span>
                        <time
                          dateTime={new Date(entry.date).toISOString()}
                          className="shrink-0 text-2xs tracking-[0.14em] text-ink-3 uppercase"
                        >
                          {formatShortDate(entry.date)}
                        </time>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <EmptyState
              title="Nothing filed here yet."
              body="The first entry is being written. In the meantime, there are book reviews."
              href="/book-review"
              linkLabel="Read a book review"
            />
          )}
        </section>

        <section className="py-xl">
          <SectionHeader
            index="02"
            title="Book reviews"
            href="/book-review"
            linkLabel="All reviews"
          />

          {bookReviews.docs.length > 0 ? (
            <div className="grid grid-cols-2 gap-m lg:grid-cols-3">
              {bookReviews.docs.map((review) => (
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
        </section>

        <section id="projects" className="scroll-mt-m py-xl">
          <SectionHeader index="03" title="Projects" />

          <div className="border-t border-line">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className="grid gap-m border-b border-line py-l md:grid-cols-[1fr_360px] md:items-center md:gap-xl"
              >
                <div className="flex gap-m">
                  <span className="font-display text-xs text-ink-3">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <h3 className="font-display text-lg leading-tight text-ink">{project.name}</h3>
                    <p className="mt-2xs max-w-[46ch] text-body leading-relaxed text-ink-2">
                      {project.description}
                    </p>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-s inline-block border-b border-line pb-3xs text-xs tracking-[0.14em] text-ink-2 uppercase transition-colors duration-150 hover:border-accent hover:text-accent"
                    >
                      {project.linkLabel} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>

                <figure className="border border-line bg-surface">
                  {project.framed && (
                    <div
                      aria-hidden="true"
                      className="flex gap-3xs border-b border-line px-2xs py-3xs"
                    >
                      <span className="size-[6px] bg-line" />
                      <span className="size-[6px] bg-line" />
                      <span className="size-[6px] bg-line" />
                    </div>
                  )}
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={720}
                    height={450}
                    className={`aspect-[16/10] w-full ${project.fit}`}
                  />
                </figure>
              </div>
            ))}
          </div>
        </section>
      </Wrap>

      <section id="contact" className="scroll-mt-m border-y border-line bg-surface">
        <Wrap className="flex flex-col items-start gap-l py-2xl md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl leading-tight text-ink">
              Have something in mind?
            </h2>
            <p className="mt-xs max-w-[52ch] text-body leading-relaxed text-ink-2">
              Tell me what you are building. I answer every message, though it can take me a while.
            </p>
          </div>

          <a
            href="mailto:wichosubuilds@gmail.com"
            className="inline-block bg-accent px-m py-s text-xs tracking-[0.14em] text-[var(--color-base)] uppercase transition-opacity duration-150 hover:opacity-90"
          >
            wichosubuilds@gmail.com
          </a>
        </Wrap>
      </section>
    </>
  )
}
