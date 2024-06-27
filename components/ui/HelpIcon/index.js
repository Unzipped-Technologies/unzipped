import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Icon from '../icons/help'
import ToolTip from '../ToolTip'

const HelpIconSvg = styled(Icon)`
  max-height: inherit;
  z-index: 12 !important;
  path {
    fill: #55565b;
  }
  &:hover {
    path {
      fill: ${props => props.theme.secondary};
    }
  }
`

/**
 * Help Icon Component.
 */
const HelpIcon = ({ text, testId, className, fontSize = '' }) => {
  return (
    <ToolTip className={className} fontSize={fontSize} text={text} testId={testId}>
      <HelpIconSvg />
    </ToolTip>
  )
}

HelpIcon.propTypes = {
  /** The help tooltip text */
  text: PropTypes.string,
  /** use vanilla 1.0 styling */
  retro: PropTypes.bool,
  /** used for ToolTip data-testid */
  testId: PropTypes.string,
  /** String to override the base font size */
  fontSize: PropTypes.string
}

HelpIcon.defaultProps = {
  text: '',
  retro: false,
  testId: ''
}

export default HelpIcon
