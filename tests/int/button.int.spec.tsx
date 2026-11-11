import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '@/app/(frontend)/components/Button'

describe('Button', () => {
  it('defaults to a non-submitting button', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button.getAttribute('type')).toBe('button')
    expect(button.className).toContain('bg-accent')
  })

  it('rejects a variant that is not part of the design system', () => {
    expect(() => render(<Button variant={'delete' as never}>Delete</Button>)).toThrow(/not allowed/)
  })

  it('disables the button for the disabled variant', () => {
    render(<Button variant="disabled">Nope</Button>)

    const button = screen.getByRole('button', { name: 'Nope' }) as HTMLButtonElement
    expect(button.disabled).toBe(true)
    expect(button.getAttribute('aria-disabled')).toBe('true')
  })
})
