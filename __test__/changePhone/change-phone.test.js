import React from 'react'
import { useRouter } from 'next/router'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import ChangePhone from '../../pages/change-phone'
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'
import { updatePhoneNumber } from '../../redux/Auth/actions'
import UpdatePhoneForm from '../../components/unzipped/UpdatePhoneForm'

jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../redux/Auth/actions', () => ({
  ...jest.requireActual('../../redux/Auth/actions'),
  updatePhoneNumber: jest.fn()
}))

describe('ChangePhone Component', () => {
  let mockRouterPush, mockRouterBack

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
    renderWithRedux(<ChangePhone />, { initialState })

    expect(screen.getByText('Change Phone')).toBeInTheDocument()
  })

  it('renders UpdatePhoneForm and verfiy input fields render correctly', async () => {
    renderWithRedux(<UpdatePhoneForm phone={initialState.Auth.user.phoneNumber} onSubmit={data => {}} />, {
      initialState
    })

    const cancelPhoneButton = screen.getByTestId('cancel_phone_changes')
    expect(cancelPhoneButton).toBeEnabled()
    expect(cancelPhoneButton).toBeInTheDocument()

    const savePhoneButton = screen.getByTestId('save_phone_changes')
    expect(savePhoneButton).toBeDisabled()
    expect(savePhoneButton).toBeInTheDocument()

    const currentPhoneElement = screen.getByTestId('currentPhone')
    expect(currentPhoneElement.value).toBe(initialState.Auth.user.phoneNumber)
    expect(currentPhoneElement).toBeDisabled()

    const phoneElement = screen.getByTestId('phone')
    expect(phoneElement.value).toBe('')
    expect(phoneElement).toBeEnabled()

    fireEvent.click(phoneElement)

    fireEvent.change(phoneElement, {
      target: { value: '(123) 456-7891' }
    })

    fireEvent.blur(phoneElement)

    expect(phoneElement.value).toBe('(123) 456-7891')

    fireEvent.click(savePhoneButton)

    fireEvent.click(phoneElement)

    fireEvent.change(phoneElement, {
      target: { value: null }
    })

    fireEvent.blur(phoneElement)

    fireEvent.click(phoneElement)

    fireEvent.change(phoneElement, {
      target: { value: '1111111' }
    })

    expect(screen.getByText('Enter a valid Phone Number!')).toBeInTheDocument()

    fireEvent.click(phoneElement)
    fireEvent.change(phoneElement, {
      target: { value: '(123) 456-7890' }
    })

    fireEvent.blur(phoneElement)
    expect(screen.getByText('Must not be that same as current Phone!')).toBeInTheDocument()
  })
  it('renders ChangePhone and MobileFreelancerFooter components when window width is < 680px', () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<ChangePhone />, { initialState })
  })

  it('renders ChangePhone Account and click on cancel button', async () => {
    renderWithRedux(
      <>
        <ChangePhone />
      </>,
      { initialState }
    )
    const cancelPhoneButton = screen.getByTestId('cancel_phone_changes')

    fireEvent.click(cancelPhoneButton)

    expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
  })
  it('renders ChangePhone Account with empty current phone number', async () => {
    initialState.Auth.user.phoneNumber = ''

    renderWithRedux(
      <>
        <ChangePhone />
      </>,
      { initialState }
    )

    const phoneElement = screen.getByTestId('phone')

    fireEvent.click(phoneElement)

    fireEvent.change(phoneElement, {
      target: { value: '(123) 456-7890' }
    })

    fireEvent.blur(phoneElement)
  })

  it('renders ChangePhone and update phone number successfully', async () => {
    updatePhoneNumber.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    renderWithRedux(<ChangePhone phone={initialState.Auth.user.phoneNumber} onSubmit={UpdatePhoneForm} />, {
      initialState
    })

    const currentPhoneElement = screen.getByTestId('currentPhone')
    expect(currentPhoneElement.value).toBe(initialState.Auth.user.phoneNumber)
    expect(currentPhoneElement).toBeDisabled()

    const phoneElement = screen.getByTestId('phone')

    fireEvent.click(phoneElement)

    fireEvent.change(phoneElement, {
      target: { value: '(123) 456-7891' }
    })

    fireEvent.blur(phoneElement)

    expect(phoneElement.value).toBe('(123) 456-7891')

    fireEvent.blur(phoneElement)

    fireEvent.click(phoneElement)
    fireEvent.change(phoneElement, {
      target: { value: '(123) 456-7893' }
    })

    fireEvent.submit(screen.getByTestId('change_phone_form'))
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
    })
  })

  it('renders ChangePhone and send error message', async () => {
    updatePhoneNumber.mockReturnValue(() => {
      return {
        status: 400,
        data: {
          message: 'Phone number not updated'
        }
      }
    })

    renderWithRedux(<ChangePhone phone={initialState.Auth.user.phoneNumber} onSubmit={UpdatePhoneForm} />, {
      initialState
    })

    const currentPhoneElement = screen.getByTestId('currentPhone')
    expect(currentPhoneElement.value).toBe(initialState.Auth.user.phoneNumber)
    expect(currentPhoneElement).toBeDisabled()

    const phoneElement = screen.getByTestId('phone')

    fireEvent.click(phoneElement)

    fireEvent.change(phoneElement, {
      target: { value: '(123) 456-7891' }
    })

    fireEvent.blur(phoneElement)

    expect(phoneElement.value).toBe('(123) 456-7891')

    fireEvent.blur(phoneElement)

    fireEvent.click(phoneElement)
    fireEvent.change(phoneElement, {
      target: { value: '(123) 456-7893' }
    })

    fireEvent.submit(screen.getByTestId('change_phone_form'))
  })

  it('renders ChangePhone and send default error message', async () => {
    updatePhoneNumber.mockReturnValue(() => {
      return {
        status: 400
      }
    })

    renderWithRedux(<ChangePhone phone={initialState.Auth.user.phoneNumber} onSubmit={UpdatePhoneForm} />, {
      initialState
    })

    const currentPhoneElement = screen.getByTestId('currentPhone')
    expect(currentPhoneElement.value).toBe(initialState.Auth.user.phoneNumber)
    expect(currentPhoneElement).toBeDisabled()

    const phoneElement = screen.getByTestId('phone')

    fireEvent.click(phoneElement)

    fireEvent.change(phoneElement, {
      target: { value: '(123) 456-7891' }
    })

    fireEvent.blur(phoneElement)

    expect(phoneElement.value).toBe('(123) 456-7891')

    fireEvent.blur(phoneElement)

    fireEvent.click(phoneElement)
    fireEvent.change(phoneElement, {
      target: { value: '(123) 456-7893' }
    })

    fireEvent.submit(screen.getByTestId('change_phone_form'))
  })
})
