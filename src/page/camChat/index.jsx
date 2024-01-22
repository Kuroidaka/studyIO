import fs from "fs";
import { nanoid } from 'nanoid'
import mergeImages from "merge-images";
import { motion } from "framer-motion";
import { ArrowLeft } from 'react-feather';
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import useMediaRecorder from "@wmik/use-media-recorder";
import useSilenceAwareRecorder from "silence-aware-recorder/react";
import { useId, useEffect, useRef, useState, useContext } from "react";

import func from "./function"
import common from "./common";
import conversationApi from "../../api/conversation"
import ConversationContext from "../../context/Conversation.Context";
import utils from "../../utils/index";

const INTERVAL = 250;
const IMAGE_WIDTH = 512;
const IMAGE_QUALITY = 0.6;
const COLUMNS = 4;
const MAX_SCREENSHOTS = 60;
const SILENCE_DURATION = 2500;
const SILENT_THRESHOLD = -30;

const transparentPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/2lXzAAAACV0RVh0ZGF0ZTpjcmVhdGU9MjAyMy0xMC0xOFQxNTo0MDozMCswMDowMEfahTAAAAAldEVYdGRhdGU6bW9kaWZ5PTIwMjMtMTAtMThUMTU6NDA6MzArMDA6MDBa8cKfAAAAAElFTkSuQmCC";

function playAudio(url) {
return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.onended = resolve;
    audio.play();
});
}

const imagesGrid = async ({
    base64Images,
    columns = COLUMNS,
    gridImageWidth = IMAGE_WIDTH,
    quality = IMAGE_QUALITY,
}) => {
    if (!base64Images.length) {
      return transparentPixel;
    }
  
    const dimensions = await common.getImageDimensions(base64Images[0]);
  
    // Calculate the aspect ratio of the first image
    const aspectRatio = dimensions.width / dimensions.height;
  
    const gridImageHeight = gridImageWidth / aspectRatio;
  
    const rows = Math.ceil(base64Images.length / columns); // Number of rows
  
    // Prepare the images for merging
    const imagesWithCoordinates = base64Images.map((src, index) => ({
      src,
      x: (index % columns) * gridImageWidth,
      y: Math.floor(index / columns) * gridImageHeight,
    }));
  
    // Merge images into a single base64 string
    return await mergeImages(imagesWithCoordinates, {
      format: "image/jpeg",
      quality,
      width: columns * gridImageWidth,
      height: rows * gridImageHeight,
    });
}
  
  

