import React from 'react'
import { useRouter } from 'next/router'
import { fireEvent, screen, waitFor, act } from '@testing-library/react'

import { initialState } from '../store/mockInitialState'
import ChangePassword from '../../pages/change-password'
import { renderWithRedux } from '../store/commonTestSetup'
import { changePassword } from '../../redux/Auth/actions'
import UpdatePasswordForm from '../../components/unzipped/UpdatePasswordForm'

jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../redux/Auth/actions', () => ({
  ...jest.requireActual('../../redux/Auth/actions'),
  changePassword: jest.fn()
}))

describe('ChangePassword Component', () => {
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

  it('renders ChangePassword and verify sub header text', async () => {
    renderWithRedux(<ChangePassword />, { initialState })

    expect(screen.getByText('Change Password')).toBeInTheDocument()
  })

  it('renders UpdatePasswordForm and verfiy input fields render correctly', async () => {
    const handleSubmit = jest.fn()

    renderWithRedux(<UpdatePasswordForm onSubmit={handleSubmit} />, {
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
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(confirmNewPasswordElement)
  })
  it('renders ChangePassword and MobileFreelancerFooter components when window width is < 680px', () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<ChangePassword />, { initialState })
  })

  it('renders UpdatePasswordForm and display error', () => {
    renderWithRedux(<UpdatePasswordForm error="Password error" />, { initialState })
  })

  it('renders ChangePassword Account and click on cancel button', async () => {
    renderWithRedux(
      <>
        <ChangePassword />
      </>,
      { initialState }
    )
    const cancelPasswordButton = screen.getByTestId('cancel_password_changes')

    fireEvent.click(cancelPasswordButton)

    expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
  })

  it('renders ChangePassword and change password successfully', async () => {
    changePassword.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    renderWithRedux(<ChangePassword changePassword={changePassword} />, {
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
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(confirmNewPasswordElement)

    fireEvent.submit(screen.getByTestId('change_password_form'))
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('renders ChangePassword and send error message', async () => {
    changePassword.mockReturnValue(() => {
      return {
        status: 400,
        data: {
          message: 'Password not updated'
        }
      }
    })

    renderWithRedux(<ChangePassword changePassword={changePassword} />, {
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
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(confirmNewPasswordElement)

    await act(async () => {
      await fireEvent.submit(screen.getByTestId('change_password_form'))
    })
  })

  it('renders ChangePassword and send default error message', async () => {
    changePassword.mockReturnValue(() => {
      return {
        status: 400
      }
    })

    renderWithRedux(<ChangePassword changePassword={changePassword} />, {
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
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(confirmNewPasswordElement)

    await act(async () => {
      await fireEvent.submit(screen.getByTestId('change_password_form'))
    })
  })
})
