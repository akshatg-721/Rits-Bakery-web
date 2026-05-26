'use client'

import { Search, User, ShoppingCart, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { checkoutWithWhatsApp } from '@/lib/checkout'
import { useCart } from '@/lib/cart-context'

export function Header() {
  const { cartItems, removeItem, totalItems, totalPrice } = useCart()
  const hasItems = cartItems.length > 0

  return (
    <header className="border-b border-gray-200 bg-[#FDF2F4]">
      <div className="flex items-center justify-between px-8 py-6">
        {/* Left Navigation */}
        <nav className="flex gap-8">
          <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
            Shop
          </a>
          <a href="/contact" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
            Contact us
          </a>
          <a href="/our-story" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
            Our Story
          </a>
        </nav>

        {/* Center Logo */}
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-serif text-gray-900">The Rits Baker</h1>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <Search size={20} className="text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <User size={20} className="text-gray-700" />
          </button>
          <Sheet>
            <SheetTrigger asChild>
              <button className="relative rounded-lg p-2 transition hover:bg-gray-100">
                <ShoppingCart size={20} className="text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </button>
            </SheetTrigger>
            <SheetContent className="bg-[#FFF8F9]">
              <SheetHeader>
                <SheetTitle className="font-serif text-2xl">Your Cart</SheetTitle>
                <SheetDescription>
                  Review your treats before checking out on WhatsApp.
                </SheetDescription>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-4">
                {hasItems ? (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-4 border-b border-pink-100 pb-4"
                      >
                        <div>
                          <p className="font-serif text-lg italic text-gray-900">
                            {item.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            {item.displayPrice} x {item.quantity}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-gray-900">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>
                        <Button
                          aria-label={`Remove ${item.name}`}
                          className="shrink-0"
                          onClick={() => removeItem(item.id)}
                          size="icon-sm"
                          variant="ghost"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full min-h-64 items-center justify-center rounded-lg border border-dashed border-pink-200 text-center">
                    <p className="max-w-48 text-sm text-gray-600">
                      Your cart is empty. Add a bakery favorite to get started.
                    </p>
                  </div>
                )}
              </div>

              <SheetFooter className="border-t border-pink-100">
                <div className="flex items-center justify-between text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <Button
                  className="bg-gray-900 text-white hover:bg-gray-800"
                  disabled={!hasItems}
                  onClick={() => checkoutWithWhatsApp(cartItems)}
                >
                  Checkout via WhatsApp
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
