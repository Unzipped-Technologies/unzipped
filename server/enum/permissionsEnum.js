const { accountTypeEnum } = require('./accountTypeEnum')

const userPermissions = Object.freeze({
  // invoice
  invoice: 'invoice',

  // users
  ListUsers: 'listAllUsers',
  UpdateAllUsers: 'updateAllUsers',
  UpdateCurrentUsers: 'updateCurrentUsers',
  AddSkill: 'addSkill',
  ListFreelancers: 'listFreelancers',
  getFreelancerById: 'getFreelancerById',
  // lists
  GetList: 'getList',
  CreateList: 'createList',
  UserCreateList: 'userCreateList',
  GetUserLists: 'getUserLists',
  GetLists: 'getLists',
  UpdateLists: 'updateLists',
  DeleteLists: 'deleteLists',
  // businesses
  createBusiness: 'createBusiness',
  userCreateBusiness: 'userCreateBusiness',
  updateBusiness: 'updateBusiness',
  userUpdateBusiness: 'userUpdateBusiness',
  userListBusinesses: 'userListBusinesses',
  listAllBusinesses: 'listAllBusinesses',
  deleteBusiness: 'deleteBusiness',
  getBusinessById: 'getBusinessById',
  getBusinessByInvestor: 'getBusinessByInvestor',
  // departments
  CreateDepartment: 'createDepartment',
  UpdateDepartment: 'updateDepartment',
  GetDepartmentById: 'getDepartmentById',
  DeleteDepartment: 'deleteDepartment',
  selectDepartment: 'selectDepartment',
  ListDepartment: 'listDepartments',
  // likes
  UserLike: 'userLike',
  ListLikesForUser: 'listLikesForUser',
  UserDeleteLike: 'userDeleteLike',
  // tags
  CreateTag: 'createTag',
  UpdateTag: 'updateTag',
  GetTagById: 'getTagById',
  DeleteTag: 'deleteTag',
  ListTags: 'listTags',
  addComment: 'addComment',
  removeComment: 'removeComment',
  // tasks
  CreateTask: 'createTask',
  UpdateTask: 'updateTask',
  GetTaskById: 'getTaskById',
  DeleteTask: 'deleteTask',
  ListTask: 'listTasks',
  orderTasks: 'orderTasks',

  // task hours
  taskHours: 'taskHours',
  // stories
  CreateStory: 'createStory',
  UpdateStory: 'updateStory',
  GetStoryById: 'getStoryById',
  DeleteStory: 'deleteStory',
  ListStory: 'listStories',
  // messages
  sendMessage: 'sendMessage',
  getMessagesById: 'getMessagesById',
  UpdateMessage: 'UpdateMessage',

  // project applications
  createApplication: 'createApplication',
  updateApplication: 'updateApplication',
  deleteApplication: 'deleteApplication',
  getApplicationById: 'getApplicationById',
  getAllApplications: 'getAllApplications',

  // contract
  createContract: 'createContract',
  updateContract: 'updateContract',
  deleteContract: 'deleteContract',
  getContractById: 'getContractById',
  getAllContracts: 'getAllContracts',

  // questions
  createQuestion: 'createQuestion',
  updateQuestion: 'updateQuestion',
  deleteQuestion: 'deleteQuestion',
  getQuestionById: 'getQuestionById',
  getAllQuestions: 'getAllQuestions'
})

