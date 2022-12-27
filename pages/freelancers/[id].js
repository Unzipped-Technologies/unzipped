import React, { useEffect, useState } from 'react'
import Nav from '../../components/unzipped/header';
import ProfileCard from '../../components/unzipped/ProfileCard';
import ProfileTab from '../../components/unzipped/ProfileTab';
import { useRouter } from 'next/router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getFreelancerById } from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
`;

const Profile = ({token, cookie, selectedFreelancer, getFreelancerById}) => {
    const router = useRouter();
    const accessId = token?.access_token || cookie
    const { id } = router.query;
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        getFreelancerById(id, accessId)
    }, [id])

    return (
        <Container>
            <Nav/>
            <ProfileCard user={selectedFreelancer}/>
            <ProfileTab tabs={["PROJECTS"]} selected={selected} setSelected={setSelected}>

            </ProfileTab>
        </Container>
    )
}

Profile.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        selectedFreelancer: state.Freelancers?.selectedFreelancer,
        cookie: state.Auth.token
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        getFreelancerById: bindActionCreators(getFreelancerById, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);