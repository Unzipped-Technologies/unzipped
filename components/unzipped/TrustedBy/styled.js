import styled from 'styled-components';
import { COLORS, FONT_SIZE, LETTER_SPACING, getFontStyled } from '../../ui/TextMaskInput/core/utilities';

const TextStyled = styled.span`
    ${getFontStyled({
    color: COLORS.brownishGray,
    fontSize: FONT_SIZE.PX_16,
    fontWeight: 400,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_23,
    letterSpacing: LETTER_SPACING
})}
`;

const TrustedByContent = styled.div`
    display: flex;
    gap: 7.5rem;
    width: 65.688rem;
    margin-top: 5.812rem;
`;

const TextContainer = styled.div``;
const ImageContainer = styled.div``;

export {
    TextStyled,
    ImageContainer,
    TextContainer,
    TrustedByContent
}