import styled from "styled-components";
import { getFontStyled, COLORS, FONT_SIZE, LETTER_SPACING } from "../../../../ui/TextMaskInput/core/utilities";

const SecurityPrivacyContainer = styled.div`
    display: flex;
    width: 65.75rem;
    gap: 5.5rem;
    margin-top: 8.125rem;
`;

const ImageBox = styled.div`
    width: 436px;
    height: 429px;
`;

const TextBox = styled.div`
    width: 20.375rem;
`;

const Heading = styled.h1`
    margin-bottom: ${FONT_SIZE.PX_16};
    ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_26,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_23,
    letterSpacing: LETTER_SPACING,
})
    }
`;

const SubHeading = styled.p`
    ${getFontStyled({
    color: COLORS.gray,
    fontSize: FONT_SIZE.PX_15,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: LETTER_SPACING
})
    }
`;

const Paragraph = styled.p`
    ${getFontStyled({
    color: COLORS.gray,
    fontSize: FONT_SIZE.PX_15,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: LETTER_SPACING
})
    }
`;

const SectionHeading = styled.h1`
    margin-top: ${FONT_SIZE.PX_15};
    margin-bottom: 0;
    ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_16,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_23,
    letterSpacing: LETTER_SPACING
})
    }
`;
export {
    SecurityPrivacyContainer,
    ImageBox,
    TextBox,
    Heading,
    SubHeading,
    SectionHeading,
    Paragraph
}