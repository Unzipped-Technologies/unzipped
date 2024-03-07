import React from 'react';
import CreateABusiness from '../../CreateABusiness';
import OptionTileGroup from '../../../ui/OptionTileGroup';
import { Grid } from '../../../../components/unzipped/dashboard/style';


const projectTypeOptions = () => {
    return [
        {
            label: `SHORT-TERM PROJECT`,
            value: 'Short Term Business'
        },
        {
            label: `LONG-TERM COLLABORATION`,
            value: 'Long Term Collaboration'
        }
    ]
}

const StepOneWizardFlow = ({
    projectType,
    updateForm,
    submitForm,
    stage
}) => {
    return (
        <CreateABusiness
            title={`Are you looking to hire for a long term hire?`}
            sub={`We’ll help you get started based on your business needs.`}
            onUpdate={updateForm}
            disabled={projectType === ''}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}
            projectType={projectType}
        >
            <Grid>
                <OptionTileGroup
                    availableWidth
                    selectedValue={projectType}
                    type="radio"
                    tileList={projectTypeOptions()}
                    onChange={e => updateForm({ projectType: e.target.value })}
                    stage={stage}
                />

            </Grid>
        </CreateABusiness>
    )
}

export default StepOneWizardFlow;