import React from 'react'
import Button from '../Button'
import Search from '../Search'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 45px 0px 0px 0px;
`;

const Span = styled.span`
    padding: 20px 10px;
`;

const Block = styled.div`
    width: 70%;
    display: grid;
    grid-template-columns: 3fr 1fr;
    align-items: center;
`;

const Item = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
`;

const SearchBar = ({take, setTake}) => {
    return (
        <Container>
            <Block>
                <Search 
                    searchableItems={[
                        {id: 1, name: 'item 1'},
                        {id: 2, name: 'item 2'},
                        {id: 3, name: 'item 3'},
                    ]}
                    width="90%"
                    keys={['name']}
                    onChange={filteredResults => console.log(filteredResults)}
                    placeholder={'Search'}
                />
                <Item>
                    <Span>Show: </Span>                        
                    <Button
                        icon="largeExpand"
                        popoutWidth="50px !important"
                        noBorder
                        block
                        type="sort"
                        small
                        fontSize="13px"
                        popout={[
                            {
                                text: '25',
                                onClick: () => setTake(25),
                            },
                            {
                                text: '50',
                                onClick: () => setTake(50),
                            },
                            {
                                text: '100',
                                onClick: () => setTake(100),
                            },
                        ]}
                        iconRight>
                        {take}
                    </Button>
                </Item>
            </Block>
        </Container>
    )
}

export default SearchBar