import React from 'react';
import CreateABusiness from '..';
import { Grid } from '../../dashboard/style';
import { FormField } from '../../../ui';
import Button from '../../../ui/Button';
import { ContentContainer } from '../../../../pages/create-your-business';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';

const StepNineWizardFlow = (
    {
        questionsToAsk,
        updateForm,
        goBack,
        submitForm,
        stage,
        handleEnterKey,
        inputValue,
        handleInput,
        handleCancelIcon
    }
) => {
    return (
        <CreateABusiness
            title="Questions for Potential Hires"
            sub="What questions do you have for potential hires? (max three)"
            disabled={questionsToAsk?.length === 0}
            onUpdate={updateForm}
            onBack={goBack}
            onSubmit={submitForm}
            progress={stage}
            stage={stage}>
            <Grid>
                <FormField
                    justifySelf="start"
                    width="90%"
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
                    disabled={inputValue === '' || questionsToAsk.length >= 3}
                    zIndex={10}
                    position="absolute"
                    right="50px"
                    type="purple"
                    buttonHeight="42px"
                    onClick={() => {
                        updateForm({ questionsToAsk: [...questionsToAsk, inputValue] })
                        handleInput('')
                    }}>
                    Add
                </Button>
            </Grid>
            <ContentContainer>
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
    )
}

export default StepNineWizardFlow;