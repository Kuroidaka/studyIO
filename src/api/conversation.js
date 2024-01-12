import axiosClient from "./axiosClient";

const conversationApi = {

    getConversation: async () => {
        const url = `/conversation/get?from=StudyIO`;
        return axiosClient.get(url)
    },
    createChat: async ({text, sender, conversationId}) => {
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
                maxToken: 2000
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