import {
    TableRowStyled,
    TableCellStyled,
} from './styled';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

const PaymentDataTable = ({ currentEmployeeData }) => {
    return (
        <Table>
            <TableHead>
                <TableRowStyled>
                    <TableCellStyled>NAME</TableCellStyled>
                    <TableCellStyled>RATE</TableCellStyled>
                    <TableCellStyled>Hour LIMIT / WEEKLY</TableCellStyled>
                    <TableCellStyled>CURRENT BALANCE</TableCellStyled>
                </TableRowStyled>
            </TableHead>
            <TableBody>
                {currentEmployeeData && currentEmployeeData.map((item, index) => (
                    <TableRowStyled style={{ borderBottom: 'none' }}>
                        <TableCellStyled>{item.name}</TableCellStyled>
                        <TableCellStyled>{item.rate}</TableCellStyled>
                        <TableCellStyled>{item.hoursLimit}</TableCellStyled>
                        <TableCellStyled>{item.currentBalance}</TableCellStyled>
                    </TableRowStyled>
                ))}
            </TableBody>
        </Table>
    )
}

export default PaymentDataTable;