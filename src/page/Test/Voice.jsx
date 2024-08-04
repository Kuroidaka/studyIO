import { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import { groqSTT } from '../camChat/function/speechtotext';

const VoiceTest = () => {
    const [blobUrl, setBlobUrl] = useState(null);
    const [blob, setBlob] = useState(null);
  
    const handleStop = (blobUrl, blob) => {
      setBlobUrl(blobUrl);
      setBlob(blob);
    };
  
    const sendVoiceFile = async () => {
      if (!blob) {
        alert('No voice recorded');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', blob, 'voice-recording.wav');
  
      // Log each form data entry
      formData.forEach((value, key) => {
        console.log(key, value);
      });
  
      try {
        const data = await groqSTT(formData);
        console.log('Response:', data);
      } catch (error) {
        console.error('Error uploading the voice file:', error);
      }
    };
  
    return (
      <div>
        <ReactMediaRecorder
          audio
          onStop={handleStop}
          render={({ status, startRecording, stopRecording }) => (
            <div>
              <p>Status: {status}</p>
              <button onClick={startRecording} type="button">Start Recording</button>
              <button onClick={stopRecording} type="button">Stop Recording</button>
              {blobUrl && <audio src={blobUrl} controls />}
            </div>
          )}
        />
        <div>
          <button onClick={sendVoiceFile} type="button">Send Voice File</button>
        </div>
      </div>
    );
  };
  
  export default VoiceTest;