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
  { label: 'About Us', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const { totalItems, setCartOpen } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/#menu?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="w-full bg-[#006241] px-4 py-2 text-center">
        <p className="text-[11px] font-medium uppercase tracking-wider text-white/90">
          🛵 Delivery only&nbsp;•&nbsp;Pre-order 24 hrs in advance&nbsp;•&nbsp;Bangkok
        </p>
      </div>

      {/* ── Main Header ── */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-[#F9F9F9]/95 backdrop-blur">

        {/* ════════════════════════════════════════
            MOBILE HEADER  (hidden on md+)
            Layout: [Hamburger] [Logo centered] [Search + Cart]
        ════════════════════════════════════════ */}
        <div className="flex items-center px-3 py-2.5 md:hidden">

          {/* Left — Hamburger slide-out sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                id="mobile-nav-trigger"
                aria-label="Open navigation menu"
                size="icon"
                variant="ghost"
                className="shrink-0 text-[#111111]"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex w-72 flex-col bg-white p-0">
              {/* Drawer header */}
              <SheetHeader className="border-b border-gray-100 px-6 py-5">
                <SheetTitle className="font-serif text-2xl italic text-[#111111]">
                  The Rits Baker
                </SheetTitle>
                <SheetDescription className="text-sm text-gray-500">
                  Freshly baked, handcrafted, made with love.
                </SheetDescription>
              </SheetHeader>

              {/* Nav links */}
              <nav className="flex flex-col px-4 py-2" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center border-b border-gray-100 py-4 text-lg font-medium text-[#111111] transition hover:text-[#006241]"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              {/* Order CTA at bottom of drawer */}
              <div className="mt-auto border-t border-gray-100 p-5">
                <SheetClose asChild>
                  <Link
                    href="/menu"
                    className="flex w-full items-center justify-center rounded-xl bg-[#006241] py-3.5 text-base font-semibold text-white transition hover:bg-[#004F35] active:scale-[0.98]"
                  >
                    View Menu
                  </Link>
                </SheetClose>
                <p className="mt-3 text-center text-xs text-gray-400">
                  Pre-order via WhatsApp · Delivery only
                </p>
              </div>
            </SheetContent>
          </Sheet>

          {/* Center — Logo (absolute center of header bar) */}
          <div className="flex flex-1 justify-center">
            <Link href="/" aria-label="The Rits Baker home">
              <img
                src="/images/logo.png"
                alt="The Rits Baker"
                className="h-auto w-20"
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
              className="text-[#111111]"
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
              className="relative text-[#111111]"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="size-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-[#006241] text-[10px] font-bold leading-none text-white">
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
          <Link href="/" aria-label="The Rits Baker home" className="shrink-0">
            <img
              src="/images/logo.png"
              alt="The Rits Baker"
              className="h-auto w-24 max-w-[120px] sm:w-28"
            />
          </Link>

          <nav className="flex items-center gap-8" aria-label="Desktop navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-wide text-[#111111]/70 transition hover:text-[#006241] hover:underline hover:underline-offset-8"
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
                className="h-9 w-48 rounded-full border border-gray-200 bg-white pl-9 pr-4 text-sm text-[#111111] placeholder:text-gray-400 transition-all duration-200 focus:w-64 focus:border-[#006241]/40 focus:outline-none focus:ring-2 focus:ring-[#006241]/10"
              />
            </form>

            {/* Cart Icon */}
            <Button
              id="header-cart-trigger"
              aria-label="Open shopping cart"
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="size-5 text-[#111111]" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-[#006241] text-[10px] font-bold leading-none text-white">
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
