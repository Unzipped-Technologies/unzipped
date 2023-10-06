import styled from "styled-components";
import {
    getFontStyled,
    COLORS,
    LETTER_SPACING,
    FONT_SIZE
} from "../../../ui/TextMaskInput/core/utilities";

import { GoBack } from "../../../icons";
const Divider = styled.div`
    display: flex;
    width: 1052px;
    justify-content: start;
    align-items: center;
    padding-left: 9rem;
    gap:20px;
`;

const DividerText = styled.span`
${getFontStyled(
    {
        color: COLORS.black,
        fontSize: FONT_SIZE.PX_20,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: FONT_SIZE.PX_19,
        letterSpacing: LETTER_SPACING
    })}
`;

const NavBack = styled.div`
    width: ${FONT_SIZE.PX_43};
`;
const NavTextContainer = styled.div`
    width: 250px;
`;

const DivContain = styled.div`
    display: flex;
    flex-direction: column;
    &:after{
        margin-left: 135px;
        content: '';
        display: block;
        width: 952px;
        height: 1px;
        background: ${COLORS.hireDivider};
        margin-top: 1.25rem;
    }
`

const HireDivider = () => {
    return (
        <DivContain>
            <Divider>
                <NavBack> <GoBack /> </NavBack>
                <NavTextContainer>
                    <DividerText>Confirm Payment Details</DividerText>
                </NavTextContainer>
            </Divider>
        </DivContain>
    )
}

export default HireDivider;