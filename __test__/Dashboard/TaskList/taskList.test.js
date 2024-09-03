import React from 'react'
import { useRouter } from 'next/router'
import { BUSINESS, ProjectHireTeam } from '../../store/Business'
import { parseCookies } from '../../../services/cookieHelper'
import { ConverterUtils } from '../../../utils/index'

import { SELECTED_TASK } from '../../store/Tasks'
import ProjectUsers, { renderTextContainer } from '../../../components/unzipped/dashboard/Kanban/ProjectusersDropdown'
import Tasklist from '../../../pages/dashboard/tasklist'
import DepartmentDetail from '../../../pages/dashboard/department/[id]'
import TicketDetail from '../../../pages/dashboard/ticket/[id]'
import { initialState } from '../../store/mockInitialState'
import { renderWithRedux } from '../../store/commonTestSetup'
import { fireEvent, screen, waitFor, within, act, prettyDOM } from '@testing-library/react'
import {
  getProjectsList,
  loadAllBusinessAssociatedTickets,
  getBusinessEmployees,
  resetBusinessList
} from '../../../redux/Business/actions'
import { createTag } from '../../../redux/Tags/actions'
import { faker } from '@faker-js/faker'

import {
  getDepartmentById,
  updateDepartmentForm,
  resetDepartmentForm,
  createDepartment,
  updateStatusOnDrag,
  deleteDepartment,
  updateDepartment
} from '../../../redux/Department/actions'

import {
  getTaskById,
  addCommentToStory,
  updateComment,
  restTagsList,
  createTask,
  setDepartment,
  updateCreateStoryForm,
  resetStoryForm,
  reorderStories,
  updateTask
} from '../../../redux/Tasks/actions'
import { CLIENT_AUTH } from '../../store/Users'
const _ = require('lodash')

jest.useFakeTimers() // Enable fake timers

jest.mock('axios')

// jest.mock('react-select', () => ({ name, id, options, value, onChange }) => {
//   return (
//     <select
//       data-testid={id ?? name}
//       value={value}
//       onChange={e => onChange(options.find(option => option.value === e.target.value))}>
//       {options.map(({ label, value }) => (
//         <option key={value} value={value}>
//           {label}
//         </option>
//       ))}
//     </select>
//   )
// })

