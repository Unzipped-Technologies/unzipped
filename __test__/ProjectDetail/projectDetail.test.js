import React from 'react'
import { useRouter } from 'next/router'
import '@testing-library/jest-dom' // for the toBeInTheDocument matcher

import { ConverterUtils } from '../../utils'
import ProjectDetail, { SubmitButton } from '../../pages/projects/[id]'
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'

import { SELECTED_BUSIESS } from '../store/Business'
import { fireEvent, screen, act, within, render } from '@testing-library/react'
import { getBusinessById } from '../../redux/Business/actions'
import { verifyUserStripeAccount } from '../../redux/Stripe/actions'
import { countClientContracts } from '../../redux/Contract/actions'
import { createProjectApplication } from '../../redux/ProjectApplications/actions'

const _ = require('lodash') // Or const _ = require('underscore');

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

jest.mock('../../redux/Business/actions', () => ({
  ...jest.requireActual('../../redux/Business/actions'),
  getBusinessById: jest.fn()
}))
jest.mock('../../redux/Stripe/actions', () => ({
  ...jest.requireActual('../../redux/Stripe/actions'),
  verifyUserStripeAccount: jest.fn()
}))

jest.mock('../../redux/Contract/actions', () => ({
  ...jest.requireActual('../../redux/Contract/actions'),
  countClientContracts: jest.fn()
}))

jest.mock('../../redux/ProjectApplications/actions', () => ({
  ...jest.requireActual('../../redux/ProjectApplications/actions'),
  createProjectApplication: jest.fn()
}))

