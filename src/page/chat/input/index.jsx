
import '../style/index.scss'
import { useContext, useState } from 'react';
import DocsUploaded from "./Docs";
import Input from './Input';
import conversationApi from '../../../api/conversation';
import ConversationContext from '../../../context/Conversation.Context';
const InputBox = () => {

    const { updatedCon, selectedCon, updateLastCon } = useContext(ConversationContext);

    // file docs for upload at the input box
    const [filesDocs, setFilesDocs] = useState([
        { id: 1, type: 'image', name: 'phong_canh.png' },
        { id: 2, type: 'file', name: 'tai_lieu.pdf' },
        { id: 3, type: 'file', name: 'chinh_sach_moi.pdf' }
    ]);

    // file image for upload at the input box
    const [filesImages, setFilesImages] = useState([
        { id: 1, type: 'image', name: 'phong_canh.png' },
        { id: 3, type: 'file', name: 'chinh_sach_moi.pdf' }
    ])

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
            conversationId: selectedCon.id || ""
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
                    newCon: res.data.data.newConversation
                })
            }
        })

    };

    const docsProp = { filesDocs, handleUploadFile, setFilesDocs }
    const inputProp = { filesImages, handleUploadFile, setFilesImages, handleSend }

    return (
        <div className='Input'>            
            <DocsUploaded {...docsProp}/>
            <Input {...inputProp}/>
        </div>
    );
}
export default InputBox;
