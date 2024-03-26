import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import { Icon } from '../ui'
import IconComponent from '../ui/icons/IconComponent'
import { BUDGET_TYPE, RECENT_SKILLS, SORT_OPTIONS } from '../../utils/constants'

const ClearIcon = styled.span`
  svg {
    width: 14px;
    height: 14px;
  }
  cursor: pointer;
  display: ${({ $show }) => ($show ? 'inherit' : 'none')};
`

function MobileSearchFilter({ handleFilterOpenClose, filter, setFilters, filterType = 'projects' }) {
  const minRef = React.useRef()
  const maxRef = React.useRef()
  const [filters, setMobileFilters] = useState({
    sort: '',
    isActive: true,
    searchKey: '',
    budget: '',
    minRate: 0,
    maxRate: 0,
    skill: [],
    projectBudgetType: ''
  })
  const [suggestions, setSuggestions] = useState([])
  const [userInput, setUserInput] = useState()

  const [error, setError] = useState({ maxError: '', minError: '' })

  useEffect(() => {
    const updatedFilter = { ...filter }
    for (var field in updatedFilter) {
      setAllFilters(field, updatedFilter[field])
    }
  }, [filter])

  useEffect(() => {
    const minRateInputElement = document.getElementById('minRate')
    const maxRateInputElement = document.getElementById('maxRate')
    if (minRateInputElement) {
      minRateInputElement.addEventListener('wheel', handleWheel, { passive: false })
    }
    if (maxRateInputElement) {
      maxRateInputElement.addEventListener('wheel', handleWheel, { passive: false })
    }
    return () => {
      if (minRateInputElement) {
        minRateInputElement.removeEventListener('wheel', handleWheel)
      }
      if (maxRateInputElement) {
        maxRateInputElement.removeEventListener('wheel', handleWheel)
      }
    }
  }, [])

  const handleSuggestions = event => {
    const input = event.target.value.toLowerCase()
    setUserInput(input)
    var matchingSkills = RECENT_SKILLS.filter(skill => skill.value.toLowerCase().includes(input))
    if (!input) {
      setSuggestions([])
    } else {
      setSuggestions([...matchingSkills])
    }
  }

  const handleSuggestionClick = value => {
    setFilters('setAllFilters', value)
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
        if (+value < +maxRate) {
          setError(prev => ({
            ...prev,
            maxError: ''
          }))
        }
      }
      if (+!value || +value < +maxRate) {
        setError(prev => ({
          ...prev,
          minError: ''
        }))
      }
    } else if (name === 'maxRate') {
      if (+value < +minRate && +minRate) {
        setError(prev => ({
          ...prev,
          maxError: 'Maximum should be greater than the minimum value.'
        }))
        if (+value > +minRate) {
          setError(prev => ({
            ...prev,
            minError: ''
          }))
        }
      }
      if (+!value || +value > +minRate) {
        setError(prev => ({
          ...prev,
          maxError: ''
        }))
      }
    }
    if (name === 'minRate') {
      setAllFilters('minRate', value)
    } else {
      setAllFilters('maxRate', value)
    }
  }

  const handleSearhButton = () => {
    if (error?.maxError) {
      maxRef.current.focus()
    } else if (error?.minError) {
      minRef.current.focus()
    } else {
      handleFilterOpenClose(false)
      const updatedFilter = { ...filters }
      for (var field in updatedFilter) {
        setFilters(field, updatedFilter[field])
      }
    }
  }

  const setAllFilters = (field, value) => {
    setMobileFilters(prevFilter => {
      const updatedFilter = { ...prevFilter }

      if (Array.isArray(updatedFilter[field])) {
        if (!Array.isArray(value) && !updatedFilter[field].includes(value)) {
          updatedFilter[field].push(value)
        } else {
          updatedFilter[field] = value
        }
      } else {
        updatedFilter[field] = value
      }

      return updatedFilter
    })
  }
  const handleWheel = event => {
    event.preventDefault()
  }

  return (
    <div style={{ backgroundColor: 'white', color: 'black' }}>
      <div
        className="py-3 px-2 d-flex align-items-center"
        style={{
          boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
          gap: '11px',
          background: 'white',
          position: 'fixed',
          width: '-webkit-fill-available',
          zIndex: '100'
        }}>
        <span
          onClick={() => {
            handleFilterOpenClose(false)
          }}
          style={{ cursor: 'pointer' }}>
          <IconComponent name="backArrow" width="20" height="20" viewBox="0 0 20 20" fill="black" />
        </span>
        <span style={{ fontWeight: '500', fontSize: '18px' }}>Filters</span>
      </div>
      <div style={{ padding: '0 25px', paddingTop: '72px' }}>
        {filterType === 'freelancer' && (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <p style={{ fontSize: '18px', fontWeight: '500', paddingLeft: '4px' }}>Sort By</p>
              <p
                style={{ fontSize: '14px', fontWeight: '500', color: '#0057FF', cursor: 'pointer' }}
                onClick={() => {
                  setAllFilters('sort', '')
                }}>
                Clear
              </p>
            </div>
            <select
              className="mb-3"
              style={{ display: 'block', width: '100%', border: '1px solid', height: '37px' }}
              value={filters?.sort}
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
            <div className="d-flex justify-content-between align-items-center">
              <p style={{ fontSize: '18px', fontWeight: '500', paddingLeft: '4px' }}>Project type</p>
              <p
                style={{ fontSize: '14px', fontWeight: '500', color: '#0057FF', cursor: 'pointer' }}
                onClick={() => {
                  setAllFilters('projectBudgetType', '')
                }}>
                Clear
              </p>
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
                      checked={type === filters?.projectBudgetType}
                      inputProps={{ 'aria-label': 'controlled' }}
                      onChange={e => {
                        setAllFilters('projectBudgetType', e?.target?.checked ? type : '')
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
          <p style={{ fontSize: '18px', fontWeight: '500', paddingLeft: '4px' }}> Rate</p>
          <p
            onClick={() => {
              setAllFilters('minRate', '')
              setAllFilters('maxRate', '')
              setError({ maxError: '', minError: '' })
            }}
            style={{ fontSize: '14px', fontWeight: '500', color: '#0057FF', cursor: 'pointer' }}>
            Clear
          </p>
        </div>
        <div className="justify-content-between" style={{ gap: '20px' }}>
          <div>
            <p className="mb-0">Min</p>
            <div
              className="d-flex align-items-center "
              style={{
                border: '1px solid #BCC5D3'
              }}>
              <span style={{ padding: '0 18px 0 9px', display: 'flex', alignSelf: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                  <path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" />
                </svg>
              </span>
              <input
                type="number"
                value={filters.minRate}
                id="minRate"
                name="minRate"
                ref={minRef}
                onBlur={handleBlur}
                onChange={handleBlur}
                onWheel={handleWheel} // Attach the wheel event handler
                onKeyPress={event => {
                  if (event?.key === 'Enter') {
                    setAllFilters('minRate', event?.target?.value)
                  }
                }}
                style={{
                  margin: '0',
                  border: '0',
                  height: '42px'
                }}></input>
              <span style={{ padding: '0 18px 0 9px', display: 'flex', alignSelf: 'center' }}>USD</span>
            </div>
            {error?.minError && <p style={{ fontSize: '12px', color: 'red' }}>{error?.minError}</p>}
          </div>
          <div className="pt-3">
            <p className="mb-0">Max</p>
            <div
              className="d-flex align-items-center"
              style={{
                border: '1px solid #BCC5D3'
              }}>
              <span style={{ padding: '0 18px 0 9px', display: 'flex', alignSelf: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                  <path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" />
                </svg>
              </span>
              <input
                type="number"
                value={filters.maxRate}
                ref={maxRef}
                name="maxRate"
                id="maxRate"
                onWheel={handleWheel} // Attach the wheel event handler
                onBlur={handleBlur}
                onChange={handleBlur}
                onTouchStart={e => e.stopPropagation()}
                onTouchMove={e => e.stopPropagation()}
                onKeyPress={event => {
                  if (event?.key === 'Enter') {
                    setAllFilters('maxRate', event?.target?.value)
                  }
                }}
                style={{
                  margin: '0',
                  border: '0',
                  height: '37px',
                  height: '42px'
                }}></input>
              <span style={{ padding: '0 18px 0 9px', display: 'flex', alignSelf: 'center' }}>USD</span>
            </div>
            {error?.maxError && <p style={{ fontSize: '12px', color: 'red' }}>{error?.maxError}</p>}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center pt-5">
          <p style={{ fontSize: '18px', fontWeight: '500', paddingLeft: '4px' }}>Skills</p>
          <p
            style={{ fontSize: '14px', fontWeight: '500', color: '#0057FF', cursor: 'pointer' }}
            onClick={() => {
              setAllFilters('skill', [])
            }}>
            Clear
          </p>
        </div>
        <div
          className="d-flex border border-dark mb-5"
          style={{ padding: '7.5px 20px', borderRadius: '7px', gap: '20px' }}>
          <IconComponent name="footerSearch" width="24" height="20" viewBox="0 0 24 20" fill="black" />
          <input
            placeholder="Search Skills"
            style={{ margin: '0', border: '0', height: 'auto' }}
            type="text"
            value={userInput}
            onChange={handleSuggestions}
          />
          <ClearIcon
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
              <li
                key={index}
                onClick={() => {
                  handleSuggestionClick(skill)
                  setUserInput('')
                  setSuggestions([])
                }}>
                {skill?.text}
              </li>
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
                  lineHeight: '20px',
                  letterSpacing: '0.15007999539375305px',
                  textAlign: 'left',
                  color: '#000000'
                }}
                control={
                  <Checkbox
                    checked={filters?.skill?.includes(skill?.value) ?? false}
                    inputProps={{ 'aria-label': 'controlled' }}
                    onChange={e => {
                      const updatedSkills = [...filters?.skill]

                      if (e.target.checked) {
                        updatedSkills.push(skill.value)
                      } else {
                        const index = updatedSkills.indexOf(skill.value)
                        if (index !== -1) {
                          updatedSkills.splice(index, 1)
                        }
                      }
                      setAllFilters('skill', updatedSkills)
                    }}
                  />
                }
                label={skill.text}
              />

              <p className="mx-3">{skill?.skill}</p>
            </div>
          ))}
        </FormGroup>
        <div className="pb-3 pt-5" style={{ display: 'grid' }}>
          <button
            style={{
              background: '#37DEC5',
              color: 'white',
              fontSize: '18px',
              border: '0',
              padding: '10px 0px',
              fontWeight: '600'
            }}
            onClick={handleSearhButton}>
            SEE RESULTS
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileSearchFilter
