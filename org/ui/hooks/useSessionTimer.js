import PropTypes from 'prop-types';
import {useIdleTimer} from 'react-idle-timer';

/**
 *
 * @param {initializeOnMount} boolean - initializeOnMount determines whether to actually use this timer. This can be used if you want to activate this timer on a certain condition.
 * @param {onWarning} function - The onPrompt function will fire when the warningTimeout is reached. This is where we would show a warning modal
 * @param {onExpire} function - This will fire when the timer has run out. Can be used to decide what to do after a session timeout for example.
 * @param {options} object - Contains optional configuration to override defaults
 * @returns {sessionTimer} - see idleTimer docs. Important methods returned: getRemainingTime<fn> gets the remaining time before session is declared idle, reset<fn> resets the remaining time back to time on init
 */
const useSessionTimer = (initializeOnMount, onWarning, onExpire, options) => {
    const DEFAULT_WARNING_TIME = process.env.REACT_APP_SESSION_TIMER_WARNING || 1000 * 60 * 25; // 25 minutes
    const DEFAULT_FINAL_TIME = process.env.REACT_APP_SESSION_TIMER_EXPIRE || 1000 * 60 * 5; // 25 + 5 minutes (added to warning time under the hood)

    // warningTimeout is added to timeout time and represents the final time of this idleTimer
    // finalTimeout begins countdown after warningTimeout expires, thus the time is actually added on
    const sessionTimer = useIdleTimer({
        onPrompt: onWarning,
        onIdle: onExpire,
        timeout: options?.warningTimeout || Number(DEFAULT_WARNING_TIME), // will fire onPrompt when timeout reached
        promptTimeout: options?.finalTimeout || Number(DEFAULT_FINAL_TIME), // will fire onIdle when promptTimeout reached
        events: options?.events || ['keydown', 'mousedown', 'MSPointerDown'], // reference docs for react-idle-timer
        immediateEvents: options?.immediateEvents || [],
        debounce: options?.debounce || 0,
        throttle: options?.throttle || 0,
        eventsThrottle: options?.eventsThrottle || 200,
        element: options?.element || document,
        startOnMount: initializeOnMount,
        startManually: initializeOnMount === true ? false : true,
        stopOnIdle: options?.stopOnIdle || false,
        crossTab: options?.crossTab || false,
        name: options?.name || 'idle-timer',
        syncTimers: options?.syncTImers || 0,
        leaderElection: options?.leaderElection || false,
    });

    return sessionTimer;
};

useSessionTimer.PropTypes = {
    initializeOnMount: PropTypes.bool,
    onPrompt: PropTypes.func,
    onIdle: PropTypes.func,
    options: PropTypes.object,
};

export default useSessionTimer;
