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
}

export default conversationApi