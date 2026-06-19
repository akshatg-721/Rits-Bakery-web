'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, ChefHat, Leaf, Star, Zap } from 'lucide-react'

import { MenuProductCard } from '@/components/menu-product-card'
import { MenuSearchBar } from '@/components/menu-search-bar'
import { useCart } from '@/lib/cart-context'
import {
  getMenuProductsForCategory,
  menuCategories,
  menuCategoryOptions,
  type MenuProduct,
  type MenuProductWithCategory,
} from '@/lib/menu-data'
import { searchProducts, highlightText } from '@/lib/search-engine'

/** Resolve a category slug (e.g. "artisanal-brownies") to its full title. */
function resolveCategorySlug(slug: string): string {
  if (!slug) return 'All'
  const matched = menuCategories.find((c) => c.slug === slug)
  return matched ? matched.title : 'All'
}

// ─── Highlighted product card wrapper ────────────────────────────────────────
function HighlightedText({ text, query }: { text: string; query: string }) {
  const segments = highlightText(text, query)
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

// ─── Suggested categories for empty state ─────────────────────────────────────
const SUGGESTED_CATEGORIES = [
  {
    label: 'Artisanal Brownies',
    icon: <ChefHat className="size-4" />,
    slug: 'artisanal-brownies',
    emoji: '🍫',
  },
  {
    label: 'Premium Cakes',
    icon: <Star className="size-4" />,
    slug: 'premium-cakes',
    emoji: '🎂',
  },
  {
    label: 'Vegan',
    icon: <Leaf className="size-4" />,
    slug: 'vegan',
    emoji: '🌱',
  },
  {
    label: 'Tea Time Treats',
    icon: <Zap className="size-4" />,
    slug: 'tea-time-treats',
    emoji: '🍪',
  },
]

interface ShopSectionProps {
  initialSearchQuery?: string
  /** Category slug from the URL, e.g. "artisanal-brownies" */
  initialCategorySlug?: string
}

export function ShopSection({
  initialSearchQuery = '',
  initialCategorySlug = '',
}: ShopSectionProps) {
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [activeCategory, setActiveCategory] = useState(() =>
    resolveCategorySlug(initialCategorySlug),
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const productGridRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()

  // Keep search query in sync with URL param changes
  useEffect(() => {
    setSearchQuery(initialSearchQuery)
  }, [initialSearchQuery])

  // Focus search bar when ?searchFocus=true
  useEffect(() => {
    if (searchParams.get('searchFocus') === 'true' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchParams])

  // When a category is pre-selected via URL, scroll the product grid into view
  useEffect(() => {
    if (!initialCategorySlug) return
    const id = requestAnimationFrame(() => {
      productGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(id)
  }, [initialCategorySlug])

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

  const isSearching = searchQuery.trim().length > 0

  const filteredProducts = useMemo(() => {
    const categoryProducts = getMenuProductsForCategory(activeCategory)

    if (!isSearching) {
      return categoryProducts
    }

    // Use weighted search engine
    const results = searchProducts(categoryProducts, searchQuery)
    return results.map((r) => r.product)
  }, [activeCategory, searchQuery, isSearching])

  const totalResults = filteredProducts.length
  const isEmpty = filteredProducts.length === 0

  return (
    <section id="menu" className="overflow-hidden px-4 pb-10 sm:px-6 lg:px-8 md:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto flex min-h-[calc(96px-0px)] max-w-2xl items-center justify-center text-center">
          <h2 className="font-serif text-3xl italic leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
            Our Eggless Bakery Menu
          </h2>
        </div>

        {/* ── Sticky search + category pills ── */}
        <div className="sticky top-24 z-30 bg-[#F9F9F9]/95 py-3 backdrop-blur-xl">

          {/* Premium search bar */}
          <MenuSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            inputRef={inputRef}
          />

          {/* Search results count */}
          {isSearching && (
            <p className="mt-2 mb-1 text-center text-xs font-medium tracking-[0.14em] text-gray-400 uppercase">
              {totalResults === 0
                ? 'No results'
                : `${totalResults} ${totalResults === 1 ? 'result' : 'results'} for "${searchQuery.trim()}"`}
            </p>
          )}

          {/* Category pills */}
          <div className="relative mt-2">
            <div className="-mx-4 flex overflow-x-auto snap-x snap-mandatory px-4 pr-12 no-scrollbar scrollbar-none sm:mx-0 sm:px-0">
              <div className="mx-auto flex w-max gap-3 pb-3 sm:w-fit">
                {menuCategoryOptions.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`min-h-11 snap-start whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                      activeCategory === category
                        ? 'border-[#2a3c24] bg-[#2a3c24] text-white shadow-sm'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div
              aria-hidden="true"
              className="bg-gradient-to-l from-white to-transparent w-8 h-full absolute right-0 top-0 pointer-events-none sm:hidden"
            />
          </div>
        </div>

        {/* ── Product grid ── */}
        <div
          ref={productGridRef}
          className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12"
          style={{ scrollMarginTop: '7rem' }}
        >
          {filteredProducts.map((product) => (
            <MenuProductCard
              key={`${product.categorySlug}-${product.id}`}
              product={product}
              showEgglessLabel={false}
              searchQuery={isSearching ? searchQuery : undefined}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* ── Premium empty state ── */}
        {isEmpty && (
          <div className="mt-10 mb-4">
            {/* Main card */}
            <div className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_12px_48px_rgba(0,0,0,0.07)]">
              {/* Decorative gradient top */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#006241] via-[#2a7a5a] to-[#8bc4a8]" />

              <div className="px-8 py-10 text-center">
                <div className="mb-4 text-5xl">🔍</div>
                <h3 className="mb-1 font-serif text-xl text-gray-900">
                  No treats found
                </h3>
                <p className="mb-1 text-sm font-medium text-gray-500">
                  We couldn&apos;t find anything for{' '}
                  <span className="font-semibold text-[#006241]">
                    &ldquo;{searchQuery.trim()}&rdquo;
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  Try a different spelling, or browse a category below
                </p>

                {/* Quick category actions */}
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {SUGGESTED_CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => {
                        setSearchQuery('')
                        setActiveCategory(cat.label)
                      }}
                      className="group flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-left transition-all duration-200 hover:border-[#006241]/25 hover:bg-[#006241]/4 hover:shadow-sm active:scale-[0.98]"
                    >
                      <span className="text-lg leading-none">{cat.emoji}</span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-gray-700 group-hover:text-[#006241]">
                          {cat.label}
                        </p>
                      </div>
                      <ArrowRight className="ml-auto size-3.5 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#006241]/60" />
                    </button>
                  ))}
                </div>

                {/* Reset button */}
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#006241] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,98,65,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#004F35] hover:shadow-[0_6px_20px_rgba(0,98,65,0.32)] active:translate-y-0"
                >
                  Clear search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
