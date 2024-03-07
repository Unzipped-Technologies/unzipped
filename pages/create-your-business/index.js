import React, { useEffect, useState } from 'react'
import router from 'next/router'
import { connect, useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import Nav from '../../components/unzipped/header'
import { updateBusinessForm, createBusiness, getUserById } from '../../redux/actions'
import { parseCookies } from '../../services/cookieHelper'
import { nextPublicGithubClientId } from '../../config/keys'
import GetCardDesktop from '../../components/unzipped/CreateABusiness/BusinessDesktopCard'
import GetCardMobile from '../../components/unzipped/CreateABusiness/BusinessMobileCard'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9d9d9;
  height: auto;
  margin-top:65px;
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
  max-height: 150px;
  padding: ${({ padding }) => (padding ? padding : '10px 20px')};
  width: ${({ width }) => (width ? width : '90%')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0px')};
  overflow-y: scroll;
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

function handleGithub() {
  router.push(`https://github.com/login/oauth/authorize?client_id=${nextPublicGithubClientId}&scope=user:email`)
}

const convertToBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return false;
};

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
  budget,
  questionsToAsk,
  loading,
  createBusiness,
  token,
  accessToken,
  userDetails
}) => {
  const dispatch = useDispatch();
  const businessForm = useSelector(state => state.Business?.businessForm);
  const isGithubConnected = (convertToBoolean(router?.query?.['github-connect']));

  const updateForm = data => updateBusinessForm({ ...data })
  const [inputValue, setInputValue] = useState('')
  const [files, setFiles] = useState([])
  const submitForm = step => {
    if (step < 12) {
      updateBusinessForm({
        stage: step ? step + 1 : stage
      })
    } else {
      const formData = new FormData()
      if (files.length > 0) {
        files.forEach(file => {
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
      createBusiness(formData, accessToken)
        .then(() => {
          router.push('/dashboard')
        })
        .catch(e => {
          console.log('error: ', e)
        })
    }
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

  const handleInput = value => setInputValue(value)

  const handleSkip = (isFileSkipped = false) => {
    if (isFileSkipped && files.length > 0) {
      setFiles([])
    }
    submitForm(stage)
  }

  const handleCancelIcon = (feildName, data, value) => {
    if (feildName.split(':')[0] === 'files' && files.length > 0) {
      const popFiles = [...files]
      popFiles.splice(parseInt(feildName.split(':')[1]), 1)
      setFiles(popFiles)
    } else {
      updateForm({ [feildName]: data.filter(val => val !== value) })
    }
  }

  const handleEnterKey = (fieldName, data, e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      updateForm({ [fieldName]: [...data, inputValue] })
      handleInput('')
    }
  }

  useEffect(() => {
    if (isGithubConnected && userDetails && userDetails._id) {
      dispatch(getUserById(userDetails._id))
    }
  }, [isGithubConnected]);


  return (
    <>
      {businessForm?.stage > 11 && (<Nav isSubMenu marginBottom={'0px'} zIndex={20} />)}
      <Container>
        <DesktopBox>
          <GetCardDesktop
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
            projectType={projectType}
            name={name}
            challenge={challenge}
            role={role}
            objectives={objectives}
            teamDynamics={teamDynamics}
            requiredSkills={requiredSkills}
            goals={goals}
            companyBackground={companyBackground}
            budget={budget}
            questionsToAsk={questionsToAsk}
            files={files}
            setFiles={setFiles}
            handleGithub={handleGithub}
            userDetails={userDetails}
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
            projectType={projectType}
            name={name}
            challenge={challenge}
            role={role}
            objectives={objectives}
            teamDynamics={teamDynamics}
            requiredSkills={requiredSkills}
            goals={goals}
            companyBackground={companyBackground}
            budget={budget}
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
    projectType: state.Business?.businessForm.projectType,
    challenge: state.Business?.businessForm.challenge,
    role: state.Business?.businessForm.role,
    objectives: state.Business?.businessForm.objectives,
    teamDynamics: state.Business?.businessForm.teamDynamics,
    requiredSkills: state.Business?.businessForm.requiredSkills,
    goals: state.Business?.businessForm.goals,
    companyBackground: state.Business?.businessForm.companyBackground,
    budget: state.Business?.businessForm.budget,
    questionsToAsk: state.Business?.businessForm.questionsToAsk,
    stage: state.Business?.businessForm.stage,
    loading: state.Business?.loading,
    accessToken: state.Auth.token,
    userDetails: state.Auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBusinessForm: bindActionCreators(updateBusinessForm, dispatch),
    createBusiness: bindActionCreators(createBusiness, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBusiness)
