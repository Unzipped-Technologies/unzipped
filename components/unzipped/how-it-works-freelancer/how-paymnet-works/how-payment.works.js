
import styled from "styled-components";

const MainHeadingResponive = styled.h1`
    color: #000;
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px; /* 88.462% */
    letter-spacing: 0.15px;
    margin-bottom: 14px;
    display: none;
    @media screen and (max-width: 600px){
        display: block;
        font-size: 38px;
        width: 371px;
    }
`;

const MainHeading = styled.h1`
    color: #000;
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px; /* 88.462% */
    letter-spacing: 0.15px;
    margin-bottom: 14px;
    @media screen and (max-width: 600px){
        display: none;
    }
`;
const ImageContainer = styled.div`
    width: 100%;
    height: 429px;
    overflow:hidden;
    img{
        display : block;
        margin:auto;
        object-fit:contain;
        object-position :center;
    }

    @media screen and (max-width){
        width: 370px;
        height: 271px;
    }
`;

const ParagraphTextStyled = styled.span`
    color: #6A7465;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.15px;
    margin: 0;
        @media screen and (max-width: 600px){
            font-size: 22px;
            display: none;
    }
`;

const ResponsiveParagraphTextStyled = styled.span`
    color: #6A7465;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.15px;
    display: none;
    margin: 0;
        @media screen and (max-width: 600px){
            display: block;
            margin-top: 10px;
            margin-bottom: 10px;
    }
`;

const Heading_2 = styled.h3`
    margin:0;
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px; /* 143.75% */
    letter-spacing: 0.15px;
    @media screen and (max-width: 600px){
        display: none;
    }
`;
const Heading_Responsive_2 = styled.h3`
    margin:0;
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px; /* 143.75% */
    letter-spacing: 0.15px;
    display: none;
    @media screen and (max-width: 600px){
        display: block;
        margin-top: 10px;
    }
`;

const CommitmentWrapper = styled.div`
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
    margin-top: 90
`;

const CommitmentContainer = styled.div`
    width: 1020px;
    @media screen and (max-width: 600px){
        width: 370px;
    }
`;

const CommitmentContent = styled.div`
    display: flex; 
    justify-content: space-between; 
    gap: 90px;
    margin-top: 90px;
    @media screen and (max-width: 600px){
        width: 370px;
        flex-direction: column;
        gap: 0;
    }
   
`;

const ParagraphContainer = styled.div`
    width: 436px;
    @media screen and (max-width: 600px){
        width: 370px;
    }
`;
const HowPaymentWorksSection = () => {
    return (
        <>
            <CommitmentWrapper >
                <CommitmentContainer>
                    <CommitmentContent>
                        <MainHeadingResponive>How Payment Works</MainHeadingResponive>
                        <ImageContainer > <img src="/img/HowPaymentWorks.png" /> </ImageContainer>
                        <ParagraphContainer>
                            <MainHeading>How Payment Works</MainHeading>
                            <ParagraphTextStyled>Whether you’re paid hourly or on a fixed-price contract, all the work you complete comes with payment protection.</ParagraphTextStyled>
                            <ResponsiveParagraphTextStyled>Whether you’re paid hourly or on a fixed-price contract, all the work you complete comes with payment protection.</ResponsiveParagraphTextStyled>
                            <Heading_2 style={{ marginTop: 17 }}>Weekly Payments, Guaranteed</Heading_2>
                            <Heading_Responsive_2>All in one place</Heading_Responsive_2>
                            <ResponsiveParagraphTextStyled>
                                Invoice clients and track your earnings on Upwork for a simple and streamlined process.
                            </ResponsiveParagraphTextStyled>
                            <Heading_Responsive_2>Choose how you get paid</Heading_Responsive_2>
                            <ResponsiveParagraphTextStyled>
                            Use what works best for you - including direct deposit, PayPal, Payoneer, wire transfer, and more.
                            </ResponsiveParagraphTextStyled>
                            <ParagraphTextStyled style={{ marginTop: 2 }}>
                                All contracts on Unzipped are hourly, which means you get paid for the time you invest. Just log your hours, and you can expect your payment to be processed weekly.
                            </ParagraphTextStyled>
                            <Heading_2 style={{ marginTop: 10 }}>Choose Your Payment Method</Heading_2>
                            <ParagraphTextStyled style={{ marginTop: 2 }}>We offer payment through Stripe, PayPal, or Payoneer, so you can choose the method that's most convenient for you.</ParagraphTextStyled>
                        </ParagraphContainer>
                    </CommitmentContent>
                </CommitmentContainer>
            </CommitmentWrapper>
        </>
    )
};

export default HowPaymentWorksSection;