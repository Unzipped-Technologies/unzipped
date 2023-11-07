import React, { useEffect, useState } from 'react'
import {
  TitleText,
  DarkText,
} from '../style'
import { SearchBar } from '../../../ui';
import styled, { css } from 'styled-components';
import { FaRegCheckCircle } from 'react-icons/fa';

const Title = styled.div`
    display: flex;
    flex-flow: row;
    width: 70%;
    margin: 60px 15% 40px 15%;
`;
const Toggle = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 260px;
    height: 34px;
    background-color: #D8D8D8;
    border-radius: 5px;
    overflow: hidden;
`;
const Left = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 5px;
    height: 100%;
    width: 100%;
    background: ${({ displayFormat }) => !displayFormat ? '#5E99D4' : 'transparent'}
`;
const Right = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 5px;
    height: 100%;
    width: 100%;
    background: ${({ displayFormat }) => displayFormat ? '#5E99D4' : 'transparent'}
`;
const P = styled.p`
    font-size: ${({ fontSize }) => fontSize ? fontSize : '16px'};
    font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : ''};
    color: ${({ color }) => color ? color : 'black'};
    background: ${({ background }) => background ? background : ''};
    padding: ${({ padding }) => padding ? padding : ''};
    margin: ${({ margin }) => margin ? margin : ''};
    text-align: ${({ align }) => align ? align : ''};
    border-bottom: ${({ borderBottom }) => borderBottom ? borderBottom : ''};
    right: ${({ right }) => right ? right : ''};
    width: ${({ width }) => width ? width : ''};
`;
const TableTop = styled.div`
    padding : 20px 30px;
    border-radius: 10px 10px 0 0;
    display:flex;
    border: 1px solid #D9D9D9;
    background-color: rgba(217, 217, 217, 0.36);
    justify-content: space-between;
    width: 830px;
    align-self: center;
`;
const TableDiv = styled.div`
    text-align: -webkit-center;
    position: relative;
`;
const TableInnerDiv = styled.div`
    max-width:830px;
`;
const ButtonComp = styled.button`
    border:0;
    background:#1976D2;
    border-radius:5px;
    color:white;
    font-weight: 500;
    padding: 6px 22px;
    height: fit-content;
    align-self: center;
`;
const CustomTable = styled.table`
  width: 100%;
  thead{
    border: 1px solid #BBB;
  }
  tbody{
    border-bottom: 1px solid #BBB;
    border-right: 1px solid #BBB;
    border-left: 1px solid #BBB;
    tr:nth-child(even) {
      background-color: ${props =>
    !props.displayFormat ? '#F7F7F7' : ''};
    }
  }
  th:first-child{
    padding: 0 0 0 43px;
    width: 40%;
  }
  th:last-child{
    width: 25%
  }
  th:nth-child(3){
    width: 20%
  }
  th:nth-child(2){
    width: 15%
  }
  td:not(:first-child), th:not(:first-child) {
    text-align:center
  }
  ${props =>
    props.displayFormat &&
    css`

  td:first-child{
    paddling-left:43px;
    width: 40%;
  }
  td:last-child{
    width: 25%
  }
  td:nth-child(3){
    width: 20%
  }
  td:nth-child(2){
    width: 15%
  }
`}
  
  th {
    background: #F7F7F7;
    vertical-align: middle;
    text-align: left;

  }
`;
const HoursDiv = styled.div`
    position: absolute;
    right: 24px;
    top: 10px;
    width: 264px;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 24px 15px;
