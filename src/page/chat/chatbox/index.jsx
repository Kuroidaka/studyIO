
import styled from 'styled-components';
import UserMsg from './User_message';
import BotMsg from './Bot_message';
import EmptyBox from './EmptyBox';

const ChatBox = (p) => {
    const {
        msgList
    } = p

    return ( 
        <Conversation>
        {msgList ? (
                msgList.map((msg, index) => (
                    msg.sender === "user" ? (
                        <UserMsg key={index} text={msg.text}  />
                    ) : (
                        <BotMsg key={index} text={msg.text} />
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
    margin: 40px;
    height: 100%;
    width: 100%;
    max-width: 500px;
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
        margin-top: 20px;
    }

    .chat-msg:last-child {
        margin-bottom: 100px;
    }



`