'use client'

import { useState, useCallback, useEffect } from 'react'
import { X } from 'lucide-react'

import { Newsletter } from '@/components/newsletter'

/* ─── Gallery image data ─── */
const galleryImages = [
  { src: '/gallery/00f69aa4-35f7-4651-a475-f780ce56225b.JPG', alt: 'Assorted eggless desserts on a wooden platter', caption: 'Dessert Platter' },
  { src: '/gallery/125666b5-96a0-4eeb-8db3-02d2eb4e83e2.JPG', alt: 'Freshly baked chocolate loaf cake', caption: 'Chocolate Loaf' },
  { src: '/gallery/12c85dc1-6a1a-427c-af83-c37acd7d70e8.JPG', alt: 'Classic Nankhatai cookies on parchment paper', caption: 'Nankhatai Cookies' },
  { src: '/gallery/1e80a24d-813e-47ec-86c8-d90be89bda40.JPG', alt: 'Premium eggless cake with buttercream frosting', caption: 'Premium Buttercream Cake' },
  { src: '/gallery/4819f82b-4ad0-4db3-adcc-ef7e46efa60b.JPG', alt: 'Artisanal brownie stack with chocolate drizzle', caption: 'Fudge Brownies' },
  { src: '/gallery/4e54123b-455b-42c5-b63a-f51582e6d503.JPG', alt: 'Signature cinnamon rolls with glaze', caption: 'Cinnamon Rolls' },
  { src: '/gallery/53931fcc-2305-44cf-a409-346540c999ae.JPG', alt: 'Blueberry cheesecake crumble tub', caption: 'Blueberry Cheesecake' },
  { src: '/gallery/7seed_mukhwas.JPG', alt: '7 Seed Mukhwas', caption: '7 Seed Mukhwas' },
  { src: '/gallery/a0239ba0-5acd-42f5-a377-33b12b0da1c0.JPG', alt: 'Baked goods arrangement with fresh flowers', caption: 'Bake Spread' },
  { src: '/gallery/b02f6e11-48a9-402f-b3ee-13e42fbfec1c.JPG', alt: 'Rich chocolate truffle cake', caption: 'Chocolate Truffle Cake' },
  { src: '/gallery/Biscoff_Truffles.JPG', alt: 'Biscoff Truffles', caption: 'Biscoff Truffles' },
  { src: '/gallery/Chessy_Cashwes.JPG', alt: 'Cheesy Cashews', caption: 'Cheesy Cashews' },
  { src: '/gallery/Dates_walnut_cake.jpeg', alt: 'Date and Walnut Cake', caption: 'Date & Walnut Cake' },
  { src: '/gallery/Dubai_Chocolates.JPG', alt: 'Dubai Chocolate Bars with kunafa filling', caption: 'Dubai Chocolate Bars' },
  { src: '/gallery/Fuzzy_Brownie.JPG', alt: 'Fudge Brownie', caption: 'Fudge Brownies' },
  { src: '/gallery/IMG_8022.JPG', alt: 'Signature bakes spread from The Rits Baker', caption: 'Our Signature Bakes' },
  { src: '/gallery/Kunafa_Dates.JPG', alt: 'Kunafa Dates', caption: 'Kunafa Dates' },
  { src: '/gallery/Pizza_Spanish_muffins.JPG', alt: 'Pizza Spinach Muffins', caption: 'Pizza Muffins' },
  { src: '/gallery/d5a9ce7f-0127-4fc5-bec7-7c66dc2d80ed.JPG', alt: 'Tiramisu crumble tub with cocoa dusting', caption: 'Tiramisu Crumble' },
  { src: '/gallery/d66e7dcc-f93c-44ab-9de6-3f5047ec46b6.JPG', alt: 'Mango crumble cake with seasonal fruit', caption: 'Mango Crumble Cake' },
  { src: '/gallery/daa2a85f-c0ca-4da1-a953-a4cbbd0b7448.JPG', alt: 'Fresh orange loaf with citrus zest', caption: 'Orange Loaf' },
  { src: '/gallery/e7ba6dd9-da45-4416-9711-fd2ed0c5ac2d.JPG', alt: 'Almond and oats choco chip cookies', caption: 'Almond Oat Cookies' },
  { src: '/gallery/eea23324-fcc9-4ee9-80d6-bcc75f82bbcc.JPG', alt: 'Premium strawberry cheesecake', caption: 'Strawberry Cheesecake' },
  { src: '/gallery/biscoff_crumble_cheesecake_tub.jpeg', alt: 'Biscoff Crumble Cheesecake Tub', caption: 'Biscoff Crumble' },
  { src: '/gallery/cocout_cookies.jpeg', alt: 'Coconut Cookies', caption: 'Coconut Cookies' },
  { src: '/gallery/gluten_free_nuts_cookies.jpeg', alt: 'Gluten Free Nuts Cookies', caption: 'Gluten-Free Nuts Cookies' },
  { src: '/gallery/mango_crumble_tub_set.jpeg', alt: 'Mango Crumble Tub Set', caption: 'Mango Crumble Tubs' },
  { src: '/gallery/rose_pistacho_cake.jpeg', alt: 'Rose and Pistachio Cake', caption: 'Rose & Pistachio Cake' },
  { src: '/gallery/spinach_muffins.jpeg', alt: 'Spinach Muffins', caption: 'Spinach Muffins' },
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
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8]">
      <section className="px-4 py-20 sm:px-6 sm:py-32">
        {/* ── Header ── */}
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-serif text-4xl italic leading-tight text-[#111111] sm:text-5xl lg:text-6xl">
            From Our Kitchen
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base italic leading-7 text-gray-500">
            Real bakes, real ingredients, unedited moments.
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-[#111111]/20 sm:mt-10" />
        </div>

        {/* ── Masonry Grid ── */}
        <div className="mx-auto mt-8 max-w-7xl columns-2 gap-4 space-y-4 px-0 sm:px-4 md:columns-3 lg:columns-4">
          {galleryImages.map((image, index) => (
            <button
              type="button"
              key={image.src}
              className="group relative block w-full cursor-pointer overflow-hidden break-inside-avoid rounded-2xl bg-gray-100 text-left shadow-[0_8px_24px_rgb(0,0,0,0.06)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgb(0,0,0,0.09)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006241]/40"
              onClick={() => setLightboxIndex(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Scrim (Always Visible) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              
              {/* Caption (Always Visible) */}
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <span className="text-white text-sm font-medium leading-tight">
                  {image.caption}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <Newsletter />

      {/* ── Lightbox Modal ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 backdrop-blur-md"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            aria-label="Close lightbox"
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white/75 shadow-[0_8px_24px_rgb(0,0,0,0.2)] backdrop-blur-md transition-all hover:bg-white/15 hover:text-white active:scale-[0.96] sm:right-5 sm:top-5"
            onClick={closeLightbox}
          >
            <X className="size-6" />
          </button>

          {/* Image */}
          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-h-[82vh] max-w-full rounded-md object-contain shadow-[0_24px_80px_rgb(0,0,0,0.35)] sm:max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Caption */}
          <p className="absolute bottom-6 left-0 w-full px-6 text-center text-base tracking-wide text-white/70 sm:text-sm">
            {galleryImages[lightboxIndex].caption}
          </p>
        </div>
      )}
    </main>
  )
}
