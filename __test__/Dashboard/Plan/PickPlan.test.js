import React from 'react'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom' // for the toBeInTheDocument matcher
import { fireEvent, screen, waitFor, act, within } from '@testing-library/react'
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'

import Plan from '../../../pages/pick-a-plan'
import Subscribe from '../../../pages/subscribe'
import SubscriptionCard from '../../../components/unzipped/SubscriptionCard'
import PaymentMethod from '../../../components/unzipped/paymentMethod'
import FormCard from '../../../components/FormCard/index'
import StripeForm from '../../../components/StripeForm/index'
import BusinessAddress from '../../../components/unzipped/businessAddress'
import AddressCard from '../../../components/AddressCard/index'
import { ValidationUtils } from '../../../utils'
import { parseCookies } from '../../../services/cookieHelper'
import { planEnum, paymentFrequencyEnum } from '../../../server/enum/planEnum'

import { stripeBrandsEnum, stripeLogoEnum } from '../../../server/enum/paymentEnum'
import { getPaymentMethods } from '../../../redux/Stripe/actions'
import { resetBusinessForm } from '../../../redux/Business/actions'
import { selectAPlan, logoutUser, updateSubscriptionForm, createSubscription } from '../../../redux/Auth/actions'

import { PLANS } from '../../store/Plans'
import { PaymentMethods } from '../../store/Stripe'
import { CLIENT_AUTH } from '../../store/Users'
import { initialState } from '../../store/mockInitialState'
import { renderWithRedux } from '../../store/commonTestSetup'

const _ = require('lodash')

jest.mock('axios')
jest.useFakeTimers() // Enable fake timers

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

const useStripeHookk = jest.fn(() => ({
  createPaymentMethod: jest.fn(() => ({
    error: null,
    paymentMethod: { id: 'mock-payment-method-id' }
  }))
}))

const useElementsHook = jest.fn(() => ({
  getElement: jest.fn(() => ({
    value: 'mock-card-value'
  }))
}))

// Mock the stripe elements
jest.mock('@stripe/react-stripe-js', () => ({
  // ...jest.requireActual('@stripe/react-stripe-js'),
  CardNumberElement: jest.fn(() => <div data-testid="card_number" />),
  CardExpiryElement: jest.fn(() => <div data-testid="expires" />),
  CardCvcElement: jest.fn(() => <div data-testid="cvc" />),
  Elements: ({ children }) => <div>{children}</div>,
  useStripe: jest.fn(() => ({
    createPaymentMethod: jest.fn(() => ({
      error: null,
      paymentMethod: { id: 'mock-payment-method-id' }
    }))
  })),
  useElements: jest.fn(() => ({
    getElement: jest.fn(() => ({
      value: 'mock-card-value'
    }))
  }))
}))

// Mock the parseCookies function
jest.mock('../../../services/cookieHelper', () => ({
  parseCookies: jest.fn()
}))

jest.mock('../../../redux/Stripe/actions', () => ({
  ...jest.requireActual('../../../redux/Stripe/actions'),
  getPaymentMethods: jest.fn()
}))
jest.mock('../../../redux/Business/actions', () => ({
  ...jest.requireActual('../../../redux/Business/actions'),
  resetBusinessForm: jest.fn()
}))
jest.mock('../../../redux/Auth/actions', () => ({
  ...jest.requireActual('../../../redux/Auth/actions'),
  selectAPlan: jest.fn(data => ({
    type: 'SELECT_A_PLAN',
    payload: { data }
  })),
  logoutUser: jest.fn(),
  updateSubscriptionForm: jest.fn(),
  createSubscription: jest.fn()
}))

