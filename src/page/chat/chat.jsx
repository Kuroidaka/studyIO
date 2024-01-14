import { Edit } from 'react-feather';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { motion } from "framer-motion";

import ChatBox from './chatbox';
import InputBox from "./input/index";
import ConversationContext from '../../context/Conversation.Context';

const ChatPage = () => {
    
    const { createNewConversation } = useContext(ConversationContext);  
    
    const handleOpenNewChat = () => {
        createNewConversation()
    }

    return ( 
        <Container>
            <div className='chat-box'> 

                <motion.div 
                    className='title'
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}>
                    <motion.div className='Edit-icon' onClick={handleOpenNewChat}>
                        <Edit />
                    </motion.div>
                    <motion.h1>StudyIO</motion.h1>
                </motion.div>

                <BoxChatContainer>
                    <ChatBox/>
                </BoxChatContainer> 

                <InputContainer>
                    <InputBox />
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
            margin-left: 15px; /* Thay đổi khoảng cách giữa Edit và chữ StudyIO */
            font-size: 20px;   /* Thay đổi kích thước của chữ StudyIO */
            font-style: 'Montserrat';
        }
    
        .Edit-icon {
            width: 45px;
            height: 45px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            padding: 7px;
            border-radius: 5px;
            align-items: center;
            border: 1px solid;

            &:hover {
                background-color: #ffffff;
                color: #292A38;
            }
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
