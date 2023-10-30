const ProjectModel = require('../../models/Project');

const getAllProjects = async () => {
    try {
        const result = await ProjectModel.find({ isDeleted: false }).exec();
        return result;
    } catch (e) {
        throw Error(`Error: Failed to load projects: ${e}`);
    }
}

const createProject = async (project) => {
    try {
        const result = await ProjectModel.create(project);
        return result;
    } catch (e) {
        throw Error(`Error: Failed to create project: ${e}`);
    }
}

const updateProject = async (project) => {
    try {
        const result = await ProjectModel.findByIdAndUpdate(project._id, { $set: { ...project } }, { new: true });
        return result;
    } catch (e) {
        throw Error(`Error: Failed to create project: ${e}`);
    }
}

const deleteProject = async (projectId) => {
    try {
        const result = await ProjectModel.findByIdAndUpdate(projectId, { $set: { isDeleted: true } });
        if (result) return { affected: 1, msg: 'Successfully deleted!' }
        return { affected: 0, msg: 'No record found!' }
    } catch (e) {
        throw Error(`Error: Failed to delete projectId ${projectId}, ${e}`)
    }
}
module.exports = {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject
}