
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsList } from '../../../redux/actions';
import { useEffect, useState } from 'react';


const ProjectDropdown = () => {

    const dispatch = useDispatch();
    const projects = useSelector(state => state.Business.projectList);

    const [projectList, setProjectList] = useState([]);
    const [selectedVal, setSelectedVal] = useState('');
    useEffect(() => {
        const project = projects.map(item => ({ value: item.name, label: item.name }));
        setProjectList(project);
    }, [projects])

    const handleSearchChangeEvent = (e) => {
        setSelectedVal(e);
    }

    const handleSearch = (e) => {
        if (e.target.value.length >= 3) {
            dispatch(getProjectsList({ filter: { name: e.target.value } }));
        }
    }
    return (
        <Select            
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
                    width: '488px',
                    border: '1px solid black',
                    borderRadius: 0,
                    boxShadow: state.isFocused ? null : null,
                    '&:hover': {
                        border: '1px solid black',
                    },           
                }),
            }}
        />
    )
}

export default ProjectDropdown;
