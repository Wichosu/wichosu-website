import Link from 'next/link'

type Props = {
  title: string
  body?: string
  href?: string
  linkLabel?: string
}

/** A deliberate empty section, never a broken one. */
export function EmptyState({ title, body, href, linkLabel }: Props) {
  return (
    <div className="border-y border-line py-2xl text-center">
      <p className="font-display text-lg text-ink">{title}</p>
      {body && (
        <p className="mx-auto mt-xs max-w-[44ch] text-body leading-relaxed text-ink-2">{body}</p>
      )}
      {href && linkLabel && (
        <Link
          href={href}
          className="mt-m inline-block border-b border-accent pb-3xs text-xs tracking-[0.14em] text-accent uppercase"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  )
}
