import {
    TextStyled,
    ImageContainer,
    TextContainer,
    TrustedByContent,
    ImageContainerResp
} from "./styled";

const Testimonials = () => {
    return (
        <>
            <TrustedByContent>
                <TextContainer> <TextStyled>Trusted By</TextStyled> </TextContainer>
                <ImageContainer> <img src="/img/Testimonials.png" /></ImageContainer>
                <ImageContainerResp> <img src="/img/TrustedByResp.png" /></ImageContainerResp>
            </TrustedByContent>
        </>
    )
}

export default Testimonials;