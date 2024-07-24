import React from 'react'
import { useRouter } from 'next/router'

import Dashboard from '../../../pages/dashboard/index' // Adjust the import path as needed
import { initialState } from '../../store/mockInitialState'
import { renderWithRedux } from '../../store/commonTestSetup'
import { fireEvent, screen, act, within, waitFor } from '@testing-library/react'

import { CLIENT_AUTH, FREELANCER_AUTH } from '../../store/Users'
import { CALENDAR_SETTINGS } from '../../store/CalendarSettings'
import { nextPublicGithubClientId } from '../../../config/keys'

import {
  resetRegisterForm,
  getVerifyIdentityUrl,
  getCurrentUserData,
  changePassword
} from '../../../redux/Auth/actions'

import { getPublicProjectsList, getBusinessById } from '../../../redux/Business/actions'
import { createProjectApplication } from '../../../redux/ProjectApplications/actions'
import { getFreelancerSkillsList } from '../../../redux/FreelancerSkills/actions'
import { createCalenderSetting } from '../../../redux/CalenderSetting/CalenderSettingAction'
import { verifyUserStripeAccount } from '../../../redux/Stripe/actions'
import { countClientContracts } from '../../../redux/Contract/actions'

import UserSetupPanelMobile from '../../../components/unzipped/dashboard/UserSetupPanelMobile'
import UserSetupPanel from '../../../components/unzipped/dashboard/UserSetupPanel'
import MobileNotification from '../../../components/unzipped/dashboard/MobileNotification'
import Notification, { help } from '../../../components/unzipped/dashboard/Notification'
import ChangePassword from '../../../pages/change-password'
import ProjectDetail from '../../../pages/projects/[id]'

const _ = require('lodash')

jest.useFakeTimers() // Enable fake timers

jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../../redux/Contract/actions', () => ({
  ...jest.requireActual('../../../redux/Contract/actions'),
  countClientContracts: jest.fn()
}))

jest.mock('../../../redux/Stripe/actions', () => ({
  ...jest.requireActual('../../../redux/Stripe/actions'),
  verifyUserStripeAccount: jest.fn()
}))

jest.mock('../../../redux/CalenderSetting/CalenderSettingAction', () => ({
  ...jest.requireActual('../../../redux/CalenderSetting/CalenderSettingAction'),
  createCalenderSetting: jest.fn()
}))

jest.mock('../../../redux/ProjectApplications/actions', () => ({
  ...jest.requireActual('../../../redux/ProjectApplications/actions'),
  createProjectApplication: jest.fn()
}))

jest.mock('../../../redux/FreelancerSkills/actions', () => ({
  ...jest.requireActual('../../../redux/FreelancerSkills/actions'),
  getFreelancerSkillsList: jest.fn()
}))

jest.mock('../../../redux/Business/actions', () => ({
  ...jest.requireActual('../../../redux/Business/actions'),
  getPublicProjectsList: jest.fn(),
  getBusinessById: jest.fn()
}))

jest.mock('../../../redux/Auth/actions', () => ({
  ...jest.requireActual('../../../redux/Auth/actions'),
  resetRegisterForm: jest.fn(),
  getVerifyIdentityUrl: jest.fn(),
  getCurrentUserData: jest.fn(),
  changePassword: jest.fn()
}))

