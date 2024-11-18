import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { FaPen, FaTrashAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import Button from '../ui/Button'
import { FormField } from '../ui'


import { deleteEducation, deleteShowCaseProject } from '../../redux/Freelancers/actions'
import { Badge } from '../ui'
import { Image } from '../ui'
import { ConverterUtils } from '../../utils'
import EducationModal from './EducationModal'
import SkillsModal from './SkillsModal'
import ProjectModal from './ProjectModal'

const Container = styled.div`
  margin-top: 28px;
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

export const P = styled.p`
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
export const OtherInformationCard = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px !important;
  margin: 10px;
  overflow: hidden;
  display: ${({ display }) => (display ? display : '')};
`

function ProjectsCard({ user, freelancerId, setReFetch }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [openProjectModel, setProjectModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [openSkill, setSkillOpen] = useState(false)
  const [selectedEducation, setEducation] = useState({})
  const [selectedProject, setProject] = useState({})
  const FREELANCER_SKILLS = ['React', 'Node', 'TypeScript', 'Nest.js', 'Next.js'];
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleProjectOpen = () => {
    setProjectModal(true)
  }
  const handleProjectClose = () => {
    setProjectModal(false)
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

  const handleEducationDelete = async educationID => {
    const response = await dispatch(deleteEducation(educationID))
    if (response?.status === 200) {
      setReFetch(true)
    }
  }

  const handleProjectDelete = async projectID => {
    const response = await dispatch(deleteShowCaseProject(projectID))
    if (response?.status === 200) {
      setReFetch(true)
    }
  }

  const handleSkillClick = skill => {
    router.push(`/freelancers?skill=${encodeURIComponent(skill)}`)
  }

  return (
    <Container data-testid="freelancer_profile_projects" id="freelancer_info">
      <div style={{ width: '70%' }}>
        {user?.projects?.length ? (
          user?.projects?.map(project => (
            <ProjectCard key={project?._id} id={`project_${project?._id}`}>
              <ProjectInnerCard>
                <div className="d-flex justify-content-between">
                  <P margin="0" color="#0057FF" fontSize="16px" fontWeight="500">
                    {project?.projectName ?? 'Project Name'}
                  </P>
                  {user?.role === 1 && freelancerId === user?._id && (
                    <div className="d-flex justify-content-between mt-2">
                      <FaPen
                        style={{
                          fontSize: '14px',
                          marginRight: '10px',
                          color: '#2F76FF'
                        }}
                        onClick={() => {
                          setProject(project)
                          handleProjectOpen()
                        }}
                      />

                      <FaTrashAlt
                        style={{
                          fontSize: '14px',
                          color: '#2F76FF'
                        }}
                        onClick={() => {
                          handleProjectDelete(project?._id)
                        }}
                      />
                    </div>
                  )}
                </div>
                <P margin="0" fontSize="15px">
                  {project?.role}
                </P>
                <P fontSize="14px" fontWeight="300" data-testid={project?._id + '_address'}>
                  {user?.AddressLineCountry ?? ''}
                </P>
                <div>
                  {project?.skills?.length > 0
                    ? project?.skills.map((skill, index) => <Badge key={`${skill}_${index}`}>{skill}</Badge>)
                    : ''}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '21px',
                    maxWidth: '100%',
                    height: 'fit-content',
                    borderRadius: '10px'
                    // overflow: 'scroll'
                  }}>
                  {project?.images?.length
                    ? project?.images?.map((image, i) => (
                        <Image
                          src={image?.url}
                          width="171px"
                          height="93px"
                          key={image?._id}
                          alt={`Image ${i}`}
                          id={image?._id}
                        />
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
          {uniqueSkills?.length && uniqueSkills[0] !== undefined ? (
            uniqueSkills?.map((skill, index) => (
              <P padding="0 10px" key={`${skill}_${index}`}>
                {ConverterUtils.capitalize(`${skill} `)}
              </P>
            ))
          ) : (
            <P padding="0 10px" align="center">
              {'-'}
            </P>
          )}
        </OtherInformationCard>
        <OtherInformationCard>
          <P fontWeight="700" borderBottom="1px solid #D9D9D9" padding="10px" margin="0">
            Browse Similar Freelancers
          </P>
          <div style={{ gap: '6px', display: 'flex', padding: '20px 10px', flexWrap: 'wrap' }}>
            {uniqueSkills?.length && uniqueSkills[0] !== undefined ? (
              uniqueSkills?.map((skill, index) => (
                <P
                  border="1px solid #666666"
                  fontSize="14px"
                  margin="0"
                  radius="4px"
                  padding="5px 10px"
                  clickable
                  onClick={() => handleSkillClick(skill)}
                  style={{ cursor: 'pointer' }}
                  key={`${skill}_${index}_sim`}
                >
                  {ConverterUtils.capitalize(`${skill} `)}
                </P>
              ))
            ) : (
              FREELANCER_SKILLS.map((skill, index) => (
                <P
                  key={`${skill}_${index}_default`}
                  style={{ cursor: 'pointer' }}
                  border="1px solid #666666"
                  fontSize="14px"
                  margin="0"
                  radius="4px"
                  padding="5px 10px"
                  clickable
                  onClick={() => handleSkillClick(skill)}
                >
                  {skill}
                </P>
              ))
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
            {user?.role === 1 && freelancerId === user?._id && (
              <P color="#2F76FF" onClick={handleOpen} data-testid="add_education">
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
                <div className="d-flex justify-content-between">
                  <P padding="0 10px" fontWeight="500">
                    {education?.title}
                  </P>
                  {user?.role === 1 && freelancerId === user?._id && (
                    <div className="d-flex justify-content-between mt-2">
                      <FaPen
                        style={{
                          fontSize: '14px',
                          marginRight: '20px',
                          color: '#2F76FF'
                        }}
                        onClick={() => {
                          setEducation(education)
                          handleOpen()
                        }}
                      />

                      <FaTrashAlt
                        style={{
                          fontSize: '14px',
                          marginRight: '20px',
                          color: '#2F76FF'
                        }}
                        onClick={() => {
                          handleEducationDelete(education?._id)
                        }}
                      />
                    </div>
                  )}
                </div>
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
        <OtherInformationCard>
          <div
            className="d-flex justify-content-between align-items-center"
            style={{
              borderBottom: '1px solid #D9D9D9'
            }}>
            <P fontWeight="700" padding="12px 10px 5px 10px">
              Skills
            </P>
            {user?.role === 1 && freelancerId === user?._id && (
              <P
                color="#2F76FF"
                onClick={() => {
                  setSkillOpen(!openSkill)
                }}
                data-testid="add_education">
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
          {user?.freelancerSkills?.length > 0 ? (
            <div
              style={{
                height: '200px',
                overflowY: 'scroll',
                margin: '5px',
              }}>
              {user.freelancerSkills.map((skill, index) => (
                <div
                  key={`${index}_${skill}`}
                  style={{ display: 'flex', justifyContent: 'space-between', alignSelf: 'flex-end' }}>
                  <P padding="0 10px" fontWeight="500">
                    {ConverterUtils.capitalize(skill?.skill)}
                  </P>
                  <P padding="0 10px" fontWeight="500">
                    {!skill?.yearsExperience ? 0 : skill?.yearsExperience}
                    {skill.yearsExperience > 1 ? ' Years' : ' Year'}
                  </P>
                </div>
              ))}
            </div>
          ) : (
            <P padding="10px 0px 0px 0px" fontWeight="500" align="center">
              N/A
            </P>
          )}
        </OtherInformationCard>
      </div>
      {open && <EducationModal open={open} onHide={handleClose} selectedEducation={selectedEducation} />}
      {openProjectModel && (
        <ProjectModal open={openProjectModel} onHide={handleProjectClose} selectedProject={selectedProject} />
      )}
      {openSkill && (
        <SkillsModal
          skills={user?.freelancerSkills}
          open={openSkill}
          setReFetch={setReFetch}
          onHide={() => {
            setReFetch(true)
            setSkillOpen(false)
          }}
        />
      )}
    </Container>
  )
}

export default ProjectsCard
