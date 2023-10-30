import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import {
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Underline,
    Grid3,
} from '../style'
import { FaRegCheckCircle } from 'react-icons/fa';
import StoryModal from '../StoryModal'
import {
    WorkIcon
} from '../../../icons'
import FreelancerCard from '../FreelancerCard'
import Icon from '../../../ui/Icon'
import Button from '../../../ui/Button'
import FormField from '../../../ui/FormField'
import Modal from '../../../ui/Modal'
// import Image from '../../ui/Image'
import Dropdowns from '../../../ui/Dropdowns'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import Projects from '../../../pages/dashboard/projects'
import { ValidationUtils } from '../../../../utils'
import AddInvoiceTask from '../../../ui/icons/addInvoiceTask'
import TickCircleTask from '../../../ui/icons/tickCircleTask'

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


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
`
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
`
const NoUsersInList = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const UserContainer = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
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
const Row = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    position: relative;
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
`
const Sign = styled.span`
    margin-right:15px;
    font-size:14px;
    border: 1px solid;
    padding: 4px 0px 3px 3.5px;
    border-radius: 50%;
    height: 16px;
    display: flex;
    width: 17px;
    align-items: center;
`

const StoryTable = styled.div`
border: 1px solid rgba(217, 217, 217, 0.25);
    border-radius: 0px 0px 15px 15px;
    background: rgba(217, 217, 217, 0.25);
    padding-bottom: 10px;
`;
const DaysDiv = styled.div`
padding: 20px 30px;
display: flex;
border-bottom: 1px solid #D9D9D9;
border-right: 1px solid #D9D9D9;
background-color: #F7F7F7;
justify-content: space-between;
border-left: 1px solid #D9D9D9;
`


// const freelancer = [
//     {
//         name: 'James Cameron',
//         type: 'Full Stack Web Developer',
//         country: 'United States',
//         skills: [
//             'React',
//             'Node.js',
//             'Web 3',
//             'AWS',
//             'UI/UX'
//         ],
//         cover: `I have been a developer for over 20 years. I have worked on many
//         large projects and I have contributed superior quality features and improved
//         ROI for many developers.`,
//         profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png',
//         isInvited: true,
//     },
//     {
//         name: 'Stefano Campagna',
//         type: 'Tutor',
//         country: 'United States',
//         skills: [
//             'React',
//             'Taking Calls',
//             'Web 3',
//             'AWS',
//             'UI/UX'
//         ],
//         cover: `I have been a developer for over 20 years. I have worked on many
//         large projects and I have contributed superior quality features and improved
//         ROI for many developers.`,
//         profilePic: '/img/testimonial_1.jpg',
//         isInvited: false
//     },
//     {
//         name: 'James Cameron',
//         type: 'Full Stack Web Developer',
//         country: 'United States',
//         skills: [
//             'React',
//             'Node.js',
//             'Web 3',
//             'AWS',
//             'UI/UX'
//         ],
//         cover: `I have been a developer for over 20 years. I have worked on many
//         large projects and I have contributed superior quality features and improved
//         ROI for many developers.`,
//         profilePic: '/img/testimonial_12.jpg',
//         isInvited: false
//     },
// ]

// const setTagsAndStories = ({ tags = [], stories = [] }) => {
//     const storyOrder = []
//     const story = tags.map(item => {
//         const orderStories = stories.filter(e => item._id === (e?.tag?._id || e?.tag)).sort((a, b) => a.order - b.order).map((e, index) => {
//             return {
//                 ...e,
//                 order: index
//             }
//         })
//         storyOrder.push(orderStories)
//         return {
//             tag: item,
//             stories: orderStories
//         }
//     })
//     return story
// }

