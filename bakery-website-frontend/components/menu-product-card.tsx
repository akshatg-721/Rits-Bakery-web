'use client'

import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'

import type { MenuProduct } from '@/lib/menu-data'
import { highlightText } from '@/lib/search-engine'

/** Splits "Blueberry Muffins (Pack of 2)" → ["Blueberry Muffins", "(Pack of 2)"] */
function splitProductName(name: string): { base: string; qualifier: string | null } {
  const idx = name.indexOf('(')
  if (idx === -1) return { base: name, qualifier: null }
  return {
    base: name.slice(0, idx).trim(),
    qualifier: name.slice(idx).trim(),
  }
}

interface MenuProductCardProps {
  product: MenuProduct
  headingLevel?: 'h3' | 'h4'
  showEgglessLabel?: boolean
  /** When provided the product name is rendered with highlighted matching segments */
  searchQuery?: string
  onAddToCart: (product: MenuProduct) => void
}

function HighlightedProductName({ name, query }: { name: string; query: string }) {
  const segments = highlightText(name, query)
  return (
    <>
      {segments.map((seg, i) =>
        seg.highlight ? (
          <mark
            key={i}
            style={{
              background: 'none',
              color: '#006241',
              fontWeight: 700,
              padding: 0,
            }}
          >
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  )
}

export function MenuProductCard({
  product,
  headingLevel = 'h3',
  showEgglessLabel = true,
  searchQuery,
  onAddToCart,
}: MenuProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const Heading = headingLevel
  const isVegan =
    product.name.toLowerCase().includes('vegan') || Boolean(product.vegan)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart(product)
    setIsAdded(true)
    window.setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <article className="group">
      {/* Image + overlaid cart buttons */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

        {/* Badges */}
        {product.isTopSeller && (
          <span
            className={`absolute left-2 z-10 bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-black backdrop-blur-sm ${
              product.isHighProtein ? 'top-8' : 'top-3'
            }`}
          >
            Top Seller
          </span>
        )}
        {product.isHighProtein && (
          <div className="absolute left-2 top-2 z-10">
            <span className="rounded-sm bg-[#2a3c24] px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-white shadow-sm backdrop-blur-md">
              High Protein
            </span>
          </div>
        )}
        {isVegan && (
          <div className="absolute right-2 top-2 z-10">
            <span className="rounded-sm bg-[#2a3c24] px-2 py-1 text-[9px] font-semibold uppercase tracking-widest text-white shadow-sm backdrop-blur-md">
              Vegan
            </span>
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Mobile: icon button */}
        <button
          type="button"
          aria-label={isAdded ? `${product.name} added to cart` : `Add ${product.name} to cart`}
          id={`add-to-cart-btn-mobile-${product.id}`}
          className={`absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-colors sm:hidden ${
            isAdded
              ? 'bg-zinc-900 text-white'
              : 'bg-white/90 text-black hover:bg-zinc-900 hover:text-white'
          }`}
          onClick={handleAddToCart}
        >
          <ShoppingBag className="size-4" />
        </button>

        {/* Desktop: slide-up full-width bar */}
        <button
          type="button"
          id={`add-to-cart-btn-desktop-${product.id}`}
          aria-label={isAdded ? `${product.name} added to cart` : `Add ${product.name} to cart`}
          className={`absolute inset-x-0 bottom-0 hidden min-h-12 items-center justify-center px-4 text-center shadow-[0_8px_20px_rgb(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006241] focus-visible:ring-offset-2 sm:flex sm:translate-y-full sm:group-hover:translate-y-0 sm:focus-visible:translate-y-0 ${
            isAdded ? 'bg-[#2a3c24]' : 'bg-[#111111]/90 hover:bg-[#006241]'
          }`}
          onClick={handleAddToCart}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
            {isAdded ? 'Added ✓' : 'Add to Cart'}
          </span>
        </button>
      </div>

      {/* Info below image */}
      <div className="mt-3 flex flex-col items-center px-1.5 text-center md:mt-4 md:px-1">
        {showEgglessLabel && (
          <span className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            Eggless
          </span>
        )}
        <Heading className="mb-1 text-base font-medium leading-snug text-gray-900">
          {(() => {
            const { base, qualifier } = splitProductName(product.name)
            if (searchQuery) {
              return qualifier ? (
                <>
                  <HighlightedProductName name={base} query={searchQuery} />
                  <span className="block whitespace-nowrap">
                    <HighlightedProductName name={qualifier} query={searchQuery} />
                  </span>
                </>
              ) : (
                <HighlightedProductName name={base} query={searchQuery} />
              )
            }
            return qualifier ? (
              <>
                {base}
                <span className="block whitespace-nowrap">{qualifier}</span>
              </>
            ) : (
              base
            )
          })()}
        </Heading>
        {product.tags && product.tags.length > 0 && (() => {
          // Tags already shown as image overlays — exclude them from the pill list.
          const overlayTags = new Set<string>()
          if (product.isHighProtein) overlayTags.add('High Protein')
          if (isVegan) overlayTags.add('Vegan')
          const pillTags = product.tags.filter((t) => !overlayTags.has(t))
          return pillTags.length > 0 ? (
            <div className="mt-2 flex flex-wrap justify-center gap-1.5">
              {pillTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#111111] shadow-[0_2px_8px_rgb(0,0,0,0.04)] ring-1 ring-black/5 sm:text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null
        })()}
        <p className="mt-2 text-base font-medium text-gray-600">
          {product.price}
        </p>
      </div>
    </article>
  )
}
