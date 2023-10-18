import React from 'react'
import styled from 'styled-components'
import IconComponent from '../../ui/icons/IconComponent'

const P = styled.p`
font-size: ${({ fontSize }) => fontSize ? fontSize : '16px'};
font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : ''};
color: ${({ color }) => color ? color : 'black'};
background: ${({ background }) => background ? background : '#fff'};
padding: ${({ padding }) => padding ? padding : ''};
margin: ${({ margin }) => margin ? margin : ''};
text-align: ${({ align }) => align ? align : ''};
border-bottom: ${({ borderBottom }) => borderBottom ? borderBottom : ''};
right: ${({ right }) => right ? right : ''}
`
const Heading = styled.div`
gap:20px;
display:flex;
align-items:baseline;
`
{/* <img src='/img/heart.png' />
        <IconComponent name='eye' width="20" height="13" viewBox="0 0 20 13" fill="#8EDE64" />
        <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
        <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#000000" /> */}

function MobileProjects() {
    return (
        <div className='px-4 mb-5 pb-4'>
            <div className='d-flex justify-content-between align-items-center'>
                <P fontSize="16px" fontWeight="500" color="#000">Recent Projects</P>
                <P fontSize="12px" fontWeight="500" color="#0057FF">VIEW ALL</P>
            </div>
            <Heading>
                <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#000000" />
                <P>My first project</P>
            </Heading>
            <Heading>
                <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#000000" />
                <P>This is my second project</P>
            </Heading>
            <Heading>
                <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#000000" />
                <P>This is my third project</P>
            </Heading>
            <div className='d-flex justify-content-between align-items-center'>
                <P fontSize="16px" fontWeight="500" color="#000">Lists</P>
                <P fontSize="12px" fontWeight="500" color="#0057FF">VIEW ALL</P>
            </div>
            <Heading>
                <img src='/img/heart.png' height={15} width={20} />
                <P>Favoites</P>
            </Heading>
            <Heading>
                <IconComponent name='eye' width="20" height="13" viewBox="0 0 20 13" fill="#8EDE64" />
                <P>Recently Viewed</P>
            </Heading>
            <Heading>
                <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
                <P>My Team</P>
            </Heading>
            <div className='d-flex justify-content-between align-items-center'>
                <P fontSize="16px" fontWeight="500" color="#000">Departments</P>
                <P fontSize="12px" fontWeight="500" color="#0057FF">VIEW ALL</P>
            </div>
            <Heading>
                <img src='/img/heart.png' height={15} width={20} />
                <P>Department one</P>
            </Heading>
            <Heading>
                <IconComponent name='eye' width="20" height="13" viewBox="0 0 20 13" fill="#8EDE64" />
                <P>Department two</P>
            </Heading>
            <Heading>
                <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
                <P>Department three</P>
            </Heading>
        </div>
    )
}

export default MobileProjects