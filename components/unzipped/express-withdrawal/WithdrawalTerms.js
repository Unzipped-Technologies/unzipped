import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/actions';

const BlueCheckbox = withStyles({
    root: {
        color: 'blue',
        '&$checked': {
            color: '#1976D2',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const HeadingStyled = styled.h2`
    font-size: 20px;
    font-weight: 600;

`;

const TopContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    // background-color: #f5f5f5;
    width: 1070px;
    @media screen and (max-width: 600px) {
        width: 100%;
        padding-bottom: 20px;
    }
`;
const MiddleSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
    padding: 20px 0px;
    @media screen and (max-width: 600px) {
        padding: 10px 15px;
    }
`;

const Span = styled.span`
    font-size: 17px;
    font-weight: 400;
    font-family: 'Roboto';
    line-height: 24px;
    letter-spacing: 1px;
    margin-left: 15px;
    vertical-align: middle;
    width: ${({ width }) => width ? width : '530px'};
    display: inline-block;
    color: ${({ color }) => color ? color : '#000'};
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;
const Divider = styled.div`
    height: 2px; 
    width: 600px; 
    background: #CCCCCC;
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;
const P = styled.p`
    font-size: 17px;
    font-weight: 400;
    font-family: 'Roboto';
    line-height: 24px;
    letter-spacing: 1px;
    margin-left: ${({ marginLeft }) => marginLeft ? marginLeft : '15px'};
    vertical-align: middle;
    width: ${({ width }) => width ? width : '530px'};
    display: inline-block;
    color: ${({ color }) => color ? color : '#000'};
    @media screen and (max-width: 600px) {
        width: 100%;
    }
`;

const SubmitButton = styled.button`
    width: 200px;
    height: 40px;
    background: #1976D2;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
`;

const TextContainer = styled.div`
    display: flex;
    width: 100%;
`;

const TermsSection = styled.div`
    display: flex;
    width: 100%;
`;

const WithdrawalTerms = ({ user, token }) => {
    const dispatch = useDispatch();
    const [isAgreed, setIsAgreed] = React.useState(false);
    const handleChange = () => setIsAgreed(!isAgreed);
    const handleUserAgreement = () => {
        dispatch(updateUser({ isAgreeTransferTerms: true }, token))
    }
    return (
        <TopContent>
            <HeadingStyled>Transfer Money</HeadingStyled>
            <TopContent>
                <img src='https://s3-alpha-sig.figma.com/img/da97/d34d/25fe1722144c7fcb40d5ed89aa7c0dd6?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qAcUM5gO7xKmLKsLu2IyOnE~tpaprw1qiwVk1~jR6U0DhQuhVI~mhZ6RK6JUEDqSLP78vnukbG2ydPtO4mbInNdnpQHr86h74X-XxYjuCykIOgI6p09d~TNOsnChGxX0A9--mxRa0duTacCi2jNkXqVdqHo-Wbeoil7xUegE-nuTFeGxpDbm1adgp3WgjYxfBa~ql7WIdPTrdL8R4qrp0JBCEmWEJecxsqVMUrJDD4GRoGOOlXwJhv8JDKthTyfMkB436YZ~K~yWlPLIntgYK-LFwhKQ3zqvGmTkY1p7qI7LH-L4dQn5QzF6y~-gIpksb6JpiBInvTC1MLU3V0gbJQ__' />
            </TopContent>
            <HeadingStyled style={{ marginTop: '5px' }}>Activate Money Transfer</HeadingStyled>
            <Divider></Divider>
            <MiddleSection>
                <TextContainer>
                    <span>
                        <img
                            width={"32px"}
                            height={"32px"}
                            src='https://s3-alpha-sig.figma.com/img/0d2e/5fb0/ab22452d5ddd4b857e9b58b642960621?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HNaStCLdkfkCaNjVnzLZXR3im-22nLuc1zUdDpo9V0oSDYdYSWBUVP18sbERj3YOthk882F6s6~MPKPWWx1ymEyOKCeX8yLvRDWlHofPrvt2aVXLhzMMmhqS2MKWE4NmXNt-Q1uJmgdeblG~ORg3ZKaFMixfrXUmP7WwJI0QU8NceX3GErLklVjgc4tbLruOBiku7XpPcAIu5~5s7aKcWVEX2E2LB9JWrm1zpUvFaS4V7mr3F7152ViUaScU562k~ZuPAr-flCBkprl1zg84W3ZdYAXKiXXZSbuw3pwIEIDo40gr4AUqv3HAZEnG7K1gLTsP7kZreFMU57mDsSSckw__' />
                    </span>
                    <Span>
                        Transfer money securely from your unzipped account into your PayPal or your linked bank account.
                    </Span>
                </TextContainer>
                <TextContainer>
                    <span>
                        <img
                            width={"32px"}
                            height={"32px"}
                            src='https://s3-alpha-sig.figma.com/img/203b/d294/4c272b00147bcea778081f6598521699?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ippICRhDsSASswl084Pe4S5kls3jALyc8sKXo4SEu0a6~WXk9PQ6lGbpfLARg15C9T4iFVYP6yKS3kNZyMZnUvixXaxJenXazqt~2q8M6TS91kWJ5eQ6bro1fjDwNZTpKQpNgwUncmuIUeKMxJCxjHWQLXzhmY5VTsLM~RXlYdCxjmxms2zmJ-DouxOoO7j1I2n3FysX~EWTTX6rr9EkEEsR8AUrjpocb-hR8u7itTNwb3~lSafgGGhmo5Hj5LF8xnlbdMhAzuko8JTdgyKg--fujEG-0TQyDAAZ3FoQmboYNf-oUfDZNB4K3-fYamZcMp9yO-sdQctt486bgMIxYg__' />
                    </span>
                    <Span>
                        Save time by setting up future dated or repeating withdrawals from your account.
                    </Span>
                </TextContainer>
                <TextContainer>
                    <span>
                        <img
                            width={"32px"}
                            height={"32px"}
                            src='https://s3-alpha-sig.figma.com/img/da97/d34d/25fe1722144c7fcb40d5ed89aa7c0dd6?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qAcUM5gO7xKmLKsLu2IyOnE~tpaprw1qiwVk1~jR6U0DhQuhVI~mhZ6RK6JUEDqSLP78vnukbG2ydPtO4mbInNdnpQHr86h74X-XxYjuCykIOgI6p09d~TNOsnChGxX0A9--mxRa0duTacCi2jNkXqVdqHo-Wbeoil7xUegE-nuTFeGxpDbm1adgp3WgjYxfBa~ql7WIdPTrdL8R4qrp0JBCEmWEJecxsqVMUrJDD4GRoGOOlXwJhv8JDKthTyfMkB436YZ~K~yWlPLIntgYK-LFwhKQ3zqvGmTkY1p7qI7LH-L4dQn5QzF6y~-gIpksb6JpiBInvTC1MLU3V0gbJQ__' />
                    </span>
                    <Span>
                        Manage your upcoming withdrawals in one place conveniently.
                        Transfer activity.
                    </Span>
                </TextContainer>
            </MiddleSection>
            <Divider></Divider>

            <TextContainer style={{ paddingLeft: 30, alignItems: 'center' }}>
                <P>
                    To continue, read and accept the
                    <span style={{ color: '#0057FF', display: 'inline-flex', marginLeft: '2px' }}>
                        Transfers Agreement
                    </span>
                </P>
            </TextContainer>
            <TermsSection>
                <BlueCheckbox
                    size='small'
                    checked={isAgreed}
                    onClick={handleChange}
                    inputProps={{ 'aria-label': 'secondary  checkbox' }}
                    sx={{ color: 'red' }}
                />
                <Span>I accept the terms and conditions of the Transfers Agreement</Span>
            </TermsSection>
            <SubmitButton onClick={handleUserAgreement} >SUBMIT APPLICATION</SubmitButton>

        </TopContent>
    )
}

export default WithdrawalTerms