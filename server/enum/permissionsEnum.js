const { accountTypeEnum } = require('./accountTypeEnum')

const userPermissions = Object.freeze({
    // users
    ListUsers: 'listAllUsers',
    UpdateAllUsers: 'updateAllUsers',
    UpdateCurrentUsers: 'updateCurrentUsers',
    AddSkill: 'addSkill',
    ListFreelancers: 'listFreelancers',
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
    // likes
    UserLike: 'userLike',
    ListLikesForUser: 'listLikesForUser',
    UserDeleteLike: 'userDeleteLike',
})

const accountTypePermissions = Object.freeze({
    [accountTypeEnum.FOUNDER]: [
        // users
        userPermissions.UpdateCurrentUsers,
        userPermissions.ListFreelancers,
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
    ],
    [accountTypeEnum.INVESTOR]: [
        // users
        userPermissions.UpdateCurrentUsers,
        userPermissions.AddSkill,
        userPermissions.ListFreelancers,
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
    ],
    [accountTypeEnum.ADMIN]: [
        // users
        userPermissions.ListUsers,
        userPermissions.UpdateAllUsers,
        userPermissions.UpdateCurrentUsers,
        userPermissions.ListFreelancers,
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
    ]
})
  
module.exports = {
    accountTypePermissions
}
  