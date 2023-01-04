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
} from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";
import styled from 'styled-components'

const Page = styled.div`
    max-height: 100vh;
    overflow: hidden;
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
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

    useEffect(() => {
        getConversationList(form, access)
    }, [])

    return (
        <Page>
            <Nav isSubMenu/>
            <Container>
                <ConversationContainer conversations={conversations} userEmail={user.email} openConversation={openConversation}/>
                <MessageContainer />
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
    console.log(state)
    return {
        cookie: state.Auth.token,
        user: state.Auth?.user,
        conversations: state.Messages?.conversations,
        selectedConversation: state.Messages?.selectConversation
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        getConversationList: bindActionCreators(getConversationList, dispatch),
        sendMessage: bindActionCreators(sendMessage, dispatch),
        selectConversation: bindActionCreators(selectConversation, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);