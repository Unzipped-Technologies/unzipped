import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
    TitleText,
    DarkText,
    Absolute,
    Grid3,
} from '../style'
import { FaRegCheckCircle } from 'react-icons/fa';
import Button from '../../../ui/Button'
import FormField from '../../../ui/FormField'
import Modal from '../../../ui/Modal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import AddInvoiceTask from '../../../ui/icons/addInvoiceTask'

const Title = styled.div`
    display: flex;
    flex-flow: row;
    width: 70%;
    margin: 60px 15% 40px 15%;
`;

const Toggle = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 260px;
    height: 34px;
    background-color: #D8D8D8;
    border-radius: 5px;
    overflow: hidden;
`;

const P = styled.p`
    font-size: ${({ fontSize }) => fontSize ? fontSize : '16px'};
    font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : ''};
    color: ${({ color }) => color ? color : 'black'};
    background: ${({ background }) => background ? background : ''};
    padding: ${({ padding }) => padding ? padding : ''};
    margin: ${({ margin }) => margin ? margin : ''};
    text-align: ${({ align }) => align ? align : ''};
    border-bottom: ${({ borderBottom }) => borderBottom ? borderBottom : ''};
    right: ${({ right }) => right ? right : ''};
    width: ${({ width }) => width ? width : ''};
`;

const Left = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 5px;
    height: 100%;
    width: 100%;
    background: ${({ displayFormat }) => !displayFormat ? '#5E99D4' : 'transparent'}
`;

const Right = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 5px;
    height: 100%;
    width: 100%;
    background: ${({ displayFormat }) => displayFormat ? '#5E99D4' : 'transparent'}`;

const Container = styled.div`
    position: relative;
    display: flex;
    flex-flow: column;
    margin-bottom: 100px;
    background: ${({ background }) => background ? background : ''};
`;

const DragDiv = styled.div`
    width: 830px;
    align-self: center;
    border-right: 1px solid #D9D9D9; 
    border-left: 1px solid #D9D9D9; 
`;

const TableTop = styled.div`
    padding : 20px 30px;
    border-radius: 10px 10px 0 0;
    display:flex;
    border: 1px solid #D9D9D9;
    background-color: rgba(217, 217, 217, 0.36);
    justify-content: space-between;
    width: 830px;
    align-self: center;
`;

const ButtonComp = styled.button`
    border:0;
    background:#1976D2;
    border-radius:5px;
    color:white;
    font-weight: 500;
    padding: 6px 22px;
    height: fit-content;
    align-self: center;
`;

const DaysDiv = styled.div`
    padding: 20px 30px;
    display: flex;
    border-bottom: 1px solid #D9D9D9;
    border-right: 1px solid #D9D9D9;
    background-color: #F7F7F7;
    justify-content: space-between;
    border-left: 1px solid #D9D9D9;
