import React, {useEffect, useState} from 'react';
import Nav from '../../components/unzipped/header';
import ConversationContainer from '../../components/unzipped/ConversationContainer';
import MessageContainer from '../../components/unzipped/MessageContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { 
    getConversationList, 
    sendMessage, 
    selectConversation, 
    getFreelancerById,
} from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";
import styled from 'styled-components'

const Page = styled.div`
    max-height: 100vh;
    height: 100vh;
    overflow: hidden;
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
    // redux variables
    conversations,
    selectedConversation,
    // redux actions
    getConversationList,
    sendMessage,
    selectConversation,
}) => {
    const access = token.access_token || cookie
    const [form, setForm] = useState({
        filter: {},
        skip: 0,
        take: 25
    })

    const openConversation = (id) => {
        selectConversation(id, access)
    }

    const sendMessageToUser = (form) => {
        sendMessage({
            sender: {
                userId: form.senderId,
                isInitiated: true
            },
            receiver: {
                userId: form.receiverId
            },
            message: form.message,
            attachment: form.attachment,
            conversationId: selectedConversation._id || null
        }, access)
    }

    useEffect(() => {
        getConversationList(form, access)
    }, [])

    return (
        <Page>
            <Nav isSubMenu/>
            <Container>
                <ConversationContainer conversations={conversations} userEmail={user.email} openConversation={openConversation}/>
                <MessageContainer data={selectedConversation} userEmail={user.email} userId={user._id} sendMessageToUser={sendMessageToUser}/>
            </Container>
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
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        getConversationList: bindActionCreators(getConversationList, dispatch),
        sendMessage: bindActionCreators(sendMessage, dispatch),
        selectConversation: bindActionCreators(selectConversation, dispatch),
        getFreelancerById: bindActionCreators(getFreelancerById, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);