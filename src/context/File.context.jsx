import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

import fileApi from "../api/v1/file";

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
                toast.success('File deleted successfully')
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false); // Also set loading to false if the API call fails
                toast.error('Delete file failed')
            });
        }

        deleteDB()
    }

    const uploadFile = async (formData) => {
    
            const uploadDB = async (formData) => {
                setIsLoading(true); 
                return fileApi.uploadFile(formData)
                .then((data) => {
                    console.log(data.data);
                    setIsLoading(false); // Set loading to false when the API call finishes
                    toast.success('File uploaded successfully')
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false); // Also set loading to false if the API call fails
                    toast.error('file upload failed')
                });
            }
            
            uploadDB(formData) 
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