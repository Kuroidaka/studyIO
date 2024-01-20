import OpenAI from "openai";

// export const runtime = "edge";

export const speechToText = async ({formData}) => {
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
