import type { Metadata } from 'next'

import { GalleryPageClient } from '@/components/gallery-page-client'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'Gallery | The Rits Baker',
  description:
    'Browse handcrafted cakes, brownies, dessert boxes, cookies, and bakery creations from The Rits Baker.',
  path: '/gallery',
  keywords: [
    'The Rits Baker gallery',
    'bakery gallery Bangkok',
    'cake gallery Bangkok',
    'brownie gallery Bangkok',
    'dessert photos Bangkok',
  ],
})

export default function GalleryPage() {
  return <GalleryPageClient />
}
