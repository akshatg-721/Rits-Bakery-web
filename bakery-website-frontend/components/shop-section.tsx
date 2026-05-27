'use client'

import { useMemo, useState } from 'react'
import { Search, ShoppingBag, Star } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/lib/cart-context'

interface MenuProduct {
  id: string
  name: string
  category: string
  price: string
  description?: string
  image: string
  isTopSeller: boolean
  tags?: string[]
}

const categories = [
  'All',
  'Signature Loaves',
  'Cookies',
  'Savories & Gifting',
  'Desserts',
]

const products: MenuProduct[] = [
  {
    id: 'authentic-thai-banana-loaf',
    name: 'Authentic Thai Banana Loaf',
    category: 'Signature Loaves',
    price: '฿190',
    image: '/logo.png',
    isTopSeller: false,
    tags: ['Best Seller'],
  },
  {
    id: 'orange-carrot-loaf',
    name: 'Orange/Carrot Loaf',
    category: 'Signature Loaves',
    price: '฿220',
    image: '/images/carrot_loaf.jpeg',
    isTopSeller: false,
  },
  {
    id: 'vanilla-butter-loaf-cake',
    name: 'Vanilla Butter Loaf Cake',
    category: 'Signature Loaves',
    price: '฿250',
    image: '/logo.png',
    isTopSeller: false,
  },
  {
    id: 'date-walnut-cake',
    name: 'Date & Walnut Cake',
    category: 'Signature Loaves',
    price: '฿290',
    image: '/images/dates_walnut_cake.jpeg',
    isTopSeller: false,
    tags: ['Contains Nuts'],
  },
  {
    id: 'rich-chocolate-loaf',
    name: 'Rich Chocolate Loaf',
    category: 'Signature Loaves',
    price: '฿290',
    image: '/logo.png',
    isTopSeller: true,
  },
  {
    id: 'coconut-cookies',
    name: 'Coconut Cookies',
    category: 'Cookies',
    price: '฿195',
    image: '/logo.png',
    isTopSeller: false,
  },
  {
    id: 'classical-nankhatai',
    name: 'Classical Nankhatai',
    category: 'Cookies',
    price: '฿195',
    image: '/images/raggi_cookies.jpeg',
    isTopSeller: true,
  },
  {
    id: 'osamania-biscuits',
    name: 'Osamania Biscuits',
    category: 'Cookies',
    price: '฿250',
    image: '/logo.png',
    isTopSeller: false,
  },
  {
    id: 'almond-oats-choco-chip-cookies',
    name: 'Almond/Oats/Choco Chip Cookies',
    category: 'Cookies',
    price: '฿240',
    image: '/images/double_choco_cookies.jpeg',
    isTopSeller: false,
  },
  {
    id: 'cheesy-cashews',
    name: 'Cheesy Cashews (125g)',
    category: 'Savories & Gifting',
    price: '฿240',
    image: '/logo.png',
    isTopSeller: false,
  },
  {
    id: '7-seed-mukhwas',
    name: '7 Seed Mukhwas (125g)',
    category: 'Savories & Gifting',
    price: '฿160',
    image: '/logo.png',
    isTopSeller: false,
  },
  {
    id: 'muffins-pack-of-6',
    name: 'Muffins (Pack of 6) (Pizza/Spinach Cheese Corn)',
    category: 'Savories & Gifting',
    price: '฿195',
    image: '/images/pizza_muffins.jpeg',
    isTopSeller: true,
  },
  {
    id: 'premium-cheesecakes',
    name: 'Premium Cheesecakes',
    category: 'Desserts',
    price: '฿690/lb',
    image: '/images/red_valvet_cake.jpeg',
    isTopSeller: true,
  },
  {
    id: 'fudge-brownies-box-of-8',
    name: 'Fudge Brownies (Box of 8)',
    category: 'Desserts',
    price: '฿245',
    image: '/images/mocha_brownie.jpeg',
    isTopSeller: false,
    tags: ['Best Seller'],
  },
  {
    id: 'nuts-biscoff-brownies-box-of-8',
    name: 'Nuts/Biscoff Brownies (Box of 8)',
    category: 'Desserts',
    price: '฿350',
    image: '/logo.png',
    isTopSeller: false,
  },
  {
    id: 'nutella-oreo-brownies-box-of-8',
    name: 'Nutella/Oreo Brownies (Box of 8)',
    category: 'Desserts',
    price: '฿290',
    image: '/logo.png',
    isTopSeller: true,
  },
  {
    id: 'kunafa-dates-pack-of-6',
    name: 'Kunafa Dates (Pack of 6)',
    category: 'Desserts',
    price: '฿300',
    image: '/images/khunafa_dates.jpeg',
    isTopSeller: true,
  },
  {
    id: 'assorted-biscoff-truffles-pack-of-12',
    name: 'Assorted Biscoff Truffles (Pack of 12)',
    category: 'Desserts',
    price: '฿400',
    image: '/logo.png',
    isTopSeller: false,
  },
  {
    id: 'baklava',
    name: 'Baklava',
    category: 'Desserts',
    price: '฿590/lb',
    image: '/logo.png',
    isTopSeller: false,
    tags: ['Contains Nuts'],
  },
  {
    id: 'basbousa',
    name: 'Basbousa',
    category: 'Desserts',
    price: '฿550/lb',
    image: '/logo.png',
    isTopSeller: false,
  },
  {
    id: 'dubai-chocolates',
    name: 'Dubai Chocolates (10 pieces)',
    category: 'Desserts',
    price: '฿690',
    image: '/images/kunafa_dubai_choclate_bars.jpeg',
    isTopSeller: false,
  },
  {
    id: 'traditional-mawa-cake',
    name: 'Traditional Mawa Cake',
    category: 'Desserts',
    price: '฿390/lb',
    image: '/images/traditional_mawa_cake.jpeg',
    isTopSeller: false,
  },
]

