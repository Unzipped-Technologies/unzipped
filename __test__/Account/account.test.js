import React from 'react'
import { useRouter } from 'next/router'

import Account from '../../pages/dashboard/account' // Adjust the import path as needed
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'
import { fireEvent, screen, waitFor, act } from '@testing-library/react'
import DesktopAccount from '../../components/unzipped/dashboard/DesktopAccount' // Adjust the import path as needed
import {
  getPaymentMethods,
  getAccountOnboardingLink,
  getBusinessDetails,
  getAccountBalance,
  getCurrentUserData,
  updateCurrentUser
} from '../../redux/actions'

jest.useFakeTimers() // Enable fake timers

jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../redux/Stripe/actions', () => ({
  ...jest.requireActual('../../redux/Stripe/actions'),
  getPaymentMethods: jest.fn(),
  getAccountOnboardingLink: jest.fn(),
  getAccountBalance: jest.fn()
}))
jest.mock('../../redux/Business/actions', () => ({
  ...jest.requireActual('../../redux/Business/actions'),
  getBusinessDetails: jest.fn()
}))
jest.mock('../../redux/Auth/actions', () => ({
  ...jest.requireActual('../../redux/Auth/actions'),
  getCurrentUserData: jest.fn(),
  updateCurrentUser: jest.fn()
}))

