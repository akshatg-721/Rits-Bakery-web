'use client'

import { MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'

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
import {
  buildCheckoutOrderMessage,
  checkoutWithWhatsApp,
} from '@/lib/checkout'
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

  const checkoutWithLine = () => {
    if (cartItems.length === 0) return

    const orderString = buildCheckoutOrderMessage(cartItems)
    const checkoutUrl = `https://line.me/R/oaMessage/%40theritsbaker/?${encodeURIComponent(orderString)}`

    const checkoutWindow = window.open(
      checkoutUrl,
      '_blank',
      'noopener,noreferrer',
    )

    if (checkoutWindow) {
      checkoutWindow.opener = null
    }
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col border-l border-white/80 bg-white/95 p-0 backdrop-blur-xl sm:max-w-md"
      >
        {/* ── Header ── */}
        <SheetHeader className="border-b border-gray-100/90 px-6 py-5">
          <SheetTitle className="flex items-center gap-2.5 pr-10 text-xl font-semibold text-[#111111]">
            <ShoppingBag className="size-5 text-[#006241]" />
            Your Order
          </SheetTitle>
          <SheetDescription className="text-base leading-6 text-gray-500 sm:text-sm">
            {isEmpty
              ? 'Nothing here yet — time to browse!'
              : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {/* ── Body ── */}
        {isEmpty ? (
          /* ── Empty State ── */
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <div className="flex size-24 items-center justify-center rounded-full bg-[#006241]/10 shadow-[0_18px_40px_rgb(0,98,65,0.10)]">
              <ShoppingBag className="size-10 text-[#006241]/50" />
            </div>
            <div className="space-y-2">
              <p className="font-serif text-2xl italic text-[#111111]">
                Your cart is empty
              </p>
              <p className="text-base leading-7 text-gray-500">
                …and craving some sweets
              </p>
            </div>
            <SheetClose asChild>
              <Button
                id="cart-continue-shopping"
                className="mt-2 rounded-md bg-[#006241] px-8 text-white shadow-[0_10px_24px_rgb(0,98,65,0.18)] hover:-translate-y-0.5 hover:bg-[#004F35] hover:shadow-[0_14px_30px_rgb(0,98,65,0.22)]"
              >
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        ) : (
          /* ── Populated State ── */
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-1 px-5 py-4 sm:px-6">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center gap-4 py-4">
                    {/* Product image thumbnail */}
                    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-100 bg-gray-50 shadow-[0_4px_16px_rgb(0,0,0,0.04)]">
                      <img
                        src={item.image ?? '/menu/curation_teatime.png'}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>

                    {/* Product info + quantity */}
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-base font-medium leading-snug text-[#111111] sm:text-sm">
                          {item.name}
                        </p>
                        <button
                          type="button"
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => removeItem(item.id)}
                          className="flex size-11 shrink-0 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-700 active:scale-[0.94]"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity selector */}
                        <div className="flex min-h-11 items-center gap-0 overflow-hidden rounded-full border border-gray-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.03)]">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.name}`}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex size-11 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-[#111111] active:scale-[0.95]"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-[32px] text-center text-sm font-semibold tabular-nums text-[#111111]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.name}`}
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex size-11 items-center justify-center text-gray-600 transition hover:bg-gray-100 hover:text-[#111111] active:scale-[0.95]"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>

                        {/* Item price */}
                        <p className="text-base font-semibold tabular-nums text-[#111111] sm:text-sm">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {index < cartItems.length - 1 && (
                    <Separator className="bg-gray-100" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* ── Footer (only visible when cart has items) ── */}
        {!isEmpty && (
          <SheetFooter
            className="mt-auto border-t border-gray-100 bg-white/95 px-5 py-5 shadow-[0_-10px_30px_rgb(0,0,0,0.04)] sm:px-6"
            style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
          >
            <div className="flex w-full flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-gray-600 sm:text-sm">
                  Subtotal
                </span>
                <span className="text-lg font-bold tabular-nums text-[#111111]">
                  ฿{totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                <Button
                  id="cart-checkout-line-button"
                  className="min-h-12 w-full cursor-pointer touch-manipulation rounded-md bg-[#06C755] text-base font-semibold leading-tight whitespace-normal text-white shadow-[0_12px_28px_rgb(6,199,85,0.18)] transition-all active:translate-y-0 active:scale-[0.98] md:hover:-translate-y-0.5 md:hover:bg-[#05B54D] md:hover:shadow-[0_16px_36px_rgb(6,199,85,0.22)] [&_svg]:pointer-events-auto"
                  onClick={(event) => {
                    event.stopPropagation()
                    checkoutWithLine()
                  }}
                >
                  <MessageCircle className="size-5 cursor-pointer" />
                  <span className="cursor-pointer">Send Order via LINE</span>
                </Button>
                <Button
                  id="cart-checkout-button"
                  className="min-h-12 w-full cursor-pointer touch-manipulation rounded-md bg-[#006241] text-base font-semibold leading-tight whitespace-normal text-white shadow-[0_12px_28px_rgb(0,98,65,0.18)] transition-all active:translate-y-0 active:scale-[0.98] md:hover:-translate-y-0.5 md:hover:bg-[#004F35] md:hover:shadow-[0_16px_36px_rgb(0,98,65,0.22)] [&_svg]:pointer-events-auto"
                  onClick={(event) => {
                    event.stopPropagation()
                    checkoutWithWhatsApp(cartItems)
                  }}
                >
                  <MessageCircle className="size-5 cursor-pointer" />
                  <span className="cursor-pointer">Send Order via WhatsApp</span>
                </Button>
              </div>
              <p className="text-center text-xs leading-5 text-gray-400">
                We’ll confirm availability, delivery time, and final total in chat.
              </p>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
