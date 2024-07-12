// ProjectKanbanBoard.js
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import KanbanBoard from './KanbanBoard';
import FilterIcon from '../../../icons/filterIcon'
import Button from '@mui/material/Button';
import AssignedToList from './AssignedToList';
import MyProjectsLists from './MyProjectsLists';

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
  flex-direction: column;
  align-items: center;
  height: auto;
  overflow: hidden;
  background-color: #f0f2f5;
  width: 100%;
  justify-content: center;
  padding-left: 20px;
  padding-right: 40px;
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
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

`;

const ProjectFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  margin-bottom: 20px;
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
const ProjectKanbanBoard = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [currentBusiness, setCurrentBusiness] = useState(null);

  const handleProjectChange = (event) => {
    const project = event.target.value;
    setSelectedProject(project);
    // Update selectedDepartment and currentBusiness based on selected project
    // For example:
    // setSelectedDepartment(project.department);
    // setCurrentBusiness(project.business);
  };

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
              <MyProjectsLists />
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
                  <SearchTextStyled type="text" placeholder="Filter by keywords" />
                </div>
              </FilterDiv>

              <DIV>
                <div>
                  <AssignedToList />
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
          <KanbanBoard selectedDepartment={selectedDepartment} currentBusiness={currentBusiness} />
        </BoardContainer>
      </Container>
    </>
  );
};

export default ProjectKanbanBoard;
