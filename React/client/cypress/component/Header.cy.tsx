// cypress/component/Header.spec.tsx

import React from 'react'
import { mount } from 'cypress/react'
import Header from '../../app/header'

describe('Header Component', () => {
  it('renders the header with the correct title', () => {
    mount(<Header />)
    
    cy.contains('Książkarnia').should('be.visible')
  })

  it('has a link that navigates to the home page', () => {
    mount(<Header />)

    cy.get('a').should('have.attr', 'href', '/')
    cy.get('a').click()

    cy.url().should('include', '/')
  })
})
