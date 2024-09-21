const { accountTypePermissions } = require('../enum/permissionsEnum.js')
const userHelper = require('../helpers/user')
const UnauthorizedError = require('../exceptions/UnauthorizedError')

const hasPermission = permissions => async (req, _, next) => {
  try {
    const existingUser = await userHelper.getSingleUser({ _id: req.user.sub })

    if (!existingUser) throw Error('user does not exist.')
    req['user']['userInfo'] = existingUser
    const role = existingUser.role || 0
    const userPermissions = accountTypePermissions[role]
    const isString = value => typeof value === 'string'
    if (isString(permissions)) {
      permissions = [[permissions]]
    } else if (Array.isArray(permissions) && permissions.every(isString)) {
      permissions = [permissions]
    }
    const isAllowed = permissions.some(permissionArray =>
      permissionArray.every(permission => userPermissions.includes(permission))
    )
    if (isAllowed) {
      return next()
    }
    return next(new UnauthorizedError({ message: 'Permission denied' }))
  } catch (e) {
    return _.status(400).json({ message: 'user does not exist', errror: e })
  }
}

module.exports = {
  hasPermission
}
