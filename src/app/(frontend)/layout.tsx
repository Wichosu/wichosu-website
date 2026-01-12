import React from 'react'
import './global.css'
import { Container } from './components/Container'
// import { Navbar } from './components/Navbar'

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
      <body className="bg-gray-50">
        <Container>
          {/* <Navbar /> */}
          <main>{children}</main>
        </Container>
      </body>
    </html>
  )
}
