// cypress/component/BookCard.spec.tsx

import React from 'react'
import { mount } from 'cypress/react'
import BookCard from '../../app/books/BookCard'
import { CartProvider } from '../../app/context/CartContext'

describe('BookCard Component', () => {
  const book = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    price: 29.99,
  }

  it('renders the book information correctly', () => {
    mount(
      <CartProvider>
        <BookCard book={book} />
      </CartProvider>
    )

    cy.contains('Test Book').should('be.visible')
    cy.contains('Test Author').should('be.visible')
    cy.contains('29.99 zł').should('be.visible')
  })
})
