import React from 'react'
import Button from '../Button'
import Search from '../Search'
import styled from 'styled-components'
import { TitleText } from '../../unzipped/dashboard/style'

const Container = styled.div`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  justify-content: center;
  flex-flow: column;
  padding: ${({ margin }) => (margin ? margin : '0px 0px 0px 0px')};
  @media (max-width: 680px) {
    width: -webkit-fill-available;
  }
`

const Span = styled.span`
  padding: 20px 10px;
`

const TitleBlock = styled.div`
  width: 70%;
  display: grid;
  max-width: 1100px;
`

const Block = styled.div`
  width: ${({ $width }) => ($width ? $width : '80%')};
  height: ${({ $height }) => ($height ? $height : '35px')};
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
`

const Item = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
`

const SearchBar = ({
  take,
  setTake,
  title,
  sort,
  placeHolderColor,
  theme,
  setSort,
  sortOptions,
  margin,
  alignItems,
  width,
  height,
  handleSearch,
  setFilter,
  border,
  borderRadius,
  searchButton,
  filter
}) => {

  return (
    <Container margin={margin} alignItems={alignItems}>
      {title && (
        <TitleBlock>
          <TitleText title large>
            {title}
          </TitleText>
        </TitleBlock>
      )}
      <Block $width={width} $height={height}>
        <Search
          placeHolderColor={placeHolderColor}
          handleSearch={handleSearch}
          searchButton={searchButton && searchButton}
          width="100%"
          height={height}
          keys={['name']}
          border={border}
          borderRadius={borderRadius}
          onChange={filteredResults => {
            setFilter({ ...filter,  searchKey: filteredResults })
          }}
          placeholder={'Search'}
          theme={theme}
        />
        <Item>
          {take && <Span>Show: </Span>}
          {take && (
            <Button
              icon="largeExpand"
              background="#D9D9D926"
              marginRight="9px"
              block
              type="sort"
              small
              fontSize="13px"
              popoutWidth="66px"
              popout={[
                {
                  text: '25',
                  onClick: () => setTake(25)
                },
                {
                  text: '50',
                  onClick: () => setTake(50)
                },
                {
                  text: '100',
                  onClick: () => setTake(100)
                }
              ]}
              iconRight>
              {take}
            </Button>
          )}

          {sort && sortOptions && <Span></Span>}
          {sort && sortOptions && (
            <Button
              icon="largeExpand"
              background="#D9D9D926"
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
