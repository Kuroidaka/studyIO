import {
    Upload, Send, File1, Image, Delete,
} from "../../../layout/component/Icons/index";
import '../style/index.scss'

const InputBox = () => {
    return (
        <div className='Input'>
            <div className='File_uploaded'>
                <div className='Content'>
                    <p>Content</p>

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
                    <Send />
                </div>
            </div>
        </div>
    );
}
export default InputBox;