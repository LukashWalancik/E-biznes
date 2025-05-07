// cypress/component/BooksPage.spec.tsx

import React from 'react'
import { mount } from 'cypress/react'
import BooksPage from '../../app/books/page'
import { CartProvider } from '../../app/context/CartContext'

import { Book } from '../../app/types/books'

describe('BooksPage Component', () => {
  const mockBooks: Book[] = [
    { id: 1, title: 'Test Book 1', author: 'Author 1', price: 29.99 },
    { id: 2, title: 'Test Book 2', author: 'Author 2', price: 39.99 }
  ]

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:1323/books', {
      statusCode: 200,
      body: mockBooks
    }).as('getBooks')
  })

  const mountBooksPage = () => {
    mount(
      <CartProvider>
        <BooksPage />
      </CartProvider>
    )
  }

  it('should render loading state initially', () => {
    mountBooksPage()
    cy.contains('Ładowanie książek...').should('be.visible')
  })

  it('should render books after loading', () => {
    mountBooksPage()
    cy.wait('@getBooks')
    cy.get('.grid').should('exist')
    cy.get('.card').should('have.length', mockBooks.length)
    cy.contains('Test Book 1').should('be.visible')
    cy.contains('Test Book 2').should('be.visible')
  })

  it('should render error message when API fails', () => {
    cy.intercept('GET', 'http://localhost:1323/books', {
      statusCode: 500,
      body: {}
    }).as('getBooksError')

    mountBooksPage()
    cy.wait('@getBooksError')
    cy.contains('Błąd podczas pobierania książek.').should('be.visible')
  })

  it('should render empty state when no books are available', () => {
    cy.intercept('GET', 'http://localhost:1323/books', {
      statusCode: 200,
      body: []
    }).as('getEmptyBooks')

    mountBooksPage()
    cy.wait('@getEmptyBooks')
    cy.contains('Brak dostępnych książek').should('be.visible')
  })

  it('should display CartIcon', () => {
    mountBooksPage()
    cy.get('[data-testid="cart-icon"]').should('exist')
  })
})