import React, { useState } from 'react'
import styled from 'styled-components'
import { DarkText } from './dashboard/style'

import ProjectModal from './ProjectModal'

const Container = styled.div`
  min-width: 100%;
`
const Menu = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10%;
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
  height: 63px;
  @media (max-width: 680px) {
    padding-left: 4%;
  }
`
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  width: 98px;
  border-bottom: ${({ selected }) => (selected ? '4px solid #333' : '0px')};
`

const ProfileTab = ({ tabs, selected, setSelected, children, role, freelancerId, userId }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Container data-testid="projects_tab">
      <Menu style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {tabs.map((item, index) => (
          <MenuItem selected={selected === index} onClick={() => setSelected(index)} key={item}>
            <DarkText noMargin key={index}>
              {item}
            </DarkText>
          </MenuItem>
        ))}
        {role === 1 && freelancerId === userId && (
          <div
            style={{
              marginRight: window.innerWidth > 680 ? '37%' : '10%',
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '19px',
              letterSpacing: '0.15007999539375305px',
              textAlign: 'left',
              color: '#1772EB',
              cursor: 'pointer'
            }}
            onClick={handleOpen}>
            Add A Project
          </div>
        )}
      </Menu>
      {children}
      {open && <ProjectModal open={open} onHide={handleClose} />}
    </Container>
  )
}

export default ProfileTab
