import { useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

import '../style/index.scss'
import DocsUploaded from "./Docs";
import Input from './Input';
import conversationApi from '../../../api/conversation';
import ConversationContext from '../../../context/Conversation.Context';
import FileContext from '../../../context/File.Context';
import fileApi from '../../../api/file';
import utils from "../../../utils"

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

    const sendChat = (data) => {
        return conversationApi.createChat(data)
    }

    const handleSend = async (inputValue, enableSend) => {
  

        let blobImages = await filesToBlobURLs(filesImages)

        blobImages = blobImages.map(img => ({url: img, id: nanoid()}))
        // update current user msg 
        await updatedCon({
            id: selectedCon.id,
            dayRef: selectedCon.dayRef,
            newMsgList: [{
                "id": "temp-id",
                "createdAt": new Date().toISOString(),
                "updatedAt": new Date().toISOString(),
                "text": inputValue,
                "sender": "user",
                "senderID": "-1",
                "conversationId": selectedCon.id,
                "imgList": blobImages.length > 0 ? blobImages : [],
            }],
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
        }
        await sendChat(data)
        .then(res => {
            if(res.statusText === "OK"){
                console.log(res.data.data)
                // update Bot msg
                updatedCon({
                    id: selectedCon.id,
                    dayRef: selectedCon.dayRef,
                    newMsgList: res.data.data.bot,
                    newCon: res.data.data.newConversation,
                    isNewConversation: res.data.data.isNewConversation
                })
                if(typeof enableSend === 'function') {
                     enableSend()
                }
            }
        })

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