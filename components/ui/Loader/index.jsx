import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const LoaderShade = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 1000;
    top: 0;
    left: 0;
`;

const LoaderContainer = styled.div`
    position: relative;
    top: calc(50% - 45px);
    z-index: 1000;
`;

const LoaderImg = styled.img`
    width: 90px;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

const Loader = ({isLoading}) => {
    return (
        !!isLoading && (
            <LoaderShade>
                <LoaderContainer>
                    <LoaderImg data-testid="loader-img" src={''} />
                </LoaderContainer>
            </LoaderShade>
        )
    );
};
Loader.propTypes = {
    /** Whether to show the modal */
    isLoading: PropTypes.bool,
};

Loader.defaultProps = {
    isLoading: false,
};

export default Loader;
