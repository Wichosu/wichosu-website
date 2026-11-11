import Link from 'next/link'

import { formatShortDate } from '../lib/formatDate'

type Props = {
  title: string
  href: string
  date: string | Date
  dek?: string | null
  categories?: string[]
  readingTime?: string
}

/** One entry in the /blog archive: date rail, title, dek, tags, reading time. */
export function EntryRow({ title, href, date, dek, categories = [], readingTime }: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2xs border-b border-line py-m first:pt-0 sm:grid sm:grid-cols-[5.5rem_1fr] sm:gap-m"
    >
      <time
        dateTime={new Date(date).toISOString()}
        className="text-2xs tracking-[0.14em] text-ink-3 uppercase"
      >
        {formatShortDate(date)}
      </time>

      <div>
        <h3 className="font-display text-lg leading-tight text-ink transition-colors duration-150 group-hover:text-accent">
          {title}
        </h3>

        {dek && <p className="mt-2xs max-w-[62ch] text-body leading-relaxed text-ink-2">{dek}</p>}

        <div className="mt-xs flex flex-wrap items-center justify-between gap-x-m gap-y-2xs text-2xs tracking-[0.14em] text-ink-3 uppercase">
          <span>{categories.join(' / ')}</span>
          {readingTime && <span>{readingTime}</span>}
        </div>
      </div>
    </Link>
  )
}
