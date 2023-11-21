const { accountTypeEnum } = require('./accountTypeEnum')

const userPermissions = Object.freeze({
    // invoice
    invoice: "invoice",

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
    ListTag: 'listTags',
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
    taskHours:'taskHours',
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
        userPermissions.userUpdateBusiness,
        userPermissions.userListBusinesses,
        userPermissions.getBusinessById,
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
        userPermissions.userCreateBusiness,
        userPermissions.userUpdateBusiness,
        userPermissions.userListBusinesses,
        userPermissions.getBusinessByInvestor,
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
    ]
})
  
module.exports = {
    accountTypePermissions
}
  