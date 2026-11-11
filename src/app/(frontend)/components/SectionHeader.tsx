import Link from 'next/link'

type Props = {
  index: string
  title: string
  href?: string
  linkLabel?: string
}

/** Numbered section rule: 01 · LATEST WRITING ————— All writing → */
export function SectionHeader({ index, title, href, linkLabel }: Props) {
  return (
    <div className="mb-l flex items-baseline gap-s">
      <span className="font-display text-xs text-accent">{index}</span>
      <h2 className="text-2xs tracking-[0.2em] text-ink uppercase">{title}</h2>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
      {href && linkLabel && (
        <Link
          href={href}
          className="text-xs whitespace-nowrap text-ink-2 transition-colors duration-150 hover:text-accent"
        >
          {linkLabel} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  )
}
