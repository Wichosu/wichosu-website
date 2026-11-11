import Link from 'next/link'

import { BookPlate } from './BookPlate'
import { Stars } from './Stars'
import { formatShortDate } from '../lib/formatDate'

type Props = {
  title: string
  slug: string
  author?: string | null
  image?: string | null
  rating: number
  date: string | Date
}

/** A cover in a grid: plate, title, then rating and date on a hairline. */
export function BookCover({ title, slug, author, image, rating, date }: Props) {
  return (
    <article>
      <Link href={`/book-review/${slug}`} className="group block">
        <BookPlate title={title} slug={slug} author={author} image={image} />

        <h3 className="mt-xs font-display text-body leading-snug text-ink transition-colors duration-150 group-hover:text-accent">
          {title}
        </h3>

        <div className="mt-2xs flex items-center justify-between gap-2xs border-t border-line pt-2xs">
          <Stars rating={rating} />
          <time
            dateTime={new Date(date).toISOString()}
            className="text-2xs tracking-[0.14em] text-ink-3 uppercase"
          >
            {formatShortDate(date)}
          </time>
        </div>
      </Link>
    </article>
  )
}
