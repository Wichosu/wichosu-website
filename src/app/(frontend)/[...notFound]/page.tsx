import { notFound } from 'next/navigation'

// Unmatched URLs fall through to the nearest not-found.tsx in this route group,
// so every 404 renders the designed page instead of Next's default.
export default function CatchAllPage() {
  notFound()
}
