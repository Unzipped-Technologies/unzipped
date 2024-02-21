import React, { useState } from 'react'
import styled from 'styled-components'
import Nav from '../components/unzipped/header'
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
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined'
import ClearSharpIcon from '@material-ui/icons/ClearSharp'
import MobileFreelancerFooter from '../components/unzipped/MobileFreelancerFooter'
import UploadImage from '../components/unzipped/image-upload/UploadImage'
import axios from 'axios'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9d9d9;
  height: 100vh;
  width: 100vw;
  @media (max-width: 680px) {
    display: block;
    height: auto;
  }
`

const MobileBox = styled.div`
@media (min-width: 680px) {
  display:none
}`

const DesktopBox = styled.div`
@media (max-width: 680px) {
  display:none;
}
`


const ContentContainer = styled('div')`
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

const ContainedSpan = styled.span`
  border-radius: 4px;
  background-color: #d9d9d9;
  padding: 2px 10px 2px 2px;
  margin-right: 10px;
  text-wrap: nowrap;
`

function handleGithub() {
  router.push(`https://github.com/login/oauth/authorize?client_id=${nextPublicGithubClientId}&scope=user:email`)
}

const projectTypeOptions = () => {
  return [
    {
      label: `SHORT-TERM PROJECT`,
      value: 'Short Term Business'
    },
    {
      label: `LONG-TERM COLLABORATION`,
      value: 'Long Term Collaboration'
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

const GetCardDesktop = ({
  stage,
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
  submitForm,
  updateForm,
  goBack,
  inputValue,
  isGithubConnected,
  handleInput,
  handleSkip,
  handleCancelIcon,
  handleEnterKey,
  loading,
  files,
  setFiles
}) => {
  switch (stage) {
    case 1:
      return (
        <CreateABusiness
          title={`Are you looking to hire for a long term hire?`}
          sub={`We’ll help you get started based on your business needs.`}
          onUpdate={updateForm}
          disabled={projectType === ''}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}
          projectType={projectType}>
          <Grid>
            <OptionTileGroup
              availableWidth
              selectedValue={projectType}
              type="radio"
              tileList={projectTypeOptions()}
              onChange={e => updateForm({ projectType: e.target.value })}
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
              onChange={e => updateForm({ name: e.target.value })}
              value={name}
            />
          </Grid>
        </CreateABusiness>
      )

    case 3:
      if (projectType === 'Short Term Business') {
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
                onChange={e => updateForm({ challenge: e.target.value })}
                value={challenge}
              />
            </Grid>
          </CreateABusiness>
        )
      } else {
        return (
          <CreateABusiness
            title="Role Description"
            sub="Envision your ideal hire. What role will they play in your ongoing projects?"
            disabled={role?.length === 0}
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
                onChange={e => updateForm({ role: e.target.value })}
                value={role}
              />
            </Grid>
          </CreateABusiness>
        )
      }

    case 4:
      if (projectType === 'Short Term Business') {
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
                handleEnterKey={e => inputValue !== '' && handleEnterKey('objectives', objectives, e)}
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
                onChange={e => updateForm({ teamDynamics: e.target.value })}
                value={teamDynamics}
              />
            </Grid>
          </CreateABusiness>
        )
      }

    case 5:
      return (
        <CreateABusiness
          title="Required Expertise"
          sub="What skills should they have mastered? List the abilities needed for your project (ex. React, AWS, SQL)."
          disabled={requiredSkills?.length === 0}
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          {!!requiredSkills?.length && (
            <ContentContainer padding="20px 5px 20px 10px ">
              {requiredSkills?.map(skill => (
                <ContainedSpan>
                  <ClearSharpIcon
                    style={{ fontSize: '7px', color: 'white', background: '#333', margin: '0 5px 2px' }}
                    onClick={() => handleCancelIcon('requiredSkills', requiredSkills, skill)}
                  />
                  {skill}
                </ContainedSpan>
              ))}
            </ContentContainer>
          )}
          <Grid margin={requiredSkills?.length && '0'}>
            <FormField
              justifySelf="start"
              width="90%"
              fieldType="input"
              fontSize="20px"
              placeholder="Type a skill and hit enter..."
              borderRadius="10px"
              handleEnterKey={e =>
                inputValue !== '' && requiredSkills.length < 15 && handleEnterKey('requiredSkills', requiredSkills, e)
              }
              onChange={e => handleInput(e.target.value)}
              value={inputValue}
            />
            <Button
              position="absolute"
              right="50px"
              type="purple"
              buttonHeight="42px"
              disabled={inputValue === '' || requiredSkills.length >= 15}
              zIndex={20}
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
              onChange={e => updateForm({ goals: e.target.value })}
              value={goals}
            />
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
              onChange={e => updateForm({ companyBackground: e.target.value })}
              value={companyBackground}
            />
          </Grid>
        </CreateABusiness>
      )
    case 11:
      if (!isGithubConnected) {
        return (
          <CreateABusiness
            title="Do you currently have a github account?"
            sub="Connect your project to github so you can immidiately begin hiring developers and creating your project."
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}
            submit
          // skip
          >
            <Grid>
              <Button icon="github" extraWide noBorder type="dark" normal onClick={handleGithub}>
                CONNECT YOUR GITHUB ACCOUNT
              </Button>
            </Grid>
          </CreateABusiness>
        )
      } else {
        handleSkip()
      }
    case 8:
      return (
        <CreateABusiness
          title="Budget"
          sub="What size budget are you comfortable with for this hire?"
          disabled={budget?.length === 0}
          onUpdate={updateForm}
          onBack={() => goBack(isGithubConnected ? stage - 1 : stage)}
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
              onChange={e => updateForm({ budget: e.value })}
              value={{ label: budget }}
            />
          </Grid>
        </CreateABusiness>
      )
    case 9:
      return (
        <CreateABusiness
          title="Questions for Potential Hires"
          sub="What questions do you have for potential hires? (max three)"
          disabled={questionsToAsk?.length === 0}
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          // submit
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
              handleEnterKey={e =>
                inputValue !== '' && questionsToAsk.length < 3 && handleEnterKey('questionsToAsk', questionsToAsk, e)
              }
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
                    onClick={() => handleCancelIcon('questionsToAsk', questionsToAsk, question)}
                  />
                </div>
                <span>{question}</span>
              </div>
            ))}
          </ContentContainer>
        </CreateABusiness>
      )
    case 10:
      return (
        <CreateABusiness
          title="Project Image"
          sub="Upload a photo here to represent your project. This will display in the projects section of your profile."
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}
        // submit
        // skip
        >
          <Button
            type="transparent"
            noUppercase
            noPadding
            position="absolute"
            right="50px"
            top="170px"
            onClick={() => handleSkip(true)}>
            Skip
            <SkipNextOutlinedIcon />
          </Button>
          <Grid margin={files?.length && '0'}>
            <UploadImage setFiles={setFiles} files={files} />
            {/* <p> You can only drop maximum 3 files here</p> */}
          </Grid>
          {!!files?.length && (
            <ContentContainer padding="20px 5px 20px 10px ">
              {files?.map((file, index) => (
                <ContainedSpan>
                  <ClearSharpIcon
                    style={{ fontSize: '7px', color: 'white', background: '#333', margin: '0 5px 2px' }}
                    onClick={() => handleCancelIcon(`files:${index}`)}
                  />
                  {file.name}
                </ContainedSpan>
              ))}
            </ContentContainer>
          )}
        </CreateABusiness>
      )

    default:
      return <></>
  }
}

