import { Button } from './components/Button'

export default function NotFound() {
  return (
    <section className="flex flex-col items-center gap-4 my-16 text-center">
      <h1 className="text-4xl font-medium">Page not found</h1>
      <p className="text-lg text-gray-600">The page you are looking for does not exist.</p>
      <Button as="link" href="/">
        Go home
      </Button>
    </section>
  )
}
