import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/ui/Button';
import {SidebarContext} from '../Sidebar';

/**
 * Sidebar Navigation Item Component.
 */
const SidebarActionItem = ({icon, children, ...rest}) => {
    const {expanded} = React.useContext(SidebarContext);
    return (
        <Button icon={icon} type="inverse" block condensed={!expanded} {...rest}>
            {children}
        </Button>
    );
};

SidebarActionItem.propTypes = {
    /** Children the component contains */
    children: PropTypes.node,
    /** Item icon */
    icon: PropTypes.node,
};

SidebarActionItem.defaultProps = {
    current: false,
    children: null,
};

export default SidebarActionItem;
