import {
    Upload, Send, File1, File2_2, Image, Image2, Delete, Delete2, AttachFile
} from "../../../assets/Icons/index";
import '../style/index.scss'
import { useState } from 'react';
const InputBox = () => {
    const [inputValue, setInputValue] = useState('');
    // const [showContent, setShowContent] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendButtonClick = () => {
        setInputValue('');
        // setFiles([]);
        // if (uploadedFiles.length > 0) {
        //     setShowContent(true);
        // }
        // if (updatedFiles.length === 0) {
        //     setShowContent(false);
        // }

    };
    const handleUploadFile = (event, fileType) => {
        
            const uploadedFiles = event.target.files;
            for (let i = 0; i < uploadedFiles.length; i++) {
                const file = uploadedFiles[i];
                const newFile = { id: Date.now() + i, type: 'file', name: file.name };
                fileType ==="docs" 
                    ? setFilesDocs(prevFiles => [...prevFiles, newFile])
                    : setFilesImages(prevFiles => [...prevFiles, newFile]);
            // if (uploadedFiles.length > 0) {
            //     setShowContent(true);
            // }
        }

    };
    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            setInputValue('');
        }
    };
    // const [files, setFiles] = useState([
    //     { id: 1, type: 'file', name: 'Tên file 1' },
    //     { id: 2, type: 'image', name: 'Tên file 2' }
    //     // Thêm nhiều phần tử khác nếu cần
    // ]);
    const [filesDocs, setFilesDocs] = useState([
        { id: 1, type: 'image', name: 'phong_canh.png' },
        { id: 2, type: 'file', name: 'tai_lieu.pdf' },
        { id: 3, type: 'file', name: 'chinh_sach_moi.pdf' }
        // Thêm nhiều phần tử khác nếu cần
    ]);

    // file image for upload at the input box
    const [filesImages, setFilesImages] = useState([
        { id: 1, type: 'image', name: 'phong_canh.png' },
        { id: 3, type: 'file', name: 'chinh_sach_moi.pdf' }
        // Thêm nhiều phần tử khác nếu cần
    ])

    const [hoveredFile, setHoveredFile] = useState(null);

    const handleMouseEnter = (id) => {
        setHoveredFile(id);
    };

    const handleMouseLeave = () => {
        setHoveredFile(null);
    };


    const handleDeleteClick = (id) => {
        // Xoá file theo id
        const updatedFiles = filesDocs.filter(file => file.id !== id);
        setFilesDocs(updatedFiles);
        // if (updatedFiles.length === 0) {
        //     setShowContent(false);
        // }
    };

    const handleDeleteImgFile = (id) => {
        const updatedFiles = filesImages.filter(file => file.id !== id);
        setFilesImages(updatedFiles);
    }
    return (
        <div className='Input'>
            <div className='File_uploaded'>
              {filesDocs.length > 0 
            ?   <div className='Content'>
                    <div className='Content_head'>
                        <div className='p1'>Files</div>
                        <div className='add_button'>
                            <label htmlFor="fileInput">
                                <AttachFile />
                                <div>Add</div>
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                accept=".pdf,.docx,.pptx,"
                                style={{ display: 'none' }}
                                onChange={(e) => handleUploadFile(e, "docs")}
                                multiple
                            />
                        </div>
                    </div>
                    <hr />
                    <div className='file_uploaded_area'>
                        {filesDocs.map(file => (
                            <div
                                className='file_uploaded_container'
                                key={file.id}
                                onMouseEnter={() => handleMouseEnter(file.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {
                                hoveredFile === file.id ?
                                (
                                    <span className='delete_button' onClick={() => handleDeleteClick(file.id)}>
                                        <Delete2 />
                                    </span>
                                ) : (
                                    file.type === 'image' ?
                                     <span><Image2 /></span> : 
                                     <span> <File2_2 /></span>
                                )
                                }

                                <p className='file_name'>{file.name}</p>
                            </div>
                        ))}
                    </div>
                    {/* <div className='file_uploaded_area'>
                        <div className='file_uploaded_container'>
                            <span className='delete_button'> <Delete2 /></span> <Image2 />&nbsp;
                            <p className="file_name">kasdfhi.png</p>
                        </div>
                        <div className='file_uploaded_container'>
                            <span className='delete_button'> <Delete2 /></span> <File2_2 />&nbsp;
                            <p className="file_name">kadhafsohsddfhi.pdf</p>
                        </div>
                        <div className='file_uploaded_container'>
                            <span className='delete_button'> <Delete2 /></span> <File2_2 />&nbsp;
                            <p className="file_name">kadhafsohsddfhi.pdf</p>
                        </div>
                    </div> */}

                </div>
            :   <div id="Icon_Upload">
                    <label htmlFor="fileInput">
                        <Upload />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={(e) => handleUploadFile(e, "docs")}
                        multiple
                    />
                </div>}
            </div>
            

            <div className='Input_content'>
                <div className='File_area'>
                    {filesImages.map(file => (
                        <div className="file_container" key={file.id}>
                            <div className="file_info">
                                {file.type === 'file' ? <File1 /> : <Image />}
                                <p className="file_name">{file.name}</p>
                            </div>
                            <div id='Delete_icon' onClick={() => handleDeleteImgFile(file.id)}>
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
                <div className='Input_area'>
                    <label className="attach-btn-wrapper" htmlFor="img_file-Input">
                        <AttachFile />
                            <input
                                type="file"
                                id="img_file-Input"
                                accept=".jpg,.png,.jpeg,.webp,.heic"
                                style={{ display: 'none' }}
                                onChange={(e) => handleUploadFile(e, "img")}
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
                    <span id='send_button' onClick={handleSendButtonClick}><Send /></span>
                </div>
            </div>
        </div>
    );
}
export default InputBox;
