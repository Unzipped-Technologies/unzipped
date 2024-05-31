import React from 'react'
import { useRouter } from 'next/router'
import { fireEvent, screen, waitFor } from '@testing-library/react'

import ChangeEmail from '../../pages/change-email'
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'
import { updateUserEmail } from '../../redux/Auth/actions'
import UpdateKeyDataForm from '../../components/unzipped/UpdateEmailForm'

jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../redux/Auth/actions', () => ({
  ...jest.requireActual('../../redux/Auth/actions'),
  updateUserEmail: jest.fn()
}))

describe('ChangeEmail Component', () => {
  let mockRouterPush, mockRouterBack

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

  it('renders ChangeEmail and verify sub header text', async () => {
    renderWithRedux(<ChangeEmail />, { initialState })

    expect(screen.getByText('Change Email')).toBeInTheDocument()
  })

  it('renders UpdateKeyDataForm and verfiy input fields render correctly', async () => {
    renderWithRedux(<UpdateKeyDataForm email={initialState.Auth.user.email} onSubmit={data => {}} />, {
      initialState
    })

    const saveEmailButton = screen.getByTestId('save_email_changes')
    expect(saveEmailButton).toBeDisabled()
    expect(saveEmailButton).toBeInTheDocument()

    const cancelEmailButton = screen.getByTestId('cancel_email_changes')
    expect(cancelEmailButton).toBeEnabled()
    expect(cancelEmailButton).toBeInTheDocument()

    const currentEmailElement = screen.getByTestId('currentEmail')
    expect(currentEmailElement.value).toBe(initialState.Auth.user.email)
    expect(currentEmailElement).toBeDisabled()

    const emailElement = screen.getByTestId('email')
    expect(emailElement.value).toBe('')
    expect(emailElement).toBeEnabled()

    fireEvent.click(emailElement)

    fireEvent.change(emailElement, {
      target: { value: 'new_email_user@gmail.com' }
    })

    fireEvent.blur(emailElement)

    expect(emailElement.value).toBe('new_email_user@gmail.com')

    fireEvent.click(saveEmailButton)

    fireEvent.click(emailElement)

    fireEvent.change(emailElement, {
      target: { value: 'new_email_user' }
    })

    fireEvent.blur(emailElement)

    expect(screen.getByText('Enter a valid email address!')).toBeInTheDocument()

    fireEvent.click(emailElement)
    fireEvent.change(emailElement, {
      target: { value: 'testUser@gmail.com' }
    })

    fireEvent.blur(emailElement)
    expect(screen.getByText('Must not be that same as current email!')).toBeInTheDocument()
  })
  it('renders ChangeEmail and MobileFreelancerFooter components when window width is < 680px', () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<ChangeEmail />, { initialState })
  })

  it('renders ChangeEmail Account and click on cancel button', async () => {
    renderWithRedux(
      <>
        <ChangeEmail />
      </>,
      { initialState }
    )
    const cancelEmailButton = screen.getByTestId('cancel_email_changes')

    fireEvent.click(cancelEmailButton)

    expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
  })

  it('renders ChangeEmail and update email successfully', async () => {
    updateUserEmail.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    renderWithRedux(<ChangeEmail email={initialState.Auth.user.email} onSubmit={updateUserEmail} />, {
      initialState
    })

    const saveEmailButton = screen.getByTestId('save_email_changes')
    expect(saveEmailButton).toBeDisabled()
    expect(saveEmailButton).toBeInTheDocument()

    const cancelEmailButton = screen.getByTestId('cancel_email_changes')
    expect(cancelEmailButton).toBeEnabled()
    expect(cancelEmailButton).toBeInTheDocument()

    const currentEmailElement = screen.getByTestId('currentEmail')
    expect(currentEmailElement.value).toBe(initialState.Auth.user.email)
    expect(currentEmailElement).toBeDisabled()

    const emailElement = screen.getByTestId('email')
    expect(emailElement.value).toBe('')
    expect(emailElement).toBeEnabled()

    fireEvent.click(emailElement)

    fireEvent.change(emailElement, {
      target: { value: 'new_email_user@gmail.com' }
    })

    fireEvent.blur(emailElement)

    expect(emailElement.value).toBe('new_email_user@gmail.com')

    fireEvent.click(saveEmailButton)

    fireEvent.click(emailElement)

    fireEvent.change(emailElement, {
      target: { value: 'new_email_user' }
    })

    fireEvent.blur(emailElement)

    expect(screen.getByText('Enter a valid email address!')).toBeInTheDocument()

    fireEvent.click(emailElement)
    fireEvent.change(emailElement, {
      target: { value: 'testNewUser@gmail.com' }
    })

    fireEvent.blur(emailElement)
    fireEvent.submit(screen.getByTestId('change_email_form'))
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/account')
    })
  })

  it('renders ChangeEmail and send error message', async () => {
    updateUserEmail.mockReturnValue(() => {
      return {
        status: 400,
        data: {
          msg: 'Email not updated'
        }
      }
    })

    renderWithRedux(<ChangeEmail email={initialState.Auth.user.email} onSubmit={updateUserEmail} />, {
      initialState
    })

    fireEvent.submit(screen.getByTestId('change_email_form'))
  })

  it('renders ChangeEmail and send default error message', async () => {
    updateUserEmail.mockReturnValue(() => {
      return {
        status: 400
      }
    })

    renderWithRedux(<ChangeEmail onSubmit={updateUserEmail} />, {
      initialState
    })

    fireEvent.submit(screen.getByTestId('change_email_form'))
  })
})
