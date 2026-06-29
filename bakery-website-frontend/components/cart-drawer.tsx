'use client'

import { useState, useEffect } from 'react'
import {
  CalendarClock,
  Gift,
  Loader2,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { checkoutWithLine, checkoutWithWhatsApp } from '@/lib/checkout'
import { useCart } from '@/lib/cart-context'
import { getValidDeliveryDates, getAvailableTimeSlots, TIME_SLOTS } from '@/lib/delivery-utils'

export function CartDrawer() {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    totalPrice,
    totalItems,
    isCartOpen,
    setCartOpen,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    deliveryDetails,
    setDeliveryDetails,
    deliveryDate,
    setDeliveryDate,
    deliveryTime,
    setDeliveryTime,
  } = useCart()

  const [couponCode, setCouponCode] = useState('')
  const [isExpanding, setIsExpanding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isDeliveryExpanding, setIsDeliveryExpanding] = useState(false)
  const [validDates, setValidDates] = useState<ReturnType<typeof getValidDeliveryDates>>([])
  const [previousAppliedCoupon, setPreviousAppliedCoupon] = useState<string | null>(null)

  // Hydration safe: initialize valid dates on client only
  useEffect(() => {
    setValidDates(getValidDeliveryDates())
  }, [])

  // Track when coupon is auto-removed and surface a user-facing message
  useEffect(() => {
    if (previousAppliedCoupon && !appliedCoupon) {
      setError('Promo code removed: cart subtotal dropped below the required minimum spend.')
    }
    setPreviousAppliedCoupon(appliedCoupon?.code || null)
  }, [appliedCoupon, previousAppliedCoupon])

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/check-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode }),
      })
      const data = await response.json()
      if (data.success) {
        const result = applyCoupon({
          code: data.code,
          type: data.type,
          value: data.value,
          minAmount: typeof data.minAmount === 'number' ? data.minAmount : 0,
        })
        if (!result.success) {
          setError(result.error || '')
        } else {
          setCouponCode('')
          setIsExpanding(false)
        }
      } else {
        setError(data.message || 'Invalid code')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const isEmpty = cartItems.length === 0

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="flex h-full max-h-screen min-h-0 w-full flex-col overflow-hidden border-l border-white/80 bg-white/95 p-0 backdrop-blur-xl sm:max-w-md"
      >
        {/* ── Header ── */}
        <SheetHeader className="shrink-0 border-b border-gray-100/90 px-6 py-5">
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
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6">
            <div className="flex flex-col gap-1 pr-1">
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center gap-4 py-4">
                    {/* Product image thumbnail */}
                    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-100 bg-gray-50 shadow-[0_4px_16px_rgb(0,0,0,0.04)]">
                      <img
                        src={item.image ?? '/menu/curation_teatime.webp'}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>

                    {/* Product info + quantity */}
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-base font-medium leading-snug text-[#111111] sm:text-sm">
                            {item.name}
                          </p>
                          {item.packageLabel && (
                            <span className="mt-1 block text-[10px] font-medium leading-none tracking-[0.12em] text-neutral-400">
                              {item.packageLabel}
                            </span>
                          )}
                        </div>
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
          </div>
        )}

        {/* ── Footer (only visible when cart has items) ── */}
        {!isEmpty && (
          <SheetFooter
            className="mt-auto shrink-0 border-t border-gray-100 bg-white/95 px-5 py-5 shadow-[0_-10px_30px_rgb(0,0,0,0.04)] sm:px-6"
            style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
          >
            <div className="flex w-full flex-col gap-4">
              {/* ── Promo Code Section ── */}
              <div className="flex flex-col gap-2">
                {!appliedCoupon ? (
                  !isExpanding ? (
                    <button
                      onClick={() => setIsExpanding(true)}
                      className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-[#006241] transition-colors hover:text-[#004F35]"
                    >
                      <Tag className="size-3" />
                      Have a promo code?
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Enter code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="h-9"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleApplyCoupon()
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={handleApplyCoupon}
                          disabled={isLoading || !couponCode.trim()}
                          className="h-9 bg-[#006241] px-4 text-xs font-semibold text-white hover:bg-[#004F35]"
                        >
                          {isLoading ? (
                            <Loader2 className="size-3 animate-spin" />
                          ) : (
                            'Apply'
                          )}
                        </Button>
                        <button
                          onClick={() => {
                            setIsExpanding(false)
                            setError('')
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                      {error && (
                        <p className="text-[11px] font-medium text-red-500">
                          {error}
                        </p>
                      )}

                      {/* ── VIP Promo Code Notice ── */}
                      <div className="flex items-start gap-1.5 mt-2 px-1">
                        <Gift className="mt-0.5 size-3.5 shrink-0 text-[#006241]/70" />
                        <p className="text-[11px] leading-tight text-muted-foreground/80">
                          Spend ฿5,000/month to unlock VIP codes.{' '}
                          <a
                            href="mailto:theritsbaker@gmail.com"
                            className="font-normal text-muted-foreground underline decoration-muted-foreground/40 hover:text-primary transition-colors"
                          >
                            Email us
                          </a>{' '}
                          to claim.
                        </p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-between rounded-md bg-[#006241]/5 px-3 py-2 border border-[#006241]/10">
                    <div className="flex items-center gap-2">
                      <Tag className="size-3.5 text-[#006241]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#006241]">
                        {appliedCoupon.code} Applied
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[#006241] hover:text-red-500 transition-colors"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-gray-600 sm:text-sm">
                    Subtotal
                  </span>
                  <span
                    className={`text-lg font-bold tabular-nums text-[#111111] ${
                      appliedCoupon ? 'text-sm font-normal text-gray-400 line-through' : ''
                    }`}
                  >
                    ฿{totalPrice.toLocaleString()}
                  </span>
                </div>

                {appliedCoupon && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-[#006241] sm:text-sm">
                        Discount
                      </span>
                      <span className="text-base font-bold tabular-nums text-[#006241]">
                        -฿{discountAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-base font-bold text-[#111111] sm:text-sm">
                        Total
                      </span>
                      <span className="text-xl font-bold tabular-nums text-[#111111]">
                        ฿{(totalPrice - discountAmount).toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* ── Delivery Details Section ── */}
              <div className="flex flex-col gap-2">
                {!isDeliveryExpanding ? (
                  <button
                    onClick={() => setIsDeliveryExpanding(true)}
                    className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-[#006241] transition-colors hover:text-[#004F35]"
                  >
                    <MapPin className="size-3" />
                    + Add Delivery Details (Optional)
                  </button>
                ) : (
                  <div className="flex flex-col gap-3">
                    {/* Delivery Schedule Container */}
                    <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
                      <div className="flex items-center gap-1.5 mb-2 text-xs font-medium text-gray-600">
                        <CalendarClock className="size-3.5" />
                        Delivery Schedule (Optional)
                      </div>
                      <div className="flex flex-row gap-2 w-full">
                        {/* Date Selector */}
                        <select
                          value={deliveryDate || ''}
                          onChange={(e) => {
                            const newDate = e.target.value || null
                            setDeliveryDate(newDate)
                            if (!newDate) {
                              setDeliveryTime(null)
                            }
                          }}
                          className="flex-1 h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006241] focus:border-transparent"
                        >
                          <option value="">Select Date</option>
                          {validDates.map((date) => (
                            <option key={date.value} value={date.value}>
                              {date.label}
                            </option>
                          ))}
                        </select>

                        {/* Time Slot Selector */}
                        <select
                          value={deliveryTime || ''}
                          onChange={(e) => setDeliveryTime(e.target.value || null)}
                          disabled={!deliveryDate}
                          className="flex-1 h-9 w-full rounded-md border border-gray-200 bg-white px-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006241] focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
                        >
                          <option value="">Select Time</option>
                          {getAvailableTimeSlots(deliveryDate || '').map((slot) => (
                            <option key={slot.id} value={slot.id} disabled={slot.disabled}>
                              {slot.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Address and Map URL */}
                    <div className="flex flex-col gap-2">
                      <Textarea
                        placeholder="Building, Unit, Soi, Road..."
                        value={deliveryDetails.address}
                        onChange={(e) =>
                          setDeliveryDetails({ ...deliveryDetails, address: e.target.value })
                        }
                        className="resize-none"
                        rows={3}
                      />
                      <Input
                        placeholder="Paste Google Maps Link (Optional)"
                        value={deliveryDetails.mapsUrl}
                        onChange={(e) =>
                          setDeliveryDetails({ ...deliveryDetails, mapsUrl: e.target.value })
                        }
                      />
                    </div>
                    <button
                      onClick={() => setIsDeliveryExpanding(false)}
                      className="inline-flex w-fit items-center gap-1.5 text-[11px] text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X className="size-3" />
                      Hide
                    </button>
                  </div>
                )}
              </div>

              <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
                <Button
                  id="cart-checkout-line-button"
                  className="min-h-12 w-full cursor-pointer touch-manipulation rounded-md bg-[#06C755] text-base font-semibold leading-tight whitespace-normal text-white shadow-[0_12px_28px_rgb(6,199,85,0.18)] transition-all active:translate-y-0 active:scale-[0.98] md:hover:-translate-y-0.5 md:hover:bg-[#05B54D] md:hover:shadow-[0_16px_36px_rgb(6,199,85,0.22)] [&_svg]:pointer-events-auto"
                  onClick={(event) => {
                    event.stopPropagation()
                    checkoutWithLine(cartItems, appliedCoupon, discountAmount, deliveryDetails, deliveryDate, deliveryTime)
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
                    checkoutWithWhatsApp(cartItems, appliedCoupon, discountAmount, deliveryDetails, deliveryDate, deliveryTime)
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
