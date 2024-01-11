import { useState } from "react";

import './style/sidebar.scss'
import styled from "styled-components";
import SidebarNav from "./sidebar_nav";

const sidebarList = [
    {
        dayRef: "Today",
        conversationList: [
            {
                id:"1",
                name: "History 1",
                lastMessage: "Hello",
            },
            {
                id:"2",
                name: "History 2",
                lastMessage: "Hello",
            },
            {
                id:"3",
                name: "History 3",
                lastMessage: "Hello",
            }
        ]
    },
    {
        dayRef: "Yesterday",
        conversationList: [
            {
                id:"4",
                name: "History 1",
                lastMessage: "Hello",
            },
            {
                id:"5",
                name: "History 2",
                lastMessage: "Hello",
            },
            {
                id:"6",
                name: "History 3",
                lastMessage: "Hello",
            },
            {
                id:"7",
                name: "History 2",
                lastMessage: "Hello",
            },
            {
                id:"8",
                name: "History 3",
                lastMessage: "Hello",
            },
            {
                id:"9",
                name: "History 2",
                lastMessage: "Hello",
            },
            {
                id:"10",
                name: "History 3",
                lastMessage: "Hello",
            },
            {
                id:"11",
                name: "History 2",
                lastMessage: "Hello",
            },
  
        ]
    },

]

const Sidebar = () => {
    const [selectedCon, setSelectedCon] = useState(3)


    const hdlSelCon = (id) => {
        setSelectedCon(id)
    }

    return ( 
        <div className="container">
            <div className="cover">
                <h2>History</h2>

                <div className="conversation-list" aria-hidden="true">
                {sidebarList && 
                sidebarList.map((item, index) => (
                    <div className="day-ref-section" key={index}>
                        <h4 className="title">{item.dayRef}</h4>
                        <ul className="day-ref-list">
                            {item.conversationList && 
                            item.conversationList.map((conversation, index) => {
                              return (
                                <SidebarNav 
                                    key={index} 
                                    conversation={conversation}
                                    selectedCon={selectedCon}
                                    hdlSelCon={hdlSelCon}
                                > </SidebarNav>
                              )
                            })}
                        </ul>
                    </div>
                ))}
                </div>

                <Team>
                </Team>

            </div>
        </div>
     );
}

const Team = styled.div`
    width: 100%;
    height: 10vh;
    background-color: var(--primary-color);
    /* padding: initial; */
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`


export default Sidebar;
