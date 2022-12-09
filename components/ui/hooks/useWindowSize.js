import {useState, useEffect} from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            const {innerWidth, innerHeight} = window;
            if (windowSize.width !== innerWidth || windowSize.height !== innerHeight) {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [windowSize.width, windowSize.height]);
    return windowSize;
};

export default useWindowSize;
