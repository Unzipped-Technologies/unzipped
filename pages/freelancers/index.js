import React, { useState, useEffect, useRef, useMemo } from 'react'
import Nav from '../../components/unzipped/header'
import SearchBar from '../../components/ui/SearchBar'
import FreelancerCard from '../../components/unzipped/dashboard/FreelancerCard'
import Footer from '../../components/unzipped/Footer'
import { DarkText, WhiteCard } from '../../components/unzipped/dashboard/style'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFreelancerList, clearSelectedFreelancer, getFreelancerSkillsList } from '../../redux/actions'
import { parseCookies } from '../../services/cookieHelper'
import MobileSearchBar from '../../components/ui/MobileSearchBar'
import MobileFreelancerCard from '../../components/unzipped/dashboard/MobileFreelancerCard'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter'
import MobileSearchFilter from '../../components/unzipped/MobileSearchFilter'
import DesktopSearchFilterFreelancers from '../../components/unzipped/DesktopSearchFilterFreelancers'

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
`;

const SearchContainer = styled.div`
  margin-top: 78px;
  @media and screen (max-width: 600px){
    margin-top: 78px;
  }
`
const Freelancers = ({
  freelancerList = [],
  getFreelancerList,
  access_token,
  totalCount,
  clearSelectedFreelancer,
  getFreelancerSkillsList,
  freelancerSkillsList = []
}) => {
  const [take, setTake] = useState(20)
  const [skip] = useState(0)
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('ALL CATEGORIES')
  const [minRate, setMinRate] = useState()
  const [maxRate, setMaxRate] = useState()
  const [skill, setSkill] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [filterOpenClose, setFilterOpenClose] = useState(false)
  const sortOptions = [
    {
      text: 'All Categories',
      onClick: () => setSort('ALL CATEGORIES')
    },
    {
      text: 'Most Relavent',
      onClick: () => setSort('Most Relavent')
    },
    {
      text: 'Most reviews',
      onClick: () => setSort('Most reviews')
    },
    {
      text: 'highest hourly rate',
      onClick: () => setSort('highest hourly rate')
    },
    {
      text: 'lowest hourly rate',
      onClick: () => setSort('lowest hourly rate')
    },
    {
      text: 'recomended',
      onClick: () => setSort('recomended')
    }
  ]

  useMemo(() => {
    getFreelancerSkillsList()
  }, [])

  useEffect(() => {
    if (marginBottom) {
      if (maxRate && minRate) {
        if (+maxRate > +minRate) handleSearch()
      } else {
        handleSearch()
      }
    }
  }, [take, sort, minRate, maxRate, skill])
  const handleFilterOpenClose = value => {
    setFilterOpenClose(value)
  }

  const handleSearch = () => {
    getFreelancerList(
      {
        filter,
        take,
        skip,
        sort,
        minRate,
        maxRate,
        skill
      },
      access_token
    )
  }
  const [marginBottom, setMarginBottom] = useState(window.innerWidth < 680 ? undefined : '130px')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 680) setMarginBottom(undefined)
      else setMarginBottom('245px')
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const containerRef = useRef(null)

  const callbackFunction = entries => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
    if (entry.isIntersecting && entry.isIntersecting !== isVisible) {
      if (take < totalCount) {
        setTake(take + 20)
      }
    }
  }

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
  console.log('filterOpenClose', filterOpenClose)

  return (
    <SearchContainer >
      {/* {!filterOpenClose && (
        <Nav
          isSubMenu
          searchValue={filter}
          handleSearchValue={setFilter}
          handleSearch={handleSearch}
          searchButton
          margin={'0px'}
          marginBottom={marginBottom}
        />
      )} */}
      <Nav
        isSubMenu
        searchValue={filter}
        handleSearchValue={setFilter}
        handleSearch={handleSearch}
        searchButton
        margin={'0px'}
        marginBottom={marginBottom}
      />
      {!filterOpenClose && (
        <MobileDisplayBox>
          <MobileSearchBar
            handleSearch={handleSearch}
            filter={filter}
            setFilter={setFilter}
            handleFilterOpenClose={handleFilterOpenClose}
          />
        </MobileDisplayBox>
      )}
      <Container>
        {!filterOpenClose ? (
          <MobileDisplayBox>
            <div className="d-flex align-items-baseline p-2 bg-white" style={{ marginTop: '30px' }}>
              <b style={{ paddingRight: '20px' }}>Top Results</b>
              <small>{getResultMessage(freelancerList, skip, take, totalCount)}</small>
            </div>
            <div style={{ margin: '0 5px', border: '2px solid #EFF1F4' }}></div>
          </MobileDisplayBox>
        ) : (
          <MobileDisplayBox>
            <MobileSearchFilter
              maxRate={maxRate}
              setMaxRate={setMaxRate}
              setMinRate={setMinRate}
              minRate={minRate}
              sort={sort}
              setSort={setSort}
              sortOptions={sortOptions}
              handleFilterOpenClose={handleFilterOpenClose}
              handleSearch={handleSearch}
              freelancerSkillsList={freelancerSkillsList}
              skill={skill}
              setSkill={setSkill}
            />
          </MobileDisplayBox>
        )}
        <Box>
          <DesktopSearchFilterFreelancers
            maxRate={maxRate}
            setMaxRate={setMaxRate}
            setMinRate={setMinRate}
            minRate={minRate}
            sort={sort}
            setSort={setSort}
            sortOptions={sortOptions}
            freelancerSkillsList={freelancerSkillsList}
            skill={skill}
            setSkill={setSkill}
          />

          <div className="overflow-auto">
            <div className="d-flex align-items-baseline py-4 bg-white">
              <h5 className="px-4">
                <b>Top Results</b>
              </h5>
              <h6>{getResultMessage(freelancerList, skip, take, totalCount)}</h6>
            </div>
            {freelancerList?.length === 0 && (
              <DarkText fontSize="20px" padding="20px 40px" backgroundColor="white" width="-webkit-fill-available">
                No freelancers found for this search
              </DarkText>
            )}
            {freelancerList?.map((user, index) => {
              console.log(user)
              const freelancer = {
                id: user.id,
                name: `${user?.user?.FirstName} ${user?.user?.LastName}`,
                type: user.category,
                isPreferedFreelancer: user?.isPreferedFreelancer,
                country: user?.user?.AddressLineCountry || 'United States',
                skills: user?.user?.freelancerSkills?.map(e => e.skill) || [],
                cover:
                  user?.cover ||
                  `I have been a ${user?.category || 'developer'} for over ${(user?.user?.freelancerSkills && user?.user?.freelancerSkills[0]?.yearsExperience) || 1
                  } years. schedule a meeting to check if I'm a good fit for your business.`,
                profilePic:
                  user?.user?.profileImage ||
                  'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
                rate: user?.rate,
                likes: user?.likeTotal
              }
              if (user?.user?.FirstName) {
                return (
                  <>
                    <WhiteCard noMargin overlayDesktop cardHeightDesktop>
                      <FreelancerCard user={freelancer} includeRate clearSelectedFreelancer={clearSelectedFreelancer} />
                    </WhiteCard>
                    {index === freelancerList.length - 1 && <div ref={containerRef}></div>}
                  </>
                )
              }
            })}
          </div>
        </Box>
        {freelancerList?.map((user, index) => {
          const freelancer = {
            id: user._id,
            name: `${user?.user?.FirstName} ${user?.user?.LastName}`,
            type: user.category,
            isPreferedFreelancer: user?.isPreferedFreelancer,
            country: user?.user?.AddressLineCountry || 'United States',
            skills: user?.user?.freelancerSkills?.map(e => e.skill) || [],
            cover:
              user?.cover ||
              `I have been a ${user?.category || 'developer'} for over ${(user?.user?.freelancerSkills && user?.user?.freelancerSkills[0]?.yearsExperience) || 1
              } years. schedule a meeting to check if I'm a good fit for your business.`,
            profilePic:
              user?.user?.profileImage ||
              'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
            rate: user?.rate,
            likes: user?.likeTotal
          }
          if (user?.user?.FirstName) {
            return (
              <>
                {!filterOpenClose && (
                  <MobileDisplayBox>
                    <MobileFreelancerCard
                      user={freelancer}
                      includeRate
                      clearSelectedFreelancer={clearSelectedFreelancer}
                    />
                  </MobileDisplayBox>
                )}
                {index === freelancerList.length - 1 && <div ref={containerRef}></div>}
              </>
            )
          }
        })}
      </Container>
      <DesktopDisplayBox>
        <Footer />
      </DesktopDisplayBox>
      {!filterOpenClose && (
        <MobileDisplayBox>
          <MobileFreelancerFooter />
        </MobileDisplayBox>
      )}
    </SearchContainer>
  )
}

Freelancers.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)
  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    freelancerList: state.Freelancers?.freelancers,
    freelancerSkillsList: state.FreelancerSkills?.freelancerSkills,
    totalCount: state.Freelancers?.totalCount[0]?.count,
    access_token: state.Auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFreelancerList: bindActionCreators(getFreelancerList, dispatch),
    clearSelectedFreelancer: bindActionCreators(clearSelectedFreelancer, dispatch),
    getFreelancerSkillsList: bindActionCreators(getFreelancerSkillsList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Freelancers)
