import React from 'react'
import { useRouter } from 'next/router'

import Terms from '../../pages/dashboard/withdrawal/terms'
import Withdrawal from '../../pages/dashboard/withdrawal/index'
import { bulletData } from '../../components/unzipped/Withdrawal/Notification'
import { withdrawalMethods } from '../../components/unzipped/Withdrawal/PaymentOptionTable'
import Account from '../../pages/dashboard/account' // Adjust the import path as needed
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'
import { fireEvent, screen, waitFor, act, within } from '@testing-library/react'
import { CLIENT_AUTH } from '../store/Users'
import { BANKS, URL, BALANCE } from '../store/Stripe'
import {
  getPaymentMethods,
  getAccountOnboardingLink,
  getBusinessDetails,
  getAccountBalance,
  getCurrentUserData,
  updateCurrentUser,
  retrieveExternalBankAccounts,
  withdrawAccountFundsToExternalBank
} from '../../redux/actions'
import { logoutUser, updateUserEmail, changePassword, updatePhoneNumber } from '../../redux/Auth/actions'
import { parseCookies } from '../../services/cookieHelper'

const _ = require('lodash')

jest.useFakeTimers() // Enable fake timers

jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

// Mock the parseCookies function
jest.mock('../../services/cookieHelper', () => ({
  parseCookies: jest.fn()
}))

