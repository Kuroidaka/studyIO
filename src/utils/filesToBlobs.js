function filesToBlobURLs(files) {
    return files.map((file) => {
        return URL.createObjectURL(file);
    });
}

export default filesToBlobURLs;