import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { connect, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'

import Nav from '../../components/unzipped/header'
import Footer from '../../components/unzipped/Footer'
import { parseCookies } from '../../services/cookieHelper'
import MobileSearchBar from '../../components/ui/MobileSearchBar'
import MobileSearchFilter from '../../components/unzipped/MobileSearchFilter'
import { DarkText, WhiteCard } from '../../components/unzipped/dashboard/style'
import DesktopSearchFilter from '../../components/unzipped/DesktopSearchFilter'
import { getFreelancerSkillsList, getPublicProjectsList } from '../../redux/actions'
import MobileProjectCard from '../../components/unzipped/dashboard/MobileProjectCard'
import ProjectDesktopCard from '../../components/unzipped/dashboard/ProjectsDesktopCard'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
  background: #f7f8f9;
  padding-top: 21px;
  @media (max-width: 680px) {
    padding-top: 0px;
    background-color: #f6f7f9;
    margin-bottom: 48px;
  }
`
const Box = styled.div`
  display: flex;
  padding: 0px 67px;
  gap: 21px;
  overflow: overflow;
  @media (max-width: 680px) {
    display: none;
  }
`
const MobileDisplayBox = styled.div`
  position: relative;
  @media (min-width: 680px) {
    display: none;
  }
`
const DesktopDisplayBox = styled.div`
  @media (max-width: 680px) {
    display: none;
  }
`
const Projects = ({ projectList, totalCount, getPublicProjectsList, freelancerId, loading, accessToken }) => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  const containerRef = useRef(null)

  const [take, setTake] = useState('all')
  const [skip, setSkip] = useState(0)
  const [filter, setFilter] = useState({
    isActive: true,
    searchKey: '',
    budget: '',
    minRate: 0,
    maxRate: 0,
    skill: [],
    projectBudgetType: ''
  })
  const [isVisible, setIsVisible] = useState(false)
  const [filterOpenClose, setFilterOpenClose] = useState(false)
  const [marginBottom, setMarginBottom] = useState(window.innerWidth < 680 ? '80px' : '70px')
  const { isExpanded } = useSelector(state => state.Freelancers)

  const filteredProjects = projectList?.filter(project => !project.isArchived) || projectList
  
  useEffect(() => {
    getPublicProjectsList({ limit: take, skip, filter })
  }, [filter])

  useEffect(() => {
    const handleResize = () => {
      if (window && window.innerWidth < 680) {
        setMarginBottom('80px')
      } else setMarginBottom('70px')
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef, options])

  const handleFilterOpenClose = value => {
    setFilterOpenClose(value)
  }

  const setFilters = (field, value) => {
    setFilter(prevFilter => {
      const updatedFilter = { ...prevFilter }

      if (Array.isArray(updatedFilter[field])) {
        if (!Array.isArray(value) && !updatedFilter[field].includes(value)) {
          updatedFilter[field].push(value)
        } else {
          updatedFilter[field] = value
        }
      } else {
        updatedFilter[field] = value
      }

      return updatedFilter
    })
  }

  const callbackFunction = entries => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
    if (entry.isIntersecting && entry.isIntersecting !== isVisible) {
      if (take < totalCount) {
        const total = +take
        setTake('all')
        setSkip(total)
      }
    }
  }

  const getResultMessage = (freelancerList, skip, take, totalCount) => {
    if (freelancerList?.length === 0) {
      return '0 result'
    } else if (freelancerList?.length === 1) {
      return '1 result'
    } else if (skip === 0 && freelancerList?.length > 1) {
      return `1 - ${freelancerList?.length} ${totalCount > take ? `of ${totalCount} results` : `results`}`
    }
  }

  const setSearchKey = value => {
    setFilter(prevData => ({
      ...prevData,
      searchKey: value
    }))
  }

  const handleSearch = intersectionObserver => {
    getPublicProjectsList({
      intersectionObserver,
      filter,
      limit: take,
      skip
    })
  }

  return (
    <div data-testid="projects_page">
      {!filterOpenClose && (
        <Nav
          searchValue={filter}
          handleSearch={handleSearch}
          searchButton
          margin={'0px'}
          marginBottom={marginBottom}
          isSubMenu
          setFilter={setFilter}
          handleSearchValue={setFilter}
        />
      )}

      {!filterOpenClose && window?.innerWidth <= 680 && (
        <MobileDisplayBox>
          <MobileSearchBar setFilters={setFilters} handleFilterOpenClose={handleFilterOpenClose} />
        </MobileDisplayBox>
      )}
      <Container>
        {window?.innerWidth <= 680 && !filterOpenClose ? (
          <MobileDisplayBox>
            <div className="d-flex align-items-baseline p-2 bg-white" style={{ marginTop: '10px' }}>
              <b style={{ paddingRight: '20px' }}>Top Results</b>
              <small>{getResultMessage(filteredProjects, skip, take, totalCount)}</small>
            </div>
            <div style={{ margin: '0 5px', border: '2px solid #EFF1F4' }}></div>
          </MobileDisplayBox>
        ) : (
          <MobileDisplayBox>
            <MobileSearchFilter handleFilterOpenClose={handleFilterOpenClose} filter={filter} setFilters={setFilters} />
          </MobileDisplayBox>
        )}

        {window?.innerWidth > 680 && (
          <Box
            data-testid="desktop_projects_container"
            style={{
              marginTop: !isExpanded ? (accessToken ? '190px' : '150px') : accessToken ? '190px' : '150px'
            }}>
            <DesktopSearchFilter filter={filter} setFilters={setFilters} filterType="projects" />
            {!loading ? (
              <div className="overflow-auto" style={{ width: '100%' }}>
                <div className="d-flex align-items-baseline py-4 bg-white" id="top_results">
                  <h5 className="px-4">
                    <b>Top Results</b>
                  </h5>
                  <h6>{getResultMessage(filteredProjects, skip, take, totalCount)}</h6>
                </div>
                {(filteredProjects?.length === 0) && (
                  <DarkText fontSize="20px" padding="20px 40px" backgroundColor="white" width="-webkit-fill-available">
                    No Projects found for this search
                  </DarkText>
                )}
                {filteredProjects?.map((project, index) => {
                  return (
                    <div key={`${project._id}_desktop`} id={`${project._id}_desktop`}>
                      <WhiteCard noMargin overlayDesktop cardHeightDesktop key={`${project._id}_listing`}>
                        <ProjectDesktopCard project={project} includeRate freelancerId={freelancerId} />
                      </WhiteCard>
                      {index === filteredProjects.length - 1 && <div ref={containerRef} className="mb-2 p-2"></div>}
                    </div>
                  )
                })}
              </div>
            ) : (
              ''
            )}
          </Box>
        )}
        {filteredProjects?.map((project, index) => {
          return (
            <div key={`${project._id}_mobile`} id={`${project._id}_mobile`}>
              {!filterOpenClose && window?.innerWidth <= 680 && (
                <MobileDisplayBox key={`${project._id}_mobile_listing`}>
                  <MobileProjectCard project={project} includeRate />
                </MobileDisplayBox>
              )}
              {index === filteredProjects.length - 1 && <div ref={containerRef} className="p-1"></div>}
            </div>
          )
        })}
      </Container>
      <DesktopDisplayBox>
        <Footer />
      </DesktopDisplayBox>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    freelancerSkillsList: state.FreelancerSkills?.freelancerSkills,
    freelancerId: state?.Auth?.user?.freelancers?._id,
    totalCount: state.Business.totalCount,
    projectList: state.Business.projectList,
    loading: state.Loading.loading,
    accessToken: state.Auth.accessToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPublicProjectsList: bindActionCreators(getPublicProjectsList, dispatch),
    getFreelancerSkillsList: bindActionCreators(getFreelancerSkillsList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
