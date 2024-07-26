import axiosClient from "../axiosClient";

const camApi = {

    getConversation: async () => {
        const url = `/studyio/cam/get`;
        return axiosClient.get(url)
    },
    storeConversation: async (data) => {
        const { prompt } = data

        const url = `/studyio/cam/store`;
        return axiosClient.post(url, { prompt })
    },
    deleteCamChatStream: async () => {
        const url = `/studyio/cam/delete`;
        return axiosClient.post(url)
    }
}

export default camApi