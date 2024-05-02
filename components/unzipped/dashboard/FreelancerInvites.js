import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { getUserListEntries } from '../../../redux/actions'
import MobileInvitesView from './mobile/MobileInvitesView'
import ProjectDesktopCard from './ProjectsDesktopCard'
import { WhiteCard } from './style'
import MobileProjectCard from './MobileProjectCard'

const Box = styled.div`
  display: flex;
  flex-flow: row;
  justify-items: space-around;
  flex-shrink: 0;
  background: rgba(240, 240, 240, 0);
  height: auto;
  width: 984px;
  margin-left: 150px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
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

const InvitesList = ({ businessId, projectDetails, invitesList, getUserListEntries, freelancerId, role }) => {
  const router = useRouter()

  useEffect(() => {
    // Below we are only sending pagination data, Other data we are using from redux store.
    getUserListEntries({
      filter: {
        freelancerId: freelancerId,
        name: 'Invites',
        businessId: businessId
      },
      take: 1000
    })
  }, [])

  return (
    <>
      {window.innerWidth > 680 ? (
        <Box>
          <div className="overflow-auto">
            {invitesList?.length
              ? invitesList.map(invitation => {
                  return (
                    <WhiteCard noMargin overlayDesktop cardHeightDesktop key={`${invitation._id}_listing`}>
                      <ProjectDesktopCard
                        project={invitation?.businessId}
                        includeRate
                        freelancerId={invitation?.freelancerId?._id}
                      />
                    </WhiteCard>
                  )
                })
              : ''}
          </div>
        </Box>
      ) : invitesList?.length ? (
        invitesList.map(invitation => {
          return (
            <MobileDisplayBox key={`${invitation._id}_mobile_listing`}>
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
