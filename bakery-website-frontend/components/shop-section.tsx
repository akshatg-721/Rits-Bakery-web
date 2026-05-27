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
  isTopSeller: boolean
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
    isTopSeller: false,
  },
  {
    id: 'orange-carrot-loaf',
    name: 'Orange/Carrot Loaf',
    category: 'Signature Loaves',
    price: '฿220',
    isTopSeller: false,
  },
  {
    id: 'vanilla-butter-loaf-cake',
    name: 'Vanilla Butter Loaf Cake',
    category: 'Signature Loaves',
    price: '฿250',
    isTopSeller: false,
  },
  {
    id: 'date-walnut-cake',
    name: 'Date & Walnut Cake',
    category: 'Signature Loaves',
    price: '฿290',
    isTopSeller: false,
  },
  {
    id: 'rich-chocolate-loaf',
    name: 'Rich Chocolate Loaf',
    category: 'Signature Loaves',
    price: '฿290',
    isTopSeller: true,
  },
  {
    id: 'coconut-cookies',
    name: 'Coconut Cookies',
    category: 'Cookies',
    price: '฿195',
    isTopSeller: false,
  },
  {
    id: 'classical-nankhatai',
    name: 'Classical Nankhatai',
    category: 'Cookies',
    price: '฿195',
    isTopSeller: true,
  },
  {
    id: 'osamania-biscuits',
    name: 'Osamania Biscuits',
    category: 'Cookies',
    price: '฿250',
    isTopSeller: false,
  },
  {
    id: 'almond-oats-choco-chip-cookies',
    name: 'Almond/Oats/Choco Chip Cookies',
    category: 'Cookies',
    price: '฿240',
    isTopSeller: false,
  },
  {
    id: 'cheesy-cashews',
    name: 'Cheesy Cashews (125g)',
    category: 'Savories & Gifting',
    price: '฿240',
    isTopSeller: false,
  },
  {
    id: '7-seed-mukhwas',
    name: '7 Seed Mukhwas (125g)',
    category: 'Savories & Gifting',
    price: '฿160',
    isTopSeller: false,
  },
  {
    id: 'muffins-pack-of-6',
    name: 'Muffins (Pack of 6) (Pizza/Spinach Cheese Corn)',
    category: 'Savories & Gifting',
    price: '฿195',
    isTopSeller: true,
  },
  {
    id: 'premium-cheesecakes',
    name: 'Premium Cheesecakes',
    category: 'Desserts',
    price: '฿690/lb',
    isTopSeller: true,
  },
  {
    id: 'fudge-brownies-box-of-8',
    name: 'Fudge Brownies (Box of 8)',
    category: 'Desserts',
    price: '฿245',
    isTopSeller: false,
  },
  {
    id: 'nuts-biscoff-brownies-box-of-8',
    name: 'Nuts/Biscoff Brownies (Box of 8)',
    category: 'Desserts',
    price: '฿350',
    isTopSeller: false,
  },
  {
    id: 'nutella-oreo-brownies-box-of-8',
    name: 'Nutella/Oreo Brownies (Box of 8)',
    category: 'Desserts',
    price: '฿290',
    isTopSeller: true,
  },
  {
    id: 'kunafa-dates-pack-of-6',
    name: 'Kunafa Dates (Pack of 6)',
    category: 'Desserts',
    price: '฿300',
    isTopSeller: true,
  },
  {
    id: 'assorted-biscoff-truffles-pack-of-12',
    name: 'Assorted Biscoff Truffles (Pack of 12)',
    category: 'Desserts',
    price: '฿400',
    isTopSeller: false,
  },
  {
    id: 'baklava',
    name: 'Baklava',
    category: 'Desserts',
    price: '฿590/lb',
    isTopSeller: false,
  },
  {
    id: 'basbousa',
    name: 'Basbousa',
    category: 'Desserts',
    price: '฿550/lb',
    isTopSeller: false,
  },
  {
    id: 'dubai-chocolates',
    name: 'Dubai Chocolates (10 pieces)',
    category: 'Desserts',
    price: '฿690',
    isTopSeller: false,
  },
  {
    id: 'traditional-mawa-cake',
    name: 'Traditional Mawa Cake',
    category: 'Desserts',
    price: '฿390/lb',
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
    <section id="menu" className="px-6 py-16 sm:px-8">
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

          <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
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

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex h-full flex-col rounded-md border border-gray-200 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                <img
                  src="/logo.png"
                  alt=""
                  className="h-full w-full object-contain p-10 opacity-70"
                />
              </div>

              <div className="mt-5 flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold leading-snug text-[#111111]">
                  {product.name}
                </h3>
                {product.isTopSeller && (
                  <Badge className="border-[#006241]/30 bg-[#006241]/10 text-[#006241]">
                    <Star className="fill-[#006241] text-[#006241]" />
                    Top Seller
                  </Badge>
                )}
              </div>

              <p className="mt-2 text-base font-semibold text-[#111111]">
                {product.price}
              </p>

              {product.description && (
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {product.description}
                </p>
              )}

              <Button
                className="mt-auto w-full rounded-md bg-[#006241] text-white hover:bg-[#004F35]"
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: getNumericPrice(product.price),
                    displayPrice: product.price,
                    description: product.description,
                    image: '/logo.png',
                  })
                  setCartOpen(true)
                }}
              >
                <ShoppingBag className="size-4" />
                Add to Cart
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
