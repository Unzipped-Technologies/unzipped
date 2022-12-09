import React, {useEffect, useState} from 'react';
import Nav from '../../components/unzipped/header';
import Image from '../../components/ui/Image'
import SearchBar from '../../components/ui/SearchBar'
import ProjectsContainer from '../../components/unzipped/dashboard/ProjectsContainer'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getBusinessList} from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";

const Projects = ({token, businesses, getBusinessList}) => {
    const [take, setTake] = useState(25)
    useEffect(() => {
        getBusinessList({
            take: 25,
            skip: 0,
        }, token.access_token)
    }, [])

    return (
        <React.Fragment>
            <Nav isSubMenu/>
            <SearchBar take={take} setTake={setTake} />
            <ProjectsContainer type='projects' businesses={businesses}/>
        </React.Fragment>
    )
}

Projects.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    console.log(state)
    return {
        businesses: state.Business?.businesses,
        loading: state.Business?.loading,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        getBusinessList: bindActionCreators(getBusinessList, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);