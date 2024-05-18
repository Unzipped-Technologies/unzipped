import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import KanbanCard from './KanbanCard';

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Board = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0px 20px;
  width: 90%;
  height: calc(100vh - 244px); /* Adjusted height to avoid overflow */
  overflow: auto; /* Enable scrolling within the board */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  width: 300px;
`;

const ColumnTitle = styled.h2`
  font-size: 20px;
  color: #000000;
  margin-bottom: 10px;
`;

const DroppableArea = styled.div`
  background-color: ${(props) => (props.isDraggingOver ? '#34D9B3' : '#e0e4e7')};
  padding: 8px;
  width: 100%;
  min-height: ${(props) => props.minHeight}px; /* Dynamic height */
  border-radius: 8px;
`;

// Data and Functions
const itemsFromBackend = [
  { id: uuid(), title: "First task", description: "This is the description for the first task.", dueDate: "2024-05-20" },
  { id: uuid(), title: "Second task", description: "This is the description for the second task.", dueDate: "2024-05-21" },
  { id: uuid(), title: "Third task", description: "This is the description for the third task.", dueDate: "2024-05-22" },
  { id: uuid(), title: "Fourth task", description: "This is the description for the fourth task.", dueDate: "2024-05-23" },
  { id: uuid(), title: "Fifth task", description: "This is the description for the fifth task.", dueDate: "2024-05-24" }
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "To do",
    items: []
  },
  [uuid()]: {
    name: "In Progress",
    items: []
  },
  [uuid()]: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

// Main KanbanBoard Component
function KanbanBoard() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [maxHeight, setMaxHeight] = useState(0);
  const columnsRef = useRef([]);

  useEffect(() => {
    const heights = columnsRef.current.map(ref => ref?.clientHeight || 0);
    const maxHeight = Math.max(...heights);
    setMaxHeight(maxHeight);
  }, [columns]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Board>
          <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <ColumnContainer key={columnId}>
                  <ColumnTitle>{column.name}</ColumnTitle>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <DroppableArea
                          ref={el => (columnsRef.current[index] = el)}
                          {...provided.innerRef}
                          {...provided.droppableProps}
                          isDraggingOver={snapshot.isDraggingOver}
                          minHeight={maxHeight}
                        >
                          {column.items.map((item, index) => (
                            <KanbanCard key={item.id} item={item} index={index} />
                          ))}
                          {provided.placeholder}
                        </DroppableArea>
                      );
                    }}
                  </Droppable>
                </ColumnContainer>
              );
            })}
          </DragDropContext>
        </Board>
      </Container>
    </>
  );
}

export default KanbanBoard;
