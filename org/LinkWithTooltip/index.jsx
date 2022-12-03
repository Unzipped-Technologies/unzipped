import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

export default function LinkWithTooltip({id, children, href, placement, tooltip}) {
    return (
        <OverlayTrigger
            overlay={<Tooltip id={id || 'tooltip'}>{tooltip}</Tooltip>}
            placement={placement || 'left'}
            delayShow={300}
            delayHide={150}
            rootClose>
            <a href={href}>{children}</a>
        </OverlayTrigger>
    );
}
