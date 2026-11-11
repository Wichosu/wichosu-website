import type { HTMLAttributes, ReactNode, Ref } from 'react'

export type ButtonAllowedTags = 'link' | 'button'
export type ButtonVariant = 'primary' | 'disabled'
export type ButtonAllowedScale = 'none' | '1' | '2' | '3'
export type ButtonAllowedTarget = '_blank' | '_self' | '_parent' | '_top'
export type ButtonNativeType = 'button' | 'submit' | 'reset'

export type ButtonProps = {
  as?: ButtonAllowedTags
  href?: string
  target?: ButtonAllowedTarget
  /** Visual style. */
  variant?: ButtonVariant
  /** Native `<button>` type. Defaults to `"button"` so it never submits a form by accident. */
  type?: ButtonNativeType
  disabled?: boolean
  rel?: string
  padding?: ButtonAllowedScale
  margin?: ButtonAllowedScale
  rounded?: ButtonAllowedScale
  ref?: Ref<HTMLAnchorElement | HTMLButtonElement>
  children: ReactNode
} & HTMLAttributes<HTMLElement>
