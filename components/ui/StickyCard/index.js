import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StickyCardContainer = styled.div`
  z-index: 999;
  position: relative;
  top: auto;
  bottom: 20px;
  left: auto;
  right: 20px;
  height: auto;
  background: transparent;
  @media (min-width: 1400px) {
    width: auto;
    height: fit-content;
    position: fixed;
    top: ${props => (props.$topOffset ? `${props.$topOffset}px` : '60px')};
    right: ${props => (props.$viewWidth ? `calc(${props.$viewWidth}px - 322px)` : '60px')};
    z-index: 100;
  }

  @media (min-width: ${props => props.theme.mobileWidth + 1}px) and (${props => props.theme.reducedWidth}px) {
    bottom: 20px;
    right: 20px;
  }
`

const StickyCard = ({ children = null, name = '', className = '', viewWidth = null, topOffset = null }) => {
  const stickyDataTestId = name ? `sticky-card-${name}` : 'sticky-card'
  return (
    <StickyCardContainer
      $viewWidth={viewWidth}
      $topOffset={topOffset}
      data-testid={stickyDataTestId}
      className={className}>
      {children}
    </StickyCardContainer>
  )
}

StickyCard.propTypes = {
  children: PropTypes.node,
  /** the data-test-id unique name */
  name: PropTypes.string,
  /** Additional classNames  */
  className: PropTypes.string,
  /** width of view port */
  viewWidth: PropTypes.number,
  /** Determines how large the fixed position top offset should be */
  topOffset: PropTypes.number
}

export default StickyCard
