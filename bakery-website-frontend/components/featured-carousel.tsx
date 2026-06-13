'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { MenuProductCard } from '@/components/menu-product-card'
import { useCart } from '@/lib/cart-context'
import { menuProducts, type MenuProduct } from '@/lib/menu-data'

// ─── Curated featured item IDs ────────────────────────────────────────────────
// Hand-picked for visual variety and category spread.
const FEATURED_IDS = [
  'premium-biscoff-cheese-cake',      // Premium Cakes — top seller
  'fudge-brownies',                   // Brownies — top seller
  'gluten-free-nuts-cake-ekadashi',   // Premium Cakes — requested inclusion
  'dubai-chocolates',                 // Middle Eastern — luxury item
  'nuts-biscoff-brownies',            // Brownies — premium indulgence
  'kunafa-dates-pack-of-6',           // Middle Eastern — top seller
]

const featuredProducts: MenuProduct[] = FEATURED_IDS.flatMap((id) => {
  const found = menuProducts.find((p) => p.id === id)
  return found ? [found] : []
})

// ─────────────────────────────────────────────────────────────────────────────

export function FeaturedCarousel() {
  const { addItem } = useCart()

  const handleAddToCart = (product: MenuProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.numericPrice,
      displayPrice: product.price,
      description: product.description,
      image: product.image,
      vegan: product.vegan,
    })
  }

  return (
    <section
      id="featured"
      aria-label="Featured products"
      className="overflow-hidden px-4 py-10 sm:px-6 md:py-14 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Section header ── */}
        <div className="mb-7 flex items-end justify-between md:mb-8">
          <div>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-[#006241]">
              Handpicked for you
            </p>
            <h2 className="font-serif text-2xl italic leading-tight text-[#111111] sm:text-3xl lg:text-4xl">
              Signature Bakes
            </h2>
          </div>

          <Link
            href="/menu"
            className="group flex items-center gap-1.5 text-sm font-medium text-[#006241] transition-colors hover:text-[#004F35]"
          >
            View All
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ── Carousel track ── */}
        {/*
          Layout rationale:
          - Mobile: cards are w-[72vw] so the 2nd card "peeks" ~28vw into view.
          - Tablet (sm): w-[46vw] shows ~2 cards + a peek.
          - Desktop (md+): w-56 / lg:w-64 fixed width in a non-overflowing grid feel.
          - snap-x + snap-mandatory = precise, swipeable feel.
          - scrollbar-none (utility defined in globals.css) hides native scrollbar.
        */}
        <div
          className="-mx-4 flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-4
                     no-scrollbar scrollbar-none
                     gap-4 pb-4
                     sm:-mx-6 sm:px-6
                     lg:-mx-8 lg:px-8"
        >
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="w-[72vw] flex-none snap-start
                         sm:w-[44vw]
                         md:w-56
                         lg:w-64"
            >
              <MenuProductCard
                product={product}
                headingLevel="h3"
                showEgglessLabel={false}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}

          {/* Trailing spacer so the last card doesn't sit flush against the edge */}
          <div className="w-4 flex-none sm:w-6 lg:w-8" aria-hidden="true" />
        </div>

        {/* ── Scroll hint dots (decorative, no interaction) ── */}
        <div className="mt-5 flex items-center justify-center gap-1.5 md:hidden" aria-hidden="true">
          {featuredProducts.map((_, i) => (
            <span
              key={i}
              className={`block h-1 rounded-full bg-[#006241] transition-all duration-300 ${
                i === 0 ? 'w-4 opacity-100' : 'w-1.5 opacity-25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
