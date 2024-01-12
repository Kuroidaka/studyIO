import conversationApi from "../api/conversation";

import { createContext, useEffect, useState } from "react";

const ConversationContext = createContext()

export const ConversationProvider = (p) => {
    const { children } = p

    const [list, setList] = useState([])
    const [selectedCon, setSelectedCon] = useState({id: "", dayRef: null})
    const [isLoading, setIsLoading] = useState(true);
    const [currentMsgList, setCurrentMsgList] = useState([]);
    

    useEffect(() => {
        getCon()
    }, []);

    const getCon = () => {
        setIsLoading(true); // Set loading to true when the API call starts
        conversationApi.getConversation()
        .then(({data}) => {
            setList(data.data);
            setIsLoading(false); // Set loading to false when the API call finishes
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
                console.log(res.data.data)
            }
        })

    }

    const updatedCon = async ({id, dayRef, newMsg, newCon, isNewConversation}) => {

        // update current msg list screen 
        setCurrentMsgList(prev => [...prev, newMsg])

        // if is new conversation for Bot
        if(newCon && newCon.length > 0 && isNewConversation)  {
            setList(prevList => {
                return prevList.map(item => {
                    console.log("item", item)
                  if (item.dayRef === "Today") {
                    return {
                      ...item,
                      conversationList: [newCon[0],...item.conversationList]
                    };
                  } else {
                    return item;
                  }
                });
            });

            setSelectedCon({id: newCon[0].id, dayRef: "Today"})
           } else {
            const day = list.find(item => item.dayRef === dayRef);

                if (day) {
                    const conversation = day.conversationList.find(con => con.id === id);
                    if (conversation) {
                        conversation.messages = [...conversation.messages, newMsg];
                        setList([...list]);
                        console.log('Conversation updated successfully.');
                    } else {
                        console.log('No conversation found with the given id.');
                    }
                }
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
        setCurrentMsgList
    }

    return (
        <ConversationContext.Provider value={contextValue}>
            {children}
        </ConversationContext.Provider>
    )
}

export default ConversationContext