import React from 'react'
import styled from 'styled-components'
import IconComponent from '../../ui/icons/IconComponent'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutUser } from '../../../redux/actions';
import { useRouter } from 'next/router'

const P = styled.p`
font-size: ${({ fontSize }) => fontSize ? fontSize : ''};
font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : ''};
color: ${({ color }) => color ? color : 'black'};
background: ${({ background }) => background ? background : 'none'};
padding: ${({ padding }) => padding ? padding : ''};
margin: ${({ margin }) => margin ? margin : ''};
text-align: ${({ align }) => align ? align : ''};
border-bottom: ${({ borderBottom }) => borderBottom ? borderBottom : ''};
right: ${({ right }) => right ? right : ''}
`

const Like = styled.div`
    justify-content: right;
`;

const MobileAccount = ({logoutUser, user}) => {
    const router = useRouter()

    const linkPush = (link) => {
        router.push(link)
    }

    const signOut = () => {
        logoutUser()
        linkPush('/login')
    }

    return (
        <div>
            <P margin="0" padding='0 0 0 15px' fontSize='20px' fontWeight={500} >Account</P>
            <hr />
            <div className='d-flex px-3 pb-4 pt-3 justify-content-between'>
                <div className='d-flex'>
                    <img src={user.profileImage} height={54} width={54} className='border rounded' />
                    <div className='mx-2'>
                        <P margin="0" padding="0 0 3px 0" fontWeight='500' fontSize="20px">{user.FullName}</P>
                        <P margin="0" padding="0 0 5px 0" fontSize="16px">Full stack web developer</P>
                    </div>
                </div>
                <div>
                    <P margin="0" padding="0 0 5px 0" color='#1E70E0' fontSize="18px">View Profile</P>
                    <Like className='d-flex align-items-baseline'>
                        <IconComponent name='thumbUp' width="14" height="14" viewBox="0 0 14 14" fill="#0057FF" />
                        <P margin="0" padding="0 0 5px 0">101</P>
                    </Like>
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-between mb-4 px-3  py-1' onClick={() => linkPush('/pick-a-plan')}>
                <div className='d-flex align-items-center'>
                    <IconComponent name='membership' width="14" height="14" viewBox="0 0 14 14" fill="black" />
                    <P margin="0" padding='0 0 0 12px' fontSize='20px'>Membership</P>
                </div>
                <IconComponent name='rightArrow' width="9" height="14" viewBox="0 0 6 9" fill="black" />
            </div>
            <div className='d-flex align-items-center justify-content-between mb-4 px-3  py-1'>
                <div className='d-flex align-items-center'>
                    <IconComponent name='settings' width="14" height="14" viewBox="0 0 14 14" fill="black" />
                    <P margin="0" padding='0 0 0 12px' fontSize='20px'>Settings</P>
                </div>
                <IconComponent name='rightArrow' width="9" height="14" viewBox="0 0 6 9" fill="black" />
            </div>
            <hr />
            <div className='d-flex align-items-center justify-content-between mb-4 px-3  py-1'>
                <div className='d-flex align-items-center'>
                    <img src='/img/balance.png' height={15} width={14} />
                    <P margin="0" padding='0 0 0 12px' fontSize='20px'>Balance</P>
                </div>
                <P margin="0" padding='0 0 0 12px' fontSize='20px'>$0.00 USD</P>
            </div>
            <div className='d-flex align-items-center justify-content-between mb-4 px-3  py-1'>
                <div className='d-flex align-items-center'>
                    <img src='/img/withdraw.png' height={18} width={16} />
                    <P margin="0" padding='0 0 0 12px' fontSize='20px'>Withdraw funds</P>
                </div>
                <IconComponent name='rightArrow' width="9" height="14" viewBox="0 0 6 9" fill="black" />
            </div>
            <div className='d-flex align-items-center justify-content-between mb-4 px-3  py-1'>
                <div className='d-flex align-items-center'>
                    <IconComponent name='transactionHistory' width="14" height="16" viewBox="0 0 14 16" fill="black" />
                    <P margin="0" padding='0 0 0 12px' fontSize='20px'>Transaction history</P>
                </div>
                <IconComponent name='rightArrow' width="9" height="14" viewBox="0 0 6 9" fill="black" />
            </div>
            <hr />
            <div className='d-flex align-items-center justify-content-between mb-4 px-3  py-1'>
                <div className='d-flex align-items-center'>
                    <IconComponent name='support' width="16" height="16" viewBox="0 0 16 16" fill="black" />
                    <P margin="0" padding='0 0 0 12px' fontSize='20px'>Support</P>
                </div>
                <IconComponent name='rightArrow' width="9" height="14" viewBox="0 0 6 9" fill="black" />
            </div>
            <div className='d-flex align-items-center justify-content-between mb-4 px-3  py-1'>
                <div className='d-flex align-items-center'>
                    <img src='/img/terms.png' height={16} width={16} />
                    <P margin="0" padding='0 0 0 12px' fontSize='20px'>Terms and conditions</P>
                </div>
                <IconComponent name='rightArrow' width="9" height="14" viewBox="0 0 6 9" fill="black" />
            </div>
            <div className='d-flex align-items-center  mb-3 px-3 py-1' onClick={signOut}>
                <IconComponent name='logOut' width="18" height="16" viewBox="0 0 18 16" fill="black" />
                <P margin="0" padding='0 0 0 12px' fontSize='20px'>Logout</P>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
      user: state.Auth.user,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      logoutUser: bindActionCreators(logoutUser, dispatch),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MobileAccount)