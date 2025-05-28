'use client'

import { Book } from '../types/books'
import { useCart } from '../context/CartContext'

export default function BookCard({ book }: { book: Book }) {
    const { addToCart } = useCart()

    return (
        <div className="card">
            <div className="card-content">
                <h3>{book.title}</h3>
                <p>Autor: {book.author}</p>
                <p>{book.price.toFixed(2)} zł</p>
                <div>
                    <button className='add-to-cart-button' onClick={() => addToCart(book)}>
                        Dodaj do koszyka
                    </button>
                </div>
            </div>
        </div>
    )
}
