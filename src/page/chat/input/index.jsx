import {
    Upload, Send, File1, File2_2, Image, Image2, Delete, Delete2, AttachFile
} from "../../../layout/component/Icons/index";
import '../style/index.scss'

const InputBox = () => {
    return (
        <div className='Input'>
            <div className='File_uploaded'>
                <div className='Content'>
                    <div className='Content_head'>
                        <div className='p1'>Files</div>
                        <div className='add_button'>
                            <AttachFile />Add
                        </div>
                    </div>
                    <hr />
                    <div className='file_uploaded_area'>
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
                    </div>

                </div>
                <div id="Icon_Upload">
                    <Upload />
                </div>
            </div>

            <div className='Input_content'>
                <div className='File_area'>
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
                </div>
                <div className='Input_area'>
                    <input type="text" placeholder="Input your prompt..." />
                    <span id='send_button'><Send /></span>
                </div>
            </div>
        </div>
    );
}
export default InputBox;
