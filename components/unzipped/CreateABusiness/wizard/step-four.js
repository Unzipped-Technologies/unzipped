import React from 'react'
import CreateABusiness from '../../CreateABusiness'
import { Grid, TEXT } from '../../../../components/unzipped/dashboard/style'
import Button from '../../../../components/ui/Button'
import { FormField } from '../../../ui'
import { ContentContainer } from '../../../../pages/create-your-business'
import ClearSharpIcon from '@material-ui/icons/ClearSharp'

const StepFourWizardFlow = ({
  objectives,
  updateForm,
  goBack,
  submitForm,
  stage,
  projectType,
  inputValue,
  handleInput,
  handleCancelIcon,
  handleEnterKey,
  teamDynamics,
  handleSkip,
  SkipNextOutlinedIcon
}) => {
  return (
    <>
      {projectType === 'Short Term Business' ? (
        <CreateABusiness
          title="Give us the map. "
          sub="What are the specific tasks and objectives for this project"
          disabled={objectives?.length === 0}
          onUpdate={updateForm}
          onBack={() => goBack(stage)}
          onSubmit={submitForm}
          progress={stage}
          stage={stage}>
          <Grid>
            <FormField
              justifySelf="start"
              width="90%"
              fieldType="input"
              fontSize="20px"
              id="tasks"
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
            {objectives.map((obj, index) => (
              <div className="d-flex mb-3" key={`${obj}_${index}`}>
                <div>
                  <ClearSharpIcon
                    id={`${obj}_${index}`}
                    style={{ fontSize: '7px', color: 'white', backgroundColor: '#333', margin: '0 8px 2px' }}
                    onClick={() => handleCancelIcon('objectives', objectives, obj)}
                  />
                </div>
                <TEXT
                  fontWeight="500"
                  fontSize="16px"
                  lineHeight="24.5px"
                  letterSpacing="0.4px"
                  textAlign="center"
                  textColor="#000000">
                  {obj}
                </TEXT>
              </div>
            ))}
          </ContentContainer>
        </CreateABusiness>
      ) : (
        <CreateABusiness
          title="Team Dynamics"
          sub="Tell us about the team they’ll join. What’s the culture and rhythm within your company?"
          disabled={teamDynamics?.length === 0}
          onUpdate={updateForm}
          onBack={() => goBack(stage)}
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
              fontSize="16px"
              id="teamDynamics"
              width="100%"
              borderRadius="10px"
              onChange={e => updateForm({ teamDynamics: e.target.value })}
              value={teamDynamics}
            />
          </Grid>
        </CreateABusiness>
      )}
    </>
  )
}

export default StepFourWizardFlow
