import React from 'react'
import styled from 'styled-components'
import { Icon, Action } from '../'
import PropTypes from 'prop-types'

const Container = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: ${props => (props.$grid < 3 ? `repeat(${props.$grid}, 1fr)` : 'repeat(3, 1fr)')};
  padding: ${props => `${props.$top} 0px`};
  justify-items: left;
  width: ${({ $longContent, $containOverFlow }) => ($longContent ? '84%' : $containOverFlow ? 'auto' : '100%')};
  background-color: ${props => (props.$secondary ? '#f2f2f2' : '#fff')};
  border-radius: 4px;
  @media (max-width: 1271px) {
    width: ${({ $longContent, $containOverFlow }) => ($longContent ? '80%' : $containOverFlow ? 'auto' : '100%')};
  }
  @media (max-width: 1203px) {
    width: ${({ $longContent, $containOverFlow }) => ($longContent ? '75%' : $containOverFlow ? 'auto' : '100%')};
  }
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    flex-direction: column;
  }
`

const List = styled.ul`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  list-style-type: none;
  justify-items: center;
  min-width: ${({ $containOverFlow }) => ($containOverFlow ? '112px' : '120px')};
  padding-right: ${props => (props.$NoPadding ? '0px' : '20px')};
  padding-left: ${props => (props.$NoPadding ? '10px' : 'auto')};
  flex-wrap: wrap;
`

const Item = styled.li`
  display: ${({ $secondLine }) => ($secondLine ? 'block' : 'flex')};
  font-family: Arial;
  font-style: normal;
  list-style-type: none;
  overflow-wrap: anywhere;
  cursor: ${({ $isPointer }) => ($isPointer ? 'pointer' : 'default')};
  font-weight: bold;
  font-size: ${props => props.theme.fontSizeM};
  line-height: ${props => props.theme.lineHeightM};
  color: ${({ error, theme }) => (error ? theme.error : theme.text)};
  align-items: center;
  margin-bottom: ${props => (props.$grid > 3 ? '30px' : '0')};
  & svg:first-of-type {
    margin: 2px 4px 4px;
    min-width: 20px;
  }
  & span:first-of-type {
    min-width: ${({ $longContent }) => $longContent + 'px'};
    margin-left: 0 !important;
  }
  & div:last-of-type {
    margin: 2px 4px 4px;
  }
`

const Title = styled.li`
  color: ${props => props.theme.textSecondary};
  font-family: arial;
  display: flex;
  flex-flow: row nowrap;
  font-style: normal;
  font-weight: normal;
  font-size: ${props => (props.fontSize ? props.fontSize : '0.875rem')};
  line-height: ${props => props.theme.lineHeightS};
  list-style-type: none;
  margin: 0 0 5px 0;
  align-items: center;
  & svg:first-of-type {
    margin: 0px 4px;
    min-width: 20px;
    ${({ error, theme }) => error && `fill: ${theme.error}`};
  }
  @media (max-width: 420px) {
    padding: 14px 0;
  }
`
const Actions = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
`

const Span = styled.span`
  margin-left: 5px;
`

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.tint2};
`

const filterNames = (data, name) => {
  return data.filter(v => v.name !== name).map(value => value.name)
}

/**
 * ValueList Component.
 */
const ValueList = ({
  data,
  email,
  fundCommonName,
  secondary,
  action,
  padding,
  top,
  name,
  fontSize,
  longContent,
  longName,
  onClick,
  isCheck,
  sendReminder,
  containOverFlow = false
}) => {
  const nameLength = ((longName && longName + 0.2) || longContent) * 90
  return (
    <Container
      data-testid={name}
      $grid={data.length}
      $secondary={secondary}
      $longContent={longContent}
      $containOverFlow={containOverFlow}
      $top={top}>
      <Actions onClick={() => {}}>{action ? action : <></>}</Actions>
      {data.map((item, index) => (
        <List
          key={index}
          $padding={padding}
          $containOverFlow={containOverFlow}
          $longContent={(longContent || 1) * 100}
          data-testid={name + index}
          $NoPadding={padding === '0px'}
          shift={false}>
          <Title fontSize={fontSize} error={item.error}>
            <label>{item.name}</label>
            {item.error && <Icon name="help" />}
            {item.action && (
              <Span>
                <Icon name="edit" onClick={() => item.action()} />
              </Span>
            )}
          </Title>
          {item.error && (
            <Item error>
              <Span>{item.error}</Span>
            </Item>
          )}
          {!item.error &&
            item.content.map(
              (value, num) =>
                value && (
                  <Item
                    key={value + num}
                    $grid={data.length}
                    onClick={value.isClickable && (() => onClick(num))}
                    $isPointer={value.isClickable}
                    $secondLine={(value.name ? value.name : value).length > 12}
                    $longContent={nameLength < 145 ? nameLength : 145}>
                    {index === 2 && isCheck && value.signed && (
                      <StyledIcon name={value.signed === 'No' ? 'circleWCross' : 'circleWCheck'} />
                    )}{' '}
                    <Span>{value.name ? value.name : value}</Span>
                    {index === 2 && value.signed === 'No' && value.email !== email && isCheck && !value.isUser && (
                      <Action
                        onClick={event => {
                          event.stopPropagation()
                          sendReminder(
                            value.id,
                            value.email,
                            fundCommonName,
                            filterNames(data[2].content, value.name),
                            value.name
                          )
                        }}>
                        Send reminder
                      </Action>
                    )}
                  </Item>
                )
            )}
        </List>
      ))}
    </Container>
  )
}

ValueList.propTypes = {
  /** data the component contains */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.func,
      content: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.shape({
            email: PropTypes.string,
            isClickable: PropTypes.bool,
            isUser: PropTypes.bool,
            longName: PropTypes.number,
            name: PropTypes.string,
            signed: PropTypes.string
          }),
          PropTypes.string
        ])
      ),
      name: PropTypes.string
    })
  ),
  /** card action */
  action: PropTypes.node,
  /** should background be secondary gray color */
  secondary: PropTypes.bool,
  /** padding */
  padding: PropTypes.string,
  /** adjust margin top */
  top: PropTypes.string,
  /** name of the ValueList */
  name: PropTypes.string.isRequired,
  /** Change fontsize of title */
  fontSize: PropTypes.string,
  /** Pass true if text items are longer than 10 char. */
  longContent: PropTypes.number,
  /** Pass true if individual text items are longer than 10 char. */
  longName: PropTypes.number,
  /** Display check symbol in line. */
  isCheck: PropTypes.bool,
  /** Contains spread overflow of children */
  containOverFlow: PropTypes.bool,
  /** Contains function for items that include isClickable */
  onClick: PropTypes.func
}

ValueList.defaultProps = {
  data: [],
  secondary: false,
  action: null,
  padding: '20px',
  top: '15px',
  name: 'Test 123',
  fontSize: '14px',
  longContent: 1,
  longName: 1,
  isCheck: false,
  onClick: () => {}
}

export default ValueList
