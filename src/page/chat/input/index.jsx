import { useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import { parse } from 'best-effort-json-parser'


import '../style/index.scss'
import DocsUploaded from "./Docs";
import Input from './Input';
import conversationApi from '../../../api/conversation';
import ConversationContext from '../../../context/Conversation.context';
import FileContext from '../../../context/File.context';
import fileApi from '../../../api/file';
import utils from "../../../utils"

const InputBox = () => {

    const { updatedCon, updateConUser, selectedCon, setCurrentMsgList, currentMsgList } = useContext(ConversationContext);
    const { filesDocs, setFilesDocs, delFile, isLoadingFile, uploadFile } = useContext(FileContext);
    const [loadingFileList, setLoadingFileList] = useState([]);
    // file image for upload at the input box
    const [filesImages, setFilesImages] = useState(
    [
        // { id: 1, type: 'image', name: 'phong_canh.png' },
        // { id: 3, type: 'file', name: 'chinh_sach_moi.pdf' }
    ]
    )
    

    const { filesToBase64, hostImages, filesToBlobURLs } = utils

    const imageFile = {
        setFileImg: (e) => {
            const uploadedFiles = e.target.files;
            for (let i = 0; i < uploadedFiles.length; i++) {
                const file = uploadedFiles[i];
                setFilesImages(prevFiles => [...prevFiles, file]);
            }
        },
        handleProcess: async () => {
            // const formData = new FormData();
            // for (let i = 0; i < filesImages.length; i++) {
            //     const file = filesImages[i];
            //     formData.append("files", file);
            // }
        // // Log the formData entries for debugging
        //     for (let entry of formData.entries()) {
        //         console.log(entry);
        //     }
            // const { imgList } = await imageFile.sendToBE(formData)
            setFilesImages([])
            const listBase64 = await filesToBase64(filesImages)
            
            const imgList = await hostImages(listBase64)

            return imgList
        },
        sendToBE: async (formData) => {
            return fileApi.uploadFileImg(formData)
            .then((data) => {
                console.log("img list: ",data.data);
                setFilesImages([])
                return {
                    imgList: data.data.data
                }
            })
            .catch((error) => {
                console.error(error);
                throw error
            });
        }
    }

    // const handleUploadFileImg = async (event) => {
        
    //     const uploadedFiles = event.target.files;
    //     const formData = new FormData();
    //     for (let i = 0; i < uploadedFiles.length; i++) {
    //         const file = uploadedFiles[i];
    //         const newFile = { id: Date.now() + i, type: 'file', name: file.name };   
    //         formData.append("images", file);
    //         setFilesImages(prevFiles => [...prevFiles, newFile]);
    //     }
    //     const result = await uploadFileImg(formData)

    //     return result

    // };

    const handleUploadFileDocs = (event) => {
        const uploadedFiles = event.target.files;
        const formData = new FormData();
        const newListFile = []
        for (let i = 0; i < uploadedFiles.length; i++) {
            const file = uploadedFiles[i];
            const newFile = { id: Date.now() + i,size: file.size, name: file.name };   

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

    const handleSend = async (inputValue, enableSend) => {
  
        let blobImages = await filesToBlobURLs(filesImages)

        blobImages = blobImages.map(img => ({url: img, id: nanoid()}))
        // update current user msg 

        const newTempMsg = {
            "id": "temp-id",
            "createdAt": new Date().toISOString(),
            "updatedAt": new Date().toISOString(),
            "text": inputValue,
            "sender": "user",
            "senderID": "-1",
            "conversationId": selectedCon.id,
            "imgList": blobImages.length > 0 ? blobImages : [],
        }

        updateConUser({
            id: selectedCon.id,
            dayRef: selectedCon.dayRef,
            newMsgList: [newTempMsg],
        })

        // API FILE IMG
        let imgUrlList = []
        let newImgList = []
        if(filesImages.length > 0) {
            imgUrlList = await imageFile.handleProcess()

            if(imgUrlList) {
                // create new array to store image object, each object has id, url
                newImgList = imgUrlList.map((img) => {
                    const newFile = { url: img, id: nanoid() };   
                    return newFile
                })
            }
        }

        // API CHAT
        const data ={
            text: inputValue,
            sender: "user",
            conversationId: selectedCon.id || "",
            isAttachedFile: filesDocs.length > 0 ? true : false,
            imgFiles: newImgList.length > 0 ? newImgList : [],
            maxToken: 2000
        }

        const updateStreamText = ({text}) => {//update stream text
                   
            const newCurrentMsgList = [...currentMsgList, newTempMsg ]

            let updatedMsgList = [...newCurrentMsgList];

            // Find the index of the object you want to update
            let index = updatedMsgList.findIndex(msg => msg.id === 'temp-id-2');

            // If the object doesn't exist in the state, create it
            if (index === -1) {
                updatedMsgList.push({
                "id": "temp-id-2",
                "createdAt": new Date().toISOString(),
                "updatedAt": new Date().toISOString(),
                "text": text, // Join the chunk list into a string
                "sender": "bot",
                "senderID": "-2",
                "conversationId": selectedCon.id,
                });
            }
            // If the object does exist, update it
            else {
                // Update the 'text' key of the object
                updatedMsgList[index].text = text;
            }

            // Update the state
            setCurrentMsgList(updatedMsgList);
        }
        const updateFinalData = ({data}) => {//update final data from server
            updatedCon({ 
                id: selectedCon.id,
                dayRef: selectedCon.dayRef,
                newMsgList: data.bot,
                newCon: data.newConversation,
                isNewConversation: data.isNewConversation,
                userMsg: data.user
            })
            if(typeof enableSend === 'function') {
                enableSend()
            }
        }

        await conversationApi.createChatStream(
            data,
            {
                updateFinalData,//update final data from server
                updateStreamText,//update stream text
                enableSend //enable send button after send
            }
        )       

    };

    const docsProp = { filesDocs, handleUploadFileDocs, setFilesDocs, delFile, isLoadingFile, loadingFileList }
    const inputProp = { 
        filesImages,
        uploadFileImg: imageFile.setFileImg,
        setFilesImages,
        handleSend
    }

    return (
        <div className='Input'>            
            <DocsUploaded {...docsProp}/>
            <Input {...inputProp}/>
        </div>
    );
}
export default InputBox;