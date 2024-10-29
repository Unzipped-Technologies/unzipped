import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'
import { testFreelancerEmail, testFreelancerPassword, testClientEmail } from '../../config/keys'

describe('Freelancer inbox', () => {
  before(() => {
    cy.viewport(480, 896)

    // Clear cookies and local storage before start theses test cases
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/')

    // Click on the menu icon to visit the login page
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
      expect(interception.response.statusCode).to.eq(200)
      // It must redirect to the dashboard page
      cy.url().should('include', '/dashboard')
    })
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
  it('Send message to client', () => {
    // Intercept the request to get conversation messages
    cy.intercept('GET', `/api/message/*`).as('getConvesationRequest')

    // Visit the inbox page
    cy.visit('/dashboard/inbox')

    cy.wait('@getConvesationRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        const conversations = store?.getState().Messages?.conversations
        const user = store?.getState().Auth?.user

        // Verify conversations are displayed
        // Verify user profile image, name, email and last message are displayed
        conversations?.forEach(conversation => {
          const receiver = conversation?.participants?.find(e => e?.userId?.email !== user?.email)

          cy.get(`#conversation_${conversation?._id}`).within(() => {
            cy.get(`img[src*="${receiver?.userId?.profileImage}"]`)
              .scrollIntoView()
              .should('be.visible')
              .should('have.attr', 'src')
              .then(src => {
                expect(src).to.include(receiver?.userId?.profileImage)
              })
            cy.contains(ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(receiver?.userId)}`)).should(
              'be.visible'
            )
            cy.contains(ValidationUtils.formatDateWithDate(conversation?.updatedAt)).should('be.visible')
            cy.contains(
              ValidationUtils.truncate(ValidationUtils.getMostRecentlyUpdated(conversation?.messages)?.message, 34)
            ).should('be.visible')
          })
        })
        cy.wait(1000)

        // Get the conversation with the client to send a message
        let ClientConversation = conversations?.find(conv =>
          conv?.participants?.some(parti => parti.userId.email === testClientEmail)
        )

        ClientConversation = ClientConversation?._id ? ClientConversation : conversations[0]

        // Click on the client conversation to send the messages
        cy.get(`#conversation_${ClientConversation?._id}`).scrollIntoView().should('be.visible').click()
        cy.url().should('include', `/dashboard/chat/${ClientConversation?._id}`)

        cy.wait('@getConvesationRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })

    cy.window()
      .its('store')
      .then(store => {
        const user = store?.getState().Auth?.user

        const selectedConversation = store?.getState().Messages?.selectedConversation
        const sender =
          selectedConversation?.participants?.length &&
          selectedConversation?.participants?.find(e => e?.userId?.email === user.email)

        // Verify messages are displayed correctly in message container
        // Verify user profile image, message, date and time are displayed
        cy.get('#message_container').within(() => {
          selectedConversation?.messages?.forEach(message => {
            cy.get(`#message_${message?._id}`)
              .scrollIntoView()
              .should('be.visible')
              .within(() => {
                if (message?.sender === user?._id) {
                  cy.get(`img[src*="${sender?.userId?.profileImage}"]`)
                    .scrollIntoView()
                    .should('be.visible')
                    .should('have.attr', 'src')
                    .then(src => {
                      expect(src).to.include(sender?.userId?.profileImage)
                    })
                } else if (message?.conversationId === selectedConversation?._id) {
                  cy.get(`img[src*="${sender?.userId?.profileImage}"]`)
                    .scrollIntoView()
                    .should('be.visible')
                    .should('have.attr', 'src')
                    .then(src => {
                      expect(src).to.include(sender?.userId?.profileImage)
                    })
                }
                if (message?.updatedAt) {
                  cy.contains(ValidationUtils.getTimeFormated(message?.updatedAt)).scrollIntoView().should('be.visible')
                }
                cy.contains(message?.message).scrollIntoView().should('be.visible')
              })
              .should('be.visible')
          })
          // Send a new message to the client
          const NewMessage = faker.lorem.sentences(1)
          cy.get('#message').clear().type(NewMessage)
          cy.get('#send_message').scrollIntoView().should('be.visible').click()
          cy.contains(NewMessage)
        })
        // Click on menu icon to open the profile menu options
        cy.get('#header_action').scrollIntoView().should('be.visible').click()

        // Verify the options in the profile action
        cy.get('#profile_menu_container').within(() => {
          // It only shows the options for the freelancer
          cy.contains('Apply for Position').scrollIntoView().should('be.visible').click()
          // It must redirect to the projects page
          cy.url().should('include', '/projects')
          cy.contains('Connect. Build. grow').should('not.exist')
          // Goto the inbox page
          cy.go('back')
        })
      })

    cy.wait('@getConvesationRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
    cy.get('#header_action').scrollIntoView().should('be.visible').click()

    // Verify the options in the profile action
    cy.contains('Add User To A List').scrollIntoView().should('be.visible').click()
    cy.contains('Add User To A List').scrollIntoView().should('be.visible').click()

    // Click on archive chat
    cy.get('#archive_chat').scrollIntoView().should('be.visible').click()
    cy.go('back')
    cy.wait('@getConvesationRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        const conversations = store?.getState().Messages?.conversations
        let ClientConversation = conversations?.find(conv =>
          conv?.participants?.some(parti => parti.userId.email === testClientEmail)
        )

        ClientConversation = ClientConversation?._id ? ClientConversation : conversations[0]

        // Click on 'Archived Chats' text to view the archived chats
        cy.contains('Archived Chats').should('be.visible').click()
        cy.wait(1000)
        // Open the archived chat
        cy.get(`#conversation_${ClientConversation?._id}`).scrollIntoView().should('be.visible').click()
        // It must redirect to the chat page
        cy.url().should('include', `/dashboard/chat/${ClientConversation?._id}`)

        cy.get('#header_action').scrollIntoView().should('be.visible').click()
        // Click on the archive chat option to remove arch
        cy.get('#archive_chat').scrollIntoView().should('be.visible').click()

        // Click on mute chat
        cy.get('#mute').scrollIntoView().should('be.visible').click()
        cy.get('#mute').scrollIntoView().should('be.visible').click()
      })

    cy.get('#hide_chat_menu').scrollIntoView().should('be.visible').click()
    cy.get('#message_container').within(() => {
      cy.scrollTo('bottom')
    })
  })
})
