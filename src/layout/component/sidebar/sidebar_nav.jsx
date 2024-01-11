import Tippy from '@tippyjs/react/headless';

import Menu from "./Dropdown";
import { useState } from 'react';

const SidebarNav = (p) => {
    const {
        conversation,
        selectedCon,
        hdlSelCon
    } = p

    const [dropdown, setDropdown] = useState(false)

    const handleToggleDropdown = () => {
        if(dropdown) {
            dropDown.close()
        } else {
            dropDown.open()
        }
    }

    const dropDown = {
        open: () => {
            setDropdown(true)
            const conversationList = document.querySelector('.conversation-list');
            conversationList.setAttribute('aria-hidden', false);
        },
        close: () => {
            setDropdown(false)
            const conversationList = document.querySelector('.conversation-list');
            conversationList.setAttribute('aria-hidden', true);
        }
        
    }

    return ( 
    <li  className={ `conversation ${selectedCon == conversation.id ? `selected` : ""}`} onClick={() => hdlSelCon(conversation.id)}>
        <div className="item">
        <p>{conversation.name}</p>
        </div>

        <Tippy
            interactive
            content="Tooltip"
            render={attrs => (
                <Menu  {...attrs}/>
            )}
            visible={dropdown}
            onClickOutside={() => dropDown.close()}
            offset={[-10, 0]}
            placement= 'right'
        >
            <div className="setting">
                <i className="fas fa-ellipsis-h" onClick={handleToggleDropdown}/>
            </div>
        </Tippy>

    </li>  
    );
}
 
export default SidebarNav;