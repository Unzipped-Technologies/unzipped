import React from 'react';
import CreateABusiness from '../../CreateABusiness';
import { Grid } from '../../../../components/unzipped/dashboard/style';
import { FormField } from '../../../ui';
import Button from '../../../../components/ui/Button';

const StepSixWizardFlow = ({
    goals,
    updateForm,
    goBack,
    submitForm,
    stage,
    handleSkip,
    SkipNextOutlinedIcon
}) => {
    return (
        <CreateABusiness
            title="Project Goals or Role Expectations"
            sub="Chart out the milestones. What achievements should be celebrated along the way?"
            disabled={goals?.length === 0}
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
                    borderRadius="10px"
                    onChange={e => updateForm({ goals: e.target.value })}
                    value={goals}
                />
            </Grid>
        </CreateABusiness>
    )
}

export default StepSixWizardFlow