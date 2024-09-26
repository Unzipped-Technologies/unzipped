import React from 'react'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom' // for the toBeInTheDocument matcher
import { fireEvent, screen, act, within, render } from '@testing-library/react'

import { BUSINESS } from '../store/Business'
import Projects from '../../pages/projects/index'
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'
import { getPublicProjectsList } from '../../redux/Business/actions'
import { getFreelancerSkillsList } from '../../redux/FreelancerSkills/actions'

import MobileSearchFilter from '../../components/unzipped/MobileSearchFilter'
import DesktopSearchFilter from '../../components/unzipped/DesktopSearchFilter'

const _ = require('lodash')

jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../redux/FreelancerSkills/actions', () => ({
  ...jest.requireActual('../../redux/FreelancerSkills/actions'),
  getFreelancerSkillsList: jest.fn()
}))

jest.mock('../../redux/Business/actions', () => ({
  ...jest.requireActual('../../redux/Business/actions'),
  getPublicProjectsList: jest.fn()
}))

describe('Freelancers Component', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    initialState.Business.projectList = _.cloneDeep(BUSINESS)
    initialState.Business.totalCount = BUSINESS?.length
    initialState.Loading.loading = false

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
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('renders Projects page', async () => {
    renderWithRedux(<Projects />, { initialState })
  })
  it('renders Projects page and verify static data', async () => {
    renderWithRedux(<Projects />, { initialState })

    const ProjectsPageContainer = screen.getByTestId('projects_page')
    expect(ProjectsPageContainer).toBeInTheDocument()

    expect(within(ProjectsPageContainer).getByText('Top Results')).toBeInTheDocument()
  })

  it('renders Projects page without freelancer data', async () => {
    initialState.Business.projectList = []

    renderWithRedux(<Projects />, { initialState })

    const ProjectsPageContainer = screen.getByTestId('projects_page')
    expect(ProjectsPageContainer).toBeInTheDocument()

    expect(within(ProjectsPageContainer).getByText('No Projects found for this search')).toBeInTheDocument()
  })

  it('renders Projects page with only one freelancer data', async () => {
    initialState.Business.projectList = initialState.Business.projectList.splice(0, 1)

    renderWithRedux(<Projects />, { initialState })

    const ProjectsPageContainer = screen.getByTestId('projects_page')
    expect(ProjectsPageContainer).toBeInTheDocument()

    expect(within(ProjectsPageContainer).getByText('1 result')).toBeInTheDocument()
  })

  it('renders Projects page and modify result pagination text', async () => {
    initialState.Business.totalCount = 10

    renderWithRedux(<Projects />, { initialState })

    const ProjectsPageContainer = screen.getByTestId('projects_page')
    expect(ProjectsPageContainer).toBeInTheDocument()

    expect(
      within(ProjectsPageContainer).getByText(`1 - ${initialState.Business.projectList.length} results`)
    ).toBeInTheDocument()
  })

  it('renders Projects page and verify projects data rendering correctly', async () => {
    const ProjectData = initialState.Business.projectList[0]

    renderWithRedux(<Projects />, { initialState })

    const DesktopProjectsContainer = screen.getByTestId('desktop_projects_container')
    expect(DesktopProjectsContainer).toBeInTheDocument()

    const ProjectsDataContainer = within(DesktopProjectsContainer).getByTestId(ProjectData._id)
    expect(ProjectsDataContainer).toBeInTheDocument()

    expect(within(ProjectsDataContainer).getByText(ProjectData?.name)).toBeInTheDocument()
    expect(
      within(ProjectsDataContainer).getByText(
        `Estimated Rate: $${
          ProjectData?.projectBudgetType === 'Hourly Rate'
            ? ProjectData?.budgetRange + ' / hour'
            : ProjectData?.budgetRange
        }`
      )
    ).toBeInTheDocument()
    expect(within(ProjectsDataContainer).getByText(`${ProjectData.description}`)).toBeInTheDocument()
    expect(
      within(ProjectsDataContainer).getByText(`${ProjectData.likeTotal} Upvotes by Freelancers`)
    ).toBeInTheDocument()

    expect(within(ProjectsDataContainer).getByRole('button', { name: 'View Project' })).toBeInTheDocument()

    ProjectData.requiredSkills.forEach(skill => {
      expect(within(ProjectsDataContainer).getByText(skill)).toBeInTheDocument()
    })
  })

  it('renders Projects page and verify filters static data', async () => {
    renderWithRedux(<Projects />, { initialState })

    const DesktopFilterContainer = screen.getByTestId('desktop_filters')
    expect(DesktopFilterContainer).toBeInTheDocument()

    expect(within(DesktopFilterContainer).getByText('Project type')).toBeInTheDocument()
    expect(within(DesktopFilterContainer).getByText('Rate')).toBeInTheDocument()
    expect(within(DesktopFilterContainer).getByText('Skills')).toBeInTheDocument()
    expect(within(DesktopFilterContainer).getAllByText('Clear')[0]).toBeInTheDocument()
  })
  it('renders Projects page and set filters, also test clear filters', async () => {
    renderWithRedux(<Projects />, { initialState })

    const DesktopFilterContainer = screen.getByTestId('desktop_filters')
    expect(DesktopFilterContainer).toBeInTheDocument()

    // Budget Type Filter
    const budgetTypeFilter = within(DesktopFilterContainer).getByText(`Fixed Price`)
    expect(budgetTypeFilter).toBeInTheDocument()
    fireEvent.click(budgetTypeFilter) // Check the Checkbox
    fireEvent.click(budgetTypeFilter) //Uncheck the checkbox

    fireEvent.click(budgetTypeFilter)
    const ClearTypeFilter = within(DesktopFilterContainer).getByTestId('clear_type_filter')
    expect(ClearTypeFilter).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(ClearTypeFilter)
    })
    //

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

  it('renders Projects page and handle min rate, max rate validations', async () => {
    renderWithRedux(<Projects />, { initialState })

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

  it('renders Projects page and input valid values to filters', async () => {
    renderWithRedux(<Projects />, { initialState })

    const DesktopFilterContainer = screen.getByTestId('desktop_filters')
    expect(DesktopFilterContainer).toBeInTheDocument()

    const budgetTypeFilter = within(DesktopFilterContainer).getByText(`Fixed Price`)
    expect(budgetTypeFilter).toBeInTheDocument()
    fireEvent.click(budgetTypeFilter) // Check the Checkbox

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

  it('renders Projects page and click on recent skills checkboxes', async () => {
    renderWithRedux(<Projects />, { initialState })

    const DesktopFilterContainer = screen.getByTestId('desktop_filters')
    expect(DesktopFilterContainer).toBeInTheDocument()

    const RecentSkill = within(DesktopFilterContainer).getByTestId(`react_0`)
    fireEvent.click(RecentSkill)
    fireEvent.click(RecentSkill)
    global.dispatchEvent(new Event('resize'))
  })

  it('renders Desktop search filter without filter type', async () => {
    renderWithRedux(<DesktopSearchFilter handleFilterOpenClose={() => {}} filter={{}} setFilters={() => {}} />, {
      initialState
    })
  })

  it('renders Projects page with load', async () => {
    initialState.Loading.loading = true
    renderWithRedux(<Projects handleFilterOpenClose={() => {}} filter={{}} setFilters={() => {}} />, {
      initialState
    })
  })

  //  Mobile View Test
  it('renders Projects page on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })
    global.dispatchEvent(new Event('resize'))
  })

  it('renders Projects page and verify search field', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

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

  it('renders Projects page on mobile view with total count 1000', async () => {
    initialState.Business.totalCount = 1000
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })
  })

  it('renders Projects page on mobile view with total count 3', async () => {
    initialState.Business.totalCount = 3
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })
  })

  it('renders Projects page and verify filter modal', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

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
  it('renders Projects page and verify filters static data', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ToggleFilterElement = screen.getByTestId('toggle_filter')

    await act(async () => {
      await fireEvent.click(ToggleFilterElement)
    })
    const MobileFilterContainer = screen.getByTestId('mobile_filters')
    expect(MobileFilterContainer).toBeInTheDocument()

    expect(within(MobileFilterContainer).getByText('Project type')).toBeInTheDocument()
    expect(within(MobileFilterContainer).getByText('Rate')).toBeInTheDocument()
    expect(within(MobileFilterContainer).getByText('Skills')).toBeInTheDocument()
    expect(within(MobileFilterContainer).getAllByText('Clear')[0]).toBeInTheDocument()
    expect(within(MobileFilterContainer).getByRole('button', { name: 'SEE RESULTS' })).toBeInTheDocument()
  })

  it('renders Projects page and set filters, also test clear filters', async () => {
    const stopPropagationMock = jest.fn()
    // Override stopPropagation for the test
    const originalStopPropagation = Event.prototype.stopPropagation
    Event.prototype.stopPropagation = stopPropagationMock

    renderWithRedux(<Projects />, { initialState })

    const ToggleFilterElement = screen.getByTestId('toggle_filter')

    await act(async () => {
      await fireEvent.click(ToggleFilterElement)
    })
    const MobileFilterContainer = screen.getByTestId('mobile_filters')
    expect(MobileFilterContainer).toBeInTheDocument()

    // Budget Type Filter
    const budgetTypeFilter = within(MobileFilterContainer).getByText(`Fixed Price`)
    expect(budgetTypeFilter).toBeInTheDocument()
    fireEvent.click(budgetTypeFilter) // Check the Checkbox
    fireEvent.click(budgetTypeFilter) //Uncheck the checkbox

    fireEvent.click(budgetTypeFilter)
    const ClearTypeFilter = within(MobileFilterContainer).getByTestId('clear_type_filter')
    expect(ClearTypeFilter).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(ClearTypeFilter)
    })
    //

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

  it('renders Projects page and handle min rate, max rate validations', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

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

  it('renders Projects page and input valid values to filters', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ToggleFilterElement = screen.getByTestId('toggle_filter')

    await act(async () => {
      await fireEvent.click(ToggleFilterElement)
    })
    const MobileFilterContainer = screen.getByTestId('mobile_filters')
    expect(MobileFilterContainer).toBeInTheDocument()

    const budgetTypeFilter = within(MobileFilterContainer).getByText(`Fixed Price`)
    expect(budgetTypeFilter).toBeInTheDocument()
    fireEvent.click(budgetTypeFilter) // Check the Checkbox

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
  it('renders Projects page and handle on Wheel', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const preventDefaultMock = jest.fn()

    renderWithRedux(<Projects />, { initialState })

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
  it('renders Projects page and click on recent skills checkboxes', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

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
  it('renders Mobile search filter without filter type', async () => {
    renderWithRedux(<MobileSearchFilter handleFilterOpenClose={() => {}} filter={{}} setFilters={() => {}} />, {
      initialState
    })
  })
})
