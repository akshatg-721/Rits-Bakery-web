'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { getWhatsAppOrderUrl } from '@/lib/checkout'

const slides = [
  {
    src: '/gallery/IMG_8022.JPG',
    alt: 'Handcrafted eggless brownies and loaf cakes by The Rits Baker Bangkok',
    tagline: 'Handcrafted · Eggless · Bangkok',
    headline: 'Dessert That Feels Like Home.',
    sub: 'Premium handcrafted eggless bakes delivered fresh across Bangkok.',
    cta: { label: 'Order Now', href: getWhatsAppOrderUrl() },
  },
  {
    src: '/menu/curation_brownies.png',
    alt: 'Fudge brownies freshly baked by The Rits Baker',
    tagline: 'Freshly Baked Daily',
    headline: 'Fudge Brownies Worth Every Bite.',
    sub: 'Rich, gooey, and 100% eggless — our bestselling box of 8.',
    cta: { label: 'View Brownies', href: '/#menu' },
  },
  {
    src: '/menu/curation_middleeastern.png',
    alt: 'Golden baklava and kunafa by The Rits Baker',
    tagline: 'Premium Ingredients',
    headline: 'Middle Eastern Magic.',
    sub: 'Baklava, Kunafa Dates, and Dubai Chocolates — made with love.',
    cta: { label: 'Explore Menu', href: '/#menu' },
  },
  {
    src: '/menu/curation_teatime.png',
    alt: 'Tea-time classics — Date & Walnut cake by The Rits Baker',
    tagline: 'Delivered to Your Door',
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
    <section aria-label="Hero image carousel" className="relative w-full overflow-hidden">
      {/* ── Embla viewport ── */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative h-[520px] min-w-full shrink-0 sm:h-[560px] lg:h-[640px]"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="absolute inset-0 h-full w-full scale-[1.01] object-cover transition-transform duration-[1600ms] ease-out"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/30 sm:to-transparent" />

              {/* Slide copy */}
              <div className="absolute inset-0 flex items-end px-5 pb-20 sm:items-center sm:px-16 sm:pb-0 lg:px-24">
                <div className="max-w-lg animate-in fade-in-0 slide-in-from-bottom-3 duration-700">
                  <p className="mb-3 text-[11px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-white/80 sm:tracking-[0.25em]">
                    {slide.tagline}
                  </p>
                  <h1 className="font-serif text-4xl font-semibold leading-[1.04] text-white drop-shadow-sm md:text-5xl lg:text-6xl">
                    {slide.headline}
                  </h1>
                  <p className="mt-4 max-w-sm text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                    {slide.sub}
                  </p>
                  <Link
                    href={slide.cta.href}
                    target={slide.cta.href.startsWith('http') ? '_blank' : undefined}
                    rel={slide.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#006241] shadow-[0_12px_32px_rgb(0,0,0,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F9F9F9] hover:shadow-[0_18px_42px_rgb(0,0,0,0.18)] active:translate-y-0 active:scale-[0.98]"
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
        className="absolute left-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/20 text-white shadow-[0_8px_28px_rgb(0,0,0,0.14)] backdrop-blur-md transition-all duration-200 hover:bg-white/30 active:scale-[0.96] sm:flex lg:left-7 lg:size-12"
      >
        <ChevronLeft className="size-5 lg:size-6" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/20 text-white shadow-[0_8px_28px_rgb(0,0,0,0.14)] backdrop-blur-md transition-all duration-200 hover:bg-white/30 active:scale-[0.96] sm:flex lg:right-7 lg:size-12"
      >
        <ChevronRight className="size-5 lg:size-6" />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="flex size-11 items-center justify-center rounded-full transition active:scale-90"
          >
            <span
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex ? 'w-7 bg-white' : 'w-2 bg-white/45'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