describe('Pick a plan', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    initialState.Auth.trialLength = 7
    initialState.Auth.user = _.cloneDeep(CLIENT_AUTH)
    initialState.Auth.plans = _.cloneDeep(PLANS)
    initialState.Stripe.methods = _.cloneDeep(PaymentMethods)

    getPaymentMethods.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    resetBusinessForm.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    updateSubscriptionForm.mockReturnValue(data => {
      return {
        status: 200
      }
    })
    createSubscription.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    mockRouterPush = jest.fn()
    mockRouterBack = jest.fn()

    useRouter.mockImplementation(() => ({
      pathname: '/',
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: mockRouterBack
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('renders Pick a plan page', async () => {
    renderWithRedux(<Plan selectAPlan={selectAPlan} />, { initialState })
    const PickPlanPage = screen.getByTestId('pick_plan')
    expect(PickPlanPage).toBeInTheDocument()
    expect(PickPlanPage).toHaveTextContent(/Pick a plan/i)
    const updatedDate = ValidationUtils.addDaysToDate(
      initialState.Auth.user?.updatedAt || new Date(),
      initialState.Auth.trialLength
    )
    const month = ValidationUtils.getMonthInText(updatedDate)
    expect(PickPlanPage).toHaveTextContent(
      `Cancel before ${month} ${new Date(updatedDate).getDate()} and you won’t be charged.`
    )
  })

  it('renders Pick a plan page without data', async () => {
    initialState.Auth.user.updatedAt = null
    initialState.Auth.plans = undefined
    initialState.Auth.trialLength = undefined
    renderWithRedux(<Plan selectAPlan={selectAPlan} />, { initialState })
  })

  it('Render all plans and verify their content', async () => {
    renderWithRedux(<Plan selectAPlan={selectAPlan} />, { initialState })
    const Plans = initialState.Auth.plans

    Plans?.forEach(plan => {
      const PlanContainer = screen.getByTestId(`${plan.id}_plans`)
      expect(PlanContainer).toBeInTheDocument()

      const nameContainer = within(PlanContainer).getByTestId('name')
      expect(within(nameContainer).getByText(plan?.name)).toBeInTheDocument()

      const descriptionContainer = within(PlanContainer).getByTestId('description')
      expect(within(descriptionContainer).getByText(plan?.description)).toBeInTheDocument()

      const costContainer = within(PlanContainer).getByTestId('cost')
      expect(costContainer).toHaveTextContent(plan?.cost + ' USD / month')

      const PlanFeatureContainer = within(PlanContainer).getByTestId('features')
      expect(PlanFeatureContainer).toBeInTheDocument()
      plan?.features.forEach(feature => {
        expect(within(PlanFeatureContainer).getByText(feature?.text)).toBeInTheDocument()
      })
      const ChoosePlanButton = within(PlanContainer).getByRole('button', { name: 'CHOOSE THIS PLAN' })
      expect(ChoosePlanButton).toBeInTheDocument()

      selectAPlan.mockImplementation(() => {
        const payload = { id: plan?.id, planCost: null }
        switch (plan.id) {
          case planEnum.BASIC:
            payload.planCost = 29
            break
          case planEnum.STANDARD:
            payload.planCost = 79
            break

          case planEnum.ADVANCED:
            payload.planCost = 299
            break
        }
        initialState.Auth.selectedPlan = payload.id
        initialState.Auth.planCost = payload.planCost
        return {
          type: 'SELECT_A_PLAN',
          payload: payload.id
        }
      })

      fireEvent.click(ChoosePlanButton)
    })
  })

  it('should return the token from cookies', async () => {
    const mockToken = 'mock-token'

    parseCookies.mockReturnValue({ token: mockToken })

    const req = { headers: { cookie: 'token=mock-token' } }
    const res = {}

    const result = await Plan.getInitialProps({ req, res })

    expect(result).toEqual({ token: { token: mockToken } })
  })

  // // // Subscribe page

  it('renders Subscribe page and verify Subscription card detail', async () => {
    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const updatedDate = ValidationUtils.addDaysToDate(
      new Date(initialState.Auth.user?.updatedAt) || new Date(),
      initialState.Auth.trialLength
    )
    const month = ValidationUtils.getMonthInText(updatedDate)
    const dateCode = `${month} ${new Date(updatedDate).getDate()}, ${new Date(updatedDate).getFullYear()}`

    const HeaderContainer = screen.getByTestId('back_header')

    let PlanName = null
    switch (initialState.Auth.selectedPlan) {
      case planEnum.BASIC:
        PlanName = 'Basic Unzipped'
        break
      case planEnum.STANDARD:
        PlanName = 'Standard Unzipped'
        break
      case planEnum.ADVANCED:
        PlanName = 'Advanced Unzipped'
        break
      default:
        PlanName = 'Selected'
    }

    expect(within(HeaderContainer).getByText(`Confirm ${PlanName} Plan`))

    expect(
      within(SubscribePage).getByText(`We won’t charge you until your free trial ends on ${dateCode}.`)
    ).toBeInTheDocument()

    expect(
      within(SubscribePage).getByText(`Chose how often you’d like to be billed. You can cancel anytime.`)
    ).toBeInTheDocument()

    const CardOption = within(SubscribePage).getByTestId(`0_card`)
    expect(CardOption).toBeInTheDocument()
    fireEvent.click(CardOption)

    const ConfirmButton = within(SubscribePage).getByRole('button', { name: 'CONFIRM BILLING CYCLE' })
    expect(ConfirmButton).toBeInTheDocument()
    fireEvent.click(ConfirmButton)

    act(() => {
      jest.advanceTimersByTime(760)
    })

    const imgElement = screen.getByTestId('done_image')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671323871/verifiedCheck_w902qa.png'
    )
    expect(imgElement).toHaveAttribute('height', '34px')
    expect(imgElement).toHaveAttribute('width', '34px')

    const SetBilling = within(SubscribePage).getByText('Billing cycle')
    fireEvent.click(SetBilling)
    expect(within(SubscribePage).getByRole('button', { name: 'CONFIRM BILLING CYCLE' })).toBeInTheDocument()
  })

  it('render subscribe page and Subscription component without plan cost', async () => {
    renderWithRedux(
      <SubscriptionCard
        planCost={undefined}
        updateSubscription={data => {
          updateSubscriptionForm(data)
        }}
      />,
      {
        initialState
      }
    )
  })

  it('renders Subscribe page and add business address', async () => {
    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const AddButton = screen.getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)

    const BusinessAddressContainer = within(SubscribePage).getByTestId('business_address')
    expect(BusinessAddressContainer).toBeInTheDocument()

    expect(within(BusinessAddressContainer).getByText('Business Address')).toBeInTheDocument()

    const CountryField = within(BusinessAddressContainer).getByTestId('businessCountry')
    expect(CountryField).toBeInTheDocument()
    fireEvent.focus(CountryField)
    fireEvent.change(CountryField, { target: { value: 'United States' } })

    const FirstNameField = within(BusinessAddressContainer).getByTestId('businessFirstName')
    expect(FirstNameField).toBeInTheDocument()
    fireEvent.focus(FirstNameField)
    fireEvent.change(FirstNameField, { target: { value: 'Jason' } })

    const LastNameField = within(BusinessAddressContainer).getByTestId('businessLastName')
    expect(LastNameField).toBeInTheDocument()
    fireEvent.focus(LastNameField)
    fireEvent.change(LastNameField, { target: { value: 'Maynard' } })

    const AddressField = within(BusinessAddressContainer).getByTestId('businessAddressLineOne')
    expect(AddressField).toBeInTheDocument()
    fireEvent.focus(AddressField)
    fireEvent.change(AddressField, { target: { value: 'Mr John Smith' } })

    const AppartmentField = within(BusinessAddressContainer).getByTestId('businessAddressLineTwo')
    expect(AppartmentField).toBeInTheDocument()
    fireEvent.focus(AppartmentField)
    fireEvent.change(AppartmentField, { target: { value: '132' } })

    const CityField = within(BusinessAddressContainer).getByTestId('businessCity')
    expect(CityField).toBeInTheDocument()
    fireEvent.focus(CityField)
    fireEvent.change(CityField, { target: { value: 'Kingston' } })

    const StateField = within(BusinessAddressContainer).getByTestId('businessState')
    expect(StateField).toBeInTheDocument()
    fireEvent.focus(StateField)
    fireEvent.change(StateField, { target: { value: 'New York' } })

    const ZipCodeField = within(BusinessAddressContainer).getByTestId('businessZip')
    expect(ZipCodeField).toBeInTheDocument()
    fireEvent.focus(ZipCodeField)
    fireEvent.change(ZipCodeField, { target: { value: '12401' } })

    const PhoneField = within(BusinessAddressContainer).getByTestId('businessPhone')
    expect(PhoneField).toBeInTheDocument()
    fireEvent.focus(PhoneField)
    fireEvent.change(PhoneField, { target: { value: '(555) 555-1234' } })

    const SaveButton = within(BusinessAddressContainer).getByRole('button', { name: 'SAVE ADDRESS' })
    expect(SaveButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(SaveButton)
    })

    act(() => {
      jest.advanceTimersByTime(760)
    })
  })

  it('render subscribe page and business address component with onClick method', async () => {
    renderWithRedux(
      <BusinessAddress
        onClick={() => {}}
        planCost={29}
        form={initialState.Auth.subscriptionForm}
        updateSubscription={updateSubscriptionForm}
      />,
      {
        initialState
      }
    )

    const AddButton = screen.getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)

    const BusinessAddressContainer = screen.getByTestId('business_address')
    expect(BusinessAddressContainer).toBeInTheDocument()

    const SaveButton = within(BusinessAddressContainer).getByRole('button', { name: 'SAVE ADDRESS' })
    expect(SaveButton).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(SaveButton)
    })
  })

  it('renders Subscribe page and verify address card', async () => {
    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const AddressCardContainer = within(SubscribePage).getByTestId('address_card')
    expect(AddressCardContainer).toBeInTheDocument()

    const Badge = within(AddressCardContainer).getByTestId('badge')
    expect(Badge).toHaveTextContent('Address')

    const addressImage = screen.getByRole('img', { name: 'address_card_image' })
    expect(addressImage).toBeInTheDocument()
    expect(addressImage).toHaveAttribute('src', '/img/Unzipped-Primary-Logo.png')

    const UpdateButton = within(AddressCardContainer).getByRole('button', { name: 'Update' })
    fireEvent.click(UpdateButton)
  })

  it('renders addresscard component with children', async () => {
    renderWithRedux(<AddressCard children={<h4>Address Card Data</h4>} isSelected />, { initialState })

    const AddressCardContainer = screen.getByTestId('address_card')
    expect(AddressCardContainer).toBeInTheDocument()

    expect(within(AddressCardContainer).getByText('Address Card Data')).toBeInTheDocument()
  })
  it('renders Subscribe page and verify form card', async () => {
    initialState.Stripe.methods[0].address = undefined

    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const isPrimaryPayment = initialState.Stripe.methods.find(
      item => item.isPrimary && parseInt(item.paymentType, 10) === 0
    )

    if (isPrimaryPayment) {
      const AddressCardContainer = within(SubscribePage).getByTestId('form_card')
      expect(AddressCardContainer).toBeInTheDocument()

      const UpdateButton = within(AddressCardContainer).getByRole('button', { name: 'Update' })
      fireEvent.click(UpdateButton)

      const Badge = within(AddressCardContainer).getByTestId('badge')
      expect(Badge).toHaveTextContent('Primary')

      const addressImage = screen.getByRole('img', { name: 'form_card_image' })
      expect(addressImage).toBeInTheDocument()

      const brand = Object.keys(stripeBrandsEnum).find(key => stripeBrandsEnum[key] === isPrimaryPayment?.cardType)
      const cardLogo = stripeLogoEnum[brand]

      expect(addressImage).toHaveAttribute('src', cardLogo)

      const PaymentForm = within(SubscribePage).getByTestId('payment_form')
      expect(PaymentForm).toBeInTheDocument()

      const NameField = within(PaymentForm).getByTestId('name')
      expect(NameField).toBeInTheDocument()
      fireEvent.focus(NameField)
      fireEvent.change(NameField, { target: { value: 'Jason' } })

      // const CardNumberField = within(PaymentForm).getByTestId('card_number')
      // expect(CardNumberField).toBeInTheDocument()
      // fireEvent.focus(CardNumberField)
      // fireEvent.change(CardNumberField, { target: { value: '1234 1234 1234 1234' } })

      // const ExpiresField = screen.getByTestId('expires')
      // expect(ExpiresField).toBeInTheDocument()
      // fireEvent.focus(ExpiresField)
      // fireEvent.change(ExpiresField, { target: { value: '10/2027' } })

      // const CvcField = screen.getByTestId('cvc')
      // expect(CvcField).toBeInTheDocument()
      // fireEvent.focus(CvcField)
      // fireEvent.change(CvcField, { target: { value: '1234' } })

      const AddressOneField = within(PaymentForm).getByTestId('addressLineOne')
      expect(AddressOneField).toBeInTheDocument()
      fireEvent.focus(AddressOneField)
      fireEvent.change(AddressOneField, { target: { value: 'Mr John Smith' } })

      const AddressTwoField = within(PaymentForm).getByTestId('addressLineTwo')
      expect(AddressTwoField).toBeInTheDocument()
      fireEvent.focus(AddressTwoField)
      fireEvent.change(AddressTwoField, { target: { value: '132 Kingston' } })

      const CityField = within(PaymentForm).getByTestId('city')
      expect(CityField).toBeInTheDocument()
      fireEvent.focus(CityField)
      fireEvent.change(CityField, { target: { value: 'Kingston' } })

      const StateField = within(PaymentForm).getByTestId('state')
      expect(StateField).toBeInTheDocument()
      fireEvent.focus(StateField)
      fireEvent.change(StateField, { target: { value: 'New York' } })

      const ZipCodeField = within(PaymentForm).getByTestId('zipCode')
      expect(ZipCodeField).toBeInTheDocument()
      fireEvent.focus(ZipCodeField)
      fireEvent.change(ZipCodeField, { target: { value: '12401' } })

      const CountryField = within(PaymentForm).getByTestId('country')
      expect(CountryField).toBeInTheDocument()
      fireEvent.focus(CountryField)
      fireEvent.change(CountryField, { target: { value: 'USA' } })

      const SaveButton = within(AddressCardContainer).getByRole('button', { name: 'SAVE' })
      fireEvent.click(SaveButton)
    }
  })

  it('renders Subscribe page and verify payment method address', async () => {
    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const isPrimaryPayment = initialState.Stripe.methods.find(
      item => item.isPrimary && parseInt(item.paymentType, 10) === 0
    )

    if (isPrimaryPayment) {
      const FormCardContainer = screen.getByTestId('form_card')
      expect(FormCardContainer).toBeInTheDocument()

      const UpdateButton = within(FormCardContainer).getByRole('button', { name: 'Update' })
      fireEvent.click(UpdateButton)

      const BilliingAddress = within(FormCardContainer).getByTestId('billing_address')
      expect(BilliingAddress).toBeInTheDocument()

      if (isPrimaryPayment?.address) {
        expect(within(BilliingAddress).getByText(isPrimaryPayment?.address?.lineOne))
        expect(within(BilliingAddress).getByText(isPrimaryPayment?.address?.lineTwo))
        expect(within(BilliingAddress).getByText(isPrimaryPayment?.address?.city))
        expect(within(BilliingAddress).getByText(isPrimaryPayment?.address?.state))
        expect(within(BilliingAddress).getByText(isPrimaryPayment?.address?.zip))
        expect(within(BilliingAddress).getByText(isPrimaryPayment?.address?.country))

        const UpdateButton = within(FormCardContainer).getByRole('button', { name: 'update billing address' })
        fireEvent.click(UpdateButton)
      }
    }
  })

  it('renders Form Card with first Prop', async () => {
    renderWithRedux(<FormCard first={true} />, { initialState })
  })

  it('renders Stripe Form with loading', async () => {
    renderWithRedux(<StripeForm loading={true} address={initialState.Stripe.methods[0]?.address} />, { initialState })

    expect(screen.getByTestId('loading_spinner')).toBeInTheDocument()
  })

  it('renders Subscribe page without primary payment method', async () => {
    initialState.Stripe.methods[0].isPrimary = false

    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const PaymentForm = within(SubscribePage).getByTestId('payment_method_form')
    expect(PaymentForm).toBeInTheDocument()

    const AddButton = within(PaymentForm).getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)

    const FirstNameField = within(PaymentForm).getByTestId('firstName')
    expect(FirstNameField).toBeInTheDocument()
    fireEvent.focus(FirstNameField)
    fireEvent.change(FirstNameField, { target: { value: 'Jason' } })

    const LastNameField = within(PaymentForm).getByTestId('lastName')
    expect(LastNameField).toBeInTheDocument()
    fireEvent.focus(LastNameField)
    fireEvent.change(LastNameField, { target: { value: 'Jason' } })

    const AddressOneField = within(PaymentForm).getByTestId('addressLineOne')
    expect(AddressOneField).toBeInTheDocument()
    fireEvent.focus(AddressOneField)
    fireEvent.change(AddressOneField, { target: { value: 'Mr John Smith' } })

    const AddressTwoField = within(PaymentForm).getByTestId('addressLineTwo')
    expect(AddressTwoField).toBeInTheDocument()
    fireEvent.focus(AddressTwoField)
    fireEvent.change(AddressTwoField, { target: { value: '132 Kingston' } })

    const CityField = within(PaymentForm).getByTestId('city')
    expect(CityField).toBeInTheDocument()
    fireEvent.focus(CityField)
    fireEvent.change(CityField, { target: { value: 'Kingston' } })

    const StateField = within(PaymentForm).getByTestId('state')
    expect(StateField).toBeInTheDocument()
    fireEvent.focus(StateField)
    fireEvent.change(StateField, { target: { value: 'New York' } })

    const ZipCodeField = within(PaymentForm).getByTestId('zipCode')
    expect(ZipCodeField).toBeInTheDocument()
    fireEvent.focus(ZipCodeField)
    fireEvent.change(ZipCodeField, { target: { value: '12401' } })

    const CountryField = within(PaymentForm).getByTestId('country')
    expect(CountryField).toBeInTheDocument()
    fireEvent.focus(CountryField)
    fireEvent.change(CountryField, { target: { value: 'USA' } })

    const SaveButton = within(PaymentForm).getByRole('button', { name: 'SAVE PAYMENT' })
    await act(async () => {
      await fireEvent.click(SaveButton)
    })
  })

  it('renders Payment Method Form with loading', async () => {
    renderWithRedux(<PaymentMethod loading={true} />, {
      initialState
    })

    const PaymentForm = screen.getByTestId('payment_method_form')
    expect(PaymentForm).toBeInTheDocument()

    const AddButton = within(PaymentForm).getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)

    expect(screen.getByTestId('loading_spinner')).toBeInTheDocument()
  })

  it('renders Subscribe page and verify receipt card', async () => {
    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const ReceiptCard = within(SubscribePage).getByTestId('receipt_card')
    expect(ReceiptCard).toBeInTheDocument()
    let selectedPlan = null
    switch (initialState.Auth.selectedPlan) {
      case planEnum.BASIC:
        selectedPlan = 'Basic Unzipped'
        break
      case planEnum.STANDARD:
        selectedPlan = 'Standard Unzipped'
        break

      case planEnum.ADVANCED:
        selectedPlan = 'Advanced Unzipped'
        break

      default:
        selectedPlan = 'Selected'
    }
    expect(within(ReceiptCard).getByText(`${selectedPlan} Plan`))

    const calcPrice = months => {
      return initialState.Auth.planCost * (0.85 - 0.05 * months).toFixed(2)
    }

    const total = (
      calcPrice(initialState.Auth.subscriptionForm?.paymentFrequency).toFixed(2) *
      (12 * initialState.Auth.subscriptionForm?.paymentFrequency > 0
        ? 12 * initialState.Auth.subscriptionForm?.paymentFrequency
        : 1)
    )
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')

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

    expect(
      within(ReceiptCard).getByText(
        `$${total} + tax every ${calcPaymentFrequency(initialState.Auth.subscriptionForm?.paymentFrequency)}`
      )
    )
    const updatedDate = ValidationUtils.addDaysToDate(
      new Date(initialState.Auth.user?.updatedAt) || new Date(),
      initialState.Auth.trialLength
    )
    const month = ValidationUtils.getMonthInText(updatedDate)

    const dateCode = `${month} ${new Date(updatedDate).getDate()}, ${new Date(updatedDate).getFullYear()}`

    expect(within(ReceiptCard).getByText(`You will be charged $${total} + tax on ${dateCode}, when your trial ends.`))

    const plan = PLANS.find(e => e.id === initialState.Auth.selectedPlan)
    const Features = within(ReceiptCard).getByTestId('features')
    plan.features.forEach(feature => {
      expect(within(Features).getByText(feature?.text)).toBeInTheDocument()
    })

    const StartPlanButton = within(ReceiptCard).getByRole('button', { name: 'START PLAN' })
    expect(StartPlanButton).toBeInTheDocument()
    fireEvent.click(StartPlanButton)
  })

  it('renders Subscribe page and verify receipt card with different plans and frequency', async () => {
    initialState.Auth.subscriptionForm.paymentFrequency = 3
    initialState.Auth.selectedPlan = 1
    renderWithRedux(<Subscribe />, { initialState })
    initialState.Auth.subscriptionForm.paymentFrequency = 2
    initialState.Auth.selectedPlan = 2
    renderWithRedux(<Subscribe />, { initialState })

    initialState.Auth.subscriptionForm.paymentFrequency = 1
    initialState.Auth.selectedPlan = 3
    renderWithRedux(<Subscribe />, { initialState })

    initialState.Auth.subscriptionForm.paymentFrequency = 0
    initialState.Auth.selectedPlan = null
    renderWithRedux(<Subscribe />, { initialState })
  })

  it('renders Subscribe page and verify receipt card without plans', async () => {
    initialState.Auth.plans = undefined
    initialState.Auth.trialLength = undefined
    renderWithRedux(<Subscribe />, { initialState })
  })

  it('renders Subscribe page and verify receipt card without plans', async () => {
    initialState.Auth.user.updatedAt = undefined
    renderWithRedux(<Subscribe />, { initialState })
  })

  it('should return the token from cookies', async () => {
    const mockToken = 'mock-token'

    parseCookies.mockReturnValue({ token: mockToken })

    const req = { headers: { cookie: 'token=mock-token' } }
    const res = {}

    const result = await Subscribe.getInitialProps({ req, res })

    expect(result).toEqual({ token: { token: mockToken } })
  })

  // // // Mobile

  it('renders Pick a plan page on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Plan selectAPlan={selectAPlan} />, { initialState })
    const PickPlanPage = screen.getByTestId('pick_plan')
    expect(PickPlanPage).toBeInTheDocument()
    expect(PickPlanPage).toHaveTextContent(/Pick a plan/i)
    const updatedDate = ValidationUtils.addDaysToDate(
      initialState.Auth.user?.updatedAt || new Date(),
      initialState.Auth.trialLength
    )
  })

  it('renders Subscribe page and verify Subscription card detail', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const updatedDate = ValidationUtils.addDaysToDate(
      new Date(initialState.Auth.user?.updatedAt) || new Date(),
      initialState.Auth.trialLength
    )
    const month = ValidationUtils.getMonthInText(updatedDate)
    const dateCode = `${month} ${new Date(updatedDate).getDate()}, ${new Date(updatedDate).getFullYear()}`

    const HeaderContainer = screen.getByTestId('back_header')

    let PlanName = null
    switch (initialState.Auth.selectedPlan) {
      case planEnum.BASIC:
        PlanName = 'Basic Unzipped'
        break
      case planEnum.STANDARD:
        PlanName = 'Standard Unzipped'
        break
      case planEnum.ADVANCED:
        PlanName = 'Advanced Unzipped'
        break
      default:
        PlanName = 'Selected'
    }

    expect(within(HeaderContainer).getByText(`Confirm ${PlanName} Plan`))

    expect(
      within(SubscribePage).getByText(`We won’t charge you until your free trial ends on ${dateCode}.`)
    ).toBeInTheDocument()

    expect(
      within(SubscribePage).getByText(`Chose how often you’d like to be billed. You can cancel anytime.`)
    ).toBeInTheDocument()

    const CardOption = within(SubscribePage).getByTestId(`0_card`)
    expect(CardOption).toBeInTheDocument()
    fireEvent.click(CardOption)

    const ConfirmButton = within(SubscribePage).getByRole('button', { name: 'CONFIRM BILLING CYCLE' })
    expect(ConfirmButton).toBeInTheDocument()
    fireEvent.click(ConfirmButton)

    act(() => {
      jest.advanceTimersByTime(760)
    })

    const imgElement = screen.getByTestId('done_image')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671323871/verifiedCheck_w902qa.png'
    )
    expect(imgElement).toHaveAttribute('height', '34px')
    expect(imgElement).toHaveAttribute('width', '34px')

    const SetBilling = within(SubscribePage).getByText('Billing cycle')
    fireEvent.click(SetBilling)
    expect(within(SubscribePage).getByRole('button', { name: 'CONFIRM BILLING CYCLE' })).toBeInTheDocument()
  })

  it('renders Subscribe page and add business address', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const AddButton = within(SubscribePage).getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)

    const BusinessAddressContainer = within(SubscribePage).getByTestId('business_address')
    expect(BusinessAddressContainer).toBeInTheDocument()

    expect(within(BusinessAddressContainer).getByText('Business Address')).toBeInTheDocument()

    const CountryField = within(BusinessAddressContainer).getByTestId('businessCountry')
    expect(CountryField).toBeInTheDocument()
    fireEvent.focus(CountryField)
    fireEvent.change(CountryField, { target: { value: 'United States' } })

    const FirstNameField = within(BusinessAddressContainer).getByTestId('businessFirstName')
    expect(FirstNameField).toBeInTheDocument()
    fireEvent.focus(FirstNameField)
    fireEvent.change(FirstNameField, { target: { value: 'Jason' } })

    const LastNameField = within(BusinessAddressContainer).getByTestId('businessLastName')
    expect(LastNameField).toBeInTheDocument()
    fireEvent.focus(LastNameField)
    fireEvent.change(LastNameField, { target: { value: 'Maynard' } })

    const AddressField = within(BusinessAddressContainer).getByTestId('businessAddressLineOne')
    expect(AddressField).toBeInTheDocument()
    fireEvent.focus(AddressField)
    fireEvent.change(AddressField, { target: { value: 'Mr John Smith' } })

    const AppartmentField = within(BusinessAddressContainer).getByTestId('businessAddressLineTwo')
    expect(AppartmentField).toBeInTheDocument()
    fireEvent.focus(AppartmentField)
    fireEvent.change(AppartmentField, { target: { value: '132' } })

    const CityField = within(BusinessAddressContainer).getByTestId('businessCity')
    expect(CityField).toBeInTheDocument()
    fireEvent.focus(CityField)
    fireEvent.change(CityField, { target: { value: 'Kingston' } })

    const StateField = within(BusinessAddressContainer).getByTestId('businessState')
    expect(StateField).toBeInTheDocument()
    fireEvent.focus(StateField)
    fireEvent.change(StateField, { target: { value: 'New York' } })

    const ZipCodeField = within(BusinessAddressContainer).getByTestId('businessZip')
    expect(ZipCodeField).toBeInTheDocument()
    fireEvent.focus(ZipCodeField)
    fireEvent.change(ZipCodeField, { target: { value: '12401' } })

    const PhoneField = within(BusinessAddressContainer).getByTestId('businessPhone')
    expect(PhoneField).toBeInTheDocument()
    fireEvent.focus(PhoneField)
    fireEvent.change(PhoneField, { target: { value: '(555) 555-1234' } })

    const SaveButton = within(BusinessAddressContainer).getByRole('button', { name: 'SAVE ADDRESS' })
    expect(SaveButton).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(SaveButton)
    })
    act(() => {
      jest.advanceTimersByTime(1000)
    })
  })

  it('renders Subscribe page and verify address card', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const AddressCardContainer = within(SubscribePage).getByTestId('address_card')
    expect(AddressCardContainer).toBeInTheDocument()

    const Badge = within(AddressCardContainer).getByTestId('badge')
    expect(Badge).toHaveTextContent('Address')

    const addressImage = screen.getByRole('img', { name: 'address_card_image' })
    expect(addressImage).toBeInTheDocument()
    expect(addressImage).toHaveAttribute('src', '/img/Unzipped-Primary-Logo.png')

    const UpdateButton = within(AddressCardContainer).getByTestId('update_icon')
    fireEvent.click(UpdateButton)
  })

  it('renders Subscribe page and verify payment method address', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const isPrimaryPayment = initialState.Stripe.methods.find(
      item => item.isPrimary && parseInt(item.paymentType, 10) === 0
    )

    if (isPrimaryPayment) {
      const FormCardContainer = screen.getByTestId('form_card')
      expect(FormCardContainer).toBeInTheDocument()

      const UpdateButton = within(FormCardContainer).getByRole('button', { name: 'Update' })
      fireEvent.click(UpdateButton)

      const BilliingAddress = within(FormCardContainer).getByTestId('billing_address')
      expect(BilliingAddress).toBeInTheDocument()

      if (isPrimaryPayment?.address) {
        expect(within(BilliingAddress).getByText(isPrimaryPayment?.address?.lineOne))
        expect(within(BilliingAddress).getByText(isPrimaryPayment?.address?.lineTwo))
        expect(within(BilliingAddress).getByText(isPrimaryPayment?.address?.city))
        expect(within(BilliingAddress).getByText(isPrimaryPayment?.address?.state))
        expect(within(BilliingAddress).getByText(isPrimaryPayment?.address?.zip))
        expect(within(BilliingAddress).getByText(isPrimaryPayment?.address?.country))

        const UpdateButton = within(FormCardContainer).getByRole('button', { name: 'update billing address' })
        fireEvent.click(UpdateButton)
      }
    }
  })

  it('renders Subscribe page and verify form card', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Stripe.methods[0].address = undefined

    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const isPrimaryPayment = initialState.Stripe.methods.find(
      item => item.isPrimary && parseInt(item.paymentType, 10) === 0
    )

    if (isPrimaryPayment) {
      const AddressCardContainer = within(SubscribePage).getByTestId('form_card')
      expect(AddressCardContainer).toBeInTheDocument()

      const UpdateButton = within(AddressCardContainer).getByRole('button', { name: 'Update' })
      fireEvent.click(UpdateButton)

      const Badge = within(AddressCardContainer).getByTestId('badge')
      expect(Badge).toHaveTextContent('Primary')

      const addressImage = screen.getByRole('img', { name: 'form_card_image' })
      expect(addressImage).toBeInTheDocument()

      const brand = Object.keys(stripeBrandsEnum).find(key => stripeBrandsEnum[key] === isPrimaryPayment?.cardType)
      const cardLogo = stripeLogoEnum[brand]

      expect(addressImage).toHaveAttribute('src', cardLogo)

      const PaymentForm = within(SubscribePage).getByTestId('payment_form')
      expect(PaymentForm).toBeInTheDocument()

      const NameField = within(PaymentForm).getByTestId('name')
      expect(NameField).toBeInTheDocument()
      fireEvent.focus(NameField)
      fireEvent.change(NameField, { target: { value: 'Jason' } })

      // const CardNumberField = screen.getByTestId('card_number')
      // expect(CardNumberField).toBeInTheDocument()
      // fireEvent.focus(CardNumberField)
      // fireEvent.change(CardNumberField, { target: { value: '1234 1234 1234 1234' } })

      // const ExpiresField = screen.getByTestId('expires')
      // expect(ExpiresField).toBeInTheDocument()
      // fireEvent.focus(ExpiresField)
      // fireEvent.change(ExpiresField, { target: { value: '10/2027' } })

      // const CvcField = screen.getByTestId('cvc')
      // expect(CvcField).toBeInTheDocument()
      // fireEvent.focus(CvcField)
      // fireEvent.change(CvcField, { target: { value: '1234' } })

      const AddressOneField = within(PaymentForm).getByTestId('addressLineOne')
      expect(AddressOneField).toBeInTheDocument()
      fireEvent.focus(AddressOneField)
      fireEvent.change(AddressOneField, { target: { value: 'Mr John Smith' } })

      const AddressTwoField = within(PaymentForm).getByTestId('addressLineTwo')
      expect(AddressTwoField).toBeInTheDocument()
      fireEvent.focus(AddressTwoField)
      fireEvent.change(AddressTwoField, { target: { value: '132 Kingston' } })

      const CityField = within(PaymentForm).getByTestId('city')
      expect(CityField).toBeInTheDocument()
      fireEvent.focus(CityField)
      fireEvent.change(CityField, { target: { value: 'Kingston' } })

      const StateField = within(PaymentForm).getByTestId('state')
      expect(StateField).toBeInTheDocument()
      fireEvent.focus(StateField)
      fireEvent.change(StateField, { target: { value: 'New York' } })

      const ZipCodeField = within(PaymentForm).getByTestId('zipCode')
      expect(ZipCodeField).toBeInTheDocument()
      fireEvent.focus(ZipCodeField)
      fireEvent.change(ZipCodeField, { target: { value: '12401' } })

      const CountryField = within(PaymentForm).getByTestId('country')
      expect(CountryField).toBeInTheDocument()
      fireEvent.focus(CountryField)
      fireEvent.change(CountryField, { target: { value: 'USA' } })

      const SaveButton = within(AddressCardContainer).getByRole('button', { name: 'SAVE' })
      fireEvent.click(SaveButton)
    }
  })

  it('renders Subscribe page without primary payment method', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Stripe.methods[0].isPrimary = false

    renderWithRedux(<Subscribe />, { initialState })
    const SubscribePage = screen.getByTestId('subscribe_page')
    expect(SubscribePage).toBeInTheDocument()

    const PaymentForm = within(SubscribePage).getByTestId('payment_method_form')
    expect(PaymentForm).toBeInTheDocument()

    const AddButton = within(PaymentForm).getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)

    const FirstNameField = within(PaymentForm).getByTestId('firstName')
    expect(FirstNameField).toBeInTheDocument()
    fireEvent.focus(FirstNameField)
    fireEvent.change(FirstNameField, { target: { value: 'Jason' } })

    const LastNameField = within(PaymentForm).getByTestId('lastName')
    expect(LastNameField).toBeInTheDocument()
    fireEvent.focus(LastNameField)
    fireEvent.change(LastNameField, { target: { value: 'Jason' } })

    const AddressOneField = within(PaymentForm).getByTestId('addressLineOne')
    expect(AddressOneField).toBeInTheDocument()
    fireEvent.focus(AddressOneField)
    fireEvent.change(AddressOneField, { target: { value: 'Mr John Smith' } })

    const AddressTwoField = within(PaymentForm).getByTestId('addressLineTwo')
    expect(AddressTwoField).toBeInTheDocument()
    fireEvent.focus(AddressTwoField)
    fireEvent.change(AddressTwoField, { target: { value: '132 Kingston' } })

    const CityField = within(PaymentForm).getByTestId('city')
    expect(CityField).toBeInTheDocument()
    fireEvent.focus(CityField)
    fireEvent.change(CityField, { target: { value: 'Kingston' } })

    const StateField = within(PaymentForm).getByTestId('state')
    expect(StateField).toBeInTheDocument()
    fireEvent.focus(StateField)
    fireEvent.change(StateField, { target: { value: 'New York' } })

    const ZipCodeField = within(PaymentForm).getByTestId('zipCode')
    expect(ZipCodeField).toBeInTheDocument()
    fireEvent.focus(ZipCodeField)
    fireEvent.change(ZipCodeField, { target: { value: '12401' } })

    const CountryField = within(PaymentForm).getByTestId('country')
    expect(CountryField).toBeInTheDocument()
    fireEvent.focus(CountryField)
    fireEvent.change(CountryField, { target: { value: 'USA' } })

    const SaveButton = within(PaymentForm).getByRole('button', { name: 'SAVE PAYMENT' })
    await act(async () => {
      await fireEvent.click(SaveButton)
    })
  })
})
