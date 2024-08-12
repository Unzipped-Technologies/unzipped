import React from 'react'
import thunk from 'redux-thunk'
import { useRouter } from 'next/router'
import { faker } from '@faker-js/faker'
import configureMockStore from 'redux-mock-store'
import { renderWithRedux } from '../store/commonTestSetup'
import { fireEvent, screen, act, within, waitFor, prettyDOM, render } from '@testing-library/react'
import Freelancers from '../../pages/freelancers/index'
import { ValidationUtils } from '../../utils'
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js'

import RecurringPaymentPage from '../../pages/recurring-payment/index'
import HirePage from '../../pages/hire/index'
import { initialState } from '../store/mockInitialState'
import { parseCookies } from '../../services/cookieHelper'
import {
  getUserOwnedBusiness,
  resetBusinessForm,
  getProjectsList,
  getBusinessById,
  updateBusiness
} from '../../redux/Business/actions'
import { createContract, getActiveContractsForUser } from '../../redux/Contract/actions'
import { logoutUser } from '../../redux/Auth/actions'
import {
  getFreelancerById,
  getFreelancerList,
  clearSelectedFreelancer,
  getAllFreelancers
} from '../../redux/Freelancers/actions'
import { getInvitesLists, addEntriesToList } from '../../redux/Lists/ListsAction'
import { setUserIdForChat, checkUserConversation } from '../../redux/Messages/actions'
import { getUnpaidInvoices } from '../../redux/Invoices/actions'
import { getPaymentMethods, deletePaymentMethods, createPaymentMethod } from '../../redux/Stripe/actions'
import { BUSINESS_FORM, WIZARD_SUBMISSION, BUSINESS } from '../store/Business'
import { FREELANCER } from '../store/Freelancer'
import { CONTRACTS } from '../store/Contracts'
import { CLIENT_AUTH } from '../store/Users'
import { PLANS } from '../store/Plans'
import { INVOICES } from '../store/Invoices'
import { mockStripe, mockElements } from './stripeMock' // Adjust the import path

const _ = require('lodash')

jest.useFakeTimers() // Enable fake timers

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
jest.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children }) => <div>{children}</div>,
  CardNumberElement: jest.fn(props => <input {...props} data-testid="card-number" />),
  CardExpiryElement: jest.fn(props => <input {...props} data-testid="card-expiry" />),
  CardCvcElement: jest.fn(props => <input {...props} data-testid="card-cvc" />),
  useStripe: jest.fn(),
  useElements: jest.fn()
}))

const mockStripeInstance = mockStripe()
useStripe.mockReturnValue(mockStripeInstance)

const mockElementsInstance = mockElements()
useElements.mockReturnValue(mockElementsInstance)

jest.mock('../../redux/Stripe/actions', () => ({
  ...jest.requireActual('../../redux/Stripe/actions'),
  getPaymentMethods: jest.fn(),
  deletePaymentMethods: jest.fn(),
  createPaymentMethod: jest.fn()
}))
jest.mock('../../redux/Invoices/actions', () => ({
  ...jest.requireActual('../../redux/Invoices/actions'),
  getUnpaidInvoices: jest.fn()
}))
jest.mock('../../redux/Contract/actions', () => ({
  ...jest.requireActual('../../redux/Contract/actions'),
  createContract: jest.fn(),
  getActiveContractsForUser: jest.fn()
}))
jest.mock('../../redux/Auth/actions', () => ({
  ...jest.requireActual('../../redux/Auth/actions'),
  logoutUser: jest.fn()
}))
jest.mock('../../redux/Lists/ListsAction', () => ({
  ...jest.requireActual('../../redux/Lists/ListsAction'),
  getInvitesLists: jest.fn(),
  addEntriesToList: jest.fn()
}))
jest.mock('../../redux/Messages/actions', () => ({
  ...jest.requireActual('../../redux/Messages/actions'),
  setUserIdForChat: jest.fn(),
  checkUserConversation: jest.fn()
}))

jest.mock('../../redux/Business/actions', () => ({
  ...jest.requireActual('../../redux/Business/actions'),
  getUserOwnedBusiness: jest.fn(),
  resetBusinessForm: jest.fn(),
  getProjectsList: jest.fn(),
  getBusinessById: jest.fn(),
  updateBusiness: jest.fn()
}))

jest.mock('../../redux/Freelancers/actions', () => ({
  ...jest.requireActual('../../redux/Freelancers/actions'),
  getFreelancerById: jest.fn(),
  getFreelancerList: jest.fn(),
  clearSelectedFreelancer: jest.fn(),
  getAllFreelancers: jest.fn()
}))

// Mock the parseCookies function
jest.mock('../../services/cookieHelper', () => ({
  parseCookies: jest.fn()
}))

