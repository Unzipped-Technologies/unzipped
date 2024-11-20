import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { testFreelancerEmail, testFreelancerPassword } from '../../config/keys'

describe('Freelancer Account Page', () => {
  before(() => {
    cy.viewport(480, 896)

    cy.clearCookies()
    cy.clearLocalStorage()

    // Visit the login page
    cy.visit('/')
    cy.get('#mobile_menu_icon').should('be.visible').click()
    cy.contains('button', 'Log In').scrollIntoView().click()
    cy.contains('Connect. Build. grow').should('not.exist')
    cy.url().should('include', '/login')

    cy.contains('CONTINUE WITH EMAIL').click()

    // Enter login credentials
    cy.get('#email').clear().type(testFreelancerEmail)
    cy.get('#password').clear().type(testFreelancerPassword)

    // Intercept the login request
    cy.intercept('POST', '/api/auth/login').as('loginRequest')

    // Submit login form
    cy.contains('CONTINUE WITH EMAIL').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    // Wait for the login request and verify success
    cy.wait('@loginRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      // It must redirect to the dashboard page

      cy.url().should('include', '/dashboard')
    })
    cy.contains('Connect. Build. grow').should('not.exist')
  })

  beforeEach(() => {
    // Set the viewport to 480px x 896px for each test case
    cy.viewport(480, 896)
  })
  after(() => {
    cy.end()
    cy.clearCookies()
    cy.clearLocalStorage()
  })
  it('Verify change email', () => {
    // Intercept the request to get the current user and get freelancers
    cy.intercept('GET', '/api/auth/current_user').as('getUserRequest')
    cy.intercept('GET', `/api/freelancer/*`).as('getFreelancersRequest')

    // Click on the menu icon to visit account page

    cy.get('#mobile_menu_icon').should('be.visible').click()
    cy.get(`#mobile_menu_0`).click()
    cy.get(`#mobile_menu_0`).within(() => {
      cy.contains('Account').click()
    })

    cy.contains('Connect. Build. grow').should('not.exist')
    // It must redirect to the account page

    cy.url().should('include', '/dashboard/account')

    cy.wait('@getUserRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        const freelancerId = store.getState()?.Auth?.user?.freelancers?._id
        const user = store.getState()?.Auth?.user
        const NewEmail = faker.internet.email()

        cy.contains('View Profile').should('be.visible').click()

        cy.url().should('include', `/freelancers/${freelancerId}`)
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.wait('@getFreelancersRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
        cy.go('back')

        cy.contains('Settings').should('be.visible').click()

        // Change email

        cy.contains(user.email).should('be.visible')
        cy.contains('Change email').should('be.visible').click()

        // It must redirect to the change email page

        cy.url().should('include', `/change-email`)
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.get('#currentEmail').should('have.value', user.email)
        cy.contains('button', 'Save').should('be.disabled')

        cy.get('#email').clear().type('dsdsdsdsds')
        cy.contains('button', 'Save').should('be.visible').click()

        // Email Validation
        cy.contains('Enter a valid email address!')
        cy.get('#email').clear().type(NewEmail)

        cy.go('back')
        cy.contains('Connect. Build. grow').should('not.exist')
        cy.contains('Settings').should('be.visible').click()

        // Change Password
        cy.contains('Update Password').should('be.visible').click()
        // It must redirect to the change password page
        cy.url().should('include', `/change-password`)
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.get('#password').clear().clear().type('Hello@2024')
        cy.get('#password').blur()

        let NewPassword = faker.internet.password({ length: 5 })
        cy.get('#newPassword').clear().type(NewPassword)
        cy.get('#newPassword').blur()
        // Password Validation
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

        cy.contains('Settings').should('be.visible').click()

        // Change Phone
        cy.contains('Change Phone').should('be.visible').click()
        // It must redirect to the change phone page
        cy.url().should('include', `/change-phone`)
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.get('#currentPhone').should('have.value', ValidationUtils._formatPhoneNumber(user?.phoneNumber) ?? '')
        cy.contains('button', 'Save').should('be.disabled')

        cy.get('#phone').clear().type('19879')
        cy.get('#phone').blur()
        cy.contains('Enter a valid Phone Number!').should('be.visible')

        cy.get('#phone').clear().type('(555) 123-9879')
        // Phone Validation
        cy.get('#phone').blur()
        cy.contains('Enter a valid Phone Number!').should('not.exist')

        cy.go('back')
        cy.contains('Connect. Build. grow').should('not.exist')
      })
  })
  it('Change Personal and Company Information', () => {
    // Intercept the update user request, update business details request
    cy.intercept('POST', '/api/user/update').as('updateUserRequest')
    cy.intercept('POST', '/api/business/details/update').as('updateBusinessDetailRequest')

    cy.contains('Settings').should('be.visible').click()

    // Click on update profile to edit personal and company information
    cy.get('#update_profile').scrollIntoView().should('be.visible').click()

    cy.get('#update_profile_modal')
      .scrollIntoView()
      .should('be.visible')
      .within(() => {
        const FirstName = faker.string.alpha(5)
        const LastName = faker.string.alpha(5)
        const BusinessName = faker.string.alpha(5)
        const AddressLineOne = faker.location.streetAddress()
        const AddressLineTwo = faker.location.secondaryAddress()
        const City = faker.location.city()
        const ZipCode = faker.location.zipCode()
        const AddressState = faker.location.state()

        cy.get('#FirstName').scrollIntoView().should('be.visible').clear().type(FirstName)
        cy.get('#FirstName').should('have.value', FirstName)

        cy.get('#LastName').scrollIntoView().should('be.visible').clear().type(LastName)
        cy.get('#LastName').should('have.value', LastName)

        cy.get('#AddressLineOne').scrollIntoView().should('be.visible').clear().type(AddressLineOne)
        cy.get('#AddressLineOne').should('have.value', AddressLineOne)

        cy.get('#AddressLineTwo').scrollIntoView().should('be.visible').clear().type(AddressLineTwo)
        cy.get('#AddressLineTwo').should('have.value', AddressLineTwo)

        cy.get('#AddressCity').scrollIntoView().should('be.visible').clear().type(City)
        cy.get('#AddressCity').should('have.value', City)

        cy.get('#AddressState').scrollIntoView().should('be.visible').clear().type(AddressState)
        cy.get('#AddressState').should('have.value', AddressState)

        cy.get('#AddressZip').scrollIntoView().should('be.visible').clear().type(ZipCode)

        cy.get('#businessName').scrollIntoView().should('be.visible').clear().type(BusinessName)
        cy.get('#businessName').should('have.value', BusinessName)

        cy.contains('button', 'Update').scrollIntoView().should('be.visible').should('be.enabled').click()
        cy.wait('@updateBusinessDetailRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
        cy.wait('@updateUserRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })
  })
})
