import { useState } from "react";
import {
    Send, File1, Image, Delete, AttachFile
} from "../../../assets/Icons/index";
import { motion } from "framer-motion";

const Input = (p) => {
    const { filesImages, handleUploadFileImg, setFilesImages, handleSend } = p

    const [inputValue, setInputValue] = useState('');
    // const [showContent, setShowContent] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendButtonClick = () => {
        setInputValue('');
        handleSend(inputValue)
        // setFiles([]);
        // if (uploadedFiles.length > 0) {
        //     setShowContent(true);
        // }
        // if (updatedFiles.length === 0) {
        //     setShowContent(false);
        // }

    };

    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendButtonClick()
        }
    };

    const handleDeleteImgFile = (id) => {
        const updatedFiles = filesImages.filter(file => file.id !== id);
        setFilesImages(updatedFiles);
    }

    return (
        <div className="Input_content">
        <div className="File_area">
            {filesImages.map((file) => (
            <div className="file_container" key={file.id}>
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
        {/* <div className='File_area'>

            <div className="file_container">
                <div className="file_info">
                    <File1 />
                    <p className="file_name">Tên file</p>
                </div>
                <div id='Delete_icon'>
                    <Delete />
                </div>
            </div>
            <div className="file_container">
                <div className="file_info">
                    <Image />
                    <p className="file_name">Tên file</p>
                </div>
                <div id='Delete_icon'>
                    <Delete />
                </div>
            </div>
        </div> */}
        <div className="Input_area">
            <label className="attach-btn-wrapper" htmlFor="img_file-Input"
              
            >
                <motion.span whileHover={{ y: -3 }} ><AttachFile /></motion.span>

            <input
                type="file"
                id="img_file-Input"
                accept=".jpg,.png,.jpeg,.webp,.heic"
                style={{ display: 'none' }}
                onChange={(e) => handleUploadFileImg(e)}
                multiple
            />
            </label>

            <input
            type="text"
            placeholder="Input your prompt..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleEnterKeyPress}
            />
            <span id="send_button" onClick={handleSendButtonClick}>
            <Send />
            </span>
        </div>
        </div>
    )
}

export default Input
