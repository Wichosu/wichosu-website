import React from 'react'
import { Hero } from './components/Hero'
import { Card } from './components/Card'
import Image from 'next/image'
import { Button } from './components/Button'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const blogEntries = await payload.find({
    collection: 'blog-entry',
    limit: 10,
  })

  return (
    <>
      <Hero />
      <section>
        <h2 className="text-4xl font-medium text-center my-8">What I&apos;ve built</h2>
        <div className="flex flex-wrap justify-center gap-12">
          <Card as="article" elevation="2">
            <h3 className="text-3xl font-medium text-center mb-4">Baulchino</h3>
            <figure className="w-fit mx-auto mb-4">
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
            <figure className="w-fit mx-auto mb-4">
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
      <section>
        <h2 className="text-4xl font-medium text-center my-8">Blog</h2>
        <div className="flex flex-wrap items-center justify-center gap-12">
          <Suspense fallback={<div>Loading...</div>}>
            {blogEntries.docs.map((blogEntry) => (
              <Card key={blogEntry.id} as="article" elevation="2">
                <h3 className="text-3xl text-center font-medium mb-2">{blogEntry.title}</h3>
                <p className="mb-4 text-center">{new Date(blogEntry.date).toLocaleDateString()}</p>
                {blogEntry.image && (
                  <picture className="block max-w-md mb-4 rounded-md overflow-hidden">
                    <source srcSet={blogEntry.image} />
                    <Image
                      className="aspect-square object-cover max-w-md"
                      src={blogEntry.image}
                      alt={blogEntry.title}
                      width={500}
                      height={500}
                    />
                  </picture>
                )}
                <Button
                  as="link"
                  href={`/blog/${blogEntry.slug}`}
                  target="_self"
                  margin="none"
                  className="block w-fit mx-auto"
                >
                  Read this entry
                </Button>
              </Card>
            ))}
          </Suspense>
        </div>
      </section>
    </>
  )
}
