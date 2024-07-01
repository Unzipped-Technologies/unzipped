import React from 'react'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom' // for the toBeInTheDocument matcher
import { fireEvent, screen, act, within, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { INVOICES } from '../../store/Invoices'
import { CONTRACTS } from '../../store/Contracts'
import { initialState } from '../../store/mockInitialState'
import { renderWithRedux } from '../../store/commonTestSetup'
import { CLIENT_AUTH, FREELANCER_AUTH } from '../../store/Users'
import { BUSINESS, SELECTED_BUSIESS } from '../../store/Business'
import { PROJECT_APPLICATIONS } from '../../store/ProjectApplications'
import { TASKS } from '../../store/Tasks'
import { LIST_ENTRIES, USER_LIST_ENTRIES } from '../../store/ListEntries'

import { ValidationUtils, ConverterUtils } from '../../../utils'
import ProjectDetails from '../../../pages/dashboard/projects/details/[id]'
import { getProjectsList, updateBusiness, getBusinessById } from '../../../redux/Business/actions'
import { getProjectApplications } from '../../../redux/ProjectApplications/actions'
import { getFreelancerById } from '../../../redux/Freelancers/actions'
import { getInvitesLists } from '../../../redux/Lists/ListsAction'
import Projects from '../../../pages/dashboard/projects/index'
import { Container, Right } from '../../../components/unzipped/dashboard/ProjectsDesktopCard'
import { verifyUserStripeAccount } from '../../../redux/Stripe/actions'
import { countClientContracts, getContracts } from '../../../redux/Contract/actions'
import { getUserListEntries } from '../../../redux/ListEntries/action'
import { getInvoices, updateInvoice, createInvoice, addInvoiceTasks } from '../../../redux/Invoices/actions'
import { createTaskHour, updateTaskHour } from '../../../redux/TaskHours/actions'
import { createTask, getTasks } from '../../../redux/Tasks/actions'
import Timesheet from '../../../components/unzipped/dashboard/project/Timesheet'

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

jest.mock('../../../redux/Business/actions', () => ({
  ...jest.requireActual('../../../redux/Business/actions'),
  getProjectsList: jest.fn(),
  updateBusiness: jest.fn(),
  getBusinessById: jest.fn()
}))

jest.mock('../../../redux/Tasks/actions', () => ({
  ...jest.requireActual('../../../redux/Tasks/actions'),
  createTask: jest.fn(),
  getTasks: jest.fn()
}))

jest.mock('../../../redux/TaskHours/actions', () => ({
  ...jest.requireActual('../../../redux/TaskHours/actions'),
  createTaskHour: jest.fn(),
  updateTaskHour: jest.fn()
}))

jest.mock('../../../redux/Invoices/actions', () => ({
  ...jest.requireActual('../../../redux/Invoices/actions'),
  getInvoices: jest.fn(),
  updateInvoice: jest.fn(),
  createInvoice: jest.fn(),
  addInvoiceTasks: jest.fn()
}))

jest.mock('../../../redux/ListEntries/action', () => ({
  ...jest.requireActual('../../../redux/ListEntries/action'),
  getUserListEntries: jest.fn()
}))

jest.mock('../../../redux/Contract/actions', () => ({
  ...jest.requireActual('../../../redux/Contract/actions'),
  getContracts: jest.fn(),
  countClientContracts: jest.fn()
}))

jest.mock('../../../redux/Lists/ListsAction', () => ({
  ...jest.requireActual('../../../redux/Lists/ListsAction'),
  getInvitesLists: jest.fn()
}))

jest.mock('../../../redux/ProjectApplications/actions', () => ({
  ...jest.requireActual('../../../redux/ProjectApplications/actions'),
  getProjectApplications: jest.fn()
}))

jest.mock('../../../redux/Freelancers/actions', () => ({
  ...jest.requireActual('../../../redux/Freelancers/actions'),
  getFreelancerById: jest.fn()
}))

jest.mock('../../../redux/Stripe/actions', () => ({
  ...jest.requireActual('../../../redux/Stripe/actions'),
  verifyUserStripeAccount: jest.fn()
}))

describe('Freelancers Component', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    initialState.Loading.loading = false
    initialState.Business.loading = false
    initialState.Auth.token = 'testToken'
    initialState.Auth.user = _.cloneDeep(CLIENT_AUTH)
    initialState.Business.projectList = _.cloneDeep(BUSINESS)
    initialState.ListEntries.userLists = _.cloneDeep(LIST_ENTRIES)
    initialState.Lists.invitesList = _.cloneDeep(LIST_ENTRIES)
    initialState.Business.selectedBusiness = _.cloneDeep(SELECTED_BUSIESS)
    initialState.ProjectApplications.projectApplications = _.cloneDeep(PROJECT_APPLICATIONS)
    initialState.ProjectApplications.totalCount = PROJECT_APPLICATIONS?.length
    initialState.Contracts.contracts = _.cloneDeep(CONTRACTS)
    initialState.ListEntries.userListEntries = _.cloneDeep(USER_LIST_ENTRIES)
    initialState.Invoices.invoices = _.cloneDeep(INVOICES)

    getProjectsList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    updateBusiness.mockReturnValue(data => {
      return {
        status: 200
      }
    })
    getBusinessById.mockReturnValue(data => {
      return {
        status: 200
      }
    })
    verifyUserStripeAccount.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    countClientContracts.mockReturnValue(() => {
      return {
        status: 200,
        data: {
          count: 5
        }
      }
    })

    getProjectApplications.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    getFreelancerById.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    getInvitesLists.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    getUserListEntries.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    addInvoiceTasks.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    createInvoice.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    updateInvoice.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getInvoices.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    createTaskHour.mockReturnValue(() => {
      return {
        status: 200,
        response: {}
      }
    })
    updateTaskHour.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getContracts.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    createTask.mockReturnValue(() => {
      return {
        status: 200,
        data: { data: [{ ...TASKS[0] }, { _id: '6601dd4036e96924aedf6a2c' }] }
      }
    })
    getTasks.mockReturnValue(() => {
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
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('renders Projects page default', async () => {
    renderWithRedux(<Projects />, { initialState })
  })

  it('renders Projects page and search project name', async () => {
    renderWithRedux(<Projects />, { initialState })

    const SearchInput = screen.getByTestId('search-bar-input')
    expect(SearchInput).toBeInTheDocument()

    await act(async () => {
      await fireEvent.change(SearchInput, {
        target: {
          value: 'Project Name'
        }
      })
    })
    fireEvent.keyDown(SearchInput, { key: 'Enter', code: 'Enter' })
  })

  it('renders dashboard Projects and verify projects heading', async () => {
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByTestId('projects_heading')).toBeInTheDocument()
  })

  it('renders dashboard Projects and verify table heading', async () => {
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableHeadingContainer = screen.getByTestId('dashboard_projects_table_header')
    expect(TableHeadingContainer).toBeInTheDocument()

    expect(within(TableHeadingContainer).getByText('Project Name')).toBeInTheDocument()
    expect(within(TableHeadingContainer).getByText('Budget')).toBeInTheDocument()
    expect(within(TableHeadingContainer).getByText('Points')).toBeInTheDocument()
    expect(within(TableHeadingContainer).getByText('Value Estimate')).toBeInTheDocument()
    expect(within(TableHeadingContainer).getByText('Deadline')).toBeInTheDocument()
    expect(within(TableHeadingContainer).getByText('ACTIONS')).toBeInTheDocument()
  })

  it('renders dashboard Projects and verify table body', async () => {
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    initialState.Business.projectList.forEach(business => {
      const rowElement = within(TableBodyContainer).getByTestId(business?._id)

      expect(within(rowElement).getByText(ValidationUtils.truncate(business.name, 40))).toBeInTheDocument()
      expect(within(rowElement).getByText(business?.budget || 0)).toBeInTheDocument()
      expect(within(rowElement).getByText(business?.valueEstimate || 'N/A')).toBeInTheDocument()
      const expectedDate = business.deadline
        ? ValidationUtils.formatDate(business.deadline)
        : ValidationUtils.formatDate(business.updatedAt || business.createdAt)
      expect(within(rowElement).getByText(expectedDate)).toBeInTheDocument()

      const DetailButton = within(rowElement).getByText('Details')
      expect(DetailButton).toBeInTheDocument()

      fireEvent.click(DetailButton)

      expect(within(rowElement).getByText('Invoice')).toBeInTheDocument()
      expect(within(rowElement).getByText('View details')).toBeInTheDocument()
      expect(within(rowElement).getByText('Close project')).toBeInTheDocument()
      expect(within(rowElement).getByText('Assign department')).toBeInTheDocument()
    })
  })

  it('renders dashboard Projects without budget', async () => {
    initialState.Business.projectList[0].budget = undefined
    initialState.Business.projectList[2].updatedAt = undefined
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    initialState.Business.projectList.forEach(business => {
      const rowElement = within(TableBodyContainer).getByTestId(business?._id)

      expect(within(rowElement).getByText(ValidationUtils.truncate(business.name, 40))).toBeInTheDocument()
      expect(within(rowElement).getByText(business?.budget || 0)).toBeInTheDocument()
      expect(within(rowElement).getByText(business?.valueEstimate || 'N/A')).toBeInTheDocument()
      const expectedDate = business.deadline
        ? ValidationUtils.formatDate(business.deadline)
        : ValidationUtils.formatDate(business.updatedAt || business.createdAt)
      expect(within(rowElement).getByText(expectedDate)).toBeInTheDocument()

      const DetailButton = within(rowElement).getByText('Details')
      expect(DetailButton).toBeInTheDocument()

      fireEvent.click(DetailButton)

      expect(within(rowElement).getByText('Invoice')).toBeInTheDocument()
      expect(within(rowElement).getByText('View details')).toBeInTheDocument()
      expect(within(rowElement).getByText('Close project')).toBeInTheDocument()
      expect(within(rowElement).getByText('Assign department')).toBeInTheDocument()
    })
  })

  it('renders Projects page with loading true', async () => {
    initialState.Business.loading = true
    renderWithRedux(<Projects />, { initialState })
  })

  it('renders Projects page with undefined projects data', async () => {
    initialState.Business.projectList = undefined
    renderWithRedux(<Projects />, { initialState })
  })

  it('renders dashboard Projects and click on dropdown option Invoce', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const InvoiceOption = within(rowElement).getByText('Invoice')
    expect(InvoiceOption).toBeInTheDocument()

    fireEvent.click(InvoiceOption)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/client/invoice/${SelectProject._id}?tab=invoices`)
  })

  it('renders dashboard Projects and click on dropdown option View Detail', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const ViewDetailOption = within(rowElement).getByText('View details')
    expect(ViewDetailOption).toBeInTheDocument()

    fireEvent.click(ViewDetailOption)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)
  })

  it('renders dashboard Projects and click on dropdown option Close Project with 200 success message', async () => {
    updateBusiness.mockReturnValue(data => {
      return {
        status: 200,
        data: {
          msg: 'Project close'
        }
      }
    })
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const CloseProjectOption = within(rowElement).getByText('Close project')
    expect(CloseProjectOption).toBeInTheDocument()

    fireEvent.click(CloseProjectOption)

    expect(screen.getByText(/Are you sure?/i)).toBeInTheDocument()
    expect(screen.getByText(/You won't be able to revert this!/i)).toBeInTheDocument()
    expect(screen.getByText(/Yes, close it!/i)).toBeInTheDocument()

    const ConfirmButton = screen.getByRole('button', { name: 'Yes, close it!' })
    expect(ConfirmButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(ConfirmButton)
    })

    expect(screen.getByText('Project close')).toBeInTheDocument()
  })
  it('renders dashboard Projects and click on dropdown option Close Project with 200 default success message', async () => {
    updateBusiness.mockReturnValue(data => {
      return {
        status: 200,
        response: {
          data: {}
        }
      }
    })
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const CloseProjectOption = within(rowElement).getByText('Close project')
    expect(CloseProjectOption).toBeInTheDocument()

    fireEvent.click(CloseProjectOption)

    expect(screen.getByText(/Are you sure?/i)).toBeInTheDocument()
    expect(screen.getByText(/You won't be able to revert this!/i)).toBeInTheDocument()
    expect(screen.getByText(/Yes, close it!/i)).toBeInTheDocument()

    const ConfirmButton = screen.getByRole('button', { name: 'Yes, close it!' })
    expect(ConfirmButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(ConfirmButton)
    })
    expect(screen.getByText('Project closed successfully')).toBeInTheDocument()
  })

  it('renders dashboard Projects and click on dropdown option Close Project with 500 request error message', async () => {
    updateBusiness.mockReturnValue(data => {
      return {
        status: 500,
        data: {
          msg: 'Could not close project'
        }
      }
    })
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const CloseProjectOption = within(rowElement).getByText('Close project')
    expect(CloseProjectOption).toBeInTheDocument()

    fireEvent.click(CloseProjectOption)

    expect(screen.getByText(/Are you sure?/i)).toBeInTheDocument()
    expect(screen.getByText(/You won't be able to revert this!/i)).toBeInTheDocument()
    expect(screen.getByText(/Yes, close it!/i)).toBeInTheDocument()

    const ConfirmButton = screen.getByRole('button', { name: 'Yes, close it!' })
    expect(ConfirmButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(ConfirmButton)
    })
    expect(screen.getByText('Could not close project!')).toBeInTheDocument()
  })

  it('renders dashboard Projects and click on dropdown option Close Project with request default error message', async () => {
    updateBusiness.mockReturnValue(data => {
      return {
        status: 500,
        data: {}
      }
    })
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const CloseProjectOption = within(rowElement).getByText('Close project')
    expect(CloseProjectOption).toBeInTheDocument()

    fireEvent.click(CloseProjectOption)

    expect(screen.getByText(/Are you sure?/i)).toBeInTheDocument()
    expect(screen.getByText(/You won't be able to revert this!/i)).toBeInTheDocument()
    expect(screen.getByText(/Yes, close it!/i)).toBeInTheDocument()

    const ConfirmButton = screen.getByRole('button', { name: 'Yes, close it!' })
    expect(ConfirmButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(ConfirmButton)
    })
    expect(screen.getByText('Error archive the project.!')).toBeInTheDocument()
  })

  it('renders dashboard Projects and click on dropdown option Assign Department', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const AssignDepartmentOption = within(rowElement).getByText('Assign department')
    expect(AssignDepartmentOption).toBeInTheDocument()

    fireEvent.click(AssignDepartmentOption)
  })

  it('renders dashboard Projects and click on dropdown option Close Project for cancel', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const CloseProjectOption = within(rowElement).getByText('Close project')
    expect(CloseProjectOption).toBeInTheDocument()

    fireEvent.click(CloseProjectOption)

    const CancelButton = screen.getByRole('button', { name: 'Cancel' })
    expect(CancelButton).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(CancelButton)
    })
  })

  it('renders dashboard Projects and click on project name to redirect to project detail page', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    fireEvent.click(ProjectNameElement)
  })

  it('renders dashboard Projects and click on project name to redirect to project detail page for project detail verification', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const headerContainer = screen.getByTestId('desktop_project_detail_header')
    expect(within(headerContainer).getByText(/PROJECT/i)).toBeInTheDocument()
    // Verify project name
    expect(within(headerContainer).getByText(initialState.Business.selectedBusiness?.name)).toBeInTheDocument()

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

    const projectDetail = initialState.Business.selectedBusiness

    const projectDetailContainer = screen.getByTestId('desktop_project_detail')

    expect(within(projectDetailContainer).getByText('Project Hires')).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`Budget: $${projectDetail?.budget}`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`Project Length`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`${projectDetail?.projectType}`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`${projectDetail?.description}`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`Requirements`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`${projectDetail.objectives[0]}`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`${projectDetail.objectives[1]}`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`${projectDetail.objectives[2]}`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`${projectDetail.objectives[3]}`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`Skills Required`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`Project ID: ${projectDetail?._id}`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`Project Goals`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`${projectDetail?.goals}`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`Additional Details`)).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`Project Image`)).toBeInTheDocument()

    const projectImage = within(projectDetailContainer).getByTestId(projectDetail.projectImagesUrl[0]._id)
    expect(projectImage).toBeInTheDocument()
    expect(projectImage).toHaveAttribute('src', projectDetail.projectImagesUrl[0].url)
    expect(projectImage).toHaveAttribute('width', '100%')
    expect(projectImage).toHaveAttribute('height', '150px')

    // Verify Client Detail
    const clientDetailContainer = screen.getByTestId('about_client_container')

    expect(within(clientDetailContainer).getByText('About client')).toBeInTheDocument()
    expect(within(clientDetailContainer).getByText(`${projectDetail?.businessCity}`)).toBeInTheDocument()
    expect(within(clientDetailContainer).getByText(`${projectDetail?.businessCountry}`)).toBeInTheDocument()
    expect(within(clientDetailContainer).getByText(`${projectDetail?.likeTotal} upvotes`)).toBeInTheDocument()
    expect(
      within(clientDetailContainer).getByText(
        `Member since ${ConverterUtils.toMonthDateYear(projectDetail?.userId?.createdAt)}`
      )
    ).toBeInTheDocument()
    expect(within(clientDetailContainer).getByText(`Client Verification`)).toBeInTheDocument()
    expect(within(clientDetailContainer).getByText(`Identity Verified`)).toBeInTheDocument()
    expect(within(clientDetailContainer).getByText(`Payment Verified`)).toBeInTheDocument()

    // verify N/A display if data not available
    initialState.Business.selectedBusiness = {}
    initialState.Business.selectedBusiness.projectBudgetType = 'Hourly Rate'
    renderWithRedux(<ProjectDetails />, { initialState })

    expect(screen.getAllByText(/per Hour/i)[0]).toBeInTheDocument()
  })

  it('renders project detail page and verify client completed projects', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)

    initialState.Business.selectedBusiness.projectImagesUrl[0]._id = undefined

    await act(async () => {
      renderWithRedux(<ProjectDetails />, { initialState })
    })
    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')
    expect(tabsContainer).toBeInTheDocument()

    const clientDetailContainer = screen.getByTestId('about_client_container')
    expect(clientDetailContainer).toBeInTheDocument()

    expect(within(clientDetailContainer).getByText('Completed 5 projects'))

    countClientContracts.mockReturnValue(() => {
      return {
        status: 200,
        data: {
          count: undefined
        }
      }
    })

    await act(async () => {
      renderWithRedux(<ProjectDetails />, { initialState })
    })
    expect(screen.getByText('Completed 0 projects'))

    initialState.Business.selectedBusiness = undefined

    await act(async () => {
      renderWithRedux(<ProjectDetails />, { initialState })
    })
    expect(screen.getByText('Project Not Found')).toBeInTheDocument()

    initialState.Loading.loading = true

    await act(async () => {
      renderWithRedux(<ProjectDetails />, { initialState })
    })
    expect(screen.getByText(/Connect. Build. /i)).toBeInTheDocument()
  })

  it('renders project detail page to test request errors', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)

    // useRouter.mockReturnValue({
    //   query: { id: '1234' },
    //   pathname: '/dashboard/projects/details/90909090',
    //   push: mockRouterPush,
    //   replace: jest.fn(),
    //   prefetch: jest.fn(),
    //   back: jest.fn()
    // })

    verifyUserStripeAccount.mockReturnValue(() => {
      return {
        status: 400
      }
    })

    await act(async () => {
      renderWithRedux(<ProjectDetails />, { initialState })
    })

    countClientContracts.mockReturnValue(() => {
      return {
        status: 400
      }
    })

    await act(async () => {
      renderWithRedux(<ProjectDetails />, { initialState })
    })
  })

  it('renders dashboard Projects and click on project name to redirect to project detail page for applications data verification', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const headerContainer = screen.getByTestId('desktop_project_detail_header')
    expect(within(headerContainer).getByText(/PROJECT/i)).toBeInTheDocument()
    // Verify project name
    expect(within(headerContainer).getByText(initialState.Business.selectedBusiness?.name)).toBeInTheDocument()

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    initialState.ProjectApplications.projectApplications.forEach(application => {
      const ApplicationContainer = screen.getByTestId(`${application?._id}_application_card`)
      expect(ApplicationContainer).toBeInTheDocument()

      const projectImage = within(ApplicationContainer).getByRole('img')
      expect(projectImage).toBeInTheDocument()
      expect(projectImage).toHaveAttribute('src', application?.freelancerId?.userId?.profileImage)
      expect(projectImage).toHaveAttribute('width', '102px')
      expect(projectImage).toHaveAttribute('height', '102px')

      const FreelancerName = ConverterUtils.capitalize(
        `${application?.freelancerId?.userId?.FirstName} ${application?.freelancerId?.userId?.LastName}`
      )
      expect(within(ApplicationContainer).getByText(FreelancerName)).toBeInTheDocument()
      expect(within(ApplicationContainer).getByText(application?.freelancerId?.category)).toBeInTheDocument()
      expect(
        within(ApplicationContainer).getByText(application?.freelancerId?.userId?.AddressLineCountry)
      ).toBeInTheDocument()
      expect(
        within(ApplicationContainer).getByText(application?.rate > 0 ? '$' + application?.rate : 'Negotiable')
      ).toBeInTheDocument()

      expect(
        within(ApplicationContainer).getByText(ConverterUtils.truncateString(application?.coverLetter, 150))
      ).toBeInTheDocument()

      expect(within(ApplicationContainer).getByRole('button', { name: 'View Profile' })).toBeInTheDocument()
      expect(
        within(ApplicationContainer).getByText(`${application?.freelancerId?.likeTotal || 0} UPVOTES BY CLIENTS`)
      ).toBeInTheDocument()

      application?.freelancerId.freelancerSkills.forEach(skill => {
        const SkillsContainer = within(ApplicationContainer).getByTestId(`${application?._id}_application_skills`)
        expect(SkillsContainer).toBeInTheDocument()

        expect(within(SkillsContainer).getByText(skill?.skill)).toBeInTheDocument()
      })
    })
    expect(screen.getByRole('button', { name: 'Invite Freelancer' })).toBeInTheDocument()
  })

  it('verify application card with undefined data', async () => {
    const SelectProject = initialState.Business.projectList[0]
    initialState.ProjectApplications.projectApplications[0].freelancerId.userId.profileImage = undefined
    initialState.ProjectApplications.projectApplications[0].freelancerId.userId.AddressLineCountry = undefined
    initialState.ProjectApplications.projectApplications[0].rate = undefined
    initialState.ProjectApplications.projectApplications[0].freelancerId.freelancerSkills = []
    initialState.ProjectApplications.projectApplications[0].freelancerId.likeTotal = undefined
    initialState.ProjectApplications.projectApplications[0].freelancerId.userId.FirstName = undefined

    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const headerContainer = screen.getByTestId('desktop_project_detail_header')
    expect(within(headerContainer).getByText(/PROJECT/i)).toBeInTheDocument()
    // Verify project name
    expect(within(headerContainer).getByText(initialState.Business.selectedBusiness?.name)).toBeInTheDocument()

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    const ApplicationContainer = screen.getByTestId(
      `${initialState.ProjectApplications.projectApplications[0]?._id}_application_card`
    )
    expect(ApplicationContainer).toBeInTheDocument()

    expect(within(ApplicationContainer).getByTestId('no_profile_image')).toBeInTheDocument()
  })

  it('render project detail page without application data', async () => {
    const SelectProject = initialState.Business.projectList[0]
    initialState.ProjectApplications.projectApplications = []

    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const headerContainer = screen.getByTestId('desktop_project_detail_header')
    expect(within(headerContainer).getByText(/PROJECT/i)).toBeInTheDocument()
    // Verify project name
    expect(within(headerContainer).getByText(initialState.Business.selectedBusiness?.name)).toBeInTheDocument()

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)
  })

  it('renders project detail page and click on view profile with _id', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    initialState.ProjectApplications.projectApplications.forEach(application => {
      const ApplicationContainer = screen.getByTestId(`${application?._id}_application_card`)
      expect(ApplicationContainer).toBeInTheDocument()

      const ViewProfileButton = within(ApplicationContainer).getByRole('button', { name: 'View Profile' })
      expect(ViewProfileButton).toBeInTheDocument()

      fireEvent.click(ViewProfileButton)

      expect(mockRouterPush).toHaveBeenCalledWith(`/freelancers/${application?.freelancerId?._id}`)
    })
  })

  it('renders project detail page and click on view profile with _id', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    const ApplicationContainer = screen.getByTestId(
      `${initialState.ProjectApplications.projectApplications[0]?._id}_application_card`
    )
    expect(ApplicationContainer).toBeInTheDocument()

    const ViewProfileButton = within(ApplicationContainer).getByRole('button', { name: 'View Profile' })
    expect(ViewProfileButton).toBeInTheDocument()

    fireEvent.click(ViewProfileButton)

    expect(mockRouterPush).toHaveBeenCalledWith(
      `/freelancers/${initialState.ProjectApplications.projectApplications[0]?.freelancerId?._id}`
    )
  })

  it('renders project detail page and click on view profile without _id', async () => {
    initialState.ProjectApplications.projectApplications[0].freelancerId._id = undefined

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    const ApplicationContainer = screen.getByTestId(
      `${initialState.ProjectApplications.projectApplications[0]?._id}_application_card`
    )
    expect(ApplicationContainer).toBeInTheDocument()

    const ViewProfileButton = within(ApplicationContainer).getByRole('button', { name: 'View Profile' })
    expect(ViewProfileButton).toBeInTheDocument()

    fireEvent.click(ViewProfileButton)
  })

  it('renders project detail page and click on Invite Freelancer', async () => {
    const SelectProject = initialState.Business.projectList[0]

    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)
    useRouter.mockReturnValue({
      query: { id: initialState.Business.selectedBusiness?._id },
      pathname: `/dashboard/projects/details/${initialState.Business.selectedBusiness?._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    await act(async () => {
      await renderWithRedux(<ProjectDetails />, { initialState })
    })

    const headerContainer = screen.getByTestId('desktop_project_detail_header')
    expect(within(headerContainer).getByText(/PROJECT/i)).toBeInTheDocument()
    // Verify project name
    expect(within(headerContainer).getByText(initialState.Business.selectedBusiness?.name)).toBeInTheDocument()

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    const InviteFreelancerButton = screen.getByRole('button', { name: 'Invite Freelancer' })
    expect(InviteFreelancerButton).toBeInTheDocument()

    fireEvent.click(InviteFreelancerButton)

    expect(mockRouterPush).toHaveBeenCalledWith(`/freelancers?project=${initialState.Business.selectedBusiness?._id}`)
  })
  it('renders project detail page and open action dropdown', async () => {
    initialState.ProjectApplications.projectApplications[0].freelancerId._id = undefined

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)

    useRouter.mockReturnValue({
      query: { id: initialState.Business.selectedBusiness?._id },
      pathname: `/dashboard/projects/details/${initialState.Business.selectedBusiness}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    await act(async () => {
      await renderWithRedux(<ProjectDetails />, { initialState })
    })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    const ApplicationContainer = screen.getByTestId(
      `${initialState.ProjectApplications.projectApplications[0]?._id}_application_card`
    )
    expect(ApplicationContainer).toBeInTheDocument()

    const ActionDropDown = within(ApplicationContainer).getByTestId('application_actions')
    expect(ActionDropDown).toBeInTheDocument()

    fireEvent.click(ActionDropDown)

    const ActionOption1 = screen.getByText('Hire User')
    const ActionOption2 = screen.getByText('View Application')
    const ActionOption3 = screen.getByText('Dismiss Application')

    expect(ActionOption1).toBeInTheDocument()
    expect(ActionOption2).toBeInTheDocument()
    expect(ActionOption3).toBeInTheDocument()

    fireEvent.click(ActionOption2)
    fireEvent.click(ActionOption3)
    fireEvent.click(ActionOption1)

    expect(mockRouterPush).toHaveBeenCalledWith(`/hire`)
  })

  it('renders dashboard Projects and verify Hires table Data', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const headerContainer = screen.getByTestId('desktop_project_detail_header')
    expect(within(headerContainer).getByText(/PROJECT/i)).toBeInTheDocument()
    // Verify project name
    expect(within(headerContainer).getByText(initialState.Business.selectedBusiness?.name)).toBeInTheDocument()

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const HiresTab = within(tabsContainer).getByRole('button', { name: 'Hires' })
    expect(HiresTab).toBeInTheDocument()
    fireEvent.click(HiresTab)

    const TableHeadingContainer = screen.getByTestId('hires_table_header')
    expect(TableHeadingContainer).toBeInTheDocument()

    expect(within(TableHeadingContainer).getByText('Name')).toBeInTheDocument()
    expect(within(TableHeadingContainer).getByText('RATE')).toBeInTheDocument()
    expect(within(TableHeadingContainer).getByText('POINTS')).toBeInTheDocument()
    expect(within(TableHeadingContainer).getByText('DEPARTMENT')).toBeInTheDocument()
    expect(within(TableHeadingContainer).getByText('HIRE DATE')).toBeInTheDocument()
    expect(within(TableHeadingContainer).getByText('ACTIONS')).toBeInTheDocument()

    const HiresTableBody = screen.getByTestId('hires_table_body')
    expect(HiresTableBody).toBeInTheDocument()

    initialState.Contracts.contracts.forEach(async contract => {
      const rowElement = within(HiresTableBody).getByTestId(contract?._id)

      expect(
        within(rowElement).getByText(
          ConverterUtils.capitalize(
            `${contract?.freelancerId?.userId.FirstName} ${contract?.freelancerId?.userId.LastName}`
          )
        )
      ).toBeInTheDocument()
      expect(within(rowElement).getByText(contract?.hourlyRate)).toBeInTheDocument()
      expect(within(rowElement).getByText(contract?.totalStoryPoints)).toBeInTheDocument()
      expect(within(rowElement).getByText(contract?.departmentId?.name)).toBeInTheDocument()
      const HiresDate =
        (contract?.createdAt && ValidationUtils.formatDate(contract?.createdAt)) ||
        ValidationUtils.formatDate(contract?.updatedAt || contract?.updatedAt)
      expect(within(rowElement).getByText(HiresDate)).toBeInTheDocument()

      const DetailButton = within(rowElement).getByText('Details')
      expect(DetailButton).toBeInTheDocument()

      fireEvent.click(DetailButton)

      const Option1 = within(rowElement).getByText('Revoke Access')
      expect(Option1).toBeInTheDocument()
      fireEvent.click(Option1)

      fireEvent.click(DetailButton)
      const Option3 = within(rowElement).getByText('Assign Work')
      expect(Option3).toBeInTheDocument()
      fireEvent.click(Option3)

      const Option4 = within(rowElement).getByText('View Invoices')
      expect(Option4).toBeInTheDocument()

      fireEvent.click(DetailButton)
      const Option5 = within(rowElement).getByText('Assign Department')
      expect(Option5).toBeInTheDocument()
      fireEvent.click(Option5)

      fireEvent.click(DetailButton)
      const Option2 = within(rowElement).getByText('View Profile')
      expect(Option2).toBeInTheDocument()
      fireEvent.click(Option2)
    })
  })

  it('renders dashboard Projects and click on View Invoices', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    initialState.Contracts.contracts[0].createdAt = undefined
    initialState.Contracts.contracts[0].hourlyRate = undefined
    initialState.Contracts.contracts[0].totalStoryPoints = undefined
    initialState.Contracts.contracts[0].departmentId.name = undefined

    renderWithRedux(<ProjectDetails />, { initialState })

    const headerContainer = screen.getByTestId('desktop_project_detail_header')
    expect(within(headerContainer).getByText(/PROJECT/i)).toBeInTheDocument()
    // Verify project name
    expect(within(headerContainer).getByText(initialState.Business.selectedBusiness?.name)).toBeInTheDocument()

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const HiresTab = within(tabsContainer).getByRole('button', { name: 'Hires' })
    expect(HiresTab).toBeInTheDocument()
    fireEvent.click(HiresTab)

    const HiresTableBody = screen.getByTestId('hires_table_body')
    expect(HiresTableBody).toBeInTheDocument()

    initialState.Contracts.contracts.forEach(async contract => {
      const rowElement = within(HiresTableBody).getByTestId(contract?._id)

      const DetailButton = within(rowElement).getByText('Details')
      expect(DetailButton).toBeInTheDocument()

      fireEvent.click(DetailButton)

      const Option4 = within(rowElement).getByText('View Invoices')
      expect(Option4).toBeInTheDocument()
      fireEvent.click(Option4)

      expect(mockRouterPush).toHaveBeenCalledWith(
        `/dashboard/projects/client/invoice/${contract.businessId}?tab=invoices&freelancer=${contract?.freelancerId?._id}`
      )
    })
  })

  it('renders dashboard Projects without hires data', async () => {
    const SelectProject = initialState.Business.projectList[0]

    initialState.Contracts.contracts = []

    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const headerContainer = screen.getByTestId('desktop_project_detail_header')
    expect(within(headerContainer).getByText(/PROJECT/i)).toBeInTheDocument()
    // Verify project name
    expect(within(headerContainer).getByText(initialState.Business.selectedBusiness?.name)).toBeInTheDocument()

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const HiresTab = within(tabsContainer).getByRole('button', { name: 'Hires' })
    expect(HiresTab).toBeInTheDocument()
    fireEvent.click(HiresTab)

    expect(screen.getByText('Hire someone for this project to begin working!')).toBeInTheDocument()
  })

  it('renders dashboard Projects and verify invites data', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvitesTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(InvitesTab).toBeInTheDocument()
    fireEvent.click(InvitesTab)

    initialState.Lists.invitesList[0]?.listEntries.forEach(list => {
      const InviteContainer = screen.getByTestId(`${list?._id}_invite`)
      expect(InviteContainer).toBeInTheDocument()

      const projectImage = within(InviteContainer).getByRole('img')
      expect(projectImage).toBeInTheDocument()
      expect(projectImage).toHaveAttribute('src', list?.freelancerId?.userId?.profileImage)
      expect(projectImage).toHaveAttribute('width', '102px')
      expect(projectImage).toHaveAttribute('height', '102px')

      const FreelancerName = ConverterUtils.capitalize(
        `${list?.freelancerId?.userId?.FirstName} ${list?.freelancerId?.userId?.LastName}`
      )
      expect(within(InviteContainer).getByText(FreelancerName)).toBeInTheDocument()
      expect(within(InviteContainer).getByText(list?.freelancerId?.category)).toBeInTheDocument()
      expect(within(InviteContainer).getByText(list?.freelancerId?.userId?.AddressLineCountry)).toBeInTheDocument()
      expect(
        within(InviteContainer).getByText(list?.freelancerId?.rate > 0 ? '$' + list?.freelancerId?.rate : 'Negotiable')
      ).toBeInTheDocument()

      const ViewProfileButton = within(InviteContainer).getByRole('button', { name: 'View Profile' })
      expect(ViewProfileButton).toBeInTheDocument()
      expect(
        within(InviteContainer).getByText(`${list.freelancerId?.likeTotal} UPVOTES BY CLIENTS`)
      ).toBeInTheDocument()

      list.freelancerId.freelancerSkills.forEach(skill => {
        const SkillsContainer = within(InviteContainer).getByTestId(`${list._id}_skills`)
        expect(SkillsContainer).toBeInTheDocument()

        expect(within(SkillsContainer).getByText(skill?.skill)).toBeInTheDocument()

        fireEvent.click(ViewProfileButton)
      })
    })
  })

  it('verify Invites card with undefined data', async () => {
    const SelectProject = initialState.Business.projectList[0]
    initialState.Lists.invitesList[0].listEntries[0].freelancerId.userId.profileImage = undefined
    initialState.Lists.invitesList[0].listEntries[0].freelancerId.userId.AddressLineCountry = undefined
    initialState.Lists.invitesList[0].listEntries[0].freelancerId.rate = undefined
    initialState.Lists.invitesList[0].listEntries[0].freelancerId.freelancerSkills = []
    initialState.Lists.invitesList[0].listEntries[0].freelancerId.likeTotal = undefined
    initialState.Lists.invitesList[0].listEntries[0].freelancerId.userId.FirstName = undefined

    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const headerContainer = screen.getByTestId('desktop_project_detail_header')
    expect(within(headerContainer).getByText(/PROJECT/i)).toBeInTheDocument()
    // Verify project name
    expect(within(headerContainer).getByText(initialState.Business.selectedBusiness?.name)).toBeInTheDocument()

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvitesTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    fireEvent.click(InvitesTab)

    const ApplicationContainer = screen.getByTestId(`${initialState.Lists.invitesList[0].listEntries[0]?._id}_invite`)
    expect(ApplicationContainer).toBeInTheDocument()
  })

  it('verify Invites Card without invites data', async () => {
    const SelectProject = initialState.Business.projectList[0]
    initialState.Lists.invitesList[0].listEntries = []

    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const headerContainer = screen.getByTestId('desktop_project_detail_header')
    expect(within(headerContainer).getByText(/PROJECT/i)).toBeInTheDocument()
    // Verify project name
    expect(within(headerContainer).getByText(initialState.Business.selectedBusiness?.name)).toBeInTheDocument()

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvitesTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    fireEvent.click(InvitesTab)

    const InvitesContainer = screen.getByTestId('desktop_invites')

    const InvitedFreelancerButton = within(InvitesContainer).getByRole('button', { name: 'Invite Freelancer' })
    expect(InvitedFreelancerButton).toBeInTheDocument()

    fireEvent.click(InvitedFreelancerButton)
  })

  it('renders dashboard Projects and verify invoices data for client role', async () => {
    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvoicesTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    fireEvent.click(InvoicesTab)

    const DetailHeader = screen.getByTestId('desktop_project_detail_header')
    expect(DetailHeader).toBeInTheDocument()

    expect(within(DetailHeader).getByText('Invoice History')).toBeInTheDocument()

    const InvoiceTableHeader = screen.getByTestId('project_invoices_table_header')
    expect(InvoiceTableHeader).toBeInTheDocument()

    expect(within(InvoiceTableHeader).getByText('NAME')).toBeInTheDocument()
    expect(within(InvoiceTableHeader).getByText('Dates')).toBeInTheDocument()
    expect(within(InvoiceTableHeader).getByText('HOURS')).toBeInTheDocument()
    expect(within(InvoiceTableHeader).getByText('STATUS')).toBeInTheDocument()
    expect(within(InvoiceTableHeader).getByText('HIRE DATE')).toBeInTheDocument()
    expect(within(InvoiceTableHeader).getByText('ACTIONS')).toBeInTheDocument()

    const InvoicesTableContainer = screen.getByTestId('project_invoices_table_body')
    expect(InvoicesTableContainer).toBeInTheDocument()

    initialState.Invoices.invoices.forEach(row => {
      const rowElement = within(InvoicesTableContainer).getByTestId(row?._id)

      const UserName =
        ConverterUtils.capitalize(`${row?.freelancer?.user?.FirstName} ${row?.freelancer?.user?.LastName}`) ||
        row?.freelancer?.user?.FullName

      expect(within(rowElement).getByText(UserName)).toBeInTheDocument()

      expect(within(rowElement).getByText(row?.hoursWorked)).toBeInTheDocument()

      expect(within(rowElement).getByText(ConverterUtils.capitalize(`${row.status}`))).toBeInTheDocument()

      const HireDate =
        (row?.contract?.createdAt && ValidationUtils.formatDate(row?.contract?.createdAt)) ||
        ValidationUtils.formatDate(row?.contract?.updatedAt || row?.contract?.updatedAt)
      expect(within(rowElement).getByText(HireDate)).toBeInTheDocument()

      const DetailButton = within(rowElement).getByText('Details')
      expect(DetailButton).toBeInTheDocument()

      fireEvent.click(DetailButton)

      expect(within(rowElement).getByText('Approve Invoice')).toBeInTheDocument()
      expect(within(rowElement).getByText('View Details')).toBeInTheDocument()
      expect(within(rowElement).getByText('View Profile')).toBeInTheDocument()
      expect(within(rowElement).getByText('Archive Invoice')).toBeInTheDocument()
    })

    const SingleInvoiceRow = within(InvoicesTableContainer).getByTestId(initialState.Invoices.invoices[0]?._id)

    const SingleInvoiceDetail = within(SingleInvoiceRow).getByText('Details')
    expect(SingleInvoiceDetail).toBeInTheDocument()

    fireEvent.click(SingleInvoiceDetail)

    fireEvent.click(within(SingleInvoiceRow).getByText('View Details'))

    const selectedInvoice = INVOICES[0]

    renderWithRedux(
      <Timesheet displayFormat={false} businessId={selectedInvoice.business._id} approveInvoice={true} />,
      {
        initialState
      }
    )

    const TimeSheetContainer = screen.getByTestId('desktop_timesheet')
    expect(TimeSheetContainer).toBeInTheDocument()

    const Task1 = within(TimeSheetContainer).getByTestId(`${selectedInvoice.tasks[0]._id}_task`)
    expect(Task1).toHaveTextContent(selectedInvoice?.tasks[0]?.task?.taskName)
    fireEvent.click(Task1)

    const DayContainer = within(TimeSheetContainer).getByTestId(selectedInvoice.tasks[0]._id)

    const freelancerImage = within(DayContainer).getByRole('img')
    expect(freelancerImage).toBeInTheDocument()
    expect(freelancerImage).toHaveAttribute('src', selectedInvoice.freelancer.user.profileImage)

    const InvoiceTotals = screen.getByTestId('client_invoice_totals')
    expect(InvoiceTotals).toBeInTheDocument()
    expect(
      within(InvoiceTotals).getByText(
        ConverterUtils.capitalize(
          `${selectedInvoice?.freelancer?.user?.FirstName} ${selectedInvoice?.freelancer?.user?.LastName}`
        )
      )
    ).toBeInTheDocument()

    const SubTotal = selectedInvoice?.contract?.hourlyRate * selectedInvoice?.hoursWorked
    const fee = SubTotal * 0.05
    const totalAmount = SubTotal - fee

    expect(within(InvoiceTotals).getAllByText(`$${SubTotal}`)[0]).toBeInTheDocument()
    expect(within(InvoiceTotals).getByText(`$${Math.round(fee)}`)).toBeInTheDocument()
    expect(within(InvoiceTotals).getByText(`$${totalAmount}`)).toBeInTheDocument()

    const ApproveInvoiceButton = within(TimeSheetContainer).getByRole('button', { name: 'Approve' })
    fireEvent.click(ApproveInvoiceButton)
  })

  //  As A Freelancer

  it('renders dashboard Projects and verify table body as a freelancer role', async () => {
    initialState.Auth.user = FREELANCER_AUTH
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    BUSINESS.forEach(business => {
      const rowElement = within(TableBodyContainer).getByTestId(business?._id)

      const DetailButton = within(rowElement).getByText('Details')
      expect(DetailButton).toBeInTheDocument()

      fireEvent.click(DetailButton)

      expect(within(rowElement).getByText('Log Time')).toBeInTheDocument()
      expect(within(rowElement).getByText('View Project')).toBeInTheDocument()
      expect(within(rowElement).getByText('View Work')).toBeInTheDocument()
      expect(within(rowElement).getByText('View Invoice')).toBeInTheDocument()
    })
  })

  it('renders dashboard Projects and click on dropdown option View Detail', async () => {
    initialState.Auth.user = FREELANCER_AUTH

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const ViewDetailOption = within(rowElement).getByText('View Project')
    expect(ViewDetailOption).toBeInTheDocument()

    fireEvent.click(ViewDetailOption)

    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SelectProject._id}`)
  })

  it('renders dashboard Projects and click on dropdown option Invoce', async () => {
    initialState.Auth.user = FREELANCER_AUTH

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const ViewInvoiceOption = within(rowElement).getByText('View Invoice')
    expect(ViewInvoiceOption).toBeInTheDocument()

    fireEvent.click(ViewInvoiceOption)

    expect(mockRouterPush).toHaveBeenCalledWith(
      `/dashboard/projects/freelancer/invoice/${SelectProject._id}?tab=invoices&freelancer${initialState.Auth.user?.freelancers}`
    )
  })

  it('renders dashboard Projects and click on dropdown option Log Time', async () => {
    initialState.Auth.user = FREELANCER_AUTH

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const LogTimeOption = within(rowElement).getByText('Log Time')
    expect(LogTimeOption).toBeInTheDocument()

    fireEvent.click(LogTimeOption)
  })

  it('renders dashboard Projects and click on dropdown option Log Time', async () => {
    initialState.Auth.user = FREELANCER_AUTH

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const ViewWorkOption = within(rowElement).getByText('View Work')
    expect(ViewWorkOption).toBeInTheDocument()

    fireEvent.click(ViewWorkOption)
  })

  it('renders dashboard Projects and verify invites data for freelancer role', async () => {
    initialState.Auth.user = FREELANCER_AUTH

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvitesTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(InvitesTab).toBeInTheDocument()
    fireEvent.click(InvitesTab)

    initialState.ListEntries.userListEntries.forEach(invitation => {
      const InviteContainer = screen.getByTestId(`${invitation?._id}_desktop_freelancer_invite`)
      expect(InviteContainer).toBeInTheDocument()

      const projectImage = within(InviteContainer).getByRole('img')
      expect(projectImage).toBeInTheDocument()
      expect(projectImage).toHaveAttribute('src', invitation?.businessId?.projectImagesUrl[0]?.url)
      expect(projectImage).toHaveAttribute('width', '102px')
      expect(projectImage).toHaveAttribute('height', '102px')

      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}_name`)).toHaveTextContent(
        invitation?.businessId?.name
      )
      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}_country`)).toHaveTextContent(
        invitation?.businessId?.businessCountry
      )
      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}_budget`)).toBeInTheDocument(
        `Estimated Rate: $${
          invitation?.businessId?.projectBudgetType === 'Hourly Rate'
            ? invitation?.businessId?.budget + ' / hour'
            : invitation?.businessId?.budget ?? 0
        }`
      )
      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}description`)).toHaveTextContent(
        invitation?.businessId?.description
      )

      const ViewProject = within(InviteContainer).getByRole('button', { name: 'View Project' })
      expect(ViewProject).toBeInTheDocument()
      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}_likeTotal`)).toHaveTextContent(
        `${invitation?.businessId?.likeTotal ?? 0} Upvotes by Freelancers`
      )

      invitation?.businessId?.requiredSkills?.forEach((skill, index) => {
        const SkillsContainer = within(InviteContainer).getByTestId(`required_skill`)
        expect(SkillsContainer).toHaveTextContent(skill)
      })
      fireEvent.click(ViewProject)
    })
  })

  it('renders dashboard Projects and verify invites data for freelancer role', async () => {
    initialState.Auth.user = FREELANCER_AUTH
    initialState.ListEntries.userListEntries[0].businessId.applicants.push(
      initialState.ListEntries.userListEntries[0].freelancerId
    )
    initialState.ListEntries.userListEntries[0].businessId.projectBudgetType = 'Hourly Rate'
    initialState.ListEntries.userListEntries[0].businessId.likeTotal = undefined

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvitesTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(InvitesTab).toBeInTheDocument()
    fireEvent.click(InvitesTab)

    initialState.ListEntries.userListEntries.forEach(invitation => {
      const InviteContainer = screen.getByTestId(`${invitation?._id}_desktop_freelancer_invite`)
      expect(InviteContainer).toBeInTheDocument()

      const projectImage = within(InviteContainer).getByRole('img')
      expect(projectImage).toBeInTheDocument()
      expect(projectImage).toHaveAttribute('src', invitation?.businessId?.projectImagesUrl[0]?.url)
      expect(projectImage).toHaveAttribute('width', '102px')
      expect(projectImage).toHaveAttribute('height', '102px')

      const ProjectNameElemment = within(InviteContainer).getByTestId(`${invitation?.businessId?._id}_name`)

      expect(ProjectNameElemment).toHaveTextContent(invitation?.businessId?.name)
      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}_country`)).toHaveTextContent(
        invitation?.businessId?.businessCountry
      )
      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}_budget`)).toBeInTheDocument(
        `Estimated Rate: $${
          invitation?.businessId?.projectBudgetType === 'Hourly Rate'
            ? invitation?.businessId?.budget + ' / hour'
            : invitation?.businessId?.budget ?? 0
        }`
      )
      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}description`)).toHaveTextContent(
        invitation?.businessId?.description
      )

      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}_likeTotal`)).toHaveTextContent(
        `${invitation?.businessId?.likeTotal ?? 0} Upvotes by Freelancers`
      )

      invitation?.businessId?.requiredSkills?.forEach((skill, index) => {
        const SkillsContainer = within(InviteContainer).getByTestId(`required_skill`)
        expect(SkillsContainer).toHaveTextContent(skill)
      })
      fireEvent.click(ProjectNameElemment)
    })
  })

  it('renders dashboard Projects and verify invites without data for freelancer role', async () => {
    initialState.Auth.user = FREELANCER_AUTH
    initialState.ListEntries.userListEntries = []

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvitesTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(InvitesTab).toBeInTheDocument()
    fireEvent.click(InvitesTab)
  })

  it('renders dashboard Projects and verify invites without budget', async () => {
    initialState.Auth.user = FREELANCER_AUTH
    initialState.ListEntries.userListEntries[0].businessId.budget = undefined

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)
    expect(ProjectNameElement).toBeInTheDocument()

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvitesTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(InvitesTab).toBeInTheDocument()
    fireEvent.click(InvitesTab)
  })

  it('renders some styled components of Project Desktop Card', async () => {
    render(<Container />)
    render(<Right />)
  })

  it('renders dashboard Projects and verify invoices data for freelancer role', async () => {
    initialState.Auth.user = FREELANCER_AUTH
    const selectedInvoice = initialState.Invoices.invoices[0]

    initialState.Invoices.invoices[0].tasks[1].invoiceId = 'invoice_id'

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvoicesTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    fireEvent.click(InvoicesTab)

    const DetailHeader = screen.getByTestId('desktop_project_detail_header')
    expect(DetailHeader).toBeInTheDocument()

    expect(within(DetailHeader).getByText('TIMESHEET')).toBeInTheDocument()

    const TimeSheetContainer = screen.getByTestId('desktop_timesheet')
    expect(TimeSheetContainer).toBeInTheDocument()

    const userName = ConverterUtils.capitalize(`${selectedInvoice?.freelancer?.user?.FullName.slice(0, 15)}`)

    expect(within(TimeSheetContainer).getByTestId('timesheet_user_name')).toHaveTextContent(
      userName?.length > 17 ? userName + '...' : userName
    )
    const WeekOptionsDropDown = within(TimeSheetContainer).getByTestId('timesheet_week_options')
    expect(WeekOptionsDropDown).toBeInTheDocument()
    fireEvent.change(WeekOptionsDropDown, { target: { value: '1' } })

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const TableColumns = [
      {
        name: 'TIME SPENT'
      },
      {
        name: 'STORY POINTS'
      }
    ]
    fireEvent.change(WeekOptionsDropDown, { target: { value: '0' } })

    weekdays.forEach((day, index) => {
      expect(within(TimeSheetContainer).getByText(day?.toUpperCase())).toBeInTheDocument()
      const DaysHeader = within(TimeSheetContainer).getByTestId(`${day}_header`)
      TableColumns.forEach(column => {
        expect(within(DaysHeader).getByText(column.name)).toBeInTheDocument()
      })
      if (index === weekdays?.length - 1) {
        const AddTaskIcon = within(DaysHeader).getByTestId(`${day}_add_task_icon`)
        expect(AddTaskIcon).toBeInTheDocument()
        fireEvent.click(AddTaskIcon)
        const CancelButton = screen.getByRole('button', { name: 'CANCEL' })
        fireEvent.click(CancelButton)
      }
    })

    expect(screen.queryByTestId(`${selectedInvoice.tasks[0]._id}_hours`)).not.toBeInTheDocument()

    const Task1 = within(TimeSheetContainer).getByTestId(`${selectedInvoice.tasks[0]._id}_task`)
    expect(Task1).toHaveTextContent(selectedInvoice?.tasks[0]?.task?.taskName)
    fireEvent.click(Task1)

    const TaskHoursField = screen.getByTestId(`${selectedInvoice.tasks[0]._id}_hours`)
    expect(TaskHoursField).toBeInTheDocument()
    fireEvent.focus(TaskHoursField)

    fireEvent.change(TaskHoursField, {
      target: {
        value: 12
      }
    })
    fireEvent.keyDown(TaskHoursField, { key: 'Enter', code: 'Enter' })

    fireEvent.click(Task1)
    fireEvent.focus(TaskHoursField)
    fireEvent.keyDown(TaskHoursField, { key: 'Shift', code: 'Shift' })

    const Task2 = within(TimeSheetContainer).getByTestId(`${selectedInvoice.tasks[1]._id}_task`)
    expect(Task2).toHaveTextContent(selectedInvoice?.tasks[1]?.task?.taskName)
    fireEvent.click(Task2)

    const TaskHoursField2 = screen.getByTestId(`${selectedInvoice.tasks[1]._id}_hours`)
    expect(TaskHoursField2).toBeInTheDocument()
    fireEvent.focus(TaskHoursField2)

    fireEvent.change(TaskHoursField2, {
      target: {
        value: 12
      }
    })
    fireEvent.keyDown(TaskHoursField2, { key: 'Enter', code: 'Enter' })

    const SubmitButton = within(TimeSheetContainer).getByRole('button', { name: `SUBMIT` })
    fireEvent.click(SubmitButton)
  })

  it('renders Timesheet component for default format', async () => {
    initialState.Auth.user = FREELANCER_AUTH
    const selectedInvoice = initialState.Invoices.invoices[0]

    renderWithRedux(<Timesheet displayFormat={true} businessId={selectedInvoice.business._id} />, {
      initialState
    })

    const TimeSheetContainer = screen.getByTestId('desktop_timesheet')
    expect(TimeSheetContainer).toBeInTheDocument()

    const userName = ConverterUtils.capitalize(`${selectedInvoice?.freelancer?.user?.FullName.slice(0, 15)}`)

    expect(within(TimeSheetContainer).getByTestId('timesheet_user_name')).toHaveTextContent(
      userName?.length > 17 ? userName + '...' : userName
    )
    const TableColumns = [
      {
        name: 'TIME SPENT'
      },
      {
        name: 'STORY POINTS'
      }
    ]
    TableColumns.forEach(column => {
      expect(screen.getByTestId(column.name)).toBeInTheDocument()
    })
  })

  it('Verify loading component in Add Tasks Model and hide modal by clicking cancel button', async () => {
    initialState.Loading.loading = true
    initialState.Auth.user = FREELANCER_AUTH

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvoicesTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    fireEvent.click(InvoicesTab)

    const DetailHeader = screen.getByTestId('desktop_project_detail_header')
    expect(DetailHeader).toBeInTheDocument()

    const TimeSheetContainer = screen.getByTestId('desktop_timesheet')
    expect(TimeSheetContainer).toBeInTheDocument()

    const AddTaskIcon = screen.getByTestId(`Monday_add_task_icon`)
    expect(AddTaskIcon).toBeInTheDocument()
    fireEvent.click(AddTaskIcon)

    const TaskModalContainer = screen.getByTestId('desktop_add_tasks')
    expect(TaskModalContainer).toBeInTheDocument()

    const CancelButton = within(TaskModalContainer).getByRole('button', { name: 'CANCEL' })

    expect(screen.getByText(/Connect. Build. /i)).toBeInTheDocument()

    initialState.Loading.loading = false
    expect(CancelButton).toBeInTheDocument()

    fireEvent.click(CancelButton)
  })
  it('add tasks to invoice from tasks modal with success 200 response', async () => {
    initialState.Auth.user = FREELANCER_AUTH

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvoicesTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    fireEvent.click(InvoicesTab)

    const DetailHeader = screen.getByTestId('desktop_project_detail_header')
    expect(DetailHeader).toBeInTheDocument()

    const TimeSheetContainer = screen.getByTestId('desktop_timesheet')
    expect(TimeSheetContainer).toBeInTheDocument()

    const AddTaskIcon = screen.getByTestId(`Monday_add_task_icon`)
    expect(AddTaskIcon).toBeInTheDocument()
    fireEvent.click(AddTaskIcon)

    const TaskModalContainer = screen.getByTestId('desktop_add_tasks')
    expect(TaskModalContainer).toBeInTheDocument()

    expect(within(TaskModalContainer).getByText('Select a ticket')).toBeInTheDocument()
    expect(within(TaskModalContainer).getByText('Start typing to select an assigned task')).toBeInTheDocument()

    const autocomplete = screen.getByTestId('autocomplete')

    const TaskNameField = within(autocomplete).getByTestId('task_name')
    expect(TaskNameField).toBeInTheDocument()

    autocomplete.click()
    autocomplete.focus()
    fireEvent.change(TaskNameField, { target: { value: 'Task 2' } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.click(screen.getAllByText('Task 2')[0])

    const newTaskName = 'Task 2ss'
    fireEvent.change(TaskNameField, { target: { value: newTaskName } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.keyDown(TaskNameField, { key: 'Enter' })
    fireEvent.keyDown(TaskNameField, { key: 'ArrowDown' })

    autocomplete.focus()
    fireEvent.change(TaskNameField, { target: { value: newTaskName } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    const AddButton = within(TaskModalContainer).getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)

    autocomplete.click()
    autocomplete.focus()
    fireEvent.change(TaskNameField, { target: { value: 'new task 2' } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.keyDown(TaskNameField, { key: 'Enter' })

    const DeleteTask1 = within(TaskModalContainer).getByTestId('delete_task_1')
    fireEvent.click(DeleteTask1)

    autocomplete.click()
    autocomplete.focus()
    fireEvent.change(TaskNameField, { target: { value: newTaskName } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.keyDown(TaskNameField, { key: 'Enter' })

    const AddTasksButton = within(TaskModalContainer).getByRole('button', { name: 'ADD TASK' })

    await act(async () => {
      await fireEvent.click(AddTasksButton)
    })

    const AddTasksDataModal = screen.getByTestId('desktop_add_tasks_data')
    expect(AddTasksDataModal).toBeInTheDocument()

    expect(within(AddTasksDataModal).getByText('Create new tasks')).toBeInTheDocument()
    expect(within(AddTasksDataModal).getByText(newTaskName)).toBeInTheDocument()

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
  })

  it('add existing task to invoice from tasks modal with success 200 response', async () => {
    initialState.Auth.user = FREELANCER_AUTH

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvoicesTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    fireEvent.click(InvoicesTab)

    const DetailHeader = screen.getByTestId('desktop_project_detail_header')
    expect(DetailHeader).toBeInTheDocument()

    const TimeSheetContainer = screen.getByTestId('desktop_timesheet')
    expect(TimeSheetContainer).toBeInTheDocument()

    const AddTaskIcon = screen.getByTestId(`Monday_add_task_icon`)
    expect(AddTaskIcon).toBeInTheDocument()
    fireEvent.click(AddTaskIcon)

    const TaskModalContainer = screen.getByTestId('desktop_add_tasks')
    expect(TaskModalContainer).toBeInTheDocument()

    expect(within(TaskModalContainer).getByText('Select a ticket')).toBeInTheDocument()
    expect(within(TaskModalContainer).getByText('Start typing to select an assigned task')).toBeInTheDocument()

    const autocomplete = screen.getByTestId('autocomplete')

    const TaskNameField = within(autocomplete).getByTestId('task_name')
    expect(TaskNameField).toBeInTheDocument()

    autocomplete.click()
    autocomplete.focus()
    fireEvent.change(TaskNameField, { target: { value: 'task 1 update' } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.click(screen.getAllByText('task 1 update')[0])

    const AddTasksButton = within(TaskModalContainer).getByRole('button', { name: 'ADD TASK' })

    await act(async () => {
      await fireEvent.click(AddTasksButton)
    })
  })

  it('create new invoice with success 200 response', async () => {
    initialState.Auth.user = FREELANCER_AUTH
    initialState.Invoices.invoices[0] = {}

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvoicesTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    fireEvent.click(InvoicesTab)

    const DetailHeader = screen.getByTestId('desktop_project_detail_header')
    expect(DetailHeader).toBeInTheDocument()

    const TimeSheetContainer = screen.getByTestId('desktop_timesheet')
    expect(TimeSheetContainer).toBeInTheDocument()

    const AddTaskIcon = screen.getByTestId(`Monday_add_task_icon`)
    expect(AddTaskIcon).toBeInTheDocument()
    fireEvent.click(AddTaskIcon)

    const TaskModalContainer = screen.getByTestId('desktop_add_tasks')
    expect(TaskModalContainer).toBeInTheDocument()

    const autocomplete = screen.getByTestId('autocomplete')

    const TaskNameField = within(autocomplete).getByTestId('task_name')
    expect(TaskNameField).toBeInTheDocument()

    autocomplete.click()
    autocomplete.focus()
    fireEvent.change(TaskNameField, { target: { value: 'task 1 update' } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.click(screen.getAllByText('task 1 update')[0])

    const AddTasksButton = within(TaskModalContainer).getByRole('button', { name: 'ADD TASK' })

    await act(async () => {
      await fireEvent.click(AddTasksButton)
    })
  })

  it('add tasks to invoice from tasks modal with error 400 response', async () => {
    createTask.mockReturnValue(() => {
      return {
        status: 400
      }
    })

    initialState.Auth.user = FREELANCER_AUTH

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvoicesTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    fireEvent.click(InvoicesTab)

    const DetailHeader = screen.getByTestId('desktop_project_detail_header')
    expect(DetailHeader).toBeInTheDocument()

    const TimeSheetContainer = screen.getByTestId('desktop_timesheet')
    expect(TimeSheetContainer).toBeInTheDocument()

    const AddTaskIcon = screen.getByTestId(`Monday_add_task_icon`)
    expect(AddTaskIcon).toBeInTheDocument()
    fireEvent.click(AddTaskIcon)

    const TaskModalContainer = screen.getByTestId('desktop_add_tasks')
    expect(TaskModalContainer).toBeInTheDocument()

    expect(within(TaskModalContainer).getByText('Select a ticket')).toBeInTheDocument()
    expect(within(TaskModalContainer).getByText('Start typing to select an assigned task')).toBeInTheDocument()

    const autocomplete = screen.getByTestId('autocomplete')

    const TaskNameField = within(autocomplete).getByTestId('task_name')
    expect(TaskNameField).toBeInTheDocument()

    autocomplete.click()
    autocomplete.focus()

    const newTaskName = 'Task 2ss'

    fireEvent.change(TaskNameField, { target: { value: newTaskName } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.keyDown(TaskNameField, { key: 'Enter' })
    fireEvent.keyDown(TaskNameField, { key: 'ArrowDown' })

    const AddTasksButton = within(TaskModalContainer).getByRole('button', { name: 'ADD TASK' })

    await act(async () => {
      await fireEvent.click(AddTasksButton)
    })

    const AddTasksDataModal = screen.getByTestId('desktop_add_tasks_data')
    expect(AddTasksDataModal).toBeInTheDocument()

    const storyPointsField1 = within(AddTasksDataModal).getByTestId('story points0')
    expect(storyPointsField1).toBeInTheDocument()

    fireEvent.change(storyPointsField1, { target: { value: '13' } })

    const AddNewTasks = within(AddTasksDataModal).getByRole('button', { name: 'ADD TASK(S)' })
    await act(async () => {
      await fireEvent.click(AddNewTasks)
    })
  })

  it('add existing tasks to invoice from tasks modal with success 200 response', async () => {
    initialState.Auth.user = FREELANCER_AUTH

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(SelectProject._id)

    const ProjectNameElement = within(rowElement).getByText(SelectProject?.name)

    await fireEvent.click(ProjectNameElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvoicesTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    fireEvent.click(InvoicesTab)

    const DetailHeader = screen.getByTestId('desktop_project_detail_header')
    expect(DetailHeader).toBeInTheDocument()

    const TimeSheetContainer = screen.getByTestId('desktop_timesheet')
    expect(TimeSheetContainer).toBeInTheDocument()

    const AddTaskIcon = screen.getByTestId(`Monday_add_task_icon`)
    expect(AddTaskIcon).toBeInTheDocument()
    fireEvent.click(AddTaskIcon)

    const TaskModalContainer = screen.getByTestId('desktop_add_tasks')
    expect(TaskModalContainer).toBeInTheDocument()

    const autocomplete = screen.getByTestId('autocomplete')

    const TaskNameField = within(autocomplete).getByTestId('task_name')
    expect(TaskNameField).toBeInTheDocument()

    autocomplete.click()
    autocomplete.focus()

    fireEvent.change(TaskNameField, { target: { value: 'Task 2' } })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.click(screen.getAllByText('Task 2')[0])

    const AddButton = within(TaskModalContainer).getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)

    const AddTasksButton = within(TaskModalContainer).getByRole('button', { name: 'ADD TASK' })

    await act(async () => {
      await fireEvent.click(AddTasksButton)
    })
  })
  it('renders dashboard Projects and verify project invoice timesheet with total for freelancer role', async () => {
    initialState.Auth.user = FREELANCER_AUTH
    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByRole('table')).toBeInTheDocument()

    const TableBodyContainer = screen.getByTestId('dashboard_projects_table_body')
    expect(TableBodyContainer).toBeInTheDocument()

    const rowElement = within(TableBodyContainer).getByTestId(BUSINESS[0]?._id)

    const DetailButton = within(rowElement).getByText('Details')
    expect(DetailButton).toBeInTheDocument()

    fireEvent.click(DetailButton)

    const ViewInvoice = within(rowElement).getByText('View Invoice')
    expect(ViewInvoice).toBeInTheDocument()
    fireEvent.click(ViewInvoice)

    const selectedInvoice = INVOICES[0]

    renderWithRedux(<Timesheet displayFormat={false} businessId={selectedInvoice.business._id} />, {
      initialState
    })

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const InvoiceTotalContainer = within(screen.getByTestId('desktop_timesheet')).getByTestId(
      'freelancer_invoice_totals'
    )

    daysOfWeek.forEach(day => {
      let hours = 0
      selectedInvoice?.tasks?.forEach(task => {
        const taskDate = new Date(task.updatedAt)
        const dayOfWeek = daysOfWeek[taskDate.getDay()]

        if (dayOfWeek === day) {
          hours += task?.hours
        }
      })
      expect(within(InvoiceTotalContainer).getByTestId(`${day}_hours`)).toHaveTextContent(`${day}${hours}`)
    })

    const rateValueElement = within(screen.getByTestId('freelancer_invoice_totals')).getByText((content, element) => {
      const combinedText = Array.from(element.childNodes)
        .map(node => node.textContent)
        .join('')
        .trim()
      return combinedText === `RATE$${selectedInvoice?.contract?.hourlyRate} /HOUR`
    })
    expect(rateValueElement).toBeInTheDocument()

    const subTotal = selectedInvoice?.contract.hourlyRate * selectedInvoice.hoursWorked

    const feeElement = within(screen.getByTestId('freelancer_invoice_totals')).getByText((content, element) => {
      const combinedText = Array.from(element.childNodes)
        .map(node => node.textContent)
        .join('')
        .trim()
      return combinedText === `FEE$${Math.round(subTotal * 0.05)}`
    })
    expect(feeElement).toBeInTheDocument()

    const totalAmountElement = within(screen.getByTestId('freelancer_invoice_totals')).getByText((content, element) => {
      const combinedText = Array.from(element.childNodes)
        .map(node => node.textContent)
        .join('')
        .trim()
      return combinedText === `TOTAL$${subTotal - subTotal * 0.05}`
    })
    expect(totalAmountElement).toBeInTheDocument()

    const WeekOptionsDropDown = within(screen.getByTestId('desktop_timesheet')).getByTestId('timesheet_week_options')
    expect(WeekOptionsDropDown).toBeInTheDocument()

    fireEvent.change(WeekOptionsDropDown, { target: { value: null } })
    fireEvent.change(WeekOptionsDropDown, { target: { value: undefined } })
  })

  // // //  Mobile View Test
  it('renders Projects page on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })
  })
  it('renders dashboard Projects and verify static data ', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    expect(screen.getByText('Recent Projects')).toBeInTheDocument()
    expect(screen.getAllByText('VIEW ALL')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Lists')[1]).toBeInTheDocument()
    expect(screen.getByText('Departments')).toBeInTheDocument()
  })

  it('renders dashboard Projects on mobile view and render first three projects, click on first project ', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const SpliceArray =
      initialState.Business.projectList?.length > 3
        ? initialState.Business.projectList?.splice(0, 3)
        : initialState.Business.projectList

    SpliceArray.forEach(business => {
      expect(within(ProjectsContainer).getByText(business.name)).toBeInTheDocument()
    })

    const ProjectName = within(ProjectsContainer).getByText(SpliceArray[0]?.name)
    fireEvent.click(ProjectName.parentElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${SpliceArray[0]?._id}`)
  })

  it('renders dashboard Projects on mobile view and click on view all project', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ViewAllProjects = within(ProjectsContainer).getByText('VIEW ALL')
    expect(ViewAllProjects).toBeInTheDocument()
  })

  it('renders dashboard Projects on mobile view without projects data', async () => {
    initialState.Business.projectList = undefined

    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const NoProjectText = within(ProjectsContainer).getByText('Start a project and you will see it here...')
    expect(NoProjectText).toBeInTheDocument()
  })

  it('renders lists on mobile projects page, also click on first list', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ListContainer = screen.getByTestId('view_mobile_lists')
    expect(ListContainer).toBeInTheDocument()

    const SpliceArray =
      initialState?.ListEntries.userLists?.length > 3
        ? initialState?.ListEntries.userLists?.splice(0, 3)
        : initialState?.ListEntries.userLists

    SpliceArray.forEach(list => {
      const ListName = within(ListContainer).getByText(list?.name)
      expect(ListName).toBeInTheDocument()
      fireEvent.click(ListName)
    })
  })

  it('renders lists on mobile projects page and click on view all lists', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ListContainner = screen.getByTestId('view_mobile_lists')
    expect(ListContainner).toBeInTheDocument()

    const ViewAllLists = within(ListContainner).getByText('VIEW ALL')
    expect(ViewAllLists).toBeInTheDocument()

    fireEvent.click(ViewAllLists)
  })

  it('renders dashboard Projects on mobile view and  click on first project to verify project detail', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${initialState.Business.projectList[0]?._id}`)

    await act(async () => {
      renderWithRedux(<ProjectDetails />, { initialState })
    })

    const projectDetail = initialState.Business.selectedBusiness

    const mobileDetailContainer = screen.getByTestId('mobile_project_detail')
    expect(mobileDetailContainer).toBeInTheDocument()

    expect(within(mobileDetailContainer).getByText(`Budget: $${projectDetail?.budget}`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`Project Length:`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`${projectDetail?.projectType}`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`${projectDetail?.description}`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`Requirements`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`${projectDetail.objectives[0]}`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`${projectDetail.objectives[1]}`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`${projectDetail.objectives[2]}`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`${projectDetail.objectives[3]}`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`Skills Required`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`Project ID: ${projectDetail?._id}`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`Project Goals`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`${projectDetail?.goals}`)).toBeInTheDocument()
    expect(within(mobileDetailContainer).getByText(`Project Image`)).toBeInTheDocument()

    const projectImage = within(mobileDetailContainer).getByTestId(projectDetail.projectImagesUrl[0]._id)
    expect(projectImage).toBeInTheDocument()
    expect(projectImage).toHaveAttribute('src', projectDetail.projectImagesUrl[0].url)
    expect(projectImage).toHaveAttribute('width', '100%')
    expect(projectImage).toHaveAttribute('height', '150px')

    const clientDetailContainer = screen.getByTestId('mobile_about_client')

    expect(within(clientDetailContainer).getByText('About client')).toBeInTheDocument()
    expect(within(clientDetailContainer).getByText(`${projectDetail?.businessCity}`)).toBeInTheDocument()
    expect(within(clientDetailContainer).getByText(`${projectDetail?.businessCountry}`)).toBeInTheDocument()
    expect(within(clientDetailContainer).getByText(`${projectDetail?.likeTotal} upvotes`)).toBeInTheDocument()
    expect(
      within(clientDetailContainer).getByText(
        `Member since ${ConverterUtils.toMonthDateYear(projectDetail?.userId?.createdAt)}`
      )
    ).toBeInTheDocument()
    expect(within(clientDetailContainer).getByText(`Client Verification`)).toBeInTheDocument()
    expect(within(clientDetailContainer).getByText(`Identity Verified`)).toBeInTheDocument()
    expect(within(clientDetailContainer).getByText(`Payment Verified`)).toBeInTheDocument()

    initialState.Business.selectedBusiness.projectBudgetType = 'Hourly Rate'
    await act(async () => {
      renderWithRedux(<ProjectDetails />, { initialState })
    })
    initialState.Business.selectedBusiness = {}
    await act(async () => {
      renderWithRedux(<ProjectDetails />, { initialState })
    })
  }, 10000)

  it('renders dashboard Projects on mobile view and  click on first project to verify images if _id not available', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${initialState.Business.projectList[0]?._id}`)

    initialState.Business.selectedBusiness.projectImagesUrl[0]._id = undefined

    await act(async () => {
      renderWithRedux(<ProjectDetails />, { initialState })
    })
  })

  it('renders dashboard Projects and click on project name to redirect to project detail page for applications data verification', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${initialState.Business.projectList[0]?._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    initialState.ProjectApplications.projectApplications.forEach(application => {
      const ApplicationContainer = screen.getByTestId(`${application?._id}_application_card`)
      expect(ApplicationContainer).toBeInTheDocument()

      const projectImage = within(ApplicationContainer).getByRole('img')
      expect(projectImage).toBeInTheDocument()
      expect(projectImage).toHaveAttribute('src', application?.freelancerId?.userId?.profileImage)
      expect(projectImage).toHaveAttribute('width', '65px')
      expect(projectImage).toHaveAttribute('height', '65px')

      const FreelancerName = ConverterUtils.capitalize(
        `${application?.freelancerId?.userId?.FirstName} ${application?.freelancerId?.userId?.LastName}`
      )
      expect(within(ApplicationContainer).getByText(FreelancerName)).toBeInTheDocument()
      expect(within(ApplicationContainer).getByText(application?.freelancerId?.category)).toBeInTheDocument()
      expect(
        within(ApplicationContainer).getByText(application?.freelancerId?.userId?.AddressLineCountry)
      ).toBeInTheDocument()

      expect(
        within(ApplicationContainer).getByText(ConverterUtils.truncateString(application?.coverLetter, 150))
      ).toBeInTheDocument()

      expect(within(ApplicationContainer).getByRole('button', { name: 'View Profile' })).toBeInTheDocument()

      application?.freelancerId.freelancerSkills.forEach(skill => {
        const SkillsContainer = within(ApplicationContainer).getByTestId(`${application?._id}_application_skills`)
        expect(SkillsContainer).toBeInTheDocument()

        expect(within(SkillsContainer).getByText(skill?.skill)).toBeInTheDocument()
      })
    })
    expect(screen.getByRole('button', { name: 'Invite Freelancer' })).toBeInTheDocument()
  })

  it('verify application card with undefined data', async () => {
    initialState.ProjectApplications.projectApplications[0].freelancerId.userId.profileImage = undefined
    initialState.ProjectApplications.projectApplications[0].freelancerId.userId.AddressLineCountry = undefined
    initialState.ProjectApplications.projectApplications[0].rate = undefined
    initialState.ProjectApplications.projectApplications[0].freelancerId.freelancerSkills = []
    initialState.ProjectApplications.projectApplications[0].freelancerId.likeTotal = undefined
    initialState.ProjectApplications.projectApplications[0].freelancerId.userId.FirstName = undefined

    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${initialState.Business.projectList[0]?._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    const ApplicationContainer = screen.getByTestId(
      `${initialState.ProjectApplications.projectApplications[0]?._id}_application_card`
    )
    expect(ApplicationContainer).toBeInTheDocument()
  })

  it('render project detail page without application data', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))
    initialState.ProjectApplications.projectApplications = []

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${initialState.Business.projectList[0]?._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)
  })

  it('render project detail page and click on view profile button', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${initialState.Business.projectList[0]?._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    const ApplicationContainer = screen.getByTestId(
      `${initialState.ProjectApplications.projectApplications[0]?._id}_application_card`
    )
    expect(ApplicationContainer).toBeInTheDocument()

    const ViewProfileButton = within(ApplicationContainer).getByRole('button', { name: 'View Profile' })
    expect(ViewProfileButton).toBeInTheDocument()

    fireEvent.click(ViewProfileButton)

    expect(mockRouterPush).toHaveBeenCalledWith(
      `/freelancers/${initialState.ProjectApplications.projectApplications[0]?.freelancerId?._id}`
    )
  })

  it('render project detail page and click on view profile button', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${initialState.Business.projectList[0]?._id}`)

    useRouter.mockReturnValue({
      query: { id: initialState.Business.selectedBusiness?._id },
      pathname: `/dashboard/projects/details/${initialState.Business.selectedBusiness?._id}`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    await act(async () => {
      await renderWithRedux(<ProjectDetails />, { initialState })
    })
    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Applications' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    const InviteFreelancerButton = screen.getByRole('button', { name: 'Invite Freelancer' })
    expect(InviteFreelancerButton).toBeInTheDocument()

    fireEvent.click(InviteFreelancerButton)

    expect(mockRouterPush).toHaveBeenCalledWith(`/freelancers?project=${initialState.Business.selectedBusiness?._id}`)
  })

  it('render project detail with Hires Tab', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${initialState.Business.projectList[0]?._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const applicationTab = within(tabsContainer).getByRole('button', { name: 'Hires' })
    expect(applicationTab).toBeInTheDocument()
    fireEvent.click(applicationTab)

    const HiresContainer = screen.getByTestId(`mobile_hires_container`)
    expect(HiresContainer).toBeInTheDocument()
  })

  it('renders dashboard Projects and verify hires data on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${initialState.Business.projectList[0]?._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const hiresTab = within(tabsContainer).getByRole('button', { name: 'Hires' })
    expect(hiresTab).toBeInTheDocument()
    fireEvent.click(hiresTab)

    initialState.Contracts.contracts.forEach(contract => {
      const HireDate =
        (contract?.createdAt && ValidationUtils.formatDate(contract?.createdAt)) ||
        ValidationUtils.formatDate(contract?.updatedAt || contract?.updatedAt)
      const HiresContainer = screen.getByTestId(`${contract?._id}_contracts`)
      expect(HiresContainer).toBeInTheDocument()

      const FreelancerName = ConverterUtils.capitalize(
        `${contract?.freelancerId?.userId?.FirstName} ${contract?.freelancerId?.userId?.LastName}`
      )
      expect(within(HiresContainer).getByText(FreelancerName)).toBeInTheDocument()
      expect(within(HiresContainer).getByText(HireDate)).toBeInTheDocument()
      expect(within(HiresContainer).getByText(`$ ${contract?.hourlyRate} / hour`)).toBeInTheDocument()
      expect(within(HiresContainer).getByText(contract?.freelancerId?.category)).toBeInTheDocument()

      const DetailButton = within(HiresContainer).getByText('Details')
      expect(DetailButton).toBeInTheDocument()

      fireEvent.click(DetailButton)

      const Option1 = within(HiresContainer).getByText('Revoke Access')
      expect(Option1).toBeInTheDocument()
      fireEvent.click(Option1)

      fireEvent.click(DetailButton)
      const Option3 = within(HiresContainer).getByText('Assign Work')
      expect(Option3).toBeInTheDocument()
      fireEvent.click(Option3)

      fireEvent.click(DetailButton)
      const Option4 = within(HiresContainer).getByText('View Invoices')
      expect(Option4).toBeInTheDocument()
      fireEvent.click(Option4)

      fireEvent.click(DetailButton)
      const Option5 = within(HiresContainer).getByText('Assign Department')
      expect(Option5).toBeInTheDocument()
      fireEvent.click(Option5)

      fireEvent.click(DetailButton)
      const Option2 = within(HiresContainer).getByText('View Profile')
      expect(Option2).toBeInTheDocument()
      fireEvent.click(Option2)
    })
  })

  it('renders Hires component with unndefined data', async () => {
    initialState.Contracts.contracts[0].hourlyRate = undefined
    initialState.Contracts.contracts[0].freelancerId.category = undefined
    initialState.Contracts.contracts[0].createdAt = undefined

    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${initialState.Business.projectList[0]?._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const hiresTab = within(tabsContainer).getByRole('button', { name: 'Hires' })
    expect(hiresTab).toBeInTheDocument()
    fireEvent.click(hiresTab)
  })

  it('renders Hires component without hires data', async () => {
    initialState.Contracts.contracts = undefined

    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)
    expect(mockRouterPush).toHaveBeenCalledWith(`projects/details/${initialState.Business.projectList[0]?._id}`)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const hiresTab = within(tabsContainer).getByRole('button', { name: 'Hires' })
    expect(hiresTab).toBeInTheDocument()
    fireEvent.click(hiresTab)
  })

  it('renders dashboard Projects and verify invites data', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const SelectProject = initialState.Business.projectList[0]
    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvitesTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(InvitesTab).toBeInTheDocument()
    fireEvent.click(InvitesTab)

    initialState.Lists.invitesList[0]?.listEntries.forEach(list => {
      const InviteContainer = screen.getByTestId(`${list?._id}_invite`)
      expect(InviteContainer).toBeInTheDocument()

      const projectImage = within(InviteContainer).getByRole('img')
      expect(projectImage).toBeInTheDocument()
      expect(projectImage).toHaveAttribute('src', list?.freelancerId?.userId?.profileImage)
      expect(projectImage).toHaveAttribute('width', '65px')
      expect(projectImage).toHaveAttribute('height', '65px')

      const FreelancerName = ConverterUtils.capitalize(
        `${list?.freelancerId?.userId?.FirstName} ${list?.freelancerId?.userId?.LastName}`
      )
      expect(within(InviteContainer).getByText(FreelancerName)).toBeInTheDocument()
      expect(within(InviteContainer).getByText(list?.freelancerId?.category)).toBeInTheDocument()
      expect(within(InviteContainer).getByText(list?.freelancerId?.userId?.AddressLineCountry)).toBeInTheDocument()
      expect(
        within(InviteContainer).getByText(list?.freelancerId?.rate > 0 ? '$' + list?.freelancerId?.rate : 'Negotiable')
      ).toBeInTheDocument()

      const ViewProfileButton = within(InviteContainer).getByRole('button', { name: 'View Profile' })
      expect(ViewProfileButton).toBeInTheDocument()
      expect(within(InviteContainer).getByText(`${list.freelancerId?.likeTotal}`)).toBeInTheDocument()

      list.freelancerId.freelancerSkills.forEach(skill => {
        const SkillsContainer = within(InviteContainer).getByTestId(`${list._id}_skills`)
        expect(SkillsContainer).toBeInTheDocument()

        expect(within(SkillsContainer).getByText(skill?.skill)).toBeInTheDocument()

        fireEvent.click(ViewProfileButton)
      })
    })
  })

  it('verify Invites card with undefined data', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Lists.invitesList[0].listEntries[0].freelancerId.userId.profileImage = undefined
    initialState.Lists.invitesList[0].listEntries[0].freelancerId.userId.AddressLineCountry = undefined
    initialState.Lists.invitesList[0].listEntries[0].freelancerId.rate = undefined
    initialState.Lists.invitesList[0].listEntries[0].freelancerId.freelancerSkills = []
    initialState.Lists.invitesList[0].listEntries[0].freelancerId.likeTotal = undefined
    initialState.Lists.invitesList[0].listEntries[0].freelancerId.userId.FirstName = undefined

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvitesTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(InvitesTab).toBeInTheDocument()
    fireEvent.click(InvitesTab)
  })

  it('verify Invites Card without invites data', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Lists.invitesList[0].listEntries = []

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvitesTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(InvitesTab).toBeInTheDocument()
    fireEvent.click(InvitesTab)

    const InviteFreelancerButton = screen.getByRole('button', { name: 'Invite Freelancer' })
    expect(InviteFreelancerButton).toBeInTheDocument()
    fireEvent.click(InviteFreelancerButton)
  })

  it('renders dashboard Projects and verify invites data for freelancer role on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user = FREELANCER_AUTH

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvitesTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(InvitesTab).toBeInTheDocument()
    fireEvent.click(InvitesTab)

    initialState.ListEntries.userListEntries.forEach(invitation => {
      const InviteContainer = screen.getByTestId(`${invitation?._id}_mobile_freelancer_invite`)
      expect(InviteContainer).toBeInTheDocument()

      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}_name`)).toHaveTextContent(
        invitation?.businessId?.name
      )
      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}_country`)).toHaveTextContent(
        invitation?.businessId?.businessCountry
      )

      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}description`)).toHaveTextContent(
        invitation?.businessId?.description
      )

      const ViewProject = within(InviteContainer).getByRole('button', { name: 'VIEW PROJECT' })
      expect(ViewProject).toBeInTheDocument()
      expect(within(InviteContainer).getByTestId(`${invitation?.businessId?._id}_likeTotal`)).toHaveTextContent(
        `${invitation?.businessId?.likeTotal ?? 0}`
      )

      invitation?.businessId?.requiredSkills?.forEach(skill => {
        const SkillsContainer = within(InviteContainer).getByTestId(`required_skill`)
        expect(SkillsContainer).toHaveTextContent(skill)
      })
      fireEvent.click(ViewProject)
    })
  })

  it('renders dashboard Projects and verify invites data for freelancer role on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user = FREELANCER_AUTH

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvitesTab = within(tabsContainer).getByRole('button', { name: 'Invites' })
    expect(InvitesTab).toBeInTheDocument()
    fireEvent.click(InvitesTab)

    initialState.ListEntries.userListEntries.forEach(invitation => {
      const InviteContainer = screen.getByTestId(`${invitation?._id}_mobile_freelancer_invite`)
      expect(InviteContainer).toBeInTheDocument()

      const NameElement = within(InviteContainer).getByTestId(`${invitation?.businessId?._id}_name`)

      expect(NameElement).toHaveTextContent(invitation?.businessId?.name)

      fireEvent.click(NameElement)
    })
  })

  it('Verify loading component in Add Tas Model and hide modal by clicking cancel button', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Loading.loading = true
    initialState.Auth.user = FREELANCER_AUTH

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvoicesTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    expect(InvoicesTab).toBeInTheDocument()

    await fireEvent.click(InvoicesTab)

    const InvoiceView = screen.getByTestId('single_week_invoice')
    expect(InvoiceView).toBeInTheDocument()

    const MondayInvoice = screen.getByTestId('Monday_invoice')
    expect(MondayInvoice).toBeInTheDocument()

    fireEvent.click(MondayInvoice)

    const AddTaskIcon = screen.getByTestId(`Monday_add_task_icon`)
    expect(AddTaskIcon).toBeInTheDocument()
    fireEvent.click(AddTaskIcon)

    const TaskModalContainer = screen.getByTestId('mobile_add_tasks')
    expect(TaskModalContainer).toBeInTheDocument()

    const BackButton = within(TaskModalContainer).getByRole('button', { name: 'BACK' })
    expect(BackButton).toBeInTheDocument()

    fireEvent.click(BackButton)
  })

  it('add tasks to invoice from tasks modal with success 200 response', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user = FREELANCER_AUTH

    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvoicesTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    expect(InvoicesTab).toBeInTheDocument()

    await fireEvent.click(InvoicesTab)

    const InvoiceView = screen.getByTestId('single_week_invoice')
    expect(InvoiceView).toBeInTheDocument()

    const MondayInvoice = screen.getByTestId('Monday_invoice')
    expect(MondayInvoice).toBeInTheDocument()

    fireEvent.click(MondayInvoice)

    const AddTaskIcon = screen.getByTestId(`Monday_add_task_icon`)
    expect(AddTaskIcon).toBeInTheDocument()
    fireEvent.click(AddTaskIcon)

    const TaskModalContainer = screen.getByTestId('mobile_add_tasks')
    expect(TaskModalContainer).toBeInTheDocument()

    expect(within(TaskModalContainer).getByText('Select a ticket')).toBeInTheDocument()
    expect(within(TaskModalContainer).getByText('Start typing to select an assigned task')).toBeInTheDocument()

    const autocomplete = screen.getByTestId('autocomplete')
    expect(autocomplete).toBeInTheDocument()

    const TaskNameField = within(autocomplete).getByTestId('task_name')
    expect(TaskNameField).toBeInTheDocument()

    autocomplete.focus()
    autocomplete.click()
    TaskNameField.focus()
    fireEvent.change(TaskNameField, { target: { value: 'new Task Name' } })

    const AddButton = within(TaskModalContainer).getByRole('button', { name: 'Add' })
    expect(AddButton).toBeInTheDocument()
    fireEvent.click(AddButton)

    expect(within(TaskModalContainer).getByText('new Task Name')).toBeInTheDocument()

    autocomplete.click()
    autocomplete.focus()
    fireEvent.change(TaskNameField, { target: { value: 'new task 2' } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.click(AddButton)
    expect(within(TaskModalContainer).getByText('new task 2')).toBeInTheDocument()

    const DeleteTask1 = within(TaskModalContainer).getByTestId('delete_task_1')
    fireEvent.click(DeleteTask1)

    autocomplete.click()
    autocomplete.focus()

    fireEvent.change(TaskNameField, { target: { value: 'Task 2' } })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })
    fireEvent.click(screen.getAllByText('Task 2')[0])

    fireEvent.keyDown(TaskNameField, { key: 'Enter' })
    fireEvent.keyDown(TaskNameField, { key: 'ArrowDown' })

    const newTaskName = 'Task 2ss'

    autocomplete.click()
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
  })

  it('renders dashboard Projects and change week from dropdownoptions', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Auth.user = FREELANCER_AUTH
    renderWithRedux(<Projects />, { initialState })

    const ProjectsContainer = screen.getByTestId('view_mobile_projects')
    expect(ProjectsContainer).toBeInTheDocument()

    const ProjectName = within(ProjectsContainer).getByText(initialState.Business.projectList[0]?.name)
    fireEvent.click(ProjectName.parentElement)

    renderWithRedux(<ProjectDetails />, { initialState })

    const tabsContainer = screen.getByTestId('desktop_project_detail_tabs')

    const InvoicesTab = within(tabsContainer).getByRole('button', { name: 'Invoices' })
    expect(InvoicesTab).toBeInTheDocument()
    fireEvent.click(InvoicesTab)

    const WeekOptionsDropDown = screen.getByTestId('timesheet_week_options')
    expect(WeekOptionsDropDown).toBeInTheDocument()
    fireEvent.change(WeekOptionsDropDown, { target: { value: '1' } })

    fireEvent.change(WeekOptionsDropDown, { target: { value: '0' } })
  })
})
