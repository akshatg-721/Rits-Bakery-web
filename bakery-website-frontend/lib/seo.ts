import type { Metadata } from 'next'

import { menuProducts, type MenuProductWithCategory } from '@/lib/menu-data'

export const SITE_NAME = 'The Rits Baker'
export const SITE_URL = 'https://theritsbaker.com'
export const DEFAULT_OG_IMAGE_PATH = '/og-image.jpg'
export const DEFAULT_OG_IMAGE_ALT =
  'The Rits Baker signature eggless brownies, cakes, and desserts'

// Replace /public/og-image.jpg with a dedicated 1200x630 branded social card when available.
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`

const BRAND_KEYWORDS = [
  'The Rits Baker',
  'eggless bakery Bangkok',
  'premium bakery Bangkok',
  'brownies Bangkok',
  'cakes Bangkok',
  'desserts Bangkok',
]

export function absoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

interface PageMetadataInput {
  title: string
  description: string
  path: string
  keywords: string[]
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(path)
  const mergedKeywords = [...new Set([...keywords, ...BRAND_KEYWORDS])]

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
      images: [
        {
          url: DEFAULT_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: DEFAULT_OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE_URL],
    },
  }
}

export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/logo.png'),
    email: 'theritsbaker@gmail.com',
    telephone: '+66-972932849',
    sameAs: [
      'https://www.instagram.com/theritsbaker/',
      'https://www.facebook.com/share/18rW9vZvKp/?mibextid=wwXIfr',
      'https://wa.me/66972932849',
    ],
  }
}

export function getBakerySchema() {
  return {
    '@type': 'Bakery',
    name: SITE_NAME,
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE_URL,
    email: 'theritsbaker@gmail.com',
    telephone: '+66-972932849',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangkok',
      addressCountry: 'TH',
    },
    sameAs: [
      'https://www.instagram.com/theritsbaker/',
      'https://www.facebook.com/share/18rW9vZvKp/?mibextid=wwXIfr',
      'https://wa.me/66972932849',
    ],
  }
}

function getProductSchema(product: MenuProductWithCategory) {
  const schema: Record<string, unknown> = {
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
  }

  if (product.image) {
    schema.image = absoluteUrl(product.image)
  }

  if (product.category) {
    schema.category = product.category
  }

  if (typeof product.numericPrice === 'number') {
    schema.offers = {
      '@type': 'Offer',
      price: product.numericPrice.toString(),
      priceCurrency: 'THB',
      availability: 'https://schema.org/InStock',
    }
  }

  return schema
}

export function getMenuProductsSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': menuProducts.map(getProductSchema),
  }
}
