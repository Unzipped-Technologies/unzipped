import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'components/ui/Badge';
import {syndicationStatuses, syndicationUserStatusTypes} from 'utils/constants';

const statusColor = {
    [syndicationStatuses.INITIATED]: 'default',
    [syndicationStatuses.DISPATCHED]: 'highlight',
    [syndicationStatuses.DEADLINE_PASSED]: 'success',
    [syndicationStatuses.ALLOCATED]: 'highlight',
    [syndicationStatuses.FINALIZED]: 'primary',
    [syndicationStatuses.CANCELED]: 'darkRed',
    [syndicationUserStatusTypes.INVITED]: 'highlight',
    [syndicationUserStatusTypes.IN_PROGRESS]: 'secondaryLight',
    [syndicationUserStatusTypes.INPUT_COMPLETE]: 'green',
    [syndicationUserStatusTypes.PAYMENT_PENDING]: 'primary',
    [syndicationUserStatusTypes.PAYMENT_RECEIVED]: 'primary',
};

const getStatusColor = status => statusColor[status] || 'default';

/**
 * Syndication Badge Component. Colors can be set either through status value, or directly by providing color name.
 */
const SyndicationBadge = ({children = null, className, color = null, status = null, small = false}) => {
    const badgeColor = status ? getStatusColor(status) : color;
    return (
        <Badge color={badgeColor} small={small} className={className}>
            {children}
        </Badge>
    );
};

SyndicationBadge.propTypes = {
    /** Children the component contains */
    children: PropTypes.node,
    /** specific colors to use */
    color: PropTypes.string,
    /** status value to translate to color */
    status: PropTypes.string,
    /** display a smaller version */
    small: PropTypes.bool,
};

export default SyndicationBadge;