jest.mock('../../redux/Stripe/actions', () => ({
  ...jest.requireActual('../../redux/Stripe/actions'),
  getPaymentMethods: jest.fn(),
  getAccountOnboardingLink: jest.fn(),
  getAccountBalance: jest.fn(),
  retrieveExternalBankAccounts: jest.fn(),
  withdrawAccountFundsToExternalBank: jest.fn()
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
    initialState.Auth.user = _.cloneDeep(CLIENT_AUTH)
    initialState.Auth.user.stripeAccountId = 'sttripe_account_id'
    initialState.Stripe.bank = _.cloneDeep(BANKS)
    initialState.Stripe.url = _.cloneDeep(URL)
    initialState.Stripe.balance = _.cloneDeep(BALANCE)

    retrieveExternalBankAccounts.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    withdrawAccountFundsToExternalBank.mockReturnValue(() => {
      return {
        status: 200
      }
    })

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

  it('renders Account Page', () => {
    renderWithRedux(<Account />, { initialState })
  })

  it('renders  Account and click on Withdraw Funds to render Term Page', async () => {
    renderWithRedux(<Account />, { initialState })

    const WithdrawLink = screen.getByText(`Withdraw Funds`)
    expect(WithdrawLink).toBeInTheDocument()
    fireEvent.click(WithdrawLink)

    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/withdrawal/terms`)

    renderWithRedux(<Terms />, { initialState })

    const TermsContainer = screen.getByTestId('withdraw_terms')
    expect(TermsContainer).toBeInTheDocument()

    const BackHeader = within(TermsContainer).getByTestId('back_header')
    expect(BackHeader).toBeInTheDocument()

    expect(BackHeader).toHaveTextContent('Express withdrawal')

    bulletData?.forEach(item => {
      const ItemImage = within(TermsContainer).getByRole('img', { name: item.name })
      expect(ItemImage).toHaveAttribute('src', item.icon)
      expect(within(TermsContainer).getByText(item.name)).toBeInTheDocument()
    })
    expect(within(TermsContainer).getByText('To continue, read and accept the Transfers Agreement')).toBeInTheDocument()
    expect(
      within(TermsContainer).getByText('I accept the terms and conditions of the Transfers Agreement')
    ).toBeInTheDocument()

    const CheckBox = TermsContainer.querySelector('#accept_terms')
    expect(CheckBox).toBeInTheDocument()
    fireEvent.click(CheckBox)

    const SubmitButton = within(TermsContainer).getByRole('button', { name: 'Submit Application' })
    expect(SubmitButton).toBeInTheDocument()
    fireEvent.click(SubmitButton)

    renderWithRedux(<Withdrawal />, { initialState })

    const WithDrawContainer = screen.getByTestId('withdraw_page')
    expect(WithDrawContainer).toBeInTheDocument()

    const FormCard = within(WithDrawContainer).getByTestId('form_card')
    expect(FormCard).toBeInTheDocument()

    const FormImage = within(FormCard).getByRole('img')
    expect(FormImage).toBeInTheDocument()

    expect(FormImage).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/dghsmwkfq/image/upload/v1708747678/Icon_internet-banking_-online-bank_-bank_-university_sjhicv.png'
    )

    const balance = initialState.Stripe.balance

    const WithDrawAmount =
      balance && balance?.instant_available
        ? (balance?.instant_available[0]?.amount / 100).toFixed(2).toLocaleString()
        : 0

    expect(WithDrawContainer.querySelector('#withdraw_amout')).toHaveTextContent(`$ ${WithDrawAmount} USD`)

    const WithDrawForm = WithDrawContainer.querySelector('#withdraw_form')
    expect(WithDrawForm).toBeInTheDocument()

    const AmountField = within(WithDrawContainer).getByTestId('amount')
    expect(AmountField).toBeInTheDocument()

    fireEvent.change(AmountField, { target: { value: 100 } })

    const TypeField = within(WithDrawForm).getByRole('combobox')
    expect(TypeField).toBeInTheDocument()

    fireEvent.focus(TypeField)
    fireEvent.keyDown(TypeField, { key: 'ArrowDown', code: 'ArrowDown' })

    const Option1 = within(WithDrawForm).getByText('Payoneer')
    expect(Option1).toBeInTheDocument()
    fireEvent.click(Option1)

    fireEvent.focus(TypeField)
    fireEvent.keyDown(TypeField, { key: 'ArrowDown', code: 'ArrowDown' })

    const Option2 = within(WithDrawForm).getByText('Express Withdrawal')
    expect(Option2).toBeInTheDocument()

    const RemainingBalance =
      balance && balance?.instant_available ? (balance?.instant_available[0]?.amount / 100 - 100).toFixed(2) : 0

    expect(WithDrawContainer.querySelector('#remaining_balace')).toHaveTextContent(`$${RemainingBalance}`)

    const MethodsTable = WithDrawContainer.querySelector('#payment_options_table')
    expect(MethodsTable).toBeInTheDocument()

    withdrawalMethods?.forEach(method => {
      expect(MethodsTable).toHaveTextContent(method.method)
      expect(MethodsTable).toHaveTextContent(method.description)
      expect(MethodsTable).toHaveTextContent(method.fee)
    })

    const SubmitWithDrawButton = within(WithDrawContainer).getByRole('button', { name: 'Submit Application' })
    expect(SubmitWithDrawButton).toBeInTheDocument()
    expect(SubmitWithDrawButton).toBeEnabled()

    await act(async () => {
      await fireEvent.click(SubmitWithDrawButton)
    })

    const UpdateAccount = within(WithDrawContainer).getByRole('button', { name: 'Update' })
    expect(UpdateAccount).toBeInTheDocument()
    fireEvent.click(UpdateAccount)
  })

  it('should return the token from cookies', async () => {
    const mockToken = 'mock-token'

    parseCookies.mockReturnValue({ token: mockToken })

    const req = { headers: { cookie: 'token=mock-token' } }
    const res = {}

    const result = await Terms.getInitialProps({ req, res })

    expect(result).toEqual({ token: { token: mockToken } })
  })

  it('should return the token from cookies', async () => {
    const mockToken = 'mock-token'

    parseCookies.mockReturnValue({ token: mockToken })

    const req = { headers: { cookie: 'token=mock-token' } }
    const res = {}

    const result = await Withdrawal.getInitialProps({ req, res })

    expect(result).toEqual({ token: { token: mockToken } })
  })

  it('Render withdraw page without token', async () => {
    initialState.Auth.token = undefined

    renderWithRedux(<Withdrawal />, { initialState })

    expect(mockRouterPush).toHaveBeenCalledWith(`/login`)
  })

  it('Render withdraw page with timer', async () => {
    initialState.Stripe.bank = undefined
    initialState.Stripe.balance = undefined

    renderWithRedux(<Withdrawal />, { initialState })

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

  // // Mobile

  it('renders  Account and click on Withdraw Funds to render Term Page', async () => {
    global.innerWidth = 640

    await act(async () => {
      await global.dispatchEvent(new Event('resize'))
    })

    renderWithRedux(<Account />, { initialState })

    const WithdrawLink = screen.getByText(`Withdraw funds`)
    expect(WithdrawLink).toBeInTheDocument()
    fireEvent.click(WithdrawLink)

    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/withdrawal/terms`)

    renderWithRedux(<Terms />, { initialState })

    const TermsContainer = screen.getByTestId('withdraw_terms')
    expect(TermsContainer).toBeInTheDocument()

    const BackHeader = within(TermsContainer).getByTestId('back_header')
    expect(BackHeader).toBeInTheDocument()

    expect(BackHeader).toHaveTextContent('Express withdrawal')

    bulletData?.forEach(item => {
      const ItemImage = within(TermsContainer).getByRole('img', { name: item.name })
      expect(ItemImage).toHaveAttribute('src', item.icon)
      expect(within(TermsContainer).getByText(item.name)).toBeInTheDocument()
    })
    expect(within(TermsContainer).getByText('To continue, read and accept the Transfers Agreement')).toBeInTheDocument()
    expect(
      within(TermsContainer).getByText('I accept the terms and conditions of the Transfers Agreement')
    ).toBeInTheDocument()

    const CheckBox = TermsContainer.querySelector('#accept_terms')
    expect(CheckBox).toBeInTheDocument()
    fireEvent.click(CheckBox)

    const SubmitButton = within(TermsContainer).getByRole('button', { name: 'Submit Application' })
    expect(SubmitButton).toBeInTheDocument()
    fireEvent.click(SubmitButton)

    renderWithRedux(<Withdrawal />, { initialState })

    const WithDrawContainer = screen.getByTestId('withdraw_page')
    expect(WithDrawContainer).toBeInTheDocument()

    const FormCard = within(WithDrawContainer).getByTestId('form_card')
    expect(FormCard).toBeInTheDocument()

    const FormImage = within(FormCard).getByRole('img')
    expect(FormImage).toBeInTheDocument()

    expect(FormImage).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/dghsmwkfq/image/upload/v1708747678/Icon_internet-banking_-online-bank_-bank_-university_sjhicv.png'
    )

    const balance = initialState.Stripe.balance

    const WithDrawAmount =
      balance && balance?.instant_available
        ? (balance?.instant_available[0]?.amount / 100).toFixed(2).toLocaleString()
        : 0

    expect(WithDrawContainer.querySelector('#withdraw_amout')).toHaveTextContent(`$ ${WithDrawAmount} USD`)

    const WithDrawForm = WithDrawContainer.querySelector('#withdraw_form')
    expect(WithDrawForm).toBeInTheDocument()

    const AmountField = within(WithDrawContainer).getByTestId('amount')
    expect(AmountField).toBeInTheDocument()

    fireEvent.change(AmountField, { target: { value: 100 } })

    const TypeField = within(WithDrawForm).getByRole('combobox')
    expect(TypeField).toBeInTheDocument()

    fireEvent.focus(TypeField)
    fireEvent.keyDown(TypeField, { key: 'ArrowDown', code: 'ArrowDown' })

    const Option1 = within(WithDrawForm).getByText('Payoneer')
    expect(Option1).toBeInTheDocument()
    fireEvent.click(Option1)

    fireEvent.focus(TypeField)
    fireEvent.keyDown(TypeField, { key: 'ArrowDown', code: 'ArrowDown' })

    const Option2 = within(WithDrawForm).getByText('Express Withdrawal')
    expect(Option2).toBeInTheDocument()

    const RemainingBalance =
      balance && balance?.instant_available ? (balance?.instant_available[0]?.amount / 100 - 100).toFixed(2) : 0

    expect(WithDrawContainer.querySelector('#remaining_balace')).toHaveTextContent(`$${RemainingBalance}`)

    const SubmitWithDrawButton = WithDrawContainer.querySelector('#mobile_submit_button')
    expect(SubmitWithDrawButton).toBeInTheDocument()
    expect(SubmitWithDrawButton).toBeEnabled()

    await act(async () => {
      await fireEvent.click(SubmitWithDrawButton)
    })

    const UpdateAccount = within(WithDrawContainer).getByRole('button', { name: 'Update' })
    expect(UpdateAccount).toBeInTheDocument()
    fireEvent.click(UpdateAccount)
  })
})
