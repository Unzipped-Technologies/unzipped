import React from 'react'
import { useRouter } from 'next/router'
import { fireEvent, screen, act, within, waitFor } from '@testing-library/react'

import FreelancersListingCard from '../../../components/unzipped/dashboard/FreelancersListingCard' // Adjust the import path as needed
import ListManagementPanel from '../../../components/unzipped/dashboard/ListManagementPanel' // Adjust the import path as needed
import Lists from '../../../pages/dashboard/lists' // Adjust the import path as needed
import ViewAllLists from '../../../pages/dashboard/lists/view' // Adjust the import path as needed
import { initialState } from '../../store/mockInitialState'
import { renderWithRedux } from '../../store/commonTestSetup'
import { CLIENT_AUTH } from '../../store/Users'
import { USER_LIST, LIST_ENTRIES } from '../../store/ListEntries'
import MobileListDetail from '../../../pages/dashboard/lists/[id]'
import { getListEntriesById, getUserLists } from '../../../redux/ListEntries/action'
import { getInvitesLists, updateList } from '../../../redux/Lists/ListsAction'
import { getProjectsList } from '../../../redux/Business/actions'
import { parseCookies } from '../../../services/cookieHelper'

const _ = require('lodash')

jest.useFakeTimers() // Enable fake timers

jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

// Mock the parseCookies function
jest.mock('../../../services/cookieHelper', () => ({
  parseCookies: jest.fn()
}))

jest.mock('../../../redux/ListEntries/action', () => ({
  ...jest.requireActual('../../../redux/ListEntries/action'),
  getListEntriesById: jest.fn(),
  getUserLists: jest.fn()
}))

jest.mock('../../../redux/Lists/ListsAction', () => ({
  ...jest.requireActual('../../../redux/Lists/ListsAction'),
  getInvitesLists: jest.fn(),
  updateList: jest.fn()
}))

jest.mock('../../../redux/Business/actions', () => ({
  ...jest.requireActual('../../../redux/Business/actions'),
  getProjectsList: jest.fn()
}))

