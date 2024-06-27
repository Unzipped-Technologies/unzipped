import * as Icons from '@ant-design/icons/lib/icons';
import { IconColors } from '../../../utils/FontIcons';


const IconSelector = ({ icon, size, color, }) => {
    const IconComponent = Icons[icon];
    return (
        <>
            <div style={{
                fontSize: size,
                color: color,
                paddingBottom: 10
            }}>
                <IconComponent style={{ color: IconColors[icon] || "#1C1C1C" }} twoToneColor={IconColors[icon]} />
            </div>
        </>
    )
}

export default IconSelector;