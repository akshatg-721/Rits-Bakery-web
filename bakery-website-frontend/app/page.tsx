import type { Metadata } from 'next'

import { Curations } from '@/components/curations'
import { HeroSlider } from '@/components/hero-slider'
import { MenuSection } from '@/components/menu-section'
import { Newsletter } from '@/components/newsletter'
import { createPageMetadata } from '@/lib/seo'

export const metadata: Metadata = createPageMetadata({
  title: 'The Rits Baker | Premium Eggless Cakes, Brownies & Desserts in Bangkok',
  description:
    'Freshly baked brownies, cakes, cookies, dessert boxes, vegan treats, and healthy bakes crafted with premium ingredients in Bangkok.',
  path: '/',
  keywords: [
    'premium eggless cakes Bangkok',
    'brownies Bangkok',
    'dessert boxes Bangkok',
    'vegan treats Bangkok',
    'healthy bakes Bangkok',
  ],
})

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F9F9F9]">
      <HeroSlider />
      <Curations />
      <MenuSection />
      <Newsletter />
    </main>
  )
}
