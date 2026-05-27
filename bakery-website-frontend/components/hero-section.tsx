import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="bg-white px-6 py-20 sm:px-8 sm:py-24 lg:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="max-w-3xl font-serif text-4xl leading-tight text-[#111111] sm:text-5xl lg:text-6xl">
          Handcrafted Pastries &amp; Cakes in Bangkok
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
          Premium ingredients, beautiful flavors, and desserts made with a
          homemade heart.
        </p>

        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Button
            asChild
            className="h-12 w-full rounded-md bg-[#006241] px-8 text-white hover:bg-[#004F35] sm:w-auto"
          >
            <Link href="/#menu">Browse Menu</Link>
          </Button>

          <Button
            asChild
            className="h-12 w-full rounded-md border-[#006241] bg-transparent px-8 text-[#006241] hover:bg-[#006241] hover:text-white sm:w-auto"
            variant="outline"
          >
            <Link href="/our-story">Our Story</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
