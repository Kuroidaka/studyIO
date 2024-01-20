import OpenAI from "openai";

export const runtime = "edge";

export const textToSpeech = async({formData}) => {

  const input = formData.get("input");

  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    return Response.json({
      error: "No API key provided.",
    });
  }

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input,
    speed: 1.1,
    response_format: "opus",
  });

 // Fetching the audio data as an ArrayBuffer
 const arrayBuffer = await mp3.arrayBuffer();

 // Converting ArrayBuffer to Blob
 const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });

 // Creating a blob URL from the blob
 const blobURL = URL.createObjectURL(blob);

 console.log("blobURL", blobURL)

 // Returning the Blob URL directly to the client
 return { blobURL }
}
