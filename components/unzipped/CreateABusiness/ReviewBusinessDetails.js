import React, { useEffect } from 'react'
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

const renderSectionContent = (fontWeight, fontSize, label, textStyle, marginBottom, padding = '0px') => {
  return (
    <ParagraphStyled
      fontFamily={'Roboto'}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={'23px'}
      letterSpacing={'0.5px'}
      textAlign={'left'}
      textStyle={textStyle}
      marginBottom={marginBottom}
      padding={padding}>
      {label}
    </ParagraphStyled>
  )
}

const ReviewBusinessDetails = ({ files = [], isGithubConnected, stage, isMobileViewActive = false }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const businessForm = useSelector(state => state.Business.businessForm)
  const accessToken = useSelector(state => state.Auth.token)
  const githubInfo = useSelector(state => state.Auth.thirdPartyDetails)
  const { wizardSubmission } = useSelector(state => state.Business)
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false)
  const FONT_SIZE = isMobileViewActive ? '16px' : '20px'
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
    if (files.length > 0) {
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
        budget: businessForm.budget,
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
    if (wizardSubmission.isSuccessfull) {
      router.push('/dashboard')
    }
  }, [wizardSubmission.isSuccessfull])

  return (
    <ReviewContainer>
      <ReviewContent>
        <HeaderTitleStyled>Review Project</HeaderTitleStyled>
        {!wizardSubmission.isSuccessfull && isFormSubmitted && (
          <WhiteCard row borderColor="#DE4E4E" background="#FCEDED">
            <DarkText noMargin>
              <span>{`Failed to create project ${businessForm?.name}. Please try again later!`}</span>
            </DarkText>
            <Absolute>
              <Dismiss onClick={handleNotificationDismissal}>Dismiss</Dismiss>
            </Absolute>
          </WhiteCard>
        )}
        {renderSectionContent(400, FONT_SIZE, REVIEW_SECTION_LABEL, '', '', '5px')}
        <ReviewSectionStyled>
          <ReviewHeaderSection
            label={BUSINESS_LABEL.project.details}
            isEditIconDisplayed={true}
            step={2}
            isMobileViewActive={isMobileViewActive}
          />
          <Items>
            {renderSectionContent(600, FONT_SIZE, BUSINESS_LABEL.project.name)}
            {renderSectionContent(400, FONT_SIZE, businessForm?.name)}
            {renderSectionContent(600, FONT_SIZE, BUSINESS_LABEL.project.length)}
            {renderSectionContent(400, FONT_SIZE, businessForm?.projectType)}
            {renderSectionContent(600, FONT_SIZE, BUSINESS_LABEL.project.description)}
            {renderSectionContent(400, FONT_SIZE, businessForm?.challenge || businessForm?.role)}
          </Items>
        </ReviewSectionStyled>
        <ReviewSectionStyled>
          <ReviewHeaderSection
            label={BUSINESS_LABEL.project.requirements}
            isEditIconDisplayed={true}
            step={5}
            isMobileViewActive={isMobileViewActive}
          />
          <div style={{ marginTop: 0 }}>
            {renderSectionContent(600, isMobileViewActive ? '18px' : '24px', 'Skills', null, '20px')}
            {businessForm?.requiredSkills?.map((skill, index) => (
              <TagStyled key={index}>{skill}</TagStyled>
            ))}
          </div>
        </ReviewSectionStyled>
        {businessForm?.teamDynamics && (
          <ReviewSectionStyled>
            <ReviewHeaderSection
              label={BUSINESS_LABEL.project.dynamics}
              isEditIconDisplayed={true}
              step={4}
              isMobileViewActive={isMobileViewActive}
            />
            <Items>
              {renderSectionContent(600, FONT_SIZE, TEAM_DYNAMICS_LABEL)}
              {renderSectionContent(400, FONT_SIZE, businessForm?.teamDynamics)}
            </Items>
          </ReviewSectionStyled>
        )}
        {businessForm?.goals && (
          <ReviewSectionStyled>
            <ReviewHeaderSection
              label={BUSINESS_LABEL.project.goals}
              isEditIconDisplayed={true}
              step={6}
              isMobileViewActive={isMobileViewActive}
            />
            <Items>
              {renderSectionContent(600, FONT_SIZE, PROJECT_GOALS_LABEL)}
              {renderSectionContent(400, FONT_SIZE, businessForm?.goals)}
            </Items>
          </ReviewSectionStyled>
        )}
        {businessForm?.companyBackground && (
          <ReviewSectionStyled>
            <ReviewHeaderSection
              label={BUSINESS_LABEL.project.background}
              isEditIconDisplayed={true}
              step={7}
              isMobileViewActive={isMobileViewActive}
            />
            <Items>
              {renderSectionContent(600, FONT_SIZE, COMPANY_BACKGROUND_LABEL)}
              {renderSectionContent(400, FONT_SIZE, businessForm?.companyBackground)}
            </Items>
          </ReviewSectionStyled>
        )}
        <ReviewSectionStyled>
          <ReviewHeaderSection
            label={BUSINESS_LABEL.project.additionalDetails}
            isEditIconDisplayed={true}
            step={8}
            isMobileViewActive={isMobileViewActive}
          />
          <Items>
            {renderSectionContent(600, FONT_SIZE, BUSINESS_LABEL.project.budget)}
            {renderSectionContent(400, FONT_SIZE, `${businessForm?.budget}`)}
          </Items>
          <Items>
            {renderSectionContent(600, FONT_SIZE, 'Interview Questions')}
            <ol>
              {businessForm?.questionsToAsk?.map((question, index) => (
                <li key={index}> {renderSectionContent(400, '18px', question)}</li>
              ))}
            </ol>
          </Items>
          {files.length > 0 && renderSectionContent(600, FONT_SIZE, BUSINESS_LABEL.project.projectImage)}
          {files.length > 0 && (
            <div style={{ marginTop: 30, display: 'flex', width: '100%', flexDirection: 'column', gap: '10px' }}>
              {files?.map((file, index) => (
                <>
                  <img
                    src={URL.createObjectURL(file)}
                    width={'100%'}
                    height={'200px'}
                    style={{ objectFit: 'cover', display: 'inline-block' }}
                    key={index}
                  />
                </>
              ))}
            </div>
          )}
        </ReviewSectionStyled>

        {isGithubConnected && (
          <ReviewSectionStyled>
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
        <div>
          <Button oval extraWide={true} type="outlineInverse2" onClick={handleBackNavigation}>
            BACK
          </Button>
        </div>
        <div>
          <Button onClick={handleSubmitProject} width="58.25px" extraWide={true} oval type="black">
            CREATE PROJECT
          </Button>
        </div>
      </ReviewSubmitSection>
    </ReviewContainer>
  )
}

export default ReviewBusinessDetails
