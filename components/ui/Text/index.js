import React, { forwardRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from '../theme'

const bodyStyles = {
  1: {
    fontSize: theme.fontSizeM,
    lineHeight: theme.lineHeightM
  },
  2: {
    fontSize: theme.baseFontSize,
    lineHeight: theme.baseLineHeight
  },
  3: {
    fontSize: theme.fontSizeS,
    lineHeight: theme.lineHeightS
  },
  4: {
    fontSize: theme.fontSizeXL,
    lineHeight: theme.lineHeightL
  },
  5: {
    fontSize: theme.fontSizeL,
    lineHeight: theme.lineHeight_L
  }
}

const styles = ({
  level,
  marginBottom,
  marginTop,
  $display,
  theme,
  $color,
  onClick,
  $fontWeight,
  $padding,
  $textAlign,
  $underline,
  $whiteSpace,
  clickable
}) => `
    font-size: ${bodyStyles[level]?.fontSize || bodyStyles[1].fontSize};
    line-height: ${bodyStyles[level]?.lineHeight || bodyStyles[1].lineHeight};
    color: ${$color || theme.textSecondary};
    cursor: ${onClick ? 'pointer' : 'auto'};
    font-weight: ${$fontWeight};
    padding: ${$padding};
    text-align: ${$textAlign};
    text-decoration: ${$underline};
    font-family: arial;
    display: ${$display || 'inline-block'};
    white-space: ${$whiteSpace};
    gap: 10px;
    margin-bottom: ${marginBottom}px;
    margin-top: ${marginTop}px;
    cursor: ${clickable ? 'pointer' : 'default'}
    svg {
        height: 16px;
        margin-left: 10px;
        vertical-align: middle;
    }
`

const PStyled = styled.p`
  ${styles}
`

const SpanStyled = styled.span`
  ${styles}
`
/**
 * Text Component.
 */
const Text = forwardRef(
  (
    {
      children,
      color = '',
      fontWeight = '400',
      level = 1,
      marginBottom = '',
      marginTop = '13.125',
      onClick = null,
      type = 'p',
      underline = 'none',
      padding = '0',
      textAlign = 'left',
      display = 'inline-block',
      className = '',
      whiteSpace = 'auto',
      clickable
    },
    ref
  ) => {
    let TextStyled
    switch (type.toLowerCase()) {
      case 'span':
        TextStyled = SpanStyled
        break
      case 'p':
      default:
        TextStyled = PStyled
    }
    return (
      <TextStyled
        className={className}
        onClick={onClick}
        $color={color}
        $underline={underline}
        $fontWeight={fontWeight}
        level={level}
        marginBottom={marginBottom}
        marginTop={marginTop}
        clickable={clickable}
        $display={display}
        $padding={padding}
        $textAlign={textAlign}
        $whiteSpace={whiteSpace}>
        {children}
      </TextStyled>
    )
  }
)

Text.propTypes = {
  /** Adds className to component */
  className: PropTypes.string,
  /** Children the component contains */
  children: PropTypes.node,
  /** Sets color, optional */
  color: PropTypes.string,
  /** Sets fontWeight, optional */
  fontWeight: PropTypes.string,
  /** Sets text size level, optional */
  level: PropTypes.number,
  /** Function called on click, optional */
  onClick: PropTypes.func,
  /** For text tag other than p, such as span, optional */
  type: PropTypes.string,
  /** Add underline to text */
  underline: PropTypes.string,
  /** Sets padding */
  padding: PropTypes.string,
  /** Aligns items */
  textAlign: PropTypes.string,
  /** Set display of p tag */
  display: PropTypes.string,
  /** Set white-space of p tag */
  whiteSpace: PropTypes.string,
  /** Set margin-bottom */
  marginBottom: PropTypes.string
}

export default Text
