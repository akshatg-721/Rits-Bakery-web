'use client'

import { useMemo } from 'react'

import { MenuProductCard } from '@/components/menu-product-card'
import { useCart } from '@/lib/cart-context'
import { menuCategories, type MenuProduct } from '@/lib/menu-data'

interface MenuSectionProps {
  initialSearchQuery?: string
}

export function MenuSection({ initialSearchQuery = '' }: MenuSectionProps) {
  const { addItem, setCartOpen } = useCart()

  const handleAddToCart = (product: MenuProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.numericPrice,
      displayPrice: product.price,
      description: product.description,
      image: product.image,
    })
    setCartOpen(true)
  }

  const normalizedQuery = initialSearchQuery.trim().toLowerCase()

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return menuCategories

    return menuCategories
      .map((category) => ({
        ...category,
        products: category.products.filter((product) =>
          [product.name, product.description, ...(product.tags ?? [])]
            .filter((v): v is string => Boolean(v))
            .some((v) => v.toLowerCase().includes(normalizedQuery)),
        ),
      }))
      .filter((category) => category.products.length > 0)
  }, [normalizedQuery])

  const totalResults = filteredCategories.reduce(
    (sum, cat) => sum + cat.products.length,
    0,
  )

  return (
    <section id="menu" className="overflow-hidden bg-[#FAFAF8] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl py-14 sm:py-24">

        {/* ── Search results indicator (only when filtering via URL param) ── */}
        {normalizedQuery && (
          <p className="mb-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-black/40 sm:mb-14">
            {totalResults} {totalResults === 1 ? 'result' : 'results'} for &ldquo;{initialSearchQuery.trim()}&rdquo;
          </p>
        )}

        {/* ── Categories ── */}
        {filteredCategories.map((category, catIdx) => (
          <div
            key={category.slug}
            id={category.slug}
            className={catIdx > 0 ? 'mt-16 sm:mt-28' : ''}
            style={{ scrollMarginTop: '6rem' }}
          >
            <div className="mb-8 sm:mb-14">
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-3xl leading-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl">
                  {category.title}
                </h3>
                {category.slug === 'artisanal-brownies' && (
                  <span className="rounded-full bg-[#006241]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#006241]">
                    Pack of 9
                  </span>
                )}
              </div>
              <div className="mt-3 h-px w-16 bg-[#006241]/30" />
            </div>

            {category.products.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-4 md:gap-x-6 md:gap-y-12">
                {category.products.map((product) => (
                  <MenuProductCard
                    key={product.id}
                    product={product}
                    headingLevel="h4"
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-[#006241]/25 bg-white px-6 py-10 text-center text-base leading-7 text-gray-500 shadow-[0_8px_24px_rgb(0,0,0,0.04)] sm:text-sm">
                Vegan selection coming soon.
              </div>
            )}
          </div>
        ))}

        {/* ── No results ── */}
        {filteredCategories.length === 0 && (
          <div className="mt-12 rounded-md border border-dashed border-[#006241]/25 bg-white px-6 py-12 text-center text-base leading-7 text-gray-600 shadow-[0_8px_24px_rgb(0,0,0,0.04)]">
            No menu items found for &ldquo;{initialSearchQuery.trim()}&rdquo;. Try another search term.
          </div>
        )}

        <p className="mx-auto mt-16 max-w-2xl text-center text-base leading-7 text-gray-500 sm:mt-20 sm:text-sm sm:leading-6">
          All items are 100% eggless. Vegan, fasting-friendly, and monk fruit
          sweetener options available upon request. Prices may vary.
          <br />
          Open Every Day · Delivery Only · Pre-order 24hrs before.
        </p>
      </div>
    </section>
  )
}
