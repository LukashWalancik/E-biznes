'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from './BookCard'
import { Book } from '../types/books'
import CartIcon from '../cart/CartIcon'

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:1323/books')
        setBooks(response.data)
      } catch (err) {
        setError('Błąd podczas pobierania książek.')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  return (
    <div className="container">
      <CartIcon />
      <header>
        <h1 className="ksiazki">Nasze Książki</h1>
      </header>

      {loading && <p>Ładowanie książek...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {books.length === 0 && !loading && !error ? (
        <p className="text-center text-gray-500">Brak dostępnych książek</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}
