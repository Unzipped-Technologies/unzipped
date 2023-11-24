import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
  background: #fff;
  border: 2px solid ${props => (props.noBorder ? 'transparent' : props.theme.border)};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '4px')};
  padding: ${({ doubleScreenTop, doubleScreenBottom, mobile }) =>
    doubleScreenTop ? '90px 10px 0px' : doubleScreenBottom ? '0px 10px 90px' : mobile ? '90px 10px' : '30px 50px'};
  font-family: arial;
  width: 100%;
  height: 100%;
  margin: ${props => (props.margin ? '20px 0 0 0' : '0')};
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  position: relative;
`

const ActionContainer = styled.div`
    float: right;
    margin-top: -4px;
    margin-left: 10px;
`;

const CardTitle = styled.h2`
    color: ${props => props.theme.primary};
    font-weight: 600;
    font-size: ${props => props.theme.baseFontSize};
    line-height: ${props => props.theme.baseLineHeight};
`;

/**
 * Base Card Component.
 */
const Card = ({
  doubleScreenTop,
  doubleScreenBottom,
  children,
  inline,
  action,
  className,
  testId,
  title,
  margin,
  noBorder,
  borderRadius,
  mobile
}) => (
  <CardContainer
    mobile={mobile}
    doubleScreenTop={doubleScreenTop}
    doubleScreenBottom={doubleScreenBottom}
    noBorder
    inline={inline}
    borderRadius={borderRadius}
    margin={margin}
    className={className}
    data-testid={testId}>
    {title && <CardTitle>{title}</CardTitle>}
    {action && <ActionContainer>{action}</ActionContainer>}
    {children}
  </CardContainer>
)

Card.propTypes = {
    /** Children the component contains */
    children: PropTypes.node,
    /** If to show card inline */
    inline: PropTypes.bool,
    /** If to keep padding in card */
    padding: PropTypes.bool,
    /** action component to show in the action area (top right) */
    action: PropTypes.node,
    /** title of card */
    title: PropTypes.string,
    /** margin of card */
    margin: PropTypes.bool,
};

Card.defaultProps = {
    children: null,
    inline: false,
    padding: true,
    action: null,
    margin: false,
};

export default Card;
