import styled from 'styled-components';
import {
    ContentHeading,
    HeaderContainer,
    Wrapper,
    Body,
    TextHeadingStyled,
    ImageContainer,
    ImageBox,
    ParagraphTextStyled,
    CreateProfileButtonStyled,
    CreateButtonTextStyled,
    ResponsiveText
} from './styled';
import { useEffect, useState } from 'react';
import useWindowWidthEventListener from '../../../../hooks/windowWidth'

const labelsArray = [
    {
        title: "Build Your Standout Profile (It's Free)",
        description: " Your profile is your virtual storefront. Make it inviting with an engaging title and a client-focused overview. This enables us to match you with long-term opportunities that resonate with your skills and passions. Fill in your work history, list your skills, and upload a professional photo. For added impact, include an introduction video that truly sets you apart.",
        imgSource: "/img/BuildYourProfile.png"
    },
    {
        title: "Discover Steady Opportunities",
        description: "At Unzipped, it's not just about one-off gigs—it's about lasting relationships. Work closely with our recruiters who specialize in identifying stable,rewarding contracts that align with your unique skill set.Choose from a plethora of roles that require a long-term commitment, and focus on building a steady  of work thatenables professional growth.",
        imgSource: "/img/ResponsiveImage.png"
    },
    {
        title: "Get Paid Without the Hassle",
        description: "Your financial security is our priority. Choose how you'd like to get paid—be it through fixed milestones or a weekly payment system.Unzipped’s payment protection ensures that client payments are released based on agreed-upon milestones for fixed-price contracts, while hourly roles are billed weekly. No surprises, no chasing payments—just a streamlined process that lets you concentrate on what you do best.",
        imgSource: "/img/GetPaid.png"
    }
];


const labelsSMArray = [
    {
        title: "Create your profile (it’s free)",
        description: "An eye-catching title and client-focused overview help us match you to the work you want. Include your work history. Your skills, and your photo. Add more, like an introduction video to create a profile that really stands out.",
        imgSource: "/img/BuildYourProfile.png"
    },
    {
        title: "Explore ways to earn",
        description: "Work and earn in different ways. Bid for jobs. Pitch your projects. Discuss your in-demand skills with our recruiters so they can find opportunities aligned with your passions and career goals. Do all three. Create a predictable pipeline and build your network.",
        imgSource: "/img/ResponsiveImage.png"
    },
    {
        title: "Get paid securely",
        description: "Choose how you get paid. Our fixed-price protection releases client payments at project milestones. Hourly protection bills clients every week. However you work, our service fees are the same. Spend less time chasing, more earning.",
        imgSource: "/img/GetPaid.png"
    }
];

const Container = styled.div`
    display: flex; 
    flex-direction: column; 
    flex-shrink:0;
    gap: 20px;
    width:788px;
    @media screen and (max-width:600px){
        width:377px;
    }
`;

const BodyContent = styled.div`
    display: flex; 
    align-items: center; 
    gap: 22px;
    @media screen and (max-width: 600px){
        flex-wrap: wrap;
        display: flex;
        flex-direction: column;
        align-item: flex-start;
        width: 366px;
    }
`;

const TextContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    @media screen and (max-width: 600px){
        flex-direction: row;
        color: red;
    }
`;

const SmallScreenContainer = styled.div`
    display: none;
    justify-content: space-between;
    align-items:items;
    gap: 20px;
    @media screen and (max-width: 600px){
            display: flex;
    }
`;

const VXCont = styled.div`
    display: none;
    @media screen and (max-width: 600px){
        display: block;
    }
`;

const ImageContainerResponsive = styled.div`
    width: 127px; 
    height: 100px;
    border-radius: 10px;

    @media screen and (max-width: 600px){
        display: block;
    }
`;

const HowItWorksContentWrapper = () => {
    const isSmallWindow = useWindowWidthEventListener(600);
    const [renderCards, setRenderCards] = useState([]);

    useEffect(() => {
        isSmallWindow ? setRenderCards(labelsSMArray) : setRenderCards(labelsArray);
    }, [isSmallWindow]);

    return (
        <>
            <Wrapper>
                <Container>
                    <ContentHeading >How It Works</ContentHeading>
                    {renderCards && renderCards.map((item) => (
                        <Body>
                            <BodyContent>
                                {/* <VXCont> */}
                                <SmallScreenContainer>
                                    <ImageContainerResponsive style={{ background: '#91E6B3' }}>
                                        <img src={item.imgSource} />
                                    </ImageContainerResponsive>
                                    <ResponsiveText>{item.title}</ResponsiveText>
                                </SmallScreenContainer>
                                {/* </VXCont> */}
                                <ImageContainer style={{ background: '#91E6B3' }}>
                                    <img src={item.imgSource} />
                                </ImageContainer>
                                <TextContainer>
                                    <TextHeadingStyled>{item.title}</TextHeadingStyled>
                                    <ParagraphTextStyled> {item.description} </ParagraphTextStyled>
                                </TextContainer>
                            </BodyContent>
                        </Body>
                    ))}

                    {/* <div style={{ paddingTop: 23 }}> */}
                    <CreateProfileButtonStyled>
                        <CreateButtonTextStyled>Create Profile</CreateButtonTextStyled>
                    </CreateProfileButtonStyled>
                    {/* </div> */}

                </Container>
            </Wrapper>
        </>
    );
}


export default HowItWorksContentWrapper;