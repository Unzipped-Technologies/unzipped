import React from 'react'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom' // for the toBeInTheDocument matcher
import { fireEvent, screen, act, within } from '@testing-library/react'

import { INVITES_LIST } from '../store/ListEntries'
import Freelancers from '../../pages/freelancers/index'
import { CLIENT_AUTH } from '../store/Users'
import { FREELCANCERS_LIST } from '../store/Freelancer'
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'
import { getInvitesLists, addEntriesToList } from '../../redux/Lists/ListsAction'
import { setUserIdForChat, checkUserConversation } from '../../redux/Messages/actions'
import {
  getFreelancerList,
  clearSelectedFreelancer,
  getAllFreelancers,
  createUserInvitation,
  getFreelancerById
} from '../../redux/Freelancers/actions'

const _ = require('lodash')

jest.mock('axios')

jest.mock('moment', () => {
  const originalModule = jest.requireActual('moment')

  return {
    __esModule: true,
    ...originalModule,
    default: () => originalModule('2023-06-23')
  }
})

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../redux/Freelancers/actions', () => ({
  ...jest.requireActual('../../redux/Freelancers/actions'),
  getFreelancerList: jest.fn(),
  clearSelectedFreelancer: jest.fn(),
  getAllFreelancers: jest.fn(),
  createUserInvitation: jest.fn(),
  getFreelancerById: jest.fn()
}))

jest.mock('../../redux/Lists/ListsAction', () => ({
  ...jest.requireActual('../../redux/Lists/ListsAction'),
  getInvitesLists: jest.fn(),
  addEntriesToList: jest.fn()
}))

jest.mock('../../redux/Messages/actions', () => ({
  ...jest.requireActual('../../redux/Messages/actions'),
  setUserIdForChat: jest.fn(),
  checkUserConversation: jest.fn()
}))

