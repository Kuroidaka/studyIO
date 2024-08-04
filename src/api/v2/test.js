import axiosClient from "../axiosClient";

const testApi = {

    describeImage: async (uploadUrl) => {
        const url = `/test/img`;

        // Define data body
        const dataBody = {
            data: uploadUrl
        };

        // Send POST request with query parameters and data body
        return axiosClient.post(url, dataBody);
    },
}

export default testApi