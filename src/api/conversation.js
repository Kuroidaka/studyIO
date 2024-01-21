import axiosClient from "./axiosClient";
import utils from "../utils";
import { parse } from 'best-effort-json-parser'

const { isObject } = utils;
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
    createChatStream: async ({text, sender, conversationId, isAttachedFile, imgFiles}, updateWholeChatData, updateCurrentMsgList, enableSend) => {

        const data = {
            conversationId: conversationId,
            from: "StudyIO",
            text: text,
            sender: sender,
            senderID: "-1",
            maxToken: 2000,
            isAttachedFile: isAttachedFile,
            imgFiles: imgFiles
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
                console.log("Received value", value)
                const parsedValue = value.split("__FIN__")[1] ? JSON.parse(value.split("__FIN__")[1]) : JSON.parse(value)

                if(typeof parsedValue === 'object'){
                    if(
                        Object.prototype.hasOwnProperty.call(parsedValue, 'data') && 
                        Object.prototype.hasOwnProperty.call(parsedValue, 'func') 
                    ) {
                        updateWholeChatData && updateWholeChatData(parsedValue)
                    } else if(
                        Object.prototype.hasOwnProperty.call(parsedValue, 'name')  &&
                        Object.prototype.hasOwnProperty.call(parsedValue, 'arguments')  
                    ) {
                        console.log("Received a function object: ", parsedValue)
                    } else {
                        console.log("Received an unknown object: ", parsedValue)
                    }
                } else if(typeof parsedValue === 'string'){ 
                    
                    // contentFull += value
                    // updateCurrentMsgList && updateCurrentMsgList({text: contentFull})
                }
            } catch (error) {
                console.log("Received string: ", value)
                contentFull += value
                updateCurrentMsgList && updateCurrentMsgList({text: contentFull})
            }

            // if(typeof callback === 'function') callback()
            // setResponse((prev) => prev + value)  
          }
    }
}

export default conversationApi