import conversationApi from "../api/v1/conversation";

import { createContext, useEffect, useState } from "react";

const ConversationContext = createContext()

export const ConversationProvider = (p) => {
    const { children } = p

    const [list, setList] = useState([])
    const [selectedCon, setSelectedCon] = useState({id: "", dayRef: null})
    const [isLoading, setIsLoading] = useState(true);
    const [currentMsgList, setCurrentMsgList] = useState([]);
    const [isWaiting, setIsWaiting] = useState({
        isWait: false,
        conId: ""
    });

    useEffect(() => {
        getCon()
    }, []);


    const getCon = () => {
        setIsLoading(true); // Set loading to true when the API call starts
        conversationApi.getConversation()
        .then(({data}) => {
            if(data.data) {
                setList(data.data);
                setIsLoading(false); // Set loading to false when the API call finishes
            }
        })
        .catch((error) => {
            console.error(error);
            setIsLoading(false); // Also set loading to false if the API call fails
        });
    }

    const deleteCon = async ({id, dayRef}) => {

        const day = list.find(item => item.dayRef === dayRef);
        if(id === selectedCon.id){ //delete id vs current screen id
            setSelectedCon({id: "", dayRef: null})
            setCurrentMsgList([])

        }

        if (day) {
            const originalLength = day.conversationList.length;
            day.conversationList = day.conversationList.filter(con => con.id !== id);
            setList([...list]);
            if (day.conversationList.length !== originalLength) {
              console.log('Conversation deleted successfully.');

            } else {
              console.log('No conversation found with the given id.');
            }
        } else {
        console.log('No conversations found for the given day.');
        }
          
        await conversationApi.delChat({ conversationId: id })
        .then(res => {
            if(res.statusText === "OK"){
                // console.log(res.data.data)
                console.log("deleted id:", JSON.parse(res.data.data).id)
            }
        })

    }

    const updatedCon = async ({id, dayRef, newMsgList, newCon, isNewConversation, userMsg}) => {
              
        // If it's a new conversation for Bot
        if(newCon && newCon.length > 0 && isNewConversation)  {
            setList(prevList => prevList.map(item => item.dayRef === "Today" 
                ? {...item, conversationList: [newCon[0], ...item.conversationList]} 
                : item)
            );
            setSelectedCon({id: newCon[0].id, dayRef: "Today"});

            setCurrentMsgList(prev => {
                // newMsgList[0].id
                let newList = prev.filter(item => item.id !== "temp-id" && item.id !== "temp-id-2")
                return [...newList, ...newCon[0].messages]
            });
        } else {// if not new conversation for Bot
            // Update current message list screen 
            let botMsg = newMsgList
            setCurrentMsgList(prev => {
                // newMsgList[0].id
                let newList = prev.filter(item => item.id !== "temp-id-2" && item.id !== "temp-id")
                return [...newList, userMsg, ...botMsg]
            });

            // update origin list data
            const day = list.find(item => item.dayRef === dayRef);
            if (day) {
                const conversation = day.conversationList.find(con => con.id === id);
                if (conversation) conversation.messages = [...conversation.messages, ...newMsgList];
                setList([...list]);
            }
        }
    }

    const updateConUser = async ({id, dayRef, newMsgList}) => {

        // Update current message list screen 
        setCurrentMsgList(prev => [...prev, ...newMsgList]);

        // Find the day from the list and update the conversation if found
        const day = list.find(item => item.dayRef === dayRef);
        if (day) {
            const conversation = day.conversationList.find(con => con.id === id);
            if (conversation) conversation.messages = [...conversation.messages, ...newMsgList];
            setList([...list]);
        }
        
    }

    const updateLastCon = async ({ newConversation }) => {
        setList(prevList => {
            return prevList.map(item => {
              if (item.dayRef === "Today") {
                return {
                  ...item,
                  conversationList: [newConversation, ...item.conversationList]
                }
              } else {
                return item;
              }
            });
        });
    }

    const selectCon = async ({id, dayRef}) => {
        setSelectedCon({id, dayRef})
        const day = list.find(item => item.dayRef === dayRef);
        
        if (day) {
            const conversation = day.conversationList.find(con => con.id === id);
            
            if (conversation) {
                setCurrentMsgList(conversation.messages)
                
            } else {
                console.log('No conversation found with the given id.');
            }
        } else {
            console.log('No conversations found for the given day.');
        }
    }

    const createNewConversation = async () => {
        setCurrentMsgList([])
        setSelectedCon({id: "", dayRef: null})
    }


    const contextValue = {
        conList: list,
        setConList: setList,
        getConList: getCon,
        isLoading,
        selectedCon,
        selectCon,
        deleteCon,
        updatedCon,
        updateLastCon,
        currentMsgList,
        setCurrentMsgList,
        createNewConversation,
        isWaiting,
        setIsWaiting,
        updateConUser
    }

    return (
        <ConversationContext.Provider value={contextValue}>
            {children}
        </ConversationContext.Provider>
    )
}

export default ConversationContext