import React from 'react'
import { Fraunces, Lora } from 'next/font/google'
import './global.css'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import Script from 'next/script'
import { SITE_URL } from '@/lib/site'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
})

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-lora',
})

export const metadata = {
  description:
    "Hi, I'm Wichosu, I'm a web developer and I build open source projects. This is my personal website. Feel free to contact me if you need advice or want to build something.",
  title: 'Wichosu - Web Developer',
  twitter: {
    card: 'summary_large_image',
  },
  metadataBase: new URL(SITE_URL),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${fraunces.variable} ${lora.variable}`}>
      <head>
        <Script
          strategy="afterInteractive"
          src="https://umami.baulchino.com/script.js"
          data-website-id="c0d2abd8-9791-4883-a47a-1cb19f50c990"
        />
      </head>
      <body className="bg-base text-ink font-text flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-m focus:left-m focus:z-50 focus:border focus:border-accent focus:bg-surface focus:px-s focus:py-2xs focus:text-xs focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
