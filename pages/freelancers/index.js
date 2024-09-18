import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import _ from 'lodash'

import Nav from '../../components/unzipped/header'
import Footer from '../../components/unzipped/Footer'
import MobileSearchBar from '../../components/ui/MobileSearchBar'
import MobileSearchFilter from '../../components/unzipped/MobileSearchFilter'
import DesktopSearchFilter from '../../components/unzipped/DesktopSearchFilter'
import FreelancerCard from '../../components/unzipped/dashboard/FreelancerCard'
import { DarkText, WhiteCard } from '../../components/unzipped/dashboard/style'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter'
import MobileFreelancerCard from '../../components/unzipped/dashboard/MobileFreelancerCard'
import { getFreelancerList, clearSelectedFreelancer, getAllFreelancers } from '../../redux/actions'

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

const SearchContainer = styled.div`
  @media and screen (max-width: 600px) {
    margin-top: 78px;
  }
`
const Freelancers = ({
  freelancerList = [],
  access_token,
  totalCount,
  clearSelectedFreelancer,
  getAllFreelancers,
  user,
  loading = false
}) => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  const containerRef = useRef(null)
  const router = useRouter()
  const { project } = router.query

  const [filter, setFilter] = useState({
    businessId: project,
    sort: '',
    searchKey: '',
    minRate: 0,
    maxRate: 0,
    skill: []
  })
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(10)
  const [isVisible, setIsVisible] = useState(false)
  const [filterOpenClose, setFilterOpenClose] = useState(false)
  const [marginBottom, setMarginBottom] = useState(window.innerWidth < 680 ? '80px' : '70px')

  const { isExpanded } = useSelector(state => state.Freelancers)
  const userId = useSelector(state => state.Auth?.user?._id)
  const createdInvitation = useSelector(state => state.FreelancerSkills?.createdInvitation)

  const debouncedSearch = useRef(
    _.debounce(filter => {
      getAllFreelancers({ filter, skip, take })
    }, 750)
  ).current

  useEffect(() => {
    debouncedSearch(filter)
  }, [filter, createdInvitation, take, debouncedSearch])

  const getFreelancersAfterInvitation = () => {
    getAllFreelancers({ filter, skip, take })
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 680) setMarginBottom('80px')
      else setMarginBottom('0px')
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleSearch = () => {
    getAllFreelancers({ filter, skip, take })
  }

  const handleFilterOpenClose = value => {
    setFilterOpenClose(value)
  }

  const callbackFunction = entries => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
    if (entry.isIntersecting && entry.isIntersecting !== isVisible) {
      if (take < totalCount) {
        setTake(20)
        setSkip(take)
      }
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef, options])

  const getResultMessage = (allFreelancers, skip, take, totalCount) => {
    if (allFreelancers?.length === 0) {
      return '0 result'
    } else if (allFreelancers?.length === 1) {
      return '1 result'
    } else if (skip === 0) {
      return `1 - ${allFreelancers?.length} ${totalCount > take ? `of ${totalCount} results` : `results`}`
    } else {
      const start = +skip * +take + 1
      const end = Math.min(+skip * +take + +take, totalCount)
      return `${start} - ${end} ${totalCount > +take * +skip ? `of ${totalCount} results` : `results`}`
    }
  }

  const constructFreelancerModel = item => {
    const freelancer = {
      id: item?._id,
      userId: item?.user?._id,
      name: `${item?.user?.FirstName ?? ''} ${item?.user?.LastName ?? ''}`,
      type: item?.category,
      isPreferedFreelancer: item?.isPreferedFreelancer,
      country: item?.user?.AddressLineCountry || 'United States',
      skills: item?.freelancerSkills || [],
      cover:
        item?.cover ||
        `I have been a ${item?.category || 'developer'} for over ${
          (item?.freelancerSkills && item?.freelancerSkills[0]?.yearsExperience) || 1
        } years. schedule a meeting to check if I'm a good fit for your business.`,
      profilePic:
        item?.user?.profileImage || 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
      rate: item?.rate,
      likes: item?.likeTotal,
      invites: item?.invites
    }
    return freelancer
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
      updatedFilter[field] = value

      return updatedFilter
    })
  }

  const handleAccountVerification = () => {
    if (user?.role === 0) {
      if (
        user?.isEmailVerified &&
        user?.isPhoneVerified &&
        user?.isIdentityVerified == 'SUCCESS' &&
        (user?.FirstName || user?.LastName)
      ) {
        return true
      } else {
        router.push('/dashboard')
        return false
      }
    }
    return true
  }

  return (
    <SearchContainer data-testid="freelancer_page">
      {handleAccountVerification() && (
        <>
          <Nav
            isSubMenu
            searchValue={filter}
            setFilter={setFilter}
            handleSearchValue={setFilter}
            handleSearch={handleSearch}
            searchButton
            margin={'0px'}
            marginBottom={marginBottom}
          />
          {!filterOpenClose && window?.innerWidth <= 680 && (
            <MobileDisplayBox>
              <MobileSearchBar
                setFilters={setFilters}
                handleFilterOpenClose={handleFilterOpenClose}
                searchKey={filter?.searchKey}
              />
            </MobileDisplayBox>
          )}
          <Container>
            {!filterOpenClose && window?.innerWidth <= 680 ? (
              <MobileDisplayBox>
                <div className="d-flex align-items-baseline p-2 bg-white" style={{ marginTop: '30px' }}>
                  <b style={{ paddingRight: '20px' }}>Top Results</b>
                  <small>{getResultMessage(freelancerList, skip, take, totalCount)}</small>
                </div>
                <div style={{ margin: '0 5px', border: '2px solid #EFF1F4' }}></div>
              </MobileDisplayBox>
            ) : (
              window?.innerWidth <= 680 && (
                <MobileDisplayBox>
                  <MobileSearchFilter
                    handleFilterOpenClose={handleFilterOpenClose}
                    filter={filter}
                    setFilters={setFilters}
                    filterType="freelancer"
                  />
                </MobileDisplayBox>
              )
            )}
            {window?.innerWidth > 680 && (
              <Box
                data-testid="desktop_freelancer_container"
                style={{
                  marginTop: !isExpanded ? (access_token ? '190px' : '150px') : access_token ? '190px' : '150px'
                }}>
                <DesktopSearchFilter filter={filter} setFilters={setFilters} filterType="freelancer" />
                <div
                  className="overflow-auto"
                  style={{
                    width: '-webkit-fill-available'
                  }}>
                  <div className="d-flex align-items-baseline py-4 bg-white">
                    <h5 className="px-4">
                      <b>Top Results</b>
                    </h5>
                    <h6>{getResultMessage(freelancerList, skip, take, totalCount)}</h6>
                  </div>
                  {loading ? (
                    <DarkText
                      fontSize="20px"
                      padding="20px 40px"
                      backgroundColor="white"
                      width="-webkit-fill-available">
                      Loading...
                    </DarkText>
                  ) : (
                    freelancerList?.length === 0 && (
                      <DarkText
                        fontSize="20px"
                        padding="20px 40px"
                        backgroundColor="white"
                        width="-webkit-fill-available">
                        No freelancers found for this search
                      </DarkText>
                    )
                  )}
                  {freelancerList?.map((item, index) => {
                    const freelancer = constructFreelancerModel(item)
                    return (
                      <div key={item?._id}>
                        <WhiteCard noMargin overlayDesktop cardHeightDesktop>
                          <FreelancerCard
                            user={freelancer}
                            includeRate
                            clearSelectedFreelancer={clearSelectedFreelancer}
                            filter={filter}
                            userId={userId}
                          />
                        </WhiteCard>
                        {freelancerList.length < 1000 && freelancerList.length < totalCount && (
                          <div ref={containerRef}></div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </Box>
            )}

            {window?.innerWidth <= 680 &&
              freelancerList?.map((item, index) => {
                const freelancer = constructFreelancerModel(item)
                return (
                  <div key={`${item._id}_${index}`}>
                    {!filterOpenClose && (
                      <MobileDisplayBox>
                        <MobileFreelancerCard
                          user={freelancer}
                          includeRate
                          clearSelectedFreelancer={clearSelectedFreelancer}
                          afterInvitation={getFreelancersAfterInvitation}
                          userId={userId}
                        />
                      </MobileDisplayBox>
                    )}
                    {freelancerList.length < 1000 && freelancerList.length < totalCount && (
                      <div ref={containerRef}></div>
                    )}
                  </div>
                )
              })}
          </Container>
          <DesktopDisplayBox>
            {' '}
            <Footer />{' '}
          </DesktopDisplayBox>
          {!filterOpenClose && window?.innerWidth <= 680 && (
            <MobileDisplayBox>
              <MobileFreelancerFooter />
            </MobileDisplayBox>
          )}
        </>
      )}
    </SearchContainer>
  )
}

const mapStateToProps = state => {
  return {
    freelancerList: state.Freelancers?.freelancers,
    access_token: state.Auth.token,
    totalCount: state.Freelancers?.totalCount,
    loading: state.Loading.loading,
    user: state.Auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFreelancerList: bindActionCreators(getFreelancerList, dispatch),
    clearSelectedFreelancer: bindActionCreators(clearSelectedFreelancer, dispatch),
    getAllFreelancers: bindActionCreators(getAllFreelancers, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Freelancers)
