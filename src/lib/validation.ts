const HTTP_URL = /^https?:\/\/\S+$/i
const IMAGE_SOURCE = /^(?:https?:\/\/|\/)\S*$/i

/** Accepts an absolute http(s) URL; empty values are left to `required`. */
export const validateHttpUrl = (value: unknown): true | string => {
  if (typeof value !== 'string' || value.trim() === '') return true
  return HTTP_URL.test(value.trim()) || 'Must be a valid http(s) URL'
}

/** Accepts an absolute http(s) URL or a site-relative path (`/logo.png`). */
export const validateImageSource = (value: unknown): true | string => {
  if (typeof value !== 'string' || value.trim() === '') return true
  return IMAGE_SOURCE.test(value.trim()) || 'Must be an absolute URL or a site-relative path'
}

/** Ratings are rendered with `'★'.repeat(rating)`, so they must be integers. */
export const validateRating = (value: unknown): true | string => {
  if (typeof value !== 'number') return 'Rating is required'
  return (
    (Number.isInteger(value) && value >= 1 && value <= 5) ||
    'Rating must be a whole number between 1 and 5'
  )
}