describe('DesktopAccount Component', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    initialState.Auth.user = _.cloneDeep(CLIENT_AUTH)
    initialState.CalenderSetting.calenderSetting = _.cloneDeep(CALENDAR_SETTINGS)
    initialState.Auth.passwordChanged = false
    initialState.ProjectApplications.success = false
    initialState.CalenderSetting.success = null

    countClientContracts.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    verifyUserStripeAccount.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    createCalenderSetting.mockReturnValue(() => {
      return {
        status: 200,
        data: {
          _id: '123'
        }
      }
    })
    createProjectApplication.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getBusinessById.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getFreelancerSkillsList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getPublicProjectsList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    resetRegisterForm.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getVerifyIdentityUrl.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getCurrentUserData.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    changePassword.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    mockRouterPush = jest.fn()
    mockRouterBack = jest.fn()

    useRouter.mockImplementation(() => ({
      query: {},
      pathname: '/',
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: mockRouterBack
    }))
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('renders Dashboard index page and verify pick a plan notification', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const pickPlanNotification = within(DesktopNotificationContainer).getByTestId('pick_plan_notification')
    expect(pickPlanNotification).toHaveTextContent(
      'Build your dream business, grow your following, and collaborate with other professionals to make your vision a reality. Start your free trial now.'
    )

    const PickPlanButton = within(pickPlanNotification).getByRole('button', { name: 'PICK A PLAN' })
    fireEvent.click(PickPlanButton)
    expect(mockRouterPush).toHaveBeenCalledWith(`/pick-a-plan`)
  })

  it('renders Dashboard index page and verify stripe notification', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const stripeNotification = within(DesktopNotificationContainer).getByTestId('stripe_connected_notification')
    expect(stripeNotification).toHaveTextContent('You haven’t connected your stripe account!')

    const stripeButton = within(stripeNotification).getByRole('button', { name: 'CONNECT YOUR STRIPE ACCOUNT' })
    fireEvent.click(stripeButton)
    expect(mockRouterPush).toHaveBeenCalledWith(`manage-payment-method`)
  })

  it('renders Dashboard index page and verify github connected notification', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const gitConnectedNotification = within(DesktopNotificationContainer).getByTestId('github_connected_notification')
    expect(gitConnectedNotification).toHaveTextContent(
      'You haven’t connected your Github account yet, connect it now so we can begin work building your project!'
    )

    const PickPlanButton = within(gitConnectedNotification).getByRole('button', { name: 'CONNECT YOUR GITHUB ACCOUNT' })
    fireEvent.click(PickPlanButton)
    expect(mockRouterPush).toHaveBeenCalledWith(
      `https://github.com/login/oauth/authorize?client_id=${nextPublicGithubClientId}&scope=user:email`
    )
  })
  it('renders Dashboard index page and verify browse more projects notification', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const browseProjectNotification = within(DesktopNotificationContainer).getByTestId('browse_projects_notification')
    expect(browseProjectNotification).toHaveTextContent('Browse other projects to inspire ideas')

    const PickPlanButton = within(browseProjectNotification).getByRole('button', { name: 'BROWSE' })
    fireEvent.click(PickPlanButton)
    expect(mockRouterPush).toHaveBeenCalledWith(`/projects`)
  })
  it('renders Dashboard index page and verify FAQ notification', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const faqNotification = within(DesktopNotificationContainer).getByTestId('faq_notification')
    expect(faqNotification).toHaveTextContent(
      'Investors are asking about your businss. Update Frequently asked questions now.'
    )

    const PickPlanButton = within(faqNotification).getByRole('button', { name: 'UPDATE' })
    fireEvent.click(PickPlanButton)
  })
  it('renders Dashboard index page and verify create business notification', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const createBusinessNotification = within(DesktopNotificationContainer).getByTestId('create_business_notification')
    expect(createBusinessNotification).toHaveTextContent(
      `You haven't created your first Project yet, create one now so you can begin Collaborating! Need Ideas? View existing projects here.`
    )

    const PickPlanButton = within(createBusinessNotification).getByRole('button', {
      name: 'CREATE FIRST PROJECT'
    })
    fireEvent.click(PickPlanButton)
  })
  it('renders Dashboard index page and verify customize  business page notification', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const customizeBusinessNotification = within(DesktopNotificationContainer).getByTestId('business_page_notification')
    expect(customizeBusinessNotification).toHaveTextContent(
      `You created your first business. Hooray! Now you need to customize your business homepage to attract better talent.`
    )

    const PickPlanButton = within(customizeBusinessNotification).getByRole('button', {
      name: 'CUSTOMIZE YOUR BUSINESS PAGE'
    })
    fireEvent.click(PickPlanButton)
  })
  it('renders Dashboard index page and verify explore more notification', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const exploreMoreNotification = within(DesktopNotificationContainer).getByTestId('explore_notification')
    expect(exploreMoreNotification).toHaveTextContent(`Explore more support`)
    expect(exploreMoreNotification).toHaveTextContent(
      `Check out these resources for answers to your questions, videos, and best practices.`
    )

    help.forEach((item, index) => {
      const ItemContainer = within(DesktopNotificationContainer).getByTestId(`${item.name}_${index}`)
      expect(ItemContainer).toBeInTheDocument()
      expect(within(ItemContainer).getByText(item?.name)).toBeInTheDocument()
      expect(within(ItemContainer).getByText(item?.text)).toBeInTheDocument()
      fireEvent.click(within(ItemContainer).getByText(item.link.text))
    })
  })

  it('renders Dashboard index page and verify project create notification', async () => {
    initialState.Business.wizardSubmission.isSuccessfull = true
    initialState.Business.wizardSubmission.projectName = 'Project Name'
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const businessCreatedNotification = within(DesktopNotificationContainer).getByTestId('project_created_notification')
    expect(businessCreatedNotification).toBeInTheDocument()

    expect(businessCreatedNotification).toHaveTextContent(
      `Project ${initialState.Business.wizardSubmission.projectName} successfully created!`
    )
    fireEvent.click(within(businessCreatedNotification).getByText('Dismiss'))
  })

  it('renders Dashboard index page and verify blue notification', async () => {
    renderWithRedux(<Notification type="blue" children={<p>Blue Type Notification</p>} noButton={false} />, {
      initialState
    })

    const blueNotification = screen.getByTestId('blue_type_notification')
    expect(blueNotification).toBeInTheDocument()

    expect(blueNotification).toHaveTextContent('Blue Type Notification')
    expect(blueNotification).toHaveTextContent('Dismiss')
    expect(within(blueNotification).getByRole('button', { name: 'UPDATE' }))
  })

  it('renders Dashboard index page and verify calendar setting notification', async () => {
    initialState.CalenderSetting.calenderSetting = null
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const calendarSettingNotification = within(DesktopNotificationContainer).getByTestId(
      'calendar_setting_notification'
    )
    expect(calendarSettingNotification).toBeInTheDocument()

    expect(calendarSettingNotification).toHaveTextContent(
      `You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you.`
    )

    const UpdateSettings = within(calendarSettingNotification).getByRole('button', { name: 'UPDATE' })
    expect(UpdateSettings).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(UpdateSettings)
    })
  })

  it('renders Dashboard index page and verify calendar setting notification with different _id', async () => {
    initialState.Auth.user._id = '6601c288149276195c3f8faf'
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const calendarSettingNotification = within(DesktopNotificationContainer).getByTestId(
      'calendar_setting_notification'
    )
    expect(calendarSettingNotification).toBeInTheDocument()

    expect(calendarSettingNotification).toHaveTextContent(
      `You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you.`
    )

    const UpdateSettings = within(calendarSettingNotification).getByRole('button', { name: 'UPDATE' })
    expect(UpdateSettings).toBeInTheDocument()
    fireEvent.click(UpdateSettings)
  })

  it('Reset Password successfully and verify password change notification', async () => {
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
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(confirmNewPasswordElement)

    fireEvent.submit(screen.getByTestId('change_password_form'))
    initialState.Auth.passwordChanged = true

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard')
    })
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const PasswordChangeNotification = within(DesktopNotificationContainer).getByTestId('password_change_notification')
    expect(PasswordChangeNotification).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    renderWithRedux(<Dashboard />, { initialState })

    const DismissNotification = within(PasswordChangeNotification).getByText('Dismiss')
    fireEvent.click(DismissNotification)
  })

  it('renders Project Detail page and submit application ', async () => {
    initialState.Auth.user = FREELANCER_AUTH
    initialState.Business.selectedBusiness.applicants = []
    const ProjectData = initialState.Business.projectList[0]

    useRouter.mockReturnValue({
      query: { id: ProjectData._id },
      pathname: `projects/${ProjectData._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    const projectDetail = initialState.Business.selectedBusiness

    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })

    const ApplyFormContainer = screen.getByTestId('project_apply_form')
    expect(ApplyFormContainer).toBeInTheDocument()

    const desiredRateField = within(ApplyFormContainer).getByTestId('desired_rate')
    fireEvent.change(desiredRateField, {
      target: {
        value: 25
      }
    })

    const coverLetterField = within(ApplyFormContainer).getByTestId('cover_letter')
    fireEvent.change(coverLetterField, {
      target: {
        value: 'Cover Letter Field'
      }
    })

    projectDetail.questionsToAsk.forEach(question => {
      const questionField = within(ApplyFormContainer).getByTestId(question._id)
      expect(questionField).toBeInTheDocument()

      fireEvent.change(questionField, {
        target: {
          value: 'Question Answer'
        }
      })
    })

    const HeaderContainer = screen.getByTestId('project_detail_header')
    const HeaderSubmitButton = within(HeaderContainer).getByRole('button', { name: 'SUBMIT APPLICATION' })
    fireEvent.click(HeaderSubmitButton)

    initialState.ProjectApplications.success = true

    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const PasswordChangeNotification = within(DesktopNotificationContainer).getByTestId('password_change_notification')
    expect(PasswordChangeNotification).toBeInTheDocument()
    expect(PasswordChangeNotification).toHaveTextContent('You have successfully applied for project!')

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    renderWithRedux(<Dashboard />, { initialState })

    const DismissNotification = within(PasswordChangeNotification).getByText('Dismiss')
    fireEvent.click(DismissNotification)
  })

  it('renders Dashboard index page and add calendar setting with success response', async () => {
    initialState.CalenderSetting.calenderSetting = null
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const calendarSettingNotification = within(DesktopNotificationContainer).getByTestId(
      'calendar_setting_notification'
    )
    expect(calendarSettingNotification).toBeInTheDocument()

    const UpdateSettings = within(calendarSettingNotification).getByRole('button', { name: 'UPDATE' })
    expect(UpdateSettings).toBeInTheDocument()
    fireEvent.click(UpdateSettings)

    const CalendarSettingModal = screen.getByTestId('setup_calender')
    expect(CalendarSettingModal).toBeInTheDocument()

    const StartTimePicker = within(CalendarSettingModal).getByTestId('calender_start_time')
    expect(StartTimePicker).toBeInTheDocument()
    const StartTimeDropDownButton = within(StartTimePicker).getByRole('button')
    fireEvent.click(StartTimeDropDownButton)
    fireEvent.click(screen.getByText('PM'))

    const EndTimePicker = within(CalendarSettingModal).getByTestId('calender_end_time')
    expect(EndTimePicker).toBeInTheDocument()
    const EndTimeDropDownButton = within(EndTimePicker).getByRole('button')
    const TimeList = screen.getByRole('option', { name: 'AM' })
    fireEvent.click(EndTimeDropDownButton)
    fireEvent.click(TimeList)

    const InterviewererOptions = within(CalendarSettingModal).getByTestId('interviewer_options')
    expect(InterviewererOptions).toBeInTheDocument()
    fireEvent.click(InterviewererOptions)

    fireEvent.click(within(CalendarSettingModal).getByTestId('RECURITERS_OTHERS'))

    fireEvent.click(within(CalendarSettingModal).getByRole('button', { name: 'UPDATE' }))

    initialState.CalenderSetting.success = true
    renderWithRedux(<Dashboard />, { initialState })

    const calendarUpdateNotification = screen.getAllByTestId('calender_success_notification')[0]
    expect(calendarUpdateNotification).toHaveTextContent('You have successfully setup the calendar!')

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    renderWithRedux(<Dashboard />, { initialState })

    const DismissNotification = within(calendarUpdateNotification).getAllByText('Dismiss')[0]
    fireEvent.click(DismissNotification)
  })

  it('renders Dashboard index page and add calendar setting with error response', async () => {
    createCalenderSetting.mockReturnValue(() => {
      return {
        status: 500
      }
    })
    initialState.CalenderSetting.calenderSetting = null
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('desktop_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const calendarSettingNotification = within(DesktopNotificationContainer).getByTestId(
      'calendar_setting_notification'
    )
    expect(calendarSettingNotification).toBeInTheDocument()

    const UpdateSettings = within(calendarSettingNotification).getByRole('button', { name: 'UPDATE' })
    expect(UpdateSettings).toBeInTheDocument()
    fireEvent.click(UpdateSettings)

    const CalendarSettingModal = screen.getByTestId('setup_calender')
    expect(CalendarSettingModal).toBeInTheDocument()

    const StartTimePicker = within(CalendarSettingModal).getByTestId('calender_start_time')
    expect(StartTimePicker).toBeInTheDocument()
    const StartTimeDropDownButton = within(StartTimePicker).getByRole('button')
    fireEvent.click(StartTimeDropDownButton)
    fireEvent.click(screen.getByText('PM'))

    const EndTimePicker = within(CalendarSettingModal).getByTestId('calender_end_time')
    expect(EndTimePicker).toBeInTheDocument()
    const EndTimeDropDownButton = within(EndTimePicker).getByRole('button')
    const TimeList = screen.getByRole('option', { name: 'AM' })
    fireEvent.click(EndTimeDropDownButton)
    fireEvent.click(TimeList)

    const InterviewererOptions = within(CalendarSettingModal).getByTestId('interviewer_options')
    expect(InterviewererOptions).toBeInTheDocument()
    fireEvent.click(InterviewererOptions)

    fireEvent.click(within(CalendarSettingModal).getByTestId('RECURITERS_OTHERS'))

    fireEvent.click(within(CalendarSettingModal).getByRole('button', { name: 'UPDATE' }))

    initialState.CalenderSetting.success = false
    renderWithRedux(<Dashboard />, { initialState })

    const calendarUpdateNotification = screen.getAllByTestId('calender_fail_notification')[0]
    expect(calendarUpdateNotification).toHaveTextContent('Failed to set up your calendar. Please try again later!')

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    renderWithRedux(<Dashboard />, { initialState })

    const DismissNotification = within(calendarUpdateNotification).getAllByText('Dismiss')[0]
    fireEvent.click(DismissNotification)
  })

  // Dashboard User Panel

  it('renders Dashboard index page and click on identity verify', async () => {
    initialState.Auth.user.isIdentityVerified = null

    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const IdentityVerifyElement = within(ProfilePanel).getByText('Verify identity')
    expect(IdentityVerifyElement).toBeInTheDocument()
    fireEvent.click(IdentityVerifyElement)
  })

  it('renders Dashboard index page and click on Update account details', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const UpdateAccountElement = within(ProfilePanel).getByText('Update account details')
    expect(UpdateAccountElement).toBeInTheDocument()
    fireEvent.click(UpdateAccountElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`/signup`)
  })

  it('renders Dashboard index page and click on Select a plan for your account', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const SelectPlanElement = within(ProfilePanel).getByText('Select a plan for your account')
    expect(SelectPlanElement).toBeInTheDocument()
    fireEvent.click(SelectPlanElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`/pick-a-plan`)
  })

  it('renders Dashboard index page and click on Upload a profile picture', async () => {
    initialState.Auth.user.profileImage = null
    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const UUploadImgElement = within(ProfilePanel).getByText('Upload a profile picture')
    expect(UUploadImgElement).toBeInTheDocument()
    fireEvent.click(UUploadImgElement)

    const dropzone = within(ProfilePanel).getByTestId('dropzone')

    const file = new File(['hello'], 'hello.png', { type: 'image/png' })

    const dataTransfer = {
      files: [file],
      items: [
        {
          kind: 'file',
          type: file.type,
          getAsFile: () => file
        }
      ],
      types: ['Files']
    }

    await act(() => {
      fireEvent.drop(dropzone, {
        dataTransfer
      })
    })
  })

  it('renders Dashboard index page and click on Complete Setup', async () => {
    initialState.Auth.user.isIdentityVerified = null

    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    fireEvent.click(CompleteSetupElement)
  })

  it('renders Dashboard index page and click on Complete Setup', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    fireEvent.click(CompleteSetupElement)
  })

  it('renders Dashboard index page and redirect to update account details', async () => {
    initialState.Auth.user.role = 1
    initialState.Auth.user.FirstName = undefined
    initialState.Auth.user.AddressCity = undefined

    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    fireEvent.click(CompleteSetupElement)
  })

  it('renders Dashboard index page and verify account details', async () => {
    initialState.Auth.user.role = 1
    initialState.Auth.user.FirstName = 'Freelancer'
    initialState.Auth.user.AddressCity = 'New York'

    renderWithRedux(<UserSetupPanel user={initialState.Auth.user} verifyIdentity={getVerifyIdentityUrl} />, {
      initialState
    })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    fireEvent.click(CompleteSetupElement)
  })

  it('renders Dashboard index page and update profile image', async () => {
    initialState.Auth.user.profileImage = null

    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    expect(within(ProfilePanel).getByText('Upload a profile picture')).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(CompleteSetupElement)
    })
  })

  it('renders Dashboard index page and check profile image', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    fireEvent.click(CompleteSetupElement)
  })

  it('renders Dashboard index page without user plan', async () => {
    initialState.Auth.user.plan = 0

    await act(async () => {
      await renderWithRedux(<Dashboard />, { initialState })
    })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    fireEvent.click(CompleteSetupElement)
  })

  it('renders Dashboard index page with user plan', async () => {
    initialState.Auth.user.plan = 2

    renderWithRedux(<Dashboard />, {
      initialState
    })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(CompleteSetupElement)
    })
    renderWithRedux(<Dashboard />, {
      initialState
    })
  })

  it('renders Dashboard index page with undefined user ', async () => {
    renderWithRedux(<UserSetupPanel user={undefined} verifyIdentity={getVerifyIdentityUrl} />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    fireEvent.click(CompleteSetupElement)
  })

  // Mobile Notifications

  it('renders Dashboard index page and verify pick a plan notification', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const pickPlanNotification = within(DesktopNotificationContainer).getByTestId('pick_plan_notification')
    expect(pickPlanNotification).toHaveTextContent(
      'Build your dream business, grow your following, and collaborate with other professionals to make your vision a reality. Start your free trial now.'
    )

    const PickPlanButton = within(pickPlanNotification).getByRole('button', { name: 'PICK A PLAN' })
    fireEvent.click(PickPlanButton)
    expect(mockRouterPush).toHaveBeenCalledWith(`/pick-a-plan`)
  })

  it('renders Dashboard index page and verify github connected notification', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const gitConnectedNotification = within(DesktopNotificationContainer).getByTestId('github_connected_notification')
    expect(gitConnectedNotification).toHaveTextContent(
      'You haven’t connected your Github account yet, connect it now so we can begin work building your project!'
    )

    const PickPlanButton = within(gitConnectedNotification).getByRole('button', {
      name: 'CONNECT YOUR GITHUB ACCOUNT'
    })
    fireEvent.click(PickPlanButton)
    expect(mockRouterPush).toHaveBeenCalledWith(
      `https://github.com/login/oauth/authorize?client_id=${nextPublicGithubClientId}&scope=user:email`
    )
  })
  it('renders Dashboard index page and verify browse more projects notification', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const browseProjectNotification = within(DesktopNotificationContainer).getByTestId('browse_projects_notification')
    expect(browseProjectNotification).toHaveTextContent('Browse other projects to inspire ideas')

    const PickPlanButton = within(browseProjectNotification).getByRole('button', { name: 'BROWSE' })
    fireEvent.click(PickPlanButton)
    expect(mockRouterPush).toHaveBeenCalledWith(`/projects`)
  })
  it('renders Dashboard index page and verify FAQ notification', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const faqNotification = within(DesktopNotificationContainer).getByTestId('faq_notification')
    expect(faqNotification).toHaveTextContent(
      /Investors are asking about your business. Update Frequently asked questions now./i
    )

    const PickPlanButton = within(faqNotification).getByRole('button', { name: 'UPDATE' })
    fireEvent.click(PickPlanButton)
  })
  it('renders Dashboard index page and verify create business notification', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const createBusinessNotification = within(DesktopNotificationContainer).getByTestId('create_business_notification')
    expect(createBusinessNotification).toHaveTextContent(
      `You haven't created your first Project yet, create one now so you can begin Collaborating! Need Ideas? View existing projects here.`
    )

    const PickPlanButton = within(createBusinessNotification).getByRole('button', {
      name: 'CREATE FIRST PROJECT'
    })
    fireEvent.click(PickPlanButton)
  })
  it('renders Dashboard index page and verify explore more notification', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const exploreMoreNotification = within(DesktopNotificationContainer).getByTestId('explore_notification')
    expect(exploreMoreNotification).toHaveTextContent(`Explore more support`)
    expect(exploreMoreNotification).toHaveTextContent(
      `Check out these resources for answers to your questions, videos, and best practices.`
    )

    help.forEach((item, index) => {
      const ItemContainer = within(DesktopNotificationContainer).getByTestId(`${item.name}_${index}`)
      expect(ItemContainer).toBeInTheDocument()
      expect(within(ItemContainer).getByText(item?.name)).toBeInTheDocument()
      expect(within(ItemContainer).getByText(item?.text)).toBeInTheDocument()
    })
  })
  it('renders Dashboard index page and verify blue notification', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<MobileNotification type="blue" children={<p>Blue Type Notification</p>} noButton={false} />, {
      initialState
    })

    const blueNotification = screen.getByTestId('blue_type_notification')
    expect(blueNotification).toBeInTheDocument()

    expect(blueNotification).toHaveTextContent('Blue Type Notification')
    expect(blueNotification).toHaveTextContent('Dismiss')
    expect(within(blueNotification).getByRole('button', { name: 'UPDATE' }))
  })

  it('renders Dashboard index page and verify calendar setting notification', async () => {
    initialState.CalenderSetting.calenderSetting = null
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const calendarSettingNotification = within(DesktopNotificationContainer).getByTestId(
      'calendar_setting_notification'
    )
    expect(calendarSettingNotification).toBeInTheDocument()

    expect(calendarSettingNotification).toHaveTextContent(
      `You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you.`
    )

    const UpdateSettings = within(calendarSettingNotification).getByRole('button', { name: 'UPDATE' })
    expect(UpdateSettings).toBeInTheDocument()
    fireEvent.click(UpdateSettings)
  })
  it('renders Dashboard index page and verify calendar setting notification with different _id', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user._id = '6601c288149276195c3f8faf'
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const calendarSettingNotification = within(DesktopNotificationContainer).getByTestId(
      'calendar_setting_notification'
    )
    expect(calendarSettingNotification).toBeInTheDocument()

    expect(calendarSettingNotification).toHaveTextContent(
      `You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you.`
    )

    const UpdateSettings = within(calendarSettingNotification).getByRole('button', { name: 'UPDATE' })
    expect(UpdateSettings).toBeInTheDocument()
    fireEvent.click(UpdateSettings)
  })

  it('Reset Password successfully and verify password change notification', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

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
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(newPasswordElement)

    fireEvent.click(confirmNewPasswordElement)
    fireEvent.change(confirmNewPasswordElement, {
      target: { value: 'Hello2024' }
    })
    fireEvent.blur(confirmNewPasswordElement)

    fireEvent.submit(screen.getByTestId('change_password_form'))
    initialState.Auth.passwordChanged = true

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard')
    })
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const PasswordChangeNotification = within(DesktopNotificationContainer).getByTestId('password_change_notification')
    expect(PasswordChangeNotification).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    renderWithRedux(<Dashboard />, { initialState })

    const DismissNotification = within(PasswordChangeNotification).getByText('Dismiss')
    fireEvent.click(DismissNotification)
  })

  it('renders Project Detail page and submit application ', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user = FREELANCER_AUTH
    initialState.Business.selectedBusiness.applicants = []
    const ProjectData = initialState.Business.projectList[0]

    useRouter.mockReturnValue({
      query: { id: ProjectData._id },
      pathname: `projects/${ProjectData._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    const projectDetail = initialState.Business.selectedBusiness

    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })

    const ApplyFormContainer = screen.getByTestId('project_apply_form')
    expect(ApplyFormContainer).toBeInTheDocument()

    const desiredRateField = within(ApplyFormContainer).getByTestId('desired_rate')
    fireEvent.change(desiredRateField, {
      target: {
        value: 25
      }
    })

    const coverLetterField = within(ApplyFormContainer).getByTestId('cover_letter')
    fireEvent.change(coverLetterField, {
      target: {
        value: 'Cover Letter Field'
      }
    })

    projectDetail.questionsToAsk.forEach(question => {
      const questionField = within(ApplyFormContainer).getByTestId(question._id)
      expect(questionField).toBeInTheDocument()

      fireEvent.change(questionField, {
        target: {
          value: 'Question Answer'
        }
      })
    })

    const HeaderSubmitButton = screen.getByRole('button', { name: 'SUBMIT APPLICATION' })
    fireEvent.click(HeaderSubmitButton)

    initialState.ProjectApplications.success = true

    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const PasswordChangeNotification = within(DesktopNotificationContainer).getByTestId('password_change_notification')
    expect(PasswordChangeNotification).toBeInTheDocument()
    expect(PasswordChangeNotification).toHaveTextContent('You have successfully applied for project!')

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    renderWithRedux(<Dashboard />, { initialState })

    const DismissNotification = within(PasswordChangeNotification).getByText('Dismiss')
    fireEvent.click(DismissNotification)
  })
  it('renders Dashboard index page and add calendar setting with success response', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.CalenderSetting.calenderSetting = null
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const calendarSettingNotification = within(DesktopNotificationContainer).getByTestId(
      'calendar_setting_notification'
    )
    expect(calendarSettingNotification).toBeInTheDocument()

    const UpdateSettings = within(calendarSettingNotification).getByRole('button', { name: 'UPDATE' })
    expect(UpdateSettings).toBeInTheDocument()
    fireEvent.click(UpdateSettings)

    const CalendarSettingModal = screen.getByTestId('setup_calender')
    expect(CalendarSettingModal).toBeInTheDocument()

    const StartTimePicker = within(CalendarSettingModal).getByTestId('calender_start_time')
    expect(StartTimePicker).toBeInTheDocument()
    const StartTimeDropDownButton = within(StartTimePicker).getByRole('button')
    fireEvent.click(StartTimeDropDownButton)
    fireEvent.click(screen.getByText('PM'))

    const EndTimePicker = within(CalendarSettingModal).getByTestId('calender_end_time')
    expect(EndTimePicker).toBeInTheDocument()
    const EndTimeDropDownButton = within(EndTimePicker).getByRole('button')
    const TimeList = screen.getByRole('option', { name: 'AM' })
    fireEvent.click(EndTimeDropDownButton)
    fireEvent.click(TimeList)

    const InterviewererOptions = within(CalendarSettingModal).getByTestId('interviewer_options')
    expect(InterviewererOptions).toBeInTheDocument()
    fireEvent.click(InterviewererOptions)

    fireEvent.click(within(CalendarSettingModal).getByTestId('RECURITERS_OTHERS'))

    fireEvent.click(within(CalendarSettingModal).getByRole('button', { name: 'UPDATE' }))

    initialState.CalenderSetting.success = true
    renderWithRedux(<Dashboard />, { initialState })

    const calendarUpdateNotification = screen.getAllByTestId('calender_success_notification')[0]
    expect(calendarUpdateNotification).toHaveTextContent('You have successfully setup the calendar!')

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    renderWithRedux(<Dashboard />, { initialState })

    const DismissNotification = within(calendarUpdateNotification).getAllByText('Dismiss')[0]
    fireEvent.click(DismissNotification)
  })

  it('renders Dashboard index page and add calendar setting with error response', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    createCalenderSetting.mockReturnValue(() => {
      return {
        status: 500
      }
    })
    initialState.CalenderSetting.calenderSetting = null
    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const calendarSettingNotification = within(DesktopNotificationContainer).getByTestId(
      'calendar_setting_notification'
    )
    expect(calendarSettingNotification).toBeInTheDocument()

    const UpdateSettings = within(calendarSettingNotification).getByRole('button', { name: 'UPDATE' })
    expect(UpdateSettings).toBeInTheDocument()
    fireEvent.click(UpdateSettings)

    const CalendarSettingModal = screen.getByTestId('setup_calender')
    expect(CalendarSettingModal).toBeInTheDocument()

    const StartTimePicker = within(CalendarSettingModal).getByTestId('calender_start_time')
    expect(StartTimePicker).toBeInTheDocument()
    const StartTimeDropDownButton = within(StartTimePicker).getByRole('button')
    fireEvent.click(StartTimeDropDownButton)
    fireEvent.click(screen.getByText('PM'))

    const EndTimePicker = within(CalendarSettingModal).getByTestId('calender_end_time')
    expect(EndTimePicker).toBeInTheDocument()
    const EndTimeDropDownButton = within(EndTimePicker).getByRole('button')
    const TimeList = screen.getByRole('option', { name: 'AM' })
    fireEvent.click(EndTimeDropDownButton)
    fireEvent.click(TimeList)

    const InterviewererOptions = within(CalendarSettingModal).getByTestId('interviewer_options')
    expect(InterviewererOptions).toBeInTheDocument()
    fireEvent.click(InterviewererOptions)

    fireEvent.click(within(CalendarSettingModal).getByTestId('RECURITERS_OTHERS'))

    fireEvent.click(within(CalendarSettingModal).getByRole('button', { name: 'UPDATE' }))

    initialState.CalenderSetting.success = false
    renderWithRedux(<Dashboard />, { initialState })

    const calendarUpdateNotification = screen.getAllByTestId('calender_fail_notification')[0]
    expect(calendarUpdateNotification).toHaveTextContent('Failed to set up your calendar. Please try again later!')

    act(() => {
      jest.advanceTimersByTime(5000)
    })

    renderWithRedux(<Dashboard />, { initialState })

    const DismissNotification = within(calendarUpdateNotification).getAllByText('Dismiss')[0]
    fireEvent.click(DismissNotification)
  })
  it('renders Dashboard index page and click on identity verify', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user.isIdentityVerified = null
    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const IdentityVerifyElement = within(ProfilePanel).getByText('Verify identity')
    expect(IdentityVerifyElement).toBeInTheDocument()
    fireEvent.click(IdentityVerifyElement)
  })
  it('renders Dashboard index page and verify stripe notification', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Dashboard />, { initialState })

    const DesktopNotificationContainer = screen.getByTestId('mobile_notification_panel')
    expect(DesktopNotificationContainer).toBeInTheDocument()

    const stripeNotification = within(DesktopNotificationContainer).getByTestId('stripe_connected_notification')
    expect(stripeNotification).toHaveTextContent('You haven’t connected your stripe account!')

    const stripeButton = within(stripeNotification).getByRole('button', { name: 'CONNECT YOUR STRIPE ACCOUNT' })
    fireEvent.click(stripeButton)
    expect(mockRouterPush).toHaveBeenCalledWith(`manage-payment-method`)
  })
  // Mobile Setup Panel //
  it('renders Dashboard index page and click on Update account details on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel_mobile')
    expect(ProfilePanel).toBeInTheDocument()

    const UpdateAccountElement = within(ProfilePanel).getByText('Update account details')
    expect(UpdateAccountElement).toBeInTheDocument()
    fireEvent.click(UpdateAccountElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`/signup`)
  })
  it('renders Dashboard index page and click on Upload a profile picture', async () => {
    initialState.Auth.user.profileImage = null
    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel_mobile')
    expect(ProfilePanel).toBeInTheDocument()

    const UUploadImgElement = within(ProfilePanel).getByText('Upload a profile picture')
    expect(UUploadImgElement).toBeInTheDocument()
    fireEvent.click(UUploadImgElement)

    const dropzone = within(ProfilePanel).getByTestId('dropzone')

    const file = new File(['hello'], 'hello.png', { type: 'image/png' })

    const dataTransfer = {
      files: [file],
      items: [
        {
          kind: 'file',
          type: file.type,
          getAsFile: () => file
        }
      ],
      types: ['Files']
    }

    await act(() => {
      fireEvent.drop(dropzone, {
        dataTransfer
      })
    })
  })
  it('renders Dashboard index page and click on Select a plan for your account', async () => {
    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const SelectPlanElement = within(ProfilePanel).getByText('Select a plan for your account')
    expect(SelectPlanElement).toBeInTheDocument()
    fireEvent.click(SelectPlanElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`/pick-a-plan`)
  })
  it('renders Dashboard index page with user plan', async () => {
    initialState.Auth.user.plan = 1

    renderWithRedux(<Dashboard />, {
      initialState
    })

    const ProfilePanel = screen.getByTestId('user_profile_panel_mobile')
    expect(ProfilePanel).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(CompleteSetupElement)
    })
    renderWithRedux(<Dashboard />, {
      initialState
    })
  })
  it('renders Dashboard index page and click on Select a plan for your account', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel_mobile')
    expect(ProfilePanel).toBeInTheDocument()

    const SelectPlanElement = within(ProfilePanel).getByText('Select a plan for your account')
    expect(SelectPlanElement).toBeInTheDocument()
    fireEvent.click(SelectPlanElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`/pick-a-plan`)
  })
  it('Verify User Setup Panel for mobile without user basic info', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user.role = 1
    initialState.Auth.user.FirstName = undefined
    initialState.Auth.user.AddressCity = undefined

    renderWithRedux(<Dashboard />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel_mobile')
    expect(ProfilePanel).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    fireEvent.click(CompleteSetupElement)
  })

  it('renders Dashboard index page and verify account details', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user.role = 1
    initialState.Auth.user.FirstName = 'Freelancer'
    initialState.Auth.user.AddressCity = 'New York'

    renderWithRedux(<Dashboard />, {
      initialState
    })

    const ProfilePanel = screen.getByTestId('user_profile_panel')
    expect(ProfilePanel).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    fireEvent.click(CompleteSetupElement)
  })

  it('renders Dashboard index page with undefined user ', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user = undefined
    renderWithRedux(<UserSetupPanelMobile />, { initialState })

    const ProfilePanel = screen.getByTestId('user_profile_panel_mobile')
    expect(ProfilePanel).toBeInTheDocument()

    const CompleteSetupElement = within(ProfilePanel).getByRole('button', { name: 'Complete Setup' })
    expect(CompleteSetupElement).toBeInTheDocument()
    fireEvent.click(CompleteSetupElement)
  })
})
