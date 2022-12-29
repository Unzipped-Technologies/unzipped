import React, {useEffect} from 'react';
import Nav from '../../components/unzipped/header';
import Icon from '../../components/ui/Icon'
import ListPanel from '../../components/unzipped/dashboard/ListPanel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { updateTasksOrder, getDepartmentsForBusiness, getDepartmentsById } from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";

const Tasklist = ({
    token, 
    cookie,
    selectedBusiness, 
    businesses = [], 
    departments = [],
    business='My Business', 
    selectedDepartment, 
    tags = [], 
    stories = [],
    // Actions
    updateTasksOrder, 
    getDepartmentsForBusiness,
    getDepartmentsById
}) => {
    const access = token?.access_token || cookie

    const selectDepartment = (item) => {
        getDepartmentsById(item._id, access)
    }

    useEffect(() => {
        getDepartmentsForBusiness({
            take: 10,
            filter: {
                businessId: selectedBusiness._id || businesses[0]._id
            }
        }, access)
    }, [selectedBusiness])

    return (
        <React.Fragment>
            <Nav isSubMenu/>
            <ListPanel 
                departments={departments} 
                updateTasksOrder={updateTasksOrder} 
                tags={tags} 
                stories={stories} 
                list={departments.map(e => {
                    return {
                        ...e,
                        text: e?.name,
                        icon: <Icon name={(e.isSelected || e?._id === selectedDepartment?._id) ? "selectedDepartment" : "department"}/>,
                        padding: true
                    }
                })} 
                business={selectedBusiness?.name || businesses[0]?.name} 
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
        departments: state.Business.departments
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        updateTasksOrder: bindActionCreators(updateTasksOrder, dispatch),
        getDepartmentsForBusiness: bindActionCreators(getDepartmentsForBusiness, dispatch),
        getDepartmentsById: bindActionCreators(getDepartmentsById, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist);