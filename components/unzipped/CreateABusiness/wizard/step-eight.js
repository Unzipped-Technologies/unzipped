import React from 'react'
import CreateABusiness from '..'
import { Grid } from '../../dashboard/style'
import { FormField } from '../../../ui'

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

const StepEightWizardFlow = ({ budgetRange, updateForm, goBack, submitForm, stage, isGithubConnected }) => {
  return (
    <CreateABusiness
      title="Budget"
      sub="What size budget are you comfortable with for this hire?"
      disabled={budgetRange?.length === 0}
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
          name="budget"
          options={budgetOptions()}
          placeholder="Select your budget"
          fontSize="20px"
          width="100%"
          borderRadius="12px"
          onChange={e => updateForm({ budgetRange: e?.value })}
          value={{ label: budgetRange }}
        />
      </Grid>
    </CreateABusiness>
  )
}

export default StepEightWizardFlow
