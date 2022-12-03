import React from 'react';
import {Modal, InitialsIcon, Button, ValueList, Title} from 'components/ui';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withModalPortal from 'components/withModalPortal';

const StyledFlexDiv = styled.div`
    display: flex;
    align-items: center;
`;

const SubStyledFlexDiv = styled.div`
    display: flex;
    align-items: center;
    margin-left: 3px;
`;

const StyledName = styled(Title)`
    color: ${props => props.theme.text};
    font-family: Arial;
    font-size: ${props => props.theme.fontSizeXL};
    font-style: normal;
    font-weight: 700;
    line-height: ${props => props.theme.lineHeightL};
    letter-spacing: 0px;
    text-align: left;
    margin: 0px 0px 0px 8px;
`;

const ButtonDiv = styled.div`
    text-align: end;
    margin-top: 5px;
`;
const ProfileModal = ({
    name,
    initials,
    role,
    email,
    roleHeader = 'Role',
    phoneHeader = 'Phone Number',
    emailHeader = 'Email',
    onHide,
    showModal,
    phone = null,
}) => {
    return (
        showModal && (
            <Modal onHide={onHide}>
                <StyledFlexDiv>
                    <InitialsIcon
                        textThemeColor="secondary"
                        borderThemeColor="secondary"
                        fontSize={'1.25rem'}
                        borderWidth={'3px'}
                        width={'50px'}
                        height={'50px'}
                        fontWeight={'700'}
                        initials={initials}
                    />
                    <StyledName level={2}>{name}</StyledName>
                </StyledFlexDiv>
                <SubStyledFlexDiv>
                    <ValueList
                        longContent={0}
                        containOverFlow={false}
                        fontSize={'16px'}
                        name="value-list-1"
                        data={[
                            {
                                name: roleHeader,
                                content: [role],
                            },
                            {
                                name: emailHeader,
                                content: [email],
                            },
                        ]}
                        top="30px"></ValueList>
                </SubStyledFlexDiv>
                {phone && (
                    <SubStyledFlexDiv>
                        <ValueList
                            longContent={0}
                            containOverFlow={false}
                            fontSize={'16px'}
                            name="value-list-1"
                            data={[
                                {
                                    name: phoneHeader,
                                    content: [phone],
                                },
                            ]}
                            top="30px"></ValueList>
                    </SubStyledFlexDiv>
                )}
                <ButtonDiv>
                    <Button onClick={onHide}>Close</Button>
                </ButtonDiv>
            </Modal>
        )
    );
};

export default withModalPortal(ProfileModal);

ProfileModal.propTypes = {
    /** Intitals For Icon */
    initials: PropTypes.string.isRequired,
    /** Name Displayed In Heading*/
    name: PropTypes.string.isRequired,
    /** Subtext displayed */
    emailHeader: PropTypes.string,
    /** Subtext displayed */
    roleHeader: PropTypes.string,
    /** Subtext displayed */
    phoneHeader: PropTypes.string,
    /** Role Of Contact */
    role: PropTypes.string.isRequired,
    /** Email of Contact */
    email: PropTypes.string.isRequired,
    /** Phone Number of Contact */
    phone: PropTypes.string,
    /** Show if modal is opened */
    showModal: PropTypes.bool.isRequired,
    /** Function to hide the modal */
    onHide: PropTypes.func.isRequired,
};