describe('DesktopAccount Component', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    getPaymentMethods.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getAccountOnboardingLink.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getBusinessDetails.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getAccountBalance.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getCurrentUserData.mockReturnValue(() => {
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

  it('renders Account index page', async () => {
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )
  })

  it('renders Account', () => {
    renderWithRedux(<Account />, { initialState })
  })

  it('renders Account and MobileFreelancerFooter components when window width is < 680px', () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Account />, { initialState })
  })

  it('renders Desktop Account with initial state from Redux store', async () => {
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )

    // Wait for async effects to complete
    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
      expect(getPaymentMethods).toHaveBeenCalled()
      expect(getBusinessDetails).toHaveBeenCalled()
    })

    expect(screen.getByText('Account')).toBeInTheDocument()
    const emailElements = screen.queryAllByText('testUser@gmail.com')
    expect(emailElements.length).toBeGreaterThan(0)
    expect(emailElements[0]).toBeInTheDocument()

    expect(screen.getByText('Phone: (123) 456-7890')).toBeInTheDocument()
    expect(screen.getByTestId('AddressLineOne').value).toBe('Address 1')
    expect(screen.getByTestId('AddressLineTwo').value).toBe('Address 2')
    expect(screen.getByTestId('AddressCity').value).toBe('NewYork')
    expect(screen.getByTestId('AddressZip').value).toBe('40000')

    expect(
      screen.getByText(`$ ${(initialState.Stripe.balance.available[0].amount / 100).toFixed(2).toLocaleString()}`)
    ).toBeInTheDocument()
    expect(screen.getByTestId('FirstName').value).toBe('Test')
    expect(screen.getByTestId('LastName').value).toBe('User')
    expect(screen.getByTestId('businessName').value).toBe('Unzipped')
    expect(screen.getByTestId('businessType').value).toBe('Shop')
    expect(screen.getByTestId('businessPhone').value).toBe('0111-111-1112')
    expect(screen.getByTestId('taxId').value).toBe('09ijk12C')
  })

  it('renders Desktop Account and click on view profile button with role 1', async () => {
    initialState.Auth.user.role = 1
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )

    // Wait for async effects to complete
    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
    })

    const viewProfileButton = screen.getByTestId('view_profile')
    fireEvent.click(viewProfileButton)
  })
  it('renders Desktop Account and click on view profile button with role 0', async () => {
    initialState.Auth.user.role = 0
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )

    // Wait for async effects to complete
    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
    })

    const viewProfileButton = screen.getByTestId('view_profile')
    fireEvent.click(viewProfileButton)
  })

  it('renders Desktop Account and click on Complete Onboarding', async () => {
    initialState.Auth.user.role = 0
    initialState.Auth.user.stripeAccountId = null
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )

    const completeOnboardingButton = screen.getByTestId('complete_onboarding_button')
    fireEvent.click(completeOnboardingButton)
  })

  it('renders Desktop Account and edit name', async () => {
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )

    const editNameButton = screen.getByTestId('edit_name_button')
    fireEvent.click(editNameButton)

    const FirstNameElement = screen.getByTestId('FirstName')
    fireEvent.click(FirstNameElement)

    fireEvent.change(FirstNameElement, {
      target: { value: 'new Test' }
    })

    fireEvent.blur(FirstNameElement)

    expect(FirstNameElement.value).toBe('new Test')

    const LastNameElement = screen.getByTestId('LastName')
    fireEvent.click(LastNameElement)

    fireEvent.change(LastNameElement, {
      target: { value: 'new User' }
    })

    fireEvent.blur(LastNameElement)

    expect(LastNameElement.value).toBe('new User')
  })

  it('renders Desktop Account and edit address', async () => {
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )

    const editAddressButton = screen.getByTestId('edit_address_button')
    fireEvent.click(editAddressButton)

    const AddressLineOneElement = screen.getByTestId('AddressLineOne')
    fireEvent.click(AddressLineOneElement)

    fireEvent.change(AddressLineOneElement, {
      target: { value: 'new Address' }
    })

    fireEvent.blur(AddressLineOneElement)
    expect(AddressLineOneElement.value).toBe('new Address')

    const AddressLineTwoElement = screen.getByTestId('AddressLineTwo')
    fireEvent.click(AddressLineTwoElement)

    fireEvent.change(AddressLineTwoElement, {
      target: { value: 'new Address Two' }
    })

    fireEvent.blur(AddressLineTwoElement)
    expect(AddressLineTwoElement.value).toBe('new Address Two')

    const AddressCityElement = screen.getByTestId('AddressCity')
    fireEvent.click(AddressCityElement)

    fireEvent.change(AddressCityElement, {
      target: { value: 'new city' }
    })
    fireEvent.blur(AddressCityElement)
    expect(AddressCityElement.value).toBe('new city')

    const AddressStateElement = screen.getByTestId('AddressState')
    fireEvent.click(AddressStateElement)
    fireEvent.change(AddressStateElement, {
      target: { value: 'new state' }
    })
    fireEvent.blur(AddressStateElement)
    expect(AddressStateElement.value).toBe('new state')

    const AddressZipElement = screen.getByTestId('AddressZip')
    fireEvent.click(AddressZipElement)
    fireEvent.change(AddressZipElement, {
      target: { value: '230000' }
    })

    fireEvent.blur(AddressZipElement)
    expect(AddressZipElement.value).toBe('230000')
  })

  it('renders Desktop Account and display verify business details as a text for edit button', async () => {
    initialState.Auth.user.role = 0
    initialState.Business.details = null
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )

    expect(screen.getByText('verify business details')).toBeInTheDocument
  })

  it('renders Desktop Account and edit company details', async () => {
    updateCurrentUser.mockReturnValue(() => {
      return {
        status: 200,
        data: { message: 'Something went wrong' }
      }
    })
    initialState.Business.details = {
      name: 'Unzipped',
      businessName: 'Unzipped',
      type: 'Shop',
      businessPhone: '0111-111-1112',
      taxId: '09ijk12C'
    }
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )

    const editCompanyButton = screen.getByTestId('edit_company_button')
    fireEvent.click(editCompanyButton)

    const businessNameElement = screen.getByTestId('businessName')
    fireEvent.click(businessNameElement)

    fireEvent.change(businessNameElement, {
      target: { value: 'new Business' }
    })

    fireEvent.blur(businessNameElement)
    expect(businessNameElement.value).toBe('new Business')

    const businessTypeElement = screen.getByTestId('businessType')
    fireEvent.click(businessTypeElement)

    fireEvent.change(businessTypeElement, {
      target: { value: 'new Business Type' }
    })

    fireEvent.blur(businessTypeElement)
    expect(businessTypeElement.value).toBe('new Business Type')

    const businessPhoneElement = screen.getByTestId('businessPhone')
    fireEvent.click(businessPhoneElement)

    fireEvent.change(businessPhoneElement, {
      target: { value: '0111-111-1115' }
    })
    fireEvent.blur(businessPhoneElement)
    expect(businessPhoneElement.value).toBe('0111-111-1115')

    const TaxIdElement = screen.getByTestId('taxId')
    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: '322111' }
    })
    fireEvent.blur(TaxIdElement)
    expect(TaxIdElement.value).toBe('32-2111')

    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: '' }
    })
    fireEvent.blur(TaxIdElement)

    const SubmitButtonElement = screen.getByTestId('submimt_button')
    expect(SubmitButtonElement).toBeEnabled()

    await act(async () => {
      await fireEvent.click(SubmitButtonElement)
    })
  })

  it('renders Desktop Account and display error message', async () => {
    updateCurrentUser.mockReturnValue(userData => {
      return {
        status: 400,
        data: { message: 'Something went wrong' }
      }
    })
    initialState.Business.details = {
      name: 'Unzipped',
      businessName: 'Unzipped',
      type: 'Shop',
      businessPhone: '0111-111-1112',
      taxId: '09ijk12C'
    }
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )

    const editCompanyButton = screen.getByTestId('edit_company_button')
    fireEvent.click(editCompanyButton)

    const businessNameElement = screen.getByTestId('businessName')
    fireEvent.click(businessNameElement)

    fireEvent.change(businessNameElement, {
      target: { value: 'new Business' }
    })

    fireEvent.blur(businessNameElement)
    expect(businessNameElement.value).toBe('new Business')

    const businessTypeElement = screen.getByTestId('businessType')
    fireEvent.click(businessTypeElement)

    fireEvent.change(businessTypeElement, {
      target: { value: 'new Business Type' }
    })

    fireEvent.blur(businessTypeElement)
    expect(businessTypeElement.value).toBe('new Business Type')

    const businessPhoneElement = screen.getByTestId('businessPhone')
    fireEvent.click(businessPhoneElement)

    fireEvent.change(businessPhoneElement, {
      target: { value: '0111-111-1115' }
    })
    fireEvent.blur(businessPhoneElement)
    expect(businessPhoneElement.value).toBe('0111-111-1115')

    const TaxIdElement = screen.getByTestId('taxId')
    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: '322111' }
    })
    fireEvent.blur(TaxIdElement)
    expect(TaxIdElement.value).toBe('32-2111')

    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: '' }
    })
    fireEvent.blur(TaxIdElement)

    const SubmitButtonElement = screen.getByTestId('submimt_button')
    expect(SubmitButtonElement).toBeEnabled()

    await act(async () => {
      await fireEvent.click(SubmitButtonElement)
    })
  })

  it('renders Desktop Account and display default error message', async () => {
    updateCurrentUser.mockReturnValue(() => {
      return {
        status: 400
      }
    })
    initialState.Business.details = {
      name: 'Unzipped',
      businessName: 'Unzipped',
      type: 'Shop',
      businessPhone: '0111-111-1112',
      taxId: '09ijk12C'
    }
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={() => {
          jest.fn(() => {
            return {
              status: 400,
              data: { message: 'Something went wrong' }
            }
          })
        }}
      />,
      { initialState }
    )

    const editCompanyButton = screen.getByTestId('edit_company_button')
    fireEvent.click(editCompanyButton)

    const businessNameElement = screen.getByTestId('businessName')
    fireEvent.click(businessNameElement)

    fireEvent.change(businessNameElement, {
      target: { value: 'new Business' }
    })

    fireEvent.blur(businessNameElement)
    expect(businessNameElement.value).toBe('new Business')

    const businessTypeElement = screen.getByTestId('businessType')
    fireEvent.click(businessTypeElement)

    fireEvent.change(businessTypeElement, {
      target: { value: 'new Business Type' }
    })

    fireEvent.blur(businessTypeElement)
    expect(businessTypeElement.value).toBe('new Business Type')

    const businessPhoneElement = screen.getByTestId('businessPhone')
    fireEvent.click(businessPhoneElement)

    fireEvent.change(businessPhoneElement, {
      target: { value: '0111-111-1115' }
    })
    fireEvent.blur(businessPhoneElement)
    expect(businessPhoneElement.value).toBe('0111-111-1115')

    const TaxIdElement = screen.getByTestId('taxId')
    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: '322111' }
    })
    fireEvent.blur(TaxIdElement)
    expect(TaxIdElement.value).toBe('32-2111')

    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: '' }
    })
    fireEvent.blur(TaxIdElement)

    const SubmitButtonElement = screen.getByTestId('submimt_button')
    expect(SubmitButtonElement).toBeEnabled()

    await act(async () => {
      await fireEvent.click(SubmitButtonElement)
    })
    await waitFor(() => expect(screen.getByTestId('account_error')).toBeInTheDocument())
    expect(screen.getByTestId('account_error')).toHaveTextContent(/Something went wrong/i)
  })

  it('renders Desktop Account and set required error for input field', async () => {
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )

    const editNameButton = screen.getByTestId('edit_name_button')
    fireEvent.click(editNameButton)

    const FirstNameElement = screen.getByTestId('FirstName')
    fireEvent.click(FirstNameElement)

    fireEvent.change(FirstNameElement, {
      target: { value: '' }
    })

    fireEvent.blur(FirstNameElement)
  })

  it('renders Desktop Account and set update disable if values not change', async () => {
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser
      />,
      { initialState }
    )

    const editNameButton = screen.getByTestId('edit_name_button')
    fireEvent.click(editNameButton)

    const FirstNameElement = screen.getByTestId('FirstName')
    fireEvent.click(FirstNameElement)

    fireEvent.blur(FirstNameElement)
  })

  it('renders Desktop Account and give valie tax id input', async () => {
    initialState.Business.details = {
      name: 'Unzipped',
      businessName: 'Unzipped',
      type: 'Shop',
      businessPhone: '0111-111-1112',
      taxId: '09ijk12C'
    }
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser
      />,
      { initialState }
    )

    const TaxIdElement = screen.getByTestId('taxId')
    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: '32-1234567' }
    })
    expect(TaxIdElement.value).toBe('32-1234567')

    fireEvent.blur(TaxIdElement)
  })

  it('renders Desktop Account and verify links', async () => {
    initialState.Auth.user.stripeAccountId = 'testStripeId'
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser
      />,
      { initialState }
    )

    const changeEmailElement = screen.getByText(/Change email/i)
    expect(changeEmailElement).toBeInTheDocument()
    expect(changeEmailElement).toHaveAttribute('href', '/change-email')

    const changePasswordElement = screen.getByText(/Change password/i)
    expect(changePasswordElement).toBeInTheDocument()
    expect(changePasswordElement).toHaveAttribute('href', '/change-password')

    const changeNumberElement = screen.getByText(/Change number/i)
    expect(changeNumberElement).toBeInTheDocument()
    expect(changeNumberElement).toHaveAttribute('href', '/change-phone')

    const paymentMethodElement = screen.getByText(/Manage payment method/i)
    expect(paymentMethodElement).toBeInTheDocument()
    expect(paymentMethodElement).toHaveAttribute('href', '/manage-payment-method')

    const billingDetailElement = screen.getByText(/Billing details/i)
    expect(billingDetailElement).toBeInTheDocument()
    expect(billingDetailElement).toHaveAttribute('href', '/billing-details')

    const withdrawElement = screen.getByText(/Withdraw Funds/i)
    expect(withdrawElement).toBeInTheDocument()
    expect(withdrawElement).toHaveAttribute('href', '/dashboard/withdrawal/terms')

    const changePlanElement = screen.getByText(/Change plan/i)
    expect(changePlanElement).toBeInTheDocument()
    expect(changePlanElement).toHaveAttribute('href', '/pick-a-plan')
  })

  it('renders Desktop Account and send empty array of payment methods', async () => {
    delete initialState.Stripe.methods
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )
  })
  it('calls getAccountBalance on mount and sets up an interval', async () => {
    // Render the component
    renderWithRedux(
      <DesktopAccount
        getAccountOnboardingLink={getAccountOnboardingLink}
        getPaymentMethods={getPaymentMethods}
        getBusinessDetails={getBusinessDetails}
        getAccountBalance={getAccountBalance}
        getCurrentUserData={getCurrentUserData}
        updateCurrentUser={updateCurrentUser}
      />,
      { initialState }
    )

    // Verify getAccountBalance is called once on mount
    expect(getAccountBalance).toHaveBeenCalledTimes(1)

    // Advance the timers by 5 minutes (300000 ms)
    act(() => {
      jest.advanceTimersByTime(300000)
    })

    // Wait for the interval function to be called
    await waitFor(() => expect(getAccountBalance).toHaveBeenCalledTimes(2))

    // Advance the timers by another 5 minutes
    act(() => {
      jest.advanceTimersByTime(300000)
    })

    // Wait for the interval function to be called again
    await waitFor(() => expect(getAccountBalance).toHaveBeenCalledTimes(3))

    // Unmount the component to trigger the cleanup function
    jest.clearAllTimers()
  })
})
