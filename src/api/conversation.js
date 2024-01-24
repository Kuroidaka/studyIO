import axiosClient from "./axiosClient";

const conversationApi = {

    getConversation: async () => {
        const url = `/conversation/get?from=StudyIO`;
        return axiosClient.get(url)
    },
    createConversation: async () => {
        const url = `/conversation/create/new`;
        return axiosClient.post(url, { from: "StudyIO" })
    },
    
    createChat: async ({text, sender, conversationId, isAttachedFile, imgFiles}) => {
        const url = '/studyio/create';

        const dataBody = {
            data: {
                conversationId: conversationId,
                from: "StudyIO",
                messages: {
                    text: text,
                    sender: sender,
                    senderID: "-1"
                },
                maxToken: 2000,
                isAttachedFile: isAttachedFile,
                imgFiles: imgFiles
            }

        }
        return axiosClient.post(url, dataBody)
    },
    delChat: async ({ conversationId }) => {
        const url = '/conversation/delete';

        const dataBody = {
            data: {
                conversationId: conversationId,
                from: "StudyIO"
            }

        }
        return axiosClient.post(url, dataBody)
    },
    speechToText: async ({formData}) => {

        const response = await axiosClient.post(
            'https://api.openai.com/v1/audio/transcriptions', formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
            }
            }
        );
        
        return {text: response.data.text};

    },
    createChatStream: async (
        { text, sender, conversationId, isAttachedFile, imgFiles, isTalking=false, maxToken=2000 },
        { updateFinalData, updateStreamText, enableSend, updateStreamFunc }
    ) => {

        const data = {
            conversationId: conversationId,
            from: "StudyIO",
            text: text,
            sender: sender,
            senderID: "-1",
            maxToken: maxToken,
            isAttachedFile: isAttachedFile,
            imgFiles: JSON.stringify(imgFiles),
            isTalking: isTalking,
            stream: true
        }

        const url = `http://localhost:8001/api/v1/studyio/create`;
        const params = new URLSearchParams(data).toString();

        const response = await fetch(
            `${url}?${params}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'text/event-stream',
              }
            }
        )
        const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader()
        let contentFull = ''
        // eslint-disable-next-line no-constant-condition
        while (true) {
        const { value, done } = await reader.read()
        if (done) {
            if(typeof enableSend === 'function') {
                enableSend()
            }
            break
        }
        try {
            // console.log("Received value", value)
            const parsedValue = value.split("__FIN__")[1] ? JSON.parse(value.split("__FIN__")[1]) : JSON.parse(value)

            if(typeof parsedValue === 'object'){
                if(
                    Object.prototype.hasOwnProperty.call(parsedValue, 'data') || 
                    Object.prototype.hasOwnProperty.call(parsedValue, 'func') 
                ) {
                    updateFinalData && updateFinalData(parsedValue)
                } else if(
                    Object.prototype.hasOwnProperty.call(parsedValue, 'name')  &&
                    Object.prototype.hasOwnProperty.call(parsedValue, 'arguments')  
                ) {
                    console.log("Received a function object: ", parsedValue)
                    updateStreamFunc && updateStreamFunc({func: parsedValue})
                } else if(
                    Object.prototype.hasOwnProperty.call(parsedValue, 'finishReason') &&
                    parsedValue.finishReason === "length"
                ) {
                    contentFull += "\nDo you want to continue generating?"
                    updateStreamText && updateStreamText({text: contentFull})
                } else {
                    console.log("Received an unknown object: ", parsedValue)
                }
            } else if(typeof parsedValue === 'string'){ 
                
                // contentFull += value
                // updateStreamText && updateStreamText({text: contentFull})
            }
        } catch (error) {
            // console.log("Received string: ", value)
            contentFull += value
            updateStreamText && updateStreamText({text: contentFull})
        }

        // if(typeof callback === 'function') callback()
        // setResponse((prev) => prev + value)  
        }
        return { content: contentFull }
    },
    createCamChatStream: async (
        { text, sender, imgFiles, maxToken },
        { updateStreamText, turnOffWait }
    ) => {

        const data = {
            text: text,
            sender: sender,
            senderID: "-1",
            maxToken: maxToken,
            imgFiles: JSON.stringify(imgFiles)
        }

        const url = `http://localhost:8001/api/v1/studyio/cam`;
        const params = new URLSearchParams(data).toString();

        const response = await fetch(
            `${url}?${params}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'text/event-stream',
              }
            }
        )
        const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader()
        let contentFull = ''
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const { value, done } = await reader.read()
            if (done) {
                turnOffWait()
                break
            }
            console.log("Received value", value)
            const isEnded = value.includes("__CAM_FIN__")

            if(isEnded){
                turnOffWait()
                contentFull += value.split("__CAM_FIN__")[0]
                updateStreamText && updateStreamText({text: value.split("__CAM_FIN__")[0]})
            } else { 
                contentFull += value
                updateStreamText && updateStreamText({text: value})
            }
        }
        return { content: contentFull }
    },
    deleteCamChatStream: async () => {
        const url = `/studyio/cam/delete`;
        return axiosClient.post(url)
    }
}

export default conversationApi