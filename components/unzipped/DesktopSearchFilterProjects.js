import React, { useMemo, useState, useRef, useEffect } from 'react'
import IconComponent from '../ui/icons/IconComponent'
import styled from 'styled-components'
import { Icon } from '../ui'

const Container = styled.div`
  // position: sticky;
  top: 265px;
  height: fit-content;
  color: #343a40 !important;
  background-color: #fff !important;
  border-radius: 10px;
  padding: 15px;
  min-width: 300px;
`

const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  background: ${({ background }) => (background ? background : '#fff')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
  cursor: ${({ cursor }) => (cursor ? cursor : '')};
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

const CheckBox = styled.div`
  max-width: 18px;
  min-width: 18px;
  min-height: 18px;
  max-height: 18px;
  border: 1px solid;
  border-color: ${({ borderColor }) => (borderColor ? borderColor : 'rgba(102, 102, 102, 0.70)')};
  background-color: ${({ backgroundColor }) => backgroundColor && backgroundColor};
  border-radius: 2px;
`

function DesktopSearchFilterProjects({
  handleProjectTypes,
  maxRate,
  setMaxRate,
  setMinRate,
  minRate,
  freelancerSkillsList,
  setSkill
}) {
  const minRef = useRef()
  const maxRef = useRef()

  const [skillData, setSkillData] = useState([
    ...freelancerSkillsList.slice(+freelancerSkillsList.length - 4, freelancerSkillsList.length)
  ])
  const [skills, setSkills] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [userInput, setUserInput] = useState('')
  const [error, setError] = useState({ maxError: '', minError: '' })
  const [uniqueSkills, setUniqueSkills] = useState(
    Object.values(
      freelancerSkillsList.reduce((accumulator, skill) => {
        accumulator[skill.skill] = skill
        return accumulator
      }, {})
    )
  )
  const [projectTypes, setProjectTypes] = useState({
    hourlyRate: false,
    fixedPrice: false
  })

  useEffect(() => {
    handleType()
  }, [projectTypes])

  useMemo(() => {
    setSkill([...skills])
  }, [skills])

  const handleSuggestions = event => {
    const input = event.target.value.toLowerCase()
    setUserInput(input)
    var matchingSkills = uniqueSkills.filter(skill => skill.skill.toLowerCase().includes(input))
    if (!input) {
      setSuggestions([])
    } else {
      setSuggestions([...matchingSkills])
    }
  }

  const handleSuggestionClick = value => {
    setSkills(prev => [...prev, value?.skill])
    setUserInput(value?.skill)
    setSkillData(prev => [...prev.filter(skill => skill.skill !== value.skill), value])
    setUniqueSkills(prev => [...prev.filter(skill => skill.skill !== value.skill)])
  }

  const handleBlur = e => {
    const { name, value } = e.target
    if (name === 'min') {
      if (+value > +maxRate && +maxRate) {
        setError(prev => ({
          ...prev,
          minError: 'Minimum should be lesser than the maximum value.'
        }))
      }
      if (+value < +maxRate) {
        setError(prev => ({
          ...prev,
          maxError: ''
        }))
      }
      if (+!value || +value < +maxRate) {
        setError(prev => ({
          ...prev,
          minError: ''
        }))
      }
    } else if (name === 'max') {
      if (+value < +minRate && +minRate) {
        setError(prev => ({
          ...prev,
          maxError: 'Maximum should be greater than the minimum value.'
        }))
      }
      if (+value > +minRate) {
        setError(prev => ({
          ...prev,
          minError: ''
        }))
      }
      if (+!value || +value > +minRate) {
        setError(prev => ({
          ...prev,
          maxError: ''
        }))
      }
    }
    if (name === 'min') {
      setMinRate(value)
    } else {
      setMaxRate(value)
    }
  }

  const handleType = () => {
    const filteredTypes = Object.keys(projectTypes).filter(val => projectTypes[val] === true)
    if (filteredTypes.length && filteredTypes.length === 1) {
      if (filteredTypes.includes('hourlyRate')) {
        handleProjectTypes('Hourly Rate')
      } else {
        handleProjectTypes('Fixed Price')
      }
    } else {
      handleProjectTypes('')
    }
  }

  const handleProjectType = feildName => {
    setProjectTypes(prevData => ({
      ...prevData,
      [feildName]: !prevData[feildName]
    }))
  }

  const handleClearProjectType = () => {
    setProjectTypes({
      ...projectTypes,
      hourlyRate: false,
      fixedPrice: false
    })
    handleProjectTypes('')
  }

  return (
    <Container>
      <div>
        <P fontSize="20px" fontWeight="600">
          Filters
        </P>
        <div className="d-flex justify-content-between pt-4 pb-4">
          <P fontSize="20px" fontWeight="600">
            Project type
          </P>
          <P cursor="pointer" fontSize="18px" fontWeight="500" color="#0057FF" onClick={handleClearProjectType}>
            Clear
          </P>
        </div>
        {Object.keys(projectTypes).map((type, index) => {
          return (
            <div className="d-flex " key={`${type}_index`} onClick={() => handleProjectType(type)}>
              {projectTypes[type] ? (
                <CheckBox backgroundColor="rgba(102, 102, 102, 0.1)">
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      fontSize: 'smaller',
                      fontWeight: 'bolder'
                    }}>
                    ✓
                  </span>
                </CheckBox>
              ) : (
                <CheckBox borderColor="rgba(102, 102, 102, 0.20)"></CheckBox>
              )}
              <p className="mx-3">{index === 0 ? 'Hourly Rate' : 'Fixed Price'}</p>
            </div>
          )
        })}
        <div className="d-flex justify-content-between align-items-center pt-3">
          <P fontSize="20px" fontWeight="600">
            Rate
          </P>
          <P
            cursor="pointer"
            fontSize="18px"
            fontWeight="500"
            color="#0057FF"
            onClick={() => {
              setMaxRate('')
              setMinRate('')
              setError({ maxError: '', minError: '' })
            }}>
            Clear
          </P>
        </div>
        <div>
          <P margin="10px 0 0 0" fontSize="18px" fontWeight="600">
            min
          </P>
          <div className="d-flex align-items-center border" style={{ border: '1px solid #BCC5D3' }}>
            <span style={{ padding: '0 18px 0 9px', display: 'flex', alignSelf: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                <path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" />
              </svg>
            </span>
            <input
              ref={minRef}
              type="number"
              value={minRate}
              name="min"
              onBlur={handleBlur}
              onChange={handleBlur}
              style={{ margin: '0', border: '0', height: '37px' }}></input>
            <span className="px-2">
              <b>USD</b>
            </span>
          </div>
          {error?.minError && <p style={{ fontSize: '12px', color: 'red' }}>{error?.minError}</p>}
        </div>

        <div>
          <P margin="24px 0 0 0" fontSize="18px" fontWeight="600">
            max
          </P>
          <div className="d-flex align-items-center " style={{ border: '1px solid #BCC5D3' }}>
            <span style={{ padding: '0 18px 0 9px', display: 'flex', alignSelf: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                <path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" />
              </svg>
            </span>
            <input
              ref={maxRef}
              type="number"
              value={maxRate}
              name="max"
              onBlur={handleBlur}
              onChange={handleBlur}
              style={{ margin: '0', border: '0', height: '37px' }}></input>
            <span className="px-2">
              <b>USD</b>
            </span>
          </div>
          {error?.maxError && <p style={{ fontSize: '12px', color: 'red' }}>{error?.maxError}</p>}
        </div>

        <div className="d-flex justify-content-between align-items-center pt-5">
          <P fontSize="20px" fontWeight="600">
            Skills
          </P>
          <P
            cursor="pointer"
            fontSize="18px"
            fontWeight="500"
            color="#0057FF"
            onClick={() => {
              setUniqueSkills(
                Object.values(
                  freelancerSkillsList.reduce((accumulator, skill) => {
                    accumulator[skill.skill] = skill
                    return accumulator
                  }, {})
                )
              )
              setSuggestions([])
              setUserInput('')
              setSkills([])
              setSkillData([
                ...freelancerSkillsList.slice(+freelancerSkillsList.length - 4, freelancerSkillsList.length)
              ])
            }}>
            Clear
          </P>
        </div>
        <div
          className="d-flex"
          style={{ border: '1px solid #BCC5D3', padding: '7.5px 20px', borderRadius: '7px', gap: '20px' }}>
          <IconComponent name="footerSearch" width="24" height="20" viewBox="0 0 24 20" fill="black" />
          <input
            placeholder="Search"
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
              <Li
                key={index}
                onClick={() => {
                  handleSuggestionClick(skill)
                  setUserInput('')
                  setSuggestions([])
                }}>
                {skill?.skill}
              </Li>
            ))}
          </ul>
        </div>
        {skillData?.map((skill, index) => (
          <div className="d-flex" style={{ lineHeight: 'normal' }} key={`${skill.skill}_${index}`}>
            {skills.includes(skill?.skill) ? (
              <div
                onClick={() => {
                  setSkills(skills.filter(data => data !== skill?.skill))
                  setUniqueSkills(prev => [...prev, skill])
                  setSkillData(prev => [...prev.filter(data => data.skill !== skill.skill)])
                }}
                style={{
                  maxWidth: '18px',
                  minWidth: '18px',
                  minHeight: '18px',
                  maxHeight: '18px',
                  border: '1px solid rgba(102, 102, 102, 0.70)',
                  backgroundColor: 'rgba(102, 102, 102, 0.1)',
                  borderRadius: '2px'
                }}>
                <span style={{ display: 'flex', justifyContent: 'center', fontSize: 'smaller', fontWeight: 'bolder' }}>
                  ✓
                </span>
              </div>
            ) : (
              <div
                onClick={() => {
                  setSkills(prev => [...prev, skill?.skill])
                  setUniqueSkills(prev => [...prev.filter(data => data.skill !== skill.skill)])
                }}
                style={{
                  maxWidth: '18px',
                  minWidth: '18px',
                  minHeight: '18px',
                  maxHeight: '18px',
                  border: '1px solid rgba(102, 102, 102, 0.20)',
                  borderRadius: '2px'
                }}></div>
            )}
            <p className="mx-3">{skill?.skill}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default DesktopSearchFilterProjects