import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { fireEvent, screen, waitFor, act, render } from '@testing-library/react'

import { makeStore } from '../../redux/store'
import { Provider } from 'react-redux'
import { loadUser } from '../../redux/Auth/actions'

import ChangePhone from '../../pages/change-phone'
import keys from '../../config/keys'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

let store, state

let newPhone = '(123) 456-7878'

describe('ChangePhone Component', () => {
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
    jest.clearAllMocks()

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

  it('renders ChangePhone and verify sub header text', async () => {
    render(
      <Provider store={store}>
        <ChangePhone />
      </Provider>
    )

    expect(screen.getByText('Change Phone')).toBeInTheDocument()
  })

  it('renders UpdatePhoneForm and verfiy input fields render correctly', async () => {
    render(
      <Provider store={store}>
        <ChangePhone />
      </Provider>
    )

    const cancelPhoneButton = screen.getByTestId('cancel_phone_changes')
    expect(cancelPhoneButton).toBeEnabled()
    expect(cancelPhoneButton).toBeInTheDocument()

    const savePhoneButton = screen.getByTestId('save_phone_changes')
    expect(savePhoneButton).toBeDisabled()
    expect(savePhoneButton).toBeInTheDocument()

    const currentPhoneElement = screen.getByTestId('currentPhone')
    expect(currentPhoneElement.value).toBe(state.Auth.user.phoneNumber)
    expect(currentPhoneElement).toBeDisabled()

    const phoneElement = screen.getByTestId('phone')
    expect(phoneElement.value).toBe('')
    expect(phoneElement).toBeEnabled()

    fireEvent.click(phoneElement)
    fireEvent.change(phoneElement, {
      target: { value: '(111) 1' }
    })
    fireEvent.blur(phoneElement)

    expect(screen.getByText('Enter a valid Phone Number!')).toBeInTheDocument()

    fireEvent.click(phoneElement)
    fireEvent.change(phoneElement, {
      target: { value: state.Auth.user.phoneNumber }
    })

    fireEvent.blur(phoneElement)
    expect(phoneElement.value).toBe(state.Auth.user.phoneNumber)

    fireEvent.blur(phoneElement)
    expect(screen.getByText('Must not be that same as current Phone!')).toBeInTheDocument()

    fireEvent.click(phoneElement)

    fireEvent.change(phoneElement, {
      target: { value: null }
    })

    fireEvent.blur(phoneElement)

    fireEvent.click(phoneElement)

    fireEvent.click(phoneElement)
    fireEvent.change(phoneElement, {
      target: { value: newPhone }
    })

    fireEvent.blur(phoneElement)
  })
  it('renders ChangePhone and MobileFreelancerFooter components when window width is < 680px', () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    render(
      <Provider store={store}>
        <ChangePhone />
      </Provider>
    )
  })

  it('renders ChangePhone Account and click on cancel button', async () => {
    render(
      <Provider store={store}>
        <ChangePhone />
      </Provider>
    )
    const cancelPhoneButton = screen.getByTestId('cancel_phone_changes')

    fireEvent.click(cancelPhoneButton)

    expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
  })

  it('renders ChangePhone and update phone number successfully', async () => {
    render(
      <Provider store={store}>
        <ChangePhone />
      </Provider>
    )

    const currentPhoneElement = screen.getByTestId('currentPhone')
    expect(currentPhoneElement.value).toBe(state.Auth.user.phoneNumber)
    expect(currentPhoneElement).toBeDisabled()

    const phoneElement = screen.getByTestId('phone')

    fireEvent.click(phoneElement)

    fireEvent.change(phoneElement, {
      target: { value: newPhone }
    })

    fireEvent.blur(phoneElement)

    expect(phoneElement.value).toBe(newPhone)

    fireEvent.blur(phoneElement)

    fireEvent.submit(screen.getByTestId('change_phone_form'))
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
    })
  })

  it('renders ChangePhone and send error message', async () => {
    render(
      <Provider store={store}>
        <ChangePhone />
      </Provider>
    )

    const currentPhoneElement = screen.getByTestId('currentPhone')
    expect(currentPhoneElement).toBeInTheDocument()
    expect(currentPhoneElement.value).toBe(newPhone)
    expect(currentPhoneElement).toBeDisabled()

    const phoneElement = screen.getByTestId('phone')
    expect(phoneElement).toBeInTheDocument()

    fireEvent.click(phoneElement)
    fireEvent.change(phoneElement, {
      target: { value: '(123) 12' }
    })
    fireEvent.blur(phoneElement)

    expect(phoneElement.value).toBe('(123) 12')

    fireEvent.submit(screen.getByTestId('change_phone_form'))
    await waitFor(() => {
      expect(screen.getByText('Invalid phone number.')).toBeInTheDocument()
    })
  })
  it('renders ChangePhone without phone number', async () => {
    const userAuth = state.Auth
    const user = {
      ...state.Auth.user,
      phoneNumber: ''
    }
    const Auth = {
      ...state.Auth,
      user
    }
    await store.dispatch({
      type: 'USER_LOADED',
      payload: { Auth }
    })
    render(
      <Provider store={store}>
        <ChangePhone />
      </Provider>
    )

    const phoneElement = screen.getByTestId('phone')
    expect(phoneElement).toBeInTheDocument()

    fireEvent.click(phoneElement)
    fireEvent.change(phoneElement, {
      target: { value: undefined }
    })
    expect(phoneElement.value).toBe('')

    fireEvent.click(phoneElement)
    fireEvent.change(phoneElement, {
      target: { value: '(123) 123-4311' }
    })
    expect(phoneElement.value).toBe('(123) 123-4311')

    await act(async () => {
      await store.dispatch({
        type: 'USER_LOADED',
        payload: { ...userAuth }
      })
    })

    fireEvent.submit(screen.getByTestId('change_phone_form'))
  })
  it('renders ChangePhone Account with empty current phone number', async () => {
    state.Auth.user.phoneNumber = ''

    render(
      <Provider store={store}>
        <ChangePhone />
      </Provider>
    )

    const phoneElement = screen.getByTestId('phone')

    fireEvent.click(phoneElement)

    fireEvent.change(phoneElement, {
      target: { value: newPhone }
    })

    fireEvent.blur(phoneElement)
  })
})
