import React from 'react'
import { NavigationMenu } from 'radix-ui'

type Props = {
  children: React.ReactNode
}

export function NavbarContent({ children }: Props) {
  const contentClassName = `
    absolute left-0 top-0 w-full
    bg-slate-200
    data-[motion=from-end]:animate-in data-[motion=from-end]:slide-in-from-right-2
    data-[motion=from-start]:animate-in data-[motion=from-start]:slide-in-from-left-2
    data-[motion=to-end]:animate-out data-[motion=to-end]:slide-out-to-right-2
    data-[motion=to-start]:animate-out data-[motion=to-start]:slide-out-to-left-2
    sm:w-auto
  `

  const ulClassName = `m-0 grid list-none gap-x-2.5 p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3`

  return (
    <NavigationMenu.Content className={contentClassName}>
      <ul className={ulClassName}>{children}</ul>
    </NavigationMenu.Content>
  )
}