describe('DesktopAccount Component', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    initialState.Business.selectedBusiness = _.cloneDeep(SELECTED_BUSIESS)
    initialState.Loading.loading = false
    initialState.ProjectApplications.success = false

    getBusinessById.mockReturnValue(() => {
      return {
        status: 200,
        getBusiness: SELECTED_BUSIESS
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

    createProjectApplication.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    mockRouterPush = jest.fn()
    mockRouterBack = jest.fn()

    useRouter.mockImplementation(() => ({
      query: { id: initialState.Business?.selectedBusiness?._id },
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

  it('renders Project Detail page', async () => {
    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
  })
  it('renders Project Detail page and verify project detail header content', async () => {
    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
    const headerContainer = screen.getByTestId('project_detail_header')
    expect(within(headerContainer).getByText(/PROJECT/i)).toBeInTheDocument()
    // Verify project name
    expect(within(headerContainer).getByText(initialState.Business.selectedBusiness?.name)).toBeInTheDocument()

    // verify submit button
    expect(within(headerContainer).getByRole('button', { name: 'SUBMIT APPLICATION' })).toBeInTheDocument()
  })

  it('renders Project Detail page and verify tabs', async () => {
    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
    const tabsContainer = screen.getByTestId('project_detail_tabs')

    // Verify Project Detail Tabs
    const detailTab = within(tabsContainer).getByRole('button', { name: 'Details' })
    expect(detailTab).toBeInTheDocument()

    await act(async () => {
      await fireEvent.click(detailTab)
    })
  })

  it('renders Project Detail page and verify project detail is displaying correctly', async () => {
    const projectDetail = initialState.Business.selectedBusiness
    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })

    const projectDetailContainer = screen.getByTestId('desktop_project_detail')

    expect(within(projectDetailContainer).getByText('Project Hires')).toBeInTheDocument()
    expect(within(projectDetailContainer).getByText(`Budget: $${projectDetail?.budgetRange}`)).toBeInTheDocument()
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
  })

  it('renders Project Detail page and verify client detail is displaying correctly', async () => {
    const projectDetail = initialState.Business.selectedBusiness
    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })

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
  })

  it('renders Project Detail page and verify - display if data not available', async () => {
    initialState.Business.selectedBusiness = {}
    initialState.Business.selectedBusiness.projectBudgetType = 'Hourly Rate'
    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
    const projectDetailContainer = screen.getByTestId('desktop_project_detail')

    expect(within(projectDetailContainer).getByText(/per Hour/i)).toBeInTheDocument()
  })

  it('renders Project Detail page without _id of first image', async () => {
    initialState.Business.selectedBusiness.projectImagesUrl[0]._id = undefined
    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
  })

  it('renders Project Detail page client projects count to 5', async () => {
    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
    const projectDetailContainer = screen.getByTestId('desktop_project_detail')
    expect(within(projectDetailContainer).getByText('Completed 5 projects'))
  })

  it('renders Project Detail page client projects count to 0', async () => {
    countClientContracts.mockReturnValue(() => {
      return {
        status: 200,
        data: {
          count: undefined
        }
      }
    })

    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
    const projectDetailContainer = screen.getByTestId('desktop_project_detail')
    expect(within(projectDetailContainer).getByText('Completed 0 projects'))
  })

  it('renders Project Detail page without project detail', async () => {
    initialState.Business.selectedBusiness = undefined

    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
    expect(screen.getByText('Project Not Found')).toBeInTheDocument()
  })

  it('renders Project Detail page loading', async () => {
    initialState.Loading.loading = true

    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
    expect(screen.getByText(/Connect. Build. /i)).toBeInTheDocument()
  })

  it('renders Project Detail with stripe verification error', async () => {
    verifyUserStripeAccount.mockReturnValue(() => {
      return {
        status: 400
      }
    })

    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
  })

  it('renders Project Detail with count contracts error', async () => {
    countClientContracts.mockReturnValue(() => {
      return {
        status: 400
      }
    })

    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
  })

  it('renders Project Detail page and verify apply form rendering correctly', async () => {
    const projectDetail = initialState.Business.selectedBusiness

    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })

    const ApplyFormContainer = screen.getByTestId('project_apply_form')
    expect(ApplyFormContainer).toBeInTheDocument()

    expect(within(ApplyFormContainer).getByText('Apply to this project')).toBeInTheDocument()
    expect(
      within(ApplyFormContainer).getByText(
        'You will be able to edit your application until the client has interacted with it.'
      )
    ).toBeInTheDocument()
    expect(within(ApplyFormContainer).getByText('Desired Rate')).toBeInTheDocument()
    expect(within(ApplyFormContainer).getByTestId('desired_rate')).toBeInTheDocument()

    expect(within(ApplyFormContainer).getByText('Cover Letter')).toBeInTheDocument()
    expect(within(ApplyFormContainer).getByTestId('cover_letter')).toBeInTheDocument()

    expect(
      within(ApplyFormContainer).getByText('Would you like to highlight any of these projects to the client?')
    ).toBeInTheDocument()

    expect(within(ApplyFormContainer).getByText(projectDetail.questionsToAsk[0].question)).toBeInTheDocument()
    expect(within(ApplyFormContainer).getByText(projectDetail.questionsToAsk[1].question)).toBeInTheDocument()
    expect(within(ApplyFormContainer).getByText(projectDetail.questionsToAsk[2].question)).toBeInTheDocument()
  })

  it('renders Project Detail page and submit application ', async () => {
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

    const FormSubmitButton = within(ApplyFormContainer).getByTestId('submit_from_form')
    expect(FormSubmitButton).toBeInTheDocument()

    fireEvent.click(FormSubmitButton)

    const HeaderContainer = screen.getByTestId('project_detail_header')
    const HeaderSubmitButton = within(HeaderContainer).getByRole('button', { name: 'SUBMIT APPLICATION' })
    fireEvent.click(HeaderSubmitButton)

    initialState.ProjectApplications.success = true

    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
  })

  test('renders with active styles when active prop is true', () => {
    render(<SubmitButton active>Submit</SubmitButton>)
  })

  //  Mobile View Test
  it('renders Project Detail page on mobile view', async () => {
    const projectDetail = initialState.Business.selectedBusiness

    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })

    const mobileDetailContainer = screen.getByTestId('mobile_project_detail')
    expect(mobileDetailContainer).toBeInTheDocument()

    expect(within(mobileDetailContainer).getByText(`Budget: $${projectDetail?.budgetRange}`)).toBeInTheDocument()
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
  })

  it('renders Project Detail page on mobile view and verify client detail is displaying correctly', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const projectDetail = initialState.Business.selectedBusiness
    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })

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
  })

  it('renders Project Detail page on mobile view and verify - display if data not available', async () => {
    initialState.Business.selectedBusiness = {}
    initialState.Business.selectedBusiness.projectBudgetType = 'Hourly Rate'
    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
  })

  it('renders Project Detail page on mobileview without _id of first image', async () => {
    initialState.Business.selectedBusiness.projectImagesUrl[0]._id = undefined
    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })
  })

  it('renders Project Detail page on mobile view and verify apply form rendering correctly', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    const projectDetail = initialState.Business.selectedBusiness

    await act(async () => {
      renderWithRedux(<ProjectDetail />, { initialState })
    })

    const ApplyFormContainer = screen.getByTestId('project_apply_form')
    expect(ApplyFormContainer).toBeInTheDocument()

    expect(within(ApplyFormContainer).getByText('Apply to this project')).toBeInTheDocument()
    expect(
      within(ApplyFormContainer).getByText(
        'You will be able to edit your application until the client has interacted with it.'
      )
    ).toBeInTheDocument()
    expect(within(ApplyFormContainer).getByText('Desired Rate')).toBeInTheDocument()
    expect(within(ApplyFormContainer).getByTestId('desired_rate')).toBeInTheDocument()

    expect(within(ApplyFormContainer).getByText('Cover Letter')).toBeInTheDocument()
    expect(within(ApplyFormContainer).getByTestId('cover_letter')).toBeInTheDocument()

    expect(
      within(ApplyFormContainer).getByText('Would you like to highlight any of these projects to the client?')
    ).toBeInTheDocument()

    expect(within(ApplyFormContainer).getByText(projectDetail.questionsToAsk[0].question)).toBeInTheDocument()
    expect(within(ApplyFormContainer).getByText(projectDetail.questionsToAsk[1].question)).toBeInTheDocument()
    expect(within(ApplyFormContainer).getByText(projectDetail.questionsToAsk[2].question)).toBeInTheDocument()
  })
})
