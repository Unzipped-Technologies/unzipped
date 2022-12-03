import React from 'react';

/**
 * @param {Object} obj
 * @param {string} obj.className
 * @param {string} obj.msg
 */
export default function ErrorMsg({className, msg}) {
    return <div className={className}>{msg}</div>;
}
