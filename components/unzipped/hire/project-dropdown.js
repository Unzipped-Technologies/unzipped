import { useEffect, useState } from 'react'
import Select from 'react-select'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectsList } from '../../../redux/actions'
import useWindowSize from '../../ui/hooks/useWindowSize'

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`

const CustomSelect = styled(Select)`
  @media screen and (max-width: 600px) {
    width: 100% !important;
  }
  /* Add any additional styling for the wrapper if needed */
`

const ProjectDropdown = ({ value, onChange }) => {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.Business.projectList)

  const [projectList, setProjectList] = useState([])
  const [selectedVal, setSelectedVal] = useState('')
  const [isSmallWindow, setIsSmallWindow] = useState(false)

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: `${isSmallWindow ? '100%' : '488px'}`,
      borderRadius: '4px',
      border: '1px solid #000',
      background: 'rgba(255, 255, 255, 0.15)',
      paddingTop: '0px !important',
      paddingTop: '-150px !important',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(0, 123, 255, 0.6)' : null,
      innerHeight: '40px',
      '&:hover': {
        borderColor: '#aaa'
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: () => ({
      paddingRight: '5px'
    })
  }

  const { width } = useWindowSize()

  useEffect(() => {
    if (width <= 600) {
      console.log('small window')
      setIsSmallWindow(true)
    } else {
      setIsSmallWindow(false)
      console.log('large window')
    }
  }, [width])

  useEffect(() => {
    const project = projects.map(item => ({ value: item._id, label: item.name }))
    setProjectList(project)
  }, [projects])

  const handleSearchChangeEvent = e => {
    console.log('e', e)
    onChange(e?.value)
  }

  const handleSearch = e => {
    if (e.target.value.length >= 3) {
      dispatch(getProjectsList({ filter: { name: e.target.value } }))
    }
  }

  return (
    <Container>
      <CustomSelect
        value={projectList?.find(project => project.value === value)}
        label="name"
        styles={customStyles}
        placeholder=""
        isDisabled={false}
        isSearchable={true}
        options={projectList}
        onKeyDown={handleSearch}
        onChange={e => handleSearchChangeEvent(e)}
      />
    </Container>
  )
}

export default ProjectDropdown
