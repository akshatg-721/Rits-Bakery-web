'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Facebook, Instagram, Menu, Search, ShoppingBag } from 'lucide-react'

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
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const { totalItems, setCartOpen } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/menu?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSearchIconClick = () => {
    if (pathname !== '/menu') {
      router.push('/menu?searchFocus=true')
      return
    }

    router.push('/menu?searchFocus=true')
  }

  return (
    <>
      {/* ── Main Header ── */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 w-full bg-white/70 backdrop-blur-md border-b border-zinc-200/40 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.03)]"
        style={{ WebkitBackdropFilter: 'blur(12px)', backdropFilter: 'blur(12px)' }}
      >

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

            <SheetContent
              side="left"
              className="flex w-[min(90vw,24rem)] flex-col border-r border-white/30 bg-white/90 p-0 shadow-[4px_0_60px_-10px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
            >
              {/* ── Branding Header ── */}
              <SheetHeader className="relative overflow-hidden border-b border-[#006241]/8 px-7 pb-7 pt-8">
                {/* Subtle green orb */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full bg-[#006241]/6 blur-3xl"
                />
                <SheetTitle className="font-serif text-[1.6rem] italic leading-tight tracking-tight text-[#111111]">
                  The Rits Baker
                </SheetTitle>
                <SheetDescription className="mt-1 text-[13px] font-light leading-relaxed tracking-[0.12em] text-gray-400 uppercase">
                  Freshly baked &middot; Handcrafted &middot; Made with love
                </SheetDescription>
              </SheetHeader>

              {/* ── Navigation Links ── */}
              <nav className="flex flex-col px-4 py-5" aria-label="Mobile navigation">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href
                  return (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileNavOpen(false)}
                        style={{
                          animationDelay: `${index * 55}ms`,
                          animationFillMode: 'both',
                        }}
                        className={`
                          group relative flex min-h-[52px] items-center gap-4 rounded-xl px-4
                          text-[15px] font-medium transition-all duration-200
                          [animation-name:navSlideUp]
                          hover:bg-[#006241]/5
                          active:scale-[0.98]
                          ${
                            isActive
                              ? 'text-[#006241]'
                              : 'text-[#2a2a2a] hover:text-[#006241]'
                          }
                        `}
                      >
                        {/* Active indicator — slim left accent bar */}
                        <span
                          className={`absolute left-0 top-[18%] h-[64%] w-[3px] rounded-full transition-all duration-300 ${
                            isActive
                              ? 'bg-[#006241] opacity-100'
                              : 'bg-[#006241]/0 opacity-0 group-hover:bg-[#006241]/40 group-hover:opacity-100'
                          }`}
                        />
                        <span className="flex-1">{link.label}</span>
                        {isActive && (
                          <span className="size-1.5 rounded-full bg-[#006241]" />
                        )}
                      </Link>
                    </SheetClose>
                  )
                })}
              </nav>

              {/* ── Bottom CTA + Footer ── */}
              <div className="mt-auto border-t border-gray-100/70 px-6 pb-8 pt-5">
                {/* Pill CTA */}
                <SheetClose asChild>
                  <Link
                    href="/menu"
                    onClick={() => setMobileNavOpen(false)}
                    className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#006241] px-6 text-[15px] font-semibold tracking-wide text-white shadow-[0_12px_32px_-4px_rgb(0,98,65,0.30)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#004F35] hover:shadow-[0_16px_40px_-4px_rgb(0,98,65,0.36)] active:translate-y-0 active:scale-[0.98]"
                  >
                    View Menu
                  </Link>
                </SheetClose>

                {/* ── Social footer ── */}
                <div className="mt-7 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-8">
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/theritsbaker/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="group text-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:text-[#006241]"
                    >
                      <Instagram
                        className="size-6"
                        strokeWidth={1.5}
                      />
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/theritsbaker"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="group text-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:text-[#006241]"
                    >
                      <Facebook
                        className="size-6"
                        strokeWidth={1.5}
                      />
                    </a>
                  </div>

                  <p className="text-[11px] tracking-[0.08em] text-zinc-400">
                    &copy; {new Date().getFullYear()} The Rits Baker
                  </p>
                </div>
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
              onClick={handleSearchIconClick}
            >
              <Search className="size-5" />
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
