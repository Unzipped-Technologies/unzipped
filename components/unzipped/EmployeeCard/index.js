import React from 'react'
import styled from 'styled-components'
import { ValidationUtils } from '../../../utils';

const Container = styled.div`
    width: 100%;
    border: solid 1px #333;
    border-radius: 5px;
`;

const LeftBox = styled.div``;
const RightBox = styled.div``;

const Table = styled.div`
    padding: 15px 5px;
`;

const RowTitle = styled.div`
    text-align: center;
    min-width: 130px;
    font-weight: 600;
`;

const RowItem = styled.div`
    text-align: center;
    min-width: 130px;
`;
const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    padding: 10px 15px;
`;
const SubTitle = styled.div`
    font-size: 16px;
    padding: 0px 15px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 450px;
    padding: 2px 0px;
`;

const EmployeeCard = ({contracts = []}) => {
    return (
        <Container>
            <LeftBox>
                <Title>Amount Due</Title>
                <SubTitle>Current Employees</SubTitle>
                <Table>
                    <Row>
                        <RowTitle>Name</RowTitle>
                        <RowTitle>Rate</RowTitle>
                        <RowTitle>Hour Limit / week</RowTitle>
                        <RowTitle>Current Balance</RowTitle>
                    </Row>
                    {contracts.map((item, index) => {
                        return (
                            <Row key={index}>
                                <RowItem>{ValidationUtils._toUpper(item?.freelancerId?.userId?.FullName)}</RowItem>
                                <RowItem>${item.hourlyRate}.00</RowItem>
                                <RowItem>{item.hoursLimit}</RowItem>
                                <RowItem>${0}.00</RowItem>
                            </Row>
                        )
                    })}
                </Table>
            </LeftBox>
        </Container>
    )
}

export default EmployeeCard