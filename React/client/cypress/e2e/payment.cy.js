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
        // Dodaj książki do koszyka
        cy.visit('http://localhost:3000/books')
        cy.get('.add-to-cart-button').eq(0).click() // Dodaj książkę
        cy.get('.add-to-cart-button').eq(1).click() // Dodaj książkę
        cy.get('.cart-button').click() // Przejdź do koszyka
        cy.get('.cart-button-primary').click() // Przejdź do strony płatności
      })
  
      it('powinna wyświetlać formularz płatności', () => {
        cy.get('form.payment-form').should('exist') // 2
      })
  
      it('powinna akceptować dane w formularzu', () => {
        cy.get('input[name="name"]').type('Jan Kowalski') // 3
        cy.get('input[name="email"]').type('jan@kowalski.com') // 4
        cy.get('input[name="street"]').type('Kwiatowa 5') // 5
        cy.get('input[name="city"]').type('Warszawa') // 6
        cy.get('input[name="zip"]').type('00-000') // 7
        cy.get('select[name="paymentMethod"]').select('blik') // 8
        cy.get('input[name="blikCode"]').type('123456') // 9
        cy.get('button[type="submit"]').click() // 10
      })
  
      it('powinna wyświetlać modal sukcesu po wysłaniu formularza', () => {
        cy.get('input[name="name"]').type('Jan Kowalski') // 11
        cy.get('input[name="email"]').type('jan@kowalski.com') // 12
        cy.get('input[name="street"]').type('Kwiatowa 5') // 13
        cy.get('input[name="city"]').type('Warszawa') // 14
        cy.get('input[name="zip"]').type('00-000') // 15
        cy.get('select[name="paymentMethod"]').select('card') // 16
        cy.get('input[name="cardNumber"]').type('1234 5678 9876 5432') // 17
        cy.get('button[type="submit"]').click() // 18
  
        // Po submitcie formularza powinna się pojawić modal
        cy.get('.modal-overlay').should('exist') // 19
        cy.get('.modal h3').should('contain', 'Dziękujemy za zamówienie!') // 20
        cy.get('.modal p').should('contain', 'Twoje zamówienie zostało pomyślnie złożone.') // 21
        cy.get('.modal button').click() // 22
      })
    })
  })
  