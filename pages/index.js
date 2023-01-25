import React, {useEffect} from 'react'
import Nav from '../components/unzipped/header'
import HeroUnzipped from '../components/unzipped/heroUnzipped'
import SectionOne from '../components/unzipped/sectionOne'
import SectionOneMobile from '../components/unzipped/sectionOneMobile'
import SectionTwo from '../components/unzipped/SectionTwo'
import SectionThree from '../components/unzipped/sectionThrees'
import SectionFour from '../components/unzipped/SectionFour'
import styled from 'styled-components'
import News from '../components/unzipped/NewsletterSignup'
import Footer from '../components/unzipped/Footer'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { googleUser } from '../redux/actions';
import { parseCookies } from "../services/cookieHelper";

const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`;

const Spacer = styled.p`
    width: 100%;
    height: 280px;
    z-index: 0;
    background: transparent;
    @media(min-width: 982px) {
        display: none;
    }
    @media(max-width: 836px) {
        height: 330px;
    }
    @media(max-width: 726px) {
        height: 360px;
    }
    @media(max-width: 651px) {
        height: 320px;
    }
    @media(max-width: 521px) {
        height: 360px;
    }
    @media(max-width: 499px) {
        height: 320px;
    }
    @media(max-width: 395px) {
        height: 290px;
    }
`;

const NewsSpacer = styled.div`
    @media(min-width: 768px) {
        display: none;
    }
    @media(max-width: 767px) {
        height: 65px;
    }
    @media(max-width: 767px) {
        height: 85px;
    }
    @media(max-width: 395px) {
        height: 95px;
    }
`;

const projects = [
    {
        name: 'PEBBLE TIME',
        description: `Color e-paper smartwatch with up to 7 days of battery and a new timeline interface 
        that highlights what's important in your day.`,
        updatedAt: 'DECEMBER 7, 2022',
        equity: 40,
        budget: 40000,
        totalTimeInvested: 236,
        likeTotal: 426276,
        id: 3333333333633,
        businessImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670047282/goaimly-potato-chips-bust_mnnb0r.png'
    },
    {
        name: 'PEBBLE TIME',
        description: `Color e-paper smartwatch with up to 7 days of battery and a new timeline interface 
        that highlights what's important in your day.`,
        updatedAt: 'DECEMBER 7, 2022',
        equity: 40,
        budget: 40000,
        totalTimeInvested: 236,
        likeTotal: 426276,
        id: 3333333333330,
        businessImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670047050/cld-sample-4.jpg'
    },
    {
        name: 'PEBBLE TIME',
        description: `Color e-paper smartwatch with up to 7 days of battery and a new timeline interface 
        that highlights what's important in your day.`,
        updatedAt: 'DECEMBER 7, 2022',
        equity: 40,
        budget: 40000,
        totalTimeInvested: 236,
        likeTotal: 426276,
        id: 3333333313333,
        businessImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670047049/cld-sample-3.jpg'
    },
    {
        name: 'PEBBLE TIME',
        description: `Color e-paper smartwatch with up to 7 days of battery and a new timeline interface 
        that highlights what's important in your day.`,
        updatedAt: 'DECEMBER 7, 2022',
        equity: 40,
        budget: 40000,
        totalTimeInvested: 236,
        likeTotal: 426276,
        id: 3333333333332,
        businessImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670047048/cld-sample.jpg'
    },
    {
        name: 'PEBBLE TIME',
        description: `Color e-paper smartwatch with up to 7 days of battery and a new timeline interface 
        that highlights what's important in your day.`,
        updatedAt: 'DECEMBER 7, 2022',
        equity: 40,
        budget: 40000,
        totalTimeInvested: 236,
        likeTotal: 426276,
        id: 3333333333333,
        businessImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670047282/goaimly-potato-chips-bust_mnnb0r.png'
    },
]
 
const Home = ({token}) => {
    useEffect(() => {
        if (token?.access_token) {
            if (!user) {
            googleUser(token?.access_token);
            }
        }
    }, [])

    return (
        <Container>
            <Nav token={token}/>
            <HeroUnzipped />
            <SectionOne projects={projects}/>
            <SectionOneMobile projects={projects}/>
            <SectionTwo />
            <SectionThree />
            <Spacer />
            {/* <SectionFour /> */}
            <News />
            <NewsSpacer />
            <Footer />
        </Container>
    )
}

Home.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        token: state.Auth.token,
        loading: state.Auth.loading,
        profilePic: state.Auth?.user?.profileImage,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        googleUser: bindActionCreators(googleUser, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);