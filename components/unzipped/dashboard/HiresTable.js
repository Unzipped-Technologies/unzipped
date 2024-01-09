import React, { useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../ui/Button'
import { useRouter } from 'next/router'
import { getContracts } from '../../../redux/Contract/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MobileProjectHires from './mobile/MobileProjectHires'
import { ConverterUtils, ValidationUtils } from '../../../utils'
import { TableHeading, TableData } from '../dashboard/style'

const Desktop = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 10px;
  @media (max-width: 680px) {
    display: none;
  }
`

const Container = styled.div`
  border: 1px solid #d9d9d9;
  background: ${({ background }) => (background ? background : '#D9D9D9')};
  border-radius: 10px;
  flex: 1;
`

const HiringTable = ({ getContracts, contracts }) => {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    getContracts({ businessId: id, freelancerId: '', limit: 25, page: 1 })
  }, [])

  return (
    <>
      <Desktop>
        <Container background={'#FDFDFD'}>
          {contracts?.length ? (
            <table>
              <thead>
                <tr style={{}}>
                  <TableHeading
                    style={{
                      color: '#000',
                      textAlign: 'center',
                      fontFamily: 'Roboto',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      lineHeight: '24.5px' /* 153.125% */,
                      letterSpacing: '0.4px',
                      textTransform: 'uppercase'
                    }}>
                    Name
                  </TableHeading>
                  <TableHeading>RATE</TableHeading>
                  <TableHeading>POINTS</TableHeading>
                  <TableHeading>DEPARTMENT</TableHeading>
                  <TableHeading>HIRE DATE</TableHeading>
                  <TableHeading style={{ textAlign: 'right', paddingRight: '50px' }}>ACTIONS</TableHeading>
                </tr>
              </thead>
              <tbody>
                {contracts.map(row => {
                  return (
                    <tr key={row._id}>
                      <TableData>
                        {ConverterUtils.capitalize(
                          `${row?.freelancerId?.userId.FirstName} ${row?.freelancerId?.userId.LastName}`
                        )}
                      </TableData>
                      <TableData>{row.hourlyRate || 0}</TableData>
                      <TableData>{row.totalStoryPoints || 0}</TableData>
                      <TableData>{row.departmentId?.name || 'N/A'}</TableData>
                      <TableData>
                        {(row?.createdAt && ValidationUtils.formatDate(row?.createdAt)) ||
                          ValidationUtils.formatDate(row?.updatedAt || row?.updatedAt)}
                      </TableData>
                      <TableData
                        textTransform="lowercase"
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginRight: '10px',
                          textTransform: 'lowercase'
                        }}>
                        <Button
                          icon="largeExpand"
                          popoutWidth="220px"
                          noBorder
                          noUppercase
                          block
                          type="lightgrey"
                          fontSize="16px"
                          dropDownRight="-104px"
                          popout={[
                            {
                              text: 'Revoke Access',
                              onClick: () => {}
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
                          style={{
                            borderRadius: '3px',
                            border: '0.25px solid #000',
                            background: 'rgba(217, 217, 217, 0.28)',
                            zIndex: 'auto'
                          }}
                          iconRight>
                          Details
                        </Button>
                      </TableData>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '40px',
                paddingBottom: '40px'
              }}>
              <p>N/A</p>
            </div>
          )}
        </Container>
      </Desktop>
      <MobileProjectHires data={contracts} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    contracts: state.Contracts.contracts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getContracts: bindActionCreators(getContracts, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HiringTable)
