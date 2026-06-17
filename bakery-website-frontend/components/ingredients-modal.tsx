'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Drawer as DrawerPrimitive } from 'vaul'
import {
  X, Leaf, Zap, ShoppingBag, Check, Plus, Minus, ZoomIn,
} from 'lucide-react'

import type { MenuProduct } from '@/lib/menu-data'
import { menuProducts } from '@/lib/menu-data'
import { cn } from '@/lib/utils'

// ── Allergen config ───────────────────────────────────────────────────────────
const ALLERGEN_CONFIG: Record<string, { emoji: string; label: string }> = {
  Gluten: { emoji: '🌾', label: 'Gluten' },
  Dairy:  { emoji: '🥛', label: 'Dairy'  },
  Nuts:   { emoji: '🥜', label: 'Nuts'   },
  Soy:    { emoji: '🫘', label: 'Soy'    },
  Eggs:   { emoji: '🥚', label: 'Eggs'   },
}

// ── Helper: find related products ─────────────────────────────────────────────
function getRelatedProducts(product: MenuProduct): MenuProduct[] {
  // menuProducts items have category info (MenuProductWithCategory)
  const withCat = menuProducts as (MenuProduct & { category?: string })[]

  // Find this product's category
  const thisCat = withCat.find((p) => p.id === product.id)?.category ?? ''

  // 1. Same category first (exclude self), up to 4
  const sameCat = withCat
    .filter((p) => p.id !== product.id && p.category === thisCat)
    .slice(0, 4)

  // 2. Pad with top sellers from other categories
  const topSellers = withCat
    .filter(
      (p) =>
        p.id !== product.id &&
        p.isTopSeller &&
        !sameCat.some((r) => r.id === p.id),
    )
    .slice(0, Math.max(0, 4 - sameCat.length))

  return [...sameCat, ...topSellers].slice(0, 4)
}

// ── Fullscreen image zoom viewer (rendered via portal) ────────────────────────
function ImageZoomViewer({
  src,
  alt,
  onClose,
}: {
  src: string
  alt: string
  onClose: () => void
}) {
  const [scale, setScale] = useState(1)
  const lastPinchDist = useRef<number | null>(null)
  const lastTapTime    = useRef(0)
  const touchStartY    = useRef(0)

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const pinchDist = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      lastPinchDist.current = pinchDist(e.touches)
    } else {
      touchStartY.current = e.touches[0].clientY
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastPinchDist.current !== null) {
      e.preventDefault()
      const newDist = pinchDist(e.touches)
      const delta   = newDist / lastPinchDist.current
      setScale((s) => Math.min(4, Math.max(1, s * delta)))
      lastPinchDist.current = newDist
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    lastPinchDist.current = null

    if (e.changedTouches.length === 1) {
      // Swipe-down to close when not zoomed
      const dy = e.changedTouches[0].clientY - touchStartY.current
      if (scale <= 1.1 && dy > 80) { onClose(); return }

      // Double-tap zoom toggle
      const now = Date.now()
      if (now - lastTapTime.current < 280) {
        setScale((s) => (s > 1.5 ? 1 : 2.5))
      }
      lastTapTime.current = now
    }
  }

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Zoomed image of ${alt}`}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black animate-in fade-in duration-200"
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <X className="size-5" />
      </button>

      {/* Image */}
      <div
        className="relative flex h-full w-full cursor-zoom-in items-center justify-center overflow-hidden"
        style={{ touchAction: 'none' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={() => setScale((s) => (s > 1.5 ? 1 : 2.5))}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="max-h-full max-w-full select-none object-contain transition-transform duration-150"
          style={{ transform: `scale(${scale})` }}
        />
      </div>

      {/* Hint */}
      <p className="pointer-events-none absolute bottom-6 left-0 right-0 text-center text-[11px] text-white/40">
        {scale > 1
          ? 'Double-tap to reset zoom'
          : 'Pinch or double-tap to zoom · Swipe down to close'}
      </p>
    </div>
  )

  // Portal escapes any parent transform/overflow constraints
  return createPortal(content, document.body)
}

// ── Compact related-product card ──────────────────────────────────────────────
function RelatedProductCard({
  product,
  onClick,
}: {
  product: MenuProduct
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View ${product.name}`}
      className="flex-none w-[104px] overflow-hidden rounded-xl bg-zinc-50 ring-1 ring-zinc-200 text-left transition hover:ring-[#006241]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006241]"
    >
      <div className="relative h-[72px] w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {product.isTopSeller && (
          <span className="absolute left-1.5 top-1.5 rounded bg-white/90 px-1 py-0.5 text-[8px] font-bold uppercase tracking-wider text-zinc-800">
            Top
          </span>
        )}
      </div>
      <div className="px-2 py-2">
        <p className="line-clamp-2 text-[10px] font-medium leading-tight text-zinc-800">
          {product.name}
        </p>
        <p className="mt-0.5 text-[9.5px] text-zinc-400">{product.price}</p>
      </div>
    </button>
  )
}

