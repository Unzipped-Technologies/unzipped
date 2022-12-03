import React from 'react';
import styled from 'styled-components';
import SidebarNavItem from 'components/ui/SidebarNavItem';
import {Constants} from 'utils';

const HelpCenterContainer = styled.div``;

/**
 * Help Center Component.
 */
const HelpCenter = () => (
    <HelpCenterContainer data-testid="help-center-link">
        <SidebarNavItem footer target="_blank" href={Constants.HELP_CENTER_LINK} icon="help">
            Help Center
        </SidebarNavItem>
    </HelpCenterContainer>
);

export default HelpCenter;
