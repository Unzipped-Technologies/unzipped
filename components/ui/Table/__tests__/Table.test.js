import React from 'react';
import {render} from 'testing/utils';
import Table from '..';

test('Render a Table', () => {
    render(
        <Table
            theadData={['START DATE', 'TYPE', 'COLOR', 'MONTH', 'LOCATION', 'NICKNAME']}
            columnWidths={['90px', '160px', '380px', '200px', '200px', '200px', '200px']}
            isFullWidth
            selectTitle="REMOVE"
            type="radio"
            onClick={ids => console.log('prop onClick: ', ids)}
            tbodyData={[
                {
                    id: '21324',
                    date: '7/19/21',
                    type: 'Review Subscription Agreement',
                    color: {value: 'Aquamarine', link: '123'},
                    month: 'July',
                    location: 'Baltimore, Maryland',
                    nickname: 'Big Bird',
                    actions: [{name: 'Action 1', onClick: () => console.log('Action')}],
                },
                {
                    id: '34534',
                    date: {value: '7/10/21', link: '123'},
                    type: 'Review Fund Amendment',
                    color: {value: 'Lime Green', link: '123'},
                    month: 'January',
                    location: 'Fargo, North Dakota',
                    nickname: 'Bert',
                    actions: [{name: 'Action 1', onClick: () => console.log('Action')}],
                },
            ]}
        />,
    );
});