`;

function Invoice({ weekOptions, sortedData, handleWeekChange, take, handletake, handleFilter, projectName, userType }) {
  const [displayFormat, setDisplayFormat] = useState(false)
  const [rate, setRate] = useState(null);
  const [totalHours, setTotalHours] = useState(null);
  const [founderInvoice, setFounderInvoice] = useState({})
  var id = 0;
  var totalInvoiceOfFounder = 0;
  useEffect(() => {
    if (userType === 'Investor') {
      const rate = Object?.keys(sortedData)?.map((day) => {
        return sortedData[day]?.length > 0 ? sortedData[day]?.map((item) => item.rate) : [];
      }).flat().filter(item => item !== undefined);
      setRate(rate)
      const totalHours = Object.keys(sortedData).reduce((acc, day) => {
        return acc + sortedData[day].reduce((dayAcc, obj) => dayAcc + obj.hours, 0);
      }, 0);
      setTotalHours(totalHours)
    }
    else if (userType === 'Founder') {
      const result = {};
      for (const day in sortedData) {
        const dayData = sortedData[day];
        for (const item of dayData) {
          const userId = item.userId._id;
          const rate = item.rate;
          const hours = item.hours;
          if (result[userId]) {
            result[userId].rate = rate;
            result[userId].totalHours += hours;
            result[userId].name = item?.userId?.FirstName !== "" || item?.userId?.LastName !== "" ? item?.userId?.FirstName + " " + item?.userId?.LastName : "Anonymous";
          } else {
            result[userId] = {
              rate: rate,
              totalHours: hours,
              name: item?.userId?.FirstName !== "" || item?.userId?.LastName !== "" ? item?.userId?.FirstName + " " + item?.userId?.LastName : "Anonymous",
            };
          }
        }
      }
      setFounderInvoice(result)
    }
  }, [sortedData])

  const toggleDisplayFormat = () => {
    setDisplayFormat(!displayFormat)
  }
console.log(sortedData,"s")
  return (
    <>
      <Title>
        <TitleText title>INVOICE</TitleText>
        <Toggle>
          <Left displayFormat={displayFormat} onClick={toggleDisplayFormat}>
            <DarkText small>Day</DarkText>
          </Left>
          <Right displayFormat={displayFormat} onClick={toggleDisplayFormat}>
            <DarkText small>Week</DarkText>
          </Right>
        </Toggle>
      </Title>
      <SearchBar take={take} setTake={handletake} setFilter={handleFilter} />
      <div className='mb-5'>
        <TableDiv >
          <TableTop>
            <P margin='0px' fontSize='24px' fontWeight='500'>{projectName?.slice(0, 15)}{projectName?.length > 17 && '...'}</P>
            <select onChange={handleWeekChange} style={{ display: "block", border: "0", width: "fit-content", backgroundColor: "transparent" }}>
              {weekOptions.map((week, index) => (
                <option key={index} value={index}>
                  Week of {week.startOfWeek.toDateString()} - {week.endOfWeek.toDateString()}
                </option>
              ))}
            </select>
            <ButtonComp>SUBMIT</ButtonComp>
          </TableTop>
          {sortedData && Object?.keys(sortedData)?.map((day, index) => {
            return (
              <TableInnerDiv key={index}>
                <CustomTable displayFormat={displayFormat}>
                  {!displayFormat ? <thead>
                    <tr>
                      <th>{day} ({sortedData[day].reduce((acc, obj) => acc + obj.hours, 0)} HOURS)</th>
                      <th>RATE</th>
                      <th>TIME SPENT</th>
                      <th>ASIGNEE</th>
                    </tr>
                  </thead> : index === 0 &&
                  <thead>
                    <tr>
                      <th>TASK</th>
                      <th>RATE</th>
                      <th>TIME SPENT</th>
                      <th>ASIGNEE</th>
                    </tr>
                  </thead>}
                  <tbody>
                    {sortedData[day].length > 0 ? sortedData[day]?.map((item, itemIndex) => {
                      id = id + 1
                      return (
                        <tr key={itemIndex} className={displayFormat && id % 2 === 0 && 'bg-light'}>
                          <td>
                            <FaRegCheckCircle size={15} color={item.tagName.includes('In') ? '#FFA500' : item.tagName.includes('Done') ? '#198754' : '#D8D8D8'} />
                            <span className='px-3'>{item?.taskName}</span></td>
                          <td>${item?.rate}</td>
                          <td>{item?.hours}</td>
                          <td> <img src={item?.userId?.profileImage} style={{ width: "24px", height: "24px", borderRadius: "50%", marginRight: "6px" }} />{item?.userId?.FirstName !== "" || item?.userId?.LastName !== "" ? item?.userId?.FirstName + " " + item?.userId?.LastName : "Anonymous"}</td>
                        </tr>
                      )
                    }
                    ) : !displayFormat ?
                      <tr>
                        <td className='px-5'>No Records</td>
                      </tr>
                      : index === +Object.keys(sortedData).length - 1 && id == 0 &&
                      <tr>
                        <td className='px-5'>No Records</td>
                      </tr>
                    }
                  </tbody>
                </CustomTable>
              </TableInnerDiv>
            )
          }
          )
          }
          {userType === 'Investor' ? <HoursDiv>
            <div className='d-flex justify-content-between' style={{ borderBottom: "1px solid #777" }}>
              <P fontWeight='500'>DAY</P>
              <P fontWeight='500'>HOURS</P>
            </div>
            {sortedData && Object?.keys(sortedData)?.map((day, index) => {
              return (
                <div className='d-flex justify-content-between' >
                  <P fontWeight='500'>{day}</P>
                  <P fontWeight='500'>{sortedData[day].reduce((acc, obj) => acc + obj.hours, 0)}</P>
                </div>
              )
            })}
            <div className='d-flex justify-content-between' style={{ borderTop: "1px solid #777" }} >
              <P fontWeight='500'>RATE</P>
              {rate && <P fontWeight='500'>${rate[0]} /HOUR</P>}
            </div>
            <div className='d-flex justify-content-between' >
              <P fontWeight='500'>FEE</P>
              <P fontWeight='500'>$120.00</P>
            </div>
            <div className='d-flex justify-content-between' >
              <P fontWeight='500'>TOTAL</P>
              {totalHours && <P fontWeight='500'>${(+totalHours * +rate[0]).toLocaleString()} </P>}
            </div>
          </HoursDiv> :
            <HoursDiv>
              <div className='d-flex justify-content-between' style={{ borderBottom: "1px solid #777" }}>
                <P fontWeight='500'>Name</P>
                <P fontWeight='500'>Amount</P>
              </div>
              {founderInvoice && Object?.values(founderInvoice)?.map((user, index) => {
                totalInvoiceOfFounder += user?.rate * user?.totalHours;
                return (
                  <div className='d-flex justify-content-between' >
                    <P fontWeight='500'>{user?.name}</P>
                    <P fontWeight='500'>${user?.rate * user?.totalHours}</P>
                  </div>
                )
              })}
              <div className='d-flex justify-content-between' style={{ borderTop: "1px solid #777" }} >
                <P fontWeight='500'>Subtotal</P>
                {totalInvoiceOfFounder && <P fontWeight='500'>${totalInvoiceOfFounder.toLocaleString()}</P>}
              </div>
              <div className='d-flex justify-content-between' >
                <P fontWeight='500'>FEE</P>
                <P fontWeight='500'>$57.38</P>
              </div>
              <div className='d-flex justify-content-between' >
                <P fontWeight='500'>TOTAL</P>
                {totalInvoiceOfFounder && <P fontWeight='500'>${(57.38 + totalInvoiceOfFounder).toLocaleString()} </P>}
              </div>
            </HoursDiv>
          }
        </TableDiv>

      </div>
    </>
  )
}

export default Invoice