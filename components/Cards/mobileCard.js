import React from 'react';
import styled from 'styled-components';
import { LongArrow } from '../icons';

const CardWrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.25);
  svg {
    color: #1872EC;
  }
`;

const CardTitle = styled.h1`
  font-size: 30px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  margin-bottom: 15px;
  @media(max-width: 450px) {
    font-size: 22px;
    margin-bottom: 5px;
  }
`;

const CardSubText = styled.p`
  font-size: 24px;
  margin: 0;
  padding: 0;
  @media(max-width: 600px) {
    font-size: 14px;
  }
`;

function MobileCard({ title, subText }) {
  return (
    <CardWrapper>
      <div>
        <CardTitle>{title}</CardTitle>
        <CardSubText>{subText}</CardSubText>
      </div>
      <LongArrow color="#1872EC" />
    </CardWrapper>
  );
}

export default MobileCard;
