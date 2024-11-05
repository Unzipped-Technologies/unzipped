import React from 'react'
import { useRouter } from 'next/router'
import { makeStore } from '../../redux/store'
import { Provider } from 'react-redux'
import keys from '../../config/keys'
import { loadUser } from '../../redux/Auth/actions'
import { faker } from '@faker-js/faker'
import axios from 'axios'
import { PaymentMethods } from '../store/Stripe'
import Account from '../../pages/dashboard/account' // Adjust the import path as needed
import ChangePassword from '../../pages/change-password' // Adjust the import path as needed
import ChangePhone from '../../pages/change-phone' // Adjust the import path as needed
import ChangeEmail from '../../pages/change-email' // Adjust the import path as needed
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'
import { fireEvent, screen, waitFor, act, render, within, prettyDOM } from '@testing-library/react'
import DesktopAccount from '../../components/unzipped/dashboard/DesktopAccount' // Adjust the import path as needed
import {
  getPaymentMethods,
  getAccountOnboardingLink,
  getBusinessDetails,
  getAccountBalance,
  getCurrentUserData,
  updateCurrentUser
} from '../../redux/actions'
import { logoutUser, updateUserEmail, changePassword, updatePhoneNumber } from '../../redux/Auth/actions'

const _ = require('lodash')

jest.useFakeTimers() // Enable fake timers

// jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

// jest.mock('../../redux/Stripe/actions', () => ({
//   ...jest.requireActual('../../redux/Stripe/actions'),
//   getPaymentMethods: jest.fn(),
//   getAccountOnboardingLink: jest.fn(),
//   getAccountBalance: jest.fn()
// }))
// jest.mock('../../redux/Business/actions', () => ({
//   ...jest.requireActual('../../redux/Business/actions'),
//   getBusinessDetails: jest.fn()
// }))
// jest.mock('../../redux/Auth/actions', () => ({
//   ...jest.requireActual('../../redux/Auth/actions'),
//   getCurrentUserData: jest.fn(),
//   updateCurrentUser: jest.fn()
// }))

let store, state

