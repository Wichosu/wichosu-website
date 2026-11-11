import { ContentImage } from './ContentImage'

const plateColors = ['bg-olive', 'bg-rust', 'bg-slate'] as const

/** A stable colour per slug, so a book keeps its plate across visits. */
function plateColor(slug: string) {
  let hash = 0

  for (let index = 0; index < slug.length; index += 1) {
    hash = (hash + slug.charCodeAt(index)) % plateColors.length
  }

  return plateColors[hash]
}

type Props = {
  title: string
  slug: string
  author?: string | null
  image?: string | null
}

/** The cover itself: the CMS image when there is one, a typographic plate otherwise. */
export function BookPlate({ title, slug, author, image }: Props) {
  if (image) {
    return (
      <ContentImage
        src={image}
        alt={`Cover of ${title}`}
        width={600}
        height={800}
        wrapperClassName="aspect-[3/4] w-full overflow-hidden border border-line bg-surface"
        className="h-full w-full object-cover"
      />
    )
  }

  return (
    <div
      className={`flex aspect-[3/4] w-full flex-col justify-between border border-line p-m ${plateColor(slug)}`}
    >
      <span className="text-2xs tracking-[0.16em] text-[var(--color-base)] uppercase opacity-80">
        {author ?? 'Book review'}
      </span>
      <span className="font-display text-md leading-tight text-[var(--color-base)]">{title}</span>
      <span aria-hidden="true" className="h-px w-8 bg-[var(--color-base)] opacity-40" />
    </div>
  )
}
