import { faker } from '@faker-js/faker'

describe('template spec', () => {
  let reduxStore
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000') // Visit the login page

    // Perform login steps
    cy.contains('Log In').click()
    cy.contains('Connect. Build. grow', { timeout: 60000 }).should('not.exist')

    cy.contains('CONTINUE WITH EMAIL').click()

    // Enter login credentials
    cy.get('#email').type('client@gmail.com')
    cy.get('#password').type('Hello@2023')

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
        // Get the current state of the store
        const state = store.getState()
        cy.log(state)
      })
  })

  // it('Create A Short Term Project', () => {
  //   cy.contains('Start A Project').should('be.visible')
  //   cy.contains('Start A Project').click()
  //   cy.contains('Connect. Build. grow', { timeout: 60000 }).should('not.exist')

  //   // Step One Start
  //   cy.contains('SHORT-TERM PROJECT').should('be.visible')
  //   cy.contains('SHORT-TERM PROJECT').click()
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step One End

  //   // Step Two Start
  //   let BusinessName = faker.string.alpha(5)
  //   cy.get('#projectName').should('be.visible').type(BusinessName)
  //   cy.get('#projectName').should('have.value', BusinessName)
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   cy.contains('Please enter atleast 10 character', { timeout: 100000 }).should('be.visible')
  //   BusinessName = faker.string.alpha(50)
  //   cy.get('#projectName').should('be.visible').clear().type(BusinessName)
  //   cy.get('#projectName').should('have.value', BusinessName)
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Two End

  //   // Step Three Start
  //   let Summary = faker.string.alpha(5)
  //   cy.get('#challenge').should('be.visible').type(Summary)
  //   cy.get('#challenge').should('have.value', Summary)
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   cy.contains('Please enter atleast 200 character', { timeout: 100000 }).should('be.visible')
  //   Summary = faker.string.alpha(300)
  //   cy.get('#challenge').should('be.visible').clear().type(Summary)
  //   cy.get('#challenge').should('have.value', Summary)
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Three End

  //   // Step Four Start
  //   const Task1 = faker.string.alpha(10)
  //   cy.get('#tasks').should('be.visible').type(Task1)
  //   cy.get('#tasks').should('have.value', Task1)
  //   cy.contains('button', 'Add').should('be.visible').click()
  //   const Task2 = faker.string.alpha(10)
  //   cy.get('#tasks').should('be.visible').clear().type(Task2)
  //   cy.get('#tasks').should('have.value', Task2)
  //   cy.get('#tasks').type('{enter}')
  //   cy.contains(Task1).should('be.visible')
  //   cy.contains(Task2).should('be.visible')
  //   cy.get(`#${Task2}_1`).click()
  //   cy.get(`#${Task2}_1`).should('not.exist')
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Four End

  //   // Step Five Start
  //   const Skill1 = faker.string.alpha(10)
  //   cy.get('#skills').should('be.visible').type(Skill1)
  //   cy.get('#skills').should('have.value', Skill1)
  //   cy.contains('button', 'Add').should('be.visible').click()
  //   const Skill2 = faker.string.alpha(10)
  //   cy.get('#skills').should('be.visible').clear().type(Skill2)
  //   cy.get('#skills').should('have.value', Skill2)
  //   cy.get('#skills').type('{enter}')
  //   cy.contains(Skill1).should('be.visible')
  //   cy.contains(Skill2).should('be.visible')
  //   cy.get(`#${Skill1}_0`).click()
  //   cy.get(`#${Skill1}_0`).should('not.exist')
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Five End

  //   // Step Six Start
  //   const Goals = faker.string.alpha(100)
  //   cy.get('#goals').should('be.visible').type(Goals)
  //   cy.get('#goals').should('have.value', Goals)
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Six Endc

  //   // Step Seven Start
  //   const CompanyBackground = faker.string.alpha(200)
  //   cy.get('#companyBackground').should('be.visible').type(CompanyBackground)
  //   cy.get('#companyBackground').should('have.value', CompanyBackground)
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Seven End

  //   // Step Eight Start
  //   cy.get('#step_8') // Replace with the actual selector for StepEight
  //     .find('input') // Use the appropriate selector for the combobox
  //     .should('exist')
  //     .focus() // Focus on the combobox
  //     .type('{downarrow}', { delay: 100 })
  //   cy.contains('Skilled ($25 - $50)').should('exist') // Ensure the option is visible
  //   // Select the option
  //   cy.contains('Skilled ($25 - $50)').click()
  //   // Verify that the combobox value has been updated
  //   cy.contains('Skilled ($25 - $50)')
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Eight End

  //   // Step Nine Start
  //   const Question1 = faker.string.alpha(10)
  //   cy.get('#questionsToAsk').should('be.visible').type(Question1)
  //   cy.get('#questionsToAsk').should('have.value', Question1)
  //   cy.contains('button', 'Add').should('be.visible').click()
  //   const Question2 = faker.string.alpha(10)
  //   cy.get('#questionsToAsk').should('be.visible').clear().type(Question2)
  //   cy.get('#questionsToAsk').should('have.value', Question2)
  //   cy.get('#questionsToAsk').type('{enter}')
  //   cy.contains(Question1).should('be.visible')
  //   cy.contains(Question2).should('be.visible')
  //   cy.get(`#${Question2}_icon`).click()
  //   cy.get(`#${Question2}_icon`).should('not.exist')
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Nine End

  //   // Step Ten Start
  //   cy.fixture('image.png').as('fileToUpload')
  //   cy.get('#project_images').attachFile('image.png')
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Ten End

  //   // Step Eleven Skip

  //   cy.contains('button', 'Skip').should('be.visible').click()

  //   // Step Twelve Start

  //   cy.get('#project_detail').within(() => {
  //     cy.contains(BusinessName) // Checks if BusinessName is present
  //     cy.contains('Short Term Business') // Checks if 'Short Term Business' is present
  //     cy.contains(Summary) // Checks if Summary is present
  //   })
  //   cy.get('#project_requirements').within(() => {
  //     cy.contains(Skill2)
  //   })
  //   cy.get('#goals').within(() => {
  //     cy.contains(Goals)
  //   })
  //   cy.get('#company_background').within(() => {
  //     cy.contains(CompanyBackground)
  //   })
  //   cy.get('#additional_details').within(() => {
  //     cy.contains('Skilled ($25 - $50)')
  //     cy.contains(Question1)
  //   })

  //   // Business Create API and dashboard API
  //   cy.intercept('POST', '/api/business/create').as('createBusinessRequest')
  //   cy.intercept('GET', '/api/auth/current_user').as('userDataRequest')
  //   cy.contains('button', 'CREATE PROJECT').should('be.visible').click()
  //   cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

  //   cy.wait('@createBusinessRequest').then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //     cy.url({ timeout: 60000 }).should('include', '/dashboard')
  //   })
  //   cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

  //   cy.wait('@userDataRequest', { timeout: 10000 }).then(interception => {
  //     cy.contains(BusinessName).should('be.visible')
  //     expect(interception.response.statusCode).to.eq(200)
  //     cy.contains('My Projects').should('be.visible').click()
  //     cy.url({ timeout: 60000 }).should('include', '/dashboard/projects')
  //   })
  // })

  // it('Create A Long Term Project', () => {
  //   cy.contains('Start A Project').should('be.visible')
  //   cy.contains('Start A Project').click()

  //   cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

  //   // Step One Start

  //   cy.contains('LONG-TERM COLLABORATION').should('be.visible')
  //   cy.contains('LONG-TERM COLLABORATION').click()

  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step One End

  //   // Step Two Start

  //   let BusinessName = faker.string.alpha(5)
  //   cy.get('#projectName').should('be.visible').type(BusinessName)
  //   cy.get('#projectName').should('have.value', BusinessName)

  //   cy.contains('button', 'Next').should('be.visible').click()

  //   cy.contains('Please enter atleast 10 character', { timeout: 100000 }).should('be.visible')

  //   BusinessName = faker.string.alpha(50)
  //   cy.get('#projectName').should('be.visible').clear().type(BusinessName)
  //   cy.get('#projectName').should('have.value', BusinessName)

  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Two End

  //   // Step Three Start
  //   let Role = faker.string.alpha(5)
  //   cy.get('#role').should('be.visible').type(Role)
  //   cy.get('#role').should('have.value', Role)

  //   cy.contains('button', 'Next').should('be.visible').click()

  //   cy.contains('Please enter atleast 200 character', { timeout: 100000 }).should('be.visible')

  //   Role = faker.string.alpha(300)
  //   cy.get('#role').should('be.visible').clear().type(Role)
  //   cy.get('#role').should('have.value', Role)

  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Three End

  //   // Step Four Start
  //   const TeamDynamics = faker.string.alpha(10)
  //   cy.get('#teamDynamics').should('be.visible').type(TeamDynamics)
  //   cy.get('#teamDynamics').should('have.value', TeamDynamics)

  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Four End

  //   // Step Five Start

  //   const Skill1 = faker.string.alpha(10)
  //   cy.get('#skills').should('be.visible').type(Skill1)
  //   cy.get('#skills').should('have.value', Skill1)
  //   cy.contains('button', 'Add').should('be.visible').click()

  //   const Skill2 = faker.string.alpha(10)
  //   cy.get('#skills').should('be.visible').clear().type(Skill2)
  //   cy.get('#skills').should('have.value', Skill2)
  //   cy.get('#skills').type('{enter}')

  //   cy.contains(Skill1).should('be.visible')
  //   cy.contains(Skill2).should('be.visible')

  //   cy.get(`#${Skill1}_0`).click()

  //   cy.get(`#${Skill1}_0`).should('not.exist')

  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Five End

  //   // Step Six Start

  //   const Goals = faker.string.alpha(100)
  //   cy.get('#goals').should('be.visible').type(Goals)
  //   cy.get('#goals').should('have.value', Goals)

  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Six Start

  //   // Step Seven Start

  //   const CompanyBackground = faker.string.alpha(200)
  //   cy.get('#companyBackground').should('be.visible').type(CompanyBackground)
  //   cy.get('#companyBackground').should('have.value', CompanyBackground)

  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Seven End

  //   // Step Eight Start

  //   cy.get('#step_8') // Replace with the actual selector for StepEight
  //     .find('input') // Use the appropriate selector for the combobox
  //     .should('exist')
  //     .focus() // Focus on the combobox
  //     .type('{downarrow}', { delay: 100 })

  //   cy.contains('Skilled ($25 - $50)').should('exist') // Ensure the option is visible

  //   // Select the option
  //   cy.contains('Skilled ($25 - $50)').click()

  //   // Verify that the combobox value has been updated
  //   cy.contains('Skilled ($25 - $50)')
  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Eight End

  //   // Step Nine Start

  //   const Question1 = faker.string.alpha(10)
  //   cy.get('#questionsToAsk').should('be.visible').type(Question1)
  //   cy.get('#questionsToAsk').should('have.value', Question1)
  //   cy.contains('button', 'Add').should('be.visible').click()

  //   const Question2 = faker.string.alpha(10)
  //   cy.get('#questionsToAsk').should('be.visible').clear().type(Question2)
  //   cy.get('#questionsToAsk').should('have.value', Question2)
  //   cy.get('#questionsToAsk').type('{enter}')

  //   cy.contains(Question1).should('be.visible')
  //   cy.contains(Question2).should('be.visible')

  //   cy.get(`#${Question2}_icon`).click()

  //   cy.get(`#${Question2}_icon`).should('not.exist')

  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Nine End

  //   // Step Ten Start

  //   cy.fixture('image.png').as('fileToUpload')
  //   cy.get('#project_images').attachFile('image.png')

  //   cy.contains('button', 'Next').should('be.visible').click()
  //   // Step Ten End

  //   // Step Eleven Skip

  //   cy.contains('button', 'Skip').should('be.visible').click()

  //   // Step Twelve Start

  //   cy.get('#project_detail').within(() => {
  //     cy.contains(BusinessName) // Checks if BusinessName is present
  //     cy.contains('Long Term Collaboration') // Checks if 'Long Term Collaboration' is present
  //   })

  //   cy.get('#project_requirements').within(() => {
  //     cy.contains(Skill2)
  //   })

  //   cy.get('#goals').within(() => {
  //     cy.contains(Goals)
  //   })

  //   cy.get('#company_background').within(() => {
  //     cy.contains(CompanyBackground)
  //   })

  //   cy.get('#additional_details').within(() => {
  //     cy.contains('Skilled ($25 - $50)') // Checks if Budget is present
  //     cy.contains(Question1) // Checks if Questions are present
  //   })

  //   cy.intercept('POST', '/api/business/create').as('createBusinessRequest')
  //   cy.intercept('GET', '/api/auth/current_user').as('userDataRequest')

  //   cy.contains('button', 'CREATE PROJECT').should('be.visible').click()

  //   cy.wait('@createBusinessRequest').then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //     cy.url({ timeout: 60000 }).should('include', '/dashboard')
  //   })
  //   cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

  //   cy.contains(BusinessName).should('be.visible')
  //   cy.wait('@userDataRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //     cy.contains('My Projects').should('be.visible').click()
  //     cy.url({ timeout: 60000 }).should('include', '/dashboard/projects')
  //   })
  // })

  // it('Add Department and Tags to Business', () => {
  //   const userId = reduxStore.getState()?.Auth?.user?._id
  //   console.log('userId', userId)
  //   cy.intercept('POST', `/api/business/list`).as('getBusinessRequest')
  //   cy.intercept('GET', `/api/department/*?isEditingDepartment=false`).as('getDepartmentRequest')

  //   cy.contains('Tasklist').should('be.visible').click()

  //   cy.url({ timeout: 60000 }).should('include', '/dashboard/tasklist')

  //   cy.wait('@getBusinessRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   cy.wait('@getDepartmentRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //   })
  //   cy.get('#department_actions', { timeout: 5000 }).click()
  //   cy.get('#dropdown').contains('Create').click()

  //   const DepartmentName = faker.string.alpha(10)

  //   cy.get('#name').type(DepartmentName)

  //   cy.intercept('POST', '/api/department').as('createDepartmentRequest')

  //   cy.contains('button', 'Save').should('be.visible').click()

  //   cy.wait('@createDepartmentRequest').then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   cy.wait('@getBusinessRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   cy.wait('@getDepartmentRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //   })

  //   cy.get('#department_actions', { timeout: 5000 }).click()
  //   cy.get('#dropdown').contains('Edit').click()

  //   const updatedDepartmentName = faker.string.alpha(10)

  //   cy.get('#name').type(updatedDepartmentName)

  //   cy.intercept('PATCH', `/api/department/*?isEditingDepartment=true`).as('updateDepartmentRequest')

  //   cy.contains('button', 'Save').should('be.visible').click()

  //   cy.wait('@updateDepartmentRequest').then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   cy.wait('@getBusinessRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   cy.wait('@getDepartmentRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //   })

  //   cy.get('#department_actions', { timeout: 5000 }).click()
  //   cy.intercept('DELETE', `/api/department/*`).as('deleteDepartmentRequest')

  //   cy.get('#dropdown').contains('Delete').click()

  //   cy.wait('@deleteDepartmentRequest').then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   cy.wait('@getBusinessRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   cy.wait('@getDepartmentRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //   })

  //   cy.contains('button', 'Add', { timeout: 6000 }).should('be.visible').click()
  //   const tagName = faker.string.alpha(10)

  //   cy.get('#tagName').type(tagName)

  //   cy.intercept('POST', `/api/tags`).as('createTagRequest')

  //   cy.contains('button', 'Save').should('be.visible').click()

  //   cy.wait('@createTagRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   cy.wait('@getDepartmentRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })
  // })

  // it('Create,Edit and Delete Lists', () => {
  //   cy.contains('Lists').should('be.visible').click()
  //   cy.url({ timeout: 60000 }).should('include', '/dashboard/lists')

  //   cy.get('#left_lists_panel').contains('New List').click()

  //   cy.get('#add_list_modal', { timeout: 5000 }).should('be.visible')
  //   const ListName1 = faker.string.alpha(10)
  //   cy.get('#list_name').should('be.visible').clear().type(ListName1)
  //   cy.get('#list_name').should('have.value', ListName1)
  //   cy.get('#icon_1').click()

  //   cy.intercept('POST', '/api/list/create/').as('createListRequest')
  //   cy.contains('button', 'ADD LIST').should('be.visible').click()
  //   cy.get('#add_list_modal', { timeout: 5000 }).should('not.be.visible')
  //   cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

  //   cy.wait('@createListRequest').then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   cy.get('#list_actions_dropdown').click()
  //   cy.get('#list_actions_dropdown').contains('Create').click()

  //   cy.get('#add_list_modal', { timeout: 5000 }).should('be.visible')
  //   let ListName2 = faker.string.alpha(10)
  //   cy.get('#list_name').should('be.visible').clear().type(ListName2)
  //   cy.get('#list_name').should('have.value', ListName2)
  //   cy.get('#icon_1').click()

  //   cy.intercept('POST', '/api/list/create/').as('createListRequest')
  //   cy.contains('button', 'ADD LIST').should('be.visible').click()
  //   cy.get('#add_list_modal', { timeout: 5000 }).should('not.be.visible')
  //   cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

  //   cy.wait('@createListRequest').then(interception => {
  //     ListId = interception.response?.body?._id

  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   // Edit List
  //   cy.get('#list_actions_dropdown').click()
  //   cy.get('#list_actions_dropdown').contains('Edit').click()

  //   cy.get('#add_list_modal', { timeout: 5000 }).should('be.visible')
  //   ListName2 = faker.string.alpha(10)
  //   cy.get('#list_name').should('be.visible').clear().type(ListName2)
  //   cy.get('#list_name').should('have.value', ListName2)
  //   cy.get('#selected_icon').click()
  //   cy.get('#icon_2', { timeout: 5000 }).click()

  //   cy.intercept('POST', '/api/list/update/').as('updateListRequest')
  //   cy.contains('button', 'UPDATE LIST').should('be.visible').click()
  //   cy.get('#add_list_modal', { timeout: 5000 }).should('not.be.visible')

  //   cy.wait('@updateListRequest', { timeout: 6000 }).then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   // Delete List
  //   cy.get('#list_actions_dropdown').click()
  //   cy.intercept('DELETE', `/api/list-entries/*`).as('deleteListRequest')
  //   cy.intercept('GET', `/api/list-entries/users-list/*`).as('getListsRequest')
  //   cy.intercept('GET', `/api/list-entries/find-by-id/*`).as('getSingleListRequest')

  //   cy.get('#list_actions_dropdown').contains('Delete').click()
  //   cy.wait('@deleteListRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   cy.wait('@getListsRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   cy.wait('@getSingleListRequest', { timeout: 10000 }).then(interception => {
  //   })
  // })
})
