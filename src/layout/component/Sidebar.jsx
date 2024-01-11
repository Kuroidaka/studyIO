import { useState } from "react";
import menu from "./Dropdown";
import './style/sidebar.scss'

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
            }
        ]
    },

]

const Sidebar = () => {
    const [selectedCon, setSelectedCon] = useState(1)


    const hdlSelCon = (id) => {
        setSelectedCon(id)
    }

    return ( 
        <div className="container">
            <div className="cover">
                
                <h2>History</h2>

                <div className="conversation-list">
                {sidebarList && 
                sidebarList.map((item, index) => (
                    <div className="day-ref-section" key={index}>
                        <h4 className="title">{item.dayRef}</h4>
                        <ul className="day-ref-list">
                            {item.conversationList && 
                            item.conversationList.map((conversation, index) => (
                                <li key={index} className={selectedCon == conversation.id && `selected`} onClick={() => hdlSelCon(conversation.id)}>
                                    <div className="item">
                                    <p>{conversation.name}</p>
                                    </div>
                                    <div className="setting">
                                        <i className="fas fa-ellipsis-h" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                </div>

            </div>
        </div>
     );
}



export default Sidebar;
