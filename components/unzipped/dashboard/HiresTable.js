import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'

import Button from '../../ui/Button'
import MobileProjectHires from './mobile/MobileProjectHires'
import { TableHeading, TableData } from '../dashboard/style'
import { getContracts, revokeAccess } from '../../../redux/Contract/actions'
import { ConverterUtils, ValidationUtils } from '../../../utils'

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
  background: ${({ background }) => '#FDFDFD'};
  border-radius: 10px;
  flex: 1;
`

const HiringTable = ({ getContracts, contracts }) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const activeContract = useSelector(state => state.Contracts);
  
  const { id } = router.query
  useEffect(() => {
    async function fetchData() {
      await getContracts({ businessId: id, freelancerId: '', limit: 25, page: 1 })
    }
    fetchData()
  }, [])

  useEffect(() => {
    if(activeContract.isAccessRevoked){
      getContracts({ businessId: id, freelancerId: '', limit: 25, page: 1 })
    }
  }, [activeContract.isAccessRevoked])

  const handleRevoke = (contractId, businessId) => {
    dispatch(revokeAccess(contractId))
  };

  return (
    <>
      {window?.innerWidth > 680 ? (
        <Desktop>
          <Container>
            {contracts?.length ? (
              <table>
                <thead data-testid="hires_table_header">
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
                <tbody data-testid="hires_table_body">
                  {contracts.map(row => {
                    return (
                      <tr key={row._id} data-testid={row?._id}>
                        <TableData>
                          {ConverterUtils.capitalize(
                            `${row?.freelancerId?.userId.FirstName} ${row?.freelancerId?.userId.LastName}`
                          )}
                        </TableData>
                        <TableData>{row.hourlyRate || 0}</TableData>
                        <TableData>{row.totalStoryPoints || 0}</TableData>
                        <TableData>{row.departmentId?.name || '-'}</TableData>
                        <TableData>
                          {(row?.createdAt && ValidationUtils.formatDate(row?.createdAt)) ||
                            ValidationUtils.formatDate(row?.updatedAt)}
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
                                onClick: () => {
                                  handleRevoke(row?._id, id)
                                }
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
                                onClick: () => {
                                  router.push(
                                    `/dashboard/projects/client/invoice/${row.businessId}?tab=invoices&freelancer=${row?.freelancerId?._id}`
                                  )
                                }
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
                <p>Hire someone for this project to begin working!</p>
              </div>
            )}
          </Container>
        </Desktop>
      ) : (
        <MobileProjectHires data={contracts} />
      )}
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
