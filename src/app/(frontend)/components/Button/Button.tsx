'use client'

import React from 'react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import { ButtonAllowedScale, ButtonAllowedTags, ButtonProps, ButtonVariant } from './Button.types'

const allowedTags: ButtonAllowedTags[] = ['link', 'button']
const allowedVariants: ButtonVariant[] = ['primary', 'disabled']

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-[var(--color-base)] cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
  disabled: 'bg-line text-ink-3 cursor-not-allowed',
}

const paddingClass: Record<ButtonAllowedScale, string> = {
  none: 'px-0 py-0',
  '1': 'px-2 py-1',
  '2': 'px-m py-s',
  '3': 'px-xl py-m',
}

const marginClass: Record<ButtonAllowedScale, string> = {
  none: 'm-0',
  '1': 'm-2',
  '2': 'm-4',
  '3': 'm-6',
}

const roundedClass: Record<ButtonAllowedScale, string> = {
  none: 'rounded-none',
  '1': 'rounded-none',
  '2': 'rounded-none',
  '3': 'rounded-none',
}

export function Button({
  as: Tag = 'button',
  href = '',
  target = '_self',
  variant = 'primary',
  type = 'button',
  padding = '2',
  margin = 'none',
  rounded = 'none',
  disabled = false,
  rel,
  children,
  ref,
  className,
  onClick,
  ...props
}: ButtonProps) {
  if (!allowedTags.includes(Tag)) {
    throw new Error(
      `Tag ${Tag} is not allowed. The tags that are allowed are: ${allowedTags.join(', ')}`,
    )
  }

  if (!allowedVariants.includes(variant)) {
    throw new Error(
      `Variant ${variant} is not allowed. The variants that are allowed are: ${allowedVariants.join(', ')}`,
    )
  }

  if (Tag === 'link' && !href) {
    throw new Error('href is required when as is link')
  }

  if (Tag === 'button' && href) {
    throw new Error('href is not allowed when as is button')
  }

  const isDisabled = disabled || variant === 'disabled'

  const mergedClassName = twMerge(
    `${variantClass[variant]} ${paddingClass[padding]} ${marginClass[margin]} ${roundedClass[rounded]} whitespace-nowrap text-xs tracking-[0.14em] uppercase`,
    className,
  )

  if (Tag === 'link') {
    return (
      <Link
        {...props}
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : undefined}
        onClick={(event) => {
          if (isDisabled) {
            event.preventDefault()
            return
          }
          onClick?.(event)
        }}
        className={mergedClassName}
        ref={ref as React.Ref<HTMLAnchorElement> | undefined}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      onClick={onClick}
      className={mergedClassName}
      ref={ref as React.Ref<HTMLButtonElement> | undefined}
    >
      {children}
    </button>
  )
}
