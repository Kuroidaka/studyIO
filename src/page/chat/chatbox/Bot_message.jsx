import styled from "styled-components";
import { Tv } from 'react-feather';
import DOMPurify from "dompurify";

import utils from '../../../utils';
import { useEffect, useRef } from "react";

const BotMsg = (p) => {
    const { text } = p

    const { convertStringToHtml } = utils
    const sanitizedHTML = DOMPurify.sanitize(convertStringToHtml(text));

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [text]);

    return ( 
    <Container className='chat-msg bot-chat' ref={messagesEndRef}>
        <div className='icon'>
            <div className='bot-icon-wrapper'>
                <Tv className='bot-icon'/>
            </div>
        </div>
        <div className="chat-content">
            <p className='chat-person'>{"StudyIO"}</p>
            <div className='bot-text' dangerouslySetInnerHTML={{ __html: sanitizedHTML }} >
                {/* <p>{'"Cộng" là một từ tiếng Việt có nhiều nghĩa khác nhau tùy vào ngữ cảnh sử dụng. Dưới đây là một số ý nghĩa phổ biến của từ "cộng":'}</p>
                <ol>
                    <li>{'Toán học: Trong lĩnh vực toán học, "cộng" là một phép toán để tính tổng của hai hoặc nhiều số. Ví dụ: 2 + 3 = 5, trong đó "+" là ký hiệu của phép cộng.'}</li>
                    <li>{'Chính trị: Trong ngữ cảnh chính trị, "cộng" có thể liên quan đến chủ nghĩa cộng sản, một hệ thống chính trị và kinh tế phổ biến trong nhiều quốc gia.'}</li>
                    <li>{'Ngôn ngữ hàng ngày: Trong ngôn ngữ hàng ngày, "cộng" có thể được sử dụng để diễn đạt ý nghĩa của việc thêm vào, gộp lại, hoặc tăng thêm cái gì đó.'}</li>
                </ol>
                <p>{'Nếu bạn có ngữ cảnh cụ thể hoặc văn bản mà bạn đang thảo luận, tôi có thể cung cấp một giải thích chi tiết hơn.'}</p> */}
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
        margin-left: 18px;
        p.chat-person {
            font-size: 20px;   /* Thay đổi kích thước của chữ StudyIO */
            font-weight: bold;
        }
        .bot-text {
            p {
                font-size: 15px;   /* Thay đổi kích thước của chữ StudyIO */
                font-weight: 500;
                margin-top: 10px;
            }

            ol {
                list-style: inside;
                padding: 6px 25px;
                li {
                    font-size: 15px;   /* Thay đổi kích thước của chữ StudyIO */
                    font-weight: 500;
                    margin-top: 10px;
                }

            }
        }
    }
`