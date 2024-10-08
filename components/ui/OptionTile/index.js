import React from 'react'
import { OptionLabel, RadioInput, Tile, StyledIcon, SecondaryTextSpan, TextSpan, TextBox } from './style/styles'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import { ConverterUtils } from '../../../utils'
/**
 * OptionTile is a modified radio button to allow the user to select one out of multiple options.
 * This component should be used within OptionTileGroup.
 */
const OptionTile = ({
  checked = false,
  iconName = '',
  onChange = () => {},
  subLabel = null,
  type = 'radio',
  label,
  value,
  margin,
  width,
  mobile
}) => {
  return (
    <Tile selected={checked} margin={margin} width={width}>
      <OptionLabel row small={type === 'check'} mobile={mobile}>
        {type === 'radio' && (
          <RadioInput value={value} onChange={onChange} checked={checked} id={ConverterUtils.convertText(value)} />
        )}
        {type === 'check' && <Checkbox value={value} onChange={onChange} checked={checked?.find(i => i === value)} />}
        <TextSpan checked={checked}>{label}</TextSpan>
        {subLabel && <SecondaryTextSpan>{subLabel}</SecondaryTextSpan>}
      </OptionLabel>
    </Tile>
  )
}

OptionTile.propTypes = {
  /** Sets if the option is selected */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.string)]),
  /** Optionally provide an icon name */
  iconName: PropTypes.string,
  /** The label text shown to the user, Required */
  label: PropTypes.string.isRequired,
  /** The function to run when an option's state changes */
  onChange: PropTypes.func,
  /** Optional text value to add info about the label, Optional */
  subLabel: PropTypes.string,
  /** The text value to be passed to the input's value attribute, Required */
  value: PropTypes.string.isRequired,
  /** The text value to be passed to the input's value attribute, Required */
  type: PropTypes.string
}

export default OptionTile