`;

const Templates = ({
    weekOptions, invoiceTags, sortedData, handleWeekChange, projectName, handleShowInvoice, handleUpdatedAt, handleHours, handleTaskStatus, startDate, id, createTaskAndAddToTaskHours
}) => {
    const [createTask, setCreateTask] = useState(false);
    const [updatedTagsShow, setUpdatedTagsShow] = useState(false)
    const [data, setData] = useState({ ...sortedData })
    const [displayFormat, setDisplayFormat] = useState(false)
    const [updateHoursShow, setUpdateHoursShow] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    const [isCurrenWeek, setIsCurrentWeek] = useState(false)
    const [taskForm, setTaskForm] = useState({
        departmentId: "",
        taskName: "",
        storyPoints: NaN,
        priority: NaN,
        description: "",
        tagName: "Select Tag",
        tagId: "",
        assigneeId: "",
        updatedAt: "",
        createdAt: "",
        hours: NaN,
    })
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    useEffect(() => {
        if (startDate) {
            const currentDate = new Date();
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
            const isStartOfWeek = startDate?.toDateString() === startOfWeek?.toDateString();
            setIsCurrentWeek(isStartOfWeek)
        }
    }, [startDate])


    useEffect(() => {
        setData(sortedData)
    }, [sortedData])

    const toggleDisplayFormat = () => {
        setDisplayFormat(!displayFormat)
    }

    const onDragEnd = (result) => {
        if (!isCurrenWeek) {
            return
        }
        if (!result.destination) {
            return;
        }
        const { source, destination, draggableId } = result;
        const sourceDay = source.droppableId;
        const destinationDay = destination.droppableId;
        const ifExists = data[destinationDay].find(obj => obj._id === draggableId)
        if (ifExists)
            return;
        const sourceDayIndex = daysOfWeek.indexOf(sourceDay);
        const destinationDayIndex = daysOfWeek.indexOf(destinationDay);
        const objectToMoveIndex = data[sourceDay].findIndex(obj => obj._id === result.draggableId);
        if (objectToMoveIndex !== -1) {
            const objectToMove = { ...data[sourceDay][objectToMoveIndex] };
            const daysDifference = destinationDayIndex - sourceDayIndex;
            const currentDate = new Date(objectToMove.updatedAt);
            currentDate.setDate(currentDate.getDate() + daysDifference);
            objectToMove.updatedAt = currentDate.toISOString();
            objectToMove.date = currentDate.toISOString();
            handleUpdatedAt(objectToMove)
            const updatedSourceDay = [...data[sourceDay]];
            updatedSourceDay.splice(objectToMoveIndex, 1);
            const updatedDestinationDay = [...data[destinationDay], objectToMove];
            setData(prevData => ({
                ...prevData,
                [sourceDay]: updatedSourceDay,
                [destinationDay]: updatedDestinationDay
            }));
        }
    };

    const handleAddModal = (day) => {
        const daysToAdd = daysOfWeek.indexOf(day.slice(0, 3));
        if (daysToAdd !== -1) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + daysToAdd);
            const dateIso = new Date(date);
            const isoString = dateIso.toISOString();
            setTaskForm((prev) => ({
                ...prev,
                updatedAt: isoString,
                createdAt: isoString,
                departmentId: invoiceTags[0].departmentId,
                assigneeId: id,
            }));
            setCreateTask(true);
        }
    }
    const handleSelectedtask = (feildName, e) => {
        e.preventDefault();
        const { value } = e.target
        setSelectedTask((prev) => ({
            ...prev,
            [feildName]: +value
        }))
    }

    const handleTaskForm = (feildName, e) => {
        e.preventDefault();
        var { type, value } = e.target
        if (type === 'number') {
            value = +value
        }
        setTaskForm({
            ...taskForm,
            [feildName]: value
        })
    }
    const generateEditPopout = (item) => {
            return [
                {
                    text: 'Update Hours',
                    onClick: () => { setSelectedTask(item); setUpdateHoursShow(true) },
                },
                {
                    text: 'Update Status',
                    onClick: () => { setSelectedTask(item); setUpdatedTagsShow(true) },
                },
            ];
       
    }
    return (
        <Container >
            <Title>
                <TitleText title='true'>Timesheet</TitleText>
                <Toggle>
                    <Left displayFormat={displayFormat} onClick={toggleDisplayFormat}>
                        <DarkText small>As Client</DarkText>
                    </Left>
                    <Right displayFormat={displayFormat} onClick={toggleDisplayFormat}>
                        <DarkText small>As Freelancer</DarkText>
                    </Right>
                </Toggle>
            </Title>
            <TableTop>
                <P margin='0px' fontSize='24px' fontWeight='500'>{projectName.slice(0, 15)}{projectName?.length > 17 && '...'}</P>
                <select onChange={handleWeekChange} style={{ display: "block", border: "0", width: "fit-content", backgroundColor: "transparent" }}>
                    {weekOptions.map((week, index) => (
                        <option key={index} value={index}>
                            Week of {week.startOfWeek.toDateString()} - {week.endOfWeek.toDateString()}
                        </option>
                    ))}
                </select>
                <ButtonComp onClick={() => { handleShowInvoice(true) }}>SUBMIT</ButtonComp>
            </TableTop>
            <DragDropContext onDragEnd={onDragEnd} >
                <DragDiv>
                    {Object.keys(data).map((day, index) => {
                        return (
                            <div key={day} className="day">
                                <DaysDiv>
                                    <P margin='0px' fontWeight='500' width={'20%'}> {day.toUpperCase()} </P>
                                    <P margin='0px' fontWeight='500' > TIME SPENT </P>
                                    <P margin='0px' fontWeight='500' > STORY POINTS </P>
                                    {isCurrenWeek ? <span onClick={() => (handleAddModal(day))} ><AddInvoiceTask /></span> : <span></span>}
                                </DaysDiv>
                                <Droppable droppableId={day} key={day}>
                                    {(provided, snapshot) => (
                                        <div
                                            style={{
                                                background: snapshot.isDraggingOver ? 'lightblue' : 'white',
                                                borderRadius: '4px',
                                            }}
                                            ref={provided.innerRef}
                                            className={`droppable-area ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                        >
                                            {data[day].map((item, itemIndex) => (
                                                <Draggable key={item._id} draggableId={`${item._id}`} index={itemIndex}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                background: snapshot.isDragging ? 'red' : 'white',
                                                                position: "relative"
                                                            }}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="d-flex align-items-center draggable-item border bg-white py-3 px-2"
                                                        >
                                                            <FaRegCheckCircle size={15} color={item.tagName.includes('In') ? '#FFA500' : item.tagName.includes('Done') ? '#198754' : '#D8D8D8'} />
                                                            <P margin='0px' padding='0 0 0 10px' width={'38%'} fontWeight='500'> {item.taskName} </P>
                                                            <P margin='0px' width={'33%'} fontWeight='300'> {item.hours} HOURS</P>
                                                            <P margin='0px' width={'15%'} fontWeight='500'> {item.storyPoints} </P>

                                                            {isCurrenWeek && <Button
                                                                icon="largeExpand"
                                                                popoutWidth="150px"
                                                                noBorder
                                                                block
                                                                type="lightgrey"
                                                                fontSize="13px"
                                                                popout={generateEditPopout(item)}
                                                                iconRight>
                                                                Edit
                                                            </Button>}

                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        )
                    }
                    )}
                </DragDiv>
            </DragDropContext>
            {updatedTagsShow && (
                <Modal onHide={() => setUpdatedTagsShow(false)} height="210px" background="#D9D9D9 " width='370px'>
                    <label className='display-5'><b>SELECT STATUS</b></label>
                    <Button
                        icon="largeExpand"
                        popoutWidth="max-content"
                        popoutMinWidth='max-content'
                        noBorder
                        block
                        type="lightgrey"
                        fontSize="13px"
                        popout=
                        {
                            invoiceTags.map((tag) => ({
                                text: tag.tagName,
                                onClick: () => {
                                    setSelectedTask((prev) => ({
                                        ...prev,
                                        tagName: tag.tagName,
                                        tag: tag._id,
                                    }));
                                },
                            }))
                        }
                        iconRight>
                        {selectedTask.tagName}
                    </Button>
                    <Absolute bottom="20px">
                        <Button oval extraWide type="outlineInverse" onClick={() => setUpdatedTagsShow(false)}>
                            CANCEL
                        </Button>
                        <Button
                            disabled={false}
                            onClick={() => { handleTaskStatus(selectedTask); setUpdatedTagsShow(false) }}
                            width="58.25px"
                            oval
                            extraWide
                            margin="0px 37px 0px 20px"
                            type="black"
                        >
                            SAVE
                        </Button>
                    </Absolute>
                </Modal>
            )}
            {updateHoursShow && (
                <Modal onHide={() => setUpdateHoursShow(false)} height="200px" background="#D9D9D9" width='370px'>
                    <FormField
                        fieldType="input"
                        inputType='number'
                        margin
                        fontSize='14px'
                        noMargin
                        width="95%"
                        onChange={(e) => { handleSelectedtask('hours', e) }}
                        handleEnterKey={() => { }}
                        value={selectedTask?.hours}
                    >
                        HOURS
                    </FormField>
                    <Absolute bottom="20px">
                        <Button oval extraWide type="outlineInverse" onClick={() => setUpdateHoursShow(false)}>
                            CANCEL
                        </Button>
                        <Button
                            disabled={false}
                            onClick={() => { handleHours(selectedTask); setUpdateHoursShow(false) }}
                            width="58.25px"
                            oval
                            extraWide
                            margin="0px 37px 0px 20px"
                            type="black"
                        >
                            SAVE
                        </Button>
                    </Absolute>
                </Modal>
            )}
            {createTask && (
                <Modal onHide={() => setCreateTask(false)} height="550px" background="#D9D9D9" >
                    <FormField
                        fieldType="input"
                        margin
                        fontSize='14px'
                        noMargin
                        width="95%"
                        onChange={(e) => {
                            handleTaskForm('taskName', e)
                        }}
                        handleEnterKey={() => { }}
                        value={taskForm?.taskName}
                    >
                        TASK NAME(REQUIRED)
                    </FormField>
                    <Grid3 margin="0px" width="95%" grid="2fr 2fr">
                        <FormField
                            fieldType="input"
                            inputType='number'
                            margin
                            fontSize='14px'
                            noMargin
                            width="95%"
                            onChange={(e) => {
                                handleTaskForm('hours', e)
                            }}
                            handleEnterKey={() => { }}
                            value={taskForm?.hours}
                        >
                            HOURS
                        </FormField>
                        <FormField
                            fieldType="input"
                            inputType='number'
                            margin
                            fontSize='14px'
                            noMargin
                            width="100%"
                            onChange={(e) => {
                                if (+e.target.value < 9) {
                                    handleTaskForm('storyPoints', e)
                                }
                            }}
                            handleEnterKey={() => { }}
                            value={taskForm?.storyPoints}
                        >
                            STORY POINTS
                        </FormField>
                    </Grid3>
                    <Grid3 margin="0px" width="95%" grid="2fr 2fr">
                        <FormField
                            fieldType="input"
                            inputType='number'
                            margin
                            fontSize='14px'
                            noMargin
                            width="95%"
                            onChange={(e) => {
                                if (+e.target.value < 4) {
                                    handleTaskForm('priority', e)
                                }
                            }}
                            handleEnterKey={() => { }}
                            value={taskForm?.priority}
                        >
                            PRIORITY
                        </FormField>
                        <div style={{ height: "-webkit-fill-available" }}>
                            <label className='display-5 m-0'><b>SELECT STATUS</b></label>
                            <Button
                                icon="largeExpand"
                                popoutWidth="max-content"
                                popoutMinWidth='max-content'
                                noBorder
                                block
                                height={'auto'}
                                type="lightgrey"
                                fontSize="13px"
                                popout=
                                {
                                    invoiceTags.map((tag) => ({
                                        text: tag.tagName,
                                        onClick: () => {
                                            setTaskForm((prev) => ({
                                                ...prev,
                                                tagName: tag.tagName,
                                                tagId: tag._id,
                                            }));
                                        },
                                    }))
                                }
                                iconRight>
                                {taskForm.tagName}
                            </Button>
                        </div>
                    </Grid3>
                    <FormField
                        fieldType="input"
                        margin
                        fontSize='14px'
                        noMargin
                        height="150px"
                        textarea
                        onChange={(e) => {
                            handleTaskForm('description', e)
                        }}
                        handleEnterKey={() => { }}
                        value={taskForm?.description}
                    >
                        DESCRIPTION
                    </FormField>
                    <Absolute bottom="20px"><Button oval extraWide type="outlineInverse"
                        onClick={() => setCreateTask(false)}>CANCEL</Button><Button disabled={false} onClick={() => { createTaskAndAddToTaskHours(taskForm); setCreateTask(false) }} width="58.25px" oval extraWide margin="0px 37px 0px 20px" type="black">ADD TASK</Button></Absolute>
                </Modal>
            )}
        </Container>
    )
}

export default Templates;







