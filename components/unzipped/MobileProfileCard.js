import React from 'react'
import styled from 'styled-components'
import { ValidationUtils } from '../../utils'
import IconComponent from '../ui/icons/IconComponent'
import Link from 'next/link';
import { Icon } from '../ui';

const P = styled.p`
font-size: ${({ fontSize }) => fontSize ? fontSize : ''};
font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : ''};
color: ${({ color }) => color ? color : 'black'};
background: ${({ background }) => background ? background : '#fff'};
padding: ${({ padding }) => padding ? padding : ''};
margin: ${({ margin }) => margin ? margin : ''};
text-align: ${({ align }) => align ? align : ''};
`
function MobileProfileCard({ user, handleProfilePage }) {
    function formatDate(inputDate) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(inputDate).toLocaleDateString(undefined, options);
    }

    return (
        <div className='text-center'>
            <div className='py-3 px-2 d-flex align-items-center' style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)", gap: "11px" }}>
                <Link href="/freelancers" ><span onClick={() => { }} style={{ cursor: "pointer" }}><IconComponent name='backArrow' width="20" height="20" viewBox="0 0 20 20" fill="black" /></span></Link>
                <span style={{ fontWeight: "500", fontSize: "16px" }}>Profile</span>
            </div>
            <div className='m-4'>
                <img
                    src={user?.user?.profileImage}
                    width={125}
                    height={125}
                    alt="Picture of the author"
                    style={{ borderRadius: "15px" }}
                />
                <P fontSize='26px' margin='0'  >{user?.user?.FirstName || '' + " " + user?.user?.LastName || ''}</P>
                <P fontSize='15px' fontWeight="400" margin='0'>{user?.category}</P>
                <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", right: "30px", display: "flex", alignItems: "center" }}>
                        <IconComponent name='thumbUp' width="15" height="15" viewBox="0 0 15 15" fill="#0057FF" />
                        <P margin='0px'>{user?.likeTotal}</P>
                    </div>
                    <P fontSize='14px' fontWeight="300">{user?.user?.AddressLineCountry || 'United States'}</P>
                </div>
                <P fontSize='22px' fontWeight="600" >${user?.rate} / HOUR</P>
                <div className='d-flex justify-content-around align-items-center py-4 mb-2'>
                    <Icon name="colorUser" />
                    <Icon name="colorEmail" />
                    <Icon name="colorSheild" />
                    <Icon name="colorPhone" />
                </div>

                <P align="start" fontSize='13px' fontWeight="400">{user?.likeTotal} UPVOTES BY CLIENTS</P>
                <div className='d-flex' style={{ textAlign: "start", gap: "10px" }}>
                    <div>
                        <P fontSize='12px' >LAST UPDATE</P>
                        <P fontSize='12px'  >EQUITY</P>
                    </div>
                    <div>
                        <P fontSize='12px' fontWeight="300">{formatDate(user?.updatedAt)}</P>
                        <P fontSize='12px' >YES</P>
                    </div>
                </div>
                <div className='d-flex' onClick={(e) => {
                    e.preventDefault();
                    handleProfilePage(false);
                }} >
                    <div style={{ background: "#37DEC5", width: "-webkit-fill-available" }} >
                        <button style={{ background: "#37DEC5", color: "white", fontSize: "16px", border: "0", padding: "16px 0px", fontWeight: "600" }} >Schedule an Interview</button>
                    </div>
                    <div style={{ background: "#37DEC5" }}>
                        <button style={{ borderLeft: "1.3px solid #B5B5B5", background: "#37DEC5", color: "white", fontSize: "16px", border: "0", padding: "16px 13px", fontWeight: "600" }} ><IconComponent name='downArrow' width="20" height="20" viewBox="0 0 20 20" fill="white" /></button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MobileProfileCard