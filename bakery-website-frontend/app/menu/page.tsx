import { MenuSection } from '@/components/menu-section'
import { Newsletter } from '@/components/newsletter'

export default function MenuPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAF8]">
      <MenuSection />
      <Newsletter />
    </main>
  )
}
