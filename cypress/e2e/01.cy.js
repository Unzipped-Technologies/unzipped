import { faker } from '@faker-js/faker'
import { createPaymentMethod } from '../../redux/actions'
import { ValidationUtils } from '../../utils/index'
import { paymentFrequencyEnum, planEnum } from '../../server/enum/planEnum'
import { testClientEmail } from '../../config/keys'

describe('Client Signup', () => {
  before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000')
  })
  it('Click  on sigup and  verify links', () => {
    cy.contains('Sign up').click()
    cy.contains('Connect. Build. grow').should('not.exist')
    cy.get('#signup').within(() => {
      cy.contains('SIGN UP')
      cy.contains('button', 'REGISTER WITH GOOGLE').should('be.visible')
      cy.contains('Remember Me').should('be.visible')
      cy.contains('log in now!').should('be.visible').click()

      cy.contains('Connect. Build. grow').should('not.exist')
      cy.url().should('include', '/login')
    })
  })
  it('Signup for Client', () => {
    const email = faker.internet.email()
    const password = 'Hello@2024'
    cy.visit('http://localhost:3000')

    cy.contains('Sign up').click()
    cy.contains('Connect. Build. grow').should('not.exist')
    cy.url().should('include', '/register')

    cy.get('#signup').within(() => {
      cy.contains('SIGN UP')
      cy.contains('button', 'REGISTER WITH GOOGLE').should('be.visible')
      cy.contains('Remember Me').should('be.visible')
      cy.contains('log in now!').should('be.visible')
      cy.get('#email').should('be.visible').clear().type('client@')
      cy.get('#password').should('be.visible').clear().type('Hello')
      cy.contains('button', 'Sign up').should('be.visible').click()
      cy.contains('Please enter a valid email address').should('be.visible')
      cy.contains('Password must be 8+ characters including numbers, 1 capital letter and 1 special character.').should(
        'be.visible'
      )
      cy.get('#email').should('be.visible').clear().type(email)
      cy.get('#password').should('be.visible').clear().type(password)
      cy.get('[name="remember_me"]').click({ force: true }).should('be.checked')
      cy.intercept('POST', '/api/auth/register').as('regsiterUserRequest')
      cy.contains('button', 'Sign up').should('be.visible').click()

      cy.wait('@regsiterUserRequest').then(interception => {
        expect(interception.response.statusCode).to.eq(200)
        cy.url().should('include', '/verify-email')
        cy.intercept('GET', `/api/auth/verify/${interception.response?.body?._id}`).as('verifyEmailRequest')
        cy.visit(`http://localhost:3000/verified/${interception.response?.body?._id}`)
        cy.wait('@verifyEmailRequest').then(res => {
          expect(res.response.statusCode).to.eq(200)
          expect(res.response.body.message).to.eq('SUCCESS')
        })
      })
    })
    cy.wait(15000)
    cy.url().should('include', '/update-account-profile')

    cy.contains('button', 'Cancel').should('be.visible').click()
    cy.contains('button', 'Next').should('be.visible').should('be.disabled')

    cy.contains(`I'm a freelancer, looking for work`).should('be.visible').click()
    cy.contains('button', 'Next').should('be.visible').should('be.enabled')
    cy.contains('I am a client, hiring for a project').should('be.visible').click()
    cy.contains('button', 'Next').should('be.visible').should('be.enabled').click()

    cy.contains('button', 'Next').should('be.visible').should('be.disabled')
    cy.contains('button', 'BACK').should('be.visible').should('be.enabled').click()
    cy.contains('button', 'Next').should('be.visible').should('be.enabled').click()

    let FirstName = faker.string.alpha(5)
    let LastName = faker.string.alpha(5)
    let PhoneNumber = '(555) 123-9802'
    let BusinessType = 'Individual'
    let TaxEin = '1DK4C'

    cy.get('#firstName').should('be.visible').clear().type(FirstName)
    cy.get('#lastName').should('be.visible').clear().type(LastName)
    cy.get('#phoneNumber').should('be.visible').clear().type(PhoneNumber)
    cy.get('#businessType').should('be.visible').clear().type(BusinessType)
    cy.get('#taxEin').should('be.visible').clear().type(TaxEin)

    cy.contains('button', 'Next').should('be.visible').should('be.enabled').click()

    let AddressLineOne = faker.location.streetAddress()
    let AddressLineTwo = faker.location.secondaryAddress()
    let City = faker.location.city()
    let ZipCode = faker.location.zipCode()
    let Country = faker.location.country()

    cy.get('#addressLineOne').should('be.visible').clear().type(AddressLineOne)
    cy.get('#addressLineTwo').should('be.visible').clear().type(AddressLineTwo)
    cy.get('#city').should('be.visible').clear().type(City)
    cy.get('#zipCode').should('be.visible').clear().type(ZipCode)
    cy.get('#country').should('be.visible').clear().type(Country)

    cy.intercept('POST', `/api/user/current/update`).as('updateUserRequest')

    cy.contains('button', 'SUBMIT').should('be.visible').should('be.enabled').click()

    cy.wait('@updateUserRequest').then(res => {
      expect(res.response.statusCode).to.eq(200)
    })

    cy.url().should('include', '/dashboard')

    cy.contains('Select a plan for your account').should('be.visible').click()

    cy.contains('Connect. Build. grow').should('not.exist')

    cy.url().should('include', '/pick-a-plan')

    cy.window()
      .its('store')
      .then(store => {
        const updatedDate = ValidationUtils.addDaysToDate(
          store.getState()?.Auth?.user?.updatedAt || new Date(),
          store.getState()?.Auth?.trialLength ?? 7
        )
        const month = ValidationUtils.getMonthInText(updatedDate)
        cy.get('#back_header').within(() => {
          cy.contains('Pick a plan').should('be.visible')

          cy.contains(`Cancel before ${month} ${new Date(updatedDate).getDate()} and you won’t be charged.`).should(
            'be.visible'
          )
        })
        const PLANS = store.getState()?.Auth?.plans

        PLANS?.forEach(plan => {
          cy.get(`#${plan.id}_plans`).within(() => {
            cy.contains(plan?.name).should('be.visible')
            cy.contains(plan?.description).should('be.visible')
            cy.contains(`${plan?.cost} USD / month`).should('be.visible')
            cy.contains('button', 'CHOOSE THIS PLAN').should('be.visible').should('be.enabled')

            cy.contains('FEATURES').should('be.visible')
            plan?.features?.forEach(feature => {
              cy.contains(feature?.text).should('be.visible')
            })
          })
        })
        const Plan1 = PLANS[0]
        cy.get(`#${Plan1.id}_plans`).within(() => {
          cy.contains('button', 'CHOOSE THIS PLAN').should('be.visible').should('be.enabled').click()
        })
        cy.contains('Connect. Build. grow').should('not.exist')

        cy.url({ timeout: 20000 }).should('include', '/subscribe')
      })

    cy.window()
      .its('store')
      .then(store => {
        const updatedDate = ValidationUtils.addDaysToDate(
          store.getState()?.Auth?.user?.updatedAt || new Date(),
          store.getState()?.Auth?.trialLength ?? 7
        )
        const month = ValidationUtils.getMonthInText(updatedDate)
        const getSubscriptionName = plan => {
          switch (plan) {
            case planEnum.BASIC:
              return 'Basic Unzipped'
            case planEnum.STANDARD:
              return 'Standard Unzipped'
            case planEnum.ADVANCED:
              return 'Advanced Unzipped'
            default:
              return 'Selected'
          }
        }

        const SelectedPlan = store.getState()?.Auth.selectedPlan

        cy.contains(`Confirm ${getSubscriptionName(SelectedPlan)} Plan`).should('be.visible')

        const dateCode = `${month} ${new Date(updatedDate).getDate()}, ${new Date(updatedDate).getFullYear()}`

        cy.contains(`We won’t charge you until your free trial ends on ${dateCode}.`).should('be.visible')
        cy.contains(`Billing cycle`).should('be.visible')
        cy.contains(`Chose how often you’d like to be billed. You can cancel anytime.`).should('be.visible')

        const PlanCost = store.getState()?.Auth.planCost ?? 0
        const calcPrice = months => {
          return PlanCost * (0.85 - 0.05 * months).toFixed(2)
        }

        const calcSavings = (cost, months) => {
          const price = PlanCost * months
          return (months * cost - price) * -1
        }

        const cards = [
          {
            id: paymentFrequencyEnum.TRIYEARLY,
            name: '3 YEARS',
            icon: 'radio',
            text: `$${calcPrice(paymentFrequencyEnum.TRIYEARLY).toFixed(2)} X 36 MONTHS`,
            save: `SAVE $${calcSavings(calcPrice(paymentFrequencyEnum.TRIYEARLY).toFixed(2), 36).toFixed(2)}`
          },
          {
            id: paymentFrequencyEnum.BIYEARLY,
            name: '2 YEARS',
            icon: 'radio',
            text: `$${calcPrice(paymentFrequencyEnum.BIYEARLY).toFixed(2)} X 24 MONTHS`,
            save: `SAVE $${calcSavings(calcPrice(paymentFrequencyEnum.TRIYEARLY).toFixed(2), 24).toFixed(2)}`
          },
          {
            id: paymentFrequencyEnum.YEARLY,
            name: 'YEARLY',
            icon: 'radio',
            text: `$${calcPrice(paymentFrequencyEnum.YEARLY).toFixed(2)} X 12 MONTHS`,
            save: `SAVE $${calcSavings(calcPrice(paymentFrequencyEnum.TRIYEARLY).toFixed(2), 12).toFixed(2)}`
          },
          {
            id: paymentFrequencyEnum.MONTHLY,
            name: 'MONTHLY',
            icon: 'radio',
            text: `$${PlanCost.toFixed(2)} / MONTH`,
            save: undefined
          }
        ]

        cards?.forEach((card, index) => {
          cy.get(`#card_${index}`).within(() => {
            cy.get('input[type="radio"]').check({ force: true })
            cy.contains(card.name).should('be.visible')
            cy.contains(card.text).should('be.visible')
            if (card?.save) {
              cy.contains(card.save).should('be.visible')
            }
          })
        })
        cy.contains('button', 'CONFIRM BILLING CYCLE').should('be.visible').should('be.enabled').click()

        cy.get('#loading_spinner').should('be.visible')
        cy.wait(1000)
        cy.get('img')
          .should('have.attr', 'src')
          .and('include', 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671323871/verifiedCheck_w902qa.png')

        cy.get('#address_update_button').should('be.visible').click()
        cy.get('#business_address').should('be.visible').click()
        cy.get('#business_address').within(() => {
          AddressLineOne = faker.location.streetAddress()
          AddressLineTwo = faker.location.secondaryAddress()
          City = faker.location.city()
          ZipCode = faker.location.zipCode()
          Country = faker.location.country()
          let State = faker.location.state()
          FirstName = faker.string.alpha(5)
          LastName = faker.string.alpha(5)
          PhoneNumber = '(555) 123-9802'
          BusinessType = 'Individual'

          cy.get('#businessCountry').should('be.visible').clear().type(Country)
          cy.get('#businessFirstName').should('be.visible').clear().type(FirstName)
          cy.get('#businessLastName').should('be.visible').clear().type(LastName)
          cy.get('#businessAddressLineOne').should('be.visible').clear().type(AddressLineOne)
          cy.get('#businessAddressLineTwo').should('be.visible').clear().type(AddressLineTwo)
          cy.get('#businessCity').should('be.visible').clear().type(City)
          cy.get('#businessState').should('be.visible').clear().type(State)
          cy.get('#businessZip').should('be.visible').clear().type(ZipCode)
          cy.get('#businessPhone').should('be.visible').clear().type(PhoneNumber)

          cy.contains('button', 'SAVE ADDRESS').should('be.visible').should('be.enabled').click()
        })
        cy.get('#loading_spinner').should('be.visible')
        cy.wait(700)

        cy.get('img')
          .should('have.attr', 'src')
          .and('include', 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671323871/verifiedCheck_w902qa.png')

        cy.window()
          .its('store')
          .then(store => {
            const PaymentMethod = {
              BillingAddressLineOne: faker.location.streetAddress(),
              BillingAddressLineTwo: faker.location.secondaryAddress(),
              BillingAddressLineCountry: faker.location.country(),
              BillingFirstName: faker.string.alpha(5),
              BillingLastName: faker.string.alpha(5),
              BillingAddressCity: faker.location.city(),
              BillingAddressState: faker.location.state(),
              BillingAddressZip: faker.location.zipCode(),
              card: {
                id: 'pm_1Q0Qi3HVpfsarZmBHzz5rw5e',
                object: 'payment_method',
                allow_redisplay: 'unspecified',
                billing_details: {
                  address: {
                    city: 'Kingston',
                    country: null,
                    line1: 'Address Line 1',
                    line2: 'Address Line 2',
                    postal_code: '23123',
                    state: 'NY'
                  },
                  email: testClientEmail,
                  name: 'Hello World',
                  phone: null
                },
                card: {
                  brand: 'visa',
                  checks: {
                    address_line1_check: null,
                    address_postal_code_check: null,
                    cvc_check: null
                  },
                  country: 'US',
                  display_brand: 'visa',
                  exp_month: 12,
                  exp_year: 2025,
                  funding: 'credit',
                  generated_from: null,
                  last4: '1111',
                  networks: {
                    available: ['visa'],
                    preferred: null
                  },
                  three_d_secure_usage: {
                    supported: true
                  },
                  wallet: null
                },
                created: 1726676791,
                customer: null,
                livemode: false,
                type: 'card'
              }
            }
            const SubscriptionForm = store.getState()?.Auth?.subscriptionForm

            store.dispatch(
              createPaymentMethod({
                paymentMethod: PaymentMethod.card,
                userId: store.getState()?.Auth.user?._id
              })
            )

            store.dispatch({
              type: 'UPDATE_SUBSCRIPTION_FORM',
              payload: { ...SubscriptionForm, paymentMethod: PaymentMethod }
            })

            const PLANS = store.getState()?.Auth?.plans
            const selectedPlan = store.getState()?.Auth?.selectedPlan
            const planCost = store.getState()?.Auth?.planCost
            const subscriptionForm = store.getState()?.Auth.subscriptionForm

            const plan = PLANS.find(e => e.id === selectedPlan)
            const calcPrice = months => {
              return planCost * (0.85 - 0.05 * months).toFixed(2)
            }
            const calcPaymentFrequency = frequency => {
              switch (frequency) {
                case paymentFrequencyEnum.TRIYEARLY:
                  return '3 years'
                case paymentFrequencyEnum.BIYEARLY:
                  return '2 years'
                case paymentFrequencyEnum.YEARLY:
                  return 'year'
                case paymentFrequencyEnum.MONTHLY:
                  return '30 days'
              }
            }

            const total = (
              calcPrice(subscriptionForm?.paymentFrequency).toFixed(2) *
              (12 * subscriptionForm?.paymentFrequency > 0 ? 12 * subscriptionForm?.paymentFrequency : 1)
            )
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            cy.get('#receipt_card').within(() => {
              cy.contains(`$${total} + tax every ${calcPaymentFrequency(subscriptionForm?.paymentFrequency)}`).should(
                'be.visible'
              )
              cy.contains(`You will be charged $${total} + tax on ${dateCode}, when your trial ends.`).should(
                'be.visible'
              )
              plan?.features?.forEach(feature => {
                cy.contains(feature?.text).should('be.visible')
              })
              cy.intercept('POST', '/api/payment/subscription/create').as('subscribePlanRequest')

              cy.contains('button', 'START PLAN').should('be.visible').should('be.enabled').click()

              cy.wait('@subscribePlanRequest').then(interception => {
                expect(interception.response.statusCode).to.eq(400)
              })
            })
          })
      })
  })
})
