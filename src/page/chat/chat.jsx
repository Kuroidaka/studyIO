import { Edit } from 'react-feather';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { motion } from "framer-motion";

import ChatBox from './chatbox';
import InputBox from "./input/index";
import ConversationContext from '../../context/Conversation.Context';

const ChatPage = () => {
    
    const { conList, selectedCon } = useContext(ConversationContext);  
    
    
    const [conversationData, setConversationData] = useState({});
    
    useEffect(() => {
        const search = selectedCon
        
        const day = conList.find(item => item.dayRef === search.dayRef);
        
        if (day) {
        const conversation = day.conversationList.find(con => con.id === search.id);
        
            if (conversation) {
                setConversationData(conversation)
            } else {
                console.log('No conversation found with the given id.');
            }
        } else {
            console.log('No conversations found for the given day.');
        }

    }, [selectedCon]);

    const chatBoxProps = {
        msgList: conversationData.messages,
    }
    
    const inputBoxProps = {
        conId: conversationData.id,
    }

    return ( 
        <Container>
            <div className='chat-box'> 

                <motion.div 
                    className='title'
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}>
                    <motion.div className='Edit-icon'>
                        <Edit />
                    </motion.div>
                    <motion.h1>StudyIO</motion.h1>
                </motion.div>

                <BoxChatContainer>
                    <ChatBox {...chatBoxProps}/>
                </BoxChatContainer> 

                <InputContainer>
                    <InputBox {...inputBoxProps}/>
                </InputContainer>
            </div>
        </Container>
     );
}
 
export default ChatPage;

const Container = styled.div`
    height: 100%;
    .chat-box {
        height: 100%;
        background-color: #292A38;
        color: #ffffff;
        position: relative;
    }

    /*title*/
    .title {
        display: flex;
        align-items: center;
        margin-left: 40px;
        height: 8vh;
        h1 {
            margin-left: 5px; /* Thay đổi khoảng cách giữa Edit và chữ StudyIO */
            font-size: 20px;   /* Thay đổi kích thước của chữ StudyIO */
            font-style: 'Montserrat';
            margin-top: 2px;
        }
    
        .Edit-icon {
            width: 35px;
            height: 35px;
            margin-left: 15px;
            margin-top: 10px;
        }
    }
    

`

const BoxChatContainer = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 84vh;
    
    .start-screen{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 80%;
        p {
            font-size: 30px; /* Kích thước chữ to hơn */
            color: #fff; /* Màu trắng */
            font-weight: bold; /* Đậm đặc chữ */
        }
    }
`
const InputContainer = styled.div`
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 25px;

`
