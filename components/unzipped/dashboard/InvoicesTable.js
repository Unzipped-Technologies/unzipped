import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as moment from 'moment'
import styled from 'styled-components'
import { getInvoices, updateInvoice } from '../../../redux/Invoices/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from '../../ui/Button'
import MobileInvoicesView from './mobile/MobileInvoicesView'
import { ConverterUtils, ValidationUtils } from '../../../utils'
import { TableHeading, TableData } from '../dashboard/style'

const Desktop = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  @media (max-width: 680px) {
    display: none;
  }
`

const InvoicesTable = ({ invoices, getInvoices, updateInvoice, role, selectedWeek }) => {
  console.log('selectedWeekselectedWeek', selectedWeek)
  const router = useRouter()
  const { id } = router.query

  const approveInvoice = async invoiceId => {
    await updateInvoice(invoiceId, { isApproved: true })
  }

  const archiveapproveInvoice = async invoiceId => {
    await updateInvoice(invoiceId, { isArchived: true })
  }

  const menus = rowData => {
    if (role === 1) {
      return [
        {
          text: 'View Details',
          onClick: () => {
            router.push(`/dashboard/projects/client/invoice/${rowData.businessId}`)
          }
        }
      ]
    } else {
      return [
        {
          text: 'Approve Invoice',
          onClick: () => {
            approveInvoice(rowData._id)
          }
        },
        {
          text: 'View Details',
          onClick: () => {
            router.push(`/dashboard/projects/client/invoice/${rowData.businessId}`)
          }
        },
        {
          text: 'View Profile',
          onClick: () => {
            if (rowData?.freelancerId) router.push(`/freelancers/${rowData.freelancerId}`)
          }
        },
        {
          text: 'Archive Invoice',
          onClick: () => {
            archiveapproveInvoice(rowData._id)
          }
        }
      ]
    }
  }

  useEffect(() => {
    getInvoices({ businessId: id, limit: 'all', page: 1 })
  }, [])

  return (
    <>
      <Desktop>
        <table
          style={{
            borderRadius: '10px',
            border: '1px solid #D9D9D9',
            background: 'rgba(255, 255, 255, 0.36)'
          }}>
          <thead>
            <tr style={{}}>
              {role !== 1 && (
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
                  NAME
                </TableHeading>
              )}
              <TableHeading>Dates</TableHeading>
              {role === 1 && (
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
                  PROJECT
                </TableHeading>
              )}
              <TableHeading>HOURS</TableHeading>
              <TableHeading>STATUS</TableHeading>
              <TableHeading>HIRE DATE</TableHeading>
              <TableHeading style={{ textAlign: 'right', paddingRight: '50px' }}>ACTIONS</TableHeading>
            </tr>
          </thead>
          <tbody>
            {invoices?.length > 0 &&
              invoices?.map(row => (
                <tr key={row._id}>
                  {role !== 1 && (
                    <TableData>
                      {ConverterUtils.capitalize(`${row?.user?.FirstName} ${row?.user?.LastName}`) ||
                        row?.user?.FullName}
                    </TableData>
                  )}
                  <TableData>
                    {' '}
                    {moment(moment(row?.contract?.[0]?.createdAt).startOf('isoWeek')).format('MM-DD-YYYY')} -{' '}
                    {moment(moment(row?.contract?.[0]?.createdAt).endOf('isoWeek')).format('MM-DD-YYYY')}
                  </TableData>
                  {role === 1 && (
                    <TableData>{ConverterUtils.capitalize(`${row?.businesses?.name}`) || 'Project Name'}</TableData>
                  )}
                  <TableData>{row.hoursWorked}</TableData>
                  <TableData>
                    {row.isPaid ? 'Paid' : row.isApproved ? 'Approved' : row.isActive ? 'Active' : 'Pending'}
                  </TableData>
                  <TableData>
                    {(row?.contract?.[0]?.createdAt && ValidationUtils.formatDate(row?.contract?.[0]?.createdAt)) ||
                      ValidationUtils.formatDate(row?.contract?.[0]?.updatedAt || row?.contract?.[0]?.updatedAt)}
                  </TableData>
                  <td
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
                      dropDownRight="-103px"
                      popout={menus(row)}
                      style={{
                        borderRadius: '3px',
                        border: '0.25px solid #000',
                        background: 'rgba(217, 217, 217, 0.28)',
                        zIndex: 'auto'
                      }}
                      iconRight>
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Desktop>
      <MobileInvoicesView role={role} invoices={invoices} selectedWeek={selectedWeek} />
    </>
  )
}

const mapStateToProps = state => {
  return {
    invoices: state.Invoices.invoices,
    role: state.Auth.user.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInvoices: bindActionCreators(getInvoices, dispatch),
    updateInvoice: bindActionCreators(updateInvoice, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesTable)
