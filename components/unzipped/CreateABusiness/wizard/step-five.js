import React from 'react'
import CreateABusiness from '../../CreateABusiness'
import { Grid } from '../../../../components/unzipped/dashboard/style'
import Button from '../../../../components/ui/Button'
import { FormField } from '../../../ui'
import { ContentContainer, ContainedSpan } from '../../../../pages/create-your-business'
import ClearSharpIcon from '@material-ui/icons/ClearSharp'

const StepFiveWizardFlow = ({
  requiredSkills,
  updateForm,
  goBack,
  submitForm,
  stage,
  inputValue,
  handleEnterKey,
  handleInput,
  handleCancelIcon
}) => {
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
          {requiredSkills?.map((skill, index) => (
            <ContainedSpan key={skill + '_' + index}>
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
          id="skills"
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
}

export default StepFiveWizardFlow
