// ProjectKanbanBoard.js
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import KanbanBoard from './KanbanBoard';
import FilterIcon from '../../../icons/filterIcon'
import Button from '@mui/material/Button';
import AssignedToList from './AssignedToList';
import MyProjectsLists from './MyProjectsLists';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBusinessEmployees,
  loadAllBusinessAssociatedTickets,
  resetBusinessList
}
  from '../../../../redux/Business/actions';



// Global Style
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f2f5;
    margin: 0;
    padding: 0;
  }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  height: auto;
  background-color: #f0f2f5;
  width: 100%;
  justify-content: center;
  padding: 0px 20px;
`;

const Header = styled.div`
  display: flex;
  padding: 0px 20px;
  position: relative;
  width: 100%;
    justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  & h6 {
    font-size: 1.4 rem;
    padding-right: 10px;
  }
`;

const ProjectSelector = styled.select`
  font-size: 16px;
  position: absolute;
  top: 0px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;


`;
const DIV = styled.div`
  width: 40%;
  display: flex;
  padding: 10px;
  gap: 20px;
  justify-content: center;
  background: #fff;

  @media only screen and (max-width: 992px) {
    width: 70%;
    gap: 10px;
  }
`;

const FilterDiv = styled.div`
  width: 70%;
  display: flex;
  padding-left: 55px;
  gap: 20px;
  padding-top: 10px;
  background: #fff;

  @media only screen and (max-width: 992px) {
    width: 30%;
    padding-left: 20px;
    gap: 10px;
  }
`;


const BoardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProjectFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;


const FilterIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchTextStyled = styled.input`
  width: 100%;
  border: 0px !important;
  border-radius: 0px !important;
  &:focus {
    border-bottom: 0px !important;
  }
