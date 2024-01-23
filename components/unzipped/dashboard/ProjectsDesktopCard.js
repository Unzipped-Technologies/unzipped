import React from 'react'
import styled from 'styled-components'
import Image from '../../ui/Image'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import { TitleText, DarkText, Absolute, DarkSpan } from './style'

const Container = styled.div`
  display: flex;
  flex-flow: row;
  width: inherit;
  padding: ${({ includeRate }) => (includeRate ? '0px 10px 0px 20px' : '15px 10px 0px 20px')};
`
const Left = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 0px 10px;
`
const Right = styled.div`
  padding: ${({ includeRate }) => (includeRate ? '5px 30px' : '15px 30px')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '850px')};
`
const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  background: ${({ background }) => (background ? background : '#fff')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
  cursor: ${({ cursor }) => (cursor ? cursor : '')};
`
const Flex = styled.div`
  display: flex;
  flex-flow: row;
  justify-items: space-between;
`

const ProjectDesktopCard = ({ project, includeRate, width, freelancerId }) => {
  const router = useRouter()

  return (
    <Container includeRate={includeRate}>
      <Left>
        <Image src={project?.profileImage} alt={project?.name + ' profile'} height="94px" width="94px" radius="50%" />
        {project?.applicants?.includes(freelancerId) && (
          <Button margin="20px 0px" type={!project.applicants.includes(freelancerId) ? 'default' : 'grey'} noBorder>
            Applied
          </Button>
        )}
      </Left>
      <Right minWidth={width} includeRate={includeRate}>
        <TitleText
          half
          clickable
          color="#0057FF"
          onClick={() => {
            router.push(`/projects/${project._id}`)
          }}>
          {project?.name}
        </TitleText>
        {includeRate && (
          <Flex>
            <DarkText half>{project?.country}</DarkText>
            {/* <DarkText small half bold><DarkSpan medium>{project?.projectType?.includes('Hourly Rate') ? 'Estimated Rate: ' : 'Fixed Rate: '}</DarkSpan><DarkSpan large>${project?.budget}</DarkSpan >{project?.projectType.includes('Hourly Rate') && ' / hour'} </DarkText> */}
          </Flex>
        )}
        <div className="d-flex justify-content-between">
          <P fontSize="13px">{project?.description}</P>
          <P fontSize="15px">{project?.likes ? `${project?.likes} Upvotes by Freelancers` : ''}</P>
        </div>
        {project?.requiredSkills?.map(item => (
          <Badge key={`${item}_desktop_card`}>{item}</Badge>
        ))}
      </Right>
      <Absolute>
        <Button color="#000" style={{ padding: '8px 22px' }} normal oval type="green2" noBorder>
          View Profile
        </Button>
      </Absolute>
    </Container>
  )
}

export default ProjectDesktopCard
