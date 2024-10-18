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
    cy.viewport(480, 896)

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000')
    cy.contains('Connect. Build. grow').should('not.exist')
  })

  beforeEach(() => {
    cy.viewport(480, 896)
  })

  it('Verify freelancers are rendering correctly', () => {
    cy.intercept('POST', '/api/freelancer/public/list').as('getFreelancersRequest')

    cy.get('#mobile_menu_icon').should('be.visible').click()
    cy.get(`#mobile_menu_0`).click()
    cy.get(`#mobile_menu_0`).within(() => {
      cy.contains('Search freelancers').click()
    })

    cy.contains('Connect. Build. grow').should('not.exist')
    cy.url().should('include', '/freelancers')

    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        const FreelancerList = store.getState()?.Freelancers?.freelancers
        const TotalCount = store.getState()?.Freelancers?.totalCount
        const userId = store.getState()?.Auth?.user?._id

        cy.contains('Top Results')
        cy.contains(getResultMessage(FreelancerList, 0, 'all', TotalCount))
        FreelancerList?.forEach((freelancer, index) => {
          cy.get(`#freelancer_${freelancer?._id}`)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              cy.contains(`${freelancer?.user?.FirstName ?? ''} ${freelancer?.user?.LastName ?? ''}`)
              cy.get('#freelancer_category').should('have.text', freelancer?.category)
              cy.get('#freelancer_country').should('have.text', freelancer?.user?.AddressLineCountry || 'United States')
              cy.get('#freelancer_rate').should(
                'contains.text',
                freelancer?.rate > 0 ? `$${freelancer?.rate}` : 'Negotiable'
              )
              cy.get('#freelancer_votes').should('have.text', freelancer?.likes?.length ?? 0)

              cy.get(
                `img[src*="${
                  freelancer?.user?.profileImage ||
                  'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
                }"]`
              )
                .scrollIntoView()
                .should('be.visible')
                .should('have.attr', 'src')
                .then(src => {
                  expect(src).to.include(
                    freelancer?.user?.profileImage ||
                      'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
                  )
                })
              cy.contains('button', 'VIEW PROFILE').should('be.visible')
            })
        })
      })
  })
  it('Implement fiters on freelancers', () => {
    cy.intercept('POST', `/api/freelancer/public/list`).as('getFreelancersRequest')
    cy.get('[data-testid="toggle_filter"]').should('be.visible').click()

    cy.get(`select[name="sort_options"]`).should('be.visible').select(SORT_OPTIONS[1].text)

    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()
    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      cy.contains(
        getResultMessage(interception.response.body.limitedRecords, 0, 'all', interception.response.body.totalCount)
      ).should('be.visible')
    })

    cy.get('[data-testid="toggle_filter"]').should('be.visible').click()

    cy.get(`select[name="sort_options"]`).should('be.visible').select(SORT_OPTIONS[2].text)
    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()
    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      cy.contains(
        getResultMessage(interception.response.body.limitedRecords, 0, 'all', interception.response.body.totalCount)
      ).should('be.visible')
    })

    cy.get('[data-testid="toggle_filter"]').should('be.visible').click()

    cy.get(`select[name="sort_options"]`).should('be.visible').select(SORT_OPTIONS[3].text)
    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()
    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      cy.contains(
        getResultMessage(interception.response.body.limitedRecords, 0, 'all', interception.response.body.totalCount)
      ).should('be.visible')
    })

    cy.get('[data-testid="toggle_filter"]').should('be.visible').click()

    cy.get(`select[name="sort_options"]`).should('be.visible').select(SORT_OPTIONS[4].text)
    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()
    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      cy.contains(
        getResultMessage(interception.response.body.limitedRecords, 0, 'all', interception.response.body.totalCount)
      ).should('be.visible')
    })

    cy.get('[data-testid="toggle_filter"]').should('be.visible').click()
    cy.contains('Rate').should('be.visible')
    cy.get('#minRate').clear().type(10)
    cy.get('#maxRate').clear().type(100)

    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()

    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      cy.contains(
        getResultMessage(
          interception.response.body.limitedRecords,
          0,
          'all',
          interception.response.body.totalCount[0]?.count
        )
      ).should('be.visible')
    })

    cy.get('[data-testid="toggle_filter"]').should('be.visible').click()

    cy.get(`[data-testid="clear_rates"]`).should('be.visible').click()
    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()

    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      cy.contains(
        getResultMessage(
          interception.response.body.limitedRecords,
          0,
          'all',
          interception.response.body.totalCount[0]?.count
        )
      ).should('be.visible')
    })

    cy.get('[data-testid="toggle_filter"]').should('be.visible').click()

    cy.contains('Skills').should('be.visible')

    cy.get('#skill_name').clear().type('cs')

    cy.get(`[data-testid="css_suggestion"]`).should('be.visible').click()
    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()

    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      cy.contains(
        getResultMessage(
          interception.response.body.limitedRecords,
          0,
          'all',
          interception.response.body.totalCount[0]?.count
        )
      ).should('be.visible')
    })

    cy.get('[data-testid="toggle_filter"]').should('be.visible').click()

    cy.get(`[data-testid="clear_skills"]`).should('be.visible').click()
    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()
    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      cy.contains(
        getResultMessage(
          interception.response.body.limitedRecords,
          0,
          'all',
          interception.response.body.totalCount[0]?.count
        )
      ).should('be.visible')
    })

    cy.get('[data-testid="toggle_filter"]').should('be.visible').click()

    RECENT_SKILLS?.forEach((skill, index) => {
      cy.get(`[data-testid="${skill.value}_${index}"]`).should('be.visible')
      cy.contains(skill.label).should('be.visible')
    })
    cy.get(`[data-testid="${RECENT_SKILLS[0].value}_${0}"]`).should('be.visible').click()
    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()

    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      cy.contains(
        getResultMessage(
          interception.response.body.limitedRecords,
          0,
          'all',
          interception.response.body.totalCount[0]?.count
        )
      ).should('be.visible')
    })
    cy.get('[data-testid="toggle_filter"]').should('be.visible').click()

    cy.get(`[data-testid="clear_skills"]`).should('be.visible').click()
    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()

    cy.wait('@getFreelancersRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
      cy.contains(
        getResultMessage(
          interception.response.body.limitedRecords,
          0,
          'all',
          interception.response.body.totalCount[0]?.count
        )
      ).should('be.visible')
    })
  })
})