import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'
import { Mic, MicOff, Video, VideoOff, Monitor, ArrowLeft, Phone } from 'react-feather'
import { useNavigate } from "react-router-dom";

import camApi from "../../api/v1/camConversation";

const CamScreen = (p) => {
  const {
    videoRef,
    screenRef,
    // canvasRef,
    isScreenShare,
    videoRecorder,
    toggleScreenShare,
    volumePercentage,
    audio,
    video,
    screenObject,
    voiceRecorder,
    recorder,
    isBusy
  } = p
  console.log("audio.isRecording", audio.isRecording)
  
  const navigate = useNavigate();
  
  const [isOpenCamBtn, setIsOpenCamBtn] = useState(true)
  const [isScreenBtn, setIsScreenBtn] = useState(false)
  const [isOnMic, setIsOnMic] = useState(false);

  const cam = {
    open: () => {
        const videoElm = document.querySelector('.video')
        videoElm.style.display = 'block'
        setIsOpenCamBtn(true)
        videoRecorder.start(video, videoRef)
    },
    close: () => {
        const videoElm = document.querySelector('.video')
        videoElm.style.display = 'none'
        setIsOpenCamBtn(false)
        videoRecorder.stop(video, videoRef)
    },
  }

  const screenHandle = {
    open: () => {
      setIsScreenBtn(true)
      videoRecorder.start(screenObject, screenRef)
      toggleScreenShare(true)
    },
    close: () => {
      setIsScreenBtn(false)
      videoRecorder.stop(screenObject, screenRef)
      toggleScreenShare(false)
    },
  }

  const micFunc = {
    open: () => {
      voiceRecorder.start()
      isBusy.current = false
      setIsOnMic(true)
    },
    close: () => {
      voiceRecorder.stop()
      isBusy.current = true
      setIsOnMic(false)
    },
  }

  const handleClickBack = async () => {
    camApi.deleteCamChatStream();
    recorder.stop(video, videoRef);
    recorder.stop(screenObject, screenRef);
    await navigate("/chat");
  };

  return (
  <VideoSection>
        <motion.div
            className='title'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <motion.div className='back-icon' onClick={handleClickBack}>
            <ArrowLeft />
            </motion.div>
        </motion.div>
        <VideoContainer isScreenShare={isScreenShare.current}>
    
          <video className="screen" ref={screenRef} autoPlay />
    
          <video className="video" ref={videoRef} autoPlay />
    
          <RecordDot
            isrecording={audio.isRecording.toString()}
            volumepercentage={volumePercentage}
          >
            <div>{audio.isRecording ? '' : '⏸'}</div>
          </RecordDot>
          <ActionContainer>
    
            {(isOnMic && !isBusy.current) ? (
                <BtnWrapper onClick={micFunc.close}>
                    <Mic />
                </BtnWrapper>
            ) : (
                <BtnWrapper onClick={micFunc.open} className='off'>
                    <MicOff />
                </BtnWrapper>
            )}
            
            {isOpenCamBtn ? (
            <BtnWrapper onClick={cam.close}>
                <Video />
            </BtnWrapper>
            ) : (
            <BtnWrapper onClick={cam.open} className='off'>
                <VideoOff />
            </BtnWrapper>
            )}
    
            {isScreenBtn ? (
            <BtnWrapper onClick={screenHandle.close} className="monitor">
                <Monitor />
            </BtnWrapper>
            ) : (
            <BtnWrapper onClick={screenHandle.open} >
                <Monitor />
            </BtnWrapper>
            )}

            <BtnWrapper onClick={handleClickBack} className="phone-off" >
                <Phone />
            </BtnWrapper>
          </ActionContainer>
        </VideoContainer>
  </VideoSection>
  )
}

export default CamScreen

const VideoSection = styled.div `
    height: 100%;
    width: 80%;
`

const VideoContainer = styled.div`
  flex-direction: column;
  width: 100%;
  background-color: black;
  height: 92%;
  position: relative;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  video {
    width: 100%;
    border-radius: 0.5rem;
    flex: 1;
  }

  .screen {
    display: none;
  }

  ${(props) =>
    props.isScreenShare &&
    css`
      .screen {
        width: 100%;
        height: 100%;
        display: block;
      }

      .video {
        position: absolute;
        left: 0;
        height: auto;
        top: -10px;
        width: 20%;
        border: 2px solid #6288d0;
      }
    `}

  ${(props) =>
    !props.isScreenShare &&
    css`
      .video {
        width: 100%;
        height: 100%;
        display: block;
      }
    `}
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
  z-index: 99999;
  cursor: ${(props) => (props.isrecording === 'true' ? 'default' : 'pointer')};

  ${(props) =>
    props.isrecording &&
    css`
      div {
        width: 4rem;
        height: 4rem;
        background-color: #f56565;
        opacity: 0.5;
        border-radius: 50%;
        transform: scale(${Math.pow(props.volumepercentage, 4).toFixed(4)});
      }
    `}

  ${(props) =>
    props.isrecording === 'false' &&
    css`
      div {
        font-size: 3.125rem;
        color: #f56565;
        opacity: 0.5;
      }
    `}
`

const ActionContainer = styled.div`
    width: 100%;
    height: 100px;
    position: absolute;
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    bottom: 0;
`

const BtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background-color: #6a6a6a;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #898181; 
    }

    &.off {
        background-color: #e95353;
        &:hover {
            background-color: #f56565; 
        }
    }

    &.monitor {
        background-color: #3b82f6;
        &:hover {
            background-color: #2563eb; 
        }
    }

    &.phone-off {
        background-color: #EA4335;
        width: 70px;
        border-radius: 27px;
        svg {
            rotate: 135deg;
        }
    }
`