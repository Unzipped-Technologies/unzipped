import React from 'react';
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined';
import StepOneWizardFlow from './wizard/step-one';
import StepTwoWizardFlow from './wizard/step-two';
import StepThreeWizardFlow from './wizard/step-three';
import StepFourWizardFlow from './wizard/step-four';
import StepFiveWizardFlow from './wizard/step-five';
import StepSixWizardFlow from './wizard/step-six';
import StepSevenWizardFlow from './wizard/step-seven';
import StepEightWizardFlow from './wizard/step-eight';
import StepNineWizardFlow from './wizard/step-nine';
import StepTenWizardFlow from './wizard/step-ten';
import StepElevenWizardFlow from './wizard/step-eleven';
import ReviewBusinessDetails from './ReviewBusinessDetails';

const GetCardDesktop = ({
    stage,
    projectType,
    name,
    challenge,
    role,
    objectives,
    teamDynamics,
    requiredSkills,
    goals,
    companyBackground,
    budgetRange,
    questionsToAsk,
    submitForm,
    updateForm,
    goBack,
    inputValue,
    isGithubConnected,
    handleInput,
    handleSkip,
    handleCancelIcon,
    handleEnterKey,
    loading,
    files,
    setFiles,
    handleGithub,
    userDetails,
    isSubmitted,
    setIsSubmitted,
    projectFiles
}) => {
    switch (stage) {
        case 1:
            return (
                <StepOneWizardFlow
                    projectType={projectType}
                    updateForm={updateForm}
                    submitForm={submitForm}
                    stage={stage}
                />
            )
        case 2:
            return (
                <StepTwoWizardFlow
                    updateForm={updateForm}
                    goBack={goBack}
                    submitForm={submitForm}
                    stage={stage}
                    name={name}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                />)
        case 3:
            if (projectType === 'Short Term Business') {
                return (
                    <StepThreeWizardFlow
                        challenge={challenge}
                        updateForm={updateForm}
                        goBack={goBack}
                        submitForm={submitForm}
                        stage={stage}
                        role={role}
                        projectType={projectType}
                    />
                )
            } else {
                return (
                    <StepThreeWizardFlow
                        updateForm={updateForm}
                        goBack={goBack}
                        submitForm={submitForm}
                        stage={stage}
                        role={role}
                        projectType={projectType} />
                )
            }

        case 4:
            if (projectType === 'Short Term Business') {
                return (
                    <StepFourWizardFlow
                        objectives={objectives}
                        updateForm={updateForm}
                        goBack={goBack}
                        submitForm={submitForm}
                        stage={stage}
                        projectType={projectType}
                        inputValue={inputValue}
                        handleInput={handleInput}
                        handleCancelIcon={handleCancelIcon}
                        handleEnterKey={handleEnterKey}
                        handleSkip={null}
                        SkipNextOutlinedIcon={null}
                    />
                )
            } else {
                return (
                    <StepFourWizardFlow
                        objectives={objectives}
                        updateForm={updateForm}
                        goBack={goBack}
                        submitForm={submitForm}
                        stage={stage}
                        projectType={projectType}
                        inputValue={inputValue}
                        handleInput={handleInput}
                        handleCancelIcon={handleCancelIcon}
                        handleEnterKey={handleEnterKey}
                        teamDynamics={teamDynamics}
                        handleSkip={handleSkip}
                        SkipNextOutlinedIcon={SkipNextOutlinedIcon}
                    />
                )
            }

        case 5:
            return (
                <StepFiveWizardFlow requiredSkills={requiredSkills}
                    updateForm={updateForm}
                    goBack={goBack}
                    submitForm={submitForm}
                    stage={stage}
                    inputValue={inputValue}
                    handleEnterKey={handleEnterKey}
                    handleInput={handleInput}
                    handleCancelIcon={handleCancelIcon}
                />

            )
        case 6:
            return (
                <StepSixWizardFlow
                    goals={goals}
                    updateForm={updateForm}
                    goBack={goBack}
                    submitForm={submitForm}
                    stage={stage}
                    handleSkip={handleSkip}
                    SkipNextOutlinedIcon={SkipNextOutlinedIcon}
                />
            )
        case 7:
            return (
                <StepSevenWizardFlow
                    companyBackground={companyBackground}
                    updateForm={updateForm}
                    goBack={goBack}
                    submitForm={submitForm}
                    stage={stage}
                    handleSkip={handleSkip}
                    SkipNextOutlinedIcon={SkipNextOutlinedIcon}
                />

            )

        case 8:
            return (
                <StepEightWizardFlow
                    budgetRange={budgetRange}
                    updateForm={updateForm}
                    goBack={goBack}
                    submitForm={submitForm}
                    stage={stage}
                    isGithubConnected={isGithubConnected}
                />
            )
        case 9:
            return (
                <StepNineWizardFlow
                    questionsToAsk={questionsToAsk}
                    updateForm={updateForm}
                    goBack={goBack}
                    submitForm={submitForm}
                    stage={stage}
                    handleEnterKey={handleEnterKey}
                    inputValue={inputValue}
                    handleInput={handleInput}
                    handleCancelIcon={handleCancelIcon}
                />
            )
        case 10:
            return (
                <StepTenWizardFlow
                    updateForm={updateForm}
                    goBack={goBack}
                    submitForm={submitForm}
                    stage={stage}
                    handleSkip={handleSkip}
                    files={files}
                    setFiles={setFiles}
                    handleCancelIcon={handleCancelIcon}
                    SkipNextOutlinedIcon={SkipNextOutlinedIcon}
                    projectFiles={projectFiles}
                />
            )
        case 11:
            if (!isGithubConnected) {
                return (
                    <StepElevenWizardFlow
                        updateForm={updateForm}
                        goBack={goBack}
                        submitForm={submitForm}
                        stage={stage}
                        handleGithub={handleGithub}
                        SkipNextOutlinedIcon={SkipNextOutlinedIcon}
                        handleSkip={handleSkip}
                    />
                )
            } else {
                handleSkip()
            }
        case 12:
            return (
                <>
                    <ReviewBusinessDetails files={projectFiles} isGithubConnected={isGithubConnected} stage={stage} />
                </>
            )

        default:
            return <></>
    }
}

export default GetCardDesktop;