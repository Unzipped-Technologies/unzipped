import styled from 'styled-components'
import theme from '../../ui/theme'

const TableTitle = styled.div`
  background: ${({ background }) => (background ? background : 'transparent')};
  border: 1px ${({ borderColor }) => (borderColor ? borderColor : '#d8d8d8')} solid;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  width: 100%;
  display: flex;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  flex-flow: ${({ row }) => (row ? 'row' : 'column')};
  height: ${({ size, unset, height }) =>
    size === 'large' ? '151px' : size === 'extraLarge' ? '370px' : unset ? 'unset' : height ? height : '40px'};
  align-items: center;
  padding: ${({ padding }) => (padding ? padding : '20px 20px')};
  position: relative;
  box-shadow: ${({ shadow }) => (shadow ? shadow : 'none')};
  margin-bottom: ${({ noMargin, half }) => (noMargin ? '0px' : half ? '12px' : '24px')};
`

module.exports = {
  TableTitle
}
