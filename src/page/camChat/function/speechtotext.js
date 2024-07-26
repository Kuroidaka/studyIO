import OpenAI from "openai";
import Groq from "groq-sdk";
// export const runtime = "edge";

export const speechToText = async (formData) => {
  // const formData = await req.formData();
  const file = formData.get("file");
  const lang = formData.get("lang");

  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    return {
      error: "No API key provided.",
    };
  }

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });


  const transcription = await openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
    language: lang || undefined,
  });

  return {
    text: transcription.text
  }
}

export const groqSTT = async (formData) => {
  try {
      if (!import.meta.env.VITE_GROQ_API_KEY) {
          throw new Error("No API key provided.")
        }
      
        const file = formData.get("file");
      
        if (!file) {
          return {
            error: "No file found in FormData.",
          };
        }
      
        const groq = new Groq({
          apiKey: import.meta.env.VITE_GROQ_API_KEY,
          dangerouslyAllowBrowser: true
        });
      
        const transcription = await groq.audio.transcriptions.create({
          file,
          model: "whisper-large-v3",
          // language: lang || undefined,
        });
      
        console.log(transcription)
      
        return {
          text: transcription.text
        }
  } catch (error) {
      console.log(error)
      throw new Error(error)
  }
 
} 