import React, { useEffect, useState } from 'react'
import router from 'next/router'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'

import { ValidationUtils } from '../utils'
import { countriesList } from '../utils/constants'
import FormField from '../components/ui/FormField'
import { parseCookies } from '../services/cookieHelper'
import OptionTileGroup from '../components/ui/OptionTileGroup'
import { accountTypeEnum } from '../server/enum/accountTypeEnum'
import { updateRegisterForm, updateUser } from '../redux/actions'
import { Grid, Grid2 } from '../components/unzipped/dashboard/style'
import CreateABusiness from '../components/unzipped/CreateABusiness'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9d9d9;
  height: 100vh;
  width: 100vw;
`

const GetCard = ({
  stage,
  role,
  submitForm,
  updateForm,
  goBack,
  FirstName,
  LastName,
  socialSecurityNumber,
  businessType,
  AddressLineOne,
  AddressLineTwo,
  AddressCity,
  AddressCountry,
  AddressZip,
  taxEIN,
  phoneNumber,
  errors
}) => {
  switch (stage) {
    case 1:
      return (
        <CreateABusiness
          title={`Are you joining as a client or a freelancer?`}
          sub={``}
          onUpdate={updateForm}
          onBack={goBack}
          disabled={role === -1}
          onSubmit={submitForm}
          progress={10}
          stage={stage}>
          <Grid>
            <OptionTileGroup
              selectedValue={role}
              type="radio"
              tileList={[
                {
                  label: `I am a client, hiring for a project`,
                  iconName: 'profileNew',
                  value: `${accountTypeEnum.FOUNDER}`
                },
                {
                  label: `I'm a freelancer, looking for work`,
                  iconName: 'desktop',
                  value: `${accountTypeEnum.INVESTOR}`
                }
              ]}
              onChange={e => updateForm({ role: e.target.value })}
              stage={stage}
            />
          </Grid>
        </CreateABusiness>
      )
    case 2:
      return (
        <CreateABusiness
          title="Tell us about yourself"
          sub="We’ll use this information to help set up your account."
          disabled={
            !(
              FirstName.length > 0 &&
              LastName.length > 0 &&
              phoneNumber.length > 0 &&
              socialSecurityNumber.length > 0 &&
              businessType.length > 0
            )
          }
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={40}
          stage={stage}>
          <Grid margin="0px 0px 20px 0px" left>
            <FormField
              fieldType="input"
              width="80%"
              noMargin
              error={errors?.FirstName}
              fontSize="14px"
              onChange={e => updateForm({ FirstName: e.target.value })}
              value={FirstName}>
              First Name
            </FormField>
            <FormField
              fieldType="input"
              fontSize="14px"
              error={errors?.LastName}
              width="80%"
              noMargin
              onChange={e => updateForm({ LastName: e.target.value })}
              value={LastName}>
              Last Name
            </FormField>
            <Grid2 margin="0px">
              <FormField
                fieldType="input"
                fontSize="14px"
                noMargin
                error={errors?.phoneNumber}
                placeholder="(555) 123-4567"
                width="80%"
                onChange={e => updateForm({ phoneNumber: e.target.value })}
                value={phoneNumber}>
                Phone Number
              </FormField>

              <FormField
                fieldType="input"
                fontSize="14px"
                width="78%"
                placeholder="Business Type"
                error={errors.businessType}
                options={[
                  {
                    value: 'LLC',
                    label: 'LLC'
                  },
                  {
                    value: 'Individual',
                    label: 'Individual'
                  },
                  {
                    value: 'Corporation',
                    label: 'Corporation'
                  }
                ]}
                noMargin
                onChange={e => updateForm({ businessType: e.target.value })}
                value={businessType}>
                {errors.businessType}Business Type (Individual, LLC)
              </FormField>
            </Grid2>
            <FormField
              fieldType="input"
              fontSize="14px"
              noMargin
              width="80%"
              error={errors?.taxEIN}
              onChange={e => updateForm({ socialSecurityNumber: e.target.value, taxEIN: e.target.value })}
              value={socialSecurityNumber || taxEIN}>
              {role === accountTypeEnum.INVESTOR ? 'Social Security Number' : 'Tax EIN or Social security Number'}
            </FormField>
          </Grid>
        </CreateABusiness>
      )
    case 3:
      return (
        <CreateABusiness
          title="Where is your business located?"
          sub="We’ll use your location to help ensure you are compliant 
                with any local regulations."
          submit
          disabled={
            !(
              AddressLineOne.length > 0 &&
              AddressCity.length > 0 &&
              AddressZip.length > 0 &&
              AddressCountry?.length > 0
            )
          }
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={70}
          stage={stage}>
          <Grid margin="0px 0px 20px 0px" left>
            <FormField
              fieldType="input"
              width="80%"
              noMargin
              fontSize="14px"
              error={errors?.AddressLineOne}
              onChange={e => updateForm({ AddressLineOne: e.target.value })}
              value={AddressLineOne}>
              Address line 1
            </FormField>
            <FormField
              fieldType="input"
              fontSize="14px"
              width="80%"
              noMargin
              error={errors?.AddressLineTwo}
              onChange={e => updateForm({ AddressLineTwo: e.target.value })}
              value={AddressLineTwo}>
              Address line 2
            </FormField>
            <Grid2 margin="0px">
              <FormField
                fieldType="input"
                fontSize="14px"
                error={errors?.AddressCity}
                noMargin
                width="80%"
                onChange={e => updateForm({ AddressCity: e.target.value })}
                value={AddressCity}>
                City
              </FormField>
              <FormField
                fieldType="input"
                fontSize="14px"
                error={errors?.AddressZip}
                noMargin
                width="78%"
                onChange={e => updateForm({ AddressZip: e.target.value })}
                value={AddressZip}>
                Zip Code
              </FormField>
            </Grid2>
            <FormField
              fieldType="input"
              fontSize="14px"
              error={errors?.AddressCountry}
              width="80%"
              placeholder="Select Country"
              options={countriesList.map(country => {
                const newCountry = {
                  ...country,
                  label: country.name,
                  value: country.name
                }

                return newCountry
              })}
              noMargin
              onChange={e => updateForm({ AddressCountry: e.target.value })}
              value={AddressCountry}>
              Country/Region
            </FormField>
          </Grid>
        </CreateABusiness>
      )
    default:
      return <></>
  }
}

