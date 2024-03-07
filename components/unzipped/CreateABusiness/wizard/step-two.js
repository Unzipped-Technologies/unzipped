import React from 'react';
import CreateABusiness from '../../CreateABusiness';
import { Grid } from '../../../../components/unzipped/dashboard/style';
import { FormField } from '../../../ui';
const StepTwoWizardFlow = ({
    updateForm,
    goBack,
    submitForm,
    stage,
    name
}) => {
    return (
        <CreateABusiness
            title="Project Name"
            sub="Describe your project in as few words as possible"
            disabled={name?.length === 0}
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}>
            <Grid>
                <FormField
                    fieldType="input"
                    fontSize="20px"
                    width="100%"
                    placeholder="Describe your project here..."
                    borderRadius="10px"
                    onChange={e => updateForm({ name: e.target.value })}
                    value={name}
                />
            </Grid>
        </CreateABusiness>
    )
}

export default StepTwoWizardFlow