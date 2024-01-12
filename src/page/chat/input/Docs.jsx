import { useState } from "react";
import {
    Upload, File2_2, Image2, Delete2, AttachFile
} from "../../../assets/Icons/index";

const DocsUploaded = (p) => {
    const { filesDocs, setFilesDocs, handleUploadFile } = p

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

    return (
        <div className="File_uploaded">
        {filesDocs.length > 0 ? (
            <div className="Content">
            <div className="Content_head">
                <div className="p1">Files</div>
                <div className="add_button">
                <label htmlFor="fileInput">
                    <AttachFile />
                    <div>Add</div>
                </label>
                <input
                    type="file"
                    id="fileInput"
                    accept=".pdf,.docx,.pptx,"
                    style={{ display: 'none' }}
                    onChange={(e) => handleUploadFile(e, 'docs')}
                    multiple
                />
                </div>
            </div>
            <hr />
            <div className="file_uploaded_area">
                {filesDocs.map((file) => (
                <div
                    className="file_uploaded_container"
                    key={file.id}
                    onMouseEnter={() => handleMouseEnter(file.id)}
                    onMouseLeave={handleMouseLeave}
                >
                    {hoveredFile === file.id ? (
                    <span
                        className="delete_button"
                        onClick={() => handleDeleteClick(file.id)}
                    >
                        <Delete2 />
                    </span>
                    ) : file.type === 'image' ? (
                    <span>
                        <Image2 />
                    </span>
                    ) : (
                    <span>
                        {' '}
                        <File2_2 />
                    </span>
                    )}

                    <p className="file_name">{file.name}</p>
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
        ) : (
            <div id="Icon_Upload">
            <label htmlFor="fileInput">
                <Upload />
            </label>
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={(e) => handleUploadFile(e, 'docs')}
                multiple
            />
            </div>
        )}
        </div>
    )
}

export default DocsUploaded
