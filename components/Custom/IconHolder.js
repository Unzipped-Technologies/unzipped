
import React from 'react'
import styled from 'styled-components'
import {
    HexagonIcon,
    ReactIcon,
    NetIcon,
    NodeIcon,
    UIUXIcon,
    AWSIcon,
    ReactNativeIcon,
    SkillPodLogo
} from '../icons'

const OuterContainer = styled.div`
width: 223.4px;
height: 293.4px;
display: flex;
justify-content: center;
align-items: center;
@media (min-width: 1639px) {
    width: 265px;
}
@media (max-width: 1639px) {
    width: 245px;
}
@media (max-width: 1323px) {
    width: 225px;
}
@media (max-width: 1156px) {
    width: 205px;
}
`;

const Div = styled.div`
position: relative;
@media (max-width: 1579px) {
    display: ${(props) => props.item === 2 ? 'none' : 'block'};
}
`;

const HexContent = styled.div`
position: relative;
display: flex;
flex-flow: column nowrap;
left: ${(props) => props.item === 4 ? '0px' : '-3px'};
bottom: ${(props) => props.item === 4 ? '170px' : props.item === 3 || props.item === 1 || props.item === 0 || props.item === 5 ? '190px' : '200px'};
text-align: center;
justify-content: center;
align-items: center;
`;

const Name = styled.div`
position: absolute;
top: ${(props) => props.item === 4 ? '50px' : props.item === 3 || props.item === 1 || props.item === 0 || props.item === 5 ? '70px' : '80px'};
font-weight: 500;
font-size: 18px;
line-height: 48px;
/* or 267% */

text-align: center;

color: #000000;
`;

const DisplayIcon = ({icon}) => {
    switch(icon) {
        case 0:
          return <ReactIcon />
        case 1:
          return <NodeIcon />
        case 2:
          return <NetIcon />
        case 3:
          return <UIUXIcon />
        case 4:
          return <AWSIcon />
        case 5:
          return <ReactNativeIcon />
        case 6:
          return <SkillPodLogo />
        default:
          return <ReactIcon />;
      } 
}

const IconHolder = ({item, name, index}) => {
    return (
        <Div item={index}>
        <OuterContainer>
            <HexagonIcon/>
        </OuterContainer>
        <HexContent item={index}>
            <DisplayIcon icon={item}/>
            <Name item={index}>{name}</Name>
        </HexContent>
        </Div>
    )
}

export default IconHolder