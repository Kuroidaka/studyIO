import styled from "styled-components";
import { Tv } from 'react-feather';
import DOMPurify from "dompurify";

import utils from '../../../utils';
import Img from '../../../assets/img'
import Image from "../../../component/Image";
import { useEffect, useRef, useState } from "react";

const BotMsg = (p) => {
    const { text, className, isWaiting=false } = p
    // const { isWaiting, selectedCon } = useContext(ConversationContext);

    const { imgPlaceHolder } = Img

    const [newText, setNewText] = useState({
        status: false,
        text: "",
        isImg: false
    });
    const { convertStringToHtml, checkIsImgLink } = utils


    useEffect(() => {

        if(checkIsImgLink(text)) {
            setNewText({
                status: true,
                text: text,
                isImg: true
            });
        }
        else {
            setNewText({
                status: true,
                text: DOMPurify.sanitize(convertStringToHtml(text)),
                isImg: false
            });
        }
    }, [text]);

    return ( 
    <Container className={`chat-msg bot-chat ${className}`} >
        <div className='icon'>
            <div className='bot-icon-wrapper'>
                <Tv className='bot-icon'/>
                
            </div>
        </div>
        <div className="chat-content">
            <p className='chat-person'>{"StudyIO"}</p>
            <div className="bot-text-wrapper">
            { isWaiting.isWait ? (
                    <div className='bot-text'>
                        <div className="chat-dot"></div>
                        <div className="chat-dot"></div>
                        <div className="chat-dot"></div>
                    </div>
                ) : (
                    (newText.status && newText.isImg) ? (
                        <div className='bot-text'>
                            <Image 
                                src={newText.text}
                                imgPlaceHolder={imgPlaceHolder} />
                        </div>
                    ) : (
                        <div className='bot-text' dangerouslySetInnerHTML={{ __html: newText.text }} ></div>
                    )
                )
            }
            </div>
        </div>
    </Container>   
     );
}
 
export default BotMsg;

const Container = styled.div`
    /*bot*/
    width: 100%;
    display: flex;
    direction: ltr;

    .icon {
        display: flex;
        align-items: center;
        align-self: flex-start;
        .bot-icon-wrapper {
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;

            width: 28px;
            border-radius: 50%;
            background-color: #007517c9;
            .bot-icon {
                width: 15px;
            }
        }
    }
    .chat-content{
        max-width: 80%;
        margin-left: 18px;
        p.chat-person {
            font-size: 16px;   /* Thay đổi kích thước của chữ StudyIO */
            font-weight: bold;
            margin-bottom: 7px;
        }
        .bot-text-wrapper{
            padding: 10px;
            border-radius: 10px;
            background: #151515;
            display: flex;
            align-items: center;
            justify-content: center;
            .bot-text {
                width:100%;

                img {
                    width: 100%;
                    max-width: 350px;
                    margin: 10px 0;
                    /* cursor: pointer; */
                }
                p {
                    font-size: 15px;   /* Thay đổi kích thước của chữ StudyIO */
                    font-weight: 500;
                }
    
                ol {
                    list-style: inside;
                    padding: 6px 25px;
                    li {
                        font-size: 15px;   /* Thay đổi kích thước của chữ StudyIO */
                        font-weight: 500;
                        margin: 10px 0;
                    }
    
                }
            }
        }
    }

    &.waiting {
        @keyframes jump {
            0% { transform: translateY(5px); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(5px); }
        }

        .bot-text-wrapper {
            padding: 6px;
            .bot-text {
                gap: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 25px;
                .chat-dot {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    background-color: #848484;
                    border-radius: 50%;
                    animation: jump .8s linear infinite;


                    &:nth-child(1) {
                        animation-delay: 0s;
                    }
                    &:nth-child(2) {
                        animation-delay: 0.15s;
                    }
                    &:nth-child(3) {
                        animation-delay: 0.3s;
                    }

                }
            }
        }
    }
`