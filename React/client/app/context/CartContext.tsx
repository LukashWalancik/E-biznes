'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Book } from '../types/books'

type CartItem = Book

type CartContextType = {
  cart: CartItem[]
  addToCart: (book: Book) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (book: Book) => {
    setCart((prev) => [...prev, book])
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
