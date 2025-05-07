describe('Strona koszyka', () => {
    context('Gdy koszyk jest pusty', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000/cart')
      })
  
      it('wyświetla tytuł strony', () => {
        cy.get('h1.cart-title').should('contain', 'Twój koszyk') // 1
      })
  
      it('wyświetla komunikat o pustym koszyku', () => {
        cy.get('.cart-empty p').should('contain', 'Twój koszyk jest pusty.') // 2
      })
  
      it('link do książek działa', () => {
        cy.get('.cart-back-button').should('have.attr', 'href', '/books') // 3
      })
    })
  
    context('Gdy koszyk zawiera książki', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000/books')
  
        // Dodaj dwie książki
        cy.get('.add-to-cart-button').eq(0).click()
        cy.get('.add-to-cart-button').eq(1).click()
  
        // Przejdź do koszyka
        cy.get('.cart-button').click()
      })
  
      it('wyświetla książki w koszyku', () => {
        cy.get('.cart-item').should('have.length', 2) // 4
        cy.get('.cart-item h3').first().should('not.be.empty') // 5
        cy.get('.cart-price').should('have.length', 2) // 6
      })
  
      it('wyświetla podsumowanie i łączną kwotę', () => {
        cy.get('.cart-summary').should('exist') // 7
        cy.get('.cart-total').should('contain', 'Łączna kwota') // 8
      })
  
      it('przycisk "Kontynuuj zakupy" działa', () => {
        cy.get('.cart-button-secondary').should('have.attr', 'href', '/books') // 9
      })
  
      it('przycisk "Przejdź do płatności" działa', () => {
        cy.get('.cart-button-primary').should('have.attr', 'href', '/payment') // 10
      })
    })
  })
  