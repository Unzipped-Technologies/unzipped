import { faker } from '@faker-js/faker'
describe('template spec', () => {
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000')
  })
  it('Signup for Client', () => {
    cy.contains('Sign up').click()
    cy.contains('Connect. Build. grow').should('not.exist')
  })
})
