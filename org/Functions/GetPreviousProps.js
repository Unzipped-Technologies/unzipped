import {useRef, useEffect} from 'react';

const GetPreviousProps = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};

export default GetPreviousProps;
