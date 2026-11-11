import { Button } from './components/Button'
import { Wrap } from './components/Wrap'

export default function NotFound() {
  return (
    <Wrap>
      <section className="py-3xl">
        <p className="text-2xs tracking-[0.2em] text-ink-3 uppercase">404</p>
        <h1 className="mt-2xs font-display text-3xl leading-none tracking-[-0.02em] text-ink">
          Page not found
        </h1>
        <p className="mt-s max-w-[46ch] text-md leading-[1.55] text-ink-2">
          The page you are looking for does not exist.
        </p>
        <Button as="link" href="/" padding="2" className="mt-m inline-block">
          Go home
        </Button>
      </section>
    </Wrap>
  )
}
