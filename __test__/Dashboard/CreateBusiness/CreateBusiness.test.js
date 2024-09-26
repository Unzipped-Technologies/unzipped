import React from 'react'
import thunk from 'redux-thunk'
import { useRouter } from 'next/router'
import { faker } from '@faker-js/faker'
import configureMockStore from 'redux-mock-store'
import { renderWithRedux } from '../../store/commonTestSetup'
import { fireEvent, screen, act, within } from '@testing-library/react'

import { ConverterUtils } from '../../../utils'
import userEvent from '@testing-library/user-event'
import { initialState } from '../../store/mockInitialState'
import { parseCookies } from '../../../services/cookieHelper'
import { nextPublicGithubClientId } from '../../../config/keys'
import { createBusiness } from '../../../redux/Business/actions'
import CreateBusiness from '../../../pages/create-your-business/index'
import { BUSINESS_FORM, WIZARD_SUBMISSION } from '../../store/Business'
import CreateABusiness from '../../../components/unzipped/CreateABusiness'

const _ = require('lodash')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('axios')

global.URL.createObjectURL = jest.fn(() => 'mocked-url')

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../../redux/Business/actions', () => ({
  ...jest.requireActual('../../../redux/Business/actions'),

  createBusiness: jest.fn()
}))

// Mock the parseCookies function
jest.mock('../../../services/cookieHelper', () => ({
  parseCookies: jest.fn()
}))

