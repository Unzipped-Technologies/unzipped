import React, { useEffect } from 'react'
import Head from "next/head"
import Image from '../components/ui/Image'
import Text from '../components/ui/Text'
import Title from '../components/ui/Title'
import News from '../components/unzipped/NewsletterSignup'
import Nav from '../components/unzipped/header'
import Button from '../components/ui/Button'
import Action from '../components/ui/Action'
import BlogFeature from '../components/ui/BlogFeature'
import BlogList from '../components/ui/BlogList'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNews } from '../redux/actions'

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: column;
    width: 100%;
`;

const BasicNav = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    width: 100%;
    padding: 15px 30px;
    @media(max-width: 973px) {
        display: none;
    }
`;

const MobileNav = styled.div`
    display: none;
    @media(max-width: 973px) {
        display: flex;
    }
`;

const MenuItems = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: space-around;
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-flow: row;
    align-items: center;
    padding: 40px;
    @media(max-width: 950px) {
        flex-flow: column;
        padding: 0px 20px;
        align-items: flex-start;
    }
    @media(max-width: 767px) {
        flex-flow: column;
        padding: 15px 20px;
        align-items: center;
    }
`;

const RightMenu = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
`;

const Logo = styled.img`
    max-width: 215px;
    margin-right: 8rem;
    margin-left: 1rem;
    @media(max-width: 1534px) {
        margin-right: 4rem;
    }
    @media(max-width: 1346px) {
        margin-right: 2rem;
    }
    @media(max-width: 1208px) {
        max-width: 205px;
    }
    @media(max-width: 1208px) {
        margin-right: 0.5rem;
        max-width: 170px;
    }
    @media(max-width: 1208px) {
        margin-right: 0.5rem;
        max-width: 170px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    padding: 0px 40px;
    height: 45px;
`;

const Left = styled.div`
    max-width: 540px;
    margin-left: 5%;
    margin-bottom: 175px;
    @media(max-width: 1291px) {
        margin-bottom: 0px;
        margin-left: 10px;
        position: relative;
        top: 75px;
    }
    @media(max-width: 1191px) {
        top: 35px;
    }
    @media(max-width: 950px) {
        top: 35px;
    }
    @media(max-width: 425px) {
        h1 {
            font-size: 26px;
            line-height: 30px;
            max-width: 315px;
            margin: 40px 0 10px 0;
        }
        p {
            margin-bottom: 0px;
        }
    }
`;

const NewsContainer = styled.div`
    margin: 15px 0px;
    @media(max-width: 420px) {
        position: relative;
        bottom: 30px;
        margin: 10px 0px;
        margin-top: 55px;
    }
`;

const ImageLarge = styled.div`
    @media(max-width: 1449px) {
        display: none;
    }
`;

const ImageMedium = styled.div`
    display: none;
    @media(max-width: 1449px) {
        display: flex;
    }
    @media(max-width: 1291px) {
        display: none;
    }
`;

const ImageTablet = styled.div`
    display: none;
    @media(max-width: 1291px) {
        display: flex;
    }
    @media(max-width: 1191px) {
        display: none;
    }
`;

const ImageTabletSmall = styled.div`
    display: none;
    @media(max-width: 1191px) {
        display: flex;
    }
    @media(max-width: 950px) {
        display: none;
    }
`;

const ImageMobile = styled.div`
    display: none;
    @media(max-width: 950px) {
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 90px;
    }
    @media(max-width: 482px) {
        display: none;
    }
`;

const ImageMobileSmall = styled.div`
    display: none;
    @media(max-width: 482px) {
        display: flex;
        width: 100%;
        justify-content: center;
        margin-top: 90px;
    }
`;

const SectionOne = styled.div`
    display: flex;
    max-width: 100%;
    justify-content: center;
    margin: 40px;
`;

const ArticleSection = styled.div`
    display: grid;
    grid-template-columns: 4fr 5fr;
    max-width: 1200px;
    justify-content: center;
    @media(max-width: 999px) {
        grid-template-columns: 1fr;
    }
`;

const MobileBlog = styled.div`
    display: none;
    @media(max-width: 355px) {
        display: flex;
        flex-flow: column;
    }
`;

