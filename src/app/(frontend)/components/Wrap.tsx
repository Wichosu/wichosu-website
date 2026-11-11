import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * The only place the content width is applied. Everything inside inherits it;
 * a full-bleed section opts out with the left-1/2 / w-screen trick.
 */
export function Wrap({ children, className = '' }: Props) {
  return <div className={`mx-auto w-full max-w-wrap px-m ${className}`}>{children}</div>
}
