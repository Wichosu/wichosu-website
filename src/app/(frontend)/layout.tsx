import React from 'react'
import './global.css'
import { Container } from './components/Container'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import Script from 'next/script'

export const metadata = {
  description:
    "Hi, I'm Wichosu, I'm a web developer and I build open source projects. This is my personal website. Feel free to contact me if you need advice or want to build something.",
  title: 'Wichosu - Web Developer',
  twitter: {
    card: 'summary_large_image',
  },
  metadataBase: new URL('https://www.wichosu.com/'),
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <Script
          defer
          src="https://umami.baulchino.com/script.js"
          data-website-id="c0d2abd8-9791-4883-a47a-1cb19f50c990"
        />
      </head>
      <body className="bg-gray-50">
        <Container>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Container>
      </body>
    </html>
  )
}
