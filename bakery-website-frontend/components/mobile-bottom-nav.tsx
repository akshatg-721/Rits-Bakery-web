'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CakeSlice, Home, ImageIcon, MoreHorizontal } from 'lucide-react'

import { WHATSAPP_ORDER_URL } from '@/lib/checkout'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/', icon: Home, match: (pathname: string) => pathname === '/' },
  { label: 'Menu', href: '/menu', icon: CakeSlice, match: (pathname: string) => pathname.startsWith('/menu') },
  { label: 'Gallery', href: '/gallery', icon: ImageIcon, match: (pathname: string) => pathname.startsWith('/gallery') },
] as const

const moreLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
] as const

export function MobileBottomNav() {
  const pathname = usePathname()
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  useEffect(() => {
    setIsMoreOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMoreOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMoreOpen])

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isMoreOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setIsMoreOpen(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-[60] rounded-t-3xl border-t border-zinc-200/50 bg-white/80 p-6 pb-12 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-transform duration-300 ease-out md:hidden',
          isMoreOpen ? 'translate-y-0' : 'translate-y-full',
        )}
        aria-hidden={!isMoreOpen}
      >
        <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-zinc-300" />

        <div className="flex flex-col">
          {moreLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMoreOpen(false)}
              className="block w-full border-b border-zinc-100/50 py-3 text-xl font-medium text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={WHATSAPP_ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMoreOpen(false)}
            className="block w-full border-b border-zinc-100/50 py-3 text-xl font-medium text-zinc-900"
          >
            Track Order
          </a>
        </div>
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-[70] flex items-center justify-around border-t border-zinc-200/50 bg-white/70 px-2 pt-2 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] backdrop-blur-xl md:hidden"
        aria-label="Mobile bottom navigation"
      >
        {navItems.map(({ label, href, icon: Icon, match }) => {
          const isActive = match(pathname)

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex w-full flex-col items-center justify-center gap-1 py-2 transition-colors',
                isActive ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-900',
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium uppercase tracking-widest">
                {label}
              </span>
            </Link>
          )
        })}

        <button
          type="button"
          onClick={() => setIsMoreOpen((open) => !open)}
          aria-label="Open more navigation options"
          aria-expanded={isMoreOpen}
          className={cn(
            'flex w-full flex-col items-center justify-center gap-1 py-2 transition-colors',
            isMoreOpen ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-900',
          )}
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="text-[10px] font-medium uppercase tracking-widest">
            More
          </span>
        </button>
      </nav>
    </>
  )
}
