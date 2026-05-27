import { HeroSection } from '@/components/hero-section'
import { ShopSection } from '@/components/shop-section'
import { Testimonials } from '@/components/testimonials'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <HeroSection />
      <ShopSection />
      <Testimonials />
    </main>
  )
}
