const department = require('../../models/Department');
const business = require('../../models/Business');
const tags = require('../../models/tags');
const tasks = require('../../models/Task');
const businessAssociatesItems = require('../../models/BusinessAssociatesItem');
const user = require('../../models/User');
const mongoose = require('mongoose');

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
        return {...selectedDepartment._doc, isSelected: true}
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

const addBusinessAssociateToDepartment = async (data, listId) => {
    try {
        const updateDepartment = await department.findById(listId)
        const ids = []
        for (const item of data.items) {
            const id = await businessAssociatesItems.create({
                ...item
            });
            ids.push(id.id)
        }
        updateDepartment.businessAssociatesItems.push(...ids.map(item => mongoose.Types.ObjectId(item.id)))
        updateDepartment.save()
        return updateDepartment;
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
        assignee: await user.findById(body.userId)
    })
    await department.findByIdAndUpdate(body.departmentId, {
        tasks: await tasks.find({departmentId: body.departmentId})
    })
    return Task
}


module.exports = {
    createDepartments,
    addDepartmentToBusiness,
    listDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
    addBusinessAssociateToDepartment,
    addTagToDepartment,
    addTaskToDepartment,
}