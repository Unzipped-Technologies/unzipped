// ProjectKanbanBoard.js
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import KanbanBoard from './KanbanBoard';
import Icon from '../../../ui/Icon'

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
  height: 73vh;
  overflow: hidden;
  background-color: #f0f2f5;
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
  padding: 8px 0px;
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

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Main Component
const ProjectKanbanBoard = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [currentBusiness, setCurrentBusiness] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

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
        <Header>
          <Title onClick={() => setIsSelectOpen(!isSelectOpen)}>
            <h6>Unzipped Team Kanban Board</h6>
            <Icon name="downArrow" />
          </Title>
          {isSelectOpen && (
            <ProjectSelector value={selectedProject} onChange={handleProjectChange}>
              <div value="">Select a project</div>
              <div value="project1">Project 1</div>
              <div value="project2">Project 2</div>
              <div value="project3">Project 3</div>
              {/* Add more projects as needed */}
            </ProjectSelector>
          )}
        </Header>
        <BoardContainer>
          <KanbanBoard selectedDepartment={selectedDepartment} currentBusiness={currentBusiness} />
        </BoardContainer>
      </Container>
    </>
  );
};

export default ProjectKanbanBoard;
