import React, {useEffect} from 'react';
import Nav from '../../components/unzipped/header';
import Icon from '../../components/ui/Icon'
import ListPanel from '../../components/unzipped/dashboard/ListPanel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { 
    updateTasksOrder, 
    getDepartmentsForBusiness, 
    getDepartmentsById, 
    updateCreateStoryForm, 
    createStory, 
    getBusinessById, 
    reorderStories,
    addCommentToStory,
    getBusinessList
} from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";

const Tasklist = ({
    token, 
    cookie,
    selectedBusiness, 
    businesses = [], 
    departments = [],
    business='My Business', 
    selectedDepartment, 
    form,
    tags = [], 
    stories = [],
    employees,
    user,
    // Actions
    updateTasksOrder, 
    getDepartmentsForBusiness,
    getDepartmentsById,
    updateCreateStoryForm,
    createStory,
    getBusinessById,
    reorderStories,
    addCommentToStory,
    getBusinessList
}) => {
    const access = token?.access_token || cookie

    const selectDepartment = (item) => {
        getDepartmentsById(item?._id, access)
    }

    const createNewStory = () => {
        createStory({
            departmentId: selectedDepartment?._id,
            taskName: form?.taskName,
            assigneeId: form?.assigneeId || employees.find(item => item?.FirstName.toLowerCase().includes(form?.assignee.toLowerCase().split(' ')[0]) && item.LastName.toLowerCase().includes(form?.assignee.toLowerCase()?.split(' ')[1]))?._id,
            storyPoints: form?.storyPoints,
            priority: form?.priority,
            description: form?.description,
            tagId: form?.tagId || tags[0]?._id
        }, access)
    }

    useEffect(() => {
        if (!selectedBusiness?._id) {
            if (businesses.length === 0) {
                getBusinessList({
                    take: 10,
                    skip: 0,
                }, access)
            }
            if(businesses[0]) {
                getBusinessById(businesses[0]?._id, access)                
            }

        }
        getDepartmentsForBusiness({
            take: 10,
            filter: {
                businessId: selectedBusiness?._id || businesses[0]?._id
            }
        }, access)
    }, [selectedBusiness])

    useEffect(() => {
        if (selectedDepartment) {
            getDepartmentsById(selectedDepartment?._id, access)
        }
        if (!access) {
            router.push('/login')
        }
    }, [])

    return (
        <React.Fragment>
            <Nav isSubMenu/>
            <ListPanel 
                departments={departments} 
                updateTasksOrder={updateTasksOrder} 
                updateCreateStoryForm={updateCreateStoryForm}
                reorderStories={reorderStories}
                addCommentToStory={addCommentToStory}
                createNewStory={createNewStory}
                tags={tags} 
                access={access}
                form={form}
                dropdownList={employees}
                stories={stories} 
                user={user}
                list={departments.map(e => {
                    return {
                        ...e,
                        text: e?.name,
                        icon: <Icon name={(e.isSelected || e?._id === selectedDepartment?._id) ? "selectedDepartment" : "department"}/>,
                        padding: true
                    }
                })} 
                business={selectedBusiness?.name} 
                selectedList={selectedDepartment?.name} 
                selectList={selectDepartment}
                type="department"
            />
        </React.Fragment>
    )
}

Tasklist.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    console.log(state)
    return {
        tags: state.Business.tags,
        loading: state.Business?.loading,
        stories: state.Business.stories,
        selectedBusiness: state.Business.selectedBusiness,
        selectedDepartment: state.Business.selectedDepartment,
        businesses: state.Business.businesses,
        cookie: state.Auth.token,
        user: state.Auth.user,
        departments: state.Business.departments,
        form: state.Business?.createStoryForm,
        employees: state.Business?.employees
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        updateTasksOrder: bindActionCreators(updateTasksOrder, dispatch),
        getDepartmentsForBusiness: bindActionCreators(getDepartmentsForBusiness, dispatch),
        getDepartmentsById: bindActionCreators(getDepartmentsById, dispatch),
        updateCreateStoryForm: bindActionCreators(updateCreateStoryForm, dispatch),
        getBusinessById: bindActionCreators(getBusinessById, dispatch),
        createStory: bindActionCreators(createStory, dispatch),
        reorderStories: bindActionCreators(reorderStories, dispatch),
        addCommentToStory: bindActionCreators(addCommentToStory, dispatch),
        getBusinessList: bindActionCreators(getBusinessList, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);