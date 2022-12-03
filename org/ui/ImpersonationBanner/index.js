import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from 'themes/default';
import useWindowSize from 'components/ui/hooks/useWindowSize';
import Banner from '../Banner';
import Button from '../Button';
import Text from '../Text';
import Title from '../Title';

const ImpersonatedTitle = styled(Title)`
    margin: 0;
`;

/**
 * ImpersonationBanner component to display content at the top of a page
 */
const ImpersonationBanner = ({logout, name = '', show = true}) => {
    const {width} = useWindowSize();
    const isTabletWidth = width <= theme.tabletWidth;

    return (
        <Banner show={show} testId="Impersonation-Banner">
            <ImpersonatedTitle level={3}>
                You are viewing as: <Text type="span">{name}</Text>
            </ImpersonatedTitle>
            <Button onClick={logout} block={isTabletWidth} testId="Impersonation Banner Logout Button">
                Stop Viewing
            </Button>
        </Banner>
    );
};

ImpersonationBanner.propTypes = {
    /** Boolean to render/hide the ImpersonationBanner component */
    show: PropTypes.bool,
    /** Name of the impersonated user */
    name: PropTypes.string,
    /** Function that handles logging out of an impersonated user */
    logout: PropTypes.func.isRequired,
};

export default ImpersonationBanner;
