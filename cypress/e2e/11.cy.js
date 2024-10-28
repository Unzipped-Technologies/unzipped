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
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('/projects')
    cy.contains('Connect. Build. grow').should('not.exist')
  })

  after(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('Verify projects are rendering correctly', () => {
    cy.window()
      .its('store')
      .then(store => {
        const Projects = store.getState()?.Business?.projectList
        const TotalCount = store.getState()?.Business?.totalCount
        const FreelancerId = store.getState()?.Auth?.user?.freelancers?._id

        cy.contains('Top Results')
        cy.contains(getResultMessage(Projects, 0, 'all', TotalCount))
        Projects?.forEach((project, index) => {
          cy.get(`#${project._id}_desktop`)
            .scrollIntoView()
            .should('be.visible')
            .within(() => {
              if (project?.projectImagesUrl?.length) {
                cy.get(`img[src*="${project?.projectImages?.[0]?.url}"]`)
                  .scrollIntoView()
                  .should('be.visible')
                  .should('have.attr', 'src')
                  .then(src => {
                    expect(src).to.include(project?.projectImages?.[0]?.url)
                  })
              }
              if (project?.applicants?.includes(FreelancerId)) {
                cy.contains('button', 'Applied').should('be.visible')
              }
              cy.contains(ValidationUtils.truncate(project?.name, 240))
              cy.get(`[data-testid="${project?._id}_country"]`).should('have.text', project?.businessCountry)
              cy.contains(`Estimated Rate: ${project?.budgetRange ?? 0}`)
              cy.get(`[data-testid="${project?._id}description"]`).should('have.text', project?.description)
              cy.get(`[data-testid="required_skill"]`).within(() => {
                project?.requiredSkills?.forEach(skill => {
                  cy.contains(ValidationUtils.truncate(skill, 10))
                })
              })
              cy.contains('button', 'View Project')
              cy.contains(`${project?.likeTotal ?? 0} Upvotes by Freelancers`)
            })
        })
      })
  })
  it('Implement fiters on projects', () => {
    cy.intercept('POST', `/api/business/public/list`).as('getProjectsRequest')

    cy.window()
      .its('store')
      .then(store => {
        const Projects = store.getState()?.Business?.projectList ?? []
        if (Projects?.length > 0) {
          cy.get(`[data-testid="desktop_filters"]`).within(() => {
            cy.contains('Filters').should('be.visible')
            cy.contains('Project type').should('be.visible')
            cy.contains('Project type').should('be.visible')
            BUDGET_TYPE?.forEach(type => {
              cy.contains(type).should('be.visible')
              cy.get(`[data-testid="${type}"]`).should('have.text', '')
            })
            cy.contains(BUDGET_TYPE[0]).should('be.visible').click()
            cy.wait('@getProjectsRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
            cy.contains(BUDGET_TYPE?.[1]).should('be.visible').click()
            cy.wait('@getProjectsRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })

            cy.get(`[data-testid="clear_type_filter"]`).should('be.visible').click()
            cy.wait('@getProjectsRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })

            cy.contains('Rate').should('be.visible')
            cy.get('#minRate').clear().type(10)
            cy.get('#maxRate').clear().type(100)
            cy.get('#maxRate').type('{enter}')
            cy.wait('@getProjectsRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })

            cy.get(`[data-testid="clear_rates"]`).should('be.visible').click()

            cy.contains('Skills').should('be.visible')

            cy.get('#skill_name').clear().type('cs')

            cy.get(`[data-testid="css_suggestion"]`).should('be.visible').click()
            cy.wait('@getProjectsRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
            cy.get(`[data-testid="clear_skills"]`).should('be.visible').click()
            cy.wait('@getProjectsRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
            RECENT_SKILLS?.forEach((skill, index) => {
              cy.get(`[data-testid="${skill.value}_${index}"]`).should('be.visible')
              cy.contains(skill.label).should('be.visible')
            })
            cy.get(`[data-testid="${RECENT_SKILLS[0].value}_${0}"]`).should('be.visible').click()
            cy.wait('@getProjectsRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
            cy.get(`[data-testid="clear_skills"]`).should('be.visible').click()
            cy.wait('@getProjectsRequest').then(interception => {
              expect(interception.response.statusCode).to.be.oneOf([200, 304])
            })
          })
        }
      })
  })
})
