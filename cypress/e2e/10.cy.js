import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'
import { testFreelancerEmail, testFreelancerPassword, testClientEmail } from '../../config/keys'

describe('Freelancer inbox', () => {
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/') // Visit the login page
    cy.window().its('document.readyState').should('eq', 'complete')
    cy.intercept('POST', '/api/auth/login').as('loginRequest')

    // Perform login steps
    cy.contains('Log In').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.contains('CONTINUE WITH EMAIL').click()

    // Enter login credentials
    cy.get('#email').clear().type(testFreelancerEmail)
    cy.get('#password').clear().type(testFreelancerPassword)

    // Intercept the login request

    // Submit login form
    cy.contains('CONTINUE WITH EMAIL').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    // Wait for the login request and verify success
    cy.wait('@loginRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
      cy.url().should('include', '/dashboard')
      cy.window().its('document.readyState').should('eq', 'complete')
    })
  })
  after(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })
  it('Send message to client', () => {
    cy.visit('/dashboard/inbox')
    cy.intercept('GET', `/api/message/*`).as('getConvesationRequest')

    cy.window()
      .its('store')
      .then(store => {
        const conversations = store?.getState().Messages?.conversations
        const user = store?.getState().Auth?.user

        conversations?.forEach(conversation => {
          const receiver = conversation?.participants?.find(e => e?.userId?.email !== user?.email)

          cy.get(`#conversation_${conversation?._id}`)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              cy.contains(ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(receiver?.userId)}`))
                .scrollIntoView()
                .should('be.visible')
              cy.contains(ValidationUtils.formatDateWithDate(conversation?.updatedAt))
                .should('be.visible')
                .scrollIntoView()
                .should('be.visible')
              if (conversation?.messages?.length) {
                cy.contains(
                  ValidationUtils.truncate(ValidationUtils.getMostRecentlyUpdated(conversation?.messages)?.message, 34)
                )
                  .scrollIntoView()
                  .should('be.visible')
              }
            })
        })
        cy.wait(1000)
        let ClientConversation = conversations?.find(conv =>
          conv?.participants?.some(parti => parti.userId.email === testClientEmail)
        )
        ClientConversation = ClientConversation?._id ? ClientConversation : conversations[0]

        cy.get(`#conversation_${ClientConversation?._id}`).scrollIntoView().should('be.visible').click()

        cy.wait('@getConvesationRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })

    cy.window()
      .its('store')
      .then(store => {
        const user = store?.getState().Auth?.user

        const selectedConversation = store?.getState().Messages?.selectedConversation
        const receiver =
          selectedConversation?.participants?.length &&
          selectedConversation?.participants?.find(e => e?.userId?.email !== user.email)

        cy.get('#message_container').within(() => {
          cy.get('#header').within(() => {
            cy.contains(ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(receiver?.userId)}`))
              .scrollIntoView()
              .should('be.visible')
            if (receiver?.userId?.freelancers?.category) {
              cy.contains(receiver?.userId?.freelancers?.category).scrollIntoView().should('be.visible')
            }
            cy.get('#profile_action').scrollIntoView().should('be.visible').click()
            cy.get('#profile_action').scrollIntoView().should('be.visible').click()
          })
          selectedConversation?.messages?.forEach(message => {
            cy.get(`#${message?._id}`)
              .scrollIntoView()
              .should('be.visible')
              .within(() => {
                if (message?.updatedAt) {
                  cy.contains(ValidationUtils.getTimeFormated(message?.updatedAt)).scrollIntoView().should('be.visible')
                }
                cy.contains(message?.message).scrollIntoView().should('be.visible')
              })
              .should('be.visible')
          })
          const NewMessage = faker.lorem.sentences(1)
          cy.get('#message').clear().type(NewMessage)
          cy.get('#send_message').scrollIntoView().should('be.visible').click()
          cy.get('#profile_container')
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              cy.contains(ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(receiver?.userId)}`))
                .scrollIntoView()
                .should('be.visible')
                .should('be.visible')
              cy.get(`img[src*="${receiver?.userId?.profileImage}"]`)
                .scrollIntoView()
                .should('be.visible')
                .should('have.attr', 'src')
                .then(src => {
                  expect(src).to.include(receiver?.userId?.profileImage)
                })
              cy.contains('Apply for Position').scrollIntoView().should('be.visible')

              cy.contains('Add User To A List').scrollIntoView().should('be.visible').click()
              cy.contains('Add User To A List').scrollIntoView().should('be.visible').click()
            })
        })
        cy.get('#archive_chat').scrollIntoView().should('be.visible').click()
        cy.contains('Archived Chats').scrollIntoView().should('be.visible')
        cy.get('#archive_chat').scrollIntoView().should('be.visible').click()

        cy.contains('Archived Chats').should('not.exist')

        cy.get('#mute').scrollIntoView().should('be.visible').click()
        cy.get('#mute').scrollIntoView().should('be.visible').click()
      })
    cy.get('#message_container').within(() => {
      cy.scrollTo('bottom')
    })
  })
})
