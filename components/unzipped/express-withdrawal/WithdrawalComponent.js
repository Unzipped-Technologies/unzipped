import React from 'react';
import styled from 'styled-components';
import HireDivider from '../hire/hire-divider/hireDivider';
import BusinessAddress from '../businessAddress';
import Icon from '../../ui/Icon'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import BankInformation from './BankInformation';
import WithdrawalTerms from './WithdrawalTerms';

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginTop: theme.spacing(1),
        width: 200,
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: 'transparent',
        '& .MuiInput-underline:after': {
            borderBottomColor: 'transparent',
            backgroundColor: 'transparent',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'transparent',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'transparent',
        },
        '& .MuiInput-root': {
            backgroundColor: 'transparent',
        },
        '& .Mui-focused': {
            backgroundColor: 'transparent',
        },
        '& .Mui-focused': {
            backgroundColor: 'transparent',
        },
        '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
        },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const RecurringWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 100px;
    color: #000;
`;

const WithdrawalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    gap: 20px;
    width: 800px;
    padding: 20px;
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;

const CountryOfWithDraw = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
 `
const P = styled.p`
    font-size: ${({ fontSize }) => fontSize ? fontSize : '20px'};
    font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : 600};
    margin: 0;
    padding: 0;
    font-family: 'Roboto';
    text-align: ${({ textAlign }) => textAlign ? textAlign : 'left'};
    @media screen and (max-width: 600px) {
        font-size: 16px;
        margin-left: ${({ marginLeft }) => marginLeft ? marginLeft : '0px'};
    }
`;

const Label = styled.label`
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    padding: 0;
    font-family: Roboto;
    display: block;
    margin-top: 10px;
    color: #000;
`

const InputStyled = styled.input`
    width: 200px !important;
    height: 40px;
    padding: 10px;
    border-radius: 5px !important;
    border: 1px solid #ccc !important;
    margin-top: 5px !important;
    &:focus {
       box-shadow: none !important;
    }
`;

const BalanceSection = styled.div`
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const BanlanceSectionMobileView = styled.div`
    display: none;
    @media screen and (max-width: 600px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: ${({ gap }) => gap ? gap : '20px'};
    }
`;
const MobileViewCurrencyWrapper = styled.div`
    display: none;
    @media screen and (max-width: 600px) {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: ${({ gap }) => gap ? gap : '20px'};
    }
