import './chat.css';
import { Edit, User , Tv, ChevronLeft, ChevronRight} from 'react-feather';
import React, { useState } from 'react';


const ChatPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isChevronRight, setIsChevronRight] = useState(true);

    const handleChevronClick = () => {
    setIsChevronRight(prevState => !prevState);
    setSidebarOpen(prevState => !prevState)
    };

    return ( 
        <div className='chat-page'> 
            <div className='title'>
                <Edit className='Edit-icon' />
                <h1>StudyIO</h1>
            </div>
            <div className='human-chat'>
                <div className='human-icon'>
                    <User className='User-icon'/>
                    <p>{"You"}</p>
                </div>
                <div className='human-text'>
                    <p>{"Cộng là gì"}</p>
                </div>
            </div>

            <div className='bot-chat'>
                <div className='bot-icon'>
                    <Tv className='bot-icon'/>
                    <p>{"StudyIO"}</p>
                </div>
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

            <div className='chevron' onClick={handleChevronClick}>
                {isChevronRight ? <ChevronRight className='chevron-icon' /> : <ChevronLeft className='chevron-icon' />}
            </div>
        </div>
     );
}
 
export default ChatPage;