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
    @media screen and (max-width: 600px){
        font-size: 22px;
    }
`;

const ImageContainerResp = styled.div`
    margin-top: 17px;
    @media screen and (min-width: 600px){
        display: none;
    }
`

const TrustedByContent = styled.div`
    display: flex;
    gap: 7.5rem;
    width: 65.688rem;
    margin-top: 5.812rem;
    @media screen and (max-width: 600px){
        width: 100%;//385px;
        flex-direction: column;
        gap: 1rem;
        margin: 10px;
        padding-left: 40px;
    }
`;

const TextContainer = styled.div``;
const ImageContainer = styled.div`
    @media screen and (max-width: 600px){
        display: none;
    }
`;

export {
    TextStyled,
    ImageContainer,
    TextContainer,
    TrustedByContent,
    ImageContainerResp
}