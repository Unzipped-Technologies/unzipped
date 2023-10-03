import styled from 'styled-components';
import FreelancerWorks from '../../../components/unzipped/how-it-works-freelancer/FreelancerWorks';
import Footer from '../../../components/unzipped/Footer';
import Nav from '../../../components/unzipped/header';
import Head from 'next/head';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    margin-top: 6rem;
`;

const HowItWorksFreelancer = () => {
    return (
        <>
            <Head>
                <title>How it works | Freelancer</title>
            </Head>
            <Container>
                <Nav />
                <FreelancerWorks />
                <Footer />
            </Container>
        </>
    )
}

export default HowItWorksFreelancer;
