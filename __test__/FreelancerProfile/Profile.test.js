import React from 'react'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom' // for the toBeInTheDocument matcher

import Profile from '../../pages/freelancers/[id]'
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'
import { FREELANCER_PROJECTS, FREELANCER } from '../store/Freelancer'
import { CURRENT_USER_LISTS } from '../store/ListEntries'
import { fireEvent, screen, act, within, render } from '@testing-library/react'
import EducationModal from '../../components/unzipped/EducationModal'
import ProjectModal from '../../components/unzipped/ProjectModal'
import ProfileTab from '../../components/unzipped/ProfileTab'
import { FREELANCER_AUTH } from '../store/Users'

import MobileProfileCardOptions, { P as Paragraph, DropDown } from '../../components/unzipped/MobileProfileCardOptions'
import { getFreelancerById, createShowCaseProject, addEducation } from '../../redux/Freelancers/actions'
import { getCalenderSetting } from '../../redux/CalenderSetting/CalenderSettingAction'
import { getInvitesLists, addEntriesToList, getCurrentUserList } from '../../redux/Lists/ListsAction'
import { ValidationUtils, ConverterUtils } from '../../utils'
import userEvent from '@testing-library/user-event'
import { OtherInformationCard, P } from '../../components/unzipped/ProjectsCard'
import { OtherInformationCard as DIV, P as TEXT } from '../../components/unzipped/MobileProfileCard'
const _ = require('lodash')

jest.mock('axios')

global.URL.createObjectURL = jest.fn(() => 'mocked-url')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../redux/Freelancers/actions', () => ({
  ...jest.requireActual('../../redux/Freelancers/actions'),
  getFreelancerById: jest.fn(),
  createShowCaseProject: jest.fn(),
  addEducation: jest.fn()
}))
jest.mock('../../redux/Lists/ListsAction', () => ({
  ...jest.requireActual('../../redux/Lists/ListsAction'),
  addEntriesToList: jest.fn(),
  getInvitesLists: jest.fn(),
  getCurrentUserList: jest.fn()
}))

jest.mock('../../redux/CalenderSetting/CalenderSettingAction', () => ({
  ...jest.requireActual('../../redux/CalenderSetting/CalenderSettingAction'),
  getCalenderSetting: jest.fn()
}))

