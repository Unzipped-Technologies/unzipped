import { faker } from '@faker-js/faker'
import { help } from '../../components/unzipped/dashboard/MobileNotification'
import { options } from '../../components/unzipped/dashboard/ScheduleMeetingModal'
import { testClientEmail, testFreelancerEmail, testFreelancerPassword } from '../../config/keys'

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
    cy.viewport(480, 896)

    // Clear cookies and local storage before start theses test cases
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000')

    // Clear cookies and local storage before start theses test cases
    cy.get('#mobile_menu_icon').should('be.visible').click()
    cy.contains('button', 'Log In').scrollIntoView().click()
    cy.contains('Connect. Build. grow').should('not.exist')
    cy.url().should('include', '/login')

    cy.contains('CONTINUE WITH EMAIL').click()

    // Enter login credentials
    cy.get('#email').clear().type(testFreelancerEmail)
    cy.get('#password').clear().type(testFreelancerPassword)

    // Intercept the login request
    cy.intercept('POST', '/api/auth/login').as('loginRequest')

    // Submit login form
    cy.contains('CONTINUE WITH EMAIL').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.intercept('GET', `/api/auth/current_user`).as('getUserRequest')

    // Wait for the login request and verify success
    cy.wait('@loginRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
      // It must redirect to the dashboard page
      cy.url().should('include', '/dashboard')
      cy.wait('@getUserRequest').then(interception => {
        expect(interception.response.statusCode).to.eq(200)
      })
    })
  })

  beforeEach(() => {
    // Set the viewport to 480px x 896px for each test case
    cy.viewport(480, 896)
  })

  it('View project and  add tasks to invoice', () => {
    // Intercept different requests

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

    //  Click on projects icon on footer icons
    cy.get('#Projects').scrollIntoView().should('be.visible').click()
    cy.url().should('include', '/dashboard/projects')
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getProjectsRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    // Click on view all projects to view all projects
    cy.get('[data-testid="view_mobile_projects"]')
      .should('be.visible')
      .within(() => {
        cy.contains('VIEW ALL').should('be.visible').click()
        // It must redirect to the dashboard projects view page
        cy.url().should('include', '/dashboard/projects/view')
      })
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getProjectsRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
    })

    //  Get Business to view project details
    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        //  Get Business to view project details
        const ProjectsList = store.getState().Business.projectList

        // Get client Business to view project details
        let Business = ProjectsList?.find(project => project?.user?.email === testClientEmail)
        Business = Business?._id ? Business : ProjectsList[0]

        cy.get(`#${Business._id}`).within(() => {
          // Click on  Details button to view project details
          cy.contains('Details').scrollIntoView().should('be.visible').click()
          cy.get('li').eq(1).scrollIntoView().should('be.visible').click()
        })
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.wait('@getProjectDetailsRequest').then(interception => {
          expect(interception.response.statusCode).to.eq(200)
        })

        cy.wait('@clientContractsRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })

    // Click on invoices tab to view invoices
    cy.get('#desktop_project_detail_tabs').contains('Invoices').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getInvoiceRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    // Verify week options in select dropdown
    cy.get('[data-testid="timesheet_week_options"]').should('be.visible').focus().type('{downarrow}', { delay: 100 })
    GetOptions()?.forEach(week => {
      cy.contains(`Week of ${week.startOfWeek.toDateString()} - ${week.endOfWeek.toDateString()}`)
        .scrollIntoView()
        .should('be.visible')
    })

    // Verify all week days are dispalying with add taskk button
    cy.window()
      .its('store')
      .then(store => {
        const Invoices = store.getState().Invoices.invoices
        const selectedInvoicee = getCurrentInvoice(Invoices)
        const sortedData = invoiceData(selectedInvoicee)
        Object?.keys(sortedData)?.forEach(day => {
          cy.get(`[data-testid="${day}_invoice"]`)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              // Calculate total hours for each day
              const TotalHours = sortedData[day]?.reduce((accumulator, currentValue) => {
                const totalHours = +accumulator + +currentValue.hours
                return totalHours
              }, 0)
              cy.get(`#${day}_header`).within(() => {
                cy.contains(`${day} - ${TotalHours} Hours`).scrollIntoView().should('be.visible').click()
              })
              cy.contains('button', 'Add Task').scrollIntoView().should('be.visible')
              cy.contains(`${day} - ${TotalHours} Hours`).scrollIntoView().should('be.visible').click()
            })
        })
      })
    // Click on add task button to add task for Monday Tasks
    cy.contains('Monday').scrollIntoView().should('be.visible').click()
    cy.get('[data-testid="Monday_add_task_icon"]').scrollIntoView().should('be.visible').click()
    cy.get(`[data-testid="mobile_add_tasks"]`)
      .scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.contains('Start typing to select an assigned task')
      })

    cy.wait('@getTasksRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.contains('button', 'BACK').scrollIntoView().should('be.visible').click()

    cy.get(`[data-testid="Monday_add_task_icon"]`).scrollIntoView().should('be.visible').click()
    cy.wait('@getTasksRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    let Tasks = []
    cy.get(`[data-testid="mobile_add_tasks"]`)
      .scrollIntoView()
      .should('be.visible')
      .within(() => {
        // Create some tasks to add in invoice
        const Task1 = faker.lorem.sentences(1)
        const Task2 = faker.lorem.sentences(1)
        const Task3 = faker.lorem.sentences(1)
        Tasks = [Task1, Task2]

        // Type in task name field
        cy.get('#task_name').clear().type(Task1)
        cy.contains('button', 'Add').scrollIntoView().should('be.visible').click()

        cy.get('#task_name').clear().type(Task2)
        cy.contains('button', 'Add').scrollIntoView().should('be.visible').click()

        cy.get('#task_name').clear().type(Task3)
        cy.contains('button', 'Add').scrollIntoView().should('be.visible').click()

        cy.get('#delete_task_2').should('be.visible').click()
      })
    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        // Added task in the invoice which is already created
        const Task = store.getState().Tasks.tasks[0]
        cy.get('#task_name').click()

        if (Task?.taskName) {
          cy.get('#task_name').type(Task?.taskName?.charAt(0))

          cy.get('ul[role="listbox"] li').contains(Task?.taskName).should('be.visible').scrollIntoView().click()

          cy.get('#task_name').should('have.value', Task?.taskName)
        }
      })

    cy.contains('button', 'SAVE').scrollIntoView().should('be.visible').click()

    cy.get(`[data-testid="mobile_add_tasks_data"]`)
      .scrollIntoView()
      .should('be.visible')
      .within(() => {
        cy.contains(
          'A few of the tasks you are adding are not assigned to you. Please add more details to create them.'
        )

        Tasks?.forEach((task, index) => {
          cy.get(`#task_${index}`).within(() => {
            cy.contains(task).should('be.visible')
            // Added story points against each task
            cy.get(`#story_points${index}`).clear().type(5)
            cy.contains('ADD DETAILS').should('be.visible').click()

            // Added description against each task
            const Description = faker.lorem.sentences(1)
            cy.get(`#description${index}`).clear().type(Description)
            cy.contains('COLLAPSE').should('be.visible').click()
          })
        })
        cy.contains('button', 'ADD TASK(S)').scrollIntoView().should('be.visible').click()
        const Invoices = reduxStore.getState().Invoices.invoices

        // If selected invoice is already created then update invoice to it otherwise create new invoice
        if (getCurrentInvoice(Invoices)) {
          cy.wait('@addTasksRequest').then(interception => {
            expect(interception.response.statusCode).to.be.oneOf([200, 304])
          })
        } else {
          cy.wait('@createInvoiceRequest').then(interception => {
            expect(interception.response.statusCode).to.be.oneOf([200, 304])
          })
        }
      })
    cy.wait('@getInvoiceRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const Invoices = reduxStore.getState().Invoices.invoices

        const SelectedInvoice = getCurrentInvoice(Invoices)

        // Verify added tasks and working hours in the invoice
        SelectedInvoice?.tasks?.forEach(task => {
          cy.get(`#${task?._id}`).within(() => {
            cy.contains(task?.task?.taskName).scrollIntoView().should('be.visible')
            if (task.hours) {
              cy.contains(`${task?.hours} Hours`).scrollIntoView().should('be.visible')
            }
          })
        })
        const CurrentTask = SelectedInvoice?.tasks[SelectedInvoice?.tasks?.length - 1]
        cy.get(`#${CurrentTask._id}_hours`).should('be.visible').scrollIntoView().click()
        cy.get(`#${CurrentTask._id}_hours`)
          .should('be.visible')
          .scrollIntoView()
          .should('have.value', CurrentTask.hours)

        // Add hours against task
        cy.get(`#${CurrentTask._id}_hours`).should('be.visible').scrollIntoView().clear().type(3)
        cy.get(`#${CurrentTask._id}_hours`)
          .should('be.visible')
          .scrollIntoView()

          .type('{enter}')

        cy.wait('@updateHoursRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })

        // Verify working hours are updated
        cy.get(`#${CurrentTask?._id}`).within(() => {
          cy.contains(`3 Hours`).scrollIntoView().should('be.visible')
        })
      })

    cy.contains('button', 'SUBMIT').scrollIntoView().should('be.visible').click()
    cy.wait('@updateInvoiceRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
  })

  it('View project invoice', () => {
    // Intercept different requests
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
    cy.scrollTo('top')

    //  Click on projects icon on footer icons
    cy.get('#Projects').scrollIntoView().should('be.visible').click()
    cy.url().should('include', '/dashboard/projects')
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getProjectsRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
    // Click on view all projects to view all projects
    cy.get('[data-testid="view_mobile_projects"]')
      .should('be.visible')
      .within(() => {
        cy.contains('VIEW ALL').should('be.visible').click()
        cy.url().should('include', '/dashboard/projects/view')
      })
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getProjectsRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
    })

    //  Get Business to view project details
    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const ProjectsList = store.getState().Business.projectList

        let Business = null
        let Department = null
        for (var business of ProjectsList) {
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

        cy.get(`#${Business._id}`).within(() => {
          cy.contains('Details').scrollIntoView().should('be.visible').click()
          cy.get('li').eq(1).scrollIntoView().should('be.visible').click()
        })
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.wait('@getProjectDetailsRequest').then(interception => {
          expect(interception.response.statusCode).to.eq(200)
        })

        cy.wait('@clientContractsRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })

    // Click on invoices tab to view invoices
    cy.get('#desktop_project_detail_tabs').contains('Invoices').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getInvoiceRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    // Verify week options in select dropdown
    cy.get('[data-testid="timesheet_week_options"]').should('be.visible').focus().type('{downarrow}', { delay: 100 })
    GetOptions()?.forEach(week => {
      cy.contains(`Week of ${week.startOfWeek.toDateString()} - ${week.endOfWeek.toDateString()}`)
        .scrollIntoView()
        .should('be.visible')
    })

    // Verify all week days are dispalying with add taskk button
    cy.window()
      .its('store')
      .then(store => {
        const Invoices = store.getState().Invoices.invoices
        const selectedInvoicee = getCurrentInvoice(Invoices)
        const sortedData = invoiceData(selectedInvoicee)
        Object?.keys(sortedData)?.forEach(day => {
          cy.get(`[data-testid="${day}_invoice"]`)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              const TotalHours = sortedData[day]?.reduce((accumulator, currentValue) => {
                const totalHours = +accumulator + +currentValue.hours
                return totalHours
              }, 0)
              cy.get(`#${day}_header`).within(() => {
                cy.contains(`${day} - ${TotalHours} Hours`).scrollIntoView().should('be.visible').click()
              })
              sortedData[day]?.forEach(item => {
                cy.contains(item?.task?.taskName).scrollIntoView().should('be.visible')
                cy.contains(`${item.hours} Hours`).scrollIntoView().should('be.visible')
              })
              cy.contains(`${day} - ${TotalHours} Hours`).scrollIntoView().should('be.visible').click()
            })
        })
      })
  })

  it('Verify dashboard notifications', () => {
    // Scroll to bottom of the page

    cy.scrollTo('top')
    // Click on dashboard icon to view dashboard page
    cy.get('#Dashboard').scrollIntoView().should('be.visible').click()
    cy.url().should('include', `/dashboard`)
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const user = store?.getState()?.Auth.user

        // Verify Github connected notification
        if (!user?.isGithubConnected) {
          cy.get('[data-testid="github_connected_notification"]')
            .scrollIntoView()
            .within(() => {
              cy.contains(
                'You haven’t connected your Github account yet, connect it now so we can begin work building your project!'
              ).should('be.visible')
              cy.contains('button', 'CONNECT YOUR GITHUB ACCOUNT').should('be.visible')
            })
        }
        // Verify Stripe connected notification
        if (!user?.stripeAccountId) {
          cy.get('[data-testid="stripe_connected_notification"]')
            .scrollIntoView()
            .within(() => {
              cy.contains('You haven’t connected your stripe account!').should('be.visible')
              cy.contains('button', 'CONNECT YOUR STRIPE ACCOUNT').should('be.visible')
            })
        }
        // Verify browse projects notification
        cy.get('[data-testid="browse_projects_notification"]')
          .scrollIntoView()
          .within(() => {
            cy.contains('Browse other projects to inspire ideas').should('be.visible')
            cy.contains('button', 'BROWSE').should('be.visible')
          })

        // Verify calendar settings notification
        cy.get('[data-testid="calendar_setting_notification"]')
          .scrollIntoView()
          .within(() => {
            if (!user?.calendarSettings?.startTime) {
              cy.contains(
                'You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you.'
              ).should('be.visible')
            } else {
              cy.contains('Update calendar settings.').should('be.visible')
            }
            cy.contains('button', 'UPDATE').should('be.visible')
          })

        cy.contains('Update types of professionals you are seeking for your business')
          .scrollIntoView()
          .should('be.visible')

        cy.get('[data-testid="explore_notification"]')
          .scrollIntoView()
          .within(() => {
            cy.contains('Explore more support').should('be.visible')
            cy.contains('Check out these resources for answers to your questions, videos, and best practices.').should(
              'be.visible'
            )
            help?.forEach((item, index) => {
              cy.get(`#explore_${index}`).within(() => {
                cy.contains(item.name).should('be.visible')
                cy.contains(item.text).should('be.visible')
                cy.contains(item.name).should('be.visible')
              })
            })
          })

        cy.get('[data-testid="user_profile_panel_mobile"]')
          .scrollIntoView()
          .within(() => {
            if (!user?.role || (!user?.FirstName && !user?.AddressCity)) {
              cy.contains('Update account details').should('be.visible')
            }
            if (!user?.profileImage) {
              cy.contains('Upload a profile picture').should('be.visible')
            }
            if (user?.plan === 0) {
              cy.contains('Select a plan for your account').should('be.visible')
            }
          })
      })
  })

  it('Click on notifications', () => {
    // Click on browse projects notification
    cy.get('[data-testid="browse_projects_notification"]')
      .scrollIntoView()
      .within(() => {
        cy.contains('Browse other projects to inspire ideas').scrollIntoView().should('be.visible')
        cy.contains('button', 'BROWSE').scrollIntoView().should('be.visible').click()
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.contains('Connect. Build. grow').should('not.exist')
        cy.visit('http://localhost:3000/dashboard')
        cy.contains('Connect. Build. grow').should('not.exist')
        cy.url().should('include', '/dashboard')
      })

    // Click on explore notification
    cy.get(`#explore_0`)
      .scrollIntoView()
      .within(() => {
        cy.contains('See our help docs').scrollIntoView().should('be.visible').click()
        cy.url().should('include', '/')
        cy.contains('Connect. Build. grow').should('not.exist')
        cy.window().its('document.readyState').should('eq', 'complete')

        cy.visit('http://localhost:3000/dashboard')
        cy.contains('Connect. Build. grow').should('not.exist')
        cy.url().should('include', '/dashboard')
      })

    cy.get(`#explore_1`)
      .scrollIntoView()
      .within(() => {
        cy.contains('Get started').should('be.visible').click()
        cy.url().should('include', '/')
        cy.contains('Connect. Build. grow').should('not.exist')
        cy.wait(500)

        cy.visit('http://localhost:3000/dashboard')
        cy.contains('Connect. Build. grow').should('not.exist')
        cy.url().should('include', '/dashboard')
      })
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.get(`#explore_3`)
      .scrollIntoView()
      .within(() => {
        cy.contains('Ask about a topic.').should('be.visible').click()
        cy.url().should('include', '/')
        cy.contains('Connect. Build. grow').should('not.exist')
        cy.wait(500)

        cy.visit('http://localhost:3000/dashboard')
        cy.contains('Connect. Build. grow').should('not.exist')
        cy.url().should('include', '/dashboard')
      })
  })
  it('Update calendar settings', () => {
    // Intercept the requests to create calendar settings
    cy.intercept('POST', `/api/user/calendar-settings`).as('createSettingsRequest')

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const user = store?.getState()?.Auth.user
        cy.get('[data-testid="calendar_setting_notification"]')
          .scrollIntoView()
          .within(() => {
            if (!user?.calendarSettings?.startTime) {
              cy.contains(
                'You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you.'
              ).should('be.visible')
            } else {
              cy.contains('Update calendar settings.').should('be.visible')
            }
            cy.contains('button', 'UPDATE').should('be.visible').click()
          })
        // Verify calendar settings modal is displaying
        cy.get('#setup_calender').should('be.visible')
        cy.get('#setup_calender').within(() => {
          cy.contains('Select Your Available Times').should('be.visible')
          cy.contains(
            `Select your working hours and the times you will likely be available for an interview. You will always receive an optional request from the client for interviews.`
          ).should('be.visible')
          // Click on start time button to select start time
          cy.get('#start_time button').should('be.visible').click()
        })
        cy.get('ul')
          .eq(0)
          .should('be.visible')
          .within(() => {
            // Selllect start time
            cy.contains('10').scrollIntoView().should('be.visible').click()
          })
        // Click on end time button to select end time
        cy.get('#end_time button').scrollIntoView().should('be.visible').click()
        cy.wait(500)
        cy.get('ul')
          .eq(0)
          .should('be.visible')
          .within(() => {
            cy.contains('08').should('be.visible').click()
          })
        cy.get('ul')
          .eq(2)
          .should('be.visible')
          .within(() => {
            cy.contains('PM').scrollIntoView().should('be.visible').click()
          })
        cy.get('#setup_calender').within(() => {
          // Select interview schedule options
          cy.contains('Who can schedule Interviews with you?').scrollIntoView().should('be.visible')
          cy.get('#interviewer_options').should('be.visible').click()

          options?.forEach(option => {
            cy.contains(option.label).should('be.visible')
          })
          cy.contains(options[1].label).should('be.visible').click()
          cy.contains(options[1].label).should('be.visible')

          cy.contains('button', 'UPDATE').scrollIntoView().should('be.visible').click()

          cy.wait('@createSettingsRequest').then(interception => {
            expect(interception.response.statusCode).to.eq(200)
          })
        })

        // Verify calendar settings success notification
        cy.get('[data-testid="calender_success_notification"]').within(() => {
          cy.contains('You have successfully setup the calendar!').should('be.visible')
          cy.contains('Dismiss').scrollIntoView().should('be.visible').click()
          cy.contains('You have successfully setup the calendar!').should('not.exist')
        })

        // It must redirect to the pick a plan page
        if (user?.plan === 0) {
          cy.contains('Select a plan for your account').should('be.visible').click()
        }
        cy.url().should('include', '/pick-a-plan')
        cy.contains('Connect. Build. grow').should('not.exist')
        // Go back to the previous page
        cy.go('back')
      })
  })
})
