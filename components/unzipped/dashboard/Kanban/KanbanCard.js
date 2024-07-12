// KanbanCard.js
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import ProjectUsers from './ProjectusersDropdown';

// Styled Components for the Card
const DraggableItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
  padding: 16px;
  margin: 0 0 8px 0;
  min-height: 100px;
  background-color: ${(props) => (props.isDragging ? '#263B4A' : '#ffffff')};
  color: #000;
  border: 1px solid #ddd;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #E25050;
  max-width: 300px;
  height: 245px;
  @media (max-height: 768px) {
    height: 230px;
  }
`;

const CardHeader = styled.div`
  font-weight: 500;
  font-size: 19px;
  margin-bottom: 8px;
`;

const CardBody = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #777;
`;



const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  /* background: ${({ isDragging }) =>
    isDragging ? 'rgba(255, 59, 59, 0.15)' : 'white'}; */
  background: white;
  margin-top: 15px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
  /* .priority{ */
  /* margin-right: 12px; */
  /* align-self: center;
    svg{
      width: 12px !important;
      height: 12px !important;
      margin-right: 12px; */
  /* margin-top: 2px; */
  /* } */
  /* } */
`;
// KanbanCard Component
const KanbanCard = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DraggableItem>
            <CardHeader>
              <span style={{ fontWeight: 500, fontSize: 28 }}> {item.ticketNumber}</span>
              {` ${item.title}`}
            </CardHeader>
            <CardBody>
              <span style={{ fontWeight: 500, fontSize: 18, color: "#777777" }}> Effort:</span>
              <span style={{ fontWeight: 500, fontSize: 18, color: "#000" }}> 3</span>
            </CardBody>
            <CardFooter>
              <ProjectUsers />
            </CardFooter>
          </DraggableItem>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
