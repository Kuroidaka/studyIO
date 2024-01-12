import styled from "styled-components";

const Load = () => {
    return ( 
        <Container>
            <span className="loader"></span>
        </Container>
     );
}
 
export default Load;

const Container = styled.div`
    height: 100%;
    width: 100%;
    .loader {
    width: 100%;
    height: 100%;
    border: 4px solid #FFF;    
    border-bottom-color: transparent;
    border-radius: 10px;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 


`