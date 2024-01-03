import React from 'react'
import IconComponent from '../../ui/icons/IconComponent'
import styled from 'styled-components'

const UserSkills = styled.div`
::-webkit-scrollbar {
  width: 0.1em;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
}
`;

function MobileProjectCard({ project }) {
  return (
    <div className='bg-white' style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.25)", color: "black" }}>
      <div className='px-3 py-2'>
        <div className='d-flex'>
          <div >
            <div className='d-flex'>
              <p className='mb-0 pe-2' style={{ color: "#0057FF", fontWeight: "500", fontSize: "16px" }}>{project?.name}</p>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
            <p className='mb-0'>{project?.country}</p>
            <div className='d-flex'>
          {/* <span style={{ fontSize: "24px" }}>${project?.budget} <span style={{ fontSize: "15px" }}>{project?.projectType.includes('Hourly Rate') ? '/ hour ' : 'fixed rate '}</span></span> */}
          <div className='d-flex align-items-center ps-3'>
            <IconComponent name='thumbUp' width="15" height="15" viewBox="0 0 15 15" fill="#0057FF" />
            <span style={{ fontSize: "16px", paddingLeft: "3px" }}>{project?.likes}</span>
          </div>
          </div>
        </div>
      </div>
      <UserSkills style={{ overflowX: "scroll", overflowY: "hidden", padding: "13px 0", marginLeft: "8px" }}>
        {project?.requiredSkills?.map((skill, index) => (
          <span key={index} style={{ backgroundColor: "#D9D9D9", borderRadius: "16px", fontSize: "13px", padding: "4px 20px 6px 20px", marginRight: "6.4px", fontWeight: "500", minHeight: "100%" }}>
            {skill}
          </span>
        ))
        }
      </UserSkills>
      <div className='px-4'>
        <p>
          {project?.description}
        </p>
      </div>
      <div className='px-4 mb-3' style={{ display: "grid" }}>
        <button style={{ background: "#37DEC5", color: "white", fontSize: "16px", border: "0", padding: "10px 0px", fontWeight: "600" }}>VIEW PROFILE</button>
      </div>
    </div>
  )
}

export default MobileProjectCard