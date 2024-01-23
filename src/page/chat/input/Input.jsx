import { useState, useEffect, useContext } from "react";
import {
    Send, File1, Image, Delete, AttachFile
} from "../../../assets/Icons/index";
import { motion } from "framer-motion";
import ConversationContext from "../../../context/Conversation.context";
import Typing from "../../../component/Typing";

const Input = (p) => {
    const { filesImages, uploadFileImg, setFilesImages, handleSend } = p;
    const { isWaiting, setIsWaiting, selectedCon } = useContext(ConversationContext);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendButtonClick = () => {
        if(inputValue !== '') {
            if (!isWaiting.isWait) {
                setIsWaiting({
                    isWait:true, 
                    conId: selectedCon.id
                });
                handleSend(inputValue, () => {
                    setIsWaiting({
                        isWait:false,
                        conId: ""
                    });
                });
                setInputValue('');
            }
        }
        // setFiles([]);
        // if (uploadedFiles.length > 0) {
        //     setShowContent(true);
        // }
        // if (updatedFiles.length === 0) {
        //     setShowContent(false);
        // }


    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('myTextarea').style.height = 'auto';
            handleSendButtonClick();
        } else if (e.key === 'Enter' && e.shiftKey) {
            setInputValue((prevValue) => prevValue); 
        }
    };

    const handleDeleteImgFile = (id) => {
        const updatedFiles = filesImages.filter(file => file.id !== id);
        setFilesImages(updatedFiles);
    };

    useEffect(() => {
        document.getElementById('myTextarea').addEventListener('input', autoResize);

        function autoResize() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }
    }, []);

    return (
        <div className="Input_content">
            <div className="File_area">
                {filesImages.map((file, idx) => (
                    <div className="file_container" key={idx}>
                        <div className="file_info">
                            {file.type === 'file' ? <File1 /> : <Image />}
                            <p className="file_name">{file.name}</p>
                        </div>
                        <div id="Delete_icon" onClick={() => handleDeleteImgFile(file.id)}>
                            <Delete />
                        </div>
                    </div>
                ))}
            </div>
            <div className="Input_area">
                <label className="attach-btn-wrapper" htmlFor="img_file-Input">
                    <motion.span whileHover={{ y: -3 }} ><AttachFile /></motion.span>
                    <input
                        type="file"
                        id="img_file-Input"
                        accept=".jpg,.png,.jpeg,.webp,.heic"
                        style={{ display: 'none' }}
                        onChange={(e) => uploadFileImg(e)}
                        multiple
                    />
                </label>

                <textarea className="Input_text"
                    rows="1"
                    id="myTextarea"
                    placeholder="Input your prompt..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleEnterKeyPress}
                />
                {(isWaiting.isWait && selectedCon.id === isWaiting.conId)  ? (
                    <></>
                ) : (
                    <span id="send_button" onClick={handleSendButtonClick}>
                        <Send />
                    </span>
                )
                }

            </div>

            
            {(isWaiting.isWait && isWaiting.conId === selectedCon.id) 
            && 
            <div className="typing">
                <Typing who="Bot" text="is typing..." />
            </div>
            }
        </div>
    );
}

export default Input;
