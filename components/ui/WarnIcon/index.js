import React, {useState, useContext, useEffect, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ToolTipText} from '../ToolTipText';
import Icon from '../icons/large-exclaimpoint';
import ToolTipsContext from '../hooks/useToolTips';

const WarnIconSvg = styled(Icon)`
    max-height: inherit;
    z-index: 12 !important;
    path {
        fill: ${props => props.theme.importantText};
    }
    &:hover {
        path {
            fill: ${props => props.theme.importantText};
        }
    }
`;

const WarnIconContainer = styled.div`
    margin: 13px 0 0 10px;
`;

/**
 * Warn Icon Component.
 */
const WarnIcon = () => {
    const [showToolTip, setShowToolTip] = useState(false);
    const [position, setPosition] = useState({left: null, top: null});
    const {setToolTips} = useContext(ToolTipsContext);
    const warnIcon = useRef(null);

    const getOffset = el => {
        let _x = 0;
        let _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return {top: _y, left: _x};
    };

    const handleShowToolTip = () => {
        setShowToolTip(!showToolTip);
        setPosition(getOffset(warnIcon.current));
    };

    useEffect(() => {
        setToolTips([
            <ToolTipText
                showToolTip={showToolTip}
                key={'warn-icon-tool-tip'}
                text={'This amount is greater than the offered amount for this investor.'}
                position={position}
                fixed
            />,
        ]);
    }, [setToolTips, showToolTip, position]);

    return (
        <WarnIconContainer ref={warnIcon} onMouseOver={handleShowToolTip} onMouseOut={handleShowToolTip}>
            <WarnIconSvg />
        </WarnIconContainer>
    );
};

WarnIcon.propTypes = {
    /** The warn tooltip text */
    text: PropTypes.string,
    /** used for ToolTip data-testid */
    testId: PropTypes.string,
    /** String to override the base font size */
    fontSize: PropTypes.string,
};

export default WarnIcon;
