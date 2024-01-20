import styled from "styled-components";
import { User } from 'react-feather';
import { useEffect, useRef } from "react";
import Img from '../../../assets/img'

const UserMsg = (p) => {

    const { text, imgList=[] } = p;
    const { imgPlaceHolder } = Img

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [text]);

    const convertStringToHtml = (str) => {
        return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }

    return ( 
    <Container className='chat-msg human-chat' ref={messagesEndRef}>
        <div className='icon'>
            <div className='human-icon-wrapper'>
                <User className='human-icon'/>
            </div>
        </div>
        <div className="chat-content">
            <p className='chat-person'>{"You"}</p>
            <div className="human-text-wrapper">
                <div className='human-text'>
                    <div className="img_list-wrapper">
                        {imgList.length > 0 && imgList.map((img, index) => (
                            <img 
                                key={index}
                                src={img.url}
                                alt="img" 
                                onError={(e) => { 
                                    console.log("error")
                                    e.target.onerror = null; 
                                    e.target.src = imgPlaceHolder
                                  }} 
                                />
                        ))}
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: convertStringToHtml(text) }} />
                </div>
            </div>
        </div>
    </Container>
     );
}
 
export default UserMsg;

const Container = styled.div`
    width: 100%;
    display: flex;
    direction: rtl;
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
        margin-right: 18px;
        max-width: 80%;
        p.chat-person {
            font-size: 16px;
            margin-bottom: 7px;
            font-weight: bold;
        }
        .human-text-wrapper{
            padding-bottom: 10px;
            padding-right: 10px;
            padding-left: 10px;
            border-radius: 10px;
            background: #484856;
            display: flex;
            align-items: center;
            justify-content: center;
            
            .human-text {
                direction: ltr;
                .img_list-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 100%;
                        max-width: 350px;
                        margin: 10px 0;
                    }
                
                }
                p {
                    font-size: 15px;
                    font-weight: 500;
                    margin-top: 10px;
                }
            }
        }
    }
`