`;

// Main Component
const ProjectKanbanBoard = ({
  selectedDepartment,
  currentBusiness,
  businesses,
  isFullScreen
}) => {
  const departmentData = useSelector(state => state.Departments.selectedDepartment)
  const [backendCols, setBackendCols] = useState({});
  const [assigneeFilters, setAssigneeFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { fullBoardViewTickets } = useSelector(state => state.Business)
  const [businessInfo, setBusinessInfo] = useState('')
  const [departmentFiltering, setDepartmentFiltering] = useState('')


  useEffect(() => {
    if (isFullScreen) {

      dispatch(resetBusinessList())
      if (businessInfo) {
        dispatch(loadAllBusinessAssociatedTickets(businessInfo))
        dispatch(getBusinessEmployees(businessInfo))
      }
    }
  }, [isFullScreen, businessInfo])

  useEffect(() => {
    if (isFullScreen) {
      setBackendCols(fullBoardViewTickets);
    }
  }, [fullBoardViewTickets])

  useEffect(() => {
    if (isFullScreen) {
      setBusinessInfo(businesses[0]?._id);
    }
  }, [businesses])

  const [deptFilter, setDptFilter] = useState([]);

  useEffect(() => {
    if (isFullScreen) {
      if (businessInfo) {
        let _deptArr = []
        dispatch(getBusinessEmployees(businessInfo))
        const _dpt = businesses.map(business => (
          business.businessDepartments.map(dept => (
            {
              departmentId: dept._id,
              name: dept.name
            }
          )
          ))).flat()
        if (backendCols) {
          for (const [key, value] of Object.entries(backendCols)) {
            _deptArr = [..._deptArr, ...value.tasks.map(task => task.departmentId)]
          }
        }

        const uniqueIds = new Set(_deptArr);

        const filteredRecords = _dpt.filter(record => uniqueIds.has(record.departmentId));


        setDptFilter(filteredRecords)
      }
    }
  }, [businessInfo, businesses])

  useEffect(() => {
    if (departmentFiltering.length === 0) {

      setBackendCols(fullBoardViewTickets)
    } else {
      const departmentIdsToFilter = new Set(departmentFiltering.map(item => item.departmentId));
      const newFilteredTickets = { ...backendCols };

      const filteredTasksData = Object.keys(newFilteredTickets).reduce((acc, tagId) => {
        const tag = newFilteredTickets[tagId];
        const filteredTasks = tag.tasks.filter(task => departmentIdsToFilter.has(task.departmentId));

        acc[tagId] = {
          ...tag,
          tasks: filteredTasks || []
        };

        return acc;
      }, {});
      setBackendCols(filteredTasksData)
    }
  }, [departmentFiltering])


  useEffect(() => {
    if (assigneeFilters.length === 0) {

      setBackendCols(fullBoardViewTickets)
    } else {
      const newFilteredTickets = { ...backendCols };

      Object.keys(newFilteredTickets).forEach(colKey => {
        const filteredTasks = newFilteredTickets[colKey].tasks.filter(task =>
          assigneeFilters.some(record =>
            task?.assignee?.FirstName.trim() === record?.FirstName.trim() ||
            task?.assignee?.LastName.trim() === record?.LastName.trim()
          )
        );
        newFilteredTickets[colKey] = {
          ...newFilteredTickets[colKey],
          tasks: filteredTasks
        };
      });

      setBackendCols(newFilteredTickets)
    }
  }, [assigneeFilters])


  useEffect(() => {
    if (searchTerm.length > 0) {
      const newFilteredTickets = { ...backendCols };
      Object.keys(newFilteredTickets).forEach(colKey => {
        const filteredTasks = newFilteredTickets[colKey].tasks.filter(task =>
        (
          task?.taskName?.toLowerCase().trim().includes(searchTerm.toLowerCase().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")) ||
          task?.description?.toLowerCase().trim().includes(searchTerm.toLowerCase().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")) ||
          task?.ticketCode?.toLowerCase().trim().includes(searchTerm.toLowerCase().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"))
        )
        );
        newFilteredTickets[colKey] = {
          ...newFilteredTickets[colKey],
          tasks: filteredTasks
        };
      });
      setBackendCols(newFilteredTickets)
    }
    else {
      setBackendCols(fullBoardViewTickets)
    }

  }, [searchTerm])

  const handleSearchFilterOnChange = (e) => setSearchTerm(e.target.value);


  return (
    <>
      <GlobalStyle />
      <Container>
        <ProjectFilterContainer>
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              display: "flex",
              justifyContent: "center",
              background: "transparent",
              alignItems: "center",
              width: "20%"
            }}>
              <MyProjectsLists
                businesses={businesses}
                setBusinessInfo={setBusinessInfo}
                backendCols={fullBoardViewTickets}
                setBackendCols={setBackendCols}
              />
            </div>

            <div style={{
              display: "flex",
              width: "80%",
              boxShadow: " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              borderRadius: "10px"
            }}>
              <FilterDiv>
                <FilterIconContainer>
                  <FilterIcon />
                </FilterIconContainer>
                <div style={{ width: "100%" }}>
                  <SearchTextStyled type="text" placeholder="Filter by keywords" onChange={handleSearchFilterOnChange} />
                </div>
              </FilterDiv>

              <DIV>
                <div>
                  <AssignedToList
                    ticketAssignedTo={assigneeFilters}
                    setTicketAssignedTo={setAssigneeFilters}
                  />
                </div>
                <div>
                  <Button
                    id="demo-customized-button"
                    aria-haspopup="true"
                    disableElevation
                    sx={{
                      width: 'max-content',
                      color: "#000",
                      background: "#fff !important",
                      fontSize: "17px",
                      fontWeight: "500",
                      textTransform: "none",
                      '&:active': { background: "transparent !important" },
                      '&:focus': { backgroundColor: "transparent !important" },
                      '&:hover': { backgroundColor: "transparent !important" }
                    }}
                  >
                    Return To Default
                  </Button>
                </div>
              </DIV>
            </div>

          </div>
        </ProjectFilterContainer>
        <BoardContainer>
          <KanbanBoard
            selectedDepartment={selectedDepartment}
            currentBusiness={currentBusiness}
            departmentData={departmentData}
            backendCols={backendCols}
            setBackendCols={setBackendCols}
          />
        </BoardContainer>
      </Container>
    </>
  );
};

export default ProjectKanbanBoard;
