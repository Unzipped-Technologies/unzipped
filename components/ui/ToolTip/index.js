import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ToolTipText } from '../ToolTipText'

const Container = styled.div`
  display: inline-block;
  max-height: inherit;
  @media (min-width: 700px) {
    position: relative;
  }
`

/**
 * ToolTip Component.
 */
const ToolTip = ({ className, children, text, testId, fontSize = '', marginTop = '' }) => {
  const [showToolTip, setShowToolTip] = useState()

  const handleShowToolTip = () => {
    setShowToolTip(!showToolTip)
  }

  return (
    <Container
      data-testid={`${testId}-ToolTip-listener`}
      className={className}
      onMouseOver={handleShowToolTip}
      onMouseOut={handleShowToolTip}>
      {children}
      {showToolTip && <ToolTipText marginTop={marginTop} text={text} fontSize={fontSize} showToolTip testId={testId} />}
    </Container>
  )
}

ToolTip.propTypes = {
  /** data attribute user for testing */
  testId: PropTypes.string,
  /** The help tooltip text */
  text: PropTypes.string,
  /** String to override the base font size */
  fontSize: PropTypes.string
}

ToolTip.defaultProps = {
  testId: '',
  text: ''
}

export default ToolTip
