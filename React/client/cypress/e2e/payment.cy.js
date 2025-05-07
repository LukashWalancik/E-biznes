describe('Strona płatności', () => {
    context('Gdy koszyk jest pusty', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000/payment')
      })
  
      it('powinna automatycznie przekierować na stronę książek, gdy koszyk jest pusty', () => {
        cy.url().should('include', '/books') // 1
      })
    })
  
    context('Gdy koszyk zawiera książki', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000/books')
        cy.get('.add-to-cart-button').eq(0).click()
        cy.get('.add-to-cart-button').eq(1).click()
        cy.get('.cart-button').click()
        cy.get('.cart-button-primary').click()
      })
  
      it('powinna wyświetlać formularz płatności', () => {
        cy.get('form.payment-form').should('exist')
      })
  
      it('powinna akceptować dane w formularzu', () => {
        cy.get('input[name="name"]').type('Jan Kowalski')
        cy.get('input[name="email"]').type('jan@kowalski.com')
        cy.get('input[name="street"]').type('Kwiatowa 5')
        cy.get('input[name="city"]').type('Warszawa')
        cy.get('input[name="zip"]').type('00-000')
        cy.get('select[name="paymentMethod"]').select('blik')
        cy.get('input[name="blikCode"]').type('123456')
        cy.get('button[type="submit"]').click()
      })
  
      it('powinna wyświetlać modal sukcesu po wysłaniu formularza', () => {
        cy.get('input[name="name"]').type('Jan Kowalski')
        cy.get('input[name="email"]').type('jan@kowalski.com')
        cy.get('input[name="street"]').type('Kwiatowa 5')
        cy.get('input[name="city"]').type('Warszawa')
        cy.get('input[name="zip"]').type('00-000')
        cy.get('select[name="paymentMethod"]').select('card')
        cy.get('input[name="cardNumber"]').type('1234 5678 9876 5432')
        cy.get('button[type="submit"]').click()
  
        cy.get('.modal-overlay').should('exist')
        cy.get('.modal h3').should('contain', 'Dziękujemy za zamówienie!')
        cy.get('.modal p').should('contain', 'Twoje zamówienie zostało pomyślnie złożone.')
        cy.get('.modal button').click()
      })
    })
  })
  