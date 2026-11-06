import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function KoFiButton() {
  return (
    <Link href="https://ko-fi.com/N4N61JGIR0" target="_blank" rel="noopener noreferrer">
      <Image
        src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
        alt="Buy Me a Coffee at ko-fi.com"
        width={141}
        height={36}
        loading="lazy"
        unoptimized
        style={{ border: '0px', height: '36px', width: 'auto' }}
      />
    </Link>
  )
}
