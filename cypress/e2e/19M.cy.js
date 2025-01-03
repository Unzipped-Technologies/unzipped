import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'
import { testClientEmail, testClientPassword } from '../../config/keys'

describe('Client can view project  applications, add department, tags etc', () => {
  let reduxStore
  before(() => {
    cy.viewport(480, 896)

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/') // Visit the login page

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
        const state = store.getState()
      })
  })
  after(() => {
    cy.end()
    cy.clearCookies()
    cy.clearLocalStorage()
  })
  it('View project detail,project applications, freelancer profile and verify freelancer data', () => {
    cy.intercept('POST', `/api/business/list`).as('getProjectsRequest')

    cy.get('#Projects').scrollIntoView().should('be.visible').click()
    cy.url().should('include', '/dashboard/projects')
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getProjectsRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
    cy.get('[data-testid="view_mobile_projects"]')
      .should('be.visible')
      .within(() => {
        cy.contains('VIEW ALL').should('be.visible').click()
        cy.url().should('include', '/dashboard/projects/view')
      })
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getProjectsRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])

      cy.window()
        .its('store')
        .then(store => {
          reduxStore = store
          cy.wrap(store).as('reduxStore') // Store reduxStore as an alias
        })
    })

    cy.get('@reduxStore').then(store => {
      // Now you have access to reduxStore
      const ProjectsList = store.getState().Business.projectList
      const userId = store.getState().Auth.user._id
      const selectedProject = ProjectsList[0]

      cy.intercept('GET', `/api/business/${selectedProject?._id}`).as('getProjectDetailsRequest')
      cy.intercept('GET', `/api/contract/count/${userId}`).as('clientContractsRequest')

      cy.get(`#${selectedProject._id}`).within(() => {
        cy.contains('Details').scrollIntoView().should('be.visible').click()
        cy.get('li').eq(0).scrollIntoView().should('be.visible').click()
      })
      cy.contains('Connect. Build. grow').should('not.exist')

      cy.wait('@getProjectDetailsRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])

        cy.window()
          .its('store')
          .then(store => {
            reduxStore = store
            cy.wrap(store).as('reduxStore') // Store reduxStore as an alias
            const SelectedProject = store.getState().Business.selectedBusiness
            cy.contains(SelectedProject?.name)
            cy.contains(SelectedProject?.projectType)

            SelectedProject?.requiredSkills?.forEach(skill => {
              cy.contains(skill)
            })
            cy.contains(SelectedProject?._id)
            if (SelectedProject?.goals) {
              cy.contains(SelectedProject?.goals)
            }
          })
      })

      cy.wait('@clientContractsRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })

      cy.intercept(
        'GET',
        `/api/projectApplication?projectId=${selectedProject?._id}&freelancerId=&limit=all&page=1`
      ).as('getApplicationsRequest')

      cy.get('#desktop_project_detail_tabs').contains('Applications').click()
      cy.contains('Connect. Build. grow').should('not.exist')

      cy.wait('@getApplicationsRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })
    })

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        cy.wrap(store).as('reduxStore') // Store reduxStore as an alias
        const ProjectApplications = store.getState().ProjectApplications.projectApplications

        ProjectApplications?.forEach(application => {
          cy.get(`[data-testid="${application._id}_application_card"]`).within(() => {
            if (application?.freelancerId?.userId?.profileImage) {
              cy.get('img') // Get the first image on the page
                .should('have.attr', 'src')
                .and('include', application.freelancerId.userId.profileImage)
            } else {
              cy.get(`#no_profile_image`).contains(
                application?.freelancerId?.userId?.FirstName?.[0] ?? application?.freelancerId?.userId?.LastName?.[0]
              )
            }
            cy.contains('button', 'View Profile').should('be.visible')
            application?.freelancerId?.freelancerSkills?.forEach(skill => {
              cy.contains(skill.skill)
            })
            cy.contains(
              ConverterUtils.capitalize(
                `${application?.freelancerId?.userId?.FirstName} ${application?.freelancerId?.userId?.LastName}`
              )
            ).should('be.visible')
          })
        })
        const Application = ProjectApplications[0]
        cy.get(`[data-testid="${Application._id}_application_card"]`).within(() => {
          cy.intercept('GET', `/api/freelancer/${Application?.freelancerId?._id}`).as('getFreelancerRequest')

          cy.contains('button', 'View Profile').should('be.visible').click({ force: true })
          cy.contains('Connect. Build. grow').should('not.exist')

          cy.url().should('include', `/freelancers/${Application?.freelancerId?._id}`)
          cy.wait('@getFreelancerRequest').then(interception => {
            expect(interception.response.statusCode).to.be.oneOf([200, 304])
          })
        })
      })
    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        cy.wrap(store).as('reduxStore') // Store reduxStore as an alias
        const selectedFreelancer = store.getState().Freelancers?.selectedFreelancer
        cy.get('#freelancer_profile')
          .should('be.visible')
          .within(() => {
            if (selectedFreelancer?.userId?.profileImage) {
              cy.get('img') // Get the first image on the page
                .should('have.attr', 'src')
                .and('include', selectedFreelancer?.userId?.profileImage)
            }

            if (selectedFreelancer?.userId?.FirstName && selectedFreelancer?.userId?.LastName) {
              cy.contains(
                ConverterUtils.capitalize(
                  `${selectedFreelancer?.userId?.FirstName} ${selectedFreelancer?.userId?.LastName}`
                )
              )
            }

            if (selectedFreelancer?.likeTotal > 0) {
              cy.contains(
                `${selectedFreelancer?.likeTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} UPVOTES BY CLIENTS`
              )
            }
            if (selectedFreelancer?.rate > 0) {
              cy.contains(`$${selectedFreelancer?.rate.toFixed(2)} / HOUR`)
            } else {
              cy.contains(`Negotiable`)
            }
            selectedFreelancer?.isIdentityVerified == 'SUCCESS' && cy.contains('Identity Verified')
            selectedFreelancer?.isEmailVerified && cy.contains('Email Verified')
            selectedFreelancer?.isPreferedFreelancer && cy.contains('Preferred Verified')
            selectedFreelancer?.isPhoneVerified && cy.contains('Phone Verified')
          })

        cy.get('#freelancer_info')
          .should('be.visible')
          .within(() => {
            selectedFreelancer?.projects?.forEach(project => {
              cy.get(`#project_${project?._id}`).within(() => {
                cy.contains(project?.projectName ?? 'Project Name')
                project?.skills?.forEach(skill => {
                  cy.contains(skill)
                })
                project?.images?.forEach((image, index) => {
                  cy.get(`img[src*="${image?.url}"]`)
                    .should('be.visible')
                    .should('have.attr', 'src')
                    .then(src => {
                      // Use an assertion here to check if the src contains the expected part of the URL
                      expect(src).to.include(image?.url)
                    })
                })
              })
            })
            selectedFreelancer?.education?.forEach(edu => {
              cy.contains(edu?.title)
              cy.contains(edu?.institute)
              cy.contains(`${edu?.startYear} - ${edu?.endYear} (${+edu?.endYear - +edu?.startYear} years)`)
            })
          })
      })
  })

  it('Create,Edit and Delete Lists', () => {
    cy.intercept('GET', `/api/list-entries/find-by-id/*`).as('getSingleListRequest')

    cy.get('#Projects').scrollIntoView().should('be.visible').click()
    cy.url().should('include', '/dashboard/projects')
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.get('[data-testid="view_mobile_lists"]')
      .should('be.visible')
      .within(() => {
        cy.contains('VIEW ALL').should('be.visible').click()
        cy.url().should('include', '/dashboard/lists/view')
      })
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.get('#add_new_list').contains('New List').click()

    cy.get('#add_list_modal').should('be.visible')
    const ListName1 = faker.string.alpha(10)
    cy.get('#list_name').should('be.visible').clear().type(ListName1)
    cy.get('#list_name').should('have.value', ListName1)
    cy.get('#icon_1').click()

    cy.intercept('POST', '/api/list/create/').as('createListRequest')
    cy.contains('button', 'ADD LIST').should('be.visible').click()
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@createListRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        // Get the current state of the store
        const Lists = store.getState().ListEntries?.userLists
        const SelectedList = Lists[Lists?.length - 1]
        cy.get(`[data-testid="${SelectedList._id}"]`).within(() => {
          cy.contains(SelectedList?.name ?? 'List Name')
            .scrollIntoView()
            .should('be.visible')
            .click()
        })
        cy.url().should('include', `/dashboard/lists/${SelectedList._id}`)
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.wait('@getSingleListRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })

    // Edit List
    cy.get('#list_actions_dropdown').click()
    cy.get('#list_actions_dropdown').contains('Edit').click()

    cy.get('#add_list_modal').should('be.visible')
    const ListName2 = faker.string.alpha(10)
    cy.get('#list_name').should('be.visible').clear().type(ListName2)
    cy.get('#list_name').should('have.value', ListName2)
    cy.get('#icon_2').click()

    cy.intercept('POST', '/api/list/update/').as('updateListRequest')
    cy.contains('button', 'UPDATE LIST').should('be.visible').click()

    cy.wait('@updateListRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    // Delete List
    cy.get('#list_actions_dropdown').click()
    cy.intercept('DELETE', `/api/list-entries/*`).as('deleteListRequest')
    cy.intercept('GET', `/api/list-entries/users-list/*`).as('getListsRequest')

    cy.get('#list_actions_dropdown').contains('Delete').click()
    cy.wait('@deleteListRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.wait('@getListsRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })
  })
  it('Add freelancers to list', () => {
    const UserId = reduxStore.getState()?.Auth?.user?._id

    cy.intercept('GET', `/api/list-entries/users-list/*`).as('getListsRequest')
    cy.intercept('GET', `/api/list-entries/find-by-id/*`).as('getListEntriesRequest')
    cy.intercept('POST', `/api/freelancer/public/list`).as('getFreelancersRequest')

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const Lists = reduxStore.getState()?.ListEntries?.userLists
        const selectedList = Lists[Lists?.length - 1]
        if (selectedList?._id) {
          cy.get(`[data-testid="${selectedList._id}"]`).within(() => {
            cy.contains(selectedList?.name ?? 'List Name')
              .scrollIntoView()
              .should('be.visible')
              .click()
          })
          cy.url().should('include', `/dashboard/lists/${selectedList._id}`)
          cy.contains('Connect. Build. grow').should('not.exist')

          cy.wait('@getListEntriesRequest').then(interception => {
            expect(interception.response.statusCode).to.be.oneOf([200, 304])
          })

          cy.contains('button', 'BROWSE FREELANCERS').scrollIntoView().should('be.visible').click()

          cy.contains('Connect. Build. grow').should('not.exist')

          cy.url().should('include', '/freelancers')

          cy.wait('@getFreelancersRequest').then(interception => {
            expect(interception.response.statusCode).to.be.oneOf([200, 304])
          })
        }
      })

    cy.window()
      .its('store')
      .then(store => {
        const FreelancersList = store.getState().Freelancers?.freelancers

        cy.intercept('POST', `/api/list/list`).as('getAllListsRequest')

        cy.get(`#freelancer_${FreelancersList[0]?._id}`)
          .should('be.visible')
          .within(() => {
            cy.get(`#open_${FreelancersList[0]?.user._id}_list_modal`).scrollIntoView().should('be.visible').click()
          })
        cy.get(`#${FreelancersList[0]?.user?._id}_list_modal`).should('be.visible')
        cy.wait('@getAllListsRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })

    cy.window()
      .its('store')
      .then(store => {
        const FreelancersList = store.getState().Freelancers?.freelancers

        cy.contains(`Add User To A List`).click()

        let InvitesList = store.getState().Lists?.invitesList
        let ListToAdd = InvitesList[InvitesList?.length - 1]

        if (ListToAdd) {
          cy.intercept('PATCH', `/api/list/add-entry/${ListToAdd?._id}`).as('addToListRequest')
          cy.contains(ListToAdd?.name).click()
          cy.wait('@addToListRequest').then(interception => {
            expect(interception.response.statusCode).to.be.oneOf([200, 304])
          })
        }
      })
  })
  it('View Freelancer application and hire him.', () => {
    cy.intercept('POST', `/api/business/list`).as('getProjectsRequest')
    cy.get('#Projects').scrollIntoView().should('be.visible').click()
    cy.url().should('include', '/dashboard/projects')
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getProjectsRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.get('[data-testid="view_mobile_projects"]')
      .should('be.visible')
      .within(() => {
        cy.contains('VIEW ALL').should('be.visible').click()
        cy.url().should('include', '/dashboard/projects/view')
      })
    cy.contains('Connect. Build. grow').should('not.exist')

    cy.wait('@getProjectsRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store

        // Now you have access to reduxStore
        const ProjectsList = store.getState().Business.projectList
        const userId = store.getState().Auth.user._id
        const selectedProject = ProjectsList[0]

        cy.intercept('GET', `/api/business/${selectedProject?._id}`).as('getProjectDetailsRequest')
        cy.intercept('GET', `/api/contract/count/${userId}`).as('clientContractsRequest')

        cy.get(`#${selectedProject._id}`).within(() => {
          cy.contains('Details').scrollIntoView().should('be.visible').click()
          cy.get('li').eq(0).scrollIntoView().should('be.visible').click()
        })

        cy.contains('Connect. Build. grow').should('not.exist')

        cy.wait('@getProjectDetailsRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })

        cy.wait('@clientContractsRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })

        cy.intercept(
          'GET',
          `/api/projectApplication?projectId=${selectedProject?._id}&freelancerId=&limit=all&page=1`
        ).as('getApplicationsRequest')

        cy.get('#desktop_project_detail_tabs').contains('Applications').click()
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.wait('@getApplicationsRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })
    // cy.intercept('GET', `/api/freelancer/*`).as('getFreelancerRequest')

    cy.window()
      .its('store')
      .then(store => {
        reduxStore = store
        const ProjectApplications = store.getState().ProjectApplications.projectApplications
        const SelectedBusiness = store.getState().Business.selectedBusiness

        cy.get(`[data-testid="${ProjectApplications[0]._id}_application_card"]`).within(() => {
          cy.get('#application_actions').click()
        })
        cy.intercept({
          method: 'GET',
          url: `/api/freelancer/${ProjectApplications[0]?.freelancerId?._id}`
        }).as('getFreelancerRequest')
        cy.contains('Hire User').should('be.visible').click()
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.wait('@getFreelancerRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
        cy.url().should('include', '/hire')

        cy.get('#projects_dropdown').type('{downarrow}', { delay: 100 })
        cy.contains(SelectedBusiness?.name).click()

        cy.get('#send_message').type(`You're Hired! Welcome to ${SelectedBusiness?.name}`)
        cy.get('#job_type').type(`Contract`)
        cy.get('#hours_rate').type(20)
        cy.get('#currency').click()
        cy.contains('EUR').click({ force: true })
        cy.contains('EUR').click({ force: true })
        cy.contains('USD').click({ force: true })
        cy.get('#tracking_hours').type(40, { force: true })
      })
    cy.window()
      .its('store')
      .then(store => {
        const Name = store.getState().Freelancers?.selectedFreelancer?.userId?.FirstName
        cy.contains(`Hire ${Name ?? ''}`)
          .should('be.visible')
          .click()
        cy.intercept('GET', `/api/contract/current?limit=all&isActive=true`).as('getContractsRequest')
        cy.intercept('GET', `/api/invoice/fetch/unpaid`).as('getInvoiceRequest')
        cy.intercept('GET', `/api/business/*`).as('getProjectRequest')

        cy.contains('Connect. Build. grow').should('not.exist')

        cy.url().should('include', '/recurring-payment')

        cy.wait('@getContractsRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
        cy.wait('@getInvoiceRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
        cy.wait('@getProjectRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })

    cy.get(`#employee_card`)
      .within(() => {})
      .should('be.visible')
    cy.window()
      .its('store')
      .then(store => {
        const State = store.getState()
        const activeContracts = State.Contracts.activeContracts
        if (activeContracts?.length) {
          const calcAmtOwed = data => {
            let amount = 0
            State?.Invoices?.unpaidInvoices?.forEach(item => {
              if (item.freelancerId === data.freelancerId._id) {
                amount += item.hourlyRate * item.hoursWorked
              }
            })
            return amount
          }
          activeContracts?.forEach(contract => {
            cy.get(`#contract_${contract?._id}`)
              .within(() => {
                cy.contains(
                  ValidationUtils.truncate(
                    ValidationUtils._toUpper(
                      `${contract?.freelancerId?.userId?.FirstName} ${contract?.freelancerId?.userId?.LastName}`
                    ),
                    15
                  )
                )
                cy.contains(`$ ${contract?.hourlyRate ?? 0}.00`)
                cy.contains(contract?.hoursLimit ?? 0)
              })
              .should('be.visible')
          })
        }

        const calcTotalPotentialCost = () => {
          let total = 0
          State.Contracts.activeContracts?.forEach(item => {
            if (item.hourlyRate && item.hoursLimit) {
              total += item.hourlyRate * item.hoursLimit
            }
          })
          return total
        }

        cy.get('#charged_amount').should('contain', `$${calcTotalPotentialCost().toLocaleString()}.00 USD`)

        cy.get('#address_update_button')
          .should('contain', `${State.Business.selectedBusiness?._id ? 'Update' : 'Add'}`)
          .click()

        cy.get(`#business_address`)
          .within(() => {
            const BusinessCountry = faker.location.country()
            const BusinessFirstName = faker.string.alpha(5)
            const BusinessLastName = faker.string.alpha(5)
            const BusinessAddressLineOne = faker.location.streetAddress()
            const BusinessAddressLineTwo = faker.location.secondaryAddress()
            const BusinessCity = faker.location.city()
            const BusinessState = faker.location.state()
            const BusinessZip = faker.location.zipCode()
            const BusinessPhone = faker.phone.number()
            cy.get('#businessCountry').clear().type(BusinessCountry)
            cy.get('#businessFirstName').clear().type(BusinessFirstName)
            cy.get('#businessLastName').clear().type(BusinessLastName)
            cy.get('#businessAddressLineOne').clear().type(BusinessAddressLineOne)
            cy.get('#businessAddressLineTwo').clear().type(BusinessAddressLineTwo)
            cy.get('#businessCity').clear().type(BusinessCity)
            cy.get('#businessState').clear().type(BusinessState)
            cy.get('#businessZip').clear().type(BusinessZip)
            cy.get('#businessPhone').clear().type(BusinessPhone)
            cy.intercept({
              method: 'POST',
              url: `/api/business/update`
            }).as('updateBusinessRequest')
            cy.contains('button', 'SAVE ADDRESS').should('be.visible').click()

            cy.wait('@updateBusinessRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
          })
          .should('be.visible')
        cy.get('#loading_spinner').should('be.visible')
        cy.get('#adress_done_image')
          .should('have.attr', 'src')
          .and('include', 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671323871/verifiedCheck_w902qa.png')

        cy.get(`#payment_method_form`).within(() => {
          cy.contains('button', 'Add').should('be.visible').click()

          const Country = faker.location.country()
          const FirstName = faker.person.firstName()
          const LastName = faker.person.lastName()
          const AddressLineOne = faker.location.streetAddress()
          const AddressLineTwo = faker.location.secondaryAddress()
          const City = faker.location.city()
          const State = faker.location.state()
          const Zip = faker.location.zipCode()
          cy.get('#country').clear().type(Country)
          cy.get('#firstName').clear().type(FirstName)
          cy.get('#lastName').clear().type(LastName)
          cy.get('#addressLineOne').clear().type(AddressLineOne)
          cy.get('#addressLineTwo').clear().type(AddressLineTwo)
          cy.get('#city').clear().type(City)
          cy.get('#state').clear().type(State)
          cy.get('#zipCode').clear().type(Zip)
        })
        cy.intercept({
          method: 'POST',
          url: `/api/contract/create`
        }).as('createContractRequest')
        cy.contains('button', 'update payment terms').should('be.visible').click()

        cy.wait('@createContractRequest').then(interception => {
          if (interception.response.statusCode === 400 && interception.response?.body?.msg) {
            cy.contains(interception.response?.body?.msg).scrollIntoView().should('be.visible')
          } else {
            expect(interception.response.statusCode).to.be.oneOf([200, 304])
          }
        })
      })
  })
})
