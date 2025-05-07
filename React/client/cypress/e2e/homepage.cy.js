describe('Strona główna', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('wyświetla nagłówek Książkarnia', () => {
      cy.get('header h1').should('contain', 'Książkarnia')
    })
  
    it('wyświetla kartę z informacją o książkach', () => {
      cy.get('.card').should('exist')
      cy.get('.card h3').should('contain', 'Lista dostępnych książek')
      cy.get('.card p').should('contain', 'Zobaczy książki dostępne')
    })
  
    it('posiada link do strony książek', () => {
      cy.get('.card a')
        .should('exist')
        .should('have.attr', 'href', '/books')
        .should('contain', 'Dostępne Książki')
    })
  
    it('po kliknięciu w link przenosi na /books', () => {
      cy.get('.card a').click()
      cy.url().should('include', '/books')
    })
  
    it('layout zawiera komponent header', () => {
      cy.get('header').should('exist')
      cy.get('header h1').should('be.visible')
    })
  })
  