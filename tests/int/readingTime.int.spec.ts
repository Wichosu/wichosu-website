import { describe, expect, it } from 'vitest'

import { countWords, readingTime } from '@/app/(frontend)/lib/readingTime'

const paragraphs = (texts: string[]) => ({
  root: {
    children: texts.map((text) => ({
      type: 'paragraph',
      children: [{ type: 'text', text }],
    })),
  },
})

describe('readingTime', () => {
  it('handles empty content', () => {
    expect(countWords(null)).toBe(0)
    expect(countWords({})).toBe(0)
    expect(readingTime(null)).toBe('1 min read')
  })

  it('counts words across paragraphs', () => {
    expect(countWords(paragraphs(['one two three', 'four five']))).toBe(5)
  })

  it('walks nested nodes', () => {
    const data = {
      root: {
        children: [
          {
            type: 'list',
            children: [
              {
                type: 'listitem',
                children: [{ type: 'text', text: 'alpha beta' }],
              },
            ],
          },
        ],
      },
    }

    expect(countWords(data)).toBe(2)
  })

  it('rounds up to whole minutes', () => {
    const data = paragraphs([Array.from({ length: 201 }, () => 'word').join(' ')])
    expect(readingTime(data)).toBe('2 min read')
  })
})
