import React from 'react'
import CreateABusiness from '../../CreateABusiness';
import { Grid } from '../../../../components/unzipped/dashboard/style';
import { FormField } from '../../../ui';

const StepThreeWizardFlow = ({
    challenge,
    updateForm,
    goBack,
    submitForm,
    stage,
    role,
    projectType
}) => {
    return (
        (projectType === "Short Term Business" ? (<CreateABusiness
            title="Describe the project"
            sub="What's the challenge you need to conquer? (in a sentence or two)"
            disabled={challenge?.length === 0}
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}>
            <Grid>
                <FormField
                    textarea
                    fieldType="input"
                    fontSize="20px"
                    width="100%"
                    placeholder="Enter Project Summary..."
                    borderRadius="10px"
                    onChange={e => updateForm({ challenge: e.target.value })}
                    value={challenge}
                />
            </Grid>
        </CreateABusiness>)
            :
            (<CreateABusiness
                title="Role Description"
                sub="Envision your ideal hire. What role will they play in your ongoing projects?"
                disabled={role?.length === 0}
                onUpdate={updateForm}
                onBack={goBack}
                onSubmit={submitForm}
                progress={stage}
                stage={stage}>
                <Grid>
                    <FormField
                        textarea
                        fieldType="input"
                        fontSize="20px"
                        width="100%"
                        borderRadius="10px"
                        onChange={e => updateForm({ role: e.target.value })}
                        value={role}
                    />
                </Grid>
            </CreateABusiness>)
        )
    )
}

export default StepThreeWizardFlow