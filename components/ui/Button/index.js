import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import theme from '../theme'
import Icon from '../Icon'
import OutsideAlerter from '../OutsideAlerter'
import DropDown from '../Dropdown'

const ButtonContainer = styled.button`
  z-index: ${props => (props.zIndex ? props.zIndex : '0')};
  cursor: pointer;
  position: ${props => (props.position ? props.position : '')};
  right: ${props => (props.right ? props.right : 'auto')};
  top: ${props => (props.top ? props.top : 'auto')};
  outline: none !important;
  margin: ${porps => (porps.margin ? porps.margin : '0px')};
  &:focus {
    outline: ${({ popout }) => (popout ? 'none' : 'inherit')};
    background: ${({ background, colors }) =>
      background ? background : colors ? colors?.background : theme.background};
  }
  background-color: ${({ background, colors }) =>
    background ? background : colors ? colors?.background : theme.background};
  &:hover {
    background: ${({ colors }) => (colors ? colors.hover : theme.background2)};
    color: ${({ colors }) => (colors ? colors.hoverText : theme.text2)};
  }
  border: ${({ noBorder, colors }) =>
    noBorder ? '0' : `${colors.border} solid ${colors.wideBorder || '1px'}`} !important;
  color: ${({ colors }) => (colors ? colors.text : theme.text)};
  box-sizing: border-box;
  border-radius: ${({ oval }) => (oval ? '25px' : '4px')};
  padding: ${props =>
      props.mobile ? '9px' : props.noPadding ? ` 0px ` : props.small ? '10px' : props.extraTall ? '20px' : '15px'}
    ${props => (props.mobile ? '22px' : props.noPadding ? ` 0px ` : props.extraWide ? '40px' : '15px')}
    ${props =>
      props.mobile ? '6px' : props.noPadding ? ` 0px ` : props.small ? '10px' : props.extraTall ? '20px' : '15px'}
    ${props => (props.mobile ? '22px' : props.noPadding ? ` 0px ` : props.extraWide ? '40px' : '15px')};
  font-family: roboto;
  text-transform: ${props => (props.noUppercase ? 'capitalize' : 'uppercase')};
  width: ${props => (props.block ? '100%' : props.webKit ? '-webkit-fill-available' : 'auto')};
  height: ${props => (props.buttonHeight ? props.buttonHeight : 'auto')};
  min-width: ${({ popout }) => (popout ? 'auto' : 'auto')};
  display: ${props => (props.block ? 'flex' : 'inline-flex')};
  flex-direction: ${props => (props.iconRight ? 'row-reverse' : 'row')};
  align-items: center;
  gap: ${props => (props.$condensed ? '0' : '10px')};
  font-size: ${props => (props.fontSize ? props.fontSize : props.theme.fontSizeXS)};
  font-weight: ${({ normal, popout }) => (normal ? 500 : popout ? 400 : 'bold')};
  letter-spacing: 0.031rem;
  justify-content: center;
  white-space: nowrap;
  margin: ${props => (props.margin ? props.margin : '0px')};
  ${props =>
    props.popout &&
    `
        position: relative;
        height: 34px;
        width: ${({ small }) => (small ? '66px' : '108px')};`}
  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    font-size: ${props => props.theme.fontSizeXXS};
  }
`
const blinking = () => {
  return keyframes`
        50% {
            opacity: 0;
        }
    `
}

const IndicatorLight = styled(Icon)`
  height: 16px;
  width: 16px;
  border-radius: 100%;
  background-color: #fafa69;
  animation: ${blinking} 1s linear infinite;
`

const ButtonIconContainer = styled.div`
  display: inline-block;
  ${props =>
    props.popout &&
    `
        margin-left: 0px;`}
  svg {
    width: 15px;
    height: 15px;
    margin: -2px 0;
    path {
      fill: ${props => props.colors.text};
    }
  }
`

const ButtonIcon = styled(Icon)`
  position: ${props => (props.popout ? 'absolute' : 'relative')};
  right: ${props => (props.popout ? '11px' : 'auto')};
  bottom: ${props => (props.popout ? '13px' : 'auto')};
`

const ButtonContent = styled.div`
  margin: ${({ contentMargin }) => (contentMargin ? contentMargin : '0px 0px 0px 0px')};
  display: inline-block;
`

const Separator = styled.div`
  height: 42px;
  width: 2px;
  background-color: white;
  position: absolute;
  right: 40px;
  bottom: -2px;
`

