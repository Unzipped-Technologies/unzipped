import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import IconComponent from '../../ui/icons/IconComponent'
import { useDispatch, useSelector } from 'react-redux'
import MobileFreelancerCard from './MobileFreelancerCard'
import { getListEntriesById, getRecentlyViewedList, getTeamMembers } from '../../../redux/ListEntries/action'
import { getProjectsList } from '../../../redux/Business/actions'
import RenderIcon from '../RenderIcon'

const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  background: ${({ background }) => (background ? background : '#fff')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
`
const Heading = styled.div`
  gap: 20px;
  display: flex;
  align-items: baseline;
`

const Container = styled.div`
  @media screen and (min-width: 600px) {
    display: none;
  }
`

function MobileProjects({
  userListItems,
  setIsViewable,
  setIsFavourite,
  setIsRecentlyViewed,
  setIsMyTeam,
  setListName,
  setIsLogoHidden,
  setIsListViewable,
  isListViewable,
  setIsExpanded,
  setListInfo,
  businesses = [],
  getProjectsList
}) {
  const router = useRouter()

  const dispatch = useDispatch()
  const userId = useSelector(state => state.Auth?.user?._id)

  const [freelancers, setFreelancers] = useState([])
  const USER_ID = useSelector(state => state.Auth.user._id)

  useEffect(() => {
    getProjectsList({
      take: 3,
      skip: 0
    })
  }, [])

  const limitedProjects = useMemo(() => businesses.slice(0, 3), [businesses])

  const handleListChangeEv = item => {
    if (item.name === 'Favorites') {
      setIsFavourite(true)
      dispatch(getListEntriesById(item._id))
    }
    if (item.name === 'Recently Viewed') {
      setIsRecentlyViewed(true)
      dispatch(getRecentlyViewedList(item._id))
    }
    if (item.name === 'My Team') {
      setIsMyTeam(true)
      dispatch(getTeamMembers(userId))
    }
    setIsViewable(true)
    setListName(item.name)
    setIsLogoHidden(true)
    setListInfo({ listId: item._id, listTitle: item.name, listIcon: item.icon })
  }

  return (
    <Container className="px-4 mb-5 pb-4">
      <div className="d-flex justify-content-between align-items-center">
        <P fontSize="16px" fontWeight="500" color="#000">
          Recent Projects
        </P>
        <Link href={'projects/view'}>
          <P fontSize="12px" fontWeight="500" color="#0057FF">
            VIEW ALL
          </P>
        </Link>
      </div>
      {limitedProjects?.length ? (
        limitedProjects.map(project => {
          return (
            <Heading
              key={project._id}
              onClick={() => {
                router.push(`projects/details/${project._id}`)
              }}>
              <IconComponent name="team" width="18" height="15" viewBox="0 0 18 15" fill="#000000" />
              <P>{project?.name}</P>
            </Heading>
          )
        })
      ) : (
        <p style={{ textAlign: 'center' }}>Start a project and you will see it here...</p>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <P fontSize="16px" fontWeight="500" color="#000">
          Lists
        </P>
        <P
          fontSize="12px"
          fontWeight="500"
          color="#0057FF"
          onClick={() => {
            setIsListViewable(true)
            setIsViewable(true)
          }}>
          VIEW ALL
        </P>
      </div>

      {userListItems &&
        userListItems.slice(0, 3).map(item => (
          <Heading>
            {item.icon && <RenderIcon iconName={item.icon} />}
            <P onClick={() => handleListChangeEv(item)}>{item.name}</P>
          </Heading>
        ))}

      <div className="d-flex justify-content-between align-items-center">
        <P fontSize="16px" fontWeight="500" color="#000">
          Departments
        </P>
        <P fontSize="12px" fontWeight="500" color="#0057FF">
          VIEW ALL
        </P>
      </div>
      <Heading>
        <img src="/img/heart.png" height={15} width={20} />
        <P>Department one</P>
      </Heading>
      <Heading>
        <IconComponent name="eye" width="20" height="13" viewBox="0 0 20 13" fill="#8EDE64" />
        <P>Department two</P>
      </Heading>
      <Heading>
        <IconComponent name="team" width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
        <P>Department three</P>
      </Heading>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    businesses: state.Business?.projectList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectsList: bindActionCreators(getProjectsList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileProjects)
