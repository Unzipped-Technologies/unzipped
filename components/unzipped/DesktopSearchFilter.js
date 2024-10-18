import React, { useState } from 'react'
import styled from 'styled-components'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import { Icon } from '../ui'
import { TEXT } from './dashboard/style'
import IconComponent from '../ui/icons/IconComponent'
import { BUDGET_TYPE, RECENT_SKILLS, SORT_OPTIONS } from '../../utils/constants'

const Container = styled.div`
  top: 265px;
  height: fit-content;
  color: #343a40 !important;
  background-color: #fff !important;
  border-radius: 10px;
  padding: 15px;
  min-width: 300px;
`

const Li = styled.li`
  padding: 5px 20px;
  background: #f4f4f4;
  &:hover {
    color: white;
    background: darkgrey;
    border-radius: 10px;
    font-weight: 600;
    -webkit-text-decoration: underline;
    text-decoration: underline;
  }
`

const ClearIcon = styled.span`
  svg {
    width: 14px;
    height: 14px;
  }
  cursor: pointer;
  display: ${({ $show }) => ($show ? 'inherit' : 'none')};
`

function DesktopSearchFilterProjects({ filter, setFilters, filterType = 'projects' }) {
  const [minRate, setMinRate] = useState(0)
  const [maxRate, setMaxRate] = useState(0)
  const [suggestions, setSuggestions] = useState([])
  const [userInput, setUserInput] = useState('')
  const [error, setError] = useState({ maxError: '', minError: '' })

  const handleSuggestions = event => {
    const input = event.target.value.toLowerCase()
    setUserInput(input)
    var matchingSkills = RECENT_SKILLS.filter(skill => skill.value.toLowerCase().includes(input))
    setSuggestions([...matchingSkills])
  }

  const handleSuggestionClick = ({ value }) => {
    setFilters('skill', value)
    setUserInput(value)
  }

  const handleBlur = e => {
    const { name, value } = e.target
    if (name === 'minRate') {
      if (+value > +maxRate && +maxRate) {
        setError(prev => ({
          ...prev,
          minError: 'Minimum should be lesser than the maximum value.'
        }))
      }
      if (+!value || +value < +maxRate) {
        setError(prev => ({
          ...prev,
          minError: ''
        }))
      }
    } else {
      if (+value < +minRate && +minRate) {
        setError(prev => ({
          ...prev,
          maxError: 'Maximum should be greater than the minimum value.'
        }))
      }
      if (+!value || +value > +minRate) {
        setError(prev => ({
          ...prev,
          maxError: ''
        }))
      }
    }
    if (name === 'minRate') {
      setMinRate(value)
    } else {
      setMaxRate(value)
    }
  }

  return (
    <Container data-testid="desktop_filters">
      <div>
        <TEXT fontSize="20px" fontWeight="600" margin="0px 0px 20px 0px">
          Filters
        </TEXT>
        {filterType === 'freelancer' && (
          <>
            <div className="d-flex justify-content-between">
              <TEXT fontSize="20px" fontWeight="600">
                Sort By
              </TEXT>
              <TEXT
                data-testid="clear_sort_filter"
                cursor="pointer"
                fontSize="18px"
                fontWeight="500"
                textColor="#0057FF"
                onClick={() => {
                  setFilters('sort', '')
                }}>
                Clear
              </TEXT>
            </div>
            <select
              id="sort_by"
              style={{ display: 'block', border: '1px solid #BCC5D3', height: '45px' }}
              value={filter?.sort}
              onChange={e => setFilters('sort', e?.target?.value)}>
              {SORT_OPTIONS.map((category, index) => (
                <option key={index} value={category?.value}>
                  {category?.text}
                </option>
              ))}
            </select>
          </>
        )}

        {filterType === 'projects' && (
          <>
            <div className="d-flex justify-content-between pt-4">
              <TEXT fontSize="20px" fontWeight="600">
                Project type
              </TEXT>
              <TEXT
                data-testid="clear_type_filter"
                cursor="pointer"
                fontSize="18px"
                fontWeight="500"
                textColor="#0057FF"
                onClick={() => {
                  setFilters('projectBudgetType', '')
                }}>
                Clear
              </TEXT>
            </div>
            <FormGroup>
              {BUDGET_TYPE?.map((type, index) => (
                <FormControlLabel
                  key={index}
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: '20px',
                    letterSpacing: '0.15007999539375305px',
                    textAlign: 'left',
                    color: '#000000'
                  }}
                  control={
                    <Checkbox
                      data-testid={type}
                      checked={type === filter?.projectBudgetType}
                      inputProps={{ 'aria-label': 'controlled' }}
                      onChange={e => {
                        setFilters('projectBudgetType', e?.target?.checked ? type : '')
                      }}
                    />
                  }
                  label={type}
                />
              ))}
            </FormGroup>
          </>
        )}

        <div className="d-flex justify-content-between align-items-center pt-3">
          <TEXT fontSize="20px" fontWeight="600">
            Rate
          </TEXT>
          <TEXT
            data-testid="clear_rates"
            cursor="pointer"
            fontSize="18px"
            fontWeight="500"
            textColor="#0057FF"
            onClick={() => {
              setFilters('minRate', '')
              setFilters('maxRate', '')
              setMinRate('')
              setMaxRate('')
              setError({ maxError: '', minError: '' })
            }}>
            Clear
          </TEXT>
        </div>
        <div>
          <TEXT margin="10px 0 0 0" fontSize="18px" fontWeight="500">
            min
          </TEXT>
          <div className="d-flex align-items-center border" style={{ border: '1px solid #BCC5D3' }}>
            <span style={{ padding: '0 18px 0 9px', display: 'flex', alignSelf: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                <path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" />
              </svg>
            </span>
            <input
              data-testid="min_rate"
              type="number"
              value={minRate}
              id="minRate"
              name="minRate"
              onBlur={handleBlur}
              onChange={handleBlur}
              onKeyPress={event => {
                if (event?.key === 'Enter') {
                  setFilters('minRate', event?.target?.value)
                }
              }}
              style={{ margin: '0', border: '0', height: '37px' }}></input>
            <span className="px-2">
              <b>USD</b>
            </span>
          </div>
          {error?.minError && <p style={{ fontSize: '12px', color: 'red' }}>{error?.minError}</p>}
        </div>
        <div>
          <TEXT margin="24px 0 0 0" fontSize="18px" fontWeight="500">
            max
          </TEXT>
          <div className="d-flex align-items-center " style={{ border: '1px solid #BCC5D3' }}>
            <span style={{ padding: '0 18px 0 9px', display: 'flex', alignSelf: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                <path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" />
              </svg>
            </span>
            <input
              type="number"
              data-testid="max_rate"
              value={maxRate}
              id="maxRate"
              name="maxRate"
              onBlur={handleBlur}
              onChange={handleBlur}
              onKeyPress={event => {
                if (event?.key === 'Enter') {
                  setFilters('maxRate', event?.target?.value)
                }
              }}
              style={{ margin: '0', border: '0', height: '37px' }}></input>
            <span className="px-2">
              <b>USD</b>
            </span>
          </div>
          {error?.maxError && <p style={{ fontSize: '12px', color: 'red' }}>{error?.maxError}</p>}
        </div>
        <div className="d-flex justify-content-between align-items-center pt-5">
          <TEXT fontSize="20px" fontWeight="600">
            Skills
          </TEXT>
          <TEXT
            data-testid="clear_skills"
            cursor="pointer"
            fontSize="18px"
            fontWeight="500"
            textColor="#0057FF"
            onClick={() => {
              setFilters('skill', [])
            }}>
            Clear
          </TEXT>
        </div>
        <div
          className="d-flex"
          style={{ border: '1px solid #BCC5D3', padding: '7.5px 20px', borderRadius: '7px', gap: '20px' }}>
          <IconComponent name="footerSearch" width="24" height="20" viewBox="0 0 24 20" fill="black" />
          <input
            placeholder="Search"
            data-testid="skills"
            id="skill_name"
            style={{ margin: '0', border: '0', height: 'auto' }}
            type="text"
            value={userInput}
            onChange={handleSuggestions}
          />
          <ClearIcon
            data-testid="clear_skill_field"
            onClick={() => {
              setUserInput('')
              setSuggestions([])
            }}
            $show={userInput}>
            <Icon name="closeBtn" />
          </ClearIcon>
        </div>
        <div>
          <ul>
            {suggestions?.map((skill, index) => (
              <Li
                key={index}
                data-testid={`${skill?.value}_suggestion`}
                onClick={() => {
                  handleSuggestionClick(skill)
                  setUserInput('')
                  setSuggestions([])
                }}>
                {skill?.label}
              </Li>
            ))}
          </ul>
        </div>
        <FormGroup>
          {RECENT_SKILLS?.map((skill, index) => (
            <div className="d-flex" style={{ lineHeight: 'normal' }} key={`${skill.value}_${index}`}>
              <FormControlLabel
                style={{
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: '19.5px',
                  letterSpacing: '0.15007999539375305px',
                  textAlign: 'left',
                  color: '#000000'
                }}
                control={
                  <Checkbox
                    data-testid={`${skill.value}_${index}`}
                    checked={filter?.skill?.includes(skill?.value)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    onChange={e => {
                      const updatedSkills = [...filter?.skill]

                      if (e.target.checked) {
                        updatedSkills.push(skill.value)
                      } else {
                        const index = updatedSkills.indexOf(skill.value)
                        index !== -1 && updatedSkills.splice(index, 1)
                      }
                      setFilters('skill', updatedSkills)
                    }}
                  />
                }
                label={skill.label}
              />

              <p className="mx-3">{skill?.skill}</p>
            </div>
          ))}
        </FormGroup>
      </div>
    </Container>
  )
}

export default DesktopSearchFilterProjects
