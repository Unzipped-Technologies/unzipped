import React from 'react'
import { OptionTile } from '../'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const OptionTileList = styled.div`
  display: ${props => (props.mobile ? 'flex' : 'grid')};
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
  width: ${props => (props.availableWidth ? '-webkit-fill-available' : 'auto')};
  grid-template-columns: repeat(${props => props.numTiles}, 1fr);
  grid-auto-rows: 1fr;
  gap: ${props => (props.mobile ? '18px' : '25px')};
  list-style: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
  @media (max-width: ${props => props?.breakpoint || props.theme.tableMobileWidth}px) {
    grid-template-columns: 1fr;
  }
`

/**
 * OptionTileGroup holds *N* number of OptionTiles. Only one option in the group can be selected at one time.
 */
const OptionTileGroup = ({
  breakpoint = null,
  selectedValue = '',
  tileList = [
    {
      iconName: '',
      subLabel: null
    }
  ],
  onChange = () => {},
  mobile,
  availableWidth,
  rest,
  margin,
  type
}) => {
  return (
    <OptionTileList numTiles={tileList.length} breakpoint={breakpoint} mobile={mobile} availableWidth={availableWidth}>
      {tileList?.map(({ iconName, label, subLabel, value }) => (
        <OptionTile
          key={value}
          mobile={mobile}
          checked={selectedValue === value ? true : type === 'check' ? selectedValue : false}
          iconName={iconName}
          label={label}
          onChange={onChange}
          subLabel={subLabel || null}
          value={value}
          margin={margin}
          width={availableWidth ? '-webkit-fill-available' : tileList.length > 2 && '250px'}
          type={type}
          {...rest}
        />
      ))}
    </OptionTileList>
  )
}

OptionTileGroup.propTypes = {
  /** Specify an optional breakpoint in px to switch from rows to columns */
  breakpoint: PropTypes.number,
  /** Provides which value is currently selected */
  selectedValue: PropTypes.string,
  /** The list of tiles that contains each tile's props */
  tileList: PropTypes.arrayOf(
    PropTypes.shape({
      iconName: PropTypes.string,
      label: PropTypes.string.isRequired,
      subLabel: PropTypes.string,
      value: PropTypes.string.isRequired
    })
  ),
  /** The function to run when an option's state changes */
  onChange: PropTypes.func
}

export default OptionTileGroup
