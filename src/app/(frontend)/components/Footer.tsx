import React from 'react'

import { Wrap } from './Wrap'

const socials = [
  { label: 'X', href: 'https://x.com/Wichosu198437', external: true },
  { label: 'GitHub', href: 'https://github.com/Wichosu', external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/luis-wicho-miranda/', external: true },
  { label: 'Telegram', href: 'https://t.me/wichosu', external: true },
  { label: 'Email', href: 'mailto:wichosubuilds@gmail.com', external: false },
]

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Wrap className="py-l">
        <div className="flex flex-col gap-s text-2xs tracking-[0.14em] text-ink-3 uppercase md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Wichosu</p>

          <nav aria-label="Elsewhere">
            <ul className="flex flex-wrap items-center gap-m">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="transition-colors duration-150 hover:text-ink"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p>Built with Next.js + Payload</p>
        </div>
      </Wrap>
    </footer>
  )
}
