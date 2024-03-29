import React, { useEffect } from 'react'
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
import ClientLogosBar from '../components/unzipped/clientLogoBar'
import MUIEmployeeCarousel from '../components/unzipped/EmployeeCarousel'
import Icon from '../components/ui/Icon'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { googleUser } from '../redux/actions'
import { parseCookies } from '../services/cookieHelper'

const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`

const UnderConstruction = styled.div`
    width: 100vw;
    height: 59px;
    display: flex;
    justify-content: center;
    background: #111;
    align-items: center;
    font-family: arial;
    color: #d8d8d8;
    font-size: 18px;
    span {
        margin-left: 20px;
    }
`

const Mobile = styled.span`
    margin-left: 0px !important;
    position: relative;
    right: 4px;
    @media (max-width: 868px) {
        display: none;
    }
`

const Spacer = styled.p`
    width: 100%;
    height: 280px;
    z-index: 0;
    background: transparent;
    @media (min-width: 982px) {
        display: none;
    }
    @media (max-width: 836px) {
        height: 330px;
    }
    @media (max-width: 726px) {
        height: 360px;
    }
    @media (max-width: 651px) {
        height: 320px;
    }
    @media (max-width: 521px) {
        height: 360px;
    }
    @media (max-width: 499px) {
        height: 320px;
    }
    @media (max-width: 395px) {
        height: 290px;
    }
`

const NewsSpacer = styled.div`
    @media (min-width: 768px) {
        display: none;
    }
    @media (max-width: 767px) {
        height: 65px;
    }
    @media (max-width: 767px) {
        height: 85px;
    }
    @media (max-width: 395px) {
        height: 95px;
    }
`

const ClientLogoURLs = [
    'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760272/wesco_d2d6jx.png',
    'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760272/fedex_f1xhoq.png',
    'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760273/somos_yitrbz.png',
    'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760273/cooley_e5erzw.png',
    'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760273/flutter_lhgepk.png',
    'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760273/macmillan_mefnfb.png'
]

const EmployeeCarousel = [
    {
        name: 'Vladimir Mitrovic',
        position: 'Engineering',
        specialty: 'React Developer',
        prevPosition: 'Chase Bank',
        imgUrl: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760274/vladimir_dofonq.webp'
    },
    {
        name: 'Anna D Lukasiak',
        position: 'Engineering',
        specialty: 'Product Development',
        prevPosition: 'Goldman Sachs',
        imgUrl: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760274/anna_qccmds.webp'
    },
    {
        name: 'Ellen Su',
        position: 'Engineering',
        specialty: 'AWS Specialist',
        prevPosition: 'Lehman Brothers',
        imgUrl: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760275/ellen_oevavs.webp'
    },
    {
        name: 'Adan Perez',
        position: 'Engineering',
        specialty: 'React Developer',
        prevPosition: 'AT & T',
        imgUrl: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760276/adam_bph4cs.webp'
    },
    {
        name: 'Mathew Warkentin',
        position: 'Engineering',
        specialty: 'React Developer',
        prevPosition: 'Cornell University',
        imgUrl: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760276/mathew_airoyu.webp'
    },
    {
        name: 'Danielle Thompson',
        position: 'Engineering',
        specialty: 'Scrum Master',
        prevPosition: 'Blackboard',
        imgUrl: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760277/danielle_gpwhf9.webp'
    },
    {
        name: 'Emily Dubey',
        position: 'Engineering',
        specialty: 'Java Developer',
        prevPosition: 'Macmillan Learning',
        imgUrl: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1707760276/emily_jix1ko.webp'
    },
]

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
        businessImage:
            'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670047282/goaimly-potato-chips-bust_mnnb0r.png'
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
        businessImage:
            'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670047282/goaimly-potato-chips-bust_mnnb0r.png'
    }
]

const Home = ({ token }) => {
    useEffect(() => {
        if (token?.access_token) {
            if (!user) {
                googleUser(token?.access_token)
            }
        }
    }, [])

    return (
        <Container>
            <UnderConstruction>
                <Icon name="wrenchIcon" color="#D8D8D8" />
                <span>
                    <strong>Under construction</strong>
                    <Mobile>
                        <strong>:</strong> sign up for our email list to be updated when service is available
                    </Mobile>
                </span>
            </UnderConstruction>
            <Nav token={token} spacing={18} marginBottom="18px" />
            <HeroUnzipped />
            <ClientLogosBar urls={ClientLogoURLs} />
            <MUIEmployeeCarousel initialItems={[...EmployeeCarousel, ...EmployeeCarousel, ...EmployeeCarousel]} />
            {/* <SectionOne projects={projects} />
            <SectionOneMobile projects={projects} /> */}
            <SectionTwo />
            <SectionThree />
            <Spacer />
            <SectionFour />
            <News />
            <NewsSpacer />
            <Footer />
        </Container>
    )
}

Home.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    return {
        token: token && token
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        token: state.Auth.token,
        loading: state.Auth.loading,
        profilePic: state.Auth?.user?.profileImage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        googleUser: bindActionCreators(googleUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