const accountTypePermissions = Object.freeze({
  [accountTypeEnum.FOUNDER]: [
    // users
    userPermissions.UpdateCurrentUsers,
    userPermissions.ListFreelancers,
    userPermissions.getFreelancerById,
    // lists
    userPermissions.GetList,
    userPermissions.UserCreateList,
    userPermissions.GetUserLists,
    userPermissions.UpdateLists,
    userPermissions.DeleteLists,
    // businesses
    userPermissions.userCreateBusiness,
    userPermissions.createBusiness,
    userPermissions.userUpdateBusiness,
    userPermissions.userListBusinesses,
    userPermissions.getBusinessById,
    userPermissions.listAllBusinesses,
    // likes
    userPermissions.UserLike,
    userPermissions.ListLikesForUser,
    userPermissions.UserDeleteLike,
    // department
    userPermissions.CreateDepartment,
    userPermissions.UpdateDepartment,
    userPermissions.GetDepartmentById,
    userPermissions.DeleteDepartment,
    userPermissions.selectDepartment,
    userPermissions.ListDepartment,
    // tags
    userPermissions.CreateTag,
    userPermissions.UpdateTag,
    userPermissions.GetTagById,
    userPermissions.DeleteTag,
    userPermissions.ListTags,
    userPermissions.addComment,
    userPermissions.removeComment,
    // tasks
    userPermissions.CreateTask,
    userPermissions.UpdateTask,
    userPermissions.GetTaskById,
    userPermissions.DeleteTask,
    userPermissions.ListTask,
    userPermissions.orderTasks,

    // invoice
    userPermissions.invoice,

    // task hours
    userPermissions.taskHours,

    // stories
    userPermissions.CreateStory,
    userPermissions.UpdateStory,
    userPermissions.GetStoryById,
    userPermissions.DeleteStory,
    userPermissions.ListStory,
    // message
    userPermissions.sendMessage,
    userPermissions.UpdateMessage,
    userPermissions.GetMessageById,
    userPermissions.DeleteMessage,
    userPermissions.getMessagesById,

    // contract
    userPermissions.createContract,
    userPermissions.updateContract,
    userPermissions.deleteContract,
    userPermissions.getContractById,
    userPermissions.getAllContracts,

    // project applications
    userPermissions.getApplicationById,
    userPermissions.getAllApplications,

    // questions
    userPermissions.createQuestion,
    userPermissions.updateQuestion,
    userPermissions.deleteQuestion,
    userPermissions.getQuestionById,
    userPermissions.getAllQuestions
  ],
  [accountTypeEnum.INVESTOR]: [
    // users
    userPermissions.UpdateCurrentUsers,
    userPermissions.AddSkill,
    userPermissions.ListFreelancers,
    userPermissions.getFreelancerById,
    // lists
    userPermissions.GetList,
    userPermissions.UserCreateList,
    userPermissions.GetUserLists,
    userPermissions.UpdateLists,
    userPermissions.DeleteLists,
    // businesses
    userPermissions.userListBusinesses,
    userPermissions.getBusinessByInvestor,
    userPermissions.listAllBusinesses,
    userPermissions.getBusinessById,

    // likes
    userPermissions.UserLike,
    userPermissions.ListLikesForUser,
    userPermissions.UserDeleteLike,
    // tasks
    userPermissions.CreateTask,
    userPermissions.UpdateTask,
    userPermissions.GetTaskById,
    userPermissions.DeleteTask,
    userPermissions.ListTask,
    userPermissions.orderTasks,
    userPermissions.addComment,
    userPermissions.removeComment,

    // task hours
    userPermissions.taskHours,
    // invoice
    userPermissions.invoice,
    // stories
    userPermissions.CreateStory,
    userPermissions.UpdateStory,
    userPermissions.GetStoryById,
    userPermissions.DeleteStory,
    userPermissions.ListStory,
    // messages
    userPermissions.sendMessage,
    userPermissions.UpdateMessage,
    userPermissions.GetMessageById,
    userPermissions.DeleteMessage,
    userPermissions.getMessagesById,

    // project applications
    userPermissions.createApplication,
    userPermissions.updateApplication,
    userPermissions.deleteApplication,
    userPermissions.getApplicationById,
    userPermissions.getAllApplications,

    // contract
    userPermissions.getContractById,
    userPermissions.getAllContracts,

    // questions
    userPermissions.createQuestion,
    userPermissions.updateQuestion,
    userPermissions.deleteQuestion,
    userPermissions.getQuestionById,
    userPermissions.getAllQuestions
  ],
  [accountTypeEnum.ADMIN]: [
    // users
    userPermissions.ListUsers,
    userPermissions.UpdateAllUsers,
    userPermissions.UpdateCurrentUsers,
    userPermissions.ListFreelancers,
    userPermissions.getFreelancerById,
    // lists
    userPermissions.GetList,
    userPermissions.CreateList,
    userPermissions.UserCreateList,
    userPermissions.GetUserLists,
    userPermissions.GetLists,
    userPermissions.UpdateLists,
    userPermissions.DeleteLists,
    // businesses
    userPermissions.createBusiness,
    userPermissions.userCreateBusiness,
    userPermissions.updateBusiness,
    userPermissions.userUpdateBusiness,
    userPermissions.userListBusinesses,
    userPermissions.listAllBusinesses,
    userPermissions.deleteBusiness,
    userPermissions.getBusinessById,
    userPermissions.getBusinessByInvestor,
    // likes
    userPermissions.UserLike,
    userPermissions.ListLikesForUser,
    userPermissions.UserDeleteLike,
    // department
    userPermissions.CreateDepartment,
    userPermissions.UpdateDepartment,
    userPermissions.GetDepartmentById,
    userPermissions.DeleteDepartment,
    userPermissions.selectDepartment,
    userPermissions.ListDepartment,
    // tags
    userPermissions.CreateTag,
    userPermissions.UpdateTag,
    userPermissions.GetTagById,
    userPermissions.DeleteTag,
    userPermissions.ListTags,
    // tasks
    userPermissions.CreateTask,
    userPermissions.UpdateTask,
    userPermissions.GetTaskById,
    userPermissions.DeleteTask,
    userPermissions.ListTask,
    userPermissions.orderTasks,
    userPermissions.addComment,
    userPermissions.removeComment,

    // task hours
    userPermissions.taskHours,
    // invoice
    userPermissions.invoice,
    // stories
    userPermissions.CreateStory,
    userPermissions.UpdateStory,
    userPermissions.GetStoryById,
    userPermissions.DeleteStory,
    userPermissions.ListStory,
    // message
    userPermissions.sendMessage,
    userPermissions.UpdateMessage,
    userPermissions.GetMessageById,
    userPermissions.DeleteMessage,
    userPermissions.getMessagesById,

    // project applications
    userPermissions.createApplication,
    userPermissions.updateApplication,
    userPermissions.deleteApplication,
    userPermissions.getApplicationById,
    userPermissions.getAllApplications,

    // contract
    userPermissions.createContract,
    userPermissions.updateContract,
    userPermissions.deleteContract,
    userPermissions.getContractById,
    userPermissions.getAllContracts,

    // questions
    userPermissions.createQuestion,
    userPermissions.updateQuestion,
    userPermissions.deleteQuestion,
    userPermissions.getQuestionById,
    userPermissions.getAllQuestions
  ]
})

module.exports = {
  accountTypePermissions
}
