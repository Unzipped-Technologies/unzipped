import React from 'react'
import BackHeader from '../BackHeader';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
    Underline
} from './style'

const Container = styled.div``;
const LeftOne = styled.div``;
const TitleOne = styled.div``;
const ButtonOne = styled.button``;
const RightOne = styled.div``;
const Rows = styled.div``;
const Item = styled.div``;
const Link = styled.div``;

const DesktopAccount = ({email, phone}) => {
    return (
        <div>
            <BackHeader 
                title="Account"
            />
            <Container>
                <LeftOne>
                    <TitleOne>Membership & Billing</TitleOne>
                    <ButtonOne>Cancel Membership</ButtonOne>
                </LeftOne>
                <RightOne>
                    <Rows>
                        <Item>{email}</Item>
                        <Link>Change email</Link>
                    </Rows>
                    <Rows>
                        <Item>Password: ******</Item>
                        <Link>Change password</Link>
                    </Rows>
                    <Rows>
                        <Item>Phone: {phone}</Item>
                        <Link>Change number</Link>
                    </Rows>
                    <Underline color="#333"/>
                    <Rows>
                        <Item>Password: ******</Item>
                        <Link>Manage payment method</Link>
                    </Rows>
                    <Rows>
                        <Item>Your nex billing date is {phone}</Item>
                        <Link>Billing details</Link>
                    </Rows>
                </RightOne>
            </Container>
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
      email: state.Auth.email,
      phone: state.Auth.user.phone,
      user: state.Auth.user,
    }
}
  
  export default connect(mapStateToProps)(DesktopAccount)