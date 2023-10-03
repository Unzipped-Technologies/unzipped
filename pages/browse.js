import React, { useState, useEffect } from 'react';
import Nav from '../components/unzipped/header';
import MobileFreelancerFooter from '../components/unzipped/MobileFreelancerFooter';
import styled from 'styled-components';
import MobileCard from '../components/Cards/mobileCard'
import Image from '../components/ui/Image'

const Browse = () => {
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
        div {
            margin: 30px 20px;
            padding: 20px;
        }
        @media(max-width: 550px) {
            div {
                margin: 20px 0px;               
                padding: 5px 20px;
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
        @media(max-width: 450px) {
            width: 100%;
            margin-top: 80px;
        }
    `;

    const cardData = [
        {
            title: 'Projects',
            subText: 'Explore exciting new project opportunities now!',
        },
        {
            title: 'Freelancers',
            subText: 'Find Talent and Explore your current talent',
        },
        {
            title: 'Dashboard',
            subText: 'Check out The Latest being done for you.',
        },
    ]

    return (
        <React.Fragment>
            <Nav isSubMenu />
            <ContentArea>
                <ImageContainer>
                    <Image src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1696293321/xkiyysuux8ihcarvs44c.png" height="auto" width="100%"/>
                </ImageContainer>                
                <CardContainer>
                    {cardData.map(item => (
                        <MobileCard title={item.title} subText={item.subText}/>
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