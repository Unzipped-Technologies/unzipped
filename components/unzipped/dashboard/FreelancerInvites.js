import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import { WhiteCard } from './style'
import MobileProjectCard from './MobileProjectCard'
import ProjectDesktopCard from './ProjectsDesktopCard'
import { getUserListEntries } from '../../../redux/actions'

const Box = styled.div`
  display: flex;
  flex-flow: row;
  justify-items: space-around;
  flex-shrink: 0;
  background: rgba(240, 240, 240, 0);
  height: auto;
  width: 80%;
  margin: auto;
  border-radius: 5px;
  margin-top: 10px;
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

const InvitesList = ({ businessId, invitesList, getUserListEntries, freelancerId }) => {
  useEffect(() => {
    async function fetchData() {
      await getUserListEntries({
        filter: {
          freelancerId: freelancerId?._id,
          name: 'Invites',
          businessId: businessId
        },
        take: 1000
      })
    }
    fetchData()
  }, [])

  return (
    <>
      {window.innerWidth > 680 ? (
        <Box>
          {invitesList?.length
            ? invitesList.map(invitation => {
                return (
                  <WhiteCard
                    overflow="visible"
                    noMargin
                    overlayDesktop
                    key={`${invitation._id}_listing`}
                    data-testid={`${invitation._id}_desktop_freelancer_invite`}>
                    <ProjectDesktopCard
                      project={invitation?.businessId}
                      includeRate
                      freelancerId={invitation?.freelancerId}
                    />
                  </WhiteCard>
                )
              })
            : ''}
        </Box>
      ) : invitesList?.length ? (
        invitesList.map(invitation => {
          return (
            <MobileDisplayBox
              key={`${invitation._id}_mobile_listing`}
              data-testid={`${invitation._id}_mobile_freelancer_invite`}>
              <MobileProjectCard project={invitation?.businessId} includeRate />
            </MobileDisplayBox>
          )
        })
      ) : (
        ''
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    invitesList: state?.ListEntries?.userListEntries,
    freelancerId: state?.Auth?.user?.freelancers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserListEntries: bindActionCreators(getUserListEntries, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitesList)
