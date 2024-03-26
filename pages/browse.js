import React, { useState, useEffect } from 'react';
import Nav from '../components/unzipped/header';
import MobileFreelancerFooter from '../components/unzipped/MobileFreelancerFooter';
import styled from 'styled-components';
import MobileCard from '../components/Cards/mobileCard'
import Image from '../components/ui/Image'
import { useRouter } from 'next/router';

const Browse = () => {
    const [marginBottom, setMarginBottom] = useState('98px');
    const router = useRouter()

    const MobileDisplayBox = styled.div`
        position: relative;
        @media(min-width: 680px) {
            display: none;
        }
    `;

    const ContentArea = styled.div`
        display: flex;
        justify-content: center;
        flex-flow: column;
    `;

    const CardContainer = styled.div`
        width: 100%;
        padding: 20px;
        @media(max-width: 680px) {
            margin-bottom: 48px;
        }
        div {
            margin: 30px 20px;
            padding: 20px;
        }
        @media(max-width: 550px) {
            div {
                margin: 20px 0px;               
                padding: 5px 15px;
            }
        }
        @media(max-width: 450px) {
            padding: 0px 10px;
            div {
                margin: 10px 0px;               
            }
        }
    `;

    const ImageContainer = styled.div`
        width: 50%;
        margin-top: 20px;
        align-self: center;
        @media(max-width: 840px) {
            width: 100%;
            margin-top: 20px;
        }
        @media(max-width: 550px) {
            width: 100%;
            display: flex;
            justify-content: center;
            overflow: hidden;
            height: 165px;
            align-items: center;
            margin-top: 40px;
            margin-bottom: 10px;
        }
        @media(max-width: 450px) {
            width: 100%;
            display: flex;
            justify-content: center;
            overflow: hidden;
            height: 145px;
            align-items: center;
            margin-top: 40px;
            margin-bottom: 30px;
        }
    `;

    const cardData = [
        {
            title: 'Projects',
            subText: 'Explore exciting new project opportunities now!',
            link: '/dashboard/projects',
        },
        {
            title: 'Freelancers',
            subText: 'Find Talent and Explore your current talent',
            link: '/freelancers',
        },
        {
            title: 'Dashboard',
            subText: 'Check out The Latest being done for you.',
            link: '/dashboard',
        },
    ]


    useEffect(()=>{
        const handleResize = () => {
            if (window.innerWidth < 680) {
                setMarginBottom('55px');
            } else {
                setMarginBottom('98px');
            }
        };

        // Add an event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial call to set the marginBottom based on the current window width
        handleResize();

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

    return (
        <React.Fragment>
            <Nav isSubMenu marginBottom={marginBottom}/>
            <ContentArea>
                <ImageContainer>
                    <Image src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1696293321/xkiyysuux8ihcarvs44c.png" height="auto" width="100%"/>
                </ImageContainer>                
                <CardContainer>
                    {cardData.map(item => (
                        <MobileCard key={item.title} onClick={() => router.push(item.link)} title={item.title} subText={item.subText}/>
                    ))}
                </CardContainer>
            </ContentArea>
            <MobileDisplayBox>
                <MobileFreelancerFooter defaultSelected="Browse"/>
            </MobileDisplayBox>
        </React.Fragment>
    )
}

export default Browse