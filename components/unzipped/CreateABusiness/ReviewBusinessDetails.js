import React, { useEffect, useState } from 'react'
import {
  ReviewContainer,
  ParagraphStyled,
  HeaderTitleStyled,
  TagStyled,
  ReviewSectionStyled,
  ReviewContent,
  ReviewSubmitSection,
  Items
} from './business-styles'
import ReviewHeaderSection from './ReviewHeaderSection'
import { useDispatch, useSelector } from 'react-redux'
import {
  BUSINESS_LABEL,
  TEAM_DYNAMICS_LABEL,
  REVIEW_SECTION_LABEL,
  PROJECT_GOALS_LABEL,
  COMPANY_BACKGROUND_LABEL,
  GITHUB_INFO_LABEL
} from '../../../constants/application-constants'
import Button from '../../ui/Button'
import { createBusiness, updateBusinessForm, updateWizardSubmission } from '../../../redux/actions'
import { DarkText, Absolute, WhiteCard, Dismiss } from './../../../components/unzipped/dashboard/style'

import { useRouter } from 'next/router'

const renderSectionContent = (
  fontWeight,
  fontSize,
  label,
  textStyle,
  marginBottom,
  padding = '0px',
  letterSpacing = '0.5px'
) => {
  return (
    <ParagraphStyled
      fontFamily={'Roboto'}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={'23px'}
      letterSpacing={letterSpacing}
      textAlign={'left'}
      textStyle={textStyle}
      marginBottom={marginBottom}
      padding={padding}>
      {label}
    </ParagraphStyled>
  )
}

