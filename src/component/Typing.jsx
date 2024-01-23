import styled from "styled-components";

const Typing = (p) => {
    const {text, who} = p
    return (
        <Container>
                <div className='text'>
                    <div className="dot-flashing"></div>
                    <span style={{    marginLeft: "24px"}}>
                        <span style={{fontWeight: "500"}}>{who} </span> 
                         {text}
                    </span>
                </div>
        </Container>
    );
}
 
export default Typing;


const Container = styled.div `

.text {
    gap: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    // .chat-dot {
    //     display: inline-block;
    //     width: 10px;
    //     height: 10px;
    //     background-color: #848484;
    //     border-radius: 50%;
    //     animation: jump .8s linear infinite;


    //     &:nth-child(1) {
    //         animation-delay: 0s;
    //     }
    //     &:nth-child(2) {
    //         animation-delay: 0.15s;
    //     }
    //     &:nth-child(3) {
    //         animation-delay: 0.3s;
    //     }

    // }
    .dot-flashing {
        position: relative;
        width: 12px;
        height: 12px;
        border-radius: 10px;
        background-color: #9880ff;
        color: #9880ff;
        animation: dot-flashing .5s infinite linear alternate;
        animation-delay: 0.25s;
        }
        .dot-flashing::before,
        .dot-flashing::after {
        content: "";
        display: inline-block;
        position: absolute;
        top: 0;
        }
        .dot-flashing::before {
        left: -20px;
        width: 12px;
        height: 12px;
        border-radius: 10px;
        background-color: #9880ff;
        color: #9880ff;
        animation: dot-flashing .5s infinite alternate;
        animation-delay: 0s;
        }
        .dot-flashing::after {
        left: 20px;
        width: 12px;
        height: 12px;
        border-radius: 10px;
        background-color: #9880ff;
        color: #9880ff;
        animation: dot-flashing .5s infinite alternate;
        animation-delay: .5s;
        }
        @keyframes dot-flashing {
        0% {
            background-color: #9880ff;
        }
        // 50%,
        100% {
            background-color: rgba(152, 128, 255, 0.2);
        }
        }
}

`