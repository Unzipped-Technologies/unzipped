import React, { useEffect, useMemo } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { useSelector } from 'react-redux'

import RenderIcon from '../RenderIcon'
import { TEXT } from './style'
import IconComponent from '../../ui/icons/IconComponent'
import { getProjectsList } from '../../../redux/Business/actions'

import { getInvitesLists } from '../../../redux/Lists/ListsAction'

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

function MobileProjects({ businesses = [], getProjectsList, getInvitesLists, userListItems, setIsViewable }) {
  const router = useRouter()

  const userId = useSelector(state => state.Auth?.user?._id)

  useEffect(() => {
    const fetchData = async () => {
      await getProjectsList({
        take: 3,
        skip: 0
      })
      await getInvitesLists({
        filter: {
          user: userId
        },
        take: 1000
      })
    }

    fetchData()
  }, [])

  const limitedProjects = useMemo(() => businesses.slice(0, 3), [businesses])

  return (
    <Container className="px-4 mb-5 pb-4">
      <span data-testid="view_mobile_projects">
        <div className="d-flex justify-content-between align-items-center">
          <TEXT fontSize="16px" fontWeight="500" textColor="#000">
            Recent Projects
          </TEXT>
          <Link href={'projects/view'}>
            <TEXT fontSize="12px" fontWeight="500" textColor="#0057FF">
              VIEW ALL
            </TEXT>
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
                <TEXT>{project?.name}</TEXT>
              </Heading>
            )
          })
        ) : (
          <p style={{ textAlign: 'center' }}>Start a project and you will see it here...</p>
        )}
      </span>
      <span data-testid="view_mobile_lists">
        <div className="d-flex justify-content-between align-items-center">
          <TEXT fontSize="16px" fontWeight="500" textColor="#000">
            Lists
          </TEXT>
          <TEXT
            fontSize="12px"
            fontWeight="500"
            textColor="#0057FF"
            onClick={() => {
              router.push(`/dashboard/lists/view`)
            }}>
            VIEW ALL
          </TEXT>
        </div>

        {userListItems?.length &&
          userListItems.slice(0, 3).map(item => (
            <Heading
              key={item?._id}
              onClick={() => {
                router.push(`lists/${item?._id}`)
              }}>
              {item.icon && <RenderIcon iconName={item.icon} />}
              <TEXT>{item.name ?? 'List Name'}</TEXT>
            </Heading>
          ))}
      </span>
      <span data-testid="view_mobile_departments">
        <div className="d-flex justify-content-between align-items-center">
          <TEXT fontSize="16px" fontWeight="500" textColor="#000">
            Departments
          </TEXT>
          <TEXT fontSize="12px" fontWeight="500" textColor="#0057FF">
            VIEW ALL
          </TEXT>
        </div>
        <Heading>
          <img src="/img/heart.png" height={15} width={20} />
          <TEXT>Department one</TEXT>
        </Heading>
        <Heading>
          <IconComponent name="eye" width="20" height="13" viewBox="0 0 20 13" fill="#8EDE64" />
          <TEXT>Department two</TEXT>
        </Heading>
        <Heading>
          <IconComponent name="team" width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
          <TEXT>Department three</TEXT>
        </Heading>
      </span>
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
    getInvitesLists: bindActionCreators(getInvitesLists, dispatch),
    getProjectsList: bindActionCreators(getProjectsList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileProjects)
