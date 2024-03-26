import React from 'react';
import styled from 'styled-components';

const LogosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #F6F8FB;
  padding: 20px 0;
  gap: 20px;
  width: 100vw;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const LogoImage = styled.img`
  max-height: 50px;
  max-width: 100px;
  margin: 0px 25px;
  filter: grayscale(100%);

  @media (max-width: 768px) {
    max-height: 40px;
    max-width: 80px;
    margin: 0px 5px;
  }
  @media (max-width: 580px) {
    margin: 0px 15px;
  }
  @media (max-width: 383px) {
    margin: 0px 10px;
  }
  @media (max-width: 343px) {
    margin: 0px 5px;
  }
  @media (max-width: 303px) {
    margin: 0px 0px;
  }

  @media (max-width: 480px) {
    max-height: 30px;
    max-width: 60px;
    &:nth-last-child(-n+0) {
      display: none;
    }
  }
`;

const ClientLogosBar = ({ urls }) => {
  return (
    <LogosContainer>
      {urls.map((url, index) => (
        <LogoImage key={index} src={url} alt={`Client logo ${index + 1}`} />
      ))}
    </LogosContainer>
  );
};

export default ClientLogosBar;
