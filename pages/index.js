import React from 'react'
import Nav from '../components/unzipped/header'
import HeroUnzipped from '../components/unzipped/heroUnzipped'
import SectionOne from '../components/unzipped/sectionOne'
import SectionTwo from '../components/unzipped/sectionTwo'
import SectionThree from '../components/unzipped/sectionThree'
import SectionFour from '../components/unzipped/sectionFour'
import styled from 'styled-components'
import News from '../components/unzipped/NewsletterSignup'
import Footer from '../components/unzipped/Footer'

const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`;

const Home = () => {
    return (
        <Container>
            <Nav />
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

export default Home;