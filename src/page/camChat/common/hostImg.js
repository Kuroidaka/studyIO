import base64ToBlob from "./base64ToBlob";

const uploadImageToFreeImageHost = async (base64Image) => {
    const blob = base64ToBlob(base64Image, "image/jpeg");
    const formData = new FormData();
    formData.append("file", blob, "image.jpg");
  
    const response = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: formData,
    });
  
    const { data } = await response.json();
  
    return data.url.replace("https://tmpfiles.org/", "https://tmpfiles.org/dl/");
}

export default uploadImageToFreeImageHost;