import React, {useState, createContext} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useWindowSize from 'components/ui/hooks/useWindowSize';
import Icon from 'components/ui/Icon';
import SubSidebar from 'components/ui/SubSidebar';
import theme from 'themes/default';

const SideContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    align-content: flex-start;
    height: 100%;
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        max-width: 320px;
        display: ${props => (props.$open ? 'flex' : 'none')};
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
    }
`;

const ShowSideContent = styled.div`
    display: none;
    background: ${props => (props.$hasSubSidebar ? props.theme.primaryBack : props.theme.primary)};
    height: 50px;
    min-height: 50px;
    align-items: center;
    padding-left: 20px;
    white-space: nowrap;
    cursor: pointer;
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        display: flex;
        gap: 15px;
    }
`;

export const ClosingIcon = styled(Icon)`
    display: none;
    position: absolute;
    top: 30px;
    right: 20px;
    z-index: 4;
    path {
        fill: #fff;
    }
    &:hover {
        cursor: pointer;
    }
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        display: ${props => (props.$open ? 'block' : 'none')};
    }
`;

const SideContext = createContext({
    open: false,
    back: false,
});

/**
 * Main Layout Component.
 */
const SideContent = ({children, className = ''}) => {
    const [open, setOpen] = useState(false);
    const [back, setBack] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setBack(false);
    };
    const handleSetCurrentItem = (item, isSubItem = false) => {
        if (!hasSubSidebar || isSubItem) setCurrentItem(item);
    };
    const hasSubSidebar = !!React.Children.toArray(children).some(c => c.type === SubSidebar);
    const {width} = useWindowSize();
    const mobileView = width <= theme.mobileWidth;
    const reducedView = width <= theme.reducedWidth;
    const phoneView = width <= theme.phoneWidth;
    const showSubSidebar = !back || !mobileView;
    const showSidebar = !hasSubSidebar || back || !mobileView;

    return (
        <SideContext.Provider
            value={{
                mobileView: mobileView,
                reducedView: reducedView,
                phoneView: phoneView,
                mobileOpen: open,
                back: back,
                onOpen: handleOpen,
                onClose: handleClose,
                onBack: () => setBack(true),
                onForward: () => setBack(false),
                hasSubSidebar: hasSubSidebar,
                showSubSidebar: showSubSidebar,
                showSidebar: showSidebar,
                setCurrentItem: handleSetCurrentItem,
            }}>
            {mobileView && (
                <ShowSideContent
                    data-testid="side-content-show"
                    $hasSubSidebar={hasSubSidebar}
                    onClick={handleOpen}
                    className={className}>
                    <Icon name="menu" alt="menu icon" />
                    {currentItem}
                </ShowSideContent>
            )}
            <SideContentContainer $open={open} className={className}>
                <ClosingIcon height="17" width="17" name="close" $open={open} onClick={handleClose} />
                {children}
            </SideContentContainer>
        </SideContext.Provider>
    );
};

SideContent.propTypes = {
    /** Children the component contains */
    children: PropTypes.node,
    /** Classname for unique styling */
    className: PropTypes.string,
};

SideContent.defaultProps = {
    children: null,
};

export default SideContent;
export {SideContext};
