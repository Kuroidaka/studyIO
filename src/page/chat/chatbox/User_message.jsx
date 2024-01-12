import styled from "styled-components";
import { User } from 'react-feather';

const UserMsg = (p) => {

    const { text } = p;
    return ( 
    <Container className='chat-msg human-chat'>
        <div className='icon'>
            <div className='human-icon-wrapper'>
                <User className='human-icon'/>
            </div>
        </div>
        <div className="chat-content">
            <p className='chat-person'>{"You"}</p>
            <div className='human-text'>
                <p>{text}</p>
            </div>
        </div>
    </Container>
     );
}
 
export default UserMsg;

const Container = styled.div`
    width: 100%;
    display: flex;

    .icon {
        display: flex;
        align-items: center;
        align-self: flex-start;
        .human-icon-wrapper {
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;

            width: 28px;
            border-radius: 50%;
            background-color: #00a5ff;
            .human-icon {
                width: 15px;
            }
        }
    }
    .chat-content{
        margin-left: 18px;
        p.chat-person {
            font-size: 15px;
            font-weight: bold;
        }
        .human-text {

            p {
                font-size: 10px;
                font-weight: 500;
                margin-top: 10px;
            }
        }
    }
`