const Footer = styled.div`
    background: #192733;
    color: #fff;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 192px;
    div {
        font-weight: 400;
        max-width: 235px;
        text-align: center;
    }
    p {
        max-width: 585px;
    }
    @media(max-width: 620px) {
        p {
            font-size: 16px;
            max-width: 530px;
        }
    }
    @media(max-width: 542px) {
        p {
            font-size: 14px;
            max-width: 480px;
        }
    }
    @media(max-width: 487px) {
        p {
            font-size: 12px;
            max-width: 320px;
            text-align: center;
        }
    }
    @media(max-width: 487px) {
        p {
            max-width: 280px;
        }
        div {
            font-size: 14px;
        }
    }
`;
const Links = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const items = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'About us',
        link: '/'
    },
    {
        name: 'Newsletter',
        link: '/newsletter'
    },
]
    

const LandingPage = ({news, getNews}) => {
    const router = useRouter();
    useEffect(() => {
        getNews()
    }, [])
    console.log(news)
    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <title>Newsletter | Unzipped</title>
            <meta name="Newsletter | Unzipped" content="Experience the next generation of car care. We offer valet car wash, interior, and exterior car detailing. Done on your car's time, not yours. Book, drop, enjoy."/>
            </Head>
            <Container>
                <BasicNav>
                    <Link href="/" ><Logo src='/img/Unzipped-Primary-Logo.png' alt='logo'/></Link>
                    <RightMenu>
                        <MenuItems>
                            {items.map((item, index) => (
                                <Link href={item?.link} key={index}><Text color="#868686" padding="10px 40px">{item.name}</Text></Link>
                            ))}
                        </MenuItems>
                        <ButtonContainer>
                            <Button type="red" onClick={() => router.push('/register')} noOutline noBorder oval>Get Started</Button>                    
                        </ButtonContainer>                    
                    </RightMenu>
                </BasicNav>
                <MobileNav>
                    <Nav></Nav>
                </MobileNav>
                <Content>
                    <Left>
                        <Title level={1} color="#404041">Get Smarter on Business and Tech</Title>
                        <Text level={4} color="#868686">Get the weekly email that makes reading 
                        the news enjoyable. Stay informed and
                        get the latest trends, for free.</Text>
                        <NewsContainer>
                            <News small/>                            
                        </NewsContainer>

                    </Left>
                    <ImageLarge>
                        <Image width="50vw" src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1676089022/Hero_Image_uezpts.png" />                           
                    </ImageLarge>
                    <ImageMedium>
                        <Image width="40vw" src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1676089022/Hero_Image_uezpts.png" />                           
                    </ImageMedium>
                    <ImageTablet>
                        <Image width="50vw" src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1676095276/Illustration_bomxeb.png" />                           
                    </ImageTablet>
                    <ImageTabletSmall>
                        <Image width="35vw" src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1676095276/Illustration_bomxeb.png" />                           
                    </ImageTabletSmall>
                    <ImageMobile>
                        <Image width="400px" src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1676089022/Hero_Image_uezpts.png" />                           
                    </ImageMobile>
                    <ImageMobileSmall>
                        <Image width="260px" src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1676089022/Hero_Image_uezpts.png" />                           
                    </ImageMobileSmall>
                  
                </Content>
                <SectionOne>
                    <ArticleSection>
                        <BlogFeature data={news[0]} />
                        <BlogList data={news} limit={3} />  
                        <MobileBlog>
                            {news.map((e, index) => {
                                if (index > 0 && index < 3) {
                                    return (
                                        <BlogFeature data={e} index={index} />                                        
                                    )

                                }
                            })}
                        </MobileBlog>
                    </ArticleSection>                  
                </SectionOne>
                <Footer>
                    <Text color="#848b92">If you don't like it, unsubscribe at any time. Seriously, no hard feelings.</Text>
                    <Links><Action onClick={() => window.location = 'https://legal.hubspot.com/privacy-policy'}>Privacy Policy</Action><Action onClick={() => router.push('/contact')}>Contact Us</Action></Links>
                </Footer>
            </Container>

        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        news: state.Dashboard.news
    }
  }
const mapDispatchToProps = (dispatch) => {
    return {
        getNews: bindActionCreators(getNews, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);