import mergeImages from "merge-images";
import { Mic } from 'react-feather';
import styled, { css } from "styled-components";

import common from "./common";
// import ConversationContext from "../../context/Conversation.context";
import { CamChat } from './CamChat';

export const callConfig = (isScreenSharing) => {
  let commonConfig = {
    INTERVAL: 250,
    SILENCE_DURATION: 2500,
    SILENT_THRESHOLD: -30,
  };

  if (isScreenSharing) {
    commonConfig = {
      ...commonConfig,
      IMAGE_WIDTH: 1080,
      MAX_SCREENSHOTS: 1,
      IMAGE_QUALITY: 1,
      COLUMNS: 1,
    };
  } else {
    commonConfig = {
      ...commonConfig,
      IMAGE_WIDTH: 512,
      MAX_SCREENSHOTS: 60,
      IMAGE_QUALITY: 0.6,
      COLUMNS: 4,
    };
  }
  return commonConfig
};

export const transparentPixel =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/2lXzAAAACV0RVh0ZGF0ZTpjcmVhdGU9MjAyMy0xMC0xOFQxNTo0MDozMCswMDowMEfahTAAAAAldEVYdGRhdGU6bW9kaWZ5PTIwMjMtMTAtMThUMTU6NDA6MzArMDA6MDBa8cKfAAAAAElFTkSuQmCC";

export function playAudio(url) {
return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.onended = resolve;
    audio.play();
});
}

export const imagesGrid = async ({
    base64Images,
    columns = callConfig().COLUMNS,
    gridImageWidth = callConfig().IMAGE_WIDTH,
    quality = callConfig().IMAGE_QUALITY,
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
  
  

export default CamChat;

export const Container = styled.div`
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
      justify-content: space-between;
      gap: 10px;
      align-items: center;
      height: 90%;
      margin: 0px 27px;
      width: auto;

    }
`



export const DebugContainer = styled.div`

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
    ${props => props.displaydebug === "true" ? css`
      transform: translateX(0);
    ` : css`
      transform: translateX(-100%);
    `}
  `;
  export const CloseButton = styled.div`
    position: absolute;
    z-index: 10;
    top: 16px;
    right: 16px;
    opacity: 0.5;
    cursor: pointer;
    color: white;
  `;
  export const DebugItem = styled.div`
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

