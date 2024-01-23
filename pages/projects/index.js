import React, { useState, useEffect, useRef, useMemo } from 'react'
import Nav from '../../components/unzipped/header'
import Footer from '../../components/unzipped/Footer'
import { DarkText, WhiteCard } from '../../components/unzipped/dashboard/style'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFreelancerSkillsList, getProjectsList } from '../../redux/actions'
import { parseCookies } from '../../services/cookieHelper'
import MobileSearchBar from '../../components/ui/MobileSearchBar'
import DesktopSearchFilterProjects from '../../components/unzipped/DesktopSearchFilterProjects'
import MobileSearchFilterProjects from '../../components/unzipped/MobileSearchFilterProjects'
import ProjectDesktopCard from '../../components/unzipped/dashboard/ProjectsDesktopCard'
import MobileProjectCard from '../../components/unzipped/dashboard/MobileProjectCard'

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
const Projects = ({
  projectList,
  totalCount,
  getFreelancerSkillsList,
  freelancerSkillsList = [],
  getProjectsList,
  id,
  freelancerId
}) => {
  const containerRef = useRef(null)

  const [take, setTake] = useState(20)
  const [skip, setSkip] = useState(0)
  const [filter, setFilter] = useState({
    isActive: true,
    searchKey: ''
  })
  const [minRate, setMinRate] = useState()
  const [maxRate, setMaxRate] = useState()
  const [skill, setSkill] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [filterOpenClose, setFilterOpenClose] = useState(false)
  const [type, setType] = useState('')
  const [marginBottom, setMarginBottom] = useState(window.innerWidth < 680 ? '80px' : '245px')

  useMemo(() => {
    getFreelancerSkillsList()
    getProjectsList({ take, skip, isActive: true })
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window && window.innerWidth < 680) {
        setMarginBottom('80px')
      } else setMarginBottom('245px')
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (marginBottom) {
      if (maxRate && minRate) {
        if (+maxRate > +minRate) handleSearch()
      } else {
        handleSearch()
      }
    }
  }, [type, minRate, maxRate, skill])

  useEffect(() => {
    if (skip) {
      const intersectionObserver = true
      handleSearch(intersectionObserver)
      setTake(+skip + 20)
    }
    setSkip(0)
  }, [skip])

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

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

  const handleSearch = intersectionObserver => {
    getProjectsList({
      intersectionObserver,
      filter,
      take,
      skip,
      type,
      minRate,
      maxRate,
      skill
    })
  }

  const callbackFunction = entries => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
    if (entry.isIntersecting && entry.isIntersecting !== isVisible) {
      if (take < totalCount) {
        const total = +take
        setTake(20)
        setSkip(total)
      }
    }
  }

  const getResultMessage = (freelancerList, skip, take, totalCount) => {
    if (freelancerList?.length === 0) {
      return '0 result'
    } else if (freelancerList?.length === 1) {
      return '1 result'
    } else if (skip === 0) {
      return `1 - ${freelancerList?.length} ${totalCount > take ? `of ${totalCount} results` : `results`}`
    } else {
      const start = +skip * +take + 1
      const end = Math.min(+skip * +take + +take, totalCount)
      return `${start} - ${end} ${totalCount > +take * +skip ? `of ${totalCount} results` : `results`}`
    }
  }

  const setSearchKey = value => {
    setFilter(prevData => ({
      ...prevData,
      searchKey: value
    }))
  }

  return (
    <div>
      {!filterOpenClose && (
        <Nav
          isSubMenu
          searchValue={filter}
          handleSearchValue={setSearchKey}
          handleSearch={handleSearch}
          searchButton
          margin={'0px'}
          marginBottom={marginBottom}
        />
      )}
      {!filterOpenClose && (
        <MobileDisplayBox>
          <MobileSearchBar
            handleSearch={handleSearch}
            filter={filter}
            setFilter={setSearchKey}
            handleFilterOpenClose={handleFilterOpenClose}
          />
        </MobileDisplayBox>
      )}
      <Container>
        {!filterOpenClose ? (
          <MobileDisplayBox>
            <div className="d-flex align-items-baseline p-2 bg-white" style={{ marginTop: '10px' }}>
              <b style={{ paddingRight: '20px' }}>Top Results</b>
              <small>{getResultMessage(projectList, skip, take, totalCount)}</small>
            </div>
            <div style={{ margin: '0 5px', border: '2px solid #EFF1F4' }}></div>
          </MobileDisplayBox>
        ) : (
          <MobileDisplayBox>
            <MobileSearchFilterProjects
              handleProjectTypes={setType}
              maxRate={maxRate}
              setMaxRate={setMaxRate}
              setMinRate={setMinRate}
              minRate={minRate}
              handleFilterOpenClose={handleFilterOpenClose}
              handleSearch={handleSearch}
              freelancerSkillsList={freelancerSkillsList}
              skill={skill}
              setSkill={setSkill}
            />
          </MobileDisplayBox>
        )}
        <Box>
          <DesktopSearchFilterProjects
            handleProjectTypes={setType}
            maxRate={maxRate}
            setMaxRate={setMaxRate}
            setMinRate={setMinRate}
            minRate={minRate}
            freelancerSkillsList={freelancerSkillsList}
            skill={skill}
            setSkill={setSkill}
          />
          <div className="overflow-auto">
            <div className="d-flex align-items-baseline py-4 bg-white">
              <h5 className="px-4">
                <b>Top Results</b>
              </h5>
              <h6>{getResultMessage(projectList, skip, take, totalCount)}</h6>
            </div>
            {projectList?.length === 0 && (
              <DarkText fontSize="20px" padding="20px 40px" backgroundColor="white" width="-webkit-fill-available">
                No freelancers found for this search
              </DarkText>
            )}
            {projectList?.map((project, index) => {
              return (
                <div key={`${project._id}_desktop`}>
                  <WhiteCard noMargin overlayDesktop cardHeightDesktop key={`${project._id}_listing`}>
                    <ProjectDesktopCard project={project} includeRate id={id} freelancerId={freelancerId} />
                  </WhiteCard>
                  {index === projectList.length - 1 && <div ref={containerRef} className="mb-2 p-2"></div>}
                </div>
              )
            })}
          </div>
        </Box>
        {projectList?.map((project, index) => {
          return (
            <div key={`${project._id}_mobile`}>
              {!filterOpenClose && (
                <MobileDisplayBox key={`${project._id}_mobile_listing`}>
                  <MobileProjectCard project={project} includeRate />
                </MobileDisplayBox>
              )}
              {index === projectList.length - 1 && <div ref={containerRef} className="p-1"></div>}
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

Projects.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)
  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    id: state.Auth.user._id,
    freelancerSkillsList: state.FreelancerSkills?.freelancerSkills,
    freelancerId: state?.Auth?.user?.freelancers,
    totalCount: state.Business.totalCount,
    projectList: state.Business.projectList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectsList: bindActionCreators(getProjectsList, dispatch),
    getFreelancerSkillsList: bindActionCreators(getFreelancerSkillsList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)
