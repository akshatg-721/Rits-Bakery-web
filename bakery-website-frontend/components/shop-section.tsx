'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

import { MenuProductCard } from '@/components/menu-product-card'
import { Input } from '@/components/ui/input'
import { useCart } from '@/lib/cart-context'
import {
  getMenuProductsForCategory,
  menuCategoryOptions,
  type MenuProduct,
  type MenuProductWithCategory,
} from '@/lib/menu-data'

interface ShopSectionProps {
  initialSearchQuery?: string
}

export function ShopSection({ initialSearchQuery = '' }: ShopSectionProps) {
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [activeCategory, setActiveCategory] = useState('All')
  const inputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    setSearchQuery(initialSearchQuery)
  }, [initialSearchQuery])

  useEffect(() => {
    if (searchParams.get('searchFocus') === 'true' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchParams])

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

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    const categoryProducts = getMenuProductsForCategory(activeCategory)

    return categoryProducts.filter((product: MenuProductWithCategory) => {
      if (!normalizedQuery) return true

      return [
        product.name,
        product.category,
        product.description,
        ...(product.tags ?? []),
      ]
        .filter((value): value is string => Boolean(value))
        .some((value) => value.toLowerCase().includes(normalizedQuery))
    })
  }, [activeCategory, searchQuery])

  return (
    <section id="menu" className="overflow-hidden px-4 pt-4 pb-10 sm:px-6 lg:px-8 md:pt-8 md:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 font-serif text-3xl italic leading-tight text-[#111111] sm:text-4xl lg:text-5xl md:mb-8">
            Our Eggless Bakery Menu
          </h2>
        </div>

        <div className="sticky top-24 z-30 mt-6 space-y-5 bg-[#F9F9F9]/95 py-4 backdrop-blur-xl md:mt-8">
          <div className="relative mx-auto mb-6 max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
            <Input
              ref={inputRef}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search eggless cakes, cookies, brownies..."
              className="min-h-12 rounded-full border-gray-200 bg-white pl-12 pr-4 text-base text-[#111111] shadow-[0_4px_18px_rgb(0,0,0,0.04)] focus-visible:border-[#006241] focus-visible:ring-[#006241]/20"
            />
          </div>

          <div className="relative">
            <div className="-mx-4 flex overflow-x-auto snap-x snap-mandatory px-4 pr-12 no-scrollbar scrollbar-none sm:mx-0 sm:px-0">
              <div className="mx-auto flex w-max gap-3 pb-6 sm:w-fit">
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

        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <MenuProductCard
              key={`${product.categorySlug}-${product.id}`}
              product={product}
              showEgglessLabel={false}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-12 rounded-md border border-dashed border-[#006241]/25 bg-white px-6 py-12 text-center text-base leading-7 text-gray-600 shadow-[0_8px_24px_rgb(0,0,0,0.04)]">
            No menu items found. Try another search or category.
          </div>
        )}

        <p className="mx-auto mt-12 max-w-4xl text-center text-base leading-7 text-gray-500 sm:text-sm">
          * Vegan, fasting-friendly, and monk fruit sweetener options available.
          Prices may vary. Open Every Day | Delivery Only (Pre-order 24hrs
          before).
        </p>
      </div>
    </section>
  )
}
