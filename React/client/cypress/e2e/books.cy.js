describe('Strona książek', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/books')
    })
  
    it('wyświetla nagłówek strony', () => {
      cy.get('h1').should('contain', 'Nasze Książki')
    })
  
    it('ładuje książki i wyświetla karty', () => {
      cy.get('.card').should('have.length.greaterThan', 0)
      cy.get('.card h3').first().should('not.be.empty')
      cy.get('.card p').should('have.length.at.least', 2)
    })
  
    it('każda książka ma przycisk dodawania do koszyka', () => {
      cy.get('.add-to-cart-button').each(($btn) => {
        cy.wrap($btn).should('be.visible').and('contain', 'Dodaj do koszyka')
      })
    })
  
    it('dodaje książkę do koszyka i aktualizuje ikonę koszyka', () => {
      cy.get('.add-to-cart-button').first().click()
      cy.get('.cart-button').should('have.class', 'cart-active')
      cy.get('.cart-count').should('contain', '1')
    })
  
    it('ikona koszyka przekierowuje na /cart po kliknięciu', () => {
      cy.get('.add-to-cart-button').first().click()
      cy.get('.cart-button').click()
      cy.url().should('include', '/cart')
    })
  })
  