import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="flex flex-col items-center lg:flex-row lg:justify-evenly lg:gap-12">
      <div className="max-w-2xl flex flex-col gap-4">
        <h1 className="text-4xl font-medium">Hi, I&apos;m Wichosu</h1>
        <p className="text-xl">
          I&apos;m a web developer and I build apps for the web and soon mobile.
        </p>
        <p className="text-xl">
          Everything I build is public and open source in my github profile.
        </p>
        <p className="text-xl">
          If you want to build something and need advice, feel free to contact me and we can have a
          casual chat. I don&apos;t charge for advice.
        </p>
        <p className="text-xl">
          You can find me on{' '}
          <Link
            className="text-blue-500 hover:text-blue-600"
            href="https://github.com/wichosu"
            target="_blank"
          >
            GitHub
          </Link>
          ,{' '}
          <Link
            className="text-blue-500 hover:text-blue-600"
            href="https://x.com/Wichosu198437"
            target="_blank"
          >
            Twitter
          </Link>
          ,{' '}
          <Link
            className="text-blue-500 hover:text-blue-600"
            href="https://linkedin.com/in/luis-wicho-miranda"
            target="_blank"
          >
            LinkedIn
          </Link>
          ,{' '}
          <Link
            className="text-blue-500 hover:text-blue-600"
            href="https://t.me/wichosu"
            target="_blank"
          >
            Telegram
          </Link>
          ,{' '}
          <Link
            className="text-blue-500 hover:text-blue-600"
            href="mailto:wichosubuilds@gmail.com"
            target="_blank"
          >
            Email
          </Link>
          .
        </p>
        <p className="text-xl">
          I take time to respond to messages, but I&apos;ll get back to you as soon as I can.
        </p>
      </div>
      <picture className="rounded-lg overflow-hidden">
        <Image src="/wichosu.jpeg" alt="Wichosu" width={325} height={325} />
      </picture>
    </section>
  )
}
