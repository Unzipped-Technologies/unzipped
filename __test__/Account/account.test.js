import React from 'react'
import { useRouter } from 'next/router'
import userEvent from '@testing-library/user-event'

import Account from '../../pages/dashboard/account' // Adjust the import path as needed
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'
import { fireEvent, screen, waitFor, act, within, render } from '@testing-library/react'
import { FREELANCER_AUTH, CLIENT_AUTH } from '../store/Users'
import { P } from '../../components/unzipped/dashboard/MobileAccount' // Adjust the import path as needed
import ChangeEmail from '../../pages/change-email'
import ChangePassword from '../../pages/change-password'
import ChangePhone from '../../pages/change-phone'

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
  updateCurrentUser: jest.fn(),
  logoutUser: jest.fn(),
  updateUserEmail: jest.fn(),
  changePassword: jest.fn(),
  updatePhoneNumber: jest.fn()
}))

describe('DesktopAccount Component', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    updateCurrentUser.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    updatePhoneNumber.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    changePassword.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    logoutUser.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    updateUserEmail.mockReturnValue(() => {
      return {
        status: 200
      }
    })
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

  //  Client Role

  it('renders Account Page', () => {
    initialState.Auth.user = _.cloneDeep(CLIENT_AUTH)

    renderWithRedux(<Account />, { initialState })
  })

  it('renders  Account with initial state from Redux store', async () => {
    const { container } = renderWithRedux(<Account />, { initialState })

    const UserData = initialState.Auth.user

    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
      expect(getPaymentMethods).toHaveBeenCalled()
      expect(getBusinessDetails).toHaveBeenCalled()
    })

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
        `$ ${(initialState.Stripe.balance?.available[0]?.amount / 100).toFixed(2).toLocaleString()}`
      )
    ).toBeInTheDocument()

    if (initialState.Auth.user.stripeAccountId) {
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
      initialState.Business.details.businessName
    )
    expect(within(BusinessProfileContainer).getByTestId('businessType').value).toBe(initialState.Business.details.type)
    expect(within(BusinessProfileContainer).getByTestId('businessPhone').value).toBe(
      initialState.Business.details.businessPhone
    )
    expect(within(BusinessProfileContainer).getByTestId('taxId').value).toBe(initialState.Business.details.taxId)
  })

  it('renders  Account and click on Manage payment method link', async () => {
    const { container } = renderWithRedux(<Account />, { initialState })

    const ProfileContainer = container.querySelector('#profile_data')

    const ManagePayment = within(ProfileContainer).getByText(`Manage payment method`)
    expect(ManagePayment).toBeInTheDocument()
    fireEvent.click(ManagePayment)

    expect(mockRouterPush).toHaveBeenCalledWith(`/manage-payment-method`)
  })

  it('renders  Account and click on Billing details link', async () => {
    const { container } = renderWithRedux(<Account />, { initialState })

    const ProfileContainer = container.querySelector('#profile_data')

    const BillingDetailLink = within(ProfileContainer).getByText(`Billing details`)
    expect(BillingDetailLink).toBeInTheDocument()
    fireEvent.click(BillingDetailLink)

    expect(mockRouterPush).toHaveBeenCalledWith(`/billing-details`)
  })

  it('renders  Account and click on Withdraw Funds link', async () => {
    initialState.Auth.user.stripeAccountId = 'strip-id'
    const { container } = renderWithRedux(<Account />, { initialState })

    const ProfileContainer = container.querySelector('#profile_data')

    const WithdrawLink = within(ProfileContainer).getByText(`Withdraw Funds`)
    expect(WithdrawLink).toBeInTheDocument()
    fireEvent.click(WithdrawLink)

    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/withdrawal/terms`)
  })

  it('renders  Account and click on Change plan link', async () => {
    initialState.Auth.user.stripeAccountId = 'strip-id'
    const { container } = renderWithRedux(<Account />, { initialState })

    const PlanContainer = container.querySelector('#plan_detail')

    const PlanLink = within(PlanContainer).getByText(`Change plan`)
    fireEvent.click(PlanLink)

    expect(mockRouterPush).toHaveBeenCalledWith(`/pick-a-plan`)
  })

  it('renders  Account and click on view profile button', async () => {
    renderWithRedux(<Account />, { initialState })

    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
    })

    const viewProfileButton = screen.getByTestId('view_profile')
    fireEvent.click(viewProfileButton)
  })

  it('renders  Account and click on Complete Onboarding', async () => {
    initialState.Auth.user.stripeAccountId = null

    renderWithRedux(<Account />, { initialState })

    const completeOnboardingButton = screen.getByText('Complete Onboarding')
    expect(completeOnboardingButton).toBeInTheDocument()
    fireEvent.click(completeOnboardingButton)
  })

  it('renders  Account and edit name', async () => {
    renderWithRedux(<Account />, { initialState })

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

    const SaveButton = screen.getByRole('button', { name: 'Save Settings' })
    expect(SaveButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(SaveButton)
    })
  })

  it('renders  Account and edit address', async () => {
    initialState.Auth.user.AddressState = undefined

    renderWithRedux(<Account />, { initialState })

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
    expect(AddressStateElement.value).toBe('')
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

    const SaveButton = screen.getByRole('button', { name: 'Save Settings' })
    expect(SaveButton).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(SaveButton)
    })
  })

  it('renders  Account and display verify business details as a text for edit button', async () => {
    initialState.Business.details = null
    renderWithRedux(<Account />, { initialState })

    expect(screen.getByText('verify business details')).toBeInTheDocument
  })

  it('renders  Account and edit company details', async () => {
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
    renderWithRedux(<Account />, { initialState })

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

  it('renders  Account and display error message', async () => {
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
    renderWithRedux(<Account />, { initialState })

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

  it('renders  Account and display default error message', async () => {
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
    renderWithRedux(<Account />, { initialState })

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

  it('renders  Account and set required error for input field', async () => {
    renderWithRedux(<Account />, { initialState })

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
    renderWithRedux(<Account />, { initialState })

    const editNameButton = screen.getByTestId('edit_name_button')
    fireEvent.click(editNameButton)

    const FirstNameElement = screen.getByTestId('FirstName')
    fireEvent.click(FirstNameElement)

    fireEvent.blur(FirstNameElement)
  })

  it('renders  Account and give valid tax id input', async () => {
    initialState.Business.details = {
      name: 'Unzipped',
      businessName: 'Unzipped',
      type: 'Shop',
      businessPhone: '0111-111-1112',
      taxId: '09ijk12C'
    }
    renderWithRedux(<Account />, { initialState })

    const TaxIdElement = screen.getByTestId('taxId')
    fireEvent.click(TaxIdElement)
    fireEvent.change(TaxIdElement, {
      target: { value: '32-1234567' }
    })
    expect(TaxIdElement.value).toBe('32-1234567')

    fireEvent.blur(TaxIdElement)
  })

  it('renders  Account and send empty array of payment methods', async () => {
    delete initialState.Stripe.methods
    renderWithRedux(<Account />, { initialState })
  })
  it('calls getAccountBalance on mount and sets up an interval', async () => {
    // Render the component
    renderWithRedux(<Account />, { initialState })

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

  it('Change email successfully', async () => {
    const { container } = renderWithRedux(<Account />, { initialState })

    const UserData = initialState.Auth.user

    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
      expect(getPaymentMethods).toHaveBeenCalled()
      expect(getBusinessDetails).toHaveBeenCalled()
    })

    const ProfileContainer = container.querySelector('#profile_data')
    expect(ProfileContainer).toBeInTheDocument()

    const EmailLink = within(ProfileContainer).getByText(`Change email`)
    fireEvent.click(EmailLink)

    expect(mockRouterPush).toHaveBeenCalledWith('/change-email')

    renderWithRedux(<ChangeEmail />, {
      initialState
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

    initialState.Auth.user.email = newEmail
    fireEvent.blur(emailElement)

    expect(emailElement.value).toBe(newEmail)

    fireEvent.submit(screen.getByTestId('change_email_form'))
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
    })
  })

  it('Change password successfully', async () => {
    const { container } = renderWithRedux(<Account />, { initialState })

    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
      expect(getPaymentMethods).toHaveBeenCalled()
      expect(getBusinessDetails).toHaveBeenCalled()
    })

    const ProfileContainer = container.querySelector('#profile_data')
    expect(ProfileContainer).toBeInTheDocument()

    const PasswordLink = within(ProfileContainer).getByText(`Change password`)
    fireEvent.click(PasswordLink)

    expect(mockRouterPush).toHaveBeenCalledWith('/change-password')

    renderWithRedux(<ChangePassword />, {
      initialState
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
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('Change phone number successfully', async () => {
    const { container } = renderWithRedux(<Account />, { initialState })

    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
      expect(getPaymentMethods).toHaveBeenCalled()
      expect(getBusinessDetails).toHaveBeenCalled()
    })

    const ProfileContainer = container.querySelector('#profile_data')
    expect(ProfileContainer).toBeInTheDocument()

    const PhoneLink = within(ProfileContainer).getByText(`Change number`)
    fireEvent.click(PhoneLink)

    expect(mockRouterPush).toHaveBeenCalledWith('/change-phone')

    renderWithRedux(<ChangePhone />, {
      initialState
    })

    const currentPhoneElement = screen.getByTestId('currentPhone')
    expect(currentPhoneElement.value).toBe(initialState.Auth.user.phoneNumber)
    expect(currentPhoneElement).toBeDisabled()

    const phoneElement = screen.getByTestId('phone')

    fireEvent.click(phoneElement)

    const NewPhone = '(123) 456-7891'
    fireEvent.change(phoneElement, {
      target: { value: NewPhone }
    })

    initialState.Auth.user.phoneNumber = fireEvent.blur(phoneElement)

    expect(phoneElement.value).toBe(NewPhone)

    fireEvent.blur(phoneElement)

    fireEvent.submit(screen.getByTestId('change_phone_form'))
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
    })
  })

  // Freelancer
  it('renders  Account and click on view profile button with role 1', async () => {
    initialState.Auth.user = _.cloneDeep(FREELANCER_AUTH)
    renderWithRedux(<Account />, { initialState })

    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
    })

    const viewProfileButton = screen.getByTestId('view_profile')
    fireEvent.click(viewProfileButton)

    expect(mockRouterPush).toHaveBeenCalledWith(`/freelancers/${initialState.Auth.user.freelancers?._id}`)
  })

  // Mobile View
  it('renders Account and MobileFreelancerFooter components when window width is < 680px', () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user = _.cloneDeep(FREELANCER_AUTH)

    renderWithRedux(<Account />, { initialState })
  })
  it('renders MobileAccount Account with initial state and verify data is displaying', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const { container } = renderWithRedux(<Account />, { initialState })

    const UserData = initialState.Auth.user

    // Wait for async effects to complete
    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
    })

    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText(UserData.FullName)).toBeInTheDocument()

    const imgElement = screen.getByTestId('user_profile_image')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', UserData.profileImage)
    expect(imgElement).toHaveAttribute('height', '54')
    expect(imgElement).toHaveAttribute('width', '54')
    expect(imgElement).toHaveClass('border rounded')

    expect(screen.getByText(UserData?.freelancers?.category)).toBeInTheDocument()
    expect(screen.getByText('View Profile')).toBeInTheDocument()
    expect(container.querySelector('#likes_total')).toHaveTextContent(UserData.likeTotal)
  })

  it('renders MobileAccount Account and click on View Profile with different role 1', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Account />, { initialState })
    // Wait for async effects to complete
    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
    })

    const viewProfileButton = screen.getByText('View Profile')
    fireEvent.click(viewProfileButton)
  })

  it('renders MobileAccount Account and click on View Profile with different role 0', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user.role = 0
    renderWithRedux(<Account />, { initialState })
    // Wait for async effects to complete
    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
    })

    const viewProfileButton = screen.getByText('View Profile')
    fireEvent.click(viewProfileButton)
  })

  it('renders MobileAccount Account and click on Show settings', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const { container } = renderWithRedux(<Account />, { initialState })
    // Wait for async effects to complete
    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
    })

    const showSettingContainer = screen.getByTestId('show_setting_container')
    fireEvent.click(showSettingContainer)

    expect(screen.getByText(initialState.Auth.user.email)).toBeInTheDocument()
    const PhoneNumber = screen.getByTestId('phone_number')
    expect(within(PhoneNumber).getByText(initialState.Auth.user.phoneNumber ?? '-')).toBeInTheDocument()

    const changeEmailElement = screen.getByText(/Change email/i)
    expect(changeEmailElement).toBeInTheDocument()
    expect(changeEmailElement).toHaveAttribute('href', '/change-email')

    const changePasswordElement = screen.getByText(/Update password/i)
    expect(changePasswordElement).toBeInTheDocument()
    expect(changePasswordElement).toHaveAttribute('href', '/change-password')

    const changeNumberElement = screen.getByText(/Change Phone/i)
    expect(changeNumberElement).toBeInTheDocument()
    expect(changeNumberElement).toHaveAttribute('href', '/change-phone')

    const amount = (initialState.Stripe.balance.available[0].amount / 100).toFixed(2).toLocaleString()
    const regexPattern = new RegExp(`\\$\\s${amount}\\sUSD`)

    expect(screen.getByText(regexPattern)).toBeInTheDocument()
  })
  it('renders MobileAccount Account and Verify Withdraw Link', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Account />, { initialState })
    const withdrawElement = screen.getByText(/Withdraw funds/i)
    expect(withdrawElement).toBeInTheDocument()
    fireEvent.click(withdrawElement)

    expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/withdrawal/terms')
  })

  it('renders MobileAccount Account and Verify billing detail Link', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Account />, { initialState })
    const billingDetailElement = screen.getByText(/Membership/i)
    expect(billingDetailElement).toBeInTheDocument()
    fireEvent.click(billingDetailElement)
  })

  it('renders MobileAccount Account and Verify transaction history Link', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Account />, { initialState })
    const transactionHistoryElement = screen.getByText(/Transaction history/i)
    expect(transactionHistoryElement).toBeInTheDocument()
    fireEvent.click(transactionHistoryElement)
  })

  it('renders MobileAccount Account and Verify support Link', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Account />, { initialState })
    const supportElement = screen.getByText(/Support/i)
    expect(supportElement).toBeInTheDocument()
    fireEvent.click(supportElement)
  })

  it('renders MobileAccount Account and click on logout', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    logoutUser.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    renderWithRedux(<Account />, { initialState })

    // Wait for async effects to complete
    await waitFor(() => {
      expect(getCurrentUserData).toHaveBeenCalled()
    })
    const logoutElement = screen.getByTestId('logout_user_element')
    expect(logoutElement).toBeInTheDocument()
    fireEvent.click(logoutElement)

    await waitFor(async () => {
      expect(logoutUser).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/login')
    })
  })

  it('renders MobileAccount Account without phone number', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user.phoneNumber = undefined

    renderWithRedux(<Account />, { initialState })

    const showSettingContainer = screen.getByTestId('show_setting_container')
    fireEvent.click(showSettingContainer)

    const NotAvailableElement = screen.getByText('-')
    expect(NotAvailableElement).toBeInTheDocument()
  })

  it('renders MobileAccount Account with 0.00 balance', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Stripe.balance.available[0].amount = 'zero'
    renderWithRedux(<Account />, { initialState })

    const NotAvailableElement = screen.getByText('$ 0.00 USD')
    expect(NotAvailableElement).toBeInTheDocument()
  })
  it('applies custom styles', () => {
    const customStyles = {
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'red',
      background: 'yellow',
      padding: '10px',
      margin: '',
      align: 'center',
      borderBottom: '1px solid black',
      right: '10px'
    }

    const { getByText } = render(<P {...customStyles}>Test</P>)
    const pElement = getByText('Test')

    expect(pElement).toHaveStyle(`font-size: ${customStyles.fontSize}`)
    expect(pElement).toHaveStyle(`font-weight: ${customStyles.fontWeight}`)
    expect(pElement).toHaveStyle(`color: ${customStyles.color}`)
    expect(pElement).toHaveStyle(`background: ${customStyles.background}`)
    expect(pElement).toHaveStyle(`padding: ${customStyles.padding}`)
    expect(pElement).toHaveStyle(`margin: ${customStyles.margin}`)
    expect(pElement).toHaveStyle(`text-align: ${customStyles.align}`)
    expect(pElement).toHaveStyle(`border-bottom: ${customStyles.borderBottom}`)
    expect(pElement).toHaveStyle(`right: ${customStyles.right}`)
  })

  it('renders MobileAccount without userLikes', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user.likeTotal = null
    renderWithRedux(<Account />, { initialState })
  })
})
