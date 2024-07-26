import convertStringToHtml from './text_html';
import filesToBase64 from './fileToBase64';
import base64ToBlob from './base64ToBlob';
import hostImages from './hostImages';
import filesToBlobURLs from './filesToBlobs';
import checkIsImgLink from './isImgLink';
import isObject from './isObject';

const downloadImageFromBase64 = (base64String) => {
    
    const date = new Date();
    const filename = `image-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}.png`;
  
    // Create a link element
    const link = document.createElement('a');
    
    // Set the link's href to the base64 string
    link.href = base64String;
    
    // Set the download attribute with the filename
    link.download = filename;
    
    // Append the link to the body (required for Firefox)
    document.body.appendChild(link);
    
    // Programmatically click the link to trigger the download
    link.click();
    
    // Remove the link from the document
    document.body.removeChild(link);
};
  
  // Example usage
//   const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...'; // Your base64 string here
//   const filename = 'downloaded-image.png';
//   downloadImageFromBase64(base64Image, filename);
  

const utils = {
    convertStringToHtml,
    filesToBase64,
    base64ToBlob,
    hostImages,
    filesToBlobURLs,
    checkIsImgLink,
    isObject,
    downloadImageFromBase64
}
export default utils 