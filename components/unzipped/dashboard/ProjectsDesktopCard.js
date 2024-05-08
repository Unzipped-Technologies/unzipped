import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Image from '../../ui/Image'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import { TitleText, DarkText } from './style'

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
  width: ${({ minWidth }) => (minWidth ? minWidth : '850px')};
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

const ProjectDesktopCard = ({ project, includeRate, freelancerId }) => {
  const router = useRouter()
  return (
    <Container includeRate={includeRate}>
      <Left>
        <Image
          src={project?.projectImages?.[0]?.url}
          alt={project?.name + ' profile'}
          height="102px"
          width="102px"
          radius="50%"
        />
        {project?.applicants?.includes(freelancerId) && (
          <Button margin="20px 0px" type={!project.applicants.includes(freelancerId) ? 'default' : 'grey'} noBorder>
            Applied
          </Button>
        )}
      </Left>
      <Right includeRate={includeRate} minWidth="62%">
        <TitleText
          half
          clickable
          color="#0057FF"
          onClick={() => {
            router.push(`/projects/${project._id}`)
          }}>
          {project?.name}
        </TitleText>
        <Flex>
          <DarkText half>{project?.businessCountry}</DarkText>
          <DarkText half>
            Estimated Rate: $
            {project?.projectBudgetType === 'Hourly Rate' ? project?.budget + ' / hour' : project?.budget ?? 0}
          </DarkText>
        </Flex>
        <div className="d-flex justify-content-between">
          <P fontSize="13px">{project?.description}</P>
          <P fontSize="15px">{project?.likes ? `${project?.likes} Upvotes by Freelancers` : ''}</P>
        </div>
        {project?.requiredSkills?.map(item => (
          <Badge key={`${item}_desktop_card`}>{item}</Badge>
        ))}
      </Right>
      <div className="" style={{ marginLeft: '10px' }}>
        <Button
          color="#000"
          margin="0px 0px 0px 70px"
          style={{ padding: '8px 22px' }}
          normal
          oval
          type="green2"
          buttonHeight="40px"
          noBorder
          onClick={() => {
            console.log('Hi')
            router.push(`/projects/${project._id}`)
          }}>
          View Project
        </Button>
        <DarkText topMargin="20px" width="200px" fontSize="15px" color="#000000" marginLeft="20px">
          {project?.likeTotal ?? 0} Upvotes by Freelancers
        </DarkText>
      </div>
    </Container>
  )
}

export default ProjectDesktopCard
