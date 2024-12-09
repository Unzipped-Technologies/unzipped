import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Image from '../../ui/Image'
import Button from '../../ui/Button'
import Badge from '../../ui/Badge'
import { ValidationUtils } from '../../../utils'
import { TEXT, DarkText } from './style'

export const Container = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  padding: ${({ includeRate }) => (includeRate ? '0px 10px 0px 20px' : '15px 10px 0px 20px')};
`
const Left = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 0px 10px;
`
export const Right = styled.div`
  padding: ${({ includeRate }) => (includeRate ? '5px 30px' : '15px 30px')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '850px')};
  width: ${({ minWidth }) => (minWidth ? minWidth : '850px')};
`

const Flex = styled.div`
  display: flex;
  flex-flow: row;
  justify-items: space-between;
`

const ProjectDesktopCard = ({ project, includeRate, freelancerId }) => {
  const router = useRouter()
  return (
    <Container includeRate={includeRate} data-testid={project?._id} id={project?._id}>
      <Left>
        <Image
          src={project?.projectImages?.[0]?.url}
          alt={project?.name + ' profile'}
          height="102px"
          width="102px"
          radius="50%"
        />
        {project?.applicants?.includes(freelancerId) && (
          <Button margin="20px 0px" type={'grey'} noBorder>
            Applied
          </Button>
        )}
      </Left>
      <Right includeRate={includeRate} minWidth="62%">
        <TEXT
          cursor="pointer"
          textColor="#0057FF"
          onClick={() => {
            router.push(`/projects/${project._id}`)
          }}
          data-testid={`${project?._id}_name`}>
          {ValidationUtils.truncate(project?.name, 240)}
        </TEXT>
        <Flex>
          <DarkText half data-testid={`${project?._id}_country`}>
            {project?.businessCountry}
          </DarkText>
          <DarkText half data-testid={`${project?._id}_budget`}>
            Estimated Rate:{' '}
            {project?.projectBudgetType === 'Hourly Rate'
              ? project?.budgetRange + ' / hour'
              : project?.budgetRange ?? 0}
          </DarkText>
        </Flex>
        <div className="d-flex justify-content-between">
          <DarkText fontSize="13px" data-testid={`${project?._id}description`}>
            {project?.description}
          </DarkText>
        </div>
        <div data-testid={`required_skill`}>
          {project?.requiredSkills?.map(item => (
            <Badge key={`${item}_desktop_card`} className="overflow-hidden">{ValidationUtils.truncate(item, 10)}</Badge>
          ))}
        </div>
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
            router.push(`/projects/${project._id}`)
          }}>
          View Project
        </Button>
        <DarkText
          topMargin="20px"
          width="200px"
          fontSize="15px"
          color="#000000"
          marginLeft="20px"
          data-testid={`${project?._id}_likeTotal`}>
          {project?.likeTotal ?? 0} Upvotes by Freelancers
        </DarkText>
      </div>
    </Container>
  )
}

export default ProjectDesktopCard
