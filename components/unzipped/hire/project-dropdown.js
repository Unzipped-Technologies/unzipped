
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsList } from '../../../redux/actions';
import { useEffect, useState } from 'react';
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

const ProjectDropdown = () => {

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

    const handleSearch = (e) => {
        if (e.target.value.length >= 3) {
            dispatch(getProjectsList({ filter: { name: e.target.value } }));
        }
    }

    useEffect(() => {
        if (width <= 600) {
            console.log('small window')
            setIsSmallWindow(true)
        } else {
            setIsSmallWindow(false)
            console.log('large window')
        }
    }, [width])
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

export default ProjectDropdown;
