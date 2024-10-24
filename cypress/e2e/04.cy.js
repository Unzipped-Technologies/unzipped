import { faker } from '@faker-js/faker'
import { testFreelancerEmail, testFreelancerPassword } from '../../config/keys'
import { testClientEmail } from '../../config/keys'

describe('Apply for project', () => {
  let reduxStore
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/') // Visit the login page
    cy.window().its('document.readyState').should('eq', 'complete')

    cy.intercept('POST', '/api/auth/login').as('loginRequest')

    // Perform login steps
    cy.contains('Log In').click()
    cy.contains('Connect. Build. grow').should('not.exist')
    cy.window().its('document.readyState').should('eq', 'complete')

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

  it('Apply to a Project', () => {
    cy.intercept('POST', '/api/business/public/list').as('getProjectsRequest')
    cy.intercept('POST', '/api/projectApplication').as('applyProjectRequest')
    cy.intercept('GET', `/api/auth/current_user`).as('getCurrentRequest')

    cy.visit('/projects')
    cy.window().its('document.readyState').should('eq', 'complete')

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
        cy.get(`#${project._id}`).contains(project.name)
        cy.contains(
          `Estimated Rate: ${
            project?.projectBudgetType === 'Hourly Rate' ? project?.budgetRange + ' / hour' : project?.budgetRange ?? 0
          }`
        )
      })

      const FreelancerId = reduxStore.getState().Auth.user.freelancers?._id

      const Project = ProjectsList?.filter(
        project => project?.user?.email === testClientEmail && !project?.applicants?.includes(FreelancerId)
      )?.[0]
      cy.get(`#${Project._id}`).contains(Project.name).click()

      cy.contains('Connect. Build. grow').should('not.exist')
      cy.url().should('include', `/projects/${Project._id}`)
      cy.window().its('document.readyState').should('eq', 'complete')

      cy.get('#desired_rate').type(20)
      const CoverLetter = faker.lorem.sentences(10)
      cy.get('#cover_letter').type(CoverLetter)

      Project?.questions?.forEach((question, index) => {
        const Answer = faker.lorem.sentences(2)

        cy.get(`#question_${index}`).type(Answer)
      })

      cy.get(`#project_apply_form`).contains('button', 'SUBMIT APPLICATION').should('be.visible').click()

      cy.wait('@applyProjectRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 400])
      })

      cy.contains('Connect. Build. grow').should('not.exist')
      cy.wait('@getCurrentRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 400])
      })
      cy.url().should('include', `/dashboard`)
      cy.window().its('document.readyState').should('eq', 'complete')

      cy.contains('You have successfully applied for project!').should('be.visible')
    })
  })
})
