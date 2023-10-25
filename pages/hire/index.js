
import Nav from '../../components/unzipped/header';
import Head from 'next/head';
import HireComp from '../../components/unzipped/hire/hire';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-flow: column;
`;

const HirePage = () => {
    return (
        <Container>
            <Nav />
            <Head>
                <title>Hire | Freelancer</title>
            </Head>
            <HireComp />
        </Container>

    );
}

export default HirePage;