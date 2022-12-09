import React from 'react'
import {
    Span,
    PaddingLeft
} from './textStyles'

const Bullet = ({icon, text}) => {
    return (
        <Span>
            {icon}
            <PaddingLeft>{text}</PaddingLeft>
        </Span>
    )
}

export default Bullet;