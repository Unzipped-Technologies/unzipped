import React from 'react'
import CreateABusiness from '..'
import { Grid } from '../../dashboard/style'
import Button from '../../../ui/Button'

const StepElevenWizardFlow = ({
  updateForm,
  goBack,
  submitForm,
  stage,
  handleGithub,
  SkipNextOutlinedIcon,
  handleSkip
}) => {
  return (
    <CreateABusiness
      title="Do you currently have a github account?"
      sub="Connect your project to github so you can immidiately begin hiring developers and creating your project."
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
        onClick={() => handleSkip(true)}>
        Skip
        <SkipNextOutlinedIcon />
      </Button>
      <Grid>
        <Button icon="github" extraWide noBorder type="dark" normal onClick={handleGithub}>
          CONNECT YOUR GITHUB ACCOUNT
        </Button>
      </Grid>
    </CreateABusiness>
  )
}

export default StepElevenWizardFlow
