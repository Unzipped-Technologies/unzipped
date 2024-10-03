import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'

describe('Freelancer Invoice', () => {
  let reduxStore

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const GetOptions = () => {
    const options = []
    const currentDate = new Date()
    for (let i = 10; i >= 0; i--) {
      const startOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() - i * 7
      )
      startOfWeek.setHours(0, 0, 0, 0)
      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(endOfWeek.getDate() + 6)
      endOfWeek.setHours(23, 59, 59, 999)
      options.unshift({ startOfWeek, endOfWeek })
    }
    return options
  }
  const getCurrentInvoice = invoices => {
    const weekOptions = GetOptions()
    const currentDate = new Date()
    const startOfWeek = weekOptions[0]?.startOfWeek
    const endOfWeek = weekOptions[0]?.endOfWeek
    for (var item of invoices) {
      const itemDate = new Date(item.createdAt)

      const isCurrentInvoice = itemDate >= startOfWeek && itemDate <= endOfWeek
      if (isCurrentInvoice) {
        return item
      }
    }
  }

  const invoiceData = invoice => {
    const organizedItems = Object.fromEntries(daysOfWeek.map(day => [day, []]))
    if (invoice) {
      invoice?.tasks?.forEach(task => {
        const taskDate = new Date(task.updatedAt)
        const dayOfWeek = daysOfWeek[taskDate.getDay()]
        organizedItems[dayOfWeek].push(task)
      })
    }
    return organizedItems
  }
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000') // Visit the login page

    // Perform login steps
    cy.contains('Log In').click()
    cy.contains('Connect. Build. grow').should('not.exist')

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
    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        // Get the current state of the store
      })
  })

  // it('View project and  add tasks to invoice', () => {
  //   cy.intercept('POST', `/api/tasks`).as('createTaskRequest')
  //   cy.intercept('GET', `/api/tasks*`).as('getTasksRequest')
  //   cy.intercept('POST', `/api/business/list`).as('getProjectsRequest')
  //   cy.intercept('POST', `/api/invoice/create`).as('createInvoiceRequest')
  //   cy.intercept('PATCH', `/api/taskHours/*`).as('updateHoursRequest')
  //   cy.intercept('PUT', `/api/invoice/update/*`).as('updateInvoiceRequest')
  //   cy.intercept('PUT', `/api/invoice/update/*/add-tasks`).as('addTasksRequest')
  //   cy.intercept('GET', `/api/invoice*`).as('getInvoiceRequest')
  //   cy.intercept('GET', `/api/business/*`).as('getProjectDetailsRequest')
  //   cy.intercept('GET', `/api/contract/count/*`).as('clientContractsRequest')
  //   cy.intercept('GET', `/api/projectApplication*`).as('getApplicationsRequest')

  //   cy.contains('My Projects').should('be.visible').click()

  //   cy.contains('Connect. Build. grow').should('not.exist')

  //   cy.wait('@getProjectsRequest').then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)
  //   })

  //   cy.window()
  //     .its('store')
  //     .then(store => {
  //       reduxStore = store

  //       // Now you have access to reduxStore
  //       const ProjectsList = store.getState().Business.projectList
  //       const userId = store.getState().Auth.user._id
  //       const selectedProject = ProjectsList[0]

  //       cy.get(`#${selectedProject?._id}`).contains(ValidationUtils.truncate(selectedProject.name, 40)).click()
  //       cy.contains('Connect. Build. grow').should('not.exist')

  //       cy.wait('@getProjectDetailsRequest').then(interception => {
  //         expect(interception.response.statusCode).to.eq(200)

  //         cy.window()
  //           .its('store')
  //           .then(store => {
  //             reduxStore = store
  //             cy.wrap(store).as('reduxStore') // Store reduxStore as an alias
  //             const SelectedProject = store.getState().Business.selectedBusiness
  //             cy.contains(SelectedProject?.name)
  //             cy.contains(SelectedProject?.projectType)

  //             SelectedProject?.requiredSkills?.forEach(skill => {
  //               cy.contains(skill)
  //             })
  //             cy.contains(SelectedProject?._id)
  //             if (SelectedProject?.goals) {
  //               cy.contains(SelectedProject?.goals)
  //             }
  //           })
  //       })

  //       cy.wait('@clientContractsRequest').then(interception => {
  //         expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //       })
  //     })
  //   cy.get('#desktop_project_detail_tabs').contains('Invoices').click()
  //   cy.contains('Connect. Build. grow').should('not.exist')

  //   cy.wait('@getInvoiceRequest').then(interception => {
  //     expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //   })

  //   const UserName = reduxStore.getState()?.Auth?.user?.FullName
  //   cy.get('#user_name').should('have.text', ConverterUtils.capitalize(`${UserName.slice(0, 15) || 'User'}`))
  //   cy.get('#timesheet_week_options').should('be.visible').focus().type('{downarrow}', { delay: 100 })
  //   GetOptions()?.forEach(week => {
  //     cy.contains(`Week of ${week.startOfWeek.toDateString()} - ${week.endOfWeek.toDateString()}`)
  //       .scrollIntoView()
  //       .should('be.visible')
  //   })
  //   daysOfWeek?.forEach(day => {
  //     cy.get(`#${day}_header`).within(() => {
  //       cy.contains(day.toUpperCase()).scrollIntoView().should('be.visible')
  //       cy.contains('TIME SPENT').scrollIntoView().should('be.visible')
  //       cy.contains('STORY POINTS').scrollIntoView().should('be.visible')
  //       cy.get(`#${day}_add_task_icon`).scrollIntoView().should('be.visible')
  //     })
  //   })
  //   cy.get(`#Monday_add_task_icon`).scrollIntoView().should('be.visible').click()
  //   cy.get('#desktop_add_tasks')
  //     .scrollIntoView()
  //     .should('be.visible')
  //     .within(() => {
  //       cy.contains('Start typing to select an assigned task')
  //     })

  //   cy.wait('@getTasksRequest').then(interception => {
  //     expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //   })

  //   cy.contains('button', 'CANCEL').scrollIntoView().should('be.visible').click()

  //   cy.get(`#Monday_add_task_icon`).scrollIntoView().should('be.visible').click()
  //   cy.wait('@getTasksRequest').then(interception => {
  //     expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //   })
  //   const Task1 = faker.lorem.sentences(1)
  //   const Task2 = faker.lorem.sentences(1)
  //   const Task3 = faker.lorem.sentences(1)
  //   const Tasks = [Task1, Task2]
  //   cy.get('#task_name').clear().type(Task1)
  //   cy.get('#task_name').type('{enter}')

  //   cy.get('#task_name').clear().type(Task2)
  //   cy.contains('button', 'Add').scrollIntoView().should('be.visible').click()

  //   cy.get('#task_name').clear().type(Task3)
  //   cy.contains('button', 'Add').scrollIntoView().should('be.visible').click()

  //   cy.get('#delete_task_2').should('be.visible').click()

  //   cy.window()
  //     .its('store')
  //     .then(store => {
  //       reduxStore = store
  //       const Task = store.getState().Tasks.tasks[0]
  //       cy.get('#task_name').click()

  //       if (Task) {
  //         cy.get('#task_name').type(Task?.taskName?.charAt(0))
  //         cy.get('.MuiAutocomplete-listbox').should('be.visible').scrollIntoView().contains(Task?.taskName).click()

  //         cy.get('#task_name').should('have.value', Task?.taskName)
  //       }
  //     })

  //   cy.contains('button', 'ADD TASK').scrollIntoView().should('be.visible').click()

  //   cy.get('#desktop_add_tasks_data')
  //     .scrollIntoView()
  //     .should('be.visible')
  //     .within(() => {
  //       cy.contains(
  //         'A few of the tasks you are adding are not assigned to you. Please add more details to create them.'
  //       )

  //       Tasks?.forEach((task, index) => {
  //         cy.get(`#task_${index}`).within(() => {
  //           cy.contains(task).should('be.visible')
  //           cy.get(`#story_points${index}`).clear().type(5)
  //           cy.contains('ADD DETAILS').should('be.visible').click()
  //           const Description = faker.lorem.sentences(1)
  //           cy.get(`#description${index}`).clear().type(Description)
  //           cy.contains('COLLAPSE').should('be.visible').click()
  //         })
  //       })
  //       cy.contains('button', 'ADD TASK(S)').scrollIntoView().should('be.visible').click()
  //       const Invoices = reduxStore.getState().Invoices.invoices

  //       if (getCurrentInvoice(Invoices)) {
  //         cy.wait('@addTasksRequest').then(interception => {
  //           expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //         })
  //       } else {
  //         cy.wait('@createInvoiceRequest').then(interception => {
  //           expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //         })
  //       }
  //       cy.wait('@getInvoiceRequest').then(interception => {
  //         expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //       })
  //     })

  //   cy.window()
  //     .its('store')
  //     .then(store => {
  //       reduxStore = store
  //       const Invoices = reduxStore.getState().Invoices.invoices

  //       const SelectedInvoice = getCurrentInvoice(Invoices)
  //       SelectedInvoice?.tasks?.forEach(task => {
  //         cy.get(`#${task?._id}`).within(() => {
  //           cy.contains(task?.task?.taskName).scrollIntoView().should('be.visible')
  //           if (task.hours) {
  //             cy.contains(`${task?.hours} Hours`).scrollIntoView().should('be.visible')
  //           }
  //         })
  //       })
  //       const CurrentTask = SelectedInvoice?.tasks[SelectedInvoice?.tasks?.length - 1]
  //       cy.get(`#${CurrentTask._id}_hours`)
  //         .should('be.visible')
  //         .scrollIntoView()
  //         .should('have.value', CurrentTask.hours)
  //       cy.get(`#${CurrentTask._id}_hours`).should('be.visible').scrollIntoView().clear().type(3)
  //       cy.get(`#${CurrentTask._id}_hours`).scrollIntoView().type('{enter}')

  //       cy.wait('@updateHoursRequest').then(interception => {
  //         expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //       })

  //       cy.get(`#${CurrentTask?._id}`).within(() => {
  //         cy.contains(`3 Hours`).scrollIntoView().should('be.visible')
  //       })
  //     })

  //   cy.window()
  //     .its('store')
  //     .then(store => {
  //       cy.get(`#Wednesday_add_task_icon`).scrollIntoView().should('be.visible').click()
  //       cy.wait('@getTasksRequest').then(interception => {
  //         expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //       })
  //       const Task = store.getState().Tasks.tasks[0]
  //       cy.get('#task_name').click()

  //       if (Task) {
  //         cy.get('#task_name').type(Task?.taskName?.charAt(0))
  //         cy.get('.MuiAutocomplete-listbox').should('be.visible').scrollIntoView().contains(Task?.taskName).click()

  //         cy.get('#task_name').should('have.value', Task?.taskName)
  //       }

  //       cy.contains('button', 'ADD TASK').scrollIntoView().should('be.visible').click()

  //       const Invoices = store.getState().Invoices.invoices

  //       if (getCurrentInvoice(Invoices)) {
  //         cy.wait('@addTasksRequest').then(interception => {
  //           expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //         })
  //       } else {
  //         cy.wait('@createInvoiceRequest').then(interception => {
  //           expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //         })
  //       }
  //       cy.wait('@getInvoiceRequest').then(interception => {
  //         expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //       })
  //     })

  //   cy.contains('button', 'SUBMIT').scrollIntoView().should('be.visible').click()
  //   cy.wait('@updateInvoiceRequest').then(interception => {
  //     expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //   })
  // })

  it('View project invoice', () => {
    cy.intercept('POST', `/api/tasks`).as('createTaskRequest')
    cy.intercept('GET', `/api/tasks*`).as('getTasksRequest')
    cy.intercept('POST', `/api/business/list`).as('getProjectsRequest')
    cy.intercept('POST', `/api/invoice/create`).as('createInvoiceRequest')
    cy.intercept('PATCH', `/api/taskHours/*`).as('updateHoursRequest')
    cy.intercept('PUT', `/api/invoice/update/*`).as('updateInvoiceRequest')
    cy.intercept('PUT', `/api/invoice/update/*/add-tasks`).as('addTasksRequest')
    cy.intercept('GET', `/api/invoice*`).as('getInvoiceRequest')
    cy.intercept('GET', `/api/business/*`).as('getProjectDetailsRequest')
    cy.intercept('GET', `/api/contract/count/*`).as('clientContractsRequest')
    cy.intercept('GET', `/api/projectApplication*`).as('getApplicationsRequest')

    cy.contains('My Projects').should('be.visible').click()
    cy.url().should('include', `/dashboard/projects`)
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getProjectsRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
    })

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store

        // Now you have access to reduxStore
        const ProjectsList = store.getState().Business.projectList
        const freelancerId = store.getState().Auth.user.freelancers?._id
        const selectedProject = ProjectsList[0]

        cy.get(`#${selectedProject?._id}`).within(() => {
          cy.contains('button', 'Details').click()
        })
        cy.get(`#${selectedProject?._id} li`).eq(3).click()
        cy.url().should(
          'include',
          `/dashboard/projects/freelancer/invoice/${selectedProject?._id}?tab=invoices&freelancer=${freelancerId}`
        )

        cy.contains('Connect. Build. grow').should('not.exist')

        cy.wait('@getInvoiceRequest').then(interception => {
          expect(interception.response.statusCode).to.oneOf([200, 304])
        })

        cy.wait('@getProjectDetailsRequest').then(interception => {
          expect(interception.response.statusCode).to.oneOf([200, 304])
        })
        cy.wait('@getInvoiceRequest').then(interception => {
          expect(interception.response.statusCode).to.oneOf([200, 304])
        })
      })

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const Invoices = store.getState().Invoices.invoices
        const selectedInvoicee = getCurrentInvoice(Invoices)
        const sortedData = invoiceData(selectedInvoicee)
        Object?.keys(sortedData)?.forEach(day => {
          cy.get(`#${day}_hours`).within(() => {
            cy.contains(day).should('be.visible')
            let hours = 0
            for (var item of sortedData[day]) {
              hours += +item.hours ?? 0
            }
            cy.contains(hours).should('be.visible')
          })
        })
        cy.get(`#freelancer_invoice_totals`).within(() => {
          cy.contains(`$${selectedInvoicee?.contract?.hourlyRate || 0} / HOUR`)
          const subTotal = selectedInvoicee?.contract?.hourlyRate * selectedInvoicee?.hoursWorked
          const fee = subTotal * 0.05
          cy.contains(`$${Math.round(fee) || 0}`)
          cy.contains(`$${subTotal - fee || 0}`)
        })
      })
  })
})
