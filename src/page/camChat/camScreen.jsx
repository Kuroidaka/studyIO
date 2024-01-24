import styled, { css } from "styled-components";
import Typing from "../../component/Typing";
import { Fragment } from "react";

const CamScreen = (p) => {
    const  {
        videoRef,
        // canvasRef,
        // isScreenShare,
        handleSwitchShare,
        volumePercentage,
        audio,
      } = p

    return (
    <VideoContainer>
        <video
        ref={videoRef}
        autoPlay
    />
        <RecordDot isrecording={audio.isRecording.toString()} volumepercentage={volumePercentage}>
            <div>
                {audio.isRecording ? '' : '⏸'}
            </div>
        </RecordDot>
        <ActionContainer>
            <button onClick={handleSwitchShare}></button>
        </ActionContainer>
    </VideoContainer>
       
     );
}
 
export default CamScreen;



const VideoContainer = styled.div`
  flex-direction: column;
  width: 80%;
  background-color: black;
  height: 100%;
  position: relative;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: space-between;

    video {
        width: 100%;
        height: 93%;
        border-radius: 0.5rem;
        
    }

`
const RecordDot = styled.div`
  width: 4rem;
  height: 4rem;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => props.isrecording === "true" ? 'default' : 'pointer'};

  ${props => props.isrecording && css`
    div {
      width: 4rem;
      height: 4rem;
      background-color: #f56565;
      opacity: 0.5;
      border-radius: 50%;
      transform: scale(${Math.pow(props.volumepercentage, 4).toFixed(4)});
    }
  `}

  ${props => props.isrecording === "false" && css`
    div {
      font-size: 3.125rem;
      color: #f56565;
      opacity: 0.5;
    }
  `}
`;



const ActionContainer = styled.div `
  width: 100%;
  height: 7%;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
`