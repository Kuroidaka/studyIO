import { useChat } from "ai/react";
import mergeImages from "merge-images";
import styled, { css } from "styled-components";
import useMediaRecorder from "@wmik/use-media-recorder";
import { useId, useEffect, useRef, useState } from "react";
import useSilenceAwareRecorder from "silence-aware-recorder/react";

import common from "./common";

const INTERVAL = 250;
const IMAGE_WIDTH = 512;
const IMAGE_QUALITY = 0.6;
const COLUMNS = 4;
const MAX_SCREENSHOTS = 60;
const SILENCE_DURATION = 2500;
const SILENT_THRESHOLD = -30;

const transparentPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/2lXzAAAACV0RVh0ZGF0ZTpjcmVhdGU9MjAyMy0xMC0xOFQxNTo0MDozMCswMDowMEfahTAAAAAldEVYdGRhdGU6bW9kaWZ5PTIwMjMtMTAtMThUMTU6NDA6MzArMDA6MDBa8cKfAAAAAElFTkSuQmCC";


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

    const [displayDebug, setDisplayDebug] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [phase, setPhase] = useState("not inited");
    const [transcription, setTranscription] = useState("");
    const [imagesGridUrl, setImagesGridUrl] = useState(null);
    const [currentVolume, setCurrentVolume] = useState(-50);
    const [volumePercentage, setVolumePercentage] = useState(0);

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

        // gen img grid
        setPhase("user: processing speech to text");

         // Keep only the last XXX screenshots
        screenshotsRef.current = screenshotsRef.current.slice(-MAX_SCREENSHOTS);

        const imageUrl = await imagesGrid({
        base64Images: screenshotsRef.current,
        });

        screenshotsRef.current = [];

        const uploadUrl = await common.uploadImageToFreeImageHost(imageUrl);

        setImagesGridUrl(imageUrl);

        setPhase("user: processing completion");
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
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div className="content">
                <VideoContainer>
                    <video
                    ref={videoRef}
                    className=""
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

        <DebugContainer displayDebug={displayDebug}>
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
    background-color: #000000;
    position: relative;

    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80%;
        width: 100%;
    
    }
`

const BtnSection = styled.div `

`

const VideoContainer = styled.div`
    width: 500px;
    height: auto;
    position: relative;

    video {
        width: 100%;
        height: 100%;
        
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
    ${props => props.displayDebug ? css`
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