'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

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
  'Tea-Time Classics',
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
    image: 'https://images.unsplash.com/photo-1632931057788-645c49bc0db5?auto=format&fit=crop&w=800&q=80',
    isTopSeller: false,
    tags: ['Best Seller'],
  },
  {
    id: 'fresh-orange-loaf',
    name: 'Fresh Orange Loaf',
    category: 'Signature Loaves',
    price: '฿220',
    image: 'https://unsplash.com/photos/0RLZC3X1es4/download?force=true&w=800',
    isTopSeller: false,
  },
  {
    id: 'classic-carrot-loaf',
    name: 'Classic Carrot Loaf',
    category: 'Signature Loaves',
    price: '฿220',
    image: 'https://unsplash.com/photos/z2ZGrxKVNfs/download?force=true&w=800',
    isTopSeller: false,
  },
  {
    id: 'vanilla-butter-loaf-cake',
    name: 'Vanilla Butter Loaf Cake',
    category: 'Signature Loaves',
    price: '฿250',
    image: 'https://images.unsplash.com/photo-1632228930927-d95286a28b5c?auto=format&fit=crop&w=800&q=80',
    isTopSeller: false,
  },
  {
    id: 'date-walnut-cake',
    name: 'Date & Walnut Cake',
    category: 'Signature Loaves',
    price: '฿290',
    image: 'https://images.unsplash.com/photo-1614777986387-015c2a89b696?auto=format&fit=crop&w=800&q=80',
    isTopSeller: false,
    tags: ['Best Seller', 'No Sugar', 'Contains Nuts'],
  },
  {
    id: 'rich-chocolate-loaf',
    name: 'Rich Chocolate Loaf',
    category: 'Signature Loaves',
    price: '฿290',
    image: '/images/mocha_brownie.jpeg',
    isTopSeller: true,
  },
  {
    id: 'coconut-cookies',
    name: 'Coconut Cookies',
    category: 'Cookies',
    price: '฿195',
    image: '/images/raggi_cookies.jpeg',
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
    image: '/images/double_choco_cookies.jpeg',
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
    image: '/images/pizza_muffins.jpeg',
    isTopSeller: false,
  },
  {
    id: '7-seed-mukhwas',
    name: '7 Seed Mukhwas (125g)',
    category: 'Savories & Gifting',
    price: '฿160',
    image: '/images/pizza_muffins.jpeg',
    isTopSeller: false,
  },
  {
    id: 'muffins-pack-of-6',
    name: 'Muffins (Pack of 6)',
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
    image: '/images/mocha_brownie.jpeg',
    isTopSeller: false,
  },
  {
    id: 'nutella-oreo-brownies-box-of-8',
    name: 'Nutella/Oreo Brownies (Box of 8)',
    category: 'Desserts',
    price: '฿290',
    image: '/images/mocha_brownie.jpeg',
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
    image: '/images/kunafa_dubai_choclate_bars.jpeg',
    isTopSeller: false,
  },
  {
    id: 'baklava',
    name: 'Baklava',
    category: 'Desserts',
    price: '฿590/lb',
    image: '/images/khunafa_dates.jpeg',
    isTopSeller: false,
    tags: ['Contains Nuts'],
  },
  {
    id: 'basbousa',
    name: 'Basbousa',
    category: 'Desserts',
    price: '฿550/lb',
    image: '/images/traditional_mawa_cake.jpeg',
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
    category: 'Tea-Time Classics',
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

        {/* Editorial Product Grid */}
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group"
            >
              {/* Flush, full-width image */}
              <div className="relative aspect-square overflow-hidden rounded-sm bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  type="button"
                  className="absolute bottom-0 left-0 w-full translate-y-full bg-[#111111]/90 py-2.5 text-center transition-transform duration-300 group-hover:translate-y-0 focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006241] focus-visible:ring-offset-2 sm:py-3"
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
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white sm:text-[11px]">
                    Add to Cart
                  </span>
                </button>
              </div>

              {/* Centered editorial text */}
              <div className="mt-4 text-center">
                {product.isTopSeller && (
                  <span className="mb-1.5 inline-block text-[10px] font-semibold uppercase tracking-widest text-[#006241]">
                    Top Seller
                  </span>
                )}
                <h3 className="font-serif text-sm leading-snug text-[#1a1a1a] sm:text-base">
                  {product.name}
                </h3>
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-block rounded-sm px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider sm:text-[10px] ${
                          tag === 'Best Seller' || tag === 'Top Seller'
                            ? 'bg-[#006241] text-white'
                            : 'bg-gray-100 text-[#111111]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {product.price}
                </p>
              </div>
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
