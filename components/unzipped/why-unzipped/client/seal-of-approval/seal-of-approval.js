import styled from "styled-components";
import Check from "./../../../../icons/check";

import { getFontStyled, COLORS, FONT_SIZE, LETTER_SPACING } from "../../../../ui/TextMaskInput/core/utilities";

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 1052px;
    @media screen and (max-width: 600px){
        width: 385px;
        flex-direction: column;
    }
`;

const ParagraphText = styled.p`
    ${getFontStyled(
    {
        color: COLORS.gray,
        fontSize: FONT_SIZE.PX_22,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: FONT_SIZE.PX_23,
        letterSpacing: LETTER_SPACING
    })}
`;

const TextBoxContainer = styled.div`
    width: 571px;
    padding-left: 2rem;
    @media screen and (max-width: 600px){
        padding-left: 0;
        width: 385px;
    }

`;

const ChecklistContainer = styled.div`
    width: 481px;
`

const ParagraphTextList = styled.p`
    ${getFontStyled(
    {
        color: COLORS.gray,
        fontSize: FONT_SIZE.PX_16,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: FONT_SIZE.PX_22,
        letterSpacing: LETTER_SPACING
    })}
`;

const Span = styled.span`
    margin: ${FONT_SIZE.PX_5};
`
const checkList = [
    {
        icon: <Check />,
        description: "Browse similar projects they’ve worked on"
    },
    {
        icon: <Check />,
        description: "Directly access proven talent without unnecessary layers"
    },
    {
        icon: <Check />,
        description: "Check their portfolio"
    },
    {
        icon: <Check />,
        description: "Check qualifications"
    },
    {
        icon: <Check />,
        description: "Run a chat or video interview"
    }
]
const SealOfApproval = () => {
    return (
        <>
            <Container>
                <TextBoxContainer>
                    <ParagraphText>You’ll have plenty of help chosing the right person for the job. And no matter who you’re hiring you can:</ParagraphText>
                </TextBoxContainer>
                <ChecklistContainer>
                    {
                        checkList.map((item) => (
                            <ParagraphTextList> <Span>{item.icon}</Span> {item.description} </ParagraphTextList>
                        ))
                    }
                </ChecklistContainer>
            </Container>
        </>
    )
}

export default SealOfApproval;