const Templates = ({
    list,
    selectedList,
    type,
    projects = [],
    tags = [],
    stories = [],
    reorderStories,
    access,
    updateTasksOrder,
    onBack,
    dropdownList = [],
    loading = false,
    user,
    updateCreateStoryForm,
    addCommentToStory,
    createNewStory,
    form,
    weekOptions, sortedData, handleWeekChange, projectName, handleShowInvoice
}) => {
    // const [menuOpen, setMenuOpen] = useState(false)
    // const [storyList, setStoryList] = useState([])
    const [pointsDropdown, setPointsDropdown] = useState([1, 2, 3, 5, 8])
    const [searchDropdown, setSearchDropdown] = useState([1, 2, 3, 5, 8])
    // const [tagsDropdown, setTagsDropdown] = useState(tags);
    const [createTask, setCreateTask] = useState(false);

    const [data, setData] = useState({ ...sortedData })
    const [displayFormat, setDisplayFormat] = useState(false)

    useEffect(() => {
        setData(sortedData)
    }, [sortedData])
    const toggleDisplayFormat = () => {
        setDisplayFormat(!displayFormat)
    }
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const onDragEnd = (result) => {
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

    const onSubmit = () => {
        // createNewStory()
        setCreateTask(false)
    }

    const [day, setDay] = useState()
    const handleAddModal = (day) => {
        setDay(day);
        setCreateTask(true)
    }
    return (
        <Container >
            <Title>
                <TitleText title>Timesheet</TitleText>
                <Toggle>
                    <Left displayFormat={displayFormat} onClick={toggleDisplayFormat}>
                        <DarkText small>As Founder</DarkText>
                    </Left>
                    <Right displayFormat={displayFormat} onClick={toggleDisplayFormat}>
                        <DarkText small>As Investor</DarkText>
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
                <ButtonComp onClick={()=>{handleShowInvoice(true)}}>SUBMIT</ButtonComp>
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
                                    <span onClick={() => (handleAddModal(day))} ><AddInvoiceTask /></span>
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
                                                            }}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="d-flex align-items-center draggable-item border bg-white py-4 px-2"
                                                        >
                                                            <FaRegCheckCircle size={15} color="#D8D8D8" />
                                                            <P margin='0px' padding='0 0 0 10px' width={'37%'} fontWeight='500'> {item.name} </P>
                                                            <P margin='0px' width={'31%'} fontWeight='300'> {item.hours} HOURS</P>
                                                            <P margin='0px' fontWeight='500'> 4</P>
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
            {createTask && (
                <Modal onHide={() => setCreateTask(false)} height="450px" background="#D9D9D9">
                    <FormField
                        fieldType="input"
                        margin
                        fontSize='14px'
                        noMargin
                        width="95%"
                    // onChange={(e) => updateCreateStoryForm({ taskName: e.target.value })}
                    // value={form?.taskName}
                    >
                        TASK NAME(REQUIRED)
                    </FormField>
                    <Grid3 margin="0px" width="95%" grid="2fr 2fr">
                        <FormField
                            fieldType="input"
                            margin
                            fontSize='14px'
                            noMargin
                            width="95%"
                        // dropdownList={tagsDropdown}
                        // onChange={e => updateTagName(e)}
                        // value={form?.tagName}
                        // clickType="tagName"
                        // onUpdate={updateCreateStoryForm}
                        >
                            HOURS
                        </FormField>
                        <FormField
                            fieldType="input"
                            margin
                            fontSize='14px'
                            noMargin
                            width="100%"
                        // onChange={(e) => updateCreateStoryForm({ storyPoints: e.target.value })}
                        // value={form?.storyPoints}
                        // dropdownList={pointsDropdown}
                        // clickType="storyPoints"
                        // onUpdate={updateCreateStoryForm}
                        >
                            STORY POINTS
                        </FormField>

                    </Grid3>

                    <FormField
                        fieldType="input"
                        margin
                        fontSize='14px'
                        noMargin
                        height="150px"
                        textarea
                    // onChange={(e) => updateCreateStoryForm({ description: e.target.value })}
                    // value={form?.description}
                    >
                        DESCRIPTION
                    </FormField>
                    <Absolute bottom="20px"><Button oval extraWide type="outlineInverse"
                        onClick={() => setCreateTask(false)}>CANCEL</Button><Button disabled={false} onClick={() => onSubmit()} width="58.25px" oval extraWide margin="0px 37px 0px 20px" type="black">{!loading ? 'ADD TASK' : <CircularProgress size={18} />}</Button></Absolute>
                </Modal>
            )}
        </Container>
    )
}

export default Templates;