/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import {Constants} from 'utils';

const HelpCenter = () => {
    return (
        Constants.IS_HELP_CENTER_ENABLED && (
            <div className="marginRight20 helpCenter inline-block">
                <a className="user-name" href={Constants.HELP_CENTER_LINK} target="_blank">
                    Help Center
                </a>
            </div>
        )
    );
};

export default HelpCenter;
