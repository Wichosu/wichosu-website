import React from 'react'
import './global.css'
import { Container } from './components/Container'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Container>
          <main>{children}</main>
          <p>Footer</p>
        </Container>
      </body>
    </html>
  )
}