describe('Hire a Freelancer', () => {
  let mockRouterPush, mockRouterBack
  let store

  beforeEach(() => {
    global.innerWidth = 2560
    global.dispatchEvent(new Event('resize'))

    initialState.Business.loading = false
    initialState.Auth.token = 'testToken'
    initialState.Auth.user = _.cloneDeep(CLIENT_AUTH)
    initialState.Business.userOwnedBusiness = _.cloneDeep(BUSINESS)
    initialState.Freelancers.selectedFreelancer = JSON.parse(JSON.stringify(FREELANCER))
    initialState.Contracts.activeContracts = _.cloneDeep(CONTRACTS)
    initialState.Invoices.unpaidInvoices = _.cloneDeep(INVOICES)

    createPaymentMethod.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    updateBusiness.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getBusinessById.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getPaymentMethods.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    deletePaymentMethods.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getUnpaidInvoices.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getActiveContractsForUser.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    createContract.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getProjectsList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    logoutUser.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    resetBusinessForm.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getInvitesLists.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    addEntriesToList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    setUserIdForChat.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    checkUserConversation.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getUserOwnedBusiness.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getFreelancerById.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    getFreelancerList.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    clearSelectedFreelancer.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    getAllFreelancers.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    mockRouterPush = jest.fn()
    mockRouterBack = jest.fn()

    useRouter.mockImplementation(() => ({
      query: {},
      pathname: '',
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: mockRouterBack
    }))

    store = mockStore(initialState)
    store.clearActions()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('should return the token from cookies', async () => {
    const mockToken = 'mock-token'

    parseCookies.mockReturnValue({ token: mockToken })

    const req = { headers: { cookie: 'token=mock-token' } }
    const res = {}

    const result = await HirePage.getInitialProps({ req, res })

    expect(result).toEqual({ token: { token: mockToken } })
  })

  it('renders Freelancers page click on Make an Offer Option', async () => {
    const FreelancersList = initialState.Freelancers.freelancers
    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFreelancerContainer = screen.getByTestId('desktop_freelancer_container')
    expect(DesktopFreelancerContainer).toBeInTheDocument()

    const FreelancerDataContainer = within(DesktopFreelancerContainer).getByTestId(FreelancersList[0]._id)
    expect(FreelancerDataContainer).toBeInTheDocument()

    const ListModalButton = within(FreelancerDataContainer).getByTestId(`open_${initialState.Auth.user._id}_list_modal`)
    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ListModalButton)
    })

    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    const MakeOfferOption = within(ListModal).getByText('Make An Offer')
    expect(MakeOfferOption).toBeInTheDocument()

    fireEvent.click(MakeOfferOption)

    renderWithRedux(<HirePage />, { initialState })

    const HireContainer = screen.getByTestId('hire_freelancer')

    const HireButton = within(HireContainer).getByText(
      `Hire ${initialState.Freelancers.selectedFreelancer?.userId?.FirstName}`
    )

    expect(HireContainer).toBeInTheDocument()

    expect(HireContainer.querySelector('#contract_freelancer_name')).toHaveTextContent(
      `Contact ${initialState.Freelancers.selectedFreelancer?.userId?.FirstName} About Your Job`
    )

    await act(async () => {
      await fireEvent.click(HireButton)
    })

    expect(within(HireContainer).getByText('Please select a business.')).toBeInTheDocument()

    const ProjectsDropDown = HireContainer.querySelector('#projects_dropdown')
    expect(ProjectsDropDown).toBeInTheDocument()
    fireEvent.click(ProjectsDropDown)

    expect(ProjectsDropDown).toBeDefined()
    expect(ProjectsDropDown).not.toBeNull()

    fireEvent.keyDown(ProjectsDropDown.firstChild, { key: 'ArrowDown' })
    const businessNames = initialState.Business.userOwnedBusiness.map(b => b.name)
    businessNames?.forEach(name => {
      expect(within(HireContainer).getByText(name)).toBeInTheDocument()
    })

    initialState.Contracts.contractForm.businessId = initialState.Business.userOwnedBusiness[0]?._id
    fireEvent.click(within(HireContainer).getByText(businessNames[0]))

    await act(async () => {
      await fireEvent.click(HireButton)
    })

    const MessageField = HireContainer.querySelector('#send_message')
    expect(MessageField).toBeInTheDocument()
    const Message = 'Hi, I want to discuss some project detail!'
    fireEvent.change(MessageField, { target: { value: Message } })
    initialState.Contracts.contractForm.message = Message

    const JobTypeField = HireContainer.querySelector('#job_type')
    expect(JobTypeField).toBeInTheDocument()
    fireEvent.change(JobTypeField, { target: { value: 'Contract' } })
    initialState.Contracts.contractForm.jobType = 'Contract'

    const HoursRateField = HireContainer.querySelector('#hours_rate')
    expect(HoursRateField).toBeInTheDocument()

    fireEvent.focus(HoursRateField)
    fireEvent.change(HoursRateField, { target: { value: '0' } })
    initialState.Contracts.contractForm.hourlyRate = '0'

    fireEvent.click(HireButton)
    expect(within(HireContainer).getByText('Hourly rate muus be greater than 0.')).toBeInTheDocument()

    fireEvent.change(HoursRateField, { target: { value: '25' } })
    initialState.Contracts.contractForm.hourlyRate = '25'

    const CurrencyField = HireContainer.querySelector('#currency')
    expect(CurrencyField).toBeInTheDocument()
    fireEvent.mouseDown(CurrencyField)

    const Currencies = ['USD', 'EUR', 'GBP']

    Currencies?.forEach(currency => {
      expect(screen.getAllByText(currency)[0]).toBeInTheDocument()
    })

    const option1 = screen.getAllByText(Currencies[1])[0]
    expect(option1).toBeInTheDocument()
    fireEvent.click(option1)

    initialState.Contracts.contractForm.currency = Currencies[1]

    const TrackingHoursField = HireContainer.querySelector('#tracking_hours')
    expect(TrackingHoursField).toBeInTheDocument()

    fireEvent.focus(TrackingHoursField)

    fireEvent.click(HireButton)
    expect(within(HireContainer).getByText('Hours limit muus be greater than 0.')).toBeInTheDocument()

    fireEvent.change(TrackingHoursField, { target: { value: '' } })
    initialState.Contracts.contractForm.hoursLimit = ''

    fireEvent.click(HireButton)

    fireEvent.change(TrackingHoursField, { target: { value: '8' } })
    initialState.Contracts.contractForm.hoursLimit = '8'

    fireEvent.click(HireButton)

    updateBusiness.mockReturnValue(() => {
      return { status: 200 }
    })

    renderWithRedux(<RecurringPaymentPage />, { initialState })

    const EmployeeCard = screen.getByTestId('employee_card')
    expect(EmployeeCard).toBeInTheDocument()

    const calcAmtOwed = data => {
      let amount = 0
      initialState.Invoices.unpaidInvoices?.forEach(item => {
        if (item.freelancerId === data.freelancerId._id) {
          amount += item.hourlyRate * item.hoursWorked
        }
      })
      return amount
    }

    if (initialState.Contracts.activeContracts?.length > 0) {
      initialState.Contracts.activeContracts?.forEach(contract => {
        const ContractContainer = EmployeeCard.querySelector(`#contract_${contract?._id}`)
        expect(ContractContainer).toBeInTheDocument()
        expect(ContractContainer.querySelector('#name')).toHaveTextContent(
          ValidationUtils._toUpper(contract?.freelancerId?.userId?.FullName)
        )
        expect(ContractContainer.querySelector('#rate')).toHaveTextContent(`$ ${contract?.hourlyRate}.00`)
        expect(ContractContainer.querySelector('#hours_limit')).toHaveTextContent(contract?.hoursLimit)
        expect(ContractContainer.querySelector('#total_amount')).toHaveTextContent(`$ ${calcAmtOwed(contract)}.00`)
      })
    }

    if (
      initialState.Auth.user.plan !== null &&
      initialState.Auth.user.plan !== undefined &&
      initialState.Auth.user.plan !== ''
    ) {
      const planData = PLANS[initialState.Auth.user.plan]
      if (planData) {
        expect(EmployeeCard.querySelector(`#plan_name`)).toHaveTextContent(planData.name.toUpperCase())
        expect(EmployeeCard.querySelector(`#plan_cost`)).toHaveTextContent(`$${planData.cost}.00/month`)
      }
    }

    if (initialState.Auth.user.subscriptionDate) {
      const getNextBillingDate = dateStartedSubscription => {
        // Parse the date the subscription started
        const startDate = new Date(dateStartedSubscription)
        const billingDay = startDate.getDate()

        // Get the current date
        const currentDate = new Date()

        // Determine if the billing day for the current month has passed or is today
        let nextBillingDate
        if (currentDate.getDate() >= billingDay) {
          // If today is past the billing day, or is the billing day, move to next month
          if (currentDate.getMonth() === 11) {
            // December
            nextBillingDate = new Date(currentDate.getFullYear() + 1, 0, billingDay)
          } else {
            nextBillingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, billingDay)
          }
        } else {
          // If today is before the billing day, keep the current month
          nextBillingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), billingDay)
        }

        // Format the date as "MonthName Day, Year"
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return nextBillingDate.toLocaleDateString('en-US', options)
      }
      expect(EmployeeCard.querySelector(`#next_billing_date`)).toHaveTextContent(
        `${getNextBillingDate(initialState.Auth.user.subscriptionDate)}`
      )
    }

    const calcTotalPotentialCost = () => {
      let total = 0
      initialState.Contracts.contracts?.forEach(item => {
        if (item.hourlyRate && item.hoursLimit) {
          total += item.hourlyRate * item.hoursLimit
        }
      })
      return total
    }

    expect(EmployeeCard.querySelector(`#charged_amount`)).toHaveTextContent(
      `$ ${calcTotalPotentialCost().toLocaleString()}.00 USD`
    )

    const UpdateButton = screen.getAllByRole('button', { name: 'Update' })[0]
    expect(UpdateButton).toBeInTheDocument()
    fireEvent.click(UpdateButton)

    const BusinessAddressCard = screen.getByTestId('business_address')
    expect(BusinessAddressCard).toBeInTheDocument()

    const CountryField = within(BusinessAddressCard).getByTestId('businessCountry')
    expect(CountryField).toBeInTheDocument()
    fireEvent.focus(CountryField)
    fireEvent.change(CountryField, { target: { value: 'USA' } })

    const FirstNameField = within(BusinessAddressCard).getByTestId('businessFirstName')
    expect(FirstNameField).toBeInTheDocument()

    fireEvent.focus(FirstNameField)
    fireEvent.change(FirstNameField, { target: { value: 'New' } })

    const LastNameField = within(BusinessAddressCard).getByTestId('businessLastName')
    expect(LastNameField).toBeInTheDocument()

    fireEvent.focus(LastNameField)
    fireEvent.change(LastNameField, { target: { value: 'Business' } })

    const AddLine1Field = within(BusinessAddressCard).getByTestId('businessAddressLineOne')
    expect(AddLine1Field).toBeInTheDocument()

    fireEvent.focus(AddLine1Field)
    fireEvent.change(AddLine1Field, { target: { value: '12 street' } })

    const AddLine2Field = within(BusinessAddressCard).getByTestId('businessAddressLineTwo')
    expect(AddLine2Field).toBeInTheDocument()

    fireEvent.focus(AddLine2Field)
    fireEvent.change(AddLine2Field, { target: { value: 'test town' } })

    const CityField = within(BusinessAddressCard).getByTestId('businessCity')
    expect(CityField).toBeInTheDocument()

    fireEvent.focus(CityField)
    fireEvent.change(CityField, { target: { value: 'kingston' } })

    const StateField = within(BusinessAddressCard).getByTestId('businessState')
    expect(StateField).toBeInTheDocument()

    fireEvent.focus(StateField)
    fireEvent.change(StateField, { target: { value: 'New York' } })

    const ZipField = within(BusinessAddressCard).getByTestId('businessZip')
    expect(ZipField).toBeInTheDocument()

    fireEvent.focus(ZipField)
    fireEvent.change(ZipField, { target: { value: '90000' } })

    const PhoneField = within(BusinessAddressCard).getByTestId('businessPhone')
    expect(PhoneField).toBeInTheDocument()

    fireEvent.focus(PhoneField)
    fireEvent.change(PhoneField, { target: { value: '(1234) 1234-1234' } })

    const SaveButton = within(BusinessAddressCard).getByRole('button', { name: 'SAVE ADDRESS' })
    expect(SaveButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(SaveButton)
    })

    expect(screen.getByTestId('loading_spinner')).toBeInTheDocument()
    await act(async () => {
      jest.advanceTimersByTime(700)
    })

    const projectImage = screen.getByTestId('adress_done_image')
    expect(projectImage).toBeInTheDocument()
    expect(projectImage).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671323871/verifiedCheck_w902qa.png'
    )
    expect(projectImage).toHaveAttribute('width', '34px')
    expect(projectImage).toHaveAttribute('height', '34px')

    const PaymentContainer = screen.getByTestId('payment_method_form')
    expect(PaymentContainer).toBeInTheDocument()

    const AddPaymentButton = within(PaymentContainer).getByRole('button', { name: 'Add' })
    expect(AddPaymentButton).toBeInTheDocument()
    fireEvent.click(AddPaymentButton)

    const TestComponent = () => {
      const [error, setIsError] = React.useState('')

      const _ = useElements()
      return (
        <div>
          {/* <div>{children}</div> */}
          <input data-testid="card-number" onBlur={() => setIsError(null)} />
          <input data-testid="card-expiry" />
          <input data-testid="card-cvc" />
        </div>
      )
    }

    render(
      <Elements stripe={mockStripe}>
        <TestComponent />
      </Elements>
    )

    // expect(mockStripe.elements).toHaveBeenCalledTimes(1)

    const cardNumberElement = screen.getByTestId('card-number')
    mockElementsInstance.getElement.mockReturnValue(cardNumberElement)

    fireEvent.focus(cardNumberElement)
    fireEvent.change(cardNumberElement, { target: { value: '1211' } })
    fireEvent.blur(cardNumberElement)

    const CountryFieldP = within(PaymentContainer).getByTestId('country')
    expect(CountryFieldP).toBeInTheDocument()

    fireEvent.focus(CountryFieldP)
    fireEvent.change(CountryFieldP, { target: { value: 'USA' } })

    const FirstNameFieldP = within(PaymentContainer).getByTestId('firstName')
    expect(FirstNameFieldP).toBeInTheDocument()

    fireEvent.focus(FirstNameFieldP)
    fireEvent.change(FirstNameFieldP, { target: { value: 'John' } })

    const LastNameFieldP = within(PaymentContainer).getByTestId('lastName')
    expect(LastNameFieldP).toBeInTheDocument()

    fireEvent.focus(LastNameFieldP)
    fireEvent.change(LastNameFieldP, { target: { value: 'Mark' } })

    const AddLine1FieldP = within(PaymentContainer).getByTestId('addressLineOne')
    expect(AddLine1FieldP).toBeInTheDocument()

    fireEvent.focus(AddLine1FieldP)
    fireEvent.change(AddLine1FieldP, { target: { value: '12 street' } })

    const AddLine2FieldP = within(PaymentContainer).getByTestId('addressLineTwo')
    expect(AddLine2FieldP).toBeInTheDocument()

    fireEvent.focus(AddLine2FieldP)
    fireEvent.change(AddLine2FieldP, { target: { value: '2nd Floort' } })

    const CityFieldP = within(PaymentContainer).getByTestId('city')
    expect(CityFieldP).toBeInTheDocument()

    fireEvent.focus(CityFieldP)
    fireEvent.change(CityFieldP, { target: { value: 'Kingston' } })

    const StateFieldP = within(PaymentContainer).getByTestId('state')
    expect(StateFieldP).toBeInTheDocument()

    fireEvent.focus(StateFieldP)
    fireEvent.change(StateFieldP, { target: { value: 'New York' } })

    const ZipCodeFieldP = within(PaymentContainer).getByTestId('zipCode')
    expect(ZipCodeFieldP).toBeInTheDocument()

    fireEvent.focus(ZipCodeFieldP)
    fireEvent.change(ZipCodeFieldP, { target: { value: '38912' } })

    const SavePaymentButton = within(PaymentContainer).getByRole('button', { name: 'SAVE PAYMENT' })
    expect(SavePaymentButton).toBeInTheDocument()

    fireEvent.click(SavePaymentButton)

    const CreateButton = screen.getAllByRole('button', { name: 'update payment terms' })[0]
    expect(CreateButton).toBeInTheDocument()
    fireEvent.click(CreateButton)
  })

  // //Mobile View

  it('renders Freelancers page click on Make an Offer Option for mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const FreelancersList = initialState.Freelancers.freelancers
    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerDataContainer = screen.getByTestId(`${FreelancersList[0]._id}_mobile`)

    expect(FreelancerDataContainer).toBeInTheDocument()

    const ListModalButton = within(FreelancerDataContainer).getByTestId(
      `open_${initialState.Freelancers.freelancers[0]._id}_mobile`
    )
    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ListModalButton)
    })

    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    const MakeOfferOption = within(ListModal).getByText('Make An Offer')
    expect(MakeOfferOption).toBeInTheDocument()

    fireEvent.click(MakeOfferOption)

    renderWithRedux(<HirePage />, { initialState })

    const HireContainer = screen.getByTestId('hire_freelancer')

    expect(HireContainer).toBeInTheDocument()

    expect(HireContainer.querySelector('#contract_freelancer_name')).toHaveTextContent(
      `Contact ${initialState.Freelancers.selectedFreelancer?.userId?.FirstName} About Your Job`
    )

    const ProjectsDropDown = HireContainer.querySelector('#projects_dropdown')
    expect(ProjectsDropDown).toBeInTheDocument()
    fireEvent.click(ProjectsDropDown)

    expect(ProjectsDropDown).toBeDefined()
    expect(ProjectsDropDown).not.toBeNull()

    fireEvent.keyDown(ProjectsDropDown.firstChild, { key: 'ArrowDown' })
    const businessNames = initialState.Business.userOwnedBusiness.map(b => b.name)
    businessNames?.forEach(name => {
      expect(within(HireContainer).getAllByText(name)[0]).toBeInTheDocument()
    })

    initialState.Contracts.contractForm.businessId = initialState.Business.userOwnedBusiness[0]?._id
    fireEvent.click(within(HireContainer).getAllByText(businessNames[0])[0])

    const InputField = within(ProjectsDropDown).getByRole('combobox')
    expect(InputField).toBeInTheDocument()
    fireEvent.focus(InputField)

    const MessageField = HireContainer.querySelector('#send_message')
    expect(MessageField).toBeInTheDocument()
    const Message = 'Hi, I want to discuss some project detail!'
    fireEvent.change(MessageField, { target: { value: Message } })
    initialState.Contracts.contractForm.message = Message

    const JobTypeField = HireContainer.querySelector('#job_type')
    expect(JobTypeField).toBeInTheDocument()
    fireEvent.change(JobTypeField, { target: { value: 'Contract' } })
    initialState.Contracts.contractForm.jobType = 'Contract'

    const HoursRateField = HireContainer.querySelector('#hours_rate')
    expect(HoursRateField).toBeInTheDocument()
    fireEvent.change(HoursRateField, { target: { value: '25' } })
    initialState.Contracts.contractForm.hourlyRate = '25'

    const CurrencyField = HireContainer.querySelector('#currency')
    expect(CurrencyField).toBeInTheDocument()
    fireEvent.mouseDown(CurrencyField)

    const Currencies = ['USD', 'EUR', 'GBP']

    Currencies?.forEach(currency => {
      expect(screen.getAllByText(currency)[0]).toBeInTheDocument()
    })

    const option1 = screen.getAllByText(Currencies[1])[0]
    expect(option1).toBeInTheDocument()
    fireEvent.click(option1)

    initialState.Contracts.contractForm.currency = Currencies[1]

    const TrackingHoursField = HireContainer.querySelector('#tracking_hours')
    expect(TrackingHoursField).toBeInTheDocument()
    fireEvent.change(TrackingHoursField, { target: { value: '8' } })
    initialState.Contracts.contractForm.hoursLimit = '8'

    const HireButton = within(HireContainer).getByText(
      `Hire ${initialState.Freelancers.selectedFreelancer?.userId?.FirstName}`
    )
    fireEvent.click(HireButton)

    renderWithRedux(<RecurringPaymentPage />, { initialState })
  })
  it('renders hire page without freelancer first name for button', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Freelancers.selectedFreelancer.userId.FirstName = undefined

    const FreelancersList = initialState.Freelancers.freelancers
    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerDataContainer = screen.getByTestId(`${FreelancersList[0]._id}_mobile`)

    expect(FreelancerDataContainer).toBeInTheDocument()

    const ListModalButton = within(FreelancerDataContainer).getByTestId(
      `open_${initialState.Freelancers.freelancers[0]._id}_mobile`
    )
    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ListModalButton)
    })

    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    const MakeOfferOption = within(ListModal).getByText('Make An Offer')
    expect(MakeOfferOption).toBeInTheDocument()

    fireEvent.click(MakeOfferOption)

    renderWithRedux(<HirePage />, { initialState })

    const HireContainer = screen.getByTestId('hire_freelancer')

    expect(HireContainer).toBeInTheDocument()

    expect(HireContainer.querySelector('#contract_freelancer_name')).toHaveTextContent(`Contact About Your Job`)

    const ProjectsDropDown = HireContainer.querySelector('#projects_dropdown')
    expect(ProjectsDropDown).toBeInTheDocument()
    fireEvent.click(ProjectsDropDown)

    expect(ProjectsDropDown).toBeDefined()
    expect(ProjectsDropDown).not.toBeNull()

    fireEvent.keyDown(ProjectsDropDown.firstChild, { key: 'ArrowDown' })
    const businessNames = initialState.Business.userOwnedBusiness.map(b => b.name)
    businessNames?.forEach(name => {
      expect(within(HireContainer).getAllByText(name)[0]).toBeInTheDocument()
    })

    initialState.Contracts.contractForm.businessId = initialState.Business.userOwnedBusiness[0]?._id
    fireEvent.click(within(HireContainer).getAllByText(businessNames[0])[0])

    const MessageField = HireContainer.querySelector('#send_message')
    expect(MessageField).toBeInTheDocument()
    const Message = 'Hi, I want to discuss some project detail!'
    fireEvent.change(MessageField, { target: { value: Message } })
    initialState.Contracts.contractForm.message = Message

    const JobTypeField = HireContainer.querySelector('#job_type')
    expect(JobTypeField).toBeInTheDocument()
    fireEvent.change(JobTypeField, { target: { value: 'Contract' } })
    initialState.Contracts.contractForm.jobType = 'Contract'

    const HoursRateField = HireContainer.querySelector('#hours_rate')
    expect(HoursRateField).toBeInTheDocument()
    fireEvent.change(HoursRateField, { target: { value: '25' } })
    initialState.Contracts.contractForm.hourlyRate = '25'

    const CurrencyField = HireContainer.querySelector('#currency')
    expect(CurrencyField).toBeInTheDocument()
    fireEvent.mouseDown(CurrencyField)

    const Currencies = ['USD', 'EUR', 'GBP']

    Currencies?.forEach(currency => {
      expect(screen.getAllByText(currency)[0]).toBeInTheDocument()
    })

    const option1 = screen.getAllByText(Currencies[1])[0]
    expect(option1).toBeInTheDocument()
    fireEvent.click(option1)

    initialState.Contracts.contractForm.currency = Currencies[1]

    const TrackingHoursField = HireContainer.querySelector('#tracking_hours')
    expect(TrackingHoursField).toBeInTheDocument()
    fireEvent.change(TrackingHoursField, { target: { value: '8' } })
    initialState.Contracts.contractForm.hoursLimit = '8'

    const HireButton = within(HireContainer).getByText(`Hire`)
    fireEvent.click(HireButton)

    expect(mockRouterPush).toHaveBeenCalledWith('/recurring-payment')

    updateBusiness.mockReturnValue(() => {
      return {
        status: 500,
        data: {
          msg: 'Validation error'
        }
      }
    })

    renderWithRedux(<RecurringPaymentPage />, { initialState })

    const EmployeeCard = screen.getByTestId('employee_card')
    expect(EmployeeCard).toBeInTheDocument()

    const calcAmtOwed = data => {
      let amount = 0
      initialState.Invoices.unpaidInvoices?.forEach(item => {
        if (item.freelancerId === data.freelancerId._id) {
          amount += item.hourlyRate * item.hoursWorked
        }
      })
      return amount
    }

    if (initialState.Contracts.activeContracts?.length > 0) {
      initialState.Contracts.activeContracts?.forEach(contract => {
        const ContractContainer = EmployeeCard.querySelector(`#contract_${contract?._id}`)
        expect(ContractContainer).toBeInTheDocument()
        expect(ContractContainer.querySelector('#name')).toHaveTextContent(
          ValidationUtils._toUpper(contract?.freelancerId?.userId?.FullName)
        )
        expect(ContractContainer.querySelector('#rate')).toHaveTextContent(`$ ${contract?.hourlyRate}.00`)
        expect(ContractContainer.querySelector('#hours_limit')).toHaveTextContent(contract?.hoursLimit)
        expect(ContractContainer.querySelector('#total_amount')).toHaveTextContent(`$ ${calcAmtOwed(contract)}.00`)
      })
    }

    if (
      initialState.Auth.user.plan !== null &&
      initialState.Auth.user.plan !== undefined &&
      initialState.Auth.user.plan !== ''
    ) {
      const planData = PLANS[initialState.Auth.user.plan]
      if (planData) {
        expect(EmployeeCard.querySelector(`#plan_name`)).toHaveTextContent(planData.name.toUpperCase())
        expect(EmployeeCard.querySelector(`#plan_cost`)).toHaveTextContent(`$${planData.cost}.00/month`)
      }
    }

    if (initialState.Auth.user.subscriptionDate) {
      const getNextBillingDate = dateStartedSubscription => {
        // Parse the date the subscription started
        const startDate = new Date(dateStartedSubscription)
        const billingDay = startDate.getDate()

        // Get the current date
        const currentDate = new Date()

        // Determine if the billing day for the current month has passed or is today
        let nextBillingDate
        if (currentDate.getDate() >= billingDay) {
          // If today is past the billing day, or is the billing day, move to next month
          if (currentDate.getMonth() === 11) {
            // December
            nextBillingDate = new Date(currentDate.getFullYear() + 1, 0, billingDay)
          } else {
            nextBillingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, billingDay)
          }
        } else {
          // If today is before the billing day, keep the current month
          nextBillingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), billingDay)
        }

        // Format the date as "MonthName Day, Year"
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return nextBillingDate.toLocaleDateString('en-US', options)
      }
      expect(EmployeeCard.querySelector(`#next_billing_date`)).toHaveTextContent(
        `${getNextBillingDate(initialState.Auth.user.subscriptionDate)}`
      )
    }

    const calcTotalPotentialCost = () => {
      let total = 0
      initialState.Contracts.contracts?.forEach(item => {
        if (item.hourlyRate && item.hoursLimit) {
          total += item.hourlyRate * item.hoursLimit
        }
      })
      return total
    }

    expect(EmployeeCard.querySelector(`#charged_amount`)).toHaveTextContent(
      `$ ${calcTotalPotentialCost().toLocaleString()}.00 USD`
    )

    const UpdateButton = screen.getAllByRole('button', { name: 'Update' })[0]
    expect(UpdateButton).toBeInTheDocument()
    fireEvent.click(UpdateButton)

    const BusinessAddressCard = screen.getByTestId('business_address')
    expect(BusinessAddressCard).toBeInTheDocument()

    const CountryField = within(BusinessAddressCard).getByTestId('businessCountry')
    expect(CountryField).toBeInTheDocument()

    fireEvent.focus(CountryField)
    fireEvent.change(CountryField, { target: { value: 'UK' } })

    const FirstNameField = within(BusinessAddressCard).getByTestId('businessFirstName')
    expect(FirstNameField).toBeInTheDocument()

    fireEvent.focus(FirstNameField)
    fireEvent.change(FirstNameField, { target: { value: 'New' } })

    const LastNameField = within(BusinessAddressCard).getByTestId('businessLastName')
    expect(LastNameField).toBeInTheDocument()

    fireEvent.focus(LastNameField)
    fireEvent.change(LastNameField, { target: { value: 'Business' } })

    const AddLine1Field = within(BusinessAddressCard).getByTestId('businessAddressLineOne')
    expect(AddLine1Field).toBeInTheDocument()

    fireEvent.focus(AddLine1Field)
    fireEvent.change(AddLine1Field, { target: { value: '12 street' } })

    const AddLine2Field = within(BusinessAddressCard).getByTestId('businessAddressLineTwo')
    expect(AddLine2Field).toBeInTheDocument()

    fireEvent.focus(AddLine2Field)
    fireEvent.change(AddLine2Field, { target: { value: 'test town' } })

    const CityField = within(BusinessAddressCard).getByTestId('businessCity')
    expect(CityField).toBeInTheDocument()

    fireEvent.focus(CityField)
    fireEvent.change(CityField, { target: { value: 'kingston' } })

    const StateField = within(BusinessAddressCard).getByTestId('businessState')
    expect(StateField).toBeInTheDocument()

    fireEvent.focus(StateField)
    fireEvent.change(StateField, { target: { value: 'New York' } })

    const ZipField = within(BusinessAddressCard).getByTestId('businessZip')
    expect(ZipField).toBeInTheDocument()

    fireEvent.focus(ZipField)
    fireEvent.change(ZipField, { target: { value: '90000' } })

    const PhoneField = within(BusinessAddressCard).getByTestId('businessPhone')
    expect(PhoneField).toBeInTheDocument()

    fireEvent.focus(PhoneField)
    fireEvent.change(PhoneField, { target: { value: '(1234) 1234-1234' } })

    const SaveButton = within(BusinessAddressCard).getByRole('button', { name: 'SAVE ADDRESS' })
    expect(SaveButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(SaveButton)
    })

    expect(within(BusinessAddressCard).getByText('Validation error')).toBeInTheDocument()
  })
  it('renders recurring page without some data ', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user.subscriptionDate = undefined
    initialState.Auth.user.plan = undefined
    initialState.Invoices.unpaidInvoices = undefined
    initialState.Contracts.activeContracts = undefined

    renderWithRedux(<RecurringPaymentPage />, { initialState })

    const EmployeeCard = screen.getByTestId('employee_card')
    expect(EmployeeCard).toBeInTheDocument()

    expect(EmployeeCard.querySelector(`#no_plan`)).toHaveTextContent(`Not Subscribed`)
    expect(EmployeeCard.querySelector(`#next_billing_date`)).toHaveTextContent(`-`)
  })
  it('renders recurring page with greater  subscriptionDate', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user.subscriptionDate = new Date()

    renderWithRedux(<RecurringPaymentPage />, { initialState })
  })

  it('renders business address without selected business address', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    updateBusiness.mockReturnValue(() => {
      return {
        status: 500
      }
    })

    initialState.Business.selectedBusiness.businessAddressLineOne = undefined
    initialState.Business.selectedBusiness.businessAddressLineTwo = undefined
    initialState.Business.selectedBusiness.businessCountry = undefined
    initialState.Business.selectedBusiness.businessFirstName = undefined
    initialState.Business.selectedBusiness.businessLastName = undefined
    initialState.Business.selectedBusiness.businessCity = undefined
    initialState.Business.selectedBusiness.businessState = undefined
    initialState.Business.selectedBusiness.businessZip = undefined
    initialState.Business.selectedBusiness.businessPhone = undefined

    renderWithRedux(<RecurringPaymentPage />, { initialState })

    const UpdateButton = screen.getAllByRole('button', { name: 'Update' })[0]
    expect(UpdateButton).toBeInTheDocument()
    fireEvent.click(UpdateButton)

    const BusinessAddressCard = screen.getByTestId('business_address')
    expect(BusinessAddressCard).toBeInTheDocument()

    const SaveButton = within(BusinessAddressCard).getByRole('button', { name: 'SAVE ADDRESS' })
    expect(SaveButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(SaveButton)
    })
  })
  it('renders hire page without selected freelancer ID', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))
    initialState.Freelancers.selectedFreelancer._id = undefined

    renderWithRedux(<HirePage />, { initialState })

    expect(mockRouterPush).toHaveBeenCalledWith('/freelancers')
  })
})
