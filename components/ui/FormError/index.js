import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ErrorContainer = styled.div`
  color: ${props => props.theme.error || '#D35B5B'};
  font-weight: 400;
  font-size: ${props => props.theme.fontSizeS || '12px'};
  font-family: arial;
`

/**
 * Form label Component.
 */
const FormError = ({ children }) => <ErrorContainer>{children}</ErrorContainer>

FormError.propTypes = {
  /** Children the component contains */
  children: PropTypes.node.isRequired
}

export default FormError
