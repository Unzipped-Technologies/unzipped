import React from 'react'
import Icon from '../Icon'
import {
    SimpleText,
    PaddingLeft,
    Box,
    MinWidth
} from '../../unzipped/dashboard/style'

const Bullet = ({icon, text}) => {
    return (
        <Box>
            <MinWidth><Icon name={icon} color="#333" height="19" width="19"/></MinWidth>
            <PaddingLeft><SimpleText>{text}</SimpleText></PaddingLeft>
        </Box>
    )
}

export default Bullet;