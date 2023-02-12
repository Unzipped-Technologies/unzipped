import React from 'react'
import styled from 'styled-components'
import Image from '../Image'
import Text from '../Text'
import Title from '../Title'
import Link from 'next/link'
import { ValidationUtils } from '../../../utils'

const Container = styled.div`
    padding: 30px;
    @media(max-width: 546px) {
        padding: 5px 50px;
    }
    @media(max-width: 467px) {
        display: flex;
        justify-content: center;
        flex-flow: column;
        img {
            width: 95%;
            margin-left: 2.5%;
        }
        p {
            font-size: 14px;
            line-height: 20px;
            max-width: 95%;
            margin-left: 2.5%;
        }
        h2 {
            max-width: 95%;
            font-size: 22px;
            margin-left: 2.5%;
            line-height: 26px;
        }
    }
    @media(max-width: 393px) {
        padding: 0px;
    }
    @media(max-width: 355px) {
        margin-bottom: 40px;
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

const BlogFeature = ({data, index}) => {
    return (
        <Link href={data?.link || '/'}>
            <Container>
                <Image src={data?.image_url || getImageCase(index)} radius="5px"/>
                {data?.category.length >= 0 && <Text level={2} color="#1c7ff2" marginBottom={0}>{data?.category[0].toUpperCase()}</Text>}
                <Title level={2} linkAbove>{data?.title}</Title>
                <Text level={4} color="#333" marginBottom={0}>{ValidationUtils.truncate(data?.description, 111)}</Text>
                <Text level={2} marginBottom={0}>{data?.creator[0]}</Text>
            </Container>            
        </Link>

    )
}

export default BlogFeature