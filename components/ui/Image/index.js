import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border-radius: ${({ radius }) => (radius ? radius : '0px')};
  height: ${({ height }) => (height ? height : 'auto')};
  width: ${({ width }) => (width ? width : 'auto')};
  min-width: ${({ width }) => (width ? width : 'auto')};
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: flex-start;
  margin: ${({ margin }) => (margin ? margin : 'unset')};
`

const Img = styled.img`
  width: 100%;
  height: ${({ height }) => (height ? height : 'auto')};
  border-radius: ${({ radius }) => (radius ? radius : '0px')};
`

const Image = ({ src, alt = 'img', name, radius, height, width, onMouseEnter, onClick, margin }) => {
  return (
    <Container
      radius={radius}
      margin={margin}
      height={height}
      width={width}
      className={name}
      name={name}
      onClick={onClick}
      onMouseEnter={onMouseEnter}>
      <Img radius={radius} src={src} alt={alt} height={height} width={width} />
    </Container>
  )
}

export default Image
