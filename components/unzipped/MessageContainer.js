import React, {useState, useEffect, useRef} from 'react'
import {
    TitleText,
    DarkText,
    Underline,
    Span,
    WhiteCard,
    Absolute
} from './dashboard/style'
import Icon from '../ui/Icon'
import Button from '../ui/Button'
import FormField from '../ui/FormField'
import Image from '../ui/Image'
import AttachmentModal from './AttachmentModal'
import ProfileContainer from './ProfileContainer';
import { ValidationUtils } from '../../utils'
import styled from 'styled-components'
import theme from '../ui/theme'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { send } from 'react-ga'

const Right = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: ${({isFullWidth}) => isFullWidth ? '1fr' : '3fr 1fr'};
    width: 100%;
    height: 100%;
`;

export const Message = styled.div`
    position: relative;
    width: 100%;
`;

export const Div = styled.div`
    width: 100%;
    z-index: 1;
    height: 70vh;
    @media(max-height: 845px) {
        height: 67vh;
    }
    @media(max-height: 761px) {
        height: 65vh;
    }
    @media(max-height: 721px) {
        height: 63vh;
    }
    @media(max-height: 669px) {
        height: 60vh;
    }
`;

const Scroll = styled(SimpleBar)`
    width: 100%;
    z-index: 1;
    height: 100%;
    overflow: hidden auto;
    .simplebar-track > .simplebar-scrollbar:before {
        background-color: ${() => theme.tint2};
        opacity: 0.1;
    }
    .simplebar-track > .simplebar-scrollbar.simplebar-visible:before {
        opacity: 0.3;
    }
    .simplebar-track[style] {
        background-color: transparent !important;
    }
    .simplebar-placeholder {
        width: auto !important;
        height: 1px !important;
    }
`;

const Spacer = styled.div`
    height: 64px;
    width: 100%;
`;

const messageItem = () => {

}

const MessageContainer = ({
    // data
    data = {}, 
    userEmail, 
    userId, 
    // functions
    sendMessageToUser, 
    createTempFile
}) => {
    const [receiver, setReceiver] = useState(data?.participants && data?.participants.find(e => e?.userId?.email !== userEmail))
    const [sender, setSender] = useState(data?.participants && data?.participants.find(e => e?.userId?.email === userEmail))
    const [isProfile, setIsProfile] = useState(true)
    const [fileUploadModal, setFileUploadModal] = useState(false)
    const [form, setForm] = useState({
        senderId: sender.userId._id,
        receiverId: receiver.userId._id,
        message: '',
        attachment: '',
    })
    const messagesEndRef = useRef()

    const send = () => {
        if (form.message || form.attachment) {
            sendMessageToUser(form)
            setForm({
                ...form,
                message: '',
                attachment: '',
            })
        }
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        setReceiver(data?.participants && data?.participants.find(e => e?.userId?.email !== userEmail))
        setSender(data?.participants && data?.participants.find(e => e?.userId?.email === userEmail))
    }, [data])

    useEffect(() => {
        scrollToBottom()
    }, [receiver])

    console.log(data)
    // TODO: add emojis to site with this
    // https://blog.logrocket.com/adding-emojis-react-app/#:~:text=To%20include%20it%20in%20your,use%20React%2016.8%20or%20higher!
    return (
        <>
            {data ? (
                <WhiteCard noMargin height='100%' padding="0px">
                    <WhiteCard noMargin row padding="10px 40px">
                        <DarkText noMargin>
                            {ValidationUtils.getFullNameFromUser(receiver?.userId)}
                        </DarkText>
                        <Button type="transparent" noBorder onClick={() => setIsProfile(!isProfile)}><Icon name="actionIcon" color="#333" /></Button>
                    </WhiteCard>
                    <Right noMargin height="100%" isFullWidth={!isProfile}>
                        <WhiteCard noMargin height="100%" padding="0px 10px" overflow="hidden">
                            <Div>
                                <Scroll>
                                    {data?.messages.map((e, index) => {
                                        if (e?.sender === userId) {
                                            return (
                                                <WhiteCard half row borderColor="transparent" unset padding="10px" alignEnd justifyEnd>
                                                    <WhiteCard background="#007FED" noMargin maxWidth="50%" unset borderRadius="15px 15px 3px 15px" padding="10px 10px"> 
                                                        <DarkText small noMargin color="#fff">{e?.message}</DarkText>   
                                                        <Absolute right="-35px" bottom="0px" width="100px"><DarkText noMargin color="#fff" fontSize="12px">{ValidationUtils.getTimeFormated(e?.updatedAt)}</DarkText></Absolute>
                                                    </WhiteCard>
                                                    <Span space unset>
                                                        <Image src={sender?.userId?.profileImage} height="54px" width="54px" radius="22%"/>                                          
                                                    </Span>
                                            
                                                </WhiteCard>
                                            )
                                        } else {
                                            return (
                                                <WhiteCard half row borderColor="transparent" unset padding="10px" alignEnd>
                                                    <Span space unset>
                                                        <Image src={receiver?.userId?.profileImage} height="54px" width="54px" radius="22%"/>                                          
                                                    </Span>
                                                    <WhiteCard background="transparent" borderColor="transparent" noMargin maxWidth="50%" unset borderRadius="15px 15px 3px 15px" padding="10px 10px"> 
                                                        <DarkText small noMargin>{e?.message}</DarkText>   
                                                        <Absolute right="-35px" bottom="0px" width="100px"><DarkText noMargin color="#fff" fontSize="12px">{ValidationUtils.getTimeFormated(e?.updatedAt)}</DarkText></Absolute>
                                                    </WhiteCard>                                 
                                                </WhiteCard>
                                            )
                                        }
        
                                    })}
                                    <div ref={messagesEndRef} />
                                </Scroll>
                            </Div>
                            <Absolute bottom="10px" width="95%" right="2.5%">
                                <Message>
                                    <FormField value={form.message} onChange={e => setForm({...form, message: e.target.value})} message placeholder="type a message..." width="100%" fieldType="input" autosize></FormField>                                    
                                </Message>
                                <Absolute zIndex={10} width="26px" right="25px"><Button disabled={!(form.message || form.attachment)} type="transparent" onClick={() => send()}><Icon name="send" /></Button></Absolute>
                                <Absolute width="13px" smallLeft zIndex={10}><Button type="transparent" onClick={() => setFileUploadModal(true)}><Icon name="paperClip" /></Button></Absolute>
                            </Absolute>
                            <Spacer></Spacer>
                        </WhiteCard>
                        {isProfile && <ProfileContainer data={receiver} isArchived={data?.isArchived} isMute={data?.isMute}/>}
                    </Right>
                </WhiteCard>        
            ) : (
                <WhiteCard height='85vh' padding="0px" center>
                    Send a message?
                </WhiteCard>
            )}
            {fileUploadModal && (
                <AttachmentModal setFileUploadModal={setFileUploadModal} createTempFile={createTempFile}/>
            )}

        </>
    )
}

export default MessageContainer