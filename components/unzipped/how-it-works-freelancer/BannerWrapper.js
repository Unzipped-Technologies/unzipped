import styled from "styled-components";
import {
    BannerContent,
    BannerContainer,
    BannerWrapperStyled,
    BannerImageStyled,
    BannerImageContainer,
    BannerParagraphContainer,
    BannerHeadingContainer,
    BannerTextContainer,
    BannerTextStyled,
    CreateProfileButtonStyled,
    CreateButtonTextStyled,
    BannerResponsiveWrapper,
    BannerResponsiveContent,
    BannerResponsiveContainer,
    BannerResponsiveTextStyled,
    ResponsiveTextStyled_2,
    ResponsiveTextStyled_3,
    ReviewTextStyled,
    ResponsiveTextStyled_4,
    ReviewTextStyledLg,
    ResponsiveTextStyled_5
} from "./FreelancerStyled";
import { Review, ReviewHalf, ReviewSmall } from '../../icons';

const ReivewContainer = styled.div`
    display: flex;
    width: 490px;
    margin-top: 110px;

`;

const BannerWrapper = () => {
    return (
        <>
            <BannerWrapperStyled>
                <BannerContainer >
                    <BannerContent>
                        <BannerParagraphContainer>
                            <BannerHeadingContainer >Work the way you want</BannerHeadingContainer>
                            <BannerTextContainer>
                                <BannerTextStyled>Discover the perfect balance between long-term contracts and freelancing.</BannerTextStyled>
                            </BannerTextContainer>
                            <div style={{ paddingTop: 23 }}>
                                <CreateProfileButtonStyled>
                                    <CreateButtonTextStyled>Create Profile</CreateButtonTextStyled>
                                </CreateProfileButtonStyled>
                            </div>
                            <ReivewContainer>
                                <div style={{ width: 300 }}>
                                    <ResponsiveTextStyled_4> Professionals rate clients  </ResponsiveTextStyled_4>
                                </div>
                                <div style={{ display: 'flex', flexDirection: "column" }}>
                                    <div style={{ marginTop: 35}}>
                                        <ReviewTextStyledLg>
                                            <ReviewSmall /> <ReviewSmall /> <ReviewSmall /> <ReviewSmall />
                                        </ReviewTextStyledLg>
                                        <ReviewTextStyledLg>
                                            4.9/5
                                        </ReviewTextStyledLg>
                                    </div>
                                    <div>
                                        <ResponsiveTextStyled_5>based on 900k+ reviews</ResponsiveTextStyled_5>
                                    </div>
                                </div>
                            </ReivewContainer>
                        </BannerParagraphContainer>
                        <BannerImageContainer style={{ padding: 9 }}>
                            <BannerImageStyled ></BannerImageStyled>
                        </BannerImageContainer>
                    </BannerContent>
                </BannerContainer>
            </BannerWrapperStyled>

            <BannerResponsiveWrapper>
                <BannerResponsiveContainer>
                    <BannerResponsiveContent>
                        <BannerHeadingContainer >Work the way you want</BannerHeadingContainer>
                        <BannerResponsiveTextStyled>
                            Find the right work for you, with great clients, at the world’s work marketplace.
                        </BannerResponsiveTextStyled>
                        <CreateProfileButtonStyled>
                            <CreateButtonTextStyled>Create Profile</CreateButtonTextStyled>
                        </CreateProfileButtonStyled>
                        <ResponsiveTextStyled_2> Professionals rate clients  </ResponsiveTextStyled_2>
                        <ReviewTextStyled>
                            <Review /> <Review /> <Review /> <Review /> <ReviewHalf />
                        </ReviewTextStyled>
                        <ReviewTextStyled>
                            4.9/5
                        </ReviewTextStyled>
                        <ResponsiveTextStyled_3>based on 900k+ reviews</ResponsiveTextStyled_3>
                    </BannerResponsiveContent>
                </BannerResponsiveContainer>
            </BannerResponsiveWrapper>
        </>
    )
}

export default BannerWrapper;