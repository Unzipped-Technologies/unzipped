import React, { useEffect } from 'react'
import BackHeader from '../BackHeader';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPaymentMethods } from '../../../redux/actions';
import { stripeBrandsEnum, stripeLogoEnum } from '../../../server/enum/paymentEnum'
import {
    Underline
} from './style'
import FormField from '../../ui/FormField'

const Shell = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

const Container = styled.div`
    display: flex;
    width: 953px;
    justify-content: space-between;
    margin-top: 5px;
    ${(props) => (props.border ? `border-top: 1px #333 solid` : `border-top: none`)};
`;
const LeftOne = styled.div``;
const TitleOne = styled.div`
    padding: 14px 0px;
    color: #737373;
    font-size: 24px;
    font-style: sans serif collection;
`;
const ButtonOne = styled.button`
    width: 225px;
    height: 45px;
    background: #D9D9D9;
    outline: none;
    border: none;
    font-size: 16px;
    font-weight: 600;
    margin: 5px 0px;
`;
const ButtonSubmit = styled.button`
    width: 225px;
    height: 45px;
    background: #1772EB;
    color: #fff;
    outline: none;
    border: none;
    font-size: 16px;
    font-weight: 600;
    margin: 5px 0px;
`;
const RightOne = styled.div`
    width: 600px;
`;
const Align = styled.div`
    width: 285px;
`;
const Align2 = styled.div`
    width: 185px;
`;
const Rows = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    ${(props) => (props.fullHeight ? `height: 100%` : ``)};
`;
const Item = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    align-items: center;
`;
const Link = styled.a`
    display: flex;
    align-items: center;
`;
const Span = styled.div`
    padding-left: 5px;
`;
const SubTitle = styled.div`
    font-weight: 600;
    font-size: 24px;
    color: #121530;
`;

const getCardLogoUrl = (cardType) => {
    const brand = Object.keys(stripeBrandsEnum).find(key => stripeBrandsEnum[key] === cardType);
    return stripeLogoEnum[brand];
};

const DesktopAccount = ({email, phone, getPaymentMethods, token, paymentMethods = []}) => {
    const primaryPM = paymentMethods.find(e => e.isPrimary)

    useEffect(() => {
        getPaymentMethods(token)
    }, [])

    return (
        <Shell>
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
                        <Item>
                            <img height={20} src={getCardLogoUrl(primaryPM.card)} />
                            <Span>**** **** **** {primaryPM.lastFour}</Span>
                        </Item>
                        <Link>Manage payment method</Link>
                    </Rows>
                    <Rows>
                        <Item>Your next billing date is {phone}</Item>
                        <Link>Billing details</Link>
                    </Rows>
                </RightOne>
            </Container>
            <Container border>
                <LeftOne>
                    <TitleOne>Plan Details</TitleOne>
                </LeftOne>
                <RightOne>
                    <Rows fullHeight>
                        <Item>{email}</Item>
                        <Link>Change plan</Link>
                    </Rows>
                </RightOne>
            </Container>
            <Container border>
                <LeftOne>
                    <TitleOne>Profile</TitleOne>
                </LeftOne>
                <RightOne>
                    <Rows>
                        <SubTitle>Name</SubTitle>
                    </Rows>
                    <Rows>
                        <Align>
                        <FormField
                            fieldType="input"
                            placeholder="First Name"
                            borderRadius="10px"
                            width="100%"
                            zIndexUnset
                            onChange={e => updateForm({ name: e.target.value })}
                            value={name}
                        >First Name</FormField>
                        </Align>
                        <Align>
                        <FormField
                            fieldType="input"
                            placeholder="Last Name"
                            borderRadius="10px"
                            width="100%"
                            zIndexUnset
                            onChange={e => updateForm({ name: e.target.value })}
                            value={name}
                        >Last Name</FormField>
                        </Align>
                    </Rows>
                    <Underline color="#333" margin="15px 0px 5px 0px" />
                    <Rows>
                        <SubTitle>Address</SubTitle>
                    </Rows>
                    <Rows>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="123 address st."
                            borderRadius="10px"
                            zIndexUnset
                            onChange={e => updateForm({ name: e.target.value })}
                            value={name}
                        >Address Line 1</FormField>
                    </Rows>
                    <Rows>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="apt, bldng, etc."
                            borderRadius="10px"
                            onChange={e => updateForm({ name: e.target.value })}
                            value={name}
                            zIndexUnset
                        >Address Line 2</FormField>
                    </Rows>
                    <Rows>
                        <Align2>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="Columbus"
                            borderRadius="10px"
                            zIndexUnset
                            onChange={e => updateForm({ name: e.target.value })}
                            value={name}
                        >City</FormField>
                        </Align2>
                        <Align2>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="OH"
                            borderRadius="10px"
                            zIndexUnset
                            onChange={e => updateForm({ name: e.target.value })}
                            value={name}
                        >State</FormField>
                        </Align2>
                        <Align2>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="43220"
                            borderRadius="10px"
                            zIndexUnset
                            onChange={e => updateForm({ name: e.target.value })}
                            value={name}
                        >Zip Code</FormField>
                        </Align2>
                    </Rows>
                    <Underline color="#333" margin="15px 0px 5px 0px" />
                    <Rows>
                        <SubTitle>Company</SubTitle>
                    </Rows>
                    <Rows>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="Unzipped"
                            zIndexUnset
                            borderRadius="10px"
                            onChange={e => updateForm({ name: e.target.value })}
                            value={name}
                        >Business Name</FormField>
                    </Rows>
                    <Rows>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="LLC"
                            borderRadius="10px"
                            onChange={e => updateForm({ name: e.target.value })}
                            value={name}
                        >Business Type</FormField>
                    </Rows>
                    <Rows>
                        <Align>
                            <FormField
                                fieldType="input"


                                width="100%"
                                placeholder="1 (833) 366-4285"
                                borderRadius="10px"
                                onChange={e => updateForm({ name: e.target.value })}
                                value={name}
                            >Phone Number</FormField>
                        </Align>
                        <Align>
                            <FormField
                                fieldType="input"


                                width="100%"
                                placeholder="**-*****42"
                                borderRadius="10px"
                                onChange={e => updateForm({ name: e.target.value })}
                                value={name}
                            >Tax EIN or Social security Number</FormField>
                        </Align>
                    </Rows>
                </RightOne>
            </Container>
            <Container border>
                <div></div>
                <Rows>
                    <div></div>
                    <ButtonSubmit>Save Settings</ButtonSubmit>
                </Rows>
            </Container>
            <Container border></Container>
        </Shell>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
      token: state.Auth.token,
      email: state.Auth.email,
      phone: state.Auth.user.phoneNumber,
      user: state.Auth.user,
      paymentMethods: state.Stripe.methods,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getPaymentMethods: bindActionCreators(getPaymentMethods, dispatch),
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(DesktopAccount)