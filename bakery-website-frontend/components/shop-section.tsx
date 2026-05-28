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
    image: '/menu/curation_loaves.png',
    isTopSeller: false,
  },
  {
    id: 'fresh-orange-loaf',
    name: 'Fresh Orange Loaf',
    category: 'Signature Loaves',
    price: '฿220',
    image: '/menu/traditional_mawa_cake_menu.jpeg',
    isTopSeller: false,
  },
  {
    id: 'classic-carrot-loaf',
    name: 'Classic Carrot Loaf',
    category: 'Signature Loaves',
    price: '฿220',
    image: '/menu/date_walnut_cake.webp',
    isTopSeller: false,
  },
  {
    id: 'vanilla-butter-loaf-cake',
    name: 'Vanilla Butter Loaf Cake',
    category: 'Signature Loaves',
    price: '฿250',
    image: '/menu/premium_vanila_cke_menu.jpg',
    isTopSeller: false,
  },
  {
    id: 'date-walnut-cake',
    name: 'Date & Walnut Cake',
    category: 'Signature Loaves',
    price: '฿290',
    image: '/menu/date_walnut_cake.webp',
    isTopSeller: true,
    tags: ['No Sugar', 'Contains Nuts', 'Top Seller'],
  },
  {
    id: 'rich-chocolate-loaf',
    name: 'Rich Chocolate Loaf',
    category: 'Signature Loaves',
    price: '฿290',
    image: '/menu/rich_choclate_loaf_menu.jpg',
    isTopSeller: false,
  },
  {
    id: 'coconut-cookies',
    name: 'Coconut Cookies',
    category: 'Cookies',
    price: '฿195',
    image: '/menu/coconut_cookies_menu.jpeg',
    isTopSeller: false,
  },
  {
    id: 'classical-nankhatai',
    name: 'Classical Nankhatai',
    category: 'Cookies',
    price: '฿195',
    image: '/menu/classical_nankhatai_menu.jpeg',
    isTopSeller: false,
  },
  {
    id: 'osamania-biscuits',
    name: 'Osamania Biscuits',
    category: 'Cookies',
    price: '฿250',
    image: '/menu/osmania_biscuits_menu.jpg',
    isTopSeller: false,
  },
  {
    id: 'almond-oats-choco-chip-cookies',
    name: 'Almond/Oats/Choco Chip Cookies',
    category: 'Cookies',
    price: '฿240',
    image: '/menu/double_choco_cookies_menu.jpeg',
    isTopSeller: false,
  },
  {
    id: 'cheesy-cashews',
    name: 'Cheesy Cashews (125g)',
    category: 'Savories & Gifting',
    price: '฿240',
    image: '/menu/chessy_cashews_menu.png',
    isTopSeller: false,
  },
  {
    id: '7-seed-mukhwas',
    name: '7 Seed Mukhwas (125g)',
    category: 'Savories & Gifting',
    price: '฿160',
    image: '/menu/7_seed_mukhwas_menu.png',
    isTopSeller: false,
  },
  {
    id: 'muffins-pack-of-6',
    name: 'Muffins (Pack of 6)',
    category: 'Savories & Gifting',
    price: '฿195',
    image: '/menu/pizza_muffins_menu.png',
    isTopSeller: false,
  },
  {
    id: 'premium-cheesecakes',
    name: 'Premium Cheese Cake',
    category: 'Tea-Time Classics',
    price: '฿690/lb',
    image: '/menu/premium_cheese_cakes.png',
    isTopSeller: false,
  },
  {
    id: 'fudge-brownies-box-of-8',
    name: 'Fudge Brownies (Box of 8)',
    category: 'Desserts',
    price: '฿245',
    image: '/menu/fudge_brownies_menu.jpeg',
    isTopSeller: false,
  },
  {
    id: 'nuts-biscoff-brownies-box-of-8',
    name: 'Nuts/Biscoff Brownies (Box of 8)',
    category: 'Desserts',
    price: '฿350',
    image: '/menu/nuts_Biscoff_brownies_menu.jpeg',
    isTopSeller: false,
  },
  {
    id: 'nutella-oreo-brownies-box-of-8',
    name: 'Nutella/Oreo Brownies (Box of 8)',
    category: 'Desserts',
    price: '฿290',
    image: '/menu/nutella_Oreo_brownies_menu.jpeg',
    isTopSeller: false,
  },
  {
    id: 'kunafa-dates-pack-of-6',
    name: 'Kunafa Dates (Pack of 6)',
    category: 'Desserts',
    price: '฿300',
    image: '/menu/kunafa_dates_menu.jpeg',
    isTopSeller: false,
  },
  {
    id: 'assorted-biscoff-truffles-pack-of-12',
    name: 'Assorted Biscoff Truffles (Pack of 12)',
    category: 'Desserts',
    price: '฿400',
    image: '/menu/assorted_biscoff_truffles.jpg',
    isTopSeller: false,
  },
  {
    id: 'cheese-straws',
    name: 'Cheese Straws (Pack of 12)',
    category: 'Savories & Gifting',
    price: '฿210',
    image: '/menu/cheese_straws_menu.png',
    isTopSeller: false,
  },
  {
    id: 'baklava',
    name: 'Baklava',
    category: 'Desserts',
    price: '฿590/lb',
    image: '/menu/baklava_menu.jpeg',
    isTopSeller: false,
    tags: ['Contains Nuts'],
  },
  {
    id: 'basbousa',
    name: 'Basbousa',
    category: 'Desserts',
    price: '฿550/lb',
    image: '/menu/basbousa_menu.jpg',
    isTopSeller: false,
  },
  {
    id: 'dubai-chocolates',
    name: 'Dubai Chocolates (10 pieces)',
    category: 'Desserts',
    price: '฿690',
    image: '/menu/kunafa_dubai_choclate_bars.jpeg',
    isTopSeller: false,
  },
  {
    id: 'traditional-mawa-cake',
    name: 'Traditional Mawa Cake',
    category: 'Tea-Time Classics',
    price: '฿390/lb',
    image: '/menu/traditional_mawa_cake_menu.jpeg',
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

  const handleAddToCart = (product: MenuProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: getNumericPrice(product.price),
      displayPrice: product.price,
      description: product.description,
      image: product.image,
    })
    setCartOpen(true)
  }

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
    <section id="menu" className="overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl italic leading-tight text-[#111111] sm:text-4xl lg:text-5xl">
            Our Eggless Bakery Menu
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Browse signature eggless bakes, gifting favorites, and desserts made
            fresh for delivery-only pre-orders.
          </p>
        </div>

        <div className="sticky top-24 z-30 mt-10 space-y-5 bg-[#F9F9F9]/95 py-4 backdrop-blur-xl">
          <div className="relative mx-auto max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search eggless cakes, cookies, brownies..."
              className="min-h-12 rounded-full border-gray-200 bg-white pl-12 pr-4 text-base text-[#111111] shadow-[0_4px_18px_rgb(0,0,0,0.04)] focus-visible:border-[#006241] focus-visible:ring-[#006241]/20"
            />
          </div>

          <div className="-mx-4 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
            <div className="mx-auto flex w-max snap-x snap-mandatory gap-3 sm:w-fit">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-11 snap-start whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium shadow-[0_2px_10px_rgb(0,0,0,0.03)] transition-all duration-200 active:scale-[0.97] ${
                    activeCategory === category
                      ? 'border-[#006241] bg-[#006241] text-white shadow-[0_8px_20px_rgb(0,98,65,0.16)]'
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
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group transition-transform duration-200 active:scale-[0.985]"
            >
              {/* Flush, full-width image */}
              <div className="relative aspect-square overflow-hidden rounded-sm bg-gray-100 transition-transform duration-300 md:group-hover:-translate-y-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button
                  type="button"
                  className="absolute inset-x-0 bottom-0 hidden min-h-12 items-center justify-center bg-[#111111]/90 px-4 text-center shadow-[0_8px_20px_rgb(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:bg-[#006241] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006241] focus-visible:ring-offset-2 md:flex md:translate-y-full md:group-hover:translate-y-0 md:focus-visible:translate-y-0"
                  onClick={() => handleAddToCart(product)}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                    Add to Cart
                  </span>
                </button>
              </div>

              {/* Centered editorial text */}
              <div className="mt-3 px-1.5 text-center md:mt-4 md:px-1">
                {product.isTopSeller && (
                  <span className="mb-1.5 inline-block text-[10px] font-semibold uppercase tracking-widest text-[#006241]">
                    Top Seller
                  </span>
                )}
                <h3 className="font-serif text-base leading-snug text-[#1a1a1a]">
                  {product.name}
                </h3>
                {product.tags && product.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-block rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider shadow-[0_2px_8px_rgb(0,0,0,0.04)] sm:text-[10px] ${
                          tag === 'Top Seller'
                            ? 'bg-[#006241] text-white'
                            : 'bg-white text-[#111111] ring-1 ring-black/5'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="mt-2 text-base font-medium text-gray-600">
                  {product.price}
                </p>
                <button
                  type="button"
                  className="mt-4 flex min-h-11 w-full items-center justify-center rounded-sm border border-black/20 px-3 py-2.5 text-center text-xs font-medium uppercase tracking-[0.15em] text-black transition-colors active:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006241] focus-visible:ring-offset-2 md:hidden"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </article>
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
