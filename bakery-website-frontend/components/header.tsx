'use client'

import Link from 'next/link'
import { Menu, ShoppingBag } from 'lucide-react'

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
  { label: 'Menu', href: '/#menu' },
  { label: 'About Us', href: '/our-story' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const { totalItems, setCartOpen } = useCart()

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className="w-full bg-[#006241] py-2 px-4 text-center">
        <p className="text-[11px] font-medium tracking-wider text-white/90 uppercase">
          🛵 Delivery only&nbsp;•&nbsp;Pre-order 24 hrs in advance&nbsp;•&nbsp;Bangkok
        </p>
      </div>

      {/* ── Main Header ── */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-[#F9F9F9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link href="/" aria-label="The Rits Baker home" className="shrink-0">
            <img
              src="/images/logo.png"
              alt="The Rits Baker"
              className="h-auto w-24 max-w-[120px] sm:w-28"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
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
            {/* ── Order Now CTA ── */}
            <Link
              href="/#menu"
              className="hidden md:inline-flex items-center gap-1.5 rounded-md bg-[#006241] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#004F35] active:scale-[0.98]"
            >
              Order Now
            </Link>

            {/* ── Cart Icon ── */}
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

            {/* ── Mobile Nav Sheet ── */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  aria-label="Open navigation menu"
                  className="md:hidden"
                  size="icon"
                  variant="ghost"
                >
                  <Menu className="size-6 text-[#111111]" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80 bg-white">
                <SheetHeader className="text-left">
                  <SheetTitle className="font-serif text-2xl text-[#111111]">The Rits Baker</SheetTitle>
                  <SheetDescription>
                    Freshly baked, handcrafted, and made with a homemade heart.
                  </SheetDescription>
                </SheetHeader>

                <nav className="mt-8 flex flex-col px-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.href}
                        className="border-b border-gray-200 py-4 text-base font-medium text-[#111111] transition hover:text-[#006241]"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      href="/#menu"
                      className="mt-6 flex items-center justify-center rounded-md bg-[#006241] py-3 text-base font-semibold text-white transition hover:bg-[#004F35]"
                    >
                      Order Now
                    </Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Cart Drawer rendered once at the top level */}
      <CartDrawer />
    </>
  )
}
