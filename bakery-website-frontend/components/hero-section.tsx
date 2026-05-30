import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="w-full overflow-hidden bg-[#F9F9F9]">
      <div className="grid min-h-[88vh] grid-cols-1 lg:grid-cols-2">

        {/* ── Left Column: Brand Narrative ── */}
        <div className="flex flex-col justify-center px-4 py-12 sm:p-12 lg:p-20 xl:p-28">

          {/* Eyebrow label */}
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#006241]">
            Handcrafted · Eggless · Bangkok
          </p>

          {/* H1 Headline */}
          <h1 className="font-serif text-4xl font-semibold leading-[1.08] text-[#111111] sm:text-5xl lg:text-6xl xl:text-7xl">
            Dessert That Feels Like Home.
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-md text-base leading-7 text-[#555555] sm:text-lg sm:leading-8">
            Premium handcrafted eggless desserts, signature fudge brownies, and fresh daily loaves baked with love in Bangkok.
          </p>

          {/* Badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {['100% Eggless', 'Pre-order 24 hrs', 'Delivery Only'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#006241]/20 bg-[#006241]/5 px-3.5 py-1.5 text-xs font-medium text-[#006241]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              className="min-h-12 rounded-md bg-[#006241] px-8 text-sm font-semibold text-white shadow-[0_10px_24px_rgb(0,98,65,0.16)] transition hover:-translate-y-0.5 hover:bg-[#004F35] hover:shadow-[0_14px_32px_rgb(0,98,65,0.2)] active:translate-y-0 active:scale-[0.98]"
            >
              <Link href="/#menu">View Menu</Link>
            </Button>

            <Link
              href="/our-story"
              className="inline-flex min-h-12 items-center justify-center rounded-md px-6 text-sm font-semibold text-[#006241] transition hover:bg-[#006241]/5 hover:underline hover:underline-offset-4 active:scale-[0.98]"
            >
              Our Story →
            </Link>
          </div>

          {/* Social proof strip */}
          <div className="mt-8 flex items-center gap-4 border-t border-gray-200 pt-6 lg:mt-12 lg:pt-8">
            <div className="flex -space-x-2">
              {/* Avatar placeholders using initials */}
              {['R', 'P', 'A'].map((initial) => (
                <div
                  key={initial}
                  className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-[#006241]/15 text-xs font-semibold text-[#006241]"
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="text-sm text-[#555555]">
              <span className="font-semibold text-[#111111]">200+</span> happy orders this month
            </p>
          </div>
        </div>

        {/* ── Right Column: Hero Image ── */}
        <div className="relative min-h-[300px] overflow-hidden sm:min-h-[400px] lg:min-h-full">
          <img
            src="/gallery/IMG_8022.JPG"
            alt="Handcrafted brownies, loaf cakes, and kunafa pastries by The Rits Baker"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Subtle gradient overlay at the bottom for polish */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

      </div>
    </section>
  )
}
