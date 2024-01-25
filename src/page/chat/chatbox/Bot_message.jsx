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
import IconCustom from "../../../assets/Icons/svg";

const functionIcon = {
    "create_reminder": {
        "icon": "⏱️",
        "process": "Reminder Creating",
        "done": "Reminder Created"
    },
    "get_current_weather": {
        "icon": "☁️",
        "process": "Weather Getting",
        "done": "Weather"
    },
    "browse": {
        "icon": "🔍",
        "process": "Google Browsing",
        "done": "Google Browsed"
    },
    "ask_about_document":{
        "icon": "📁",
        "process": "Document Finding",
        "done": "Document Found"
    },
    "database_chat":{
        "icon": "🛢️",
        "process": "Database Chatting",
        "done": "Document Found"            
    },
    "generate_image":{
        "icon": "🖼️",
        "process": "Image Generating",
        "done": "Image Generated"            
    },
    "follow_up_image_in_chat":{
        "icon": "👁️",
        "process": "Looking up Image",
        "done": "Image answered"            
    },
    "scrape_website":{
        "icon": "🔗",
        "process": "Website Scraping",
        "done": "Website Scraped"            
    },

}

const BotMsg = (p) => {
    const { text, className, functionList } = p
    const { imgPlaceHolder } = Img

    const { checkIsImgLink } = utils


    

    const scrollToBottom = () => {
        // pageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
        const div = document.querySelector('.list-chat');
        div.scrollTop = div.scrollHeight - div.clientHeight + 1000;
    };

    useEffect(scrollToBottom, [text, functionList]);

    const convertDataFuncList = (data) => {
        // check if the data is a string then json parse it else return the data
        if (typeof data === 'string' || data instanceof String) {
            return JSON.parse(data)
        } else {
            return data
        } 
    }

    return ( 
    <Container className={`chat-msg bot-chat ${className}`} >
        <div className='icon'>
            <div className='bot-icon-wrapper'>
                <Tv className='bot-icon'/>
            </div>
        </div>
        <div className="chat-content">
            <p className='chat-person'>{"StudyIO"}</p>
            {functionList && convertDataFuncList(functionList).length > 0 && 
                convertDataFuncList(functionList).map((agent, index) => (
                <FunctionAgent key={index} agent={agent}/>
            ))
            }
           {text &&
            <div className="bot-text-wrapper">
            {
                checkIsImgLink(text) ? (
                    <div className='bot-text'>
                        <ImageCom 
                            src={text}
                            imgPlaceHolder={imgPlaceHolder} 
                            imgsize={'423px' }
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
            </div>}

        </div>
    </Container>   
     );
}
 
const FunctionAgent = (p) => {
    const { agent } = p
    return (
        <div className="bot-text-wrapper function-agent">
            <div className='bot-text'>
                <div className="function">
                    <div className="function-title">
                        <IconCustom.task></IconCustom.task>
                        Task Added:
                    </div>
                    <div className="function-name">
                        <div className="icon">{functionIcon[agent].icon}</div>
                        <div className="text">{functionIcon[agent].done}</div>
                    </div>
                </div>        
            </div>
        </div>
    )
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
            background: #666666;
            display: flex;
            align-items: center;
            justify-content: center;
            .bot-text {
                overflow-x: scroll;
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

            & + .bot-text-wrapper  {
                margin-top: 10px;
            
            }

            &.function-agent {
                width: fit-content;
                background-color: #434343;
                padding: 5px 10px;
                .function {
                    display: flex;
                    .function-title {
                        font-weight: 800;
                        gap: 6px;
                        display: flex;
                        align-items: center;
                        font-size: 13px;

                        svg {
                            &.task {
                                rotate: -45deg;
                            }
                        }
                    }

                    .function-name {
                        display: flex;
                        align-items: center;
                        margin-left: 10px;
                        font-weight: 800;
                        .icon {
                            font-size: 13px;
                            margin-right: 5px;
                        }
                        .text {
                            font-size: 13px;
                        
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