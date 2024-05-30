import React from 'react'
import { useRouter } from 'next/router'
import { BUSINESS } from '../store/Business'
import { parse } from 'cookie'

import Tasklist from '../../pages/dashboard/tasklist'
import { initialState } from '../store/mockInitialState'
import { renderWithRedux } from '../store/commonTestSetup'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { getProjectsList } from '../../redux/Business/actions'
import { updateCreateTagForm, resetTagForm, createTag } from '../../redux/Tags/actions'

import {
  getDepartmentById,
  updateDepartmentForm,
  resetDepartmentForm,
  createDepartment
} from '../../redux/Department/actions'

import {
  createTask,
  setDepartment,
  updateCreateStoryForm,
  resetStoryForm,
  reorderStories
} from '../../redux/Tasks/actions'
import { Business } from 'facebook-nodejs-business-sdk'

jest.useFakeTimers() // Enable fake timers

jest.mock('axios')

jest.mock('react-select', () => ({ name, id, options, value, onChange }) => {
  return (
    <select
      data-testid={id ?? name}
      value={value}
      onChange={e => onChange(options.find(option => option.value === e.target.value))}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
})

// Mock the parse function
jest.mock('cookie', () => ({
  parse: jest.fn()
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../redux/Business/actions', () => ({
  ...jest.requireActual('../../redux/Business/actions'),
  getProjectsList: jest.fn()
}))
jest.mock('../../redux/Tags/actions', () => ({
  ...jest.requireActual('../../redux/Tags/actions'),
  updateCreateTagForm: jest.fn(),
  resetTagForm: jest.fn(),
  createTag: jest.fn()
}))
jest.mock('../../redux/Department/actions', () => ({
  ...jest.requireActual('../../redux/Department/actions'),
  createDepartment: jest.fn(),
  getDepartmentById: jest.fn(),
  updateDepartmentForm: jest.fn(),
  resetDepartmentForm: jest.fn()
}))

jest.mock('../../redux/Tasks/actions', () => ({
  ...jest.requireActual('../../redux/Tasks/actions'),
  setDepartment: jest.fn(),
  createTask: jest.fn(),
  updateCreateStoryForm: jest.fn((field, value) => ({
    type: 'UPDATE_CREATE_STORY_FORM',
    payload: { field, value }
  })),
  resetStoryForm: jest.fn(),
  reorderStories: jest.fn()
}))

describe('DesktopAccount Component', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    initialState.Business.projectList = JSON.parse(JSON.stringify(BUSINESS))

    jest.clearAllMocks()
    jest.resetAllMocks()

    getProjectsList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    createTag.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getDepartmentById.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    createDepartment.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    reorderStories.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    createTask.mockReturnValue(() => {
      return {
        status: 200
      }
    })

    mockRouterPush = jest.fn()
    mockRouterBack = jest.fn()

    useRouter.mockImplementation(() => ({
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
    global.innerWidth = global.innerWidth
    global.dispatchEvent(new Event('resize'))
    initialState.Auth.token = 'some_token'
  })

  it('renders Tasklist index page', async () => {
    renderWithRedux(<Tasklist />, { initialState })
  })
  it('renders Tasklist Without business', async () => {
    initialState.Business.projectList = undefined
    renderWithRedux(<Tasklist />, { initialState })
  })

  it('renders Tasklist Without access token', async () => {
    initialState.Auth.token = undefined
    renderWithRedux(<Tasklist />, { initialState })
  })

  it('should return token when cookies are present', async () => {
    const req = { headers: {} }
    const res = {}
    const expectedToken = 'valid-token'

    parse.mockReturnValue({ token: expectedToken })

    const props = await Tasklist.getInitialProps({ req, res })
    expect(props).toEqual({ token: { token: expectedToken } })
  })
  it('renders Tasklist Without department of first business', async () => {
    initialState.Business.projectList[0].businessDepartments = []
    renderWithRedux(<Tasklist />, { initialState })
  })

  it('renders Tasklist and click on other department', () => {
    initialState.Auth.token = 'some_token'

    setDepartment.mockReturnValue(() => {
      return true
    })

    renderWithRedux(<Tasklist setDepartment={setDepartment} />, { initialState })

    const projectElement = screen.getByText(/POS/i)
    expect(projectElement).toBeInTheDocument()
    fireEvent.click(projectElement)
    fireEvent.click(projectElement)

    const departmentName = screen.getByText('new test department')
    expect(departmentName).toBeInTheDocument()
    fireEvent.click(departmentName)
  })

  it('renders Tasklist and create department', async () => {
    updateDepartmentForm.mockReturnValue(() => {
      return true
    })

    initialState.Auth.user.role = 0
    renderWithRedux(<Tasklist updateDepartmentForm={updateDepartmentForm} />, { initialState })

    const createDepartmentDropDown = screen.getByText('new test department')
    fireEvent.click(createDepartmentDropDown)

    const createDepartmentElement = screen.getByText('Create')
    fireEvent.click(createDepartmentElement)

    expect(screen.getByTestId('create_department_modal')).toBeInTheDocument()

    const departmentNameField = screen.getByTestId('name')
    fireEvent.click(departmentNameField)
    fireEvent.change(departmentNameField, {
      target: { value: 'test department' }
    })

    const saveDepartmentFormm = screen.getByTestId('submit_department_form')
    fireEvent.click(saveDepartmentFormm)
  })
  it('renders Tasklist and click on cancel department form', async () => {
    updateDepartmentForm.mockReturnValue(() => {
      return true
    })

    initialState.Auth.user.role = 0
    renderWithRedux(<Tasklist updateDepartmentForm={updateDepartmentForm} />, { initialState })

    const createDepartmentDropDown = screen.getByText('new test department')
    fireEvent.click(createDepartmentDropDown)

    const createDepartmentElement = screen.getByText('Create')
    fireEvent.click(createDepartmentElement)

    expect(screen.getByTestId('create_department_modal')).toBeInTheDocument()

    const cancelDepartmentFormm = screen.getByTestId('cancel_department_form')
    fireEvent.click(cancelDepartmentFormm)
  })
  it('renders Tasklist and hide department modal without click', async () => {
    updateDepartmentForm.mockReturnValue(() => {
      return true
    })

    initialState.Auth.user.role = 0
    renderWithRedux(<Tasklist updateDepartmentForm={updateDepartmentForm} />, { initialState })

    const createDepartmentDropDown = screen.getByText('new test department')
    fireEvent.click(createDepartmentDropDown)

    const createDepartmentElement = screen.getByText('Create')
    fireEvent.click(createDepartmentElement)

    expect(screen.getByTestId('create_department_modal')).toBeInTheDocument()

    const backdrop = document.querySelector('.MuiBackdrop-root')
    fireEvent.mouseDown(backdrop)
    fireEvent.mouseUp(backdrop)

    // Modal should close
    setTimeout(() => {
      expect(screen.getByTestId('create_department_modal')).not.toBeInTheDocument()
    }, 0)
  })

  it('renders Tasklist and click on edit department ', async () => {
    updateDepartmentForm.mockReturnValue(() => {
      return true
    })

    initialState.Auth.user.role = 0
    renderWithRedux(<Tasklist updateDepartmentForm={updateDepartmentForm} />, { initialState })

    const createDepartmentDropDown = screen.getByText('new test department')
    fireEvent.click(createDepartmentDropDown)

    const editDepartmentElement = screen.getByText('Edit')
    fireEvent.click(editDepartmentElement)

    const deleteDepartmentElement = screen.getByText('Delete')
    fireEvent.click(deleteDepartmentElement)
  })

  it('renders Tasklist and click on add tag  button', async () => {
    initialState.Auth.user.role = 0

    updateCreateTagForm.mockReturnValue(() => {
      return true
    })

    renderWithRedux(<Tasklist updateCreateTagForm={updateCreateTagForm} setSelectedDepartment={() => {}} />, {
      initialState
    })

    const createDepartmentDropDown = screen.getByText('POS')
    expect(createDepartmentDropDown).toBeInTheDocument()
    fireEvent.click(createDepartmentDropDown)

    expect(createDepartmentDropDown).toBeInTheDocument()
    fireEvent.click(createDepartmentDropDown)

    const departmentElement = screen.getByText('new test department')

    expect(departmentElement).toBeInTheDocument()
    fireEvent.click(departmentElement)

    const addTagButton = screen.getByTestId('add_department_tag')
    expect(addTagButton).toBeInTheDocument()
    fireEvent.click(addTagButton)

    const tagNameField = screen.getByTestId('tagName')
    fireEvent.click(tagNameField)
    fireEvent.change(tagNameField, {
      target: { value: 'test tag' }
    })

    const saveDepartmentFormm = screen.getByTestId('save_tag_form')
    fireEvent.click(saveDepartmentFormm)
  })

  it('renders Tasklist and click on cancel tag form', async () => {
    initialState.Auth.user.role = 0

    updateCreateTagForm.mockReturnValue(() => {
      return true
    })

    renderWithRedux(<Tasklist updateCreateTagForm={updateCreateTagForm} setSelectedDepartment={() => {}} />, {
      initialState
    })

    const createDepartmentDropDown = screen.getByText('POS')
    expect(createDepartmentDropDown).toBeInTheDocument()
    fireEvent.click(createDepartmentDropDown)

    expect(createDepartmentDropDown).toBeInTheDocument()
    fireEvent.click(createDepartmentDropDown)

    const departmentElement = screen.getByText('new test department')

    expect(departmentElement).toBeInTheDocument()
    fireEvent.click(departmentElement)

    const addTagButton = screen.getByTestId('add_department_tag')
    expect(addTagButton).toBeInTheDocument()
    fireEvent.click(addTagButton)

    const cancelDepartmentFormm = screen.getByTestId('cancel_tag_form')
    fireEvent.click(cancelDepartmentFormm)
  })

  it('renders Tasklist and hide tag modal without click', async () => {
    initialState.Auth.user.role = 0

    updateCreateTagForm.mockReturnValue(() => {
      return true
    })

    renderWithRedux(<Tasklist updateCreateTagForm={updateCreateTagForm} setSelectedDepartment={() => {}} />, {
      initialState
    })

    const createDepartmentDropDown = screen.getByText('POS')
    expect(createDepartmentDropDown).toBeInTheDocument()
    fireEvent.click(createDepartmentDropDown)

    expect(createDepartmentDropDown).toBeInTheDocument()
    fireEvent.click(createDepartmentDropDown)

    const departmentElement = screen.getByText('new test department')

    expect(departmentElement).toBeInTheDocument()
    fireEvent.click(departmentElement)

    const addTagButton = screen.getByTestId('add_department_tag')
    expect(addTagButton).toBeInTheDocument()
    fireEvent.click(addTagButton)

    const backdrop = document.querySelector('.MuiBackdrop-root')
    fireEvent.mouseDown(backdrop)
    fireEvent.mouseUp(backdrop)

    // Modal should close
    setTimeout(() => {
      expect(screen.getByTestId('create_tag_modal')).not.toBeInTheDocument()
    }, 0)
  })

  it('renders Tasklist on and click on other department', async () => {
    global.innerWidth = 1080
    global.dispatchEvent(new Event('resize'))
    setDepartment.mockReturnValue(() => {
      return false
    })

    renderWithRedux(<Tasklist setDepartment={setDepartment} />, { initialState })

    const departmentName = screen.getByText('new test department')
    expect(departmentName).toBeInTheDocument()
    fireEvent.click(departmentName)

    await waitFor(() => {
      expect(mockRouterPush).not.toHaveBeenCalled()
    })
  })

  it('renders Tasklist, click on Add Task for todo and verify input fields are rendering', async () => {
    initialState.Auth.user.role = 0

    updateCreateStoryForm.mockReturnValue((field, value) => {
      initialState.Tasks.createStoryForm[`${field}`] = value
    })

    renderWithRedux(<Tasklist setSelectedDepartment={() => {}} />, {
      initialState
    })

    const createDepartmentDropDown = screen.getByText('POS')
    expect(createDepartmentDropDown).toBeInTheDocument()
    fireEvent.click(createDepartmentDropDown)

    expect(createDepartmentDropDown).toBeInTheDocument()
    fireEvent.click(createDepartmentDropDown)

    const departmentElement = screen.getByText('new test department')

    expect(departmentElement).toBeInTheDocument()
    fireEvent.click(departmentElement)

    const addTaskButton = screen.getByTestId('To Do_task')
    expect(addTaskButton).toBeInTheDocument()
    fireEvent.click(addTaskButton)

    const taskNameField = screen.getByTestId('taskName')
    expect(taskNameField).toBeInTheDocument()

    const assigneeField = screen.getByTestId('assignee')
    expect(assigneeField).toBeInTheDocument

    const tagField = screen.getByTestId('tags')
    expect(tagField).toBeInTheDocument()

    const priorityField = screen.getByTestId('priority')
    expect(priorityField).toBeInTheDocument()

    const storyPointsField = screen.getByTestId('storyPoints')
    expect(storyPointsField).toBeInTheDocument()

    const statusField = screen.getByTestId('status')

    expect(statusField).toBeInTheDocument()

    const descriptionField = screen.getByTestId('description')
    expect(descriptionField).toBeInTheDocument()

    fireEvent.click(statusField)
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('renders Tasklist, click on Add Task for todo and input values to fields', async () => {
    initialState.Auth.user.role = 0

    updateCreateStoryForm.mockImplementation(data => {
      if (Object.keys(data).includes('tags')) {
        initialState.Tasks.createStoryForm.tags = [...initialState.Tasks.createStoryForm.tags, ...data['tags']]
      } else {
        initialState.Tasks.createStoryForm = { ...initialState.Tasks.createStoryForm, ...data }
      }
      return {
        type: 'UPDATE_CREATE_STORY',
        payload: initialState.Tasks.createStoryForm
      }
    })

    renderWithRedux(<Tasklist updateCreateStoryForm={updateCreateStoryForm} setSelectedDepartment={() => {}} />, {
      initialState
    })

    const createDepartmentDropDown = screen.getByText('POS')
    expect(createDepartmentDropDown).toBeInTheDocument()
    fireEvent.click(createDepartmentDropDown)

    expect(createDepartmentDropDown).toBeInTheDocument()
    fireEvent.click(createDepartmentDropDown)

    const departmentElement = screen.getByText('new test department')

    expect(departmentElement).toBeInTheDocument()
    fireEvent.click(departmentElement)

    const addTaskButton = screen.getByTestId('To Do_task')
    expect(addTaskButton).toBeInTheDocument()
    fireEvent.click(addTaskButton)

    const taskNameField = screen.getByTestId('taskName')
    expect(taskNameField).toBeInTheDocument()

    fireEvent.click(taskNameField)
    fireEvent.change(taskNameField, {
      target: { value: 'new test task name' }
    })
    fireEvent.blur(taskNameField)

    const assigneeField = screen.getByTestId('assignee')
    expect(assigneeField).toBeInTheDocument()
    fireEvent.click(assigneeField)
    fireEvent.change(assigneeField, { target: { value: '6601c288149276195c3f8faf' } })
    fireEvent.blur(assigneeField)

    const tagField = screen.getByTestId('tags')
    expect(tagField).toBeInTheDocument()
    fireEvent.click(tagField)
    fireEvent.change(tagField, {
      target: { value: 'new test tag' }
    })
    fireEvent.keyDown(tagField, { key: 'Enter', code: 'Enter' })

    fireEvent.change(tagField, {
      target: { value: 'new test tag2' }
    })
    fireEvent.keyDown(tagField, { key: 'Enter', code: 'Enter' })
    fireEvent.blur(tagField)

    const priorityField = screen.getByTestId('priority')
    expect(priorityField).toBeInTheDocument()
    fireEvent.click(priorityField)
    fireEvent.change(priorityField, {
      target: { value: 'medium' }
    })
    fireEvent.blur(priorityField)

    const storyPointsField = screen.getByTestId('storyPoints')
    expect(storyPointsField).toBeInTheDocument()
    fireEvent.click(storyPointsField)
    fireEvent.change(storyPointsField, {
      target: { value: 20 }
    })
    fireEvent.blur(storyPointsField)

    const statusField = screen.getByTestId('status')
    expect(statusField).toBeInTheDocument()
    fireEvent.click(statusField)
    fireEvent.change(statusField, {
      target: { value: 'Todo' }
    })
    fireEvent.blur(statusField)

    const descriptionField = screen.getByTestId('description')
    expect(descriptionField).toBeInTheDocument()
    fireEvent.click(descriptionField)
    fireEvent.change(descriptionField, {
      target: { value: 'test task descriptions' }
    })
    fireEvent.blur(descriptionField)
  })

  //   Mobile View Test Cases
  it('renders Tasklist on mobile view and click on other department', async () => {
    global.innerWidth = 580
    global.dispatchEvent(new Event('resize'))

    setDepartment.mockReturnValue(() => {
      return true
    })

    renderWithRedux(<Tasklist setDepartment={setDepartment} />, { initialState })

    const departmentName = screen.getByText('new test department')
    expect(departmentName).toBeInTheDocument()
    fireEvent.click(departmentName)

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('department/6601ce179411991f47005806')
    })
  })

  it('renders Tasklist and MobileFreelancerFooter components when window width is < 600px', () => {
    global.innerWidth = 600
    global.dispatchEvent(new Event('resize'))

    renderWithRedux(<Tasklist />, { initialState })

    const headerBackArrow = screen.getByTestId('header_back_arrow')
    expect(headerBackArrow).toBeInTheDocument()
    fireEvent.click(headerBackArrow)
  })
})