describe('DesktopAccount Component', () => {
  let mockRouterPush, mockRouterBack, loadUserPromise, container

  beforeAll(async () => {
    axios.defaults.baseURL = 'http://localhost:3000'

    // Initialize the store
    store = await makeStore({ isServer: false })
    // Dispatch the loadUser action
    await store.dispatch(
      loadUser({
        email: keys?.testClientEmail,
        password: keys?.testClientPassword
      })
    )

    // mockRouterPush = jest.fn()
    // mockRouterBack = jest.fn()

    // useRouter.mockImplementation(() => ({
    //   pathname: '/',
    //   push: mockRouterPush,
    //   replace: jest.fn(),
    //   prefetch: jest.fn(),
    //   back: mockRouterBack
    // }))
    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })
    state = store.getState()
  })

  beforeEach(async () => {
    if (!state?.Auth?.isAuthenticated) {
      throw new Error('Unauthenticated....')
    }

    mockRouterPush = jest.fn()
    mockRouterBack = jest.fn()
    await useRouter.mockImplementation(() => ({
      pathname: '/',
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: mockRouterBack
    }))

    container = null
    await act(async () => {
      const rendered = render(
        <Provider store={store}>
          <Account />
        </Provider>
      )
      container = rendered.container
    })
  }, 100000000000)

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  // it('renders Account and MobileFreelancerFooter components when window width is < 680px', () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   renderWithRedux(<Account />, { initialState })
  // })

  it('renders  Account with initial state from Redux store', async () => {
    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })
    const UserData = state.Auth.user
    const NewBalance = {
      available: [
        {
          amount: 100
        }
      ]
    }
    await act(async () => {
      await store.dispatch({
        type: 'GET_ACCOUNT_BALANCE',
        payload: NewBalance
      })
    })

    await act(async () => {
      await store.dispatch({
        type: 'GET_PAYMENT_METHODS',
        payload: PaymentMethods
      })
    })

    state = store.getState()
    const Stripe = state.Stripe
    const BusinessState = state.Business
    const ProfileContainer = container.querySelector('#profile_data')
    expect(ProfileContainer).toBeInTheDocument()

    expect(within(ProfileContainer).getByText(UserData.email)).toBeInTheDocument()
    expect(within(ProfileContainer).getByText(`Phone: ${UserData.phoneNumber ?? 'N/A'}`)).toBeInTheDocument()

    const EmailLink = within(ProfileContainer).getByText(`Change email`)
    expect(EmailLink).toBeInTheDocument()

    const PasswordLink = within(ProfileContainer).getByText(`Change password`)
    expect(PasswordLink).toBeInTheDocument()

    const PhoneLink = within(ProfileContainer).getByText(`Change number`)
    expect(PhoneLink).toBeInTheDocument()

    const BillingDetailLink = within(ProfileContainer).getByText(`Billing details`)
    expect(BillingDetailLink).toBeInTheDocument()

    const ManagePayment = within(ProfileContainer).getByText(`Manage payment method`)
    expect(ManagePayment).toBeInTheDocument()

    expect(
      within(ProfileContainer).getByText(
        `$ ${(Stripe.balance?.available[0]?.amount / 100).toFixed(2).toLocaleString()}`
      )
    ).toBeInTheDocument()

    if (UserData.stripeAccountId) {
      const Withdraw = within(ProfileContainer).getByText(`Withdraw Funds`)
      expect(Withdraw).toBeInTheDocument()
    } else {
      expect(within(ProfileContainer).getByText('Complete Onboarding')).toBeInTheDocument()
    }

    const ViewProfileButton = within(ProfileContainer).getByRole('button', { name: 'View profile' })
    expect(ViewProfileButton).toBeInTheDocument()

    const PlanContainer = container.querySelector('#plan_detail')
    expect(within(PlanContainer).getByText(UserData.email)).toBeInTheDocument()

    const PlanLink = within(PlanContainer).getByText(`Change plan`)
    expect(PlanLink).toBeInTheDocument()

    const BusinessProfileContainer = container.querySelector('#business_profile')

    expect(within(BusinessProfileContainer).getByTestId('FirstName').value).toBe(UserData.FirstName)
    expect(within(BusinessProfileContainer).getByTestId('LastName').value).toBe(UserData.LastName)

    expect(within(BusinessProfileContainer).getByTestId('AddressLineOne').value).toBe(UserData.AddressLineOne)
    expect(within(BusinessProfileContainer).getByTestId('AddressLineTwo').value).toBe(UserData.AddressLineTwo)
    expect(within(BusinessProfileContainer).getByTestId('AddressCity').value).toBe(UserData.AddressCity)
    expect(within(BusinessProfileContainer).getByTestId('AddressState').value).toBe(UserData.AddressState)
    expect(within(BusinessProfileContainer).getByTestId('AddressZip').value).toBe(UserData.AddressZip)

    expect(within(BusinessProfileContainer).getByTestId('businessName').value).toBe(
      BusinessState.details.businessName ?? ''
    )
    expect(within(BusinessProfileContainer).getByTestId('businessType').value).toBe(BusinessState.details.type ?? '')
    expect(within(BusinessProfileContainer).getByTestId('businessPhone').value).toBe(
      BusinessState.details.businessPhone ?? ''
    )
    expect(within(BusinessProfileContainer).getByTestId('taxId').value).toBe(BusinessState.details.taxId ?? '')
  })

  it('renders  Account and click on Manage payment method link', async () => {
    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })

    const ProfileContainer = container.querySelector('#profile_data')
    expect(ProfileContainer).toBeInTheDocument()
    const ManagePayment = within(ProfileContainer).getByText(`Manage payment method`)
    expect(ManagePayment).toBeInTheDocument()
    fireEvent.click(ManagePayment)

    // expect(mockRouterPush).toHaveBeenCalledWith(`/manage-payment-method`)
  })

  it('renders  Account and click on Billing details link', async () => {
    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })

    const ProfileContainer = container.querySelector('#profile_data')

    const BillingDetailLink = within(ProfileContainer).getByText(`Billing details`)
    expect(BillingDetailLink).toBeInTheDocument()
    fireEvent.click(BillingDetailLink)
  })

  it('renders  Account and click on Withdraw Funds link', async () => {
    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })
    const ProfileContainer = container.querySelector('#profile_data')

    const WithdrawLink = within(ProfileContainer).getByText(`Withdraw Funds`)
    expect(WithdrawLink).toBeInTheDocument()
    fireEvent.click(WithdrawLink)
  })

  it('renders  Account and click on Change plan link', async () => {
    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })

    const PlanContainer = container.querySelector('#plan_detail')

    const PlanLink = within(PlanContainer).getByText(`Change plan`)
    fireEvent.click(PlanLink)
  })

  it('renders  Account and click on view profile button', async () => {
    // await act(async () => {
    //   render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    // })

    const viewProfileButton = screen.getByTestId('view_profile')
    fireEvent.click(viewProfileButton)
  })

  it('renders  Account and edit info', async () => {
    if (!state?.Auth?.isAuthenticated) {
      throw new Error('Unauthenticated....')
    }

    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })

    const editNameButton = screen.getByTestId('edit_name_button')
    fireEvent.click(editNameButton)

    const FirstName = faker.person.firstName()
    const LastName = faker.person.lastName()

    const FirstNameElement = screen.getByTestId('FirstName')
    fireEvent.click(FirstNameElement)
    fireEvent.blur(FirstNameElement)
    fireEvent.click(FirstNameElement)

    fireEvent.change(FirstNameElement, {
      target: { value: FirstName }
    })
    fireEvent.blur(FirstNameElement)

    expect(FirstNameElement.value).toBe(FirstName)

    const LastNameElement = screen.getByTestId('LastName')
    fireEvent.click(LastNameElement)

    fireEvent.change(LastNameElement, {
      target: { value: LastName }
    })

    fireEvent.blur(LastNameElement)

    expect(LastNameElement.value).toBe(LastName)

    const editAddressButton = screen.getByTestId('edit_address_button')
    fireEvent.click(editAddressButton)

    const AddressLineOne = faker.location.streetAddress()
    const AddressLineTwo = faker.location.secondaryAddress()
    const AddressCity = faker.location.city()
    const AddressState = faker.location.state()
    const AddressZip = faker.string.alpha(10)

    const AddressLineOneElement = screen.getByTestId('AddressLineOne')
    fireEvent.click(AddressLineOneElement)

    fireEvent.change(AddressLineOneElement, {
      target: { value: AddressLineOne }
    })

    fireEvent.blur(AddressLineOneElement)
    expect(AddressLineOneElement.value).toBe(AddressLineOne)

    const AddressLineTwoElement = screen.getByTestId('AddressLineTwo')
    fireEvent.click(AddressLineTwoElement)

    fireEvent.change(AddressLineTwoElement, {
      target: { value: AddressLineTwo }
    })

    fireEvent.blur(AddressLineTwoElement)
    expect(AddressLineTwoElement.value).toBe(AddressLineTwo)

    const AddressCityElement = screen.getByTestId('AddressCity')
    fireEvent.click(AddressCityElement)

    fireEvent.change(AddressCityElement, {
      target: { value: AddressCity }
    })
    fireEvent.blur(AddressCityElement)
    expect(AddressCityElement.value).toBe(AddressCity)

    const AddressStateElement = screen.getByTestId('AddressState')
    fireEvent.click(AddressStateElement)
    fireEvent.change(AddressStateElement, {
      target: { value: AddressState }
    })
    fireEvent.blur(AddressStateElement)
    expect(AddressStateElement.value).toBe(AddressState)

    const AddressZipElement = screen.getByTestId('AddressZip')
    fireEvent.click(AddressZipElement)
    fireEvent.change(AddressZipElement, {
      target: { value: AddressZip }
    })

    fireEvent.blur(AddressZipElement)
    expect(AddressZipElement.value).toBe(AddressZip)

    const BusinessName = faker.location.streetAddress()
    const BusinessType = faker.location.secondaryAddress()
    const BusinessPhone = faker.location.city()
    const TaxID = faker.string.alphanumeric(10)

    const editCompanyButton = screen.getByTestId('edit_company_button')
    fireEvent.click(editCompanyButton)

    const BusinessProfileContainer = container.querySelector('#business_profile')
    expect(BusinessProfileContainer).toBeInTheDocument()

    const businessNameElement = within(BusinessProfileContainer).getByTestId('businessName')
    fireEvent.click(businessNameElement)

    fireEvent.change(businessNameElement, {
      target: { value: BusinessName }
    })

    fireEvent.blur(businessNameElement)
    expect(businessNameElement.value).toBe(BusinessName)

    const businessTypeElement = within(BusinessProfileContainer).getByTestId('businessType')
    fireEvent.click(businessTypeElement)

    fireEvent.change(businessTypeElement, {
      target: { value: BusinessType }
    })

    fireEvent.blur(businessTypeElement)
    expect(businessTypeElement.value).toBe(BusinessType)

    const businessPhoneElement = within(BusinessProfileContainer).getByTestId('businessPhone')
    fireEvent.click(businessPhoneElement)

    fireEvent.change(businessPhoneElement, {
      target: { value: BusinessPhone }
    })
    fireEvent.blur(businessPhoneElement)
    expect(businessPhoneElement.value).toBe(BusinessPhone)

    const TaxIdElement = within(BusinessProfileContainer).getByTestId('taxId')
    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: TaxID }
    })
    fireEvent.blur(TaxIdElement)

    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: '' }
    })
    fireEvent.blur(TaxIdElement)

    const SaveButton = screen.getByRole('button', { name: 'Save Settings' })
    expect(SaveButton).toBeInTheDocument()
    expect(SaveButton).toBeEnabled()

    await act(async () => {
      await fireEvent.click(SaveButton)
    })
  }, 100000000000)

  it('renders  Account and display verify business details as a text for edit button', async () => {
    state = store.getState()
    const Details = state.Businessdetails
    await act(async () => {
      await store.dispatch({
        type: 'GET_BUSINESS_DETAILS',
        payload: null
      })
    })
    // await act(async () => {
    //   render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    // })

    expect(screen.getByText('verify business details')).toBeInTheDocument
    await act(async () => {
      await store.dispatch({
        type: 'GET_BUSINESS_DETAILS',
        payload: { ...Details }
      })
    })
  })

  it('renders  Account and edit company details with error', async () => {
    state = store.getState()

    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })

    const Token = state.Auth.token

    let User = {
      ...state.Auth.user,
      cookie:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    }
    await act(async () => {
      await store.dispatch({
        type: 'USER_LOADED',
        payload: { ...User }
      })
    })
    const TaxID = faker.string.alphanumeric(10)

    const editCompanyButton = screen.getByTestId('edit_company_button')
    fireEvent.click(editCompanyButton)

    const BusinessProfileContainer = container.querySelector('#business_profile')
    expect(BusinessProfileContainer).toBeInTheDocument()

    const TaxIdElement = within(BusinessProfileContainer).getByTestId('taxId')
    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: TaxID }
    })
    fireEvent.blur(TaxIdElement)

    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: '' }
    })
    fireEvent.blur(TaxIdElement)

    const SaveButton = screen.getByRole('button', { name: 'Save Settings' })
    expect(SaveButton).toBeInTheDocument()
    expect(SaveButton).toBeEnabled()

    await act(async () => {
      await fireEvent.click(SaveButton)
    })

    User = {
      ...state.Auth.user,
      cookie: Token
    }
    await act(async () => {
      await store.dispatch({
        type: 'USER_LOADED',
        payload: { ...User }
      })
    })

    await waitFor(() => expect(screen.getByTestId('account_error')).toBeInTheDocument())
    expect(screen.getByTestId('account_error')).toHaveTextContent('Please log in to continue')
  })

  it('renders  Account and set required error for input field', async () => {
    // await act(async () => {
    //   render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    // })
    const editNameButton = screen.getByTestId('edit_name_button')
    fireEvent.click(editNameButton)

    const FirstNameElement = screen.getByTestId('FirstName')
    fireEvent.click(FirstNameElement)

    fireEvent.change(FirstNameElement, {
      target: { value: '' }
    })

    fireEvent.blur(FirstNameElement)
  })

  it('renders  Account and set update disable if values not change', async () => {
    // await act(async () => {
    //   render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    // })
    const editNameButton = screen.getByTestId('edit_name_button')
    fireEvent.click(editNameButton)

    const FirstNameElement = screen.getByTestId('FirstName')
    fireEvent.click(FirstNameElement)

    fireEvent.blur(FirstNameElement)
  })

  it('renders  Account and give valid tax id input', async () => {
    // await act(async () => {
    //   render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    // })
    const TaxIdElement = screen.getByTestId('taxId')
    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: '32-1234567' }
    })
    expect(TaxIdElement.value).toBe('32-1234567')

    fireEvent.blur(TaxIdElement)
  })

  it('calls getAccountBalance on mount and sets up an interval', async () => {
    // Render the component
    // await act(async () => {
    //   render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    // })

    // Advance the timers by 5 minutes (300000 ms)
    act(() => {
      jest.advanceTimersByTime(300000)
    })

    // Wait for the interval function to be called
    await waitFor(() => {})

    // Advance the timers by another 5 minutes
    act(() => {
      jest.advanceTimersByTime(300000)
    })

    // Wait for the interval function to be called again
    await waitFor(() => {})

    // Unmount the component to trigger the cleanup function
    jest.clearAllTimers()
  })

  it('Change email successfully', async () => {
    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })

    const UserData = state.Auth.user

    await waitFor(() => {})

    const ProfileContainer = container.querySelector('#profile_data')
    expect(ProfileContainer).toBeInTheDocument()

    const EmailLink = within(ProfileContainer).getByText(`Change email`)
    fireEvent.click(EmailLink)

    await act(async () => {
      const rendered = render(
        <Provider store={store}>
          <ChangeEmail />
        </Provider>
      )
      container = rendered.container
    })

    const saveEmailButton = screen.getByTestId('save_email_changes')
    expect(saveEmailButton).toBeDisabled()
    expect(saveEmailButton).toBeInTheDocument()

    const cancelEmailButton = screen.getByTestId('cancel_email_changes')
    expect(cancelEmailButton).toBeEnabled()
    expect(cancelEmailButton).toBeInTheDocument()

    const currentEmailElement = screen.getByTestId('currentEmail')
    expect(currentEmailElement.value).toBe(UserData.email)
    expect(currentEmailElement).toBeDisabled()

    const emailElement = screen.getByTestId('email')
    expect(emailElement.value).toBe('')
    expect(emailElement).toBeEnabled()

    fireEvent.click(emailElement)

    const newEmail = 'new_email_user@gmail.com'

    fireEvent.change(emailElement, {
      target: { value: newEmail }
    })

    state.Auth.user.email = newEmail
    fireEvent.blur(emailElement)

    expect(emailElement.value).toBe(newEmail)

    fireEvent.submit(screen.getByTestId('change_email_form'))
    await waitFor(() => {})
  })

  it('Change password successfully', async () => {
    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })

    const ProfileContainer = container.querySelector('#profile_data')
    expect(ProfileContainer).toBeInTheDocument()

    const PasswordLink = within(ProfileContainer).getByText(`Change password`)
    fireEvent.click(PasswordLink)

    await act(async () => {
      const rendered = render(
        <Provider store={store}>
          <ChangePassword />
        </Provider>
      )
      container = rendered.container
    })

    const cancelPasswordButton = screen.getByTestId('cancel_password_changes')
    expect(cancelPasswordButton).toBeEnabled()
    expect(cancelPasswordButton).toBeInTheDocument()

    const savePasswordButton = screen.getByTestId('save_password_changes')
    expect(savePasswordButton).toBeDisabled()
    expect(savePasswordButton).toBeInTheDocument()

    const currentPasswordElement = screen.getByTestId('password')
    expect(currentPasswordElement).toBeEnabled()

    const newPasswordElement = screen.getByTestId('newPassword')
    expect(newPasswordElement.value).toBe('')
    expect(newPasswordElement).toBeEnabled()

    const confirmNewPasswordElement = screen.getByTestId('confirmNewPassword')
    expect(confirmNewPasswordElement.value).toBe('')
    expect(confirmNewPasswordElement).toBeEnabled()

    fireEvent.click(currentPasswordElement)
    fireEvent.change(currentPasswordElement, {
      target: { value: 'Hello@2024' }
    })
    fireEvent.blur(currentPasswordElement)

    fireEvent.click(newPasswordElement)
    fireEvent.change(newPasswordElement, {
      target: { value: 'Hello@20242' }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: 'Hello@2024' }
    })
    fireEvent.blur(confirmNewPasswordElement)

    fireEvent.submit(screen.getByTestId('change_password_form'))
    await waitFor(() => {})
  })

  it('Change phone number successfully', async () => {
    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })
    await waitFor(() => {})

    const ProfileContainer = container.querySelector('#profile_data')
    expect(ProfileContainer).toBeInTheDocument()

    const PhoneLink = within(ProfileContainer).getByText(`Change number`)
    fireEvent.click(PhoneLink)

    await act(async () => {
      const rendered = render(
        <Provider store={store}>
          <ChangePhone />
        </Provider>
      )
      container = rendered.container
    })

    const currentPhoneElement = screen.getByTestId('currentPhone')
    expect(currentPhoneElement.value).toBe(state.Auth.user.phoneNumber)
    expect(currentPhoneElement).toBeDisabled()

    const phoneElement = screen.getByTestId('phone')

    fireEvent.click(phoneElement)

    const NewPhone = '(123) 456-7891'
    fireEvent.change(phoneElement, {
      target: { value: NewPhone }
    })

    state.Auth.user.phoneNumber = fireEvent.blur(phoneElement)

    expect(phoneElement.value).toBe(NewPhone)

    fireEvent.blur(phoneElement)

    fireEvent.submit(screen.getByTestId('change_phone_form'))
    await waitFor(() => {})
  })

  it('renders  Account page without some data', async () => {
    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })

    const UserData = state.Auth.user

    await act(async () => {
      await store.dispatch({
        type: 'GET_PAYMENT_METHODS',
        payload: undefined
      })
    })

    let User = {
      ...state.Auth.user,
      FirstName: undefined,
      LastName: undefined,
      AddressState: undefined,
      phoneNumber: undefined,
      cookie: state.Auth.token,
      stripeAccountId: undefined
    }
    await act(async () => {
      await store.dispatch({
        type: 'USER_LOADED',
        payload: { ...User }
      })
    })

    const ProfileContainer = container.querySelector('#profile_data')
    expect(ProfileContainer).toBeInTheDocument()

    const completeOnboardingButton = within(ProfileContainer).getByText('Complete Onboarding')
    expect(completeOnboardingButton).toBeInTheDocument()
    fireEvent.click(completeOnboardingButton)

    User = {
      ...UserData
    }
    await act(async () => {
      await store.dispatch({
        type: 'USER_LOADED',
        payload: { ...User }
      })
    })
  })

  // // Freelancer
  it('renders  Account and click on view profile button with role 1', async () => {
    // await act(async () => {
    //   const rendered = render(
    //     <Provider store={store}>
    //       <Account />
    //     </Provider>
    //   )
    //   container = rendered.container
    // })

    const UserData = state.Auth.user

    await act(async () => {
      await store.dispatch({
        type: 'GET_PAYMENT_METHODS',
        payload: undefined
      })
    })

    let User = {
      ...state.Auth.user,
      role: 1
    }
    await act(async () => {
      await store.dispatch({
        type: 'USER_LOADED',
        payload: { ...User }
      })
    })

    const viewProfileButton = screen.getByTestId('view_profile')
    fireEvent.click(viewProfileButton)
  })

  // // Mobile View
  // it('renders Account and MobileFreelancerFooter components when window width is < 680px', () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   state.Auth.user = _.cloneDeep(FREELANCER_AUTH)

  //   renderWithRedux(<Account />, { initialState })
  // })
  // it('renders MobileAccount Account with initial state and verify data is displaying', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   const { container } = renderWithRedux(<Account />, { initialState })

  //   const UserData = state.Auth.user

  //   // Wait for async effects to complete
  //   await waitFor(() => {
  //     expect(getCurrentUserData).toHaveBeenCalled()
  //   })

  //   expect(screen.getByText('Account')).toBeInTheDocument()
  //   expect(screen.getByText(UserData.FullName)).toBeInTheDocument()

  //   const imgElement = screen.getByTestId('user_profile_image')
  //   expect(imgElement).toBeInTheDocument()
  //   expect(imgElement).toHaveAttribute('src', UserData.profileImage)
  //   expect(imgElement).toHaveAttribute('height', '54')
  //   expect(imgElement).toHaveAttribute('width', '54')
  //   expect(imgElement).toHaveClass('border rounded')

  //   expect(screen.getByText(UserData?.freelancers?.category)).toBeInTheDocument()
  //   expect(screen.getByText('View Profile')).toBeInTheDocument()
  //   expect(container.querySelector('#likes_total')).toHaveTextContent(UserData.likeTotal)
  // })

  // it('renders MobileAccount Account and click on View Profile with different role 1', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   renderWithRedux(<Account />, { initialState })
  //   // Wait for async effects to complete
  //   await waitFor(() => {
  //     expect(getCurrentUserData).toHaveBeenCalled()
  //   })

  //   const viewProfileButton = screen.getByText('View Profile')
  //   fireEvent.click(viewProfileButton)
  // })

  // it('renders MobileAccount Account and click on View Profile with different role 0', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   state.Auth.user.role = 0
  //   renderWithRedux(<Account />, { initialState })
  //   // Wait for async effects to complete
  //   await waitFor(() => {
  //     expect(getCurrentUserData).toHaveBeenCalled()
  //   })

  //   const viewProfileButton = screen.getByText('View Profile')
  //   fireEvent.click(viewProfileButton)
  // })

  // it('renders MobileAccount Account and click on Show settings', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   const { container } = renderWithRedux(<Account />, { initialState })
  //   // Wait for async effects to complete
  //   await waitFor(() => {
  //     expect(getCurrentUserData).toHaveBeenCalled()
  //   })

  //   const showSettingContainer = screen.getByTestId('show_setting_container')
  //   fireEvent.click(showSettingContainer)

  //   expect(screen.getByText(state.Auth.user.email)).toBeInTheDocument()
  //   const PhoneNumber = screen.getByTestId('phone_number')
  //   expect(within(PhoneNumber).getByText(state.Auth.user.phoneNumber ?? '-')).toBeInTheDocument()

  //   const changeEmailElement = screen.getByText(/Change email/i)
  //   expect(changeEmailElement).toBeInTheDocument()
  //   expect(changeEmailElement).toHaveAttribute('href', '/change-email')

  //   const changePasswordElement = screen.getByText(/Update password/i)
  //   expect(changePasswordElement).toBeInTheDocument()
  //   expect(changePasswordElement).toHaveAttribute('href', '/change-password')

  //   const changeNumberElement = screen.getByText(/Change Phone/i)
  //   expect(changeNumberElement).toBeInTheDocument()
  //   expect(changeNumberElement).toHaveAttribute('href', '/change-phone')

  //   const amount = (state.Stripe.balance.available[0].amount / 100).toFixed(2).toLocaleString()
  //   const regexPattern = new RegExp(`\\$\\s${amount}\\sUSD`)

  //   expect(screen.getByText(regexPattern)).toBeInTheDocument()
  // })
  // it('renders MobileAccount Account and Verify Withdraw Link', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   renderWithRedux(<Account />, { initialState })
  //   const withdrawElement = screen.getByText(/Withdraw funds/i)
  //   expect(withdrawElement).toBeInTheDocument()
  //   fireEvent.click(withdrawElement)

  //   expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/withdrawal/terms')
  // })

  // it('renders MobileAccount Account and Verify billing detail Link', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   renderWithRedux(<Account />, { initialState })
  //   const billingDetailElement = screen.getByText(/Membership/i)
  //   expect(billingDetailElement).toBeInTheDocument()
  //   fireEvent.click(billingDetailElement)
  // })

  // it('renders MobileAccount Account and Verify transaction history Link', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   renderWithRedux(<Account />, { initialState })
  //   const transactionHistoryElement = screen.getByText(/Transaction history/i)
  //   expect(transactionHistoryElement).toBeInTheDocument()
  //   fireEvent.click(transactionHistoryElement)
  // })

  // it('renders MobileAccount Account and Verify support Link', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   renderWithRedux(<Account />, { initialState })
  //   const supportElement = screen.getByText(/Support/i)
  //   expect(supportElement).toBeInTheDocument()
  //   fireEvent.click(supportElement)
  // })

  // it('renders MobileAccount Account and click on logout', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   logoutUser.mockReturnValue(() => {
  //     return {
  //       status: 200
  //     }
  //   })

  //   renderWithRedux(<Account />, { initialState })

  //   // Wait for async effects to complete
  //   await waitFor(() => {
  //     expect(getCurrentUserData).toHaveBeenCalled()
  //   })
  //   const logoutElement = screen.getByTestId('logout_user_element')
  //   expect(logoutElement).toBeInTheDocument()
  //   fireEvent.click(logoutElement)

  //   await waitFor(async () => {
  //     expect(logoutUser).toHaveBeenCalled()
  //   })
  //   await waitFor(() => {
  //     expect(mockRouterPush).toHaveBeenCalledWith('/login')
  //   })
  // })

  // it('renders MobileAccount Account without phone number', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   state.Auth.user.phoneNumber = undefined

  //   renderWithRedux(<Account />, { initialState })

  //   const showSettingContainer = screen.getByTestId('show_setting_container')
  //   fireEvent.click(showSettingContainer)

  //   const NotAvailableElement = screen.getByText('-')
  //   expect(NotAvailableElement).toBeInTheDocument()
  // })

  // it('renders MobileAccount Account with 0.00 balance', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   state.Stripe.balance.available[0].amount = 'zero'
  //   renderWithRedux(<Account />, { initialState })

  //   const NotAvailableElement = screen.getByText('$ 0.00 USD')
  //   expect(NotAvailableElement).toBeInTheDocument()
  // })
  // it('applies custom styles', () => {
  //   const customStyles = {
  //     fontSize: '16px',
  //     fontWeight: 'bold',
  //     color: 'red',
  //     background: 'yellow',
  //     padding: '10px',
  //     margin: '',
  //     align: 'center',
  //     borderBottom: '1px solid black',
  //     right: '10px'
  //   }

  //   const { getByText } = render(<P {...customStyles}>Test</P>)
  //   const pElement = getByText('Test')

  //   expect(pElement).toHaveStyle(`font-size: ${customStyles.fontSize}`)
  //   expect(pElement).toHaveStyle(`font-weight: ${customStyles.fontWeight}`)
  //   expect(pElement).toHaveStyle(`color: ${customStyles.color}`)
  //   expect(pElement).toHaveStyle(`background: ${customStyles.background}`)
  //   expect(pElement).toHaveStyle(`padding: ${customStyles.padding}`)
  //   expect(pElement).toHaveStyle(`margin: ${customStyles.margin}`)
  //   expect(pElement).toHaveStyle(`text-align: ${customStyles.align}`)
  //   expect(pElement).toHaveStyle(`border-bottom: ${customStyles.borderBottom}`)
  //   expect(pElement).toHaveStyle(`right: ${customStyles.right}`)
  // })

  // it('renders MobileAccount without userLikes', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   state.Auth.user.likeTotal = null
  //   renderWithRedux(<Account />, { initialState })
  // })
})
