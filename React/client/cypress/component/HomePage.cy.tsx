// cypress/component/HomePage.spec.tsx

import React from 'react'
import { mount } from 'cypress/react'
import HomePage from '../../app/page'

describe('HomePage Component', () => {
  
  it('renders the page title and description', () => {
    mount(<HomePage />)

    cy.contains('Lista dostępnych książek').should('be.visible')
    cy.contains('Zobaczy książki dostępne w Książkarni.').should('be.visible')
  })

  it('renders the link to available books', () => {
    mount(<HomePage />)

    cy.contains('Dostępne Książki').should('be.visible')

    cy.contains('Dostępne Książki').click()
    cy.url().should('include', '/books')
  })
})
