import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import KanbanCard from './KanbanCard'
import { useDispatch } from 'react-redux'
import { updateStatusOnDrag } from '../../../../redux/actions'

// Global Style
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }
`

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Board = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0px 20px 8px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 6px;
    height: 0px;
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

  height: 82vh;

  @media (max-height: 1400px) {
    height: 80vh;
  }
  @media (max-height: 1300px) {
    height: 79vh;
  }
  @media (max-height: 1190px) {
    height: 78vh;
  }
  @media (max-height: 1135px) {
    height: 77vh;
  }
  @media (max-height: 1086px) {
    height: 76vh;
  }
  @media (max-height: 1041px) {
    height: 75vh;
  }
  @media (max-height: 999px) {
    height: 74vh;
  }
  @media (max-height: 961px) {
    height: 73vh;
  }
  @media (max-height: 925px) {
    height: 72vh;
  }
  @media (max-height: 892px) {
    height: 71vh;
  }
  @media (max-height: 861px) {
    height: 70vh;
  }
  @media (max-height: 833px) {
    height: 68vh;
  }
  @media (max-height: 781px) {
    height: 66vh;
  }
  @media (max-height: 735px) {
    height: 64vh;
  }
  @media (max-height: 694px) {
    height: 62vh;
  }
`

const ColumnTitle = styled.h2`
  font-size: 24px;
  color: #000000;
  margin: 15px 0px;
  padding: 0px;
  text-align: center;
`

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  width: 100%;
  border-radius: 10px;
  padding: 12px 5px 5px;
  height: 100%;
  min-height: 50px;
`

const TaskColumnStyles = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`

// Main KanbanBoard Component
function KanbanBoard({ backendCols }) {
  const dispatch = useDispatch()

  const [columnsX, setColumns] = useState({})

  useEffect(() => {
    setColumns(backendCols)
  }, [backendCols])

  const onDragEnd = (result, columnsX, setBackendCols) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columnsX[source.droppableId]
      const destColumn = columnsX[destination.droppableId]
      const sourceItems = [...sourceColumn.tasks]
      const destItems = [...destColumn.tasks]

      const sourcedObj = sourceItems[source.index]
      sourcedObj.status = destColumn?.tagName
      let ticketStatus = sourcedObj.status

      if (!ticketStatus.includes('In Progress')) {
        ticketStatus = ticketStatus.replace(/ (.)/g, (match, expr) => expr.toLowerCase())
      }

      dispatch(
        updateStatusOnDrag(
          sourcedObj._id,
          {
            status: ticketStatus,
            tag: destination.droppableId
          },
          sourcedObj.businessId
        )
      )

      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setBackendCols({
        ...columnsX,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems
        }
      })
    } else {
      const column = columnsX[source.droppableId]
      const copiedItems = [...column.tasks]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setBackendCols({
        ...columnsX,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems
        }
      })
    }
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Board>
          <DragDropContext onDragEnd={result => onDragEnd(result, columnsX, setColumns)}>
            <TaskColumnStyles>
              {columnsX &&
                Object.entries(columnsX)?.map(([columnId, column], index) => {
                  return (
                    <div
                      key={`${columnId}_${index}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                      }}>
                      <div
                        style={{
                          position: '-webkit-sticky',
                          position: 'sticky',
                          top: '0px',
                          paddingTop: '8px',
                          backgroundColor: 'white',
                          zIndex: 10
                        }}>
                        <ColumnTitle>{column.tagName}</ColumnTitle>
                      </div>

                      <div style={{ height: `100%` }}>
                        <Droppable key={columnId} droppableId={columnId}>
                          {(provided, snapshot) => (
                            <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                              {column?.tasks?.map((colItem, index) => (
                                <KanbanCard key={colItem} item={colItem} index={index} />
                              ))}
                              {provided.placeholder}
                            </TaskList>
                          )}
                        </Droppable>
                      </div>
                    </div>
                  )
                })}
            </TaskColumnStyles>
          </DragDropContext>
        </Board>
      </Container>
    </>
  )
}

export default KanbanBoard
