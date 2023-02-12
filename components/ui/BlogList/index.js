import React from 'react'
import BlogItem from './BlogItem'
import styled from 'styled-components'

const Container = styled.div`
    padding: 30px;
    @media(max-width: 546px) {
        padding: 25px;
    }
    @media(max-width: 393px) {
        padding: 25px 5px;
    }
    @media(max-width: 355px) {
        display: none;
    }
`;

const BlogList = ({data, limit}) => {
    
    return (
        <Container>
            {data.map((e, i) => {
                if (i > 0 && i <= limit) {
                    return (
                        <BlogItem data={e} key={i} index={i}/>
                    )
                }
            })}
        </Container>
    )

}

export default BlogList