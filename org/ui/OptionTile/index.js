import React from 'react';
import {OptionLabel, RadioInput, Tile, StyledIcon, SecondaryTextSpan, TextSpan} from './style/styles';
import PropTypes from 'prop-types';

/**
 * OptionTile is a modified radio button to allow the user to select one out of multiple options.
 * This component should be used within OptionTileGroup.
 */
const OptionTile = ({checked, iconName, label, onChange, subLabel, value}) => {
    return (
        <Tile selected={checked}>
            <OptionLabel>
                <StyledIcon name={iconName} width="64px" height="64px" />
                <RadioInput value={value} onChange={onChange} checked={checked} />
                <TextSpan>{label}</TextSpan>
                {subLabel && <SecondaryTextSpan>{subLabel}</SecondaryTextSpan>}
            </OptionLabel>
        </Tile>
    );
};

OptionTile.propTypes = {
    /** Sets if the option is selected */
    checked: PropTypes.bool,
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
};

OptionTile.defaultProps = {
    checked: false,
    iconName: '',
    onChange: () => {},
    subLabel: null,
};

export default OptionTile;
