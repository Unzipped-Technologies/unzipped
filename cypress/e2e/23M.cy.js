import { faker } from '@faker-js/faker'
import { help } from '../../components/unzipped/dashboard/MobileNotification'
import { options } from '../../components/unzipped/dashboard/ScheduleMeetingModal'
import { testClientEmail, testClientPassword, testFreelancerEmail } from '../../config/keys'

import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'

describe('Client Invoice', () => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // Get the options for the week for week options dropdown
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

  // Get invoice for the current week
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

  // Get invoice of freelancers for the current week
  const getCurrentWeekInvoices = invoices => {
    const weekOptions = GetOptions()
    if (invoices?.length) {
      const filteredItems = invoices?.filter(item => {
        const itemDate = new Date(item.updatedAt)
        const startOfWeek = weekOptions[0]?.startOfWeek
        const endOfWeek = weekOptions[0]?.endOfWeek
        return itemDate >= startOfWeek && itemDate <= endOfWeek
      })
      return filteredItems
    } else {
      invoices
    }
  }

  // Organize invoice data by day of the week
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

    // Click on the menu icon to visit the login page
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

  it('View project invoice of freelacers', () => {
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
    // It must redirect to the dashboard projects page
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

    cy.window()
      .its('store')
      .then(store => {
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
      })

    // Click on invoices tab to view invoices
    cy.get('#desktop_project_detail_tabs').contains('Invoices').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getInvoiceRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    // Verify week options in select dropdown
    cy.get('[data-testid="timesheet_week_options"]').should('be.visible').focus().type('{downarrow}', { delay: 100 })
    // Verify week options in select dropdown
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
        const WeekInvoices = getCurrentWeekInvoices(Invoices)
        let subTotal = 0
        let fee = 0
        let totalAmount = 0
        // Calculate sub total, fee and total amount
        for (var invoice of WeekInvoices) {
          subTotal += invoice?.contract.hourlyRate * invoice.hoursWorked
        }
        fee = subTotal * 0.05
        totalAmount = subTotal - fee

        // Verify freelancers name and working hours are displaying
        WeekInvoices?.forEach(invoice => {
          if (invoice?.freelancer?._id) {
            cy.get(`[data-testid="${invoice?.freelancer?._id}_invoice"]`).within(() => {
              cy.contains(
                ConverterUtils.capitalize(
                  `${invoice?.freelancer?.user?.FirstName} ${invoice?.freelancer?.user?.LastName}`
                )
              )
                .scrollIntoView()
                .should('be.visible')
              cy.contains(invoice?.hoursWorked || 0)
                .scrollIntoView()
                .should('be.visible')
            })
          }
        })

        // Verify sub total, fee and total amount are displaying
        cy.get('[data-testid="employess_invoices_totals"]')
          .scrollIntoView()
          .should('be.visible')
          .within(() => {
            cy.contains(
              `${WeekInvoices?.map(invoice => invoice.hoursWorked).reduce((acc, hours) => acc + hours, 0) || 0}`
            )
              .scrollIntoView()
              .should('be.visible')
            cy.get('#fee')
              .scrollIntoView()
              .should('be.visible')
              .should('have.text', `$${Math.round(fee)}`)
            cy.get('#total').scrollIntoView().should('be.visible').should('have.text', `$${totalAmount}`)
          })

        // Verify all invoices are displaying with tasks, working hours and view invoice button
        WeekInvoices?.forEach(invoice => {
          if (invoice?._id) {
            cy.get(`[data-testid="${invoice?._id}_invoice"]`).within(() => {
              // Freelaner name and working hours
              // Click to open Accordian details
              cy.contains(
                `${ConverterUtils.capitalize(
                  `${invoice?.freelancer?.user?.FirstName} ${invoice?.freelancer?.user?.LastName}`
                )} - ${invoice?.hoursWorked ?? 0} hours`
              )
                .scrollIntoView()
                .should('be.visible')
                .click()

              // Verify all tasks are displaying with working hours in Accordian details
              invoice?.tasks?.forEach(task => {
                cy.get(`#${task?._id}`).within(() => {
                  cy.contains(task?.task?.taskName).scrollIntoView().should('be.visible')
                  cy.contains(`${task?.hours || 0} Hours`)
                    .scrollIntoView()
                    .should('be.visible')
                })
              })
              cy.contains('button', 'View Invoice').scrollIntoView().should('be.visible')
              // Close the Accordian details after verifying the tasks and invoice
              cy.contains(
                `${ConverterUtils.capitalize(
                  `${invoice?.freelancer?.user?.FirstName} ${invoice?.freelancer?.user?.LastName}`
                )} - ${invoice?.hoursWorked ?? 0} hours`
              )
                .scrollIntoView()
                .should('be.visible')
                .click()
            })
          }
        })

        // Get freelancer single invoice to view invoice details
        let SingleInvoice = WeekInvoices?.find(invoice => invoice?.hoursWorked > 0)
        SingleInvoice = SingleInvoice?._id ? SingleInvoice : WeekInvoices[0]
        if (SingleInvoice?._id) {
          cy.get(`[data-testid="${SingleInvoice?._id}_invoice"]`).within(() => {
            cy.contains(
              `${ConverterUtils.capitalize(
                `${SingleInvoice?.freelancer?.user?.FirstName} ${SingleInvoice?.freelancer?.user?.LastName}`
              )} - ${SingleInvoice?.hoursWorked ?? 0} hours`
            )
              .scrollIntoView()
              .should('be.visible')
              .click()

            SingleInvoice?.tasks?.forEach(task => {
              cy.get(`#${task?._id}`).within(() => {
                cy.contains(task?.task?.taskName).scrollIntoView().should('be.visible')
                cy.contains(`${task?.hours || 0} Hours`)
                  .scrollIntoView()
                  .should('be.visible')
              })
            })
            // Click on view invoice button to view invoice details
            cy.contains('button', 'View Invoice').scrollIntoView().should('be.visible').click()
            cy.wait('@getInvoiceRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
          })
        }
      })

    cy.window()
      .its('store')
      .then(store => {
        const Invoices = store.getState().Invoices.invoices
        const WeekInvoices = getCurrentWeekInvoices(Invoices)
        const selectedInvoicee = getCurrentInvoice(Invoices)
        if (selectedInvoicee?._id) {
          const sortedData = invoiceData(selectedInvoicee)

          let subTotal = 0
          let fee = 0
          let totalAmount = 0
          for (var invoice of WeekInvoices) {
            subTotal += invoice?.contract.hourlyRate * invoice.hoursWorked
          }
          fee = subTotal * 0.05
          totalAmount = subTotal - fee

          cy.get(`[data-testid="employess_single_invoices"]`)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              // Verify day of the week and total hours are displaying in single invoice for freelancers
              Object?.keys(sortedData)?.forEach(day => {
                cy.get(`[data-testid="${day}_hours"]`)
                  .scrollIntoView()
                  .should('be.visible')
                  .within(() => {
                    cy.contains(day).scrollIntoView().should('be.visible')
                    const TotalHours =
                      sortedData[day]?.reduce((accumulator, currentValue) => {
                        const totalHours = +accumulator + +currentValue.hours
                        return totalHours
                      }, 0) || 0
                    cy.contains(TotalHours).scrollIntoView().should('be.visible')
                  })
              })
            })
          // Verify invoice totals are displaying in single invoice for freelancers
          cy.get(`[data-testid="single_invoice_totals"]`)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              cy.get('#total_hours')
                .scrollIntoView()
                .should('be.visible')
                .should('have.text', selectedInvoicee?.hoursWorked || 0)
              cy.get('#fee')
                .scrollIntoView()
                .should('be.visible')
                .should('have.text', `$${Math.round(fee)}`)
              cy.get('#total').scrollIntoView().should('be.visible').should('have.text', `$${totalAmount}`)
            })

          Object?.keys(sortedData)?.forEach(day => {
            cy.get(`#${day}_header`)
              .scrollIntoView()
              .should('be.visible')
              .within(() => {
                const TotalHours = sortedData[day]?.reduce((accumulator, currentValue) => {
                  const totalHours = +accumulator + +currentValue.hours
                  return totalHours
                }, 0)
                cy.contains(`${day} - ${TotalHours} Hours`).scrollIntoView().should('be.visible').click()
              })
            // Verify invoice tasks are displaying
            sortedData[day]?.forEach(task => {
              cy.get(`#${task?._id}`).within(() => {
                cy.contains(task?.task?.taskName).scrollIntoView().should('be.visible')
                cy.contains(`${task?.hours || 0} Hours`)
                  .scrollIntoView()
                  .should('be.visible')
              })
            })
          })
        }
      })
  })

  it('Verify dashboard notifications', () => {
    // Scroll to bottom of the page
    cy.scrollTo('bottom')
    // Click on dashboard icon to view dashboard page
    cy.get('#Dashboard').scrollIntoView().should('be.visible').click()
    cy.url().should('include', `/dashboard`)
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.window()
      .its('store')
      .then(store => {
        const user = store?.getState()?.Auth.user

        // Verify Pick a plan notification
        cy.get('[data-testid="pick_plan_notification"]')
          .scrollIntoView()
          .within(() => {
            cy.contains(
              `Build your dream business, grow your following, and collaborate with other professionals to make your vision a reality. Start your free trial now.`
            ).should('be.visible')
            cy.contains('button', 'PICK A PLAN').should('be.visible')
          })

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
        cy.get('#calendar_setting_notification')
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
            // Verify user identity notifications
            if (!user?.isIdentityVerified) {
              cy.contains('Verify identity').should('be.visible')
            }
            if (!user?.role || (!user?.FirstName && !user?.AddressCity)) {
              // Verify update account details notifications
              cy.contains('Update account details').should('be.visible')
            }
            // Verify profile image notifications
            if (!user?.profileImage) {
              cy.contains('Upload a profile picture').should('be.visible')
            }
            if (user?.plan === 0) {
              cy.contains('Select a plan for your account').should('be.visible')
            }
          })

        // Verify create business notification
        if (!user?.totalBusiness) {
          cy.get('[data-testid="create_business_notification"]')
            .scrollIntoView()
            .within(() => {
              cy.contains(
                `You haven't created your first Project yet, create one now so you can begin Collaborating! Need Ideas? View existing projects here.`
              )

              cy.contains('button', 'CREATE FIRST PROJECT').should('be.visible')
            })
        }
      })
  })
  it('Click on notifications', () => {
    cy.scrollTo('bottom')
    cy.get('#Dashboard').scrollIntoView().should('be.visible').click()
    // It must redirect to the dashboard page
    cy.url().should('include', `/dashboard`)
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.window()
      .its('store')
      .then(store => {
        const user = store?.getState()?.Auth.user

        // Click on pick a plan notification
        cy.get('[data-testid="pick_plan_notification"]')
          .scrollIntoView()
          .within(() => {
            cy.contains(
              `Build your dream business, grow your following, and collaborate with other professionals to make your vision a reality. Start your free trial now.`
            ).should('be.visible')
            cy.contains('button', 'PICK A PLAN').should('be.visible').click()
            cy.window().its('document.readyState').should('eq', 'complete')

            cy.url().should('include', '/pick-a-plan')
            cy.contains('Connect. Build. grow').should('not.exist')
            cy.go('back')
          })

        // Click on browse projects notification
        cy.get('[data-testid="browse_projects_notification"]')
          .scrollIntoView()
          .within(() => {
            cy.contains('Browse other projects to inspire ideas').should('be.visible')
            cy.contains('button', 'BROWSE').should('be.visible').click()
          })
        cy.url().should('include', '/projects')
        cy.contains('Connect. Build. grow').should('not.exist')
        cy.go('back')

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
  })

  it('Update calendar settings', () => {
    // Intercept the requests to create calendar settings
    cy.intercept('POST', `/api/user/calendar-settings`).as('createSettingsRequest')

    cy.window()
      .its('store')
      .then(store => {
        const user = store?.getState()?.Auth.user
        cy.get('[data-testid="calendar_setting_notification"]')
          .scrollIntoView()
          .within(() => {
            // Verify calendar settings notification
            if (!user?.calendarSettings?.startTime) {
              cy.contains(
                'You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you.'
              ).should('be.visible')
            } else {
              cy.contains('Update calendar settings.').should('be.visible')
            }
            // Click on update calendar settings button
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

        if (user?.plan === 0) {
          // Click on pick a plan notification
          cy.contains('Select a plan for your account').should('be.visible').click()
        }
        // It must redirect to the pick a plan page
        cy.url().should('include', '/pick-a-plan')
        cy.contains('Connect. Build. grow').should('not.exist')
        // Go back to the previous page
        cy.go('back')
      })
  })

  it('Schedule an interview and verify message', () => {
    // Visit freeelancers page
    cy.visit('http://localhost:3000/freelancers')
    cy.contains('Connect. Build. grow').should('not.exist')

    // Intercept the requests to get freelancers, messages and check conversation
    cy.intercept('POST', `/api/message/check-conversation`).as('checkConversationRequest')
    cy.intercept('POST', `/api/freelancer/public/list`).as('getFreelancersRequest')
    cy.intercept('POST', `/api/message/list`).as('getConvesationsRequest')
    cy.intercept('POST', `/api/message/check-conversation`).as('checkConvesationsRequest')
    cy.intercept('POST', `/api/list/list`).as('getAllListsRequest')
    cy.intercept('POST', `/api/message/*`).as('getConvesationRequest')
    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
    cy.window()
      .its('store')
      .then(store => {
        const FreelancersList = store.getState().Freelancers?.freelancers
        cy.get(`#freelancer_${FreelancersList[0]?._id}`)
          .should('be.visible')
          .within(() => {
            // Click on action modal to view profile options
            cy.get(`#open_${FreelancersList[0]?.user?._id}_list_modal`).click()
          })
        // Verify list modal is visible
        cy.get(`#${FreelancersList[0]?.user?._id}_list_modal`).should('be.visible')
        cy.wait('@getAllListsRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
        cy.get(`#${FreelancersList[0]?.user?._id}_list_modal`).within(() => {
          // Click on schedule an interview to  schedule meeting modal
          cy.contains(`Schedule an Interview`).click()
        })
        cy.get('#schedule_meeting_modal').should('be.visible')
        cy.contains('button', 'CANCEL').scrollIntoView().should('be.visible').click()
        cy.contains(`Schedule an Interview`).click()
        cy.get('#schedule_meeting_modal').within(() => {
          // Verify schedule meeting modal content
          cy.contains('Request a meeting').scrollIntoView().should('be.visible')
          cy.contains(
            `Select a time for a meeting based on the client's available schedule. They will receive a notification to accept the request. Select up to 5 times for maximum flexibility.`
          )
            .scrollIntoView()
            .should('be.visible')
          cy.get('[data-testid="ArrowRightIcon"]').click()
          // Select available times for meeting
          cy.get('button[role="gridcell"]').eq(1).should('be.visible').click()
          cy.contains('button', '08:30 AM').scrollIntoView().should('be.visible').click()
          cy.contains('button', '11:30 AM').scrollIntoView().should('be.visible').click()
          cy.contains('button', '01:30 PM').scrollIntoView().should('be.visible').click()
          cy.contains('button', '03:30 PM').scrollIntoView().should('be.visible').click()
          cy.contains('button', '06:00 PM').scrollIntoView().should('be.visible').click()
          cy.contains('button', '08:00 PM').scrollIntoView().should('be.disabled')

          cy.contains('button', 'SCHEDULE').should('be.visible').click()
        })
        // Verify meeting modal is not visible
        cy.get('#schedule_meeting_modal').should('not.exist')
        cy.contains(`Send A Message`).click()

        cy.wait('@checkConversationRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
          cy.url().should('include', `/dashboard/chat/${interception.response.body._id}`)
        })
      })
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getConvesationRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
    // Verify messages in the conversation agaist selected freelancer
    cy.window()
      .its('store')
      .then(store => {
        const selectedConversation = store?.getState().Messages?.selectedConversation
        selectedConversation?.messages?.forEach(message => {
          cy.contains(message?.message).scrollIntoView().should('be.visible')
        })
      })
  })

  it('Send message to freelancer', () => {
    // Visit inbox page
    cy.visit('http://localhost:3000/dashboard/inbox')
    // Intercept the requests to get  conversation
    cy.intercept('GET', `/api/message/*`).as('getConvesationRequest')

    cy.wait('@getConvesationRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        const conversations = store?.getState().Messages?.conversations
        const user = store?.getState().Auth?.user

        // Verify conversations are displaying
        conversations?.forEach(conversation => {
          const receiver = conversation?.participants?.find(e => e?.userId?.email !== user?.email)

          // Verify single conversation details
          cy.get(`#conversation_${conversation?._id}`).within(() => {
            cy.get(`img[src*="${receiver?.userId?.profileImage}"]`)
              .scrollIntoView()
              .should('be.visible')
              .should('have.attr', 'src')
              .then(src => {
                expect(src).to.include(receiver?.userId?.profileImage)
              })
            cy.contains(ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(receiver?.userId)}`)).should(
              'be.visible'
            )
            cy.contains(ValidationUtils.formatDateWithDate(conversation?.updatedAt)).should('be.visible')
            if (conversation?.messages?.length) {
              cy.contains(
                ValidationUtils.truncate(ValidationUtils.getMostRecentlyUpdated(conversation?.messages)?.message, 34)
              ).should('be.visible')
            }
          })
        })
        cy.wait(1000)
        // Get freelancer conversation to send message
        let FreelancerConversation = conversations?.find(conv =>
          conv?.participants?.some(parti => parti.userId.email === testFreelancerEmail)
        )
        FreelancerConversation = FreelancerConversation?._id ? FreelancerConversation : conversations[0]

        cy.get(`#conversation_${FreelancerConversation?._id}`)
          .scrollIntoView()
          .within(() => {
            const receiverUser = FreelancerConversation?.participants?.find(e => e?.userId?.email !== user?.email)

            // Click on conversation to view and send message
            cy.contains(ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(receiverUser?.userId)}`))
              .should('be.visible')
              .click()

            // It must redirect to chat page
            cy.url().should('include', `/dashboard/chat/${FreelancerConversation?._id}`)

            // Retriev messages for the selected conversation
            cy.wait('@getConvesationRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
          })
      })

    cy.window()
      .its('store')
      .then(store => {
        const user = store?.getState().Auth?.user

        const selectedConversation = store?.getState().Messages?.selectedConversation

        const sender =
          selectedConversation?.participants?.length &&
          selectedConversation?.participants?.find(e => e?.userId?.email === user.email)
        // Verify selected conversation messages in message container
        cy.get('#message_container').within(() => {
          selectedConversation?.messages?.forEach(message => {
            cy.get(`#message_${message?._id}`)
              .scrollIntoView()
              .should('be.visible')
              .within(() => {
                // Verify receipent image, message and time
                if (message?.sender === user?._id) {
                  cy.get(`img[src*="${sender?.userId?.profileImage}"]`)
                    .scrollIntoView()
                    .should('be.visible')
                    .should('have.attr', 'src')
                    .then(src => {
                      expect(src).to.include(sender?.userId?.profileImage)
                    })
                } else if (message?.conversationId === selectedConversation?._id) {
                  cy.get(`img[src*="${sender?.userId?.profileImage}"]`)
                    .scrollIntoView()
                    .should('be.visible')
                    .should('have.attr', 'src')
                    .then(src => {
                      expect(src).to.include(sender?.userId?.profileImage)
                    })
                }
                if (message?.updatedAt) {
                  cy.contains(ValidationUtils.getTimeFormated(message?.updatedAt)).scrollIntoView().should('be.visible')
                }
                cy.contains(message?.message).scrollIntoView().should('be.visible')
              })
              .should('be.visible')
          })
          // Type new message and send
          const NewMessage = faker.lorem.sentences(1)
          cy.get('#message').clear().type(NewMessage)
          cy.get('#send_message').scrollIntoView().should('be.visible').click()
          cy.contains(NewMessage).scrollIntoView().should('be.visible')
        })
        // Click on header menu icon to view chat menus
        cy.get('#header_action').scrollIntoView().should('be.visible').click()
        cy.get('#profile_menu_container').within(() => {
          cy.contains('Make An Offer').scrollIntoView().should('be.visible').click()
          // It must redirect to the hire page
          cy.url().should('include', '/hire')
          cy.contains('Connect. Build. grow').should('not.exist')
          // Go back to the previous routee
          cy.go('back')
        })

        cy.wait('@getConvesationRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
        cy.get('#header_action').scrollIntoView().should('be.visible').click()

        cy.contains('Add User To A List').scrollIntoView().should('be.visible').click()
        cy.contains('Add User To A List').scrollIntoView().should('be.visible').click()
        cy.contains('Schedule an Interview').scrollIntoView().should('be.visible').click()
        cy.get('#schedule_meeting_modal').should('be.visible')
        cy.contains('button', 'CANCEL').scrollIntoView().should('be.visible').click()
        cy.get('#archive_chat').scrollIntoView().should('be.visible').click()
        cy.go('back')
        cy.wait('@getConvesationRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })

    cy.window()
      .its('store')
      .then(store => {
        const conversations = store?.getState().Messages?.conversations

        let FreelancerConversation = conversations?.find(conv =>
          conv?.participants?.some(parti => parti.userId.email === testFreelancerEmail)
        )
        FreelancerConversation = FreelancerConversation?._id ? FreelancerConversation : conversations[0]

        cy.contains('Archived Chats').should('be.visible').click()
        cy.wait(1000)
        cy.get(`#conversation_${FreelancerConversation?._id}`).scrollIntoView().should('be.visible').click()
        cy.url().should('include', `/dashboard/chat/${FreelancerConversation?._id}`)

        cy.get('#header_action').scrollIntoView().should('be.visible').click()
        cy.get('#archive_chat').scrollIntoView().should('be.visible').click()

        cy.get('#mute').scrollIntoView().should('be.visible').click()
        cy.get('#mute').scrollIntoView().should('be.visible').click()
      })
  })
})