describe('Freelancers Component', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    initialState.Auth.user.isEmailVerified = true
    initialState.Auth.user = _.cloneDeep(CLIENT_AUTH)
    initialState.Freelancers.isExpanded = false
    initialState.Auth.token = 'testToken'
    initialState.Freelancers.freelancers = _.cloneDeep(FREELCANCERS_LIST)
    initialState.Lists.invitesList = _.cloneDeep(INVITES_LIST)

    getFreelancerList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    clearSelectedFreelancer.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    getAllFreelancers.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    createUserInvitation.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getInvitesLists.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    addEntriesToList.mockReturnValue(data => {
      return {
        status: 200
      }
    })

    getFreelancerById.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    checkUserConversation.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    setUserIdForChat.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    mockRouterPush = jest.fn()
    mockRouterBack = jest.fn()

    useRouter.mockImplementation(() => ({
      query: {
        project: initialState.Business.projectList[2]._id
      },
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

  it('renders Freelancers page', async () => {
    renderWithRedux(<Freelancers />, { initialState })
  })

  it('renders Freelancers page and verify freelancers data rendering correctly', async () => {
    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Freelancers.freelancers[0].invites.business = initialState.Business.projectList[2]._id

    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFreelancerContainer = screen.getByTestId('desktop_freelancer_container')
    expect(DesktopFreelancerContainer).toBeInTheDocument()

    const FreelancerDataContainer = within(DesktopFreelancerContainer).getByTestId(FreelancersList[0]._id)
    expect(FreelancerDataContainer).toBeInTheDocument()

    expect(within(FreelancerDataContainer).getByRole('button', { name: 'Invited' })).toBeInTheDocument()

    expect(
      within(FreelancerDataContainer).getByText(
        `${FreelancersList[0].user?.FirstName} ${FreelancersList[0].user?.LastName}`
      )
    ).toBeInTheDocument()
    expect(
      within(FreelancerDataContainer).getByText(`${FreelancersList[0].user?.AddressLineCountry}`)
    ).toBeInTheDocument()
    expect(within(FreelancerDataContainer).getByText(`$${FreelancersList[0].rate}`)).toBeInTheDocument()
    expect(within(FreelancerDataContainer).getByText(`${FreelancersList[0].category}`)).toBeInTheDocument()

    expect(within(FreelancerDataContainer).getByText(`${FreelancersList[0].cover}`)).toBeInTheDocument()
    expect(within(FreelancerDataContainer).getByRole('button', { name: 'View Profile' })).toBeInTheDocument()
    expect(
      within(FreelancerDataContainer).getByTestId(`open_${initialState.Auth.user._id}_list_modal`)
    ).toBeInTheDocument()

    FreelancersList[0].freelancerSkills.forEach(skill => {
      expect(within(FreelancerDataContainer).getByText(skill?.skill)).toBeInTheDocument()
    })
  })

  it('renders Freelancers page click on Schedule an Interview Option', async () => {
    const FreelancersList = initialState.Freelancers.freelancers
    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFreelancerContainer = screen.getByTestId('desktop_freelancer_container')
    expect(DesktopFreelancerContainer).toBeInTheDocument()

    const FreelancerDataContainer = within(DesktopFreelancerContainer).getByTestId(FreelancersList[0]._id)
    expect(FreelancerDataContainer).toBeInTheDocument()

    const ListModalButton = within(FreelancerDataContainer).getByTestId(`open_${initialState.Auth.user._id}_list_modal`)
    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ListModalButton)
    })
    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    const ScheduleInterviewOption = within(ListModal).getByText('Schedule an Interview')
    expect(ScheduleInterviewOption).toBeInTheDocument()

    fireEvent.click(ScheduleInterviewOption)

    const InterviewModal = screen.getByTestId('schedule_meeting_modal')
    expect(InterviewModal).toBeInTheDocument()
    const Calendar = InterviewModal.querySelector('#date_calendar')
    expect(Calendar).toBeInTheDocument()

    const CurrentDate = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).getDate() //'2024-03-25T19:00:02.865Z',
    fireEvent.click(within(Calendar).getByText(CurrentDate))

    const TimesContainer = InterviewModal.querySelector('#day_times')
    expect(TimesContainer).toBeInTheDocument()

    const Time1 = within(TimesContainer).getByText('11:00 AM')
    fireEvent.click(Time1)

    const Time2 = within(TimesContainer).getByText('02:00 PM')
    fireEvent.click(Time2)

    const Time3 = within(TimesContainer).getByText('04:00 PM')
    fireEvent.click(Time3)

    const Time4 = within(TimesContainer).getByText('05:00 PM')
    fireEvent.click(Time4)

    const Time5 = within(TimesContainer).getByText('06:00 PM')
    fireEvent.click(Time5)

    const SelectedTimesContainer = InterviewModal.querySelector('#selected_times')
    expect(SelectedTimesContainer).toBeInTheDocument()

    expect(within(SelectedTimesContainer).getByText('11:00 AM')).toBeInTheDocument()
    expect(within(SelectedTimesContainer).getByText('02:00 PM')).toBeInTheDocument()
    expect(within(SelectedTimesContainer).getByText('04:00 PM')).toBeInTheDocument()

    fireEvent.click(Time1)

    const ScheduleButton = within(InterviewModal).getByRole('button', { name: 'SCHEDULE' })
    fireEvent.click(ScheduleButton)
  })

  // // // Mobile View Test

  it('renders Freelancers page click on Schedule an Interview Option', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const FreelancersList = initialState.Freelancers.freelancers
    renderWithRedux(<Freelancers />, { initialState })

    const ListModalButton = screen.getByTestId(`open_${FreelancersList[0]._id}_mobile`)

    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ListModalButton)
    })

    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    const ScheduleInterviewOption = within(ListModal).getByText('Schedule an Interview')
    expect(ScheduleInterviewOption).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ScheduleInterviewOption)
    })

    const InterviewModal = screen.getByTestId('schedule_meeting_modal')
    expect(InterviewModal).toBeInTheDocument()
    const Calendar = InterviewModal.querySelector('#date_calendar')
    expect(Calendar).toBeInTheDocument()

    const CurrentDate = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).getDate() //'2024-03-25T19:00:02.865Z',
    fireEvent.click(within(Calendar).getByText(CurrentDate))

    const TimesContainer = InterviewModal.querySelector('#day_times')
    expect(TimesContainer).toBeInTheDocument()

    const Time1 = within(TimesContainer).getByText('11:00 AM')
    fireEvent.click(Time1)

    const Time2 = within(TimesContainer).getByText('02:00 PM')
    fireEvent.click(Time2)

    const Time3 = within(TimesContainer).getByText('04:00 PM')
    fireEvent.click(Time3)

    const Time4 = within(TimesContainer).getByText('05:00 PM')
    fireEvent.click(Time4)

    const Time5 = within(TimesContainer).getByText('06:00 PM')
    fireEvent.click(Time5)

    const SelectedTimesContainer = InterviewModal.querySelector('#selected_times')
    expect(SelectedTimesContainer).toBeInTheDocument()

    expect(within(SelectedTimesContainer).getByText('11:00 AM')).toBeInTheDocument()
    expect(within(SelectedTimesContainer).getByText('02:00 PM')).toBeInTheDocument()
    expect(within(SelectedTimesContainer).getByText('04:00 PM')).toBeInTheDocument()

    fireEvent.click(Time1)

    const ScheduleButton = within(InterviewModal).getByRole('button', { name: 'SCHEDULE' })
    fireEvent.click(ScheduleButton)
  })
})
