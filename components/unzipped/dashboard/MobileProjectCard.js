import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import IconComponent from '../../ui/icons/IconComponent'
import { ValidationUtils } from '../../../utils'

const UserSkills = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ::-webkit-scrollbar {
    width: 0.1em;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`

function MobileProjectCard({ project }) {
  const router = useRouter()

  return (
    <div
      className="bg-white"
      style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.25)', color: 'black' }}
      id={project?._id}>
      <div className="px-3 py-2">
        <div className="d-flex">
          <div>
            <div className="d-flex">
              <p
                className="mb-0 pe-2"
                style={{ color: '#0057FF', fontWeight: '500', fontSize: '16px' }}
                onClick={() => {
                  router.push(`/projects/${project._id}`)
                }}
                data-testid={`${project?._id}_name`}>
                {ValidationUtils.truncate(project?.name, 40)}
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0" data-testid={`${project?._id}_country`}>
            {project?.businessCountry}
          </p>
          <div className="d-flex">
            <div className="d-flex align-items-center ps-3">
              <IconComponent name="thumbUp" width="15" height="15" viewBox="0 0 15 15" fill="#0057FF" />
              <span style={{ fontSize: '16px', paddingLeft: '3px' }} data-testid={`${project?._id}_likeTotal`}>
                {project?.likeTotal}
              </span>
            </div>
          </div>
        </div>
      </div>
      <UserSkills
        style={{ overflowX: 'scroll', overflowY: 'hidden', marginLeft: '8px' }}
        data-testid={`required_skill`}>
        {project?.requiredSkills?.map((skill, index) => (
          <span
            key={index}
            style={{
              backgroundColor: '#D9D9D9',
              borderRadius: '16px',
              fontSize: '13px',
              padding: '4px 20px 6px 20px',
              marginRight: '6.4px',
              fontWeight: '500',
              minHeight: '100%',
              marginTop: '5px'
            }}>
            {skill}
          </span>
        ))}
      </UserSkills>
      <div className="px-4">
        <p data-testid={`${project?._id}description`}>{project?.description}</p>
      </div>
      <div className="px-4 mb-3" style={{ display: 'grid' }}>
        <button
          style={{
            background: '#37DEC5',
            color: 'white',
            fontSize: '16px',
            border: '0',
            padding: '10px 0px',
            fontWeight: '600'
          }}
          onClick={() => {
            router.push(`/projects/${project._id}`)
          }}>
          VIEW PROJECT
        </button>
      </div>
    </div>
  )
}

export default MobileProjectCard
