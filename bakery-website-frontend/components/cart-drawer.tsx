'use client'

import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useCart } from '@/lib/cart-context'

export function CartDrawer() {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    totalPrice,
    totalItems,
    isCartOpen,
    setCartOpen,
  } = useCart()

  const isEmpty = cartItems.length === 0

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col bg-white p-0 sm:max-w-md"
      >
        {/* ── Header ── */}
        <SheetHeader className="border-b border-gray-200 px-6 py-5">
          <SheetTitle className="flex items-center gap-2.5 text-xl font-semibold text-[#111111]">
            <ShoppingBag className="size-5 text-[#006241]" />
            Your Order
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            {isEmpty
              ? 'Nothing here yet — time to browse!'
              : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {/* ── Body ── */}
        {isEmpty ? (
          /* ── Empty State ── */
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-[#006241]/10">
              <ShoppingBag className="size-9 text-[#006241]/50" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-[#111111]">
                Your cart is empty
              </p>
              <p className="text-sm leading-relaxed text-gray-500">
                …and craving some sweets
              </p>
            </div>
            <SheetClose asChild>
              <Button
                id="cart-continue-shopping"
                className="mt-2 rounded-md bg-[#006241] px-8 text-white hover:bg-[#004F35]"
              >
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        ) : (
          /* ── Populated State ── */
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-1 px-6 py-4">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center gap-4 py-4">
                    {/* Product image thumbnail */}
                    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                      <img
                        src={item.image ?? '/logo.png'}
                        alt=""
                        className="size-10 object-contain opacity-70"
                      />
                    </div>

                    {/* Product info + quantity */}
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug text-[#111111]">
                          {item.name}
                        </p>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => removeItem(item.id)}
                          className="shrink-0 rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity selector */}
                        <div className="flex items-center gap-0 rounded-md border border-gray-200 bg-white">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.name}`}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex size-7 items-center justify-center rounded-l-md text-gray-600 transition hover:bg-gray-100 hover:text-[#111111]"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-[28px] text-center text-xs font-semibold tabular-nums text-[#111111]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.name}`}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex size-7 items-center justify-center rounded-r-md text-gray-600 transition hover:bg-gray-100 hover:text-[#111111]"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>

                        {/* Item price */}
                        <p className="text-sm font-semibold tabular-nums text-[#111111]">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {index < cartItems.length - 1 && (
                    <Separator className="bg-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* ── Footer (only visible when cart has items) ── */}
        {!isEmpty && (
          <SheetFooter className="mt-auto border-t border-gray-200 bg-white px-6 py-5">
            <div className="flex w-full flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Subtotal
                </span>
                <span className="text-lg font-bold tabular-nums text-[#111111]">
                  ฿{totalPrice.toLocaleString()}
                </span>
              </div>
              <Button
                id="cart-checkout-button"
                className="h-12 w-full rounded-md bg-[#006241] text-base font-semibold text-white transition-all hover:bg-[#004F35] hover:shadow-lg active:scale-[0.98]"
              >
                Proceed to Checkout
              </Button>
              <p className="text-center text-xs text-gray-400">
                Shipping &amp; taxes calculated at checkout
              </p>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
