import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const BannerSection = styled.section`
  z-index: 5;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  height: auto;
  min-height: fit-content;
  margin: 0;
  padding: 20px 22px;
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  background: ${({ $backgroundColor, theme }) => ($backgroundColor ? $backgroundColor : theme.tint5)};
  box-shadow: 0px 4px 6px -2px ${props => props.theme.tint2};
  @media (min-width: ${props => props.theme.mobileWidth}px) {
    flex-flow: row nowrap;
    height: 83px;
  }
  @media (min-width: ${props => props.theme.reducedWidth}px) {
    padding: 36px 40px;
  }
`

/**
 * Banner component to display content at the top of a page
 */
const Banner = ({ backgroundColor = null, children, show = true, testId }) => {
  return (
    <BannerSection data-testid={testId} hidden={!show} $backgroundColor={backgroundColor}>
      {children}
    </BannerSection>
  )
}

Banner.propTypes = {
  /** Color used for background, should be sourced from theme */
  backgroundColor: PropTypes.string,
  /** Children the component contains */
  children: PropTypes.node,
  /** Boolean to render/hide the banner component */
  show: PropTypes.bool,
  /** Id used for tests */
  testId: PropTypes.string.isRequired
}

export default Banner