describe('DesktopAccount Component', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    initialState.Auth.user = _.cloneDeep(FREELANCER_AUTH)
    initialState.Lists.currentUserList = _.cloneDeep(CURRENT_USER_LISTS)
    initialState.Freelancers.selectedFreelancer.projects = JSON.parse(JSON.stringify(FREELANCER_PROJECTS))
    initialState.Freelancers.selectedFreelancer = JSON.parse(JSON.stringify(FREELANCER))

    getCurrentUserList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getFreelancerById.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    addEntriesToList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getInvitesLists.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    addEducation.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    createShowCaseProject.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    getCalenderSetting.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    mockRouterPush = jest.fn()
    mockRouterBack = jest.fn()

    useRouter.mockImplementation(() => ({
      query: { id: '123' },
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

  it('renders Freelancer profile page', async () => {
    initialState.Auth.user.role = 1
    renderWithRedux(<Profile />, { initialState })
  })

  it('renders Freelancer profile page and verify freelancer data displaying correctly OR not', () => {
    const selectedFreelancer = initialState.Freelancers.selectedFreelancer
    renderWithRedux(<Profile />, { initialState })

    const DesktopProfileContainer = screen.getByTestId('desktop_profile_container')

    const freelancerName = screen.getByText(
      ConverterUtils.capitalize(`${selectedFreelancer?.userId?.FirstName} ${selectedFreelancer?.userId?.LastName}`)
    )
    expect(freelancerName).toBeInTheDocument()

    const freelancerProfileImage = within(DesktopProfileContainer).getByTestId('freelancer_profile_image')
    expect(freelancerProfileImage).toBeInTheDocument()
    expect(freelancerProfileImage).toHaveAttribute(
      'src',
      initialState.Freelancers.selectedFreelancer.userId.profileImage
    )
    expect(freelancerProfileImage).toHaveAttribute('width', '218px')

    expect(within(DesktopProfileContainer).getByText('SKIILS')).toBeInTheDocument()
    expect(within(DesktopProfileContainer).getByTestId('react.js')).toBeInTheDocument()
    expect(within(DesktopProfileContainer).getByTestId('node.js')).toBeInTheDocument()
    expect(within(DesktopProfileContainer).getByTestId('react_native')).toBeInTheDocument()
    expect(within(DesktopProfileContainer).getByTestId('mongodb')).toBeInTheDocument()
    expect(
      within(DesktopProfileContainer).getByText(`${selectedFreelancer.likeTotal} UPVOTES BY CLIENTS`)
    ).toBeInTheDocument()
    expect(within(DesktopProfileContainer).getByText('Email Verified')).toBeInTheDocument()

    expect(within(DesktopProfileContainer).getByText('Preferred Verified')).toBeInTheDocument()
    expect(within(DesktopProfileContainer).getByText('Phone Verified')).toBeInTheDocument()

    const month = ValidationUtils.getMonthInText(selectedFreelancer?.userId?.updatedAt)

    const dateCode = `${month} ${new Date(selectedFreelancer?.userId?.updatedAt).getDate()}, ${new Date(
      selectedFreelancer?.userId?.updatedAt
    ).getFullYear()}`

    expect(within(DesktopProfileContainer).getByText('LAST UPDATED')).toBeInTheDocument()
    expect(within(DesktopProfileContainer).getByText(dateCode)).toBeInTheDocument()

    expect(within(DesktopProfileContainer).getByText('SALARY')).toBeInTheDocument()
    expect(
      within(DesktopProfileContainer).getByText(`$${selectedFreelancer?.rate?.toFixed(2)} / HOUR`)
    ).toBeInTheDocument()

    expect(within(DesktopProfileContainer).getByRole('button', { name: 'CHECK AVAILABILITY' })).toBeInTheDocument()

    initialState.Freelancers.selectedFreelancer.isAcceptEquity = true
    renderWithRedux(<Profile />, { initialState })
  })

  it('renders styled components', async () => {
    renderWithRedux(<OtherInformationCard display="flex" />, { initialState })
    renderWithRedux(<P background="#eeeee" />, { initialState })
  })

  it('renders Freelancer profile page and verify freelancer projects', () => {
    const FreelancerProjects = initialState.Freelancers.selectedFreelancer.projects
    renderWithRedux(<Profile />, { initialState })

    const ProfileProjectsContainer = screen.getByTestId('freelancer_profile_projects')
    expect(within(ProfileProjectsContainer).getByText('Top Skills')).toBeInTheDocument()
    expect(within(ProfileProjectsContainer).getByText('Browse Similar Freelancers')).toBeInTheDocument()

    // Verify First Project
    expect(within(ProfileProjectsContainer).getByText(FreelancerProjects[0]?.projectName)).toBeInTheDocument()
    expect(within(ProfileProjectsContainer).getAllByText(FreelancerProjects[0]?.role)[0]).toBeInTheDocument()

    const projectOneImage = within(ProfileProjectsContainer).getByTestId(FreelancerProjects[0]?.images[0]?._id)
    expect(projectOneImage).toBeInTheDocument()
    expect(projectOneImage).toHaveAttribute('src', FreelancerProjects[0]?.images[0]?.url)
    expect(projectOneImage).toHaveAttribute('width', '171px')

    // Verify Second Project
    expect(within(ProfileProjectsContainer).getByText(FreelancerProjects[1]?.projectName)).toBeInTheDocument()
    expect(within(ProfileProjectsContainer).getAllByText(FreelancerProjects[1]?.role)[1]).toBeInTheDocument()

    const projectTwoImage = within(ProfileProjectsContainer).getByTestId(FreelancerProjects[1]?.images[1]?._id)
    expect(projectTwoImage).toBeInTheDocument()
    expect(projectTwoImage).toHaveAttribute('src', FreelancerProjects[1]?.images[1]?.url)
    expect(projectTwoImage).toHaveAttribute('width', '171px')
  })

  it('renders Freelancer profile page and add one more project', async () => {
    renderWithRedux(<Profile />, { initialState })

    const TabsContainer = screen.getByTestId('projects_tab')

    const addProjectButton = within(TabsContainer).getByText('Add A Project')
    expect(addProjectButton).toBeInTheDocument()

    await act(() => {
      fireEvent.click(addProjectButton)
    })

    const ShowCaseModalContainer = screen.getByTestId('freelancer_showCase_projects_modal')
    expect(within(ShowCaseModalContainer).getByText('Project Details')).toBeInTheDocument()

    const projectNameField = within(ShowCaseModalContainer).getByTestId('projectName')
    expect(projectNameField).toBeInTheDocument()

    const projectRoleField = within(ShowCaseModalContainer).getByTestId('projectRole')
    expect(projectRoleField).toBeInTheDocument()

    const nextButton = within(ShowCaseModalContainer).getByRole('button', { name: 'Next' })
    expect(nextButton).toBeInTheDocument()
    expect(nextButton).toBeDisabled()

    const cancelButton = within(ShowCaseModalContainer).getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()

    fireEvent.click(projectNameField)
    fireEvent.change(projectNameField, {
      target: { value: 'one more test project' }
    })

    fireEvent.click(projectRoleField)
    fireEvent.change(projectRoleField, {
      target: { value: 'Senior Software Engineer' }
    })
    expect(nextButton).toBeEnabled()
    fireEvent.click(nextButton)

    const backButton = within(ShowCaseModalContainer).getByRole('button', { name: 'BACK' })
    expect(backButton).toBeInTheDocument()
    expect(backButton).toBeEnabled()

    fireEvent.click(backButton)

    fireEvent.click(nextButton)
    expect(nextButton).toBeDisabled()
    expect(backButton).toBeEnabled()

    const skillField = within(ShowCaseModalContainer).getByTestId('skills')
    expect(skillField).toBeInTheDocument()

    const addSkillButton = within(ShowCaseModalContainer).getByRole('button', { name: 'Add' })
    expect(addSkillButton).toBeInTheDocument()

    fireEvent.click(skillField)

    fireEvent.change(skillField, {
      target: { value: 'React' }
    })
    fireEvent.keyDown(skillField, { key: 'Enter', code: 'Enter' })
    fireEvent.change(skillField, {
      target: { value: 'Node' }
    })
    fireEvent.keyDown(skillField, { key: 'Enter', code: 'Enter' })

    fireEvent.change(skillField, {
      target: { value: 'Express Js' }
    })
    fireEvent.click(addSkillButton)
    expect(within(ShowCaseModalContainer).getByText('React')).toBeInTheDocument()
    expect(within(ShowCaseModalContainer).getByText('Node')).toBeInTheDocument()
    expect(within(ShowCaseModalContainer).getByText('Express Js')).toBeInTheDocument()

    const deleteSkillIcon = within(ShowCaseModalContainer).getByTestId('delete_React')
    fireEvent.click(deleteSkillIcon)

    expect(within(ShowCaseModalContainer).queryByText('React')).not.toBeInTheDocument()

    fireEvent.click(backButton)

    fireEvent.click(nextButton)

    const submitButton = within(ShowCaseModalContainer).getByRole('button', { name: 'SUBMIT' })
    expect(submitButton).toBeInTheDocument()

    expect(within(ShowCaseModalContainer).getByText('Project Images')).toBeInTheDocument()

    const uploadImageContainer = within(ShowCaseModalContainer).getByTestId('project_images')
    expect(uploadImageContainer).toBeInTheDocument()

    fireEvent.click(uploadImageContainer)

    const file1 = new File(['dummy content 1'], 'image3.jpeg', {
      // path: 'image3.jpeg',
      lastModified: 1709931523553,
      name: 'image3.jpeg',
      size: 11068,
      type: 'image/jpeg',
      webkitRelativePath: ''
    })
    const file2 = new File(['dummy content 1'], 'image3.jpeg', {
      // path: 'image3.jpeg',
      lastModified: 1709931523553,
      name: 'image3.jpeg',
      size: 11068,
      type: 'image/jpeg',
      webkitRelativePath: ''
    })

    const dropzone = uploadImageContainer.querySelector('.dropzone input')

    await act(async () => {
      await userEvent.upload(dropzone, [file1, file2])
    })

    const imageDeleteElement = within(ShowCaseModalContainer).getByTestId('image3.jpeg_0')
    fireEvent.click(imageDeleteElement)

    expect(submitButton).toBeEnabled()
    await act(async () => {
      fireEvent.click(submitButton)
    })
  }, 10000)

  it('renders Freelancer profile page and click on tab', async () => {
    renderWithRedux(<Profile />, { initialState })

    const TabsContainer = screen.getByTestId('projects_tab')

    const projectsTab = within(TabsContainer).getByText('PROJECTS')
    expect(projectsTab).toBeInTheDocument()

    await act(() => {
      fireEvent.click(projectsTab)
    })
  })

  it('renders Freelancer profile page with multiple tabs', async () => {
    renderWithRedux(
      <ProfileTab
        tabs={['PROJECTS', 'JOBS']}
        selected={0}
        setSelected={() => {}}
        role={1}
        freelancerId={initialState.Freelancers.selectedFreelancer._id}
        userId={initialState.Freelancers.selectedFreelancer._id}
      />,
      { initialState }
    )

    const TabsContainer = screen.getByTestId('projects_tab')

    const projectsTab = within(TabsContainer).getByText('PROJECTS')
    expect(projectsTab).toBeInTheDocument()

    await act(() => {
      fireEvent.click(projectsTab)
    })
  })

  it('renders Freelancer profile page and add one more education history', async () => {
    renderWithRedux(<Profile />, { initialState })

    const adEducationElement = screen.getByTestId('add_education')
    expect(adEducationElement).toBeInTheDocument()

    await act(() => {
      fireEvent.click(adEducationElement)
    })

    const EducationModalContainer = screen.getByTestId('freelancer_education_modal')
    expect(within(EducationModalContainer).getByText('Education Detail')).toBeInTheDocument()

    const titleField = within(EducationModalContainer).getByTestId('title')
    expect(titleField).toBeInTheDocument()

    const instituteField = within(EducationModalContainer).getByTestId('institute')
    expect(instituteField).toBeInTheDocument()

    const startYearField = within(EducationModalContainer).getByTestId('startYear')
    expect(startYearField).toBeInTheDocument()

    const endYearField = within(EducationModalContainer).getByTestId('endYear')
    expect(endYearField).toBeInTheDocument()

    fireEvent.click(titleField)
    fireEvent.change(titleField, {
      target: { value: 'one more test degree' }
    })

    fireEvent.click(instituteField)
    fireEvent.change(instituteField, {
      target: { value: 'one more test degree insitute' }
    })

    fireEvent.click(startYearField)
    fireEvent.change(startYearField, {
      target: { value: 2017 }
    })

    fireEvent.click(endYearField)
    fireEvent.change(endYearField, {
      target: { value: 2023 }
    })

    const saveButton = within(EducationModalContainer).getByRole('button', { name: 'SAVE' })
    expect(saveButton).toBeInTheDocument()
    expect(saveButton).toBeEnabled()

    const cancelButton = within(EducationModalContainer).getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()

    await act(async () => {
      fireEvent.click(saveButton)
    })
  })

  it('renders Freelancer profile page and click cancel education modal', async () => {
    renderWithRedux(<Profile />, { initialState })

    const adEducationElement = screen.getByTestId('add_education')
    expect(adEducationElement).toBeInTheDocument()

    await act(() => {
      fireEvent.click(adEducationElement)
    })

    const EducationModalContainer = screen.getByTestId('freelancer_education_modal')
    expect(within(EducationModalContainer).getByText('Education Detail')).toBeInTheDocument()

    const cancelButton = within(EducationModalContainer).getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()

    await act(() => {
      fireEvent.click(cancelButton)
    })
  })

  it('renders Freelancer profile page and click cancel on project model', async () => {
    renderWithRedux(<Profile />, { initialState })

    const TabsContainer = screen.getByTestId('projects_tab')

    const addProjectButton = within(TabsContainer).getByText('Add A Project')
    expect(addProjectButton).toBeInTheDocument()

    await act(() => {
      fireEvent.click(addProjectButton)
    })

    const ShowCaseModalContainer = screen.getByTestId('freelancer_showCase_projects_modal')
    expect(within(ShowCaseModalContainer).getByText('Project Details')).toBeInTheDocument()

    const cancelButton = within(ShowCaseModalContainer).getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()

    await act(() => {
      fireEvent.click(cancelButton)
    })
  })

  it('renders Freelancer profile page and Submit education form without data', async () => {
    renderWithRedux(<Profile />, { initialState })

    const adEducationElement = screen.getByTestId('add_education')
    expect(adEducationElement).toBeInTheDocument()

    await act(() => {
      fireEvent.click(adEducationElement)
    })

    const EducationModalContainer = screen.getByTestId('freelancer_education_modal')
    expect(within(EducationModalContainer).getByText('Education Detail')).toBeInTheDocument()

    const saveButton = within(EducationModalContainer).getByRole('button', { name: 'SAVE' })
    expect(saveButton).toBeInTheDocument()
    expect(saveButton).toBeEnabled()

    const titleField = within(EducationModalContainer).getByTestId('title')
    expect(titleField).toBeInTheDocument()

    const instituteField = within(EducationModalContainer).getByTestId('institute')
    expect(instituteField).toBeInTheDocument()

    const startYearField = within(EducationModalContainer).getByTestId('startYear')
    expect(startYearField).toBeInTheDocument()

    const endYearField = within(EducationModalContainer).getByTestId('endYear')
    expect(endYearField).toBeInTheDocument()

    fireEvent.click(titleField)
    fireEvent.change(titleField, {
      target: { value: '' }
    })
    fireEvent.click(saveButton)
    expect(within(EducationModalContainer).getByText('Degree title is required.')).toBeInTheDocument()

    fireEvent.click(titleField)
    fireEvent.change(titleField, {
      target: { value: 'new degree' }
    })

    fireEvent.click(instituteField)
    fireEvent.change(instituteField, {
      target: { value: '' }
    })
    fireEvent.click(saveButton)
    expect(within(EducationModalContainer).getByText('Institute is required.')).toBeInTheDocument()

    fireEvent.click(instituteField)
    fireEvent.change(instituteField, {
      target: { value: 'test degree institute' }
    })

    fireEvent.click(startYearField)
    fireEvent.change(startYearField, {
      target: { value: 2027 }
    })

    fireEvent.click(endYearField)
    fireEvent.change(endYearField, {
      target: { value: 2013 }
    })
    await act(() => {
      fireEvent.click(saveButton)
    })
    expect(
      within(EducationModalContainer).getByText('Start year should be less than the end year.')
    ).toBeInTheDocument()

    const cancelButton = within(EducationModalContainer).getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()

    await act(() => {
      fireEvent.click(saveButton)
    })
  })

  it('renders Freelancer profile page and close education modal by click outside the modal', async () => {
    renderWithRedux(<Profile />, { initialState })

    const adEducationElement = screen.getByTestId('add_education')
    expect(adEducationElement).toBeInTheDocument()
    await act(() => {
      fireEvent.click(adEducationElement)
    })

    const backdrop = document.querySelector('.MuiBackdrop-root')
    fireEvent.mouseDown(backdrop)
    fireEvent.mouseUp(backdrop)
  })

  it('renders Freelancer profile page and display loading indicator on education modal', async () => {
    initialState.Loading.loading = true
    renderWithRedux(<Profile />, { initialState })

    const adEducationElement = screen.getByTestId('add_education')
    expect(adEducationElement).toBeInTheDocument()
    await act(() => {
      fireEvent.click(adEducationElement)
    })

    const backdrop = document.querySelector('.MuiBackdrop-root')
    fireEvent.mouseDown(backdrop)
    fireEvent.mouseUp(backdrop)
  })

  it('renders EducationModal without open dialog', async () => {
    renderWithRedux(<EducationModal />, { initialState })
  })

  it('renders EducationModal with loading prop null', async () => {
    initialState.Loading.loading = undefined
    renderWithRedux(<EducationModal />, { initialState })
  })

  it('renders Freelancer profile page for mobile view without user address country', async () => {
    initialState.Freelancers.selectedFreelancer.userId.AddressLineCountry = undefined

    renderWithRedux(<Profile />, { initialState })
    expect(screen.getByTestId('663919d0277f230b94c358ad_address')).toHaveTextContent('')
  })

  it('renders ProjectModal without open dialog', async () => {
    renderWithRedux(<ProjectModal />, { initialState })
  })

  it('renders ProjectModal with loading prop null', async () => {
    initialState.Loading.loading = undefined
    renderWithRedux(<ProjectModal />, { initialState })
  })

  it('renders Freelancer profile page and display loading indicator on project modal', async () => {
    initialState.Loading.loading = true
    renderWithRedux(<Profile />, { initialState })

    const TabsContainer = screen.getByTestId('projects_tab')

    const addProjectButton = within(TabsContainer).getByText('Add A Project')
    expect(addProjectButton).toBeInTheDocument()

    await act(() => {
      fireEvent.click(addProjectButton)
    })

    const backdrop = document.querySelector('.MuiBackdrop-root')
    fireEvent.mouseDown(backdrop)
    fireEvent.mouseUp(backdrop)
  })

  it('renders Freelancer profile page Without name of first project', async () => {
    initialState.Freelancers.selectedFreelancer.projects[0].projectName = undefined

    renderWithRedux(<Profile />, { initialState })
  })

  it('renders Freelancer profile page Without skills of first project', async () => {
    initialState.Freelancers.selectedFreelancer.projects[0].skills = []

    renderWithRedux(<Profile />, { initialState })
  })

  it('renders Freelancer profile page Without images of first project', async () => {
    initialState.Freelancers.selectedFreelancer.projects[0].images = []

    renderWithRedux(<Profile />, { initialState })
  })

  it('renders Freelancer profile page Without skills', async () => {
    initialState.Freelancers.selectedFreelancer.freelancerSkills = []
    initialState.Freelancers.selectedFreelancer.projects = []

    renderWithRedux(<Profile />, { initialState })
  })

  it('renders styled components of freelancer profile', async () => {
    render(<DropDown display="flex" />)
    render(<DropDown />)
    render(<Paragraph background="red" align="left" right="1px" />)
  })

  // // Mobile View Test
  it('renders Freelancer profile page for mobile view and verify mobile profile card options', async () => {
    initialState.Freelancers.selectedFreelancer.userId.AddressLineCountry = 'United State'

    initialState.Auth.user.role = 1
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const scheduleInterviewElement = screen.getByTestId('profile_schedule_interview')
    expect(scheduleInterviewElement).toBeInTheDocument()

    await act(() => {
      fireEvent.click(scheduleInterviewElement)
    })

    const MobileProfileOptionsContainer = screen.getByTestId('mobile_profile_card_options')

    const makeAnOfferElement = within(MobileProfileOptionsContainer).getByText('Make An Offer')
    expect(makeAnOfferElement).toBeInTheDocument()

    const sendAMessageElement = within(MobileProfileOptionsContainer).getByText('Send A Message')
    expect(sendAMessageElement).toBeInTheDocument()

    fireEvent.click(makeAnOfferElement)

    expect(mockRouterPush).toHaveBeenCalledWith('/hire')
  })

  it('renders Freelancer profile page for mobile view  and click on Schedule an Interview', async () => {
    initialState.Auth.user.role = 1
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const scheduleInterviewElement = screen.getByTestId('profile_schedule_interview')
    expect(scheduleInterviewElement).toBeInTheDocument()

    await act(() => {
      fireEvent.click(scheduleInterviewElement)
    })

    const MobileProfileOptionsContainer = screen.getByTestId('mobile_profile_card_options')

    const sendAMessageElement = within(MobileProfileOptionsContainer).getByText('Send A Message')
    expect(sendAMessageElement).toBeInTheDocument()

    const scheduleInterviewOption = within(MobileProfileOptionsContainer).getByText('Schedule an Interview')

    await act(() => {
      fireEvent.click(scheduleInterviewOption)
    })
  })

  it('renders Freelancer profile page and mobile profile card options with _id', async () => {
    initialState.Auth.user._id = '6601c2a6149276195c3f8fbd'
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const scheduleInterviewElement = screen.getByTestId('profile_schedule_interview')
    expect(scheduleInterviewElement).toBeInTheDocument()

    await act(() => {
      fireEvent.click(scheduleInterviewElement)
    })

    const MobileProfileOptionsContainer = screen.getByTestId('mobile_profile_card_options')

    const scheduleInterviewOption = within(MobileProfileOptionsContainer).getByText('Schedule an Interview')
    expect(scheduleInterviewOption).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(scheduleInterviewOption)
    })
  })

  it('renders Freelancer profile page for mobile view without calender setting', async () => {
    initialState.Auth.user.role = 1
    initialState.CalenderSetting.calenderSetting = null
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const scheduleInterviewElement = screen.getByTestId('profile_schedule_interview')
    expect(scheduleInterviewElement).toBeInTheDocument()

    await act(() => {
      fireEvent.click(scheduleInterviewElement)
    })

    const MobileProfileOptionsContainer = screen.getByTestId('mobile_profile_card_options')

    const scheduleInterviewOption = within(MobileProfileOptionsContainer).getByText('Schedule an Interview')

    await act(() => {
      fireEvent.click(scheduleInterviewOption)
    })
  })

  it('renders Freelancer profile page for mobile view and add user to list with success response', async () => {
    initialState.Auth.user.role = 1
    initialState.CalenderSetting.calenderSetting = null
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const scheduleInterviewElement = screen.getByTestId('profile_schedule_interview')
    expect(scheduleInterviewElement).toBeInTheDocument()

    await act(() => {
      fireEvent.click(scheduleInterviewElement)
    })

    const MobileProfileOptionsContainer = screen.getByTestId('mobile_profile_card_options')
    expect(MobileProfileOptionsContainer).toBeInTheDocument()

    const addUserToListOption = within(MobileProfileOptionsContainer).getByText('Add User To A List')
    expect(addUserToListOption).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(addUserToListOption)
    })

    const ListIconElement = within(MobileProfileOptionsContainer).getByTestId(
      initialState.Lists?.currentUserList[0]?._id
    )
    await act(async () => {
      await fireEvent.click(ListIconElement)
    })
  })

  it('renders Freelancer profile page for mobile view and add user to list with request error message', async () => {
    addEntriesToList.mockReturnValue(() => {
      return {
        status: 400,
        response: {
          data: {
            msg: 'User not added'
          }
        }
      }
    })

    initialState.Auth.user.role = 1
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(
      <MobileProfileCardOptions
        handleProfilePage={() => {}}
        freelancerId={'initialState.Auth.user.freelancers._id'}
        addEntriesToList={addEntriesToList}
        userId={'initialState.Auth.user.freelancers._id'}
        getInvitesLists={getInvitesLists}
        lists={initialState.Lists.currentUserList}
      />,
      {
        initialState
      }
    )

    const MobileProfileOptionsContainer = screen.getByTestId('mobile_profile_card_options')

    const addUserToListOption = within(MobileProfileOptionsContainer).getByText('Add User To A List')

    await act(async () => {
      await fireEvent.click(addUserToListOption)
    })

    const ListIconElement = within(MobileProfileOptionsContainer).getByTestId('6601c2a6149276195c3f8fc0')

    expect(ListIconElement).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(ListIconElement)
    })

    expect(screen.getByText('User not added')).toBeInTheDocument()
  })

  it('renders Freelancer profile page for mobile view and add user to list with default error message', async () => {
    addEntriesToList.mockReturnValue(() => {
      return {
        status: 400
      }
    })

    initialState.Auth.user.role = 1
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(
      <MobileProfileCardOptions
        handleProfilePage={() => {}}
        freelancerId={'initialState.Auth.user.freelancers._id'}
        addEntriesToList={addEntriesToList}
        userId={'initialState.Auth.user.freelancers._id'}
        getInvitesLists={getInvitesLists}
        lists={initialState.Lists.currentUserList}
      />,
      {
        initialState
      }
    )

    const MobileProfileOptionsContainer = screen.getByTestId('mobile_profile_card_options')

    const addUserToListOption = within(MobileProfileOptionsContainer).getByText('Add User To A List')

    await act(async () => {
      await fireEvent.click(addUserToListOption)
    })

    const ListIconElement = within(MobileProfileOptionsContainer).getByTestId('6601c2a6149276195c3f8fc0')

    expect(ListIconElement).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(ListIconElement)
    })

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders Freelancer profile page for mobile view and add user to list without list icon', async () => {
    initialState.Auth.user.role = 1
    initialState.CalenderSetting.calenderSetting = null
    initialState.Lists.currentUserList[0].icon = 'WeiboOutlined'

    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const scheduleInterviewElement = screen.getByTestId('profile_schedule_interview')
    expect(scheduleInterviewElement).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(scheduleInterviewElement)
    })

    const MobileProfileOptionsContainer = screen.getByTestId('mobile_profile_card_options')

    const addUserToListOption = within(MobileProfileOptionsContainer).getByText('Add User To A List')

    await act(async () => {
      await fireEvent.click(addUserToListOption)
    })
  })

  it('renders Freelancer profile page for mobile view and add user to list without list name', async () => {
    initialState.Auth.user.role = 1
    initialState.CalenderSetting.calenderSetting = null
    initialState.Lists.currentUserList[0].name = undefined

    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const scheduleInterviewElement = screen.getByTestId('profile_schedule_interview')
    expect(scheduleInterviewElement).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(scheduleInterviewElement)
    })

    const MobileProfileOptionsContainer = screen.getByTestId('mobile_profile_card_options')

    const addUserToListOption = within(MobileProfileOptionsContainer).getByText('Add User To A List')

    await (async () => {
      await fireEvent.click(addUserToListOption)
    })
  })

  it('renders Freelancer profile options without list', async () => {
    initialState.Auth.user.role = 1
    initialState.CalenderSetting.calenderSetting = null
    initialState.Lists.currentUserList = []

    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const scheduleInterviewElement = screen.getByTestId('profile_schedule_interview')
    expect(scheduleInterviewElement).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(scheduleInterviewElement)
    })

    const MobileProfileOptionsContainer = screen.getByTestId('mobile_profile_card_options')

    const addUserToListOption = within(MobileProfileOptionsContainer).getByText('Add User To A List')

    await act(async () => {
      await fireEvent.click(addUserToListOption)
    })
  })

  it('renders Freelancer profile page for mobile view and add one more education history', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const MobilePrfileContainer = screen.getByTestId('mobile_profile_container')

    expect(within(MobilePrfileContainer).getByText('Education')).toBeInTheDocument()

    const adEducationElement = within(MobilePrfileContainer).getByTestId('add_education')
    expect(adEducationElement).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(adEducationElement)
    })

    const EducationModalContainer = screen.getByTestId('freelancer_education_modal')
    expect(within(EducationModalContainer).getByText('Education Detail')).toBeInTheDocument()

    const titleField = within(EducationModalContainer).getByTestId('title')
    expect(titleField).toBeInTheDocument()

    const instituteField = within(EducationModalContainer).getByTestId('institute')
    expect(instituteField).toBeInTheDocument()

    const startYearField = within(EducationModalContainer).getByTestId('startYear')
    expect(startYearField).toBeInTheDocument()

    const endYearField = within(EducationModalContainer).getByTestId('endYear')
    expect(endYearField).toBeInTheDocument()

    fireEvent.click(titleField)
    fireEvent.change(titleField, {
      target: { value: 'one more test degree' }
    })

    fireEvent.click(instituteField)
    fireEvent.change(instituteField, {
      target: { value: 'one more test degree insitute' }
    })

    fireEvent.click(startYearField)
    fireEvent.change(startYearField, {
      target: { value: 2017 }
    })

    fireEvent.click(endYearField)
    fireEvent.change(endYearField, {
      target: { value: 2023 }
    })

    const saveButton = within(EducationModalContainer).getByRole('button', { name: 'SAVE' })
    expect(saveButton).toBeInTheDocument()
    expect(saveButton).toBeEnabled()

    const cancelButton = within(EducationModalContainer).getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()

    await act(async () => {
      await fireEvent.click(saveButton)
    })
  })

  it('renders Freelancer profile page for mobile view and click cancel education modal', async () => {
    global.innerWidth = 640

    renderWithRedux(<Profile />, { initialState })

    const adEducationElement = screen.getByTestId('add_education')
    expect(adEducationElement).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(adEducationElement)
    })

    const EducationModalContainer = screen.getByTestId('freelancer_education_modal')
    expect(within(EducationModalContainer).getByText('Education Detail')).toBeInTheDocument()

    const cancelButton = within(EducationModalContainer).getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()

    await act(async () => {
      await fireEvent.click(cancelButton)
    })
  })
  it('renders Freelancer profile page and add one more project', async () => {
    initialState.Loading.loading = false
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const TabsContainer = screen.getByTestId('projects_tab')

    const addProjectButton = within(TabsContainer).getByText('Add A Project')
    expect(addProjectButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(addProjectButton)
    })

    const ShowCaseModalContainer = screen.getByTestId('freelancer_showCase_projects_modal')
    expect(within(ShowCaseModalContainer).getByText('Project Details')).toBeInTheDocument()

    const projectNameField = within(ShowCaseModalContainer).getByTestId('projectName')
    expect(projectNameField).toBeInTheDocument()

    const projectRoleField = within(ShowCaseModalContainer).getByTestId('projectRole')
    expect(projectRoleField).toBeInTheDocument()

    const nextButton = within(ShowCaseModalContainer).getByText('Next')
    expect(nextButton).toBeInTheDocument()
    expect(nextButton).toBeEnabled()

    const cancelButton = within(ShowCaseModalContainer).getByText('Cancel')
    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()

    fireEvent.click(projectNameField)
    fireEvent.change(projectNameField, {
      target: { value: 'one more test project' }
    })

    fireEvent.click(projectRoleField)
    fireEvent.change(projectRoleField, {
      target: { value: 'Senior Software Engineer' }
    })
    expect(nextButton).toBeEnabled()
    fireEvent.click(nextButton)

    const backButton = within(ShowCaseModalContainer).getByRole('button', { name: 'BACK' })
    expect(backButton).toBeInTheDocument()
    expect(backButton).toBeEnabled()

    fireEvent.click(backButton)

    fireEvent.click(nextButton)
    expect(backButton).toBeEnabled()

    const skillField = within(ShowCaseModalContainer).getByTestId('skills')
    expect(skillField).toBeInTheDocument()

    const addSkillButton = within(ShowCaseModalContainer).getByRole('button', { name: 'Add' })
    expect(addSkillButton).toBeInTheDocument()

    fireEvent.click(skillField)

    fireEvent.change(skillField, {
      target: { value: 'React' }
    })
    fireEvent.keyDown(skillField, { key: 'Enter', code: 'Enter' })
    fireEvent.change(skillField, {
      target: { value: 'Node' }
    })
    fireEvent.keyDown(skillField, { key: 'Enter', code: 'Enter' })

    fireEvent.change(skillField, {
      target: { value: 'Express Js' }
    })
    fireEvent.click(addSkillButton)
    expect(within(ShowCaseModalContainer).getByText('React')).toBeInTheDocument()
    expect(within(ShowCaseModalContainer).getByText('Node')).toBeInTheDocument()
    expect(within(ShowCaseModalContainer).getByText('Express Js')).toBeInTheDocument()

    fireEvent.click(skillField)
    fireEvent.change(skillField, {
      target: { value: '' }
    })
    fireEvent.keyDown(skillField, { key: 'Shift', code: 'Shift' })

    fireEvent.click(skillField)
    fireEvent.change(skillField, {
      target: { value: '' }
    })
    fireEvent.click(addSkillButton)

    const deleteSkillIcon = within(ShowCaseModalContainer).getByTestId('delete_React')
    fireEvent.click(deleteSkillIcon)

    expect(within(ShowCaseModalContainer).queryByText('React')).not.toBeInTheDocument()

    expect(nextButton).toBeEnabled()
    fireEvent.click(nextButton)

    expect(within(ShowCaseModalContainer).getByText('Project Images')).toBeInTheDocument()

    const uploadImageContainer = within(ShowCaseModalContainer).getByTestId('project_images')
    expect(uploadImageContainer).toBeInTheDocument()

    fireEvent.click(uploadImageContainer)

    const file1 = new File(['dummy content 1'], 'image3.jpeg', {
      // path: 'image3.jpeg',
      lastModified: 1709931523553,
      name: 'image3.jpeg',
      size: 11068,
      type: 'image/jpeg',
      webkitRelativePath: ''
    })
    const file2 = new File(['dummy content 1'], 'image3.jpeg', {
      // path: 'image3.jpeg',
      lastModified: 1709931523553,
      name: 'image3.jpeg',
      size: 11068,
      type: 'image/jpeg',
      webkitRelativePath: ''
    })

    const dropzone = uploadImageContainer.querySelector('.dropzone input')

    await act(async () => {
      await userEvent.upload(dropzone, [file1, file2])
    })

    expect(nextButton).toBeEnabled()

    const submitButton = within(ShowCaseModalContainer).getByRole('button', { name: 'SUBMIT' })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toBeEnabled()
    await act(async () => {
      await fireEvent.click(submitButton)
    })
  })
  it('renders freelancer profile and click to hide profile options', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const scheduleInterviewElement = screen.getByTestId('profile_schedule_interview')
    expect(scheduleInterviewElement).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(scheduleInterviewElement)
    })

    const MobileProfileOptionsContainer = screen.getByTestId('mobile_profile_card_options')

    const hideProfileOptions = within(MobileProfileOptionsContainer).getByTestId('show_mobile_profile')

    await act(async () => {
      await fireEvent.click(hideProfileOptions)
    })
  })

  it('renders Freelancer profile page and mobile profile card options without _id', async () => {
    initialState.Auth.user._id = undefined
    delete initialState.CalenderSetting.calenderSetting
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const scheduleInterviewElement = screen.getByTestId('profile_schedule_interview')
    expect(scheduleInterviewElement).toBeInTheDocument()

    await act(() => {
      fireEvent.click(scheduleInterviewElement)
    })

    const MobileProfileOptionsContainer = screen.getByTestId('mobile_profile_card_options')

    const scheduleInterviewOption = within(MobileProfileOptionsContainer).getByText('Schedule an Interview')
    expect(scheduleInterviewOption).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(scheduleInterviewOption)
    })
  })

  it('renders styled components of freelancer profile', async () => {
    render(<DIV display="flex" />)
    render(<TEXT background="red" />)
  })

  it('renders Freelancer profile page for mobile view and click on back icon', async () => {
    initialState.Auth.user.role = 1
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    const backProfileElement = screen.getByTestId('back_profile')
    expect(backProfileElement).toBeInTheDocument()

    await act(() => {
      fireEvent.click(backProfileElement)
    })
    expect(mockRouterBack).toHaveBeenCalled()
  })

  it('renders Freelancer profile page for mobile view without user first name and last name', async () => {
    initialState.Freelancers.selectedFreelancer.userId.FirstName = undefined
    initialState.Freelancers.selectedFreelancer.userId.LastName = undefined
    initialState.Freelancers.selectedFreelancer.userId.AddressLineCountry = undefined

    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Profile />, { initialState })

    expect(screen.getByTestId('user_name')).toHaveTextContent('')
  })

  it('renders Freelancer profile page Without skills of first project and project name', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))
    initialState.Freelancers.selectedFreelancer.projects[1].skills = []
    initialState.Freelancers.selectedFreelancer.projects[1].projectName = undefined

    renderWithRedux(<Profile />, { initialState })
  })

  it('renders Freelancer profile page Without project skills and freelancer skills', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))
    initialState.Freelancers.selectedFreelancer.projects = []
    initialState.Freelancers.selectedFreelancer.freelancerSkills = []

    renderWithRedux(<Profile />, { initialState })
  })
})
