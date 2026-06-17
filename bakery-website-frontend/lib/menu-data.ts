export interface MenuProduct {
  id: string
  name: string
  price: string
  numericPrice: number
  image: string
  description?: string
  tags?: string[]
  isTopSeller?: boolean
  isHighProtein?: boolean
  vegan?: boolean
}

export interface MenuProductWithCategory extends MenuProduct {
  category: string
  categorySlug: string
}

export interface MenuCategory {
  title: string
  slug: string
  image: string
  products: MenuProduct[]
}

const menuProductCategories: MenuCategory[] = [
  {
    title: 'Signature Loaves (Pack of 10)',
    slug: 'signature-loaves',
    image: '/menu/curation_loaves.png',
    products: [
      {
        id: 'authentic-thai-banana-loaf',
        name: 'Authentic Thai Banana Loaf',
        price: '฿ 190',
        numericPrice: 190,
        image: '/menu/authentic_banana_loaf_menu.png',
      },
      {
        id: 'fresh-orange-loaf',
        name: 'Fresh Orange Loaf',
        price: '฿ 220',
        numericPrice: 220,
        image: '/menu/fresh_orange_loaf.jpg',
      },
      {
        id: 'classical-carrot-cake',
        name: 'Classical Carrot Cake',
        price: '฿ 220',
        numericPrice: 220,
        image: '/menu/classical_carrot_cake_menu.jpg',
      },
      {
        id: 'vanilla-butter-loaf-cake',
        name: 'Vanilla Butter Loaf Cake',
        price: '฿ 250',
        numericPrice: 250,
        image: '/menu/premium_vanilla_cake_menu.jpg',
      },
      {
        id: 'rich-chocolate-loaf',
        name: 'Rich Chocolate Loaf',
        price: '฿ 290',
        numericPrice: 290,
        image: '/menu/rich_chocolate_loaf_menu.jpg',
      },
    ],
  },
  {
    title: 'Artisanal Brownies (Pack of 9)',
    slug: 'artisanal-brownies',
    image: '/menu/curation_brownies.png',
    products: [
      {
        id: 'fudge-brownies',
        name: 'Fudge Brownies',
        price: '฿ 270',
        numericPrice: 270,
        image: '/menu/fudge_brownies_menu.jpeg',
        isTopSeller: true,
      },
      {
        id: 'mocha-brownies',
        name: 'Mocha Brownies',
        price: '฿ 295',
        numericPrice: 295,
        image: '/menu/mocha_brownies_menu.webp',
      },
      {
        id: 'nuts-biscoff-brownies',
        name: 'Nuts & Biscoff Brownies',
        price: '฿ 395',
        numericPrice: 395,
        image: '/menu/nuts_Biscoff_brownies_menu.jpeg',
        tags: ['Contains Nuts'],
      },
      {
        id: 'nutella-oreo-brownies',
        name: 'Nutella Oreo Brownies',
        price: '฿ 325',
        numericPrice: 325,
        image: '/menu/nutella_Oreo_brownies_menu.jpeg',
      },
    ],
  },
  {
    title: 'Tea Time Cookies (250g)',
    slug: 'tea-time-cookies',
    image: '/menu/curation_cookies.png',
    products: [
      {
        id: 'classical-nankhatai',
        name: 'Classical Nankhatai',
        price: '฿ 195',
        numericPrice: 195,
        image: '/menu/classical_nankhatai_menu.jpeg',
        isTopSeller: true,
      },
      {
        id: 'osmania-biscuits',
        name: 'Osmania Biscuits',
        price: '฿ 250',
        numericPrice: 250,
        image: '/menu/osmania_biscuits_menu.jpg',
      },
      {
        id: 'cinnamon-rolls-set-of-6',
        name: 'Cinnamon Rolls (Set of 6)',
        price: '฿ 190',
        numericPrice: 190,
        image: '/menu/cinnamon_rolls_menu.jpeg',
      },
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
        id: 'double-choco-cookies',
        name: 'Double Choco Cookies',
        price: '฿ 250',
        numericPrice: 250,
        image: '/menu/double_choco_cookies_menu.jpeg',
      },
      {
        id: 'gluten-free-nuts-cookies',
        name: 'Gluten Free Nuts Cookies - 225gms',
        price: '฿ 299',
        numericPrice: 299,
        image: '/menu/Gluten_free_nuts_cookies.jpg',
        tags: ['Gluten Free', 'Ekadashi Special'],
        isHighProtein: true,
      },
      {
        id: 'assorted-biscoff-truffles-pack-of-12',
        name: 'Assorted Biscoff Truffles (12 pcs)',
        price: '฿ 400',
        numericPrice: 400,
        image: '/menu/assorted_biscoff_truffles.jpg',
      },
    ],
  },
  {
    title: 'Premium Cakes',
    slug: 'premium-cakes',
    image: '/menu/premium_blueberry_cheese_cake_menu.jpg',
    products: [
      {
        id: 'red-velvet-cake',
        name: 'Red Velvet Cake',
        price: '฿ 590 / lb',
        numericPrice: 590,
        image: '/menu/red_velvet_cake.jpeg',
      },
      {
        id: 'premium-biscoff-cheese-cake',
        name: 'Premium Biscoff Cheese Cake',
        price: '฿ 690 / lb',
        numericPrice: 690,
        image: '/menu/biscoff_cheese_cake_menu.jpeg',
      },
      {
        id: 'premium-blueberry-cheese-cake',
        name: 'Premium Blueberry Cheese Cake',
        price: '฿ 690 / lb',
        numericPrice: 690,
        image: '/menu/premium_blueberry_cheese_cake_menu.jpg',
      },
      {
        id: 'premium-strawberry-cheese-cake',
        name: 'Premium Strawberry Cheese Cake',
        price: '฿ 690 / lb',
        numericPrice: 690,
        image: '/menu/premium_strawberry_cheese_cake_menu.jpg',
      },
      {
        id: 'seasonal-mango-cheese-cake',
        name: 'Seasonal Mango Cheese Cake',
        price: '฿ 690 / lb',
        numericPrice: 690,
        image: '/menu/Seasonal_mango_cheese_cake_menu.png',
      },
      {
        id: 'traditional-mawa-cake',
        name: 'Traditional Mawa Cake',
        price: '฿ 390 / lb',
        numericPrice: 390,
        image: '/menu/traditional_mawa_menu.jpeg',
        isTopSeller: true,
      },
      {
        id: 'date-and-walnut-cake-no-sugar',
        name: 'Date and Walnut Cake (No sugar)',
        price: '฿ 390 / lb',
        numericPrice: 390,
        image: '/menu/Date_Walnut_Cake_menu.jpg',
        tags: ['No Sugar', 'Contains Nuts'],
        isHighProtein: true,
        isTopSeller: true,
      },
      {
        id: 'rose-n-pistachio-cake',
        name: 'Rose n Pistachio Cake',
        price: '฿ 590 / lb',
        numericPrice: 590,
        image: '/menu/Rose_pistacho_cake_menu.jpg',
        tags: ['Contains Nuts'],
        isTopSeller: true,
      },
      {
        id: 'gluten-free-nuts-cake-ekadashi',
        name: 'Gluten free Nuts cake',
        price: '฿ 590 / lb',
        numericPrice: 590,
        image: '/menu/Ekadashi_Nuts_Cake.jpeg',
        tags: ['Gluten Free', 'Ekadashi Special'],
        isHighProtein: true,
        isTopSeller: true,
      },
    ],
  },
  {
    title: 'Savory Bites',
    slug: 'savory-bites',
    image: '/menu/curation_savory.png',
    products: [
      {
        id: 'pizza-muffins-box-of-6',
        name: 'Pizza Muffins (Box of 6)',
        price: '฿ 195',
        numericPrice: 195,
        image: '/menu/pizza_muffins_menu.png',
        isTopSeller: true,
      },
      {
        id: 'spinach-muffins-box-of-6',
        name: 'Spinach Muffins (Box of 6)',
        price: '฿ 195',
        numericPrice: 195,
        image: '/menu/spinach_muffins_menu.png',
      },
      {
        id: 'cheesy-cashews',
        name: 'Cheesy Cashews (125g)',
        price: '฿ 240',
        numericPrice: 240,
        image: '/menu/cheesy_cashews_menu.png',
        tags: ['Contains Nuts'],
      },
      {
        id: '7-seed-mukhwas',
        name: '7 Seed Mukhwas (125g)',
        price: '฿ 160',
        numericPrice: 160,
        image: '/menu/7_seed_mukhwas_menu.jpeg',
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
  {
    title: 'Middle Eastern',
    slug: 'middle-eastern',
    image: '/menu/curation_middleeastern.png',
    products: [
      {
        id: 'kunafa-dates-pack-of-6',
        name: 'Kunafa Dates (Pack of 6)',
        price: '฿ 300',
        numericPrice: 300,
        image: '/menu/kunafa_dates_menu.jpeg',
        isTopSeller: true,
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
        id: 'basbousa',
        name: 'Basbousa',
        price: '฿ 550 / lb',
        numericPrice: 550,
        image: '/menu/basbousa_menu.jpg',
      },
      {
        id: 'dubai-chocolates',
        name: 'Dubai Chocolate Bar',
        price: '฿ 690',
        numericPrice: 690,
        image: '/menu/kunafa_dubai_chocolate_bars.jpeg',
      },
      {
        id: 'dubai-chocolate-mini-bar',
        name: 'Mini Dubai Chocolate Bar',
        price: '฿ 399',
        numericPrice: 399,
        image: '/menu/dubai_chocolate_mini_bar_menu.jpeg',
      },
    ],
  },
  {
    title: 'Crumble Tubs (Pack of 2 - 250g)',
    slug: 'crumble-tubs',
    image: '/menu/biscoff_crumble cake_menu.jpeg',
    products: [
      {
        id: 'biscoff-creamcheese-crumble-tub',
        name: 'Biscoff Creamcheese',
        price: '฿ 250',
        numericPrice: 250,
        image: '/menu/biscoff_crumble cake_menu.jpeg',
      },
      {
        id: 'blueberry-creamcheese-crumble-tub',
        name: 'Blueberry Creamcheese',
        price: '฿ 195',
        numericPrice: 195,
        image: '/menu/blueberry_cheesecake_crumble_menu.jpeg',
      },
      {
        id: 'mango-crumble-tub',
        name: 'Mango',
        price: '฿ 180',
        numericPrice: 180,
        image: '/menu/mango_crumblecake_menu (1).jpeg',
      },
      {
        id: 'tiramisu-crumble-tub',
        name: 'Tiramisu',
        price: '฿ 350',
        numericPrice: 350,
        image: '/menu/tiramisu_crumblecake_menu.jpeg',
      },
      {
        id: 'chocolate-crumble-tub',
        name: 'Chocolate',
        price: '฿ 180',
        numericPrice: 180,
        image: '/menu/chocolate_crumblecake_menu (1).jpeg',
      },
      {
        id: 'strawberry-crumble-tub',
        name: 'Strawberry',
        price: '฿ 195',
        numericPrice: 195,
        image: '/menu/strawberry_crumblecake_menu (1).jpeg',
      },
    ],
  },
  {
    title: 'Vegan',
    slug: 'vegan',
    image: '/menu/Date_Walnut_Cake_menu.jpg',
    products: (() => {
      // Duplicate all Signature Loaves + Premium Cakes (excluding Traditional Mawa Cake)
      // with +50 THB on every item
      const signatureLoaves: MenuProduct[] = [
        {
          id: 'vegan-authentic-thai-banana-loaf',
          name: 'Authentic Thai Banana Loaf (Vegan)',
          price: '฿ 250',
          numericPrice: 250,
          image: '/menu/authentic_banana_loaf_menu.png',
          vegan: true,
        },
        {
          id: 'vegan-fresh-orange-loaf',
          name: 'Fresh Orange Loaf',
          price: '฿ 270',
          numericPrice: 270,
          image: '/menu/fresh_orange_loaf.jpg',
          vegan: true,
        },
        {
          id: 'vegan-classical-carrot-cake',
          name: 'Classical Carrot Cake',
          price: '฿ 270',
          numericPrice: 270,
          image: '/menu/classical_carrot_cake_menu.jpg',
          vegan: true,
        },
        {
          id: 'vegan-vanilla-butter-loaf-cake',
          name: 'Vanilla Butter Loaf Cake',
          price: '฿ 300',
          numericPrice: 300,
          image: '/menu/premium_vanilla_cake_menu.jpg',
          vegan: true,
        },
        {
          id: 'vegan-rich-chocolate-loaf',
          name: 'Rich Chocolate Loaf',
          price: '฿ 350',
          numericPrice: 350,
          image: '/menu/rich_chocolate_loaf_menu.jpg',
          vegan: true,
        },
      ]
      const premiumCakes: MenuProduct[] = [
        {
          id: 'vegan-red-velvet-cake',
          name: 'Red Velvet Cake',
          price: '฿ 650 / lb',
          numericPrice: 650,
          image: '/menu/red_velvet_cake.jpeg',
          vegan: true,
        },
        {
          id: 'vegan-premium-biscoff-cheese-cake',
          name: 'Premium Biscoff Cheese Cake (Vegan)',
          price: '฿ 750 / lb',
          numericPrice: 750,
          image: '/menu/biscoff_cheese_cake_menu.jpeg',
          vegan: true,
        },
        {
          id: 'vegan-premium-blueberry-cheese-cake',
          name: 'Premium Blueberry Cheese Cake',
          price: '฿ 750 / lb',
          numericPrice: 750,
          image: '/menu/premium_blueberry_cheese_cake_menu.jpg',
          vegan: true,
        },
        {
          id: 'vegan-premium-strawberry-cheese-cake',
          name: 'Premium Strawberry Cheese Cake',
          price: '฿ 750 / lb',
          numericPrice: 750,
          image: '/menu/premium_strawberry_cheese_cake_menu.jpg',
          vegan: true,
        },
        {
          id: 'vegan-seasonal-mango-cheese-cake',
          name: 'Seasonal Mango Cheese Cake',
          price: '฿ 750 / lb',
          numericPrice: 750,
          image: '/menu/Seasonal_mango_cheese_cake_menu.png',
          vegan: true,
        },
        // Traditional Mawa Cake excluded from Vegan
        {
          id: 'vegan-date-and-walnut-cake',
          name: 'Date and Walnut Cake (No sugar)',
          price: '฿ 450 / lb',
          numericPrice: 450,
          image: '/menu/Date_Walnut_Cake_menu.jpg',
          tags: ['No Sugar', 'Contains Nuts'],
          isHighProtein: true,
          vegan: true,
        },
        {
          id: 'vegan-rose-n-pistachio-cake',
          name: 'Rose n Pistachio Cake',
          price: '฿ 650 / lb',
          numericPrice: 650,
          image: '/menu/Rose_pistacho_cake_menu.jpg',
          tags: ['Contains Nuts'],
          vegan: true,
        },
        {
          id: 'vegan-gluten-free-nuts-cake',
          name: 'Gluten-Free Nuts Cake',
          price: '฿ 650 / lb',
          numericPrice: 650,
          image: '/menu/gluten_free_nuts_cake_menu.jpeg',
          tags: ['High Protein', 'Vegan', 'Ekadashi Special', 'Calories Free'],
          isHighProtein: true,
          vegan: true,
        },
      ]
      return [...signatureLoaves, ...premiumCakes]
    })(),
  },
]

const withCategory = (
  category: MenuCategory,
  product: MenuProduct,
): MenuProductWithCategory => ({
  ...product,
  category: category.title,
  categorySlug: category.slug,
})

export const menuProducts = menuProductCategories.flatMap((category) =>
  category.products.map((product) => withCategory(category, product)),
)

const TOP_SELLER_ORDER = [
  'kunafa-dates-pack-of-6',
  'rose-n-pistachio-cake',
  'gluten-free-nuts-cake-ekadashi',
  'date-and-walnut-cake-no-sugar',
]

export const topSellerProducts = menuProducts
  .filter((product) => product.isTopSeller)
  .sort((a, b) => {
    const ai = TOP_SELLER_ORDER.indexOf(a.id)
    const bi = TOP_SELLER_ORDER.indexOf(b.id)
    const aRank = ai === -1 ? TOP_SELLER_ORDER.length : ai
    const bRank = bi === -1 ? TOP_SELLER_ORDER.length : bi
    return aRank - bRank
  })

export const menuCategories: MenuCategory[] = [
  {
    title: 'Top Seller',
    slug: 'top-seller',
    image: '/menu/classical_nankhatai_menu.jpeg',
    products: topSellerProducts,
  },
  ...menuProductCategories,
]

export const menuCategoryOptions = [
  'All',
  ...menuCategories.map((category) => category.title),
]

export function getMenuProductsForCategory(categoryTitle: string) {
  if (categoryTitle === 'All') {
    return menuProducts
  }

  const category = menuCategories.find(
    (menuCategory) => menuCategory.title === categoryTitle,
  )

  return category
    ? category.products.map((product) => withCategory(category, product))
    : []
}
