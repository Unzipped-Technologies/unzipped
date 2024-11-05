import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'
import { testFreelancerEmail, testFreelancerPassword } from '../../config/keys'

describe('Freelancer can add comments to tasks', () => {
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000') // Visit the login page

    cy.window().its('document.readyState').should('eq', 'complete')

    // Perform login steps
    cy.contains('Log In').click()
    cy.contains('Connect. Build. grow').should('not.exist')

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
      cy.url().should('include', '/dashboard')
    })
  })

  it('Verify business names and department names in tasklist page', () => {
    cy.intercept('POST', `/api/business/list`).as('getBusinessRequest')
    cy.intercept('GET', `/api/department/*?isEditingDepartment=false`).as('getDepartmentRequest')
    cy.intercept('GET', `/api/business/get-business-employees/*?isSelectedBusiness=false`).as('getBusinessEmpRequest')

    cy.contains('Tasklist').should('be.visible').click()

    cy.url().should('include', '/dashboard/tasklist')

    cy.wait('@getBusinessRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
    })

    cy.window()
      .its('store')
      .then(store => {
        const BusinessList = store.getState()?.Business?.projectList
        BusinessList?.forEach((business, index) => {
          cy.get(`#business_${business?._id}`).within(() => {
            if (index !== 0) {
              cy.contains(ConverterUtils.truncateString(business.name, 30)).should('be.visible').click()
              cy.wait('@getDepartmentRequest').then(interception => {
                expect(interception.response.statusCode).to.be.oneOf([200, 304])
              })
              cy.wait('@getBusinessEmpRequest').then(interception => {
                expect(interception.response.statusCode).to.be.oneOf([200, 304])
              })
              cy.contains('Connect. Build. grow').should('not.exist')
            }
            business?.businessDepartments?.forEach(department => {
              cy.get(`#department_${department?._id}`).within(() => {
                cy.contains(ConverterUtils.truncateString(department.name, 20)).should('be.visible')
              })
            })
          })
        })
      })
  })

  it('Add Comments', () => {
    cy.intercept('GET', `/api/tasks/*`).as('getTaskRequest')
    cy.intercept('PATCH', `/api/tasks/*`).as('updateTaskRequest')
    cy.intercept('GET', `/api/department/*?isEditingDepartment=false`).as('getDepartmentRequest')
    cy.intercept('GET', `/api/business/get-business-employees/*?isSelectedBusiness=true`).as('getBusinessEmpRequest')
    cy.window()
      .its('store')
      .then(store => {
        let Business = store.getState()?.Business?.projectList[0]
        let Department = Business?.businessDepartments[0]

        cy.get(`#business_${Business?._id}`).within(() => {
          cy.contains(ConverterUtils.truncateString(Business.name, 30)).should('be.visible').click()

          cy.contains(ConverterUtils.truncateString(Department.name, 20)).should('be.visible').click()
          cy.wait('@getDepartmentRequest').then(interception => {
            expect(interception.response.statusCode).to.be.oneOf([200, 304])
          })
          cy.wait('@getBusinessEmpRequest').then(interception => {
            expect(interception.response.statusCode).to.be.oneOf([200, 304])
          })
        })
      })

    cy.window()
      .its('store')
      .then(store => {
        const SelectedDepartment = store.getState()?.Departments.selectedDepartment
        const Task1 =
          SelectedDepartment?.departmentTags[0]?.tasks[SelectedDepartment?.departmentTags[0]?.tasks?.length - 1]
        cy.get(`#task_${Task1?._id}`).within(() => {
          cy.contains(`${ValidationUtils.truncate(Task1.taskName, 250)}`)
            .scrollIntoView()
            .should('be.visible')
            .click()
          cy.wait('@getTaskRequest').then(interception => {
            expect(interception.response.statusCode).to.be.oneOf([200, 304])
          })
        })
      })

    cy.window()
      .its('store')
      .then(store => {
        cy.get('#task_form_modal')
          .should('be.visible')
          .within(() => {
            const NewComment = faker.lorem.sentences(2)
            cy.get('#comment').scrollIntoView().should('be.visible').clear().type(NewComment)

            cy.contains('button', 'Save').scrollIntoView().should('be.visible').click()
            cy.wait('@updateTaskRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
            cy.wait('@getDepartmentRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
          })
        const SelectedDepartment = store.getState()?.Departments.selectedDepartment
        const Task1 =
          SelectedDepartment?.departmentTags[0]?.tasks[SelectedDepartment?.departmentTags[0]?.tasks?.length - 1]
        cy.get(`#task_${Task1?._id}`).within(() => {
          cy.contains(`${ValidationUtils.truncate(Task1.taskName, 250)}`)
            .scrollIntoView()
            .should('be.visible')
            .click()
          cy.wait('@getTaskRequest').then(interception => {
            expect(interception.response.statusCode).to.be.oneOf([200, 304])
          })
        })
      })

    // Verify freelancer comments

    cy.window()
      .its('store')
      .then(store => {
        cy.get('#task_form_modal')
          .should('be.visible')
          .within(() => {
            const SelectedDepartment = store.getState()?.Departments.selectedDepartment
            const Task1 = store.getState()?.Tasks.selectedTask

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
            Task1?.comments?.forEach(comment => {
              cy.get(`#${comment?._id}`).within(() => {
                const data = getCommentUserData(comment)
                if (data?.profilePic) {
                  cy.get(`#comment_${comment?._id}_image`)
                    .scrollIntoView()
                    .should('be.visible')
                    .should('have.attr', 'src')
                    .then(src => {
                      expect(src).to.include(data?.profilePic)
                    })
                }
                cy.get(`#comment_${comment?._id}_user_info`).within(() => {
                  cy.contains(
                    `${ValidationUtils.formatDateWithDate(comment?.updatedAt)} - ${ValidationUtils.getTimeFormated(
                      comment?.updatedAt
                    )}`
                  ).scrollIntoView()
                })
                cy.contains(comment?.comment).scrollIntoView()
              })
              cy.contains(comment?.comment).scrollIntoView().should('be.visible')
            })

            cy.contains('button', 'CANCEL').scrollIntoView().should('be.visible').click()
          })
      })
  })
})
