import styled from "styled-components";
import { User } from 'react-feather';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import Img from '../../../assets/img'
import ImageCom from "../../../component/Image";
import { useEffect } from "react";

const UserMsg = (p) => {

    const { text, imgList=[] } = p;
    const { imgPlaceHolder } = Img

    const scrollToBottom = () => {
        // pageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
        const div = document.querySelector('.list-chat');
        div.scrollTop = div.scrollHeight - div.clientHeight + 1000;
    };
    useEffect(scrollToBottom, [text]);

    return ( 
    <Container className='chat-msg human-chat'>
        <div className='icon'>
            <div className='human-icon-wrapper'>
                <User className='human-icon'/>
            </div>
        </div>
        <div className="chat-content">
            <p className='chat-person'>{"You"}</p>
            <div className="human-text-wrapper">
                <div className='human-text'>
                   {imgList.length > 0 && 
                   <div className="img_list-wrapper">
                        {imgList.map((img, index) => (
                            <div className="img-wrapper" key={index}>
                                <ImageCom 
                                    src={img.url}
                                    imgPlaceHolder={imgPlaceHolder}
                                    imgsize={
                                        imgList.length === 1 ? 
                                        '423px' :
                                        imgList.length === 2 ?
                                        '250px' :
                                        '171px'
                                    }
                                    />
                            </div>
                        ))}

                    </div>}
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
            padding: 10px;
            border-radius: 10px;
            background: #484856;
            display: flex;
            align-items: center;
            justify-content: center;
            
            .human-text {
                overflow-x: scroll;
                width:100%;
                direction: ltr;
                .img_list-wrapper {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-items: center;
                    gap: 5px;
                    margin: 10px 0;
                    min-width: 150px;
                    .img-wrapper {
                        /* max-width: 400px; */
                        /* img {
                            border-radius: 10px;
                            cursor: pointer;
                            width: 100%;
                        } */
                    }
                
                }
                pre {
                    overflow-x: scroll;
                }
                img {
                    width: 100%;
                    max-width: 350px;
                    margin: 10px 0;
                    /* cursor: pointer; */
                }
                a {
                    color: #00a5ff;
                    text-decoration: none;
                    font-weight: 500;
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
`

