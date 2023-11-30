const UserModel = require('../../models/User');

const getAllUsers = async (skip) => {
    try {
        let limit = 20;
        let number = skip * limit;
        const users = await UserModel.find().skip( number ).limit( limit );
        return users;
        
    } catch (error) {
        console.log(`Error: OrderService.getAllUsers Failed to find users: ${error}`);
    }
}

module.exports = {
    getAllUsers,
}