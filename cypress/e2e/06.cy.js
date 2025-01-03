import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'
import { testClientEmail, testClientPassword } from '../../config/keys'

describe('Client can create,edit tasks', () => {
  let reduxStore
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/') // Visit the login page
    cy.window().its('document.readyState').should('eq', 'complete')
    // Intercept the login request
    cy.intercept('POST', '/api/auth/login').as('loginRequest')

    // Perform login steps
    cy.contains('Log In').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.contains('CONTINUE WITH EMAIL').click()

    // Enter login credentials
    cy.get('#email').clear().type(testClientEmail)
    cy.get('#password').clear().type(testClientPassword)

    // Submit login form
    cy.contains('CONTINUE WITH EMAIL').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    // Wait for the login request and verify success
    cy.wait('@loginRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      cy.url().should('include', '/dashboard')
      cy.window().its('document.readyState').should('eq', 'complete')
    })
  })

  after(() => {
    cy.end()
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('Verify business names and department names in tasklist page', () => {
    cy.intercept('POST', `/api/business/list`).as('getBusinessRequest')
    cy.intercept('GET', `/api/department/*?isEditingDepartment=false`).as('getDepartmentRequest')
    cy.intercept('GET', `/api/business/get-business-employees/*?isSelectedBusiness=false`).as('getBusinessEmpRequest')

    cy.contains('Tasklist').should('be.visible').click()

    cy.contains('Connect. Build. grow').should('not.exist')
    cy.url().should('include', '/dashboard/tasklist')

    cy.wait('@getBusinessRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const BusinessList = store.getState()?.Business?.projectList
        BusinessList?.forEach((business, index) => {
          cy.get(`#business_${business?._id}`)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              if (index !== 0) {
                cy.contains(ConverterUtils.truncateString(business.name, 30))
                  .scrollIntoView()
                  .should('be.visible')
                  .click()
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
                  cy.contains(ConverterUtils.truncateString(department.name, 20)).scrollIntoView().should('be.visible')
                })
              })
            })
        })
      })
  })

  it('Add, Edit and Delete Department to business', () => {
    cy.intercept('POST', '/api/department').as('createDepartmentRequest')
    cy.intercept('POST', `/api/business/list`).as('getBusinessRequest')
    cy.intercept('GET', `/api/department/*?isEditingDepartment=false`).as('getDepartmentRequest')
    cy.intercept('GET', `/api/business/get-business-employees/*?isSelectedBusiness=true`).as('getBusinessEmpRequest')
    cy.intercept('PATCH', `/api/department/*?isEditingDepartment=true`).as('updateDepartmentRequest')
    cy.intercept('DELETE', `/api/department/*`).as('deleteDepartmentRequest')

    const Business1 = reduxStore.getState()?.Business?.projectList[0]
    cy.get(`#business_${Business1?._id}`).within(() => {
      cy.contains(ConverterUtils.truncateString(Business1.name, 30)).should('be.visible').click()
      cy.wait('@getBusinessEmpRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })

      cy.wait('@getDepartmentRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })
      const Department1 = Business1?.businessDepartments[0]
      cy.get(`#department_${Department1?._id}`).within(() => {
        cy.contains(ConverterUtils.truncateString(Department1.name, 20)).should('be.visible').click()
        cy.wait('@getBusinessEmpRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })
    })
    cy.get('#department_actions').click()
    cy.get('#dropdown').contains('Create').click()

    const DepartmentName = faker.string.alpha(10)

    cy.get('#name').clear().type(DepartmentName)

    cy.contains('button', 'Save').should('be.visible').click()

    cy.wait('@createDepartmentRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.wait('@getBusinessRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.wait('@getDepartmentRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.contains(ConverterUtils.truncateString(DepartmentName, 20)).should('be.visible').click()

    cy.wait('@getBusinessEmpRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
    cy.wait('@getDepartmentRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.get('#department_actions').click()
    cy.get('#dropdown').contains('Edit').click()

    const updatedDepartmentName = faker.string.alpha(10)

    cy.get('#name').clear().type(updatedDepartmentName)

    cy.contains('button', 'Save').should('be.visible').click()

    cy.wait('@updateDepartmentRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.wait('@getBusinessRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.wait('@getDepartmentRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.get('#department_actions').click()

    cy.get('#dropdown').contains('Delete').click()

    cy.wait('@deleteDepartmentRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.wait('@getBusinessRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
    cy.contains(ConverterUtils.truncateString(Business1.name, 30)).should('be.visible').click()
  })

  it('Add Tags to department', () => {
    cy.intercept('GET', `/api/department/*?isEditingDepartment=false`).as('getDepartmentRequest')
    cy.intercept('GET', `/api/business/get-business-employees/*?isSelectedBusiness=false`).as('getBusinessEmpRequest')
    cy.intercept('GET', `/api/business/get-business-employees/*?isSelectedBusiness=true`).as('getBusinessEmpRequest2')
    cy.intercept('POST', `/api/tags`).as('createTagRequest')

    const Business1 = reduxStore.getState()?.Business?.projectList[0]
    cy.get(`#business_${Business1?._id}`).within(() => {
      cy.contains(ConverterUtils.truncateString(Business1.name, 30)).should('be.visible').click()
      cy.wait('@getDepartmentRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })
      cy.wait('@getBusinessEmpRequest2').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })
      cy.contains('Connect. Build. grow').should('not.exist')
      const Department1 = Business1?.businessDepartments[0]
      cy.get(`#department_${Department1?._id}`).within(() => {
        cy.contains(ConverterUtils.truncateString(Department1.name, 20)).should('be.visible').click()
      })
    })
    cy.wait('@getBusinessEmpRequest2').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.get('#add_tag_button').scrollIntoView().should('be.visible').click({ force: true })
    const tagName = faker.string.alpha(10)

    cy.get('#tagName').clear().type(tagName)

    cy.contains('button', 'Save').should('be.visible').click()

    cy.wait('@createTagRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.wait('@getDepartmentRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
  })

  it('Create and assign  tasks to freelancer', () => {
    cy.intercept('GET', `/api/tasks/*`).as('getTaskRequest')
    cy.intercept('POST', `/api/tasks`).as('createTaskRequest')
    cy.intercept('PATCH', `/api/tasks/*`).as('updateTaskRequest')
    cy.intercept('GET', `/api/department/*?isEditingDepartment=false`).as('getDepartmentRequest')
    cy.intercept('GET', `/api/business/get-business-employees/*?isSelectedBusiness=true`).as('getBusinessEmpRequest')

    // Add Task
    cy.window()
      .its('store')
      .then(store => {
        const SelectedDepartment = store.getState()?.Departments.selectedDepartment
        SelectedDepartment?.departmentTags?.forEach(tag => {
          cy.get(`#tag_${tag?._id}`).within(() => {
            cy.get(`#tag_header_${tag?._id}`).within(() => {
              cy.contains(`${ValidationUtils.truncate(tag.tagName.toUpperCase(), 20)} (${tag?.tasks?.length})`).should(
                'be.visible'
              )
              cy.contains('STORY POINTS').scrollIntoView().should('be.visible')
              cy.contains('ASSIGNEE').scrollIntoView().should('be.visible')
            })
            cy.contains('ADD TASK').should('be.visible')
          })
        })
        const Tag1 = SelectedDepartment?.departmentTags[0]
        cy.get(`#tag_${Tag1?._id}`).within(() => {
          cy.contains('ADD TASK').should('be.visible').click()
        })
        cy.contains('button', 'CANCEL').should('be.visible').click()

        cy.get(`#tag_${Tag1?._id}`).within(() => {
          cy.contains('ADD TASK').should('be.visible').click()
        })
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
            let assigneeEmail = ''
            if (SelectedDepartment?.contracts?.length > 0) {
              assigneeEmail = SelectedDepartment?.contracts[0]?.freelancer.user?.email
            } else {
              assigneeEmail = SelectedDepartment?.client?.email
            }

            cy.contains(assigneeEmail).click()
            cy.contains(assigneeEmail)

            cy.get('#tags-standard').should('be.visible').clear().type(TagNam1).type('{enter}', { delay: 100 })
            cy.get('#tags-standard').should('be.visible').clear().type(TagNam2).type('{enter}', { delay: 100 })

            cy.get('#priority_autocomplete').should('exist').click().type('{downarrow}', { delay: 100 })
            cy.contains('highest').click()

            cy.get('#storyPoints').should('be.visible').clear().type(StoryPoints)

            cy.get('#status_autocomplete').should('exist').click().type('{downarrow}', { delay: 100 })
            cy.contains(Tag1?.tagName).click()

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
  })
  it('Verify tasks in tasks panel', () => {
    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const SelectedDepartment = store.getState()?.Departments.selectedDepartment
        SelectedDepartment?.departmentTags?.forEach(tag => {
          cy.get(`#tag_${tag?._id}`).within(() => {
            cy.get(`#tag_header_${tag?._id}`).within(() => {
              cy.contains(`${ValidationUtils.truncate(tag.tagName.toUpperCase(), 20)} (${tag?.tasks?.length})`).should(
                'be.visible'
              )
              cy.contains('STORY POINTS').scrollIntoView().should('be.visible')
              cy.contains('ASSIGNEE').scrollIntoView().should('be.visible')
            })
            cy.contains('ADD TASK').should('be.visible')
          })
          tag?.tasks?.forEach(task => {
            cy.get(`#task_${task?._id}`).within(() => {
              cy.contains(`${ValidationUtils.truncate(task.taskName, 250)}`)
                .scrollIntoView()
                .should('be.visible')
              cy.contains(task.storyPoints).scrollIntoView().should('be.visible')
            })
          })
        })
      })
  })
  it('Edit task', () => {
    cy.intercept('PATCH', `/api/tasks/*`).as('updateTaskRequest')
    cy.intercept('GET', `/api/department/*?isEditingDepartment=false`).as('getDepartmentRequest')
    cy.intercept('GET', `/api/tasks/*`).as('getTaskRequest')

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

            cy.get('#taskName').should('be.visible').clear().type(TaskName)

            cy.get('#assignee').scrollIntoView().should('be.visible').click()
            cy.get('#assignee').find('input').eq(0).should('exist').click().type('{downarrow}', { delay: 100 })
            SelectedDepartment?.contracts?.forEach(contract => {
              cy.contains(contract?.freelancer.user?.email).scrollIntoView().should('exist') // Ensure the option is visible
            })
            let assigneeEmail = ''
            if (SelectedDepartment?.contracts?.length > 0) {
              assigneeEmail = SelectedDepartment?.contracts[0]?.freelancer.user?.email
            } else {
              assigneeEmail = SelectedDepartment?.client?.email
            }
            cy.get('div[id^="react-select-"]').contains(assigneeEmail).click()
            cy.contains(assigneeEmail)

            if (Task1?.tags?.length < 5) {
              cy.get('#tags-standard').should('be.visible').clear().type(TagNam1).type('{enter}', { delay: 100 })
              cy.get('#tags-standard').should('be.visible').clear().type(TagNam2).type('{enter}', { delay: 100 })
            }

            cy.get('#priority_autocomplete').should('exist').click().type('{downarrow}', { delay: 100 })
            cy.contains('medium').click()

            cy.get('#storyPoints').should('be.visible').clear().type(StoryPoints)

            cy.get('#status_autocomplete').should('exist').click().type('{downarrow}', { delay: 100 })
            cy.get('[role="presentation"]').should('be.visible').find('[role="option"]').contains(Tag1?.tagName).click()
            cy.get('#description').should('be.visible').click()

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
  })
  it('Add Comment to task', () => {
    cy.intercept('GET', `/api/tasks/*`).as('getTaskRequest')
    cy.intercept('PATCH', `/api/tasks/*`).as('updateTaskRequest')
    cy.intercept('GET', `/api/department/*?isEditingDepartment=false`).as('getDepartmentRequest')

    cy.window()
      .its('store')
      .then(store => {
        const SelectedDepartment = store.getState()?.Departments.selectedDepartment
        const Task1 =
          SelectedDepartment?.departmentTags[0]?.tasks[SelectedDepartment?.departmentTags[0]?.tasks?.length - 1]
        cy.get(`#task_${Task1?._id}`).within(() => {
          cy.contains(`${ValidationUtils.truncate(Task1.taskName, 250)}`)
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
              cy.get(`#comment_${comment?._id}_user_info`).within(() => {
                const data = getCommentUserData(comment)
                cy.contains(
                  `${ValidationUtils.formatDateWithDate(comment?.updatedAt)} - ${ValidationUtils.getTimeFormated(
                    comment?.updatedAt
                  )}`
                ).scrollIntoView()
                if (data?.profilePic) {
                  cy.get(`img[src*="${data?.profilePic}"]`)
                    .scrollIntoView()
                    .should('be.visible')
                    .should('have.attr', 'src')
                    .then(src => {
                      expect(src).to.include(data?.profilePic)
                    })
                }
              })
            })
            cy.get(`div#${Task1.comments[0]?._id}`).scrollIntoView().trigger('mouseover')
            cy.get(`#edit_${Task1.comments[0]?._id}_comment`).scrollIntoView().click()
            const NewComment = faker.lorem.sentences(2)
            cy.get(`#comment_${Task1.comments[0]?._id}`).scrollIntoView().should('be.visible').clear().type(NewComment)
            cy.contains('button', 'Save').scrollIntoView().should('be.visible').click()
          })
      })
    cy.wait('@updateTaskRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
    cy.wait('@getDepartmentRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
  })
})
