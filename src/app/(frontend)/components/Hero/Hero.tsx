import React from 'react'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="flex">
      <div>
        <h1>Hi, I&apos;m Wichosu</h1>
        <p>I&apos;m a web developer and build apps for the web and soon mobile</p>
      </div>
      <picture>
        <Image src="/wichosu.jpeg" alt="Wichosu" width={325} height={325} />
      </picture>
    </section>
  )
}
