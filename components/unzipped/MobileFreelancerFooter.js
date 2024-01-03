import Link from 'next/link';
import React, { useState } from 'react';
import IconComponent from '../ui/icons/IconComponent';
import styled from 'styled-components';

const DarkOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const PopupContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 56px;
  padding: 20px 0px;
  background-color: white;
`;

const StyledButton1 = styled.button`
  width: 80%;
  height: 50px;
  border: 1px solid #E60379;
  background-color: #E60379;
  font-size: 16px;
  border-radius: 4px;
  color: white;
  margin-bottom: 0.5rem;
`;

const StyledButton2 = styled.button`
  width: 80%;
  border: 1px solid #E60379;
  color: #E60379;
  font-size: 16px;
  height: 50px;
  background-color: white;
  margin-bottom: 0.5rem;
`;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 56px;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: around;
  z-index: 1001;
`;

const FooterLink = styled.a`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isSelected }) => (isSelected ? '#F4F4F4' : 'transparent')};
  border-top: ${({ isSelected }) => (isSelected ? '2px solid #0057FF' : 'none')};
  height: 100%;
`;

const Container = styled.div`
    @media screen and (min-width: 600px){
        display: none;
    }
`;

function MobileFreelancerFooter({ defaultSelected = 'footerHome' }) {
  const [selected, setSelected] = useState(defaultSelected);
  const [showPopup, setShowPopup] = useState(false);

  const footerOptions = [
    { name: 'Dashboard', icon: 'footerHome', link: '/dashboard' },
    { name: 'Browse', icon: 'footerSearch', link: '/browse' },
    { name: 'Projects', icon: 'footerBag', link: '/dashboard/projects' },
    { name: 'Messages', icon: 'footerPeople', link: '/dashboard/inbox' },
    { name: 'Create', icon: 'footerPlus', link: '' },
    { name: 'Account', icon: 'footerMenu', link: '/dashboard/account' }
  ];

  const handleIconClick = (e, option) => {
    if (option.name === 'Create') {
      e.preventDefault();
      setShowPopup(true);
    }
    setSelected(option.name);
  }

  return (
    <>
      <Container>
        <DarkOverlay show={showPopup} onClick={() => setShowPopup(false)}>
          <PopupContainer>
            <StyledButton1>Post a Project</StyledButton1>
            <StyledButton2>Quote</StyledButton2>
          </PopupContainer>
        </DarkOverlay>

        <FooterContainer>
          {
            footerOptions.map((option, index) => (
              <Link key={index} href={option.link} passHref>
                <FooterLink
                  isSelected={option.name === selected}
                  onClick={(e) => handleIconClick(e, option)}>
                  <IconComponent
                    name={option.icon}
                    width={option.icon === 'footerMenu' ? "30" : "24"}
                    height="20"
                    viewBox={`0 0 ${option.icon === 'footerMenu' ? "30" : "24"} 20`}
                    fill={option.name === selected ? "#0057FF" : "black"}
                  />
                </FooterLink>
              </Link>
            ))
          }
        </FooterContainer>
      </Container>
    </>
  );
}

export default MobileFreelancerFooter;
