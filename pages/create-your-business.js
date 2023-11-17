import React, { useState } from 'react'
import styled from 'styled-components'
import OptionTileGroup from '../components/ui/OptionTileGroup'
import CreateABusiness from '../components/unzipped/CreateABusiness'
import Button from '../components/ui/Button'
import FormField from '../components/ui/FormField'
import { ValidationUtils } from '../utils'
import { countriesList } from '../utils/constants'
import { Grid, Grid2 } from '../components/unzipped/dashboard/style'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateBusinessForm, createBusiness } from '../redux/actions'
import router from 'next/router'
import { parseCookies } from '../services/cookieHelper'
import { nextPublicGithubClientId } from '../config/keys'
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9d9d9;
  height: 100vh;
  width: 100vw;
`

const CardContainer = styled.div`
  display: flex;
  width: 952px;
  height: 611px;
`

function handleGithub() {
  router.push(
    `https://github.com/login/oauth/authorize?client_id=${nextPublicGithubClientId}&scope=user:email`
  )
}

const GetCard = ({
  stage,
  // isFirstBusiness,
  isShortTermBusiness,
  challenge,
  role,
  objectives,
  teamDynamics,
  requiredSkills,
  goals,
  companyBackground,
  budget,
  questionsToAsk,
  incomePlatform,
  isExistingAudience,
  socialMediaPlatforms = [],
  numberOfSocialFollowing,
  businessNiche,
  name,
  businessAddressLineOne,
  businessAddressLineTwo,
  businessCountry,
  businessCity,
  isEquity,
  typesOfHires,
  equity,
  businessZip,
  submitForm,
  updateForm,
  goBack,
  loading
}) => {
  const [isFocused, setIsFocused] = useState(false)
  
  const handleInputFocus = (value) => {
    setIsFocused(value)
  }

  const handleSkip = () => {
    submitForm(stage)
  }

  const tileOptions = () => {
    return [
      {
        label: `SHORT-TERM PROJECT`,
        iconName: 'profileNew',
        value: 'true'
      },
      {
        label: `LONG-TERM COLLABORATION`,
        iconName: 'desktop',
        value: 'false'
      }
    ]
  }

  const budgetOptions = () => {
    return [
      'Basic ($7 - $14)',
      'Standard ($15 - $25)',
      'Skilled ($25 - $50)',
      'Expert ($50 - $70)',
      'More than a $70 per hour',
      'Not Sure (See what my options are)'
    ]
  }

  const isGithubConnected = !!router?.query?.['github-connect'] || false

  switch (stage) {
    case 1:
      return (
        <CreateABusiness
          title={`Are you looking to hire for a long term hire?`}
          sub={`We’ll help you get started based on your business needs.`}
          onUpdate={updateForm}
          onBack={goBack}
          disabled={isShortTermBusiness === ''}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          <Grid>
            <OptionTileGroup
              selectedValue={isShortTermBusiness}
              type="radio"
              tileList={tileOptions()}
              onChange={e => updateForm({ isShortTermBusiness: e.target.value })}
              stage={stage}
            />
          </Grid>
        </CreateABusiness>
      )

    case 2:
      return (
        <CreateABusiness
          title="Project Name"
          sub="Describe your project in as few words as possible"
          disabled={name.length === 0}
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          <Grid>
            <FormField
              fieldType="input"
              fontSize="20px"
              width="100%"
              placeholder="Describe your project here..."
              borderRadius="10px"
              handleInputFocusChange={handleInputFocus}
              isFocused={isFocused}
              onChange={e => updateForm({ name: e.target.value })}
              value={name}></FormField>
          </Grid>
        </CreateABusiness>
      )

    case 3:
      if (isShortTermBusiness === 'true') {
        return (
          <CreateABusiness
            title="Describe the project"
            sub="What's the challenge you need to conquer? (in a sentence or two)"
            disabled={challenge.length === 0}
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}>
            <Grid>
              <FormField
                fieldType="input"
                fontSize="20px"
                width="100%"
                height="147px"
                placeholder="Enter Project Summary..."
                borderRadius="10px"
                handleInputFocusChange={handleInputFocus}
                isFocused={isFocused}
                onChange={e => updateForm({ challenge: e.target.value })}
                value={challenge}></FormField>
            </Grid>
          </CreateABusiness>
        )
      } else {
        return (
          <CreateABusiness
            title="Role Description"
            sub="Envision your ideal hire. What role will they play in your ongoing projects?"
            disabled={role === undefined || role.length === 0}
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}>
            <Grid>
              <FormField
                fieldType="input"
                fontSize="20px"
                width="100%"
                height="147px"
                borderRadius="10px"
                handleInputFocusChange={handleInputFocus}
                isFocused={isFocused}
                onChange={e => updateForm({ role: e.target.value })}
                value={role}></FormField>
            </Grid>
          </CreateABusiness>
        )
      }

    case 4:
      if (isShortTermBusiness === 'true') {
        return (
          <CreateABusiness
            title="Give us the map. "
            sub="What are the specific tasks and objectives for this project"
            disabled={objectives?.length === 0 || objectives === undefined}
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}>
            <Grid>
              <FormField
                justifySelf="start"
                width="90%"
                fieldType="input"
                fontSize="20px"
                placeholder="Type a task and hit enter..."
                borderRadius="10px"
                handleInputFocusChange={handleInputFocus}
                isFocused={isFocused}
                onChange={e => updateForm({ objectives: e.target.value })}
                value={objectives}
              />
              <Button position="absolute" right="50px" type="purple" buttonHeight="42px">
                Add
              </Button>
            </Grid>
          </CreateABusiness>
        )
      } else {
        return (
          <CreateABusiness
            title="Team Dynamics"
            sub="Tell us about the team they’ll join. What’s the culture and rhythm within your company?"
            disabled={teamDynamics === undefined || teamDynamics.length === 0}
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}>
            <Button
              type="transparent"
              noUppercase
              noPadding
              position="absolute"
              right="50px"
              top="170px"
              onClick={handleSkip}>
              Skip
              <SkipNextOutlinedIcon />
            </Button>
            <Grid>
              <FormField
                fieldType="input"
                fontSize="20px"
                width="100%"
                height="147px"
                borderRadius="10px"
                handleInputFocusChange={handleInputFocus}
                isFocused={isFocused}
                onChange={e => updateForm({ teamDynamics: e.target.value })}
                value={teamDynamics}></FormField>
            </Grid>
          </CreateABusiness>
        )
      }

    case 5:
      return (
        <CreateABusiness
          title="Required Expertise"
          sub="What skills should they have mastered? List the abilities your project or role demands."
          disabled={requiredSkills?.length === 0 || requiredSkills === undefined}
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          <Grid>
            <FormField
              justifySelf="start"
              width="90%"
              fieldType="input"
              fontSize="20px"
              placeholder="Type a task and hit enter..."
              borderRadius="10px"
              handleInputFocusChange={handleInputFocus}
              isFocused={isFocused}
              onChange={e => updateForm({ requiredSkills: e.target.value })}
              value={requiredSkills}
            />
            <Button position="absolute" right="50px" type="purple" buttonHeight="42px">
              Add
            </Button>
          </Grid>
        </CreateABusiness>
      )
    case 6:
      return (
        <CreateABusiness
          title="Project Goals or Role Expectations"
          sub="Chart out the milestones. What achievements should be celebrated along the way?"
          disabled={goals === undefined || goals.length === 0}
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          <Button
            type="transparent"
            noUppercase
            noPadding
            position="absolute"
            right="50px"
            top="170px"
            onClick={handleSkip}>
            Skip
            <SkipNextOutlinedIcon />
          </Button>
          <Grid>
            <FormField
              fieldType="input"
              fontSize="20px"
              width="100%"
              height="147px"
              borderRadius="10px"
              handleInputFocusChange={handleInputFocus}
              isFocused={isFocused}
              onChange={e => updateForm({ goals: e.target.value })}
              value={goals}></FormField>
          </Grid>
        </CreateABusiness>
      )
    case 7:
      return (
        <CreateABusiness
          title="Company Background"
          sub="Every great story has a setting. What's the backdrop of your company or venture?"
          disabled={companyBackground === undefined || companyBackground.length === 0}
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          <Button
            type="transparent"
            noUppercase
            noPadding
            position="absolute"
            right="50px"
            top="170px"
            onClick={handleSkip}>
            Skip
            <SkipNextOutlinedIcon />
          </Button>
          <Grid>
            <FormField
              fieldType="input"
              fontSize="20px"
              width="100%"
              height="147px"
              borderRadius="10px"
              handleInputFocusChange={handleInputFocus}
              isFocused={isFocused}
              onChange={e => updateForm({ companyBackground: e.target.value })}
              value={companyBackground}></FormField>
          </Grid>
        </CreateABusiness>
      )
    case 8:
      return (
        <CreateABusiness
          title="Budget"
          sub="What size budget are you comfortable with for this hire?"
          disabled={budget === undefined || budget.length === 0}
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          <Grid>
            <FormField
              dropdownList={budgetOptions()}
              fieldType="input"
              fontSize="20px"
              width="100%"
              borderRadius="10px"
              handleInputFocusChange={handleInputFocus}
              isFocused={isFocused}
              onChange={e => updateForm({ budget: e.target.value })}
              value={budget}></FormField>
          </Grid>
        </CreateABusiness>
      )
    case 9:
      if(!isGithubConnected){
      return (
        <CreateABusiness
          title="Do you currently have a github account?"
          sub="Connect your project to github so you can immidiately begin hiring developers and creating your project."
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}
          skip={!isGithubConnected}>
          <Grid>
            <Button
              icon="github"
              // extraTall
              // extraWide
              noBorder
              type="dark"
              normal
              onClick={handleGithub}
              disabled={isGithubConnected}>
              {isGithubConnected ? 'GITHUB CONNECTED' : 'CONNECT YOUR GITHUB ACCOUNT'}
            </Button>
          </Grid>
        </CreateABusiness>
      )}else{
        handleSkip()
      }
    case 10:
      console.log('questionsToAsk: ', questionsToAsk)
      return (
        <CreateABusiness
          title="Questions for Potential Hires"
          sub="What questions do you have for potential hires? (max three)"
          disabled={questionsToAsk?.length === 0 || questionsToAsk === undefined}
          onUpdate={updateForm}
          onBack={()=>goBack(isGithubConnected ? stage-1 : stage)}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          <Grid>
            <FormField
              justifySelf="start"
              width="90%"
              fieldType="input"
              fontSize="20px"
              placeholder="Type a question and hit enter..."
              borderRadius="10px"
              handleInputFocusChange={handleInputFocus}
              isFocused={isFocused}
              onChange={e => updateForm({ questionsToAsk: e.target.value })}
              value={questionsToAsk}
            />
            <Button
              disabled={questionsToAsk.length > 3}
              position="absolute"
              right="50px"
              type="purple"
              buttonHeight="42px">
              Add
            </Button>
          </Grid>
        </CreateABusiness>
      )
    default:
      return <></>
  }
}

