import IconHolder from './IconHolder'

const Skills = ({data}) => {
    return (
        <Container>
            {data.map((item, index) => <IconHolder key={item.name + index} index={index} item={index} name={item.name} />)}
        </Container>
    )
}

export default Skills;