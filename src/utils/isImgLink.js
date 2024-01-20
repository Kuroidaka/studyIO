
// check is img link
const checkIsImgLink = (input) => {
    if(input === "" || input === undefined || input === null) return false;
    const urlRegex = /(http[s]?:\/\/){0,1}(\w+:\w+@){0,1}([a-zA-Z0-9.-]+)(:[0-9]+){0,1}(\/[a-zA-Z0-9.-]+)*\/?/;
    const url = input.match(urlRegex);

    const imageRegex = /\.(jpeg|jpg|gif|png)$/;
    if(url.length > 0 ) {
        const isImage = imageRegex.test(url[0]);
        return isImage;
    }
}

export default checkIsImgLink;