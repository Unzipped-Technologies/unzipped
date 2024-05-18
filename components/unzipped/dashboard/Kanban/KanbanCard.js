// KanbanCard.js
import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

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
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  font-weight: bold;
  font-size: 16px;
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

// KanbanCard Component
const KanbanCard = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DraggableItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <CardHeader>{item.title}</CardHeader>
            <CardBody>{item.description}</CardBody>
            <CardFooter>
              <span>Due: {item.dueDate}</span>
            </CardFooter>
          </DraggableItem>
        );
      }}
    </Draggable>
  );
};

export default KanbanCard;
