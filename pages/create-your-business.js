import React, { useState } from 'react'
import styled from 'styled-components'
import OptionTileGroup from '../components/ui/OptionTileGroup'
import CreateABusiness from '../components/unzipped/CreateABusiness'
import Button from '../components/ui/Button'
import FormField from '../components/ui/FormField'
import { ValidationUtils } from '../utils'
import { countriesList } from '../utils/constants'
import { Grid, Grid2, ContentContainer, ContainedSpan } from '../components/unzipped/dashboard/style'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateBusinessForm, createBusiness } from '../redux/actions'
import router from 'next/router'
import { parseCookies } from '../services/cookieHelper'
import { nextPublicGithubClientId } from '../config/keys'
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';


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
  isShortTermBusiness,
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
  // isFirstBusiness,
  // incomePlatform,
  // isExistingAudience,
  // socialMediaPlatforms = [],
  // numberOfSocialFollowing,
  // businessNiche,
  // businessAddressLineOne,
  // businessAddressLineTwo,
  // businessCountry,
  // businessCity,
  // isEquity,
  // typesOfHires,
  // equity,
  // businessZip,
  submitForm,
  updateForm,
  goBack,
  loading
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue,setInputValue]=useState('')

  const handleInput=(value)=>{
    setInputValue(value)
  }
  
  const handleInputFocus = (value) => {
    setIsFocused(value)
  }
  
  const handleSkip = () => {
    submitForm(stage)
  }

  const handleCancelIcon=(feildName,data,value)=>{
    updateForm({ [feildName]: data.filter(val=>val!==value) })
  }
  
  const handleEnterKey = (fieldName,data,e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      updateForm({ [fieldName]: [...data, inputValue] })
      handleInput('')
    }
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
      { label: 'Basic ($7 - $14)', value: 'Basic ($7 - $14)' },
      { label: 'Standard ($15 - $25)', value: 'Standard ($15 - $25)' },
      { label: 'Skilled ($25 - $50)', value: 'Skilled ($25 - $50)' },
      { label: 'Expert ($50 - $70)', value: 'Expert ($50 - $70)' },
      { label: 'More than a $70 per hour', value: 'More than a $70 per hour' },
      { label: 'Not Sure (See what my options are)', value: 'Not Sure (See what my options are)' }
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
          disabled={name?.length === 0}
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
              value={name}/>
          </Grid>
        </CreateABusiness>
      )

    case 3:
      if (isShortTermBusiness === 'true') {
        return (
          <CreateABusiness
            title="Describe the project"
            sub="What's the challenge you need to conquer? (in a sentence or two)"
            disabled={challenge?.length === 0}
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}>
            <Grid>
              <FormField
                textarea
                fieldType="input"
                fontSize="20px"
                width="100%"
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
            disabled={role?.length}
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}>
            <Grid>
              <FormField
                textarea
                fieldType="input"
                fontSize="20px"
                width="100%"
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
            disabled={objectives?.length === 0}
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
                handleEnterKey={(e)=>inputValue !== '' && handleEnterKey('objectives',objectives,e)}
                onChange={e => handleInput(e.target.value)}
                value={inputValue}
              />
              <Button
                disabled={inputValue === ''}
                position="absolute"
                right="50px"
                type="purple"
                buttonHeight="42px"
                zIndex={10}
                onClick={() => {
                  updateForm({ objectives: [...objectives, inputValue] })
                  handleInput('')
                }}>
                Add
              </Button>
            </Grid>
            <ContentContainer>
              {objectives.map(obj => (
                <div className="d-flex mb-3">
                  <div>
                    <ClearSharpIcon
                      style={{ fontSize: '7px', color: 'white', backgroundColor: '#333', margin: '0 8px 2px' }}
                      onClick={() => handleCancelIcon('objectives', objectives, obj)}
                    />
                  </div>
                  <span>{obj}</span>
                </div>
              ))}
            </ContentContainer>
          </CreateABusiness>
        )
      } else {
        return (
          <CreateABusiness
            title="Team Dynamics"
            sub="Tell us about the team they’ll join. What’s the culture and rhythm within your company?"
            disabled={teamDynamics?.length === 0}
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
                textarea
                fieldType="input"
                fontSize="20px"
                width="100%"
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
          disabled={requiredSkills?.length === 0}
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          {!!requiredSkills?.length && <ContentContainer padding='20px 5px 20px 10px '>
            {requiredSkills?.map(skill => (
              <ContainedSpan>
                  <ClearSharpIcon
                    style={{ fontSize: '7px', color: 'white', background: '#333', margin: '0 5px 2px' }}
                    onClick={() => handleCancelIcon('requiredSkills', requiredSkills, skill)}
                  />{skill}
              </ContainedSpan>
            ))}
          </ContentContainer>}
          <Grid margin={requiredSkills?.length && '0'}>
            <FormField
              justifySelf="start"
              width="90%"
              fieldType="input"
              fontSize="20px"
              placeholder="Type a skill and hit enter..."
              borderRadius="10px"
              handleInputFocusChange={handleInputFocus}
              isFocused={isFocused}
              handleEnterKey={(e)=>inputValue !== '' && requiredSkills.length<15 && handleEnterKey('requiredSkills',requiredSkills,e)}
              onChange={e => handleInput(e.target.value)}
              value={inputValue}
            />
            <Button
              position="absolute"
              right="50px"
              type="purple"
              buttonHeight="42px"
              disabled={inputValue === '' || requiredSkills.length>=15}
              zIndex={10}
              onClick={() => {
                updateForm({ requiredSkills: [...requiredSkills, inputValue] })
                handleInput('')
              }}>
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
          disabled={goals?.length === 0}
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
              textarea
              fieldType="input"
              fontSize="20px"
              width="100%"
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
          disabled={companyBackground?.length === 0}
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
              textarea
              fieldType="input"
              fontSize="20px"
              width="100%"
              borderRadius="10px"
              handleInputFocusChange={handleInputFocus}
              isFocused={isFocused}
              onChange={e =>updateForm({ companyBackground: e.target.value })}
              value={companyBackground}                
              />
          </Grid>
        </CreateABusiness>
      )
    case 8:
      return (
        <CreateABusiness
          title="Budget"
          sub="What size budget are you comfortable with for this hire?"
          disabled={budget?.length === 0}
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          <Grid>
            <FormField
              required
              fieldType="select"
              isSearchable={false}
              name="select"
              options={budgetOptions()}
              placeholder="Select your budget"
              fontSize="20px"
              width="100%"
              borderRadius="12px"
              handleInputFocusChange={handleInputFocus}
              isFocused={isFocused}
              onChange={e =>updateForm({ budget: e })}
              value={budget}/>
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
              extraWide
              noBorder
              type="dark"
              normal
              onClick={handleGithub}
              // disabled={isGithubConnected}
              >
              {/* {isGithubConnected ? 'GITHUB CONNECTED' : 'CONNECT YOUR GITHUB ACCOUNT'} */}
                CONNECT YOUR GITHUB ACCOUNT
            </Button>
          </Grid>
        </CreateABusiness>
      )}else{
        handleSkip()
      }
    case 10:
      return (
        <CreateABusiness
          title="Questions for Potential Hires"
          sub="What questions do you have for potential hires? (max three)"
          disabled={questionsToAsk?.length === 0}
          onUpdate={updateForm}
          onBack={() => goBack(isGithubConnected ? stage - 1 : stage)}
          onSubmit={submitForm}
          submit
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
              handleEnterKey={(e)=>inputValue !== '' && questionsToAsk.length<3 && handleEnterKey('questionsToAsk',questionsToAsk,e)}
              handleInputFocusChange={handleInputFocus}
              onFocus={isFocused}
              onChange={e => handleInput(e.target.value)}
              value={inputValue}
            />
            <Button
              disabled={inputValue === '' || questionsToAsk.length >= 3}
              zIndex={10}
              position="absolute"
              right="50px"
              type="purple"
              buttonHeight="42px"
              onClick={() => {
                updateForm({ questionsToAsk: [...questionsToAsk, inputValue] })
                handleInput('')
              }}>
              Add
            </Button>
          </Grid>
          <ContentContainer>
            {questionsToAsk.map(question => (
              <div className="d-flex mb-3">
                <div>
                  <ClearSharpIcon
                    style={{ fontSize: '7px', color: 'white', backgroundColor: '#333', margin: '0 8px 2px' }}
                    onClick={() => handleCancelIcon('questionsToAsk',questionsToAsk,question)}
                  />
                </div>
                <span>{question}</span>
              </div>
            ))}
          </ContentContainer>
        </CreateABusiness>
      )
    default:
      return <></>
  }
}

