import fileApi from "../api/file";

import { createContext, useEffect, useState } from "react";

const FileContext = createContext()

export const FileProvider = (p) => {
    const { children } = p

    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false);    

    useEffect(() => {
        getFile()
    }, []);

    const getFile = () => {
        setIsLoading(true); // Set loading to true when the API call starts
        fileApi.getFile()
        .then(({data}) => {
            console.log(data.data);
            setList(data.data);
            setIsLoading(false); // Set loading to false when the API call finishes
        })
        .catch((error) => {
            console.error(error);
            setIsLoading(false); // Also set loading to false if the API call fails
        });
    }

    const delFile = async (fileName, callBack) => {

        const deleteDB = async () => {
            setIsLoading(true); 
            return fileApi.delFile(fileName)
            .then((data) => {
                console.log(data.data);
                setList(data.data);
                setIsLoading(false); // Set loading to false when the API call finishes
                callBack()
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false); // Also set loading to false if the API call fails
            });
        }

        deleteDB()
    }

    const uploadFile = async (file, callBack) => {
    
            const uploadDB = async () => {
                setIsLoading(true); 
                return fileApi.uploadFile(file)
                .then((data) => {
                    console.log(data.data);
                    setList(data.data);
                    setIsLoading(false); // Set loading to false when the API call finishes
                    callBack()
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false); // Also set loading to false if the API call fails
                });
            }
    
            uploadDB() 
    }

    const contextValue = {
        filesDocs: list,
        setFilesDocs: setList,
        isLoadingFile: isLoading,
        delFile,
        uploadFile
    }

    return (
        <FileContext.Provider value={contextValue}>
            {children}
        </FileContext.Provider>
    )
}

export default FileContext