import React, { useState, useEffect } from 'react';
import Nav from '../../components/unzipped/header';
import SearchBar from '../../components/ui/SearchBar'
import FreelancerCard from '../../components/unzipped/dashboard/FreelancerCard'
import Footer from '../../components/unzipped/Footer'
import {
    TitleText,
    DarkText,
    WhiteCard
} from '../../components/unzipped/dashboard/style'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getFreelancerList} from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";

const Container = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: center;
    margin-top: 40px;
`;

const Box = styled.div`
    display: flex;
    width: 80%;
    align-self: center;
`;

const freelancer = [
    {
        name: 'James Cameron',
        type: 'Full Stack Web Developer',
        country: 'United States',
        skills: [
            'React',
            'Node.js',
            'Web 3',
            'AWS',
            'UI/UX'
        ],
        cover: `I have been a developer for over 20 years. I have worked on many
        large projects and I have contributed superior quality features and improved
        ROI for many developers.`,
        profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
        isInvited: true,
    },
    {
        name: 'Stefano Campagna',
        type: 'Tutor',
        country: 'United States',
        skills: [
            'React',
            'Taking Calls',
            'Web 3',
            'AWS',
            'UI/UX'
        ],
        cover: `I have been a developer for over 20 years. I have worked on many
        large projects and I have contributed superior quality features and improved
        ROI for many developers.`,
        profilePic: '/img/testimonial_1.jpg',
        isInvited: false
    },
    {
        name: 'James Cameron',
        type: 'Full Stack Web Developer',
        country: 'United States',
        skills: [
            'React',
            'Node.js',
            'Web 3',
            'AWS',
            'UI/UX'
        ],
        cover: `I have been a developer for over 20 years. I have worked on many
        large projects and I have contributed superior quality features and improved
        ROI for many developers.`,
        profilePic: '/img/testimonial_12.jpg',
        isInvited: false
    },
]

const Freelancers = ({freelancerList, getFreelancerList, token}) => {
    const [take, setTake] = useState(25)
    console.log(freelancerList)

    useEffect(() => {
        getFreelancerList({
            filter: {},
        }, token.access_token)
    }, [])

    return (
        <React.Fragment>
                <Nav isSubMenu/>
                <TitleText>Freelancers</TitleText>
                <SearchBar take={take} setTake={setTake} />
            <Container>
                {freelancer.map(user => (
                    <Box>
                        <WhiteCard height="270px">
                            <FreelancerCard user={user} />
                        </WhiteCard>
                    </Box>
                ))}
            </Container>
            <Footer />
        </React.Fragment>
    )
}

Freelancers.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        freelancerList: state.Freelancers?.freelancers
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        getFreelancerList: bindActionCreators(getFreelancerList, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Freelancers);