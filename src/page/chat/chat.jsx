import styled from 'styled-components';
import { Edit } from 'react-feather';
import InputBox from "./input/index";
import ChatBox from './chatbox';
import { useContext, useEffect, useState } from 'react';
import ConversationContext from '../../context/Conversation.Context';

const ChatPage = () => {
    
    const { conList, isLoading, selectedCon } = useContext(ConversationContext);  
    
    
    const [conversationData, setConversationData] = useState({});
    
    useEffect(() => {
        console.log(selectedCon);

        const search = selectedCon
        
        const day = conList.find(item => item.dayRef === search.dayRef);
        
        if (day) {
        const conversation = day.conversationList.find(con => con.id === search.id);
        
            if (conversation) {
                console.log(conversation);
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
    
    return ( 
        <Container>
            <div className='chat-box'> 
                <div className='title'>
                    <Edit className='Edit-icon' />
                    <h1>StudyIO</h1>
                </div>

                <BoxChatContainer>
                    <ChatBox {...chatBoxProps}/>
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
            margin-left: 20px; /* Thay đổi khoảng cách giữa Edit và chữ StudyIO */
            font-size: 20px;   /* Thay đổi kích thước của chữ StudyIO */
            font-style: 'Montserrat';
        }
    
        .Edit-icon {
            width: 35px;
            height: 35px;
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