`;

const ConfirmButton = styled.button`
    background: #37dec5;
    padding: 10px 15px;
    border: 0px;
    border-radius: 5px;
    color: #fff;
    font-weight: 500;
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`

const ButtonDesktopContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    @media screen and (max-width: 600px) {
        display: none;
    }
`
const ButtonMobileContainer = styled.div`
    display: none;
    @media screen and (max-width: 600px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
`
const PolicyCompliance = styled.div`
    background: #f8faff;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid blue;
    display: flex;
    gap: 10px;
`
const WithdrawalComponent = ({ user, token, form, updateSubscription }) => {
    const classes = useStyles();
    const [conuntry, setCountry] = React.useState('US');
    const [withdrawalType, setWithdrawalType] = React.useState('express');
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handelePaymentWithrawalType = (event) => {
        setWithdrawalType(event.target.value);
    }

    return (
        <RecurringWrapper>
            <HireDivider title="Express withdrawal" />
            {(user?.isAgreeTransferTerms && user?.isAgreeTransferTerms == true) ? (
                <WithdrawalContainer>
                    <PolicyCompliance>
                        <div>
                            <Icon name="question" />
                        </div>
                        <div>
                            <p>
                                To comply with applicable regulatory requirements, we are required to collect physical address information
                                for individuals and businesses. Non-permitted address type may result in delayed or rejected withdrawal request.
                            </p>
                        </div>
                    </PolicyCompliance>
                    <div>
                        <P>Amount to withdraw</P>
                        <CountryOfWithDraw>
                            <div>
                                <Label>Country of bank account:</Label>
                                <FormControl className={classes.formControl}>
                                    <Select sx={{ border: '1px solid red' }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={conuntry}
                                        onChange={handleCountryChange}
                                    >
                                        <MenuItem value={"US"}>United States</MenuItem>
                                        <MenuItem value={"UK"}>United Kingdom</MenuItem>
                                        <MenuItem value={"AUS"}>Australia</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <P textAlign={'center'} fontSize={"18px"} fontWeight={600}>You will receive amount </P>
                                <P style={{ textAlign: 'center' }}>$47.35 USD</P>
                                <P textAlign={"center"} fontSize={"15px"} fontWeight={400}>Note: There is no withdrawal fee</P>
                            </div>

                        </CountryOfWithDraw>
                    </div>


                    <div style={{ width: 300 }}>
                        <Label>Withdraw amount:</Label>
                        <InputStyled type="number" />
                    </div>
                    <div>
                        <span style={{ fontSize: '11px', fontWeight: 400, }}>NOTE: MIN AMOUNT $30 USD. MAX AMOUNT $1000 USD</span>
                    </div>

                    <div>

                        <CountryOfWithDraw>
                            <div>
                                <Label>Type of withdrawal:</Label>
                                <FormControl className={classes.formControl} >
                                    <Select sx={{ border: '1px solid #ccc !important', }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={withdrawalType}
                                        onChange={handelePaymentWithrawalType}
                                    >
                                        <MenuItem value={"express"}>Express Withdrawal</MenuItem>
                                        <MenuItem value={"payoneer"}>Payoneer</MenuItem>
                                        <MenuItem value={"wire"}>Wire Transfer</MenuItem>
                                        <MenuItem value={"debit"}>Freelancer Debit Card</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <BalanceSection>
                                <P textAlign={'center'} fontSize={"18px"} fontWeight={600}>Remaining Balance </P>
                                <P fontSize={"16px"} fontWeight={500}>$47.35 USD</P>
                            </BalanceSection>

                        </CountryOfWithDraw>
                    </div>
                    <ButtonDesktopContainer >
                        <ConfirmButton>Confirm Withdraw</ConfirmButton>
                    </ButtonDesktopContainer>

                    <BanlanceSectionMobileView>
                        <MobileViewCurrencyWrapper>
                            <P textAlign={'center'} fontSize={"18px"} fontWeight={600}>CURRENCY </P>
                            <P textAlign={'center'} fontSize={"18px"} fontWeight={600}>BANLANCE </P>
                            <P textAlign={'center'} fontSize={"18px"} fontWeight={600}>REMAINING </P>
                        </MobileViewCurrencyWrapper>

                    </BanlanceSectionMobileView>
                    <BanlanceSectionMobileView >
                        <MobileViewCurrencyWrapper>
                            <P textAlign={'center'} fontSize={"16px"} fontWeight={500} marginLeft={"40px"}>USD </P>
                            <P textAlign={'center'} fontSize={"16px"} fontWeight={500} marginLeft={"40px"}>$20.00 </P>
                            <P textAlign={'center'} fontSize={"16px"} fontWeight={500} marginLeft={"40px"}>$50.00 </P>
                        </MobileViewCurrencyWrapper>
                    </BanlanceSectionMobileView>
                    <ButtonMobileContainer>
                        <ConfirmButton>Confirm Withdraw</ConfirmButton>
                    </ButtonMobileContainer>

                    {!(withdrawalType == "payoneer" || withdrawalType == "debit") && (<div style={{ width: '100%', }}>
                        <BusinessAddress
                            style={{ width: '100%', marginTop: 20 }}
                            form={form}
                            loading={false}
                            planCost={'212'}
                            subscriptionForm={{}}
                            updateSubscription={updateSubscription}
                            key={null}
                        />
                    </div>)}

                    {!(withdrawalType == "payoneer") && (<BankInformation form={form} updateSubscription={updateSubscription} />)}

                </WithdrawalContainer>
            ) : (
                <WithdrawalTerms user={user} token={token} />
            )}

        </RecurringWrapper >
    )
}

export default WithdrawalComponent