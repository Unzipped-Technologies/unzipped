import styled from "styled-components";
import { COLORS, FONT_SIZE, getButtonStyled, getFontStyled, getStyledHeadingComponent, LETTER_SPACING } from "../../../../ui/TextMaskInput/core/utilities";


const FindFreelancerSectionContainer = styled.div`
    display: flex;
    width: 1052px;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
`;

const ImageBox = styled.div`
    width: 560px;
    height: 390px;
    border-radius: 10px;
`;

const TextContainer = styled.div`
    width: 493px;
    height: 390px;
    border-radius: 10px;
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
`;


const ButtonBox = styled.button`
    width: 7.875rem;
    height: 2.375rem;
    flex-shrink: 0;
    border-radius: ${FONT_SIZE.PX_24};
    border: 1px solid rgba(196, 196, 196, 0.00);
    background: #8EDE64;
    margin-top: 1.85rem;
`;

const ButtonText = styled.span`
    color: #FFF;
    text-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.438rem;
    letter-spacing: 0.009rem;
`;

const SkilledFreelancerSection = styled.div`
    display: flex;
    width: 1052px;
    justify-content: space-between;
    align-items: center;
    padding-left: 2rem;
    gap: 0.75rem;
`;

const BrowseButtonBox = styled.button`
    margin-top: 3.125rem;
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
    margin-top: 0;
    ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_28,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_23,
    letterSpacing: LETTER_SPACING
})}
`;

const SkilledParagraphSection = styled.div`
    width: 31.25rem;
`;
const ImageBoxSkilledFreelancer = styled.div`
    width: 552px;
    height: 355px;

`
const FindYourFreelancer = () => {
    return (
        <>
            <FindFreelancerSectionContainer>
                <ImageBox> <img src="/img/FindYourFreelancer.png" width="500" /> </ImageBox>
                <TextContainer>
                    <HeadingStyled>Find Your Perfect Freelancer</HeadingStyled>
                    <SubHeadingStyled> Elevate your projects with the best talent in the Unzipped Marketplace.</SubHeadingStyled>
                    <ParagraphText>
                        Our intelligent matching algorithms assist you in identifying candidates who best fit your project needs.
                    </ParagraphText>
                    <ParagraphText>
                        You can review profiles, portfolios, and client feedback to make an informed decision.
                    </ParagraphText>
                    <ButtonBox> <ButtonText>Find Talent</ButtonText> </ButtonBox>
                </TextContainer>
            </FindFreelancerSectionContainer>

            <SkilledFreelancerSection>
                <SkilledParagraphSection>
                    <LowerHeaderStyled>Direct Access to Skilled Freelancers</LowerHeaderStyled>
                    <SubHeadingStyled>Bypass the guesswork by directly connecting with proven freelancers.</SubHeadingStyled>
                    <ParagraphText>No need to post a job or sift through applications. Browse profiles and reach out to professionals whose skills align with your project requirements.</ParagraphText>
                    <ParagraphText>With our platform, it's easy to set clear expectations right from the start.</ParagraphText>
                    <BrowseButtonBox> <ButtonText>Browse Freelancers</ButtonText> </BrowseButtonBox>
                </SkilledParagraphSection>

                <ImageBoxSkilledFreelancer>
                    <img src="/img/SkilledFreelancer.png" width="530" height="354" />
                </ImageBoxSkilledFreelancer>
            </SkilledFreelancerSection>

        </>
    )
}

export default FindYourFreelancer;