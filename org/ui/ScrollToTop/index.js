import React, {useEffect} from 'react';
import {withRouter, useLocation} from 'react-router-dom';
import GetPreviousProps from '../../../components/Functions/GetPreviousProps';

const scrollToConfig = {
    top: 0,
    left: 0,
    behavior: 'instant',
};

const ScrollToTop = props => {
    const {pathname} = useLocation();

    const previousProps = GetPreviousProps(props);
    const previousPropsLocationPath = previousProps?.location?.pathname;
    const propsLocationPath = props.location?.pathname;

    const contentRef = props.contentRef?.current;
    const simpleBarContent = props.contentRef?.current?.querySelector?.('div.simplebar-content-wrapper');

    const scrollTarget = simpleBarContent ?? contentRef ?? window;

    useEffect(() => {
        if (
            (propsLocationPath && previousPropsLocationPath && propsLocationPath !== previousPropsLocationPath) ||
            props.scrollOnRefresh
        ) {
            scrollTarget.scrollTo(scrollToConfig);
        }
    }, [pathname, props, previousProps, previousPropsLocationPath, propsLocationPath, scrollTarget]);

    return <></>;
};

export default withRouter(ScrollToTop);
