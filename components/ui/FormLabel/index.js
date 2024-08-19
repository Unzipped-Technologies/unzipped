import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import HelpIcon from '../HelpIcon'

const LabelContainer = styled.label`
  color: ${props => props.theme.textSecondary};
  font-weight: 400;
  font-size: ${props => (props.fontSize ? props.fontSize : props.theme.baseFontSize)};
  line-height: ${props => props.theme.baseLineHeight};
  font-family: arial;
  display: inline-block;
  margin-bottom: 5px;
  gap: 10px;
  svg {
    height: 16px;
    margin-left: 10px;
    vertical-align: middle;
  }
`

const addAsteriskToLastItem = array => {
  const newArray = array
  const lastItem = `${newArray.pop()}*`
  newArray.push(lastItem)
  return newArray
}

/**
 * Form label Component.
 */
const FormLabel = ({
  children = null,
  help = null,
  required = false,
  forId = null,

  fontSize = '',
  className
}) => {
  const childrenWithAsterisk =
    required && children?.props?.children && typeof children?.props?.children === 'string'
      ? `${children.props.children}*`
      : // Below targets when a child looks like <span>words.. <span>blah</span> more blah</span>
      children?.props?.children?.type === 'span' && Array.isArray(children?.props?.children?.props?.children)
      ? addAsteriskToLastItem(children.props.children.props.children)
      : undefined
  return (
    <LabelContainer
      fontSize={fontSize}
      htmlFor={forId}
      className={className}
      onClick={() => {
        console.log('clickLabel')
      }}>
      {childrenWithAsterisk ?? children}
      {required && !childrenWithAsterisk && '*'}
      {help && <HelpIcon fontSize={fontSize} text={help} testId={forId} />}
    </LabelContainer>
  )
}

FormLabel.propTypes = {
  /** Children the component contains */
  children: PropTypes.node,
  /** help tooltip text */
  help: PropTypes.string,
  /** is this label for a required field */
  required: PropTypes.bool,
  /** The id of the input this is for */
  forId: PropTypes.string,
  /** String to override the base font size */
  fontSize: PropTypes.string,
  /** Additional classNames  */
  className: PropTypes.string
}

export default FormLabel
