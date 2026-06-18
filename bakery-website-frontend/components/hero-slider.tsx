'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'


const slides = [
  {
    src: '/gallery/IMG_8022.webp',
    alt: 'Handcrafted eggless brownies and loaf cakes by The Rits Baker Bangkok',
    tagline: 'Handcrafted · Eggless · Signature',
    headline: 'Dessert That Feels Like Home.',
    sub: 'A warm edit of signature brownies, loaf cakes, and handcrafted sweets.',
    primaryCta: { label: 'Order Now', href: '/menu' },
  },
  {
    src: '/menu/curation_brownies.webp',
    alt: 'Fudge brownies freshly baked by The Rits Baker',
    tagline: 'Baked Fresh Daily',
    headline: 'Fudge Brownies Worth Every Bite.',
    sub: 'Rich, gooey, and 100% eggless — our bestselling box of 8.',
    primaryCta: { label: 'View Brownies', href: '/menu?category=artisanal-brownies' },
  },
  {
    src: '/menu/curation_middleeastern.webp',
    alt: 'Golden baklava and kunafa by The Rits Baker',
    tagline: 'Premium Ingredients, Every Bite',
    headline: 'Middle Eastern Magic.',
    sub: 'Baklava, Kunafa Dates, and Dubai Chocolates crafted with premium ingredients.',
    primaryCta: { label: 'Explore Middle Eastern', href: '/menu?category=middle-eastern' },
  },
  {
    src: '/menu/curation_teatime.webp',
    alt: 'Tea-time classics — Date & Walnut cake by The Rits Baker',
    tagline: 'Tea-Time Indulgence',
    headline: 'The Perfect Tea-Time.',
    sub: 'Date & Walnut, Traditional Mawa Cake, and more comforting classics.',
    primaryCta: { label: 'View Premium Cakes', href: '/menu?category=premium-cakes' },
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
    <section aria-label="Hero image carousel" className="relative mt-0 w-full overflow-hidden pt-0">
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
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[2200ms] ease-out ${
                  i === selectedIndex ? 'scale-[1.06]' : 'scale-[1.02]'
                }`}
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/30 sm:to-transparent" />

              {/* Slide copy */}
              <div className="absolute inset-0 flex items-end px-5 pb-20 sm:items-center sm:px-16 sm:pb-0 lg:px-24">
                <div className="max-w-2xl animate-in fade-in-0 slide-in-from-bottom-3 duration-700">
                  <p className="text-[11px] font-semibold uppercase leading-relaxed tracking-[0.28em] text-white/75 sm:text-xs">
                    {slide.tagline}
                  </p>
                  <h1 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.02] text-white drop-shadow-sm md:text-5xl lg:mt-7 lg:text-6xl">
                    {slide.headline}
                  </h1>
                  <p className="mt-6 max-w-xl text-base leading-7 text-white/88 sm:text-lg sm:leading-8">
                    {slide.sub}
                  </p>
                  <Link
                    href={slide.primaryCta.href}
                    className="mt-7 inline-flex h-11 items-center justify-center gap-2.5 self-start whitespace-nowrap rounded-full bg-[#F8F1E7] px-5 text-[14px] font-medium tracking-[0.01em] text-[#3E2C23] shadow-[0_8px_22px_rgba(20,12,8,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FBF5EC] hover:shadow-[0_12px_28px_rgba(20,12,8,0.16)] active:translate-y-0 active:scale-[0.98] sm:mt-8 sm:h-12 sm:px-6"
                  >
                    <span>{slide.primaryCta.label}</span>
                    <ArrowRight className="size-3.5" strokeWidth={2.1} />
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
