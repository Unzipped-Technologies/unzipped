import React from 'react';
import Nav from '../../components/unzipped/header';
import Image from '../../components/ui/Image'
import Icon from '../../components/ui/Icon'
import NotificationsPanel from '../../components/unzipped/dashboard/NotificationsPanel';
import {useRouter} from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { resetRegisterForm} from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";

const notifications = [
    { type:"plan"},
    { type:"github"},
    { type:"browse"},
    { type:"dismiss"},
    { type:"blue"},
    { type:"createBusiness"},
    { type:"faq"},
    { type:"updateBusiness"},
    { type:"explore"},
]

const Dashboard = ({resetRegisterForm, token}) => {
    const router = useRouter()
    console.log('token: ', token.access_token)
    const user = [
        {
            text: 'Update account details',
            icon: <Icon name="alertRed" />,
            padding: true,
            onClick: () => {
                resetRegisterForm()
                router.push('/signup')
            }
        },
        {
            text: 'Upload a profile picture',
            icon: <Image radius="50%" width="34px" src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png" />,
            padding: true
        },
        {
            text: 'Select a plan for your account',
            icon: <></>,
            padding: false
        },
    ]

    return (
        <React.Fragment>
            <Nav isSubMenu/>
            <NotificationsPanel notifications={notifications} user={user}/>
        </React.Fragment>
    )
}

Dashboard.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        businesses: state.Business?.businesses,
        loading: state.Business?.loading,
        role: state.Auth.user.role,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        resetRegisterForm: bindActionCreators(resetRegisterForm, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);