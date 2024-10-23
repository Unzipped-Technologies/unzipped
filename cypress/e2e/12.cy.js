import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'
import { RECENT_SKILLS, SORT_OPTIONS } from '../../utils/constants'

describe('Freelancers Page', () => {
  const getResultMessage = (freelancerList, skip, take, totalCount) => {
    if (freelancerList?.length === 0) {
      return '0 result'
    } else if (freelancerList?.length === 1) {
      return '1 result'
    } else if (skip === 0) {
      return `1 - ${freelancerList?.length} ${totalCount > take ? `of ${totalCount} results` : `results`}`
    }
  }
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000/freelancers')
    cy.contains('Connect. Build. grow').should('not.exist')
  })

  it('Verify freelancers are rendering correctly', () => {
    cy.window()
      .its('store')
      .then(store => {
        const FreelancerList = store.getState()?.Freelancers?.freelancers
        const TotalCount = store.getState()?.Freelancers?.totalCount
        const userId = store.getState()?.Auth?.user?._id

        cy.contains('Top Results')
        cy.contains(getResultMessage(FreelancerList, 0, 'all', TotalCount))
        FreelancerList?.forEach((freelancer, index) => {
          cy.get(`[data-testid="${freelancer?._id}"]`)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              cy.contains(`${freelancer?.user?.FirstName ?? ''} ${freelancer?.user?.LastName ?? ''}`)
              cy.get('#freelancer_type').should('have.text', freelancer?.category)
              cy.get('#rate').should('have.text', freelancer?.rate > 0 ? `$${freelancer?.rate}` : 'Negotiable')
              if (freelancer?.likeTotal > 0) {
                cy.contains(
                  `${freelancer.likeTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}  UPVOTES BY CLIENTS `
                ).should('be.visible')
              }
              if (freelancer?.cover) {
                cy.contains(freelancer.cover).should('be.visible')
              }
              cy.contains('button', 'View Profile').should('be.visible')
              cy.get(`[data-testid="open_${userId}_list_modal"]`)

              cy.get(
                `img[src*="${
                  item?.user?.profileImage ||
                  'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
                }"]`
              )
                .scrollIntoView()
                .should('be.visible')
                .should('have.attr', 'src')
                .then(src => {
                  expect(src).to.include(
                    item?.user?.profileImage ||
                      'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
                  )
                })
              if (userId && userId !== user.userId) {
                cy.get(`#open_${user.userId}_list_modal`).scrollIntoView().should('be.visible')
              }
            })
        })
      })
  })
  it('Implement fiters on freelancers', () => {
    cy.intercept('POST', `/api/freelancer/public/list`).as('getFreelancersRequest')

    cy.get(`[data-testid="desktop_filters"]`).within(() => {
      cy.contains('Filters').should('be.visible')
      cy.contains('Sort By').should('be.visible')
      cy.get('#sort_by').should('be.visible')

      cy.get('#sort_by').within(() => {
        // Check that there are 3 options
        cy.get('option').should('have.length', SORT_OPTIONS?.length)
        SORT_OPTIONS?.forEach(category => {
          cy.contains(category?.text).should('be.visible')
        })
      })

      cy.get('#sort_by').select(SORT_OPTIONS?.[1]?.text)
      cy.wait('@getFreelancersRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })

      cy.get(`[data-testid="clear_sort_filter"]`).should('be.visible').click()
      cy.wait('@getFreelancersRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })

      cy.contains('Rate').should('be.visible')
      cy.get('#minRate').clear().type(10)
      cy.get('#maxRate').clear().type(100)
      cy.get('#maxRate').type('{enter}')
      cy.wait('@getFreelancersRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })

      cy.get(`[data-testid="clear_rates"]`).should('be.visible').click()

      cy.contains('Skills').should('be.visible')

      cy.get('#skill_name').clear().type('cs')

      cy.get(`[data-testid="css_suggestion"]`).should('be.visible').click()
      cy.wait('@getFreelancersRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })
      cy.get(`[data-testid="clear_skills"]`).should('be.visible').click()
      cy.wait('@getFreelancersRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })
      RECENT_SKILLS?.forEach((skill, index) => {
        cy.get(`[data-testid="${skill.value}_${index}"]`).should('be.visible')
        cy.contains(skill.label).should('be.visible')
      })
      cy.get(`[data-testid="${RECENT_SKILLS[0].value}_${0}"]`).should('be.visible').click()
      cy.wait('@getFreelancersRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })
      cy.get(`[data-testid="clear_skills"]`).should('be.visible').click()
      cy.wait('@getFreelancersRequest').then(interception => {
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      })
    })
  })
})
