import React, {useContext} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {SideContext} from '../SideContent';
import Icon from 'components/ui/Icon';
import {isSafari} from 'react-device-detect';
import 'simplebar';

const SidebarContainer = styled.div`
    background: ${props => props.theme.primaryBack};
    padding: 30px 0 30px 20px;
    font-family: arial;
    color: #fff;
    width: 319px;
    min-width: 319px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow-y: auto;
    height: 100%;
    z-index: 0;
    .simplebar-track > .simplebar-scrollbar:before {
        background-color: ${props => props.theme.tint3};
    }
    .simplebar-content-wrapper,
    .simplebar-content {
        display: flex;
        width: 319px;
    }
    .simplebar-content > div {
        width: 100%;
        & > div {
            align-self: center;
        }
        & > nav {
            align-self: start;
        }
    }
`;

const Title = styled.h2`
    font-size: ${props => props.theme.fontSizeXL};
    margin: 30px 20px;
    font-weight: 700;
    width: fit-content;
`;

const Back = styled.div`
    cursor: pointer;
    display: flex;
    margin: 0 20px;
`;

const BackIcon = styled(Icon)`
    margin-right: 16px;
`;

/**
 * Sub Sidebar - Secondary side bar.
 */
const SubSidebar = ({title, children, onBackClick}) => {
    const {mobileView, onBack} = useContext(SideContext);
    const handOnClick = () => {
        onBackClick?.();
        onBack();
    };
    //A workaround for simplebar causing issues in ios
    const simplebarAttr = isSafari ? {} : {'data-simplebar': 'data-simplebar'};

    return (
        <SidebarContainer role="navigation" aria-labelledby="secondLabel" {...simplebarAttr}>
            <div>
                {mobileView && (
                    <Back role="button" onClick={handOnClick}>
                        <BackIcon name="back" alt="back icon" />
                        Back
                    </Back>
                )}
                <Title id="secondLabel">{title}</Title>
                {children}
            </div>
        </SidebarContainer>
    );
};

SubSidebar.propTypes = {
    /** items the component contains */
    children: PropTypes.node,
    /** action items the component contains */
    Title: PropTypes.node,
};

SubSidebar.defaultProps = {
    title: '',
    children: null,
};

export default SubSidebar;
