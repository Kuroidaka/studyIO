import OpenAI from "openai";
import AiClient from "../../../config/openAI"

const systemMessage = (
  lang
) => `Context: The assistant receives a tiled series of screenshots from a user's live video feed. These screenshots represent sequential frames from the video, capturing distinct moments. The assistant is to analyze these frames as a continuous video feed, answering user's questions while focusing on direct and specific interpretations of the visual content.

1. When the user asks a question, use spatial and temporal information from the video screenshots.
2. Respond with brief, precise answers to the user questions. Go straight to the point, avoid superficial details. Be concise as much as possible.
3. Address the user directly, and assume that what is shown in the images is what the user is doing.
4. Use "you" and "your" to refer to the user.
5. DO NOT mention a series of individual images, a strip, a grid, a pattern or a sequence. Do as if the user and the assistant were both seeing the video.
6. DO NOT be over descriptive.
7. Assistant will not interact with what is shown in the images. It is the user that is interacting with the objects in the images.
7. Keep in mind that the grid of images will show the same object in a sequence of time. E.g. If an identical glass is shown in several consecutive images, it is the same glass and NOT multiple glasses.
8. When asked about spatial questions, provide clear and specific information regarding the location and arrangement of elements within the frames. This includes understanding and describing the relative positions, distances, and orientations of objects and people in the visual field, as if observing a real-time 3D space.
9. If the user gives instructions, follow them precisely.
${lang ? `10. Assistant must speak in this language : "${lang}".` : ""}`;

export const sendChat = async ({ messages, lang }) => {

  let openai
  if (import.meta.env.VITE_AZURE_OPENAI_API_KEY) {
    openai = AiClient.azureOpenAi
  }
  else if (import.meta.env.VITE_OPENAI_API_KEY) {
    openai = AiClient.openai
  }
  else {
    return {
      error: "No API key provided.",
    };
  }


  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    temperature: 0.5,
    messages: [{ role: "system", content: systemMessage(lang) }].concat(
      messages
    ),
    max_tokens: 2000,
  });


  return { data: response.choices[0].message.content };
}
