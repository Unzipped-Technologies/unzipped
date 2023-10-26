import React, { useEffect, useState } from 'react';
import Nav from '../../components/unzipped/header';
import Image from '../../components/ui/Image'
import SearchBar from '../../components/ui/SearchBar'
import {
    TitleText,
    DarkText,
} from '../../components/unzipped/dashboard/style'
import ProjectsContainer from '../../components/unzipped/dashboard/ProjectsContainer'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getBusinessList } from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";
import styled from 'styled-components';
import { accountTypeEnum } from '../../server/enum/accountTypeEnum'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter';
import MobileProjects from '../../components/unzipped/dashboard/MobileProjects';


const Desktop = styled.div`
@media(max-width: 680px) {
    display: none;
}
`
const MobileDisplayBox = styled.div`
    @media(min-width: 680px) {
        display: none;
    }
`;

const Title = styled.div`
    display: flex;
    flex-flow: row;
    width: 70%;
    margin: 60px 15% 40px 15%;
`;

const Toggle = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 260px;
    height: 34px;
    background-color: #D8D8D8;
    border-radius: 5px;
    overflow: hidden;
`;

const Left = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 5px;
    height: 100%;
    width: 100%;
    background: ${({ selected }) => selected === accountTypeEnum.INVESTOR ? '#5E99D4' : 'transparent'}
`;
const Right = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 5px;
    height: 100%;
    width: 100%;
    background: ${({ selected }) => (selected === accountTypeEnum.FOUNDER || selected === accountTypeEnum.ADMIN) ? '#5E99D4' : 'transparent'}
`;

const Projects = ({ token, cookie, businesses = [], getBusinessList, role, loading }) => {
    const access = token?.access_token || cookie
    const [take, setTake] = useState(25)
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState(role)

    const toggleRole = () => {
        if (role === accountTypeEnum.ADMIN) {
            if (selected === accountTypeEnum.FOUNDER) {
                setSelected(accountTypeEnum.INVESTOR)
            } else {
                setSelected(accountTypeEnum.FOUNDER)
            }
        }
    }

    useEffect(() => {
        getBusinessList({
            take: take,
            skip: (page - 1) * 25,
        }, access)
    }, [])

    return (
        <React.Fragment>
            <Nav isSubMenu marginBottom={'160px'}/>
            <Desktop>
                <Title>
                    <TitleText title>Projects</TitleText>
                    <Toggle>
                        <Left selected={selected} onClick={toggleRole}>
                            <DarkText small>AS INVESTOR</DarkText>
                        </Left>
                        <Right selected={selected} onClick={toggleRole}>
                            <DarkText small>AS FOUNDER</DarkText>
                        </Right>
                    </Toggle>
                </Title>
                <SearchBar take={take} setTake={setTake} />
                <ProjectsContainer type='projects' businesses={businesses} setPage={setPage} page={page} loading={loading} />
            </Desktop>
            <MobileDisplayBox>
                <MobileProjects/>
                <MobileFreelancerFooter defaultSelected="Projects" />
            </MobileDisplayBox>
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
    return {
        businesses: state.Business?.businesses,
        loading: state.Business?.loading,
        role: state.Auth.user.role,
        cookie: state.Auth.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBusinessList: bindActionCreators(getBusinessList, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);