import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FaRegThumbsDown } from "react-icons/fa";
import ProfileTab from './ProfileTab'
import { Badge, Icon, Image } from '../ui'
import { ConverterUtils } from '../../utils'
import EducationModal from './EducationModal'
import IconComponent from '../ui/icons/IconComponent'
import SkillsModal from './SkillsModal'
import socket from '../../components/sockets/index'
import { useDispatch } from 'react-redux'

const FREELANCER_SKILLS = ['React', 'Node', 'TypeScript', 'Nest.js', 'Next.js'];


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

const OtherInformationBox = styled.div`
  width: 100%;
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
const ProjectCard = styled.div`
  border-bottom: 2px solid #d9d9d9;
  padding: 19px 13px;
`

function MobileProfileCard({ user, handleProfilePage, role, freelancerId, setReFetch, userId, selectedFreelancer }) {
  const router = useRouter()
  const dispatch = useDispatch()

  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState(false)
  const [openSkill, setSkillOpen] = useState(false)

  useEffect(() => {
    socket.emit('userConnected', userId)
  }, [])

  useEffect(() => {
    socket.on('like', response => {
      dispatch({
        type: 'GET_FREELANCER_BY_ID',
        payload: {
          ...selectedFreelancer,
          likes: response?.likes,
          dislikes: response?.dislikes
        }
      })
    })

    socket.on('dislike', response => {
      dispatch({
        type: 'GET_FREELANCER_BY_ID',
        payload: {
          ...selectedFreelancer,
          likes: response?.likes,
          dislikes: response?.dislikes
        }
      })
    })

    return () => {
      socket.off('like')
      socket.off('dislike')
    }
  })

  const handleLike = () => {
    if (role !== 1) {
      const payload = {
        userId: userId,
        freelancerId: user?._id
      }
      socket.emit('like', payload)
    }
  }

  const handleDisLike = () => {
    if (role !== 1) {
      const payload = {
        userId: userId,
        freelancerId: user?._id
      }
      socket.emit('dislike', payload)
    }
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleBrowseFreelancerSkills = skill => {
    router.push(`/freelancers?skill=${encodeURIComponent(skill)}`)
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

  function formatDate(inputDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(inputDate).toLocaleDateString(undefined, options)
  }

  return (
    <div data-testid="mobile_profile_container">
      <div className="text-center">
        <div
          className="py-3 px-2 d-flex align-items-center"
          style={{
            background: 'white',
            boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
            gap: '11px',
            position: 'fixed',
            width: '-webkit-fill-available',
            zIndex: '2'
          }}>
          <span
            data-testid="back_profile"
            onClick={() => {
              router.back()
            }}
            style={{ cursor: 'pointer' }}>
            <IconComponent name="backArrow" width="20" height="20" viewBox="0 0 20 20" fill="black" />
          </span>
          <span style={{ fontWeight: '500', fontSize: '16px' }}>Profile</span>
        </div>
        <div style={{ padding: '75px 16px 16px 16px' }}>
          <img
            src={user?.profileImage}
            width={125}
            height={125}
            alt="Picture of the author"
            style={{ borderRadius: '15px' }}
          />
          <P fontSize="26px" margin="0" data-testid="user_name">
            {user?.FirstName + ' ' + user?.LastName}
          </P>
          {user?.category && (
            <P fontSize="15px" fontWeight="400" margin="0">
              {user?.category}
            </P>
          )}
          <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'flex-end' }}>
            <div>
              {user?.AddressLineCountry && (
                <P fontSize="14px" fontWeight="300" style={{ paddingTop: "10px", paddingRight: "50px" }} data-testid="address_country">
                  {user?.AddressLineCountry}
                </P>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px', marginLeft: '70px' }}>
              <span onClick={handleLike}>
                <IconComponent name="thumbUp" width="18" height="18" viewBox="0 0 15 15" fill="#0057FF" />
              </span>
              <P margin="0px 3px">{user?.likeTotal}</P>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span onClick={handleDisLike}>
                <FaRegThumbsDown style={{ width: "18", height: "18", viewBox: "0 0 15 15", marginTop: "3px" }} fill="#0057FF" />
              </span>
              <P margin="0px 3px">{user?.dislikeTotal}</P>
            </div>
          </div>
          <P fontSize="20px" fontWeight="600">
            {user.rate > 0 ? `$${user?.rate.toFixed(2)} / HOUR` : 'Negotiable'}
          </P>
          <div className="d-flex justify-content-around align-items-center py-4 mb-2">
            <Icon name="colorUser" />
            <Icon name="colorEmail" />
            <Icon name="colorSheild" />
            <Icon name="colorPhone" />
          </div>

          <P align="start" fontSize="13px" fontWeight="400">
            {user?.likeTotal} UPVOTES BY CLIENTS
          </P>
          <div className="d-flex" style={{ textAlign: 'start', gap: '10px' }}>
            <div>
              <P fontSize="14px">LAST UPDATE</P>
              <P fontSize="14px">EQUITY</P>
            </div>
            <div>
              <P fontSize="14px" fontWeight="300">
                {formatDate(user?.updatedAt)}
              </P>
              <P fontSize="14px">YES</P>
            </div>
          </div>
          {
          role !== 1  && ( 
            <div
              className="d-flex"
              data-testid="profile_schedule_interview"
              onClick={e => {
                e.preventDefault()
                handleProfilePage(false)
              }}>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#37DEC5',
                  borderRadius: '4px'
                }}>
                <div style={{ width: '80%' }}>
                  <button
                    style={{
                      background: '#37DEC5',
                      color: 'white',
                      fontSize: '18px',
                      border: '0',
                      padding: '16px 0px',
                      fontWeight: '600'
                    }}>
                    Schedule an Interview
                  </button>
                </div>
                <div
                  style={{
                    borderLeft: '1.3px solid #B5B5B5',
                    background: '#37DEC5',
                    width: '20%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}>
                  <div style={{ position: 'relative', top: '15px', left: '8px' }}>
                    <IconComponent name="downArrow" width="35" height="35" viewBox="0 0 20 20" fill="white" />
                  </div>
                </div>
              </div>
            </div>
          ) } 
        </div>
      </div>
      <div>
        <ProfileTab tabs={['PROJECTS']} selected={selected} setSelected={setSelected} role={role} />
        {user?.projects?.length ? (
          user?.projects?.map(project => (
            <ProjectCard key={project?._id}>
              <P margin="0 0 5px" color="#0057FF" fontSize="16px" fontWeight="500">
                {project?.projectName ?? 'Project Name'}
              </P>
              <P margin="0 0 5px" fontSize="15px">
                {user?.category}
              </P>
              <P margin="0 0 14px" fontSize="14px" fontWeight="300">
                {user?.AddressLineCountry || 'United States'}
              </P>
              <div>
                {project?.skills?.length > 0
                  ? project?.skills.map((skill, index) => <Badge key={`${skill}_${index}`}>{skill}</Badge>)
                  : ''}
              </div>
              <div style={{ padding: '0px 19px', display: 'flex' }}>
                {project?.images?.[0] && (
                  <Image src={project?.images[0]?.url} width="70%" height="98px" radius="10px" alt={`Image 0`} />
                )}

                <div style={{ width: '27%', height: '98px', marginLeft: '5px' }}>
                  {project?.images?.[1] && (
                    <Image src={project?.images[1]?.url} width="100%" height="50%" radius="10px" alt={`Image 1`} />
                  )}
                  {project?.images?.[2] && (
                    <Image
                      src={project?.images[2]?.url}
                      width="100%"
                      height="50%"
                      radius="10px"
                      margin="10px 0px 0px 0px"
                      alt={`Image 2`}
                    />
                  )}
                </div>
              </div>
            </ProjectCard>
          ))
        ) : (
          <ProjectCard>
            <P margin="0 0 5px" color="#0057FF" fontSize="16px" fontWeight="500" align="center">
              No Projects
            </P>
          </ProjectCard>
        )}
        <OtherInformationBox>
          <OtherInformationCard>
            <P fontWeight="700" borderBottom="1px solid #D9D9D9" padding="10px">
              Top Skills
            </P>
            {uniqueSkills?.length
              ? uniqueSkills?.map((skill, index) => (
                <P padding="0 10px" key={`${skill}_${index}`}>
                  {ConverterUtils.capitalize(`${skill} `)}
                </P>
              ))
              : ''}
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
                    onClick={() => handleBrowseFreelancerSkills(skill)}
                    style={{ cursor: 'pointer' }}
                    key={`${skill}_${index}_sim`}>
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
                    onClick={() => handleBrowseFreelancerSkills(skill)}
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
              <P fontWeight="700" borderBottom="1px solid #D9D9D9" padding="10px">
                Education
              </P>
              {role === 1 && freelancerId === user?._id && (
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
                  <P padding="0 10px" fontWeight="500">
                    {education?.title}
                  </P>
                  <P padding="0 10px" margin="0">
                    {education?.institute}
                  </P>
                  <P padding="0 10px">
                    {education?.startYear} - {education?.endYear} ({+education?.endYear - +education?.startYear}{' '}
                    years)
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
            {user?.freelancerSkills?.length
              ? user.freelancerSkills.map((skill, index) => (
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
              ))
              : ''}
          </OtherInformationCard>
        </OtherInformationBox>
        {open && <EducationModal open={open} onHide={handleClose} />}
      </div>
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
    </div>
  )
}

export default MobileProfileCard
