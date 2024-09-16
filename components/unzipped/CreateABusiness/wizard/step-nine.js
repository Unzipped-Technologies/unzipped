import React, { useState } from 'react'
import CreateABusiness from '..'
import { Grid } from '../../dashboard/style'
import { FormField } from '../../../ui'
import Button from '../../../ui/Button'
import { ContentContainer } from '../../../../pages/create-your-business'
import { ValidationUtils } from '../../../../utils'
import ClearSharpIcon from '@material-ui/icons/ClearSharp'
import CharacterCounter from '../CharacterCounter'

const StepNineWizardFlow = ({
  questionsToAsk,
  updateForm,
  goBack,
  submitForm,
  stage,
  handleEnterKey,
  inputValue,
  handleInput,
  handleCancelIcon
}) => {
  const [questionLength, setQuestionLength] = useState(0)
  const [isErrorNotified, setIsErrorNotified] = useState(false)
  const [isAlterable, setIsAlterable] = useState(false)

  const handleQuestionnaireValidation = value => {
    if (value.length >= 240) {
      if (isAlterable) {
        setIsAlterable(false)
        handleInput(value)
      }
    } else {
      handleInput(value)
      setQuestionLength(value.length)
    }
  }

  const handleOnButtonAdd = () => {
    if (inputValue.length < 10) {
      setIsErrorNotified(true)
      return
    }
    updateForm({ questionsToAsk: [...questionsToAsk, inputValue] })
    handleInput('')
    setQuestionLength(0)
    setIsErrorNotified(false)
  }

  const handleKeydownEvent = e => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      setIsAlterable(true)
    } else {
      if (inputValue !== '' && questionsToAsk.length < 3) {
        const fieldName = 'questionsToAsk'
        if (e.key === 'Enter' && e.shiftKey === false) {
          if (inputValue.length < 10) {
            setIsErrorNotified(true)
            return
          }
          updateForm({ [fieldName]: [...questionsToAsk, inputValue] })
          handleInput('')
          setQuestionLength(0)
          setIsErrorNotified(false)
        }
      }
    }
  }

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
          id="questionsToAsk"
          placeholder="Type a question and hit enter..."
          borderRadius="10px"
          onChange={e => handleQuestionnaireValidation(e.target.value)}
          value={inputValue}
          onKeyDown={e => handleKeydownEvent(e)}
        />
        <Button
          disabled={inputValue === '' || questionsToAsk.length >= 3}
          zIndex={10}
          position="absolute"
          right="50px"
          type="purple"
          buttonHeight="42px"
          onClick={handleOnButtonAdd}>
          Add
        </Button>
      </Grid>
      <CharacterCounter
        field={'questionsToAsk'}
        index={questionLength}
        isQuestionnaire={true}
        isErrorNotified={isErrorNotified}
        step={stage}
      />

      <ContentContainer>
        {questionsToAsk.map((question, index) => (
          <div className="d-flex mb-3" key={question + '_' + index}>
            <div>
              <ClearSharpIcon
                id={`${question}_icon`}
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

export default StepNineWizardFlow
