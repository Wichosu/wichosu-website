import React from 'react'
import { Hero } from './components/Hero'
import { Card } from './components/Card'
import Image from 'next/image'
import { Button } from './components/Button'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Suspense } from 'react'
import { ContentGrid } from './components/ContentGrid'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const blogEntries = await payload.find({
    collection: 'blog-entry',
    limit: 10,
  })

  const bookReviews = await payload.find({
    collection: 'book-review',
    limit: 10,
  })

  return (
    <>
      <Hero />
      <section>
        <h2 className="text-4xl font-medium text-center my-8">What I&apos;ve built</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <Card as="article" elevation="2">
            <h3 className="text-3xl font-medium text-center mb-4">Baulchino</h3>
            <figure className="w-fit mx-auto mb-4 rounded-md overflow-hidden">
              <Image src="/baulchino.png" alt="Baulchino" width={500} height={500} />
            </figure>
            <p className="text-lg max-w-md mb-4 mx-auto">
              Baulchino is a website that host resources to help Mandarin Chinese learners.
            </p>
            <Button as="link" href="https://baulchino.com" className="block w-fit mx-auto">
              Visit Baulchino
            </Button>
          </Card>
          <Card as="article" elevation="2">
            <h3 className="text-3xl font-medium text-center mb-4">Wichosu Personal Website</h3>
            <figure className="w-fit mx-auto mb-4 rounded-md overflow-hidden">
              <Image
                src="/logo.png"
                alt="A logo of Wichosu (it's the letter W with a white color and a black background)"
                width={500}
                height={500}
              />
            </figure>
            <p className="text-lg max-w-md mb-4 mx-auto">
              It&apos;s my own personal website and the site you are currently on.
            </p>
          </Card>
        </div>
      </section>
      <ContentGrid
        title="Blog"
        items={blogEntries.docs.map((doc) => ({
          id: doc.id,
          title: doc.title,
          date: doc.date,
          image: doc.image as string | null | undefined,
          slug: doc.slug as string,
        }))}
        basePath="/blog"
        linkLabel="Read this entry"
      />
      <ContentGrid
        title="Book Reviews"
        items={bookReviews.docs.map((doc) => ({
          id: doc.id,
          title: doc.title,
          date: doc.date,
          image: doc.image as string | null | undefined,
          slug: doc.slug as string,
        }))}
        basePath="/book-review"
        linkLabel="Read this review"
      />
    </>
  )
}
