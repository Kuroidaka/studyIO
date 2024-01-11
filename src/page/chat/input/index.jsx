import React from "react";
import {
    Upload, Send, File1, File2_2, Image, Image2, Delete, Delete2, AttachFile
} from "../../../layout/component/Icons/index";
const InputBox = () => {
    return (
        <div class='Input'>
            <div class='File_uploaded'>
                <div class='Content'>
                    <div class='Content_head'>
                        <div class='p1'>Files</div>
                        <div class='add_button'>
                            <AttachFile />Add
                        </div>
                    </div>
                    <hr />
                    <div class='file_uploaded_area'>
                        <div class='file_uploaded_container'>
                            <span class='delete_button'> <Delete2 /></span> <Image2 />&nbsp;
                            <p class="file_name">kasdfhi.png</p>
                        </div>
                        <div class='file_uploaded_container'>
                            <span class='delete_button'> <Delete2 /></span> <File2_2 />&nbsp;
                            <p class="file_name">kadhafsohsddfhi.pdf</p>
                        </div>
                        <div class='file_uploaded_container'>
                            <span class='delete_button'> <Delete2 /></span> <File2_2 />&nbsp;
                            <p class="file_name">kadhafsohsddfhi.pdf</p>
                        </div>
                    </div>

                </div>
                <div id="Icon_Upload">
                    <Upload />
                </div>
            </div>

            <div class='Input_content'>
                <div class='File_area'>
                    <div class="file_container">
                        <div class="file_info">
                            <File1 />
                            <p class="file_name">Tên file</p>
                        </div>
                        <div id='Delete_icon'>
                            <Delete />
                        </div>
                    </div>
                    <div class="file_container">
                        <div class="file_info">
                            <Image />
                            <p class="file_name">Tên file</p>
                        </div>
                        <div id='Delete_icon'>
                            <Delete />
                        </div>
                    </div>
                </div>
                <div class='Input_area'>
                    <input type="text" placeholder="Input your prompt..." />
                    <span id='send_button'><Send /></span>
                </div>
            </div>
        </div>
    );
}
export default InputBox;
