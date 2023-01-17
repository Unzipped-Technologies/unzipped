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
    addCommentToStory
} from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";

const Lists = [
    {
        text: 'Favorites',
        icon: <Icon name="heart"/>,
        padding: true
    },
    {
        text: 'Recently Viewed',
        icon: <Icon name="eye"/>,
        padding: false
    },
    {
        text: 'My Team',
        icon: <Icon name="suitcase"/>,
        padding: false
    },
]

const Dashboard = ({business='My Business', selectedList="Favorites", token, cookie}) => {
    const access = token?.access_token || cookie
    
    useEffect(() => {
        if (!access) {
            router.push('/login')
        }
    }, [])

    return (
        <React.Fragment>
            <Nav isSubMenu/>
            <ListPanel list={Lists} business={business} selectedList={selectedList} type="list"/>
        </React.Fragment>
    )
}

Dashboard.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        cookie: state.Auth.token,
        user: state.Auth.user,
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);