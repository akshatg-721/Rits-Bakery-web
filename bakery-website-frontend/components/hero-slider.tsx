'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const slides = [
  {
    src: '/images/hero-bg.jpg',
    alt: 'Handcrafted eggless brownies and loaf cakes by The Rits Baker Bangkok',
    headline: 'Food That Feels Like Home.',
    sub: 'Premium handcrafted eggless bakes delivered fresh across Bangkok.',
    cta: { label: 'Order Now', href: '/#menu' },
  },
  {
    src: '/images/curation_brownies.png',
    alt: 'Fudge brownies freshly baked by The Rits Baker',
    headline: 'Fudge Brownies Worth Every Bite.',
    sub: 'Rich, gooey, and 100% eggless — our bestselling box of 8.',
    cta: { label: 'View Brownies', href: '/#menu' },
  },
  {
    src: '/images/curation_middleeastern.png',
    alt: 'Golden baklava and kunafa by The Rits Baker',
    headline: 'Middle Eastern Magic.',
    sub: 'Baklava, Kunafa Dates, and Dubai Chocolates — made with love.',
    cta: { label: 'Explore Menu', href: '/#menu' },
  },
  {
    src: '/images/curation_teatime.png',
    alt: 'Tea-time classics — Date & Walnut cake by The Rits Baker',
    headline: 'The Perfect Tea-Time.',
    sub: 'Date & Walnut, Traditional Mawa Cake, and more comforting classics.',
    cta: { label: 'See All Cakes', href: '/#menu' },
  },
]

const AUTOPLAY_DELAY = 4500

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  // Track selected slide for dots
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  // Autoplay via interval
  useEffect(() => {
    if (!emblaApi) return
    const timer = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_DELAY)
    return () => clearInterval(timer)
  }, [emblaApi])

  return (
    <section aria-label="Hero image carousel" className="relative w-full">
      {/* ── Embla viewport ── */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative h-[420px] min-w-full shrink-0 lg:h-[620px]"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

              {/* Slide copy */}
              <div className="absolute inset-0 flex items-center px-8 sm:px-16 lg:px-24">
                <div className="max-w-lg">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
                    Handcrafted · Eggless · Bangkok
                  </p>
                  <h1 className="font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-6xl">
                    {slide.headline}
                  </h1>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80 sm:text-base">
                    {slide.sub}
                  </p>
                  <Link
                    href={slide.cta.href}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#006241] shadow-lg transition hover:bg-[#F9F9F9] hover:shadow-xl active:scale-[0.98]"
                  >
                    {slide.cta.label}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/35 lg:left-7 lg:size-12"
      >
        <ChevronLeft className="size-5 lg:size-6" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/35 lg:right-7 lg:size-12"
      >
        <ChevronRight className="size-5 lg:size-6" />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selectedIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/45'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