const ReviewBusinessDetails = ({ files, isGithubConnected, stage, isMobileViewActive = false }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const businessForm = useSelector(state => state.Business.businessForm)
  const accessToken = useSelector(state => state.Auth.token)
  const githubInfo = useSelector(state => state.Auth.thirdPartyDetails)
  const { wizardSubmission } = useSelector(state => state.Business)
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false)
  const FILES_ARRAY = useSelector(state => state.Business.files)
  const FONT_SIZE = isMobileViewActive ? '16px' : '20px'
  const [renderFiles, setRenderFiles] = useState([])

  const handleBackNavigation = () => {
    let wizradStep = 0
    if (isGithubConnected) {
      wizradStep = stage - 2
    } else {
      wizradStep = stage - 1
    }
    if (isMobileViewActive) {
      wizradStep = stage - 2
    }
    dispatch(
      updateBusinessForm({
        stage: wizradStep
      })
    )
  }
  const handleSubmitProject = () => {
    setIsFormSubmitted(true)
    const formData = new FormData()
    if (files?.length > 0) {
      files.forEach(file => {
        formData.append('images', file)
      })
    }
    formData.append(
      'projectDetails',
      JSON.stringify({
        projectType: businessForm.projectType,
        name: businessForm.name,
        challenge: businessForm.challenge,
        role: businessForm.role,
        objectives: businessForm.objectives,
        teamDynamics: businessForm.teamDynamics,
        requiredSkills: businessForm.requiredSkills,
        goals: businessForm.goals,
        companyBackground: businessForm.companyBackground,
        budgetRange: businessForm.budgetRange,
        questionsToAsk: businessForm.questionsToAsk
      })
    )

    dispatch(createBusiness(formData, true))
  }

  const handleNotificationDismissal = () => {
    dispatch(updateWizardSubmission({ isSuccessfull: false, projectName: '', error: '' }))
    setIsFormSubmitted(false)
  }

  useEffect(() => {
    if (wizardSubmission?.isSuccessfull) {
      router.push('/dashboard')
    }
  }, [wizardSubmission?.isSuccessfull])

  return (
    <ReviewContainer id="review_project">
      <ReviewContent>
        <HeaderTitleStyled>Review Project</HeaderTitleStyled>
        {!wizardSubmission?.isSuccessfull && isFormSubmitted && (
          <WhiteCard row borderColor="#DE4E4E" background="#FCEDED">
            <DarkText noMargin>
              <span>{`Failed to create project ${businessForm?.name}. Please try again later!`}</span>
            </DarkText>
            <Absolute>
              <Dismiss id="dismiss_notification" onClick={handleNotificationDismissal}>
                Dismiss
              </Dismiss>
            </Absolute>
          </WhiteCard>
        )}
        {renderSectionContent(400, FONT_SIZE, REVIEW_SECTION_LABEL, '', '', '5px')}
        <ReviewSectionStyled id="project_detail">
          <ReviewHeaderSection
            label={BUSINESS_LABEL.project.details}
            isEditIconDisplayed={true}
            step={3}
            isMobileViewActive={isMobileViewActive}
          />
          <Items>
            {renderSectionContent(600, '18px', BUSINESS_LABEL.project.name, '', '15px')}
            {renderSectionContent(400, '18px', businessForm?.name, '', '15px', '', '1.3px')}
            {renderSectionContent(600, '18px', BUSINESS_LABEL.project.length, '', '15px')}
            {renderSectionContent(400, '18px', businessForm?.projectType, '', '15px', '', '1.3px')}
            {renderSectionContent(600, '18px', BUSINESS_LABEL.project.description, '', '15px')}
            {renderSectionContent(400, '18px', businessForm?.challenge || businessForm?.role, '', '15px', '', '1.3px')}
          </Items>
        </ReviewSectionStyled>
        <ReviewSectionStyled id="project_requirements">
          <ReviewHeaderSection
            label={BUSINESS_LABEL.project.requirements}
            isEditIconDisplayed={true}
            step={5}
            isMobileViewActive={isMobileViewActive}
          />
          <div style={{ marginTop: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: '20px' }}>
              {renderSectionContent(600, isMobileViewActive ? '18px' : '18px', 'Skills', null, '40px')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '8px' }} id="required_skills">
              {businessForm?.requiredSkills?.map((skill, index) => (
                <TagStyled key={index}>{ValidationUtils.truncate(skill, 10)}</TagStyled>
              ))}
            </div>
          </div>
        </ReviewSectionStyled>
        {businessForm?.teamDynamics && (
          <ReviewSectionStyled id="team_dynamics">
            <ReviewHeaderSection
              label={BUSINESS_LABEL.project.dynamics}
              isEditIconDisplayed={true}
              step={4}
              isMobileViewActive={isMobileViewActive}
            />
            <Items>
              {renderSectionContent(600, '18px', TEAM_DYNAMICS_LABEL, '', '15px')}
              {renderSectionContent(400, '18px', businessForm?.teamDynamics, '', '15px', '', '1.3px')}
            </Items>
          </ReviewSectionStyled>
        )}
        {businessForm?.goals && (
          <ReviewSectionStyled id="goals">
            <ReviewHeaderSection
              label={BUSINESS_LABEL.project.goals}
              isEditIconDisplayed={true}
              step={6}
              isMobileViewActive={isMobileViewActive}
            />
            <Items>
              {renderSectionContent(600, '18px', PROJECT_GOALS_LABEL, '', '15px')}
              {renderSectionContent(400, '18px', businessForm?.goals, '', '15px', '', '1.3px')}
            </Items>
          </ReviewSectionStyled>
        )}
        {businessForm?.companyBackground && (
          <ReviewSectionStyled id="company_background">
            <ReviewHeaderSection
              label={BUSINESS_LABEL.project.background}
              isEditIconDisplayed={true}
              step={7}
              isMobileViewActive={isMobileViewActive}
            />
            <Items>
              {renderSectionContent(600, '18px', COMPANY_BACKGROUND_LABEL)}
              {renderSectionContent(400, '18px', businessForm?.companyBackground, '', '15px', '', '1.3px')}
            </Items>
          </ReviewSectionStyled>
        )}
        <ReviewSectionStyled id="additional_details">
          <ReviewHeaderSection
            label={BUSINESS_LABEL.project.additionalDetails}
            isEditIconDisplayed={true}
            step={8}
            isMobileViewActive={isMobileViewActive}
          />
          <Items id="budget">
            {renderSectionContent(600, '18px', BUSINESS_LABEL.project.budget)}
            {renderSectionContent(400, '18px', `${businessForm?.budgetRange}`)}
          </Items>
          <Items id="interview_questions">
            {renderSectionContent(600, '18px', 'Interview Questions')}
            <ol id="questions">
              {businessForm?.questionsToAsk?.map((question, index) => (
                <li key={index} id={question}>
                  {renderSectionContent(400, '18px', question, '', '10px', '', '1.3px')}
                </li>
              ))}
            </ol>
          </Items>
          {FILES_ARRAY &&
            FILES_ARRAY.length > 0 &&
            renderSectionContent(600, FONT_SIZE, BUSINESS_LABEL.project.projectImage)}
          {FILES_ARRAY && FILES_ARRAY.length > 0 && (
            <div
              style={{ marginTop: 30, display: 'flex', width: '100%', flexDirection: 'column', gap: '10px' }}
              id="project_images">
              {FILES_ARRAY?.map((file, index) => (
                <span key={index}>
                  {file instanceof File && (
                    <img
                      data-testid={`${file.name}_${index}`}
                      src={URL.createObjectURL(file)}
                      width={'100%'}
                      height={'200px'}
                      style={{ objectFit: 'cover', display: 'inline-block' }}
                      key={index}
                    />
                  )}
                </span>
              ))}
            </div>
          )}
        </ReviewSectionStyled>

        {isGithubConnected && (
          <ReviewSectionStyled id="github_info">
            <ReviewHeaderSection
              label={GITHUB_INFO_LABEL}
              isEditIconDisplayed={false}
              step={0}
              isMobileViewActive={isMobileViewActive}
            />
            <div style={{ marginTop: '20px' }}>{renderSectionContent(600, FONT_SIZE, `Profile Details`)}</div>
            <div style={{ marginTop: 30, display: 'inline-flex', gap: '20px' }}>
              <img
                src={`${githubInfo?.avatarUrl}`}
                alt="Github profile image"
                width={'40px'}
                height={'40px'}
                style={{ borderRadius: '50px' }}
              />
              {renderSectionContent(400, FONT_SIZE, `${githubInfo?.userName}`)}
            </div>
          </ReviewSectionStyled>
        )}
      </ReviewContent>
      <ReviewSubmitSection>
        <div style={{ marginRight: '25%' }}>
          <Button oval extraWide={true} type="outlineInverse2" onClick={handleBackNavigation}>
            BACK
          </Button>
        </div>
        <div>
          <Button onClick={handleSubmitProject} width="150px" extraWide={true} oval type="black">
            CREATE PROJECT
          </Button>
        </div>
      </ReviewSubmitSection>
    </ReviewContainer>
  )
}

export default ReviewBusinessDetails
