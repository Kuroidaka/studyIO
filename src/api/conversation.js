import axiosClient from "./axiosClient";

const conversationApi = {

    getConversation: async () => {
        const url = '/conversation/get';

        return axiosClient.get(url)
    }
}

export default conversationApi