// ── Main modal body ───────────────────────────────────────────────────────────
interface BodyProps {
  initialProduct: MenuProduct
  onAddToCart?: (product: MenuProduct) => void
  onOpenCart?: () => void
  onClose: () => void
}

function ModalBody({ initialProduct, onAddToCart, onOpenCart, onClose }: BodyProps) {
  const [currentProduct, setCurrentProduct] = useState(initialProduct)
  const [quantity,        setQuantity]       = useState(1)
  const [isAdded,         setIsAdded]        = useState(false)
  const [isBuyNow,        setIsBuyNow]       = useState(false)
  const [showZoom,        setShowZoom]       = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Reset whenever the modal is pointed at a new product from the outside
  useEffect(() => {
    setCurrentProduct(initialProduct)
    setQuantity(1)
    setIsAdded(false)
    setIsBuyNow(false)
    setShowZoom(false)
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [initialProduct.id])

  const relatedProducts = useMemo(
    () => getRelatedProducts(currentProduct),
    [currentProduct.id], // eslint-disable-line react-hooks/exhaustive-deps
  )

  const navigateTo = (p: MenuProduct) => {
    setCurrentProduct(p)
    setQuantity(1)
    setIsAdded(false)
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
  }

  const totalPrice    = currentProduct.numericPrice * quantity
  const hasIngredients = (currentProduct.ingredients?.length ?? 0) > 0
  const hasAllergens   = (currentProduct.allergens?.length ?? 0) > 0
  const hasRelated     = relatedProducts.length > 0

  const addUnitsToCart = () => {
    if (!onAddToCart) return
    for (let i = 0; i < quantity; i++) onAddToCart(currentProduct)
  }

  const handleAddToCart = () => {
    addUnitsToCart()
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
      onClose()
    }, 1300)
  }

  const handleBuyNow = () => {
    addUnitsToCart()
    setIsBuyNow(true)
    // Brief flash then close modal and open cart
    setTimeout(() => {
      setIsBuyNow(false)
      onClose()
      onOpenCart?.()
    }, 600)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">

      {/* ── Fullscreen zoom (portal) ── */}
      {showZoom && (
        <ImageZoomViewer
          src={currentProduct.image}
          alt={currentProduct.name}
          onClose={() => setShowZoom(false)}
        />
      )}

      {/* ── Scrollable body ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-contain"
      >
        {/* Hero image — tappable for zoom */}
        <div className="relative h-56 w-full shrink-0 sm:h-64">
          <button
            type="button"
            aria-label={`Tap to zoom image of ${currentProduct.name}`}
            onClick={() => setShowZoom(true)}
            className="block h-full w-full focus-visible:outline-none"
          >
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="h-full w-full object-cover"
            />
          </button>
          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/28 via-transparent to-black/12" />
          {/* Zoom hint chip */}
          <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/25 px-2 py-1 backdrop-blur-sm">
            <ZoomIn className="size-2.5 text-white" aria-hidden="true" />
            <span className="text-[8.5px] font-semibold text-white/90">Tap to zoom</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pt-5 sm:px-6">

          {/* EGGLESS eyebrow */}
          <p className="mb-1.5 text-[9px] font-black uppercase tracking-[0.32em] text-[#006241]">
            Eggless
          </p>

          {/* Product name — strongest visual element */}
          <h2 className="font-serif text-[1.65rem] leading-tight text-zinc-900 sm:text-[1.9rem]">
            {currentProduct.name}
          </h2>

          {/* Price */}
          <p className="mt-1.5 text-[13px] font-semibold text-zinc-400">
            {currentProduct.price}
          </p>

          {/* ── Ingredients ── */}
          {hasIngredients && (
            <>
              <div className="mt-5 h-px bg-zinc-100" />
              <section className="mt-5" aria-label="Ingredients">
                <div className="mb-3 flex items-center gap-1.5">
                  <Leaf className="size-3 text-[#006241]" aria-hidden="true" />
                  <h3 className="text-[9.5px] font-black uppercase tracking-[0.22em] text-zinc-400">
                    Ingredients
                  </h3>
                </div>
                <div className="flex flex-wrap gap-[6px]">
                  {currentProduct.ingredients!.map((ing) => (
                    <span
                      key={ing}
                      className="rounded-full bg-zinc-50 px-3 py-[3px] text-[11px] leading-tight text-zinc-600 ring-1 ring-zinc-200"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* ── Allergens ── */}
          {hasAllergens && (
            <>
              <div className="mt-5 h-px bg-zinc-100" />
              <section className="mt-5" aria-label="Allergens">
                <div className="mb-3 flex items-center gap-1.5">
                  <Zap className="size-3 text-amber-500" aria-hidden="true" />
                  <h3 className="text-[9.5px] font-black uppercase tracking-[0.22em] text-zinc-400">
                    Contains Allergens
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.allergens!.map((a) => {
                    const cfg = ALLERGEN_CONFIG[a] ?? { emoji: '⚠️', label: a }
                    return (
                      <span
                        key={a}
                        className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-[5px] text-[11.5px] font-semibold text-amber-800 ring-1 ring-amber-300"
                      >
                        <span aria-hidden="true">{cfg.emoji}</span>
                        {cfg.label}
                      </span>
                    )
                  })}
                </div>
              </section>
            </>
          )}

          {/* ── You May Also Like ── */}
          {hasRelated && (
            <>
              <div className="mt-5 h-px bg-zinc-100" />
              <section className="mt-5" aria-label="Related products">
                <h3 className="mb-3 text-[9.5px] font-black uppercase tracking-[0.22em] text-zinc-400">
                  You May Also Like
                </h3>
                <div className="flex gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {relatedProducts.map((p) => (
                    <RelatedProductCard
                      key={p.id}
                      product={p}
                      onClick={() => navigateTo(p)}
                    />
                  ))}
                </div>
              </section>
            </>
          )}

          {/* Bottom breathing room before sticky footer */}
          <div className="h-4" />
        </div>
      </div>

      {/* ── Sticky footer: quantity + two-button CTA ── */}
      {onAddToCart && (
        <div className="shrink-0 border-t border-zinc-100 bg-white px-5 pt-4 pb-4 shadow-[0_-10px_30px_rgb(0,0,0,0.07)] sm:px-6">

          {/* Quantity row */}
          <div className="mb-3.5 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-zinc-400">
                Quantity
              </p>
              {quantity > 1 && (
                <p className="mt-0.5 text-[11px] text-zinc-400">
                  {quantity}&thinsp;×&thinsp;฿{currentProduct.numericPrice}
                  &ensp;=&ensp;
                  <span className="font-semibold text-zinc-600">฿{totalPrice}</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full border transition',
                  quantity <= 1
                    ? 'border-zinc-200 text-zinc-300 cursor-not-allowed'
                    : 'border-zinc-300 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 active:scale-95',
                )}
              >
                <Minus className="size-3.5" />
              </button>

              <span
                className="w-7 text-center text-[18px] font-semibold tabular-nums text-zinc-900"
                aria-live="polite"
                aria-label={`Quantity: ${quantity}`}
              >
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900 active:scale-95"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Two-button CTA row */}
          <div className="flex gap-2.5">
            {/* ── Add to Cart (secondary) ── */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdded || isBuyNow}
              aria-label={
                isAdded
                  ? `${currentProduct.name} added to cart`
                  : `Add ${quantity} ${currentProduct.name} to cart`
              }
              className={cn(
                'flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl border text-[11.5px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2',
                isAdded
                  ? 'border-[#2a3c24] bg-[#2a3c24] text-white'
                  : 'border-zinc-300 bg-white text-zinc-800 hover:border-zinc-900 hover:text-zinc-900',
              )}
            >
              {isAdded ? (
                <>
                  <Check className="size-3.5" aria-hidden="true" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingBag className="size-3.5" aria-hidden="true" />
                  Add to Cart
                </>
              )}
            </button>

            {/* ── Buy Now (primary) ── */}
            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isAdded || isBuyNow}
              aria-label={`Buy ${quantity} ${currentProduct.name} now`}
              className={cn(
                'flex h-12 flex-1 items-center justify-center gap-1.5 rounded-xl text-[11.5px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006241] focus-visible:ring-offset-2',
                isBuyNow
                  ? 'bg-[#006241] text-white'
                  : 'bg-[#111111] text-white hover:bg-[#006241]',
              )}
            >
              {isBuyNow ? (
                <>
                  <Check className="size-3.5" aria-hidden="true" />
                  Going to Cart…
                </>
              ) : (
                <span className="flex items-center gap-1.5">
                  Buy Now
                  <span className="font-normal opacity-70">·&nbsp;฿{totalPrice}</span>
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Public props ──────────────────────────────────────────────────────────────
export interface IngredientsModalProps {
  product: MenuProduct
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddToCart?: (product: MenuProduct) => void
  onOpenCart?: () => void
}

// ── Main export — Drawer on mobile · Dialog on desktop ────────────────────────
export function IngredientsModal({
  product,
  open,
  onOpenChange,
  onAddToCart,
  onOpenCart,
}: IngredientsModalProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const close = () => onOpenChange(false)

  // Close button — shared style: small glass pill over hero image
  const closeButtonCls =
    'absolute right-3.5 top-3.5 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70'

  // ── Mobile: Vaul bottom-sheet ─────────────────────────────────────────────
  if (isMobile) {
    return (
      <DrawerPrimitive.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground>
        <DrawerPrimitive.Portal>
          <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DrawerPrimitive.Content
            aria-label={`Product details for ${product.name}`}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92dvh] flex-col rounded-t-3xl bg-white shadow-2xl outline-none"
          >
            <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-zinc-300" aria-hidden="true" />

            <DrawerPrimitive.Close aria-label="Close product details" className={closeButtonCls}>
              <X className="size-3.5" />
            </DrawerPrimitive.Close>

            <DrawerPrimitive.Title className="sr-only">{product.name}</DrawerPrimitive.Title>
            <DrawerPrimitive.Description className="sr-only">
              Product details, ingredients and allergens for {product.name}
            </DrawerPrimitive.Description>

            <ModalBody initialProduct={product} onAddToCart={onAddToCart} onOpenCart={onOpenCart} onClose={close} />
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Portal>
      </DrawerPrimitive.Root>
    )
  }

  // ── Desktop: Radix Dialog ─────────────────────────────────────────────────
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-label={`Product details for ${product.name}`}
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2',
            'flex max-h-[88vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
            'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
            'duration-200 outline-none',
          )}
        >
          <DialogPrimitive.Close aria-label="Close product details" className={closeButtonCls}>
            <X className="size-3.5" />
          </DialogPrimitive.Close>

          <DialogPrimitive.Title className="sr-only">{product.name}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Product details, ingredients and allergens for {product.name}
          </DialogPrimitive.Description>

          <ModalBody initialProduct={product} onAddToCart={onAddToCart} onOpenCart={onOpenCart} onClose={close} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
