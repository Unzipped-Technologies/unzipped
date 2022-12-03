import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OutsideAlerterContainer = styled.div`
    width: ${({$autoWidth}) => ($autoWidth ? 'auto' : 'fit-content')};
`;

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideAlerter = (ref, onClickOutside) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        };
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onClickOutside]);
};

/**
 * Component that alerts if you click outside of it
 */
const OutsideAlerter = ({children, onClickOutside, autoWidth}) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, onClickOutside);

    return (
        <OutsideAlerterContainer ref={wrapperRef} $autoWidth={autoWidth}>
            {children}
        </OutsideAlerterContainer>
    );
};

OutsideAlerter.propTypes = {
    children: PropTypes.element.isRequired,
    onClickOutside: PropTypes.func.isRequired,
    autoWidth: PropTypes.bool,
};

export default OutsideAlerter;
