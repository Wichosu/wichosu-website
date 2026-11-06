import Image from 'next/image'

type Props = {
  src?: string | null
  alt: string
  width?: number
  height?: number
  /** Classes for the `<img>` element. */
  className?: string
  /** Classes for the wrapper `<div>`. */
  wrapperClassName?: string
  fallbackSrc?: string
  priority?: boolean
}

/**
 * Renders CMS images, which are free-text URLs from arbitrary hosts. `unoptimized`
 * skips Next's remote-pattern validation (and its optimizer) so authoring any
 * image host keeps working.
 */
export function ContentImage({
  src,
  alt,
  width = 500,
  height = 500,
  className,
  wrapperClassName,
  fallbackSrc = '/logo.png',
  priority = false,
}: Props) {
  return (
    <div className={wrapperClassName}>
      <Image
        src={src || fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        unoptimized
      />
    </div>
  )
}
