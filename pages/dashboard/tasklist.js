import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'

import Nav from '../../components/unzipped/header'
import { parseCookies } from '../../services/cookieHelper'
import { getProjectsList, setDepartment, getBusinessEmployees } from '../../redux/actions'
import TasksPanel from '../../components/unzipped/dashboard/tasks/TasksPanel'
import ProjectsPanel from '../../components/unzipped/dashboard/tasks/ProjectsPanel'
import ProjectKanbanBoard from '../../components/unzipped/dashboard/Kanban/KanbanContainer'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter'

const Container = styled.div`
  overflow: overlay;
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: 10px 5% 40px 5%;
  width: 90%;
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

const ViewFullScreenButton = styled.button`
  margin-right: 40px;
  margin-top: 30px;
  text-transform: uppercase;
  background: #1976d2;
  color: white;
  padding: 5px 5px;
  font-size: 14px;
  font-weight: 400;
  border-radius: 8px;
  border: 0px;
  font-family: Roboto;
  &:focus {
    background: #1976d2 !important;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`

const Tasklist = ({
  loading,
  token,
  cookie,
  businesses = [],
  getProjectsList,
  setDepartment,
  currentDepartment,
  userId
}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const access = token?.access_token || cookie
  const [currentBusiness, setCurrentBusiness] = useState({})
  const [selectedDepartment, setSelectedDepartment] = useState({})
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [showBusinessMenu, setShowBusinessMenu] = useState(businesses.length ? businesses[0]._id : '')

  useEffect(() => {
    if (!access) {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        await getProjectsList({
          take: 'all',
          skip: 0,
          populate: false
        })
      } catch (error) {
        console.error('Error fetching project list:', error)
      }
    })()
  }, [])

  useEffect(() => {
    if (!selectedDepartment?._id && businesses.length > 0) {
      setCurrentBusiness(businesses[0])
    }
  }, [businesses, selectedDepartment])

  useEffect(() => {
    if (currentBusiness) setSelectedDepartment(currentBusiness?.businessDepartments?.[0])
  }, [currentBusiness])

  useEffect(() => {
    if (currentBusiness && currentBusiness?._id) {
      dispatch(getBusinessEmployees(userId))
    }
  }, [currentBusiness])

  const handleFullScreenView = () => {
    setIsFullScreen(!isFullScreen)
    if (businesses) {
      setCurrentBusiness(businesses?.[0]?._id)
      setSelectedDepartment(businesses?.businessDepartments?.[0])
    }
    setShowBusinessMenu('')
  }

  return (
    <>
      <Nav
        isSubMenu
        marginBottom={window.innerWidth > 600 ? '125px' : '78px'}
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          width: '100%',
          margin: '8px 0px'
        }}>
        <ViewFullScreenButton onClick={handleFullScreenView}>
          {isFullScreen ? 'Exit Full Screen' : 'View Full Screen'}
        </ViewFullScreenButton>
      </div>
      {isFullScreen ? (
        <ProjectKanbanBoard
          selectedDepartment={selectedDepartment}
          currentBusiness={currentBusiness}
          businesses={businesses}
          isFullScreen={isFullScreen}
        />
      ) : (
        <>
          {businesses?.length ? (
            <Container>
              <ProjectsPanel
                businesses={businesses}
                currentBusiness={currentBusiness}
                selectedDepartment={selectedDepartment}
                setIsEditable={setIsEditable}
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
                showBusinessMenu={showBusinessMenu}
                setShowBusinessMenu={setShowBusinessMenu}
              />
              {window.innerWidth > 600 && (
                <TasksPanel
                  selectedDepartment={selectedDepartment}
                  currentBusiness={currentBusiness}
                  isEditable={isEditable}
                  setSelectedDepartment={setSelectedDepartment}
                />
              )}
            </Container>
          ) : (
            !loading && <h4 className="d-flex align-items-center justify-content-center">No Projects</h4>
          )}
        </>
      )}
      {window.innerWidth <= 600 && <MobileFreelancerFooter />}
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
    currentDepartment: state.Tasks.currentDepartment,
    loading: state.Loading?.loading,
    userId: state?.Auth?.user?._id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectsList: bindActionCreators(getProjectsList, dispatch),
    setDepartment: bindActionCreators(setDepartment, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasklist)
