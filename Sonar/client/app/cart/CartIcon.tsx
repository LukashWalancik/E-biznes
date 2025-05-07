'use client'

import { useCart } from '../context/CartContext'
import { useRouter } from 'next/navigation'
import './CartIcon.css'

export default function CartIcon() {
  const { cart } = useCart()
  const router = useRouter()

  const handleClick = () => {
    if (cart.length > 0) {
      router.push('/cart')
    }
  }

  return (
    <div className="cart-container">
      <button
        className={`cart-button ${cart.length > 0 ? 'cart-active' : 'cart-inactive'}`}
        disabled={cart.length === 0}
        onClick={handleClick}
      >
        🛒 {cart.length > 0 && <span className="cart-count">({cart.length})</span>}
      </button>
    </div>
  )
}
