import styled from "styled-components";
import InputBox from "./input/index";

const ChatPage = () => {
    return ( 
        <> 
        Chat page
        <InputContainer>
            <InputBox />
        </InputContainer>
        </>
     );
}
 
export default ChatPage;

const InputContainer = styled.div`
    width: 800px;
    height: 300px;
    background-color: #127e5a;
`