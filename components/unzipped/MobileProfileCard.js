import React from 'react'
import styled from 'styled-components'
import { ValidationUtils } from '../../utils'
import IconComponent from '../ui/icons/IconComponent'
import Link from 'next/link';

const P = styled.p`
font-size: ${({fontSize}) => fontSize ? fontSize : ''};
font-weight: ${({fontWeight}) => fontWeight ? fontWeight : ''};
color: ${({color}) => color ? color : 'black'};
background: ${({background}) => background ? background : '#fff'};
padding: ${({padding}) => padding ? padding : ''};
margin: ${({margin}) => margin ? margin : ''};

`

function MobileProfileCard({ user }) {
    console.log(user, user?.user?.profileImage)
    const month = ValidationUtils.getMonthInText(user?.updatedAt)
    const dateCode = `${month} ${new Date(user?.updatedAt).getDate()}, ${new Date(user?.updatedAt).getFullYear()}`
    return (
        <div className='text-center'>
            <div className='py-3 px-2 d-flex align-items-center' style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)", gap: "11px" }}>
                <Link href="/freelancer" ><span onClick={() => { console.log("hi") }} style={{ cursor: "pointer" }}><IconComponent name='backArrow' width="20" height="20" viewBox="0 0 20 20" fill="black" /></span></Link>
                <span style={{ fontWeight: "500", fontSize: "16px" }}>Profile</span>
            </div>
            <img
                src={user?.user?.profileImage}
                width={125}
                height={125}
                alt="Picture of the author"
                style={{borderRadius:"15px"}}
            />
            <P>{user?.user?FirstName + user?.user?.LastName}</P>
            <P>Mark jacob</P>
            <P>Mark jacob</P>
            <P>Mark jacob</P>
            <P>Mark jacob</P>
            <P>Mark jacob</P>
            <P>Mark jacob</P>
            <P>Mark jacob</P>
            <P>Mark jacob</P>
            <P>Mark jacob</P>
            <P>Mark jacob</P>
            <P>Mark jacob</P>
            <P>Mark jacob</P>

        </div>

    )
}

export default MobileProfileCard