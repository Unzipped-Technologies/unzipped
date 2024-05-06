import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Badge } from '../ui'
import { Image } from '../ui'
import { ConverterUtils } from '../../utils'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import EducationModal from './EducationModal'

const Container = styled.div`
  margin-top: 42px;
  margin-left: 10%;
  max-width: 100%;
  display: flex;
  gap: 20px;
`
const ProjectCard = styled.div`
  // min-width: 830px;
  max-width: 100%;
  border: 1px solid #d9d9d9;
  margin-bottom: 24px;
`

const OtherInformationBox = styled.div`
  min-width: 441px;
  max-width: 441px;
  background-color: rgba(217, 217, 217, 0.15);
`

const ProjectInnerCard = styled.div`
  padding: 19px 50px 19px 50px;
`

const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  background: ${({ background }) => (background ? background : '#fff')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  border-radius: ${({ radius }) => (radius ? radius : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  border: ${({ border }) => (border ? border : '')};
`
const OtherInformationCard = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px !important;
  margin: 10px;
  overflow: hidden;
  display: ${({ display }) => (display ? display : '')};
`

function ProjectsCard({ user, freelancerId }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const uniqueSkills = useMemo(() => {
    let projectSkills = user?.projects?.map(project => [...new Set(project.skills)])
    let userSkills = user?.freelancerSkills?.map(skill => skill?.skill)
    projectSkills = projectSkills?.length ? projectSkills?.join(',').split(',') : []
    projectSkills = projectSkills?.concat(userSkills)
    projectSkills = [...new Set(projectSkills?.map(str => str?.toLowerCase()))]
    const filteredArray = projectSkills?.filter(
      (str, index) => !projectSkills?.some((otherStr, otherIndex) => index !== otherIndex && otherStr?.includes(str))
    )
    return filteredArray
  }, [user])
  return (
    <Container>
      <div style={{ width: '70%' }}>
        {user?.projects?.length ? (
          user?.projects?.map(project => (
            <ProjectCard key={project?._id}>
              <ProjectInnerCard>
                <P margin="0" color="#0057FF" fontSize="16px" fontWeight="500">
                  {project?.projectName ?? 'Project Name'}
                </P>
                <P margin="0" fontSize="15px">
                  {user?.category}
                </P>
                <P fontSize="14px" fontWeight="300">
                  {user?.AddressLineCountry || 'United States'}
                </P>
                <div>
                  {project?.freelancerSkills?.length > 0
                    ? project?.freelancerSkills.map((skill, index) => <Badge key={`${skill}_${index}`}>{skill}</Badge>)
                    : ''}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '21px',
                    maxWidth: '100%',
                    height: '93px',
                    borderRadius: '10px',
                    overflow: 'visible'
                  }}>
                  {project?.images?.length
                    ? project?.images?.map((image, i) => (
                        <Image src={image?.url} width="171px" height="93px" key={image?._id} alt={`Image ${i}`} />
                      ))
                    : ''}
                </div>
              </ProjectInnerCard>
            </ProjectCard>
          ))
        ) : (
          <ProjectCard>
            <ProjectInnerCard>
              <P margin="0" color="#000000" fontSize="16px" fontWeight="500" align="center">
                No Projects
              </P>
            </ProjectInnerCard>
          </ProjectCard>
        )}
      </div>
      <div style={{ width: '30%' }}>
        <OtherInformationCard>
          <P fontWeight="700" borderBottom="1px solid #D9D9D9" padding="10px">
            Top Skills
          </P>
          {uniqueSkills?.length ? (
            uniqueSkills?.map((skill, index) => (
              <P padding="0 10px" key={`${skill}_${index}`}>
                {ConverterUtils.capitalize(`${skill} `)}
              </P>
            ))
          ) : (
            <P padding="0 10px" align="center">
              N/A
            </P>
          )}
        </OtherInformationCard>
        <OtherInformationCard>
          <P fontWeight="700" borderBottom="1px solid #D9D9D9" padding="10px" margin="0">
            Browse Similar Freelancers
          </P>
          <div style={{ gap: '6px', display: 'flex', padding: '20px 10px', flexWrap: 'wrap' }}>
            {uniqueSkills?.length ? (
              uniqueSkills?.map((skill, index) => (
                <P
                  border="1px solid #666666"
                  fontSize="14px"
                  margin="0"
                  radius="4px"
                  padding="5px 10px"
                  key={`${skill}_${index}_sim`}>
                  {ConverterUtils.capitalize(`${skill} `)}
                </P>
              ))
            ) : (
              <>
                <P border="1px solid #666666" fontSize="14px" margin="0" radius="4px" padding="5px 10px">
                  React
                </P>
                <P border="1px solid #666666" fontSize="14px" margin="0" radius="4px" padding="5px 10px">
                  Node
                </P>
                <P border="1px solid #666666" fontSize="14px" margin="0" radius="4px" padding="5px 10px">
                  TypeScript
                </P>
                <P border="1px solid #666666" fontSize="14px" margin="0" radius="4px" padding="5px 10px">
                  Nest.js
                </P>
                <P border="1px solid #666666" fontSize="14px" margin="0" radius="4px" padding="5px 10px">
                  Next.js
                </P>
              </>
            )}
          </div>
        </OtherInformationCard>
        <OtherInformationCard>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{
              borderBottom: '1px solid #D9D9D9'
            }}>
            <P fontWeight="700" padding="12px 10px 10px 10px">
              Education
            </P>

            {user?.userId?.role === 1 && freelancerId === user?._id && (
              <P color="#2F76FF" onClick={handleOpen}>
                <AiOutlinePlusCircle
                  style={{
                    fontSize: '18px',
                    marginRight: '20px',
                    color: '#2F76FF'
                  }}
                />
              </P>
            )}
          </div>
          {user?.education?.length
            ? user.education.map(education => (
                <div key={education?._id}>
                  <P padding="0 10px" fontWeight="500">
                    {education?.title}
                  </P>
                  <P padding="0 10px" margin="0">
                    {education?.institute}
                  </P>
                  <P padding="0 10px">
                    {education?.startYear} - {education?.endYear} ({+education?.endYear - +education?.startYear} years)
                  </P>
                </div>
              ))
            : ''}
        </OtherInformationCard>
      </div>
      {open && <EducationModal open={open} onHide={handleClose} />}
    </Container>
  )
}

export default ProjectsCard
