import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { testClientEmail, testClientPassword } from '../../config/keys'

describe('Create Long term and short term projects.', () => {
  before(() => {
    cy.viewport(480, 896)

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/')
    cy.get('#mobile_menu_icon').should('be.visible').click()
    cy.contains('button', 'Log In').scrollIntoView().click()
    cy.contains('Connect. Build. grow').should('not.exist')
    cy.url().should('include', '/login')

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
      expect(interception.response.statusCode).to.eq(200)
      cy.url().should('include', '/dashboard')
    })
  })
  beforeEach(() => {
    cy.viewport(480, 896)
  })
  after(() => {
    cy.end()
    cy.clearCookies()
    cy.clearLocalStorage()
  })
  it('Create A Short Term Project', () => {
    cy.get('#mobile_menu_icon').should('be.visible').click()
    cy.contains('button', 'Start A Project').scrollIntoView().click()
    cy.contains('Connect. Build. grow').should('not.exist')
    cy.url().should('include', '/create-your-business')

    // Step One Start
    cy.contains('SHORT-TERM PROJECT').should('be.visible')
    cy.contains('SHORT-TERM PROJECT').click()
    cy.contains('button', 'Next').should('be.visible').click()
    // Step One End

    // Step Two Start
    let BusinessName = faker.string.alpha(5)
    cy.get('#projectName').should('be.visible').type(BusinessName)
    cy.get('#projectName').should('have.value', BusinessName)
    cy.contains('button', 'Next').should('be.visible').click()
    cy.contains('Please enter atleast 10 character').should('be.visible')
    BusinessName = faker.string.alpha(50)
    cy.get('#projectName').should('be.visible').clear().type(BusinessName)
    cy.get('#projectName').should('have.value', BusinessName)
    cy.contains('button', 'Next').should('be.visible').click()
    // Step Two End

    // Step Three Start
    let Summary = faker.string.alpha(5)
    cy.get('#challenge').should('be.visible').type(Summary)
    cy.get('#challenge').should('have.value', Summary)
    cy.contains('button', 'Next').should('be.visible').click()
    cy.contains('Please enter atleast 200 character').should('be.visible')
    Summary = faker.string.alpha(300)
    cy.get('#challenge').should('be.visible').clear().type(Summary)
    cy.get('#challenge').should('have.value', Summary)
    // Step Three End

    // Step Four Start
    const Task1 = faker.string.alpha(10)
    cy.get('#tasks').should('be.visible').type(Task1)
    cy.get('#tasks').should('have.value', Task1)
    cy.contains('button', 'Add').should('be.visible').click()
    const Task2 = faker.string.alpha(10)
    cy.get('#tasks').should('be.visible').clear().type(Task2)
    cy.get('#tasks').should('have.value', Task2)
    cy.get('#tasks').type('{enter}')
    cy.contains(Task1).should('be.visible')
    cy.contains(Task2).should('be.visible')
    cy.get(`#${Task2}_1`).click()
    cy.get(`#${Task2}_1`).should('not.exist')
    cy.contains('button', 'Next').should('be.visible').click()
    // Step Four End

    // Step Five Start
    const Skill1 = faker.string.alpha(10)
    cy.get('#skills').should('be.visible').type(Skill1)
    cy.get('#skills').should('have.value', Skill1)
    cy.contains('button', 'Add').should('be.visible').click()
    const Skill2 = faker.string.alpha(10)
    cy.get('#skills').should('be.visible').clear().type(Skill2)
    cy.get('#skills').should('have.value', Skill2)
    cy.get('#skills').type('{enter}')
    cy.contains(Skill1).should('be.visible')
    cy.contains(Skill2).should('be.visible')
    cy.get(`#${Skill1}_0`).click()
    cy.get(`#${Skill1}_0`).should('not.exist')
    cy.contains('button', 'Next').should('be.visible').click()
    // Step Five End

    // Step Six Start
    const Goals = faker.string.alpha(100)
    cy.get('#goals').should('be.visible').type(Goals)
    cy.get('#goals').should('have.value', Goals)
    // Step Six Endc

    // Step Seven Start
    const CompanyBackground = faker.string.alpha(200)
    cy.get('#companyBackground').should('be.visible').type(CompanyBackground)
    cy.get('#companyBackground').should('have.value', CompanyBackground)
    cy.contains('button', 'Next').should('be.visible').click()
    // Step Seven End

    // Step Eight Start
    cy.get('#step_8') // Replace with the actual selector for StepEight
      .find('input')
      .eq(0) // Use the appropriate selector for the combobox
      .should('exist')
      .focus() // Focus on the combobox
      .type('{downarrow}', { delay: 100 })
    cy.contains('Skilled ($25 - $50)').should('exist') // Ensure the option is visible
    // Select the option
    cy.contains('Skilled ($25 - $50)').click()
    // Verify that the combobox value has been updated
    cy.contains('Skilled ($25 - $50)')
    // Step Eight End

    // Step Nine Start
    const Question1 = faker.string.alpha(10)
    cy.get('#questionsToAsk').should('be.visible').type(Question1)
    cy.get('#questionsToAsk').should('have.value', Question1)
    cy.contains('button', 'Add').should('be.visible').click()
    const Question2 = faker.string.alpha(10)
    cy.get('#questionsToAsk').should('be.visible').clear().type(Question2)
    cy.get('#questionsToAsk').should('have.value', Question2)
    cy.get('#questionsToAsk').type('{enter}')
    cy.contains(Question1).should('be.visible')
    cy.contains(Question2).should('be.visible')
    cy.get(`#${Question2}_icon`).click()
    cy.get(`#${Question2}_icon`).should('not.exist')
    cy.contains('button', 'Next').should('be.visible').click()
    cy.contains('button', 'Next').should('be.visible').click()
    cy.contains('button', 'Next').should('be.visible').click()
    // Step Nine End

    // Step Twelve Start

    cy.get('#project_detail').within(() => {
      cy.contains(BusinessName) // Checks if BusinessName is present
      cy.contains('Short Term Business') // Checks if 'Short Term Business' is present
      cy.contains(Summary) // Checks if Summary is present
    })
    cy.get('#project_requirements').within(() => {
      cy.contains(Skill2)
    })
    cy.get('#goals').within(() => {
      cy.contains(Goals)
    })
    cy.get('#company_background').within(() => {
      cy.contains(CompanyBackground)
    })
    cy.get('#additional_details').within(() => {
      cy.contains('Skilled ($25 - $50)')
      cy.contains(Question1)
    })

    // Business Create API and dashboard API
    cy.intercept('POST', '/api/business/create').as('createBusinessRequest')
    cy.intercept('GET', '/api/auth/current_user').as('userDataRequest')
    cy.contains('button', 'CREATE PROJECT').should('be.visible').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@createBusinessRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
      cy.url().should('include', '/dashboard')
    })
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@userDataRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
      cy.get('#Projects').should('be.visible').click()
      cy.url().should('include', '/dashboard/projects')
      cy.get('[data-testid="view_mobile_projects"]')
        .should('be.visible')
        .within(() => {
          cy.contains('VIEW ALL').should('be.visible').click()
          cy.url().should('include', '/dashboard/projects/view')
          cy.contains('Connect. Build. grow').should('not.exist')
          cy.contains(ValidationUtils.truncate(BusinessName, 40))
        })
    })
  })

  it('Create A Long Term Project', () => {
    cy.get('#mobile_menu_icon').should('be.visible').click()
    cy.contains('button', 'Start A Project').scrollIntoView().should('be.visible').click()
    cy.contains('Connect. Build. grow').should('not.exist')
    cy.url().should('include', '/create-your-business')

    cy.contains('Connect. Build. grow').should('not.exist')

    // Step One Start

    cy.contains('LONG-TERM COLLABORATION').should('be.visible')
    cy.contains('LONG-TERM COLLABORATION').click()

    cy.contains('button', 'Next').should('be.visible').click()
    // Step One End

    // Step Two Start

    let BusinessName = faker.string.alpha(5)
    cy.get('#projectName').should('be.visible').type(BusinessName)
    cy.get('#projectName').should('have.value', BusinessName)

    cy.contains('button', 'Next').should('be.visible').click()

    cy.contains('Please enter atleast 10 character').should('be.visible')

    BusinessName = faker.string.alpha(50)
    cy.get('#projectName').should('be.visible').clear().type(BusinessName)
    cy.get('#projectName').should('have.value', BusinessName)

    cy.contains('button', 'Next').should('be.visible').click()
    // Step Two End

    // Step Three Start
    let Role = faker.string.alpha(5)
    cy.get('#role').should('be.visible').type(Role)
    cy.get('#role').should('have.value', Role)

    // Step Three End

    // Step Four Start
    const TeamDynamics = faker.string.alpha(10)
    cy.get('#teamDynamics').should('be.visible').type(TeamDynamics)
    cy.get('#teamDynamics').should('have.value', TeamDynamics)

    cy.contains('button', 'Next').should('be.visible').click()

    cy.contains('Please enter atleast 200 character').should('be.visible')

    Role = faker.string.alpha(300)
    cy.get('#role').should('be.visible').clear().type(Role)
    cy.get('#role').should('have.value', Role)

    cy.contains('button', 'Next').should('be.visible').click()

    // Step Four End

    // Step Five Start

    const Skill1 = faker.string.alpha(10)
    cy.get('#skills').should('be.visible').type(Skill1)
    cy.get('#skills').should('have.value', Skill1)
    cy.contains('button', 'Add').should('be.visible').click()

    const Skill2 = faker.string.alpha(10)
    cy.get('#skills').should('be.visible').clear().type(Skill2)
    cy.get('#skills').should('have.value', Skill2)
    cy.get('#skills').type('{enter}')

    cy.contains(Skill1).should('be.visible')
    cy.contains(Skill2).should('be.visible')

    cy.get(`#${Skill1}_0`).click()

    cy.get(`#${Skill1}_0`).should('not.exist')

    cy.contains('button', 'Next').should('be.visible').click()
    // Step Five End

    // Step Six Start

    const Goals = faker.string.alpha(100)
    cy.get('#goals').should('be.visible').type(Goals)
    cy.get('#goals').should('have.value', Goals)

    // Step Six Start

    // Step Seven Start

    const CompanyBackground = faker.string.alpha(200)
    cy.get('#companyBackground').should('be.visible').type(CompanyBackground)
    cy.get('#companyBackground').should('have.value', CompanyBackground)

    cy.contains('button', 'Next').should('be.visible').click()
    // Step Seven End

    // Step Eight Start

    cy.get('#step_8') // Replace with the actual selector for StepEight
      .find('input')
      .eq(0) // Use the appropriate selector for the combobox
      .should('exist')
      .focus() // Focus on the combobox
      .type('{downarrow}', { delay: 100 })

    cy.contains('Skilled ($25 - $50)').should('exist') // Ensure the option is visible

    // Select the option
    cy.contains('Skilled ($25 - $50)').click()

    // Verify that the combobox value has been updated
    cy.contains('Skilled ($25 - $50)')
    // Step Eight End

    // Step Nine Start

    const Question1 = faker.string.alpha(10)
    cy.get('#questionsToAsk').should('be.visible').type(Question1)
    cy.get('#questionsToAsk').should('have.value', Question1)
    cy.contains('button', 'Add').should('be.visible').click()

    const Question2 = faker.string.alpha(10)
    cy.get('#questionsToAsk').should('be.visible').clear().type(Question2)
    cy.get('#questionsToAsk').should('have.value', Question2)
    cy.get('#questionsToAsk').type('{enter}')

    cy.contains(Question1).should('be.visible')
    cy.contains(Question2).should('be.visible')

    cy.get(`#${Question2}_icon`).click()

    cy.get(`#${Question2}_icon`).should('not.exist')

    cy.contains('button', 'Next').should('be.visible').click()
    // Step Nine End

    cy.contains('button', 'Next').should('be.visible').click()
    // Step Ten End
    cy.contains('button', 'Next').should('be.visible').click()

    // Step Twelve Start

    cy.get('#project_detail').within(() => {
      cy.contains(BusinessName) // Checks if BusinessName is present
      cy.contains('Long Term Collaboration') // Checks if 'Long Term Collaboration' is present
    })

    cy.get('#project_requirements').within(() => {
      cy.contains(Skill2)
    })

    cy.get('#goals').within(() => {
      cy.contains(Goals)
    })

    cy.get('#company_background').within(() => {
      cy.contains(CompanyBackground)
    })

    cy.get('#additional_details').within(() => {
      cy.contains('Skilled ($25 - $50)') // Checks if Budget is present
      cy.contains(Question1) // Checks if Questions are present
    })

    cy.intercept('POST', '/api/business/create').as('createBusinessRequest')
    cy.intercept('GET', '/api/auth/current_user').as('userDataRequest')

    cy.contains('button', 'CREATE PROJECT').should('be.visible').click()

    cy.wait('@createBusinessRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
      cy.url().should('include', '/dashboard')
    })
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@userDataRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
      cy.get('#Projects').should('be.visible').click()
      cy.url().should('include', '/dashboard/projects')
      cy.get('[data-testid="view_mobile_projects"]')
        .should('be.visible')
        .within(() => {
          cy.contains('VIEW ALL').should('be.visible').click()
          cy.url().should('include', '/dashboard/projects/view')
          cy.contains('Connect. Build. grow').should('not.exist')
          cy.contains(ValidationUtils.truncate(BusinessName, 40))
        })
    })
  })
})
