import React from 'react'
import { useRouter } from 'next/router'
import { faker } from '@faker-js/faker'
import '@testing-library/jest-dom' // for the toBeInTheDocument matcher
import { fireEvent, screen, act, within, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { nextPublicGithubClientId } from '../../../config/keys'
import { prettyDOM } from '@testing-library/dom'

import { initialState } from '../../store/mockInitialState'
import { renderWithRedux } from '../../store/commonTestSetup'
import { projectTypeOptions } from '../../../components/unzipped/CreateABusiness/wizard/step-one'
import CreateBusiness from '../../../pages/create-your-business'
import {
  updateBusinessForm,
  createBusiness,
  businessFieldsValidation,
  setProjectFiles,
  updateWizardSubmission
} from '../../../redux/Business/actions'
import { ConverterUtils } from '../../../utils'
import { getUserById } from '../../../redux/Auth/actions'

jest.useFakeTimers() // Enable fake timers

const _ = require('lodash')

jest.mock('axios')

global.URL.createObjectURL = jest.fn(() => 'mocked-url')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../../redux/Business/actions', () => ({
  ...jest.requireActual('../../../redux/Business/actions'),
  updateBusinessForm: jest.fn(data => {
    return {
      type: 'UPDATE_BUSINESS_FORM',
      payload: { data }
    }
  }),
  createBusiness: jest.fn(),
  businessFieldsValidation: jest.fn(data => ({
    type: 'SET_IS_BUSINESS_FIELD_SUBMITTED',
    payload: { data }
  })),
  setProjectFiles: jest.fn(data => ({
    type: 'SET_PROJECT_FILES',
    payload: { data }
  })),
  updateWizardSubmission: jest.fn(data => ({
    type: 'UPDATE_WIZARD_SUBMISSION',
    payload: { data }
  }))
}))

jest.mock('../../../redux/Auth/actions', () => ({
  ...jest.requireActual('../../../redux/Auth/actions'),
  getUserById: jest.fn()
}))

