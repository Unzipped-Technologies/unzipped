import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProjectsList } from '../../../redux/actions'
import useWindowSize from '../../ui/hooks/useWindowSize'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
`

const SelectStyled = styled(Select)`
  border: 1px solid black !important;
  width: 488px !important;
  @media screen and (max-width: 600px) {
    width: 100% !important;
  }
`

const ProjectDropdown = ({ getProjectsList, userBusinessList, onChange, value }) => {
  const [projectList, setProjectList] = useState([])
  const [currentValue, setValue] = useState(null)
  const [isSmallWindow, setIsSmallWindow] = useState(false)

  const { width } = useWindowSize()

  useEffect(() => {
    const project = userBusinessList?.map(item => ({ value: item._id, label: item.name }))
    setProjectList(project)
  }, [userBusinessList])

  useEffect(() => {
    if (projectList?.length) {
      const project = projectList.find(item => item.value === value)
      project?.value && setValue(project)
      !project && setValue(null)
    }
  }, [value, projectList])

  const handleSearchChangeEvent = e => {
    onChange && onChange(e?.value)
  }

  useEffect(() => {
    if (width <= 680) {
      setIsSmallWindow(true)
    } else {
      setIsSmallWindow(false)
    }
  }, [width])

  useEffect(() => {
    getProjectsList({ filter: { name: '' } })
  }, [])
  return (
    <Container>
      <SelectStyled
        id="projects_dropdown"
        classNamePrefix="select"
        value={currentValue}
        isDisabled={false}
        isClearable={true}
        isSearchable={true}
        options={projectList}
        onChange={handleSearchChangeEvent}
        styles={{
          control: (provided, state) => ({
            ...provided,
            width: `${isSmallWindow ? '100%' : '488px'}`,
            border: '1px solid black',
            borderRadius: 0,
            boxShadow: state.isFocused ? null : null,
            '&:hover': {
              border: '1px solid black'
            }
          })
        }}
      />
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    token: state.Auth.token,
    projectApplications: state.ProjectApplications.projectApplications
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProjectsList: bindActionCreators(getProjectsList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDropdown)