const CamChat = () => {
    const id = useId();
    const maxVolumeRef = useRef(0);
    const minVolumeRef = useRef(-100);
    const isBusy = useRef(false);
    const screenshotsRef = useRef([]);
    const videoRef = useRef();
    const canvasRef = useRef();
    const navigate = useNavigate();

    const { hostImages } = utils

    const { updatedCon, selectedCon } = useContext(ConversationContext);

    const [displaydebug, setDisplayDebug] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [phase, setPhase] = useState("not inited");
    const [transcription, setTranscription] = useState("");
    const [imagesGridUrl, setImagesGridUrl] = useState(null);
    const [currentVolume, setCurrentVolume] = useState(-50);
    const [volumePercentage, setVolumePercentage] = useState(0);
    const [lang, setLang] = useState("en") 
    const [isWaiting, setIsWaiting] = useState(false)
    const [tmpConversation, setTmpConversation] = useState({
        user: {},
        bot: {}
    })
    // const [lang, setLang] = useLocalStorage("lang", "");

    // Define recorder for video
    let { liveStream, ...video } = useMediaRecorder({
        recordScreen: false,
        blobOptions: { type: "video/webm" },
        mediaStreamConstraints: { audio: false, video: true },
    });
    // Define recorder for audio
    const audio = useSilenceAwareRecorder({
        onDataAvailable: onSpeech,
        onVolumeChange: setCurrentVolume,
        silenceDuration: SILENCE_DURATION,
        silentThreshold: SILENT_THRESHOLD,
        minDecibels: -100,
    });
    
    async function onSpeech(data) { //on speeching
        if (isBusy.current) return;
    
        isBusy.current = true;
        audio.stopRecording();
        
        // send audio to whisper
        setPhase("user: processing speech to text");
        setIsWaiting(true)

        const speechtotextFormData = new FormData();
        speechtotextFormData.append("file", data, "audio.webm");
        speechtotextFormData.append("model", "whisper-1");
        speechtotextFormData.append("language", lang);
    
        
        const result = await conversationApi.speechToText({
            formData: speechtotextFormData
        });

        setIsWaiting(false)
        setTranscription(result.text);
    
        setPhase("user: uploading video captures");
      
        // gen img grid
         // Keep only the last XXX screenshots
        screenshotsRef.current = screenshotsRef.current.slice(-MAX_SCREENSHOTS);

        const imageUrl = await imagesGrid({
            base64Images: screenshotsRef.current,
        });

        screenshotsRef.current = [];

        const uploadUrls = await hostImages([imageUrl]);

        setImagesGridUrl(imageUrl);

        setTmpConversation({// store user tmp msg
            user: {
                text: result.text,
                image: uploadUrls[0]
            },
        })

        setPhase("user: processing completion");

        // send chat
        const { content } = await handleSendChat({ uploadUrl: uploadUrls[0], text: result.text })
        // const AIresult = "Sure, boss! To return a blob URL from the blob object, you can use the URL.createObjectURL() method. This method creates a DOMString containing a URL representing the object given in the parameter. Here's your updated code:"

        if(content) {
            setPhase("assistant: processing text to speech");
            setTmpConversation({//store AI tmp msg
                bot: {
                    text: content,
                },
            })

            const ttsFormData = new FormData();
            ttsFormData.append("input", content);
            
            const { blobURL } = await func.textToSpeech({ formData: ttsFormData })

            setPhase("assistant: playing audio");

            await playAudio(blobURL);
      
            audio.startRecording();
            isBusy.current = false;
      
            setPhase("user: waiting for speech");
        }
        
    }

    const handleSendChat = async ({ text, uploadUrl, enableSend=null }) => {
  
        // create new array to store image object, each object has id, url
        let newImgList = [{
            url: uploadUrl,
            id: nanoid(),
        }]

        // update current user msg 
        await updatedCon({
            id: selectedCon.id,
            dayRef: selectedCon.dayRef,
            newMsgList: [{
                "id": "temp-id",
                "createdAt": new Date().toISOString(),
                "updatedAt": new Date().toISOString(),
                "text": text,
                "sender": "user",
                "senderID": "-1",
                "conversationId": selectedCon.id,
                "imgList": newImgList.length > 0 ? newImgList : [],
            }],
        })

        // API CHAT
        const data ={
            text: text,
            sender: "user",
            conversationId: selectedCon.id || "",
            isAttachedFile: false,
            imgFiles: newImgList.length > 0 ? newImgList : [],
        }
        const result = await conversationApi.createChat(data)
        .then(res => {
            if(res.statusText === "OK"){
                console.log(res.data.data)
                // update Bot msg
                updatedCon({
                    id: selectedCon.id,
                    dayRef: selectedCon.dayRef,
                    newMsgList: res.data.data.bot,
                    newCon: res.data.data.newConversation,
                    isNewConversation: res.data.data.isNewConversation
                })
                if(typeof enableSend === 'function') {
                     enableSend()
                }
                console.log(res.data.data.bot[0])
                return res.data.data.bot[0]
            }
        })

        return {
          content: result.text
        }

    };

    const handleClickBack = () => {
      navigate("/chat")
    }

    const recorder = {//recorder object
        start: () => {
            audio.startRecording();
            video.startRecording();
    
            setIsStarted(true);
            setPhase("user: waiting for speech");
        },
        stop: () => {
            document.location.reload();
        },
    };


    useEffect(() => {//stream video
        if (videoRef.current && liveStream && !videoRef.current.srcObject) {
          videoRef.current.srcObject = liveStream;
        }
    }, [liveStream]);
    
    useEffect(() => {//change record dot size
        if (!audio.isRecording) {
          setVolumePercentage(0);
          return;
        }
    
        if (typeof currentVolume === "number" && isFinite(currentVolume)) {
          if (currentVolume > maxVolumeRef.current)
            maxVolumeRef.current = currentVolume;
          if (currentVolume < minVolumeRef.current)
            minVolumeRef.current = currentVolume;
    
          if (maxVolumeRef.current !== minVolumeRef.current) {
            setVolumePercentage(
              (currentVolume - minVolumeRef.current) /
                (maxVolumeRef.current - minVolumeRef.current)
            );
          }
        }
    }, [currentVolume, audio.isRecording]);
    
    useEffect(() => {//capture frame
        const captureFrame = () => {
          if (video.status === "recording" && audio.isRecording) {
            const targetWidth = IMAGE_WIDTH;
    
            const videoNode = videoRef.current;
            const canvasNode = canvasRef.current;
    
            if (videoNode && canvasNode) {
              const context = canvasNode.getContext("2d");
              const originalWidth = videoNode.videoWidth;
              const originalHeight = videoNode.videoHeight;
              const aspectRatio = originalHeight / originalWidth;
    
              // Set new width while maintaining aspect ratio
              canvasNode.width = targetWidth;
              canvasNode.height = targetWidth * aspectRatio;
    
              context.drawImage(
                videoNode,
                0,
                0,
                canvasNode.width,
                canvasNode.height
              );
              // Compress and convert image to JPEG format
              const quality = 1; // Adjust the quality as needed, between 0 and 1
              const base64Image = canvasNode.toDataURL("image/jpeg", quality);
    
              if (base64Image !== "data:,") {
                screenshotsRef.current.push(base64Image);
              }
            }
          }
        };
    
        const intervalId = setInterval(captureFrame, INTERVAL);
    
        return () => {
          clearInterval(intervalId);
        };
      }, [video.status, audio.isRecording]);
    

    return ( 
        <Container>
           <motion.div 
                    className='title'
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}>
              <motion.div className='back-icon' onClick={handleClickBack} >
                <ArrowLeft />
              </motion.div>
            </motion.div>
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div className="content">
                <VideoContainer>
                    <video
                    ref={videoRef}
                    autoPlay
                    />
                    <RecordDot isRecording={audio.isRecording} volumePercentage={volumePercentage}>
                        <div>
                            {audio.isRecording ? '' : '⏸'}
                        </div>
                    </RecordDot>

                </VideoContainer>
            </div>

        <BtnSection>
          {isStarted ? (
            <button onClick={recorder.stop}>Stop session</button>
            ) : (
            <button onClick={recorder.start}>Start session</button>
          )}
          <DebugBtn onClick={() => setDisplayDebug(prev => !prev)}>Debug</DebugBtn>
        </BtnSection>

        <AiResponseContainer>
                <div className="ai-text">
                {!isWaiting ? (
                    <p>{transcription}</p>
                ) : (
                    <>...loading</>
                )
                }
                </div>
        </AiResponseContainer>

        <DebugContainer displaydebug={displaydebug}>
           <CloseButton onClick={() => setDisplayDebug(false)}>
             ⛌
           </CloseButton>
           <div>
             <DebugItem>
               <div>Phase:</div>
               <p>{phase}</p>
             </DebugItem>
             <DebugItem>
               <div>Transcript:</div>
               <p>{transcription || "--"}</p>
             </DebugItem>
             <DebugItem>
               <div>Captures:</div>
               <img alt="Grid" src={imagesGridUrl || transparentPixel} />
             </DebugItem>
           </div>
         </DebugContainer>
        </Container>
     );
}
 
