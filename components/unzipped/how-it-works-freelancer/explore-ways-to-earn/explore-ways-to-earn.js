import styled from "styled-components";
import {
    Body,
    Wrapper,
    ContentHeading,
    ParagraphTextStyled,
    ImageContainer,
    CreateProfileButtonStyled,
    CreateButtonTextStyled,
    ServiceWrapper,
    CommitmentWrapper,
    ServiceContainer,
    ServiceContent,
    CommitmentContainer,
    CommitmentContent
} from "./styled";

const ScreenHeading_1 = styled.h1`
    color: #000;
    font-family: Roboto;
    font-size: 31px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px; /* 60.526% */
    letter-spacing: 0.15px;
    display: none;
    @media screen and (max-width: 600px){
        display: block;
    }
`;

const ResponsiveContentHeading = styled.h3`
    color: #000;
    font-size: 38px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px; /* 82.143% */
    letter-spacing: 0.15px;
    display: none;
    @media screen and (max-width: 600px){
        display: block;
        &::after{
            content : '';
            display : block;
            height : 1px;
            width : 370px;
            background: #D5DFD5;
            margin-top: 23px;
        }
    }
`;
const ResponsiceParagraphStyled = styled.span`
    color: #6A7465;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.15px;
    margin-top: 5px;
    display: none;
    @media screen and (max-width: 600px){
        display: block;
        font-size: 21px
    }
`;
const ExploreWaysToEarn = () => {
    return (
        <>
            <Wrapper>
                <CommitmentWrapper>
                    <ContentHeading>Explore ways to earn</ContentHeading>
                    <ResponsiveContentHeading>Explore ways to earn</ResponsiveContentHeading>
                    <CommitmentContainer>
                        <ScreenHeading_1>Find your next opportunity</ScreenHeading_1>                      

                        <CommitmentContent>
                            <ContentHeading>Engage in Longer Commitments</ContentHeading>
                            <ParagraphTextStyled>
                                Submit comprehensive proposals and set your desired rates to show potential clients why you’re the perfect fit for a lasting partnership.
                                Elevate your proposal by sharing your unique approach and offering a rapport-building interview.
                            </ParagraphTextStyled>
                            <ResponsiceParagraphStyled>
                                Search on Talent Marketplace for the hourly or fixed-price work you’re looking for. Submit a proposal, set your rate, and show how great you’ll be. Give a little extra by sharing your unique approach and offering a rapport-building interview.
                            </ResponsiceParagraphStyled>
                            <div>
                                <CreateProfileButtonStyled style={{ marginTop: 12, marginBottom: 10 }}>
                                    <CreateButtonTextStyled>Find Jobs</CreateButtonTextStyled>
                                </CreateProfileButtonStyled>
                            </div>
                        </CommitmentContent>
                        <ImageContainer> <img src='/img/Opportunity.png' /> </ImageContainer>
                    </CommitmentContainer>
                </CommitmentWrapper>

                <ServiceWrapper>
                    <ServiceContainer>
                        <ScreenHeading_1>Sell what do best</ScreenHeading_1>
                        <ImageContainer> <img src='/img/DefineYourService.png' /> </ImageContainer>
                        <ServiceContent>
                            <ContentHeading>Pre-define Your Services</ContentHeading>
                            <ParagraphTextStyled>
                                Clearly define the scope, timeline, pricing, and terms to set expectations right from the start. Once your project is approved by our team,
                                clients can effortlessly engage with you for long-term work.
                            </ParagraphTextStyled>
                            <ResponsiceParagraphStyled style={{ marginTop: 21 }}>
                                Create easy-to-buy projects with Project Catalog. Match your projects to what clients need. Be clear upfront by defining your scope, timing, price, and terms. Once we’ve approved your project, clients can start to buy.
                            </ResponsiceParagraphStyled>
                            <div>
                                <CreateProfileButtonStyled>
                                    <CreateButtonTextStyled>See Other Projects</CreateButtonTextStyled>
                                </CreateProfileButtonStyled>
                            </div>
                        </ServiceContent>
                    </ServiceContainer>
                </ServiceWrapper>
            </Wrapper>
        </>
    )
}

export default ExploreWaysToEarn;