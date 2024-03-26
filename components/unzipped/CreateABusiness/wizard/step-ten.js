import React from 'react';
import CreateABusiness from '..';
import { Grid } from '../../dashboard/style';
import Button from '../../../ui/Button';
import { ContentContainer, ContainedSpan } from '../../../../pages/create-your-business';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import UploadImage from '../../image-upload/UploadImage';

const StepTenWizardFlow = ({
    updateForm,
    goBack,
    submitForm,
    stage,
    handleSkip,
    files,
    setFiles,
    handleCancelIcon,
    SkipNextOutlinedIcon
}) => {
    return (
        <CreateABusiness
            title="Project Image"
            sub="Upload a photo here to represent your project. This will display in the projects section of your profile."
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}
        >
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
            <Grid margin={files?.length && '0'}>
                <UploadImage setFiles={setFiles} files={files} />
            </Grid>
            {!!files?.length && (
                <ContentContainer padding="20px 5px 20px 10px ">
                    {files?.map((file, index) => (
                        <ContainedSpan>
                            <ClearSharpIcon
                                style={{ fontSize: '7px', color: 'white', background: '#333', margin: '0 5px 2px' }}
                                onClick={() => handleCancelIcon(`files:${index}`)}
                            />
                            {file.name}
                        </ContainedSpan>
                    ))}
                </ContentContainer>
            )}
        </CreateABusiness>
    )
}

export default StepTenWizardFlow;