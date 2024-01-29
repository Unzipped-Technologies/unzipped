import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Button from '../../../ui/Button'
import { Absolute } from '../../dashboard/style'
import { ConverterUtils, ValidationUtils } from '../../../../utils'
import MobileFreelancerFooter from '../../../unzipped/MobileFreelancerFooter'

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
  padding-top: 10px;
`

const MobileProjectHires = ({ data = [] }) => {
  const router = useRouter()

  return (
    <MobileDisplayBox>
      <ProjectsList>
        {data?.length ? (
          data?.map(row => {
            return (
              <ProjectCard key={row._id}>
                <ProjectDate>
                  {(row?.createdAt && ValidationUtils.formatDate(row?.createdAt)) ||
                    ValidationUtils.formatDate(row?.updatedAt || row?.updatedAt)}
                </ProjectDate>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <ProjectName>
                    {ConverterUtils.capitalize(
                      `${row?.freelancerId?.userId.FirstName} ${row?.freelancerId?.userId.LastName}`
                    )}
                  </ProjectName>
                  <div style={{ paddingRight: '15px' }}>$ {row.hourlyRate || 0} / hour</div>
                </div>
                <UserCategory>{row?.freelancerId?.category || 'N/A'}</UserCategory>
                <Absolute
                  buttonHeight="33px"
                  position="none"
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
                        onClick: () => console.log('revoke')
                      },
                      {
                        text: 'View Profile',
                        onClick: () => {
                          router.push(`/freelancers/${row?.freelancerId?._id}`)
                        }
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
          })
        ) : (
          <div
            style={{
              marginLeft: '50%',
              textAlign: 'center',
              paddingTop: '40px',
              paddingBottom: '40px'
            }}>
            <p>N/A</p>
          </div>
        )}
      </ProjectsList>
      <MobileFreelancerFooter defaultSelected="Projects" />
    </MobileDisplayBox>
  )
}

export default MobileProjectHires
