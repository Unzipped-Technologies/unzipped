const department = require('../../models/Department');
const business = require('../../models/Business');
const tags = require('../../models/tags');
const tasks = require('../../models/Task');
const businessAssociatesItems = require('../../models/BusinessAssociatesItem');
const user = require('../../models/User');
const mongoose = require('mongoose');
const { Users } = require('react-feather');

const createDepartments = async (data) => {
    return await department.create(data);
}

// add a department to a business
const addDepartmentToBusiness = async (data, id) => {
    try {
        const item = {
            ...data,
            tags: [],
            tasks: [],
            employees: [],
        }
        const Dept = await department.create(item)

        // create initial tags for department
        const initTags = [
            {
                departmentId: Dept.id,
                tagName: "To Do",
                department: await department.findById(Dept.id)
            },
            {
                departmentId: Dept.id,
                tagName: "In Progress",
                department: await department.findById(Dept.id)
            },
            {
                departmentId: Dept.id,
                tagName: "Done",
                department: await department.findById(Dept.id)
            },
        ]
        for (const tag of initTags) {
            await tags.create(tag)
        }
        // update business to have department
        await business.findByIdAndUpdate(data.BusinessId, { 
            departments: await department.find({businessId: data.businessId})
        });
        // update department with new tags
        await department.findByIdAndUpdate(Dept.id, {
            tags: await tags.find({departmentId: Dept.id})
        })

        return {msg: `department created for ${data.businessId}`};
    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}

const getDepartmentById = async (id) => {
    try {
        const departments = await department.findById(id)
        await department.updateMany({ businessId: departments.businessId }, {$set: { isSelected: false }})
        const selectedDepartment = await department.findByIdAndUpdate(id, {$set: { isSelected: true }})
        console.log(selectedDepartment.tasks)
        const getUsers = await user.find({ _id: {$in: selectedDepartment?.tasks?.map(e => e.assigneeId && e.assigneeId) || []}}).select('email FirstName LastName profileImage freelancers')
        return {...selectedDepartment._doc, employees: getUsers, isSelected: true}
    } catch (e) {
        throw Error(`Could not find user, error: ${e}`);
    } 
}

// list departments
const listDepartments = async ({filter, take, skip}) => {
    try {
        const list = await department.find({...filter})
            .skip( skip )
            .limit( take )
            // get users associated with this department
            .populate({
                path: 'businessAssociatesItems', 
                model: 'businessAssociatesItems'
            })
            .exec()
        return list;
    } catch (e) {
        throw Error(`Could not find department, error: ${e}`);
    } 
}

const updateDepartment = async (data) => {
    return await department.findByIdAndUpdate(data.listId, {$set:{...data}});
}

const deleteDepartment = async (id) => {
    await department.findByIdAndDelete(id);
    await businessAssociatesItems.deleteMany({listId: id})
}

const addBusinessAssociateToBusiness = async (data) => {
    try {
        const [success] = await Promise.all([
            businessAssociatesItems.create({
                ...data,
                profile: await user.findById(data.profileId).select('email FirstName LastName profileImage freelancers')
            }),
            department.findByIdAndUpdate(data.departmentId, {
                employees: await businessAssociatesItems.find({departmentId: data.departmentId})
            }),
            business.findByIdAndUpdate(data.businessId, {
                employees: await businessAssociatesItems.find({businessId: data.businessId})
            })
        ])
        return success
    } catch (e) {
        throw Error(`Something went wrong ${e}`);
    }
}

const addTagToDepartment = () => {
    return
}

const addTaskToDepartment = async (body, id) => {
    const Task = await tasks.create({
        ...body,
        tag: await tags.findById(body.tagId),
        userId: id,
        assigneeId: body.assigneeId,
        assignee: await user.findById(body.assigneeId)
    })
    await department.findByIdAndUpdate(body.departmentId, {
        tasks: await tasks.find({departmentId: body.departmentId})
    })
    return Task
}

const reorderTasks = async (tasks) => {
    await Promise.all(tasks.map(task => {
        tasks.findByIdAndUpdate(task._id, {order: task.order})
    }))
}


module.exports = {
    createDepartments,
    addDepartmentToBusiness,
    listDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
    addBusinessAssociateToBusiness,
    addTagToDepartment,
    addTaskToDepartment,
    reorderTasks,
}