import {useRef} from 'react';

/**
 * A hook to allow you to share the width of a component with another component
 * @returns array - The first element is a ref and the second is a function which returns the width of the ref
 */
const useSharedWidth = () => {
    const ref = useRef();
    const getWidth = () => ref?.current?.offsetWidth;
    return [ref, getWidth];
};

export default useSharedWidth;
