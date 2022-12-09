```jsx
import {AnchorLink, Button, SelectInput, Search} from 'components/ui';
<>
    <TableHeader
        links={
            <>
                <AnchorLink link="http://vanillavc.com">Edit Default Deadline</AnchorLink>
                <AnchorLink link="http://vanillavc.com">Export to Excel</AnchorLink>
            </>
        }
        actions={<Button>Action Button</Button>}
        filters={
            <>
                <SelectInput
                    options={[
                        {label: 'View All', value: 1},
                        {label: 'Invited', value: 2},
                        {label: 'In Progress', value: 3},
                        {label: 'Close-Ready', value: 4},
                        {label: 'Legal Hold', value: 5},
                        {label: 'Closed', value: 6},
                        {label: 'Declined', value: 7},
                        {label: 'Offline ', value: 8},
                    ]}
                    small
                    placeholder="Filter by: View All"
                />
                <Search
                    searchableItems={[
                        {id: 1, name: 'item 1'},
                        {id: 2, name: 'item 2'},
                        {id: 3, name: 'item 3'},
                    ]}
                    keys={['name']}
                    onChange={() => {}}
                    placeholder={'Search Investors'}
                    width="225px"
                />
            </>
        }></TableHeader>
    <br />
    <br />
    <h1>TableHeader without buttons</h1>
    <TableHeader
        links={
            <>
                <AnchorLink link="http://vanillavc.com">Export to Excel</AnchorLink>
            </>
        }
        filters={
            <>
                <SelectInput
                    options={[
                        {label: 'View All', value: 1},
                        {label: 'Invited', value: 2},
                        {label: 'In Progress', value: 3},
                        {label: 'Close-Ready', value: 4},
                        {label: 'Legal Hold', value: 5},
                        {label: 'Closed', value: 6},
                        {label: 'Declined', value: 7},
                        {label: 'Offline ', value: 8},
                    ]}
                    small
                    placeholder="Filter by: View All"
                />
                <Search
                    searchableItems={[
                        {id: 1, name: 'item 1'},
                        {id: 2, name: 'item 2'},
                        {id: 3, name: 'item 3'},
                    ]}
                    keys={['name']}
                    onChange={() => {}}
                    placeholder={'Search Investors'}
                    width="225px"
                />
            </>
        }></TableHeader>
</>;
```
