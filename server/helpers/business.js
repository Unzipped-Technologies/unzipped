

const createBusiness = () => {
    // create business
    // create 3 tags ToDo, In Progress, In Review, Done
    let tagsToCreate = ['To-Do', 'In Progress', 'Done']
    tagsToCreate = tagsToCreate.map(item => {
        return ({
            businessId,
            departmentId,
            TagName: item
        })
    })
}