const typeColors = {
  default: {
    text: '#fff',
    background: '#37DEC5',
    border: 'none',
    hover: '#8EDE64',
    hoverText: '#333'
  },
  red: {
    text: '#fff',
    background: '#FF626E',
    border: 'none',
    hover: '#8EDE64',
    hoverText: '#333'
  },
  black: {
    text: '#333',
    background: '#37DEC5',
    border: '#37DEC5',
    hover: '#8EDE64',
    hoverText: '#FFF'
  },
  dark: {
    text: theme.text,
    background: '#282932',
    border: 'none',
    hover: '#37DEC5',
    hoverText: theme.text2
  },
  green: {
    text: '#333',
    background: '#8EDE64',
    border: 'none',
    hover: '#37DEC5',
    hoverText: '#fff'
  },
  green2: {
    text: '#333',
    background: '#8EDE64',
    border: 'none',
    hover: '#37DEC5',
    hoverText: theme.text
  },
  grey: {
    text: '#333',
    background: '#D0D0D0',
    border: 'none',
    hover: '#8EDE64',
    hoverText: '#fff'
  },
  lightgrey: {
    text: '#333',
    background: '#D9D9D9',
    border: 'none',
    hover: '#8EDE64'
  },
  sort: {
    text: '#333',
    background: '#D9D9D9',
    border: 'none',
    hover: '#D8D8D8'
  },
  outline: {
    text: theme.primary,
    background: '#fff',
    border: theme.primary
  },
  outlineInverse: {
    text: '#37DEC5',
    background: '#fff',
    border: '#37DEC5',
    hover: '#8EDE64',
    hoverText: '#fff'
  },
  outlineInverse2: {
    text: '#333',
    background: '#fff',
    border: '#37DEC5',
    hover: '#8EDE64',
    hoverText: '#fff'
  },
  outlineTransparent: {
    text: '#fff',
    background: 'transparent',
    border: '#37DEC5',
    wideBorder: '2px',
    hover: '#8EDE64',
    hoverText: '#fff'
  },
  inverse: {
    text: theme.primary,
    background: '#fff',
    border: '#fff'
  },
  soft: {
    text: theme.primary,
    background: theme.accent3,
    border: theme.accent3
  },
  action: {
    text: 'rgb(60, 65, 73)',
    border: 'rgb(223, 225, 228)',
    background: '#fff',
    hover: 'rgb(244, 245, 248)'
  },
  transparent: {
    text: 'rgb(60, 65, 73)',
    border: 'transparent',
    background: 'transparent',
    hover: 'transparent'
  },
  purple: {
    text: '#fff',
    background: '#BA68C8',
    border: 'transparent'
  }
}

/**
 * Button Component.
 */
const Button = ({
  isAnimated = false,
  block = false,
  type = 'default',
  onClick = () => {},
  disabled = false,
  small = false,
  children = null,
  icon = null,
  condensed = false,
  iconRight = false,
  popout = null,
  separateRightIcon = false,
  margin = '',
  noBorder = false,
  noUppercase = false,
  popoutWidth = '200px',
  contentMargin = '',
  dropDownRight,
  className,
  fontSize,
  extraTall,
  extraWide,
  normal,
  oval,
  submit,
  noPadding,
  height = '',
  buttonHeight,
  position,
  right,
  top,
  zIndex,
  mobile,
  ...rest
}) => {
  const colors = typeColors[type] ? typeColors[type] : typeColors.default
  const [popoutOpen, setPopoutOpen] = useState(false)
  const onClickOutside = () => setPopoutOpen(false)
  const handleClick = () => {
    if (!popout) {
      onClick()
    } else {
      setPopoutOpen(!popoutOpen)
    }
  }

  const content = (
    <ButtonContainer
      className={className}
      isAnimated={isAnimated}
      data-testid="button-container"
      type={submit ? 'submit' : 'button'}
      block={block}
      disabled={disabled}
      iconRight={iconRight}
      onClick={handleClick}
      small={small}
      normal={normal}
      extraTall={extraTall}
      fontSize={fontSize}
      colors={colors}
      $condensed={condensed}
      popout={popout}
      margin={margin}
      extraWide={extraWide}
      noBorder={noBorder}
      noUppercase={noUppercase}
      oval={oval}
      noPadding={noPadding}
      height={height}
      mobile={mobile}
      buttonHeight={buttonHeight}
      position={position}
      right={right}
      top={top}
      zIndex={zIndex}
      {...rest}>
      {icon && (
        <ButtonIconContainer colors={colors} popout={popout}>
          {separateRightIcon && <Separator />}
          {isAnimated ? (
            <IndicatorLight name="circle" />
          ) : (
            <ButtonIcon data-testid="button-icon" name={icon} popout={popout} />
          )}
        </ButtonIconContainer>
      )}
      <ButtonContent contentMargin={contentMargin}>{!condensed && children}</ButtonContent>
      {popout && (
        <DropDown
          key={popoutOpen}
          visible={popoutOpen}
          links={popout}
          dropDownRight={dropDownRight}
          btnDropdown={true}
          width={popoutWidth}
          minWidth={popoutWidth}></DropDown>
      )}
    </ButtonContainer>
  )

  return <>{popout ? <OutsideAlerter onClickOutside={onClickOutside}>{content}</OutsideAlerter> : content}</>
}

Button.propTypes = {
  /** Whether to display as a 100% width block */
  block: PropTypes.bool,
  /** Children the component contains */
  children: PropTypes.node,
  /** Button type. defaults to default. Values: default, outline, soft, table */
  type: PropTypes.string,
  /** If button is small */
  small: PropTypes.bool,
  /** if the button is disabled. */
  disabled: PropTypes.bool,
  /** on click function */
  onClick: PropTypes.func,
  /** name of icon to display */
  icon: PropTypes.string,
  /** If to show icon on the right */
  iconRight: PropTypes.bool,
  /** If to show a condensed version of the button (icon only) */
  condensed: PropTypes.bool,
  /** If to show a popout menu when clicked,
        array to contain objects with id, label, and onClick */
  popout: PropTypes.arrayOf(PropTypes.object),
  /** If to show a white line to separate the right icon */
  separateRightIcon: PropTypes.bool,
  /** Displays a flashing yellow circle to indicate an action is required */
  isAnimated: PropTypes.bool,
  /** Adding margin to button */
  margin: PropTypes.string,
  /** Remove border */
  noBorder: PropTypes.bool,
  /** Removes auto capitalize */
  noUppercase: PropTypes.bool,
  /** Width of popout */
  popoutWidth: PropTypes.string,
  /** Height of button */
  height: PropTypes.string,
  /** contentMargin of button */
  contentMargin: PropTypes.string
}

export default Button
