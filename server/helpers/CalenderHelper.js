const CalenderModel = require('../../models/CalenderSettings')

const createCalender = async (params) => {
    const calenderCreated = await CalenderModel.create(params);
    return calenderCreated;
}

module.exports = {
    createCalender
}