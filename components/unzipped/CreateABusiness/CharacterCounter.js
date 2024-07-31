import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

export const MinMaxCharSpan = styled.span`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  padding-top: 2px;
  color: ${({ color }) => (color ? color : '#000')};
  padding-left: ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '0px')};
  text-transform: ${({ textTransform }) => (textTransform ? textTransform : 'none')};
`

const CharacterCounterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: #a1a1a1;
  width: 100%;
  @media screen and (max-width: 600px) {
    height: 20px;
    justify-content: space-between;
  }
`
const CharacterCounter = ({ field, index = 0, isQuestionnaire = false, isErrorNotified = false, step = 0 }) => {
  const { businessForm } = useSelector(state => state.Business)
  const minCharLimit = field === 'challenge' || field === 'role' ? 200 : 100
  const [minCharacterLimit, setMinCharacterLimit] = useState(10)
  const [maxCharacterLimit, setMaxCharacterLimit] = useState(1000)

  useEffect(() => {
    if (field) {
      if (field === 'name' || field === 'questionsToAsk') {
        setMinCharacterLimit(10)
        setMaxCharacterLimit(240)
      }
      if (field === 'challenge' || field === 'role') {
        setMinCharacterLimit(200)
        setMaxCharacterLimit(1000)
      }
    }
  }, [field])
  return (
    <CharacterCounterWrapper>
      {!isQuestionnaire && (
        <div>
          {businessForm?.[field] && businessForm?.[field].length < minCharacterLimit && businessForm?.isFieldSubmitted && (
            <MinMaxCharSpan color="#D13823" textTransform="uppercase">
              Please enter atleast {minCharacterLimit} character
            </MinMaxCharSpan>
          )}
        </div>
      )}

      {isQuestionnaire && (
        <div>
          {isErrorNotified && index < minCharacterLimit && (
            <MinMaxCharSpan color="#D13823" textTransform="uppercase" paddingLeft={step === 9 ? '45px' : '0px'}>
              Please enter atleast {minCharacterLimit} character
            </MinMaxCharSpan>
          )}
        </div>
      )}

      <div>
        {!isQuestionnaire && (
          <MinMaxCharSpan>
            {field ? businessForm[field]?.length : 0} / {maxCharacterLimit}
          </MinMaxCharSpan>
        )}
        {isQuestionnaire && (
          <MinMaxCharSpan>
            {field ? index ?? 0 : 0} / {maxCharacterLimit}
          </MinMaxCharSpan>
        )}
      </div>
    </CharacterCounterWrapper>
  )
}

export default CharacterCounter