describe('CreateBusiness Component', () => {
  let mockRouterPush, mockRouterBack
  let store

  beforeEach(() => {
    initialState.Loading.loading = false
    initialState.Business.loading = false
    initialState.Auth.token = 'testToken'
    initialState.Business.wizardSubmission.isSuccessfull = false

    global.innerWidth = 2560
    global.dispatchEvent(new Event('resize'))

    createBusiness.mockReturnValue(() => {
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

    store = mockStore(initialState)
    store.clearActions()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('should return the token from cookies', async () => {
    const mockToken = 'mock-token'

    parseCookies.mockReturnValue({ token: mockToken })

    const req = { headers: { cookie: 'token=mock-token' } }
    const res = {}

    const result = await CreateBusiness.getInitialProps({ req, res })

    expect(result).toEqual({ token: { token: mockToken } })
  })

  it('should render the component', () => {
    renderWithRedux(<CreateBusiness />, { initialState })
    expect(screen.getByTestId('desktop_card')).toBeInTheDocument()
  })
  /*
  Business Form with Long Term Collaboration for Desktop
*/

  // Start Step One
  it('render step one with short term business on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

    const projectImage = within(BusinessCard).getByRole('img')
    expect(projectImage).toBeInTheDocument()
    expect(projectImage).toHaveAttribute('src', '/img/Unzipped-Primary-Logo.png')
    expect(projectImage).toHaveAttribute('width', '200px')

    const StepOne = BusinessCard.querySelector('#step_1')

    const NextButton = within(StepOne).getByRole('button', { name: 'Next' })
    expect(NextButton).toBeInTheDocument()
    expect(NextButton).toBeDisabled()

    const CancelButton = within(StepOne).getByRole('button', { name: 'Cancel' })
    expect(CancelButton).toBeInTheDocument()
    expect(CancelButton).toBeEnabled()

    expect(StepOne).toHaveTextContent('Are you looking to hire for a long term hire')
    expect(StepOne).toHaveTextContent('We’ll help you get started based on your business needs.')

    const Option1 = StepOne.querySelector(`#${ConverterUtils.convertText('Long Term Collaboration')}`)

    initialState.Business.businessForm.projectType = 'Long Term Collaboration'
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.click(Option1)

    expect(NextButton).toBeEnabled()
    initialState.Business.businessForm.stage = 2
    fireEvent.click(NextButton)
  })
  //   End Step One

  // Start Step Two
  it('render step one with short term business on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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

    let name = faker.string.alpha(500)

    initialState.Business.businessForm.name = name
    initialState.Business.businessForm.isFieldSubmitted = false

    fireEvent.change(NameField, { target: { value: name } })
    fireEvent.keyDown(NameField, { key: 'Delete', code: 'Delete' })
    fireEvent.keyDown(NameField, { key: 'Backspace', code: 'Backspace' })
    fireEvent.keyDown(NameField, { key: 'Enter', code: 'Enter' })

    name = faker.string.alpha(500)

    initialState.Business.businessForm.name = name
    initialState.Business.businessForm.isFieldSubmitted = false

    fireEvent.change(NameField, { target: { value: name } })

    initialState.Business.businessForm.stage = 3

    expect(StepTwoNextButton).toBeEnabled()
    fireEvent.click(StepTwoNextButton)
  })
  //   End Step Two

  // Start Step Three
  it('render step one with short term business on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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

    initialState.Business.businessForm.stage = 4

    expect(StepThreeNextButton).toBeEnabled()
    fireEvent.click(StepThreeNextButton)
  })
  //   End Step Three

  // Start Step Four
  it('render step one with short term business on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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

    initialState.Business.businessForm.stage = 5
    expect(StepFourNextButton).toBeEnabled()

    fireEvent.click(StepFourNextButton)
  })
  //   End Step Four

  // Start Step Five
  it('render step one with short term business on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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

    skill = faker.string.alpha(5)

    requiredSkills.push(skill)
    initialState.Business.businessForm.requiredSkills = requiredSkills
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(SkillsField, { target: { value: skill } })

    const AddButton = within(StepFive).getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)
    expect(initialState.Business.businessForm.requiredSkills).toEqual(expect.arrayContaining(requiredSkills))

    const DeleteSkill = StepFive.querySelector(`#${skill}_1`)
    fireEvent.click(DeleteSkill)

    initialState.Business.businessForm.stage = 6
    expect(StepFiveNextButton).toBeEnabled()

    fireEvent.click(StepFiveNextButton)
  })
  //   End Step Five

  // Start Step Six
  it('render step one with short term business on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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

    initialState.Business.businessForm.stage = 7
    expect(StepSixNextButton).toBeEnabled()

    fireEvent.click(StepSixNextButton)
  })
  //   End Step Six

  // Start Step Seven
  it('render step one with short term business on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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

    initialState.Business.businessForm.stage = 8
    expect(StepSevenNextButton).toBeEnabled()

    fireEvent.click(StepSevenNextButton)
  })
  //   End Step Seven

  // Start Step Eight
  it('render step one with short term business on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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

    expect(StepEightNextButton).toBeEnabled()

    fireEvent.click(within(StepEight).getByRole('button', { name: 'BACK' }))

    initialState.Business.businessForm.stage = 9

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
  })
  //   End Step Eight

  // Start Step Nine
  it('render step one with short term business on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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
    fireEvent.keyDown(QuestionsField, { key: 'Delete', code: 'Delete' })

    expect(Array.isArray(initialState.Business.businessForm.questionsToAsk)).toBe(true)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(questionsToAsk)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(expect.arrayContaining(questionsToAsk))

    question = faker.string.alpha(2)
    questionsToAsk.push(question)

    fireEvent.change(QuestionsField, { target: { value: question } })

    const AddQuestionButton = within(StepNine).getByRole('button', { name: 'Add' })
    fireEvent.click(AddQuestionButton)

    question = faker.string.alpha(250)
    questionsToAsk.push(question)

    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(QuestionsField, { target: { value: question } })
    fireEvent.keyDown(QuestionsField, { key: 'Shift', code: 'Shift' })

    fireEvent.click(AddQuestionButton)

    const DeleteQuestion = StepNine.querySelector(`#${question}_icon`)
    fireEvent.click(DeleteQuestion)

    initialState.Business.businessForm.questionsToAsk = initialState.Business.businessForm.questionsToAsk.filter(
      (question, index) => index !== 1
    )
    initialState.Business.businessForm.isFieldSubmitted = true

    question = faker.string.alpha(12)
    questionsToAsk = [question]

    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(QuestionsField, { target: { value: question } })

    fireEvent.keyDown(QuestionsField, { key: 'Shift', code: 'Shift' })

    expect(initialState.Business.businessForm.questionsToAsk).toEqual(expect.arrayContaining(questionsToAsk))

    initialState.Business.businessForm.stage = 10
    expect(StepNineNextButton).toBeEnabled()

    fireEvent.click(StepNineNextButton)
  })
  //   End Step Nine

  // Start Step Ten
  it('render step one with short term business on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

    let StepTen = BusinessCard.querySelector('#step_10')
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
    const fileName = faker.string.alpha(45)
    const file2 = new File(['dummy content 2'], `${fileName}.jpeg`, {
      lastModified: 1709931523553,
      name: `${fileName}.jpeg`,
      size: 11068,
      type: 'image/jpeg',
      webkitRelativePath: ''
    })

    const file3 = new File(['dummy content 2'], '', {
      lastModified: 1709931523553,
      name: '',
      size: 11068,
      type: 'image/jpeg',
      webkitRelativePath: ''
    })

    const dropzone = uploadImageContainer.querySelector('.dropzone input')
    initialState.Business.files = [file1, file2, file3]
    initialState.Business.businessForm.isFieldSubmitted = true

    await act(async () => {
      await userEvent.upload(dropzone, [file1, file2])
    })

    const DeleteImage = within(StepTen).getByTestId(`${file1.name}_icon`)
    expect(DeleteImage).toBeInTheDocument()
    fireEvent.click(DeleteImage)

    initialState.Business.businessForm.stage = 11
    fireEvent.click(StepTenNextButton)
  })
  //   End Step Ten

  // Start Step Eleven
  it('render step one with short term business on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

    let StepEleven = BusinessCard.querySelector('#step_11')
    expect(StepEleven).toBeInTheDocument()

    fireEvent.click(within(StepEleven).getByRole('button', { name: 'Skip' }))
    fireEvent.click(screen.getByRole('button', { name: 'BACK' }))

    StepEleven = BusinessCard.querySelector('#step_11')

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
  })
  //   End Step Eleven

  it('renders create business page and verify input details for business', async () => {
    useRouter.mockReturnValue({
      query: { 'github-connect': 'true' },
      pathname: `/create-your-business?github-connect=true`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

    let ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const ReviewDetailContainer = ReviewProject.querySelector('#project_detail')
    expect(ReviewDetailContainer).toBeInTheDocument()

    const BusinessData = initialState.Business.businessForm
    expect(ReviewDetailContainer).toHaveTextContent(BusinessData.name)
    expect(ReviewDetailContainer).toHaveTextContent(BusinessData.projectType)
    expect(ReviewDetailContainer).toHaveTextContent(BusinessData.role || BusinessData.challenge)

    let RequirementsContainer = ReviewProject.querySelector('#project_requirements')
    expect(RequirementsContainer).toBeInTheDocument()

    const RequiredSkills = RequirementsContainer.querySelector('#required_skills')
    expect(RequiredSkills).toBeInTheDocument()

    BusinessData.requiredSkills?.forEach(skill => {
      expect(RequiredSkills).toHaveTextContent(skill)
    })
    if (BusinessData?.teamDynamics) {
      const TeamDynamicContainer = ReviewProject.querySelector('#team_dynamics')
      expect(TeamDynamicContainer).toHaveTextContent(BusinessData.teamDynamics)
    }
    if (BusinessData?.goals) {
      const GoalsContainer = ReviewProject.querySelector('#goals')
      expect(GoalsContainer).toHaveTextContent(BusinessData.goals)
    }
    if (BusinessData?.companyBackground) {
      const BackgroundContainer = ReviewProject.querySelector('#company_background')
      expect(BackgroundContainer).toHaveTextContent(BusinessData.companyBackground)
    }

    const BudgetContainer = ReviewProject.querySelector('#budget')
    expect(BudgetContainer).toHaveTextContent(BusinessData.budgetRange)

    const QuestionContainer = ReviewProject.querySelector('#interview_questions')
    expect(QuestionContainer).toBeInTheDocument()

    BusinessData.questionsToAsk?.forEach(question => {
      const Question = QuestionContainer.querySelector(`#${question}`)
      expect(Question).toHaveTextContent(question)
    })

    const ImagesContainer = ReviewProject.querySelector('#project_images')
    expect(ImagesContainer).toBeInTheDocument()

    initialState.Business.files.forEach((file, index) => {
      expect(within(ImagesContainer).getByTestId(`${file.name}_${index}`)).toBeInTheDocument()
    })

    const GitInfoContainer = ReviewProject.querySelector('#github_info')
    expect(GitInfoContainer).toBeInTheDocument()

    const projectImage = within(GitInfoContainer).getByRole('img')
    expect(projectImage).toBeInTheDocument()
    expect(projectImage).toHaveAttribute('src', initialState.Auth.thirdPartyDetails?.avatarUrl)
    expect(within(GitInfoContainer).getByText(initialState.Auth.thirdPartyDetails?.userName)).toBeInTheDocument()
  })

  it('renders create business page and Edit Project detail section', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('desktop_card')

    const ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const ReviewDetailContainer = ReviewProject.querySelector('#project_detail')
    expect(ReviewDetailContainer).toBeInTheDocument()

    const EditDetail = within(ReviewDetailContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })
    const StepThree = BusinessCard.querySelector('#step_3')
    expect(StepThree).toBeInTheDocument()

    const StepThreeNextButton = within(StepThree).getByRole('button', { name: 'Next' })
    expect(StepThreeNextButton).toBeEnabled()
    expect(StepThreeNextButton).toBeInTheDocument()

    const RoleField = within(StepThree).getByTestId('role')
    expect(RoleField).toBeInTheDocument()

    fireEvent.click(RoleField)
    fireEvent.focus(RoleField)

    initialState.Business.businessForm.isFieldSubmitted = true

    expect(RoleField.value).toBe(initialState.Business.businessForm.role)

    expect(StepThreeNextButton).toBeEnabled()

    fireEvent.click(StepThreeNextButton)

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(BusinessCard.querySelector('#review_project')).toBeInTheDocument()
  })

  it('renders create business page and Edit Project Requirements section', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('desktop_card')

    const RequirementContainer = BusinessCard.querySelector('#project_requirements')
    expect(RequirementContainer).toBeInTheDocument()

    const EditDetail = within(RequirementContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })
    const StepFive = BusinessCard.querySelector('#step_5')
    expect(StepFive).toBeInTheDocument()

    const StepFiveNextButton = within(StepFive).getByRole('button', { name: 'Next' })
    expect(StepFiveNextButton).toBeEnabled()
    expect(StepFiveNextButton).toBeInTheDocument()

    const SkillsField = within(StepFive).getByTestId('skills')
    expect(SkillsField).toBeInTheDocument()
    fireEvent.focus(SkillsField)
    let skill = faker.string.alpha(5)
    initialState.Business.businessForm.requiredSkills.push(skill)
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(SkillsField, { target: { value: skill } })

    fireEvent.keyDown(SkillsField, { key: 'Enter', code: 'Enter' })

    initialState.Business.businessForm.requiredSkills?.forEach(skill => {
      expect(StepFive).toHaveTextContent(skill)
    })

    fireEvent.click(StepFiveNextButton)

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(BusinessCard.querySelector('#review_project')).toBeInTheDocument()
  })

  it('renders create business page and Edit Team Dynamics section', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('desktop_card')

    const DynamicContainer = BusinessCard.querySelector('#team_dynamics')
    expect(DynamicContainer).toBeInTheDocument()

    const EditDetail = within(DynamicContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })
    const StepFour = BusinessCard.querySelector('#step_4')
    expect(StepFour).toBeInTheDocument()

    const StepFourNextButton = within(StepFour).getByRole('button', { name: 'Next' })
    expect(StepFourNextButton).toBeEnabled()
    expect(StepFourNextButton).toBeInTheDocument()

    const DynamicField = within(StepFour).getByTestId('teamDynamics')
    expect(DynamicField).toBeInTheDocument()
    fireEvent.focus(DynamicField)

    let dynamicFieldValue = faker.string.alpha(10)
    initialState.Business.businessForm.teamDynamics = dynamicFieldValue
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(DynamicField, { target: { value: dynamicFieldValue } })

    expect(DynamicField.value).toBe(initialState.Business.businessForm.teamDynamics)

    expect(DynamicField.value).toBe(dynamicFieldValue)

    fireEvent.click(StepFourNextButton)

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(BusinessCard.querySelector('#review_project')).toBeInTheDocument()
  })

  it('renders create business page and Edit Project Goals section', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('desktop_card')

    const GoalsContainer = BusinessCard.querySelector('#goals')
    expect(GoalsContainer).toBeInTheDocument()

    const EditDetail = within(GoalsContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })
    const StepSix = BusinessCard.querySelector('#step_6')
    expect(StepSix).toBeInTheDocument()

    const StepSixNextButton = within(StepSix).getByRole('button', { name: 'Next' })
    expect(StepSixNextButton).toBeEnabled()
    expect(StepSixNextButton).toBeInTheDocument()

    const GoalsField = within(StepSix).getByTestId('goals')
    expect(GoalsField).toBeInTheDocument()
    fireEvent.focus(GoalsField)

    const Goal = faker.string.alpha(5)
    initialState.Business.businessForm.goals = Goal
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(GoalsField, { target: { value: Goal } })

    expect(GoalsField.value).toBe(Goal)

    expect(GoalsField.value).toBe(initialState.Business.businessForm.goals)

    fireEvent.click(StepSixNextButton)

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(BusinessCard.querySelector('#review_project')).toBeInTheDocument()
  })

  it('renders create business page and Edit Company Background section', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('desktop_card')

    const BackgroundContainer = BusinessCard.querySelector('#company_background')
    expect(BackgroundContainer).toBeInTheDocument()

    const EditDetail = within(BackgroundContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })
    const StepSeven = BusinessCard.querySelector('#step_7')
    expect(StepSeven).toBeInTheDocument()

    const StepSevenNextButton = within(StepSeven).getByRole('button', { name: 'Next' })
    expect(StepSevenNextButton).toBeEnabled()
    expect(StepSevenNextButton).toBeInTheDocument()

    const BackGroundField = within(StepSeven).getByTestId('companyBackground')
    expect(BackGroundField).toBeInTheDocument()
    fireEvent.click(BackGroundField)
    fireEvent.focus(BackGroundField)
    const Background = faker.string.alpha(5)
    initialState.Business.businessForm.companyBackground = Background
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(BackGroundField, { target: { value: Background } })

    expect(BackGroundField.value).toBe(Background)

    expect(BackGroundField.value).toBe(initialState.Business.businessForm.companyBackground)

    fireEvent.click(StepSevenNextButton)

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(BusinessCard.querySelector('#review_project')).toBeInTheDocument()
  })

  it('renders create business page and Edit Additional details like Budget', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('desktop_card')

    const AdditionalContainer = BusinessCard.querySelector('#additional_details')
    expect(AdditionalContainer).toBeInTheDocument()

    const EditDetail = within(AdditionalContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })
    const StepEight = BusinessCard.querySelector('#step_8')
    expect(StepEight).toBeInTheDocument()

    const StepEightNextButton = within(StepEight).getByRole('button', { name: 'Next' })
    expect(StepEightNextButton).toBeEnabled()
    expect(StepEightNextButton).toBeInTheDocument()

    const BudgetField = within(StepEight).getByRole('combobox')
    expect(BudgetField).toBeInTheDocument()

    fireEvent.focus(BudgetField)
    fireEvent.keyDown(BudgetField, { key: 'ArrowDown', code: 'ArrowDown' })

    const Option = screen.getByText('Expert ($50 - $70)')
    expect(Option).toBeInTheDocument()

    initialState.Business.businessForm.budgetRange = 'Expert ($50 - $70)'
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.click(Option)
    fireEvent.change(BudgetField, { target: { value: 'Expert ($50 - $70)' } })

    expect(StepEight).toHaveTextContent(initialState.Business.businessForm.budgetRange)

    fireEvent.click(StepEightNextButton)

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(BusinessCard.querySelector('#review_project')).toBeInTheDocument()
  })

  it('renders create business page and click on skip button on company background section', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('desktop_card')

    const DynamicContainer = BusinessCard.querySelector('#company_background')
    expect(DynamicContainer).toBeInTheDocument()

    const EditDetail = within(DynamicContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })
    const StepFour = BusinessCard.querySelector('#step_7')
    expect(StepFour).toBeInTheDocument()

    const SkipButton = within(StepFour).getByRole('button', { name: 'Skip' })
    expect(SkipButton).toBeEnabled()
    expect(SkipButton).toBeInTheDocument()
    fireEvent.click(SkipButton)
  })

  it('renders create business component with submit text button ', async () => {
    renderWithRedux(<CreateABusiness submit />, { initialState })
  })

  it('renders create business component with step 13 ', async () => {
    initialState.Business.businessForm.stage = 13

    renderWithRedux(<CreateBusiness />, { initialState })
  })

  it('renders create business component with guthub connect ', async () => {
    initialState.Business.businessForm.stage = 10

    useRouter.mockReturnValue({
      query: { 'github-connect': 'true' },
      pathname: `/create-your-business?github-connect=true`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<CreateBusiness />, { initialState })

    const NextButton = screen.getByRole('button', { name: 'Next' })
    expect(NextButton).toBeInTheDocument()
    fireEvent.click(NextButton)

    let BusinessCard = screen.getByTestId('desktop_card')

    let ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const BackReviewButton = within(ReviewProject).getByRole('button', { name: 'BACK' })
    expect(BackReviewButton).toBeInTheDocument()

    fireEvent.click(BackReviewButton)

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
  })

  /* 
    Business Form with Short Term Collaborattion
  */

  // Start Step One
  it('render step one with Long Term Collaboration on mobile view', async () => {
    initialState.Business.businessForm = _.cloneDeep(BUSINESS_FORM)
    initialState.Business.wizardSubmission = _.cloneDeep(WIZARD_SUBMISSION)
    initialState.Business.files = []

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

    const StepOne = BusinessCard.querySelector('#step_1')

    const NextButton = within(StepOne).getByRole('button', { name: 'Next' })
    expect(NextButton).toBeInTheDocument()
    expect(NextButton).toBeDisabled()

    const CancelButton = within(StepOne).getByRole('button', { name: 'Cancel' })
    expect(CancelButton).toBeInTheDocument()
    expect(CancelButton).toBeEnabled()

    expect(StepOne).toHaveTextContent('Are you looking to hire for a long term hire')
    expect(StepOne).toHaveTextContent('We’ll help you get started based on your business needs.')

    const Option1 = StepOne.querySelector(`#${ConverterUtils.convertText('Short Term Business')}`)

    initialState.Business.businessForm.projectType = 'Short Term Business'
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.click(Option1)

    expect(NextButton).toBeEnabled()
    initialState.Business.businessForm.stage = 2
    fireEvent.click(NextButton)
  })
  //   End Step One

  // Start Step Two
  it('render step one with Long Term Collaboration on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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

    let name = faker.string.alpha(1000)
    initialState.Business.businessForm.name = name
    initialState.Business.businessForm.isFieldSubmitted = false

    fireEvent.change(NameField, { target: { value: name } })

    name = faker.string.alpha(1000)
    initialState.Business.businessForm.name = name
    initialState.Business.businessForm.isFieldSubmitted = false

    fireEvent.change(NameField, { target: { value: name } })

    initialState.Business.businessForm.stage = 3

    expect(StepTwoNextButton).toBeEnabled()
    fireEvent.click(StepTwoNextButton)
  })
  //   End Step Two

  // Start Step Three
  it('render step one with Long Term Collaboration on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

    let StepThree = BusinessCard.querySelector('#step_3')
    expect(StepThree).toBeInTheDocument()

    let StepThreeNextButton = within(StepThree).getByRole('button', { name: 'Next' })
    expect(StepThreeNextButton).toBeInTheDocument()
    expect(StepThreeNextButton).toBeDisabled()

    expect(StepThree).toHaveTextContent('Describe the project')
    expect(StepThree).toHaveTextContent(`What's the challenge you need to conquer? (in a sentence or two)`)

    let ChallengeField = within(StepThree).getByTestId('challenge')
    expect(ChallengeField).toBeInTheDocument()
    fireEvent.click(ChallengeField)
    fireEvent.focus(ChallengeField)

    let challenge = faker.string.alpha(10)
    initialState.Business.businessForm.challenge = challenge

    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(ChallengeField, { target: { value: challenge } })
    expect(ChallengeField.value).toBe(challenge)

    expect(StepThreeNextButton).toBeEnabled()
    fireEvent.click(StepThreeNextButton)

    expect(within(StepThree).getByText('Please enter atleast 200 character')).toBeInTheDocument()

    challenge = faker.string.alpha(1000)

    fireEvent.focus(ChallengeField)

    initialState.Business.businessForm.challenge = challenge
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(ChallengeField, { target: { value: challenge } })

    challenge = faker.string.alpha(1000)

    fireEvent.focus(ChallengeField)

    initialState.Business.businessForm.challenge = challenge
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(ChallengeField, { target: { value: challenge } })

    fireEvent.keyDown(ChallengeField, { key: 'Enter', code: 'Enter' })
    fireEvent.keyDown(ChallengeField, { key: 'Backspace', code: 'Backspace' })
    fireEvent.keyDown(ChallengeField, { key: 'Delete', code: 'Delete' })

    challenge = faker.string.alpha(1000)

    fireEvent.focus(ChallengeField)

    initialState.Business.businessForm.challenge = challenge
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(ChallengeField, { target: { value: challenge } })

    fireEvent.click(StepThreeNextButton)

    expect(StepThreeNextButton).toBeEnabled()
    initialState.Business.businessForm.stage = 4
    fireEvent.click(StepThreeNextButton)
  })
  //   End Step Three

  // Start Step Four
  it('render step one with Long Term Collaboration on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

    const StepFour = BusinessCard.querySelector('#step_4')
    expect(StepFour).toBeInTheDocument()

    expect(StepFour).toHaveTextContent('What are the specific tasks and objectives for this project')

    const StepFourNextButton = within(StepFour).getByRole('button', { name: 'Next' })
    expect(StepFourNextButton).toBeInTheDocument()

    const TasksField = within(StepFour).getByTestId('tasks')
    expect(TasksField).toBeInTheDocument()
    fireEvent.click(TasksField)
    fireEvent.focus(TasksField)

    let task = faker.string.alpha(5)
    let objectives = [task]
    initialState.Business.businessForm.objectives = objectives
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(TasksField, { target: { value: task } })

    fireEvent.keyDown(TasksField, { key: 'Shift', code: 'Shift' })
    fireEvent.keyDown(TasksField, { key: 'Enter', code: 'Enter' })

    expect(Array.isArray(initialState.Business.businessForm.objectives)).toBe(true)
    expect(initialState.Business.businessForm.objectives).toEqual(objectives)
    expect(initialState.Business.businessForm.objectives).toEqual(expect.arrayContaining(objectives))

    task = faker.string.alpha(5)

    objectives.push(task)
    initialState.Business.businessForm.objectives = objectives
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(TasksField, { target: { value: task } })

    const AddButton = within(StepFour).getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)
    expect(initialState.Business.businessForm.objectives).toEqual(expect.arrayContaining(objectives))

    const DeleteObjective = StepFour.querySelector(`#${task}_1`)
    fireEvent.click(DeleteObjective)

    expect(StepFourNextButton).toBeEnabled()
    initialState.Business.businessForm.stage = 5
    fireEvent.click(StepFourNextButton)
  })
  //   End Step Four

  // Start Step Five
  it('render step one with Long Term Collaboration on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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

    skill = faker.string.alpha(5)

    requiredSkills.push(skill)
    initialState.Business.businessForm.requiredSkills = requiredSkills
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(SkillsField, { target: { value: skill } })

    const AddSkillButton = within(StepFive).getByRole('button', { name: 'Add' })
    fireEvent.click(AddSkillButton)
    expect(initialState.Business.businessForm.requiredSkills).toEqual(expect.arrayContaining(requiredSkills))

    initialState.Business.businessForm.stage = 6
    expect(StepFiveNextButton).toBeEnabled()

    fireEvent.click(StepFiveNextButton)
  })
  //   End Step Five

  // Start Step Six
  it('render step one with Long Term Collaboration on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

    const StepSix = BusinessCard.querySelector('#step_6')
    expect(StepSix).toBeInTheDocument()

    let StepSixNextButton = within(StepSix).getByRole('button', { name: 'Next' })
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

    expect(StepSixNextButton).toBeEnabled()
    initialState.Business.businessForm.stage = 7
    fireEvent.click(StepSixNextButton)
  })
  //   End Step Six

  // Start Step Seven
  it('render step one with Long Term Collaboration on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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

    initialState.Business.businessForm.stage = 8
    expect(StepSevenNextButton).toBeEnabled()

    fireEvent.click(StepSevenNextButton)
  })
  //   End Step Seven

  // Start Step Eight
  it('render step one with Long Term Collaboration on mobile view', async () => {
    useRouter.mockReturnValue({
      query: { 'github-connect': 'true' },
      pathname: `/create-your-business?github-connect=true`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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

    expect(StepEightNextButton).toBeEnabled()

    const BackBudgetButton = within(StepEight).getByRole('button', { name: 'BACK' })
    expect(BackBudgetButton).toBeInTheDocument()

    fireEvent.click(BackBudgetButton)

    initialState.Business.businessForm.stage = 9

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
  })
  //   End Step Eight

  // Start Step Nine
  it('render step one with Long Term Collaboration on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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

    fireEvent.focus(QuestionsField)

    let question = faker.string.alpha(40)
    let questionsToAsk = [question]

    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(QuestionsField, { target: { value: question } })

    fireEvent.keyDown(QuestionsField, { key: 'Enter', code: 'Enter' })

    expect(Array.isArray(initialState.Business.businessForm.questionsToAsk)).toBe(true)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(questionsToAsk)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(expect.arrayContaining(questionsToAsk))

    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(QuestionsField, { target: { value: '' } })

    fireEvent.keyDown(QuestionsField, { key: 'Enter', code: 'Enter' })

    question = faker.string.alpha(400)
    questionsToAsk.push(question)

    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(QuestionsField, { target: { value: question } })

    fireEvent.keyDown(QuestionsField, { key: 'Shift', code: 'Shift' })

    expect(StepNineNextButton).toBeEnabled()

    initialState.Business.businessForm.stage = 10

    fireEvent.click(StepNineNextButton)
  })
  //   End Step Nine

  // Start Step Ten
  it('render step one with Long Term Collaboration on mobile view', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

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
    const file2 = new File(['dummy content 2'], 'image2.jpeg', {
      lastModified: 1709931523553,
      name: 'image2.jpeg',
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

    const DeleteImage = within(StepTen).getByTestId(`${file1.name}_icon`)
    expect(DeleteImage).toBeInTheDocument()
    fireEvent.click(DeleteImage)

    initialState.Business.businessForm.stage = 12
    fireEvent.click(StepTenNextButton)
  })
  //   End Step Ten

  // Start Step Twelve

  it('should update the business form when input changes with short term business', async () => {
    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('desktop_card')

    let ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const BackReviewButton = within(ReviewProject).getByRole('button', { name: 'BACK' })
    expect(BackReviewButton).toBeInTheDocument()

    fireEvent.click(BackReviewButton)

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))

    const CreateProjectButton = screen.getByRole('button', { name: 'CREATE PROJECT' })
    fireEvent.click(CreateProjectButton)
  })
  //   End Step Twelve

  //  Mobile View
  /*
          Step Form with Short Term Business
  */

  //   Step One
  it('render step one with short term business on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Business.businessForm = _.cloneDeep(BUSINESS_FORM)
    initialState.Business.wizardSubmission = _.cloneDeep(WIZARD_SUBMISSION)
    initialState.Business.files = []

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    expect(within(BusinessCard).getByText('Create A Project')).toBeInTheDocument()

    const StepOne = BusinessCard.querySelector('#step_1')

    const NextButton = within(StepOne).getByRole('button', { name: 'Next' })
    expect(NextButton).toBeInTheDocument()
    expect(NextButton).toBeDisabled()

    const CancelButton = within(StepOne).getByRole('button', { name: 'Cancel' })
    expect(CancelButton).toBeInTheDocument()
    expect(CancelButton).toBeEnabled()

    expect(StepOne).toHaveTextContent('Are you looking to hire for a long term hire')

    const Option1 = StepOne.querySelector(`#${ConverterUtils.convertText('Short Term Business')}`)

    initialState.Business.businessForm.projectType = 'Short Term Business'
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.click(Option1)

    expect(NextButton).toBeEnabled()
    initialState.Business.businessForm.stage = 2

    fireEvent.click(NextButton)
  })
  // End Step 1

  // Start Step 2
  it('render step two with short term business on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

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

    fireEvent.change(NameField, { target: { value: 'Test' } })

    initialState.Business.businessForm.name = 'Test'
    initialState.Business.businessForm.isFieldSubmitted = true

    expect(StepTwoNextButton).toBeEnabled()

    fireEvent.click(StepTwoNextButton)
    expect(within(StepTwo).getByText('Please enter atleast 10 character')).toBeInTheDocument()

    let name = faker.string.alpha(1120)

    fireEvent.click(NameField)
    fireEvent.focus(NameField)

    fireEvent.change(NameField, { target: { value: name } })

    fireEvent.keyDown(NameField, { key: 'Delete', code: 'Delete' })
    fireEvent.keyDown(NameField, { key: 'Backspace', code: 'Backspace' })
    fireEvent.keyDown(NameField, { key: 'Enter', code: 'Enter' })

    initialState.Business.businessForm.name = name
    initialState.Business.businessForm.isFieldSubmitted = false

    name = faker.string.alpha(500)

    initialState.Business.businessForm.name = name
    initialState.Business.businessForm.isFieldSubmitted = false

    fireEvent.change(NameField, { target: { value: name } })

    expect(StepTwoNextButton).toBeEnabled()
    initialState.Business.businessForm.stage = 3

    fireEvent.click(StepTwoNextButton)
  })
  // End Step 2

  // Start Step 3
  it('render step three with short term business on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    let StepThree = BusinessCard.querySelector('#mobile_step_3')
    expect(StepThree).toBeInTheDocument()

    expect(StepThree).toHaveTextContent('Describe the project')
    expect(StepThree).toHaveTextContent('What are the specific tasks and objectives for this project')
    expect(StepThree).toHaveTextContent(`What's the challenge you need to conquer? (in a sentence or two)`)

    const StepThreeNextButton = within(StepThree).getByRole('button', { name: 'Next' })
    expect(StepThreeNextButton).toBeInTheDocument()

    let ChallengeField = within(StepThree).getByTestId('challenge')
    expect(ChallengeField).toBeInTheDocument()
    fireEvent.click(ChallengeField)
    fireEvent.focus(ChallengeField)

    let challenge = faker.string.alpha(10)
    initialState.Business.businessForm.challenge = challenge
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(ChallengeField, { target: { value: challenge } })
    expect(ChallengeField.value).toBe(challenge)

    const TasksField = within(StepThree).getByTestId('tasks')
    expect(TasksField).toBeInTheDocument()
    fireEvent.click(TasksField)
    fireEvent.focus(TasksField)
    let task = faker.string.alpha(5)
    let objectives = [task]
    initialState.Business.businessForm.objectives = objectives
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(TasksField, { target: { value: task } })

    fireEvent.keyDown(TasksField, { key: 'Shift', code: 'Shift' })
    fireEvent.keyDown(TasksField, { key: 'Enter', code: 'Enter' })

    expect(Array.isArray(initialState.Business.businessForm.objectives)).toBe(true)
    expect(initialState.Business.businessForm.objectives).toEqual(objectives)
    expect(initialState.Business.businessForm.objectives).toEqual(expect.arrayContaining(objectives))

    task = faker.string.alpha(5)

    objectives.push(task)
    initialState.Business.businessForm.objectives = objectives
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(TasksField, { target: { value: task } })

    const AddButton = within(StepThree).getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)
    expect(initialState.Business.businessForm.objectives).toEqual(expect.arrayContaining(objectives))

    const DeleteObjective = StepThree.querySelector(`#${task}_1`)
    fireEvent.click(DeleteObjective)

    expect(StepThreeNextButton).toBeEnabled()
    fireEvent.click(StepThreeNextButton)

    expect(within(StepThree).getByText('Please enter atleast 200 character')).toBeInTheDocument()

    challenge = faker.string.alpha(1000)

    fireEvent.focus(ChallengeField)
    initialState.Business.businessForm.challenge = challenge
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(ChallengeField, { target: { value: challenge } })

    expect(ChallengeField.value).toBe(challenge)
    fireEvent.click(StepThreeNextButton)

    initialState.Business.businessForm.stage = 4

    expect(StepThreeNextButton).toBeEnabled()
    fireEvent.click(StepThreeNextButton)
  })
  // End Step 3

  // Start Step 4
  it('render step four with short term business on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    let StepFour = BusinessCard.querySelector('#mobile_step_4')
    expect(StepFour).toBeInTheDocument()

    const StepFourNextButton = within(StepFour).getByRole('button', { name: 'Next' })
    expect(StepFourNextButton).toBeInTheDocument()

    const StepFourBackButton = within(StepFour).getByRole('button', { name: 'BACK' })
    expect(StepFourBackButton).toBeInTheDocument()

    let ChallengeField = within(StepFour).getByTestId('challenge')
    expect(ChallengeField).toBeInTheDocument()

    fireEvent.click(ChallengeField)
    fireEvent.focus(ChallengeField)

    let challenge = faker.string.alpha(10)
    initialState.Business.businessForm.challenge = challenge
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(ChallengeField, { target: { value: challenge } })
    expect(ChallengeField.value).toBe(challenge)

    const TasksField = within(StepFour).getByTestId('tasks')
    expect(TasksField).toBeInTheDocument()

    fireEvent.click(TasksField)
    fireEvent.focus(TasksField)

    let task = faker.string.alpha(5)
    let objectives = [task]
    initialState.Business.businessForm.objectives = objectives
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(TasksField, { target: { value: task } })

    fireEvent.keyDown(TasksField, { key: 'Shift', code: 'Shift' })
    fireEvent.keyDown(TasksField, { key: 'Enter', code: 'Enter' })

    expect(Array.isArray(initialState.Business.businessForm.objectives)).toBe(true)
    expect(initialState.Business.businessForm.objectives).toEqual(objectives)
    expect(initialState.Business.businessForm.objectives).toEqual(expect.arrayContaining(objectives))

    task = faker.string.alpha(5)

    objectives.push(task)
    initialState.Business.businessForm.objectives = objectives
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(TasksField, { target: { value: task } })

    const AddButton = within(StepFour).getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)
    expect(initialState.Business.businessForm.objectives).toEqual(expect.arrayContaining(objectives))

    const DeleteObjective = StepFour.querySelector(`#${task}`)
    fireEvent.click(DeleteObjective)

    expect(StepFourNextButton).toBeEnabled()
    fireEvent.click(StepFourNextButton)

    expect(within(StepFour).getByText('Please enter atleast 200 character')).toBeInTheDocument()

    challenge = faker.string.alpha(200)

    fireEvent.focus(ChallengeField)
    initialState.Business.businessForm.challenge = challenge
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(ChallengeField, { target: { value: challenge } })

    expect(ChallengeField.value).toBe(challenge)

    expect(StepFourNextButton).toBeEnabled()
    fireEvent.click(StepFourBackButton)
    initialState.Business.businessForm.stage = 4
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    initialState.Business.businessForm.stage = 5
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
  })
  // End Step 4

  // Start Step 5
  it('render step five with short term business on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    expect(within(BusinessCard).getByText('Create A Project')).toBeInTheDocument()

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

    skill = faker.string.alpha(5)

    requiredSkills.push(skill)
    initialState.Business.businessForm.requiredSkills = requiredSkills
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(SkillsField, { target: { value: skill } })

    const AddSkillsButton = within(StepFive).getByRole('button', { name: 'Add' })
    fireEvent.click(AddSkillsButton)
    expect(initialState.Business.businessForm.requiredSkills).toEqual(expect.arrayContaining(requiredSkills))

    const DeleteSkill = StepFive.querySelector(`#${skill}_1`)
    fireEvent.click(DeleteSkill)

    initialState.Business.businessForm.stage = 6
    expect(StepFiveNextButton).toBeEnabled()

    fireEvent.click(StepFiveNextButton)
  })
  // End Step 5

  // Start Step 6
  it('render step six with short term business on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const StepSix = BusinessCard.querySelector('#step_6')
    expect(StepSix).toBeInTheDocument()

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

    expect(StepSevenNextButton).toBeEnabled()
    initialState.Business.businessForm.stage = 7

    fireEvent.click(StepSevenNextButton)
  })
  // End Step 6

  // Start Step 7
  it('render step seven with short term business on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const StepSeven = BusinessCard.querySelector('#mobile_step_7')
    expect(StepSeven).toBeInTheDocument()

    const GoalsField = within(StepSeven).getByTestId('goals')
    expect(GoalsField).toBeInTheDocument()
    fireEvent.click(GoalsField)
    fireEvent.focus(GoalsField)
    const Goal = faker.string.alpha(5)
    initialState.Business.businessForm.goals = Goal
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(GoalsField, { target: { value: Goal } })

    expect(GoalsField.value).toBe(Goal)

    const StepSevenNextButton = within(StepSeven).getByRole('button', { name: 'Next' })
    expect(StepSevenNextButton).toBeInTheDocument()

    const BackGroundField = within(StepSeven).getByTestId('companyBackground')
    expect(BackGroundField).toBeInTheDocument()
    fireEvent.click(BackGroundField)
    fireEvent.focus(BackGroundField)
    const Background = faker.string.alpha(5)
    initialState.Business.businessForm.companyBackground = Background
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(BackGroundField, { target: { value: Background } })

    expect(BackGroundField.value).toBe(Background)

    expect(StepSevenNextButton).toBeEnabled()
    initialState.Business.businessForm.stage = 8

    fireEvent.click(StepSevenNextButton)
  })
  // End Step 7

  // Start Step 8
  it('render step eight with short term business on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const StepEight = BusinessCard.querySelector('#step_8')
    expect(StepEight).toBeInTheDocument()

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

    question = faker.string.alpha(12)
    questionsToAsk.push(question)
    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(QuestionsField, { target: { value: question } })

    const AddQuestionButton = within(StepNine).getByRole('button', { name: 'Add' })
    fireEvent.click(AddQuestionButton)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(expect.arrayContaining(questionsToAsk))

    const DeleteQuestion = within(StepNine).getByTestId(`${question}`)
    fireEvent.click(DeleteQuestion)

    expect(StepNineNextButton).toBeEnabled()

    fireEvent.click(within(StepNine).getByRole('button', { name: 'BACK' }))
    initialState.Business.businessForm.stage = 9
    fireEvent.click(within(StepNine).getByRole('button', { name: 'Next' }))
  })
  // End Step 8

  // Start Step 9
  it('render step nine with short term business on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const StepNine = BusinessCard.querySelector('#mobile_step_9')
    expect(StepNine).toBeInTheDocument()

    const BudgetField = within(StepNine).getByRole('combobox')
    expect(BudgetField).toBeInTheDocument()

    fireEvent.focus(BudgetField)
    fireEvent.keyDown(BudgetField, { key: 'ArrowDown', code: 'ArrowDown' })

    const Option = screen.getAllByText('Skilled ($25 - $50)')[0]
    expect(Option).toBeInTheDocument()
    initialState.Business.businessForm.budgetRange = 'Skilled ($25 - $50)'
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.click(Option)
    fireEvent.change(BudgetField, { target: { value: 'Skilled ($25 - $50)' } })

    const StepNineNextButton = within(StepNine).getByRole('button', { name: 'Next' })
    expect(StepNineNextButton).toBeInTheDocument()

    const QuestionsField = within(StepNine).getByTestId('questionsToAsk')
    expect(QuestionsField).toBeInTheDocument()
    fireEvent.focus(QuestionsField)

    let question = faker.string.alpha(5)
    let questionsToAsk = [question]

    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(QuestionsField, { target: { value: question } })
    fireEvent.keyDown(QuestionsField, { key: 'Enter', code: 'Enter' })

    const DeleteQuestion = within(StepNine).getByTestId(`${question}`)
    fireEvent.click(DeleteQuestion)

    fireEvent.focus(QuestionsField)
    question = faker.string.alpha(12)
    questionsToAsk = [question]
    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(QuestionsField, { target: { value: question } })

    const AddQuestionButton = within(StepNine).getByRole('button', { name: 'Add' })
    fireEvent.click(AddQuestionButton)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(expect.arrayContaining(questionsToAsk))

    expect(Array.isArray(initialState.Business.businessForm.questionsToAsk)).toBe(true)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(questionsToAsk)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(expect.arrayContaining(questionsToAsk))

    expect(StepNineNextButton).toBeEnabled()

    fireEvent.click(within(StepNine).getByRole('button', { name: 'BACK' }))
    initialState.Business.businessForm.stage = 10
    fireEvent.click(within(StepNine).getByRole('button', { name: 'Next' }))
  })
  // End Step 9

  // Start Step 10
  it('render step eleven with short term business on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

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
  })
  // End Step 10

  it('renders create business page and verify input details for business', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    useRouter.mockReturnValue({
      query: { 'github-connect': 'true' },
      pathname: `/create-your-business?github-connect=true`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')

    let ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const ReviewDetailContainer = ReviewProject.querySelector('#project_detail')
    expect(ReviewDetailContainer).toBeInTheDocument()

    const BusinessData = initialState.Business.businessForm
    expect(ReviewDetailContainer).toHaveTextContent(BusinessData.name)
    expect(ReviewDetailContainer).toHaveTextContent(BusinessData.projectType)
    expect(ReviewDetailContainer).toHaveTextContent(BusinessData.role || BusinessData.challenge)

    let RequirementsContainer = ReviewProject.querySelector('#project_requirements')
    expect(RequirementsContainer).toBeInTheDocument()

    const RequiredSkills = RequirementsContainer.querySelector('#required_skills')
    expect(RequiredSkills).toBeInTheDocument()

    BusinessData.requiredSkills?.forEach(skill => {
      expect(RequiredSkills).toHaveTextContent(skill)
    })
    if (BusinessData?.teamDynamics) {
      const TeamDynamicContainer = ReviewProject.querySelector('#team_dynamics')
      expect(TeamDynamicContainer).toHaveTextContent(BusinessData.teamDynamics)
    }
    if (BusinessData?.goals) {
      const GoalsContainer = ReviewProject.querySelector('#goals')
      expect(GoalsContainer).toHaveTextContent(BusinessData.goals)
    }
    if (BusinessData?.companyBackground) {
      const BackgroundContainer = ReviewProject.querySelector('#company_background')
      expect(BackgroundContainer).toHaveTextContent(BusinessData.companyBackground)
    }

    const BudgetContainer = ReviewProject.querySelector('#budget')
    expect(BudgetContainer).toHaveTextContent(BusinessData.budgetRange)

    const QuestionContainer = ReviewProject.querySelector('#interview_questions')
    expect(QuestionContainer).toBeInTheDocument()

    BusinessData.questionsToAsk?.forEach(question => {
      const Question = QuestionContainer.querySelector(`#${question}`)
      expect(Question).toHaveTextContent(question)
    })

    if (initialState.Business.files?.length) {
      const ImagesContainer = ReviewProject.querySelector('#project_images')
      expect(ImagesContainer).toBeInTheDocument()

      initialState.Business.files.forEach((file, index) => {
        expect(within(ImagesContainer).getByTestId(`${file.name}_${index}`)).toBeInTheDocument()
      })
    }

    const GitInfoContainer = ReviewProject.querySelector('#github_info')
    expect(GitInfoContainer).toBeInTheDocument()

    const projectImage = within(GitInfoContainer).getByRole('img')
    expect(projectImage).toBeInTheDocument()
    expect(projectImage).toHaveAttribute('src', initialState.Auth.thirdPartyDetails?.avatarUrl)
    expect(within(GitInfoContainer).getByText(initialState.Auth.thirdPartyDetails?.userName)).toBeInTheDocument()
  })

  it('renders create business page and Edit Project detail section', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const ReviewDetailContainer = ReviewProject.querySelector('#project_detail')
    expect(ReviewDetailContainer).toBeInTheDocument()

    const EditDetail = within(ReviewDetailContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })

    let StepThree = BusinessCard.querySelector('#mobile_step_3')
    expect(StepThree).toBeInTheDocument()

    expect(StepThree).toHaveTextContent('Describe the project')
    expect(StepThree).toHaveTextContent('What are the specific tasks and objectives for this project')
    expect(StepThree).toHaveTextContent(`What's the challenge you need to conquer? (in a sentence or two)`)

    const StepThreeNextButton = within(StepThree).getByRole('button', { name: 'Next' })
    expect(StepThreeNextButton).toBeInTheDocument()

    let ChallengeField = within(StepThree).getByTestId('challenge')
    expect(ChallengeField).toBeInTheDocument()
    fireEvent.click(ChallengeField)
    fireEvent.focus(ChallengeField)
    let challenge = faker.string.alpha(10)
    initialState.Business.businessForm.challenge = challenge
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(ChallengeField, { target: { value: challenge } })
    expect(ChallengeField.value).toBe(challenge)

    const TasksField = within(StepThree).getByTestId('tasks')
    expect(TasksField).toBeInTheDocument()
    fireEvent.click(TasksField)
    fireEvent.focus(TasksField)
    let task = faker.string.alpha(5)
    let objectives = [task]
    initialState.Business.businessForm.objectives = objectives
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(TasksField, { target: { value: task } })

    fireEvent.keyDown(TasksField, { key: 'Enter', code: 'Enter' })

    expect(Array.isArray(initialState.Business.businessForm.objectives)).toBe(true)
    expect(initialState.Business.businessForm.objectives).toEqual(objectives)
    expect(initialState.Business.businessForm.objectives).toEqual(expect.arrayContaining(objectives))

    task = faker.string.alpha(5)

    objectives.push(task)
    initialState.Business.businessForm.objectives = objectives
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(TasksField, { target: { value: task } })

    const AddButton = within(StepThree).getByRole('button', { name: 'Add' })
    fireEvent.click(AddButton)
    expect(initialState.Business.businessForm.objectives).toEqual(expect.arrayContaining(objectives))

    expect(StepThreeNextButton).toBeEnabled()
    fireEvent.click(StepThreeNextButton)

    expect(within(StepThree).getByText('Please enter atleast 200 character')).toBeInTheDocument()

    challenge = faker.string.alpha(200)

    fireEvent.focus(ChallengeField)
    initialState.Business.businessForm.challenge = challenge
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(ChallengeField, { target: { value: challenge } })

    expect(ChallengeField.value).toBe(challenge)
    fireEvent.click(StepThreeNextButton)

    expect(StepThreeNextButton).toBeEnabled()
    fireEvent.click(StepThreeNextButton)

    fireEvent.click(StepThreeNextButton)

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(BusinessCard.querySelector('#review_project')).toBeInTheDocument()
  })

  it('renders create business page and Edit Skills section', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const ReviewDetailContainer = ReviewProject.querySelector('#project_requirements')
    expect(ReviewDetailContainer).toBeInTheDocument()

    const EditDetail = within(ReviewDetailContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })

    let StepFive = BusinessCard.querySelector('#step_5')
    expect(StepFive).toBeInTheDocument()

    let StepFiveNextButton = within(StepFive).getByRole('button', { name: 'Next' })
    expect(StepFiveNextButton).toBeInTheDocument()

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

    skill = faker.string.alpha(5)

    requiredSkills.push(skill)
    initialState.Business.businessForm.requiredSkills = requiredSkills
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(SkillsField, { target: { value: skill } })

    const AddSkillsButton = within(StepFive).getByRole('button', { name: 'Add' })
    fireEvent.click(AddSkillsButton)
    expect(initialState.Business.businessForm.requiredSkills).toEqual(expect.arrayContaining(requiredSkills))

    expect(StepFiveNextButton).toBeEnabled()

    fireEvent.click(StepFiveNextButton)

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(BusinessCard.querySelector('#review_project')).toBeInTheDocument()
  })

  it('renders create business page and Edit Goals section', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const ReviewDetailContainer = ReviewProject.querySelector('#goals')
    expect(ReviewDetailContainer).toBeInTheDocument()

    const EditDetail = within(ReviewDetailContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })

    let StepFive = BusinessCard.querySelector('#step_6')
    expect(StepFive).toBeInTheDocument()

    const StepSix = BusinessCard.querySelector('#step_6')
    expect(StepSix).toBeInTheDocument()

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

    const StepSeven = BusinessCard.querySelector('#step_7')
    expect(StepSeven).toBeInTheDocument()

    const StepSevenNextButton = within(StepSeven).getByRole('button', { name: 'Next' })
    expect(StepSevenNextButton).toBeInTheDocument()

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

    expect(StepSevenNextButton).toBeEnabled()

    fireEvent.click(StepSevenNextButton)

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(BusinessCard.querySelector('#review_project')).toBeInTheDocument()
  })

  it('renders create business page and Edit Company Background section', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const ReviewDetailContainer = ReviewProject.querySelector('#company_background')
    expect(ReviewDetailContainer).toBeInTheDocument()

    const EditDetail = within(ReviewDetailContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })

    const StepSix = BusinessCard.querySelector('#step_7')
    expect(StepSix).toBeInTheDocument()

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

    const StepSeven = BusinessCard.querySelectorAll('#step_7')[1]
    expect(StepSeven).toBeInTheDocument()

    const StepSevenNextButton = within(StepSeven).getByRole('button', { name: 'Next' })
    expect(StepSevenNextButton).toBeInTheDocument()

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

    expect(StepSevenNextButton).toBeEnabled()

    fireEvent.click(StepSevenNextButton)

    fireEvent.click(StepSevenNextButton)
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(BusinessCard.querySelector('#review_project')).toBeInTheDocument()
  })

  it('renders create business page and Edit Budget section', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const ReviewDetailContainer = ReviewProject.querySelector('#additional_details')
    expect(ReviewDetailContainer).toBeInTheDocument()

    const EditDetail = within(ReviewDetailContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })

    const StepEight = BusinessCard.querySelector('#step_8')
    expect(StepEight).toBeInTheDocument()

    expect(StepEight).toHaveTextContent('Budget')
    expect(StepEight).toHaveTextContent(`What size budget are you comfortable with for this hire?`)

    const BudgetField = within(StepEight).getByRole('combobox')
    expect(BudgetField).toBeInTheDocument()

    fireEvent.focus(BudgetField)
    fireEvent.keyDown(BudgetField, { key: 'ArrowDown', code: 'ArrowDown' })

    const Option = screen.getAllByText('Skilled ($25 - $50)')[0]
    expect(Option).toBeInTheDocument()
    initialState.Business.businessForm.budgetRange = 'Skilled ($25 - $50)'
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.click(Option)
    fireEvent.change(BudgetField, { target: { value: 'Skilled ($25 - $50)' } })

    const StepNine = BusinessCard.querySelector('#step_9')
    expect(StepNine).toBeInTheDocument()

    const StepNineNextButton = within(StepNine).getByRole('button', { name: 'Next' })
    expect(StepNineNextButton).toBeInTheDocument()

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

    question = faker.string.alpha(12)
    questionsToAsk.push(question)
    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(QuestionsField, { target: { value: question } })

    const AddQuestionButton = within(StepNine).getByRole('button', { name: 'Add' })
    fireEvent.click(AddQuestionButton)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(expect.arrayContaining(questionsToAsk))

    expect(StepNineNextButton).toBeEnabled()

    fireEvent.click(StepNineNextButton)

    fireEvent.click(StepNineNextButton)
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(BusinessCard.querySelector('#review_project')).toBeInTheDocument()
  })

  it('renders create business page and click on step form back button', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const ReviewDetailContainer = ReviewProject.querySelector('#project_detail')
    expect(ReviewDetailContainer).toBeInTheDocument()

    const EditDetail = within(ReviewDetailContainer).getByText('Edit')
    expect(EditDetail).toBeInTheDocument()
    await act(async () => {
      fireEvent.click(EditDetail)
    })

    let StepThree = BusinessCard.querySelector('#mobile_step_3')
    expect(StepThree).toBeInTheDocument()

    expect(StepThree).toHaveTextContent('Describe the project')
    expect(StepThree).toHaveTextContent('What are the specific tasks and objectives for this project')
    expect(StepThree).toHaveTextContent(`What's the challenge you need to conquer? (in a sentence or two)`)

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(BusinessCard.querySelector('#review_project')).toBeInTheDocument()
  })

  it('renders create business page and click on review detail back button', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    const BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const BackButton = within(ReviewProject).getByRole('button', { name: 'BACK' })
    expect(BackButton).toBeInTheDocument()

    fireEvent.click(BackButton)

    fireEvent.click(within(BusinessCard).getByRole('button', { name: 'Next' }))

    const CreateProjectButton = screen.getByRole('button', { name: 'CREATE PROJECT' })
    fireEvent.click(CreateProjectButton)
  })

  it('renders review detail component to redirect to dashboard', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Business.wizardSubmission.isSuccessfull = true
    initialState.Business.businessForm.stage = 12

    renderWithRedux(<CreateBusiness />, { initialState })
  })

  /*
          Step Form with Long Term Collaboration
  */

  //   Step One
  it('render step one with long term collaboration on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Business.businessForm = _.cloneDeep(BUSINESS_FORM)
    initialState.Business.wizardSubmission = _.cloneDeep(WIZARD_SUBMISSION)
    initialState.Business.files = []

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const StepOne = BusinessCard.querySelector('#step_1')

    const NextButton = within(StepOne).getByRole('button', { name: 'Next' })
    expect(NextButton).toBeInTheDocument()
    expect(NextButton).toBeDisabled()

    const CancelButton = within(StepOne).getByRole('button', { name: 'Cancel' })
    expect(CancelButton).toBeInTheDocument()
    expect(CancelButton).toBeEnabled()

    const Option1 = StepOne.querySelector(`#${ConverterUtils.convertText('Long Term Collaboration')}`)

    initialState.Business.businessForm.projectType = 'Long Term Collaboration'
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.click(Option1)

    expect(NextButton).toBeEnabled()
    initialState.Business.businessForm.stage = 2

    fireEvent.click(NextButton)
  })
  // End Step 1

  // Start Step 2
  it('render step two with long term collaboration on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const StepTwo = BusinessCard.querySelector('#step_2')
    expect(StepTwo).toBeInTheDocument()

    const StepTwoNextButton = within(StepTwo).getByRole('button', { name: 'Next' })
    expect(StepTwoNextButton).toBeInTheDocument()
    expect(StepTwoNextButton).toBeDisabled()

    const BackButton = within(StepTwo).getByRole('button', { name: 'BACK' })
    expect(StepTwoNextButton).toBeInTheDocument()
    expect(BackButton).toBeInTheDocument()

    const NameField = within(StepTwo).getByTestId('projectName')
    expect(NameField).toBeInTheDocument()

    fireEvent.click(NameField)
    fireEvent.focus(NameField)

    name = faker.string.alpha(1100)

    initialState.Business.businessForm.name = name
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(NameField, { target: { value: name } })

    name = faker.string.alpha(500)

    initialState.Business.businessForm.name = name
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(NameField, { target: { value: name } })

    expect(StepTwoNextButton).toBeEnabled()
    initialState.Business.businessForm.stage = 3

    fireEvent.click(StepTwoNextButton)
  })
  // End Step 2

  // Start Step 3
  it('render step three with long term collaboration on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    let StepThree = BusinessCard.querySelector('#step_3')
    expect(StepThree).toBeInTheDocument()

    let StepFour = BusinessCard.querySelector('#step_4')
    expect(StepFour).toBeInTheDocument()

    const StepFourNextButton = within(StepFour).getByRole('button', { name: 'Next' })
    expect(StepFourNextButton).toBeInTheDocument()

    const StepFourBackButton = within(StepFour).getByRole('button', { name: 'BACK' })
    expect(StepFourBackButton).toBeInTheDocument()

    let RoleField = within(StepThree).getByTestId('role')
    expect(RoleField).toBeInTheDocument()

    fireEvent.click(RoleField)
    fireEvent.focus(RoleField)

    let role = faker.string.alpha(10)
    initialState.Business.businessForm.role = role
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(RoleField, { target: { value: role } })

    expect(RoleField.value).toBe(role)

    const TeamField = within(StepFour).getByTestId('teamDynamics')
    expect(TeamField).toBeInTheDocument()

    fireEvent.click(TeamField)
    fireEvent.focus(TeamField)

    let teamValue = faker.string.alpha(5)
    initialState.Business.businessForm.teamDynamics = teamValue
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(TeamField, { target: { value: teamValue } })

    expect(initialState.Business.businessForm.teamDynamics).toEqual(teamValue)

    expect(StepFourNextButton).toBeEnabled()
    fireEvent.click(StepFourNextButton)

    expect(within(StepThree).getByText('Please enter atleast 200 character')).toBeInTheDocument()

    role = faker.string.alpha(1200)

    fireEvent.focus(RoleField)

    fireEvent.change(RoleField, { target: { value: role } })

    fireEvent.keyDown(RoleField, { key: 'Delete', code: 'Delete' })
    fireEvent.keyDown(RoleField, { key: 'Enter', code: 'Enter' })

    initialState.Business.businessForm.role = role
    initialState.Business.businessForm.isFieldSubmitted = true

    expect(RoleField.value).toBe(role)

    role = faker.string.alpha(500)

    fireEvent.focus(RoleField)

    fireEvent.change(RoleField, { target: { value: role } })

    initialState.Business.businessForm.role = role
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.click(StepFourNextButton)

    initialState.Business.businessForm.stage = 4

    expect(StepFourNextButton).toBeEnabled()
    fireEvent.click(StepFourNextButton)
  })
  // End Step 3

  // Start Step 4
  it('render step four with long term collaboration on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    let StepFour = BusinessCard.querySelector('#mobile_step_4')
    expect(StepFour).toBeInTheDocument()

    const StepFourNextButton = within(StepFour).getByRole('button', { name: 'Next' })
    expect(StepFourNextButton).toBeInTheDocument()

    const StepFourBackButton = within(StepFour).getByRole('button', { name: 'BACK' })
    expect(StepFourBackButton).toBeInTheDocument()

    let RoleField = within(StepFour).getByTestId('role')
    expect(RoleField).toBeInTheDocument()

    fireEvent.click(RoleField)
    fireEvent.focus(RoleField)

    let role = faker.string.alpha(10)
    initialState.Business.businessForm.role = role
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(RoleField, { target: { value: role } })

    expect(RoleField.value).toBe(role)

    const TeamField = within(StepFour).getByTestId('teamDynamics')
    expect(TeamField).toBeInTheDocument()

    fireEvent.click(TeamField)
    fireEvent.focus(TeamField)

    let teamValue = faker.string.alpha(5)
    initialState.Business.businessForm.teamDynamics = teamValue
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(TeamField, { target: { value: teamValue } })

    expect(initialState.Business.businessForm.teamDynamics).toEqual(teamValue)

    expect(StepFourNextButton).toBeEnabled()
    fireEvent.click(StepFourNextButton)

    expect(within(StepFour).getByText('Please enter atleast 200 character')).toBeInTheDocument()

    role = faker.string.alpha(200)

    fireEvent.focus(RoleField)
    initialState.Business.businessForm.role = role
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(RoleField, { target: { value: role } })

    expect(RoleField.value).toBe(role)

    expect(StepFourNextButton).toBeEnabled()

    fireEvent.click(StepFourBackButton)
    initialState.Business.businessForm.stage = 4
    screen.getByRole('button', { name: 'Next' })
    initialState.Business.businessForm.stage = 5
    screen.getByRole('button', { name: 'Next' })
  })
  // End Step 4

  // Start Step 5
  it('render step five with long term collaboration on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    let StepFive = BusinessCard.querySelector('#step_5')
    expect(StepFive).toBeInTheDocument()

    let StepFiveNextButton = within(StepFive).getByRole('button', { name: 'Next' })
    expect(StepFiveNextButton).toBeInTheDocument()
    expect(StepFiveNextButton).toBeDisabled()

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

    skill = faker.string.alpha(5)

    requiredSkills.push(skill)
    initialState.Business.businessForm.requiredSkills = requiredSkills
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(SkillsField, { target: { value: skill } })

    const AddSkillsButton = within(StepFive).getByRole('button', { name: 'Add' })
    fireEvent.click(AddSkillsButton)
    expect(initialState.Business.businessForm.requiredSkills).toEqual(expect.arrayContaining(requiredSkills))

    const DeleteSkill = StepFive.querySelector(`#${skill}_1`)
    fireEvent.click(DeleteSkill)

    initialState.Business.businessForm.stage = 6
    expect(StepFiveNextButton).toBeEnabled()

    fireEvent.click(StepFiveNextButton)
  })
  // End Step 5

  // Start Step 6
  it('render step six with long term collaboration on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const StepSix = BusinessCard.querySelector('#step_6')
    expect(StepSix).toBeInTheDocument()

    const GoalsField = within(StepSix).getByTestId('goals')
    expect(GoalsField).toBeInTheDocument()
    fireEvent.click(GoalsField)
    fireEvent.focus(GoalsField)
    const Goal = faker.string.alpha(5)
    initialState.Business.businessForm.goals = Goal
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(GoalsField, { target: { value: Goal } })

    expect(GoalsField.value).toBe(Goal)

    const StepSeven = BusinessCard.querySelector('#step_7')
    expect(StepSeven).toBeInTheDocument()

    const StepSevenNextButton = within(StepSeven).getByRole('button', { name: 'Next' })
    expect(StepSevenNextButton).toBeInTheDocument()
    expect(StepSevenNextButton).toBeDisabled()

    const BackGroundField = within(StepSeven).getByTestId('companyBackground')
    expect(BackGroundField).toBeInTheDocument()
    fireEvent.click(BackGroundField)
    fireEvent.focus(BackGroundField)
    const Background = faker.string.alpha(5)
    initialState.Business.businessForm.companyBackground = Background
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(BackGroundField, { target: { value: Background } })

    expect(BackGroundField.value).toBe(Background)

    expect(StepSevenNextButton).toBeEnabled()
    initialState.Business.businessForm.stage = 7

    fireEvent.click(StepSevenNextButton)
  })
  // End Step 6

  // Start Step 7
  it('render step six with long term collaboration on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const StepSeven = BusinessCard.querySelector('#mobile_step_7')
    expect(StepSeven).toBeInTheDocument()

    const GoalsField = within(StepSeven).getByTestId('goals')
    expect(GoalsField).toBeInTheDocument()
    fireEvent.click(GoalsField)
    fireEvent.focus(GoalsField)
    const Goal = faker.string.alpha(5)
    initialState.Business.businessForm.goals = Goal
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(GoalsField, { target: { value: Goal } })

    expect(GoalsField.value).toBe(Goal)

    const StepSevenNextButton = within(StepSeven).getByRole('button', { name: 'Next' })
    expect(StepSevenNextButton).toBeInTheDocument()

    const StepSevenBackButton = within(StepSeven).getByRole('button', { name: 'BACK' })
    expect(StepSevenBackButton).toBeInTheDocument()

    const BackGroundField = within(StepSeven).getByTestId('companyBackground')
    expect(BackGroundField).toBeInTheDocument()
    fireEvent.click(BackGroundField)
    fireEvent.focus(BackGroundField)
    const Background = faker.string.alpha(5)
    initialState.Business.businessForm.companyBackground = Background
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(BackGroundField, { target: { value: Background } })

    expect(BackGroundField.value).toBe(Background)

    expect(StepSevenNextButton).toBeEnabled()

    fireEvent.click(StepSevenBackButton)
    initialState.Business.businessForm.stage = 7
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    initialState.Business.businessForm.stage = 8
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
  })
  // End Step 7

  // Start Step 8
  it('render step eight with long term collaboration on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    useRouter.mockReturnValue({
      query: { 'github-connect': 'true' },
      pathname: `/create-your-business?github-connect=true`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const StepEight = BusinessCard.querySelector('#step_8')
    expect(StepEight).toBeInTheDocument()

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

    const StepNine = BusinessCard.querySelector('#step_9')
    expect(StepNine).toBeInTheDocument()

    const StepNineNextButton = within(StepNine).getByRole('button', { name: 'Next' })
    expect(StepNineNextButton).toBeInTheDocument()
    expect(StepNineNextButton).toBeDisabled()

    const StepEightBackButton = within(StepNine).getByRole('button', { name: 'BACK' })
    expect(StepEightBackButton).toBeInTheDocument()

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

    question = faker.string.alpha(12)
    questionsToAsk.push(question)
    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(QuestionsField, { target: { value: question } })

    const AddQuestionButton = within(StepNine).getByRole('button', { name: 'Add' })
    fireEvent.click(AddQuestionButton)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(expect.arrayContaining(questionsToAsk))

    const DeleteQuestion = within(StepNine).getByTestId(`${question}`)
    fireEvent.click(DeleteQuestion)

    expect(StepNineNextButton).toBeEnabled()

    fireEvent.click(within(StepNine).getByRole('button', { name: 'BACK' }))
    initialState.Business.businessForm.stage = 7
    fireEvent.click(within(StepNine).getByRole('button', { name: 'Next' }))
    initialState.Business.businessForm.stage = 8
    fireEvent.click(within(StepNine).getByRole('button', { name: 'Next' }))
    initialState.Business.businessForm.stage = 9
    fireEvent.click(within(StepNine).getByRole('button', { name: 'Next' }))
  })
  // End Step 8

  // Start Step 9
  it('render step nine with long term collaboration on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Business.businessForm.questionsToAsk = []

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    const StepNine = BusinessCard.querySelector('#mobile_step_9')
    expect(StepNine).toBeInTheDocument()

    const BudgetField = within(StepNine).getByRole('combobox')
    expect(BudgetField).toBeInTheDocument()

    fireEvent.focus(BudgetField)
    fireEvent.keyDown(BudgetField, { key: 'ArrowDown', code: 'ArrowDown' })

    const Option = screen.getAllByText('More than a $70 per hour')[0]
    expect(Option).toBeInTheDocument()

    initialState.Business.businessForm.budgetRange = 'More than a $70 per hour'
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.click(Option)
    fireEvent.change(BudgetField, { target: { value: 'More than a $70 per hour' } })

    const StepNineNextButton = within(StepNine).getByRole('button', { name: 'Next' })
    expect(StepNineNextButton).toBeInTheDocument()

    const QuestionsField = within(StepNine).getByTestId('questionsToAsk')
    expect(QuestionsField).toBeInTheDocument()
    fireEvent.focus(QuestionsField)

    let question = faker.string.alpha(5)
    let questionsToAsk = [question]

    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true

    fireEvent.change(QuestionsField, { target: { value: question } })
    fireEvent.keyDown(QuestionsField, { key: 'Enter', code: 'Enter' })

    const DeleteQuestion = within(StepNine).getByTestId(`${question}`)
    fireEvent.click(DeleteQuestion)

    fireEvent.focus(QuestionsField)
    question = faker.string.alpha(12)
    questionsToAsk = [question]
    initialState.Business.businessForm.questionsToAsk = questionsToAsk
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(QuestionsField, { target: { value: question } })

    const AddQuestionButton = within(StepNine).getByRole('button', { name: 'Add' })
    fireEvent.click(AddQuestionButton)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(expect.arrayContaining(questionsToAsk))

    expect(Array.isArray(initialState.Business.businessForm.questionsToAsk)).toBe(true)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(questionsToAsk)
    expect(initialState.Business.businessForm.questionsToAsk).toEqual(expect.arrayContaining(questionsToAsk))

    expect(StepNineNextButton).toBeEnabled()

    fireEvent.click(within(StepNine).getByRole('button', { name: 'BACK' }))
    initialState.Business.businessForm.stage = 10
    fireEvent.click(within(StepNine).getByRole('button', { name: 'Next' }))
  })
  // End Step 9

  // Start Step 10
  it('render step eleven with long term collaboration on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    useRouter.mockReturnValue({
      query: { 'github-connect': 'true' },
      pathname: `/create-your-business?github-connect=true`,
      push: mockRouterPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn()
    })

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()
  })
  // End Step 10

  // Start Step 3
  it('render step three with isAlterable false on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Business.businessForm.stage = 3
    initialState.Business.businessForm.role = null

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    let StepThree = BusinessCard.querySelector('#step_3')
    expect(StepThree).toBeInTheDocument()

    let StepFour = BusinessCard.querySelector('#step_4')
    expect(StepFour).toBeInTheDocument()

    const StepFourNextButton = within(StepFour).getByRole('button', { name: 'Next' })
    expect(StepFourNextButton).toBeInTheDocument()

    const StepFourBackButton = within(StepFour).getByRole('button', { name: 'BACK' })
    expect(StepFourBackButton).toBeInTheDocument()

    let RoleField = within(StepThree).getByTestId('role')
    expect(RoleField).toBeInTheDocument()

    fireEvent.click(RoleField)
    fireEvent.focus(RoleField)

    let role = faker.string.alpha(1200)
    fireEvent.change(RoleField, { target: { value: role } })

    initialState.Business.businessForm.role = role
    initialState.Business.businessForm.isFieldSubmitted = true

    expect(RoleField.value).toBe(role)

    const TeamField = within(StepFour).getByTestId('teamDynamics')
    expect(TeamField).toBeInTheDocument()

    fireEvent.click(TeamField)
    fireEvent.focus(TeamField)

    let teamValue = faker.string.alpha(5)
    initialState.Business.businessForm.teamDynamics = teamValue
    initialState.Business.businessForm.isFieldSubmitted = true
    fireEvent.change(TeamField, { target: { value: teamValue } })

    expect(initialState.Business.businessForm.teamDynamics).toEqual(teamValue)

    role = faker.string.alpha(1100)
    fireEvent.change(RoleField, { target: { value: role } })

    initialState.Business.businessForm.role = role
    initialState.Business.businessForm.isFieldSubmitted = true

    initialState.Business.businessForm.stage = 4

    expect(StepFourNextButton).toBeEnabled()
    fireEvent.click(StepFourNextButton)
  })
  // End Step 3

  it('render step eleven with long term collaboration on mobile view', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Business.businessForm.stage = 12
    initialState.Business.wizardSubmission.isSuccessfull = false

    createBusiness.mockReturnValue(() => {
      return {
        status: 500
      }
    })

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    let ReviewProject = BusinessCard.querySelector('#review_project')
    expect(ReviewProject).toBeInTheDocument()

    const CreateProjectButton = within(ReviewProject).getByRole('button', { name: 'CREATE PROJECT' })
    fireEvent.click(CreateProjectButton)

    expect(
      within(ReviewProject).getByText(
        `Failed to create project ${initialState.Business.businessForm?.name}. Please try again later!`
      )
    ).toBeInTheDocument()

    fireEvent.click(ReviewProject.querySelector('#dismiss_notification'))
  })

  it('Click on Next Button without step value', async () => {
    global.innerWidth = 640
    global.dispatchEvent(new Event('resize'))

    initialState.Business.businessForm = _.cloneDeep(BUSINESS_FORM)
    initialState.Business.wizardSubmission = _.cloneDeep(WIZARD_SUBMISSION)
    initialState.Business.files = []

    renderWithRedux(<CreateBusiness />, { initialState })

    let BusinessCard = screen.getByTestId('mobile_card')
    expect(BusinessCard).toBeInTheDocument()

    expect(within(BusinessCard).getByText('Create A Project')).toBeInTheDocument()

    //   Verify step one header text
    const StepOne = BusinessCard.querySelector('#step_1')

    const NextButton = within(StepOne).getByRole('button', { name: 'Next' })
    expect(NextButton).toBeInTheDocument()
    expect(NextButton).toBeDisabled()

    const CancelButton = within(StepOne).getByRole('button', { name: 'Cancel' })
    expect(CancelButton).toBeInTheDocument()
    expect(CancelButton).toBeEnabled()

    fireEvent.click(CancelButton)

    expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard`)
  })
})
