'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Wrap } from '../Wrap'

type NavLink = {
  label: string
  href: string
  /** Matches nested routes; anchors never become active. */
  prefix?: string
}

const links: NavLink[] = [
  { label: 'Writing', href: '/blog', prefix: '/blog' },
  { label: 'Book reviews', href: '/book-review', prefix: '/book-review' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
]

const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b border-line">
      <Wrap className="flex flex-col gap-s py-m md:flex-row md:items-center md:justify-between md:gap-l">
        <Link href="/" className="flex w-fit items-center gap-2xs" aria-label="Wichosu — home">
          <span
            aria-hidden="true"
            className="flex size-[27px] items-center justify-center bg-ink font-display text-base leading-none text-[var(--color-base)]"
          >
            W
          </span>
          <span className="font-display text-md font-medium tracking-tight text-ink">Wichosu</span>
        </Link>

        <nav
          aria-label="Primary"
          className="-mx-m border-t border-line px-m md:mx-0 md:border-t-0 md:px-0"
        >
          <ul className="flex items-center justify-between gap-3xs text-[0.6rem] tracking-[0.1em] uppercase md:gap-l md:text-xs md:tracking-[0.12em]">
            {links.map((link) => {
              const active = link.prefix ? pathname.startsWith(link.prefix) : false

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`inline-block border-b pb-3xs whitespace-nowrap transition-colors duration-150 ${
                      active
                        ? 'border-accent text-ink'
                        : 'border-transparent text-ink-2 hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <a
                href="https://ko-fi.com/N4N61JGIR0"
                {...externalLinkProps}
                className="inline-block border border-accent px-2xs py-3xs whitespace-nowrap text-accent transition-colors duration-150 hover:bg-accent hover:text-[var(--color-base)]"
              >
                Ko-fi
              </a>
            </li>
          </ul>
        </nav>
      </Wrap>
    </header>
  )
}
