import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { 
    CloseIcon,
    DownIcon,
} from '../../icons'
// import { Button } from '../../ui'
import { useRouter } from 'next/router'

const Logo = styled.img`
  max-width: 215px;
  margin-right: 8rem;
  margin-left: 1rem;
  @media (max-width: 1534px) {
    margin-right: 4rem;
  }
  @media (max-width: 1346px) {
    margin-right: 2rem;
  }
  @media (max-width: 1208px) {
    max-width: 205px;
  }
  @media (max-width: 1208px) {
    margin-right: 0.5rem;
    max-width: 170px;
  }
  @media (max-width: 1208px) {
    margin-right: 0.5rem;
    max-width: 170px;
  }
  @media (max-width: 286px) {
    max-width: 150px;
  }
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 99;
    @media (max-width: 680px) {
        display: none;
      }
`;

const Header = styled.div`
    padding: 7px 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(216, 216, 216);
`;

const TopButton = styled.button`
    width: 100%;
    border-color: #000;
    border-radius: 32px;
    height: 50px;
    background: white;
    outline: none;
    color: black;
`;

const BottomButton = styled.button`
    height: 50px;
    width: 100%;
    border-radius: 32px;
    color: white;
    background-color: black;
`;

const Footer = styled.div`
    position: fixed;
    bottom: 0px;
    border-top: 1px solid rgb(216, 216, 216);
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    height: 150px;
    padding: 20px;
    background-color: #fff;
`;

const ItemContainer = styled.div`
    max-height: calc(100vh - 228px);
    overflow: auto;
    padding-bottom: 20px;
`;

const Row = styled.div`
    padding: 7px 20px;
    display: flex;
    align-items: center;
    font-size: 49px;
    justify-content: space-between;
    color: #333;
`;
const Title = styled.h5``;
const Box = styled.div`
  cursor: pointer;
`;

const SubContainer = styled.div`
  border-left: #E4E4E6 1px solid;
  margin-left: 24px;
  margin-top: 10px;
`;
const SubTitle = styled.div`
    font-size: 20px;
    padding-left: 10px;
    cursor: default;
`;

const SubHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-left: 15px;
`;

const Icon = styled.div`
  transform: ${({ selected }) => (selected ? 'scaleY(-1)' : 'scaleY(1)')};
  padding-bottom: ${({ selected }) => (selected ? '10px' : '0px')};
`;

const SubItem = styled.div`
    padding: 10px 15px 10px 35px;
    cursor: ${({sub}) => sub ? 'default' : 'pointer'};
    &:focus {
        background: ${({sub}) => sub ? '#fff' : '#d8d8d8'};
        border-radius: 12px;
    }
    &:hover {
        background: ${({sub}) => sub ? '#fff' : '#d8d8d8'};
        border-radius: 12px;
    }
`;

const SubItemTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;
const SubItemDescription = styled.div`
  font-size: 16px;
  padding-top: ${({sub}) => sub ? '8px' : '0px'};
`;

const WikiContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 10px 5px;
    &:focus {
        background: #d8d8d8;
        border-radius: 12px;
    }
    &:hover {
        background: #d8d8d8;
        border-radius: 12px;
    }
`;

const WikiTextBox = styled.div`
  padding-left: 10px;
`;

const WikiTitle = styled.div`
  font-weight: 600;
`;
const WikiSubTitle = styled.div``;

const FooterScroll = styled.div`
  height: 130px;
`;

const LargeScreenDropdown = ({menuItems, onClose, isAuth = false, logoutUser, startAProject}) => {
    const router = useRouter()
    const [selected, setSelected] = useState(false)

    const linkPush = (link) => {
        router.push(link)
    }
    return (
        <Container>
            <Header>
                <div onClick={onClose}>
                    <CloseIcon />
                    <Logo src="/img/Unzipped-Primary-Logo.png" alt="logo" />                    
                </div>
            </Header>
            <ItemContainer>
            {menuItems.map((item, index) => {
                return (
                    <Box key={item.name + index}>
                        <Row onClick={() => setSelected(selected === item.name ? false : item.name)}>
                            <Title onClick={() => !item?.subItems && item?.link && linkPush(item.link)}>{item.name}</Title>
                            {item?.subItems && item?.subItems.length && (
                                <Icon selected={selected === item.name}>
                                    <DownIcon width='15' height='9' color={selected === item.name ? '#DE4E4E' : '#333'}/>
                                </Icon>
                            )}
                        </Row>
                        {selected === item.name && item?.subItems && item?.subItems.length && (
                            <SubContainer>
                                <SubHeader>
                                    {item.subIcon}
                                    <SubTitle>{item.subTitle}</SubTitle>
                                </SubHeader>
                                {item.subItems.map((sub, index) => {
                                    return (
                                        <SubItem key={sub.name + index} onClick={() => typeof sub.sub === 'string' && linkPush(sub.link)}  sub={!(typeof sub.sub === 'string')}>
                                            <SubItemTitle>
                                                {sub.name}
                                            </SubItemTitle>
                                            <SubItemDescription sub={!(typeof sub.sub === 'string')}>
                                                {typeof sub.sub === 'string' ? sub.sub : sub.sub.map((element, index) => {
                                                    return (
                                                        <WikiContainer key={element.name + index} onClick={() => linkPush(element.link)}>
                                                            {element.icon}
                                                            <WikiTextBox>
                                                                <WikiTitle>
                                                                    {element.name}
                                                                </WikiTitle>
                                                                <WikiSubTitle>
                                                                    {element.sub}
                                                                </WikiSubTitle>
                                                            </WikiTextBox>
                                                        </WikiContainer>
                                                    )
                                                })}
                                            </SubItemDescription>
                                        </SubItem>
                                    )
                                })}
                            </SubContainer>
                        )}
                    </Box>
                )
            })}
            </ItemContainer>
            <FooterScroll />
            <Footer>
                {isAuth ? (
                    <TopButton extraWide={true} onClick={logoutUser}>Log Out</TopButton>
                ) : (
                    <TopButton onClick={() => linkPush('/login')} extraWide={true}>Log In</TopButton>
                )}
                <BottomButton onClick={startAProject} extraWide={true}>Start A Project</BottomButton>
            </Footer>
        </Container>
    )
}

export default LargeScreenDropdown

