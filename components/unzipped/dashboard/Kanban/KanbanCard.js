// KanbanCard.js
import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import ProjectUsers from './ProjectusersDropdown'

// Styled Components for the Card
export const DraggableItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
  padding: 6px 10px;
  margin: 0 0 8px 0;
  min-height: 100px;
  background-color: #ffffff;
  color: #000;
  border: 1px solid #ddd;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #e25050;
`

export const CardHeader = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`

export const CardBody = styled.div`
  color: #555;
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #777;
`

// KanbanCard Component
const KanbanCard = ({ item, index }) => {
  return (
    <>
      <Draggable key={item._id} draggableId={item._id} index={index}>
        {provided => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <DraggableItem>
              <CardHeader>
                <span style={{ fontWeight: 500, fontSize: 18 }}> {item?.ticketCode}</span>
                {` ${item?.taskName}`}
              </CardHeader>
              <CardBody>
                <span style={{ fontWeight: 500, fontSize: 18, color: '#777777' }}> Effort:</span>
                <span style={{ fontWeight: 500, fontSize: 18, color: '#000' }}> {item?.storyPoints}</span>
              </CardBody>
              <CardFooter>
                <ProjectUsers isEmailRequired={true} selectedDepartment={null} assignee={item?.assignee} task={item} />
              </CardFooter>
            </DraggableItem>
          </div>
        )}
      </Draggable>
    </>
  )
}

export default KanbanCard
