import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import Nav from '../../components/unzipped/header';
import ProfileCard from '../../components/unzipped/ProfileCard';
import ProfileTab from '../../components/unzipped/ProfileTab';
import { getFreelancerById } from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";
import MobileProfileCard from '../../components/unzipped/MobileProfileCard';
import MobileProfileCardOptions from '../../components/unzipped/MobileProfileCardOptions';
import ProjectsCard from '../../components/unzipped/ProjectsCard';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    @media(max-width: 680px) {
        display: none;
    }
`;
const MobileContainer = styled.div`
    @media(min-width: 680px) {
        display: none;
    }
`
const Profile = ({ token, cookie, selectedFreelancer, getFreelancerById }) => {
    const router = useRouter();
    const accessId = token?.access_token || cookie
    const { id } = router.query;
    const [interViewView, setInterViewView] = useState(true)
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        getFreelancerById(id, accessId)
    }, [id])
    const handleValueFromChild = (value) => {
        setInterViewView(value)
    };
    return (
        <>
            <Container>
                <Nav />
                <div style={{ overflow: "overlay" }}>
                    <ProfileCard user={selectedFreelancer} />
                </div>
                <ProfileTab tabs={["PROJECTS"]} selected={selected} setSelected={setSelected} />
                <ProjectsCard user={selectedFreelancer} />
            </Container>
            <MobileContainer>
                {interViewView ? <MobileProfileCard user={selectedFreelancer} handleProfilePage={handleValueFromChild} /> : <MobileProfileCardOptions handleProfilePage={handleValueFromChild} />}
            </MobileContainer>
        </>
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