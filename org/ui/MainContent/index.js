import React, {useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ScrollToTop from '../ScrollToTop';
import 'simplebar';

const MainContentContainer = styled.div`
    box-sizing: ${props => (props.$paddingDisabled ? 'content-box' : 'inherit')};
    display: block;
    padding: 60px;
    height: 100%;
    width: 100%;
    max-width: 100%;
    z-index: 2;
    position: relative;
    height: -webkit-fill-available;
    text-size-adjust: none;
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        padding: 20px;
    }
    scrollbar-width: none;
    &::-webkit-scrollbar {
        width: 0;
    }
    .simplebar-track > .simplebar-scrollbar:before {
        background-color: ${props => props.theme.tint2};
    }
    .simplebar-track {
        background-color: ${props => props.theme.tint4} !important;
        &.simplebar-vertical {
            top: 2px;
        }
    }
    .simplebar-wrapper {
        height: 90vh;
    }

    .simplebar-vertical,
    .simplebar-horizontal {
        display: ${({$pdf}) => $pdf && 'none'};
    }

    .simplebar-content-wrapper {
        overflow: ${({$pdf}) => $pdf && 'unset !important'};
    }

    .simplebar-content {
        padding: 0 !important;
        height: ${({$pdf}) => $pdf && '100%'};
    }

    .simplebar-offset {
        width: 100%;
    }
`;

const Content = styled.main`
    box-sizing: border-box;
    min-width: 280px;
    height: ${({$pdf}) => $pdf && '100%'};
    max-width: ${({$midSize, $limitWidth}) => ($limitWidth ? ($midSize ? '1605px' : '737px') : '100vw')};
    padding: ${props => (props.$paddingDisabled ? '0' : '60px 60px 100px 60px')};

    @media (max-width: ${props => props.theme.mobileWidth}px) {
        padding: ${props => (props.$paddingDisabled ? '0' : '60px 60px 140px 20px')};
    }
    @media (max-width: ${props => props.theme.phoneWidth}px) {
        padding: ${props => (props.$paddingDisabled ? '0' : '30px 30px 140px 20px')};
    }
`;

/**
 * Main Layout Component.
 */
const MainContent = ({
    children = null,
    className = '',
    limitWidth = true,
    paddingDisabled = false,
    midSize = false,
    pdf = false,
}) => {
    const contentRef = useRef(null);
    return (
        <MainContentContainer
            className={className}
            ref={contentRef}
            data-simplebar
            $pdf={pdf}
            $paddingDisabled={paddingDisabled}>
            <ScrollToTop contentRef={contentRef} />
            <Content $limitWidth={limitWidth} $paddingDisabled={paddingDisabled} $midSize={midSize} $pdf={pdf}>
                {children}
            </Content>
        </MainContentContainer>
    );
};

MainContent.propTypes = {
    /** Children the component contains */
    children: PropTypes.node,
    /** Classname for unique styling */
    className: PropTypes.string,
    /** Limits width */
    limitWidth: PropTypes.bool,
    /** Disable Padding */
    paddingDisabled: PropTypes.bool,
    /** Boolean to determine if the current page involves a PDF to sign (Sign W9 / Sign Documents) */
    pdf: PropTypes.bool,
    /** Mid-size width, if limitWidth is enabled */
    midSize: PropTypes.bool,
};

export default MainContent;
