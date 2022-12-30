import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
    border-radius: ${({radius}) => radius ? radius : '0px'};
    height: ${({height}) => height ? height : 'auto'};
    width: ${({width}) => width ? width : 'auto'};
    overflow: hidden;
    position: relative;
`;

const Img = styled.img`
    width: 100%;
    height: auto;
`;

const Image = ({src, alt = 'img', radius, height, width, onMouseEnter, onClick}) => {
    return (
        <Container radius={radius} height={height} width={width} onClick={onClick} onMouseEnter={onMouseEnter}>
            <Img src={src} alt={alt} />
        </Container>
    )
}

export default Image;