import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import KanbanCard from './KanbanCard';
import { makeStyles } from "@material-ui/core/styles";

const datas = [
  { id: 2, label: "aaa" },
  { id: 3, label: "bbb" },
  { id: 4, label: "ccc" }
];

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
});

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

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
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Board = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0px 20px;
  width: 100%;
  height: calc(100vh - 244px); 
  overflow: scroll;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px; 
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  width: 300px;
`;

const ColumnTitle = styled.h2`
  font-size: 24px;
  color: #000000;
  margin: 15px 0px;
  padding: 0px;
  text-align: center;
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
  {
    id: uuid(),
    ticketNumber: 101,
    title: "Create full screen mode for task list page",
    description: "This is the description for the first task.",
    dueDate: "2024-05-20"
  },

  {
    id: uuid(),
    ticketNumber: 102,
    title: "Make changes to the signup flow",
    description: "This is the description for the second task.",
    dueDate: "2024-05-21"
  },

  {
    id: uuid(),
    ticketNumber: 103,
    title: "Verify identity not working in staging",
    description: "This is the description for the third task.",
    dueDate: "2024-05-22"
  },

  {
    id: uuid(),
    ticketNumber: 104,
    title: "Create security alert or unusual activity email",
    description: "This is the description for the fourth task.",
    dueDate: "2024-05-23"
  },

  {
    id: uuid(),
    ticketNumber: 105,
    title: "Create user successfully Hired email for (client)",
    description: "This is the description for the fifth task.",
    dueDate: "2024-05-24"
  }
];

const columnsFromBackend = {
  [uuid()]: {
    name: "New",
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


const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 340px;
  border-radius: 10px;
  padding: 15px 15px;
  margin-right: 45px;
  min-height: 80vh;
  overflow-y: scroll;
  max-height: 80vh;
  ::-webkit-scrollbar {
    width: 5px; 
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

// Main KanbanBoard Component
function KanbanBoard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };
  const [columns, setColumns] = useState(columnsFromBackend);
  const [maxHeight, setMaxHeight] = useState(0);
  const columnsRef = useRef([]);

  useEffect(() => {
    const heights = columnsRef.current.map(ref => ref?.clientHeight || 0);
    const maxHeight = Math.max(...heights);
    setMaxHeight(maxHeight);
  }, [columns]);

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
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
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
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
          items: copiedItems,
        },
      });
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Board>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            <TaskColumnStyles>
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}>
                      <div>
                        <ColumnTitle>{column.name}</ColumnTitle>
                      </div>
                      <div>
                        <Droppable key={columnId} droppableId={columnId}>
                          {(provided, snapshot) => (
                            <TaskList
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {column.items.map((item, index) => (
                                <KanbanCard key={item} item={item} index={index} />
                              ))}
                              {provided.placeholder}
                            </TaskList>
                          )}
                        </Droppable>
                      </div>
                    </div>
                  </>
                );
              })}
            </TaskColumnStyles>
          </DragDropContext>
        </Board>
      </Container>
    </>
  );
}

export default KanbanBoard;
