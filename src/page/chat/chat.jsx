import styled from "styled-components";
import InputBox from "./input/index";

const ChatPage = () => {
    return ( 
        <> 
        <InputContainer>
            <InputBox />
        </InputContainer>
        </>
     );
}
 
export default ChatPage;

const InputContainer = styled.div`
    width: 100%;
    height: 300px;
    background-color: #127e5a;
`