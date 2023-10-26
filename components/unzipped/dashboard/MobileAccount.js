import React from 'react'
import styled from 'styled-components'
import IconComponent from '../../ui/icons/IconComponent'

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

function MobileAccount() {
    return (
        <div>
            <P margin="0" padding='0 0 0 15px' fontSize='20px' fontWeight={500} >Account</P>
            <hr />
            <div className='d-flex px-3 pb-2 justify-content-between'>
                <div className='d-flex'>
                    <img src='/img/profile.png' height={45} width={45} className='border rounded' />
                    <div className='mx-2'>
                        <P margin="0" padding="0 0 3px 0" fontWeight='500'>Mark Jacobs</P>
                        <P margin="0" padding="0 0 5px 0" fontSize="12px">Full stack web developer</P>
                    </div>
                </div>
                <div>
                    <P margin="0" padding="0 0 5px 0" color='#1E70E0' fontSize="10px">View Profile</P>
                    <div className='d-flex align-items-baseline'>
                        <IconComponent name='thumbUp' width="14" height="14" viewBox="0 0 14 14" fill="#0057FF" />
                        <P margin="0" padding="0 0 5px 0">101</P>
                    </div>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-between mb-3 px-3'>
                <div className='d-flex align-items-center'>
                    <IconComponent name='membership' width="14" height="14" viewBox="0 0 14 14" fill="black" />
                    <P margin="0" padding='0 0 0 12px' fontSize='14px'>Membership</P>
                </div>
                <IconComponent name='rightArrow' width="6" height="9" viewBox="0 0 6 9" fill="black" />
            </div>
            <div className='d-flex align-items-center justify-content-between mb-3 px-3'>
                <div className='d-flex align-items-center'>
                    <IconComponent name='settings' width="14" height="14" viewBox="0 0 14 14" fill="black" />
                    <P margin="0" padding='0 0 0 12px' fontSize='14px'>Settings</P>
                </div>
                <IconComponent name='rightArrow' width="6" height="9" viewBox="0 0 6 9" fill="black" />
            </div>
            <hr />
            <div className='d-flex align-items-center justify-content-between mb-3 px-3'>
                <div className='d-flex align-items-center'>
                    <img src='/img/balance.png' height={15} width={14} />
                    <P margin="0" padding='0 0 0 12px' fontSize='14px'>Balance</P>
                </div>
                <P margin="0" padding='0 0 0 12px' fontSize='14px'>$0.00 USD</P>
            </div>
            <div className='d-flex align-items-center justify-content-between mb-3 px-3'>
                <div className='d-flex align-items-center'>
                    <img src='/img/withdraw.png' height={18} width={16} />
                    <P margin="0" padding='0 0 0 12px' fontSize='14px'>Withdraw funds</P>
                </div>
                <IconComponent name='rightArrow' width="6" height="9" viewBox="0 0 6 9" fill="black" />
            </div>
            <div className='d-flex align-items-center justify-content-between mb-3 px-3'>
                <div className='d-flex align-items-center'>
                    <IconComponent name='transactionHistory' width="14" height="16" viewBox="0 0 14 16" fill="black" />
                    <P margin="0" padding='0 0 0 12px' fontSize='14px'>Transaction history</P>
                </div>
                <IconComponent name='rightArrow' width="6" height="9" viewBox="0 0 6 9" fill="black" />
            </div>
            <hr />
            <div className='d-flex align-items-center justify-content-between mb-3 px-3'>
                <div className='d-flex align-items-center'>
                    <IconComponent name='support' width="16" height="16" viewBox="0 0 16 16" fill="black" />
                    <P margin="0" padding='0 0 0 12px' fontSize='14px'>Support</P>
                </div>
                <IconComponent name='rightArrow' width="6" height="9" viewBox="0 0 6 9" fill="black" />
            </div>
            <div className='d-flex align-items-center justify-content-between mb-3 px-3'>
                <div className='d-flex align-items-center'>
                    <img src='/img/terms.png' height={16} width={16} />
                    <P margin="0" padding='0 0 0 12px' fontSize='14px'>Terms and conditions</P>
                </div>
                <IconComponent name='rightArrow' width="6" height="9" viewBox="0 0 6 9" fill="black" />
            </div>
            <div className='d-flex align-items-center  mb-3 px-3'>
                <IconComponent name='logOut' width="18" height="16" viewBox="0 0 18 16" fill="black" />
                <P margin="0" padding='0 0 0 12px' fontSize='14px'>Logout</P>
            </div>
        </div>
    )
}

export default MobileAccount