function getNumericPrice(price: string) {
  return Number(price.replace(/[^\d.]/g, '')) || 0
}

export function ShopSection() {
  const { addItem, setCartOpen } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory
      const matchesSearch =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <section id="menu" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-4xl italic text-[#111111] sm:text-5xl">
            Our Eggless Bakery Menu
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Browse signature eggless bakes, gifting favorites, and desserts made
            fresh for delivery-only pre-orders.
          </p>
        </div>

        <div className="sticky top-24 z-30 mt-10 space-y-5 bg-[#F9F9F9]/95 py-4 backdrop-blur">
          <div className="relative mx-auto max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search eggless cakes, cookies, brownies..."
              className="h-12 rounded-full border-gray-200 bg-white pl-12 pr-4 text-[#111111] shadow-none focus-visible:border-[#006241] focus-visible:ring-[#006241]/20"
            />
          </div>

          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="mx-auto flex w-max gap-3 sm:w-fit">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? 'border-[#006241] bg-[#006241] text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-[#006241]/50 hover:text-[#006241]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex h-full flex-col rounded-md border border-gray-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-4"
            >
              <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`h-full w-full ${
                    product.image === '/logo.png'
                      ? 'object-contain p-10 opacity-70'
                      : 'object-cover'
                  }`}
                />
              </div>

              <div className="mt-3 flex items-start justify-between gap-1 sm:mt-5 sm:gap-3">
                <h3 className="text-xs font-semibold leading-snug text-[#111111] sm:text-base">
                  {product.name}
                </h3>
                {product.isTopSeller && (
                  <Badge className="hidden shrink-0 border-[#006241]/30 bg-[#006241]/10 text-[#006241] sm:flex">
                    <Star className="fill-[#006241] text-[#006241]" />
                    Top Seller
                  </Badge>
                )}
              </div>

              {/* Description — hidden on mobile for 2-col density, visible on sm+ */}
              <p className="mt-1 hidden line-clamp-2 min-h-[2.75rem] text-sm leading-[1.375rem] text-gray-500 sm:mt-2 sm:block">
                {product.description ?? 'Freshly baked with premium ingredients and homemade love.'}
              </p>

              <div className="mt-2 flex items-center justify-between gap-1 sm:mt-3 sm:gap-2">
                <p className="text-sm font-semibold text-[#111111] sm:text-base">
                  {product.price}
                </p>
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap justify-end gap-1">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium sm:px-2.5 sm:text-xs ${
                          tag === 'Best Seller'
                            ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20'
                            : tag === 'Contains Nuts'
                            ? 'bg-[#e8f5ee] text-[#006241] ring-1 ring-inset ring-[#006241]/20'
                            : 'bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-500/20'
                        }`}
                      >
                        {tag === 'Best Seller' ? '🏆 ' : tag === 'Contains Nuts' ? '🌰 ' : ''}{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Button
                className="mt-auto w-full rounded-md bg-[#006241] py-2 text-xs font-semibold text-white hover:bg-[#004F35] sm:py-2.5 sm:text-sm"
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: getNumericPrice(product.price),
                    displayPrice: product.price,
                    description: product.description,
                    image: product.image,
                  })
                  setCartOpen(true)
                }}
              >
                <ShoppingBag className="size-4" />
                Add to Order
              </Button>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-12 rounded-md border border-dashed border-gray-300 bg-white px-6 py-12 text-center text-gray-600">
            No menu items found. Try another search or category.
          </div>
        )}

        <p className="mx-auto mt-12 max-w-4xl text-center text-sm leading-7 text-gray-500">
          * Vegan, fasting-friendly, and monk fruit sweetener options available.
          Prices may vary. Open Every Day | Delivery Only (Pre-order 24hrs
          before).
        </p>
      </div>
    </section>
  )
}
