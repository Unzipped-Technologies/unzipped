import { faker } from '@faker-js/faker'

describe('Freelancer Signup', () => {
  before(() => {
    cy.viewport(480, 896)
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000/register')
  })
  beforeEach(() => {
    cy.viewport(480, 896)
  })
  it('Signup for Freelancer', () => {
    const email = faker.internet.email()
    const password = 'Hello@2024'

    cy.contains('Sign up').click()
    cy.contains('Connect. Build. grow').should('not.exist')
    cy.url().should('include', '/register')

    cy.get('#signup').within(() => {
      cy.contains('SIGN UP')
      cy.contains('button', 'REGISTER WITH GOOGLE').should('be.visible')
      cy.contains('Remember Me').should('be.visible')
      cy.contains('log in now!').should('be.visible')
      cy.get('#email').should('be.visible').clear().type('client@')
      cy.get('#password').should('be.visible').clear().type('Hello')
      cy.contains('button', 'Sign up').should('be.visible').click()
      cy.contains('Please enter a valid email address').should('be.visible')
      cy.contains('Password must be 8+ characters including numbers, 1 capital letter and 1 special character.').should(
        'be.visible'
      )
      cy.get('#email').should('be.visible').clear().type(email)
      cy.get('#password').should('be.visible').clear().type(password)
      cy.get('[name="remember_me"]').click({ force: true }).should('be.checked')
      cy.intercept('POST', '/api/auth/register').as('regsiterUserRequest')
      cy.contains('button', 'Sign up').should('be.visible').click()

      cy.wait('@regsiterUserRequest').then(interception => {
        expect(interception.response.statusCode).to.eq(200)
        cy.url().should('include', '/verify-email')
        cy.intercept('GET', `/api/auth/verify/${interception.response?.body?._id}`).as('verifyEmailRequest')
        cy.visit(`http://localhost:3000/verified/${interception.response?.body?._id}`)
        cy.wait('@verifyEmailRequest').then(res => {
          expect(res.response.statusCode).to.eq(200)
          expect(res.response.body.message).to.eq('SUCCESS')
        })
      })
    })
    cy.wait(15000)
    cy.url().should('include', '/update-account-profile')

    cy.contains('button', 'Cancel').should('be.visible').click()
    cy.contains('button', 'Next').should('be.visible').should('be.disabled')

    cy.contains(`I'm a freelancer, looking for work`).should('be.visible').click()
    cy.contains('button', 'Next').should('be.visible').should('be.enabled').click()

    cy.contains('button', 'Next').should('be.visible').should('be.disabled')
    cy.contains('button', 'BACK').should('be.visible').should('be.enabled').click()
    cy.contains('button', 'Next').should('be.visible').should('be.enabled').click()

    let FirstName = faker.string.alpha(5)
    let LastName = faker.string.alpha(5)
    let PhoneNumber = '(555) 123-9802'
    let BusinessType = 'Individual'
    let TaxEin = '1DK4C'

    cy.get('#firstName').should('be.visible').clear().type(FirstName)
    cy.get('#lastName').should('be.visible').clear().type(LastName)
    cy.get('#phoneNumber').should('be.visible').clear().type(PhoneNumber)
    cy.get('#businessType').should('be.visible').clear().type(BusinessType)
    cy.get('#taxEin').should('be.visible').clear().type(TaxEin)

    cy.contains('button', 'Next').should('be.visible').should('be.enabled').click()

    let AddressLineOne = faker.location.streetAddress()
    let AddressLineTwo = faker.location.secondaryAddress()
    let City = faker.location.city()
    let ZipCode = faker.location.zipCode()
    let Country = faker.location.country()

    cy.get('#addressLineOne').should('be.visible').clear().type(AddressLineOne)
    cy.get('#addressLineTwo').should('be.visible').clear().type(AddressLineTwo)
    cy.get('#city').should('be.visible').clear().type(City)
    cy.get('#zipCode').should('be.visible').clear().type(ZipCode)
    cy.get('#country').should('be.visible').clear().type(Country)

    cy.intercept('POST', `/api/user/current/update`).as('updateUserRequest')

    cy.contains('button', 'SUBMIT').should('be.visible').should('be.enabled').click()

    cy.wait('@updateUserRequest').then(res => {
      expect(res.response.statusCode).to.eq(200)
    })

    cy.url().should('include', '/dashboard')
  })
})
