import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'

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
      })
  })

  // it('View project detail,project applications, freelancer profile and verify freelancer data', () => {
  //   cy.intercept('POST', `/api/business/list`).as('getProjectsRequest')
  //   cy.contains('My Projects').should('be.visible').click()

  //   cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

  //   cy.wait('@getProjectsRequest', { timeout: 10000 }).then(interception => {
  //     expect(interception.response.statusCode).to.eq(200)

  //     cy.window()
  //       .its('store')
  //       .then(store => {
  //         reduxStore = store
  //         cy.wrap(store).as('reduxStore') // Store reduxStore as an alias
  //       })
  //   })

  //   cy.get('@reduxStore').then(store => {
  //     // Now you have access to reduxStore
  //     const ProjectsList = store.getState().Business.projectList
  //     const userId = store.getState().Auth.user._id
  //     const selectedProject = ProjectsList[0]

  //     cy.intercept('GET', `/api/business/${selectedProject?._id}`).as('getProjectDetailsRequest')
  //     cy.intercept('GET', `/api/contract/count/${userId}`).as('clientContractsRequest')

  //     cy.get(`#${selectedProject?._id}`).contains(ValidationUtils.truncate(selectedProject.name, 40)).click()
  //     cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

  //     cy.wait('@getProjectDetailsRequest').then(interception => {
  //       expect(interception.response.statusCode).to.eq(200)

  //       cy.window()
  //         .its('store')
  //         .then(store => {
  //           reduxStore = store
  //           cy.wrap(store).as('reduxStore') // Store reduxStore as an alias
  //           const SelectedProject = store.getState().Business.selectedBusiness
  //           cy.contains(SelectedProject?.name)
  //           cy.contains(SelectedProject?.projectType)

  //           SelectedProject?.requiredSkills?.forEach(skill => {
  //             cy.contains(skill)
  //           })
  //           cy.contains(SelectedProject?._id)
  //           if (SelectedProject?.goals) {
  //             cy.contains(SelectedProject?.goals)
  //           }
  //         })
  //     })

  //     cy.wait('@clientContractsRequest').then(interception => {
  //       expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //     })

  //     cy.intercept(
  //       'GET',
  //       `/api/projectApplication?projectId=${selectedProject?._id}&freelancerId=&limit=all&page=1`
  //     ).as('getApplicationsRequest')

  //     cy.get('#desktop_project_detail_tabs').contains('Applications').click()
  //     cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

  //     cy.wait('@getApplicationsRequest', { timeout: 100000 }).then(interception => {
  //       expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //     })
  //   })

  //   cy.window()
  //     .its('store')
  //     .then(store => {
  //       reduxStore = store
  //       cy.wrap(store).as('reduxStore') // Store reduxStore as an alias
  //       const ProjectApplications = store.getState().ProjectApplications.projectApplications

  //       ProjectApplications?.forEach(application => {
  //         cy.get(`#application_${application._id}`).within(() => {
  //           if (application.freelancerId.userId.profileImage) {
  //             cy.get('img') // Get the first image on the page
  //               .should('have.attr', 'src')
  //               .and('include', application.freelancerId.userId.profileImage)
  //           } else {
  //             cy.get(`#no_profile_image`).contains(
  //               application?.freelancerId?.userId?.FirstName?.[0] ?? application?.freelancerId?.userId?.LastName?.[0]
  //             )
  //           }
  //           cy.contains('button', 'Invited').should('be.visible')
  //           cy.contains('button', 'View Profile').should('be.visible')
  //           application?.freelancerId?.freelancerSkills?.forEach(skill => {
  //             cy.contains(skill.skill)
  //           })
  //           cy.contains(
  //             ConverterUtils.capitalize(
  //               `${application?.freelancerId?.userId?.FirstName} ${application?.freelancerId?.userId?.LastName}`
  //             )
  //           ).should('be.visible')
  //           cy.contains(`${application?.freelancerId?.likeTotal || 0} UPVOTES BY CLIENTS`)
  //           cy.get('#application_actions').click()
  //         })
  //         cy.contains('Hire User', { timeout: 6000 }).should('be.visible')
  //         cy.contains('View Application', { timeout: 6000 }).should('be.visible')
  //         cy.contains('Dismiss Application', { timeout: 6000 }).should('be.visible')
  //       })
  //       const Application = ProjectApplications[0]
  //       cy.get(`#application_${Application._id}`).within(() => {
  //         cy.intercept('GET', `/api/freelancer/${Application?.freelancerId?._id}`).as('getFreelancerRequest')

  //         cy.contains('button', 'View Profile', { timeout: 7000 }).should('be.visible').click({ force: true })
  //         cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

  //         cy.url({ timeout: 60000 }).should('include', `/freelancers/${Application?.freelancerId?._id}`)
  //         cy.wait('@getFreelancerRequest', { timeout: 20000 }).then(interception => {
  //           expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //         })
  //       })
  //     })
  //   cy.window()
  //     .its('store')
  //     .then(store => {
  //       reduxStore = store
  //       cy.wrap(store).as('reduxStore') // Store reduxStore as an alias
  //       const selectedFreelancer = store.getState().Freelancers?.selectedFreelancer
  //       cy.get('#freelancer_profile', { timeout: 10000 })
  //         .should('be.visible')
  //         .within(() => {
  //           if (selectedFreelancer?.userId?.profileImage) {
  //             cy.get('img') // Get the first image on the page
  //               .should('have.attr', 'src')
  //               .and('include', selectedFreelancer?.userId?.profileImage)
  //           }

  //           if (selectedFreelancer?.userId?.FirstName && selectedFreelancer?.userId?.LastName) {
  //             cy.contains(
  //               ConverterUtils.capitalize(
  //                 `${selectedFreelancer?.userId?.FirstName} ${selectedFreelancer?.userId?.LastName}`
  //               )
  //             )
  //           }
  //           selectedFreelancer?.freelancerSkills?.forEach(skill => {
  //             cy.get(`#freelancer_skills`).within(() => {
  //               cy.contains(skill.skill)
  //             })
  //           })
  //           if (selectedFreelancer?.likeTotal > 0) {
  //             cy.contains(
  //               `${selectedFreelancer?.likeTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} UPVOTES BY CLIENTS`
  //             )
  //           }
  //           if (selectedFreelancer?.rate > 0) {
  //             cy.contains(`$${selectedFreelancer?.rate.toFixed(2)} / HOUR`)
  //           } else {
  //             cy.contains(`Negotiable`)
  //           }
  //           selectedFreelancer?.isIdentityVerified == 'SUCCESS' && cy.contains('Identity Verified')
  //           selectedFreelancer?.isEmailVerified && cy.contains('Email Verified')
  //           selectedFreelancer?.isPreferedFreelancer && cy.contains('Preferred Verified')
  //           selectedFreelancer?.isPhoneVerified && cy.contains('Phone Verified')
  //         })

  //       cy.get('#freelancer_info', { timeout: 10000 })
  //         .should('be.visible')
  //         .within(() => {
  //           selectedFreelancer?.projects?.forEach(project => {
  //             cy.contains(project?.projectName ?? 'Project Name')
  //             project?.skills?.forEach(skill => {
  //               cy.contains(skill)
  //             })
  //             project?.images?.forEach(image => {
  //               cy.get('img') // Get the first image on the page
  //                 .should('have.attr', 'src')
  //                 .and('include', image?.url)
  //             })
  //           })
  //           selectedFreelancer?.education?.forEach(edu => {
  //             cy.contains(edu?.title)
  //             cy.contains(edu?.institute)
  //             cy.contains(`${edu?.startYear} - ${edu?.endYear} (${+edu?.endYear - +edu?.startYear} years)`)
  //           })
  //         })
  //     })
  // })
  // it('Add freelancers to list', () => {
  //   const UserId = reduxStore.getState()?.Auth?.user?._id
  //   cy.intercept('GET', `/api/list-entries/users-list/${UserId}`).as('getListsRequest')
  //   cy.intercept('GET', `/api/list-entries/find-by-id/*`).as('getListEntriesRequest')
  //   cy.contains('Lists').click()
  //   cy.url({ timeout: 60000 }).should('include', '/dashboard/lists')

  //   cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

  //   // // Wait for the login request and verify success
  //   cy.wait('@getListsRequest', { timeout: 6000 }).then(interception => {
  //     expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //   })

  //   cy.wait('@getListEntriesRequest', { timeout: 6000 }).then(interception => {
  //     expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //   })

  //   cy.window()
  //     .its('store')
  //     .then(store => {
  //       reduxStore = store
  //       const Lists = reduxStore.getState()?.ListEntries?.userLists
  //       const selectedList = Lists?.find(list => list.listEntries?.length <= 0)
  //       if (selectedList?._id) {
  //         cy.contains(selectedList?.name).click()
  //         cy.wait('@getListEntriesRequest', { timeout: 6000 }).then(interception => {
  //           expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //         })

  //         cy.contains('button', 'Browse Freelancers', { timeout: 6000 }).click()

  //         cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

  //         cy.intercept('POST', `/api/freelancer/public/list`).as('getFreelancersRequest')

  //         cy.url({ timeout: 60000 }).should('include', '/freelancers')

  //         cy.wait('@getFreelancersRequest', { timeout: 6000 }).then(interception => {
  //           expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //         })
  //       }
  //     })

  //   cy.window()
  //     .its('store')
  //     .then(store => {
  //       const FreelancersList = store.getState().Freelancers?.freelancers
  //       const Freelanncer1 = FreelancersList[0]

  //       cy.intercept('POST', `/api/list/list`).as('getAllListsRequest')

  //       cy.get(`#freelancer_${Freelanncer1?._id}`)
  //         .should('be.visible')
  //         .within(() => {
  //           cy.get(`#open_${Freelanncer1?.user?._id}_list_modal`).click()
  //         })
  //       cy.get(`#${Freelanncer1?.user?._id}_list_modal`).should('be.visible')
  //       cy.wait('@getAllListsRequest', { timeout: 6000 }).then(interception => {
  //         expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //       })
  //       cy.contains(`Add User To A List`).click()

  //       let InvitesList = store.getState().Lists?.invitesList
  //       let ListToAdd = InvitesList?.find(list => list?.listEntries <= 0)
  //       cy.intercept('PATCH', `/api/list/add-entry/${ListToAdd?._id}`).as('addToListRequest')
  //       cy.contains(ListToAdd?.name).click()
  //       cy.wait('@addToListRequest', { timeout: 6000 }).then(interception => {
  //         expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //         cy.get(`#${Freelanncer1?.user?._id}_list_modal`).should('not.exist')
  //       })

  //       const Freelanncer2 = FreelancersList[1]

  //       cy.get(`#freelancer_${Freelanncer2?._id}`)
  //         .should('be.visible')
  //         .within(() => {
  //           cy.get(`#open_${Freelanncer2?.user?._id}_list_modal`).click()
  //         })
  //       cy.get(`#${Freelanncer2?.user?._id}_list_modal`).should('be.visible')

  //       cy.wait('@getAllListsRequest', { timeout: 6000 }).then(interception => {
  //         expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //       })
  //       cy.contains(`Add User To A List`).click()

  //       InvitesList = store.getState().Lists?.invitesList
  //       ListToAdd = InvitesList?.find(list => list?.listEntries <= 0)
  //       cy.intercept('PATCH', `/api/list/add-entry/${ListToAdd?._id}`).as('addToListRequest')
  //       cy.contains(ListToAdd?.name).click()
  //       cy.wait('@addToListRequest', { timeout: 6000 }).then(interception => {
  //         expect(interception.response.statusCode).to.be.oneOf([200, 304])
  //         cy.get(`#${Freelanncer2?.user?._id}_list_modal`).should('not.exist')
  //       })
  //     })
  // })
  it('View Freelancer application and hire him.', () => {
    cy.intercept('POST', `/api/business/list`).as('getProjectsRequest')
    cy.contains('My Projects').should('be.visible').click()

    cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

    cy.wait('@getProjectsRequest', { timeout: 10000 }).then(interception => {
      expect(interception.response.statusCode).to.eq(200)
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

        cy.get(`#${selectedProject?._id}`).contains(ValidationUtils.truncate(selectedProject.name, 40)).click()
        cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

        cy.wait('@getProjectDetailsRequest').then(interception => {
          expect(interception.response.statusCode).to.eq(200)
        })

        cy.wait('@clientContractsRequest').then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })

        cy.intercept(
          'GET',
          `/api/projectApplication?projectId=${selectedProject?._id}&freelancerId=&limit=all&page=1`
        ).as('getApplicationsRequest')

        cy.get('#desktop_project_detail_tabs', { timeout: 6000 }).contains('Applications').click()
        cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

        cy.wait('@getApplicationsRequest', { timeout: 100000 }).then(interception => {
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

        cy.get(`#application_${ProjectApplications[0]._id}`).within(() => {
          cy.get('#application_actions').click()
        })
        cy.intercept({
          method: 'GET',
          url: `/api/freelancer/${ProjectApplications[0]?.freelancerId?._id}`
        }).as('getFreelancerRequest')
        cy.contains('Hire User', { timeout: 6000 }).should('be.visible').click()
        cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

        cy.wait('@getFreelancerRequest', { timeout: 100000 }).then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
        cy.url({ timeout: 60000 }).should('include', '/hire')

        cy.get('#projects_dropdown', { timeout: 6000 }).type('{downarrow}', { delay: 100 })
        cy.contains(SelectedBusiness?.name).click()

        cy.get('#send_message').type(`You're Hired! Welcome to ${SelectedBusiness?.name}`)
        cy.get('#job_type').type(`Contract`)
        cy.get('#hours_rate').type(20)
        cy.get('#currency').click()
        cy.contains('EUR', { timeout: 5000 }).click({ force: true })
        cy.contains('EUR', { timeout: 5000 }).click({ force: true })
        cy.contains('USD', { timeout: 5000 }).click({ force: true })
        cy.get('#tracking_hours', { timeout: 6000 }).type(40, { force: true })
      })
    cy.window()
      .its('store')
      .then(store => {
        const Name = store.getState().Freelancers?.selectedFreelancer?.userId?.FirstName
        cy.contains(`Hire ${Name ?? ''}`, { timeout: 6000 })
          .should('be.visible')
          .click()
        cy.intercept('GET', `/api/contract/current?limit=all&isActive=true`).as('getContractsRequest')
        cy.intercept('GET', `/api/invoice/fetch/unpaid`).as('getInvoiceRequest')
        cy.intercept('GET', `/api/business/*`).as('getProjectRequest')

        cy.contains('Connect. Build. grow', { timeout: 100000 }).should('not.exist')

        cy.url({ timeout: 100000 }).should('include', '/recurring-payment')

        cy.wait('@getContractsRequest', { timeout: 100000 }).then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
        cy.wait('@getInvoiceRequest', { timeout: 100000 }).then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
        cy.wait('@getProjectRequest', { timeout: 100000 }).then(interception => {
          expect(interception.response.statusCode).to.be.oneOf([200, 304])
        })
      })
  })
})
