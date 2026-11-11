import { formatDate } from '../lib/formatDate'

type Props = {
  date: string | Date
  readingTime?: string
  categories?: string[]
  className?: string
}

/** One caps line: date · reading time · categories. */
export function PostMeta({ date, readingTime, categories = [], className = '' }: Props) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-2xs text-2xs tracking-[0.14em] text-ink-3 uppercase ${className}`}
    >
      <time dateTime={new Date(date).toISOString()}>{formatDate(date)}</time>
      {readingTime && (
        <>
          <span aria-hidden="true">·</span>
          <span>{readingTime}</span>
        </>
      )}
      {categories.length > 0 && (
        <>
          <span aria-hidden="true">·</span>
          <span>{categories.join(' / ')}</span>
        </>
      )}
    </p>
  )
}
