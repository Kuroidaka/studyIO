import styled from 'styled-components';
import { Edit } from 'react-feather';
import InputBox from "./input/index";
import { motion } from "framer-motion";

const ChatPage = () => {
    

    return ( 
        <Container>
            <div className='chat-box'> 

                <motion.div 
                    className='title'
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}>
                    <motion.div className='Edit-icon'>
                        <Edit />
                    </motion.div>
                    <motion.h1>StudyIO</motion.h1>
                </motion.div>

                <BoxChat>
                    <motion.div 
                        className='start-screen'
                        initial={{ opacity: 0, fontSize: '12', x: 100 }}
                        animate={{ opacity: 1, fontSize: '30', x: 0 }}
                        transition={{ duration: 1 }}>
                        <p>What can I help you?</p>
                    </motion.div>

                    {/* <div className="conversation">
                        
                        <div className='chat-msg human-chat'>
                            <div className='icon'>
                                <div className='human-icon-wrapper'>
                                    <User className='human-icon'/>
                                </div>
                            </div>
                            <div className="chat-content">
                                <p className='chat-person'>{"You"}</p>
                                <div className='human-text'>
                                    <p>{"Cộng là gì"}</p>
                                </div>
                            </div>
                        </div>

                        <div className='chat-msg bot-chat'>
                            <div className='icon'>
                                <div className='bot-icon-wrapper'>
                                    <Tv className='bot-icon'/>
                                </div>
                            </div>
                            <div className="chat-content">
                                <p className='chat-person'>{"StudyIO"}</p>
                                <div className='bot-text'>
                                    <p>{'"Cộng" là một từ tiếng Việt có nhiều nghĩa khác nhau tùy vào ngữ cảnh sử dụng. Dưới đây là một số ý nghĩa phổ biến của từ "cộng":'}</p>
                                    <ol>
                                        <li>{'Toán học: Trong lĩnh vực toán học, "cộng" là một phép toán để tính tổng của hai hoặc nhiều số. Ví dụ: 2 + 3 = 5, trong đó "+" là ký hiệu của phép cộng.'}</li>
                                        <li>{'Chính trị: Trong ngữ cảnh chính trị, "cộng" có thể liên quan đến chủ nghĩa cộng sản, một hệ thống chính trị và kinh tế phổ biến trong nhiều quốc gia.'}</li>
                                        <li>{'Ngôn ngữ hàng ngày: Trong ngôn ngữ hàng ngày, "cộng" có thể được sử dụng để diễn đạt ý nghĩa của việc thêm vào, gộp lại, hoặc tăng thêm cái gì đó.'}</li>
                                    </ol>
                                    <p>{'Nếu bạn có ngữ cảnh cụ thể hoặc văn bản mà bạn đang thảo luận, tôi có thể cung cấp một giải thích chi tiết hơn.'}</p>
                                </div>
                            </div>
                        </div>   
                        <div className='chat-msg human-chat'>
                            <div className='icon'>
                                <div className='human-icon-wrapper'>
                                    <User className='human-icon'/>
                                </div>
                            </div>
                            <div className="chat-content">
                                <p className='chat-person'>{"You"}</p>
                                <div className='human-text'>
                                    <p>{"Cộng là gì"}</p>
                                </div>
                            </div>
                        </div>

                        <div className='chat-msg bot-chat'>
                            <div className='icon'>
                                <div className='bot-icon-wrapper'>
                                    <Tv className='bot-icon'/>
                                </div>
                            </div>
                            <div className="chat-content">
                                <p className='chat-person'>{"StudyIO"}</p>
                                <div className='bot-text'>
                                    <p>{'"Cộng" là một từ tiếng Việt có nhiều nghĩa khác nhau tùy vào ngữ cảnh sử dụng. Dưới đây là một số ý nghĩa phổ biến của từ "cộng":'}</p>
                                    <ol>
                                        <li>{'Toán học: Trong lĩnh vực toán học, "cộng" là một phép toán để tính tổng của hai hoặc nhiều số. Ví dụ: 2 + 3 = 5, trong đó "+" là ký hiệu của phép cộng.'}</li>
                                        <li>{'Chính trị: Trong ngữ cảnh chính trị, "cộng" có thể liên quan đến chủ nghĩa cộng sản, một hệ thống chính trị và kinh tế phổ biến trong nhiều quốc gia.'}</li>
                                        <li>{'Ngôn ngữ hàng ngày: Trong ngôn ngữ hàng ngày, "cộng" có thể được sử dụng để diễn đạt ý nghĩa của việc thêm vào, gộp lại, hoặc tăng thêm cái gì đó.'}</li>
                                    </ol>
                                    <p>{'Nếu bạn có ngữ cảnh cụ thể hoặc văn bản mà bạn đang thảo luận, tôi có thể cung cấp một giải thích chi tiết hơn.'}</p>
                                </div>
                            </div>
                        </div>   
                        <div className='chat-msg human-chat'>
                            <div className='icon'>
                                <div className='human-icon-wrapper'>
                                    <User className='human-icon'/>
                                </div>
                            </div>
                            <div className="chat-content">
                                <p className='chat-person'>{"You"}</p>
                                <div className='human-text'>
                                    <p>{"Cộng là gì"}</p>
                                </div>
                            </div>
                        </div>

                        <div className='chat-msg bot-chat'>
                            <div className='icon'>
                                <div className='bot-icon-wrapper'>
                                    <Tv className='bot-icon'/>
                                </div>
                            </div>
                            <div className="chat-content">
                                <p className='chat-person'>{"StudyIO"}</p>
                                <div className='bot-text'>
                                    <p>{'"Cộng" là một từ tiếng Việt có nhiều nghĩa khác nhau tùy vào ngữ cảnh sử dụng. Dưới đây là một số ý nghĩa phổ biến của từ "cộng":'}</p>
                                    <ol>
                                        <li>{'Toán học: Trong lĩnh vực toán học, "cộng" là một phép toán để tính tổng của hai hoặc nhiều số. Ví dụ: 2 + 3 = 5, trong đó "+" là ký hiệu của phép cộng.'}</li>
                                        <li>{'Chính trị: Trong ngữ cảnh chính trị, "cộng" có thể liên quan đến chủ nghĩa cộng sản, một hệ thống chính trị và kinh tế phổ biến trong nhiều quốc gia.'}</li>
                                        <li>{'Ngôn ngữ hàng ngày: Trong ngôn ngữ hàng ngày, "cộng" có thể được sử dụng để diễn đạt ý nghĩa của việc thêm vào, gộp lại, hoặc tăng thêm cái gì đó.'}</li>
                                    </ol>
                                    <p>{'Nếu bạn có ngữ cảnh cụ thể hoặc văn bản mà bạn đang thảo luận, tôi có thể cung cấp một giải thích chi tiết hơn.'}</p>
                                </div>
                            </div>
                        </div>   
                        <div className='chat-msg human-chat'>
                            <div className='icon'>
                                <div className='human-icon-wrapper'>
                                    <User className='human-icon'/>
                                </div>
                            </div>
                            <div className="chat-content">
                                <p className='chat-person'>{"You"}</p>
                                <div className='human-text'>
                                    <p>{"Cộng là gì"}</p>
                                </div>
                            </div>
                        </div>

                        <div className='chat-msg bot-chat'>
                            <div className='icon'>
                                <div className='bot-icon-wrapper'>
                                    <Tv className='bot-icon'/>
                                </div>
                            </div>
                            <div className="chat-content">
                                <p className='chat-person'>{"StudyIO"}</p>
                                <div className='bot-text'>
                                    <p>{'"Cộng" là một từ tiếng Việt có nhiều nghĩa khác nhau tùy vào ngữ cảnh sử dụng. Dưới đây là một số ý nghĩa phổ biến của từ "cộng":'}</p>
                                    <ol>
                                        <li>{'Toán học: Trong lĩnh vực toán học, "cộng" là một phép toán để tính tổng của hai hoặc nhiều số. Ví dụ: 2 + 3 = 5, trong đó "+" là ký hiệu của phép cộng.'}</li>
                                        <li>{'Chính trị: Trong ngữ cảnh chính trị, "cộng" có thể liên quan đến chủ nghĩa cộng sản, một hệ thống chính trị và kinh tế phổ biến trong nhiều quốc gia.'}</li>
                                        <li>{'Ngôn ngữ hàng ngày: Trong ngôn ngữ hàng ngày, "cộng" có thể được sử dụng để diễn đạt ý nghĩa của việc thêm vào, gộp lại, hoặc tăng thêm cái gì đó.'}</li>
                                    </ol>
                                    <p>{'Nếu bạn có ngữ cảnh cụ thể hoặc văn bản mà bạn đang thảo luận, tôi có thể cung cấp một giải thích chi tiết hơn.'}</p>
                                </div>
                            </div>
                        </div>   
                        <div className='chat-msg human-chat'>
                            <div className='icon'>
                                <div className='human-icon-wrapper'>
                                    <User className='human-icon'/>
                                </div>
                            </div>
                            <div className="chat-content">
                                <p className='chat-person'>{"You"}</p>
                                <div className='human-text'>
                                    <p>{"Cộng là gì"}</p>
                                </div>
                            </div>
                        </div>

                        <div className='chat-msg bot-chat'>
                            <div className='icon'>
                                <div className='bot-icon-wrapper'>
                                    <Tv className='bot-icon'/>
                                </div>
                            </div>
                            <div className="chat-content">
                                <p className='chat-person'>{"StudyIO"}</p>
                                <div className='bot-text'>
                                    <p>{'"Cộng" là một từ tiếng Việt có nhiều nghĩa khác nhau tùy vào ngữ cảnh sử dụng. Dưới đây là một số ý nghĩa phổ biến của từ "cộng":'}</p>
                                    <ol>
                                        <li>{'Toán học: Trong lĩnh vực toán học, "cộng" là một phép toán để tính tổng của hai hoặc nhiều số. Ví dụ: 2 + 3 = 5, trong đó "+" là ký hiệu của phép cộng.'}</li>
                                        <li>{'Chính trị: Trong ngữ cảnh chính trị, "cộng" có thể liên quan đến chủ nghĩa cộng sản, một hệ thống chính trị và kinh tế phổ biến trong nhiều quốc gia.'}</li>
                                        <li>{'Ngôn ngữ hàng ngày: Trong ngôn ngữ hàng ngày, "cộng" có thể được sử dụng để diễn đạt ý nghĩa của việc thêm vào, gộp lại, hoặc tăng thêm cái gì đó.'}</li>
                                    </ol>
                                    <p>{'Nếu bạn có ngữ cảnh cụ thể hoặc văn bản mà bạn đang thảo luận, tôi có thể cung cấp một giải thích chi tiết hơn.'}</p>
                                </div>
                            </div>
                        </div>  
                    </div> */}
                </BoxChat> 

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
            margin-left: 5px; /* Thay đổi khoảng cách giữa Edit và chữ StudyIO */
            font-size: 20px;   /* Thay đổi kích thước của chữ StudyIO */
            font-style: 'Montserrat';
            margin-top: 2px;
        }
    
        .Edit-icon {
            width: 35px;
            height: 35px;
            margin-left: 15px;
            margin-top: 10px;
        }
    }
    

