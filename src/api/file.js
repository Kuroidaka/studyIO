import axiosClient from "./axiosClient";

const fileApi = {

    getFile: async () => {
        const url = `/openai/get-file`;
        return axiosClient.get(url)
    },
    delFile: async (fileName) => {
        const url = `/openai/del-file`;

        const dataBody = {
            data: {
                name: fileName
            }
        }

        return axiosClient.post(url, dataBody)
    },
    uploadFile: async (listFile) => {
        const url = `/openai/upload-file`;

        const dataBody = {
            data: {
                files: listFile
            },
            type: "StudyIO"
        }

        return axiosClient.post(url, dataBody)
    },
   
}

export default fileApi