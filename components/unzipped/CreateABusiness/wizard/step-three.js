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

  const handleInputChangeEvent = e => {
    if (businessForm?.[fieldName]?.length >= 1000) {
      if (isAlterable) {
        setIsAlterable(false)
        updateForm({ [fieldName]: e.target.value })
      }
    } else {
      updateForm({ [fieldName]: e.target.value })
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
      disabled={challenge?.length === 0}
      onUpdate={updateForm}
      onBack={goBack}
      onSubmit={submitForm}
      progress={stage}
      stage={stage}>
      <Grid id="step_3">
        <FormField
          textarea
          fieldType="input"
          fontSize="20px"
          width="100%"
          placeholder="Enter Project Summary..."
          borderRadius="10px"
          id="summary"
          onChange={e => handleInputChangeEvent(e)}
          value={challenge}
          onKeyDown={handleKeydownEvent}
        />
      </Grid>
      <CharacterCounter field={'challenge'} />
    </CreateABusiness>
  ) : (
    <CreateABusiness
      title="Role Description"
      sub="Envision your ideal hire. What role will they play in your ongoing projects?"
      disabled={role?.length === 0}
      onUpdate={updateForm}
      onBack={goBack}
      onSubmit={submitForm}
      progress={stage}
      stage={stage}>
      <Grid id="step_3">
        <FormField
          textarea
          fieldType="input"
          fontSize="20px"
          width="100%"
          borderRadius="10px"
          id="role"
          onChange={e => handleInputChangeEvent(e)}
          value={role}
          onKeyDown={handleKeydownEvent}
        />
      </Grid>
      <CharacterCounter field={fieldName} />
    </CreateABusiness>
  )
}

export default StepThreeWizardFlow
