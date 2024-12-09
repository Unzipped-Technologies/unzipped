import React, { useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'

import Button from '../../ui/Button'
import { TableHeading, TableData } from './style'
import { ConverterUtils, ValidationUtils } from '../../../utils'
import { getInvoices, updateInvoice } from '../../../redux/Invoices/actions'

const DesktopInvoicesTable = ({ invoices, getInvoices, updateInvoice }) => {
  const router = useRouter()
  const { id } = router.query

  const approveInvoice = async invoiceId => {
    await updateInvoice(invoiceId, { status: 'approved' })
    await getInvoices({ businessId: id, limit: 'all', page: 1 })
  }

  const archiveapproveInvoice = async invoiceId => {
    await updateInvoice(invoiceId, { status: 'archived' })
    await getInvoices({ businessId: id, limit: 'all', page: 1 })
  }

  const menus = rowData => {
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
          router.push(`/dashboard/projects/client/invoice/${rowData.businessId}?tab=invoices&invoice=${rowData._id}`)
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

  useEffect(() => {
    async function fetchData() {
      await getInvoices({ businessId: id, limit: 'all', page: 1 })
    }
    fetchData()
  }, [])

  return (
    <>
      <table
        style={{
          borderRadius: '10px',
          border: '1px solid #D9D9D9',
          background: 'rgba(255, 255, 255, 0.36)'
        }}>
        <thead data-testid="project_invoices_table_header" id="project_invoices_table_header">
          <tr>
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
            <TableHeading>Dates</TableHeading>

            <TableHeading>HOURS</TableHeading>
            <TableHeading>STATUS</TableHeading>
            <TableHeading>HIRE DATE</TableHeading>
            <TableHeading style={{ textAlign: 'right', paddingRight: '50px' }}>ACTIONS</TableHeading>
          </tr>
        </thead>
        <tbody data-testid="project_invoices_table_body">
          {invoices?.length > 0 &&
            invoices?.map(row => (
              <tr key={row._id} data-testid={row?._id} id={row?._id}>
                <TableData>
                  {ConverterUtils.capitalize(
                    `${row?.freelancer?.user?.FirstName} ${row?.freelancer?.user?.LastName}`
                  ) || row?.freelancer?.user?.FullName}
                </TableData>
                <TableData>
                  {`${moment(moment(row?.createdAt).startOf('isoWeek')).format('MM-DD-YYYY')} - ${moment(
                    moment(row?.createdAt).endOf('isoWeek')
                  ).format('MM-DD-YYYY')}`}
                </TableData>

                <TableData>{row.hoursWorked}</TableData>
                <TableData>{ConverterUtils.capitalize(`${row.status}`)}</TableData>
                <TableData>
                  {(row?.contract?.createdAt && ValidationUtils.formatDate(row?.contract?.createdAt)) ||
                    ValidationUtils.formatDate(row?.contract?.updatedAt || row?.contract?.updatedAt)}
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
    </>
  )
}

const mapStateToProps = state => {
  return {
    invoices: state.Invoices.invoices
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInvoices: bindActionCreators(getInvoices, dispatch),
    updateInvoice: bindActionCreators(updateInvoice, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesktopInvoicesTable)
