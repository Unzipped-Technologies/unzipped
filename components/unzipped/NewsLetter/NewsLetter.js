import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;    
    margin-bottom: 31px;
`;

const ContentContainer = styled.div`
    width: 840px;
    @media screen and (max-width: 600px){
        width: 300px;
    }
`;

const ImageContainer = styled.div`
    width: 94px;
    height: 94px;
    @media screen and (max-width: 600px){
        display: none;
    }
`;

const LabelStyled = styled.p`
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 111.111% */
    letter-spacing: 0.5px;
    text-transform: uppercase;
    opacity: 0.18;
    margin: 0;
    @media screen and (max-width: 425px){
        margin-top: 28px;
    }
    @media screen and (max-width: 600px){
        font-size: 18px;
        margin-top: 0;
    }
`;

const ButtonStyled = styled.button`
    width: 157.972px;
    height: 47px;
    border-radius: 5px;
    background: #37DEC5;
    font-size: 14px;
    color: #FFF;
    text-align: center;
    font-family: Roboto;
    font-style: normal;
    font-weight: 600;
    line-height: 24.5px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    border: 1px solid #37DEC5;
    display: inline-block;
    margin-top: 23px;
    @media screen and (max-width: 600px){
        display: block;
        margin-top: 10px;
        width: 300px;
    }
`;

const Body = styled.div`
    display: flex;
    gap: 24px;
    align-items: flex-end;
`;

const SubscribeEmailContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    gap: 19px; 
`;

const InputStyledContainer = styled.div`
    display: flex;
    margin-top: 23px;
    @media screen and (max-width: 600px){
        width: 250px;
        margin-top: 0px;
    }
`;

const ButtonResponsiveContainer = styled.div`
    display: none;
    width: 300px;
    @media screen and (max-width: 600px){
        display: block;
    }
`;
const ButtonContainer = styled.div`
    margin-top: 23px;
    @media screen and (max-width: 600px){
        margin-top: 0;
    }
`;
const ContainerX = styled.div`
    display: flex;
    @media screen and (max-width: 600px){
        flex-direction: column;
    }
`;

const InnerContainer = styled.div`
    display: flex;
    gap: 20px;
    @media screen and (max-width: 600px){
        gap: 3px;
    }
`;

const ParagrapContainerX = styled.div`
`

const ResponsiveImageContainer = styled.div`
    width: 94px;
    height: 94px;
    display: none;
    @media screen and (max-width: 425px) {
        display: block;
        width: 56px;
        height: 56px;
        margin-top: 39px
    }
    @media screen and (max-width: 600px){
        display: block;
        width: 56px;
        height: 56px;
        margin-top: 11px;
    }

`;

const Input = styled.input`
    height: 47px !important;
    padding-left: 26px !important;
    margin-right: 12px !important;
    width: 610px !important;
    border: 1px solid black !important;
    border-radius: 10px !important;
    display: inline-block !important;
    @media screen and (max-width: 600px){
        height: 35px !important;
        padding-left: 20px !important;
    }
    @media screen and (max-width: 600px){
        height: 35px !important;
        padding: 5px !important;
        margin-top: 0 !important;
        border-radius: 4px !important;
    }
`;
const NewsLetter = () => {
    return (
        <>
            <Wrapper>
                <ContentContainer>
                    <Body>
                        <ContainerX>
                            <InnerContainer>
                                <ImageContainer> <img src="/img/Newsletter.png" /> </ImageContainer>
                                <ResponsiveImageContainer> <img src="/img/ResponsiveNewsletter.png" /> </ResponsiveImageContainer>
                                <ParagrapContainerX>
                                    <LabelStyled> UNZIPPED News letter</LabelStyled>
                                    <InputStyledContainer >
                                        <Input placeholder="Email" type="text" />
                                    </InputStyledContainer>
                                </ParagrapContainerX>

                            </InnerContainer>
                            <ButtonContainer >
                                <ButtonStyled>Subscribe</ButtonStyled>
                            </ButtonContainer>
                        </ContainerX>
                    </Body>
                </ContentContainer>
            </Wrapper>

        </>
    );
}

export default NewsLetter;