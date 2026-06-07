'use client'

import {
  createContext,
  useCallback,
  useContext,
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
  applyCoupon: (coupon: Coupon) => void
  removeCoupon: () => void
  discountAmount: number
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [isCartOpen, setCartOpen] = useState(false)

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
    setAppliedCoupon(coupon)
  }, [])

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null)
  }, [])

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
    if (appliedCoupon.type === 'percent') {
      return Math.round(totalPrice * (appliedCoupon.value / 100))
    }
    return appliedCoupon.value
  }, [appliedCoupon, totalPrice])

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
