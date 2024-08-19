import React from 'react'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom' // for the toBeInTheDocument matcher
import { fireEvent, screen, act, within } from '@testing-library/react'

import { TASKS } from '../../../../store/Tasks'
import { INVOICES } from '../../../../store/Invoices'
import { FREELANCER_AUTH } from '../../../../store/Users'
import { initialState } from '../../../../store/mockInitialState'
import { renderWithRedux } from '../../../../store/commonTestSetup'
import { ValidationUtils, ConverterUtils } from '../../../../../utils'
import { BUSINESS, SELECTED_BUSIESS } from '../../../../store/Business'
import ProjectDetails from '../../../../../pages/dashboard/projects/details/[id]'
import FounderInvoice from '../../../../../pages/dashboard/projects/freelancer/invoice/[id]'

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
    initialState.Business.projectList = _.cloneDeep(BUSINESS)
    initialState.Business.selectedBusiness = _.cloneDeep(SELECTED_BUSIESS)
    initialState.Invoices.invoices = _.cloneDeep(INVOICES)
    initialState.Auth.user = _.cloneDeep(FREELANCER_AUTH)
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
        status: 200
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
      { name: 'Projects', index: 0 },
      { name: 'Invoices', index: 1 }
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

    initialState.Business.projectList?.forEach(async project => {
      const ProjectContainer = within(AllProjectsContainer).getByTestId(project._id)
      expect(ProjectContainer).toBeInTheDocument()

      expect(within(ProjectContainer).getByText(project.name)).toBeInTheDocument()
      const projectDate = project.deadline
        ? ValidationUtils.formatDate(project.deadline)
        : ValidationUtils.formatDate(project.updatedAt || project.createdAt)

      expect(within(ProjectContainer).getByText(projectDate)).toBeInTheDocument()

      const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
      expect(DetailDropDown).toBeInTheDocument()
      await fireEvent.click(DetailDropDown)

      const DropDownContainer = within(ProjectContainer).getByTestId('button-container')
      expect(DropDownContainer).toBeInTheDocument()
      const DropDownOptions = [
        {
          text: 'Log Time'
        },
        {
          text: 'View Project'
        },
        {
          text: 'View Work'
        },
        {
          text: 'View Invoice'
        }
      ]
      DropDownOptions.forEach(option => {
        expect(within(DropDownContainer).getByText(option.text)).toBeInTheDocument()
      })
    })
  })

  it('open dropdown options and click on option Log Time', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    await fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('Log Time'))
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/invoice/${SelectedProject._id}`)
  })
  it('open dropdown options and click on option View Project', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)
    fireEvent.click(within(ProjectContainer).getByText('View Project'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/projects/details/${SelectedProject._id}`)

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id },
      pathname: `/dashboard/projects/details/${SelectedProject._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    await act(async () => {
      await renderWithRedux(<ProjectDetails />, { initialState })
    })
  })
  it('open dropdown options and click on option View Work', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View Work'))
  })
  it('open dropdown options and click on option View Invoice', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View Invoice'))
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`
    )
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

    fireEvent.click(within(ProjectContainer).getByText('View Invoice'))
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`
    )

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices', freelancer: initialState.Auth.user.freelancers._id },
      pathname: `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<FounderInvoice />, { initialState })

    const WeekOptionsElement = screen.getByTestId('timesheet_week_options')
    expect(WeekOptionsElement).toBeInTheDocument()

    const InvoiceContainer = screen.getByTestId('single_week_invoice')

    const WeekOptionsDropDown = screen.getByTestId('timesheet_week_options')
    expect(WeekOptionsDropDown).toBeInTheDocument()
    fireEvent.change(WeekOptionsDropDown, { target: { value: '0' } })

    const startOfWeek = options[0]?.startOfWeek
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    for (var day of daysOfWeek) {
      let hours = 0
      initialState?.Invoices.invoices.forEach(invoice => {
        invoice.tasks[1].invoiceId = 'invoice_id'

        const currentDate = new Date(invoice?.createdAt)

        const currentWeekStartDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - currentDate.getDay()
        )
        currentWeekStartDate.setHours(0, 0, 0, 0)

        const isCurrentWeekInvoice = startOfWeek?.getTime() === currentWeekStartDate?.getTime()

        if (isCurrentWeekInvoice) {
          for (var task of invoice?.tasks) {
            const taskDate = new Date(task.updatedAt)
            const dayOfWeek = daysOfWeek[taskDate.getDay()]

            if (isCurrentWeekInvoice && dayOfWeek === day) {
              if (task?.hours > 0) {
                const MondayInvoiceContainer = within(InvoiceContainer).getByTestId(`${day}_invoice`)
                fireEvent.click(MondayInvoiceContainer)

                const HoursText = within(MondayInvoiceContainer).getByText(`${task?.hours} Hours`)
                fireEvent.click(HoursText)

                const TaskHoursField = within(MondayInvoiceContainer).getByTestId(`${task._id}_hours`)
                expect(TaskHoursField).toBeInTheDocument()
                fireEvent.focus(TaskHoursField)
                fireEvent.change(TaskHoursField, { target: { value: 7 } })
                fireEvent.keyDown(TaskHoursField, { key: 'Enter', code: 'Enter' })

                fireEvent.keyDown(TaskHoursField, { key: 'Shift', code: 'Shift' })
              }
              hours += +task?.hours ?? 0
            }
          }

          expect(within(InvoiceContainer).getByText(`${day} - ${hours} Hours`)).toBeInTheDocument
        }
      })
    }

    const MondayInvoiceContainer = within(InvoiceContainer).getByTestId('Monday_invoice')
    expect(MondayInvoiceContainer).toBeInTheDocument()
    fireEvent.click(MondayInvoiceContainer)

    const AddTaskButton = within(MondayInvoiceContainer).getByText('Add Task')
    expect(AddTaskButton).toBeInTheDocument()
    fireEvent.click(AddTaskButton)

    const TaskModalContainer = screen.getByTestId('mobile_add_tasks')
    expect(TaskModalContainer).toBeInTheDocument()

    expect(within(TaskModalContainer).getByText('Select a ticket')).toBeInTheDocument()
    expect(within(TaskModalContainer).getByText('Start typing to select an assigned task')).toBeInTheDocument()

    const autocomplete = screen.getByTestId('autocomplete')
    expect(autocomplete).toBeInTheDocument()

    const TaskNameField = within(autocomplete).getByTestId('task_name')
    expect(TaskNameField).toBeInTheDocument()

    autocomplete.focus()

    await act(async () => {
      await autocomplete.click()
    })
    TaskNameField.focus()
    fireEvent.change(TaskNameField, { target: { value: 'new Task Name' } })

    const AddButton = within(TaskModalContainer).getByRole('button', { name: 'Add' })
    expect(AddButton).toBeInTheDocument()
    fireEvent.click(AddButton)

    expect(within(TaskModalContainer).getByText('new Task Name')).toBeInTheDocument()

    await act(async () => {
      await autocomplete.click()
    })
    autocomplete.focus()
    fireEvent.change(TaskNameField, { target: { value: 'new task 2' } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.click(AddButton)
    expect(within(TaskModalContainer).getByText('new task 2')).toBeInTheDocument()

    const DeleteTask1 = within(TaskModalContainer).getByTestId('delete_task_1')
    fireEvent.click(DeleteTask1)

    await act(async () => {
      await autocomplete.click()
    })
    autocomplete.focus()

    fireEvent.change(TaskNameField, { target: { value: 'Task 2' } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.click(screen.getAllByText('Task 2')[0])

    fireEvent.keyDown(TaskNameField, { key: 'Enter' })
    fireEvent.keyDown(TaskNameField, { key: 'ArrowDown' })

    const newTaskName = 'Task 2ss'

    await act(async () => {
      await autocomplete.click()
    })
    autocomplete.focus()
    TaskNameField.focus()
    fireEvent.change(TaskNameField, { target: { value: newTaskName } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.click(AddButton)
    expect(within(TaskModalContainer).getByText(newTaskName)).toBeInTheDocument()

    const SaveButton = within(TaskModalContainer).getByRole('button', { name: 'SAVE' })
    fireEvent.click(SaveButton)

    const AddTasksDataModal = screen.getByTestId('mobile_add_tasks_data')
    expect(AddTasksDataModal).toBeInTheDocument()

    const storyPointsField1 = within(AddTasksDataModal).getByTestId('story points0')
    expect(storyPointsField1).toBeInTheDocument()

    fireEvent.change(storyPointsField1, { target: { value: '13' } })

    const storyPointsField2 = within(AddTasksDataModal).getByTestId('story points1')
    expect(storyPointsField2).toBeInTheDocument()

    fireEvent.change(storyPointsField2, { target: { value: '9' } })

    const AddDetailLink1 = within(AddTasksDataModal).getByTestId('add_details0')
    expect(AddDetailLink1).toBeInTheDocument()
    await act(async () => {
      await fireEvent.click(AddDetailLink1)
    })

    const DescriptionField1 = within(AddTasksDataModal).getByTestId('description0')
    expect(DescriptionField1).toBeInTheDocument()

    fireEvent.change(DescriptionField1, { target: { value: 'new task description' } })

    await act(async () => {
      await fireEvent.click(AddDetailLink1)
    })

    const AddNewTasks = within(AddTasksDataModal).getByRole('button', { name: 'ADD TASK(S)' })
    await act(async () => {
      await fireEvent.click(AddNewTasks)
    })
  }, 100000)

  it('Render Invoices and add already exsiting tasks', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View Invoice'))
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`
    )

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices', freelancer: initialState.Auth.user.freelancers._id },
      pathname: `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<FounderInvoice />, { initialState })

    const InvoiceContainer = screen.getByTestId('single_week_invoice')

    const MondayInvoiceContainer = within(InvoiceContainer).getByTestId('Monday_invoice')
    expect(MondayInvoiceContainer).toBeInTheDocument()
    fireEvent.click(MondayInvoiceContainer)

    const AddTaskButton = within(MondayInvoiceContainer).getByText('Add Task')
    expect(AddTaskButton).toBeInTheDocument()
    fireEvent.click(AddTaskButton)

    const TaskModalContainer = screen.getByTestId('mobile_add_tasks')
    expect(TaskModalContainer).toBeInTheDocument()

    const autocomplete = screen.getByTestId('autocomplete')
    expect(autocomplete).toBeInTheDocument()

    const TaskNameField = within(autocomplete).getByTestId('task_name')
    expect(TaskNameField).toBeInTheDocument()
    await act(async () => {
      autocomplete.click()
    })
    autocomplete.focus()
    fireEvent.change(TaskNameField, { target: { value: 'task 1 update' } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.click(screen.getAllByText('task 1 update')[0])

    const SaveButton = within(TaskModalContainer).getByRole('button', { name: 'SAVE' })
    await act(async () => {
      fireEvent.click(SaveButton)
    })
  })

  it('Render Invoices and create new invoice', async () => {
    initialState.Invoices.invoices[0] = {}

    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View Invoice'))
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`
    )

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices', freelancer: initialState.Auth.user.freelancers._id },
      pathname: `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<FounderInvoice />, { initialState })

    const InvoiceContainer = screen.getByTestId('single_week_invoice')

    const MondayInvoiceContainer = within(InvoiceContainer).getByTestId('Monday_invoice')
    expect(MondayInvoiceContainer).toBeInTheDocument()
    fireEvent.click(MondayInvoiceContainer)

    const AddTaskButton = within(MondayInvoiceContainer).getByText('Add Task')
    expect(AddTaskButton).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(AddTaskButton)
    })

    const TaskModalContainer = screen.getByTestId('mobile_add_tasks')
    expect(TaskModalContainer).toBeInTheDocument()

    const autocomplete = screen.getByTestId('autocomplete')
    expect(autocomplete).toBeInTheDocument()

    const TaskNameField = within(autocomplete).getByTestId('task_name')
    expect(TaskNameField).toBeInTheDocument()

    await act(async () => {
      autocomplete.click()
    })

    autocomplete.focus()
    fireEvent.change(TaskNameField, { target: { value: 'task 1 update' } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.click(screen.getAllByText('task 1 update')[0])

    const SaveButton = within(TaskModalContainer).getByRole('button', { name: 'SAVE' })
    await act(async () => {
      fireEvent.click(SaveButton)
    })
  })

  it('Render Invoice screen without freelancer ID', async () => {
    initialState.Invoices.invoices[0] = {}

    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View Invoice'))
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`
    )

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices', freelancer: initialState.Auth.user.freelancers._id },
      pathname: `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    initialState.Auth.user.freelancers._id = undefined

    renderWithRedux(<FounderInvoice />, { initialState })

    const WeekOptionsDropDown = screen.getByTestId('timesheet_week_options')

    fireEvent.change(WeekOptionsDropDown, { target: { value: '1' } })
    fireEvent.change(WeekOptionsDropDown, { target: { value: null } })
  })
  it('open dropdown options and click on option View Project for project detail', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View Project'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/projects/details/${SelectedProject._id}`)

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices' },
      pathname: `/dashboard/projects/details/${SelectedProject._id}?tab=invoices`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    await act(async () => {
      await renderWithRedux(<ProjectDetails />, { initialState })
    })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    // Verify Project Detail Tabs
    const detailTab = within(tabsContainer).getByRole('button', { name: 'Details' })
    expect(detailTab).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(detailTab)
    })

    const invoiceTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    expect(invoiceTab).toBeInTheDocument()
    fireEvent.click(invoiceTab)

    const inviteTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(inviteTab).toBeInTheDocument()
    fireEvent.click(inviteTab)

    // Verify Project Detail
    await act(async () => {
      fireEvent.click(detailTab)
    })
  })

  it('open dropdown options and click on option View Project for project detail with undefined name on mobile view', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)
    initialState.Business.selectedBusiness.name = undefined

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View Project'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/projects/details/${SelectedProject._id}`)

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices' },
      pathname: `/dashboard/projects/details/${SelectedProject._id}?tab=invoices`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    await act(async () => {
      await renderWithRedux(<ProjectDetails />, { initialState })
    })
    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    // Verify Project Detail Tabs
    const detailTab = within(tabsContainer).getByRole('button', { name: 'Details' })
    expect(detailTab).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(detailTab)
    })

    // Verify Project Detail
    await act(async () => {
      fireEvent.click(detailTab)
    })
  })

  it('open dropdown options and click on option View Project for project detail with Project text on Desktop view', async () => {
    global.innerWidth = 1080
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)
    initialState.Business.selectedBusiness.name = undefined

    const DetailDropDown = within(ProjectContainer).getByRole('button', { name: 'Details' })
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View Project'))
    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/projects/details/${SelectedProject._id}`)

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id },
      pathname: `/dashboard/projects/details/${SelectedProject._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    await act(async () => {
      renderWithRedux(<ProjectDetails />, { initialState })
    })
    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    // Verify Project Detail Tabs
    const detailTab = within(tabsContainer).getByRole('button', { name: 'Details' })
    expect(detailTab).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(detailTab)
    })

    // Verify Project Detail
    await act(async () => {
      fireEvent.click(detailTab)
    })
  })

  it('Render Invoice screen and verify invoice tabs on mobile', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByText('Details')
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View Invoice'))
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`
    )

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices', freelancer: initialState.Auth.user.freelancers._id },
      pathname: `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    initialState.Auth.user.freelancers._id = undefined

    renderWithRedux(<FounderInvoice />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    // Verify Project Detail Tabs
    const detailTab = within(tabsContainer).getByRole('button', { name: 'Details' })
    expect(detailTab).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(detailTab)
    })
    const invoiceTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    expect(invoiceTab).toBeInTheDocument()
    fireEvent.click(invoiceTab)

    const inviteTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(inviteTab).toBeInTheDocument()
    fireEvent.click(inviteTab)
    // Verify Project Detail
    await act(async () => {
      fireEvent.click(detailTab)
    })
    global.innerWidth = 1080
    global.dispatchEvent(new Event('resize'))

    await act(async () => {
      fireEvent.click(detailTab)
    })
  })
  it('Render Invoice screen and change week options on mobile', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByText('Details')
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View Invoice'))
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`
    )

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, tab: 'invoices', freelancer: initialState.Auth.user.freelancers._id },
      pathname: `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    initialState.Auth.user.freelancers._id = undefined

    renderWithRedux(<FounderInvoice />, { initialState })

    const WeekOptionsElement = screen.getByTestId('timesheet_week_options')
    expect(WeekOptionsElement).toBeInTheDocument()

    const WeekOptionsDropDown = screen.getByTestId('timesheet_week_options')
    expect(WeekOptionsDropDown).toBeInTheDocument()
    fireEvent.change(WeekOptionsDropDown, { target: { value: '0' } })
  })
  it('Goto freelancer invoice page without selected invoice tab', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))

    const SelectedProject = initialState.Business.projectList[0]
    const ProjectContainer = screen.getByTestId(SelectedProject?._id)

    const DetailDropDown = within(ProjectContainer).getByText('Details')
    expect(DetailDropDown).toBeInTheDocument()
    fireEvent.click(DetailDropDown)

    fireEvent.click(within(ProjectContainer).getByText('View Invoice'))
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`
    )

    useRouter.mockReturnValue({
      query: { id: SelectedProject._id, freelancer: initialState.Auth.user.freelancers._id },
      pathname: `/dashboard/projects/freelancer/invoice/${SelectedProject._id}?tab=invoices&freelancer=${initialState.Auth.user.freelancers._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    initialState.Auth.user.freelancers._id = undefined

    await act(async () => {
      await renderWithRedux(<FounderInvoice />, { initialState })
    })
  })

  it('Render Invoice on Invoices tab for index.js view', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))
    initialState.Invoices.invoices[1].hoursWorked = undefined

    const InvoicesTab = screen.getByTestId('Invoices_1')
    expect(InvoicesTab).toBeInTheDocument()
    fireEvent.click(InvoicesTab)

    const WeekOptionsElement = screen.getByTestId('invoices_week_options')
    expect(WeekOptionsElement).toBeInTheDocument()

    fireEvent.change(WeekOptionsElement, { target: { value: '1' } })
    fireEvent.change(WeekOptionsElement, { target: { value: '0' } })

    const invoicesData = []

    initialState?.Invoices.invoices.forEach(invoice => {
      const invoiceIndex = invoicesData?.findIndex(business => business?.business?._id === invoice?.business?._id)
      if (invoiceIndex === -1) {
        invoicesData.push({
          business: invoice.business,
          invoices: [invoice]
        })
      } else {
        invoicesData[invoiceIndex].invoices.push(invoice)
      }
    })
    invoicesData?.forEach(businessInvoice => {
      const BusinessInvoiceContainer = screen.getByTestId(`${businessInvoice?.business?._id}_invoices`)
      expect(BusinessInvoiceContainer).toBeInTheDocument()
      const BusinessName = ConverterUtils.capitalize(`${businessInvoice?.business?.name}`)
      const BusinessNameElement = within(BusinessInvoiceContainer).getByText(BusinessName)
      expect(BusinessNameElement).toBeInTheDocument()
      fireEvent.click(BusinessNameElement)

      businessInvoice?.invoices.forEach(invoice => {
        const InvoiceContainer = within(BusinessInvoiceContainer).getByTestId(`${invoice?._id}_invoice`)
        expect(InvoiceContainer).toBeInTheDocument()

        businessInvoice?.tasks?.forEach(task => {
          expect(within(InvoiceContainer).getByText(task?.task?.taskName)).toBeInTheDocument()
          expect(within(InvoiceContainer).getByText(task?.hours)).toBeInTheDocument()
        })
        const ViewInvoiceButton = within(InvoiceContainer).getByText('View Invoice')
        expect(ViewInvoiceButton).toBeInTheDocument()
        fireEvent.click(ViewInvoiceButton)
      })
    })
  })

  it('Render Invoices screen on Invoices tab for index.js view without invoice data', async () => {
    global.innerWidth = 680
    global.dispatchEvent(new Event('resize'))
    initialState.Invoices.invoices = []

    const InvoicesTab = screen.getByTestId('Invoices_1')
    expect(InvoicesTab).toBeInTheDocument()
    fireEvent.click(InvoicesTab)
  })
})
