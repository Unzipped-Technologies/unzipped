import React from 'react'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom' // for the toBeInTheDocument matcher
import { fireEvent, screen, act, within } from '@testing-library/react'

import { TASKS } from '../../../../store/Tasks'
import { INVOICES } from '../../../../store/Invoices'
import { initialState } from '../../../../store/mockInitialState'
import { renderWithRedux } from '../../../../store/commonTestSetup'
import { BUSINESS, SELECTED_BUSIESS } from '../../../../store/Business'
import { CLIENT_AUTH } from '../../../../store/Users'

import { ValidationUtils, ConverterUtils } from '../../../../../utils'
import ProjectDetails from '../../../../../pages/dashboard/projects/details/[id]'

import AllProjects from '../../../../../pages/dashboard/projects/view'
import { getInvitesLists } from '../../../../../redux/Lists/ListsAction'
import { getTasks, createTask } from '../../../../../redux/Tasks/actions'
import { getUserListEntries } from '../../../../../redux/ListEntries/action'
import { getFreelancerById } from '../../../../../redux/Freelancers/actions'
import { verifyUserStripeAccount } from '../../../../../redux/Stripe/actions'
import { createTaskHour, updateTaskHour } from '../../../../../redux/TaskHours/actions'
import { getProjectApplications } from '../../../../../redux/ProjectApplications/actions'
import { countClientContracts, getContracts } from '../../../../../redux/Contract/actions'
import { getProjectsList, getBusinessById, updateBusiness } from '../../../../../redux/Business/actions'
import { getInvoices, updateInvoice, createInvoice, addInvoiceTasks } from '../../../../../redux/Invoices/actions'

const _ = require('lodash')
jest.mock('axios')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../../../../redux/Stripe/actions', () => ({
  ...jest.requireActual('../../../../../redux/Stripe/actions'),
  verifyUserStripeAccount: jest.fn()
}))

jest.mock('../../../../../redux/Freelancers/actions', () => ({
  ...jest.requireActual('../../../../../redux/Freelancers/actions'),
  getFreelancerById: jest.fn()
}))

jest.mock('../../../../../redux/ProjectApplications/actions', () => ({
  ...jest.requireActual('../../../../../redux/ProjectApplications/actions'),
  getProjectApplications: jest.fn()
}))

jest.mock('../../../../../redux/ListEntries/action', () => ({
  ...jest.requireActual('../../../../../redux/ListEntries/action'),
  getUserListEntries: jest.fn()
}))

jest.mock('../../../../../redux/Business/actions', () => ({
  ...jest.requireActual('../../../../../redux/Business/actions'),
  getProjectsList: jest.fn(),
  getBusinessById: jest.fn(),
  updateBusiness: jest.fn()
}))

jest.mock('../../../../../redux/Lists/ListsAction', () => ({
  ...jest.requireActual('../../../../../redux/Lists/ListsAction'),
  getInvitesLists: jest.fn()
}))

jest.mock('../../../../../redux/Contract/actions', () => ({
  ...jest.requireActual('../../../../../redux/Contract/actions'),
  getContracts: jest.fn(),
  countClientContracts: jest.fn()
}))
jest.mock('../../../../../redux/Invoices/actions', () => ({
  ...jest.requireActual('../../../../../redux/Invoices/actions'),
  getInvoices: jest.fn(),
  updateInvoice: jest.fn(),
  createInvoice: jest.fn(),
  addInvoiceTasks: jest.fn()
}))
jest.mock('../../../../../redux/TaskHours/actions', () => ({
  ...jest.requireActual('../../../../../redux/TaskHours/actions'),
  createTaskHour: jest.fn(),
  updateTaskHour: jest.fn()
}))

jest.mock('../../../../../redux/Tasks/actions', () => ({
  ...jest.requireActual('../../../../../redux/Tasks/actions'),
  getTasks: jest.fn(),
  createTask: jest.fn()
}))