`

const BoxChat = styled.div `
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
    .conversation {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        margin: 40px;
        height: 100%;
        width: 100%;
        max-width: 700px;
        overflow-y: scroll;
        overflow-x: hidden;
        scrollbar-width: none;
        -ms-overflow-style: none;
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
        /*human*/
        .human-chat {
            width: 100%;
            display: flex;

            .icon {
                display: flex;
                align-items: center;
                align-self: flex-start;
                .human-icon-wrapper {
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    width: 40px;
                    border-radius: 50%;
                    background-color: #00a5ff;
                    .human-icon {

                    }
                }
            }
            .chat-content{
                margin-left: 18px;
                p.chat-person {
                    font-size: 20px;   /* Thay đổi kích thước của chữ StudyIO */
                    font-weight: bold;
                }
                .human-text {

                    p {
                        font-size: 15px;   /* Thay đổi kích thước của chữ StudyIO */
                        font-weight: normal;
                        margin-top: 10px;
                    }
                }
            }
        }
        /*bot*/
        .bot-chat{
            width: 100%;
            display: flex;

            .icon {
                display: flex;
                align-items: center;
                align-self: flex-start;
                .bot-icon-wrapper {
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    width: 40px;
                    border-radius: 50%;
                    background-color: #007517c9;
                    .bot-icon {

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
                        font-weight: normal;
                        margin-top: 10px;
                    }

                    ol {
                        list-style: inside;
                        padding: 15px;
                        li {
                            font-size: 15px;   /* Thay đổi kích thước của chữ StudyIO */
                            font-weight: normal;
                            margin-top: 10px;
                        }

                    }
                }
            }
        }


    }
`
const InputContainer = styled.div`
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 25px;

`
