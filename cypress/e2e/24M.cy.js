import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'

describe('Freelancer inbox', () => {
  before(() => {
    cy.viewport(480, 896)

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000')

    cy.get('#mobile_menu_icon').should('be.visible').click()
    cy.contains('button', 'Log In').scrollIntoView().click()
    cy.contains('Connect. Build. grow').should('not.exist')
    cy.url().should('include', '/login')

    cy.contains('CONTINUE WITH EMAIL').click()

    // Enter login credentials
    cy.get('#email').type('haseebiqbal3394@gmail.com')
    cy.get('#password').type('Hello@2024')

    // Intercept the login request
    cy.intercept('POST', '/api/auth/login').as('loginRequest')

    // Submit login form
    cy.contains('CONTINUE WITH EMAIL').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    // Wait for the login request and verify success
    cy.wait('@loginRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
      cy.url().should('include', '/dashboard')
    })
  })

  beforeEach(() => {
    cy.viewport(480, 896)
  })

  it('Send message to client', () => {
    cy.intercept('GET', `/api/message/*`).as('getConvesationRequest')
    cy.visit('http://localhost:3000/dashboard/inbox')

    cy.wait('@getConvesationRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        const conversations = store?.getState().Messages?.conversations
        const user = store?.getState().Auth?.user

        conversations?.forEach(conversation => {
          const receiver = conversation?.participants?.find(e => e?.userId?.email !== user?.email)
          const sender = conversation?.participants?.find(e => e?.userId?.email === user?.email)

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
        let ClientConversation = conversations?.find(conv =>
          conv?.participants?.some(parti => parti.userId.email === 'client@gmail.com')
        )

        ClientConversation = ClientConversation?._id ? ClientConversation : conversations[0]

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
        const receiver =
          selectedConversation?.participants?.length &&
          selectedConversation?.participants?.find(e => e?.userId?.email !== user.email)
        const sender =
          selectedConversation?.participants?.length &&
          selectedConversation?.participants?.find(e => e?.userId?.email === user.email)

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
          const NewMessage = faker.lorem.sentences(1)
          cy.get('#message').clear().type(NewMessage)
          cy.get('#send_message').scrollIntoView().should('be.visible').click()
          cy.contains(NewMessage)
        })
        cy.get('#header_action').scrollIntoView().should('be.visible').click()

        cy.get('#profile_menu_container').within(() => {
          cy.contains('Apply for Position').scrollIntoView().should('be.visible').click()
          cy.url().should('include', '/projects')
          cy.contains('Connect. Build. grow').should('not.exist')
          cy.go('back')
        })
      })

    cy.wait('@getConvesationRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
    cy.get('#header_action').scrollIntoView().should('be.visible').click()

    cy.contains('Add User To A List').scrollIntoView().should('be.visible').click()
    cy.contains('Add User To A List').scrollIntoView().should('be.visible').click()

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
          conv?.participants?.some(parti => parti.userId.email === 'client@gmail.com')
        )

        ClientConversation = ClientConversation?._id ? ClientConversation : conversations[0]

        cy.contains('Archived Chats').should('be.visible').click()
        cy.wait(1000)
        cy.get(`#conversation_${ClientConversation?._id}`).scrollIntoView().should('be.visible').click()
        cy.url().should('include', `/dashboard/chat/${ClientConversation?._id}`)

        cy.get('#header_action').scrollIntoView().should('be.visible').click()
        cy.get('#archive_chat').scrollIntoView().should('be.visible').click()

        cy.get('#mute').scrollIntoView().should('be.visible').click()
        cy.get('#mute').scrollIntoView().should('be.visible').click()
      })

    cy.get('#hide_chat_menu').scrollIntoView().should('be.visible').click()
    cy.get('#message_container').within(() => {
      cy.scrollTo('bottom')
    })
  })
})
