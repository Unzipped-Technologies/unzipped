import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from '../theme'

const BadgeContainer = styled.div`
  align-items: center;
  justifycontent: center;
  background: ${props => props.color.background};
  color: ${props => props.color.text};
  border: 0;
  box-sizing: border-box;
  border-radius: 22px;
  font-size: ${props => (props.small ? '0.688rem' : '0.813rem')};
  padding: 4px 10px !important;
  text-align: center;
  margin-right: 10px;
  margin-bottom: 5px;
  font-family: arial;
  cursor: default;
  display: inline-block;
  text-transform: uppercase;
  white-space: nowrap;
  font-style: normal;
  font-weight: 600;
  overflow: scroll;
  white-space: normal;

  &.overflow-hidden {
    overflow: hidden;
  }
`

const statusColor = {
  ['actionRequired']: 'highlight',
  ['documentsComplete']: 'success',
  ['invited']: 'highlight',
  ['inProgress']: 'secondaryLight',
  ['closeReady']: 'success',
  ['closed']: 'primary',
  ['declined']: 'highlight'
}

const colors = {
  default: {
    text: '#333',
    background: '#D0D0D0'
  },
  primary: {
    text: '#fff',
    background: theme.primary
  },
  secondary: {
    text: '#fff',
    background: theme.secondary
  },
  secondaryLight: {
    text: theme.secondary,
    background: theme.secondaryLight
  },
  success: {
    text: theme.successText,
    background: theme.success
  },
  highlight: {
    text: theme.text,
    background: theme.important
  },
  green: {
    text: theme.green,
    background: theme.greenLight
  },
  red: {
    text: theme.error,
    background: theme.errorLight
  },
  darkRed: {
    text: '#fff',
    background: theme.error
  },
  grey: {
    text: '#333',
    background: '#E5E5E5'
  },
  blue: {
    text: '#00796B',
    background: '#E0F7FA'
  }
}

const getStatusColor = status => statusColor[status]
const getColor = color => (colors[color] ? colors[color] : colors.default)
/**
 * Badge Component. Colors can be set either through status value, or directly by providing color name.
 */
const Badge = ({
  children = null,
  color = null,
  status = null,
  small = false,

  className
}) => {
  const badgeColor = status ? getStatusColor(status) : color
  return (
    <BadgeContainer color={getColor(badgeColor)} small={small} className={className} data-testid="badge">
      {children}
    </BadgeContainer>
  )
}

Badge.propTypes = {
  /** Children the component contains */
  children: PropTypes.node,
  /** specific colors to use */
  color: PropTypes.string,
  /** status value to translate to color */
  status: PropTypes.string,
  /** display a smaller version */
  small: PropTypes.bool
}

export default Badge
