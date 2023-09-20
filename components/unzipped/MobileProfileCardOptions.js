import React from 'react'
import IconComponent from '../ui/icons/IconComponent';
import styled from 'styled-components'

const P = styled.p`
font-size: ${({ fontSize }) => fontSize ? fontSize : ''};
font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : ''};
color: ${({ color }) => color ? color : 'black'};
background: ${({ background }) => background ? background : '#fff'};
padding: ${({ padding }) => padding ? padding : ''};
margin: ${({ margin }) => margin ? margin : ''};
text-align: ${({ align }) => align ? align : ''};
border-bottom: ${({ borderBottom }) => borderBottom ? borderBottom : ''};
right: ${({ right }) => right ? right : ''}
`
function MobileProfileCardOptions({ handleProfilePage }) {
    return (
        <div>
            <div className='py-3 px-2 d-flex align-items-center' style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)", gap: "11px" }}>
                <span onClick={() => { handleProfilePage(true) }} style={{ cursor: "pointer" }}><IconComponent name='backArrow' width="20" height="20" viewBox="0 0 20 20" fill="black" /></span>
                <span style={{ fontWeight: "500", fontSize: "16px" }}>Options</span>
            </div>
            <div className='mx-2'>
                <P padding="25px 0 18px 0" margin="7px 0 0 0" borderBottom="3px solid #EFF1F4" fontWeight="600" >Make An Offer</P>
                <P padding="12px 0 18px 0" borderBottom="3px solid #EFF1F4" margin="0" fontWeight="600" >Schedule an Interview</P>
                <P padding="12px 0 18px 0" borderBottom="3px solid #EFF1F4" margin="0" fontWeight="600" >Send A Message</P>
                <div className='d-flex justify-content-between' style={{ padding: "12px 0 18px 0", borderBottom: "3px solid #EFF1F4" }}>
                    <P fontWeight="600" margin="0"  >Add User To A List</P>
                    <span style={{ position: "absolute", right: "23px" }} ><IconComponent name='downArrow' width="20" height="20" viewBox="0 0 20 20" fill="black" /></span>
                </div>
            </div >

            <div className='d-flex px-4 py-2 me-2' style={{ gap: "15px", borderBottom:"3px solid #EFF1F4" }} >
                <div>
                    <img src='/img/heart.png' />
                </div>
                <div >
                    <P fontSize="16px" margin="0">Favourites</P>
                    <div className='d-flex align-items-center'>
                        <IconComponent name='closedLock' width="4.47" height="5.11" viewBox="0 0 4.47 5.11" fill="#B2B9C5" />
                        <P fontSize="7px" margin="0" padding="0 0 0 3px" >Private</P>
                        <P fontSize="7px" margin="0" >.</P>
                        <P fontSize="7px" margin="0" >1 member</P>
                    </div>
                </div>
            </div>
            <div className='d-flex px-4 py-2 me-1' style={{ gap: "15px", borderBottom:"3px solid #EFF1F4" }}>
                <div>
                    <IconComponent name='eye' width="20" height="13" viewBox="0 0 20 13" fill="#8EDE64" />
                </div>
                <div >
                    <P fontSize="16px" margin="0">Recently Viewed</P>
                    <div className='d-flex align-items-center'>
                        <IconComponent name='closedLock' width="4.47" height="5.11" viewBox="0 0 4.47 5.11" fill="#B2B9C5" />
                        <P fontSize="7px" margin="0" padding="0 0 0 3px" >Private</P>
                        <P fontSize="7px" margin="0" >.</P>
                        <P fontSize="7px" margin="0" >1 member</P>
                    </div>
                </div>
            </div>
            <div className='d-flex px-4 py-2 me-1' style={{ gap: "15px", borderBottom:"3px solid #EFF1F4" }}>
                <div>
                    <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
                </div>
                <div >
                    <P fontSize="16px" margin="0">My Team</P>
                    <div className='d-flex align-items-center'>
                        <IconComponent name='closedLock' width="4.47" height="5.11" viewBox="0 0 4.47 5.11" fill="#B2B9C5" />
                        <P fontSize="7px" margin="0" padding="0 0 0 3px" >Private</P>
                        <P fontSize="7px" margin="0" >.</P>
                        <P fontSize="7px" margin="0" >1 member</P>
                    </div>
                </div>
            </div>
            <div className='d-flex px-4 py-2' style={{ gap: "15px", boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}>
                <div>
                    <IconComponent name='team' width="18" height="15" viewBox="0 0 18 15" fill="#FFC24E" />
                </div>
                <div >
                    <P fontSize="16px" margin="0">My Team</P>
                    <div className='d-flex align-items-center'>
                        <IconComponent name='openLock' width="4.47" height="5.11" viewBox="0 0 4.47 5.11" fill="#B2B9C5" />
                        <P fontSize="7px" margin="0" padding="0 0 0 3px" >Public</P>
                        <P fontSize="7px" margin="0" >.</P>
                        <P fontSize="7px" margin="0" >1 member</P>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MobileProfileCardOptions