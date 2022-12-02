const { accountTypeEnum } = require('./accountTypeEnum')

const userPermissions = Object.freeze({
    ListUsers: 'listAllUsers',
    UpdateAllUsers: 'updateAllUsers',
    UpdateCurrentUsers: 'updateCurrentUsers',
    AddSkill: 'addSkill',
    ListFreelancers: 'listFreelancers',
})

const accountTypePermissions = Object.freeze({
    [accountTypeEnum.FOUNDER]: [
        userPermissions.UpdateCurrentUsers,
        userPermissions.ListFreelancers,
    ],
    [accountTypeEnum.INVESTOR]: [
        userPermissions.UpdateCurrentUsers,
        userPermissions.AddSkill,
        userPermissions.ListFreelancers,
    ],
    [accountTypeEnum.ADMIN]: [
        userPermissions.ListUsers,
        userPermissions.UpdateAllUsers,
        userPermissions.UpdateCurrentUsers,
        userPermissions.ListFreelancers,
    ]
})
  
module.exports = {
    accountTypePermissions
}
  