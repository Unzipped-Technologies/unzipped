import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import Nav from '../../components/unzipped/header';
import ConversationContainer from '../../components/unzipped/ConversationContainer';
import MessageContainer from '../../components/unzipped/MessageContainer';
import {
    getConversationList,
    selectConversation,
    getFreelancerById,
    createTempFile,
    updateChatStatus,
    handleUnreadMessages,
} from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter';
import socket from '../../components/sockets/index'

const MobileDisplayBox = styled.div`
    position: relative;
    @media(min-width: 680px) {
        display: none;
    }
`;

const Page = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;
    top: 0px;
    flex-flow: column nowrap;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
    height: calc(100% - 127px);
    max-height: 100%;
`;

const Inbox = ({
    token,
    cookie,
    user,
    conversations,
    selectedConversationId,
    selectedConversation,
    messagesCount,
    getConversationList,
    selectConversation,
    createTempFile,
    updateChatStatus,
    handleUnreadMessages,
}) => {
    const [onlineUsers, setOnlineUsers] = useState([])
    const access = token.access_token || cookie
    const [form, setForm] = useState({
        filter: {},
        skip: 0,
        take: 25
    })
    const [messageLimit, setMessageLimit] = useState(0)
    const [conversationId, setConversationId] = useState(selectedConversationId)

    useEffect(() => {
        if (!access) {
            router.push('/login')
        }
        getConversationList(form, access)
        socket.emit('userConnected', user._id);
        socket.on('updateOnlineUsers', (onlineUsers) => {
            setOnlineUsers(Object.keys(onlineUsers))
        });
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                socket.emit('userConnected', user._id);
            } else {
                socket.emit('updateOnlineUsers');
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [])

    const createNewFile = (data) => {
        createTempFile(data, access)
    }

    const openConversation = (id) => {
        setConversationId(id)
        setMessageLimit(10)
        selectConversation(id, access, 10)
    }

    const handleMute = (status) => {
        updateChatStatus("isMute", status, selectedConversation._id, access)
    }
    const handleArchive = async (status) => {
        updateChatStatus("isArchived", status, selectedConversation._id, access)
    }

    const handleUnreadCount = (selectedConversation) => {
        handleUnreadMessages(selectedConversation)
    }

    const handleMessagesOnScroll = () => {
        setMessageLimit(prevLimit => prevLimit + 10);
        selectConversation(conversationId, access, +messageLimit + 10)
    }
    return (
        <Page>
            <Nav isSubMenu />
            <Container>
                <ConversationContainer conversations={conversations} userEmail={user.email} userId={user._id} openConversation={openConversation} />
                <MessageContainer
                    data={selectedConversation}
                    userEmail={user.email}
                    userId={user._id}
                    createTempFile={createNewFile}
                    handleChatArchive={handleArchive}
                    handleChatMute={handleMute}
                    access={access}
                    socket={socket}
                    onlineUsers={onlineUsers}
                    handleUnreadCount={handleUnreadCount}
                    messagesCount={messagesCount}
                    messageLimit={messageLimit}
                    handleMessagesOnScroll={handleMessagesOnScroll}
                />
            </Container>
            <MobileDisplayBox>
                <MobileFreelancerFooter defaultSelected="Messages" />
            </MobileDisplayBox>
        </Page>
    )
}

Inbox.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    return {
        token: token && token,
    }
}

const mapStateToProps = (state) => {
    return {
        cookie: state.Auth.token,
        user: state.Auth?.user,
        conversations: state.Messages?.conversations,
        selectedConversation: state.Messages?.selectedConversation,
        messagesCount: state.Messages?.messagesCount,
        selectedConversationId: state.Messages?.conversationId,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getConversationList: bindActionCreators(getConversationList, dispatch),
        selectConversation: bindActionCreators(selectConversation, dispatch),
        getFreelancerById: bindActionCreators(getFreelancerById, dispatch),
        createTempFile: bindActionCreators(createTempFile, dispatch),
        updateChatStatus: bindActionCreators(updateChatStatus, dispatch),
        handleUnreadMessages: bindActionCreators(handleUnreadMessages, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);