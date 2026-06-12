'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export interface CartProduct {
  id: string
  name: string
  price: number
  displayPrice: string
  description?: string
  image?: string
  vegan?: boolean
}

export interface CartItem extends CartProduct {
  quantity: number
}

export interface Coupon {
  code: string
  type: 'flat' | 'percent'
  value: number
  minAmount?: number
}

export interface DeliveryDetails {
  address: string
  mapsUrl: string
}

interface CartContextValue {
  cartItems: CartItem[]
  addItem: (product: CartProduct) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  appliedCoupon: Coupon | null
  applyCoupon: (coupon: Coupon) => { success: boolean; error?: string }
  removeCoupon: () => void
  discountAmount: number
  deliveryDetails: DeliveryDetails
  setDeliveryDetails: (details: DeliveryDetails) => void
  deliveryDate: string | null
  setDeliveryDate: (date: string | null) => void
  deliveryTime: string | null
  setDeliveryTime: (time: string | null) => void
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [isCartOpen, setCartOpen] = useState(false)
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    address: '',
    mapsUrl: '',
  })
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null)
  const [deliveryTime, setDeliveryTime] = useState<string | null>(null)

  // Load delivery details from localStorage on mount (hydration safe)
  useEffect(() => {
    const stored = localStorage.getItem('rits-baker-delivery-details')
    if (stored) {
      try {
        setDeliveryDetails(JSON.parse(stored))
      } catch {
        // ignore invalid JSON
      }
    }
  }, [])

  // Save delivery details to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rits-baker-delivery-details', JSON.stringify(deliveryDetails))
  }, [deliveryDetails])

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0
    let discount: number
    if (appliedCoupon.type === 'percent') {
      // Math.floor — never round up a discount
      discount = Math.floor((totalPrice * appliedCoupon.value) / 100)
    } else {
      discount = appliedCoupon.value
    }
    // Discount can never exceed what the customer actually owes
    return Math.min(discount, totalPrice)
  }, [appliedCoupon, totalPrice])

  // Auto-remove coupon if subtotal drops below the coupon's required minimum.
  // Sheet authority: if minAmount is explicitly set (even to 0), respect it.
  // Only fall back to the global ฿300 floor when minAmount is undefined.
  useEffect(() => {
    if (!appliedCoupon) return
    const effectiveMin =
      typeof appliedCoupon.minAmount === 'number'
        ? appliedCoupon.minAmount
        : 300
    if (totalPrice < effectiveMin) {
      setAppliedCoupon(null)
    }
  }, [totalPrice, appliedCoupon])

  const addItem = useCallback((product: CartProduct) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id)

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...items, { ...product, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((items) => items.filter((item) => item.id !== id))
    } else {
      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      )
    }
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
    setAppliedCoupon(null)
  }, [])

  const applyCoupon = useCallback((coupon: Coupon) => {
    // Sheet is the source of truth. minAmount is explicitly set in the CSV:
    //   - number (including 0) → honour it exactly (0 means no minimum)
    //   - undefined            → fall back to global ฿300 store floor
    const effectiveMin =
      typeof coupon.minAmount === 'number' ? coupon.minAmount : 300
    if (effectiveMin > 0 && totalPrice < effectiveMin) {
      return {
        success: false,
        error: `Minimum order of ฿${effectiveMin} required for this promo code.`,
      }
    }
    // Store code in uppercase to match the sanitised API response.
    setAppliedCoupon({ ...coupon, code: coupon.code.trim().toUpperCase() })
    return { success: true }
  }, [totalPrice])

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null)
  }, [])

  const value = useMemo(
    () => ({
      cartItems,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
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
      isCartOpen,
      setCartOpen,
    }),
    [
      addItem,
      cartItems,
      clearCart,
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
      isCartOpen,
      removeItem,
      totalItems,
      totalPrice,
      updateQuantity,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
