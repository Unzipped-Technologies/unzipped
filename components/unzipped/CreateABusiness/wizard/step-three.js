import React, { useState } from 'react'
import CreateABusiness from '../../CreateABusiness'
import { Grid } from '../../../../components/unzipped/dashboard/style'
import { FormField } from '../../../ui'
import CharacterCounter from '../CharacterCounter'
import { useSelector } from 'react-redux'

const StepThreeWizardFlow = ({ challenge, updateForm, goBack, submitForm, stage, role, projectType }) => {
  const { businessForm } = useSelector(state => state.Business)
  const [isAlterable, setIsAlterable] = useState(false)
  const fieldName = businessForm?.projectType === 'Short Term Business' ? 'challenge' : 'role'
  const [isError, setIsError] = useState(false); 

  const handleInputChangeEvent = e => {
    const value = e.target.value;
    if (value.length > 1000) {
      setIsError(true); 
      if (isAlterable) {
        setIsAlterable(false);
        updateForm({ [fieldName]: value });
      }
    } else {
      setIsError(false); 
      updateForm({ [fieldName]: value });
    }
  }

  const handleKeydownEvent = e => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      setIsAlterable(true)
    }
  }
  return projectType === 'Short Term Business' ? (
    <CreateABusiness
      title="Describe the project"
      sub="What's the challenge you need to conquer? (in a sentence or two)"
      disabled={isError}
      onUpdate={updateForm}
      onBack={goBack}
      onSubmit={submitForm}
      progress={stage}
      stage={stage}
    >
      <Grid id="step_3">
        <FormField
          textarea
          fieldType="input"
          fontSize="16px"
          width="100%"
          placeholder="Enter Project Summary..."
          borderRadius="10px"
          id="challenge"
          onChange={handleInputChangeEvent}
          value={challenge}
          onKeyDown={handleKeydownEvent}
        />
      </Grid>
      {isError && <p style={{ color: 'red', marginTop: '10px' }}>Exceeded character limit of 1000!</p>} 
      <CharacterCounter field={'challenge'} />
    </CreateABusiness>
  ) : (
    <CreateABusiness
      title="Role Description"
      sub="Envision your ideal hire. What role will they play in your ongoing projects?"
      disabled={isError}
      onUpdate={updateForm}
      onBack={goBack}
      onSubmit={submitForm}
      progress={stage}
      stage={stage}>
      <Grid id="step_3">
        <FormField
          textarea
          fieldType="input"
          fontSize="16px"
          width="100%"
          borderRadius="10px"
          id="role"
          onChange={handleInputChangeEvent}
          value={role}
          onKeyDown={handleKeydownEvent}
        />
      </Grid>
      {isError && <p style={{ color: 'red', marginTop: '10px' }}>Exceeded character limit of 1000!</p>} 
      <CharacterCounter field={fieldName} />
    </CreateABusiness>
  )
}

export default StepThreeWizardFlow
