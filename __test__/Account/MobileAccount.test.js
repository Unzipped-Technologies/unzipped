import React from 'react'
import { useRouter } from 'next/router'

import * as actions from '../../redux/actions' // Import the actions module
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import MobileAccount from '../../components/unzipped/dashboard/MobileAccount' // Adjust the import path as needed

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../redux/actions', () => ({
  getCurrentUserData: jest.fn(),
  logoutUser: jest.fn() // Mock logoutUser only
}))

describe('MobileAccount Component', () => {
  let mockRouterPush

  beforeEach(() => {
    jest.clearAllMocks()

    mockRouterPush = jest.fn()
    useRouter.mockImplementation(() => ({
      pathname: '/',
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn()
    }))

    actions.getCurrentUserData()
    actions.logoutUser()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('renders MobileAccount Account with initial state and verify data is displaying', async () => {
    initialState.Auth.user.role = 1
    renderWithRedux(<MobileAccount />, { initialState })

    // Wait for async effects to complete
    await waitFor(() => {
      expect(actions.getCurrentUserData).toHaveBeenCalled()
    })

    expect(screen.getByText('Account')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()

    const imgElement = screen.getByTestId('user_profile_image')
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', initialState.Auth.profileImage)
    expect(imgElement).toHaveAttribute('height', '54')
    expect(imgElement).toHaveAttribute('width', '54')
    expect(imgElement).toHaveClass('border rounded')

    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument()
    expect(screen.getByText('View Profile')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('renders MobileAccount Account and click on View Profile with different role 1', async () => {
    initialState.Auth.user.role = 1
    renderWithRedux(<MobileAccount />, { initialState })

    // Wait for async effects to complete
    await waitFor(() => {
      expect(actions.getCurrentUserData).toHaveBeenCalled()
    })

    const viewProfileButton = screen.getByText('View Profile')
    fireEvent.click(viewProfileButton)
  })

  it('renders MobileAccount Account and click on View Profile with different role 0', async () => {
    initialState.Auth.user.role = 0
    renderWithRedux(<MobileAccount />, { initialState })

    // Wait for async effects to complete
    await waitFor(() => {
      expect(actions.getCurrentUserData).toHaveBeenCalled()
    })

    const viewProfileButton = screen.getByText('View Profile')
    fireEvent.click(viewProfileButton)
  })

  it('renders MobileAccount Account and click on Show settings', async () => {
    initialState.Auth.user.role = 0
    renderWithRedux(<MobileAccount />, { initialState })

    // Wait for async effects to complete
    await waitFor(() => {
      expect(actions.getCurrentUserData).toHaveBeenCalled()
    })

    const showSettingContainer = screen.getByTestId('show_setting_container')
    fireEvent.click(showSettingContainer)

    expect(screen.getByText('testUser@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('0111-111-1111')).toBeInTheDocument()

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
    renderWithRedux(<MobileAccount />, { initialState })

    const withdrawElement = screen.getByText(/Withdraw funds/i)
    expect(withdrawElement).toBeInTheDocument()
    fireEvent.click(withdrawElement)
  })

  it('renders MobileAccount Account and Verify billing detail Link', async () => {
    renderWithRedux(<MobileAccount />, { initialState })

    // const paymentMethodElement = screen.getByText(/Manage payment method/i)
    // expect(paymentMethodElement).toBeInTheDocument()
    // expect(paymentMethodElement).toHaveAttribute('href', '/manage-payment-method')

    const billingDetailElement = screen.getByText(/Membership/i)
    expect(billingDetailElement).toBeInTheDocument()
    fireEvent.click(billingDetailElement)

    // const changePlanElement = screen.getByText(/Change plan/i)
    // expect(changePlanElement).toBeInTheDocument()
    // expect(changePlanElement).toHaveAttribute('href', '/pick-a-plan')
  })

  it('renders MobileAccount Account and Verify transaction history Link', async () => {
    renderWithRedux(<MobileAccount />, { initialState })

    const transactionHistoryElement = screen.getByText(/Transaction history/i)
    expect(transactionHistoryElement).toBeInTheDocument()
    fireEvent.click(transactionHistoryElement)
  })

  it('renders MobileAccount Account and Verify support Link', async () => {
    renderWithRedux(<MobileAccount />, { initialState })

    const supportElement = screen.getByText(/Support/i)
    expect(supportElement).toBeInTheDocument()
    fireEvent.click(supportElement)
  })

  it('renders MobileAccount Account and click on logout', async () => {
    renderWithRedux(<MobileAccount />, { initialState })

    actions.logoutUser.mockResolvedValueOnce()

    const logoutElement = screen.getByTestId('logout_user_element')
    expect(logoutElement).toBeInTheDocument()
    fireEvent.click(logoutElement)

    await waitFor(async () => {
      expect(actions.logoutUser).toHaveBeenCalled()
    })
  })

  it('renders MobileAccount Account without phone number', async () => {
    initialState.Auth.user.phoneNumber = undefined
    renderWithRedux(<MobileAccount />, { initialState })

    const showSettingContainer = screen.getByTestId('show_setting_container')
    fireEvent.click(showSettingContainer)

    const NotAvailableElement = screen.getByText('N/A')
    expect(NotAvailableElement).toBeInTheDocument()
  })

  it('renders MobileAccount Account with 0.00 balance', async () => {
    initialState.Stripe.balance.available[0].amount = 'zero'
    renderWithRedux(<MobileAccount />, { initialState })

    const NotAvailableElement = screen.getByText('$ 0.00 USD')
    expect(NotAvailableElement).toBeInTheDocument()
  })
})