describe('List Page', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    initialState.Auth.token = 'test token'
    initialState.Auth.user = _.cloneDeep(CLIENT_AUTH)
    initialState.ListEntries.userLists = _.cloneDeep(USER_LIST)
    initialState.Lists.selectedLis = null
    initialState.ListEntries.listEntries = []

    updateList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getUserLists.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getListEntriesById.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getInvitesLists.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    getProjectsList.mockReturnValue(() => {
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

  it('renders Lists page', async () => {
    renderWithRedux(<Lists />, { initialState })
  })
  it('renders Lists page and verify list entries', async () => {
    renderWithRedux(<Lists />, { initialState })

    const ListNamesContainer = screen.getByTestId('left_lists_panel')
    expect(ListNamesContainer).toBeInTheDocument()
    initialState.ListEntries.userLists?.forEach(list => {
      expect(within(ListNamesContainer).getByTestId(`${list?._id}_icon`)).toBeInTheDocument()
      const ListNameElement = within(ListNamesContainer).getByText(list?.name ?? 'List Name')
      expect(ListNameElement).toBeInTheDocument()
      const ListEntries = LIST_ENTRIES?.filter(listEntry => listEntry.listId === list._id)
      initialState.ListEntries.listEntries = _.cloneDeep(ListEntries)
      fireEvent.click(ListNameElement)
      if (initialState.ListEntries.listEntries?.length > 0) {
        ListEntries?.forEach(entry => {
          const ListsContainer = screen.getByTestId('right_list_panel')
          expect(ListsContainer).toBeInTheDocument()
          const FreelancerContainer = within(ListsContainer).getByTestId(`${entry?._id}_entry`)
          expect(FreelancerContainer).toBeInTheDocument()

          const Name = `${entry?.freelancerId?.userId?.FirstName} ${entry?.freelancerId?.userId?.LastName}`

          const ProfileImage = within(FreelancerContainer).getByRole('img', { name: `${Name} profile` })
          expect(ProfileImage).toBeInTheDocument()
          expect(ProfileImage).toHaveAttribute(
            'src',
            entry?.userId?.profileImage ||
              'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
          )
          expect(ProfileImage).toHaveAttribute('width', '94px')
          expect(ProfileImage).toHaveAttribute('height', '94px')

          expect(FreelancerContainer.querySelector(`#freelancer_name`)).toHaveTextContent(Name)
          expect(FreelancerContainer.querySelector(`#freelancer_category`)).toHaveTextContent(
            `${entry?.freelancerId?.category}`
          )
          if (entry?.freelancerId?.userId?.AddressLineCountry) {
            expect(FreelancerContainer.querySelector('#freelancer_country')).toHaveTextContent(
              `${entry?.freelancerId?.userId?.AddressLineCountry ?? ' '}`
            )
          }

          expect(FreelancerContainer.querySelector(`#freelancer_rate`)).toHaveTextContent(
            `${entry?.freelancerId?.rate} / hour`
          )

          let CoverLetter =
            entry?.freelancerId?.cover ||
            `I have been a ${entry?.freelancerId?.category || 'developer'} for over ${
              (entry?.freelancerId &&
                entry?.freelancerId?.freelancerSkills &&
                entry?.freelancerId?.freelancerSkills[0]?.yearsExperience) ||
              1
            } years. schedule a meeting to check if I'm a good fit for your business.`

          expect(FreelancerContainer.querySelector(`#freelancer_cover`)).toHaveTextContent(
            `${CoverLetter?.substring(0, 240)}`
          )

          if (CoverLetter?.length > 240) {
            const ReadMore = within(FreelancerContainer).getByText('Read More')
            expect(ReadMore).toBeInTheDocument()
            fireEvent.click(ReadMore)
            expect(FreelancerContainer.querySelector(`#freelancer_cover`)).toHaveTextContent(`${CoverLetter}`)
            const ReadLess = within(FreelancerContainer).getByText('Read Less')
            expect(ReadLess).toBeInTheDocument()
            fireEvent.click(ReadLess)
            expect(FreelancerContainer.querySelector(`#freelancer_cover`)).toHaveTextContent(
              `${CoverLetter?.substring(0, 240)}`
            )
          }

          entry?.freelancerId?.freelancerSkills?.forEach((skill, index) => {
            const badges = within(FreelancerContainer).getAllByTestId('badge')
            expect(badges.length).toBe(entry?.freelancerId?.freelancerSkills?.length)

            expect(badges[index]).toHaveTextContent(skill?.skill)
          })
          expect(FreelancerContainer.querySelector(`#freelancer_votes`)).toHaveTextContent(
            `${
              entry?.freelancerId?.likeTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 0
            } Upvotes by clients`
          )
          expect(within(FreelancerContainer).getByRole('button', { name: 'View Profile' })).toBeInTheDocument()
        })
      }
    })

    const NewListElement = within(ListNamesContainer).getByText('+ New List')
    expect(NewListElement).toBeInTheDocument()
    fireEvent.click(NewListElement)

    expect(screen.getByTestId('add_list_modal')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'cancel' }))

    initialState.ListEntries.userLists?.forEach(list => {
      const ListEntries = initialState.ListEntries.listEntries?.filter(listEntry => listEntry.listId === list._id)
      ListEntries?.forEach(entry => {
        const FreelancerContainer = screen.getByTestId(`${entry?._id}_entry`)
        const ViewProfileButton = within(FreelancerContainer).getByText('View Profile')
        expect(ViewProfileButton).toBeInTheDocument()
        fireEvent.click(ViewProfileButton)
        expect(mockRouterPush).toHaveBeenCalledWith(`/freelancers/${entry?.freelancerId?._id}`)
      })
    })
  })

  it('renders Lists page with default styles', async () => {
    renderWithRedux(<FreelancersListingCard />, { initialState })
  })

  it('renders Lists page and create new list', async () => {
    renderWithRedux(<Lists />, { initialState })

    const ListsContainer = screen.getByTestId('right_list_panel')
    expect(ListsContainer).toBeInTheDocument()

    const DetailDropDown = ListsContainer.querySelector(`#list_actions_dropdown`)
    expect(DetailDropDown).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(within(DetailDropDown).getByText('Details'))
    })

    const CreateOption = within(DetailDropDown).getByText('Create')
    const EditOptionn = within(DetailDropDown).getByText('Edit')
    const DeleteOptionn = within(DetailDropDown).getByText('Delete')

    expect(CreateOption).toBeInTheDocument()
    expect(EditOptionn).toBeInTheDocument()
    expect(DeleteOptionn).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(CreateOption)
    })

    const ListFormModal = screen.getByTestId('add_list_modal')
    expect(ListFormModal).toBeInTheDocument()

    const ListNameField = ListFormModal.querySelector('#list_name')
    expect(ListNameField).toBeInTheDocument()

    fireEvent.change(ListNameField, { target: { value: 'new list' } })

    const IconPicker = ListFormModal.querySelector('#icon_picker')
    expect(IconPicker).toBeInTheDocument()

    const SelectedIcon = ListFormModal.querySelector('#icon_0')
    expect(SelectedIcon).toBeInTheDocument()

    fireEvent.click(SelectedIcon)

    fireEvent.click(within(ListFormModal).getByText('select an icon'))

    const AddListButton = within(ListFormModal).getByRole('button', { name: 'ADD LIST' })

    expect(AddListButton).toBeInTheDocument()

    fireEvent.click(AddListButton)
  })

  it('renders Lists page and edit list', async () => {
    renderWithRedux(<Lists />, { initialState })

    const ListNamesContainer = screen.getByTestId('left_lists_panel')
    expect(ListNamesContainer).toBeInTheDocument()

    const SelectedList = initialState.ListEntries.userLists[0]

    const ListNameElement = within(ListNamesContainer).getByText(SelectedList?.name ?? 'List Name')
    expect(ListNameElement).toBeInTheDocument()
    fireEvent.click(ListNameElement)

    const ListsContainer = screen.getByTestId('right_list_panel')
    expect(ListsContainer).toBeInTheDocument()

    const DetailDropDown = ListsContainer.querySelector(`#list_actions_dropdown`)
    expect(DetailDropDown).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(within(DetailDropDown).getByText('Details'))
    })

    const EditOptionn = within(DetailDropDown).getByText('Edit')

    expect(EditOptionn).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(EditOptionn)
    })

    const ListFormModal = screen.getByTestId('add_list_modal')
    expect(ListFormModal).toBeInTheDocument()

    const ListNameField = ListFormModal.querySelector('#list_name')
    expect(ListNameField).toBeInTheDocument()

    fireEvent.change(ListNameField, { target: { value: 'new list name' } })

    const IconPicker = ListFormModal.querySelector('#icon_picker')
    expect(IconPicker).toBeInTheDocument()

    const SelectedIcon = ListFormModal.querySelector('#icon_0')
    expect(SelectedIcon).toBeInTheDocument()

    fireEvent.click(SelectedIcon)

    const Icon = ListFormModal.querySelector('#selected_icon')
    expect(Icon).toBeInTheDocument()

    fireEvent.click(Icon)

    const UpdateListButton = within(ListFormModal).getByRole('button', { name: 'UPDATE LIST' })

    expect(UpdateListButton).toBeInTheDocument()

    fireEvent.click(UpdateListButton)
  })

  it('renders Lists page and delete list', async () => {
    renderWithRedux(<Lists />, { initialState })

    const ListNamesContainer = screen.getByTestId('left_lists_panel')
    expect(ListNamesContainer).toBeInTheDocument()

    const SelectedList = initialState.ListEntries.userLists[0]

    const ListNameElement = within(ListNamesContainer).getByText(SelectedList?.name ?? 'List Name')
    expect(ListNameElement).toBeInTheDocument()
    fireEvent.click(ListNameElement)

    const ListsContainer = screen.getByTestId('right_list_panel')
    expect(ListsContainer).toBeInTheDocument()

    const DetailDropDown = ListsContainer.querySelector(`#list_actions_dropdown`)
    expect(DetailDropDown).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(within(DetailDropDown).getByText('Details'))
    })

    const DeleteOptionn = within(DetailDropDown).getByText('Delete')

    expect(DeleteOptionn).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(DeleteOptionn)
    })
  })

  it('renders ListManagementPanel and create new list', async () => {
    renderWithRedux(
      <ListManagementPanel
        isModalOpen={true}
        setIsModalOpen={() => {}}
        listInfo={{
          listTitle: initialState.ListEntries.userLists[0]?.name ?? 'List Name',
          listIcon: 'HomeFilled',
          listId: initialState.ListEntries.userLists[0]?._id
        }}
        isEditMode={true}
        setIsEditMode={() => {}}
        userId={initialState.Auth.user._id}
        setIsListViewable={() => {}}
        setListName={() => {}}
        setIsLogoHidden={() => {}}
        setListInfo={() => {}}
        isViewable={true}
      />,
      { initialState }
    )

    const ListFormModal = screen.getByTestId('add_list_modal')
    expect(ListFormModal).toBeInTheDocument()

    const ListNameField = ListFormModal.querySelector('#list_name')
    expect(ListNameField).toBeInTheDocument()

    fireEvent.change(ListNameField, { target: { value: 'new list' } })

    const IconPicker = ListFormModal.querySelector('#icon_picker')
    expect(IconPicker).toBeInTheDocument()

    const SelectedIcon = ListFormModal.querySelector('#icon_0')
    expect(SelectedIcon).toBeInTheDocument()

    fireEvent.click(SelectedIcon)

    fireEvent.click(within(ListFormModal).getByText('select an icon'))

    const AddListButton = within(ListFormModal).getByRole('button', { name: 'UPDATE LIST' })

    await act(async () => {
      global.innerWidth = 1040
      global.dispatchEvent(new Event('resize'))
    })

    fireEvent.click(AddListButton)

    renderWithRedux(
      <ListManagementPanel
        isModalOpen={true}
        setIsModalOpen={() => {}}
        listInfo={{
          listTitle: initialState.ListEntries.userLists[0]?.name ?? 'List Name',
          listIcon: 'HomeFilled',
          listId: initialState.ListEntries.userLists[0]?._id
        }}
        isEditMode={true}
        setIsEditMode={() => {}}
        userId={initialState.Auth.user._id}
        setIsListViewable={() => {}}
        setListName={() => {}}
        setIsLogoHidden={() => {}}
        setListInfo={() => {}}
        isViewable={true}
      />,
      { initialState }
    )

    await act(async () => {
      global.innerWidth = 600
      global.dispatchEvent(new Event('resize'))
    })
  })

  it('renders ListManagementPanel with default props value', async () => {
    renderWithRedux(<ListManagementPanel />, { initialState })
  })

  it('should return the token from cookies', async () => {
    const mockToken = 'mock-token'

    parseCookies.mockReturnValue({ token: mockToken })

    const req = { headers: { cookie: 'token=mock-token' } }
    const res = {}

    const result = await Lists.getInitialProps({ req, res })

    expect(result).toEqual({ token: { token: mockToken } })
  })

  it('render list page without token', async () => {
    initialState.Auth.token = undefined

    renderWithRedux(<Lists />, { initialState })

    expect(mockRouterPush).toHaveBeenCalledWith(`/login`)
  })

  // Mobile View

  it('renders Lists page and verify list entries', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))
    initialState.ListEntries.userLists[0].name = undefined

    renderWithRedux(<Lists />, { initialState })

    const MobileListContainer = screen.getByTestId('view_mobile_lists')
    expect(MobileListContainer).toBeInTheDocument()

    let ListEntries = []
    const LimiedLists = initialState.ListEntries.userLists?.slice(0, 3) ?? []
    for (var list of LimiedLists) {
      const ListNameElement = within(MobileListContainer).getByText(list?.name ?? 'List Name')
      expect(ListNameElement).toBeInTheDocument()
      fireEvent.click(ListNameElement)
      ListEntries = LIST_ENTRIES?.filter(listEntry => listEntry.listId === list._id)
      if (ListEntries?.length > 0) {
        initialState.Lists.selectedList = list
        initialState.ListEntries.listEntries = _.cloneDeep(ListEntries)

        expect(mockRouterPush).toHaveBeenCalledWith(`lists/${list?._id}`)
        break
      }
    }

    renderWithRedux(<MobileListDetail />, { initialState })

    const ListDetailContainer = screen.getByTestId('mobile_list_detail')
    expect(ListDetailContainer).toBeInTheDocument()

    const ListBasicInfo = ListDetailContainer.querySelector('#list_basic_info')

    if (initialState.Lists.selectedList?.isPrivate) {
      expect(ListBasicInfo.querySelector(`#lock_icon`)).toBeInTheDocument()
      expect(within(ListBasicInfo).getByText(`Private`)).toBeInTheDocument()
    }
    expect(within(ListBasicInfo).getByText(`${ListEntries?.length} members`)).toBeInTheDocument()

    initialState.ListEntries.listEntries?.forEach(entry => {
      const FreelancerContainer = screen.getByTestId(`${entry?._id}_entry`)
      expect(FreelancerContainer).toBeInTheDocument()
      const Name = `${entry?.freelancerId?.userId?.FirstName} ${entry?.freelancerId?.userId?.LastName}`

      const ProfileImage = within(FreelancerContainer).getByRole('img', { name: `${Name} profile` })
      expect(ProfileImage).toBeInTheDocument()
      expect(ProfileImage).toHaveAttribute(
        'src',
        entry?.userId?.profileImage ||
          'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
      )

      expect(FreelancerContainer.querySelector(`#freelancer_name`)).toHaveTextContent(Name)
      expect(FreelancerContainer.querySelector(`#freelancer_category`)).toHaveTextContent(
        `${entry?.freelancerId?.category}`
      )
      if (entry?.freelancerId?.userId?.AddressLineCountry) {
        expect(FreelancerContainer.querySelector('#freelancer_country')).toHaveTextContent(
          `${entry?.freelancerId?.userId?.AddressLineCountry ?? ' '}`
        )
      }

      expect(FreelancerContainer.querySelector(`#freelancer_rate`)).toHaveTextContent(
        entry?.freelancerId?.rate > 0 ? `${entry?.freelancerId?.rate} / hour` : 'Negotiable'
      )

      let CoverLetter =
        entry?.freelancerId?.cover ||
        `I have been a ${entry?.freelancerId?.category || 'developer'} for over ${
          (entry?.freelancerId &&
            entry?.freelancerId?.freelancerSkills &&
            entry?.freelancerId?.freelancerSkills[0]?.yearsExperience) ||
          1
        } years. schedule a meeting to check if I'm a good fit for your business.`

      expect(FreelancerContainer.querySelector(`#freelancer_cover`)).toHaveTextContent(
        `${CoverLetter?.substring(0, 240)}`
      )

      if (CoverLetter?.length > 240) {
        const ReadMore = within(FreelancerContainer).getByText('Read More')
        expect(ReadMore).toBeInTheDocument()
        fireEvent.click(ReadMore)
        expect(FreelancerContainer.querySelector(`#freelancer_cover`)).toHaveTextContent(`${CoverLetter}`)
        const ReadLess = within(FreelancerContainer).getByText('Read Less')
        expect(ReadLess).toBeInTheDocument()
        fireEvent.click(ReadLess)
        expect(FreelancerContainer.querySelector(`#freelancer_cover`)).toHaveTextContent(
          `${CoverLetter?.substring(0, 240)}`
        )
      }

      if (entry?.freelancerId?.freelancerSkills?.length > 0) {
        entry?.freelancerId?.freelancerSkills?.forEach((skill, index) => {
          const SkillElement = within(FreelancerContainer).getByTestId(`${skill?.skill}_${index}`)
          expect(SkillElement).toHaveTextContent(skill?.skill)
        })
      }

      expect(FreelancerContainer.querySelector(`#freelancer_votes`)).toHaveTextContent(
        `${entry?.freelancerId?.likeTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? 0}`
      )
      const ViewProfileButton = within(FreelancerContainer).getByText('VIEW PROFILE')
      expect(ViewProfileButton).toBeInTheDocument()
      fireEvent.click(ViewProfileButton)
      expect(mockRouterPush).toHaveBeenCalledWith(`/freelancers/${entry?.freelancerId?._id}`)
    })
  })

  it('renders Lists page and edit list', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Lists />, { initialState })

    const MobileListContainer = screen.getByTestId('view_mobile_lists')
    expect(MobileListContainer).toBeInTheDocument()

    const SelectedList = initialState.ListEntries.userLists[0]

    const ListNameElement = within(MobileListContainer).getByText(SelectedList?.name ?? 'List Name')
    expect(ListNameElement).toBeInTheDocument()
    fireEvent.click(ListNameElement)

    renderWithRedux(<MobileListDetail />, { initialState })

    const ListDetailContainer = screen.getByTestId('mobile_list_detail')
    expect(ListDetailContainer).toBeInTheDocument()

    const DetailDropDown = ListDetailContainer.querySelector(`#list_actions_dropdown`)
    expect(DetailDropDown).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(within(DetailDropDown).getByText('Details'))
    })

    const EditOptionn = within(DetailDropDown).getByText('Edit')

    expect(EditOptionn).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(EditOptionn)
    })

    const ListFormModal = screen.getByTestId('add_list_modal')
    expect(ListFormModal).toBeInTheDocument()

    const ListNameField = ListFormModal.querySelector('#list_name')
    expect(ListNameField).toBeInTheDocument()

    fireEvent.change(ListNameField, { target: { value: 'new list name' } })

    const IconPicker = ListFormModal.querySelector('#icon_picker')
    expect(IconPicker).toBeInTheDocument()

    const SelectedIcon = ListFormModal.querySelector('#icon_0')
    expect(SelectedIcon).toBeInTheDocument()

    fireEvent.click(SelectedIcon)

    const Icon = ListFormModal.querySelector('#selected_icon')
    expect(Icon).toBeInTheDocument()

    fireEvent.click(Icon)

    const UpdateListButton = within(ListFormModal).getByRole('button', { name: 'UPDATE LIST' })

    expect(UpdateListButton).toBeInTheDocument()

    fireEvent.click(UpdateListButton)
  })

  it('renders Lists page and delete list', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Lists />, { initialState })

    const MobileListContainer = screen.getByTestId('view_mobile_lists')
    expect(MobileListContainer).toBeInTheDocument()

    const SelectedList = initialState.ListEntries.userLists[0]

    const ListNameElement = within(MobileListContainer).getByText(SelectedList?.name ?? 'List Name')
    expect(ListNameElement).toBeInTheDocument()
    fireEvent.click(ListNameElement)

    renderWithRedux(<MobileListDetail />, { initialState })

    const ListDetailContainer = screen.getByTestId('mobile_list_detail')
    expect(ListDetailContainer).toBeInTheDocument()

    const DetailDropDown = ListDetailContainer.querySelector(`#list_actions_dropdown`)
    expect(DetailDropDown).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(within(DetailDropDown).getByText('Details'))
    })

    const DeleteOptionn = within(DetailDropDown).getByText('Delete')

    expect(DeleteOptionn).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(DeleteOptionn)
    })
  })

  it('renders Lists page and create new list', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Lists />, { initialState })

    const MobileListContainer = screen.getByTestId('view_mobile_lists')
    expect(MobileListContainer).toBeInTheDocument()

    fireEvent.click(within(MobileListContainer).getByText('VIEW ALL'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/lists/view`)
    renderWithRedux(<ViewAllLists />, { initialState })

    const ViewAllList = screen.getByTestId('view_all_lists')
    expect(ViewAllList).toBeInTheDocument()

    fireEvent.click(within(ViewAllList).getByText('+ New List'))

    const ListFormModal = screen.getByTestId('add_list_modal')
    expect(ListFormModal).toBeInTheDocument()

    const ListNameField = ListFormModal.querySelector('#list_name')
    expect(ListNameField).toBeInTheDocument()

    fireEvent.change(ListNameField, { target: { value: 'new list' } })

    const IconPicker = ListFormModal.querySelector('#icon_picker')
    expect(IconPicker).toBeInTheDocument()

    const SelectedIcon = ListFormModal.querySelector('#icon_0')
    expect(SelectedIcon).toBeInTheDocument()

    fireEvent.click(SelectedIcon)

    fireEvent.click(within(ListFormModal).getByText('select an icon'))

    const AddListButton = within(ListFormModal).getByRole('button', { name: 'ADD LIST' })

    expect(AddListButton).toBeInTheDocument()

    fireEvent.click(AddListButton)
  })

  it('renders Lists page and verify lists on view page', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Lists />, { initialState })

    const MobileListContainer = screen.getByTestId('view_mobile_lists')
    expect(MobileListContainer).toBeInTheDocument()

    fireEvent.click(within(MobileListContainer).getByText('VIEW ALL'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/lists/view`)

    renderWithRedux(<ViewAllLists />, { initialState })

    const ViewAllList = screen.getByTestId('view_all_lists')
    expect(ViewAllList).toBeInTheDocument()

    for (var list of initialState.ListEntries.userLists) {
      const ListInfoContainer = within(ViewAllList).getByTestId(list?._id)
      const ListNameElement = within(ListInfoContainer).getByText(list?.name ?? 'List Name')
      expect(ListNameElement).toBeInTheDocument()

      if (list?.isPrivate) {
        expect(within(ListInfoContainer).getByText(`Private`)).toBeInTheDocument()
      }
      const ListEntries = LIST_ENTRIES?.filter(listEntry => listEntry.listId === list._id)

      initialState.ListEntries.listEntries = _.cloneDeep(ListEntries)

      expect(within(ListInfoContainer).getByText(`${list?.listEntries?.length ?? 0} members`)).toBeInTheDocument()

      fireEvent.click(ListNameElement)
      expect(mockRouterPush).toHaveBeenCalledWith(`${list?._id}`)
    }
  })

  it('render list page without name', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.ListEntries.userLists[0].name = undefined
    initialState.ListEntries.userLists[0].isPrivate = true
    initialState.ListEntries.userLists[0].listEntries = undefined
    renderWithRedux(<ViewAllLists />, { initialState })
  })

  it('render list page without list entries', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.ListEntries.userLists[0].isPrivate = true
    initialState.ListEntries.listEntries = undefined
    initialState.Lists.selectedList = initialState.ListEntries.userLists[0]

    renderWithRedux(<ViewAllLists />, { initialState })

    const ViewAllList = screen.getByTestId('view_all_lists')
    expect(ViewAllList).toBeInTheDocument()

    const ListInfoContainer = within(ViewAllList).getByTestId(initialState.Lists.selectedList?._id)
    expect(ListInfoContainer).toBeInTheDocument()

    const ListNameElement = within(ListInfoContainer).getByText(initialState.Lists.selectedList?.name ?? 'List Name')
    expect(ListNameElement).toBeInTheDocument()

    fireEvent.click(ListNameElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`${initialState.Lists.selectedList?._id}`)
    renderWithRedux(<MobileListDetail />, { initialState })
  })
})
