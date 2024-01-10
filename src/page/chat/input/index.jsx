import React from "react";
import {
    Upload, Send, File1, File2, Image, Delete, AttachFile
} from "../../../layout/component/Icons/index";
const InputBox = () => {
    return (
        <div class='Input'>
            <div class='File_uploaded'>
                <div class='Content'>
                    <p>Content</p>

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
                    <Send />
                </div>
            </div>
        </div>
    );
}
export default InputBox;