import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import Nav from '../../components/unzipped/header'
import {
  updateBusinessForm,
  createBusiness,
  getUserById,
  businessFieldsValidation,
  setProjectFiles
} from '../../redux/actions'
import { parseCookies } from '../../services/cookieHelper'
import { nextPublicGithubClientId } from '../../config/keys'
import GetCardDesktop from '../../components/unzipped/CreateABusiness/BusinessDesktopCard'
import GetCardMobile from '../../components/unzipped/CreateABusiness/BusinessMobileCard'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter'
import useWindowSize from '../../components/ui/hooks/useWindowSize'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9d9d9;
  height: ${({ stage }) => (stage !== 12 ? '100vh' : 'auto')};
  width: 100vw;
  @media (max-width: 680px) {
    display: block;
    height: auto;
  }
`

const MobileBox = styled.div`
  @media (min-width: 680px) {
    display: none;
  }
`

const DesktopBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 680px) {
    display: none;
  }
`

export const ContentContainer = styled('div')`
  padding: ${({ padding }) => (padding ? padding : '10px 20px')};
  width: ${({ width }) => (width ? width : '90%')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0px')};
  font-family: 'Roboto';
  line-height: 25px;
  font-weight: 500;
  font-size: 16px;

  ::-webkit-scrollbar {
    width: 4px;
    height: 7px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 7px;
    background: #cccccc;
  }
`

export const ContainedSpan = styled.span`
  border-radius: 4px;
  background-color: #d9d9d9;
  padding: 2px 10px 2px 2px;
  margin-right: 10px;
  text-wrap: nowrap;
`

const convertToBoolean = value => {
  if (value === 'true') return true
  if (value === 'false') return false
  return false
}

