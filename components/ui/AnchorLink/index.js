import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from '../theme'
import Icon from '../icons/link'
import HelpIcon from '../HelpIcon'

const HelpIconContainer = styled(HelpIcon)`
  position: initial;
`

const LinkContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  max-height: 16px;
  font-family: arial;
  font-size: ${props => props.theme.fontSizeS};
`

const LinkIcon = styled(Icon)`
  height: 14px;
  fill: ${theme.secondary};
  margin-left: 6px;
  margin-right: ${props => (props.$hasHelpMsg ? '6px' : '0')};
`

const Link = styled.a`
  max-height: 16px;
  display: inline-flex;
  align-items: center;
  font-style: normal;
  color: ${theme.secondary};
  cursor: pointer;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  &:link {
    color: ${theme.secondary};
    text-decoration: ${({ underline }) => underline && 'underline'};
  }
  &:visited {
    color: ${theme.secondary};
    text-decoration: none;
  }
  &:hover {
    color: ${theme.secondary};
    text-decoration: none;
  }
  &:active {
    color: ${theme.secondary};
    text-decoration: none;
  }
`

const AnchorLink = ({ link, children, name, external, help, bold, ...rest }) => {
  const linkTestId = `${external ? 'external' : 'internal'}-link-to-${name}`
  return (
    <LinkContainer>
      <Link data-testid={linkTestId} rel="noreferrer" target="_blank" href={link} bold={bold} {...rest}>
        {children}
        {external && <LinkIcon $hasHelpMsg={!!help} />}
      </Link>
      {help && <HelpIconContainer text={help} testId={linkTestId} />}
    </LinkContainer>
  )
}

AnchorLink.propTypes = {
  /** Node to display, can pass components here */
  children: PropTypes.node,
  /** String of text to display when user hovers help icon */
  help: PropTypes.string,
  /** String of address to navigate to */
  link: PropTypes.string,
  /** String of text to display */
  name: PropTypes.string,
  /** Boolean to hide external icon */
  external: PropTypes.bool,
  /** Boolean to adjust font weight */
  bold: PropTypes.bool
}

AnchorLink.defaultProps = {
  children: null,
  help: '',
  link: '',
  name: '',
  external: false,
  bold: true
}

export default AnchorLink
