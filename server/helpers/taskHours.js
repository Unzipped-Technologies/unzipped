const Department = require('../../models/Department');
const Task = require('../../models/Task');
const TaskHoursModel = require('../../models/TaskHours')

const getAllTaskHours = async (userId) => {
    try {
        const result = await TaskHoursModel.find({ userId: userId }).exec();
        const count = await TaskHoursModel.count({ userId: userId }).exec();
        return { count: count, result: result };
    } catch (e) {
        throw Error(`Error: Failed to load task hours for user ${userId}: ${e}`);
    }
}

const createTaskHours = async (taskHours) => {
    try {
        const result = await TaskHoursModel.create(taskHours);
        return result;
    } catch (e) {
        throw Error(`Error: Failed to create task hours: ${e}`);
    }
}

const updateTaskHours = async ({ hours, _id }) => {
    try {
        const result = await TaskHoursModel.findByIdAndUpdate(_id, { $set: { hours: hours } }, { new: true });
        return result;
    } catch (e) {
        throw Error(`Error: Failed to update task hours: ${e}`);
    }
}

const updateTaskTime = async ({ updatedAt, _id }) => {
    try {
        const result = await TaskHoursModel.findByIdAndUpdate(_id, { $set: { updatedAt: updatedAt } }, { new: true });
        return result
    } catch (error) {
        throw Error(`Error: Failed to update task time: ${e}`);
    }
}

const updateTaskStatus = async ({ tag, _id }) => {
    try {
        const taskId = await TaskHoursModel.findById(_id, '_id taskId')
        const updatedTask = await Task.findByIdAndUpdate(taskId.taskId, {
            $set: {
                tag: tag,
            }
        },
            { new: true }
        );
        const updatedDep = await Department.updateOne(
            { "tasks._id": taskId.taskId },
            { $set: { "tasks.$.tag": tag } },
            { new: true }
        );
        return { updatedTask: updatedTask, updatedDep: updatedDep };
    } catch (e) {
        throw Error(`Error: Failed to update task time: ${e}`);
    }
}

const deleteTaskHours = async (taskHoursId) => {
    try {
        const result = await TaskHoursModel.softDelete({ _id: taskHoursId });
        if (result) return { affected: 1, msg: 'Successfully deleted!', record: result }
        return { affected: 0, msg: 'No record found!' }
    } catch (e) {
        throw Error(`Error: Failed to delete taskHoursId ${taskHoursId}, ${e}`)
    }
}

module.exports = {
    getAllTaskHours,
    createTaskHours,
    updateTaskHours,
    deleteTaskHours,
    updateTaskTime,
    updateTaskStatus,
}
