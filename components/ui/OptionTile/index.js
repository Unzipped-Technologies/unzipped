import React from 'react';
import {OptionLabel, RadioInput, Tile, StyledIcon, SecondaryTextSpan, TextSpan, TextBox} from './style/styles';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
/**
 * OptionTile is a modified radio button to allow the user to select one out of multiple options.
 * This component should be used within OptionTileGroup.
 */
const OptionTile = ({checked, iconName, label, onChange, subLabel, value, margin, type, width}) => {
    console.log('///checked', checked)
    return (
        <Tile selected={checked} margin={margin} width={width}>
            <OptionLabel row={type==="check"} small={type==="check"}>
                {/* <StyledIcon name={iconName} width="32px" height="32px" /> */}
                {type === 'radio' && <RadioInput value={value} onChange={onChange} checked={checked} />}
                {type === 'check' && <Checkbox value={value} onChange={onChange} checked={checked?.find(i => i === value)} />}
                <TextSpan>{label}</TextSpan>
                {subLabel && <SecondaryTextSpan>{subLabel}</SecondaryTextSpan>}
            </OptionLabel>
        </Tile>
    );
};

OptionTile.propTypes = {
    /** Sets if the option is selected */
    checked: PropTypes.oneOf([PropTypes.bool, PropTypes.arrayOf(PropTypes.string)]),
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
    type: PropTypes.string,
};

OptionTile.defaultProps = {
    checked: false,
    iconName: '',
    onChange: () => {},
    subLabel: null,
    type: 'radio'
};

export default OptionTile;
