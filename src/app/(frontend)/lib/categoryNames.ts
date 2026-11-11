import type { Category } from '@/payload-types'

type CategoryValue = (number | Category)[] | null | undefined

/** Turns a relationship field into display names, ignoring unpopulated IDs. */
export function categoryNames(category: CategoryValue): string[] {
  if (!Array.isArray(category)) return []

  return category.flatMap((item) =>
    typeof item === 'object' && item !== null && 'name' in item ? [item.name] : [],
  )
}
