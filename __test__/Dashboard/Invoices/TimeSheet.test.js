import React from 'react'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom' // for the toBeInTheDocument matcher
import { fireEvent, screen, act, within, render } from '@testing-library/react'

import { INVOICES } from '../../store/Invoices'

import { initialState } from '../../store/mockInitialState'
import { renderWithRedux } from '../../store/commonTestSetup'
import { ValidationUtils, ConverterUtils } from '../../../utils'
import Timesheet from '../../../components/unzipped/dashboard/project/Timesheet'

import { createTask, getTasks } from '../../../redux/Tasks/actions'
import { createTaskHour, updateTaskHour } from '../../../redux/TaskHours/actions'
import { getProjectsList, updateBusiness, getBusinessById } from '../../../redux/Business/actions'
import { getInvoices, updateInvoice, createInvoice, addInvoiceTasks } from '../../../redux/Invoices/actions'

jest.mock('axios')

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
        status: 200
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
        status: 200
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
})
