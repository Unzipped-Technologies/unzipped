import WhyUnzippedComponent from '../../../components/unzipped/why-unzipped/WhyUnzippedIndex';
import Nav from '../../../components/unzipped/header';
import Footer from '../../../components/unzipped//Footer';

import Head from 'next/head';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-flow: column;
`;

const ClientPage = () => {
    return (
        <>
            <Head>
                <title>How it works | Client</title>
            </Head>
            <Container>

                <Nav spacing={18} />
                <WhyUnzippedComponent />
                <Footer />
            </Container>
        </>
    )
};

export default ClientPage;