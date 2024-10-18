import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'

describe('Apply for project', () => {
  let reduxStore
  before(() => {
    cy.viewport(480, 896)
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000') // Visit the login page

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

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
      })
  })

  it('Apply to a Project', () => {
    cy.intercept('POST', '/api/business/public/list').as('getProjectsRequest')
    cy.get('#mobile_menu_icon').should('be.visible').click()

    cy.get(`#mobile_menu_2`).click()
    cy.get(`#mobile_menu_2`).within(() => {
      cy.contains('Browse projects that match your skills').click()
    })

    cy.contains('Connect. Build. grow').should('not.exist')
    cy.url().should('include', '/projects')

    // Submit login form
    cy.contains('Connect. Build. grow').should('not.exist')

    // Wait for the login request and verify success
    let ProjectsList = []
    cy.wait('@getProjectsRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)

      cy.window()
        .its('store')
        .then(store => {
          reduxStore = store
          ProjectsList = store.getState().Business.projectList
          cy.wrap(ProjectsList).as('ProjectsList') // Store it as an alias if needed later
        })
    })

    cy.get('@ProjectsList').then(ProjectsList => {
      ProjectsList?.forEach(project => {
        cy.get(`#${project._id}`).within(() => {
          cy.contains(ValidationUtils.truncate(project?.name, 40)).scrollIntoView().should('be.visible')
        })
      })

      const FreelancerId = reduxStore.getState().Auth.user.freelancers?._id

      const Project = ProjectsList?.filter(
        project => project?.user?.email === 'client@gmail.com' && !project?.applicants?.includes(FreelancerId)
      )?.[0]
      cy.get(`#${Project._id}`).within(() => {
        cy.contains(ValidationUtils.truncate(Project?.name, 40)).scrollIntoView().should('be.visible').click()
      })

      cy.contains('Connect. Build. grow').should('not.exist')
      cy.url().should('include', `/projects/${Project._id}`)

      cy.get('#desired_rate').type(20)
      const CoverLetter = faker.lorem.sentences(10)
      cy.get('#cover_letter').type(CoverLetter)

      Project?.questions?.forEach((question, index) => {
        const Answer = faker.lorem.sentences(2)

        cy.get(`#question_${index}`).type(Answer)
      })
      cy.intercept('POST', '/api/projectApplication').as('applyProjectRequest')

      cy.get(`#project_apply_form`).contains('button', 'SUBMIT APPLICATION').should('be.visible').click()

      cy.wait('@applyProjectRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 400])
      })

      cy.contains('Connect. Build. grow').should('not.exist')
      cy.url().should('include', `/dashboard`)

      cy.contains('You have successfully applied for project!').should('be.visible')
    })
  })
})
