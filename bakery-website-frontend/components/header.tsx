'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, Search, ShoppingBag } from 'lucide-react'

import { CartDrawer } from '@/components/cart-drawer'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCart } from '@/lib/cart-context'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const { totalItems, setCartOpen } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent, closeMobileNav = false) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/menu?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      if (closeMobileNav) {
        setMobileNavOpen(false)
      }
    }
  }

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="w-full overflow-hidden bg-[#006241] px-3 py-2 text-center shadow-[0_1px_0_rgb(255,255,255,0.12)_inset]">
        <p className="whitespace-nowrap text-[10px] font-semibold uppercase leading-5 tracking-[0.16em] text-white/90 sm:text-xs">
          EGG-LESS&nbsp;•&nbsp;Delivery only&nbsp;•&nbsp;Pre-order&nbsp;•&nbsp;Bangkok
        </p>
      </div>

      {/* ── Main Header ── */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100/80 bg-white/90 shadow-[0_4px_20px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300">

        {/* ════════════════════════════════════════
            MOBILE HEADER  (hidden on md+)
            Layout: [Hamburger] [Logo centered] [Search + Cart]
        ════════════════════════════════════════ */}
        <div className="grid grid-cols-[44px_1fr_88px] items-center px-3 py-2.5 md:hidden">

          {/* Left — Hamburger slide-out sheet */}
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button
                id="mobile-nav-trigger"
                aria-label="Open navigation menu"
                size="icon"
                variant="ghost"
                className="rounded-full text-[#111111] hover:bg-[#006241]/10 hover:text-[#006241]"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex w-[min(88vw,22rem)] flex-col border-r border-white/80 bg-white/95 p-0 backdrop-blur-xl">
              {/* Drawer header */}
              <SheetHeader className="border-b border-gray-100/80 px-6 pb-6 pt-7">
                <SheetTitle className="font-serif text-2xl italic text-[#111111]">
                  The Rits Baker
                </SheetTitle>
                <SheetDescription className="max-w-[15rem] text-base leading-6 text-gray-500">
                  Freshly baked, handcrafted, made with love.
                </SheetDescription>
              </SheetHeader>

              {/* Search */}
              <form
                onSubmit={(event) => handleSearch(event, true)}
                className="relative mx-5 mt-5"
              >
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="mobile-drawer-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search treats..."
                  className="h-12 w-full rounded-full border border-gray-200/90 bg-gray-50 pl-10 pr-4 text-base text-[#111111] placeholder:text-gray-400 transition-all duration-200 focus:border-[#006241]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]/10"
                />
              </form>

              {/* Nav links */}
              <nav className="flex flex-col px-4 py-3" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileNavOpen(false)}
                      className="group flex min-h-14 items-center justify-between rounded-md border-b border-gray-100/80 px-2 text-lg font-medium text-[#111111] transition-all duration-200 hover:bg-[#006241]/5 hover:px-3 hover:text-[#006241] active:scale-[0.99]"
                    >
                      <span>{link.label}</span>
                      <span className="h-px w-5 bg-[#006241]/0 transition-all duration-200 group-hover:bg-[#006241]/50" />
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {/* Order CTA at bottom of drawer */}
              <div className="mt-auto border-t border-gray-100/80 p-5">
                <SheetClose asChild>
                  <Link
                    href="/menu"
                    onClick={() => setMobileNavOpen(false)}
                    className="flex min-h-12 w-full items-center justify-center rounded-md bg-[#006241] px-5 py-3.5 text-base font-semibold text-white shadow-[0_10px_24px_rgb(0,98,65,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#004F35] active:translate-y-0 active:scale-[0.98]"
                  >
                    View Menu
                  </Link>
                </SheetClose>
                <p className="mt-3 text-center text-xs leading-5 text-gray-400">
                  Pre-order via WhatsApp · Delivery only
                </p>
              </div>
            </SheetContent>
          </Sheet>

          {/* Center — Logo (absolute center of header bar) */}
          <div className="flex justify-center">
            <Link href="/" aria-label="The Rits Baker home" className="rounded-full transition-transform duration-200 active:scale-[0.96]">
              <img
                src="/logo.png"
                alt="The Rits Baker"
                className="h-auto w-20 drop-shadow-sm"
              />
            </Link>
          </div>

          {/* Right — Search + Cart */}
          <div className="flex shrink-0 items-center gap-0.5">
            <Button
              id="mobile-search-trigger"
              aria-label="Search"
              size="icon"
              variant="ghost"
              className="rounded-full text-[#111111] hover:bg-[#006241]/10 hover:text-[#006241]"
              asChild
            >
              <Link href="/menu">
                <Search className="size-5" />
              </Link>
            </Button>

            <Button
              id="mobile-cart-trigger"
              aria-label="Open shopping cart"
              variant="ghost"
              size="icon"
              className="relative rounded-full text-[#111111] hover:bg-[#006241]/10 hover:text-[#006241]"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="size-5" />
              {totalItems > 0 && (
                <span className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-[#006241] text-[10px] font-bold leading-none text-white shadow-sm ring-2 ring-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* ════════════════════════════════════════
            DESKTOP HEADER  (hidden below md)
            Layout: [Logo] [Nav] [Order Now + Cart]
        ════════════════════════════════════════ */}
        <div className="mx-auto hidden max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 md:flex">
          <Link href="/" aria-label="The Rits Baker home" className="shrink-0 rounded-full transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
            <img
              src="/logo.png"
              alt="The Rits Baker"
              className="h-auto w-24 max-w-[120px] drop-shadow-sm sm:w-28"
            />
          </Link>

          <nav className="flex items-center gap-8" aria-label="Desktop navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative flex min-h-11 items-center py-2 text-sm font-medium text-gray-700 transition-colors hover:text-[#006241] after:absolute after:bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#006241] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <input
                id="desktop-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treats..."
                className="h-11 w-48 rounded-full border border-gray-200/80 bg-gray-50 pl-9 pr-4 text-sm text-[#111111] placeholder:text-gray-400 shadow-[0_1px_0_rgb(0,0,0,0.02)] transition-all duration-200 focus:w-64 focus:border-[#006241]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006241]/10"
              />
            </form>

            {/* Cart Icon */}
            <Button
              id="header-cart-trigger"
              aria-label="Open shopping cart"
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-[#006241]/10"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="size-5 text-[#111111]" />
              {totalItems > 0 && (
                <span className="absolute right-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-[#006241] text-[10px] font-bold leading-none text-white shadow-sm ring-2 ring-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Cart Drawer rendered once at the top level */}
      <CartDrawer />
    </>
  )
}
