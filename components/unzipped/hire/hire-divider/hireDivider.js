import styled from "styled-components";
import {
    getFontStyled,
    COLORS,
    LETTER_SPACING,
    FONT_SIZE
} from "../../../ui/TextMaskInput/core/utilities";

import { GoBack } from "../../../icons";
import BackIcon from "../../../ui/icons/back";

const Divider = styled.div`
    display: flex;
    width: 1052px;
    justify-content: start;
    align-items: center;
    padding-left: 0rem;
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
        margin-left: 0px;
        content: '';
        display: block;
        width: 1070px;
        height: 1px;
        background: ${COLORS.hireDivider};
        margin-top: 1.25rem;
    }
    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const ResponsiveHeader = styled.div`
    display: flex; 
    flex-direction: row;
    width: 100%; 
    background: #FFF;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25); 
    padding: 10px;
    @media screen and (min-width: 600px) {
        display: none;
    }
`;
const NotificationText = styled.p`
    color: #000;
    font-family: Roboto;
    font-size: ${({ fontSize }) => fontSize ? fontSize : '12px'};
    font-style: normal;
    font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '300'};
    line-height: 19.5px;
    letter-spacing: 0.15px;
    text-transform: ${({ textTransform }) => textTransform ? textTransform : 'none'};
    width: ${({ width }) => width ? width : '100%'};
    text-align: ${({ textAlign }) => textAlign ? textAlign : 'left'};
    margin-left: ${({ marginLeft }) => marginLeft ? marginLeft : '0'};
`;

const HireDivider = ({ title }) => {
    return (
        <>
            <DivContain>
                <Divider>
                    <NavBack> <GoBack /> </NavBack>
                    <NavTextContainer>
                        <DividerText>{title}</DividerText>
                    </NavTextContainer>
                </Divider>
            </DivContain>
            <ResponsiveHeader>
                <BackIcon color='#000' />
                <NotificationText fontSize="16px" fontWeight="500" width="100%" marginLeft="20px">
                    Confirm Payment Details
                </NotificationText>
            </ResponsiveHeader>
        </>
    )
}

export default HireDivider;