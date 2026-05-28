'use client'

import { useState, useCallback, useEffect } from 'react'
import { X } from 'lucide-react'

/* ─── Gallery image data ─── */
const galleryImages = [
  { src: '/gallery/00f69aa4-35f7-4651-a475-f780ce56225b.JPG', alt: 'Gallery Photo 1' },
  { src: '/gallery/125666b5-96a0-4eeb-8db3-02d2eb4e83e2.JPG', alt: 'Gallery Photo 2' },
  { src: '/gallery/12c85dc1-6a1a-427c-af83-c37acd7d70e8.JPG', alt: 'Gallery Photo 3' },
  { src: '/gallery/1e80a24d-813e-47ec-86c8-d90be89bda40.JPG', alt: 'Gallery Photo 4' },
  { src: '/gallery/4671eb65-cca1-46d7-8a2f-431d5e664fb2.JPG', alt: 'Gallery Photo 5' },
  { src: '/gallery/4819f82b-4ad0-4db3-adcc-ef7e46efa60b.JPG', alt: 'Gallery Photo 6' },
  { src: '/gallery/4e54123b-455b-42c5-b63a-f51582e6d503.JPG', alt: 'Gallery Photo 7' },
  { src: '/gallery/53931fcc-2305-44cf-a409-346540c999ae.JPG', alt: 'Gallery Photo 8' },
  { src: '/gallery/6413cd84-563f-48ac-a472-5d11e09c198f.JPG', alt: 'Gallery Photo 9' },
  { src: '/gallery/7seed_mukhwas.JPG', alt: '7 Seed Mukhwas' },
  { src: '/gallery/8a84770c-a3c8-4527-83fb-98f9aa69ea1e 2.JPG', alt: 'Gallery Photo 10' },
  { src: '/gallery/a0239ba0-5acd-42f5-a377-33b12b0da1c0.JPG', alt: 'Gallery Photo 11' },
  { src: '/gallery/b02f6e11-48a9-402f-b3ee-13e42fbfec1c.JPG', alt: 'Gallery Photo 12' },
  { src: '/gallery/Banana_cake.JPG', alt: 'Banana Cake' },
  { src: '/gallery/Biscoff_Truffles.JPG', alt: 'Biscoff Truffles' },
  { src: '/gallery/Chessy_Cashwes.JPG', alt: 'Cheesy Cashews' },
  { src: '/gallery/d20cdbf0-c6e2-4a19-8ea2-18300cc33d97.JPG', alt: 'Gallery Photo 13' },
  { src: '/gallery/d5a9ce7f-0127-4fc5-bec7-7c66dc2d80ed.JPG', alt: 'Gallery Photo 14' },
  { src: '/gallery/d66e7dcc-f93c-44ab-9de6-3f5047ec46b6.JPG', alt: 'Gallery Photo 15' },
  { src: '/gallery/daa2a85f-c0ca-4da1-a953-a4cbbd0b7448.JPG', alt: 'Gallery Photo 16' },
  { src: '/gallery/Dubai_Choclaates.JPG', alt: 'Dubai Chocolates' },
  { src: '/gallery/Dubai_Choclates.JPG', alt: 'Dubai Chocolates' },
  { src: '/gallery/e7ba6dd9-da45-4416-9711-fd2ed0c5ac2d.JPG', alt: 'Gallery Photo 17' },
  { src: '/gallery/eea23324-fcc9-4ee9-80d6-bcc75f82bbcc.JPG', alt: 'Gallery Photo 18' },
  { src: '/gallery/Fuzzy_Brownie.JPG', alt: 'Fudge Brownie' },
  { src: '/gallery/IMG_8022.JPG', alt: 'Gallery Photo 19' },
  { src: '/gallery/Kunafa_Dates.JPG', alt: 'Kunafa Dates' },
  { src: '/gallery/Pizza_Spanish_muffins.JPG', alt: 'Pizza Spinach Muffins' },
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
