import React from 'react'
import axios from 'axios'

import { useRouter } from 'next/router'
import { fireEvent, screen, waitFor, act, render, within } from '@testing-library/react'

import { initialState } from '../store/mockInitialState'
import ChangePassword from '../../pages/change-password'
import { renderWithRedux } from '../store/commonTestSetup'
import { makeStore } from '../../redux/store'
import { Provider } from 'react-redux'
import { loadUser } from '../../redux/Auth/actions'
import keys from '../../config/keys'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

let store, state

let newPassword = 'Hello@2024'

describe('ChangePassword Component', () => {
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

  it('renders ChangePassword and verify sub header text', async () => {
    renderWithRedux(<ChangePassword />, { initialState })

    expect(screen.getByText('Change Password')).toBeInTheDocument()
  })

  it('renders UpdatePasswordForm and verfiy input fields render correctly', async () => {
    render(
      <Provider store={store}>
        <ChangePassword />
      </Provider>
    )

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
      target: { value: keys?.testClientPassword }
    })
    fireEvent.blur(currentPasswordElement)

    fireEvent.click(newPasswordElement)
    fireEvent.change(newPasswordElement, {
      target: { value: 'Hello20242' }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(confirmNewPasswordElement)

    expect(screen.getByText('Passwords do not match!')).toBeInTheDocument()

    fireEvent.click(newPasswordElement)
    fireEvent.change(newPasswordElement, {
      target: { value: newPassword }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: newPassword }
    })
    fireEvent.blur(confirmNewPasswordElement)
  })

  it('renders ChangePassword Account and click on cancel button', async () => {
    render(
      <Provider store={store}>
        <ChangePassword />
      </Provider>
    )
    const cancelPasswordButton = screen.getByTestId('cancel_password_changes')

    fireEvent.click(cancelPasswordButton)

    expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
  })

  it('renders ChangePassword and change password successfully', async () => {
    render(
      <Provider store={store}>
        <ChangePassword />
      </Provider>
    )

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
      target: { value: keys.testClientPassword }
    })
    fireEvent.blur(currentPasswordElement)

    fireEvent.click(newPasswordElement)
    fireEvent.change(newPasswordElement, {
      target: { value: 'Hello20242' }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(confirmNewPasswordElement)

    expect(screen.getByText('Passwords do not match!')).toBeInTheDocument()

    fireEvent.click(newPasswordElement)
    fireEvent.change(newPasswordElement, {
      target: { value: newPassword }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: newPassword }
    })
    fireEvent.blur(confirmNewPasswordElement)

    fireEvent.submit(screen.getByTestId('change_password_form'))
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('renders ChangePassword and send error message', async () => {
    const { container } = render(
      <Provider store={store}>
        <ChangePassword />
      </Provider>
    )

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
      target: { value: 'Hello@20242111' }
    })
    fireEvent.blur(currentPasswordElement)

    fireEvent.click(newPasswordElement)
    fireEvent.change(newPasswordElement, {
      target: { value: 'Hello2024@@' }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: 'Hello2024@@' }
    })
    fireEvent.blur(confirmNewPasswordElement)

    await act(async () => {
      await fireEvent.submit(screen.getByTestId('change_password_form'))
    })
    const FormContainer = within(container).getByTestId('change_password_form')

    await waitFor(() => {
      expect(screen.getByText('Incorrect password')).toBeInTheDocument()
    })
  })

  it('renders ChangePassword and MobileFreelancerFooter components when window width is < 680px', () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    render(
      <Provider store={store}>
        <ChangePassword />
      </Provider>
    )
  })

  it('renders ChangePassword and change password successfully', async () => {
    render(
      <Provider store={store}>
        <ChangePassword />
      </Provider>
    )

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
      target: { value: newPassword }
    })
    fireEvent.blur(currentPasswordElement)

    fireEvent.click(newPasswordElement)
    fireEvent.change(newPasswordElement, {
      target: { value: keys.testClientPassword }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: keys.testClientPassword }
    })
    fireEvent.blur(confirmNewPasswordElement)

    fireEvent.submit(screen.getByTestId('change_password_form'))
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('renders ChangeEmail and verify sub header text', async () => {
    const token = state.Auth.token
    store.dispatch({
      type: 'USER_LOADED',
      payload: { ...state.Auth, token: null }
    })
    render(
      <Provider store={store}>
        <ChangePassword />
      </Provider>
    )

    store.dispatch({
      type: 'USER_LOADED',
      payload: { ...state.Auth, token: token }
    })

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/login')
    })
  })
})
