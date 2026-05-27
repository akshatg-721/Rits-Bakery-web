'use client'

import { Search } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

/* ─── Product data type ─── */
interface Product {
  id: string
  name: string
  price: string
  numericPrice: number
  image: string
  tags?: string[]
}

interface Category {
  title: string
  slug: string
  products: Product[]
}

/* ─── Curated Unsplash images ─── */
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`

/* ─── All menu data organized by category ─── */
const menuCategories: Category[] = [
  {
    title: 'Signature Loaves',
    slug: 'signature-loaves',
    products: [
      {
        id: 'authentic-thai-banana-loaf',
        name: 'Authentic Thai Banana Loaf',
        price: '฿ 190',
        numericPrice: 190,
        image: img('1605286024831-8da0e440a927'),
        tags: ['Best Seller'],
      },
      {
        id: 'orange-carrot-loaf',
        name: 'Orange & Carrot Loaf',
        price: '฿ 220',
        numericPrice: 220,
        image: img('1621955711739-104a3cee1135'),
      },
      {
        id: 'vanilla-butter-loaf-cake',
        name: 'Vanilla Butter Loaf Cake',
        price: '฿ 250',
        numericPrice: 250,
        image: img('1486427944344-5a2276841a99'),
      },
      {
        id: 'date-walnut-cake',
        name: 'Date & Walnut Cake',
        price: '฿ 290',
        numericPrice: 290,
        image: img('1618426326193-820cca39a85f'),
        tags: ['Contains Nuts'],
      },
      {
        id: 'rich-chocolate-loaf',
        name: 'Rich Chocolate Loaf',
        price: '฿ 290',
        numericPrice: 290,
        image: img('1606313564200-e75d5e30476c'),
        tags: ['Top Seller'],
      },
      {
        id: 'traditional-mawa-cake',
        name: 'Traditional Mawa Cake',
        price: '฿ 390 / lb',
        numericPrice: 390,
        image: img('1517433670267-08bbd4be890f'),
      },
    ],
  },
  {
    title: 'Artisanal Brownies',
    slug: 'artisanal-brownies',
    products: [
      {
        id: 'fudge-brownies-box-of-8',
        name: 'Fudge Brownies (Box of 8)',
        price: '฿ 245',
        numericPrice: 245,
        image: img('1606313564200-e75d5e30476c'),
        tags: ['Best Seller'],
      },
      {
        id: 'nuts-biscoff-brownies-box-of-8',
        name: 'Nuts & Biscoff Brownies (Box of 8)',
        price: '฿ 350',
        numericPrice: 350,
        image: img('1612886623637-a999ab01c498'),
        tags: ['Contains Nuts'],
      },
      {
        id: 'nutella-oreo-brownies-box-of-8',
        name: 'Nutella Oreo Brownies (Box of 8)',
        price: '฿ 290',
        numericPrice: 290,
        image: img('1590841609987-4ac211afdde1'),
        tags: ['Top Seller'],
      },
      {
        id: 'mocha-brownies',
        name: 'Mocha Brownies (Box of 8)',
        price: '฿ 270',
        numericPrice: 270,
        image: img('1559620192-032c4bc4674e'),
      },
    ],
  },
  {
    title: 'Tea-Time Classics',
    slug: 'tea-time-classics',
    products: [
      {
        id: 'classical-nankhatai',
        name: 'Classical Nankhatai',
        price: '฿ 195',
        numericPrice: 195,
        image: img('1558961363-fa8fdf82db35'),
        tags: ['Top Seller'],
      },
      {
        id: 'osamania-biscuits',
        name: 'Osamania Biscuits',
        price: '฿ 250',
        numericPrice: 250,
        image: img('1499636136210-6f4ee915583e'),
      },
      {
        id: 'premium-cheesecakes',
        name: 'Premium Cheesecakes',
        price: '฿ 690 / lb',
        numericPrice: 690,
        image: img('1533134242443-d4fd215305ad'),
        tags: ['Best Seller'],
      },
      {
        id: 'basbousa',
        name: 'Basbousa',
        price: '฿ 550 / lb',
        numericPrice: 550,
        image: img('1576618148400-f54bed99fcfd'),
      },
    ],
  },
  {
    title: 'Cookies & Biscuits',
    slug: 'cookies-biscuits',
    products: [
      {
        id: 'coconut-cookies',
        name: 'Coconut Cookies',
        price: '฿ 195',
        numericPrice: 195,
        image: img('1590080876351-941da357a43c'),
      },
      {
        id: 'almond-oats-choco-chip-cookies',
        name: 'Almond & Oats Choco Chip Cookies',
        price: '฿ 240',
        numericPrice: 240,
        image: img('1499636136210-6f4ee915583e'),
        tags: ['Contains Nuts'],
      },
      {
        id: 'assorted-biscoff-truffles-pack-of-12',
        name: 'Assorted Biscoff Truffles (12 pcs)',
        price: '฿ 400',
        numericPrice: 400,
        image: img('1548907040-4baa42d10919'),
      },
      {
        id: 'double-choco-cookies',
        name: 'Double Choco Cookies',
        price: '฿ 220',
        numericPrice: 220,
        image: img('1558961363-fa8fdf82db35'),
      },
    ],
  },
  {
    title: 'Middle Eastern Indulgence',
    slug: 'middle-eastern',
    products: [
      {
        id: 'kunafa-dates-pack-of-6',
        name: 'Kunafa Dates (Pack of 6)',
        price: '฿ 300',
        numericPrice: 300,
        image: img('1576618148400-f54bed99fcfd'),
        tags: ['Top Seller'],
      },
      {
        id: 'baklava',
        name: 'Baklava',
        price: '฿ 590 / lb',
        numericPrice: 590,
        image: img('1519676867240-f03562e64548'),
        tags: ['Contains Nuts'],
      },
      {
        id: 'dubai-chocolates',
        name: 'Dubai Chocolates (10 pieces)',
        price: '฿ 690',
        numericPrice: 690,
        image: img('1549007994-cb92caefdcce'),
      },
      {
        id: 'rose-pistachio-cake',
        name: 'Rose & Pistachio Cake',
        price: '฿ 450',
        numericPrice: 450,
        image: img('1565958011703-44f9829ba187'),
        tags: ['Contains Nuts'],
      },
    ],
  },
  {
    title: 'Savory Bites',
    slug: 'savory-bites',
    products: [
      {
        id: 'muffins-pack-of-6',
        name: 'Savoury Muffins (Pack of 6)',
        price: '฿ 195',
        numericPrice: 195,
        image: img('1607958996333-41aef7caefaa'),
        tags: ['Top Seller'],
      },
      {
        id: 'cheesy-cashews',
        name: 'Cheesy Cashews (125g)',
        price: '฿ 240',
        numericPrice: 240,
        image: img('1604928141064-207cea6f571f'),
        tags: ['Contains Nuts'],
      },
      {
        id: '7-seed-mukhwas',
        name: '7 Seed Mukhwas (125g)',
        price: '฿ 160',
        numericPrice: 160,
        image: img('1604928141064-207cea6f571f'),
      },
      {
        id: 'cheese-straws',
        name: 'Cheese Straws (Pack of 12)',
        price: '฿ 210',
        numericPrice: 210,
        image: img('1555243896-c709bfa0b564'),
      },
    ],
  },
]

export function MenuSection() {
  const { addItem, setCartOpen } = useCart()

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.numericPrice,
      displayPrice: product.price,
      image: product.image,
    })
    setCartOpen(true)
  }

  return (
    <section id="menu" className="bg-[#FAFAF8] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl py-16 sm:py-24">
        {menuCategories.map((category, catIdx) => (
          <div
            key={category.slug}
            id={category.slug}
            className={catIdx > 0 ? 'mt-20 sm:mt-28' : ''}
            /* Offset scroll target so heading isn't hidden behind sticky header */
            style={{ scrollMarginTop: '6rem' }}
          >
            {/* ── Category Heading ── */}
            <div className="mb-10 sm:mb-14">
              <h3 className="font-serif text-3xl text-[#1a1a1a] sm:text-4xl">
                {category.title}
              </h3>
              <div className="mt-3 h-px w-16 bg-[#006241]/40" />
            </div>

            {/* ── Product Grid ── */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-4">
              {category.products.map((product) => (
                <article key={product.id} className="group cursor-pointer">
                  {/* Image Container with hover reveals */}
                  <div
                    className="relative overflow-hidden rounded-sm bg-gray-100"
                    onClick={() => handleAddToCart(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Quick-view icon — top right */}
                    <button
                      aria-label={`Quick view ${product.name}`}
                      className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white text-[#111111] opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100 sm:right-4 sm:top-4 sm:size-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                    >
                      <Search className="size-4" />
                    </button>

                    {/* Add-to-cart bar — bottom */}
                    <div className="absolute bottom-0 left-0 w-full translate-y-full bg-[#111111]/90 py-2.5 text-center transition-transform duration-300 group-hover:translate-y-0 sm:py-3">
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white sm:text-[11px]">
                        Add to Cart
                      </span>
                    </div>

                    {/* Tags — top left */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="absolute left-3 top-3 flex flex-col gap-1 sm:left-4 sm:top-4">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`inline-block rounded-sm px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider sm:text-[10px] ${
                              tag === 'Best Seller' || tag === 'Top Seller'
                                ? 'bg-[#006241] text-white'
                                : 'bg-white/90 text-[#111111]'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Text beneath image */}
                  <div className="mt-4 flex flex-col items-center text-center">
                    <span className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                      Eggless
                    </span>
                    <h4 className="text-sm font-medium leading-snug text-gray-900 sm:text-[15px]">
                      {product.name}
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.price}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}

        {/* Footer note */}
        <p className="mx-auto mt-20 max-w-2xl text-center text-xs leading-6 text-gray-400 sm:text-sm">
          All items are 100% eggless. Vegan, fasting-friendly, and monk fruit
          sweetener options available upon request. Prices may vary.
          <br />
          Open Every Day · Delivery Only · Pre-order 24hrs before.
        </p>
      </div>
    </section>
  )
}
