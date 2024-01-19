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
    uploadFile: async (formData) => {
        const url = `/studyio/file/upload`;

        return axiosClient.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
        )
    },
    uploadFileImg: async (formData) => {
        const url = `/studyio/file/img/upload`;

        return axiosClient.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
        )
    },
   
}

export default fileApi