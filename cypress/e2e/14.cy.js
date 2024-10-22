import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'
import { RECENT_SKILLS, SORT_OPTIONS } from '../../utils/constants'
import { testClientEmail, testClientPassword } from '../../config/keys'

describe('Client Account Page', () => {
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000') // Visit the login page

    // Perform login steps
    cy.contains('Log In').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.contains('CONTINUE WITH EMAIL').click()

    // Enter login credentials
    cy.get('#email').clear().type(testClientEmail)
    cy.get('#password').clear().type(testClientPassword)

    // Intercept the login request
    cy.intercept('POST', '/api/auth/login').as('loginRequest')

    // Submit login form
    cy.contains('CONTINUE WITH EMAIL').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    // Wait for the login request and verify success
    cy.wait('@loginRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      cy.url().should('include', '/dashboard')
    })
    cy.visit('http://localhost:3000/dashboard/account')
    cy.contains('Connect. Build. grow').should('not.exist')
  })

  it('Change Client credentials', () => {
    cy.window()
      .its('store')
      .then(store => {
        const user = store.getState()?.Auth?.user
        const NewEmail = faker.internet.email()

        cy.get('#profile_data').within(() => {
          cy.contains(user.email).should('be.visible')
          cy.contains('Change email').should('be.visible').click()
        })
        cy.url().should('include', `/change-email`)
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.get('#currentEmail').should('have.value', user.email)
        cy.contains('button', 'Save').should('be.disabled')

        cy.get('#email').clear().type('dsdsdsdsds')
        cy.contains('button', 'Save').should('be.visible').click()
        cy.contains('Enter a valid email address!')
        cy.get('#email').clear().type(NewEmail)
        cy.go('back')
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.contains('Change Password').should('be.visible').click()
        cy.url().should('include', `/change-password`)
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.get('#password').clear().clear().type(testClientPassword)
        cy.get('#password').blur()

        let NewPassword = faker.internet.password({ length: 5 })
        cy.get('#newPassword').clear().type(NewPassword)
        cy.get('#newPassword').blur()
        cy.contains('Password must be 8+ characters including numbers, 1 capital letter and 1 special character.')

        NewPassword = 'Hello@2024'
        cy.get('#newPassword').clear().type(NewPassword)
        cy.get('#newPassword').blur()

        cy.get('#confirmNewPassword')
          .clear()
          .type(faker.internet.password({ length: 10 }))
        cy.get('#confirmNewPassword').blur()
        cy.contains('button', 'Save').should('be.disabled')
        cy.contains('Passwords do not match!')

        cy.get('#confirmNewPassword').clear().type(NewPassword)
        cy.get('#confirmNewPassword').blur()
        cy.contains('button', 'Save').should('be.enabled')
        cy.go('back')
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.contains('Change number').should('be.visible').click()
        cy.url().should('include', `/change-phone`)
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.get('#currentPhone').should('have.value', ValidationUtils._formatPhoneNumber(user?.phoneNumber) ?? '')
        cy.contains('button', 'Save').should('be.disabled')

        cy.get('#phone').clear().type('19879')
        cy.get('#phone').blur()
        cy.contains('Enter a valid Phone Number!').should('be.visible')

        cy.get('#phone').clear().type('(555) 123-9879')
        cy.get('#phone').blur()
        cy.contains('Enter a valid Phone Number!').should('not.exist')

        cy.go('back')
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.get(`[data-testid="edit_name_button"]`).should('be.visible').click()
        const FirstName = faker.person.firstName()
        const LastName = faker.person.lastName()
        cy.get('[name="FirstName"]').type(FirstName)
        cy.get('[name="LastName"]').type(LastName)

        cy.get(`[data-testid="edit_address_button"]`).should('be.visible').click()
        let AddressLineOne = faker.location.streetAddress()
        let AddressLineTwo = faker.location.secondaryAddress()
        let City = faker.location.city()
        let State = faker.location.state()
        let ZipCode = faker.location.zipCode()
        let Country = faker.location.country()

        cy.get('#AddressLineOne').clear().type(AddressLineOne)
        cy.get('#AddressLineTwo').clear().type(AddressLineTwo)
        cy.get('#AddressCity').clear().type(City)
        cy.get('#AddressState').clear().type(State)
        cy.get('#AddressZip').clear().type(ZipCode)

        cy.get(`[data-testid="edit_company_button"]`).should('be.visible').click()
        let BusinessName = faker.string.alpha(5)
        let PhoneNumber = '(555) 123-9802'
        let BusinessType = 'Individual'
        let TaxEin = '1DK4C'

        cy.get('#businessName').clear().type(BusinessName)
        cy.get('#businessType').clear().type(BusinessType)
        cy.get('#businessPhone').clear().type(PhoneNumber)
        cy.get('#taxId').clear().type(TaxEin)

        cy.contains('button', 'Save Settings').should('be.visible').click()

        cy.contains('Manage payment method').should('be.visible').click()
        cy.url().should('include', `/manage-payment-method`)
        cy.contains('Connect. Build. grow').should('not.exist')
        cy.go('back')

        cy.contains('Billing details').should('be.visible').click()
        cy.url().should('include', `/billing-details`)
        cy.contains('Connect. Build. grow').should('not.exist')
        cy.go('back')

        cy.contains('Change plan').should('be.visible').click()
        cy.url().should('include', `/pick-a-plan`)
        cy.contains('Connect. Build. grow').should('not.exist')
        cy.go('back')

        cy.intercept('GET', '/api/auth/logout').as('logOutRequest')

        cy.get('#navbar').within(() => {
          cy.get(
            `img[src*="${
              user?.profileImage || 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
            }"]`
          )
            .scrollIntoView()
            .should('be.visible')
            .click()
          cy.contains('Log Out').should('be.visible').click()
          cy.wait('@logOutRequest').then(interception => {
            expect(interception.response.statusCode).to.be.oneOf([200, 304])
            cy.url().should('include', '/login')
            cy.contains('Connect. Build. grow').should('not.exist')
          })
        })
      })
  })
})
