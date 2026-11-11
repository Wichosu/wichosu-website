import React from 'react'
import Image from 'next/image'

const socials = [
  { label: 'GitHub', href: 'https://github.com/Wichosu', external: true },
  { label: 'X', href: 'https://x.com/Wichosu198437', external: true },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/luis-wicho-miranda', external: true },
  { label: 'Telegram', href: 'https://t.me/wichosu', external: true },
  { label: 'Email', href: 'mailto:wichosubuilds@gmail.com', external: false },
]

export function Hero() {
  return (
    <section className="grid items-end gap-xl pt-xl pb-2xl md:grid-cols-[1fr_320px] min-[1120px]:grid-cols-[1fr_400px] min-[1120px]:gap-2xl">
      <div>
        <p className="mb-m text-2xs tracking-[0.2em] text-ink-3 uppercase">
          Web developer <span aria-hidden="true">·</span> Open source
        </p>

        <h1 className="font-display text-2xl leading-[0.98] tracking-[-0.02em] text-ink md:text-3xl lg:text-4xl">
          Hi, I&apos;m <em className="text-accent italic">Wichosu</em>
        </h1>

        <p className="mt-l max-w-[46ch] text-md leading-[1.55] text-ink-2">
          I&apos;m a web developer. I build things for the web — and soon mobile — in the open, and
          everything I make is public on GitHub. If you want to build something and need advice,
          write to me; I don&apos;t charge for it, and I answer as soon as I can.
        </p>

        <ul className="mt-l flex flex-wrap gap-x-m gap-y-xs text-xs text-ink-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="border-b border-line pb-3xs transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <figure className="w-full border border-line bg-surface p-2xs">
        <Image
          src="/wichosu.jpeg"
          alt="Portrait of Wichosu"
          width={400}
          height={400}
          priority
          className="aspect-square w-full object-cover"
        />
        <figcaption className="mt-2xs px-3xs text-2xs tracking-[0.14em] text-ink-3 uppercase">
          Luis Wicho Miranda <span aria-hidden="true">—</span> Wichosu
        </figcaption>
      </figure>
    </section>
  )
}
