describe('Strona główna', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('wyświetla nagłówek Książkarnia', () => {
      cy.get('header h1').should('contain', 'Książkarnia') // 1 asercja
    })
  
    it('wyświetla kartę z informacją o książkach', () => {
      cy.get('.card').should('exist') // 2
      cy.get('.card h3').should('contain', 'Lista dostępnych książek') // 3
      cy.get('.card p').should('contain', 'Zobaczy książki dostępne') // 4
    })
  
    it('posiada link do strony książek', () => {
      cy.get('.card a')
        .should('exist') // 5
        .should('have.attr', 'href', '/books') // 6
        .should('contain', 'Dostępne Książki') // 7
    })
  
    it('po kliknięciu w link przenosi na /books', () => {
      cy.get('.card a').click()
      cy.url().should('include', '/books') // 8
    })
  
    it('layout zawiera komponent header', () => {
      cy.get('header').should('exist') // 9
      cy.get('header h1').should('be.visible') // 10
    })
  })
  