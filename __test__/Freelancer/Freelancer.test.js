import React from 'react'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom' // for the toBeInTheDocument matcher
import { fireEvent, screen, act, within, render } from '@testing-library/react'

import { LIST_ENTRIES, INVITES_LIST } from '../store/ListEntries'
import { P } from '../../components/unzipped/ListModal'
import Freelancers from '../../pages/freelancers/index'
import { FREELCANCERS_LIST } from '../store/Freelancer'
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'
import MobileSearchFilter from '../../components/unzipped/MobileSearchFilter'
import FreelancerCard from '../../components/unzipped/dashboard/FreelancerCard'
import DesktopSearchFilter from '../../components/unzipped/DesktopSearchFilter'
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
  it('renders Freelancers page and verify static data', async () => {
    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerPageContainer = screen.getByTestId('freelancer_page')
    expect(FreelancerPageContainer).toBeInTheDocument()

    expect(within(FreelancerPageContainer).getByText('Top Results')).toBeInTheDocument()
  })

  it('renders Freelancers page without freelancer data', async () => {
    initialState.Freelancers.freelancers = []

    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerPageContainer = screen.getByTestId('freelancer_page')
    expect(FreelancerPageContainer).toBeInTheDocument()

    expect(within(FreelancerPageContainer).getByText('No freelancers found for this search')).toBeInTheDocument()
  })

  it('renders Freelancers page without token', async () => {
    initialState.Auth.token = undefined

    renderWithRedux(<Freelancers />, { initialState })
  })

  it('renders Freelancers page with isExpanded true', async () => {
    initialState.Freelancers.isExpanded = true

    renderWithRedux(<Freelancers />, { initialState })
  })

  it('renders Freelancers page with isExpanded true and auth token undefined', async () => {
    initialState.Freelancers.isExpanded = true
    initialState.Auth.token = undefined

    renderWithRedux(<Freelancers />, { initialState })
  })

  it('renders Freelancers page and input to field for filter', async () => {
    renderWithRedux(<Freelancers />, { initialState })

    const searchInputField = screen.getByTestId('search-bar-input')
    expect(searchInputField).toBeInTheDocument()

    fireEvent.click(searchInputField)
    fireEvent.change(searchInputField, {
      target: {
        value: 'test name search'
      }
    })
    fireEvent.keyDown(searchInputField, { key: 'Enter', code: 'Enter' })

    fireEvent.change(searchInputField, {
      target: {
        value: 'test name search'
      }
    })

    const SearchIcon = screen.getByTestId('header_search_icon')
    expect(SearchIcon).toBeInTheDocument()

    fireEvent.click(SearchIcon)
  })

  it('renders Freelancers page with only one freelancer data', async () => {
    initialState.Freelancers.freelancers = initialState.Freelancers.freelancers.splice(0, 1)

    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerPageContainer = screen.getByTestId('freelancer_page')
    expect(FreelancerPageContainer).toBeInTheDocument()

    expect(within(FreelancerPageContainer).getByText('1 result')).toBeInTheDocument()
  })

  it('renders Freelancers page without country of first freelancer', async () => {
    initialState.Freelancers.freelancers[0].user.AddressLineCountry = undefined

    renderWithRedux(<Freelancers />, { initialState })
  })

  it('renders Freelancers page with client role and without first name', async () => {
    initialState.Auth.user.role = 0
    initialState.Auth.user.FirstName = undefined

    renderWithRedux(<Freelancers />, { initialState })
  })

  it('renders Freelancers page with client role and without account verification', async () => {
    initialState.Auth.user.isEmailVerified = false

    renderWithRedux(<Freelancers />, { initialState })

    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard`)
  })

  it('renders Freelancers page  with total count 1000', async () => {
    initialState.Freelancers.totalCount = 1000

    renderWithRedux(<Freelancers />, { initialState })
  })

  it('renders Freelancers page and verify default assignment if data of freelancer is undefined or null', async () => {
    initialState.Freelancers.freelancers[0].user.FirstName = undefined
    initialState.Freelancers.freelancers[0].user.LastName = undefined
    initialState.Freelancers.freelancers[0].user.profileImage = undefined
    initialState.Freelancers.freelancers[0].freelancerSkills = undefined

    renderWithRedux(<Freelancers />, { initialState })
  })

  it('renders Freelancers page with undefined freelancers to verify default prop value', async () => {
    initialState.Freelancers.freelancers = undefined

    renderWithRedux(<Freelancers />, { initialState })

    await act(async () => {
      await global.dispatchEvent(new Event('resize'))
    })
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

  it('renders Freelancers page with invite button', async () => {
    const FreelancersList = initialState.Freelancers.freelancers

    initialState.Freelancers.freelancers[0].invites.business = initialState.Business.projectList[0]._id

    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFreelancerContainer = screen.getByTestId('desktop_freelancer_container')
    expect(DesktopFreelancerContainer).toBeInTheDocument()

    const FreelancerDataContainer = within(DesktopFreelancerContainer).getByTestId(FreelancersList[0]._id)
    expect(FreelancerDataContainer).toBeInTheDocument()

    const InviteButton = within(FreelancerDataContainer).getByRole('button', { name: 'Invite' })
    expect(InviteButton).toBeInTheDocument()

    fireEvent.click(InviteButton)
  })

  it('renders Freelancers page with invite button and without access token', async () => {
    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Auth.token = undefined

    initialState.Freelancers.freelancers[0].invites.business = initialState.Business.projectList[0]._id

    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFreelancerContainer = screen.getByTestId('desktop_freelancer_container')
    expect(DesktopFreelancerContainer).toBeInTheDocument()

    const FreelancerDataContainer = within(DesktopFreelancerContainer).getByTestId(FreelancersList[0]._id)
    expect(FreelancerDataContainer).toBeInTheDocument()

    const InviteButton = within(FreelancerDataContainer).getByRole('button', { name: 'Invite' })
    expect(InviteButton).toBeInTheDocument()

    fireEvent.click(InviteButton)
  })

  it('renders Freelancers page and redirect to freelancer profile page', async () => {
    const FreelancersList = initialState.Freelancers.freelancers

    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFreelancerContainer = screen.getByTestId('desktop_freelancer_container')
    expect(DesktopFreelancerContainer).toBeInTheDocument()

    const FreelancerDataContainer = within(DesktopFreelancerContainer).getByTestId(FreelancersList[0]._id)
    expect(FreelancerDataContainer).toBeInTheDocument()

    const ViewProfileButton = within(FreelancerDataContainer).getByRole('button', { name: 'View Profile' })
    expect(ViewProfileButton).toBeInTheDocument()

    fireEvent.click(ViewProfileButton)

    expect(mockRouterPush).toHaveBeenCalledWith(`/freelancers/${FreelancersList[0]._id}`)
  })

  it('renders Freelancers page and not redirect to freelancer profile page', async () => {
    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFreelancerContainer = screen.getByTestId('desktop_freelancer_container')
    expect(DesktopFreelancerContainer).toBeInTheDocument()

    const ViewProfileButton = screen.getAllByText('View Profile')
    expect(ViewProfileButton[0]).toBeInTheDocument()

    fireEvent.click(ViewProfileButton[0])
  })

  it('renders Freelancer Card Component without include Rate', async () => {
    renderWithRedux(
      <FreelancerCard
        user={initialState.Freelancers.freelancers[0]}
        includeRate={false}
        filter={{}}
        userId={initialState.Auth.user._id}
      />,
      {
        initialState
      }
    )
  })

  it('renders Freelancers page and render  List Modal', async () => {
    const FreelancersList = initialState.Freelancers.freelancers
    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFreelancerContainer = screen.getByTestId('desktop_freelancer_container')
    expect(DesktopFreelancerContainer).toBeInTheDocument()

    const FreelancerDataContainer = within(DesktopFreelancerContainer).getByTestId(FreelancersList[0]._id)
    expect(FreelancerDataContainer).toBeInTheDocument()

    const ListModalButton = within(FreelancerDataContainer).getByTestId(`open_${initialState.Auth.user._id}_list_modal`)
    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(ListModalButton)
    })

    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    const CloseModalIcon = within(ListModal).getByTestId('close_list_modal_icon')
    expect(CloseModalIcon).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(CloseModalIcon)
    })
  })

  it('renders Freelancers page and verify  List Modal data', async () => {
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

    const MakeOfferOption = within(ListModal).getByText('Make An Offer')
    expect(MakeOfferOption).toBeInTheDocument()

    const ScheduleInterviewOption = within(ListModal).getByText('Schedule an Interview')
    expect(ScheduleInterviewOption).toBeInTheDocument()

    const SendMessageOption = within(ListModal).getByText('Send A Message')
    expect(SendMessageOption).toBeInTheDocument()

    const AddToListOption = within(ListModal).getByText('Add User To A List')
    expect(AddToListOption).toBeInTheDocument()
  })

  it('renders Freelancers page click on Make an Offer Option', async () => {
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

    const MakeOfferOption = within(ListModal).getByText('Make An Offer')
    expect(MakeOfferOption).toBeInTheDocument()

    fireEvent.click(MakeOfferOption)
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
  })

  it('renders Freelancers page click on Send A Message Option', async () => {
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

    const SendMessageOption = within(ListModal).getByText('Send A Message')
    expect(SendMessageOption).toBeInTheDocument()

    fireEvent.click(SendMessageOption)
  })

  it('renders Freelancers page click on Add User to List Option', async () => {
    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Lists.invitesList[2].name = undefined
    initialState.Lists.invitesList[2].listEntries = []

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

    expect(within(ListModal).getByText('List Name')).toBeInTheDocument()
    expect(within(ListModal).getByText('Private')).toBeInTheDocument()
    expect(within(ListModal).getByText('0 member')).toBeInTheDocument()
    expect(
      within(ListModal).getAllByText(`${initialState.Lists?.invitesList[0]?.listEntries?.length} member`)[0]
    ).toBeInTheDocument()

    const AddToListOption = within(ListModal).getByText('Add User To A List')
    expect(AddToListOption).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(AddToListOption)
    })

    expect(within(ListModal).getByText('Favorites')).toBeInTheDocument()

    const ListToAddUser = within(ListModal).getByTestId(initialState.Lists.invitesList[0]?._id)
    expect(ListToAddUser).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ListToAddUser)
    })
  })

  it('renders Freelancers page click on Add User to List Option with request error', async () => {
    addEntriesToList.mockReturnValue(data => {
      return {
        status: 500,
        response: {
          data: {
            msg: 'User not added'
          }
        }
      }
    })

    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Lists.invitesList[2].name = undefined
    initialState.Lists.invitesList[2].listEntries = []

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

    const AddToListOption = within(ListModal).getByText('Add User To A List')
    expect(AddToListOption).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(AddToListOption)
    })

    expect(within(ListModal).getByText('Favorites')).toBeInTheDocument()

    const ListToAddUser = within(ListModal).getByTestId(initialState.Lists.invitesList[0]?._id)
    expect(ListToAddUser).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(ListToAddUser)
    })

    expect(within(ListModal).getByText('User not added')).toBeInTheDocument()
  })

  it('renders Freelancers page click on Add User to List Option with default error', async () => {
    addEntriesToList.mockReturnValue(() => {
      return {
        status: 400,
        response: {}
      }
    })

    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Lists.invitesList[2].name = undefined
    initialState.Lists.invitesList[2].listEntries = []

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

    const AddToListOption = within(ListModal).getByText('Add User To A List')
    expect(AddToListOption).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(AddToListOption)
    })

    expect(within(ListModal).getByText('Favorites')).toBeInTheDocument()

    const ListToAddUser = within(ListModal).getByTestId(initialState.Lists.invitesList[0]?._id)
    expect(ListToAddUser).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(ListToAddUser)
    })
    expect(within(ListModal).getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders Freelancers page without user list', async () => {
    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Lists.invitesList = []

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

    const AddToListOption = within(ListModal).getByText('Add User To A List')
    expect(AddToListOption).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(AddToListOption)
    })
  })

  it('renders Freelancers page click on Send A Message Option', async () => {
    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Lists.invitesList[2].name = undefined
    initialState.Lists.invitesList[2].listEntries = []

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

    const SendMessageOption = within(ListModal).getByText('Send A Message')
    expect(SendMessageOption).toBeInTheDocument()
    fireEvent.click(SendMessageOption)

    fireEvent.click(SendMessageOption)
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/inbox`)
  })
  it('test styled components of List Modal', async () => {
    render(<P background="red" align="left" right="2px" hoverColor="rd" />)
  })

  it('renders Freelancers page and verify filters static data', async () => {
    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFilterContainer = screen.getByTestId('desktop_filters')
    expect(DesktopFilterContainer).toBeInTheDocument()

    expect(within(DesktopFilterContainer).getByText('Sort By')).toBeInTheDocument()
    expect(within(DesktopFilterContainer).getByText('Rate')).toBeInTheDocument()
    expect(within(DesktopFilterContainer).getByText('Skills')).toBeInTheDocument()
    expect(within(DesktopFilterContainer).getAllByText('Clear')[0]).toBeInTheDocument()
  })

  it('renders Freelancers page and set filters, also test clear filters', async () => {
    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFilterContainer = screen.getByTestId('desktop_filters')
    expect(DesktopFilterContainer).toBeInTheDocument()
    // Sort Filter
    const SortByFilter = within(DesktopFilterContainer).getByRole('combobox')
    expect(SortByFilter).toBeInTheDocument()

    const SortOption1 = within(DesktopFilterContainer).getByText('Most Relavent')
    await act(async () => {
      await fireEvent.click(SortOption1)
    })
    fireEvent.change(SortByFilter, { target: { value: 'most_relavent' } })
    expect(SortByFilter.value).toBe('most_relavent')

    const ClearSortFilter = within(DesktopFilterContainer).getByTestId('clear_sort_filter')
    expect(ClearSortFilter).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(ClearSortFilter)
    })
    expect(SortByFilter.value).toBe('All Categories')

    // Min Rate
    const MinRateFilter = within(DesktopFilterContainer).getByTestId('min_rate')
    expect(MinRateFilter).toBeInTheDocument()

    fireEvent.change(MinRateFilter, { target: { value: 20 } })
    expect(MinRateFilter.value).toBe('20')
    fireEvent.keyPress(MinRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })

    fireEvent.click(MinRateFilter)
    fireEvent.change(MinRateFilter, { target: { value: 20 } })
    expect(MinRateFilter.value).toBe('20')

    fireEvent.keyPress(MinRateFilter, { key: 'a', code: 'KeyA', charCode: 65 })

    // Max Rate
    const MaxRateFilter = within(DesktopFilterContainer).getByTestId('max_rate')
    expect(MaxRateFilter).toBeInTheDocument()

    fireEvent.change(MaxRateFilter, { target: { value: 29 } })
    expect(MaxRateFilter.value).toBe('29')
    fireEvent.keyPress(MaxRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })

    fireEvent.click(MaxRateFilter)
    fireEvent.change(MaxRateFilter, { target: { value: 29 } })
    expect(MaxRateFilter.value).toBe('29')

    fireEvent.keyPress(MaxRateFilter, { key: 'a', code: 'KeyA', charCode: 65 })

    const ClearRateFilter = within(DesktopFilterContainer).getByTestId('clear_rates')
    expect(ClearRateFilter).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(ClearRateFilter)
    })

    // Skills Filter
    const SkillFilter = within(DesktopFilterContainer).getByTestId('skills')
    expect(SkillFilter).toBeInTheDocument()

    fireEvent.change(SkillFilter, { target: { value: 'css' } })
    expect(SkillFilter.value).toBe('css')
    fireEvent.keyPress(SkillFilter, { key: 'Enter', code: 'Enter' })

    const ClearSkillField = within(DesktopFilterContainer).getByTestId('clear_skill_field')
    await act(async () => {
      await fireEvent.click(ClearSkillField)
    })

    // Input again to skills field
    fireEvent.click(SkillFilter)
    fireEvent.change(SkillFilter, { target: { value: 'CSS' } })

    const SkillSuggestion = within(DesktopFilterContainer).getByTestId('css_suggestion')
    expect(SkillSuggestion).toBeInTheDocument()
    fireEvent.click(SkillSuggestion)

    fireEvent.keyDown(SkillFilter, { key: 'Enter', code: 'Enter' })

    const ClearSkillFilter = within(DesktopFilterContainer).getByTestId('clear_skills')
    expect(ClearSkillFilter).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(ClearSkillFilter)
    })

    fireEvent.click(SkillFilter)
    fireEvent.change(SkillFilter, { target: { value: '' } })
  })

  it('renders Freelancers page and handle min rate, max rate validations', async () => {
    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFilterContainer = screen.getByTestId('desktop_filters')
    expect(DesktopFilterContainer).toBeInTheDocument()

    const MinRateFilter = within(DesktopFilterContainer).getByTestId('min_rate')
    expect(MinRateFilter).toBeInTheDocument()

    const MaxRateFilter = within(DesktopFilterContainer).getByTestId('max_rate')
    expect(MaxRateFilter).toBeInTheDocument()

    // Test Filters Error
    // Max rate could not less than min rate

    fireEvent.click(MaxRateFilter)
    fireEvent.change(MaxRateFilter, { target: { value: 2 } })
    expect(MaxRateFilter.value).toBe('2')
    fireEvent.keyPress(MaxRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })
    fireEvent.blur(MaxRateFilter)

    fireEvent.click(MinRateFilter)
    fireEvent.change(MinRateFilter, { target: { value: 4 } })
    expect(MinRateFilter.value).toBe('4')
    fireEvent.blur(MaxRateFilter)
    fireEvent.keyPress(MaxRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(
      within(DesktopFilterContainer).getByText('Minimum should be lesser than the maximum value.')
    ).toBeInTheDocument()

    // Min rate could not greate than min rate

    fireEvent.click(MinRateFilter)
    fireEvent.change(MinRateFilter, { target: { value: 10 } })
    expect(MinRateFilter.value).toBe('10')
    fireEvent.keyPress(MinRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })

    fireEvent.click(MaxRateFilter)
    fireEvent.change(MaxRateFilter, { target: { value: 8 } })
    expect(MaxRateFilter.value).toBe('8')
    fireEvent.keyPress(MaxRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })
    fireEvent.blur(MaxRateFilter)

    expect(
      within(DesktopFilterContainer).getByText('Maximum should be greater than the minimum value.')
    ).toBeInTheDocument()

    // Min and Max with valid values

    fireEvent.click(MinRateFilter)
    fireEvent.change(MinRateFilter, { target: { value: 100 } })
    fireEvent.blur(MinRateFilter)

    fireEvent.click(MaxRateFilter)
    fireEvent.change(MaxRateFilter, { target: { value: 180 } })
    fireEvent.blur(MaxRateFilter)
  })

  it('renders Freelancers page and input valid values to filters', async () => {
    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFilterContainer = screen.getByTestId('desktop_filters')
    expect(DesktopFilterContainer).toBeInTheDocument()

    const SortByFilter = within(DesktopFilterContainer).getByRole('combobox')

    fireEvent.change(SortByFilter, { target: { value: 'most_relavent' } })
    expect(SortByFilter.value).toBe('most_relavent')

    const MaxRateFilter = within(DesktopFilterContainer).getByTestId('max_rate')
    fireEvent.change(MaxRateFilter, { target: { value: 29 } })
    fireEvent.keyPress(MaxRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })
    fireEvent.blur(MaxRateFilter)

    const MinRateFilter = within(DesktopFilterContainer).getByTestId('min_rate')
    fireEvent.change(MinRateFilter, { target: { value: 20 } })
    fireEvent.keyPress(MinRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })
    fireEvent.blur(MinRateFilter)

    const SkillFilter = within(DesktopFilterContainer).getByTestId('skills')
    fireEvent.click(SkillFilter)
    fireEvent.change(SkillFilter, { target: { value: 'CSS' } })
    const SkillSuggestion = within(DesktopFilterContainer).getByTestId('css_suggestion')
    expect(SkillSuggestion).toBeInTheDocument()
    fireEvent.click(SkillSuggestion)
  })

  it('renders Freelancers page and click on recent skills checkboxes', async () => {
    renderWithRedux(<Freelancers />, { initialState })

    const DesktopFilterContainer = screen.getByTestId('desktop_filters')
    expect(DesktopFilterContainer).toBeInTheDocument()

    const RecentSkill = within(DesktopFilterContainer).getByTestId(`react_0`)
    fireEvent.click(RecentSkill)
    fireEvent.click(RecentSkill)
  })

  it('renders Desktop search filter without filter type', async () => {
    renderWithRedux(<DesktopSearchFilter handleFilterOpenClose={() => {}} filter={{}} setFilters={() => {}} />, {
      initialState
    })
  })

  // // // Mobile View Test
  it('renders Freelancers page on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Freelancers />, { initialState })
  })

  it('renders Freelancers page and verify search field', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Freelancers />, { initialState })

    const SearchbarContainer = screen.getByTestId('search_bar')
    expect(SearchbarContainer).toBeInTheDocument()

    const searchInputField = within(SearchbarContainer).getByRole('textbox')
    expect(searchInputField).toBeInTheDocument()
    expect(within(SearchbarContainer).getByPlaceholderText('SEARCH')).toBeInTheDocument()
    expect(within(SearchbarContainer).getByText('SAVE')).toBeInTheDocument()

    fireEvent.change(searchInputField, {
      target: {
        value: 'test name search'
      }
    })
    fireEvent.keyDown(searchInputField, { key: 'Enter', code: 'Enter' })

    fireEvent.change(searchInputField, {
      target: {
        value: 'test name search'
      }
    })
    fireEvent.keyDown(searchInputField, { key: 'Shift', code: 'Shift' })

    const SearchIcon = within(SearchbarContainer).getByTestId('search_icon')
    expect(SearchIcon).toBeInTheDocument()

    fireEvent.click(SearchIcon)

    const ToggleFilterIcon = within(SearchbarContainer).getByTestId('toggle_filter')
    expect(ToggleFilterIcon).toBeInTheDocument()

    fireEvent.click(ToggleFilterIcon)
  })

  it('renders Freelancers page on mobile view', async () => {
    initialState.Freelancers.totalCount = 1000
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Freelancers />, { initialState })
  })

  it('renders Freelancers page on mobile view and resize window', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Freelancers />, { initialState })

    // Resize the window to trigger the effect
    global.innerWidth = 600
    global.dispatchEvent(new Event('resize'))
  })

  it('renders Freelancers page on mobile view and click on Send A Message Option with _id in response', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    checkUserConversation.mockReturnValue(() => {
      return {
        data: {
          _id: 'chat_id'
        }
      }
    })

    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Lists.invitesList[2].name = undefined
    initialState.Lists.invitesList[2].listEntries = []

    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerDataContainer = screen.getByTestId(FreelancersList[0]._id + '_mobile')
    expect(FreelancerDataContainer).toBeInTheDocument()

    const ListModalButton = within(FreelancerDataContainer).getByTestId(`open_${FreelancersList[0]._id}_mobile`)
    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(ListModalButton)
    })

    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    const SendMessageOption = within(ListModal).getByText('Send A Message')
    expect(SendMessageOption).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(SendMessageOption)
    })
    await act(async () => {
      await fireEvent.click(SendMessageOption)
    })

    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/chat/chat_id`)
  })

  it('renders Freelancers page on mobile view and click on Send A Message Option with data true', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    checkUserConversation.mockReturnValue(() => {
      return {
        data: true
      }
    })

    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Lists.invitesList[2].name = undefined
    initialState.Lists.invitesList[2].listEntries = []

    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerDataContainer = screen.getByTestId(FreelancersList[0]._id + '_mobile')
    expect(FreelancerDataContainer).toBeInTheDocument()

    const ListModalButton = within(FreelancerDataContainer).getByTestId(`open_${FreelancersList[0]._id}_mobile`)
    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ListModalButton)
    })

    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    const SendMessageOption = within(ListModal).getByText('Send A Message')
    expect(SendMessageOption).toBeInTheDocument()
    fireEvent.click(SendMessageOption)

    await act(async () => {
      await fireEvent.click(SendMessageOption)
    })
  })

  it('renders Freelancers page on mobile view and click on Send A Message Option without response', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    checkUserConversation.mockReturnValue(() => {
      return {
        data: null
      }
    })

    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Lists.invitesList[2].name = undefined
    initialState.Lists.invitesList[2].listEntries = []

    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerDataContainer = screen.getByTestId(FreelancersList[0]._id + '_mobile')
    expect(FreelancerDataContainer).toBeInTheDocument()

    const ListModalButton = within(FreelancerDataContainer).getByTestId(`open_${FreelancersList[0]._id}_mobile`)
    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ListModalButton)
    })

    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    const SendMessageOption = within(ListModal).getByText('Send A Message')
    expect(SendMessageOption).toBeInTheDocument()
    fireEvent.click(SendMessageOption)

    await act(async () => {
      await fireEvent.click(SendMessageOption)
    })
  })

  it('renders Freelancers page on mobile view and invite freelancer to project', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const FreelancersList = initialState.Freelancers.freelancers

    initialState.Freelancers.freelancers[0].invites.business = initialState.Business.projectList[0]._id

    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerDataContainer = screen.getByTestId(FreelancersList[0]._id + '_mobile')
    expect(FreelancerDataContainer).toBeInTheDocument()

    const InviteButton = within(FreelancerDataContainer).getByRole('button', { name: 'Invite' })
    expect(InviteButton).toBeInTheDocument()

    fireEvent.click(InviteButton)
  })
  it('renders Freelancers page and redirect to freelancer profile page', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const FreelancersList = initialState.Freelancers.freelancers

    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerDataContainer = screen.getByTestId(FreelancersList[0]._id + '_mobile')
    expect(FreelancerDataContainer).toBeInTheDocument()

    const ViewProfileButton = within(FreelancerDataContainer).getByRole('button', { name: 'VIEW PROFILE' })
    expect(ViewProfileButton).toBeInTheDocument()

    fireEvent.click(ViewProfileButton)

    expect(mockRouterPush).toHaveBeenCalledWith(`/freelancers/${FreelancersList[0]._id}`)
  })

  it('renders Freelancers page with invite button and without access token', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Auth.token = undefined

    initialState.Freelancers.freelancers[0].invites.business = initialState.Business.projectList[0]._id

    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerDataContainer = screen.getByTestId(FreelancersList[0]._id + '_mobile')
    expect(FreelancerDataContainer).toBeInTheDocument()

    const InviteButton = within(FreelancerDataContainer).getByRole('button', { name: 'Invite' })
    expect(InviteButton).toBeInTheDocument()

    fireEvent.click(InviteButton)
  })

  it('renders Freelancers page and not redirect to freelancer profile page', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const FreelancersList = initialState.Freelancers.freelancers
    FreelancersList[0]._id = undefined
    renderWithRedux(<Freelancers />, { initialState })

    const ViewProfileButton = screen.getAllByText('VIEW PROFILE')
    expect(ViewProfileButton[0]).toBeInTheDocument()

    fireEvent.click(ViewProfileButton[0])
  })

  it('renders Freelancers page and verify freelancers data rendering correctly', async () => {
    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Freelancers.freelancers[0].invites.business = initialState.Business.projectList[2]._id

    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerDataContainer = screen.getByTestId(FreelancersList[0]._id + '_mobile')
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
    expect(within(FreelancerDataContainer).getByRole('button', { name: 'VIEW PROFILE' })).toBeInTheDocument()
    expect(within(FreelancerDataContainer).getByTestId(`open_${FreelancersList[0]._id}_mobile`)).toBeInTheDocument()

    FreelancersList[0].freelancerSkills.forEach(skill => {
      expect(within(FreelancerDataContainer).getByText(skill?.skill)).toBeInTheDocument()
    })
    expect(within(FreelancerDataContainer).getByTestId(`${FreelancersList[0]._id}_prefered`)).toBeInTheDocument()
  })

  it('renders Freelancers page and render  List Modal', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const FreelancersList = initialState.Freelancers.freelancers
    renderWithRedux(<Freelancers />, { initialState })

    const FreelancerDataContainer = screen.getByTestId(FreelancersList[0]._id + '_mobile')
    expect(FreelancerDataContainer).toBeInTheDocument()

    const ListModalButton = screen.getByTestId(`open_${FreelancersList[0]._id}_mobile`)
    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(ListModalButton)
    })

    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    const CloseModalIcon = within(ListModal).getByTestId('close_list_modal_icon')
    expect(CloseModalIcon).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(CloseModalIcon)
    })
  })
  it('renders Freelancers page and verify  List Modal data', async () => {
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

    const MakeOfferOption = within(ListModal).getByText('Make An Offer')
    expect(MakeOfferOption).toBeInTheDocument()

    const ScheduleInterviewOption = within(ListModal).getByText('Schedule an Interview')
    expect(ScheduleInterviewOption).toBeInTheDocument()

    const SendMessageOption = within(ListModal).getByText('Send A Message')
    expect(SendMessageOption).toBeInTheDocument()

    const AddToListOption = within(ListModal).getByText('Add User To A List')
    expect(AddToListOption).toBeInTheDocument()
  })

  it('renders Freelancers page click on Make an Offer Option', async () => {
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

    const MakeOfferOption = within(ListModal).getByText('Make An Offer')
    expect(MakeOfferOption).toBeInTheDocument()

    fireEvent.click(MakeOfferOption)
  })

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
  })

  it('renders Freelancers page click on Send A Message Option', async () => {
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

    const SendMessageOption = within(ListModal).getByText('Send A Message')
    expect(SendMessageOption).toBeInTheDocument()

    fireEvent.click(SendMessageOption)
  })

  it('renders Freelancers page click on Add User to List Option', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Lists.invitesList[2].name = undefined
    initialState.Lists.invitesList[2].listEntries = []

    renderWithRedux(<Freelancers />, { initialState })

    const ListModalButton = screen.getByTestId(`open_${FreelancersList[0]._id}_mobile`)

    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ListModalButton)
    })

    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    expect(within(ListModal).getByText('List Name')).toBeInTheDocument()
    expect(within(ListModal).getByText('Private')).toBeInTheDocument()
    expect(within(ListModal).getByText('0 member')).toBeInTheDocument()
    expect(
      within(ListModal).getAllByText(`${initialState.Lists?.invitesList[0]?.listEntries?.length} member`)[0]
    ).toBeInTheDocument()

    const AddToListOption = within(ListModal).getByText('Add User To A List')
    expect(AddToListOption).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(AddToListOption)
    })

    expect(within(ListModal).getByText('Favorites')).toBeInTheDocument()

    const ListToAddUser = within(ListModal).getByTestId(initialState.Lists.invitesList[0]?._id)
    expect(ListToAddUser).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ListToAddUser)
    })
  })

  it('renders Freelancers page click on Add User to List Option with request error', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    addEntriesToList.mockReturnValue(data => {
      return {
        status: 500,
        response: {
          data: {
            msg: 'User not added'
          }
        }
      }
    })

    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Lists.invitesList[2].name = undefined
    initialState.Lists.invitesList[2].listEntries = []

    renderWithRedux(<Freelancers />, { initialState })

    const ListModalButton = screen.getByTestId(`open_${FreelancersList[0]._id}_mobile`)

    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ListModalButton)
    })

    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    const AddToListOption = within(ListModal).getByText('Add User To A List')
    expect(AddToListOption).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(AddToListOption)
    })

    expect(within(ListModal).getByText('Favorites')).toBeInTheDocument()

    const ListToAddUser = within(ListModal).getByTestId(initialState.Lists.invitesList[0]?._id)
    expect(ListToAddUser).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(ListToAddUser)
    })

    expect(within(ListModal).getByText('User not added')).toBeInTheDocument()
  })

  it('renders Freelancers page click on Add User to List Option with default error', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    addEntriesToList.mockReturnValue(() => {
      return {
        status: 400,
        response: {}
      }
    })

    const FreelancersList = initialState.Freelancers.freelancers
    initialState.Lists.invitesList[2].name = undefined
    initialState.Lists.invitesList[2].listEntries = []

    renderWithRedux(<Freelancers />, { initialState })

    const ListModalButton = screen.getByTestId(`open_${FreelancersList[0]._id}_mobile`)

    expect(ListModalButton).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(ListModalButton)
    })

    const ListModal = screen.getByTestId(`${initialState.Auth.user._id}_list_modal`)
    expect(ListModal).toBeInTheDocument()

    const AddToListOption = within(ListModal).getByText('Add User To A List')
    expect(AddToListOption).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(AddToListOption)
    })

    expect(within(ListModal).getByText('Favorites')).toBeInTheDocument()

    const ListToAddUser = within(ListModal).getByTestId(initialState.Lists.invitesList[0]?._id)
    expect(ListToAddUser).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(ListToAddUser)
    })
    expect(within(ListModal).getByText('Something went wrong')).toBeInTheDocument()
  })
  it('renders Freelancers page and verify filter modal', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Freelancers />, { initialState })

    const ToggleFilterElement = screen.getByTestId('toggle_filter')

    await act(async () => {
      await fireEvent.click(ToggleFilterElement)
    })

    expect(screen.getByTestId('mobile_filters')).toBeInTheDocument()

    const CloseFilterElemment = screen.getByTestId('close_mobile_filters')
    await act(async () => {
      await fireEvent.click(CloseFilterElemment)
    })
  })

  it('renders Freelancers page and verify filters static data', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Freelancers />, { initialState })

    const ToggleFilterElement = screen.getByTestId('toggle_filter')

    await act(async () => {
      await fireEvent.click(ToggleFilterElement)
    })
    const MobileFilterContainer = screen.getByTestId('mobile_filters')
    expect(MobileFilterContainer).toBeInTheDocument()

    expect(within(MobileFilterContainer).getByText('Sort By')).toBeInTheDocument()
    expect(within(MobileFilterContainer).getByText('Rate')).toBeInTheDocument()
    expect(within(MobileFilterContainer).getByText('Skills')).toBeInTheDocument()
    expect(within(MobileFilterContainer).getAllByText('Clear')[0]).toBeInTheDocument()
    expect(within(MobileFilterContainer).getByRole('button', { name: 'SEE RESULTS' })).toBeInTheDocument()
  })

  it('renders Freelancers page and set filters, also test clear filters', async () => {
    const stopPropagationMock = jest.fn()
    // Override stopPropagation for the test
    const originalStopPropagation = Event.prototype.stopPropagation
    Event.prototype.stopPropagation = stopPropagationMock

    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Freelancers />, { initialState })

    const ToggleFilterElement = screen.getByTestId('toggle_filter')

    await act(async () => {
      await fireEvent.click(ToggleFilterElement)
    })
    const MobileFilterContainer = screen.getByTestId('mobile_filters')
    expect(MobileFilterContainer).toBeInTheDocument()

    // Sort Filter
    const SortByFilter = within(MobileFilterContainer).getByRole('combobox')
    expect(SortByFilter).toBeInTheDocument()

    const SortOption1 = within(MobileFilterContainer).getByText('Most Relavent')
    await act(async () => {
      await fireEvent.click(SortOption1)
    })
    fireEvent.change(SortByFilter, { target: { value: 'most_relavent' } })
    expect(SortByFilter.value).toBe('most_relavent')

    const ClearSortFilter = within(MobileFilterContainer).getByTestId('clear_sort_filter')
    expect(ClearSortFilter).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(ClearSortFilter)
    })
    expect(SortByFilter.value).toBe('All Categories')

    // Min Rate
    const MinRateFilter = within(MobileFilterContainer).getByTestId('min_rate')
    expect(MinRateFilter).toBeInTheDocument()

    fireEvent.change(MinRateFilter, { target: { value: 20 } })
    expect(MinRateFilter.value).toBe('20')
    fireEvent.keyPress(MinRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })

    fireEvent.click(MinRateFilter)
    fireEvent.change(MinRateFilter, { target: { value: 20 } })
    expect(MinRateFilter.value).toBe('20')

    fireEvent.keyPress(MinRateFilter, { key: 'a', code: 'KeyA', charCode: 65 })

    // Max Rate
    const MaxRateFilter = within(MobileFilterContainer).getByTestId('max_rate')
    expect(MaxRateFilter).toBeInTheDocument()

    fireEvent.change(MaxRateFilter, { target: { value: 29 } })
    expect(MaxRateFilter.value).toBe('29')
    fireEvent.keyPress(MaxRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })

    fireEvent.click(MaxRateFilter)
    fireEvent.change(MaxRateFilter, { target: { value: 29 } })
    expect(MaxRateFilter.value).toBe('29')

    fireEvent.keyPress(MaxRateFilter, { key: 'a', code: 'KeyA', charCode: 65 })

    // Simulate onTouchStart event
    fireEvent.touchStart(MaxRateFilter)
    expect(stopPropagationMock).toHaveBeenCalledTimes(1)

    // Simulate onTouchMove event
    fireEvent.touchMove(MaxRateFilter)
    expect(stopPropagationMock).toHaveBeenCalledTimes(2)

    Event.prototype.stopPropagation = originalStopPropagation

    const ClearRateFilter = within(MobileFilterContainer).getByTestId('clear_rates')
    expect(ClearRateFilter).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(ClearRateFilter)
    })

    // Skills Filter
    const SkillFilter = within(MobileFilterContainer).getByTestId('skills')
    expect(SkillFilter).toBeInTheDocument()

    fireEvent.change(SkillFilter, { target: { value: 'css' } })
    expect(SkillFilter.value).toBe('css')
    fireEvent.keyPress(SkillFilter, { key: 'Enter', code: 'Enter' })

    const ClearSkillField = within(MobileFilterContainer).getByTestId('clear_skill_field')
    await act(async () => {
      await fireEvent.click(ClearSkillField)
    })

    // Input again to skills field
    fireEvent.click(SkillFilter)
    fireEvent.change(SkillFilter, { target: { value: 'CSS' } })

    const SkillSuggestion = within(MobileFilterContainer).getByTestId('css_suggestion')
    expect(SkillSuggestion).toBeInTheDocument()
    fireEvent.click(SkillSuggestion)

    fireEvent.keyDown(SkillFilter, { key: 'Enter', code: 'Enter' })

    const ClearSkillFilter = within(MobileFilterContainer).getByTestId('clear_skills')
    expect(ClearSkillFilter).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(ClearSkillFilter)
    })

    fireEvent.click(SkillFilter)
    fireEvent.change(SkillFilter, { target: { value: '' } })
  })

  it('renders Freelancers page and handle min rate, max rate validations', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Freelancers />, { initialState })

    const ToggleFilterElement = screen.getByTestId('toggle_filter')

    await act(async () => {
      await fireEvent.click(ToggleFilterElement)
    })
    const MobileFilterContainer = screen.getByTestId('mobile_filters')
    expect(MobileFilterContainer).toBeInTheDocument()

    const SubmitFilterButton = within(MobileFilterContainer).getByText('SEE RESULTS')
    expect(SubmitFilterButton).toBeInTheDocument()

    const MinRateFilter = within(MobileFilterContainer).getByTestId('min_rate')
    expect(MinRateFilter).toBeInTheDocument()

    const MaxRateFilter = within(MobileFilterContainer).getByTestId('max_rate')
    expect(MaxRateFilter).toBeInTheDocument()

    // Test Filters Error
    // Max rate could not less than min rate

    fireEvent.click(MaxRateFilter)
    fireEvent.change(MaxRateFilter, { target: { value: 29 } })
    expect(MaxRateFilter.value).toBe('29')
    fireEvent.keyPress(MaxRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })

    fireEvent.click(MinRateFilter)
    fireEvent.change(MinRateFilter, { target: { value: 40 } })
    expect(MinRateFilter.value).toBe('40')
    fireEvent.keyPress(MinRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })

    expect(
      within(MobileFilterContainer).getByText('Minimum should be lesser than the maximum value.')
    ).toBeInTheDocument()

    // Min rate could not greate than min rate

    fireEvent.click(MinRateFilter)
    fireEvent.change(MinRateFilter, { target: { value: 10 } })
    expect(MinRateFilter.value).toBe('10')
    fireEvent.keyPress(MinRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })
    fireEvent.blur(MinRateFilter)

    fireEvent.click(MaxRateFilter)
    fireEvent.change(MaxRateFilter, { target: { value: 8 } })
    expect(MaxRateFilter.value).toBe('8')
    fireEvent.keyPress(MaxRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })
    fireEvent.blur(MaxRateFilter)

    expect(
      within(MobileFilterContainer).getByText('Maximum should be greater than the minimum value.')
    ).toBeInTheDocument()

    // Min and Max with valid values

    fireEvent.click(SubmitFilterButton)

    fireEvent.click(MinRateFilter)
    fireEvent.change(MinRateFilter, { target: { value: 100 } })
    fireEvent.blur(MinRateFilter)

    fireEvent.click(SubmitFilterButton)
    fireEvent.click(MaxRateFilter)
    fireEvent.change(MaxRateFilter, { target: { value: 180 } })
    fireEvent.blur(MaxRateFilter)

    fireEvent.click(SubmitFilterButton)
  })

  it('renders Freelancers page and input valid values to filters', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Freelancers />, { initialState })

    const ToggleFilterElement = screen.getByTestId('toggle_filter')

    await act(async () => {
      await fireEvent.click(ToggleFilterElement)
    })
    const MobileFilterContainer = screen.getByTestId('mobile_filters')
    expect(MobileFilterContainer).toBeInTheDocument()

    const SortByFilter = within(MobileFilterContainer).getByRole('combobox')

    fireEvent.change(SortByFilter, { target: { value: 'most_relavent' } })
    expect(SortByFilter.value).toBe('most_relavent')

    const MinRateFilter = within(MobileFilterContainer).getByTestId('min_rate')
    fireEvent.change(MinRateFilter, { target: { value: 20 } })
    fireEvent.keyPress(MinRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })

    const MaxRateFilter = within(MobileFilterContainer).getByTestId('max_rate')
    fireEvent.change(MaxRateFilter, { target: { value: 29 } })
    fireEvent.keyPress(MaxRateFilter, { key: 'Enter', code: 'Enter', charCode: 13 })

    const SkillFilter = within(MobileFilterContainer).getByTestId('skills')
    fireEvent.click(SkillFilter)
    fireEvent.change(SkillFilter, { target: { value: 'CSS' } })
    const SkillSuggestion = within(MobileFilterContainer).getByTestId('css_suggestion')
    expect(SkillSuggestion).toBeInTheDocument()
    fireEvent.click(SkillSuggestion)

    const SubmitFilterButton = within(MobileFilterContainer).getByText('SEE RESULTS')
    fireEvent.click(SubmitFilterButton)
  })

  it('renders Freelancers page and handle on Wheel', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const preventDefaultMock = jest.fn()

    renderWithRedux(<Freelancers />, { initialState })

    const ToggleFilterElement = screen.getByTestId('toggle_filter')

    await act(async () => {
      await fireEvent.click(ToggleFilterElement)
    })

    const MobileFilterContainer = screen.getByTestId('mobile_filters')

    const MaxRateFilter = within(MobileFilterContainer).getByTestId('max_rate')
    const MinRateFilter = within(MobileFilterContainer).getByTestId('min_rate')

    fireEvent.click(MinRateFilter)
    fireEvent.wheel(MinRateFilter, { preventDefault: preventDefaultMock })

    preventDefaultMock.mockReset()

    fireEvent.wheel(MaxRateFilter, { preventDefault: preventDefaultMock })
  })

  it('renders Freelancers page and click on recent skills checkboxes', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Freelancers />, { initialState })

    const ToggleFilterElement = screen.getByTestId('toggle_filter')

    await act(async () => {
      await fireEvent.click(ToggleFilterElement)
    })
    const MobileFilterContainer = screen.getByTestId('mobile_filters')
    expect(MobileFilterContainer).toBeInTheDocument()

    const RecentSkill = within(MobileFilterContainer).getByTestId(`react_0`)
    fireEvent.click(RecentSkill)
    fireEvent.click(RecentSkill)
  })

  it('renders Desktop search filter without filter type', async () => {
    renderWithRedux(<MobileSearchFilter handleFilterOpenClose={() => {}} filter={{}} setFilters={() => {}} />, {
      initialState
    })
  })
})
