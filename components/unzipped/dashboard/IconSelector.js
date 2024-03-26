import * as Icons from '@ant-design/icons/lib/icons';


const IconSelector = ({ icon, size, color, }) => {
    const IconComponent = Icons[icon];
    return (
        <>
            <div style={{
                fontSize: size,
                color: color,
                paddingBottom: 10
            }}>
                <IconComponent />
            </div>
        </>
    )
}

export default IconSelector;