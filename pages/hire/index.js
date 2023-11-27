
import Nav from '../../components/unzipped/header';
import Head from 'next/head';
import HireComp from '../../components/unzipped/hire/hire';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-flow: column;
`;
const NavContainer = styled.div`
    @media screen and (max-width: 600px) {
        display: none;
    }
`
const HirePage = () => {
    return (
        <Container>
            <NavContainer>
                <Nav />
            </NavContainer>
            <Head>
                <title>Hire | Freelancer</title>
            </Head>
            <HireComp />
        </Container>

    );
}

export default HirePage;