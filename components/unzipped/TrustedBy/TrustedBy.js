import {
    TextStyled,
    ImageContainer,
    TextContainer,
    TrustedByContent
} from "./styled";

const Testimonials = () => {
    return (
        <>
            <TrustedByContent>
                <TextContainer> <TextStyled>Trusted By</TextStyled> </TextContainer>
                <ImageContainer> <img src="/img/Testimonials.png" /></ImageContainer>
            </TrustedByContent>
        </>
    )
}

export default Testimonials;