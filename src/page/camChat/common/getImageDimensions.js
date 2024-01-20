const getImageDimensions = async (src) => {
    return new Promise((resolve, reject) => {
        const img = new globalThis.Image();

        img.onload = function () {
        resolve({
            width: this.width,
            height: this.height,
        });
        };

        img.onerror = function () {
        reject(new Error("Failed to load image."));
        };

        img.src = src;
    });
}

export default getImageDimensions;