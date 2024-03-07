import React from 'react';
import CreateABusiness from '..';
import { Grid } from '../../dashboard/style';
import Button from '../../../ui/Button';

const StepElevenWizardFlow = (
    {
        updateForm,
        goBack,
        submitForm,
        stage,
        handleGithub
    }
) => {
    return (
        <CreateABusiness
            title="Do you currently have a github account?"
            sub="Connect your project to github so you can immidiately begin hiring developers and creating your project."
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}
        >
            <Grid>
                <Button icon="github" extraWide noBorder type="dark" normal onClick={handleGithub}>
                    CONNECT YOUR GITHUB ACCOUNT
                </Button>
            </Grid>
        </CreateABusiness>
    )
}

export default StepElevenWizardFlow