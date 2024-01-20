import base64ToBlob from "./base64ToBlob";

const hostImages = async (base64Images) => {
  const urls = await Promise.all(base64Images.map(async (base64Image) => {
    const blob = base64ToBlob(base64Image, "image/jpeg");
    const formData = new FormData();
    formData.append("file", blob, "image.jpg");

    const response = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: formData,
    });

    const { data } = await response.json();

    return data.url.replace("https://tmpfiles.org/", "https://tmpfiles.org/dl/");
  }));

  return urls;
}

export default hostImages;