const CreateBusiness = ({
  stage,
  updateBusinessForm,
  // isFirstBusiness,
  isShortTermBusiness,
  challenge,
  role,
  objectives,
  teamDynamics,
  requiredSkills,
  goals,
  companyBackground,
  budget,
  questionsToAsk,
  incomePlatform,
  isExistingAudience,
  socialMediaPlatforms = [],
  numberOfSocialFollowing,
  businessAddressLineOne,
  businessAddressLineTwo,
  businessCountry,
  businessCity,
  equity,
  loading,
  typesOfHires,
  businessState,
  businessZip,
  businessNiche,
  isEquity,
  name,
  createBusiness,
  token
}) => {
  const submitForm = step => {
    if (step < 10) {
      // submit form
      // if step is true then go forward 1 step
      updateBusinessForm({
        stage: step ? step + 1 : stage
      })
    } else {
      createBusiness(
        {
          name,
          // isFirstBusiness,
          isShortTermBusiness,
          challenge,
          role,
          objectives,
          teamDynamics,
          requiredSkills,
          goals,
          companyBackground,
          budget,
          questionsToAsk,
          isExistingAudience,
          isEquity,
          equity,
          typesOfHires,
          incomePlatform,
          numberOfSocialFollowing,
          socialMediaPlatforms,
          businessNiche,
          businessAddressLineOne,
          businessAddressLineTwo,
          businessCountry,
          businessCity,
          businessState,
          businessZip,
          businessImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
        },
        token.access_token
      )
        .then(() => {
          router.push('/dashboard?success=true')
        })
        .catch(e => {
          console.log('error: ', e)
        })
    }
  }

  const updateForm = data => {
    // update form
    updateBusinessForm({
      ...data
    })
  }

  const goBack = step => {
    // update form step
    // if on 1st page go back to dashboard
    if (stage > 1) {
      updateBusinessForm({
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
        loading={loading}
        // isFirstBusiness={isFirstBusiness}
        isShortTermBusiness={isShortTermBusiness}
        challenge={challenge}
        role={role}
        objectives={objectives}
        teamDynamics={teamDynamics}
        requiredSkills={requiredSkills}
        goals={goals}
        companyBackground={companyBackground}
        budget={budget}
        questionsToAsk={questionsToAsk}
        incomePlatform={incomePlatform}
        equity={equity}
        isExistingAudience={isExistingAudience}
        socialMediaPlatforms={socialMediaPlatforms}
        typesOfHires={typesOfHires}
        numberOfSocialFollowing={numberOfSocialFollowing}
        businessAddressLineOne={businessAddressLineOne}
        businessAddressLineTwo={businessAddressLineTwo}
        businessCountry={businessCountry}
        businessCity={businessCity}
        businessState={businessState}
        businessZip={businessZip}
        businessNiche={businessNiche}
        isEquity={isEquity}
        name={name}
      />
    </Container>
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
    // isFirstBusiness: state.Business?.businessForm.isFirstBusiness,
    isShortTermBusiness: state.Business?.businessForm.isShortTermBusiness,
    challenge: state.Business?.businessForm.challenge,
    role: state.Business?.businessForm.role,
    objectives: state.Business?.businessForm.objectives,
    teamDynamics: state.Business?.businessForm.teamDynamics,
    requiredSkills: state.Business?.businessForm.requiredSkills,
    goals: state.Business?.businessForm.goals,
    companyBackground: state.Business?.businessForm.companyBackground,
    budget: state.Business?.businessForm.budget,
    questionsToAsk: state.Business?.businessForm.questionsToAsk,
    isExistingAudience: state.Business?.businessForm.isExistingAudience,
    isEquity: state.Business?.businessForm.isEquity,
    equity: state.Business?.businessForm.equity,
    deadline: state.Business?.businessForm.deadline,
    typesOfHires: state.Business?.businessForm.typesOfHires,
    incomePlatform: state.Business?.businessForm.incomePlatform,
    numberOfSocialFollowing: state.Business?.businessForm.numberOfSocialFollowing,
    socialMediaPlatforms: state.Business?.businessForm.socialMediaPlatforms,
    businessNiche: state.Business?.businessForm.businessNiche,
    businessAddressLineOne: state.Business?.businessForm.businessAddressLineOne,
    businessAddressLineTwo: state.Business?.businessForm.businessAddressLineTwo,
    businessCountry: state.Business?.businessForm.businessCountry,
    businessCity: state.Business?.businessForm.businessCity,
    businessState: state.Business?.businessForm.businessState,
    businessZip: state.Business?.businessForm.businessZip,
    description: state.Business?.businessForm.description,
    businessImage: state.Business?.businessForm.businessImage,
    stage: state.Business?.businessForm.stage,
    loading: state.Business?.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBusinessForm: bindActionCreators(updateBusinessForm, dispatch),
    createBusiness: bindActionCreators(createBusiness, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBusiness)
