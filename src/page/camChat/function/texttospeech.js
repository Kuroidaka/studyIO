// import OpenAI from "openai";
import axios from 'axios';

export const textToSpeech = async({formData}) => {

  const input = formData.get("input");

  const API_KEY = "99797dd516a8b062ec2566218723b917";
  const VOICE_ID = 'm1jIBSEarJzEVnddD9tW';

  const options = {
    method: 'POST',
    url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    headers: {
      accept: 'audio/mpeg', // Set the expected response type to audio/mpeg.
      'content-type': 'application/json', // Set the content type to application/json.
      'xi-api-key': `${API_KEY}`, // Set the API key in the headers.
    },
    data: {
      text: input, // Pass in the inputText as the text to be converted to speech.
    },
    responseType: 'arraybuffer', // Set the responseType to arraybuffer to receive binary data as response.
  };
  // Set options for the API request.

  // Send the API request using Axios and wait for the response.
  const speechDetails = await axios.request(options);

  const blob = new Blob([speechDetails.data], { type: 'audio/mpeg' });
    // Create a URL for the blob object
    const url = URL.createObjectURL(blob);
  // Return the binary audio data received from the API response.
  return { blobURL: url };

}
// export const textToSpeech = async({formData}) => {

//   const input = formData.get("input");

//   if (!import.meta.env.VITE_OPENAI_API_KEY) {
//     return Response.json({
//       error: "No API key provided.",
//     });
//   }

//   const openai = new OpenAI({
//     apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true
//   });

//   const mp3 = await openai.audio.speech.create({
//     model: "tts-1",
//     voice: "nova",
//     input,
//     speed: 1.1,
//     response_format: "opus",
//   });

//  // Fetching the audio data as an ArrayBuffer
//  const arrayBuffer = await mp3.arrayBuffer();

//  // Converting ArrayBuffer to Blob
//  const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });

//  // Creating a blob URL from the blob
//  const blobURL = URL.createObjectURL(blob);

//  console.log("blobURL", blobURL)

//  // Returning the Blob URL directly to the client
//  return { blobURL }
// }
