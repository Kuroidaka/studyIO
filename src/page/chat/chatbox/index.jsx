
import styled from 'styled-components';
import UserMsg from './User_message';
import BotMsg from './Bot_message';
import EmptyBox from './EmptyBox';
import { useContext, useEffect, useRef } from 'react';
import ConversationContext from '../../../context/Conversation.Context';

const ChatBox = () => {


    const { currentMsgList } = useContext(ConversationContext);  
    const pageRef = useRef(null); 

    const scrollToBottom = () => {
        // pageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
        const div = document.querySelector('.list-chat');
        div.scrollTop = div.scrollHeight - div.clientHeight;
    };

    useEffect(scrollToBottom, [currentMsgList]);

    return (
        <Conversation ref={pageRef} className='list-chat'>
        {currentMsgList && currentMsgList.length > 0  ? (
                currentMsgList.map((msg, index) => (
                    msg.sender === "user" ? (
                        <UserMsg pageRef={pageRef} key={index} text={msg.text} imgList={msg.imgList} />
                    ) : (
                        <BotMsg key={index} text={msg.text}/>
                    )
                ))

            ) : (
                <EmptyBox />
            )
        }

        </Conversation>
     );
}
 
export default ChatBox;

const Conversation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 18px;
    height: 100%;
    width: 100%;
    max-width: 700px;
    overflow-y: scroll;
    overflow-x: hidden;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar {
        display: none;/* Hide scrollbar for Chrome, Safari and Opera */
    }

    ::-webkit-scrollbar {
        display: none;
    }

    /*chat*/
    .chat-msg + .chat-msg {
        margin-top: 40px;
    }

    .chat-msg:last-child {
        margin-bottom: 100px;
    }



`