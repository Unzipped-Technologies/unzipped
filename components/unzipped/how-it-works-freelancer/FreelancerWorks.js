import styled from "styled-components";
import BannerWrapper from "./BannerWrapper";
import HowItWorksContentWrapper from "./how-it-works-content/how-it-works-content";
import { TrustedByTextStyled } from './FreelancerStyled';
import ExploreWaysToEarn from './explore-ways-to-earn/explore-ways-to-earn';
import LearnAsYouWork from './learn-as-you-work/learn-as-you-work';
import HowPaymentWorksSection from './how-paymnet-works/how-payment.works';
import Faq from './faq/faq';
import NewsLetter from './news-letter/news-letter';

const TrustedByWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 86px;
    @media screen and (max-width: 600px){
        margin-top: 60px;
    }
`;

const TrustContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 781px;
    justify-content: space-between;
    @media screen and (max-width: 600px){
        flex-direction: column;
        width: 338px;
        align-items: flex-start;
    }
`;

const ImageContainer = styled.div`
    width: 660px;
    height: 40px; 
    @media screen and (max-width: 600px){
        display: none;
    }
`;

const ResponsiveImageContainer = styled.div`
    width: 660px;
    height: 40px; 
    display: none;
    @media screen and (max-width: 600px){
        width: 338px;
        height: 90px;
        display: block
    }
`;

export const FreelancerWorks = () => {

    return (
        <>
            <BannerWrapper />
            <HowItWorksContentWrapper />
            <TrustedByWrapper>
                <TrustContainer>
                    <TrustedByTextStyled>Trusted by</TrustedByTextStyled>
                    <ImageContainer> <img src="/img/TrustedBy.png" /> </ImageContainer>
                    <ResponsiveImageContainer> <img src="/img/TrustedByResponsive.png" /> </ResponsiveImageContainer>
                </TrustContainer>
            </TrustedByWrapper>
            <ExploreWaysToEarn />
            <HowPaymentWorksSection />
            <Faq />
            <LearnAsYouWork />
            <NewsLetter />
        </>
    );
}

export default FreelancerWorks;