export default CamChat;

const Container = styled.div`
    height: 100%;
    width: 100%;
    position: relative;

    .title {
        display: flex;
        align-items: center;
        margin-left: 40px;
        height: 8vh;
        color: #ffffff;
    
        .back-icon {
            width: 45px;
            height: 45px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            padding: 7px;
            border-radius: 5px;
            align-items: center;
            border: 1px solid;

            &:hover {
                background-color: #ffffff;
                color: #292A38;
            }
        }

    }



    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60%;
        width: 100%;
    
    }
`

const BtnSection = styled.div `

`

const VideoContainer = styled.div`
    width: 100%;
    background-color: black;
    height: 80%;
    position: relative;
    margin: 30px;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    video {
        width: 100%;
        height: 100%;
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
  cursor: ${props => props.isRecording ? 'default' : 'pointer'};

  ${props => props.isRecording && css`
    div {
      width: 4rem;
      height: 4rem;
      background-color: #f56565;
      opacity: 0.5;
      border-radius: 50%;
      transform: scale(${Math.pow(props.volumePercentage, 4).toFixed(4)});
    }
  `}

  ${props => !props.isRecording && css`
    div {
      font-size: 3.125rem;
      color: #f56565;
      opacity: 0.5;
    }
  `}
`;

const DebugBtn = styled.button`
    padding: 0.5rem 1rem;
    background-color: #4A5568;
    border-radius: 0.375rem;
    opacity: ${props => props.disabled ? '0.5' : '1'};
`;


const DebugContainer = styled.div`

    background: rgba(20,20,20,0.8);
    backdrop-filter: blur(10px);
    padding: 8px;
    border-radius: 0.25rem;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    transition: all 0.2s ease-in-out;
    width: 75vw;
    @media (min-width: 640px) {
        width: 33vw;
    }
    ${props => props.displaydebug ? css`
      transform: translateX(0);
    ` : css`
      transform: translateX(-100%);
    `}
  `;
  const CloseButton = styled.div`
    position: absolute;
    z-index: 10;
    top: 16px;
    right: 16px;
    opacity: 0.5;
    cursor: pointer;
    color: white;
  `;
  const DebugItem = styled.div`
    margin-bottom: 2rem;
    div {
        font-weight: 600;
      opacity: 0.5;
    }
    img {
        object-fit: contain;
      width: 100%;
      border: 1px solid #9CA3AF;
    }

`;

const AiResponseContainer = styled.div `

`