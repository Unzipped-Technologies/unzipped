import React, { useState } from 'react'
import CreateABusiness from '../../CreateABusiness'
import { Grid } from '../../../../components/unzipped/dashboard/style'
import { FormField } from '../../../ui'
import CharacterCounter from '../CharacterCounter'

const StepTwoWizardFlow = ({ updateForm, goBack, submitForm, stage, name, isSubmitted, setIsSubmitted }) => {
  const [isAlterable, setIsAlterable] = useState(false)

  const handleInputChangeEvent = e => {
    if (name?.length >= 240) {
      if (isAlterable) {
        setIsAlterable(false)
        updateForm({ name: e.target.value })
      }
    } else {
      updateForm({ name: e.target.value })
    }
  }

  const handleKeydownEvent = e => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      setIsAlterable(true)
    }
  }
  return (
    <>
      <CreateABusiness
        title="Project Name"
        sub="Describe your project in as few words as possible"
        disabled={name?.length === 0}
        onUpdate={updateForm}
        onBack={() => goBack(stage)}
        onSubmit={submitForm}
        progress={stage}
        stage={stage}>
        <Grid id="step_2">
          <FormField
            fieldType="input"
            fontSize="20px"
            width="100%"
            id="projectName"
            placeholder="Describe your project here..."
            borderRadius="10px"
            onChange={value => {
              handleInputChangeEvent(value)
            }}
            value={name}
            onKeyDown={e => handleKeydownEvent(e)}
          />
        </Grid>
        <CharacterCounter field={'name'} />
      </CreateABusiness>
    </>
  )
}

export default StepTwoWizardFlow
