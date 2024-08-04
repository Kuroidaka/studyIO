import axiosClient from "../axiosClient";

const conversationApiV2 = {

    createChat: async ({inputValue, conversationId, base64Data}, isStream, isVision) => {
        const url = `/brain/chat`;

        // Define query parameters
        const params = {
            isStream: isStream,
            isLTMemo: true,
            isVision: isVision,
        };

        // Define data body
        const dataBody = {
            prompt: inputValue,
            conversationID: conversationId,
        };

        if (base64Data) {
            dataBody.base64Data = base64Data;
        }

        console.log("dataBody", {base64Data})
        // Send POST request with query parameters and data body
        return axiosClient.post(url, dataBody, { params });
    },
}

export default conversationApiV2