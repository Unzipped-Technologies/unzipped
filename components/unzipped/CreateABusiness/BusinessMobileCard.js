import React, { useState } from 'react';
import CreateABusiness from '../CreateABusiness';
import { Grid } from '../../unzipped/dashboard/style';
import OptionTileGroup from '../../ui/OptionTileGroup';
import { FormField } from '../../ui';
import { ContentContainer, ContainedSpan } from '../../../pages/create-your-business';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import Button from '../../ui/Button';
import ReviewBusinessDetails from './ReviewBusinessDetails';
import CharacterCounter from './CharacterCounter';
import { useSelector } from 'react-redux';


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

const budgetOptions = () => {
    return [
        { label: 'Basic ($7 - $14)', value: 'Basic ($7 - $14)' },
        { label: 'Standard ($15 - $25)', value: 'Standard ($15 - $25)' },
        { label: 'Skilled ($25 - $50)', value: 'Skilled ($25 - $50)' },
        { label: 'Expert ($50 - $70)', value: 'Expert ($50 - $70)' },
        { label: 'More than a $70 per hour', value: 'More than a $70 per hour' },
        { label: 'Not Sure (See what my options are)', value: 'Not Sure (See what my options are)' }
    ]
}

const GetCardMobile = ({
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
    handleGithub
}) => {
    const { businessForm } = useSelector(state => state.Business);

    const [isAlterable, setIsAlterable] = useState(false);
    const fieldName = businessForm?.projectType === "Short Term Business" ? 'challenge' : 'role';

    const handleInputChangeEvent = (e, localField = "") => {

        if (localField == "name") {
            if (name?.length >= 1000) {
                if (isAlterable) {
                    setIsAlterable(false)
                    updateForm({ name: e.target.value })
                }
            } else {
                updateForm({ name: e.target.value })
            }
        }
        if (localField !== "name") {
            if (fieldName == "challenge" || fieldName == "role") {
                if (businessForm?.[fieldName]?.length >= 1000) {
                    if (isAlterable) {
                        setIsAlterable(false)
                        updateForm({ [fieldName]: e.target.value })
                    }
                } else {
                    updateForm({ [fieldName]: e.target.value })

                }
            }
        }
    }

    const handleKeydownEvent = e => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
            setIsAlterable(true)
        }
    }
    switch (stage) {
        case 1:
            return (
                <CreateABusiness
                    mobile
                    sub={`Are you looking to hire for a long term hire?`}
                    onUpdate={updateForm}
                    onBack={goBack}
                    disabled={projectType === ''}
                    onSubmit={submitForm}
                    progress={stage}
                    stage={stage}>
                    <Grid margin="0px 0px 50px 0px">
                        <OptionTileGroup
                            mobile
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

        case 2:
            return (
                <CreateABusiness
                    mobile
                    title="Project Name"
                    sub="Describe your project in as few words as possible"
                    disabled={name?.length === 0}
                    onUpdate={updateForm}
                    onBack={goBack}
                    onSubmit={submitForm}
                    progress={stage}
                    stage={stage}>
                    <Grid margin="0px 0px 50px 0px">
                        <FormField
                            textarea
                            mobile
                            fieldType="input"
                            fontSize="20px"
                            width="100%"
                            placeholder="Describe your project here..."
                            borderRadius="10px"
                            onChange={e => handleInputChangeEvent(e, "name")}
                            value={name}
                            onKeyDown={e => handleKeydownEvent(e)}
                        />
                        <CharacterCounter field={'name'} />
                    </Grid>
                </CreateABusiness>
            )

        case 3:
            if (projectType === 'Short Term Business') {
                return (
                    <>
                        <CreateABusiness
                            mobile
                            doubleScreenTop
                            title="Describe the project"
                            sub="What's the challenge you need to conquer? (in a sentence or two)"
                            onUpdate={updateForm}
                            onBack={goBack}
                            onSubmit={submitForm}
                            progress={stage}
                            stage={stage}>
                            <Grid margin="0px 0px 25px 0px">
                                <FormField
                                    textarea
                                    mobile
                                    fieldType="input"
                                    fontSize="20px"
                                    width="100%"
                                    placeholder="Enter Project Summary..."
                                    borderRadius="10px"
                                    onChange={e => updateForm({ challenge: e.target.value })}
                                    value={challenge}
                                />
                                <CharacterCounter field={'challenge'} />
                            </Grid>
                        </CreateABusiness>
                        <CreateABusiness
                            mobile
                            doubleScreenBottom
                            sub="What are the specific tasks and objectives for this project"
                            disabled={objectives?.length === 0 || challenge?.length === 0}
                            onUpdate={updateForm}
                            onBack={goBack}
                            onSubmit={submitForm}
                            stage={stage + 1}>
                            <Grid margin="0px">
                                <FormField
                                    mobile
                                    justifySelf="start"
                                    width="100%"
                                    fieldType="input"
                                    fontSize="20px"
                                    placeholder="Type a task and hit enter..."
                                    borderRadius="10px"
                                    handleEnterKey={e => inputValue !== '' && handleEnterKey('objectives', objectives, e)}
                                    onChange={e => handleInput(e.target.value)}
                                    value={inputValue}
                                />
                                <Button
                                    margin="8px 0px"
                                    block
                                    disabled={inputValue === ''}
                                    type="purple"
                                    buttonHeight="42px"
                                    zIndex={10}
                                    onClick={() => {
                                        updateForm({ objectives: [...objectives, inputValue] })
                                        handleInput('')
                                    }}>
                                    Add
                                </Button>
                            </Grid>
                            <ContentContainer width="100%" padding="10px 0px">
                                {objectives.map(obj => (
                                    <div className="d-flex mb-3">
                                        <div>
                                            <ClearSharpIcon
                                                style={{ fontSize: '7px', color: 'white', backgroundColor: '#333', margin: '0 8px 2px' }}
                                                onClick={() => handleCancelIcon('objectives', objectives, obj)}
                                            />
                                        </div>
                                        <span>{obj}</span>
                                    </div>
                                ))}
                            </ContentContainer>
                        </CreateABusiness>
                    </>
                )
            } else {
                return (
                    <>
                        <CreateABusiness
                            mobile
                            doubleScreenTop
                            title="Role Description"
                            sub="Envision your ideal hire. What role will they play in your ongoing projects?"
                            onUpdate={updateForm}
                            onBack={goBack}
                            onSubmit={submitForm}
                            progress={stage}
                            stage={stage}>
                            <Grid margin="0px 0px 35px 0px">
                                <FormField
                                    textarea
                                    mobile
                                    fieldType="input"
                                    fontSize="20px"
                                    width="100%"
                                    borderRadius="10px"
                                    onChange={e => handleInputChangeEvent(e)}
                                    value={role}
                                    onKeyDown={e => handleKeydownEvent(e)}
                                />
                                <CharacterCounter field={'role'} />
                            </Grid>
                        </CreateABusiness>
                        <CreateABusiness
                            mobile
                            doubleScreenBottom
                            title="Team Dynamics"
                            sub="Tell us about the team they’ll join. What’s the culture and rhythm within your company?"
                            disabled={teamDynamics?.length === 0 || role?.length === 0}
                            onUpdate={updateForm}
                            onBack={goBack}
                            onSubmit={submitForm}
                            stage={stage + 1}>
                            <Grid margin="0px 0px 50px 0px">
                                <FormField
                                    textarea
                                    mobile
                                    fieldType="input"
                                    fontSize="20px"
                                    width="100%"
                                    borderRadius="10px"
                                    onChange={e => updateForm({ teamDynamics: e.target.value })}
                                    value={teamDynamics}
                                />
                            </Grid>
                        </CreateABusiness>
                    </>
                )
            }

        case 4:
            if (projectType === 'Short Term Business') {
                return (
                    <>
                        <CreateABusiness
                            mobile
                            doubleScreenTop
                            title="Describe the project"
                            sub="What's the challenge you need to conquer? (in a sentence or two)"
                            onUpdate={updateForm}
                            onBack={goBack}
                            onSubmit={submitForm}
                            progress={stage - 1}
                            stage={stage}>
                            <Grid margin="0px 0px 25px 0px">
                                <FormField
                                    textarea
                                    mobile
                                    fieldType="input"
                                    fontSize="20px"
                                    width="100%"
                                    placeholder="Enter Project Summary..."
                                    borderRadius="10px"
                                    onChange={e => updateForm({ challenge: e.target.value })}
                                    value={challenge}
                                />
                            </Grid>
                        </CreateABusiness>
                        <CreateABusiness
                            mobile
                            doubleScreenBottom
                            sub="What are the specific tasks and objectives for this project"
                            disabled={objectives?.length === 0 || challenge?.length === 0}
                            onUpdate={updateForm}
                            onBack={() => goBack(stage - 1)}
                            onSubmit={submitForm}
                            stage={stage}>
                            <Grid margin="0px">
                                <FormField
                                    mobile
                                    justifySelf="start"
                                    width="100%"
                                    fieldType="input"
                                    fontSize="20px"
                                    placeholder="Type a task and hit enter..."
                                    borderRadius="10px"
                                    handleEnterKey={e => inputValue !== '' && handleEnterKey('objectives', objectives, e)}
                                    onChange={e => handleInput(e.target.value)}
                                    value={inputValue}
                                />
                                <Button
                                    margin="8px 0px"
                                    block
                                    disabled={inputValue === ''}
                                    type="purple"
                                    buttonHeight="42px"
                                    zIndex={10}
                                    onClick={() => {
                                        updateForm({ objectives: [...objectives, inputValue] })
                                        handleInput('')
                                    }}>
                                    Add
                                </Button>
                            </Grid>
                            <ContentContainer width="100%" padding="10px 0px">
                                {objectives.map(obj => (
                                    <div className="d-flex mb-3">
                                        <div>
                                            <ClearSharpIcon
                                                style={{ fontSize: '7px', color: 'white', backgroundColor: '#333', margin: '0 8px 2px' }}
                                                onClick={() => handleCancelIcon('objectives', objectives, obj)}
                                            />
                                        </div>
                                        <span>{obj}</span>
                                    </div>
                                ))}
                            </ContentContainer>
                        </CreateABusiness>
                    </>
                )
            } else {
                return (
                    <>
                        <CreateABusiness
                            mobile
                            doubleScreenTop
                            title="Role Description"
                            sub="Envision your ideal hire. What role will they play in your ongoing projects?"
                            onUpdate={updateForm}
                            onBack={goBack}
                            onSubmit={submitForm}
                            progress={stage - 1}
                            stage={stage}>
                            <Grid margin="0px 0px 35px 0px">
                                <FormField
                                    textarea
                                    mobile
                                    fieldType="input"
                                    fontSize="20px"
                                    width="100%"
                                    borderRadius="10px"
                                    onChange={e => updateForm({ role: e.target.value })}
                                    value={role}
                                />
                                <CharacterCounter field={'role'} />
                            </Grid>
                        </CreateABusiness>
                        <CreateABusiness
                            mobile
                            doubleScreenBottom
                            title="Team Dynamics"
                            sub="Tell us about the team they’ll join. What’s the culture and rhythm within your company?"
                            disabled={teamDynamics?.length === 0 || role?.length === 0}
                            onUpdate={updateForm}
                            onBack={() => goBack(stage - 1)}
                            onSubmit={submitForm}
                            stage={stage}>
                            <Grid margin="0px 0px 50px 0px">
                                <FormField
                                    textarea
                                    mobile
                                    fieldType="input"
                                    fontSize="20px"
                                    width="100%"
                                    borderRadius="10px"
                                    onChange={e => updateForm({ teamDynamics: e.target.value })}
                                    value={teamDynamics}
                                />
                            </Grid>
                        </CreateABusiness>
                    </>
                )
            }

        case 5:
            return (
                <CreateABusiness
                    mobile
                    title="Required Expertise"
                    sub="What skills should they have mastered? List the abilities needed for your project (ex. React, AWS, SQL)."
                    disabled={requiredSkills?.length === 0}
                    onUpdate={updateForm}
                    onBack={goBack}
                    onSubmit={submitForm}
                    progress={stage - 1}
                    stage={stage}>
                    {!!requiredSkills?.length && (
                        <ContentContainer width="100%" padding="5px 0px" marginBottom="10px">
                            {requiredSkills?.map(skill => (
                                <ContainedSpan>
                                    <ClearSharpIcon
                                        style={{ fontSize: '7px', color: 'white', background: '#333', margin: '0 5px 2px' }}
                                        onClick={() => handleCancelIcon('requiredSkills', requiredSkills, skill)}
                                    />
                                    {skill}
                                </ContainedSpan>
                            ))}
                        </ContentContainer>
                    )}
                    <Grid margin="0px 0px 35px 0px">
                        <FormField
                            mobile
                            justifySelf="start"
                            width="100%"
                            fieldType="input"
                            fontSize="20px"
                            placeholder="Type a skill and hit enter..."
                            borderRadius="10px"
                            handleEnterKey={e =>
                                inputValue !== '' && requiredSkills.length < 15 && handleEnterKey('requiredSkills', requiredSkills, e)
                            }
                            onChange={e => handleInput(e.target.value)}
                            value={inputValue}
                        />
                        <Button
                            margin="8px 0px"
                            block
                            type="purple"
                            buttonHeight="42px"
                            disabled={inputValue === '' || requiredSkills.length >= 15}
                            onClick={() => {
                                updateForm({ requiredSkills: [...requiredSkills, inputValue] })
                                handleInput('')
                            }}>
                            Add
                        </Button>
                    </Grid>
                </CreateABusiness>
            )
        case 6:
            return (
                <>
                    <CreateABusiness
                        mobile
                        doubleScreenTop
                        titleFontSize="16px"
                        title="Project Goals or Role Expectations"
                        sub="Chart out the milestones. What achievements should be celebrated along the way?"
                        onUpdate={updateForm}
                        onBack={goBack}
                        onSubmit={submitForm}
                        progress={stage - 1}
                        stage={stage}>
                        <Grid margin="0px 0px 35px 0px">
                            <FormField
                                mobile
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
                    <CreateABusiness
                        mobile
                        doubleScreenBottom
                        title="Company Background"
                        titleFontSize="16px"
                        sub="Every great story has a setting. What's the backdrop of your company or venture?"
                        disabled={companyBackground?.length === 0 || goals?.length === 0}
                        onUpdate={updateForm}
                        onBack={goBack}
                        onSubmit={submitForm}
                        stage={stage + 1}>
                        <Grid margin="0px 0px 50px 0px">
                            <FormField
                                mobile
                                textarea
                                fieldType="input"
                                fontSize="20px"
                                width="100%"
                                borderRadius="10px"
                                onChange={e => updateForm({ companyBackground: e.target.value })}
                                value={companyBackground}
                            />
                        </Grid>
                    </CreateABusiness>
                </>
            )
        case 7:
            return (
                <>
                    <CreateABusiness
                        mobile
                        doubleScreenTop
                        titleFontSize="16px"
                        title="Project Goals or Role Expectations"
                        sub="Chart out the milestones. What achievements should be celebrated along the way?"
                        onUpdate={updateForm}
                        onBack={goBack}
                        onSubmit={submitForm}
                        progress={stage - 2}
                        stage={stage}>
                        <Grid margin="0px 0px 35px 0px">
                            <FormField
                                mobile
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
                    <CreateABusiness
                        mobile
                        doubleScreenBottom
                        title="Company Background"
                        titleFontSize="16px"
                        sub="Every great story has a setting. What's the backdrop of your company or venture?"
                        disabled={companyBackground?.length === 0 || goals?.length === 0}
                        onUpdate={updateForm}
                        onBack={() => goBack(stage - 1)}
                        onSubmit={submitForm}
                        stage={stage}>
                        <Grid margin="0px 0px 50px 0px">
                            <FormField
                                mobile
                                textarea
                                fieldType="input"
                                fontSize="20px"
                                width="100%"
                                borderRadius="10px"
                                onChange={e => updateForm({ companyBackground: e.target.value })}
                                value={companyBackground}
                            />
                        </Grid>
                    </CreateABusiness>
                </>
            )

        case 8:
            return (
                <>
                    <CreateABusiness
                        mobile
                        doubleScreenTop
                        title="Budget"
                        sub="What size budget are you comfortable with for this hire?"
                        onUpdate={updateForm}
                        onSubmit={submitForm}
                        progress={stage - 2}
                        stage={stage}>
                        <Grid margin="0px 0px 40px 0px">
                            <FormField
                                mobile
                                required
                                height="65px"
                                fieldType="select"
                                isSearchable={false}
                                name="select"
                                options={budgetOptions()}
                                placeholder="Select your budget"
                                fontSize="20px"
                                width="100%"
                                borderRadius="12px"
                                onChange={e => updateForm({ budgetRange: e.value })}
                                value={{ label: budgetRange }}
                            />
                        </Grid>
                    </CreateABusiness>
                    <CreateABusiness
                        mobile
                        doubleScreenBottom
                        title="Questions for Potential Hires"
                        titleFontSize="16px"
                        sub="What questions do you have for potential hires? (max three)"
                        disabled={questionsToAsk?.length === 0 || budgetRange?.length === 0}
                        onUpdate={updateForm}
                        onBack={() => goBack(isGithubConnected ? stage - 1 : stage)}
                        onSubmit={submitForm}
                        stage={stage + 1}>
                        <Grid margin="0px">
                            <FormField
                                mobile
                                zIndexUnset
                                justifySelf="start"
                                width="100%"
                                fieldType="input"
                                fontSize="20px"
                                placeholder="Type a question and hit enter..."
                                borderRadius="10px"
                                handleEnterKey={e =>
                                    inputValue !== '' && questionsToAsk.length < 3 && handleEnterKey('questionsToAsk', questionsToAsk, e)
                                }
                                onChange={e => handleInput(e.target.value)}
                                value={inputValue}
                            />
                            <Button
                                margin="8px 0px"
                                block
                                disabled={inputValue === '' || questionsToAsk.length >= 3}
                                type="purple"
                                buttonHeight="42px"
                                onClick={() => {
                                    updateForm({ questionsToAsk: [...questionsToAsk, inputValue] })
                                    handleInput('')
                                }}>
                                Add
                            </Button>
                        </Grid>
                        <ContentContainer width="100%" padding="5px 0px" marginBottom="10px">
                            {questionsToAsk.map(question => (
                                <div className="d-flex mb-3">
                                    <div>
                                        <ClearSharpIcon
                                            style={{ fontSize: '7px', color: 'white', backgroundColor: '#333', margin: '0 8px 2px' }}
                                            onClick={() => handleCancelIcon('questionsToAsk', questionsToAsk, question)}
                                        />
                                    </div>
                                    <span>{question}</span>
                                </div>
                            ))}
                        </ContentContainer>
                    </CreateABusiness>
                </>
            )
        case 9:
            return (
                <>
                    <CreateABusiness
                        mobile
                        doubleScreenTop
                        title="Budget"
                        sub="What size budget are you comfortable with for this hire?"
                        onUpdate={updateForm}
                        onSubmit={submitForm}
                        progress={stage - 3}
                        stage={stage + 1}>
                        <Grid margin="0px 0px 40px 0px">
                            <FormField
                                mobile
                                required
                                height="45px"
                                fieldType="select"
                                isSearchable={false}
                                name="select"
                                options={budgetOptions()}
                                placeholder="Select your budget"
                                fontSize="20px"
                                width="100%"
                                borderRadius="12px"
                                onChange={e => updateForm({ budgetRange: e.value })}
                                value={{ label: budgetRange }}
                            />
                        </Grid>
                    </CreateABusiness>
                    <CreateABusiness
                        mobile
                        doubleScreenBottom
                        title="Questions for Potential Hires"
                        titleFontSize="16px"
                        sub="What questions do you have for potential hires? (max three)"
                        disabled={questionsToAsk?.length === 0 || budgetRange?.length === 0}
                        onUpdate={updateForm}
                        onBack={() => goBack(stage - 1)}
                        onSubmit={submitForm}
                        stage={stage}>
                        <Grid margin="0px">
                            <FormField
                                mobile
                                zIndexUnset
                                justifySelf="start"
                                width="100%"
                                fieldType="input"
                                fontSize="20px"
                                placeholder="Type a question and hit enter..."
                                borderRadius="10px"
                                handleEnterKey={e =>
                                    inputValue !== '' && questionsToAsk.length < 3 && handleEnterKey('questionsToAsk', questionsToAsk, e)
                                }
                                onChange={e => handleInput(e.target.value)}
                                value={inputValue}
                            />
                            <Button
                                margin="8px 0px"
                                block
                                disabled={inputValue === '' || questionsToAsk.length >= 3}
                                type="purple"
                                buttonHeight="42px"
                                onClick={() => {
                                    updateForm({ questionsToAsk: [...questionsToAsk, inputValue] })
                                    handleInput('')
                                }}>
                                Add
                            </Button>
                        </Grid>
                        <ContentContainer width="100%" padding="5px 0px" marginBottom="10px">
                            {questionsToAsk.map(question => (
                                <div className="d-flex mb-3">
                                    <div>
                                        <ClearSharpIcon
                                            style={{ fontSize: '7px', color: 'white', backgroundColor: '#333', margin: '0 8px 2px' }}
                                            onClick={() => handleCancelIcon('questionsToAsk', questionsToAsk, question)}
                                        />
                                    </div>
                                    <span>{question}</span>
                                </div>
                            ))}
                        </ContentContainer>
                    </CreateABusiness>
                </>
            )
        case 10:
            if (!isGithubConnected) {
                return (
                    <CreateABusiness
                        mobile
                        titleFontSize="16px"
                        title="Do you currently have a github account?"
                        sub="Connect your project to github so you can immidiately begin hiring developers and creating your project."
                        onUpdate={updateForm}
                        onBack={goBack}
                        onSubmit={submitForm}
                        progress={stage - 1}
                        stage={stage + 1}
                    // submit
                    >
                        <Grid margin="50px 0px 100px 0px">
                            <Button icon="github" noBorder type="dark" normal onClick={handleGithub}>
                                CONNECT YOUR GITHUB ACCOUNT
                            </Button>
                        </Grid>
                    </CreateABusiness>
                )
            } else { handleSkip() }

        case 12:
            return (
                <ReviewBusinessDetails isGithubConnected={isGithubConnected} stage={stage} isMobileViewActive={true} />
            )
        default:
            return <></>
    }
}

export default GetCardMobile;