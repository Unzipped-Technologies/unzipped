import { faker } from '@faker-js/faker'

describe('template spec', () => {
  let reduxStore
  before(() => {
    cy.window().then(win => {
      const viewportWidth = win.innerWidth
      const viewportHeight = win.innerHeight

      // Now dynamically set the Cypress viewport using the retrieved width and height
      cy.viewport(viewportWidth, viewportHeight)

      // Logging for confirmation
    })

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000') // Visit the login page

    // Perform login steps
    cy.contains('Log In').click()
    cy.contains('Connect. Build. grow', { timeout: 60000 }).should('not.exist')

    cy.contains('CONTINUE WITH EMAIL').click()

    // Enter login credentials
    cy.get('#email').type('freelancer@gmail.com')
    cy.get('#password').type('Hello2024')

    // Intercept the login request
    cy.intercept('POST', '/api/auth/login').as('loginRequest')

    // Submit login form
    cy.contains('CONTINUE WITH EMAIL').click()
    cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

    // Wait for the login request and verify success
    cy.wait('@loginRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
      cy.url({ timeout: 60000 }).should('include', '/dashboard')
    })
  })

  beforeEach(() => {
    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
      })
  })

  it('Apply to a Project', () => {
    cy.intercept('POST', '/api/business/public/list').as('getProjectsRequest')
    cy.contains('Find a Project', { timeout: 6000 }).click({ force: true })
    cy.contains('Browse Projects').click({ force: true })

    cy.contains('Connect. Build. grow', { timeout: 60000 }).should('not.exist')
    cy.url({ timeout: 60000 }).should('include', '/projects')

    // Submit login form
    cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

    // Wait for the login request and verify success
    let ProjectsList = []
    cy.wait('@getProjectsRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)

      cy.window()
        .its('store')
        .then(store => {
          reduxStore = store
          ProjectsList = store.getState().Business.projectList
          cy.log('ProjectsList in', ProjectsList)
          cy.wrap(ProjectsList).as('ProjectsList') // Store it as an alias if needed later
        })
    })

    cy.get('@ProjectsList').then(ProjectsList => {
      cy.log('ProjectsList outside', ProjectsList)

      ProjectsList?.forEach(project => {
        cy.get(`#${project._id}`).contains(project.name)
        cy.contains(
          `Estimated Rate: $${
            project?.projectBudgetType === 'Hourly Rate' ? project?.budget + ' / hour' : project?.budget ?? 0
          }`
        )
      })

      const FreelancerId = reduxStore.getState().Auth.user.freelancers

      const Project = ProjectsList?.filter(project => !project.applicants.includes(FreelancerId))?.[0]
      cy.get(`#${Project._id}`).contains(Project.name).click()

      cy.contains('Connect. Build. grow', { timeout: 60000 }).should('not.exist')
      cy.url({ timeout: 60000 }).should('include', `/projects/${Project._id}`)

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

      cy.contains('Connect. Build. grow', { timeout: 60000 }).should('not.exist')
      cy.url({ timeout: 60000 }).should('include', `/dashboard`)

      cy.contains('You have successfully applied for project!', { timeout: 6000 }).should('be.visible')
    })
  })
})
