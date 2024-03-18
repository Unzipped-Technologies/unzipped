import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { bindActionCreators } from 'redux'
import Nav from '../../components/unzipped/header'
import ProjectsPanel from '../../components/unzipped/dashboard/tasks/ProjectsPanel'
import TasksPanel from '../../components/unzipped/dashboard/tasks/TasksPanel'
import { getProjectsList, setDepartment } from '../../redux/actions'
import { parseCookies } from '../../services/cookieHelper'

const Container = styled.div`
  overflow: overlay;
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: 40px 10%;
  border-radius: 10px;
  /* Hide the scrollbar but keep it functional */
  ::-webkit-scrollbar {
    width: 0; /* Set width to 0 to hide it */
    height: 0; /* Set height to 0 if you're hiding the horizontal scrollbar */
  }

  /* Optionally, you can style the scrollbar track and thumb as needed */
  ::-webkit-scrollbar-track {
    background-color: transparent; /* Make the track transparent */
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent; /* Make the thumb transparent */
  }

  @media screen and (max-width: 600px) {
    margin: 0 !important;
    display: block;
  }
`

const Tasklist = ({ token, cookie, businesses = [], getProjectsList, setDepartment, currentDepartment }) => {
  const router = useRouter()

  const access = token?.access_token || cookie
  const [currentBusiness, setCurrentBusiness] = useState({})
  const [selectedDepartment, setSelectedDepartment] = useState({})

  useEffect(() => {
    if (!access) {
      router.push('/login')
    }
  }, [])

  useEffect(async () => {
    await getProjectsList({
      take: 'all',
      skip: 0,
      populate: false
    })
  }, [])

  useEffect(() => {
    setCurrentBusiness(businesses[0]?._id)
    setSelectedDepartment(businesses[0]?.businessDepartments?.[0])
  }, [businesses])

  return (
    <>
      <Nav
        isSubMenu
        marginBottom={window.innerWidth > 600 ? '188px' : '78px'}
        isLogoHidden={window.innerWidth > 600 ? false : true}
        listName={'Departments'}
        setIsViewable={() => {}}
        setListName={() => {}}
        setIsLogoHidden={() => {}}
        onBackArrowClick={() => {
          setDepartment(null)
          router.back()
        }}
      />
      {!businesses?.length ? (
        <Container>
          <ProjectsPanel
            businesses={businesses}
            currentBusiness={currentBusiness}
            selectedDepartment={selectedDepartment}
            onSelectDepartment={value => {
              setSelectedDepartment(value)
              setDepartment(value)
              if (window.innerWidth <= 600) {
                router.push(`department/${value._id}`)
              }
            }}
            onSelectBusiness={value => {
              setCurrentBusiness(value)
            }}
          />
          {window.innerWidth > 600 && <TasksPanel selectedDepartment={selectedDepartment} />}
        </Container>
      ) : (
        <h4 className="d-flex align-items-center justify-content-center">No Projects</h4>
      )}
    </>
  )
}

Tasklist.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)

  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    businesses: state?.Business?.projectList,
    cookie: state.Auth.token,
    currentDepartment: state.Tasks.currentDepartment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectsList: bindActionCreators(getProjectsList, dispatch),
    setDepartment: bindActionCreators(setDepartment, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist)
