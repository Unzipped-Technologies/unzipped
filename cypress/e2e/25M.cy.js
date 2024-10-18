import { faker } from '@faker-js/faker'
import { ValidationUtils } from '../../utils'
import { ConverterUtils } from '../../utils'
import { BUDGET_TYPE, RECENT_SKILLS, SORT_OPTIONS } from '../../utils/constants'

describe('Projects Page', () => {
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

    cy.visit('http://localhost:3000') // Visit the login page
    cy.contains('Connect. Build. grow').should('not.exist')
  })

  beforeEach(() => {
    cy.viewport(480, 896)
  })

  it('Verify projects are rendering correctly', () => {
    cy.intercept('POST', '/api/business/public/list').as('getProjectsRequest')

    cy.get('#mobile_menu_icon').should('be.visible').click()
    cy.get(`#mobile_menu_1`).click()
    cy.get(`#mobile_menu_1`).within(() => {
      cy.contains('Browse projects that match your skills').click()
    })

    cy.contains('Connect. Build. grow').should('not.exist')
    cy.url().should('include', '/projects')

    cy.wait('@getProjectsRequest').then(interception => {
      expect(interception.response.statusCode).to.be.oneOf([200, 304])
    })

    cy.window()
      .its('store')
      .then(store => {
        const Projects = store.getState()?.Business?.projectList
        const TotalCount = store.getState()?.Business?.totalCount

        cy.contains('Top Results').should('be.visible')
        cy.contains(getResultMessage(Projects, 0, 'all', TotalCount)).should('be.visible')
        Projects?.forEach((project, index) => {
          cy.get(`#${project._id}_mobile`)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              if (project?.projectImagesUrl?.length) {
                cy.get(`img[src*="${project?.projectImagesUrl?.[0]?.url}"]`)
                  .scrollIntoView()
                  .should('be.visible')
                  .should('have.attr', 'src')
                  .then(src => {
                    expect(src).to.include(project?.projectImagesUrl?.[0]?.url)
                  })
              }
              cy.contains(ValidationUtils.truncate(project?.name, 40))
              cy.get(`[data-testid="${project?._id}_country"]`).should('have.text', project?.businessCountry)
              cy.get(`[data-testid="${project?._id}description"]`).should('have.text', project?.description)
              cy.get(`[data-testid="required_skill"]`).within(() => {
                project?.requiredSkills?.forEach(skill => {
                  cy.contains(skill)
                })
              })
              cy.contains('button', 'VIEW PROJECT')
            })
        })
      })
  })
  it('Implement fiters on projects', () => {
    cy.intercept('POST', `/api/business/public/list`).as('getProjectsRequest')
    cy.get('[data-testid="toggle_filter"]').should('be.visible').click()

    cy.get(`[data-testid="mobile_filters"]`).within(() => {
      cy.contains('Filters').should('be.visible')
      cy.contains('Project type').should('be.visible')
      BUDGET_TYPE?.forEach(type => {
        cy.contains(type).should('be.visible')
        cy.get(`[data-testid="${type}"]`).should('have.text', '')
      })
      cy.contains(BUDGET_TYPE[0]).should('be.visible').click()
      cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()
    })

    cy.wait('@getProjectsRequest').then(interception => {
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

    cy.contains(BUDGET_TYPE?.[1]).should('be.visible').click()
    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()
    cy.wait('@getProjectsRequest').then(interception => {
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
    cy.get(`[data-testid="clear_type_filter"]`).should('be.visible').click()
    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()

    cy.wait('@getProjectsRequest').then(interception => {
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
    cy.contains('Rate').should('be.visible')
    cy.get('#minRate').clear().type(10)
    cy.get('#maxRate').clear().type(100)

    cy.contains('button', 'SEE RESULTS').scrollIntoView().should('be.visible').click()

    cy.wait('@getProjectsRequest').then(interception => {
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

    cy.wait('@getProjectsRequest').then(interception => {
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

    cy.wait('@getProjectsRequest').then(interception => {
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
    cy.wait('@getProjectsRequest').then(interception => {
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

    cy.wait('@getProjectsRequest').then(interception => {
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

    cy.wait('@getProjectsRequest').then(interception => {
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
