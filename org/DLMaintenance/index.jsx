import React, {Component} from 'react';
import {Constants} from 'utils';

class DLMaintenance extends Component {
    render() {
        return (
            <>
                <div className="title marginTop50 marginLeft20">
                    {Constants.DLMAINTENANCE}
                    <a className="vanilla-href-color" href={'mailto:' + Constants.COOLEY_EMAIL}>
                        {Constants.COOLEY_EMAIL}
                    </a>
                    .
                </div>
            </>
        );
    }
}

export default DLMaintenance;
