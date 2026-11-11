type Props = {
  rating: number
  className?: string
}

/** Visual rating; the accessible value lives on the wrapper. */
export function Stars({ rating, className = '' }: Props) {
  const value = Math.max(1, Math.min(5, Math.round(rating)))

  return (
    <span
      role="img"
      aria-label={`${value} out of 5`}
      className={`inline-flex gap-[0.12em] text-xs leading-none ${className}`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className={index < value ? 'text-accent' : 'text-line'}
        >
          ★
        </span>
      ))}
    </span>
  )
}
