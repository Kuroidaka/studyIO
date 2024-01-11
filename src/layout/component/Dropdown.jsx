import React, { useState } from "react";

const menu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return(
    
    <div>
        <div className="Dropdown">
            <div className="setting" >
                <i className="fas fa-ellipsis-h" />
            </div>
            <ul>
                <li>
                    <i class="fa-solid fa-pen"></i>
                    <a href="/">Rename</a>
                </li>
                <li>
                    <i class="fa-regular fa-trash-can"></i>
                    <a href="/profile">Delete</a>
                </li>
            </ul>

        </div> 
        <div className="setting" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <i className="fas fa-ellipsis-h" />
        </div>
        {isDropdownOpen && (
        <Dropdown open={isDropdownOpen}>
          <Dropdown.Item text="Rename" />
          <Dropdown.Item text="Delete" />
        </Dropdown>
      )}
    </div>
  );
}


export default menu;







// export default HistoryMenu;

