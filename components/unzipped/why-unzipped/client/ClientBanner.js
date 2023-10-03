import styled from "styled-components";
import { useRouter } from 'next/router';

const BannerContent = styled.div`
    width: 65.75rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1.25rem;
    align-item: center;
    border-radius: 0.625rem;
    background: rgba(142, 222, 100, 0.25);
    height: 24.55rem;
`;
// Textbox Section
const TextBox = styled.div`
    width: 31.875rem;
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
`;

const Heading_1 = styled.h1`
    color: #14A800;
    font-size: 2.375rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.438rem; 
    letter-spacing: 0.009rem;
    margin: 0;
`;

const ParagraphBox = styled.span`
    color: #000;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.438rem;
    letter-spacing: 0.009rem;
    margin-top: 1.125rem;
    display: block;
`;

const ButtonBox = styled.button`
    width: 6.75rem;
    height: 1.813rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
    border: 1px solid rgba(196, 196, 196, 0.00);
    background: #8EDE64;
    margin-top: 0.75rem;
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

const SignUpText = styled.span`
    color: #0057FF;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.15px;
    text-decoration-line: underline;
`;

const GetHiredText = styled.span`
    color: #616F55;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px; /* 153.333% */
    letter-spacing: 0.15px;
`;

const TextContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
    height: 100%;
`;

const TextContainerContent = styled.div``;
const FooterTextContent = styled.div``;

const ImageBox = styled.div`
    height: 23.125rem;
    margin: 0.625rem;
`;

const ClientBanner = () => {
    const router = useRouter()

    return (
        <>
            <BannerContent>

                <TextBox>
                    <TextContainer>
                        <TextContainerContent>
                            <Heading_1> Find Your Ideal Talent </Heading_1>
                            <ParagraphBox>
                                Get work done efficiently and build lasting professional relationships on Unzipped, the go-to platform for hourly, long-term contracts.
                            </ParagraphBox>
                            <ButtonBox> 
                                <ButtonText onClick={() => router.push('/register')}>Create Profile</ButtonText> </ButtonBox>
                        </TextContainerContent>
                        <FooterTextContent>
                            <GetHiredText> Looking to get hired? </GetHiredText>
                            <SignUpText onClick={() => router.push('/register')}>Sign up here </SignUpText>
                        </FooterTextContent>
                    </TextContainer>
                </TextBox>

                <ImageBox>
                    <img src="/img/ClientBanner.png" />
                </ImageBox>

            </BannerContent>
        </>
    )
}

export default ClientBanner;