// Mock the parse function
jest.mock('../../../services/cookieHelper', () => ({
  parseCookies: jest.fn()
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('../../../redux/Business/actions', () => ({
  ...jest.requireActual('../../../redux/Business/actions'),
  getProjectsList: jest.fn(),
  getBusinessEmployees: jest.fn(),
  loadAllBusinessAssociatedTickets: jest.fn(),
  resetBusinessList: jest.fn()
}))
jest.mock('../../../redux/Tags/actions', () => ({
  ...jest.requireActual('../../../redux/Tags/actions'),
  // updateCreateTagForm: jest.fn((field, value) => ({
  //   type: 'UPDATE_TAG_FORM',
  //   payload: { field, value }
  // })),
  resetTagForm: jest.fn(),
  createTag: jest.fn(),
  resetTagForm: jest.fn()
}))
jest.mock('../../../redux/Department/actions', () => ({
  ...jest.requireActual('../../../redux/Department/actions'),
  createDepartment: jest.fn(),
  getDepartmentById: jest.fn(),
  updateDepartmentForm: jest.fn(),
  resetDepartmentForm: jest.fn(),
  updateStatusOnDrag: jest.fn(),
  deleteDepartment: jest.fn(),
  updateDepartment: jest.fn()
}))

jest.mock('../../../redux/Tasks/actions', () => ({
  ...jest.requireActual('../../../redux/Tasks/actions'),
  setDepartment: jest.fn(),
  getTaskById: jest.fn(),
  addCommentToStory: jest.fn(),
  updateComment: jest.fn(),
  restTagsList: jest.fn(),
  updateTask: jest.fn(),
  updateCreateStoryForm: jest.fn((field, value) => ({
    type: 'UPDATE_CREATE_STORY_FORM',
    payload: { field, value }
  })),
  resetStoryForm: jest.fn(),
  reorderStories: jest.fn(),
  createTask: jest.fn()
}))

describe('DesktopAccount Component', () => {
  let mockRouterPush, mockRouterBack

  beforeEach(() => {
    initialState.Business.projectList = _.cloneDeep(BUSINESS)
    initialState.Auth.user = _.cloneDeep(CLIENT_AUTH)
    initialState.Tasks.selectedTask = _.cloneDeep(SELECTED_TASK)

    jest.clearAllMocks()
    jest.resetAllMocks()

    updateTask.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    updateDepartment.mockReturnValue(() => {
      return true
    })
    deleteDepartment.mockReturnValue(() => {
      return true
    })
    setDepartment.mockReturnValue(() => {
      return true
    })
    restTagsList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    updateComment.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    addCommentToStory.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getTaskById.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    updateCreateStoryForm.mockReturnValue(() => {
      return true
    })
    resetStoryForm.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    resetDepartmentForm.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    updateStatusOnDrag.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    resetBusinessList.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    loadAllBusinessAssociatedTickets.mockReturnValue(() => {
      return {
        status: 200
      }
    })
    getBusinessEmployees.mockReturnValue(() => {
      return {
        status: 200
      }
    })
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
    updateDepartmentForm.mockReturnValue(() => {
      return true
    })
    // updateCreateTagForm.mockReturnValue(() => {
    //   return true
    // })

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

  // it('renders Tasklist index page', async () => {
  //   renderWithRedux(<Tasklist />, { initialState })
  // })
  // it('renders Tasklist With business undefined', async () => {
  //   initialState.Business.projectList = undefined
  //   renderWithRedux(<Tasklist />, { initialState })

  //   const TaskListPage = screen.getByTestId('task_list_page')
  //   expect(TaskListPage).toBeInTheDocument()

  //   const ProjectsPanel = TaskListPage.querySelector('#projects_panel')
  //   expect(ProjectsPanel).not.toBeInTheDocument()
  // })

  // it('renders Tasklist Without access token', async () => {
  //   initialState.Auth.token = undefined
  //   renderWithRedux(<Tasklist />, { initialState })
  //   expect(mockRouterPush).toHaveBeenCalledWith('/login')
  // })

  // it('should return token when cookies are present', async () => {
  //   const req = { headers: {} }
  //   const res = {}
  //   const expectedToken = 'valid-token'

  //   parseCookies.mockReturnValue({ token: expectedToken })

  //   const props = await Tasklist.getInitialProps({ req, res })
  //   expect(props).toEqual({ token: { token: expectedToken } })
  // })
  // it('renders Tasklist Without department of first business', async () => {
  //   initialState.Business.projectList[0].businessDepartments = []
  //   renderWithRedux(<Tasklist />, { initialState })

  //   const TaskListPage = screen.getByTestId('task_list_page')
  //   expect(TaskListPage).toBeInTheDocument()

  //   const ProjectsPanel = TaskListPage.querySelector('#projects_panel')
  //   expect(ProjectsPanel).toBeInTheDocument()
  // })

  // it('renders Tasklist and click on other department', async () => {
  //   initialState.Auth.token = 'some_token'

  //   renderWithRedux(<Tasklist />, { initialState })

  //   const TaskListPage = screen.getByTestId('task_list_page')
  //   expect(TaskListPage).toBeInTheDocument()

  //   const ProjectsPanel = TaskListPage.querySelector('#projects_panel')
  //   expect(ProjectsPanel).toBeInTheDocument()

  //   const Business = initialState.Business.projectList[1]

  //   const projectElement = within(ProjectsPanel).getByText(Business?.name)
  //   expect(projectElement).toBeInTheDocument()
  //   fireEvent.click(projectElement)
  //   fireEvent.click(projectElement)
  //   fireEvent.click(projectElement)

  //   const departmentName = ProjectsPanel.querySelector(`#department_${Business?.businessDepartments?.[0]?._id}`)
  //   expect(departmentName).toHaveTextContent(Business?.businessDepartments?.[0]?.name)
  //   fireEvent.click(departmentName)
  // })
  // it('renders Tasklist and call getProjectsList with error', async () => {
  //   getProjectsList.mockReturnValue(() => {
  //     throw new Error('Something went wrong')
  //   })

  //   renderWithRedux(<Tasklist />, { initialState })
  // })

  // it('renders Tasklist and click on View Full Screen', async () => {
  //   renderWithRedux(<Tasklist />, { initialState })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const ViewFull = within(PageContainer).getByText('View Full Screen')
  //   expect(ViewFull).toBeInTheDocument()
  //   fireEvent.click(ViewFull)

  //   expect(PageContainer).toBeInTheDocument()

  //   const ExitFull = within(PageContainer).getByText('Exit Full Screen')
  //   expect(ExitFull).toBeInTheDocument()
  //   fireEvent.click(ExitFull)
  // })
  // it('renders Tasklist and create department', async () => {
  //   renderWithRedux(<Tasklist />, { initialState })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const DepartmentDropDown = within(PanelContainer).getByTestId('button-container')
  //   expect(DepartmentDropDown).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(DepartmentDropDown)
  //   })

  //   const createDepartmentElement = within(DepartmentDropDown).getByText('Create')

  //   await act(async () => {
  //     await fireEvent.click(createDepartmentElement)
  //   })

  //   const DepartmentModel = screen.getByTestId('create_department_modal')

  //   expect(DepartmentModel).toBeInTheDocument()

  //   const departmentNameField = screen.getByTestId('name')
  //   fireEvent.click(departmentNameField)
  //   fireEvent.change(departmentNameField, {
  //     target: { value: 'test department' }
  //   })

  //   const saveDepartmentFormm = within(DepartmentModel).getByRole('button', { name: 'Save' })
  //   await act(async () => {
  //     await fireEvent.click(saveDepartmentFormm)
  //   })
  // })
  // it('renders Tasklist and click on cancel department form', async () => {
  //   renderWithRedux(<Tasklist />, { initialState })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const DepartmentDropDown = within(PanelContainer).getByTestId('button-container')
  //   expect(DepartmentDropDown).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(DepartmentDropDown)
  //   })

  //   const createDepartmentElement = within(DepartmentDropDown).getByText('Create')

  //   await act(async () => {
  //     await fireEvent.click(createDepartmentElement)
  //   })

  //   const DepartmentModel = screen.getByTestId('create_department_modal')

  //   expect(DepartmentModel).toBeInTheDocument()

  //   const cancelDepartmentForm = within(DepartmentModel).getByRole('button', { name: 'CANCEL' })
  //   fireEvent.click(cancelDepartmentForm)
  // })
  // it('renders Tasklist and hide department modal without click', async () => {
  //   renderWithRedux(<Tasklist />, { initialState })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const DepartmentDropDown = within(PanelContainer).getByTestId('button-container')
  //   expect(DepartmentDropDown).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(DepartmentDropDown)
  //   })

  //   const createDepartmentElement = within(DepartmentDropDown).getByText('Create')

  //   await act(async () => {
  //     await fireEvent.click(createDepartmentElement)
  //   })

  //   const DepartmentModel = screen.getByTestId('create_department_modal')
  //   expect(DepartmentModel).toBeInTheDocument()

  //   const backdrop = document.querySelector('.MuiBackdrop-root')
  //   fireEvent.mouseDown(backdrop)
  //   fireEvent.mouseUp(backdrop)

  //   // Modal should close
  //   setTimeout(() => {
  //     expect(DepartmentModel).not.toBeInTheDocument()
  //   }, 0)
  // })

  // it('renders Tasklist and click on edit department ', async () => {
  //   renderWithRedux(<Tasklist />, { initialState })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const DepartmentDropDown = within(PanelContainer).getByTestId('button-container')
  //   expect(DepartmentDropDown).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(DepartmentDropDown)
  //   })

  //   const editDepartmentElement = within(DepartmentDropDown).getByText('Edit')

  //   await act(async () => {
  //     await fireEvent.click(editDepartmentElement)
  //   })

  //   const DepartmentModel = screen.getByTestId('create_department_modal')

  //   expect(DepartmentModel).toBeInTheDocument()

  //   const saveDepartmentFormm = within(DepartmentModel).getByRole('button', { name: 'Save' })
  //   await act(async () => {
  //     await fireEvent.click(saveDepartmentFormm)
  //   })

  //   await act(async () => {
  //     await fireEvent.click(DepartmentDropDown)
  //   })

  //   const deleteDepartmentElement = within(DepartmentDropDown).getByText('Delete')

  //   await act(async () => {
  //     await fireEvent.click(deleteDepartmentElement)
  //   })
  // })

  // it('renders Tasklist and click on add tag  button', async () => {
  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const addTagButton = within(PanelContainer).getByTestId('add_department_tag')
  //   expect(addTagButton).toBeInTheDocument()
  //   await act(async () => {
  //     await fireEvent.click(addTagButton)
  //   })

  //   const TagModal = screen.getByTestId('create_tag_modal')
  //   expect(TagModal).toBeInTheDocument()

  //   const saveButton = within(TagModal).getByRole('button', { name: 'Save' })
  //   expect(saveButton).toBeInTheDocument()
  //   expect(saveButton).toBeDisabled()

  //   const tagNameField = within(TagModal).getByTestId('tagName')
  //   expect(tagNameField).toBeInTheDocument()

  //   fireEvent.click(tagNameField)
  //   fireEvent.change(tagNameField, {
  //     target: { value: 'new' }
  //   })
  //   initialState.Tags.createTagForm.tagName = 'new'

  //   expect(saveButton).toBeEnabled()

  //   await act(async () => {
  //     await fireEvent.click(saveButton)
  //   })

  //   await waitFor(async () => {
  //     expect(TagModal).not.toBeInTheDocument()
  //   })
  // })

  // it('renders Tasklist and click on cancel tag form', async () => {
  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const addTagButton = within(PanelContainer).getByTestId('add_department_tag')
  //   expect(addTagButton).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(addTagButton)
  //   })

  //   const TagModal = screen.getByTestId('create_tag_modal')
  //   expect(TagModal).toBeInTheDocument()

  //   const cancelDepartmentFormm = within(TagModal).getByRole('button', { name: 'CANCEL' })
  //   expect(cancelDepartmentFormm).toBeInTheDocument()
  //   fireEvent.click(cancelDepartmentFormm)
  // })

  // it('renders Tasklist and hide tag modal without click', async () => {
  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const addTagButton = within(PanelContainer).getByTestId('add_department_tag')
  //   expect(addTagButton).toBeInTheDocument()
  //   await act(async () => {
  //     await fireEvent.click(addTagButton)
  //   })

  //   const TagModal = screen.getByTestId('create_tag_modal')
  //   expect(TagModal).toBeInTheDocument()

  //   const backdrop = document.querySelector('.MuiBackdrop-root')
  //   fireEvent.mouseDown(backdrop)
  //   fireEvent.mouseUp(backdrop)

  //   // Modal should close
  //   setTimeout(() => {
  //     expect(TagModal).not.toBeInTheDocument()
  //   }, 0)
  // })

  // it('renders Tasklist, click on Add Task for todo and verify input fields are rendering', async () => {
  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const addTaskButton = within(PanelContainer).getByTestId('To Do_task')
  //   expect(addTaskButton).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(addTaskButton)
  //   })

  //   const TaskForm = screen.getByTestId('taskform')
  //   expect(TaskForm).toBeInTheDocument()

  //   const taskNameField = within(TaskForm).getByTestId('taskName')
  //   expect(taskNameField).toBeInTheDocument()

  //   const AssigneeField = within(TaskForm).getAllByRole('combobox')[0]
  //   expect(AssigneeField).toBeInTheDocument()

  //   const autocomplete = screen.getByTestId('tags_autocomplete')

  //   const TagField = within(autocomplete).getByTestId('tags')
  //   expect(TagField).toBeInTheDocument()

  //   const Priority = screen.getByTestId('priority_autocomplete')

  //   const priorityField = within(Priority).getByTestId('priority')
  //   expect(priorityField).toBeInTheDocument()

  //   const storyPointsField = within(TaskForm).getByTestId('storyPoints')
  //   expect(storyPointsField).toBeInTheDocument()

  //   const Status = screen.getByTestId('status_autocomplete')

  //   const statusField = within(Status).getByTestId('status')
  //   expect(statusField).toBeInTheDocument()

  //   const descriptionField = within(TaskForm).getByTestId('description')
  //   expect(descriptionField).toBeInTheDocument()
  // })

  // it('renders Tasklist, click on Add Task for todo and cancel taskform', async () => {
  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const addTaskButton = within(PanelContainer).getByTestId('To Do_task')
  //   expect(addTaskButton).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(addTaskButton)
  //   })

  //   const TaskForm = screen.getByTestId('taskform')
  //   expect(TaskForm).toBeInTheDocument()

  //   const cancelButton = within(TaskForm).getByRole('button', { name: 'CANCEL' })
  //   expect(cancelButton).toBeInTheDocument()
  //   fireEvent.click(cancelButton)
  // })

  // it('renders Tasklist, click on Add Task for todo and submmit new task with success respose', async () => {
  //   initialState.Tasks.createStoryForm.businessId = initialState.Departments.selectedDepartment.businessId
  //   initialState.Tasks.createStoryForm.departmentId = initialState.Departments.selectedDepartment._id

  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const addTaskButton = within(PanelContainer).getByTestId('To Do_task')
  //   expect(addTaskButton).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(addTaskButton)
  //   })

  //   const TaskFormContainer = screen.getByTestId('taskform')
  //   expect(TaskFormContainer).toBeInTheDocument()

  //   const SaveTaskButton = within(TaskFormContainer).getByRole('button', { name: 'Save' })
  //   expect(SaveTaskButton).toBeInTheDocument()

  //   // // Task Name
  //   const taskNameField = within(TaskFormContainer).getByTestId('taskName')
  //   expect(taskNameField).toBeInTheDocument()

  //   fireEvent.click(taskNameField)
  //   fireEvent.change(taskNameField, {
  //     target: { value: '' }
  //   })
  //   initialState.Tasks.createStoryForm.taskName = ''

  //   fireEvent.blur(taskNameField)
  //   expect(within(TaskFormContainer).getByText('Task Name is required.')).toBeInTheDocument()
  //   expect(taskNameField.value).toBe('')

  //   fireEvent.click(taskNameField)
  //   fireEvent.change(taskNameField, {
  //     target: { value: 'new test task name' }
  //   })
  //   initialState.Tasks.createStoryForm.taskName = 'new test task name'

  //   fireEvent.blur(taskNameField)
  //   expect(taskNameField.value).toBe('new test task name')

  //   // End Task Name

  //   // // Assignee
  //   const OptionLabel = initialState.Departments.selectedDepartment.contracts[0]

  //   const AssigneeField = within(TaskFormContainer).getAllByRole('combobox')[0]
  //   expect(AssigneeField).toBeInTheDocument()

  //   fireEvent.focus(AssigneeField)
  //   fireEvent.keyDown(AssigneeField, { key: 'ArrowDown', code: 'ArrowDown' })

  //   const Option1 = screen.getByText(OptionLabel.freelancer.user.email)
  //   expect(Option1).toBeInTheDocument()
  //   initialState.Tasks.createStoryForm.assignee = OptionLabel.freelancer.user._id
  //   fireEvent.click(Option1)
  //   fireEvent.change(AssigneeField, { target: { value: OptionLabel.freelancer.user._id } })

  //   initialState.Tasks.createStoryForm.assignee = OptionLabel?.freelancer?.userId

  //   // // End Assignee

  //   // // Tags
  //   const autocomplete = within(TaskFormContainer).getByTestId('tags_autocomplete')

  //   const TagField = within(autocomplete).getByTestId('tags')
  //   expect(TagField).toBeInTheDocument()

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag1' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag1']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Shift' })
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))

  //   const Options = screen.getAllByRole('presentation')[1]
  //   expect(Options).toBeInTheDocument()
  //   fireEvent.click(within(Options).getByText('Tag1'))

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   // // End Tags

  //   // // Priority

  //   const Priority = screen.getByTestId('priority_autocomplete')

  //   const PriorityField = within(Priority).getByTestId('priority')
  //   expect(PriorityField).toBeInTheDocument()

  //   fireEvent.focus(PriorityField.querySelector('input'))
  //   fireEvent.change(PriorityField.querySelector('input'), {
  //     target: { value: null }
  //   })

  //   initialState.Tasks.createStoryForm.priority = null
  //   fireEvent.blur(PriorityField)

  //   expect(within(TaskFormContainer).getByText('Priority is required.')).toBeInTheDocument()

  //   fireEvent.focus(PriorityField.querySelector('input'))
  //   fireEvent.change(PriorityField.querySelector('input'), {
  //     target: { value: 'highest' }
  //   })

  //   initialState.Tasks.createStoryForm.priority = 'highest'
  //   fireEvent.keyDown(PriorityField, { key: 'Enter' })
  //   fireEvent.blur(PriorityField)

  //   fireEvent.focus(PriorityField.querySelector('input'))

  //   fireEvent.click(within(TaskFormContainer).getByText('highest'))

  //   // // End Priority

  //   // // Story Points
  //   const storyPointsField = within(TaskFormContainer).getByTestId('storyPoints')
  //   expect(storyPointsField).toBeInTheDocument()

  //   fireEvent.click(storyPointsField)
  //   fireEvent.focus(storyPointsField)
  //   fireEvent.change(storyPointsField, {
  //     target: { value: null }
  //   })
  //   initialState.Tasks.createStoryForm.storyPoints = null

  //   fireEvent.blur(storyPointsField)

  //   expect(within(TaskFormContainer).getByText('Story points are required.')).toBeInTheDocument()

  //   fireEvent.focus(storyPointsField)
  //   fireEvent.change(storyPointsField, {
  //     target: { value: 20 }
  //   })
  //   initialState.Tasks.createStoryForm.storyPoints = 20

  //   fireEvent.blur(storyPointsField)

  //   // // End Story Points

  //   // // Status

  //   const StatusField = within(TaskFormContainer).getByPlaceholderText('Status')
  //   expect(StatusField).toBeInTheDocument()

  //   fireEvent.focus(StatusField)
  //   initialState.Tasks.createStoryForm.status = null
  //   fireEvent.keyDown(StatusField, { key: 'ArrowDown', code: 'ArrowDown' })
  //   fireEvent.blur(StatusField)

  //   fireEvent.focus(StatusField)
  //   initialState.Tasks.createStoryForm.status = 'Todo'
  //   fireEvent.keyDown(StatusField, { key: 'ArrowDown', code: 'ArrowDown' })

  //   const Option = screen.getByText('Todo')
  //   expect(Option).toBeInTheDocument()
  //   fireEvent.click(Option)

  //   fireEvent.change(StatusField, { target: { value: 'Todo' } })
  //   fireEvent.blur(StatusField)

  //   // // End Status

  //   const DescriptionField = within(TaskFormContainer).getByTestId('description')
  //   expect(DescriptionField).toBeInTheDocument()

  //   fireEvent.click(DescriptionField)
  //   fireEvent.focus(DescriptionField)
  //   fireEvent.change(DescriptionField, {
  //     target: { value: 'test task descriptions' }
  //   })
  //   initialState.Tasks.createStoryForm.description = 'test task descriptions'

  //   fireEvent.blur(DescriptionField)

  //   await act(async () => {
  //     await fireEvent.click(SaveTaskButton)
  //   })
  // })

  // it('renders Tasklist, click on Add Task for todo and submmit new task with error respose', async () => {
  //   initialState.Tasks.createStoryForm = {
  //     taskName: '',
  //     storyPoints: '',
  //     priority: '',
  //     order: 1,
  //     description: '',
  //     status: '',
  //     businessId: '',
  //     departmentId: '',
  //     assignee: '',
  //     tags: [],
  //     tag: '',
  //     comments: []
  //   }
  //   initialState.Tasks.createStoryForm.businessId = initialState.Departments.selectedDepartment.businessId
  //   initialState.Tasks.createStoryForm.departmentId = initialState.Departments.selectedDepartment._id

  //   createTask.mockReturnValue(() => {
  //     return {
  //       status: 500,
  //       data: {
  //         message: 'Something went wrong'
  //       }
  //     }
  //   })

  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const addTaskButton = within(PanelContainer).getByTestId('To Do_task')
  //   expect(addTaskButton).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(addTaskButton)
  //   })

  //   const TaskFormContainer = screen.getByTestId('taskform')
  //   expect(TaskFormContainer).toBeInTheDocument()

  //   const SaveTaskButton = within(TaskFormContainer).getByRole('button', { name: 'Save' })
  //   expect(SaveTaskButton).toBeInTheDocument()

  //   // // Task Name
  //   const taskNameField = within(TaskFormContainer).getByTestId('taskName')
  //   expect(taskNameField).toBeInTheDocument()

  //   fireEvent.click(taskNameField)
  //   fireEvent.change(taskNameField, {
  //     target: { value: '' }
  //   })
  //   initialState.Tasks.createStoryForm.taskName = ''

  //   fireEvent.blur(taskNameField)
  //   expect(within(TaskFormContainer).getByText('Task Name is required.')).toBeInTheDocument()
  //   expect(taskNameField.value).toBe('')

  //   fireEvent.click(taskNameField)
  //   fireEvent.change(taskNameField, {
  //     target: { value: 'new test task name' }
  //   })
  //   initialState.Tasks.createStoryForm.taskName = 'new test task name'

  //   fireEvent.blur(taskNameField)
  //   expect(taskNameField.value).toBe('new test task name')

  //   // End Task Name

  //   // // Assignee

  //   const OptionLabel = initialState.Departments.selectedDepartment.contracts[0]

  //   const AssigneeField = within(TaskFormContainer).getAllByRole('combobox')[0]
  //   expect(AssigneeField).toBeInTheDocument()

  //   fireEvent.focus(AssigneeField)
  //   fireEvent.keyDown(AssigneeField, { key: 'ArrowDown', code: 'ArrowDown' })

  //   const Option1 = screen.getByText(OptionLabel.freelancer.user.email)
  //   expect(Option1).toBeInTheDocument()
  //   initialState.Tasks.createStoryForm.assignee = OptionLabel.freelancer.user._id
  //   fireEvent.click(Option1)
  //   fireEvent.change(AssigneeField, { target: { value: OptionLabel.freelancer.user._id } })

  //   // // End Assignee

  //   // // Tags
  //   const autocomplete = within(TaskFormContainer).getByTestId('tags_autocomplete')

  //   const TagField = within(autocomplete).getByTestId('tags')
  //   expect(TagField).toBeInTheDocument()

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag1' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag1']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Shift' })
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))

  //   const Options = screen.getAllByRole('presentation')[1]
  //   expect(Options).toBeInTheDocument()
  //   fireEvent.click(within(Options).getByText('Tag1'))

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   // // End Tags

  //   // // Priority

  //   const Priority = screen.getByTestId('priority_autocomplete')

  //   const PriorityField = within(Priority).getByTestId('priority')
  //   expect(PriorityField).toBeInTheDocument()

  //   fireEvent.focus(PriorityField.querySelector('input'))
  //   fireEvent.change(PriorityField.querySelector('input'), {
  //     target: { value: 'highest' }
  //   })

  //   initialState.Tasks.createStoryForm.priority = 'highest'

  //   // // End Priority

  //   // // Story Points
  //   const storyPointsField = within(TaskFormContainer).getByTestId('storyPoints')
  //   expect(storyPointsField).toBeInTheDocument()

  //   fireEvent.focus(storyPointsField)
  //   fireEvent.change(storyPointsField, {
  //     target: { value: 20 }
  //   })
  //   initialState.Tasks.createStoryForm.storyPoints = 20

  //   fireEvent.blur(storyPointsField)

  //   // // End Story Points

  //   // // Status

  //   const StatusField = within(TaskFormContainer).getByPlaceholderText('Status')
  //   expect(StatusField).toBeInTheDocument()

  //   fireEvent.focus(StatusField)
  //   initialState.Tasks.createStoryForm.status = 'Todo'
  //   fireEvent.keyDown(StatusField, { key: 'ArrowDown', code: 'ArrowDown' })

  //   const Option = screen.getByText('Todo')
  //   expect(Option).toBeInTheDocument()
  //   fireEvent.click(Option)

  //   fireEvent.change(StatusField, { target: { value: 'Todo' } })
  //   fireEvent.blur(StatusField)

  //   // // End Status

  //   const DescriptionField = within(TaskFormContainer).getByTestId('description')
  //   expect(DescriptionField).toBeInTheDocument()

  //   fireEvent.click(DescriptionField)
  //   fireEvent.focus(DescriptionField)
  //   fireEvent.change(DescriptionField, {
  //     target: { value: 'test task descriptions' }
  //   })
  //   initialState.Tasks.createStoryForm.description = 'test task descriptions'

  //   fireEvent.blur(DescriptionField)

  //   await act(async () => {
  //     await fireEvent.click(SaveTaskButton)
  //   })

  //   expect(within(TaskFormContainer).getByText('Something went wrong')).toBeInTheDocument()
  // })

  // it('renders Tasklist, click on task and edit it successfully', async () => {
  //   initialState.Tasks.createStoryForm.businessId = null
  //   initialState.Tasks.createStoryForm.departmentId = null

  //   initialState.Tasks.createStoryForm = _.cloneDeep(SELECTED_TASK)
  //   initialState.Tasks.selectedTask = _.cloneDeep(SELECTED_TASK)

  //   initialState.Tasks.selectedTask.businessId = null
  //   initialState.Tasks.selectedTask.departmentId = null

  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const SelectedTask = PanelContainer.querySelector(`#task_${initialState.Tasks.selectedTask._id}`)

  //   await act(async () => {
  //     fireEvent.click(within(SelectedTask).getByText(initialState.Tasks.selectedTask.taskName))
  //   })

  //   const TaskFormContainer = screen.getByTestId('taskform')
  //   expect(TaskFormContainer).toBeInTheDocument()

  //   const SaveTaskButton = within(TaskFormContainer).getByRole('button', { name: 'Save' })
  //   expect(SaveTaskButton).toBeInTheDocument()

  //   // // Task Name
  //   const taskNameField = within(TaskFormContainer).getByTestId('taskName')
  //   expect(taskNameField).toBeInTheDocument()

  //   fireEvent.click(taskNameField)
  //   fireEvent.change(taskNameField, {
  //     target: { value: 'new test task name' }
  //   })
  //   initialState.Tasks.createStoryForm.taskName = 'new test task name'

  //   fireEvent.blur(taskNameField)
  //   expect(taskNameField.value).toBe('new test task name')

  //   // End Task Name

  //   // // Assignee

  //   const CurrentAssignee = within(TaskFormContainer).getByTestId(
  //     `assignee_${initialState.Tasks.selectedTask.assignee}`
  //   )
  //   fireEvent.click(CurrentAssignee)

  //   const OptionLabel = initialState.Departments.selectedDepartment.contracts[0]

  //   const AssigneeField = within(TaskFormContainer).getAllByRole('combobox')[0]
  //   expect(AssigneeField).toBeInTheDocument()

  //   fireEvent.focus(AssigneeField)
  //   fireEvent.keyDown(AssigneeField, { key: 'ArrowDown', code: 'ArrowDown' })

  //   const Option1 = screen.getAllByText(OptionLabel.freelancer.user.email)[0]
  //   expect(Option1).toBeInTheDocument()
  //   initialState.Tasks.createStoryForm.assignee = OptionLabel.freelancer.user._id
  //   fireEvent.click(Option1)
  //   fireEvent.change(AssigneeField, { target: { value: OptionLabel.freelancer.user._id } })
  //   // // End Assignee

  //   // // Tags
  //   const autocomplete = within(TaskFormContainer).getByTestId('tags_autocomplete')

  //   const TagField = within(autocomplete).getByTestId('tags')
  //   expect(TagField).toBeInTheDocument()

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'tag1' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = [...initialState.Tasks.createStoryForm.tags, 'tag1']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Shift' })
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))

  //   fireEvent.click(TagField.querySelector('input'))

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   // // End Tags

  //   // // Priority

  //   const Priority = screen.getByTestId('priority_autocomplete')

  //   const PriorityField = within(Priority).getByTestId('priority')
  //   expect(PriorityField).toBeInTheDocument()

  //   fireEvent.focus(PriorityField.querySelector('input'))
  //   fireEvent.change(PriorityField.querySelector('input'), {
  //     target: { value: 'highest' }
  //   })

  //   initialState.Tasks.createStoryForm.priority = 'highest'
  //   fireEvent.keyDown(PriorityField, { key: 'Enter' })
  //   fireEvent.blur(PriorityField)

  //   fireEvent.focus(PriorityField.querySelector('input'))

  //   fireEvent.click(within(TaskFormContainer).getByText('highest'))

  //   // // End Priority

  //   // // Story Points
  //   const storyPointsField = within(TaskFormContainer).getByTestId('storyPoints')
  //   expect(storyPointsField).toBeInTheDocument()

  //   fireEvent.focus(storyPointsField)
  //   fireEvent.change(storyPointsField, {
  //     target: { value: 20 }
  //   })
  //   initialState.Tasks.createStoryForm.storyPoints = 20

  //   fireEvent.blur(storyPointsField)

  //   // // End Story Points

  //   // // Status

  //   const SelectedStatus = within(TaskFormContainer).getByTestId('selected_status')
  //   expect(SelectedStatus).toBeInTheDocument()
  //   await act(async () => {
  //     await fireEvent.click(SelectedStatus)
  //   })

  //   const StatusField = within(TaskFormContainer).getByPlaceholderText('Status')
  //   expect(StatusField).toBeInTheDocument()

  //   fireEvent.click(StatusField)

  //   fireEvent.focus(StatusField)
  //   fireEvent.keyDown(StatusField, { key: 'ArrowDown', code: 'ArrowDown' })
  //   initialState.Tasks.createStoryForm.status = 'In Progress'

  //   const Option = screen.getByText('In Progress')
  //   expect(Option).toBeInTheDocument()
  //   fireEvent.click(Option)

  //   fireEvent.change(StatusField, { target: { value: 'In Progress' } })
  //   fireEvent.blur(StatusField)

  //   // // End Status

  //   const Description = within(TaskFormContainer).getByTestId('description')
  //   fireEvent.click(Description)

  //   const DescriptionField = within(TaskFormContainer).getByTestId('description')
  //   expect(DescriptionField).toBeInTheDocument()

  //   fireEvent.click(DescriptionField)
  //   fireEvent.focus(DescriptionField)
  //   fireEvent.change(DescriptionField, {
  //     target: { value: 'test task descriptions' }
  //   })
  //   initialState.Tasks.createStoryForm.description = 'test task descriptions'

  //   fireEvent.blur(DescriptionField)

  //   const CommentField = within(TaskFormContainer).getByTestId('comment')
  //   expect(CommentField).toBeInTheDocument()

  //   fireEvent.click(CommentField)
  //   fireEvent.focus(CommentField)
  //   fireEvent.change(CommentField, {
  //     target: { value: 'test new comment' }
  //   })
  //   initialState.Tasks.createStoryForm.comments = ['test new comment']

  //   fireEvent.blur(CommentField)

  //   initialState.Tasks.selectedTask.comments?.forEach(comment => {
  //     const CommentElement = within(TaskFormContainer).getByTestId(`comment_${comment._id}`)
  //     expect(CommentElement).toBeInTheDocument()

  //     const CommentElement2 = within(TaskFormContainer).getByTestId(
  //       `comment_${initialState.Tasks.selectedTask.comments[1]._id}`
  //     )
  //     expect(CommentElement2).toBeInTheDocument()

  //     fireEvent.mouseOver(CommentElement)

  //     fireEvent.mouseOver(CommentElement)

  //     if (comment?.userId === initialState.Auth.user._id) {
  //       fireEvent.click(within(CommentElement).getByTestId(`edit_${comment._id}_comment`))

  //       const AddedComment = within(CommentElement).getByTestId('added_comment')
  //       expect(AddedComment).toBeInTheDocument()

  //       fireEvent.change(AddedComment, {
  //         target: { value: 'test new comment' }
  //       })
  //       fireEvent.click(within(CommentElement).getByTestId('send_comment'))
  //     }

  //     fireEvent.mouseOut(CommentElement)
  //     fireEvent.mouseOver(CommentElement)
  //     fireEvent.mouseOut(CommentElement2)

  //     // const EditComment = TaskFormContainer
  //   })

  //   await act(async () => {
  //     await fireEvent.click(SaveTaskButton)
  //   })
  // })
  // it('renders Tasklist, click on task and edit it with 500 error', async () => {
  //   initialState.Tasks.createStoryForm = {
  //     taskName: '',
  //     storyPoints: '',
  //     priority: '',
  //     order: 1,
  //     description: '',
  //     status: '',
  //     businessId: '',
  //     departmentId: '',
  //     assignee: '',
  //     tags: [],
  //     tag: '',
  //     comments: []
  //   }
  //   initialState.Tasks.createStoryForm.businessId = initialState.Tasks.selectedTask.businessId
  //   initialState.Tasks.createStoryForm.departmentId = initialState.Tasks.selectedTask.departmentId

  //   updateTask.mockReturnValue(() => {
  //     return {
  //       status: 500,
  //       data: {
  //         message: 'Something went wrong'
  //       }
  //     }
  //   })

  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const SelectedTask = PanelContainer.querySelector(`#task_${initialState.Tasks.selectedTask._id}`)

  //   await act(async () => {
  //     fireEvent.click(within(SelectedTask).getByText(initialState.Tasks.selectedTask.taskName))
  //   })

  //   const TaskFormContainer = screen.getByTestId('taskform')
  //   expect(TaskFormContainer).toBeInTheDocument()

  //   const SaveTaskButton = within(TaskFormContainer).getByRole('button', { name: 'Save' })
  //   expect(SaveTaskButton).toBeInTheDocument()

  //   // // Task Name
  //   const taskNameField = within(TaskFormContainer).getByTestId('taskName')
  //   expect(taskNameField).toBeInTheDocument()

  //   fireEvent.click(taskNameField)
  //   fireEvent.change(taskNameField, {
  //     target: { value: 'new test task name' }
  //   })
  //   initialState.Tasks.createStoryForm.taskName = 'new test task name'

  //   fireEvent.blur(taskNameField)
  //   expect(taskNameField.value).toBe('new test task name')

  //   // End Task Name

  //   // // Assignee

  //   const CurrentAssignee = within(TaskFormContainer).getByTestId(
  //     `assignee_${initialState.Tasks.selectedTask.assignee}`
  //   )
  //   fireEvent.click(CurrentAssignee)

  //   const OptionLabel = initialState.Departments.selectedDepartment.contracts[0]

  //   const AssigneeField = within(TaskFormContainer).getAllByRole('combobox')[0]
  //   expect(AssigneeField).toBeInTheDocument()

  //   fireEvent.focus(AssigneeField)
  //   fireEvent.keyDown(AssigneeField, { key: 'ArrowDown', code: 'ArrowDown' })

  //   const Option1 = screen.getByText(OptionLabel.freelancer.user.email)
  //   expect(Option1).toBeInTheDocument()
  //   initialState.Tasks.createStoryForm.assignee = OptionLabel.freelancer.user._id
  //   fireEvent.click(Option1)
  //   fireEvent.change(AssigneeField, { target: { value: OptionLabel.freelancer.user._id } })
  //   // // End Assignee

  //   // // Tags
  //   const autocomplete = within(TaskFormContainer).getByTestId('tags_autocomplete')

  //   const TagField = within(autocomplete).getByTestId('tags')
  //   expect(TagField).toBeInTheDocument()

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'tag1' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = [...initialState.Tasks.createStoryForm.tags, 'tag1']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Shift' })
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))

  //   fireEvent.click(TagField.querySelector('input'))

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   // // End Tags

  //   // // Priority

  //   const Priority = screen.getByTestId('priority_autocomplete')

  //   const PriorityField = within(Priority).getByTestId('priority')
  //   expect(PriorityField).toBeInTheDocument()

  //   fireEvent.focus(PriorityField.querySelector('input'))
  //   fireEvent.change(PriorityField.querySelector('input'), {
  //     target: { value: 'highest' }
  //   })

  //   initialState.Tasks.createStoryForm.priority = 'highest'
  //   fireEvent.keyDown(PriorityField, { key: 'Enter' })
  //   fireEvent.blur(PriorityField)

  //   fireEvent.focus(PriorityField.querySelector('input'))

  //   fireEvent.click(within(TaskFormContainer).getByText('highest'))

  //   // // End Priority

  //   // // Story Points
  //   const storyPointsField = within(TaskFormContainer).getByTestId('storyPoints')
  //   expect(storyPointsField).toBeInTheDocument()

  //   fireEvent.focus(storyPointsField)
  //   fireEvent.change(storyPointsField, {
  //     target: { value: 20 }
  //   })
  //   initialState.Tasks.createStoryForm.storyPoints = 20

  //   fireEvent.blur(storyPointsField)

  //   // // End Story Points

  //   // // Status

  //   const SelectedStatus = within(TaskFormContainer).getByTestId('selected_status')
  //   expect(SelectedStatus).toBeInTheDocument()
  //   await act(async () => {
  //     await fireEvent.click(SelectedStatus)
  //   })

  //   const StatusField = within(TaskFormContainer).getByPlaceholderText('Status')
  //   expect(StatusField).toBeInTheDocument()

  //   fireEvent.click(StatusField)

  //   fireEvent.focus(StatusField)
  //   fireEvent.keyDown(StatusField, { key: 'ArrowDown', code: 'ArrowDown' })
  //   initialState.Tasks.createStoryForm.status = 'In Progress'

  //   const Option = screen.getByText('In Progress')
  //   expect(Option).toBeInTheDocument()
  //   fireEvent.click(Option)

  //   fireEvent.change(StatusField, { target: { value: 'In Progress' } })
  //   fireEvent.blur(StatusField)

  //   // // End Status

  //   const Description = within(TaskFormContainer).getByTestId('description')
  //   fireEvent.click(Description)

  //   const DescriptionField = within(TaskFormContainer).getByTestId('description')
  //   expect(DescriptionField).toBeInTheDocument()

  //   fireEvent.click(DescriptionField)
  //   fireEvent.focus(DescriptionField)
  //   fireEvent.change(DescriptionField, {
  //     target: { value: 'test task descriptions' }
  //   })
  //   initialState.Tasks.createStoryForm.description = 'test task descriptions'

  //   fireEvent.blur(DescriptionField)

  //   const CommentField = within(TaskFormContainer).getByTestId('comment')
  //   expect(CommentField).toBeInTheDocument()

  //   fireEvent.click(CommentField)
  //   fireEvent.focus(CommentField)
  //   fireEvent.change(CommentField, {
  //     target: { value: 'test new comment' }
  //   })
  //   initialState.Tasks.createStoryForm.comments = ['test new comment']

  //   fireEvent.blur(CommentField)

  //   initialState.Tasks.selectedTask.comments?.forEach(comment => {
  //     const CommentElement = within(TaskFormContainer).getByTestId(`comment_${comment._id}`)
  //     expect(CommentElement).toBeInTheDocument()

  //     const CommentElement2 = within(TaskFormContainer).getByTestId(
  //       `comment_${initialState.Tasks.selectedTask.comments[1]._id}`
  //     )
  //     expect(CommentElement2).toBeInTheDocument()

  //     fireEvent.mouseOver(CommentElement)

  //     fireEvent.mouseOver(CommentElement)

  //     if (comment?.userId === initialState.Auth.user._id) {
  //       fireEvent.click(within(CommentElement).getByTestId(`edit_${comment._id}_comment`))

  //       const AddedComment = within(CommentElement).getByTestId('added_comment')
  //       expect(AddedComment).toBeInTheDocument()

  //       fireEvent.change(AddedComment, {
  //         target: { value: 'test new comment' }
  //       })
  //       fireEvent.click(within(CommentElement).getByTestId('send_comment'))
  //     }

  //     fireEvent.mouseOut(CommentElement)
  //     fireEvent.mouseOver(CommentElement)
  //     fireEvent.mouseOut(CommentElement2)

  //     // const EditComment = TaskFormContainer
  //   })

  //   await act(async () => {
  //     await fireEvent.click(SaveTaskButton)
  //   })
  // })

  // it('renders Tasklist, click on project users dropdown', async () => {
  //   initialState.Tasks.createStoryForm = {
  //     taskName: '',
  //     storyPoints: '',
  //     priority: '',
  //     order: 1,
  //     description: '',
  //     status: '',
  //     businessId: '',
  //     departmentId: '',
  //     assignee: '',
  //     tags: [],
  //     tag: '',
  //     comments: []
  //   }
  //   initialState.Tasks.createStoryForm.businessId = initialState.Tasks.selectedTask.businessId
  //   initialState.Tasks.createStoryForm.departmentId = initialState.Tasks.selectedTask.departmentId

  //   updateTask.mockReturnValue(() => {
  //     return {
  //       status: 500,
  //       data: {
  //         message: 'Something went wrong'
  //       }
  //     }
  //   })

  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const SelectedTask = PanelContainer.querySelector(`#task_${initialState.Tasks.selectedTask._id}`)

  //   const AssigneeDropDown = SelectedTask.querySelector('#users_dropdown')
  //   expect(AssigneeDropDown).toBeInTheDocument()

  //   fireEvent.click(AssigneeDropDown)

  //   const AssigneeMenus = screen.getByTestId('users_dropdown_menus')
  //   expect(AssigneeMenus).toBeInTheDocument()

  //   const Option = AssigneeMenus.querySelector('#assignee_0')
  //   expect(Option).toBeInTheDocument()
  //   await act(async () => {
  //     await fireEvent.click(Option)
  //   })
  // })

  // it('renders Tasklist and open task without some data', async () => {
  //   initialState.Tasks.createStoryForm.businessId = initialState.Tasks.selectedTask.businessId
  //   initialState.Tasks.createStoryForm.departmentId = initialState.Tasks.selectedTask.departmentId

  //   initialState.Tasks.selectedTask = initialState.Tasks.tasks[1]
  //   initialState.Tasks.selectedTask = initialState.Tasks.tasks[1]

  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const SelectedTask = PanelContainer.querySelector(`#task_${initialState.Tasks.selectedTask._id}`)

  //   await act(async () => {
  //     fireEvent.click(within(SelectedTask).getByText(initialState.Tasks.selectedTask.taskName))
  //   })

  //   const TaskFormContainer = screen.getByTestId('taskform')
  //   expect(TaskFormContainer).toBeInTheDocument()

  //   const backdrop = document.querySelector('.MuiBackdrop-root')
  //   fireEvent.mouseDown(backdrop)
  //   fireEvent.mouseUp(backdrop)

  //   // Modal should close
  //   setTimeout(() => {
  //     expect(TaskFormContainer).not.toBeInTheDocument()
  //   }, 0)
  // })

  // it('renders Tasklist, click on Add Task for other Tags', async () => {
  //   initialState.Tasks.createStoryForm.businessId = initialState.Departments.selectedDepartment.businessId
  //   initialState.Tasks.createStoryForm.departmentId = initialState.Departments.selectedDepartment._id

  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()

  //   const InProgressTask = within(PanelContainer).getByTestId('In Progress_task')
  //   expect(InProgressTask).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(InProgressTask)
  //   })

  //   const TaskFormContainer = screen.getByTestId('taskform')
  //   expect(TaskFormContainer).toBeInTheDocument()

  //   const CancelButton = within(TaskFormContainer).getByRole('button', { name: 'CANCEL' })
  //   expect(CancelButton).toBeInTheDocument()
  //   fireEvent.click(CancelButton)

  //   const DoneTask = within(PanelContainer).getByTestId('Done_task')
  //   expect(DoneTask).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(DoneTask)
  //   })
  //   fireEvent.click(CancelButton)

  //   const DoingTask = within(PanelContainer).getByTestId('Doing_task')
  //   expect(DoingTask).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(DoingTask)
  //   })
  //   fireEvent.click(CancelButton)
  //   const NewTask = within(PanelContainer).getByTestId('tag2_task')
  //   expect(NewTask).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(NewTask)
  //   })
  //   fireEvent.click(CancelButton)
  // })
  // it('renders Tasklist and verify Drag and Drop', async () => {
  //   initialState.Tasks.createStoryForm.businessId = initialState.Departments.selectedDepartment.businessId
  //   initialState.Tasks.createStoryForm.departmentId = initialState.Departments.selectedDepartment._id

  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const PageContainer = screen.getByTestId('task_list_page')
  //   expect(PageContainer).toBeInTheDocument()

  //   const PanelContainer = PageContainer.querySelector('#tasks_panel')
  //   expect(PanelContainer).toBeInTheDocument()
  //   const TagID = initialState.Departments.selectedDepartment?.departmentTags[0]?._id
  //   const TagID2 = initialState.Departments.selectedDepartment?.departmentTags[1]?._id

  //   const TaskID = initialState.Departments.selectedDepartment?.departmentTags[0]?.tasks[0]?._id
  //   const TaskID2 = initialState.Departments.selectedDepartment?.departmentTags[1]?.tasks[0]?._id

  //   const DraggedTask = within(PanelContainer).getByTestId(`task_${TaskID}`)
  //   expect(DraggedTask).toBeInTheDocument()

  //   const DraggedTask2 = within(PanelContainer).getByTestId(`task_${TaskID2}`)
  //   expect(DraggedTask2).toBeInTheDocument()

  //   const Source = within(PanelContainer).getByTestId(`drop_${TagID2}`)
  //   expect(Source).toBeInTheDocument()

  //   const Destination = within(PanelContainer).getByTestId(`drop_${TagID}`)
  //   expect(Destination).toBeInTheDocument()

  //   // simulate dragging

  //   await act(async () => {
  //     fireEvent.mouseDown(DraggedTask, { clientX: 0, clientY: 0 })
  //     fireEvent.mouseMove(Destination, { clientX: 100, clientY: 900 })
  //     fireEvent.mouseOver(Destination, { clientX: 100, clientY: 900 })
  //     fireEvent.mouseUp(Destination)
  //   })
  // })

  it('renders Tasklist for view screen view', async () => {
    const { unmount } = renderWithRedux(<Tasklist />, { initialState })

    const PageContainer = screen.getByTestId('task_list_page')
    expect(PageContainer).toBeInTheDocument()

    const ViewFull = within(PageContainer).getByText('View Full Screen')
    expect(ViewFull).toBeInTheDocument()
    fireEvent.click(ViewFull)

    expect(PageContainer).toBeInTheDocument()

    const KanbanContainer = within(PageContainer).getByTestId('kanban_container')
    expect(KanbanContainer).toBeInTheDocument()

    const ProjectDropDown = KanbanContainer.querySelector('#projects_dropdown')
    expect(ProjectDropDown).toBeInTheDocument()
    expect(ProjectDropDown).toHaveTextContent('My Projects')

    fireEvent.click(ProjectDropDown)

    const MenuContainer = screen.getByTestId('projects_dropdown_menus')
    expect(MenuContainer).toBeInTheDocument()

    initialState.Business.projectList?.forEach((project, index) => {
      const NameContainer = MenuContainer.querySelector(`#panel${index}-header`)
      expect(within(NameContainer).getByText(ConverterUtils.truncateString(project?.name, 30))).toBeInTheDocument()
      fireEvent.click(NameContainer)
      const BusinessDepartments = initialState.Business.projectList?.map(project => project.businessDepartments)

      BusinessDepartments?.forEach((department, deptIndex) => {
        if (department?.name) {
          const DeptNameContainer = MenuContainer.querySelector(`#department_${deptIndex}`)
          expect(
            within(DeptNameContainer).getByText(ConverterUtils.truncateString(department?.name, 30))
          ).toBeInTheDocument()
          fireEvent.click(DeptNameContainer)
        }
      })
    })
    const NameContainer = MenuContainer.querySelector(`#panel0-header`)
    fireEvent.click(NameContainer)
    const DeptNameContainer = MenuContainer.querySelector(`#department_0`)
    fireEvent.click(DeptNameContainer)

    const backdrop = document.querySelector('.MuiBackdrop-root')
    fireEvent.click(backdrop)

    setTimeout(() => {
      expect(MenuContainer).not.toBeInTheDocument()
    }, 0)

    const AssigeeButton = within(KanbanContainer).getByRole('button', { name: 'Assigned To' })
    expect(AssigeeButton).toBeInTheDocument()

    fireEvent.click(AssigeeButton)

    const AssigneeContainer = screen.getByTestId('assignee_options')
    expect(AssigneeContainer).toBeInTheDocument()

    initialState.Business.hiredProjectTeam?.forEach((user, index) => {
      const NameContainer = AssigneeContainer.querySelector(`#user_${index}`)
      if (user?.userId)
        expect(within(NameContainer).getByText(`${user?.FirstName} ${user?.LastName}`)).toBeInTheDocument()
      fireEvent.click(NameContainer)
      fireEvent.click(NameContainer)
    })
    const ClearMenu = within(AssigneeContainer).getByText('Clear')
    expect(ClearMenu).toBeInTheDocument()
    fireEvent.click(ClearMenu)

    await act(async () => {
      await fireEvent.keyDown(AssigneeContainer, { key: 'Escape' })
    })

    for (var department in initialState.Business.fullBoardViewTickets) {
      const CurrentDepartmentTasks = initialState.Business.fullBoardViewTickets[department]
      CurrentDepartmentTasks?.tasks?.forEach((task, index) => {
        console.log('task', task)
        const SelectedTask = KanbanContainer.querySelector(`#task_${task?._id}`)
        expect(SelectedTask).toBeInTheDocument()

        const AssigneeDropDown = SelectedTask.querySelector('#users_dropdown')
        expect(AssigneeDropDown).toBeInTheDocument()

        fireEvent.click(AssigneeDropDown)

        const AssigneeMenus = screen.getAllByTestId('users_dropdown_menus')[0]
        expect(AssigneeMenus).toBeInTheDocument()

        const Option = AssigneeMenus.querySelector('#assignee_0')
        expect(Option).toBeInTheDocument()
        fireEvent.click(Option)
      })
    }

    unmount()
    initialState.Business.hiredProjectTeam = []

    renderWithRedux(<Tasklist />, { initialState })

    fireEvent.click(screen.getAllByText('View Full Screen')[0])

    const ResetButton = screen.getByRole('button', { name: 'Return To Default' })
    expect(ResetButton).toBeInTheDocument()
    fireEvent.click(ResetButton)

    // const SelectedTask = KanbanContainer.querySelector(`#task_${initialState.Business.fullBoardViewTickets[0].}`)

    //  const AssigneeDropDown = SelectedTask.querySelector('#users_dropdown')
    //  expect(AssigneeDropDown).toBeInTheDocument()

    //  fireEvent.click(AssigneeDropDown)

    //  const AssigneeMenus = screen.getByTestId('users_dropdown_menus')
    //  expect(AssigneeMenus).toBeInTheDocument()

    //  const Option = AssigneeMenus.querySelector('#assignee_0')
    //  expect(Option).toBeInTheDocument()
    //  await act(async () => {
    //    await fireEvent.click(Option)
    //  })

    const SearchField = screen.getByPlaceholderText('Filter by keywords')
    expect(SearchField).toBeInTheDocument()
    fireEvent.focus(SearchField)
    fireEvent.change(SearchField, { target: { value: 'ticket' } })
  })

  it('test project users dropdown method', async () => {
    renderTextContainer(undefined, undefined, true)
  })

  it('test project users with default parameters values', async () => {
    renderWithRedux(<ProjectUsers />, { initialState })
  })

  //    Mobile View Test Cases
  // it('renders Tasklist on mobile view and click on other department to edit the task', async () => {
  //   initialState.Tasks.createStoryForm = {
  //     taskName: '',
  //     storyPoints: '',
  //     priority: '',
  //     order: 1,
  //     description: '',
  //     status: '',
  //     businessId: '',
  //     departmentId: '',
  //     assignee: '',
  //     tags: [],
  //     tag: '',
  //     comments: []
  //   }
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   setDepartment.mockReturnValue(() => {
  //     return true
  //   })

  //   renderWithRedux(<Tasklist setDepartment={setDepartment} />, { initialState })

  //   const TaskListPage = screen.getByTestId('task_list_page')
  //   expect(TaskListPage).toBeInTheDocument()

  //   const ProjectsPanel = TaskListPage.querySelector('#projects_panel')
  //   expect(ProjectsPanel).toBeInTheDocument()

  //   const Business = initialState.Business.projectList[1]

  //   const projectElement = within(ProjectsPanel).getByText(Business?.name)
  //   expect(projectElement).toBeInTheDocument()
  //   await act(async () => {
  //     await fireEvent.click(projectElement)
  //   })

  //   const departmentName = ProjectsPanel.querySelector(`#department_${Business?.businessDepartments?.[0]?._id}`)
  //   expect(departmentName).toHaveTextContent(Business?.businessDepartments?.[0]?.name)
  //   await act(async () => {
  //     await fireEvent.click(departmentName)
  //   })
  //   await waitFor(() => {
  //     expect(mockRouterPush).toHaveBeenCalledWith(`department/${Business?.businessDepartments?.[0]?._id}`)
  //   })

  //   useRouter.mockReturnValue({
  //     query: { id: Business?.businessDepartments?.[0]?._id },
  //     pathname: `/dashboard/department/${Business?.businessDepartments?.[0]?._id}`,
  //     push: mockRouterPush,
  //     replace: jest.fn(),
  //     prefetch: jest.fn(),
  //     back: jest.fn()
  //   })

  //   renderWithRedux(<DepartmentDetail />, { initialState })

  //   const DetailContainer = screen.getByTestId('mobile_department_detail')
  //   expect(DetailContainer).toBeInTheDocument()

  //   const AddTaskButton = within(DetailContainer).getByRole('button', { name: 'Add' })
  //   expect(AddTaskButton).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(AddTaskButton)
  //   })

  //   const TaskCancelButton = screen.getByRole('button', { name: 'CANCEL' })
  //   await act(async () => {
  //     await fireEvent.click(TaskCancelButton)
  //   })

  //   const Tag = initialState.Departments.selectedDepartment.departmentTags[0]
  //   const TagAccordian = screen.getByTestId(`tag_${Tag?._id}`)
  //   fireEvent.click(TagAccordian)

  //   const Task1 = TagAccordian.querySelector(`#task_${Tag?.tasks[0]._id}`)
  //   fireEvent.click(Task1)

  //   await waitFor(() => {
  //     expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/ticket/${Tag?.tasks[0]._id}`)
  //   })

  //   useRouter.mockReturnValue({
  //     query: { id: Tag?.tasks[0]._id },
  //     pathname: `/dashboard/ticket/${Tag?.tasks[0]._id}`,
  //     push: mockRouterPush,
  //     replace: jest.fn(),
  //     prefetch: jest.fn(),
  //     back: jest.fn()
  //   })
  //   initialState.Tasks.selectedTask = _.cloneDeep(SELECTED_TASK)
  //   const SelectedTask = _.cloneDeep(SELECTED_TASK)
  //   initialState.Tasks.createStoryForm = {
  //     taskName: SelectedTask?.taskName,
  //     storyPoints: SelectedTask?.storyPoints,
  //     priority: SelectedTask?.priority,
  //     order: 1,
  //     description: SelectedTask?.description,
  //     status: SelectedTask?.status,
  //     businessId: SelectedTask?.businessId || departmentData?.businessId,
  //     departmentId: SelectedTask?.departmentId || departmentData?.departmentId,
  //     assignee: SelectedTask?.assignee,
  //     tags: SelectedTask?.tags,
  //     tag: SelectedTask?.tag,
  //     ticketCode: SelectedTask?.ticketCode
  //   }
  //   renderWithRedux(<TicketDetail />, { initialState })
  //   const TicketContainer = screen.getByTestId('ticket_detail')
  //   expect(TicketContainer).toBeInTheDocument()

  //   const TaskForm = within(TicketContainer).getByTestId('mobile_task_form')
  //   expect(TaskForm).toBeInTheDocument()

  //   if (SelectedTask?.ticketCode) {
  //     const TicketIssue = TaskForm.querySelector(`#ticket_code`)
  //     expect(TicketIssue).toBeInTheDocument()
  //     expect(TicketIssue).toHaveTextContent(`ISSUE ${SelectedTask?.ticketCode?.toLowerCase()}`)
  //   }
  //   const TicketName = TaskForm.querySelector(`#task_name`)
  //   expect(TicketName).toBeInTheDocument()
  //   expect(TicketName).toHaveTextContent(`${SelectedTask?.taskName}`)
  //   fireEvent.click(TicketName)

  //   const TaskName = faker.string.alpha(10)
  //   const NameField = within(TaskForm).getByTestId('taskName')
  //   expect(NameField).toBeInTheDocument()

  //   fireEvent.focus(NameField)
  //   fireEvent.change(NameField, { target: { value: TaskName } })
  //   initialState.Tasks.createStoryForm.taskName = TaskName
  //   fireEvent.blur(NameField)

  //   const Assigee = SelectedTask.department.contracts.find(
  //     contract => contract?.freelancer?.userId === SelectedTask?.assignee
  //   )

  //   const NewAssigee = SelectedTask.department.client
  //   expect(TaskForm.querySelector(`#task_name`)).toBeInTheDocument()

  //   const CurrentAssignee = within(TaskForm).getByText(`${Assigee?.freelancer?.user.email}`)
  //   fireEvent.click(CurrentAssignee)

  //   const AssigneeField = within(TaskForm).getAllByRole('combobox')[0]
  //   expect(AssigneeField).toBeInTheDocument()

  //   fireEvent.focus(AssigneeField)
  //   fireEvent.keyDown(AssigneeField, { key: 'ArrowDown', code: 'ArrowDown' })

  //   const Option = screen.getAllByText(NewAssigee.email)[0]
  //   expect(Option).toBeInTheDocument()
  //   initialState.Tasks.createStoryForm.assignee = NewAssigee._id
  //   fireEvent.click(Option)
  //   fireEvent.change(AssigneeField, { target: { value: NewAssigee._id } })

  //   const Priority = within(TaskForm).getByTestId('priority_autocomplete')

  //   const PriorityField = within(Priority).getByTestId('priority')
  //   expect(PriorityField).toBeInTheDocument()

  //   fireEvent.focus(PriorityField.querySelector('input'))
  //   fireEvent.change(PriorityField.querySelector('input'), {
  //     target: { value: 'highest' }
  //   })

  //   initialState.Tasks.createStoryForm.priority = 'highest'
  //   fireEvent.keyDown(PriorityField, { key: 'Enter' })
  //   fireEvent.blur(PriorityField)

  //   fireEvent.focus(PriorityField.querySelector('input'))

  //   fireEvent.click(within(TaskForm).getByText('highest'))

  //   const Status = within(TaskForm).getByTestId('status_autocomplete')

  //   const StatusField = within(Status).getByTestId('status')
  //   expect(StatusField).toBeInTheDocument()

  //   fireEvent.focus(StatusField.querySelector('input'))
  //   fireEvent.change(StatusField.querySelector('input'), {
  //     target: { value: 'In progress' }
  //   })

  //   initialState.Tasks.createStoryForm.status = 'In progress'
  //   fireEvent.keyDown(StatusField, { key: 'Enter' })
  //   fireEvent.blur(StatusField)

  //   fireEvent.focus(StatusField.querySelector('input'))

  //   fireEvent.click(within(TaskForm).getByText('In progress'))
  //   fireEvent.blur(StatusField.querySelector('input'))

  //   const StoryPoints = TaskForm.querySelector('#task_story_points')
  //   expect(StoryPoints).toBeInTheDocument()
  //   fireEvent.click(StoryPoints)

  //   const storyPointsField = within(TaskForm).getByTestId('storyPoints')
  //   expect(storyPointsField).toBeInTheDocument()

  //   fireEvent.click(storyPointsField)
  //   fireEvent.focus(storyPointsField)
  //   fireEvent.change(storyPointsField, {
  //     target: { value: 20 }
  //   })
  //   initialState.Tasks.createStoryForm.storyPoints = 20

  //   fireEvent.blur(storyPointsField)

  //   const autocomplete = within(TaskForm).getByTestId('tags_autocomplete')

  //   const TagField = within(autocomplete).getByTestId('tags')
  //   expect(TagField).toBeInTheDocument()

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag1' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag1']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Shift' })
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))

  //   const Options = screen.getAllByRole('presentation')[1]
  //   expect(Options).toBeInTheDocument()
  //   fireEvent.click(within(Options).getByText('Tag1'))

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   const Description = within(TaskForm).getByTestId('description')
  //   fireEvent.click(Description)

  //   const DescriptionField = within(TaskForm).getByTestId('description')
  //   expect(DescriptionField).toBeInTheDocument()

  //   fireEvent.click(DescriptionField)
  //   fireEvent.focus(DescriptionField)
  //   fireEvent.change(DescriptionField, {
  //     target: { value: 'test task descriptions' }
  //   })
  //   initialState.Tasks.createStoryForm.description = 'test task descriptions'

  //   fireEvent.blur(DescriptionField)

  //   const CommentField = within(TaskForm).getByTestId('comment')
  //   expect(CommentField).toBeInTheDocument()

  //   fireEvent.click(CommentField)
  //   fireEvent.focus(CommentField)
  //   fireEvent.change(CommentField, {
  //     target: { value: 'test new comment' }
  //   })
  //   initialState.Tasks.createStoryForm.comments = ['test new comment']

  //   fireEvent.blur(CommentField)

  //   SelectedTask.comments?.forEach(comment => {
  //     const CommentElement = within(TaskForm).getByTestId(`comment_${comment._id}`)
  //     expect(CommentElement).toBeInTheDocument()

  //     const CommentElement2 = within(TaskForm).getByTestId(`comment_${SelectedTask.comments[1]._id}`)
  //     expect(CommentElement2).toBeInTheDocument()

  //     fireEvent.mouseOver(CommentElement)

  //     fireEvent.mouseOver(CommentElement)

  //     if (comment?.userId === initialState.Auth.user._id) {
  //       fireEvent.click(within(CommentElement).getByTestId(`edit_${comment._id}_comment`))

  //       const AddedComment = within(CommentElement).getByTestId('added_comment')
  //       expect(AddedComment).toBeInTheDocument()

  //       fireEvent.change(AddedComment, {
  //         target: { value: 'test new comment' }
  //       })
  //       fireEvent.click(within(CommentElement).getByTestId('send_comment'))
  //     }

  //     fireEvent.mouseOut(CommentElement)
  //     fireEvent.mouseOver(CommentElement)
  //     fireEvent.mouseOut(CommentElement2)
  //   })

  //   const SaveButton = within(TaskForm).getByRole('button', { name: 'Save' })
  //   expect(SaveButton).toBeInTheDocument()
  //   await act(async () => {
  //     await fireEvent.click(SaveButton)
  //   })
  // })

  // it('renders Tasklist on mobile view and click on other department to edit the task with error respose', async () => {
  //   initialState.Tasks.createStoryForm = {
  //     taskName: '',
  //     storyPoints: '',
  //     priority: '',
  //     order: 1,
  //     description: '',
  //     status: '',
  //     businessId: '',
  //     departmentId: '',
  //     assignee: '',
  //     tags: [],
  //     tag: '',
  //     comments: []
  //   }

  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   updateTask.mockReturnValue(() => {
  //     return {
  //       status: 500,
  //       data: {
  //         message: 'Something went wrong'
  //       }
  //     }
  //   })

  //   setDepartment.mockReturnValue(() => {
  //     return true
  //   })

  //   renderWithRedux(<Tasklist setDepartment={setDepartment} />, { initialState })

  //   const TaskListPage = screen.getByTestId('task_list_page')
  //   expect(TaskListPage).toBeInTheDocument()

  //   const ProjectsPanel = TaskListPage.querySelector('#projects_panel')
  //   expect(ProjectsPanel).toBeInTheDocument()

  //   const Business = initialState.Business.projectList[1]

  //   const projectElement = within(ProjectsPanel).getByText(Business?.name)
  //   expect(projectElement).toBeInTheDocument()
  //   await act(async () => {
  //     await fireEvent.click(projectElement)
  //   })

  //   const departmentName = ProjectsPanel.querySelector(`#department_${Business?.businessDepartments?.[0]?._id}`)
  //   expect(departmentName).toHaveTextContent(Business?.businessDepartments?.[0]?.name)
  //   await act(async () => {
  //     await fireEvent.click(departmentName)
  //   })
  //   await waitFor(() => {
  //     expect(mockRouterPush).toHaveBeenCalledWith(`department/${Business?.businessDepartments?.[0]?._id}`)
  //   })

  //   useRouter.mockReturnValue({
  //     query: { id: Business?.businessDepartments?.[0]?._id },
  //     pathname: `/dashboard/department/${Business?.businessDepartments?.[0]?._id}`,
  //     push: mockRouterPush,
  //     replace: jest.fn(),
  //     prefetch: jest.fn(),
  //     back: jest.fn()
  //   })

  //   renderWithRedux(<DepartmentDetail />, { initialState })

  //   const DetailContainer = screen.getByTestId('mobile_department_detail')
  //   expect(DetailContainer).toBeInTheDocument()

  //   const AddTaskButton = within(DetailContainer).getByRole('button', { name: 'Add' })
  //   expect(AddTaskButton).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(AddTaskButton)
  //   })

  //   const TaskCancelButton = screen.getByRole('button', { name: 'CANCEL' })
  //   await act(async () => {
  //     await fireEvent.click(TaskCancelButton)
  //   })

  //   const Tag = initialState.Departments.selectedDepartment.departmentTags[0]
  //   const TagAccordian = screen.getByTestId(`tag_${Tag?._id}`)
  //   fireEvent.click(TagAccordian)

  //   const Task1 = TagAccordian.querySelector(`#task_${Tag?.tasks[0]._id}`)
  //   fireEvent.click(Task1)

  //   await waitFor(() => {
  //     expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/ticket/${Tag?.tasks[0]._id}`)
  //   })

  //   useRouter.mockReturnValue({
  //     query: { id: Tag?.tasks[0]._id },
  //     pathname: `/dashboard/ticket/${Tag?.tasks[0]._id}`,
  //     push: mockRouterPush,
  //     replace: jest.fn(),
  //     prefetch: jest.fn(),
  //     back: jest.fn()
  //   })
  //   initialState.Tasks.selectedTask = _.cloneDeep(SELECTED_TASK)
  //   const SelectedTask = _.cloneDeep(SELECTED_TASK)
  //   initialState.Tasks.createStoryForm = {
  //     taskName: SelectedTask?.taskName,
  //     storyPoints: SelectedTask?.storyPoints,
  //     priority: SelectedTask?.priority,
  //     order: 1,
  //     description: SelectedTask?.description,
  //     status: SelectedTask?.status,
  //     businessId: SelectedTask?.businessId || departmentData?.businessId,
  //     departmentId: SelectedTask?.departmentId || departmentData?.departmentId,
  //     assignee: SelectedTask?.assignee,
  //     tags: SelectedTask?.tags,
  //     tag: SelectedTask?.tag,
  //     ticketCode: SelectedTask?.ticketCode
  //   }
  //   renderWithRedux(<TicketDetail />, { initialState })
  //   const TicketContainer = screen.getByTestId('ticket_detail')
  //   expect(TicketContainer).toBeInTheDocument()

  //   const TaskForm = within(TicketContainer).getByTestId('mobile_task_form')
  //   expect(TaskForm).toBeInTheDocument()

  //   if (SelectedTask?.ticketCode) {
  //     const TicketIssue = TaskForm.querySelector(`#ticket_code`)
  //     expect(TicketIssue).toBeInTheDocument()
  //     expect(TicketIssue).toHaveTextContent(`ISSUE ${SelectedTask?.ticketCode?.toLowerCase()}`)
  //   }
  //   const TicketName = TaskForm.querySelector(`#task_name`)
  //   expect(TicketName).toBeInTheDocument()
  //   expect(TicketName).toHaveTextContent(`${SelectedTask?.taskName}`)
  //   fireEvent.click(TicketName)

  //   const TaskName = faker.string.alpha(10)
  //   const NameField = within(TaskForm).getByTestId('taskName')
  //   expect(NameField).toBeInTheDocument()

  //   fireEvent.focus(NameField)
  //   fireEvent.change(NameField, { target: { value: TaskName } })
  //   initialState.Tasks.createStoryForm.taskName = TaskName
  //   fireEvent.blur(NameField)

  //   const Assigee = SelectedTask.department.contracts.find(
  //     contract => contract?.freelancer?.userId === SelectedTask?.assignee
  //   )

  //   const NewAssigee = SelectedTask.department.client
  //   expect(TaskForm.querySelector(`#task_name`)).toBeInTheDocument()

  //   const CurrentAssignee = within(TaskForm).getByText(`${Assigee?.freelancer?.user.email}`)
  //   fireEvent.click(CurrentAssignee)

  //   const AssigneeField = within(TaskForm).getAllByRole('combobox')[0]
  //   expect(AssigneeField).toBeInTheDocument()

  //   fireEvent.focus(AssigneeField)
  //   fireEvent.keyDown(AssigneeField, { key: 'ArrowDown', code: 'ArrowDown' })

  //   const Option = screen.getAllByText(NewAssigee.email)[0]
  //   expect(Option).toBeInTheDocument()
  //   initialState.Tasks.createStoryForm.assignee = NewAssigee._id
  //   fireEvent.click(Option)
  //   fireEvent.change(AssigneeField, { target: { value: NewAssigee._id } })

  //   const Priority = within(TaskForm).getByTestId('priority_autocomplete')

  //   const PriorityField = within(Priority).getByTestId('priority')
  //   expect(PriorityField).toBeInTheDocument()

  //   fireEvent.focus(PriorityField.querySelector('input'))
  //   fireEvent.change(PriorityField.querySelector('input'), {
  //     target: { value: 'highest' }
  //   })

  //   initialState.Tasks.createStoryForm.priority = 'highest'
  //   fireEvent.keyDown(PriorityField, { key: 'Enter' })
  //   fireEvent.blur(PriorityField)

  //   fireEvent.focus(PriorityField.querySelector('input'))

  //   fireEvent.click(within(TaskForm).getByText('highest'))

  //   const Status = within(TaskForm).getByTestId('status_autocomplete')

  //   const StatusField = within(Status).getByTestId('status')
  //   expect(StatusField).toBeInTheDocument()

  //   fireEvent.focus(StatusField.querySelector('input'))
  //   fireEvent.change(StatusField.querySelector('input'), {
  //     target: { value: 'In progress' }
  //   })

  //   initialState.Tasks.createStoryForm.status = 'In progress'
  //   fireEvent.keyDown(StatusField, { key: 'Enter' })
  //   fireEvent.blur(StatusField)

  //   fireEvent.focus(StatusField.querySelector('input'))

  //   fireEvent.click(within(TaskForm).getByText('In progress'))
  //   fireEvent.blur(StatusField.querySelector('input'))

  //   const StoryPoints = TaskForm.querySelector('#task_story_points')
  //   expect(StoryPoints).toBeInTheDocument()
  //   fireEvent.click(StoryPoints)

  //   const storyPointsField = within(TaskForm).getByTestId('storyPoints')
  //   expect(storyPointsField).toBeInTheDocument()

  //   fireEvent.click(storyPointsField)
  //   fireEvent.focus(storyPointsField)
  //   fireEvent.change(storyPointsField, {
  //     target: { value: 20 }
  //   })
  //   initialState.Tasks.createStoryForm.storyPoints = 20

  //   fireEvent.blur(storyPointsField)

  //   const autocomplete = within(TaskForm).getByTestId('tags_autocomplete')

  //   const TagField = within(autocomplete).getByTestId('tags')
  //   expect(TagField).toBeInTheDocument()

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag1' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag1']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Shift' })
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))

  //   const Options = screen.getAllByRole('presentation')[1]
  //   expect(Options).toBeInTheDocument()
  //   fireEvent.click(within(Options).getByText('Tag1'))

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   const Description = within(TaskForm).getByTestId('description')
  //   fireEvent.click(Description)

  //   const DescriptionField = within(TaskForm).getByTestId('description')
  //   expect(DescriptionField).toBeInTheDocument()

  //   fireEvent.click(DescriptionField)
  //   fireEvent.focus(DescriptionField)
  //   fireEvent.change(DescriptionField, {
  //     target: { value: 'test task descriptions' }
  //   })
  //   initialState.Tasks.createStoryForm.description = 'test task descriptions'

  //   fireEvent.blur(DescriptionField)

  //   const CommentField = within(TaskForm).getByTestId('comment')
  //   expect(CommentField).toBeInTheDocument()

  //   fireEvent.click(CommentField)
  //   fireEvent.focus(CommentField)
  //   fireEvent.change(CommentField, {
  //     target: { value: 'test new comment' }
  //   })
  //   initialState.Tasks.createStoryForm.comments = ['test new comment']

  //   fireEvent.blur(CommentField)

  //   SelectedTask.comments?.forEach(comment => {
  //     const CommentElement = within(TaskForm).getByTestId(`comment_${comment._id}`)
  //     expect(CommentElement).toBeInTheDocument()

  //     const CommentElement2 = within(TaskForm).getByTestId(`comment_${SelectedTask.comments[1]._id}`)
  //     expect(CommentElement2).toBeInTheDocument()

  //     fireEvent.mouseOver(CommentElement)

  //     fireEvent.mouseOver(CommentElement)

  //     if (comment?.userId === initialState.Auth.user._id) {
  //       fireEvent.click(within(CommentElement).getByTestId(`edit_${comment._id}_comment`))

  //       const AddedComment = within(CommentElement).getByTestId('added_comment')
  //       expect(AddedComment).toBeInTheDocument()

  //       fireEvent.change(AddedComment, {
  //         target: { value: 'test new comment' }
  //       })
  //       fireEvent.click(within(CommentElement).getByTestId('send_comment'))
  //     }

  //     fireEvent.mouseOut(CommentElement)
  //     fireEvent.mouseOver(CommentElement)
  //     fireEvent.mouseOut(CommentElement2)
  //   })

  //   const SaveButton = within(TaskForm).getByRole('button', { name: 'Save' })
  //   expect(SaveButton).toBeInTheDocument()
  //   await act(async () => {
  //     await fireEvent.click(SaveButton)
  //   })
  // })
  // it('renders Tasklist on mobile view without some data', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))

  //   setDepartment.mockReturnValue(() => {
  //     return true
  //   })

  //   renderWithRedux(<Tasklist setDepartment={setDepartment} />, { initialState })

  //   const TaskListPage = screen.getByTestId('task_list_page')
  //   expect(TaskListPage).toBeInTheDocument()

  //   const ProjectsPanel = TaskListPage.querySelector('#projects_panel')
  //   expect(ProjectsPanel).toBeInTheDocument()

  //   const Business = initialState.Business.projectList[1]

  //   const projectElement = within(ProjectsPanel).getByText(Business?.name)
  //   expect(projectElement).toBeInTheDocument()
  //   await act(async () => {
  //     await fireEvent.click(projectElement)
  //   })

  //   const departmentName = ProjectsPanel.querySelector(`#department_${Business?.businessDepartments?.[0]?._id}`)
  //   expect(departmentName).toHaveTextContent(Business?.businessDepartments?.[0]?.name)
  //   await act(async () => {
  //     await fireEvent.click(departmentName)
  //   })
  //   await waitFor(() => {
  //     expect(mockRouterPush).toHaveBeenCalledWith(`department/${Business?.businessDepartments?.[0]?._id}`)
  //   })

  //   useRouter.mockReturnValue({
  //     query: { id: Business?.businessDepartments?.[0]?._id },
  //     pathname: `/dashboard/department/${Business?.businessDepartments?.[0]?._id}`,
  //     push: mockRouterPush,
  //     replace: jest.fn(),
  //     prefetch: jest.fn(),
  //     back: jest.fn()
  //   })

  //   renderWithRedux(<DepartmentDetail />, { initialState })

  //   const DetailContainer = screen.getByTestId('mobile_department_detail')
  //   expect(DetailContainer).toBeInTheDocument()

  //   const AddTaskButton = within(DetailContainer).getByRole('button', { name: 'Add' })
  //   expect(AddTaskButton).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(AddTaskButton)
  //   })

  //   const TaskCancelButton = screen.getByRole('button', { name: 'CANCEL' })
  //   await act(async () => {
  //     await fireEvent.click(TaskCancelButton)
  //   })

  //   const Tag = initialState.Departments.selectedDepartment.departmentTags[0]
  //   const TagAccordian = screen.getByTestId(`tag_${Tag?._id}`)
  //   fireEvent.click(TagAccordian)

  //   const Task1 = TagAccordian.querySelector(`#task_${Tag?.tasks[0]._id}`)
  //   fireEvent.click(Task1)

  //   await waitFor(() => {
  //     expect(mockRouterPush).toHaveBeenCalledWith(`/dashboard/ticket/${Tag?.tasks[0]._id}`)
  //   })

  //   useRouter.mockReturnValue({
  //     query: { id: Tag?.tasks[0]._id },
  //     pathname: `/dashboard/ticket/${Tag?.tasks[0]._id}`,
  //     push: mockRouterPush,
  //     replace: jest.fn(),
  //     prefetch: jest.fn(),
  //     back: jest.fn()
  //   })
  //   initialState.Tasks.selectedTask = _.cloneDeep(SELECTED_TASK)
  //   initialState.Tasks.selectedTask.businessId = null
  //   initialState.Tasks.selectedTask.departmentId = null
  //   initialState.Tasks.selectedTask.comments = initialState.Tasks.selectedTask.comments.slice(0, 5)
  //   const SelectedTask = _.cloneDeep(SELECTED_TASK)
  //   initialState.Tasks.createStoryForm = {
  //     taskName: SelectedTask?.taskName,
  //     storyPoints: SelectedTask?.storyPoints,
  //     priority: SelectedTask?.priority,
  //     order: 1,
  //     description: SelectedTask?.description,
  //     status: SelectedTask?.status,
  //     businessId: SelectedTask?.businessId || departmentData?.businessId,
  //     departmentId: SelectedTask?.departmentId || departmentData?.departmentId,
  //     assignee: SelectedTask?.assignee,
  //     tags: SelectedTask?.tags,
  //     tag: SelectedTask?.tag,
  //     ticketCode: SelectedTask?.ticketCode
  //   }
  //   renderWithRedux(<TicketDetail />, { initialState })
  //   const TicketContainer = screen.getByTestId('ticket_detail')
  //   expect(TicketContainer).toBeInTheDocument()

  //   const TaskForm = within(TicketContainer).getByTestId('mobile_task_form')
  //   expect(TaskForm).toBeInTheDocument()
  // })

  // it('renders Tasklist, click on Add Task for todo and submmit new task with success respose', async () => {
  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))
  //   initialState.Tasks.createStoryForm = {
  //     taskName: '',
  //     storyPoints: '',
  //     priority: '',
  //     order: 1,
  //     description: '',
  //     status: '',
  //     businessId: '',
  //     departmentId: '',
  //     assignee: '',
  //     tags: [],
  //     tag: '',
  //     comments: []
  //   }
  //   initialState.Tasks.createStoryForm.businessId = initialState.Departments.selectedDepartment.businessId
  //   initialState.Tasks.createStoryForm.departmentId = initialState.Departments.selectedDepartment._id

  //   setDepartment.mockReturnValue(() => {
  //     return true
  //   })

  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const TaskListPage = screen.getByTestId('task_list_page')
  //   expect(TaskListPage).toBeInTheDocument()

  //   const ProjectsPanel = TaskListPage.querySelector('#projects_panel')
  //   expect(ProjectsPanel).toBeInTheDocument()

  //   const Business = initialState.Business.projectList[1]

  //   const projectElement = within(ProjectsPanel).getByText(Business?.name)
  //   expect(projectElement).toBeInTheDocument()
  //   await act(async () => {
  //     await fireEvent.click(projectElement)
  //   })

  //   const departmentName = ProjectsPanel.querySelector(`#department_${Business?.businessDepartments?.[0]?._id}`)
  //   expect(departmentName).toHaveTextContent(Business?.businessDepartments?.[0]?.name)
  //   await act(async () => {
  //     await fireEvent.click(departmentName)
  //   })
  //   await waitFor(() => {
  //     expect(mockRouterPush).toHaveBeenCalledWith(`department/${Business?.businessDepartments?.[0]?._id}`)
  //   })

  //   useRouter.mockReturnValue({
  //     query: { id: Business?.businessDepartments?.[0]?._id },
  //     pathname: `/dashboard/department/${Business?.businessDepartments?.[0]?._id}`,
  //     push: mockRouterPush,
  //     replace: jest.fn(),
  //     prefetch: jest.fn(),
  //     back: jest.fn()
  //   })

  //   renderWithRedux(<DepartmentDetail />, { initialState })

  //   const DetailContainer = screen.getByTestId('mobile_department_detail')
  //   expect(DetailContainer).toBeInTheDocument()

  //   const AddTaskButton = within(DetailContainer).getByRole('button', { name: 'Add' })
  //   expect(AddTaskButton).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(AddTaskButton)
  //   })

  //   const TaskForm = screen.getByTestId('mobile_task_form')
  //   expect(TaskForm).toBeInTheDocument()

  //   const SaveTaskButton = within(TaskForm).getByRole('button', { name: 'Save' })
  //   expect(SaveTaskButton).toBeInTheDocument()

  //   // // Task Name
  //   const taskNameField = within(TaskForm).getByTestId('taskName')
  //   expect(taskNameField).toBeInTheDocument()

  //   fireEvent.click(taskNameField)
  //   fireEvent.change(taskNameField, {
  //     target: { value: '' }
  //   })
  //   initialState.Tasks.createStoryForm.taskName = ''

  //   fireEvent.blur(taskNameField)
  //   expect(within(TaskForm).getByText('Task Name is required.')).toBeInTheDocument()
  //   expect(taskNameField.value).toBe('')

  //   fireEvent.click(taskNameField)
  //   fireEvent.change(taskNameField, {
  //     target: { value: 'new test task name' }
  //   })
  //   initialState.Tasks.createStoryForm.taskName = 'new test task name'

  //   fireEvent.blur(taskNameField)
  //   expect(taskNameField.value).toBe('new test task name')

  //   // End Task Name

  //   // // Assignee
  //   const OptionLabel = initialState.Departments.selectedDepartment.contracts[0]

  //   const AssigneeField = within(TaskForm).getAllByRole('combobox')[0]
  //   expect(AssigneeField).toBeInTheDocument()

  //   fireEvent.focus(AssigneeField)
  //   fireEvent.keyDown(AssigneeField, { key: 'ArrowDown', code: 'ArrowDown' })

  //   const Option = screen.getByText(OptionLabel.freelancer.user.email)
  //   expect(Option).toBeInTheDocument()
  //   initialState.Tasks.createStoryForm.assignee = OptionLabel.freelancer.user._id
  //   fireEvent.click(Option)
  //   fireEvent.change(AssigneeField, { target: { value: OptionLabel.freelancer.user._id } })

  //   // // // End Assignee

  //   // // // Tags
  //   const autocomplete = within(TaskForm).getByTestId('tags_autocomplete')

  //   const TagField = within(autocomplete).getByTestId('tags')
  //   expect(TagField).toBeInTheDocument()

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag1' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag1']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Shift' })
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))

  //   const Options = screen.getAllByRole('presentation')[1]
  //   expect(Options).toBeInTheDocument()
  //   fireEvent.click(within(Options).getByText('Tag1'))

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   // // // End Tags

  //   // // // Story Points
  //   const storyPointsField = within(TaskForm).getByTestId('storyPoints')
  //   expect(storyPointsField).toBeInTheDocument()

  //   fireEvent.click(storyPointsField)
  //   fireEvent.focus(storyPointsField)
  //   fireEvent.change(storyPointsField, {
  //     target: { value: null }
  //   })
  //   initialState.Tasks.createStoryForm.storyPoints = null

  //   fireEvent.blur(storyPointsField)

  //   expect(within(TaskForm).getByText('Story points are required.')).toBeInTheDocument()

  //   fireEvent.focus(storyPointsField)
  //   fireEvent.change(storyPointsField, {
  //     target: { value: 20 }
  //   })
  //   initialState.Tasks.createStoryForm.storyPoints = 20

  //   fireEvent.blur(storyPointsField)

  //   // // // End Story Points

  //   // // // Priority

  //   const Priority = screen.getByTestId('priority_autocomplete')

  //   const PriorityField = within(Priority).getByTestId('priority')
  //   expect(PriorityField).toBeInTheDocument()

  //   fireEvent.focus(PriorityField.querySelector('input'))
  //   fireEvent.change(PriorityField.querySelector('input'), {
  //     target: { value: null }
  //   })

  //   initialState.Tasks.createStoryForm.priority = null
  //   fireEvent.blur(PriorityField)

  //   expect(within(TaskForm).getByText('Priority is required.')).toBeInTheDocument()

  //   fireEvent.focus(PriorityField.querySelector('input'))
  //   fireEvent.change(PriorityField.querySelector('input'), {
  //     target: { value: 'highest' }
  //   })

  //   initialState.Tasks.createStoryForm.priority = 'highest'
  //   fireEvent.keyDown(PriorityField, { key: 'Enter' })
  //   fireEvent.blur(PriorityField)

  //   fireEvent.focus(PriorityField.querySelector('input'))

  //   fireEvent.click(within(TaskForm).getByText('highest'))

  //   // // // End Priority

  //   // // // Status

  //   const StatusField = within(TaskForm).getByPlaceholderText('Status')
  //   expect(StatusField).toBeInTheDocument()

  //   fireEvent.focus(StatusField)
  //   initialState.Tasks.createStoryForm.status = null
  //   fireEvent.keyDown(StatusField, { key: 'ArrowDown', code: 'ArrowDown' })
  //   fireEvent.blur(StatusField)

  //   fireEvent.focus(StatusField)
  //   initialState.Tasks.createStoryForm.status = 'Todo'
  //   fireEvent.keyDown(StatusField, { key: 'ArrowDown', code: 'ArrowDown' })

  //   const StatusOption = screen.getByText('Todo')
  //   expect(StatusOption).toBeInTheDocument()
  //   fireEvent.click(StatusOption)

  //   fireEvent.change(StatusField, { target: { value: 'Todo' } })
  //   fireEvent.blur(StatusField)

  //   // // // End Status

  //   const DescriptionField = within(TaskForm).getByTestId('description')
  //   expect(DescriptionField).toBeInTheDocument()

  //   fireEvent.click(DescriptionField)
  //   fireEvent.focus(DescriptionField)
  //   fireEvent.change(DescriptionField, {
  //     target: { value: 'test task descriptions' }
  //   })
  //   initialState.Tasks.createStoryForm.description = 'test task descriptions'

  //   fireEvent.blur(DescriptionField)

  //   await act(async () => {
  //     await fireEvent.focus(SaveTaskButton)
  //     await fireEvent.click(SaveTaskButton)
  //   })
  // })

  // it('renders Tasklist, click on Add Task for todo and submmit new task with error respose', async () => {
  //   createTask.mockReturnValue(() => {
  //     return {
  //       status: 500,
  //       data: {
  //         message: 'Something went wrong'
  //       }
  //     }
  //   })

  //   global.innerWidth = 640
  //   global.dispatchEvent(new Event('resize'))
  //   initialState.Tasks.createStoryForm = {
  //     taskName: '',
  //     storyPoints: '',
  //     priority: '',
  //     order: 1,
  //     description: '',
  //     status: '',
  //     businessId: '',
  //     departmentId: '',
  //     assignee: '',
  //     tags: [],
  //     tag: '',
  //     comments: []
  //   }
  //   initialState.Tasks.createStoryForm.businessId = initialState.Departments.selectedDepartment.businessId
  //   initialState.Tasks.createStoryForm.departmentId = initialState.Departments.selectedDepartment._id

  //   setDepartment.mockReturnValue(() => {
  //     return true
  //   })

  //   renderWithRedux(<Tasklist />, {
  //     initialState
  //   })

  //   const TaskListPage = screen.getByTestId('task_list_page')
  //   expect(TaskListPage).toBeInTheDocument()

  //   const ProjectsPanel = TaskListPage.querySelector('#projects_panel')
  //   expect(ProjectsPanel).toBeInTheDocument()

  //   const Business = initialState.Business.projectList[1]

  //   const projectElement = within(ProjectsPanel).getByText(Business?.name)
  //   expect(projectElement).toBeInTheDocument()
  //   await act(async () => {
  //     await fireEvent.click(projectElement)
  //   })

  //   const departmentName = ProjectsPanel.querySelector(`#department_${Business?.businessDepartments?.[0]?._id}`)
  //   expect(departmentName).toHaveTextContent(Business?.businessDepartments?.[0]?.name)
  //   await act(async () => {
  //     await fireEvent.click(departmentName)
  //   })
  //   await waitFor(() => {
  //     expect(mockRouterPush).toHaveBeenCalledWith(`department/${Business?.businessDepartments?.[0]?._id}`)
  //   })

  //   useRouter.mockReturnValue({
  //     query: { id: Business?.businessDepartments?.[0]?._id },
  //     pathname: `/dashboard/department/${Business?.businessDepartments?.[0]?._id}`,
  //     push: mockRouterPush,
  //     replace: jest.fn(),
  //     prefetch: jest.fn(),
  //     back: jest.fn()
  //   })

  //   renderWithRedux(<DepartmentDetail />, { initialState })

  //   const DetailContainer = screen.getByTestId('mobile_department_detail')
  //   expect(DetailContainer).toBeInTheDocument()

  //   const AddTaskButton = within(DetailContainer).getByRole('button', { name: 'Add' })
  //   expect(AddTaskButton).toBeInTheDocument()

  //   await act(async () => {
  //     await fireEvent.click(AddTaskButton)
  //   })

  //   const TaskForm = screen.getByTestId('mobile_task_form')
  //   expect(TaskForm).toBeInTheDocument()

  //   const SaveTaskButton = within(TaskForm).getByRole('button', { name: 'Save' })
  //   expect(SaveTaskButton).toBeInTheDocument()

  //   // // Task Name
  //   const taskNameField = within(TaskForm).getByTestId('taskName')
  //   expect(taskNameField).toBeInTheDocument()

  //   fireEvent.click(taskNameField)
  //   fireEvent.change(taskNameField, {
  //     target: { value: '' }
  //   })
  //   initialState.Tasks.createStoryForm.taskName = ''

  //   fireEvent.blur(taskNameField)
  //   expect(within(TaskForm).getByText('Task Name is required.')).toBeInTheDocument()
  //   expect(taskNameField.value).toBe('')

  //   fireEvent.click(taskNameField)
  //   fireEvent.change(taskNameField, {
  //     target: { value: 'new test task name' }
  //   })
  //   initialState.Tasks.createStoryForm.taskName = 'new test task name'

  //   fireEvent.blur(taskNameField)
  //   expect(taskNameField.value).toBe('new test task name')

  //   // End Task Name

  //   // // Assignee
  //   const OptionLabel = initialState.Departments.selectedDepartment.contracts[0]

  //   const AssigneeField = within(TaskForm).getAllByRole('combobox')[0]
  //   expect(AssigneeField).toBeInTheDocument()

  //   fireEvent.focus(AssigneeField)
  //   fireEvent.keyDown(AssigneeField, { key: 'ArrowDown', code: 'ArrowDown' })

  //   const Option = screen.getByText(OptionLabel.freelancer.user.email)
  //   expect(Option).toBeInTheDocument()
  //   initialState.Tasks.createStoryForm.assignee = OptionLabel.freelancer.user._id
  //   fireEvent.click(Option)
  //   fireEvent.change(AssigneeField, { target: { value: OptionLabel.freelancer.user._id } })

  //   // // // End Assignee

  //   // // // Tags
  //   const autocomplete = within(TaskForm).getByTestId('tags_autocomplete')

  //   const TagField = within(autocomplete).getByTestId('tags')
  //   expect(TagField).toBeInTheDocument()

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag1' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag1']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Shift' })
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))

  //   const Options = screen.getAllByRole('presentation')[1]
  //   expect(Options).toBeInTheDocument()
  //   fireEvent.click(within(Options).getByText('Tag1'))

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   fireEvent.focus(TagField.querySelector('input'))
  //   fireEvent.change(TagField.querySelector('input'), {
  //     target: { value: 'Tag2' }
  //   })

  //   initialState.Tasks.createStoryForm.tags = ['Tag2']
  //   fireEvent.keyDown(TagField.querySelector('input'), { key: 'Enter' })

  //   // // // End Tags

  //   // // // Story Points
  //   const storyPointsField = within(TaskForm).getByTestId('storyPoints')
  //   expect(storyPointsField).toBeInTheDocument()

  //   fireEvent.click(storyPointsField)
  //   fireEvent.focus(storyPointsField)
  //   fireEvent.change(storyPointsField, {
  //     target: { value: null }
  //   })
  //   initialState.Tasks.createStoryForm.storyPoints = null

  //   fireEvent.blur(storyPointsField)

  //   expect(within(TaskForm).getByText('Story points are required.')).toBeInTheDocument()

  //   fireEvent.focus(storyPointsField)
  //   fireEvent.change(storyPointsField, {
  //     target: { value: 20 }
  //   })
  //   initialState.Tasks.createStoryForm.storyPoints = 20

  //   fireEvent.blur(storyPointsField)

  //   // // // End Story Points

  //   // // // Priority

  //   const Priority = screen.getByTestId('priority_autocomplete')

  //   const PriorityField = within(Priority).getByTestId('priority')
  //   expect(PriorityField).toBeInTheDocument()

  //   fireEvent.focus(PriorityField.querySelector('input'))
  //   fireEvent.change(PriorityField.querySelector('input'), {
  //     target: { value: null }
  //   })

  //   initialState.Tasks.createStoryForm.priority = null
  //   fireEvent.blur(PriorityField)

  //   expect(within(TaskForm).getByText('Priority is required.')).toBeInTheDocument()

  //   fireEvent.focus(PriorityField.querySelector('input'))
  //   fireEvent.change(PriorityField.querySelector('input'), {
  //     target: { value: 'highest' }
  //   })

  //   initialState.Tasks.createStoryForm.priority = 'highest'
  //   fireEvent.keyDown(PriorityField, { key: 'Enter' })
  //   fireEvent.blur(PriorityField)

  //   fireEvent.focus(PriorityField.querySelector('input'))

  //   fireEvent.click(within(TaskForm).getByText('highest'))

  //   // // // End Priority

  //   // // // Status

  //   const StatusField = within(TaskForm).getByPlaceholderText('Status')
  //   expect(StatusField).toBeInTheDocument()

  //   fireEvent.focus(StatusField)
  //   initialState.Tasks.createStoryForm.status = null
  //   fireEvent.keyDown(StatusField, { key: 'ArrowDown', code: 'ArrowDown' })
  //   fireEvent.blur(StatusField)

  //   fireEvent.focus(StatusField)
  //   initialState.Tasks.createStoryForm.status = 'Todo'
  //   fireEvent.keyDown(StatusField, { key: 'ArrowDown', code: 'ArrowDown' })

  //   const StatusOption = screen.getByText('Todo')
  //   expect(StatusOption).toBeInTheDocument()
  //   fireEvent.click(StatusOption)

  //   fireEvent.change(StatusField, { target: { value: 'Todo' } })
  //   fireEvent.blur(StatusField)

  //   // // // End Status

  //   const DescriptionField = within(TaskForm).getByTestId('description')
  //   expect(DescriptionField).toBeInTheDocument()

  //   fireEvent.click(DescriptionField)
  //   fireEvent.focus(DescriptionField)
  //   fireEvent.change(DescriptionField, {
  //     target: { value: 'test task descriptions' }
  //   })
  //   initialState.Tasks.createStoryForm.description = 'test task descriptions'

  //   fireEvent.blur(DescriptionField)

  //   await act(async () => {
  //     await fireEvent.focus(SaveTaskButton)
  //     await fireEvent.click(SaveTaskButton)
  //   })
  // })

  // it('renders Tasklist and MobileFreelancerFooter components when window width is <= 680px', () => {
  //   global.innerWidth = 680
  //   global.dispatchEvent(new Event('resize'))

  //   renderWithRedux(<Tasklist />, { initialState })
  // })
})
