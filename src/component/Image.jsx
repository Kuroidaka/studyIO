import { Fragment, useState } from 'react'
import styled from 'styled-components'
import Load from './Load'

const Image = (p) => {
  const { src, imgPlaceHolder } = p
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Fragment>
      <img
        style={{ display: isLoaded ? 'block' : 'none' }}
        src={src}
        onLoad={() => setIsLoaded(true)}
        alt="My Image"
        onError={(e) => { 
          console.log("error")
          e.target.onerror = null; 
          e.target.src = imgPlaceHolder
        }} 
      />
      {!isLoaded && (
        <LoadingImage>
          <Load />
        </LoadingImage>
      )}
    </Fragment>
  )
}

export default Image

const LoadingImage = styled.div `
    width: 200px;
    height: 200px;
    background: #858585;
    border-radius: 10px;

`