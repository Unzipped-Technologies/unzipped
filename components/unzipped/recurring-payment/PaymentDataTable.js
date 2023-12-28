import { TableRowStyled, TableCellStyled } from './styled'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'

const PaymentDataTable = ({ currentEmployeeData }) => {
  return (
    <Table>
      <TableHead>
        <TableRowStyled>
          <TableCellStyled align="left">NAME</TableCellStyled>
          <TableCellStyled align="center">RATE</TableCellStyled>
          <TableCellStyled align="center">Hour LIMIT / WEEKLY</TableCellStyled>
          <TableCellStyled align="center">CURRENT BALANCE</TableCellStyled>
        </TableRowStyled>
      </TableHead>
      <TableBody>
        {currentEmployeeData &&
          currentEmployeeData.map((item, index) => (
            <TableRowStyled style={{ borderBottom: 'none' }}>
              <TableCellStyled align="left">{item.name}</TableCellStyled>
              <TableCellStyled align="center">{item.rate}</TableCellStyled>
              <TableCellStyled align="center">{item.hoursLimit}</TableCellStyled>
              <TableCellStyled align="center">{item.currentBalance}</TableCellStyled>
            </TableRowStyled>
          ))}
      </TableBody>
    </Table>
  )
}

export default PaymentDataTable
