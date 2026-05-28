'use client'

import { useState, useCallback, useEffect } from 'react'
import { X } from 'lucide-react'

/* ─── Gallery image data ─── */
const galleryImages = [
  { src: '/images/carrot_loaf.jpeg', alt: 'Orange & Carrot Loaf' },
  { src: '/images/mocha_brownie.jpeg', alt: 'Mocha Brownies' },
  { src: '/images/khunafa_dates.jpeg', alt: 'Kunafa Dates' },
  { src: '/images/double_choco_cookies.jpeg', alt: 'Double Choco Cookies' },
  { src: '/images/dates_walnut_cake.jpeg', alt: 'Date & Walnut Cake' },
  { src: '/images/pizza_muffins.jpeg', alt: 'Savoury Muffins' },
  { src: '/images/raggi_cookies.jpeg', alt: 'Ragi Cookies' },
  { src: '/images/red_valvet_cake.jpeg', alt: 'Red Velvet Cake' },
  { src: '/images/traditional_mawa_cake.jpeg', alt: 'Traditional Mawa Cake' },
  { src: '/images/kunafa_dubai_choclate_bars.jpeg', alt: 'Kunafa & Dubai Chocolate Bars' },
  { src: '/images/hero-bg.jpg', alt: 'Assorted bakes from our kitchen' },
]

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  /* Close on Escape key */
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, closeLightbox])

  /* Prevent body scroll when lightbox is open */
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-24 sm:px-6 sm:py-32">
      {/* ── Header ── */}
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="font-serif text-5xl italic text-[#111111] sm:text-6xl">
          From Our Kitchen
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base italic leading-relaxed text-gray-500">
          Real bakes, real ingredients, unedited moments.
        </p>
        <div className="mx-auto mt-10 h-px w-16 bg-[#111111]/20" />
      </div>

      {/* ── Masonry Grid ── */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-6 space-y-3 md:space-y-6 max-w-7xl mx-auto px-4 mt-8">
        {galleryImages.map((image, index) => (
          <div
            key={image.src}
            className="group relative cursor-pointer overflow-hidden break-inside-avoid rounded-sm"
            onClick={() => setLightboxIndex(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Hover overlay with caption */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-full px-5 pb-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-sm font-medium tracking-wide text-white">
                {image.alt}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Lightbox Modal ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            aria-label="Close lightbox"
            className="absolute right-5 top-5 z-10 flex size-10 items-center justify-center text-white/70 transition-colors hover:text-white"
            onClick={closeLightbox}
          >
            <X className="size-6" />
          </button>

          {/* Image */}
          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Caption */}
          <p className="absolute bottom-6 left-0 w-full text-center text-sm tracking-wide text-white/60">
            {galleryImages[lightboxIndex].alt}
          </p>
        </div>
      )}
    </main>
  )
}
