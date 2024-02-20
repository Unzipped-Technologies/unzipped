import styled from "styled-components";
import ClientBanner from "./client/ClientBanner";
import FindYourFreelancer from './client/find-your-freelancer/findYourFreelancer';
import SealOfApproval from './client/seal-of-approval/seal-of-approval';
import { getFontStyled, COLORS, FONT_SIZE, LETTER_SPACING } from "../../ui/TextMaskInput/core/utilities";
import Testimonials from "../TrustedBy/TrustedBy";
import SecurityPrivacy from './client/security-container/SecurityPrivacy';
import FAQ from './../FAQ/FAQ';
import CareerGrowth from './../learn-as-you-work/CareerGrowth';
import NewsLetter from "../NewsLetter/NewsLetter";
import Faq from '../how-it-works-freelancer/faq/faq';


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    margin-top: 8rem;
    margin-bottom: 2.125rem;
    @media screen and (max-width: 600px){
        padding-right: 20px;
    }
`;

const TextBox = styled.div`
    width: 65.75rem; 
    padding: 0.938rem;
    margin-top: ${FONT_SIZE.PX_30};
    &:after{
        content : '';
        display : block;
        height : 2px;
        width : 65.25rem;
        background: #F3F6F3;
        margin-top: ${FONT_SIZE.PX_43};
    }

    @media screen and (max-width: 600px){
        width: auto;
        margin-left: 20px;
        &:after{
            content : '';
            display : block;
            height : 2px;
            width : 100%;
            background: #F3F6F3;
            margin-top: ${FONT_SIZE.PX_43};
        }
        // &:after{
        //     content : '';
        //     display : none;
        //     height : 2px;
        //     width : 0;
        //     background: #F3F6F3;
        //     margin-top: 0;
        // }
    }

`;

const HeaderTitle = styled.h1`
    ${getFontStyled(
    {
        color: COLORS.black,
        fontSize: FONT_SIZE.PX_28,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: FONT_SIZE.PX_23,
        letterSpacing: '0.15px'
    })}
    margin: 0;
`;

const TalentText = styled.p`
    margin-top: 15px;
    ${getFontStyled(
    {
        color: COLORS.gray,
        fontSize: FONT_SIZE.PX_16,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.15px'
    }
)
    }
`;

const TextBoxContent = styled.div`
    width: 500px;
    @media screen and (max-width: 600px){
        width: 375px;
    }
`;

const HeadingStyled = styled.h1`
    padding-left: 2rem;
    ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_38,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: '1.438rem',
    letterSpacing: LETTER_SPACING
})
    }
    @media screen and (max-width: 600px){
        // padding-left: 30px;
    }
`;

const SealOfApprovalContainer = styled.div`
    width: 1052px;
    paddingLeft: 2rem;
    &::after{
        margin-top: 29px;
        content: '';
        display: block;
        height: 2px;
        width: 1052px;
        background: ${COLORS.hrLineColor};
    }
    @media screen and (max-width: 600px){
        padding-left: 0px;
        width: 100%;
        &::after{
        margin-top: 29px;
        content: '';
        display: none;
        height: 2px;
        width: 100%;//1052px;
        background: ${COLORS.hrLineColor};
    }
    }
`;

const FaqContainerStyled = styled.div`
    width: 100%;
    padding-left: 0 ;
    display: flex;
    padding-left: 120px;
    @media screen and (max-width: 600px){
        padding-left: 20px;
    }
`;

const LearnAsYouWorkContainer = styled.div`
    width: 100%;
    padding-left: 0 ;
    display: flex;
    padding-left: 120px;
    @media screen and (max-width: 600px){
         padding-left: 20px;
    }
`;

const NewsLetterContainer = styled.div`
    width: 100%;
    padding-left: 0 ;
    display: flex;
    margin-left: -135px;
    @media screen and (max-width: 600px){
        margin-left: 0px;
    }
`;

const WhyUnzippedComponent = () => {

    return (
        <Wrapper>
            <ClientBanner />
            <TextBox>
                <TextBoxContent >
                    <HeaderTitle>Find Your Ideal Talent</HeaderTitle>
                    <TalentText>
                        Get work done efficiently and build lasting professional relationships on Unzipped,
                        the go-to platform for hourly, long-term contracts.
                    </TalentText>
                </TextBoxContent>
            </TextBox>
            <FindYourFreelancer />
            <SealOfApprovalContainer>
                <HeadingStyled>The Seal Of Approval</HeadingStyled>
            </SealOfApprovalContainer>
            <SealOfApproval />
            <Testimonials />
            <SecurityPrivacy />
            {/* <FAQ /> */}
            <FaqContainerStyled>
                <Faq />
            </FaqContainerStyled>
            <LearnAsYouWorkContainer>
                <CareerGrowth />
            </LearnAsYouWorkContainer>
            <NewsLetterContainer>
                <NewsLetter />
            </NewsLetterContainer>
        </Wrapper>
    )
}

export default WhyUnzippedComponent;