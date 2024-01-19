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
    }
}

export default conversationApi