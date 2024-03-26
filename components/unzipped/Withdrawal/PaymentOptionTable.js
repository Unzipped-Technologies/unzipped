import React from 'react';
import styled from 'styled-components';

const Table = styled.div`
  width: 100%;
  margin-top: 0px;
`;

const TableHeader = styled.div`
  background-color: #007bff;
  color: white;
  display: flex;
  text-align: left;
  padding: 10px 15px;
`;

const TableRow = styled.div`
  display: flex;
  background-color: #f9f9f9;
  &:nth-child(even) {
    background-color: #ffffff;
  }
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.div`
  text-align: left;
  padding-right: 15px;
  flex-grow: ${({ isDescription }) => isDescription ? '1' : '0'};
  flex-shrink: ${({ isDescription }) => isDescription ? '1' : '0'};
  flex-basis: ${({ isDescription }) => isDescription ? '0' : 'auto'};
  min-width: ${({ isMethod, isFee }) => isMethod ? '160px' : isFee ? '50px' : '0'}; // Set a min-width for first and last column
  
  &:first-child {
    padding-right: 15px;
  }

  &:last-child {
    padding-right: 0;
    margin-left: auto;
    white-space: nowrap; // Ensure the fee does not wrap
  }
`;

const MethodTitle = styled(TableCell)`
  font-weight: bold;
`;

const WithdrawalMethodsTable = () => {
    const withdrawalMethods = [
        {
          method: 'Express Withdrawal',
          description: 'The fastest method to withdraw funds, directly to your local bank account! Available in selected countries only.',
          fee: 'No Fee'
        },
        {
          method: 'Payoneer',
          description: 'Withdraw funds to your bank via payoneer',
          fee: '1.5%'
        },
        {
          method: 'Wire Transfer',
          description: 'Withdraw funds directly to your bank account. For countries where express withdrawal is unavailable.',
          fee: 'Fees vary'
        },
        {
          method: 'Freelancer Debit Card',
          description: 'Withdraw funds to your Freelancer Debit Card - usable wherever MasterCard is accepted.',
          fee: 'No Fee'
        },
      ];

  return (
    <Table>
      <TableHeader>
        <MethodTitle isMethod>Method</MethodTitle>
        <MethodTitle isDescription>Description</MethodTitle>
        <MethodTitle isFee>Fee</MethodTitle>
      </TableHeader>
      {withdrawalMethods.map((method, index) => (
        <TableRow key={index}>
          <TableCell isMethod>{method.method}</TableCell>
          <TableCell isDescription>{method.description}</TableCell>
          <TableCell isFee>{method.fee}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

export default WithdrawalMethodsTable;
