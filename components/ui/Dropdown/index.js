import React, { useRef, useEffect, useState } from 'react'
import 'simplebar'
import styled from 'styled-components'
import Link from 'next/link'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.sidebar ? 'column' : 'row')};
  justify-content: ${props => (props.sidebar ? 'center' : 'flex-end')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`

const DropdownOutline = styled.div`
  height: ${({ $height }) => ($height ? $height : 'auto')};
  width: ${({ width }) => (width ? width : 'auto')};
  display: flex;
  position: ${({ btnDropdown }) => (btnDropdown ? 'absolute' : 'fixed')};
  z-index: 9999;
  bottom: ${props => (props.sidebar && !props.dashboard ? '20px' : null)};
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  background: #fff;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  @media (max-width: ${props => props.theme.phoneWidth}px) {
    margin-left: ${props => (props.sidebar && !props.dashboard ? '-80px' : '0')};
  }
  ${props =>
    props.btnDropdown &&
    `
        right: ${props.dropDownRight ? props.dropDownRight : '-3px'};
        top: 34px;
        text-align: left;`};
`
DropdownOutline.displayName = 'DropdownOutline'

const DropdownList = styled.ul`
  margin: 0;
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '200px')};
  width: ${({ width }) => width};
  padding: 10px 10px 5px 10px !important;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  background: #fff;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  font-family: arial;
  overflow: hidden;
  @media (max-width: ${props => props.theme.phoneWidth}px) {
    min-width: ${props => (props.sidebar ? '160px' : '200px')};
  }
`
DropdownList.displayName = 'DropdownList'

const LinkWrapper = styled.li`
  text-transform: uppercase;
  width: 100%;
  padding: 7px;
  list-style-type: none;
  overflow-wrap: anywhere;
  &:hover {
    color: white;
    background: transparent !important;
    text-decoration: none;
  }
`

const LinkContainer = styled(Link)`
  color: ${props => props.theme.primary};
  text-decoration: none;
  font-size: ${props => props.theme.fontSizeXS};
  color: gray;
  text-align: left;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24.5px; /* 153.125% */
  letter-spacing: 0.4px;
  text-transform: uppercase;
  letter-spacing: 0.031rem;
  padding: 10px;
  &:hover {
    background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#E5EAF2')};
    border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '8px')};
    color: ${({ color }) => (color ? color : 'grey')};
    text-decoration: none;
  }
`

const DivContainer = styled(LinkContainer).attrs({ as: 'div' })`
  cursor: pointer;
  white-space: ${({ width }) => (width === 'unset' ? 'nowrap' : 'pre-line')};
`

const SimpleBar = styled.div`
  .simplebar-wrapper {
    height: unset;
    width: ${({ $width }) => ($width ? $width : '200px')};
  }
  .simplebar-track > .simplebar-scrollbar:before {
    background-color: ${props => props.theme.tint2};
  }
  .simplebar-track[style] {
    background-color: transparent !important;
  }
`
SimpleBar.displayName = 'SimpleBar'

const DropdownItems = ({ links, width, minWidth }) => {
  return (
    <>
      {links.map((item, index) => {
        const ItemContainer = item.onClick ? DivContainer : LinkContainer
        return (
          <LinkWrapper key={item.text + index}>
            <ItemContainer to={item.to} onClick={item.onClick} width={width} minWidth={minWidth}>
              {item.text}
            </ItemContainer>
          </LinkWrapper>
        )
      })}
    </>
  )
}
DropdownItems.displayName = 'DropdownItems'

/**
 * Dropdown Component.
 */
const Dropdown = ({
  visible = false,
  links = [],
  sidebar = false,
  dashboard = false,
  btnDropdown = false,
  width = '200px',
  className,
  dropDownRight,
  minWidth
}) => {
  const first10Ref = useRef()
  const [first10Height, setFirst10Height] = useState(0)
  const first10Items = links.filter((_, index) => index < 10)
  const itemsAfter10 = links.filter((_, index) => index >= 10)

  useEffect(() => {
    if (!visible) {
      return
    }
    const paddingAndBordersHeight = 19
    const height = first10Ref.current.clientHeight + paddingAndBordersHeight
    setFirst10Height(height)
  }, [links, visible])

  return (
    <Wrapper sidebar={sidebar} className={className} visible={visible}>
      <DropdownOutline
        $height={first10Height ? `${first10Height}px` : '0px'}
        sidebar={sidebar}
        dashboard={dashboard}
        btnDropdown={btnDropdown}
        dropDownRight={dropDownRight}
        data-testid="dropdown"
        id="dropdown">
        <DropdownList width={width} sidebar={sidebar} minWidth={minWidth}>
          <div ref={first10Ref}>
            <DropdownItems links={first10Items} width={width} minWidth={minWidth} />
          </div>
          <DropdownItems links={itemsAfter10} width={width} minWidth={minWidth} />
        </DropdownList>
      </DropdownOutline>
    </Wrapper>
  )
}

Dropdown.propTypes = {
  /** Is the dropdown visible */
  visible: PropTypes.bool,
  /** List of objects for links, in form: [{text: 'link text', to: 'url'}, ...] */
  links: PropTypes.array,
  /** Is the component in the sidebar */
  sidebar: PropTypes.bool,
  /** Is the component in the dashboard sidebar */
  dashboard: PropTypes.bool,
  /** To set button dropdown styling */
  btnDropdown: PropTypes.bool,
  /** Additional classNames  */
  className: PropTypes.string,
  /** Width of popout, with a minimum of 200px */
  width: PropTypes.string
}

export default Dropdown
