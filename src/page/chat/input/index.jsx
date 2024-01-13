import '../style/index.scss'
import { useContext, useEffect, useState } from 'react';
import DocsUploaded from "./Docs";
import Input from './Input';
import conversationApi from '../../../api/conversation';
import ConversationContext from '../../../context/Conversation.Context';
import FileContext from '../../../context/File.Context';

const InputBox = () => {

    const { updatedCon, selectedCon } = useContext(ConversationContext);
    const { filesDocs, setFilesDocs, delFile, isLoadingFile, uploadFile } = useContext(FileContext);
    const [loadingFileList, setLoadingFileList] = useState([]);
    // file image for upload at the input box
    const [filesImages, setFilesImages] = useState(
    [
        // { id: 1, type: 'image', name: 'phong_canh.png' },
        // { id: 3, type: 'file', name: 'chinh_sach_moi.pdf' }
    ]
    )

    const handleUploadFileImg = (event) => {
        
        const uploadedFiles = event.target.files;
        for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];
            const newFile = { id: Date.now() + i, type: 'file', name: file.name };   

            setFilesImages(prevFiles => [...prevFiles, newFile]);
            // if (uploadedFiles.length > 0) {
            //     setShowContent(true);
            // }
        }

    };
    const handleUploadFileDocs = (event) => {
        const uploadedFiles = event.target.files;
        const formData = new FormData();
        const newListFile = []
        for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];
            const newFile = { id: Date.now() + i,size: file.size, name: file.name };   
            console.log("file---", newFile)
            formData.append("files", file);
            newListFile.push(newFile)
            setFilesDocs(prevFiles => [...prevFiles, newFile])
            setLoadingFileList(prevFiles => [...prevFiles, newFile.name])
        }

        uploadFile(formData)
    };

    useEffect(() => {
        if(!isLoadingFile) {
            setLoadingFileList([])
        }
    }, [isLoadingFile]);

    const sendChat = (data) => {
        return conversationApi.createChat(data)
    }

    const handleSend = async (inputValue) => {
  
        // setFiles([]);
        // if (uploadedFiles.length > 0) {
        //     setShowContent(true);
        // }
        // if (updatedFiles.length === 0) {
        //     setShowContent(false);
        // }
        const data ={
            text: inputValue,
            sender: "user",
            conversationId: selectedCon.id || "",
            isAttachedFile: filesDocs.length > 0 ? true : false,
        }
        updatedCon({
            id:selectedCon.id,
            dayRef: selectedCon.dayRef,
            newMsg: {
                "id": "temp-id",
                "createdAt": new Date().toISOString(),
                "updatedAt": new Date().toISOString(),
                "text": inputValue,
                "sender": "user",
                "senderID": "-1",
                "conversationId": selectedCon.id
            },
        })

        // console.log(data)
        await sendChat(data)
        .then(res => {
            if(res.statusText === "OK"){
                console.log(res.data.data)
                updatedCon({
                    id: selectedCon.id,
                    dayRef: selectedCon.dayRef,
                    newMsg: res.data.data.bot,
                    newCon: res.data.data.newConversation,
                    isNewConversation: res.data.data.isNewConversation
                })
            }
        })

    };

    const docsProp = { filesDocs, handleUploadFileDocs, setFilesDocs, delFile, isLoadingFile, loadingFileList }
    const inputProp = { filesImages, handleUploadFileImg, setFilesImages, handleSend }

    return (
        <div className='Input'>            
            <DocsUploaded {...docsProp}/>
            <Input {...inputProp}/>
        </div>
    );
}
export default InputBox;