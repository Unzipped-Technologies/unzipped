import React from 'react'
import { useRouter } from 'next/router'
import { fireEvent, screen, waitFor, act, render } from '@testing-library/react'
import { makeStore } from '../../redux/store'
import { Provider } from 'react-redux'

import ChangeEmail from '../../pages/change-email'
import { loadUser } from '../../redux/Auth/actions'
import axios from 'axios'
import keys from '../../config/keys'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

let store, state

let newEmail = 'client1@gamail.com'

describe('ChangeEmail Component', () => {
  let mockRouterPush, mockRouterBack

  beforeAll(async () => {
    axios.defaults.baseURL = 'http://localhost:3000'

    // Initialize the store
    store = makeStore({ isServer: false })
    // Dispatch the loadUser action
    await store.dispatch(
      loadUser({
        email: keys?.testClientEmail,
        password: keys?.testClientPassword
      })
    )
    state = store.getState()
  })

  beforeEach(() => {
    // store = makeStore({ isServer: false })
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

  it('renders ChangeEmail and verify sub header text', async () => {
    render(
      <Provider store={store}>
        <ChangeEmail />
      </Provider>
    )
    expect(screen.getByText('Change Email')).toBeInTheDocument()
  })

  it('renders ChangeEmail and verfiy input fields render correctly', async () => {
    render(
      <Provider store={store}>
        <ChangeEmail />
      </Provider>
    )

    const saveEmailButton = screen.getByTestId('save_email_changes')
    expect(saveEmailButton).toBeDisabled()
    expect(saveEmailButton).toBeInTheDocument()

    const cancelEmailButton = screen.getByTestId('cancel_email_changes')
    expect(cancelEmailButton).toBeEnabled()
    expect(cancelEmailButton).toBeInTheDocument()

    const currentEmailElement = screen.getByTestId('currentEmail')
    expect(currentEmailElement.value).toBe(state.Auth.user.email)
    expect(currentEmailElement).toBeDisabled()

    const emailElement = screen.getByTestId('email')
    expect(emailElement.value).toBe('')
    expect(emailElement).toBeEnabled()

    fireEvent.click(emailElement)

    fireEvent.change(emailElement, {
      target: { value: 'new_email_user' }
    })

    fireEvent.blur(emailElement)

    expect(screen.getByText('Enter a valid email address!')).toBeInTheDocument()

    fireEvent.click(emailElement)
    fireEvent.change(emailElement, {
      target: { value: state.Auth.user.email }
    })
    fireEvent.blur(emailElement)
    expect(screen.getByText('Must not be that same as current email!')).toBeInTheDocument()

    fireEvent.click(emailElement)
    fireEvent.change(emailElement, {
      target: { value: newEmail }
    })

    fireEvent.blur(emailElement)

    await act(async () => {
      await fireEvent.submit(screen.getByTestId('change_email_form'))
    })
  })
  it('renders ChangeEmail and MobileFreelancerFooter components when window width is < 680px', () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    render(
      <Provider store={store}>
        <ChangeEmail />
      </Provider>
    )
  })

  it('renders ChangeEmail Account and click on cancel button', async () => {
    render(
      <Provider store={store}>
        <ChangeEmail />
      </Provider>
    )
    const cancelEmailButton = screen.getByTestId('cancel_email_changes')

    fireEvent.click(cancelEmailButton)

    expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
  })

  it('renders ChangeEmail and update email successfully', async () => {
    const AuthState = store.getState().Auth
    render(
      <Provider store={store}>
        <ChangeEmail />
      </Provider>
    )

    if (AuthState.isAuthenticated) {
      const saveEmailButton = screen.getByTestId('save_email_changes')
      expect(saveEmailButton).toBeDisabled()
      expect(saveEmailButton).toBeInTheDocument()

      const cancelEmailButton = screen.getByTestId('cancel_email_changes')
      expect(cancelEmailButton).toBeEnabled()
      expect(cancelEmailButton).toBeInTheDocument()

      const currentEmailElement = screen.getByTestId('currentEmail')
      expect(currentEmailElement.value).toBe(AuthState.email)
      expect(currentEmailElement).toBeDisabled()

      const emailElement = screen.getByTestId('email')
      expect(emailElement.value).toBe('')
      expect(emailElement).toBeEnabled()

      fireEvent.click(emailElement)
      fireEvent.change(emailElement, {
        target: { value: newEmail }
      })

      fireEvent.blur(emailElement)

      fireEvent.click(saveEmailButton)
      await act(async () => {
        await fireEvent.submit(screen.getByTestId('change_email_form'))
      })
      await waitFor(async () => {
        expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
      })
    } else {
      throw new Error('Unauthenticated')
    }
  })

  it('renders ChangeEmail and send error message', async () => {
    render(
      <Provider store={store}>
        <ChangeEmail />
      </Provider>
    )

    await act(async () => {
      await fireEvent.submit(screen.getByTestId('change_email_form'))
    })
  })

  it('renders ChangeEmail and update email successfully', async () => {
    const AuthState = store.getState().Auth
    render(
      <Provider store={store}>
        <ChangeEmail />
      </Provider>
    )

    if (AuthState.isAuthenticated) {
      const saveEmailButton = screen.getByTestId('save_email_changes')
      expect(saveEmailButton).toBeDisabled()
      expect(saveEmailButton).toBeInTheDocument()

      const cancelEmailButton = screen.getByTestId('cancel_email_changes')
      expect(cancelEmailButton).toBeEnabled()
      expect(cancelEmailButton).toBeInTheDocument()

      const currentEmailElement = screen.getByTestId('currentEmail')
      expect(currentEmailElement.value).toBe(AuthState.email)
      expect(currentEmailElement).toBeDisabled()

      const emailElement = screen.getByTestId('email')
      expect(emailElement.value).toBe('')
      expect(emailElement).toBeEnabled()

      fireEvent.click(emailElement)

      fireEvent.change(emailElement, {
        target: { value: 'client@gmail.com' }
      })

      await act(async () => {
        await fireEvent.submit(screen.getByTestId('change_email_form'))
      })
      await waitFor(async () => {
        expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
      })
    } else {
      throw new Error('Unauthenticated')
    }
  })

  it('renders ChangeEmail and verify sub header text', async () => {
    const token = state.Auth.token
    store.dispatch({
      type: 'USER_LOADED',
      payload: { ...state.Auth, token: null }
    })
    render(
      <Provider store={store}>
        <ChangeEmail />
      </Provider>
    )
    expect(screen.getByText('Change Email')).toBeInTheDocument()

    store.dispatch({
      type: 'USER_LOADED',
      payload: { ...state.Auth, token: token }
    })
  })
})
