import React from 'react'
import CreateABusiness from '..'
import { Grid } from '../../dashboard/style'
import Button from '../../../ui/Button'
import { ContentContainer, ContainedSpan } from '../../../../pages/create-your-business'
import ClearSharpIcon from '@material-ui/icons/ClearSharp'
import UploadImage from '../../image-upload/UploadImage'
import { useDispatch } from 'react-redux'
const MAX_FLIMENAME_LENGTH = 40

const StepTenWizardFlow = ({
  updateForm,
  goBack,
  submitForm,
  stage,
  handleSkip,
  files,
  setFiles,
  handleCancelIcon,
  SkipNextOutlinedIcon,
  projectFiles
}) => {
  const disptach = useDispatch()
  const handleFileName = fileName => {
    if (fileName) {
      if (fileName.length <= MAX_FLIMENAME_LENGTH) {
        return fileName
      } else {
        return fileName.substring(0, MAX_FLIMENAME_LENGTH - 3) + '...'
      }
    }
  }
  return (
    <CreateABusiness
      title="Project Image"
      sub="Upload a photo here to represent your project. This will display in the projects section of your profile."
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
      <Grid margin={files?.length && '0'}>
        <UploadImage setFiles={setFiles} files={files} projectFiles={projectFiles} id="project_images" />
      </Grid>
      {projectFiles?.length > 0 && (
        <ContentContainer padding="20px 5px 20px 10px ">
          {projectFiles?.map(
            (file, index) =>
              file instanceof File && (
                <ContainedSpan key={file?.name + '_' + index}>
                  <ClearSharpIcon
                    data-testid={`${file?.name}_icon`}
                    style={{ fontSize: '7px', color: 'white', background: '#333', margin: '0 5px 2px' }}
                    onClick={() => handleCancelIcon(`files:${index}`)}
                  />
                  {handleFileName(file.name)}
                </ContainedSpan>
              )
          )}
        </ContentContainer>
      )}
    </CreateABusiness>
  )
}

export default StepTenWizardFlow