const CreateBusiness = ({
  stage,
  updateBusinessForm,
  projectType,
  name,
  challenge,
  role,
  objectives,
  teamDynamics,
  requiredSkills,
  goals,
  companyBackground,
  budgetRange,
  questionsToAsk,
  loading,
  createBusiness,
  token,
  accessToken,
  userDetails,
  projectFiles,
  businessForm
}) => {
  const router = useRouter()

  const dispatch = useDispatch()
  const isGithubConnected = convertToBoolean(router?.query?.['github-connect'])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [data, setData] = useState(null)
  const updateForm = data => {
    setData(data)
    updateBusinessForm({ ...data })
  }

  useEffect(() => {
    console.log('businessForm', businessForm)
  }, [businessForm, stage])

  const [inputValue, setInputValue] = useState('')
  const [files, setFiles] = useState([])

  const [isSmallWindow, setIsSmallWindow] = useState(false)
  const { width } = useWindowSize()

  useEffect(() => {
    if (width <= 600) {
      setIsSmallWindow(true)
    } else {
      setIsSmallWindow(false)
    }
  }, [width])

  const submitForm = step => {
    if (step < 12) {
      const isInputValNotValid = handleValidation(step)
      if (isInputValNotValid) return
      dispatch(businessFieldsValidation(false))
      setData({
        stage: step ? step + 1 : businessForm.stage
      })
      updateBusinessForm({
        stage: step ? step + 1 : businessForm.stage
      })
    } else {
      const formData = new FormData()
      if (projectFiles.length > 0) {
        projectFiles.forEach(file => {
          formData.append('images', file)
        })
      }
      formData.append(
        'projectDetails',
        JSON.stringify({
          projectType,
          name,
          challenge,
          role,
          objectives,
          teamDynamics,
          requiredSkills,
          goals,
          companyBackground,
          budget,
          questionsToAsk
        })
      )
      createBusiness(formData)
        .then(() => {
          router.push('/dashboard')
        })
        .catch(e => {})
    }
  }

  function handleGithub() {
    router.push(`https://github.com/login/oauth/authorize?client_id=${nextPublicGithubClientId}&scope=user:email`)
  }
  const goBack = step => {
    if (stage > 1) {
      updateBusinessForm({
        stage: (step || stage) - 1
      })
    } else {
      router.push('/dashboard')
    }
  }

  const handleInput = value => {
    setInputValue(value)
  }

  const handleSkip = (isFileSkipped = false) => {
    submitForm(stage)
  }

  const handleCancelIcon = (fieldName, data, value) => {
    if (fieldName.split(':')[0] === 'files' && projectFiles.length > 0) {
      const popFiles = [...projectFiles]
      popFiles.splice(parseInt(fieldName.split(':')[1]), 1)
      dispatch(setProjectFiles(popFiles))
      setFiles(popFiles)
    } else {
      updateForm({ [fieldName]: data.filter(val => val !== value) })
    }
  }

  const handleEnterKey = (fieldName, data, e) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      if (fieldName === 'questionsToAsk' && data[data.length] <= 10) {
        dispatch(businessFieldsValidation(true))
        setIsSubmitted(true)
        return true
      }
      updateForm({ [fieldName]: [...data, inputValue] })
      handleInput('')
    }
  }

  useEffect(() => {
    if (isGithubConnected && userDetails && userDetails._id) {
      dispatch(getUserById(userDetails._id))
    }
  }, [isGithubConnected])

  const handleValidation = step => {
    const roleOrDescriptionStep = isSmallWindow ? 4 : 3
    if (
      businessForm?.projectType == 'Long Term Collaboration' &&
      businessForm?.role.length < 200 &&
      step === roleOrDescriptionStep
    ) {
      dispatch(businessFieldsValidation(true))
      setIsSubmitted(true)
      return true
    }
    if (
      businessForm?.projectType == 'Short Term Business' &&
      businessForm?.challenge.length < 200 &&
      step === roleOrDescriptionStep
    ) {
      dispatch(businessFieldsValidation(true))
      setIsSubmitted(true)
      return true
    }
    if (businessForm?.name.length < 10 && step === 2) {
      dispatch(businessFieldsValidation(true))
      setIsSubmitted(true)
      return true
    }
  }

  return (
    <>
      {/* {businessForm?.stage > 11 && <Nav isSubMenu marginBottom={'0px'} zIndex={20} />} */}
      <Container stage={businessForm?.stage}>
        <DesktopBox data-testid="desktop_card">
          <GetCardDesktop
            stage={businessForm?.stage}
            submitForm={submitForm}
            updateForm={updateForm}
            goBack={goBack}
            inputValue={inputValue}
            isGithubConnected={isGithubConnected}
            handleInput={handleInput}
            handleSkip={handleSkip}
            handleCancelIcon={handleCancelIcon}
            handleEnterKey={handleEnterKey}
            loading={loading}
            projectType={businessForm?.projectType}
            name={businessForm?.name}
            challenge={businessForm?.challenge}
            role={businessForm?.role}
            objectives={objectives}
            teamDynamics={businessForm?.teamDynamics}
            requiredSkills={businessForm?.requiredSkills}
            goals={businessForm?.goals}
            companyBackground={businessForm?.companyBackground}
            budgetRange={businessForm?.budgetRange}
            questionsToAsk={businessForm?.questionsToAsk}
            files={businessForm?.files}
            setFiles={setFiles}
            handleGithub={handleGithub}
            userDetails={userDetails}
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
            projectFiles={projectFiles}
          />
        </DesktopBox>

        <MobileBox>
          <Nav isSubMenu marginBottom={'0px'} zIndex={20} />
          <GetCardMobile
            stage={stage}
            submitForm={submitForm}
            updateForm={updateForm}
            goBack={goBack}
            inputValue={inputValue}
            isGithubConnected={isGithubConnected}
            handleInput={handleInput}
            handleSkip={handleSkip}
            handleCancelIcon={handleCancelIcon}
            handleEnterKey={handleEnterKey}
            loading={loading}
            projectType={businessForm?.projectType}
            name={name}
            challenge={challenge}
            role={role}
            objectives={objectives}
            teamDynamics={teamDynamics}
            requiredSkills={requiredSkills}
            goals={goals}
            companyBackground={companyBackground}
            budgetRange={budgetRange}
            questionsToAsk={questionsToAsk}
            handleGithub={handleGithub}
          />
          <MobileFreelancerFooter defaultSelected="Create" />
        </MobileBox>
      </Container>
    </>
  )
}

CreateBusiness.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)

  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    name: state.Business?.businessForm.name,
    businessForm: state.Business?.businessForm,
    projectType: state.Business?.businessForm.projectType,
    challenge: state.Business?.businessForm.challenge,
    role: state.Business?.businessForm.role,
    objectives: state.Business?.businessForm.objectives,
    teamDynamics: state.Business?.businessForm.teamDynamics,
    requiredSkills: state.Business?.businessForm.requiredSkills,
    goals: state.Business?.businessForm.goals,
    companyBackground: state.Business?.businessForm.companyBackground,
    budgetRange: state.Business?.businessForm.budgetRange,
    questionsToAsk: state.Business?.businessForm.questionsToAsk,
    stage: state.Business?.businessForm.stage,
    loading: state.Business?.loading,
    accessToken: state.Auth.token,
    userDetails: state.Auth.user,
    projectFiles: state.Business?.files
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBusinessForm: bindActionCreators(updateBusinessForm, dispatch),
    createBusiness: bindActionCreators(createBusiness, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBusiness)
