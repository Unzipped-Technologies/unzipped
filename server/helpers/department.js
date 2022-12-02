const department = require('../../models/Department');
const businessAssociatesItems = require('../../models/BusinessAssociatesItem');
const mongoose = require('mongoose');

const createDepartments = async (data) => {
    return await department.create(data);
}

const addDepartmentItemToList = async (data, departmentId) => {
    try {
        const updateDepartment = await department.findById(departmentId)
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

const getDepartmentById = async (id) => {
    try {
        return await department.findOne({userId: id})
            .populate({
                path: 'businessAssociatesItems', 
                model: 'businessAssociatesItems'
            })
            .exec()
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


module.exports = {
    createDepartments,
    addDepartmentItemToList,
    listDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
    addBusinessAssociateToDepartment
}