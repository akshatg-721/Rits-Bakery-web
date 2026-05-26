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
}

export interface CartItem extends CartProduct {
  quantity: number
}

interface CartContextValue {
  cartItems: CartItem[]
  addItem: (product: CartProduct) => void
  removeItem: (id: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

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

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )

  const value = useMemo(
    () => ({
      cartItems,
      addItem,
      removeItem,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [addItem, cartItems, clearCart, removeItem, totalItems, totalPrice],
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