const GetCardMobile = ({
  stage,
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
  submitForm,
  updateForm,
  goBack,
  inputValue,
  isGithubConnected,
  handleInput,
  handleSkip,
  handleCancelIcon,
  handleEnterKey,
  loading
}) => {
  switch (stage) {
    case 1:
      return (
        <CreateABusiness
          mobile
          sub={`Are you looking to hire for a long term hire?`}
          onUpdate={updateForm}
          onBack={goBack}
          disabled={projectType === ''}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          <Grid margin="0px 0px 50px 0px">
            <OptionTileGroup
              mobile
              availableWidth
              selectedValue={projectType}
              type="radio"
              tileList={projectTypeOptions()}
              onChange={e => updateForm({ projectType: e.target.value })}
              stage={stage}
            />
          </Grid>
        </CreateABusiness>
      )

    case 2:
      return (
        <CreateABusiness
          mobile
          title="Project Name"
          sub="Describe your project in as few words as possible"
          disabled={name?.length === 0}
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          <Grid margin="0px 0px 50px 0px">
            <FormField
              textarea
              mobile
              fieldType="input"
              fontSize="20px"
              width="100%"
              placeholder="Describe your project here..."
              borderRadius="10px"
              onChange={e => updateForm({ name: e.target.value })}
              value={name}
            />
          </Grid>
        </CreateABusiness>
      )

    case 3:
      if (projectType === 'Short Term Business') {
        return (
          <>
            <CreateABusiness
              mobile
              doubleScreenTop
              title="Describe the project"
              sub="What's the challenge you need to conquer? (in a sentence or two)"
              onUpdate={updateForm}
              onBack={goBack}
              onSubmit={submitForm}
              progress={stage}
              stage={stage}>
              <Grid margin="0px 0px 25px 0px">
                <FormField
                  textarea
                  mobile
                  fieldType="input"
                  fontSize="20px"
                  width="100%"
                  placeholder="Enter Project Summary..."
                  borderRadius="10px"
                  onChange={e => updateForm({ challenge: e.target.value })}
                  value={challenge}
                />
              </Grid>
            </CreateABusiness>
            <CreateABusiness
              mobile
              doubleScreenBottom
              sub="What are the specific tasks and objectives for this project"
              disabled={objectives?.length === 0 || challenge?.length === 0}
              onUpdate={updateForm}
              onBack={goBack}
              onSubmit={submitForm}
              stage={stage + 1}>
              <Grid margin="0px">
                <FormField
                  mobile
                  justifySelf="start"
                  width="100%"
                  fieldType="input"
                  fontSize="20px"
                  placeholder="Type a task and hit enter..."
                  borderRadius="10px"
                  handleEnterKey={e => inputValue !== '' && handleEnterKey('objectives', objectives, e)}
                  onChange={e => handleInput(e.target.value)}
                  value={inputValue}
                />
                <Button
                  margin="8px 0px"
                  block
                  disabled={inputValue === ''}
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
              <ContentContainer width="100%" padding="10px 0px">
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
          </>
        )
      } else {
        return (
          <>
            <CreateABusiness
              mobile
              doubleScreenTop
              title="Role Description"
              sub="Envision your ideal hire. What role will they play in your ongoing projects?"
              onUpdate={updateForm}
              onBack={goBack}
              onSubmit={submitForm}
              progress={stage}
              stage={stage}>
              <Grid margin="0px 0px 35px 0px">
                <FormField
                  textarea
                  mobile
                  fieldType="input"
                  fontSize="20px"
                  width="100%"
                  borderRadius="10px"
                  onChange={e => updateForm({ role: e.target.value })}
                  value={role}
                />
              </Grid>
            </CreateABusiness>
            <CreateABusiness
              mobile
              doubleScreenBottom
              title="Team Dynamics"
              sub="Tell us about the team they’ll join. What’s the culture and rhythm within your company?"
              disabled={teamDynamics?.length === 0 || role?.length === 0}
              onUpdate={updateForm}
              onBack={goBack}
              onSubmit={submitForm}
              stage={stage + 1}>
              <Grid margin="0px 0px 50px 0px">
                <FormField
                  textarea
                  mobile
                  fieldType="input"
                  fontSize="20px"
                  width="100%"
                  borderRadius="10px"
                  onChange={e => updateForm({ teamDynamics: e.target.value })}
                  value={teamDynamics}
                />
              </Grid>
            </CreateABusiness>
          </>
        )
      }

    case 4:
      if (projectType === 'Short Term Business') {
        return (
          <>
            <CreateABusiness
              mobile
              doubleScreenTop
              title="Describe the project"
              sub="What's the challenge you need to conquer? (in a sentence or two)"
              onUpdate={updateForm}
              onBack={goBack}
              onSubmit={submitForm}
              progress={stage - 1}
              stage={stage}>
              <Grid margin="0px 0px 25px 0px">
                <FormField
                  textarea
                  mobile
                  fieldType="input"
                  fontSize="20px"
                  width="100%"
                  placeholder="Enter Project Summary..."
                  borderRadius="10px"
                  onChange={e => updateForm({ challenge: e.target.value })}
                  value={challenge}
                />
              </Grid>
            </CreateABusiness>
            <CreateABusiness
              mobile
              doubleScreenBottom
              sub="What are the specific tasks and objectives for this project"
              disabled={objectives?.length === 0 || challenge?.length === 0}
              onUpdate={updateForm}
              onBack={() => goBack(stage - 1)}
              onSubmit={submitForm}
              stage={stage}>
              <Grid margin="0px">
                <FormField
                  mobile
                  justifySelf="start"
                  width="100%"
                  fieldType="input"
                  fontSize="20px"
                  placeholder="Type a task and hit enter..."
                  borderRadius="10px"
                  handleEnterKey={e => inputValue !== '' && handleEnterKey('objectives', objectives, e)}
                  onChange={e => handleInput(e.target.value)}
                  value={inputValue}
                />
                <Button
                  margin="8px 0px"
                  block
                  disabled={inputValue === ''}
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
              <ContentContainer width="100%" padding="10px 0px">
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
          </>
        )
      } else {
        return (
          <>
            <CreateABusiness
              mobile
              doubleScreenTop
              title="Role Description"
              sub="Envision your ideal hire. What role will they play in your ongoing projects?"
              onUpdate={updateForm}
              onBack={goBack}
              onSubmit={submitForm}
              progress={stage - 1}
              stage={stage}>
              <Grid margin="0px 0px 35px 0px">
                <FormField
                  textarea
                  mobile
                  fieldType="input"
                  fontSize="20px"
                  width="100%"
                  borderRadius="10px"
                  onChange={e => updateForm({ role: e.target.value })}
                  value={role}
                />
              </Grid>
            </CreateABusiness>
            <CreateABusiness
              mobile
              doubleScreenBottom
              title="Team Dynamics"
              sub="Tell us about the team they’ll join. What’s the culture and rhythm within your company?"
              disabled={teamDynamics?.length === 0 || role?.length === 0}
              onUpdate={updateForm}
              onBack={() => goBack(stage - 1)}
              onSubmit={submitForm}
              stage={stage}>
              <Grid margin="0px 0px 50px 0px">
                <FormField
                  textarea
                  mobile
                  fieldType="input"
                  fontSize="20px"
                  width="100%"
                  borderRadius="10px"
                  onChange={e => updateForm({ teamDynamics: e.target.value })}
                  value={teamDynamics}
                />
              </Grid>
            </CreateABusiness>
          </>
        )
      }

    case 5:
      return (
        <CreateABusiness
          mobile
          title="Required Expertise"
          sub="What skills should they have mastered? List the abilities needed for your project (ex. React, AWS, SQL)."
          disabled={requiredSkills?.length === 0}
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage - 1}
          stage={stage}>
          {!!requiredSkills?.length && (
            <ContentContainer width="100%" padding="5px 0px" marginBottom="10px">
              {requiredSkills?.map(skill => (
                <ContainedSpan>
                  <ClearSharpIcon
                    style={{ fontSize: '7px', color: 'white', background: '#333', margin: '0 5px 2px' }}
                    onClick={() => handleCancelIcon('requiredSkills', requiredSkills, skill)}
                  />
                  {skill}
                </ContainedSpan>
              ))}
            </ContentContainer>
          )}
          <Grid margin="0px 0px 35px 0px">
            <FormField
              mobile
              justifySelf="start"
              width="100%"
              fieldType="input"
              fontSize="20px"
              placeholder="Type a skill and hit enter..."
              borderRadius="10px"
              handleEnterKey={e =>
                inputValue !== '' && requiredSkills.length < 15 && handleEnterKey('requiredSkills', requiredSkills, e)
              }
              onChange={e => handleInput(e.target.value)}
              value={inputValue}
            />
            <Button
              margin="8px 0px"
              block
              type="purple"
              buttonHeight="42px"
              disabled={inputValue === '' || requiredSkills.length >= 15}
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
        <>
          <CreateABusiness
            mobile
            doubleScreenTop
            titleFontSize="16px"
            title="Project Goals or Role Expectations"
            sub="Chart out the milestones. What achievements should be celebrated along the way?"
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage - 1}
            stage={stage}>
            <Grid margin="0px 0px 35px 0px">
              <FormField
                mobile
                textarea
                fieldType="input"
                fontSize="20px"
                width="100%"
                borderRadius="10px"
                onChange={e => updateForm({ goals: e.target.value })}
                value={goals}
              />
            </Grid>
          </CreateABusiness>
          <CreateABusiness
            mobile
            doubleScreenBottom
            title="Company Background"
            titleFontSize="16px"
            sub="Every great story has a setting. What's the backdrop of your company or venture?"
            disabled={companyBackground?.length === 0 || goals?.length === 0}
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            stage={stage + 1}>
            <Grid margin="0px 0px 50px 0px">
              <FormField
                mobile
                textarea
                fieldType="input"
                fontSize="20px"
                width="100%"
                borderRadius="10px"
                onChange={e => updateForm({ companyBackground: e.target.value })}
                value={companyBackground}
              />
            </Grid>
          </CreateABusiness>
        </>
      )
    case 7:
      return (
        <>
          <CreateABusiness
            mobile
            doubleScreenTop
            titleFontSize="16px"
            title="Project Goals or Role Expectations"
            sub="Chart out the milestones. What achievements should be celebrated along the way?"
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage - 2}
            stage={stage}>
            <Grid margin="0px 0px 35px 0px">
              <FormField
                mobile
                textarea
                fieldType="input"
                fontSize="20px"
                width="100%"
                borderRadius="10px"
                onChange={e => updateForm({ goals: e.target.value })}
                value={goals}
              />
            </Grid>
          </CreateABusiness>
          <CreateABusiness
            mobile
            doubleScreenBottom
            title="Company Background"
            titleFontSize="16px"
            sub="Every great story has a setting. What's the backdrop of your company or venture?"
            disabled={companyBackground?.length === 0 || goals?.length === 0}
            onUpdate={updateForm}
            onBack={() => goBack(stage - 1)}
            onSubmit={submitForm}
            stage={stage}>
            <Grid margin="0px 0px 50px 0px">
              <FormField
                mobile
                textarea
                fieldType="input"
                fontSize="20px"
                width="100%"
                borderRadius="10px"
                onChange={e => updateForm({ companyBackground: e.target.value })}
                value={companyBackground}
              />
            </Grid>
          </CreateABusiness>
        </>
      )
    case 10:
      // if (!isGithubConnected) {
      return (
        <CreateABusiness
          mobile
          titleFontSize="16px"
          title="Do you currently have a github account?"
          sub="Connect your project to github so you can immidiately begin hiring developers and creating your project."
          onUpdate={updateForm}
          onBack={goBack}
          onSubmit={submitForm}
          progress={stage - 2}
          stage={stage}
          submit
        // skip
        >
          <Grid margin="50px 0px 100px 0px">
            <Button icon="github" noBorder type="dark" normal onClick={handleGithub}>
              CONNECT YOUR GITHUB ACCOUNT
            </Button>
          </Grid>
        </CreateABusiness>
      )
    // } else {
    //   handleSkip()
    // }
    case 8:
      return (
        <>
          <CreateABusiness
            mobile
            doubleScreenTop
            title="Budget"
            sub="What size budget are you comfortable with for this hire?"
            onUpdate={updateForm}
            onSubmit={submitForm}
            progress={stage - 2}
            stage={stage}>
            <Grid margin="0px 0px 40px 0px">
              <FormField
                mobile
                required
                height="45px"
                fieldType="select"
                isSearchable={false}
                name="select"
                options={budgetOptions()}
                placeholder="Select your budget"
                fontSize="20px"
                width="100%"
                borderRadius="12px"
                onChange={e => updateForm({ budget: e.value })}
                value={{ label: budget }}
              />
            </Grid>
          </CreateABusiness>
          <CreateABusiness
            mobile
            doubleScreenBottom
            title="Questions for Potential Hires"
            titleFontSize="16px"
            sub="What questions do you have for potential hires? (max three)"
            disabled={questionsToAsk?.length === 0 || budget?.length === 0}
            onUpdate={updateForm}
            onBack={() => goBack(isGithubConnected ? stage - 1 : stage)}
            onSubmit={submitForm}
            // submit
            stage={stage + 1}>
            <Grid margin="0px">
              <FormField
                mobile
                zIndexUnset
                justifySelf="start"
                width="100%"
                fieldType="input"
                fontSize="20px"
                placeholder="Type a question and hit enter..."
                borderRadius="10px"
                handleEnterKey={e =>
                  inputValue !== '' && questionsToAsk.length < 3 && handleEnterKey('questionsToAsk', questionsToAsk, e)
                }
                onChange={e => handleInput(e.target.value)}
                value={inputValue}
              />
              <Button
                margin="8px 0px"
                block
                disabled={inputValue === '' || questionsToAsk.length >= 3}
                type="purple"
                buttonHeight="42px"
                onClick={() => {
                  updateForm({ questionsToAsk: [...questionsToAsk, inputValue] })
                  handleInput('')
                }}>
                Add
              </Button>
            </Grid>
            <ContentContainer width="100%" padding="5px 0px" marginBottom="10px">
              {questionsToAsk.map(question => (
                <div className="d-flex mb-3">
                  <div>
                    <ClearSharpIcon
                      style={{ fontSize: '7px', color: 'white', backgroundColor: '#333', margin: '0 8px 2px' }}
                      onClick={() => handleCancelIcon('questionsToAsk', questionsToAsk, question)}
                    />
                  </div>
                  <span>{question}</span>
                </div>
              ))}
            </ContentContainer>
          </CreateABusiness>
        </>
      )
    case 9:
      return (
        <>
          <CreateABusiness
            mobile
            doubleScreenTop
            title="Budget"
            sub="What size budget are you comfortable with for this hire?"
            onUpdate={updateForm}
            onSubmit={submitForm}
            progress={stage - 3}
            stage={stage}>
            <Grid margin="0px 0px 40px 0px">
              <FormField
                mobile
                required
                height="45px"
                fieldType="select"
                isSearchable={false}
                name="select"
                options={budgetOptions()}
                placeholder="Select your budget"
                fontSize="20px"
                width="100%"
                borderRadius="12px"
                onChange={e => updateForm({ budget: e.value })}
                value={{ label: budget }}
              />
            </Grid>
          </CreateABusiness>
          <CreateABusiness
            mobile
            doubleScreenBottom
            title="Questions for Potential Hires"
            titleFontSize="16px"
            sub="What questions do you have for potential hires? (max three)"
            disabled={questionsToAsk?.length === 0 || budget?.length === 0}
            onUpdate={updateForm}
            // onBack={() => goBack((isGithubConnected ? stage - 1 : stage) - 1)}
            onBack={() => goBack(stage - 1)}
            onSubmit={submitForm}
            // submit
            stage={stage}>
            <Grid margin="0px">
              <FormField
                mobile
                zIndexUnset
                justifySelf="start"
                width="100%"
                fieldType="input"
                fontSize="20px"
                placeholder="Type a question and hit enter..."
                borderRadius="10px"
                handleEnterKey={e =>
                  inputValue !== '' && questionsToAsk.length < 3 && handleEnterKey('questionsToAsk', questionsToAsk, e)
                }
                onChange={e => handleInput(e.target.value)}
                value={inputValue}
              />
              <Button
                margin="8px 0px"
                block
                disabled={inputValue === '' || questionsToAsk.length >= 3}
                type="purple"
                buttonHeight="42px"
                onClick={() => {
                  updateForm({ questionsToAsk: [...questionsToAsk, inputValue] })
                  handleInput('')
                }}>
                Add
              </Button>
            </Grid>
            <ContentContainer width="100%" padding="5px 0px" marginBottom="10px">
              {questionsToAsk.map(question => (
                <div className="d-flex mb-3">
                  <div>
                    <ClearSharpIcon
                      style={{ fontSize: '7px', color: 'white', backgroundColor: '#333', margin: '0 8px 2px' }}
                      onClick={() => handleCancelIcon('questionsToAsk', questionsToAsk, question)}
                    />
                  </div>
                  <span>{question}</span>
                </div>
              ))}
            </ContentContainer>
          </CreateABusiness>
        </>
      )
    default:
      return <></>
  }
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
  budget,
  questionsToAsk,
  loading,
  createBusiness,
  token,
  access_token
}) => {

  const submitForm = step => {
    if (step < 11) {
      // submit form
      // if step is true then go forward 1 step
      updateBusinessForm({
        stage: step ? step + 1 : stage
      })
    } else {
      const formData = new FormData();
      if (files.length > 0) {
        files.forEach(file => {
          formData.append('images', file);
        });
      }
      formData.append("projectDetails",
        JSON.stringify(
          {
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
          }
        )
      );
      createBusiness(formData, access_token)
        .then(() => {
          router.push('/dashboard')
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

  const isGithubConnected = !!router?.query?.['github-connect'] || false

  const [inputValue, setInputValue] = useState('')
  const [files, setFiles] = useState([]);

  const handleInput = value => {
    setInputValue(value)
  }

  const handleSkip = (isFileSkipped = false) => {
    if (isFileSkipped && files.length > 0) {
      setFiles([])
    }
    submitForm(stage)
  }

  const handleCancelIcon = (feildName, data, value) => {
    if (feildName.split(":")[0] === "files" && files.length > 0) {
      const popFiles = [...files];
      popFiles.splice(parseInt(feildName.split(":")[1]), 1);
      setFiles(popFiles);
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


  return (
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
        />
        <MobileFreelancerFooter defaultSelected='Create' />
      </MobileBox>

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
    access_token: state.Auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBusinessForm: bindActionCreators(updateBusinessForm, dispatch),
    createBusiness: bindActionCreators(createBusiness, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBusiness)
