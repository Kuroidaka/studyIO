import conversationApi from "../api/conversation";

import { createContext, useEffect, useState } from "react";

const ConversationContext = createContext()

export const ConversationProvider = (p) => {
    const { children } = p

    const [list, setList] = useState([])
    const [selectedCon, setSelectedCon] = useState({id: -1, dayRef: null})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCon()
    }, []);

    const getCon = () => {
        setIsLoading(true); // Set loading to true when the API call starts
        conversationApi.getConversation()
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

    const deleteCon = ({id, dayRef}) => {

        const day = list.find(item => item.dayRef === dayRef);
          
        if (day) {
            const originalLength = day.conversationList.length;
            day.conversationList = day.conversationList.filter(con => con.id !== id);
            
            if (day.conversationList.length !== originalLength) {
              console.log('Conversation deleted successfully.');

            } else {
              console.log('No conversation found with the given id.');
            }
        } else {
        console.log('No conversations found for the given day.');
        }
          
        // conversationApi.deleteConversation(id)
        // .then(res => {
        //     if(res.statusText === "OK"){
        //         console.log(res.data.data)
        //     }
        // })

    }

    const selectCon = ({id, dayRef}) => {
        setSelectedCon({id, dayRef})
    }


    const contextValue = {
        conList: list,
        setConList: setList,
        getConList: getCon,
        isLoading,
        selectedCon,
        selectCon,
        deleteCon
    }

    return (
        <ConversationContext.Provider value={contextValue}>
            {children}
        </ConversationContext.Provider>
    )
}

export default ConversationContext