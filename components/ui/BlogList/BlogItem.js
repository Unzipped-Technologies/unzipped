import React from 'react'
import Image from '../Image'
import Text from '../Text'
import Title from '../Title'
import styled from 'styled-components'
import { ValidationUtils } from '../../../utils'
import Link from 'next/link'

const Container = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    margin-bottom: 40px;
    cursor: pointer;
    @media(max-width: 546px) {
        margin-bottom: 0px;
    }
`;
const Left = styled.div`
    @media(max-width: 999px) {
        min-width: 60vw;
        p {
            max-width: 530px;            
        }
        h5 {
            max-width: 530px;            
        }
    }
    @media(max-width: 546px) {
        min-width: 60vw;
        padding: 5px 15px;
        p {
            max-width: 530px;            
        }
        h5 {
            max-width: 530px;            
        }
    }
    @media(max-width: 467px) {
        min-width: 60vw;
        padding: 5px 0px;
        p {
            max-width: 530px;
            font-size: 14px;            
        }
        h5 {
            max-width: 530px;            
            font-size: 18px;
            line-height: 22px;
        }
    }
    @media(max-width: 393px) {
        min-width: 60vw;
        padding: 5px 0px;
        p {
            font-size: 13px;
            white-space: nowrap;
            width: 225px;
            overflow: hidden;
            text-overflow: ellipsis; 
            margin: 0px;           
        }
        h5 {          
            font-size: 15px;
            line-height: 18px;
        }
    }
`;
const Right = styled.div`
    @media(max-width: 546px) {
        img {
            width: 150px;
        }
        div {
            width: 150px;
            min-width: 150px;
        }
    }
    @media(max-width: 463px) {
        img {
            width: 120px;
        }
        div {
            width: 120px;
            min-width: 120px;
        }
    }
    @media(max-width: 393px) {
        img {
            width: 90px;
        }
        div {
            width: 90px;
            min-width: 90px;
        }
    }
`;

const getImageCase = (ImgUrl) => {
    switch (ImgUrl) {
        case 1:
            return 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1676159840/AI_vdtvg8.jpg'
        case 2:
            return 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1676159840/41c8edae76823d2d4293a2463b37d898d6a657de-1500x1000_jyq5t0.jpg'
        case 3:
            return 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1676159841/tech_wkvi75.gif'
    }
}

const BlogItem = ({data, index}) => {
    return (
        <Link href={data?.link || '/'}>
            <Container>
                <Left>
                    {data?.category && data?.category.length >= 0 && <Text clickable level={3} color="#1c7ff2" marginBottom={0}>{data?.category[0].toUpperCase()}</Text>}
                    <Title level={5} margin="5px 0px 0px 0px">{data?.title}</Title>
                    <Text clickable level={3} color="#333" marginBottom={0} marginTop="5">{ValidationUtils.truncate(data?.description, 100)}</Text>
                    <br/>
                    {data?.creator && data?.creator[0] && <Text clickable level={3} marginTop="5" marginBottom={0}>{data?.creator[0]}</Text>}
                </Left>
                <Right>
                    <Image src={data?.image_url || getImageCase(index)} width="200px" radius="4px"/>
                </Right>
            </Container>
        </Link>
    )
}

export default BlogItem