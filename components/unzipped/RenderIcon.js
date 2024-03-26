import React from 'react'
import * as Icons from '@ant-design/icons/lib/icons';

const RenderIcon = ({ iconName }) => {
    const IconComponent = Icons[iconName];
    const renderStyledIcon = (iconName) => {
        let iconColor = '';
        if (iconName === 'EyeOutlined') {
            iconColor = '#8EDE64'
        }
        else if (iconName === 'HeartOutlined') {
            iconColor = '#FA00FF'
        }
        else if (iconName === 'TeamOutlined') {
            iconColor = '#FFC24E'
        }
        else {
            iconColor = '#e25050'
        }
        return (
            <div style={{ color: iconColor, fontSize: 18 }}><IconComponent /></div>

        )
    }
    return (
        <>
            {renderStyledIcon(iconName)}

        </>
    )
}

export default RenderIcon