
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getProjectsList } from '../../../redux/actions';
import useWindowSize from '../../ui/hooks/useWindowSize';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 100%;
`;

const SelectStyled = styled(Select)`
    border: 1px solid black !important;
    width: 488px !important;
    @media screen and (max-width: 600px) {
        width: 100% !important;

    }
`;

const ProjectDropdown = ({getProjectsList}) => {

    const dispatch = useDispatch();
    const projects = useSelector(state => state.Business.projectList);

    const [projectList, setProjectList] = useState([]);
    const [selectedVal, setSelectedVal] = useState('');
    const [isSmallWindow, setIsSmallWindow] = useState(false)

    const { width } = useWindowSize();
    useEffect(() => {
        const project = projects.map(item => ({ value: item.name, label: item.name }));
        setProjectList(project);
    }, [projects])

    const handleSearchChangeEvent = (e) => {
        setSelectedVal(e);
    }

    function debounce(func, wait) {
        let timeout;
    
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
    
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const handleSearch = debounce((e) => {
        if (e.target.value.length > 1) {
            getProjectsList({ filter: { name: e.target.value } });
        }
    }, 500);

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
        getProjectsList({ filter: { name: "" } });
    }, [])

    return (
        <Container>
            <SelectStyled
                classNamePrefix="select"
                isDisabled={false}
                isClearable={true}
                isSearchable={true}
                options={projectList}
                onKeyDown={handleSearch}
                onChange={handleSearchChangeEvent}
                styles={{

                    control: (provided, state) => ({
                        ...provided,
                        width: `${isSmallWindow ? '100%' : '488px'}`,
                        border: '1px solid black',
                        borderRadius: 0,
                        boxShadow: state.isFocused ? null : null,
                        '&:hover': {
                            border: '1px solid black',
                        },
                    }),
                }}
            />
        </Container>
    )
}

const mapStateToProps = state => {
    console.log(state)
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
