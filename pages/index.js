import React, {useEffect} from 'react'
import Nav from '../components/unzipped/header'
import HeroUnzipped from '../components/unzipped/heroUnzipped'
import SectionOne from '../components/unzipped/sectionOne'
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
 
const Home = ({token}) => {
    console.log(token)
    useEffect(() => {
        if (token.access_token) {
            if (!user) {
            googleUser(token.access_token);
            }
        }
    }, [])

    return (
        <Container>
            <Nav token={token}/>
            <HeroUnzipped />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <News />
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
    console.log(state)
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