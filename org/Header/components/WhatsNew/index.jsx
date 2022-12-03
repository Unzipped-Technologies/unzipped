/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import {Constants} from 'utils';

const WhatsNew = ({goToWhatsNew}) => {
    return (
        Constants.IS_WHATS_NEW_ENABLED && (
            <div className={'whatsNewSection cursor inline-block'}>
                <a href={Constants.WHATS_NEW_LINK} target="_blank">
                    <div
                        className="whatsNew"
                        style={{
                            marginRight: '25px',
                        }}
                        onClick={goToWhatsNew}>
                        {"What's New"}
                    </div>
                </a>
            </div>
        )
    );
};

export default WhatsNew;
