import { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import Load from './Load'

const ImageCom = (p) => {
  const { src, imgPlaceHolder, imgsize } = p;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => {
      img.src = imgPlaceHolder;
    };
  }, [src, imgPlaceHolder]);

  return (
    <Fragment>
      {isLoaded ? (
        <Photo
          style={{
            backgroundImage: `url(${src}), url(${imgPlaceHolder})`,
            backgroundSize: "cover",
            height: imgsize, // Adjust as needed
            width: imgsize, // Adjust as needed
          }}
        />
      ) : (
        <LoadingImage imgsize={imgsize}>
          <Load />
        </LoadingImage>
      )}
    </Fragment>
  );
};

export default ImageCom;

const LoadingImage = styled.div `
    width: 100%;
    ${p => p.imgsize && `
      height: ${p.imgsize};  
      width: ${p.imgsize};    
    `};
    background: #858585;
    border-radius: 10px;

`

const Photo = styled.div`
  background-repeat: no-repeat;
  border-radius: 10px;
  background-position-y: center;
`