const CreateBusiness = ({
  stage,
  updateBusinessForm,
  isShortTermBusiness,
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
  // isFirstBusiness,
  // incomePlatform,
  // isExistingAudience,
  // socialMediaPlatforms = [],
  // numberOfSocialFollowing,
  // businessAddressLineOne,
  // businessAddressLineTwo,
  // businessCountry,
  // businessCity,
  // equity,
  // typesOfHires,
  // businessState,
  // businessZip,
  // businessNiche,
  // isEquity,
  loading,
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
          isShortTermBusiness,
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
          // isFirstBusiness,
          // isExistingAudience,
          // isEquity,
          // equity,
          // typesOfHires,
          // incomePlatform,
          // numberOfSocialFollowing,
          // socialMediaPlatforms,
          // businessNiche,
          // businessAddressLineOne,
          // businessAddressLineTwo,
          // businessCountry,
          // businessCity,
          // businessState,
          // businessZip,
          // businessImage: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
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
        isShortTermBusiness={isShortTermBusiness}
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
        // isFirstBusiness={isFirstBusiness}
        // incomePlatform={incomePlatform}
        // equity={equity}
        // isExistingAudience={isExistingAudience}
        // socialMediaPlatforms={socialMediaPlatforms}
        // typesOfHires={typesOfHires}
        // numberOfSocialFollowing={numberOfSocialFollowing}
        // businessAddressLineOne={businessAddressLineOne}
        // businessAddressLineTwo={businessAddressLineTwo}
        // businessCountry={businessCountry}
        // businessCity={businessCity}
        // businessState={businessState}
        // businessZip={businessZip}
        // businessNiche={businessNiche}
        // isEquity={isEquity}
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
    // isFirstBusiness: state.Business?.businessForm.isFirstBusiness,
    // isExistingAudience: state.Business?.businessForm.isExistingAudience,
    // isEquity: state.Business?.businessForm.isEquity,
    // equity: state.Business?.businessForm.equity,
    // deadline: state.Business?.businessForm.deadline,
    // typesOfHires: state.Business?.businessForm.typesOfHires,
    // incomePlatform: state.Business?.businessForm.incomePlatform,
    // numberOfSocialFollowing: state.Business?.businessForm.numberOfSocialFollowing,
    // socialMediaPlatforms: state.Business?.businessForm.socialMediaPlatforms,
    // businessNiche: state.Business?.businessForm.businessNiche,
    // businessAddressLineOne: state.Business?.businessForm.businessAddressLineOne,
    // businessAddressLineTwo: state.Business?.businessForm.businessAddressLineTwo,
    // businessCountry: state.Business?.businessForm.businessCountry,
    // businessCity: state.Business?.businessForm.businessCity,
    // businessState: state.Business?.businessForm.businessState,
    // businessZip: state.Business?.businessForm.businessZip,
    // description: state.Business?.businessForm.description,
    // businessImage: state.Business?.businessForm.businessImage,
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
