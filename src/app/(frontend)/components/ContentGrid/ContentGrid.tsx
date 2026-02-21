import React, { Suspense } from 'react'
import { Card } from '../Card'
import Image from 'next/image'
import { Button } from '../Button'

export interface ContentGridItem {
  id: string | number
  title: string
  date: string
  image?: string | null
  slug: string
}

export interface ContentGridProps {
  title: string
  items: ContentGridItem[]
  basePath: string
  linkLabel: string
}

export const ContentGrid: React.FC<ContentGridProps> = ({ title, items, basePath, linkLabel }) => {
  return (
    <section>
      <h2 className="text-4xl font-medium text-center my-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <Suspense fallback={<div>Loading...</div>}>
          {items.map((item) => (
            <Card key={item.id} as="article" elevation="2">
              <h3 className="text-3xl text-center font-medium mb-2">{item.title}</h3>
              <p className="mb-4 text-center">
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              {item.image ? (
                <picture className="block max-h-80 lg:max-h-96 mb-4 rounded-md overflow-hidden">
                  <source srcSet={item.image} />
                  <Image
                    className="aspect-square object-contain object-center max-h-80 lg:max-h-96"
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={500}
                  />
                </picture>
              ) : (
                <picture className="block max-h-80 lg:max-h-96 mb-4 rounded-md overflow-hidden">
                  <Image
                    className="aspect-square object-contain object-center max-h-80 lg:max-h-96"
                    src="/logo.png"
                    alt={item.title}
                    width={500}
                    height={500}
                  />
                </picture>
              )}
              <Button
                as="link"
                href={`${basePath}/${item.slug}`}
                target="_self"
                margin="none"
                className="block w-fit mx-auto"
              >
                {linkLabel}
              </Button>
            </Card>
          ))}
        </Suspense>
      </div>
    </section>
  )
}