describe('Freelancers Invoices', () => {
  let mockRouterPush, mockRouterBack

  const options = []
  const currentDate = new Date()
  for (let i = 10; i >= 0; i--) {
    const startOfWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay() - i * 7
    )
    startOfWeek.setHours(0, 0, 0, 0)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    options.unshift({ startOfWeek, endOfWeek })
  }

  beforeEach(() => {
    initialState.Loading.loading = false
    initialState.Business.loading = false
    initialState.Auth.user = _.cloneDeep(CLIENT_AUTH)
    initialState.Business.projectList = _.cloneDeep(BUSINESS)
    initialState.Business.selectedBusiness = _.cloneDeep(SELECTED_BUSIESS)
    initialState.Invoices.invoices = _.cloneDeep(INVOICES)
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    getTasks.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    verifyUserStripeAccount.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getFreelancerById.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    createTask.mockReturnValue(data => {
      return {
        status: 200,
        data: { data: [{ ...TASKS[0] }, { _id: '6601dd4036e96924aedf6a2c' }] }
      }
    })

    getProjectsList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getBusinessById.mockReturnValue(data => {
      return {
        status: 200
      }
    })
    updateBusiness.mockReturnValue(data => {
      return {
        status: 200,
        data: {
          msg: 'Project Close'
        }
      }
    })
    getInvitesLists.mockReturnValue(data => {
      return {
        status: 200
      }
    })
    getContracts.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    countClientContracts.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getInvoices.mockReturnValue(() => {
      return {
        status: 200,
        data: {
          count: 5
        }
      }
    })

    updateInvoice.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    createInvoice.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    addInvoiceTasks.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    createTaskHour.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    updateTaskHour.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getProjectApplications.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getUserListEntries.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    mockRouterPush = jest.fn()
    mockRouterBack = jest.fn()

    useRouter.mockImplementation(() => ({
      query: {},
      pathname: '',
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: mockRouterBack
    }))

    renderWithRedux(<AllProjects />, { initialState })
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('Verify tabs', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const projectTabs = [
      { name: 'Open Projects', index: 0 },
      { name: 'Invoices', index: 1 },
      { name: 'Hires', index: 2 }
    ]

    projectTabs.forEach((tab, index) => {
      const CurrentTab = screen.getByTestId(`${tab.name}_${index}`)
      expect(CurrentTab).toBeInTheDocument()
      fireEvent.click(CurrentTab)
    })
  })

  it('test project name, date and dropdown options', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const AllProjectsContainer = screen.getByTestId('all_projects')
    expect(AllProjectsContainer).toBeInTheDocument()

    initialState.Business.projectList?.forEach(project => {
      const ProjectContainer = within(AllProjectsContainer).getByTestId(project._id)
      expect(ProjectContainer).toBeInTheDocument()

      expect(within(ProjectContainer).getByText(project.name)).toBeInTheDocument()
      const projectDate = project.deadline
        ? ValidationUtils.formatDate(project.deadline)
        : ValidationUtils.formatDate(project.updatedAt || project.createdAt)

      expect(within(ProjectContainer).getByText(projectDate)).toBeInTheDocument()

      const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
      expect(DetailDropDown).toBeInTheDocument()
      fireEvent.click(DetailDropDown)

      const DropDownContainer = within(ProjectContainer).getByTestId('button-container')
      expect(DropDownContainer).toBeInTheDocument()
      const DropDownOptions = [
        {
          text: 'View details'
        },
        {
          text: 'Invoice'
        },
        {
          text: 'Assign department'
        },
        {
          text: 'Close project'
        }
      ]
      DropDownOptions.forEach(option => {
        expect(within(DropDownContainer).getByText(option.text)).toBeInTheDocument()
      })
    })
  })

  it('open dropdown options and click on option View details', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View details'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/projects/details/${SelectedProject._id}`)
  })
  it('open dropdown options and click on option Assign department', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('Assign department'))
  })
  it('open dropdown options and click on option Close project', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('Close project'))
    fireEvent.click(screen.getByRole('button', { name: 'Yes, close it!' }))
  })

  it('open dropdown options and click on option Close project without request message', async () => {
    updateBusiness.mockReturnValue(data => {
      return {
        status: 200
      }
    })

    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('Close project'))
    fireEvent.click(screen.getByRole('button', { name: 'Yes, close it!' }))
  })
  it('open dropdown options and click on option Close project with request error', async () => {
    updateBusiness.mockReturnValue(data => {
      return {
        status: 500,
        data: {
          msg: 'Something went wrong'
        }
      }
    })

    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('Close project'))
    fireEvent.click(screen.getByRole('button', { name: 'Yes, close it!' }))
  })
  it('open dropdown options and click on option Close project without request error', async () => {
    updateBusiness.mockReturnValue(data => {
      return {
        status: 500
      }
    })

    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('Close project'))
    fireEvent.click(screen.getByRole('button', { name: 'Yes, close it!' }))
  })
  it('open dropdown options and click on option Close project and click on cancel', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('Close project'))
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
  })
  it('open dropdown options and click on option Invoice', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('Invoice'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/projects/details/${SelectedProject._id}?tab=invoices`)
  })

  it('render projects page without business', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    initialState.Business.projectList = undefined
    renderWithRedux(<AllProjects />, { initialState })
  })

  it('Added filters values', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

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

    fireEvent.click(within(SearchbarContainer).getByTestId('search_icon'))

    // Open Filters Model
    const ToggleFilterIcon = within(SearchbarContainer).getByTestId('toggle_filter')
    expect(ToggleFilterIcon).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(ToggleFilterIcon)
    })

    const MobileFilterContainer = screen.getByTestId('mobile_filters')
    expect(MobileFilterContainer).toBeInTheDocument()

    expect(within(MobileFilterContainer).getByText('Project type')).toBeInTheDocument()
    expect(within(MobileFilterContainer).getByText('Rate')).toBeInTheDocument()
    expect(within(MobileFilterContainer).getByText('Skills')).toBeInTheDocument()
    expect(within(MobileFilterContainer).getAllByText('Clear')[0]).toBeInTheDocument()
    expect(within(MobileFilterContainer).getByRole('button', { name: 'SEE RESULTS' })).toBeInTheDocument()

    const budgetTypeFilter = within(MobileFilterContainer).getByText(`Fixed Price`)
    expect(budgetTypeFilter).toBeInTheDocument()
    fireEvent.click(budgetTypeFilter) // Check the Checkbox

    const MinRateFilter = within(MobileFilterContainer).getByTestId('min_rate')
    fireEvent.change(MinRateFilter, { target: { value: 20 } })

    const MaxRateFilter = within(MobileFilterContainer).getByTestId('max_rate')
    fireEvent.change(MaxRateFilter, { target: { value: 29 } })

    const RecentSkill = within(MobileFilterContainer).getByTestId(`react_0`)
    fireEvent.click(RecentSkill)

    const SkillFilter = within(MobileFilterContainer).getByTestId('skills')
    fireEvent.click(SkillFilter)
    fireEvent.change(SkillFilter, { target: { value: 'CSS' } })
    const SkillSuggestion = within(MobileFilterContainer).getByTestId('CSS_suggestion')
    expect(SkillSuggestion).toBeInTheDocument()
    fireEvent.click(SkillSuggestion)

    const SubmitFilterButton = within(MobileFilterContainer).getByText('SEE RESULTS')
    fireEvent.click(SubmitFilterButton)
  })

  it('render projects page without date', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    initialState.Business.projectList[1].createdAt = undefined
    initialState.Business.projectList[1].updatedAt = undefined
    renderWithRedux(<AllProjects />, { initialState })
  })

  it('Render Invoices ', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('Invoice'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/projects/details/${SelectedProject._id}?tab=invoices`)

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices' },
      pathname: `/dashboard/projects/details/${SelectedProject._id}?tab=invoices`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<ProjectDetails />, { initialState })

    const EmployessInvoicesTable = screen.getByTestId('employess_invoices_table')
    expect(EmployessInvoicesTable).toBeInTheDocument()

    const InvoiceTotalSummary = screen.getByTestId('employess_invoices_totals')
    expect(InvoiceTotalSummary).toBeInTheDocument()

    const startOfWeek = options[0]?.startOfWeek

    let hours = 0
    let subTotal = 0

    let fee = 0
    let totalAmount = 0
    initialState?.Invoices.invoices.forEach(invoice => {
      const currentInvoiceDate = new Date(invoice?.createdAt)

      const currentWeekStartDate = new Date(
        currentInvoiceDate.getFullYear(),
        currentInvoiceDate.getMonth(),
        currentInvoiceDate.getDate() - currentInvoiceDate.getDay()
      )
      currentWeekStartDate.setHours(0, 0, 0, 0)

      const isCurrentWeekInvoice = startOfWeek?.getTime() === currentWeekStartDate?.getTime()

      if (isCurrentWeekInvoice) {
        hours += +invoice?.hoursWorked ?? 0
        subTotal += invoice?.contract.hourlyRate * invoice.hoursWorked

        const freelancerInvoiceContainer = within(EmployessInvoicesTable).getByTestId(
          `${invoice?.freelancer?._id}_invoice`
        )
        const freelancerName = ConverterUtils.capitalize(
          `${invoice?.freelancer?.user?.FirstName} ${invoice?.freelancer?.user?.LastName}`
        )
        expect(within(freelancerInvoiceContainer).getByText(freelancerName)).toBeInTheDocument()
        expect(within(freelancerInvoiceContainer).getByText(`${invoice?.hoursWorked || 0}`)).toBeInTheDocument()

        const FreelancerAccordianContainer = screen.getByTestId(`${invoice?._id}_invoice`)
        const FreelancerSummary = within(FreelancerAccordianContainer).getByText(
          `${freelancerName} - ${invoice?.hoursWorked} hours`
        )

        expect(FreelancerSummary).toBeInTheDocument()
        fireEvent.click(FreelancerSummary)

        const ViewInvoiceButton = within(FreelancerAccordianContainer).getByRole('button', { name: 'View Invoice' })
        expect(ViewInvoiceButton).toBeInTheDocument()
      }
    })
    fee = subTotal * 0.05
    totalAmount = subTotal - fee
    fee = Math.round(fee)
    expect(within(InvoiceTotalSummary).getByText(`${hours} Hours`)).toBeInTheDocument()
    expect(within(InvoiceTotalSummary).getByText(`$${fee}`)).toBeInTheDocument()
    expect(within(InvoiceTotalSummary).getByText(`$${totalAmount}`)).toBeInTheDocument()

    const WeekOptionsDropDown = screen.getByTestId('timesheet_week_options')

    fireEvent.change(WeekOptionsDropDown, { target: { value: '1' } })
    fireEvent.change(WeekOptionsDropDown, { target: { value: null } })
  }, 100000)

  it('render Invoices without invoice hours', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    initialState.Invoices.invoices[0].hoursWorked = undefined

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('Invoice'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/projects/details/${SelectedProject._id}?tab=invoices`)

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices' },
      pathname: `/dashboard/projects/details/${SelectedProject._id}?tab=invoices`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<ProjectDetails />, { initialState })
  })

  it('Render Invoices and click on view invoice button', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('Invoice'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/projects/details/${SelectedProject._id}?tab=invoices`)

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices' },
      pathname: `/dashboard/projects/details/${SelectedProject._id}?tab=invoices`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<ProjectDetails />, { initialState })

    const EmployessInvoicesTable = screen.getByTestId('employess_invoices_table')
    expect(EmployessInvoicesTable).toBeInTheDocument()

    const InvoiceTotalSummary = screen.getByTestId('employess_invoices_totals')
    expect(InvoiceTotalSummary).toBeInTheDocument()

    const startOfWeek = options[0]?.startOfWeek

    initialState?.Invoices.invoices.forEach(invoice => {
      const currentInvoiceDate = new Date(invoice?.createdAt)

      const currentWeekStartDate = new Date(
        currentInvoiceDate.getFullYear(),
        currentInvoiceDate.getMonth(),
        currentInvoiceDate.getDate() - currentInvoiceDate.getDay()
      )
      currentWeekStartDate.setHours(0, 0, 0, 0)

      const isCurrentWeekInvoice = startOfWeek?.getTime() === currentWeekStartDate?.getTime()

      if (isCurrentWeekInvoice) {
        const freelancerName = ConverterUtils.capitalize(
          `${invoice?.freelancer?.user?.FirstName} ${invoice?.freelancer?.user?.LastName}`
        )

        const FreelancerAccordianContainer = screen.getByTestId(`${invoice?._id}_invoice`)
        const FreelancerSummary = within(FreelancerAccordianContainer).getByText(
          `${freelancerName} - ${invoice?.hoursWorked} hours`
        )

        expect(FreelancerSummary).toBeInTheDocument()
        fireEvent.click(FreelancerSummary)

        const ViewInvoiceButton = within(FreelancerAccordianContainer).getByRole('button', { name: 'View Invoice' })
        expect(ViewInvoiceButton).toBeInTheDocument()
        fireEvent.click(ViewInvoiceButton)
      }
    })
    const ApproveInvoiceButton = screen.getByRole('button', { name: 'APPROVE' })
    expect(ApproveInvoiceButton).toBeInTheDocument()
    fireEvent.click(ApproveInvoiceButton)
  }, 100000)

  it('open dropdown options and click on option View Project for project detail', async () => {
    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View details'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/projects/details/${SelectedProject._id}`)

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices' },
      pathname: `/dashboard/projects/details/${SelectedProject._id}?tab=invoices`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    // Verify Project Detail Tabs
    const detailTab = within(tabsContainer).getByRole('button', { name: 'Details' })
    expect(detailTab).toBeInTheDocument()
    fireEvent.click(detailTab)

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    const hiresTab = within(tabsContainer).getByRole('button', { name: 'Hires' })
    expect(hiresTab).toBeInTheDocument()
    fireEvent.click(hiresTab)

    const invoiceTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    expect(invoiceTab).toBeInTheDocument()
    fireEvent.click(invoiceTab)

    const inviteTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(inviteTab).toBeInTheDocument()
    fireEvent.click(inviteTab)
    // Verify Project Detail
    fireEvent.click(detailTab)
  })

  it('open dropdown options and click on option View Project for project detail', async () => {
    global.innerWidth = 1080
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View details'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/projects/details/${SelectedProject._id}`)

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices' },
      pathname: `/dashboard/projects/details/${SelectedProject._id}?tab=invoices`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    // Verify Project Detail Tabs
    const detailTab = within(tabsContainer).getByRole('button', { name: 'Details' })
    expect(detailTab).toBeInTheDocument()
    fireEvent.click(detailTab)

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    const hiresTab = within(tabsContainer).getByRole('button', { name: 'Hires' })
    expect(hiresTab).toBeInTheDocument()
    fireEvent.click(hiresTab)

    const invoiceTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    expect(invoiceTab).toBeInTheDocument()
    fireEvent.click(invoiceTab)

    const inviteTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(inviteTab).toBeInTheDocument()
    fireEvent.click(inviteTab)
    // Verify Project Detail
    fireEvent.click(detailTab)
  })
})
