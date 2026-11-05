import React from 'react'

import { Button } from '../Button'
import { Card } from '../Card'
import { ContentImage } from '../ContentImage'
import { formatDate } from '../../lib/formatDate'

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
        {items.map((item) => (
          <Card key={item.id} as="article" elevation="2">
            <h3 className="text-3xl text-center font-medium mb-2">{item.title}</h3>
            <p className="mb-4 text-center">{formatDate(item.date)}</p>
            <ContentImage
              src={item.image}
              alt={item.title}
              wrapperClassName="block max-h-80 lg:max-h-96 mb-4 rounded-md overflow-hidden"
              className="aspect-square object-contain object-center max-h-80 lg:max-h-96"
            />
            <Button
              as="link"
              href={`${basePath}/${item.slug}`}
              margin="none"
              className="block w-fit mx-auto"
            >
              {linkLabel}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}
