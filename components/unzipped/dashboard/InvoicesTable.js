import React from 'react'
import styled from 'styled-components'
import { updateBusiness } from '../../../redux/Business/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from '../../ui/Button'
import Invoices from './mobile/Invoices'
import { ConverterUtils } from '../../../utils'
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

const HiringTable = ({ data, loading, user }) => {
  const menus = [
    {
      text: 'Approve Invoice',
      onClick: () => {}
    },
    {
      text: 'View Details',
      onClick: () => {}
    },
    {
      text: 'View Profile',
      onClick: () => {}
    },
    {
      text: 'Archive Invoice',
      onClick: () => {}
    }
  ]

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
              <TableHeading>Dates</TableHeading>
              <TableHeading>Hours</TableHeading>
              <TableHeading>Status</TableHeading>
              <TableHeading>HIRE DATE</TableHeading>
              <TableHeading style={{ textAlign: 'right', paddingRight: '50px' }}>ACTIONS</TableHeading>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data?.map(row => (
                <tr key={row._id}>
                  <TableData>{ConverterUtils.capitalize(`${row.firstName} ${row.lastName}`)}</TableData>
                  <TableData>{row.dates}</TableData>
                  <TableData>{row.hours}</TableData>
                  <TableData>{row.status}</TableData>
                  <TableData>{row.hireDate}</TableData>
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
                      popout={menus}
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
      <Invoices />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateBusiness: bindActionCreators(updateBusiness, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(HiringTable)
