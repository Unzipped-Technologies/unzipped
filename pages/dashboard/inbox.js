import React, { useEffect, useState } from 'react';
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
    createTempFile
} from '../../redux/actions';
import { parseCookies } from "../../services/cookieHelper";
import styled from 'styled-components'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter';
import ConversationContainerMobile from '../../components/unzipped/ConversationContainerMobile';

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
    @media(max-width: 680px) {
        display: none;
    }
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
    createTempFile,
}) => {
    const access = token.access_token || cookie
    const [form, setForm] = useState({
        filter: {},
        skip: 0,
        take: 25
    })
    const [marginBottom, setMarginBottom] = useState('0px');

    const createNewFile = (data) => {
        createTempFile(data, access)
    }

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
        if (!access) {
            router.push('/login')
        }
        getConversationList(form, access)

        const handleResize = () => {
            if (window.innerWidth < 680) {
                setMarginBottom('98px');
            } else {
                setMarginBottom('128px');
            }
        };

        // Add an event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial call to set the marginBottom based on the current window width
        handleResize();

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])



    return (
        <Page>
            <Nav isSubMenu marginBottom={marginBottom} />
            <Container>
                <ConversationContainer conversations={conversations} userEmail={user.email} openConversation={openConversation} />
                <MessageContainer
                    data={selectedConversation}
                    userEmail={user.email}
                    userId={user._id}
                    sendMessageToUser={sendMessageToUser}
                    createTempFile={createNewFile}
                />
            </Container>
            <MobileDisplayBox>
                <ConversationContainerMobile conversations={conversations} userEmail={user.email} openConversation={openConversation} />
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getConversationList: bindActionCreators(getConversationList, dispatch),
        sendMessage: bindActionCreators(sendMessage, dispatch),
        selectConversation: bindActionCreators(selectConversation, dispatch),
        getFreelancerById: bindActionCreators(getFreelancerById, dispatch),
        createTempFile: bindActionCreators(createTempFile, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);