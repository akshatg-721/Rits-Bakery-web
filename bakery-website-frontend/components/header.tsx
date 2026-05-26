'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'

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

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/#menu' },
  { label: 'About Us', href: '/our-story' },
  { label: 'Order Custom Cake', href: '/contact' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-[#FFFBF4]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
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
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-stone-700 transition hover:text-stone-950 hover:underline hover:underline-offset-8"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label="Open navigation menu"
              className="md:hidden"
              size="icon"
              variant="ghost"
            >
              <Menu className="size-6 text-stone-800" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80 bg-[#FFFBF4]">
            <SheetHeader className="text-left">
              <SheetTitle className="font-serif text-2xl">The Rits Baker</SheetTitle>
              <SheetDescription>
                Freshly baked, handcrafted, and made with a homemade heart.
              </SheetDescription>
            </SheetHeader>

            <nav className="mt-8 flex flex-col px-4">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="border-b border-stone-200 py-4 text-base font-medium text-stone-800 transition hover:text-stone-950"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
