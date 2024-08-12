import React from 'react'
import CreateABusiness from '..'
import { Grid } from '../../dashboard/style'
import { FormField } from '../../../ui'
import Button from '../../../ui/Button'

const StepSevenWizardFlow = ({
  companyBackground,
  updateForm,
  goBack,
  submitForm,
  stage,
  handleSkip,
  SkipNextOutlinedIcon
}) => {
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
          id="companyBackground"
          borderRadius="10px"
          onChange={e => updateForm({ companyBackground: e.target.value })}
          value={companyBackground}
        />
      </Grid>
    </CreateABusiness>
  )
}

export default StepSevenWizardFlow