describe('Freelancers Component', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    initialState.Loading.loading = false
    initialState.Business.loading = false
    initialState.Auth.token = 'testToken'
    updateBusinessForm.mockReturnValue((dispatch, getState) => {
      return {
        status: 200
      }
    })
    // updateBusinessForm.mockImplementation(data => async (dispatch, getState) => {
    //   initialState.Business.businessForm = { ...initialState.Business.businessForm, ...data }
    //   // initialState.Business.businessForm.projectType = data.projectType

    //   dispatch({
    //     type: 'UPDATE_BUSINESS_FORM',
    //     payload: { ...data }
    //   })
    // })
    createBusiness.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    businessFieldsValidation.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    setProjectFiles.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getUserById.mockReturnValue(() => {
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

  it('renders create business page and click on cancel', async () => {
    await act(async () => {
      await renderWithRedux(<CreateBusiness />, { initialState })
    })

    const BusinessCard = screen.getByTestId('desktop_card')
    expect(BusinessCard).toBeInTheDocument()

    const StepOne = BusinessCard.querySelector('#step_1')
    expect(StepOne).toBeInTheDocument()

    const NextButton = within(StepOne).getByRole('button', { name: 'Next' })
    expect(NextButton).toBeInTheDocument()
    expect(NextButton).toBeDisabled()

    const CancelButton = within(StepOne).getByRole('button', { name: 'Cancel' })
    expect(CancelButton).toBeInTheDocument()
    expect(CancelButton).toBeEnabled()

    fireEvent.click(CancelButton)
  })

  it('renders create business page and input values to fields', async () => {
    await act(async () => {
      await renderWithRedux(<CreateBusiness />, { initialState })
    })

    let BusinessCard = screen.getByTestId('desktop_card')

    const projectImage = within(BusinessCard).getByRole('img')
    expect(projectImage).toBeInTheDocument()
    expect(projectImage).toHaveAttribute('src', '/img/Unzipped-Primary-Logo.png')
    expect(projectImage).toHaveAttribute('width', '200px')

    //   Step One
    //   Verify step one header text
    const StepOne = BusinessCard.querySelector('#step_1')

    const NextButton = within(StepOne).getByRole('button', { name: 'Next' })
    expect(NextButton).toBeInTheDocument()
    expect(NextButton).toBeDisabled()

    const CancelButton = within(StepOne).getByRole('button', { name: 'Cancel' })
    expect(CancelButton).toBeInTheDocument()
    expect(CancelButton).toBeEnabled()

    expect(StepOne).toHaveTextContent('Are you looking to hire for a long term hire')
    expect(StepOne).toHaveTextContent('We’ll help you get started based on your business needs.')

    //   Verify project type options and checked options
    const payload = { projectType: null }

    const Option1 = StepOne.querySelector(`#${ConverterUtils.convertText('Long Term Collaboration')}`)

    initialState.Business.businessForm.projectType = 'Long Term Collaboration'
    initialState.Business.businessForm.isFieldSubmitted = true
    // payload.projectType = 'Long Term Collaboration'

    fireEvent.click(Option1)
    expect(updateBusinessForm).toHaveBeenCalled()
    initialState.Business.businessForm.stage = 2

    expect(NextButton).toBeEnabled()
    fireEvent.click(NextButton)

    //   End Step 1

    //   Step Two
    //   Verify step one header text
    const StepTwo = BusinessCard.querySelector('#step_2')
    expect(StepTwo).toBeInTheDocument()

    const StepTwoNextButton = within(StepTwo).getByRole('button', { name: 'Next' })
    expect(StepTwoNextButton).toBeInTheDocument()
    expect(StepTwoNextButton).toBeDisabled()

    const BackButton = within(StepTwo).getByRole('button', { name: 'BACK' })
    expect(StepTwoNextButton).toBeInTheDocument()
    expect(BackButton).toBeInTheDocument()

    expect(StepTwo).toHaveTextContent('Project Name')
    expect(StepTwo).toHaveTextContent('Describe your project in as few words as possible')

    const NameField = within(StepTwo).getByTestId('projectName')
    expect(NameField).toBeInTheDocument()
    fireEvent.click(NameField)
    fireEvent.focus(NameField)
    initialState.Business.businessForm.name = 'Test'
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(NameField, { target: { value: 'Test' } })
    expect(StepTwoNextButton).toBeEnabled()

    fireEvent.click(StepTwoNextButton)
    expect(within(StepTwo).getByText('Please enter atleast 10 character')).toBeInTheDocument()

    fireEvent.click(NameField)
    fireEvent.focus(NameField)

    initialState.Business.businessForm.name = 'Test Project name'
    initialState.Business.businessForm.isFieldSubmitted = false

    fireEvent.change(NameField, { target: { value: 'Test Project name' } })

    expect(updateBusinessForm).toHaveBeenCalled()

    initialState.Business.businessForm.stage = 3

    expect(StepTwoNextButton).toBeEnabled()
    fireEvent.click(StepTwoNextButton)

    //   End Step Two

    //   Start Step Three

    let StepThree = BusinessCard.querySelector('#step_3')
    expect(StepThree).toBeInTheDocument()

    let StepThreeNextButton = within(StepThree).getByRole('button', { name: 'Next' })
    expect(StepThreeNextButton).toBeInTheDocument()
    expect(StepThreeNextButton).toBeDisabled()

    expect(StepThree).toHaveTextContent('Role Description')
    expect(StepThree).toHaveTextContent('Envision your ideal hire. What role will they play in your ongoing projects?')

    let RoleField = within(StepThree).getByTestId('role')
    expect(RoleField).toBeInTheDocument()
    fireEvent.click(RoleField)
    fireEvent.focus(RoleField)
    let role = faker.string.alpha(10)
    initialState.Business.businessForm.role = role
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(RoleField, { target: { value: role } })

    expect(RoleField.value).toBe(role)

    expect(StepThreeNextButton).toBeEnabled()

    fireEvent.click(StepThreeNextButton)
    expect(within(StepThree).getByText('Please enter atleast 200 character')).toBeInTheDocument()

    role = faker.string.alpha(200)

    fireEvent.focus(RoleField)
    initialState.Business.businessForm.role = role
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(RoleField, { target: { value: role } })

    expect(RoleField.value).toBe(role)

    expect(updateBusinessForm).toHaveBeenCalled()

    initialState.Business.businessForm.stage = 4

    expect(StepThreeNextButton).toBeEnabled()
    fireEvent.click(StepThreeNextButton)

    //   End Step Three

    //   Start Step Four

    const StepFour = BusinessCard.querySelector('#step_4')
    expect(StepFour).toBeInTheDocument()

    const StepFourNextButton = within(StepFour).getByRole('button', { name: 'Next' })
    expect(StepFourNextButton).toBeInTheDocument()
    expect(StepFourNextButton).toBeDisabled()

    expect(StepFour).toHaveTextContent('Team Dynamics')
    expect(StepFour).toHaveTextContent(
      'Tell us about the team they’ll join. What’s the culture and rhythm within your company?'
    )

    const DynamicField = within(StepFour).getByTestId('teamDynamics')
    expect(DynamicField).toBeInTheDocument()
    fireEvent.click(DynamicField)
    fireEvent.focus(DynamicField)
    let dynamicFieldValue = faker.string.alpha(10)
    initialState.Business.businessForm.teamDynamics = dynamicFieldValue
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(DynamicField, { target: { value: dynamicFieldValue } })

    expect(DynamicField.value).toBe(dynamicFieldValue)

    expect(updateBusinessForm).toHaveBeenCalled()

    initialState.Business.businessForm.stage = 5
    expect(StepFourNextButton).toBeEnabled()

    fireEvent.click(StepFourNextButton)

    //   End Step 4

    //   Start Step 5

    let StepFive = BusinessCard.querySelector('#step_5')
    expect(StepFive).toBeInTheDocument()

    let StepFiveNextButton = within(StepFive).getByRole('button', { name: 'Next' })
    expect(StepFiveNextButton).toBeInTheDocument()
    expect(StepFiveNextButton).toBeDisabled()

    expect(StepFive).toHaveTextContent('Required Expertise')
    expect(StepFive).toHaveTextContent(
      'What skills should they have mastered? List the abilities needed for your project (ex. React, AWS, SQL).'
    )

    const SkillsField = within(StepFive).getByTestId('skills')
    expect(SkillsField).toBeInTheDocument()
    fireEvent.click(SkillsField)
    fireEvent.focus(SkillsField)
    let skill = faker.string.alpha(5)
    let requiredSkills = [skill]
    initialState.Business.businessForm.requiredSkills = requiredSkills
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(SkillsField, { target: { value: skill } })

    fireEvent.keyDown(SkillsField, { key: 'Enter', code: 'Enter' })

    expect(Array.isArray(initialState.Business.businessForm.requiredSkills)).toBe(true)
    expect(initialState.Business.businessForm.requiredSkills).toEqual(requiredSkills)
    expect(initialState.Business.businessForm.requiredSkills).toEqual(expect.arrayContaining(requiredSkills))
    expect(updateBusinessForm).toHaveBeenCalled()

    requiredSkills.push(faker.string.alpha(5))
    initialState.Business.businessForm.requiredSkills = requiredSkills
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(SkillsField, { target: { value: skill } })

    const AddButton = within(StepFive).getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)
    expect(initialState.Business.businessForm.requiredSkills).toEqual(expect.arrayContaining(requiredSkills))

    initialState.Business.businessForm.stage = 6
    expect(StepFiveNextButton).toBeEnabled()

    fireEvent.click(StepFiveNextButton)
    //   End Step 5

    //   Start Step 6

    const StepSix = BusinessCard.querySelector('#step_6')
    expect(StepSix).toBeInTheDocument()

    const StepSixNextButton = within(StepSix).getByRole('button', { name: 'Next' })
    expect(StepSixNextButton).toBeInTheDocument()
    expect(StepSixNextButton).toBeDisabled()

    expect(StepSix).toHaveTextContent('Project Goals or Role Expectations')
    expect(StepSix).toHaveTextContent('Chart out the milestones. What achievements should be celebrated along the way?')

    const GoalsField = within(StepSix).getByTestId('goals')
    expect(GoalsField).toBeInTheDocument()
    fireEvent.click(GoalsField)
    fireEvent.focus(GoalsField)
    const Goal = faker.string.alpha(5)
    initialState.Business.businessForm.goals = Goal
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(GoalsField, { target: { value: Goal } })

    expect(GoalsField.value).toBe(Goal)

    expect(updateBusinessForm).toHaveBeenCalled()

    initialState.Business.businessForm.stage = 7
    expect(StepSixNextButton).toBeEnabled()

    fireEvent.click(StepSixNextButton)
    //   End Step 6

    //   Start Step 7

    const StepSeven = BusinessCard.querySelector('#step_7')
    expect(StepSeven).toBeInTheDocument()

    const StepSevenNextButton = within(StepSeven).getByRole('button', { name: 'Next' })
    expect(StepSevenNextButton).toBeInTheDocument()
    expect(StepSevenNextButton).toBeDisabled()

    expect(StepSeven).toHaveTextContent('Company Background')
    expect(StepSeven).toHaveTextContent(
      `Every great story has a setting. What's the backdrop of your company or venture?`
    )

    const BackGroundField = within(StepSeven).getByTestId('companyBackground')
    expect(BackGroundField).toBeInTheDocument()
    fireEvent.click(BackGroundField)
    fireEvent.focus(BackGroundField)
    const Background = faker.string.alpha(5)
    initialState.Business.businessForm.companyBackground = Background
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(BackGroundField, { target: { value: Background } })

    expect(BackGroundField.value).toBe(Background)

    expect(updateBusinessForm).toHaveBeenCalled()

    initialState.Business.businessForm.stage = 8
    expect(StepSevenNextButton).toBeEnabled()

    fireEvent.click(StepSevenNextButton)

    //   End Step 7

    //   Start Step 8

    const StepEight = BusinessCard.querySelector('#step_8')
    expect(StepEight).toBeInTheDocument()

    const StepEightNextButton = within(StepEight).getByRole('button', { name: 'Next' })
    expect(StepEightNextButton).toBeInTheDocument()
    expect(StepEightNextButton).toBeDisabled()

    expect(StepEight).toHaveTextContent('Budget')
    expect(StepEight).toHaveTextContent(`What size budget are you comfortable with for this hire?`)

    const BudgetField = within(StepEight).getByRole('combobox')
    expect(BudgetField).toBeInTheDocument()

    fireEvent.focus(BudgetField)
    fireEvent.keyDown(BudgetField, { key: 'ArrowDown', code: 'ArrowDown' })

    const Option = screen.getByText('Skilled ($25 - $50)')
    expect(Option).toBeInTheDocument()
    initialState.Business.businessForm.budgetRange = 'Skilled ($25 - $50)'
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.click(Option)
    fireEvent.change(BudgetField, { target: { value: 'Skilled ($25 - $50)' } })

    expect(updateBusinessForm).toHaveBeenCalled()

    initialState.Business.businessForm.stage = 9
    expect(StepEightNextButton).toBeEnabled()

    fireEvent.click(StepEightNextButton)

    //   End Step 8

    //   Start Step 9

    const StepNine = BusinessCard.querySelector('#step_9')
    expect(StepNine).toBeInTheDocument()

    const StepNineNextButton = within(StepNine).getByRole('button', { name: 'Next' })
    expect(StepNineNextButton).toBeInTheDocument()
    expect(StepNineNextButton).toBeDisabled()

    expect(StepNine).toHaveTextContent('Questions for Potential Hires')
    expect(StepNine).toHaveTextContent(`What questions do you have for potential hires? (max three)`)

    const QuestionsField = within(StepNine).getByTestId('questionsToAsk')
    expect(QuestionsField).toBeInTheDocument()
    fireEvent.focus(QuestionsField)

    let question = faker.string.alpha(5)
    let questionsToAsk = [question]

    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(QuestionsField, { target: { value: question } })
    fireEvent.keyDown(QuestionsField, { key: 'Enter', code: 'Enter' })

    expect(within(StepNine).getByText('Please enter atleast 10 character')).toBeInTheDocument()

    fireEvent.focus(QuestionsField)
    question = faker.string.alpha(12)
    questionsToAsk = [question]
    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(QuestionsField, { target: { value: question } })

    fireEvent.keyDown(QuestionsField, { key: 'Enter', code: 'Enter' })

    expect(Array.isArray(initialState.Business.businessForm.questionsToAsk)).toBe(true)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(questionsToAsk)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(expect.arrayContaining(questionsToAsk))
    expect(updateBusinessForm).toHaveBeenCalled()

    question = faker.string.alpha(12)
    questionsToAsk.push(faker.string.alpha(12))
    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(QuestionsField, { target: { value: question } })

    const AddQuestionButton = within(StepNine).getByRole('button', { name: 'Add' })
    fireEvent.click(AddQuestionButton)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(expect.arrayContaining(questionsToAsk))

    initialState.Business.businessForm.stage = 10
    expect(StepNineNextButton).toBeEnabled()

    fireEvent.click(StepNineNextButton)
    //   End Step 9

    //   Start Step 10

    const StepTen = BusinessCard.querySelector('#step_10')
    expect(StepTen).toBeInTheDocument()

    const StepTenNextButton = within(StepTen).getByRole('button', { name: 'Next' })
    expect(StepTenNextButton).toBeInTheDocument()

    expect(StepTen).toHaveTextContent('Project Image')
    expect(StepTen).toHaveTextContent(
      `Upload a photo here to represent your project. This will display in the projects section of your profile.`
    )

    const uploadImageContainer = within(StepTen).getByTestId('project_images')
    expect(uploadImageContainer).toBeInTheDocument()

    fireEvent.click(uploadImageContainer)

    const file1 = new File(['dummy content 1'], 'image3.jpeg', {
      lastModified: 1709931523553,
      name: 'image3.jpeg',
      size: 11068,
      type: 'image/jpeg',
      webkitRelativePath: ''
    })
    const file2 = new File(['dummy content 1'], 'image3.jpeg', {
      lastModified: 1709931523553,
      name: 'image3.jpeg',
      size: 11068,
      type: 'image/jpeg',
      webkitRelativePath: ''
    })

    const dropzone = uploadImageContainer.querySelector('.dropzone input')
    initialState.Business.files = [file1, file2]
    initialState.Business.businessForm.isFieldSubmitted = true

    await act(async () => {
      await userEvent.upload(dropzone, [file1, file2])
    })

    initialState.Business.businessForm.stage = 11
    fireEvent.click(StepTenNextButton)

    //   End Step 10

    //   Start Step 11
    const StepEleven = BusinessCard.querySelector('#step_11')
    expect(StepEleven).toBeInTheDocument()

    const StepElevenNextButton = within(StepEleven).getByRole('button', { name: 'Next' })
    expect(StepElevenNextButton).toBeInTheDocument()

    expect(StepEleven).toHaveTextContent('Do you currently have a github account?')
    expect(StepEleven).toHaveTextContent(
      `Connect your project to github so you can immidiately begin hiring developers and creating your project.`
    )

    const GithubButton = within(StepEleven).getByRole('button', { name: 'CONNECT YOUR GITHUB ACCOUNT' })
    expect(GithubButton).toBeInTheDocument()

    fireEvent.click(GithubButton)

    expect(mockRouterPush).toHaveBeenCalledWith(
      `https://github.com/login/oauth/authorize?client_id=${nextPublicGithubClientId}&scope=user:email`
    )

    initialState.Business.businessForm.stage = 12
    fireEvent.click(StepElevenNextButton)

    //   End Step 11

    // let ReviewProject = BusinessCard.querySelector('#review_project')
    // expect(ReviewProject).toBeInTheDocument()

    // const ReviewDetailContainer = ReviewProject.querySelector('#project_detail')
    // expect(ReviewDetailContainer).toBeInTheDocument()

    // const BusinessData = initialState.Business.businessForm
    // expect(ReviewDetailContainer).toHaveTextContent(BusinessData.name)
    // expect(ReviewDetailContainer).toHaveTextContent(BusinessData.projectType)
    // expect(ReviewDetailContainer).toHaveTextContent(BusinessData.role || BusinessData.challenge)

    // let RequirementsContainer = ReviewProject.querySelector('#project_requirements')
    // expect(RequirementsContainer).toBeInTheDocument()

    // BusinessData.requiredSkills?.forEach(skill => {
    //   expect(RequirementsContainer).toHaveTextContent(skill)
    // })
    // if (BusinessData?.teamDynamics) {
    //   const TeamDynamicContainer = ReviewProject.querySelector('#team_dynamics')
    //   expect(TeamDynamicContainer).toHaveTextContent(BusinessData.teamDynamics)
    // }
    // if (BusinessData?.goals) {
    //   const GoalsContainer = ReviewProject.querySelector('#goals')
    //   expect(GoalsContainer).toHaveTextContent(BusinessData.goals)
    // }
    // if (BusinessData?.companyBackground) {
    //   const BackgroundContainer = ReviewProject.querySelector('#company_background')
    //   expect(BackgroundContainer).toHaveTextContent(BusinessData.companyBackground)
    // }

    // const BudgetContainer = ReviewProject.querySelector('#budget')
    // expect(BudgetContainer).toHaveTextContent(BusinessData.budgetRange)

    // const QuestionContainer = ReviewProject.querySelector('#interview_questions')
    // BusinessData.questionsToAsk?.forEach(question => {
    //   expect(QuestionContainer).toHaveTextContent(question)
    // })

    // let EditDetail = within(ReviewDetailContainer).getByText('Edit')
    // expect(EditDetail).toBeInTheDocument()
    // await act(async () => {
    //   initialState.Business.businessForm.stage = 3

    //   await fireEvent.click(EditDetail)
    // })
    // expect(updateBusinessForm).toHaveBeenCalled()

    // await setTimeout(() => {
    //   StepThree = BusinessCard.querySelector('#step_3')
    //   expect(StepThree).toBeInTheDocument()

    //   StepThreeNextButton = within(StepThree).getByRole('button', { name: 'Next' })
    //   expect(StepThreeNextButton).toBeEnabled()
    //   expect(StepThreeNextButton).toBeInTheDocument()

    //   RoleField = within(StepThree).getByTestId('role')
    //   expect(RoleField).toBeInTheDocument()
    //   fireEvent.click(RoleField)
    //   fireEvent.focus(RoleField)
    //   initialState.Business.businessForm.isFieldSubmitted = true

    //   expect(RoleField.value).toBe(initialState.Business.businessForm.role)

    //   expect(StepThreeNextButton).toBeEnabled()

    //   initialState.Business.businessForm.stage = 12

    //   fireEvent.click(StepThreeNextButton)

    //   // expect(RequirementsContainer).toBeInTheDocument()
    //   // EditDetail = within(RequirementsContainer).getByText('Edit')
    //   // expect(EditDetail).toBeInTheDocument()
    //   // initialState.Business.businessForm.stage = 5

    //   // fireEvent.click(EditDetail)

    //   // StepFive = BusinessCard.querySelector('#step_5')
    //   // expect(StepFive).toBeInTheDocument()

    //   // StepFiveNextButton = within(StepFive).getByRole('button', { name: 'Next' })
    //   // expect(StepFiveNextButton).toBeEnabled()
    //   // expect(StepFiveNextButton).toBeInTheDocument()

    //   // expect(Array.isArray(initialState.Business.businessForm.requiredSkills)).toBe(true)
    //   // expect(initialState.Business.businessForm.requiredSkills).toEqual(requiredSkills)
    //   // expect(initialState.Business.businessForm.requiredSkills).toEqual(expect.arrayContaining(requiredSkills))
    //   // expect(updateBusinessForm).toHaveBeenCalled()

    //   // initialState.Business.businessForm.requiredSkills?.forEach(skill => {
    //   //   expect(StepFive).toHaveTextContent(skill)
    //   // })
    // }, 0)

    // await setTimeout(() => {
    //  RequirementsContainer = ReviewProject.querySelector('#project_requirements')

    //   expect(RequirementsContainer).toBeInTheDocument()
    //   EditDetail = within(RequirementsContainer).getByText('Edit')
    //   expect(EditDetail).toBeInTheDocument()
    //   initialState.Business.businessForm.stage = 5

    //   fireEvent.click(EditDetail)

    //   StepFive = BusinessCard.querySelector('#step_52')
    //   expect(StepFive).toBeInTheDocument()

    //   StepFiveNextButton = within(StepFive).getByRole('button', { name: 'Next22' })
    //   expect(StepFiveNextButton).toBeEnabled()
    //   expect(StepFiveNextButton).toBeInTheDocument()

    //   expect(Array.isArray(initialState.Business.businessForm.requiredSkills)).toBe(true)
    //   expect(initialState.Business.businessForm.requiredSkills).toEqual(requiredSkills)
    //   expect(initialState.Business.businessForm.requiredSkills).toEqual(expect.arrayContaining(requiredSkills))
    //   expect(updateBusinessForm).toHaveBeenCalled()

    //   initialState.Business.businessForm.requiredSkills?.forEach(skill => {
    //     expect(StepFive).toHaveTextContent(skill)
    //   })
    // }, 1)
  })

  it('renders create business page and Edit Project detail section', async () => {
    jest.useFakeTimers()
    console.log('startTest', performance.now())
    initialState.Business.businessForm.stage = 12

    await act(async () => {
      await renderWithRedux(<CreateBusiness />, { initialState })
    })

    await act(async () => {
      jest.advanceTimersByTime(2000) // Move the timers forward by 2 seconds
    })

    let BusinessCard = screen.getByTestId('desktop_card')

    let ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    initialState.Business.businessForm.stage = 5
    initialState.Business.businessForm.isFieldSubmitted = true
    initialState.Business.businessForm.desc = 'truetruetruetrue'

    const ReviewDetailContainer = ReviewProject.querySelector('#project_requirements')
    expect(ReviewDetailContainer).toBeInTheDocument()

    let EditDetail = within(ReviewDetailContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(EditDetail)
    })

    expect(updateBusinessForm).toHaveBeenCalled()

    const Card = screen.getByTestId('desktop_card')
    expect(Card).toBeInTheDocument()
    await act(async () => {
      jest.advanceTimersByTime(2000) // Move the timers forward by 2 seconds
    })
    await act(async () => {
      fireEvent.click(EditDetail)
    })
    console.log('stateee', initialState.Business.businessForm)
    const StepThree = Card.querySelector('#step_5')
    console.log('StepThree', prettyDOM(StepThree))
    expect(StepThree).toBeInTheDocument()
    jest.useRealTimers()
  })
})
