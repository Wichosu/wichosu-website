/**
 * Counts the words in a Lexical rich-text document by walking its text nodes.
 * Upload, relationship and line-break nodes carry no text, so they contribute
 * nothing.
 */
type LexicalNode = {
  text?: string
  children?: LexicalNode[]
}

function walk(node: LexicalNode, counter: { words: number }) {
  if (typeof node.text === 'string') {
    const words = node.text.trim().split(/\s+/).filter(Boolean)
    counter.words += words.length
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, counter)
  }
}

export function countWords(data: unknown): number {
  if (!data || typeof data !== 'object') return 0

  const root = (data as { root?: LexicalNode }).root
  if (!root) return 0

  const counter = { words: 0 }
  walk(root, counter)

  return counter.words
}

/** Reading time at 200 words per minute, never less than a minute. */
export function readingTime(data: unknown, wordsPerMinute = 200): string {
  const words = countWords(data)
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))

  return `${minutes} min read`
}
