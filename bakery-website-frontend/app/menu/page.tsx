'use client'

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

/* ─── All menu data organized by premium categories ─── */
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
        image: '/menu/curation_loaves.png',
      },
      {
        id: 'fresh-orange-loaf',
        name: 'Fresh Orange Loaf',
        price: '฿ 220',
        numericPrice: 220,
        image: '/menu/traditional_mawa_cake_menu.jpeg',
      },
      {
        id: 'classic-carrot-loaf',
        name: 'Classic Carrot Loaf',
        price: '฿ 220',
        numericPrice: 220,
        image: '/menu/date_walnut_cake.webp',
      },
      {
        id: 'vanilla-butter-loaf-cake',
        name: 'Vanilla Butter Loaf Cake',
        price: '฿ 250',
        numericPrice: 250,
        image: '/menu/premium_vanila_cke_menu.jpg',
      },
      {
        id: 'rich-chocolate-loaf',
        name: 'Rich Chocolate Loaf',
        price: '฿ 290',
        numericPrice: 290,
        image: '/menu/rich_choclate_loaf_menu.jpg',
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
        image: '/menu/fudge_brownies_menu.jpeg',
      },
      {
        id: 'nuts-biscoff-brownies-box-of-8',
        name: 'Nuts & Biscoff Brownies (Box of 8)',
        price: '฿ 350',
        numericPrice: 350,
        image: '/menu/nuts_Biscoff_brownies_menu.jpeg',
        tags: ['Contains Nuts'],
      },
      {
        id: 'nutella-oreo-brownies-box-of-8',
        name: 'Nutella Oreo Brownies (Box of 8)',
        price: '฿ 290',
        numericPrice: 290,
        image: '/menu/nutella_Oreo_brownies_menu.jpeg',
      },
      {
        id: 'mocha-brownies',
        name: 'Mocha Brownies (Box of 8)',
        price: '฿ 270',
        numericPrice: 270,
        image: '/menu/mocha_brownies_menu.webp',
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
        image: '/menu/classical_nankhatai_menu.jpeg',
      },
      {
        id: 'date-walnut-cake',
        name: 'Date & Walnut Cake',
        price: '฿ 290',
        numericPrice: 290,
        image: '/menu/date_walnut_cake.webp',
        tags: ['No Sugar', 'Contains Nuts', 'Top Seller'],
      },
      {
        id: 'osamania-biscuits',
        name: 'Osamania Biscuits',
        price: '฿ 250',
        numericPrice: 250,
        image: '/menu/osmania_biscuits_menu.jpg',
      },
      {
        id: 'premium-cheesecakes',
        name: 'Premium Cheese Cake',
        price: '฿ 690 / lb',
        numericPrice: 690,
        image: '/menu/premium_cheese_cakes.png',
      },
      {
        id: 'red-velvet-cake',
        name: 'Red Velvet Cake',
        price: '฿ 590 / lb',
        numericPrice: 590,
        image: '/menu/red_valvet_cake.jpeg',
      },
      {
        id: 'basbousa',
        name: 'Basbousa',
        price: '฿ 550 / lb',
        numericPrice: 550,
        image: '/menu/basbousa_menu.jpg',
      },
      {
        id: 'traditional-mawa-cake',
        name: 'Traditional Mawa Cake',
        price: '฿ 390 / lb',
        numericPrice: 390,
        image: '/menu/traditional_mawa_cake_menu.jpeg',
      },
      {
        id: 'cinnamon-rolls-set-of-6',
        name: 'Cinnamon Rolls (Set of 6)',
        price: '฿ 190',
        numericPrice: 190,
        image: '/menu/cinnamon_rolls_menu.jpeg',
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
        image: '/menu/coconut_cookies_menu.jpeg',
      },
      {
        id: 'almond-oats-choco-chip-cookies',
        name: 'Almond & Oats Choco Chip Cookies',
        price: '฿ 240',
        numericPrice: 240,
        image: '/menu/almond_oats_choco-chip_cookies_menu.jpeg',
        tags: ['Contains Nuts'],
      },
      {
        id: 'assorted-biscoff-truffles-pack-of-12',
        name: 'Assorted Biscoff Truffles (12 pcs)',
        price: '฿ 400',
        numericPrice: 400,
        image: '/menu/assorted_biscoff_truffles.jpg',
      },
      {
        id: 'double-choco-cookies',
        name: 'Double Choco Cookies',
        price: '฿ 220',
        numericPrice: 220,
        image: '/menu/double_choco_cookies_menu.jpeg',
      },
    ],
  },
  {
    title: 'Middle Eastern Indulgence',
    slug: 'middle-eastern',
    products: [
      {
        id: 'kunafa-dates-pack-of-6',
        name: 'Khunafa Dates (Pack of 6)',
        price: '฿ 300',
        numericPrice: 300,
        image: '/menu/kunafa_dates_menu.jpeg',
        tags: ['No Sugar'],
      },
      {
        id: 'baklava',
        name: 'Baklava',
        price: '฿ 590 / lb',
        numericPrice: 590,
        image: '/menu/baklava_menu.jpeg',
        tags: ['Contains Nuts'],
      },
      {
        id: 'dubai-chocolates',
        name: 'Dubai Chocolate Bar',
        price: '฿ 690',
        numericPrice: 690,
        image: '/menu/kunafa_dubai_choclate_bars.jpeg',
      },
      {
        id: 'dubai-chocolate-mini-bar',
        name: 'Dubai Chocolate Mini Bar',
        price: '฿ 399',
        numericPrice: 399,
        image: '/menu/kunafa_dubai_choclate_bars.jpeg',
      },
      {
        id: 'rose-pistachio-cake',
        name: 'Rose & Pistachio Cake',
        price: '฿ 450',
        numericPrice: 450,
        image: '/menu/curation_middleeastern.png',
        tags: ['Contains Nuts'],
      },
    ],
  },
  {
    title: 'Savory Bites',
    slug: 'savory-bites',
    products: [
      {
        id: 'pizza-muffins',
        name: 'Pizza Muffins',
        price: '฿ 195',
        numericPrice: 195,
        image: '/menu/pizza_muffins_menu.png',
      },
      {
        id: 'spinach-muffins',
        name: 'Spinach Muffins',
        price: '฿ 195',
        numericPrice: 195,
        image: '/menu/spinach_muffins_menu.png',
      },
      {
        id: 'cheesy-cashews',
        name: 'Cheesy Cashews (125g)',
        price: '฿ 240',
        numericPrice: 240,
        image: '/menu/chessy_cashews_menu.png',
        tags: ['Contains Nuts'],
      },
      {
        id: '7-seed-mukhwas',
        name: '7 Seed Mukhwas (125g)',
        price: '฿ 160',
        numericPrice: 160,
        image: '/menu/7_seed_mukhwas_menu.png',
      },
      {
        id: 'cheese-straws',
        name: 'Cheese Straws (Pack of 12)',
        price: '฿ 210',
        numericPrice: 210,
        image: '/menu/cheese_straws_menu.png',
      },
    ],
  },
]

