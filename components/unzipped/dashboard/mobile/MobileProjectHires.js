import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import { accountTypeEnum } from '../../../../server/enum/accountTypeEnum'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TitleText, DarkText, Absolute } from '../../dashboard/style'
import MobileSearchBar from '../../../ui/MobileSearchBar'
import Nav from '../../../unzipped/header'
import Button from '../../../ui/Button'
import MobileFreelancerFooter from '../../../unzipped/MobileFreelancerFooter'

import { getBusinessList } from '../../../../redux/actions'

const MobileDisplayBox = styled.div`
  background: #f4f4f4;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  flex-wrap: wrap;
  width: 100%;
  @media (min-width: 680px) {
    display: none;
  }
`

const ProjectsList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
`

const ProjectCard = styled.div`
  width: 100%;
  background: #fff;
  margin-bottom: 5px;
`

const ProjectName = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 23px; /* 143.75% */
  letter-spacing: 0.15px;
  padding-left: 18px;
`

const UserCategory = styled.div`
  padding-left: 18px;
  color: #000;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px; /* 176.923% */
  letter-spacing: 0.15px;
`

const ProjectDate = styled.div`
  color: #000;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 23px; /* 176.923% */
  letter-spacing: 0.15px;
  padding-left: 18px;
`

const MobileProjectHires = ({ _id, token, cookie, businesses = [], getBusinessList, role, loading, access_token }) => {
  const access = token?.access_token || cookie
  const router = useRouter()

  const [selected, setSelected] = useState(null)

  const [take, setTake] = useState(3)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (role === accountTypeEnum.ADMIN) {
      setSelected(accountTypeEnum.FOUNDER)
    }
  }, [])

  useEffect(() => {
    if (selected == 0) {
      getBusinessList(
        {
          take: take,
          skip: (page - 1) * 25
        },
        access,
        selected,
        _id
      )
    } else if (selected == 1) {
      getBusinessList(
        {
          take: take,
          skip: (page - 1) * 25
        },
        access_token,
        selected,
        _id
      )
    }
  }, [selected])

  const toggleRole = () => {
    if (role === accountTypeEnum.ADMIN) {
      if (selected === accountTypeEnum.FOUNDER) {
        setSelected(accountTypeEnum.INVESTOR)
      } else {
        setSelected(accountTypeEnum.FOUNDER)
      }
    }
  }

  return (
    <MobileDisplayBox>
      <ProjectsList>
        {businesses?.map(business => {
          return (
            <ProjectCard>
              <ProjectDate>10/26/2024</ProjectDate>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <ProjectName>{business?.name}</ProjectName>
                <div style={{ paddingRight: '15px' }}>$ 35 / hour</div>
              </div>
              <UserCategory>Software Engineer</UserCategory>
              <Absolute
                buttonHeight="33px"
                style={{
                  width: '90%',
                  border: '0.25px solid #000',
                  margin: '20px auto 20px auto',
                  background: 'rgba(217, 217, 217, 0.28)'
                }}>
                <Button
                  icon="largeExpand"
                  popoutWidth="324px"
                  noBorder
                  type="lightgrey"
                  fontSize="13px"
                  popout={[
                    {
                      text: 'Revoke Access',
                      onClick: () => router.push(`details/${business._id}`)
                    },
                    {
                      text: 'View Profile',
                      onClick: () => {}
                    },
                    {
                      text: 'Assign Work',
                      onClick: () => {}
                    },
                    {
                      text: 'View Invoices',
                      onClick: () => {}
                    },
                    {
                      text: 'Assign Department',
                      onClick: () => {}
                    }
                  ]}
                  iconRight
                  colors={{
                    hover: 'none',
                    background: 'none'
                  }}
                  style={{
                    width: '324px'
                  }}>
                  Details
                </Button>
              </Absolute>
            </ProjectCard>
          )
        })}
      </ProjectsList>
      <MobileFreelancerFooter defaultSelected="Projects" />
    </MobileDisplayBox>
  )
}

const mapStateToProps = state => {
  return {
    _id: state.Auth.user._id,
    access_token: state.Auth.token,
    businesses: state.Business?.projectList,
    loading: state.Business?.loading,
    role: state.Auth.user.role,
    cookie: state.Auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBusinessList: bindActionCreators(getBusinessList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileProjectHires)
