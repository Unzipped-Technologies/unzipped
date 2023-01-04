import React from 'react'
import Button from '../Button'
import Search from '../Search'
import styled from 'styled-components'
import {TitleText} from '../../unzipped/dashboard/style'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    margin: ${({margin}) => margin ? margin : '45px 0px 0px 0px'};
`;

const Span = styled.span`
    padding: 20px 10px;
`;

const TitleBlock = styled.div`
    width: 70%;
    display: grid;
    max-width: 1100px;
`;

const Block = styled.div`
    width: ${({$width}) => $width ? $width : '70%'};
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    max-width: 1100px;
`;

const Item = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
`;

const SearchBar = ({take, setTake, title, sort, setSort, sortOptions, margin, width}) => {
    return (
        <Container margin={margin}>
            {title && <TitleBlock><TitleText title large>{title}</TitleText></TitleBlock>}
            <Block $width={width}>
                <Search 
                    searchableItems={[
                        {id: 1, name: 'item 1'},
                        {id: 2, name: 'item 2'},
                        {id: 3, name: 'item 3'},
                    ]}
                    width="80%"
                    keys={['name']}
                    onChange={filteredResults => console.log(filteredResults)}
                    placeholder={'Search'}
                />
                <Item>
                    {take && (
                        <Span>Show: </Span>  
                    )}   
                    {take && (                   
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
                    )}

                    {sort && sortOptions && <Span>Sort: </Span> }
                    {sort && sortOptions && (                      
                        <Button
                            icon="largeExpand"
                            popoutWidth="50px !important"
                            noBorder
                            block
                            type="sort"
                            small
                            fontSize="13px"
                            popout={sortOptions}
                            iconRight>
                            {sort}
                        </Button>
                    )}
                </Item>
            </Block>
        </Container>
    )
}

export default SearchBar