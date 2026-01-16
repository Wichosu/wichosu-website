import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

export default function Page({ params }: Props) {
  return <div>Page {params.slug}</div>
}