const UpdateAccountProfile = ({
  stage,
  updateRegisterForm,
  updateUser,
  token,
  role,
  FirstName,
  LastName,
  email,
  password,
  phoneNumber,
  AddressLineOne,
  AddressLineTwo,
  AddressLineCountry,
  AddressZip,
  AddressCity,
  AddressCountry,
  socialSecurityNumber,
  businessType,
  taxEIN,
  access,
  user
}) => {
  const tokens = token?.access_token || access
  const [errors, setErrors] = useState({
    role: '',
    FirstName: '',
    LastName: '',
    phoneNumber: '',
    businessType: '',
    taxEIN: '',
    AddressLineOne: '',
    AddressLineTwo: '',
    AddressCountry: '',
    AddressCity: '',
    AddressZip: ''
  })

  useEffect(() => {
    if (user?._id && user?.isAccountDetailCompleted) {
      router.push('/dashboard')
    }
  }, [user])

  const validateForm = () => {
    if (stage === 1) {
      if (role === -1) {
        setErrors({
          ...errors,
          role: 'Please select role.'
        })
        return false
      } else {
        setErrors({
          ...errors,
          role: ''
        })
      }
    } else if (stage === 2) {
      if (!FirstName) {
        setErrors({
          ...errors,
          FirstName: 'First Name is required!'
        })
        return false
      } else if (!/^[A-Za-z\s]+$/.test(FirstName)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          FirstName: 'First Name contains only alphabets and space!'
        }))
        return false
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          FirstName: ''
        }))
      }
      if (!LastName) {
        setErrors({
          ...errors,
          LastName: 'Last Name is required!'
        })
        return false
      } else if (!/^[A-Za-z\s]+$/.test(LastName)) {
        setErrors(prevErrors => ({
          ...prevErrors,
          LastName: 'Last Name contains only alphabets and space!'
        }))

        return false
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          LastName: ''
        }))
      }
      if (!phoneNumber) {
        setErrors(prevErrors => ({
          ...prevErrors,
          phoneNumber: 'Phone Number is required!'
        }))
        return false
      } else if (!/^(?:\+1\s?)?(\(\d{3}\)|\d{3})([\s.-]?)\d{3}[\s.-]?\d{4}$/.test(phoneNumber)) {
        // '(555) 123-4567', '555-123-4567', '555.123.4567', '+1 555-123-4567', '5551234567',
        // '555-1234' // Invalid
        setErrors(prevErrors => ({
          ...prevErrors,
          phoneNumber: 'Enter a valid Phone Number!'
        }))

        return false
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,

          phoneNumber: ''
        }))
      }
      if (!businessType) {
        setErrors(prevErrors => ({
          ...prevErrors,
          businessType: 'Business Type is required!'
        }))

        return false
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          businessType: ''
        }))
      }
      if (!taxEIN) {
        setErrors(prevErrors => ({
          ...prevErrors,
          taxEIN: 'Tax EIN is required!'
        }))

        return false
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          taxEIN: ''
        }))
      }
      setErrors(prevErrors => ({
        ...prevErrors,
        FirstName: '',
        LastName: '',
        phoneNumber: '',
        businessType: '',
        taxEIN: ''
      }))
    } else if (stage === 3) {
      if (!AddressLineOne) {
        setErrors(prevErrors => ({
          ...prevErrors,
          AddressLineOne: 'Address Line One is required!'
        }))

        return false
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          AddressLineOne: ''
        }))
      }
      if (!AddressLineTwo) {
        setErrors(prevErrors => ({
          ...prevErrors,
          AddressLineTwo: 'Address Line Two is required!'
        }))

        return false
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          AddressLineTwo: ''
        }))
      }

      if (!AddressCity) {
        setErrors(prevErrors => ({
          ...prevErrors,
          AddressCity: 'City is required!'
        }))

        return false
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          AddressCity: ''
        }))
      }
      if (!AddressZip) {
        setErrors(prevErrors => ({
          ...prevErrors,
          AddressZip: 'Zip code is required!'
        }))

        return false
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          AddressZip: ''
        }))
      }
      if (!AddressCountry) {
        setErrors(prevErrors => ({
          ...prevErrors,
          AddressCountry: 'Country is required!'
        }))

        return false
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          AddressCountry: ''
        }))
      }
      setErrors(prevErrors => ({
        ...prevErrors,
        AddressLineOne: '',
        AddressLineTwo: '',
        AddressCity: '',
        AddressZip: '',
        AddressCountry: ''
      }))
    }

    return true
  }

  const submitForm = async step => {
    if (validateForm()) {
      if (step < 3) {
        // submit form
        // if step is true then go forward 1 step
        updateRegisterForm({
          stage: step ? step + 1 : stage
        })
      } else {
        await updateUser(
          {
            role,
            FirstName,
            LastName,
            phoneNumber,
            AddressLineOne,
            AddressLineTwo,
            AddressLineCountry,
            AddressZip,
            AddressCity,
            AddressCountry,
            socialSecurityNumber,
            businessType,
            taxEIN,
            profileImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
            isAccountDetailCompleted: true
          },
          tokens
        )

        router.push('/dashboard?success=true')
      }
    }
  }

  const updateForm = data => {
    // update form
    updateRegisterForm({
      ...data
    })
  }

  const goBack = step => {
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
      <GetCard
        stage={stage}
        submitForm={submitForm}
        updateForm={updateForm}
        goBack={goBack}
        role={role}
        FirstName={FirstName}
        LastName={LastName}
        email={email}
        password={password}
        phoneNumber={phoneNumber}
        AddressLineOne={AddressLineOne}
        AddressLineTwo={AddressLineTwo}
        AddressLineCountry={AddressLineCountry}
        AddressZip={AddressZip}
        AddressCity={AddressCity}
        AddressCountry={AddressCountry}
        socialSecurityNumber={socialSecurityNumber}
        businessType={businessType}
        taxEIN={taxEIN}
        errors={errors}
      />
    </Container>
  )
}

UpdateAccountProfile.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)

const mapStateToProps = state => {
  return {
    user: state.Auth?.user,
    stage: state.Auth?.userForm?.stage,
    role: state.Auth.userForm?.role,
    FirstName: state.Auth.userForm?.FirstName,
    LastName: state.Auth.userForm?.LastName,
    email: state.Auth.userForm?.email,
    password: state.Auth.userForm?.password,
    phoneNumber: state.Auth.userForm?.phoneNumber,
    AddressLineOne: state.Auth.userForm?.AddressLineOne,
    AddressLineTwo: state.Auth.userForm?.AddressLineTwo,
    AddressLineCountry: state.Auth.userForm?.AddressLineCountry,
    AddressZip: state.Auth.userForm?.AddressZip,
    AddressCity: state.Auth.userForm?.AddressCity,
    AddressCountry: state.Auth.userForm?.AddressCountry,
    socialSecurityNumber: state.Auth?.userForm?.socialSecurityNumber,
    businessType: state.Auth?.userForm?.businessType,
    taxEIN: state.Auth?.userForm?.taxEIN,
    access: state.Auth?.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateRegisterForm: bindActionCreators(updateRegisterForm, dispatch),
    updateUser: bindActionCreators(updateUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccountProfile)
