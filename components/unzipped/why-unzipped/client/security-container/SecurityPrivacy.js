import {
    SecurityPrivacyContainer,
    ImageBox,
    TextBox,
    Heading,
    SubHeading,
    SectionHeading,
    Paragraph,
    HeadingResp
} from "./styled";

const SecurityPrivacy = () => {
    return (
        <SecurityPrivacyContainer>
            <HeadingResp>You’re safe with us</HeadingResp>
                <ImageBox><img src="/img/SecurityPrivacy.png" width={"90%"}/></ImageBox>
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