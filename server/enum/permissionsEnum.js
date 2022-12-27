const { accountTypeEnum } = require('./accountTypeEnum')

const userPermissions = Object.freeze({
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
    // departments
    CreateDepartment: 'createDepartment',
    UpdateDepartment: 'updateDepartment',
    GetDepartmentById: 'getDepartmentById',
    DeleteDepartment: 'deleteDepartment',
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
    // stories
    CreateStory: 'createStory',
    UpdateStory: 'updateStory',
    GetStoryById: 'getStoryById',
    DeleteStory: 'deleteStory',
    ListStory: 'listStories',
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
        // likes
        userPermissions.UserLike,
        userPermissions.ListLikesForUser,
        userPermissions.UserDeleteLike,
        // department
        userPermissions.CreateDepartment,
        userPermissions.UpdateDepartment,
        userPermissions.GetDepartmentById,
        userPermissions.DeleteDepartment,
        userPermissions.ListDepartments,
        // tags
        userPermissions.CreateTag,
        userPermissions.UpdateTag,
        userPermissions.GetTagById,
        userPermissions.DeleteTag,
        userPermissions.ListTags,
        // stories
        userPermissions.CreateStory,
        userPermissions.UpdateStory,
        userPermissions.GetStoryById,
        userPermissions.DeleteStory,
        userPermissions.ListStories,
        // message
        userPermissions.CreateMessage,
        userPermissions.UpdateMessage,
        userPermissions.GetMessageById,
        userPermissions.DeleteMessage,
        userPermissions.ListMessages,
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
        // likes
        userPermissions.UserLike,
        userPermissions.ListLikesForUser,
        userPermissions.UserDeleteLike,
        // stories
        userPermissions.CreateStory,
        userPermissions.UpdateStory,
        userPermissions.GetStoryById,
        userPermissions.DeleteStory,
        userPermissions.ListStories,
        // messages
        userPermissions.CreateMessage,
        userPermissions.UpdateMessage,
        userPermissions.GetMessageById,
        userPermissions.DeleteMessage,
        userPermissions.ListMessages,
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
        // likes
        userPermissions.UserLike,
        userPermissions.ListLikesForUser,
        userPermissions.UserDeleteLike,
        // department
        userPermissions.CreateDepartment,
        userPermissions.UpdateDepartment,
        userPermissions.GetDepartmentById,
        userPermissions.DeleteDepartment,
        userPermissions.ListDepartments,
        // tags
        userPermissions.CreateTag,
        userPermissions.UpdateTag,
        userPermissions.GetTagById,
        userPermissions.DeleteTag,
        userPermissions.ListTags,
        // stories
        userPermissions.CreateStory,
        userPermissions.UpdateStory,
        userPermissions.GetStoryById,
        userPermissions.DeleteStory,
        userPermissions.ListStories,
        // message
        userPermissions.CreateMessage,
        userPermissions.UpdateMessage,
        userPermissions.GetMessageById,
        userPermissions.DeleteMessage,
        userPermissions.ListMessages,
    ]
})
  
module.exports = {
    accountTypePermissions
}
  