export default function MenuPage() {
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
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8]">
      {/* ── Category Sections ── */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
        {menuCategories.map((category, catIdx) => (
          <section
            key={category.slug}
            id={category.slug}
            className={catIdx > 0 ? 'mt-16 sm:mt-28' : ''}
            style={{ scrollMarginTop: '6rem' }}
          >
            {/* Category heading */}
            <div className="mb-8 sm:mb-14">
              <h2 className="font-serif text-3xl leading-tight text-[#1a1a1a] sm:text-4xl lg:text-5xl">
                {category.title}
              </h2>
              <div className="mt-3 h-px w-16 bg-[#006241]/30" />
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-4 md:gap-x-6 md:gap-y-12">
              {category.products.map((product) => (
                <article
                  key={product.id}
                  className="group transition-transform duration-200 active:scale-[0.985]"
                >
                  {/* ── Image Container with hover reveals ── */}
                  <div className="relative aspect-square overflow-hidden rounded-sm bg-gray-100 transition-transform duration-300 md:group-hover:-translate-y-1">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Add-to-cart bar — bottom */}
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

                  {/* ── Text beneath image ── */}
                  <div className="mt-3 flex flex-col items-center px-1.5 text-center md:mt-4 md:px-1">
                    <span className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                      Eggless
                    </span>
                    <h3 className="text-base font-medium leading-snug text-gray-900">
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
          </section>
        ))}



        {/* Footer note */}
        <p className="mx-auto mt-20 max-w-2xl text-center text-base leading-7 text-gray-500 sm:text-sm sm:leading-6">
          All items are 100% eggless. Vegan, fasting-friendly, and monk fruit
          sweetener options available upon request. Prices may vary.
          <br />
          Open Every Day · Delivery Only · Pre-order 24hrs before.
        </p>
      </div>
    </main>
  )
}
