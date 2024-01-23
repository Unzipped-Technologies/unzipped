const FreelancerSkills = require("../../models/FreelancerSkills");

const getAllFreelancerSkills = async () => {
    return await FreelancerSkills.find();
}

module.exports = {
    getAllFreelancerSkills
}