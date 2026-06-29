'use client'

import { useState } from 'react'
import { ChevronRight, ShoppingBag } from 'lucide-react'

import type { MenuProduct } from '@/lib/menu-data'
import { highlightText } from '@/lib/search-engine'

const HINT_KEY = 'rits:dietary-hint-seen'

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
            style={{ background: 'none', color: '#006241', fontWeight: 700, padding: 0 }}
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

/** Builds a deduplicated dietary/allergen list for the expandable section. */
function buildDietaryRows(product: MenuProduct, isVegan: boolean): string[] {
  const seen = new Set<string>()
  const rows: string[] = []
  const add = (label: string) => {
    const key = label.toLowerCase()
    if (!seen.has(key)) { seen.add(key); rows.push(label) }
  }
  if (product.isHighProtein) add('High Protein')
  if (isVegan) add('Vegan')
  for (const tag of product.tags ?? []) add(tag)
  return rows
}

export function MenuProductCard({
  product,
  headingLevel = 'h3',
  showEgglessLabel = false,
  searchQuery,
  onAddToCart,
}: MenuProductCardProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const Heading = headingLevel
  const isVegan = product.name.toLowerCase().includes('vegan') || Boolean(product.vegan)
  const dietaryRows = buildDietaryRows(product, isVegan)
  const hasDietaryInfo = dietaryRows.length > 0
  const expandId = `dietary-info-${product.id}`

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart(product)
    setIsAdded(true)
    window.setTimeout(() => setIsAdded(false), 2000)
  }

  const handleToggle = () => {
    setIsExpanded((prev) => {
      const next = !prev
      // On first-ever expand anywhere on the site, mark the hint as seen
      if (next && typeof window !== 'undefined' && !localStorage.getItem(HINT_KEY)) {
        localStorage.setItem(HINT_KEY, '1')
        window.dispatchEvent(new CustomEvent('rits:dietary-first-expand'))
      }
      return next
    })
  }

  return (
    <article className="group flex flex-col">
      {/* ── Image + overlaid cart buttons ─────────────────────────────── */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

        {/* Image overlay badges — unchanged */}
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
            isAdded ? 'bg-zinc-900 text-white' : 'bg-white/90 text-black hover:bg-zinc-900 hover:text-white'
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

      {/* ── Info below image ──────────────────────────────────────────── */}
      <div className="mt-3 flex flex-col items-center px-1.5 text-center md:mt-4 md:px-1">
        {showEgglessLabel && (
          <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
            Eggless
          </span>
        )}

        {/* ── Product name — centered, untouched, no controls beside it ── */}
        <Heading className="text-base font-medium leading-snug text-gray-900">
          {searchQuery
            ? <HighlightedProductName name={product.name} query={searchQuery} />
            : product.name
          }
        </Heading>

        {/* Package label — unchanged styling, centered */}
        {product.packageLabel && (
          <span className="mt-0.5 block text-[10px] font-medium leading-none tracking-[0.12em] text-stone-400">
            {product.packageLabel}
          </span>
        )}

        {/* ── Expandable dietary checklist — CSS grid accordion ────────── */}
        {hasDietaryInfo && (
          <div
            id={expandId}
            role="region"
            aria-label="Dietary information"
            className="w-full overflow-hidden"
            style={{
              display: 'grid',
              gridTemplateRows: isExpanded ? '1fr' : '0fr',
              opacity: isExpanded ? 1 : 0,
              transition: 'grid-template-rows 230ms ease-in-out, opacity 200ms ease-in-out',
            }}
          >
            {/* min-height:0 is required for the grid-rows trick to collapse to true zero */}
            <div style={{ minHeight: 0 }}>
              <div className="mt-2 space-y-0.5 pb-0.5">
                {dietaryRows.map((row) => (
                  <div key={row} className="flex items-center justify-center gap-1.5">
                    <span
                      className="text-[10px] font-semibold leading-none"
                      style={{ color: '#2a3c24' }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-[11px] font-normal leading-snug text-gray-500">{row}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Price row — doubles as expand trigger when dietary info exists ── */}
        {hasDietaryInfo ? (
          <button
            type="button"
            className="mt-2 flex cursor-pointer items-center gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:ring-offset-1"
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-controls={expandId}
            aria-label={isExpanded ? `Collapse dietary information for ${product.name}` : `Expand dietary information for ${product.name}`}
          >
            <ChevronRight
              size={12}
              aria-hidden="true"
              className="shrink-0 text-neutral-400"
              style={{
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 200ms ease-in-out',
              }}
            />
            <span
              className="text-base font-medium text-gray-600"
              style={{
                marginLeft: isExpanded ? '2px' : '0px',
                transition: 'margin-left 200ms ease-out',
              }}
            >
              {product.price}
            </span>
          </button>
        ) : (
          <p className="mt-2 text-base font-medium text-gray-600">
            {product.price}
          </p>
        )}
      </div>
    </article>
  )
}
