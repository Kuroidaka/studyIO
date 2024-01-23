import styled from "styled-components";
import { Tv } from 'react-feather';
// import DOMPurify from "dompurify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import utils from '../../../utils';
import Img from '../../../assets/img'
import ImageCom from "../../../component/Image";
import { useEffect,  } from "react";

const BotMsg = (p) => {
    const { text, className } = p
    const { imgPlaceHolder } = Img

    const { checkIsImgLink } = utils



    const scrollToBottom = () => {
        // pageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
        const div = document.querySelector('.list-chat');
        div.scrollTop = div.scrollHeight - div.clientHeight + 1000;
    };

    useEffect(scrollToBottom, [text]);

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
            { 
                checkIsImgLink(text) ? (
                    <div className='bot-text'>
                        <ImageCom 
                            src={text}
                            imgPlaceHolder={imgPlaceHolder} 
                            // imgsize={
                            //     imgList.length === 1 ? 
                            //     '423px' :
                            //     imgList.length === 2 ?
                            //     '250px' :
                            //     '171px'
                            // }
                        />
                    </div>
                ) : (
                    <div className='bot-text'>
                        <ReactMarkdown
                            // eslint-disable-next-line react/no-children-prop
                            children={text}
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                    style={dracula} // theme
                                    // eslint-disable-next-line react/no-children-prop
                                    children={String(children).replace(/\n$/, "")}
                                    language={match[1]}
                                    {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                    {children}
                                    </code>
                                );
                                },
                            }}
                            />
                    </div>
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
                pre {
                    overflow-x: scroll;
                }
                a {
                    color: #00a5ff;
                    text-decoration: none;
                    font-weight: 500;
                }
                img {
                    width: 100%;
                    max-width: 350px;
                    margin: 10px 0;
                    /* cursor: pointer; */
                }
                p {
                    font-weight: 500;
                }
                ol,ul {
                    padding: 6px 25px;
                    li {
                        font-size: 15px;   /* Thay đổi kích thước của chữ StudyIO */
                        font-weight: 500;
                        margin: 10px 0;

                        a {
                            color: #00a5ff;
                            text-decoration: none;
                            font-weight: 500;
                        
                        }
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