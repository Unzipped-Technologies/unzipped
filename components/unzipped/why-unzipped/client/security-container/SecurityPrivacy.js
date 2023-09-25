import {
    SecurityPrivacyContainer,
    ImageBox,
    TextBox,
    Heading,
    SubHeading,
    SectionHeading,
    Paragraph
} from "./styled";

const SecurityPrivacy = () => {
    return (
        <SecurityPrivacyContainer>
            <ImageBox><img src="/img/SecurityPrivacy.png"/></ImageBox>
            <TextBox>
                <Heading>You’re safe with us</Heading>
                <SubHeading> You get what you pay for. And we can prove it. </SubHeading>
                <SectionHeading>A Secure Workspace</SectionHeading>
                <Paragraph> Once you're onboarded, your secure Unzipped workspace allows for efficient project management. </Paragraph>
                <Paragraph> 
                    You can send and receive files, provide real-time feedback, and make secure weekly payments.
                    Don't forget to download our mobile app for on-the-go accessibility. 
                </Paragraph>
            </TextBox>
        </SecurityPrivacyContainer>
    )
}

export default SecurityPrivacy;