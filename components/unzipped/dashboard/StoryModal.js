import React, {useState, useEffect, useRef} from 'react'
import Modal from '../../ui/Modal'
import Image from '../../ui/Image'
import {
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Span,
    Underline,
    Grid2,
    Grid3,
} from './style'
import { FormField } from '../../ui'
import styled from 'styled-components'

const Left = styled.div`
    display: flex;
    justify-content: flex-start;
    height: 150px;
    margin-right: 10px;
`;

const StoryModal = ({content, onHide, user}) => {
    const [editDescription, setEditDescription] = useState(false)
    const [form, setForm] = useState({
        description: content?.description || '',
        comment: '',
    })
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setEditDescription(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    console.log(content)

    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         setEditDescription(false);
    //     }
    // }; onKeyDown={handleKeyDown}

    return (
        <Modal onHide={() => onHide(false)} height="520px">
            <DarkText>{content.department.toLowerCase()} {'>'} {content?.ticketCode.toLowerCase()}</DarkText>
            <Underline margin="15px 0px"/>
            <TitleText size="24px" textOverflow="ellipsis" width="90%" lineHeight="32px">{content?.taskName}</TitleText>
            <Grid3 block margin="0px" grid="2fr 1fr 1fr">
                <Span dark size="16px" bold>assignee: <Span dark size="16px" clickable><Image radius="50%" src={content.employee.profileImage} margin="0px 5px 0px 10px" width="20px" height="20px" />{content.employee?.FirstName || 'Unassigned'} {content.employee?.LastName}</Span></Span>
                <Span dark size="16px" bold>priority: <Span dark size="16px" clickable space> {content?.priority}</Span></Span>
                <Span dark size="16px" bold>points: <Span clickable dark size="16px" space> {content?.storyPoints}</Span></Span>
            </Grid3>
            <Grid2 block margin="0px">
                <Span dark size="16px" bold><Span clickable dark size="16px" space></Span></Span>
                <Span dark size="16px" bold>status: <Span clickable dark size="16px" space> {content?.tagName}</Span></Span>
            </Grid2>
            {!editDescription ? (
                <DarkText onClick={() => setEditDescription(true)} topMargin="20px">{form.description}</DarkText>
            ) : (
                <div ref={wrapperRef}>
                    <FormField 
                        fieldType="input"
                        margin
                        fontSize='14px'
                        noMargin
                        height="150px"
                        textarea
                        onChange={(e) => setForm({...form, description: e.target.value})}
                        value={form.description}
                    >
                    </FormField>
                </div>

            )}

            <Underline margin="15px 0px"/>
            {content?.comments.length > 0 && <Span dark size="16px" bold>comments:</Span>}
            {content?.comments.length > 0 && content?.comments.map(item => (
                <WhiteCard borderColor="transparent" unset>
                    <Span margin="10px 0px 10px 0px">
                        {item?.profilePic && <Image src={item?.profilePic} width="24px" height="24px" radius="50%"/>}
                        {item?.name && <Span space><DarkText noMargin>{item?.name}</DarkText></Span>}
                    </Span>

                    {item?.text && <DarkText>{item?.text}</DarkText>}
                    {item?.img && <Image src={item?.img}/>}
                </WhiteCard>
            ))}
            <Span>
                <Left>
                    <Image src={user?.profileImage} width="24px" height="24px" radius="50%"/>                    
                </Left>

                <FormField 
                    fieldType="input"
                    margin
                    fontSize='14px'
                    placeholder="Leave a comment..."
                    noMargin
                    width="100%"
                    height="150px"
                    textarea
                    onChange={(e) => setForm({...form, comment: e.target.value})}
                    value={form.comment}
                >
                </FormField>
            </Span>

        </Modal>
    )
}

export default StoryModal