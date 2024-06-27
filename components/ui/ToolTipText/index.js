import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ToolTipTextContainer = styled.div`
  z-index: 999;
  width: max-content;
  max-width: 355px;
  position: ${props => (props.$fixed ? 'fixed' : 'absolute')};
  opacity: 1;
  transition: opacity 0.3s ease-in;
  border: 2px solid ${props => props.theme.border};
  border-radius: 4px;
  background-color: #fff;
  color: ${props => props.theme.textSecondary};
  padding: 10px 20px;
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop + 'px' : '10px')};
  font-size: ${props => (props.$fontSize ? props.$fontSize : '0.813rem')};
  font-weight: 500;
  text-align: left;
  left: ${props => props.$left};
  top: ${props => props.$top};
  transform: translateX(-50%);
  @media (max-width: 700px) {
    top: 20px;
    max-width: 300px;
  }
  &:before {
    content: '';
    left: 50%;
    border: 10px solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    margin-left: -10px;
    bottom: 100%;
    border-bottom-color: ${props => props.theme.border};
  }
  &:after {
    content: '';
    left: calc(50% + 3px);
    border: 7px solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    margin-left: -10px;
    bottom: 100%;
    border-bottom-color: #fff;
  }
`

/**
 * Tool Tip Text Component.
 */
const ToolTipText = ({
  text = '',
  showToolTip = false,
  fontSize = '',
  marginTop = '',
  position = { left: null, top: null },
  fixed = false,
  testId = ''
}) => {
  const left = position.left ? `${position.left + 14}px` : 'calc(50% + 5px)'
  const top = position.top ? `${position.top + 30}px` : 'unset'

  return (
    <div>
      {showToolTip && (
        <ToolTipTextContainer
          $left={left}
          $top={top}
          $fixed={fixed}
          $fontSize={fontSize}
          $marginTop={marginTop}
          data-testid={`${testId}-ToolTip-open`}>
          {text}
        </ToolTipTextContainer>
      )}
    </div>
  )
}

ToolTipText.propTypes = {
  /** The help tooltip text */
  text: PropTypes.string,
  /** Whether to show tooltip or not */
  showToolTip: PropTypes.bool,
  /** The tooltip font-size */
  fontSize: PropTypes.string,
  /** Position object with left and top properties */
  position: PropTypes.object,
  /** Whether position property is fixed or not */
  fixed: PropTypes.bool,
  /** Can input custom margin top amount */
  marginTop: PropTypes.string
}

export { ToolTipText }
