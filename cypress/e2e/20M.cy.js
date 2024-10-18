import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'

describe('Client can create,edit tasks', () => {
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
    cy.get('#email').type('client@gmail.com')
    cy.get('#password').type('Hello@2023')

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
  })

  beforeEach(() => {
    cy.viewport(480, 896)

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        // Get the current state of the store
      })
  })

  it('Verify business names and department names in tasklist page', () => {
    cy.intercept('POST', `/api/business/list`).as('getBusinessRequest')
    cy.intercept('GET', `/api/business/get-business-employees/*?isSelectedBusiness=false`).as('getBusinessEmpRequest')
    cy.intercept('GET', `/api/business/get-business-employees/*?isSelectedBusiness=true`).as('getBusinessEmpRequest2')

    cy.intercept('GET', `/api/department/*?isEditingDepartment=false`).as('getDepartmentRequest')

    cy.visit('http://localhost:3000/dashboard/tasklist')

    cy.wait('@getBusinessEmpRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.wait(500)
    cy.wait('@getBusinessRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const BusinessList = store.getState()?.Business?.projectList
        cy.log('BusinessList', BusinessList)
        BusinessList?.forEach((business, i) => {
          cy.log('idddd', business?._id)
          if (i !== 0) {
            cy.contains(ConverterUtils.truncateString(business.name, 40))
              .scrollIntoView()
              .should('be.visible')
              .click({ force: true })
            cy.wait('@getBusinessEmpRequest2').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
          }
          cy.get(`#business_${business?._id}`)
            .scrollIntoView()
            .within(() => {
              business?.businessDepartments?.forEach((department, index) => {
                cy.get(`#department_${department?._id}`).within(() => {
                  cy.contains(ConverterUtils.truncateString(department.name, 20)).scrollIntoView().should('be.visible')
                })
              })
            })
        })
      })
  })

  it('Create and assign  tasks to freelancer', () => {
    cy.intercept('GET', `/api/tasks/*`).as('getTaskRequest')
    cy.intercept('POST', `/api/tasks`).as('createTaskRequest')
    cy.intercept('PATCH', `/api/tasks/*`).as('updateTaskRequest')
    cy.intercept('GET', `/api/department/*?isEditingDepartment=false`).as('getDepartmentRequest')
    cy.intercept('GET', `/api/business/get-business-employees/*?isSelectedBusiness=true`).as('getBusinessEmpRequest')

    // Click on business and department to add task
    cy.window()
      .its('store')
      .then(store => {
        let Business = null
        let Department = null
        for (var business of store.getState()?.Business?.projectList) {
          let isMatch = false
          for (var department of business.businessDepartments) {
            if (!department?.isDeleted) {
              Department = department
              Business = business
              isMatch = true
              break
            }
          }
          if (isMatch) break
        }
        cy.get(`#business_${Business?._id}`).scrollIntoView().should('be.visible').click()

        cy.contains(ConverterUtils.truncateString(Department.name, 20)).scrollIntoView().should('be.visible').click()
        cy.wait('@getDepartmentRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
        cy.wait('@getBusinessEmpRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })

    // Create Task
    cy.window()
      .its('store')
      .then(store => {
        const SelectedDepartment = store.getState()?.Departments.selectedDepartment
        SelectedDepartment?.departmentTags?.forEach(tag => {
          cy.get(`#tag_${tag?._id}`).within(() => {
            cy.contains(`${ValidationUtils.truncate(tag.tagName, 20)} (${tag?.tasks?.length})`).should('be.visible')
          })
        })
        cy.contains('button', 'Add').should('be.visible').click()

        cy.contains('button', 'CANCEL').should('be.visible').click()
        cy.contains('button', 'Add').should('be.visible').click()

        cy.get('#task_form_modal')
          .should('be.visible')
          .within(() => {
            const TaskName = faker.lorem.sentences(1)
            const TagNam1 = faker.string.alpha(5)
            const TagNam2 = faker.string.alpha(5)
            const StoryPoints = faker.number.int({ min: 1, max: 100 })
            const Description = faker.lorem.sentences(5)

            cy.get('#taskName').should('be.visible').clear().type(TaskName)

            cy.get('#assignee').find('input').eq(0).should('exist').click().type('{downarrow}', { delay: 100 })
            SelectedDepartment?.contracts?.forEach(contract => {
              cy.contains(contract?.freelancer.user?.email).scrollIntoView().should('exist') // Ensure the option is visible
            })
            cy.contains(SelectedDepartment?.contracts[0]?.freelancer.user?.email).click()
            cy.contains(SelectedDepartment?.contracts[0]?.freelancer.user?.email)

            cy.get('#tags-standard').should('be.visible').clear().type(TagNam1).type('{enter}', { delay: 100 })
            cy.get('#tags-standard').should('be.visible').clear().type(TagNam2).type('{enter}', { delay: 100 })

            cy.get('#priority_autocomplete').should('exist').click().type('{downarrow}', { delay: 100 })
            cy.contains('highest').click()

            cy.get('#storyPoints').should('be.visible').clear().type(StoryPoints)

            cy.get('#status_autocomplete').should('exist').click().type('{downarrow}', { delay: 100 })
            cy.contains('Todo').click()

            cy.get('#description').should('be.visible').clear().type(Description)

            cy.contains('button', 'Save').scrollIntoView().should('be.visible').click()
            cy.wait('@createTaskRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
            cy.wait('@getDepartmentRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
          })
      })

    //  Verify Task data
    cy.get('#task_form_modal').should('not.exist')
    cy.wait(1000)
    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const SelectedDepartment = store.getState()?.Departments.selectedDepartment
        SelectedDepartment?.departmentTags?.forEach(tag => {
          cy.get(`#tag_${tag?._id}`).scrollIntoView().click()

          cy.get(`#tag_${tag?._id}`)
            .scrollIntoView()
            .within(() => {
              cy.contains(`${ValidationUtils.truncate(tag.tagName, 20)} (${tag?.tasks?.length})`).should('be.visible')
            })
          tag?.tasks?.forEach(task => {
            cy.get(`#task_${task?._id}`)
              .scrollIntoView()
              .within(() => {
                cy.contains(task.taskName).scrollIntoView().should('be.visible')
                cy.contains(`Story Points : ${task?.storyPoints}`).scrollIntoView().should('be.visible')
                cy.contains(task.priority).scrollIntoView().should('be.visible')
                cy.contains(
                  ConverterUtils.capitalize(
                    `${
                      task?.assignee?.user?.FullName
                        ? task?.assignee?.user?.FullName
                        : task?.assignee?.user?.FirstName || task?.assignee?.user?.LastName
                        ? `${task?.assignee?.user?.FirstName} ${task?.assignee?.user?.LastName}`
                        : 'Unassigned'
                    }`
                  )
                )
                  .scrollIntoView()
                  .should('be.visible')
              })
          })
        })
      })

    // Click on task and tag to edit task
    cy.window()
      .its('store')
      .then(store => {
        const SelectedDepartment = store.getState()?.Departments.selectedDepartment

        const Task1 =
          SelectedDepartment?.departmentTags[0]?.tasks[SelectedDepartment?.departmentTags[0]?.tasks?.length - 1]
        cy.get(`#tag_${SelectedDepartment?.departmentTags[0]?._id}`).scrollIntoView().click({ force: true })
        cy.get(`#task_${Task1?._id}`).scrollIntoView().click({ force: true })
        cy.url().should('include', `/dashboard/ticket/${Task1._id}`)
      })

    // Edit task
    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const SelectedDepartment = store.getState()?.Departments.selectedDepartment
        const Task1 =
          SelectedDepartment?.departmentTags[0]?.tasks[SelectedDepartment?.departmentTags[0]?.tasks?.length - 1]

        cy.get('#task_form_modal')
          .should('be.visible')
          .within(() => {
            const TaskName = faker.lorem.sentences(1)
            const TagNam1 = faker.string.alpha(5)
            const TagNam2 = faker.string.alpha(5)
            const StoryPoints = faker.number.int({ min: 1, max: 100 })
            const Description = faker.lorem.sentences(5)
            const Comment = faker.lorem.sentences(2)
            const Tag1 = SelectedDepartment?.departmentTags[0]

            cy.contains(Task1.taskName).scrollIntoView().should('be.visible').click()
            cy.get('#taskName').should('be.visible').clear().type(TaskName)

            cy.get('#assignee').find('input').eq(0).should('exist').click().type('{downarrow}', { delay: 100 })
            SelectedDepartment?.contracts?.forEach(contract => {
              cy.contains(contract?.freelancer.user?.email).scrollIntoView().should('exist') // Ensure the option is visible
            })
            cy.get('div[id^="react-select-"]')
              .contains(SelectedDepartment?.contracts[0]?.freelancer.user?.email)
              .click()
            cy.contains(SelectedDepartment?.contracts[0]?.freelancer.user?.email)

            if (Task1?.tags?.length < 5) {
              cy.get('#tags-standard').should('be.visible').clear().type(TagNam1).type('{enter}', { delay: 100 })
              cy.get('#tags-standard').should('be.visible').clear().type(TagNam2).type('{enter}', { delay: 100 })
            }

            cy.get('#priority_autocomplete').should('exist').click().type('{downarrow}', { delay: 100 })
            cy.contains('medium').click()

            cy.get('#storyPoints').should('be.visible').clear().type(StoryPoints)

            cy.get('#status_autocomplete').should('exist').click().type('{downarrow}', { delay: 100 })
            cy.get('[role="presentation"]').should('be.visible').find('[role="option"]').eq(0).click()

            cy.contains(Task1?.description).should('be.visible').click()
            cy.get('#description').should('be.visible').clear().type(Description)

            cy.get('#comment').should('be.visible').clear().type(Comment)

            cy.contains('button', 'Save').scrollIntoView().should('be.visible').click()
            cy.wait('@updateTaskRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
            cy.wait('@getDepartmentRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
          })
      })

    // Click on task and tag to edit comment
    cy.window()
      .its('store')
      .then(store => {
        const SelectedDepartment = store.getState()?.Departments.selectedDepartment
        cy.log('SelectedDepartment', SelectedDepartment)

        const Task1 =
          SelectedDepartment?.departmentTags[0]?.tasks[SelectedDepartment?.departmentTags[0]?.tasks?.length - 1]
        cy.get(`#tag_${SelectedDepartment?.departmentTags[0]?._id}`).scrollIntoView().click({ force: true })
        cy.get(`#task_${Task1?._id}`).scrollIntoView().click({ force: true })
        cy.url().should('include', `/dashboard/ticket/${Task1._id}`)
      })

    // Edit comment
    cy.window()
      .its('store')
      .then(store => {
        cy.get('#task_form_modal')
          .should('be.visible')
          .within(() => {
            const SelectedDepartment = store.getState()?.Departments.selectedDepartment
            const Task1 =
              SelectedDepartment?.departmentTags[0]?.tasks[SelectedDepartment?.departmentTags[0]?.tasks?.length - 1]
            const getCommentUserData = comment => {
              let userData = {
                profilePic: '',
                name: ''
              }
              if (Task1?.department?.client?._id === comment?.userId) {
                userData.profilePic = Task1?.department?.client?.profileImage
                userData.name =
                  Task1?.department?.client?.FullName ||
                  `${Task1?.department?.client?.FirstName} ${Task1?.department?.client?.LastName}`
              } else {
                for (var contract of SelectedDepartment?.contracts) {
                  if (contract?.freelancer?.user?._id === comment?.userId) {
                    userData.profilePic = contract?.freelancer?.user?.profileImage
                    userData.name =
                      contract?.freelancer?.user?.FullName ||
                      `${contract?.freelancer?.user?.FirstName} ${contract?.freelancer?.user?.LastName}`
                  }
                  break
                }
              }
              return userData
            }
            cy.scrollTo('bottom')
            Task1?.comments?.forEach(comment => {
              const data = getCommentUserData(comment)
              if (data?.profilePic) {
                cy.get(`img[src*="${data?.profilePic}"]`)
                  .scrollIntoView()
                  .should('be.visible')
                  .should('have.attr', 'src')
                  .then(src => {
                    expect(src).to.include(data?.profilePic)
                  })
              }
              cy.get(`#comment_${comment?._id}_user_info`).within(() => {
                cy.contains(ValidationUtils.formatDateWithDate(comment?.updatedAt))
                  .scrollIntoView()
                  .should('be.visible')
              })
            })
            cy.get(`div#${Task1.comments[0]?._id}`).scrollIntoView().trigger('mouseover')
            cy.get(`#edit_${Task1.comments[0]?._id}_comment`).scrollIntoView().click()
            const NewComment = faker.lorem.sentences(2)
            cy.get(`#comment_${Task1.comments[0]?._id}`).scrollIntoView().should('be.visible').clear().type(NewComment)
            cy.contains('button', 'Save').scrollIntoView().should('be.visible').click()
          })
      })
  })
})
