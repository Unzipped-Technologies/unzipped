import React from 'react'
import * as Icons from '@ant-design/icons/lib/icons';
import { IconColors } from '../../utils/FontIcons';

const RenderIcon = ({ iconName }) => {
    const IconComponent = Icons[iconName];
    const renderStyledIcon = (iconName) => {
        return (
            <div style={{ fontSize: 18 }}><IconComponent style={{ color: IconColors[iconName] || "#1C1C1C" }} twoToneColor={IconColors[iconName]} /></div>
        )
    }
    return (
        <>
            {renderStyledIcon(iconName)}

        </>
    )
}

export default RenderIcon