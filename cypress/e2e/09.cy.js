import { faker } from '@faker-js/faker'
import moment from 'moment'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'
import { help } from '../../components/unzipped/dashboard/Notification'
import { options } from '../../components/unzipped/dashboard/ScheduleMeetingModal'

describe('Client Invoices', () => {
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
        task['contract'] = invoice.contract
        task['freelancer'] = invoice.freelancer
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
    cy.get('#email').type('client@gmail.com')
    cy.get('#password').type('Hello@2023')

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
      })
  })

  it('View project invoice of freelacer', () => {
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
        const selectedProject = ProjectsList[0]

        cy.get(`#${selectedProject?._id}`).contains(ValidationUtils.truncate(selectedProject.name, 40)).click()
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.wait('@getProjectDetailsRequest').then(interception => {
          expect(interception.response.statusCode).to.eq(200)
        })

        cy.wait('@clientContractsRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })
    cy.get('#desktop_project_detail_tabs').contains('Invoices').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getInvoiceRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.get('#project_invoices_table_header').within(() => {
      cy.contains('NAME').should('be.visible')
      cy.contains('Dates').should('be.visible')
      cy.contains('HOURS').should('be.visible')
      cy.contains('STATUS').should('be.visible')
      cy.contains('HIRE DATE').should('be.visible')
      cy.contains('ACTIONS').should('be.visible')
    })

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const Invoices = store.getState()?.Invoices.invoices
        Invoices?.forEach(invoice => {
          cy.get(`#${invoice?._id}`).within(() => {
            cy.contains(
              ConverterUtils.capitalize(
                `${invoice?.freelancer?.user?.FirstName} ${invoice?.freelancer?.user?.LastName}`
              ) || invoice?.freelancer?.user?.FullName
            )
              .scrollIntoView()
              .should('be.visible')
            cy.contains(
              `${moment(moment(invoice?.createdAt).startOf('isoWeek')).format('MM-DD-YYYY')} - ${moment(
                moment(invoice?.createdAt).endOf('isoWeek')
              ).format('MM-DD-YYYY')}`
            )
              .scrollIntoView()
              .should('be.visible')
            cy.contains(ConverterUtils.capitalize(`${invoice.status}`))
              .scrollIntoView()
              .should('be.visible')
            cy.contains(
              (invoice?.contract?.createdAt && ValidationUtils.formatDate(invoice?.contract?.createdAt)) ||
                ValidationUtils.formatDate(invoice?.contract?.updatedAt || invoice?.contract?.updatedAt)
            )
              .scrollIntoView()
              .should('be.visible')
            cy.contains('button', 'Details').scrollIntoView().should('be.visible')
          })
        })
        cy.get(`#${Invoices[0]?._id}`).within(() => {
          cy.contains('button', 'Details').click()
        })
        cy.get(`#${Invoices[0]?._id} li`).eq(1).click()
        cy.url().should(
          'include',
          `/dashboard/projects/client/invoice/${Invoices[0].businessId}?tab=invoices&invoice=${Invoices[0]._id}`
        )
      })
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getInvoiceRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.wait('@getProjectDetailsRequest').then(interception => {
      expect(interception.response.statusCode).to.eq(200)
    })

    cy.wait('@clientContractsRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const Invoices = store.getState()?.Invoices.invoices
        const Invoice = Invoices[0]
        const sortedData = invoiceData(Invoice)
        Object.keys(sortedData)?.forEach(day => {
          cy.get(`#${day}_tasks`).within(() => {
            cy.contains(day.toUpperCase()).should('be.visible')
            sortedData[day]?.forEach(item => {
              cy.contains(item?.task?.taskName).scrollIntoView().should('be.visible')

              cy.contains(`${item.hours} Hours`).scrollIntoView().should('be.visible')

              cy.get(`#${item._id}_rate`)
                .should('have.text', item?.contract?.hourlyRate)
                .scrollIntoView()
                .should('be.visible')
              cy.get(`#${item._id}_assignee`)
                .should('have.text', `${item?.freelancer?.user?.FirstName} ${item?.freelancer?.user?.LastName}`)
                .scrollIntoView()
                .should('be.visible')
            })
          })
        })

        cy.get('#name')
          .should(
            'have.text',
            ConverterUtils.capitalize(`${Invoice?.freelancer?.user?.FirstName} ${Invoice?.freelancer?.user?.LastName}`)
          )
          .scrollIntoView()
          .should('be.visible')
        cy.get('#amount')
          .should('have.text', ConverterUtils.capitalize(`$${Invoice?.contract?.hourlyRate * Invoice?.hoursWorked}`))
          .scrollIntoView()
          .should('be.visible')
        const SubTotal = Invoice?.contract.hourlyRate * Invoice.hoursWorked
        const Fee = SubTotal * 0.05
        const TotalAmount = SubTotal - Fee

        cy.get('#sub_total').should('have.text', `$${SubTotal}`).scrollIntoView().should('be.visible')
        cy.get('#fee')
          .should('have.text', `$${Math.round(Fee)}`)
          .scrollIntoView()
          .should('be.visible')
        cy.get('#total_amount').should('have.text', `$${TotalAmount}`).scrollIntoView().should('be.visible')

        if (Invoice?.status !== 'approved') {
          cy.contains('button', 'Approve').scrollIntoView().should('be.visible').click()
          cy.wait('@updateInvoiceRequest').then(interception => {
            expect(interception.response.statusCode).to.eq(200)
          })
        }
      })
  })
  it('Verify dashboard notifications', () => {
    cy.visit('http://localhost:3000/dashboard')

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const user = store?.getState()?.Auth.user

        cy.get('#pick_plan_notification')
          .scrollIntoView()
          .within(() => {
            cy.contains(
              `Build your dream business, grow your following, and collaborate with other professionals to make your vision a reality. Start your free trial now.`
            ).should('be.visible')
            cy.contains('button', 'PICK A PLAN').should('be.visible')
          })

        if (!user?.isGithubConnected) {
          cy.get('#github_connected_notification')
            .scrollIntoView()
            .within(() => {
              cy.contains(
                'You haven’t connected your Github account yet, connect it now so we can begin work building your project!'
              ).should('be.visible')
              cy.contains('button', 'CONNECT YOUR GITHUB ACCOUNT').should('be.visible')
            })
        }

        if (!user?.stripeAccountId) {
          cy.get('#stripe_connected_notification')
            .scrollIntoView()
            .within(() => {
              cy.contains('You haven’t connected your stripe account!').should('be.visible')
              cy.contains('button', 'CONNECT YOUR STRIPE ACCOUNT').should('be.visible')
            })
        }

        cy.get('#browse_projects_notification')
          .scrollIntoView()
          .within(() => {
            cy.contains('Browse other projects to inspire ideas').should('be.visible')
            cy.contains('button', 'BROWSE').should('be.visible')
          })
        cy.get('#browse_projects_notification')
          .scrollIntoView()
          .within(() => {
            cy.contains('Browse other projects to inspire ideas').should('be.visible')
            cy.contains('button', 'BROWSE').should('be.visible')
          })

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

        cy.get('#business_page_notification')
          .scrollIntoView()
          .within(() => {
            cy.contains(
              `You created your first business. Hooray! Now you need to customize your business homepage to attract better talent.`
            )

            cy.contains('button', 'CUSTOMIZE YOUR BUSINESS PAGE').should('be.visible')
          })

        cy.contains('Update types of professionals you are seeking for your business')
          .scrollIntoView()
          .should('be.visible')

        cy.get('#explore_notification')
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

        cy.get('#user_profile_panel')
          .scrollIntoView()
          .within(() => {
            if (!user?.isIdentityVerified) {
              cy.contains('Verify identity').should('be.visible')
            }
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

        if (!user?.totalBusiness) {
          cy.get('#create_business_notification')
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
    cy.get('#pick_plan_notification')
      .scrollIntoView()
      .within(() => {
        cy.contains('button', 'PICK A PLAN').should('be.visible').click()
      })
    cy.go('back')
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.get('#browse_projects_notification')
      .scrollIntoView()
      .within(() => {
        cy.contains('Browse other projects to inspire ideas').should('be.visible')
        cy.contains('button', 'BROWSE').should('be.visible').click()
        cy.url().should('include', '/projects')
      })
    cy.go('back')
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.get(`#explore_0`)
      .scrollIntoView()
      .within(() => {
        cy.contains('See our help docs').should('be.visible').click()
        cy.url().should('include', '/')
      })
    cy.go('back')
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.get(`#explore_1`)
      .scrollIntoView()
      .within(() => {
        cy.contains('Get started').should('be.visible').click()
        cy.url().should('include', '/')
      })
    cy.go('back')
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.get(`#explore_3`)
      .scrollIntoView()
      .within(() => {
        cy.contains('Ask about a topic.').should('be.visible').click()
        cy.url().should('include', '/')
        cy.go('back')
        cy.contains('Connect. Build. grow').should('not.exist')
      })
  })
  it('Update calendar settings', () => {
    cy.intercept('POST', `/api/user/calendar-settings`).as('createSettingsRequest')

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const user = store?.getState()?.Auth.user
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
            cy.contains('button', 'UPDATE').should('be.visible').click()
          })
        cy.get('#setup_calender').should('be.visible')
        cy.get('#setup_calender').within(() => {
          cy.contains('Select Your Available Times').should('be.visible')
          cy.contains(
            `Select your working hours and the times you will likely be available for an interview. You will always receive an optional request from the client for interviews.`
          ).should('be.visible')
          cy.get('#start_time button').should('be.visible').click()
        })
        cy.get('ul')
          .eq(0)
          .should('be.visible')
          .within(() => {
            cy.contains('10').scrollIntoView().should('be.visible').click()
          })
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

        cy.get('#calender_success_notification').within(() => {
          cy.contains('You have successfully setup the calendar!').should('be.visible')
          cy.contains('Dismiss').scrollIntoView().should('be.visible').click()
          cy.contains('You have successfully setup the calendar!').should('not.exist')
        })

        if (user?.plan === 0) {
          cy.contains('Select a plan for your account').should('be.visible').click()
        }
        cy.url().should('include', '/pick-a-plan')
        cy.contains('Connect. Build. grow').should('not.exist')

        if (!user?.totalBusiness) {
          cy.get('#create_business_notification')
            .scrollIntoView()
            .within(() => {
              cy.contains('button', 'CREATE FIRST PROJECT').should('be.visible').click()
            })
          cy.go('back')
        }
      })
  })
  it('Schedule an interview', () => {
    cy.visit('http://localhost:3000/freelancers')
    cy.contains('Connect. Build. grow').should('not.exist')
    cy.intercept('POST', `/api/freelancer/public/list`).as('getFreelancersRequest')
    cy.intercept('POST', `/api/message/list`).as('getConvesationsRequest')
    cy.intercept('POST', `/api/message/check-conversation`).as('checkConvesationsRequest')
    cy.intercept('POST', `/api/message/*`).as('getConvesationRequest')
    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
    cy.window()
      .its('store')
      .then(store => {
        const FreelancersList = store.getState().Freelancers?.freelancers
        cy.intercept('POST', `/api/list/list`).as('getAllListsRequest')
        cy.get(`#freelancer_${FreelancersList[0]?._id}`)
          .should('be.visible')
          .within(() => {
            cy.get(`#open_${FreelancersList[0]?.user?._id}_list_modal`).click()
          })
        cy.get(`#${FreelancersList[0]?.user?._id}_list_modal`).should('be.visible')
        cy.wait('@getAllListsRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
        cy.get(`#${FreelancersList[0]?.user?._id}_list_modal`).within(() => {
          cy.contains(`Schedule an Interview`).click()
        })
        cy.get('#schedule_meeting_modal').should('be.visible')
        cy.contains('button', 'CANCEL').scrollIntoView().should('be.visible').click()
        cy.contains(`Schedule an Interview`).click()
        cy.get('#schedule_meeting_modal').within(() => {
          cy.contains('Request a meeting').scrollIntoView().should('be.visible')
          cy.contains(
            `Select a time for a meeting based on the client's available schedule. They will receive a notification to accept the request. Select up to 5 times for maximum flexibility.`
          )
            .scrollIntoView()
            .should('be.visible')
          cy.get('[data-testid="ArrowRightIcon"]').click()
          cy.get('button[role="gridcell"]').eq(1).should('be.visible').click()
          cy.contains('button', '08:30 AM').scrollIntoView().should('be.visible').click()
          cy.contains('button', '11:30 AM').scrollIntoView().should('be.visible').click()
          cy.contains('button', '01:30 PM').scrollIntoView().should('be.visible').click()
          cy.contains('button', '03:30 PM').scrollIntoView().should('be.visible').click()
          cy.contains('button', '06:00 PM').scrollIntoView().should('be.visible').click()
          cy.contains('button', '08:00 PM').scrollIntoView().should('be.disabled')

          cy.contains('button', 'SCHEDULE').should('be.visible').click()
        })
        cy.get('#schedule_meeting_modal').should('not.exist')
      })
    cy.contains(`Send A Message`).click()

    cy.url().should('include', '/dashboard/inbox')
    cy.contains('Connect. Build. grow').should('not.exist')
    cy.wait('@getConvesationsRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
    cy.wait('@checkConvesationsRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
    cy.wait('@getConvesationRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
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
    cy.visit('http://localhost:3000/dashboard/inbox')
    cy.intercept('GET', `/api/message/*`).as('getConvesationRequest')

    cy.window()
      .its('store')
      .then(store => {
        const conversations = store?.getState().Messages?.conversations
        const user = store?.getState().Auth?.user

        const selectedConversation = store?.getState().Messages?.selectedConversation
        conversations?.forEach(conversation => {
          const receiver = conversation?.participants?.find(e => e?.userId?.email !== user?.email)
          const sender = conversation?.participants?.find(e => e?.userId?.email === user?.email)

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
            cy.contains(
              ValidationUtils.truncate(ValidationUtils.getMostRecentlyUpdated(conversation?.messages)?.message, 34)
            ).should('be.visible')
          })
        })
        cy.wait(1000)
        cy.get(`#conversation_${conversations[0]?._id}`)
          .scrollIntoView()
          .within(() => {
            const receiverUser = conversations[0]?.participants?.find(e => e?.userId?.email !== user?.email)

            cy.contains(ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(receiverUser?.userId)}`))
              .should('be.visible')
              .click()
            cy.wait('@getConvesationRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
          })

        const receiver =
          selectedConversation?.participants?.length &&
          selectedConversation?.participants?.find(e => e?.userId?.email !== user.email)
        const sender =
          selectedConversation?.participants?.length &&
          selectedConversation?.participants?.find(e => e?.userId?.email === user.email)

        cy.get('#message_container').within(() => {
          cy.get('#header').within(() => {
            cy.contains(ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(receiver?.userId)}`))
            if (receiver?.userId?.freelancers?.category) {
              cy.contains(receiver?.userId?.freelancers?.category)
            }
            cy.get('#profile_action').should('be.visible').click()
            cy.get('#profile_action').should('be.visible').click()
          })
          selectedConversation?.messages?.forEach(message => {
            cy.get(`#${message?._id}`)
              .within(() => {
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
          const NewMessage = faker.lorem.sentences(1)
          cy.get('#message').clear().type(NewMessage)
          cy.get('#send_message').scrollIntoView().should('be.visible').click()
          cy.contains(NewMessage)
          cy.get('#profile_container').within(() => {
            cy.contains(ConverterUtils.capitalize(`${ValidationUtils.getFullNameFromUser(receiver?.userId)}`))
              .should('be.visible')
              .scrollIntoView()
              .should('be.visible')
            cy.get(`img[src*="${receiver?.userId?.profileImage}"]`)
              .scrollIntoView()
              .should('be.visible')
              .should('have.attr', 'src')
              .then(src => {
                expect(src).to.include(receiver?.userId?.profileImage)
              })
            cy.contains('Make An Offer').scrollIntoView().should('be.visible').click()
            cy.url().should('include', '/hire')
            cy.contains('Connect. Build. grow').should('not.exist')
            cy.go('back')

            cy.contains('Add User To A List').scrollIntoView().should('be.visible').click()
            cy.contains('Add User To A List').scrollIntoView().should('be.visible').click()
          })
        })
        cy.contains('Schedule an Interview').scrollIntoView().should('be.visible').click()
        cy.get('#schedule_meeting_modal').should('be.visible')
        cy.contains('button', 'CANCEL').scrollIntoView().should('be.visible').click()
        cy.get('#archive_chat').scrollIntoView().should('be.visible').click()
        cy.contains('Archived Chats').should('be.visible')
        cy.get('#archive_chat').scrollIntoView().should('be.visible').click()

        cy.contains('Archived Chats').should('not.exist')

        cy.get('#mute').scrollIntoView().should('be.visible').click()
        cy.get('#mute').scrollIntoView().should('be.visible').click()
      })
  })
})
