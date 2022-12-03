import React, {createContext, useEffect, useState} from 'react';
import {timeLeft} from '../utils/timeHelper';

const DeadlineContext = createContext();

const DeadlineContextProvider = ({children}) => {
    const [isDeadlinePassedWhileOnPage, setIsDeadlinePassedWhileOnPage] = useState(false);
    const [deadline, setDeadline] = useState(null);
    const [isUserNotified, setIsUserNotified] = useState(false);

    useEffect(() => {
        setIsUserNotified(false);
        setIsDeadlinePassedWhileOnPage(false);
        let startTimer;
        const isCountingDown = timeLeft(deadline) > 0;
        if (deadline && isCountingDown) {
            startTimer = setInterval(() => {
                if (timeLeft(deadline) <= 0) {
                    clearInterval(startTimer);
                    setIsDeadlinePassedWhileOnPage(true);
                } else {
                    setIsDeadlinePassedWhileOnPage(false);
                }
            }, 250);
        }
        return () => clearInterval(startTimer);
    }, [deadline]);

    const shouldUserBeNotified = isDeadlinePassedWhileOnPage && !isUserNotified;

    return (
        <DeadlineContext.Provider
            value={{
                shouldUserBeNotified,
                isDeadlinePassedWhileOnPage,
                setDeadline,
                isUserNotified,
                setIsUserNotified,
            }}>
            {children}
        </DeadlineContext.Provider>
    );
};

export default DeadlineContext;

export {DeadlineContextProvider};
