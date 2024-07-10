import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Badge from '../Badge'
import { statusFormat } from '../utils/dataFormat'

const BadgeStyled = styled(Badge)`
  ${props => props.xsmall && 'font-size: 0.6rem;'}
`

const ProgressBarContainer = styled.div`
  display: ${({ doubleScreenBottom }) => (doubleScreenBottom ? 'none' : 'block')};
  font-family: arial;
  font-weight: 600;
  font-size: ${props => (props.$tileView ? '1.5rem' : '1.625rem')};
  padding: ${props => (props.mobile ? '15px 0px 32px' : props.$showValue ? '20px 0px' : ' 5px 20px')};
  color: ${props => (props.$tileView ? props.theme.secondary : '#fff')};
  height: auto;
  ${props =>
    props.$tileView &&
    `background: ${props.theme.tint4};
        width: 320px;
        min-width: 200px;
        border-radius: 4px;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
    `}
`

const ProgressBarBack = styled.div`
  background-color: #d2d2d2;
  width: 100%;
  min-height: ${props => (props.mobile ? '8px' : '15px')};
  height: ${props => (props.mobile ? '8px' : '15px')};
  position: relative;
  border-radius: 24px;
  overflow: hidden;
`

const ProgressBarBar = styled.div`
  background-color: ${({ bar }) => (bar ? bar : '#fff')} !important;
  background-image: ${({ bar }) => (bar ? 'unset' : 'linear-gradient(45deg, #DE43DE, #CC4848)')};
  width: ${props => props.$width}% !important;
  min-height: ${props => (props.mobile ? '8px' : '15px')};
  height: ${props => (props.mobile ? '8px' : '15px')};
  position: absolute;
  border-radius: 24px;
  @media (min-width: 1266px) {
    width: ${props => props.$width + props.$width * 0.25}px;
  }
`

const Header = styled.div`
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  width: ${({ $width }) => `${$width}px`};
`

const Value = styled.span`
  margin-right: 10px;
`

/**
 * Progress Bar Component.
 */
const ProgressBar = ({
  showValue = false,
  status = null,
  width = 240,
  tileView = false,
  value,
  bar,
  mobile,
  doubleScreenBottom
}) => {
  const barWidth = (width / (mobile ? 7 : 11)) * value
  const displayedStatus = statusFormat(status)
  const showHeader = showValue || status

  return (
    <ProgressBarContainer
      doubleScreenBottom={doubleScreenBottom}
      $showValue={showValue}
      $tileView={tileView}
      mobile={mobile}>
      {showValue && (
        <ProgressBarBack $width={width} $tileView={tileView} mobile={mobile}>
          <ProgressBarBar $width={barWidth} value={value} $tileView={tileView} bar={bar} mobile={mobile} />
        </ProgressBarBack>
      )}
    </ProgressBarContainer>
  )
}

ProgressBar.propTypes = {
  /** Progress value as a percentage */
  value: PropTypes.number.isRequired,
  /* if to show value */
  showValue: PropTypes.bool,
  /** Status to show as a badge */
  status: PropTypes.string,
  /** Changes color palette */
  tileView: PropTypes.bool
}

export default ProgressBar
