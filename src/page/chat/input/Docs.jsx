import { useState } from "react";
import {
    Upload, File2_2, Image2, Delete2, AttachFile
} from "../../../assets/Icons/index";
import Load from "../../../component/Load";

const DocsUploaded = (p) => {
    const { filesDocs, setFilesDocs, handleUploadFile, delFile, isLoadingFile } = p

    const [hoveredFile, setHoveredFile] = useState(null);
    const [selectFile, setSelectFile] = useState(null);

    const handleMouseEnter = (id) => {
        setHoveredFile(id);
    };

    const handleMouseLeave = () => {
        setHoveredFile(null);
    };


    const handleDeleteClick = (name) => {
        // Xoá file theo name
        setSelectFile(name);
        const callBack = () => {
            const updatedFiles = filesDocs.filter(file => file.name !== name);
            setFilesDocs(updatedFiles);
        }
        delFile(name, callBack)
    };

    return (
        <div className="File_uploaded">
        {filesDocs && filesDocs.length > 0 ? (
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
                    accept=".pdf,.docx,.pptx"
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
                    {
                    (isLoadingFile && selectFile === file.name) ? 
                    (
                        <span className="load_button">
                            <Load type="small"/>
                        </span>
                    ) : (
                        hoveredFile === file.id ? (
                        <span
                            className="delete_button"
                            onClick={() => handleDeleteClick(file.name)}
                        >
                            <Delete2 />
                        </span>
                        ) : (
                            <span>
                                <File2_2 />
                            </span>
                        ) 
                    )

  
                    }

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
                accept=".pdf,.docx,.pptx"
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
