import React from 'react';
import styled from 'styled-components';
import { stripeBrandsEnum, stripeLogoEnum } from '../../../server/enum/paymentEnum'

const StyledTable = styled.div`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const TableHeader = styled.div`
  display: flex;
  background-color: #f2f2f2;
  padding: 10px;
  font-weight: bold;
`;

const TableRow = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.div`
  flex: ${({ isTotalColumn }) => isTotalColumn ? '0.5' : '1'};
  text-align: left;
  padding-right: 10px;
  &:last-child {
    padding-right: 0;
  }
  @media (max-width: 600px) {
    display: ${({clearMobile}) => clearMobile ? 'none' : 'flex'};
  }
`;

// Responsive adjustments for mobile view
const MobileHide = styled.span`
  @media (max-width: 600px) {
    display: none;
  }
`;

const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

const CardImage = styled.img`
  margin: 4px 6px 4px 0px;
`;

const getCardLogoUrl = (cardType) => {
    const brand = Object.keys(stripeBrandsEnum).find(key => stripeBrandsEnum[key] === cardType);
    return stripeLogoEnum[brand];
};

const InvoiceTable = ({ invoices }) => {
  return (
    <StyledTable>
      <TableHeader>
        <TableCell isTotalColumn>Date</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Payment Method</TableCell>
        <TableCell clearMobile><MobileHide>Pay Period</MobileHide></TableCell>
        <TableCell clearMobile>Subtotal</TableCell>
        <TableCell isTotalColumn>Total</TableCell>
      </TableHeader>
      {invoices.map((invoice, index) => (
        <TableRow key={index}>
          <TableCell isTotalColumn>{invoice?.date}</TableCell>
          <TableCell>Invoice by {invoice?.description}</TableCell>
          <TableCell>
            <PaymentMethod>
                <CardImage height={20} src={getCardLogoUrl(invoice?.card)} />
              •••• •••• {invoice?.cardLastFour}
            </PaymentMethod>
          </TableCell>
          <TableCell clearMobile><MobileHide>{invoice?.payPeriod}</MobileHide></TableCell>
          <TableCell clearMobile><MobileHide>{invoice?.subtotal}</MobileHide></TableCell>
          <TableCell isTotalColumn>{invoice?.total}</TableCell>
        </TableRow>
      ))}
    </StyledTable>
  );
};

export default InvoiceTable;
