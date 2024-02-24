import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Nav from '../../../components/unzipped/header'
import BackHeader from '../../../components/unzipped/BackHeader';
import Notification from '../../../components/unzipped/dashboard/Notification';
import WithdrawalMethodsTable from '../../../components/unzipped/Withdrawal/PaymentOptionTable'
import WithdrawalCard from '../../../components/unzipped/Withdrawal/WithdrawalDetailBox'
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'
import { parseCookies } from "../../../services/cookieHelper";

const Container = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    width: 953px;
    margin: 20px;
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: 3fr 2fr;
    width: 100%;
    justify-items: flex-end;
    padding: 0px 25px;
`;

const Left = styled.div`
    display: flex;
    flex-flow: column;
    margin: 0px 15px
`;

const Withdrawal = ({token}) => {
    const [windowSize, setWindowsize] = useState('126px');

    const handleResize = () => {
        let windowSize = (window.innerWidth <= 600) ? '85px' : '76px'
        setWindowsize(windowSize);
    };

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <React.Fragment>
            <Nav token={token} marginBottom={windowSize}/>
            <Container>
                <BackHeader 
                    title={`Express withdrawal`}
                    bold
                    size="20px"
                />
                <Content>
                    <Notification type="blue" noButton smallMargin>
                        To comply with applicable regulatory requirements, we are required to collect physical address information 
                        for individuals and businesses. Non-permitted address type may result in delayed or rejected withdrawal request.
                    </Notification>
                </Content>
                <Cards>
                    <Left>
                        <WithdrawalCard />
                    </Left>
                    <WithdrawalMethodsTable />
                </Cards>
            </Container>
        </React.Fragment>
    )
}

Withdrawal.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    return {
        token: token && token,
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.Auth.token,
    }
}

export default connect(mapStateToProps)(Withdrawal);