import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { updateRegisterForm, updateUser} from '../redux/actions';
import { parseCookies } from "../services/cookieHelper";import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #D9D9D9;
    height: 100vh;
    width: 100vw;
`;

const Signup = ({
    stage, 
    loading,
    token,
    role,
    FirstName,
    LastName,
    email,
    password,
    phoneNumber,
    addressLineOne,
    addressLineTwo,
    AddressLineCountry,
    AddressState,
    AddressZip,
    AddressCity,
    socialSecurityNumber,
}) => {
    const submitForm = (step) => {
        if (step < 13) {
            // submit form
            // if step is true then go forward 1 step
            updateRegisterForm({
                stage: step ? step + 1 : stage
            })
        } else {
            updateUser({
                role,
                FirstName,
                LastName,
                email,
                password,
                phoneNumber,
                addressLineOne,
                addressLineTwo,
                AddressLineCountry,
                AddressState,
                AddressZip,
                AddressCity,
                socialSecurityNumber,
                profileImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
            }, token.access_token).then(() => {
                router.push('/dashboard?success=true')
            }).catch((e) => {
                console.log('error: ', e)
            })
        
        }
    }

    const updateForm = (data) => {
        // update form
        updateRegisterForm({
            ...data
        })
    }

    const goBack = (step) => {
        // update form step 
        // if on 1st page go back to dashboard
        if (stage > 1) {
            updateRegisterForm({
                stage: (step || stage) - 1
            })
        } else {
            router.push('/dashboard')
        }

    }

    return (
        <Container>
            {/* <GetCard 
                stage={stage} 
                submitForm={submitForm}
                updateForm={updateForm}
                goBack={goBack}
                loading={loading}
                role={role}
                FirstName={FirstName}
                LastName={LastName}
                email={email}
                password={password}
                phoneNumber={phoneNumber}
                addressLineOne={addressLineOne}
                addressLineTwo={addressLineTwo}
                AddressLineCountry={AddressLineCountry}
                AddressState={AddressState}
                AddressZip={AddressZip}
                AddressCity={AddressCity}
                profileImage={profileImage}
                socialSecurityNumber={socialSecurityNumber}
            /> */}
        </Container>
    )
}

Signup.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    console.log(state)
    return {
        stage: state.Auth?.userForm?.stage,
        loading: state.Auth?.loading,
        role: state.Auth.userForm?.role,
        FirstName: state.Auth.userForm?.FirstName,
        LastName: state.Auth.userForm?.LastName,
        email: state.Auth.userForm?.email,
        password: state.Auth.userForm?.password,
        phoneNumber: state.Auth.userForm?.phoneNumber,
        addressLineOne: state.Auth.userForm?.addressLineOne,
        addressLineTwo: state.Auth.userForm?.addressLineTwo,
        AddressLineCountry: state.Auth.userForm?.AddressLineCountry,
        AddressState: state.Auth.userForm?.AddressState,
        AddressZip: state.Auth.userForm?.AddressZip,
        AddressCity: state.Auth.userForm?.AddressCity,
        socialSecurityNumber: state.Auth?.userForm?.socialSecurityNumber,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        updateRegisterForm: bindActionCreators(updateRegisterForm, dispatch),
        updateUser: bindActionCreators(updateUser, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);