import styled from "styled-components";
import { COLORS, FONT_SIZE, getButtonStyled, getFontStyled, getStyledHeadingComponent, LETTER_SPACING } from "../../../../ui/TextMaskInput/core/utilities";
import { useRouter } from 'next/router';

const FindFreelancerSectionContainer = styled.div`
    display: flex;
    width: 1052px;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    @media screen and (max-width: 600px){
        width: 100%;//385px;
        flex-direction: column;
    }
`;

const ImageBox = styled.div`
    width: 560px;
    height: 390px;
    border-radius: 10px;
    @media screen and (max-width: 600px){
        display: none;
    }
`;

const ImageBoxResp = styled.div`
    width: 100%;//385px;
    border-radius: 10px;
    @media screen and (min-width: 600px){
        display: none;
    }
`;

const TextContainer = styled.div`
    width: 493px;
    height: 390px;
    border-radius: 10px;
    @media screen and (max-width: 600px){
        width: 100%;//385px;
        height: auto;
    }
`;

const SubHeadingStyled = styled.h1`
    margin: 0;
    ${getFontStyled({
    color: COLORS.greenishGray,
    fontSize: FONT_SIZE.PX_22,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_23,
    letterSpacing: LETTER_SPACING
})}
    @media screen and (max-width: 600px){
        font-size: 18px;
        line-height: 23px;
        margin-bottom: 10px;
    }
`;

const HeadingStyled = styled.h1`
    ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_28,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_23,
    letterSpacing: LETTER_SPACING
})}

    @media screen and (max-width: 600px){
        font-size: 24px;
        line-height: 23px;
    }
`;

const ParagraphText = styled.p`
${getFontStyled({
    color: COLORS.gray,
    fontSize: FONT_SIZE.PX_16,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_22,
    letterSpacing: LETTER_SPACING
})}

    @media screen and (max-width: 600px){
        font-size: 14px;
        line-height: 22px;
    }
`;


const ButtonBox = styled.button`
    width: 7.875rem;
    height: 2.375rem;
    flex-shrink: 0;
    border-radius: ${FONT_SIZE.PX_24};
    border: 1px solid rgba(196, 196, 196, 0.00);
    background: #8EDE64;
    margin-top: 1.85rem;
    @media screen and (max-width: 600px){
        width: 109px;
        height: 38px;
        border-radius: 24px;
    }
`;

const ButtonText = styled.span`
    color: #FFF;
    text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.438rem;
    letter-spacing: 0.009rem;
    @media screen and (max-width: 600px){
        font-size: 12px;
        line-height: 23px;
    }
`;

const SkilledFreelancerSection = styled.div`
    display: flex;
    width: 1052px;
    justify-content: space-between;
    align-items: center;
    padding-left: 2rem;
    gap: 0.75rem;
    @media screen and (max-width: 600px){
        width: 100%;//385px;
        flex-direction: column;
        margin-right: 10px;
    }
`;

const BrowseButtonBox = styled.button`
    margin-top: 1.125rem;
    ${getButtonStyled({
    width: '11.75rem',
    height: FONT_SIZE.PX_38,
    radius: FONT_SIZE.PX_24,
    border: '1px solid rgba(196, 196, 196, 0.00)',
    background: COLORS.green
})
    }
`;

const LowerHeaderStyled = styled.h1`
    ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_25,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_23,
    letterSpacing: LETTER_SPACING
})}
@media screen and (max-width: 600px){
     margin-top: 15px;
}
`;

const SkilledParagraphSection = styled.div`
    width: 31.25rem;
    @media screen and (max-width: 600px){
        width: 100%;
        padding-right: 10px;
                &:after{
            content : '';
            display : block;
            height : 2px;
            width : 100%;
            background: #F3F6F3;
            margin-top: ${FONT_SIZE.PX_43};
        }
    }
`;
const ImageBoxSkilledFreelancer = styled.div`
    width: 552px;
    height: 355px;
    @media screen and (max-width: 600px){
        display: none;
    }

`;

const ImageBoxSkilledFreelancerRes = styled.div`
width: 100%;//385px;
@media screen and (min-width: 600px){
    display: none;
}

`;
const FindYourFreelancer = () => {
    const router = useRouter();
    return (
        <>
            <FindFreelancerSectionContainer>
                <ImageBox> <img src="/img/FindYourFreelancer.png" width="500" /> </ImageBox>
                <ImageBoxResp> <img src="/img/FindYourPerfectFreelancerResponsive.png" width="375" /> </ImageBoxResp>
                <TextContainer>
                    <HeadingStyled>Find Your Perfect Freelancer</HeadingStyled>
                    <SubHeadingStyled> Elevate your projects with the best talent in the Unzipped Marketplace.</SubHeadingStyled>
                    <ParagraphText>
                        Our intelligent matching algorithms assist you in identifying candidates who best fit your project needs.
                    </ParagraphText>
                    <ParagraphText>
                        You can review profiles, portfolios, and client feedback to make an informed decision.
                    </ParagraphText>
                    <ButtonBox onClick={() => router.push('/freelancers')}> <ButtonText>Find Talent</ButtonText> </ButtonBox>
                </TextContainer>
            </FindFreelancerSectionContainer>

            <SkilledFreelancerSection>
                <ImageBoxSkilledFreelancerRes>
                    <img src="/img/PerfectFreelancer_2.png" width={"90%"} />
                </ImageBoxSkilledFreelancerRes>
                <SkilledParagraphSection>
                    <LowerHeaderStyled>Direct Access to Skilled Freelancers</LowerHeaderStyled>
                    <SubHeadingStyled>Bypass the guesswork by directly connecting with proven freelancers.</SubHeadingStyled>
                    <ParagraphText>No need to post a job or sift through applications. Browse profiles and reach out to professionals whose skills align with your project requirements.</ParagraphText>
                    <ParagraphText>With our platform, it's easy to set clear expectations right from the start.</ParagraphText>
                    <BrowseButtonBox> <ButtonText onClick={() => router.push('/freelancers')}>Browse Freelancers</ButtonText> </BrowseButtonBox>
                </SkilledParagraphSection>


                <ImageBoxSkilledFreelancer>
                    <img src="/img/SkilledFreelancer.png" width="530" height="354" />
                </ImageBoxSkilledFreelancer>
            </SkilledFreelancerSection>

        </>
    )
}

export default FindYourFreelancer;