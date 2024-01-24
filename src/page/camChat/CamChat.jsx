import { motion } from "framer-motion";
import { ArrowLeft } from 'react-feather';
import useMediaRecorder from "@wmik/use-media-recorder";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useSilenceAwareRecorder from "silence-aware-recorder/react";
import func from "./function";
import conversationApi from "../../api/conversation";
import utils from "../../utils/index";
import CamScreen from './camScreen';
import LogScreen from './logScreen';
import { callConfig, imagesGrid, playAudio, Container, DebugContainer, CloseButton, DebugItem, transparentPixel } from '.';


export const CamChat = () => {
  // const id = useId();
  const maxVolumeRef = useRef(0);
  const minVolumeRef = useRef(-100);
  const isBusy = useRef(false);
  const screenshotsRef = useRef([]);
  const videoRef = useRef();
  const canvasRef = useRef();
  const navigate = useNavigate();

  const location = useLocation();
  const { hostImages } = utils;

  // const { selectedCon, updateConUser } = useContext(ConversationContext);
  const [isScreenShare, setIsScreenShare] = useState(false);
  const [botText, setBotText] = useState("");
  const [displaydebug, setDisplayDebug] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [phase, setPhase] = useState("not inited");
  const [transcription, setTranscription] = useState("");
  const [imagesGridUrl, setImagesGridUrl] = useState(null);
  const [currentVolume, setCurrentVolume] = useState(-50);
  const [volumePercentage, setVolumePercentage] = useState(0);
  const [lang] = useState("en");
  const [isWaiting, setIsWaiting] = useState(false);

  // Define recorder for video
  let { liveStream, ...video } = useMediaRecorder({
    recordScreen: isScreenShare,
    blobOptions: { type: "video/webm" },
    mediaStreamConstraints: { audio: false, video: true },
  });
  // Define recorder for audio
  const audio = useSilenceAwareRecorder({
    onDataAvailable: onSpeech,
    onVolumeChange: setCurrentVolume,
    silenceDuration: callConfig().SILENCE_DURATION,
    silentThreshold: callConfig().SILENT_THRESHOLD,
    minDecibels: -100,
  });

  async function onSpeech(data) {
    try {
      if (isBusy.current) return;

      isBusy.current = true;
      audio.stopRecording();

      // send audio to whisper
      setPhase("user: processing speech to text");
      setIsWaiting(true);
      setBotText("");

      const speechtotextFormData = new FormData();
      speechtotextFormData.append("file", data, "audio.webm");
      speechtotextFormData.append("model", "whisper-1");
      speechtotextFormData.append("language", lang);


      const result = await conversationApi.speechToText({
        formData: speechtotextFormData
      });

      console.log("transcript", result.text);
      if (result.text.length > 0) {
        setTranscription(result.text);
        setImagesGridUrl(null);
        setPhase("user: uploading video captures");

        // gen img grid
        screenshotsRef.current = screenshotsRef.current.slice(
          -callConfig(isScreenShare).MAX_SCREENSHOTS
        ); // Keep only the last XXX screenshots

        const imageUrl = await imagesGrid({
          base64Images: screenshotsRef.current,
        });

        screenshotsRef.current = [];

        const uploadUrls = await hostImages([imageUrl]);

        setImagesGridUrl(imageUrl);

        setPhase("user: processing completion");

        // send chat
        // const { content } = await handleSend({ uploadUrl: uploadUrls[0], inputValue: result.text, turnOffWait: () => {
        //   setIsWaiting(false)
        // } })
        const { content } = await handleSendClient({
          uploadUrl: uploadUrls[0],
          inputValue: result.text,
          turnOffWait: () => {
            setIsWaiting(false);
          }
        });

        // const AIresult = "Sure, boss! To return a blob URL from the blob object, you can use the URL.createObjectURL() method. This method creates a DOMString containing a URL representing the object given in the parameter. Here's your updated code:"
        if (content && typeof content === "string") {
          setPhase("assistant: processing text to speech");

          const ttsFormData = new FormData();
          ttsFormData.append("input", content);

          const { blobURL } = await func.textToSpeech({ formData: ttsFormData });

          setPhase("assistant: playing audio");

          await playAudio(blobURL);

          // continue recording
          audio.startRecording();
          isBusy.current = false;
          setPhase("user: waiting for speech");
        }
      }
      else { // continue recording
        isBusy.current = false;
        audio.startRecording();
        setPhase("user: waiting for speech");
      }

    } catch (error) {
      console.log(error);
      setIsWaiting(false);
      setPhase("error occur");
    }

  }

  // const handleSend = async ({ inputValue, uploadUrl, turnOffWait }) => {
  //   let newImgList = [{
  //     url: uploadUrl,
  //     id: nanoid(),
  //   }];
  //   // API CHAT
  //   const data = {
  //     text: inputValue,
  //     sender: "user",
  //     imgFiles: newImgList.length > 0 ? newImgList : [],
  //     maxToken: 1000
  //   };
  //   const updateStreamText = ({ text }) => {
  //     setBotText(prev => prev + text);
  //   };
  //   const result = await conversationApi.createCamChatStream(
  //     data,
  //     {
  //       updateStreamText, //update stream text
  //       turnOffWait
  //     }
  //   );
  //   console.log("final response: ", result);
  //   return {
  //     content: result.content
  //   };
  // };
  const handleSendClient = async ({ inputValue, uploadUrl, turnOffWait }) => {
    const messages = [
      {
        role: "user",
        content: [
          { type: "text", text: inputValue },
          {
            type: "image_url",
            image_url: {
              "url": uploadUrl,
            },
          },
        ],
      },
    ];

    const result = await func.sendChat({ messages, lang, setBotText, isScreenShare });
    console.log("final response: ", result.data);
    await turnOffWait();
    return {
      content: result.data
    };
  };


  const handleClickBack = async () => {
    conversationApi.deleteCamChatStream();
    await recorder.stop();
    await navigate("/chat");
  };

  const handleSwitchShare = () => {
    setIsScreenShare(prev => !prev);
    if (isScreenShare) {
      videoRecorder.start();
    }
    else {
      videoRecorder.stop();
    }

  };

  const recorder = {
    start: () => {
      videoRecorder.start();
      voiceRecorder.start();
    },
    stop: async () => {
      videoRecorder.stop();
      voiceRecorder.stop();
      // video.clearMediaStream()
      // document.location.reload();
    }
  };

  const videoRecorder = {
    start: () => {
      if (video.status === "idle" ||
        video.status === "stopped") {
        console.log("start: video");
        video.startRecording();
      }
    },
    stop: () => {
      if (video.status === "recording") {
        console.log("stop: video");
        video.stopRecording();
        videoRecorder.stopStreamedVideo(videoRef.current);
      }
    },
    stopStreamedVideo(videoElem) {
      if (videoElem) {
        const stream = videoElem.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });

        videoElem.srcObject = null;
      }
    }
  };

  const voiceRecorder = {
    start: () => {
      console.log("start: voice");
      audio.startRecording();
      setPhase("user: waiting for speech");
      setIsStarted(true);
    },
    stop: () => {
      console.log("stop: voice");
      audio.stopRecording();
      setPhase("user: stop meeting");
      setIsStarted(false);
    },
  };

  useEffect(() => {
    // start record Video + voice
    console.log("location.pathname", location.pathname);
    if (location.pathname === "/cam-chat") {
      videoRecorder.start();
    }
    else {
      recorder.stop();
    }
    return () => {
      recorder.stop();
    };
  }, []);


  useEffect(() => {
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
          (currentVolume - minVolumeRef.current) / (maxVolumeRef.current - minVolumeRef.current)
        );
      }
    }
  }, [currentVolume, audio.isRecording]);

  useEffect(() => {
    const captureFrame = () => {
      if (video.status === "recording" && audio.isRecording) {
        const targetWidth = callConfig(isScreenShare).IMAGE_WIDTH;

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

    const intervalId = setInterval(captureFrame, callConfig(isScreenShare).INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [video.status, audio.isRecording, isScreenShare]);

  useEffect(() => {
    if (videoRef.current && liveStream && !videoRef.current.srcObject) {
      videoRef.current.srcObject = liveStream;
    }
  }, [liveStream]);


  const camScreenProp = {
    videoRef,
    // canvasRef,
    // isScreenShare,
    handleSwitchShare,
    volumePercentage,
    audio,
  };

  const logScreenProp = {
    voiceRecorder,
    isStarted,
    isWaiting,
    botText,
    setDisplayDebug,
  };
  return (
    <Container>
      <motion.div
        className='title'
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}>
        <motion.div className='back-icon' onClick={handleClickBack}>
          <ArrowLeft />
        </motion.div>
      </motion.div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="content">
        <CamScreen {...camScreenProp} />
        <LogScreen {...logScreenProp} />
      </div>


      <DebugContainer displaydebug={displaydebug.toString()}>
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
};
