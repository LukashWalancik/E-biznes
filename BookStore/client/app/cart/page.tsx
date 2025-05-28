'use client'

import { useCart } from '../context/CartContext'
import Link from 'next/link'
import './CartPage.css'

export default function CartPage() {
  const { cart } = useCart()

  const totalPrice = cart.reduce((sum, book) => sum + book.price, 0)

  return (
    <main className="cart-page">
      <h1 className="cart-title">Twój koszyk</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Twój koszyk jest pusty.</p>
          <Link href="/books" className="cart-back-button">
            Wróć do książek
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((book) => (
              <div key={book.id} className="cart-item">
                <div>
                  <h3>{book.title}</h3>
                  <p className="cart-author">Autor: {book.author}</p>
                </div>
                <p className="cart-price">{book.price.toFixed(2)} zł</p>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Podsumowanie</h2>
            <p className="cart-total">Łączna kwota: <strong>{totalPrice.toFixed(2)} zł</strong></p>
            <div className="cart-actions">
              <Link href="/books" className="cart-button-secondary">
                Kontynuuj zakupy
              </Link>
              <Link href="/payment" className="cart-button-primary">
                Przejdź do płatności
              </Link>

            </div>
          </div>
        </div>
      )}
    </main>
  )
}
