import React, { useState } from "react";
import styled from "styled-components";

const menu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return(
    
    <div>
        <Dropdown>
            <div className="dropdown">
                <div className="setting" >
                    <Icon>
                    <i className="fas fa-ellipsis-h" />
                    </Icon>
                </div>
                <ul>
                    <li>
                        <Icon><i class="fa-solid fa-pen"></i></Icon>
                        
                        <a href="/">Rename</a>
                    </li>
                    <li>
                        <Icon><i class="fa-regular fa-trash-can"></i></Icon>
                        <a href="/profile">Delete</a>
                    </li>
                </ul>
            </div> 
        </Dropdown>

        <div className="setting">
            <i className="fas fa-ellipsis-h" onClick={() => setIsDropdownOpen(!isDropdownOpen)}/>
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

const Dropdown = styled.div`
    width: 160px;
    padding: 10px;
    border-radius: 10px;
    position: absolute;
    left: 280px;
    background-color: #313131;
`

const Icon = styled.i`
    font-size: 20px;
`

export default menu;



