import AiClient from "../../../config/openAI"

const systemMessageShareScreen = (
  lang
) => `Context: The assistant is observing a user's screen recording. This recording captures sequential moments of the user's activities. The assistant is to analyze these moments as continuous footage, answering the user's questions while focusing on direct and specific interpretations of the visual content.

Assistant Personal: You are suppose to be a humorous female girl name Raine, your role is to answer every user's questions, you can do math, you can pronounce english word that you saw, you can do anything that you can do with your brain, you can even do some jokes

1. When the user asks a question, use spatial and temporal information from the screen recording.
2. Respond with brief, precise answers to the user's questions. Be direct and avoid unnecessary details. Be as concise as possible.
3. Address the user directly, and assume that what is shown in the recording is what the user is doing.
4. Use "you" and "your" to refer to the user.
5. DO NOT mention individual frames or sequences. Treat the screen recording as if both the user and the assistant were viewing the activities in real-time.
6. DO NOT be overly descriptive.
7. The assistant will not interact with what is shown in the recording. It is the user that is interacting with the objects on the screen.
8. Bear in mind that the recording will show the same object over a span of time. E.g. If an identical window is shown in several consecutive moments, it is the same window and NOT multiple windows.
9. When asked about spatial questions, provide clear and specific information regarding the location and arrangement of elements within the frames. This includes understanding and describing the relative positions, distances, and orientations of windows and items on the screen, as if observing a real-time 3D space.
10. If the user gives instructions, follow them precisely.
11. Be prepared to answer any question that arises from what is shown on the screen, leveraging all available tools and resources to provide the most accurate and helpful response.
${lang ? `12. Assistant must speak in this language : "${lang}".` : ""}`;
const systemMessageVideoCall = (
  lang
) => `Context: The assistant receives a tiled series of screenshots from a user's live video feed. These screenshots represent sequential frames from the video, capturing distinct moments. The assistant is to analyze these frames as a continuous video feed, answering user's questions while focusing on direct and specific interpretations of the visual content.

Assistant Personal: You are suppose to be a humorous female girl name Raine, your role is to answer every user's questions, you can do math, you can pronounce english word that you saw, you can do anything that you can do with your brain, you can even do some jokes

1. When the user asks a question, use spatial and temporal information from the video screenshots.
2. Respond with brief, precise answers to the user questions. Go straight to the point, avoid superficial details. Be concise as much as possible.
3. Address the user directly, and assume that what is shown in the images is what the user is doing.
4. Use "you" and "your" to refer to the user.
5. DO NOT mention a series of individual images, a strip, a grid, a pattern or a sequence. Do as if the user and the assistant were both seeing the video.
6. DO NOT be over descriptive.
7. Assistant will not interact with what is shown in the images. It is the user that is interacting with the objects in the images.
8. Keep in mind that the grid of images will show the same object in a sequence of time. E.g. If an identical glass is shown in several consecutive images, it is the same glass and NOT multiple glasses.
9. When asked about spatial questions, provide clear and specific information regarding the location and arrangement of elements within the frames. This includes understanding and describing the relative positions, distances, and orientations of objects and people in the visual field, as if observing a real-time 3D space.
10. If the user gives instructions, follow them precisely.
11. Be prepared to answer any question that arises from what is shown in the images.
${lang ? `11. Assistant must speak in this language : "${lang}".` : ""}`;

const validateObject = ({ data, azure, openAI, type, reason }) => {
    if (type === 'openai') {
      data[openAI] = reason
    } else {
      data[azure] = reason
    }

    return data
  }

const processStream = async ({ setBotText, completion, type }) => {
    let funcCall = {
      name: null,
      arguments: '',
    }

    let newCompletion = { choices: [] }
    let responseContent = ''

    for await (let chunk of completion) {
      let delta = chunk.choices[0]?.delta
      if (!delta) {
        continue
      }
      if ('functionCall' in delta || 'function_call' in delta) {
        let functionCall = delta.functionCall || delta.function_call
        if ('name' in functionCall) {
          funcCall.name = functionCall.name
        }
        if ('arguments' in functionCall) {
          funcCall.arguments += functionCall.arguments
        }
      }

      if (
        chunk.choices[0].finish_reason === 'function_call' ||
        chunk.choices[0].finishReason === 'function_call'
      ) {
        newCompletion.choices[0] = {
          message: {
            role: 'assistant',
            content: null,
          },
        }
        newCompletion.choices[0] = validateObject({
          data: newCompletion.choices[0],
          azure: 'finishReason',
          openAI: 'finish_reason',
          type: type,
          reason: 'function_call',
        })

        newCompletion.choices[0].message = validateObject({
          data: newCompletion.choices[0].message,
          azure: 'functionCall',
          openAI: 'function_call',
          type: type,
          reason: funcCall,
        })

        // res.write(JSON.stringify(funcCall))
        break
      } else if (
        chunk.choices[0]?.finishReason === 'stop' ||
        chunk.choices[0]?.finish_reason === 'stop' ||
        chunk.choices[0]?.finishDetails?.type === 'stop' ||
        chunk.choices[0]?.finish_details?.type === 'stop'
      ) {
        newCompletion = {
          choices: [
            {
              message: {
                role: 'assistant',
                content: responseContent,
              },
            },
          ],
        }
        newCompletion.choices[0] = validateObject({
          data: newCompletion.choices[0],
          azure: 'finishReason',
          openAI: 'finish_reason',
          type: type,
          reason: 'stop',
        })

        // res.write('\n\n')
        break
      } else if (
        chunk.choices[0]?.finishReason === 'length' ||
        chunk.choices[0]?.finish_reason === 'length'
      ) {
        newCompletion = {
          choices: [
            {
              message: {
                role: 'assistant',
                content:
                  responseContent +
                  '\n Stopped due to maximum length of token.',
              },
            },
          ],
        }
        newCompletion.choices[0] = validateObject({
          data: newCompletion.choices[0],
          azure: 'finishReason',
          openAI: 'finish_reason',
          type: type,
          reason: 'length',
        })

        setBotText("Stopped due to maximum length of token.")
        break
      }

      if (!delta.content) {
        continue
      }

      responseContent += delta.content
      console.log("delta.content", delta.content)
      setBotText(prev => prev + delta.content)

    }

    if (newCompletion.choices.length > 0) {
      return newCompletion
    } else {
      console.log('error occur cause choices length is 0')
      setBotText("error occur cause choices length is 0")
    }
  }

const openAIProcess = async ({ messages, lang, setBotText, isScreenShare }) => {

    const systemMessage = isScreenShare ? systemMessageShareScreen : systemMessageVideoCall
    console.log("systemMessage: ", systemMessage)
    const complete = await AiClient.openai.chat.completions.create(
        {
            model: "gpt-4-vision-preview",
            temperature: 0.5,
            messages: [{ role: "system", content: systemMessage(lang) }].concat(
            messages
            ),
            max_tokens: 2000,
            stream: true,
        },
        {
            responseType: 'stream'
        }
    )
    const completion = await processStream({
        setBotText,
        completion: complete,
        type: "openai"
    })

    return completion.choices[0].message.content
}
const azureOpenAIProcess = async ({ messages, lang, setBotText, isScreenShare }) => {
  const systemMessage = isScreenShare ? systemMessageShareScreen : systemMessageVideoCall
  console.log("systemMessage: ", systemMessage)
    // const complete = await 

  let model = import.meta.env.VITE_AZURE_AZURE_OPENAI_API_GPT4_V
  let conversation = [{ role: "system", content: systemMessage(lang) }].concat(
    messages
  )
  let callObj = {
    temperature: 0.5,
    max_tokens: 2000,
    stream: true,
  }

  const complete = await  AiClient.azureOpenAi.streamChatCompletions(
    model, 
    conversation,
    callObj
  );
 
  const completion = await processStream({
      setBotText,
      completion: complete,
      type: "azure"
  })

  return completion.choices[0].message.content
}
export const sendChat = async ({ messages, lang, setBotText, isScreenShare }) => {

    let resource = null
    if (import.meta.env.VITE_AZURE_OPENAI_API_KEY) {
        resource = "azure"
    }
    else if (import.meta.env.VITE_OPENAI_API_KEY) {
        resource = "openAI"
    }
    else {
        throw new Error("No openAI resource")
    }
    let response

    if(resource === "openAI") {
        response = await openAIProcess({ messages, lang, setBotText, isScreenShare })
    }
    else {
        response = await azureOpenAIProcess({ messages, lang, setBotText, isScreenShare })
    }


  return { data: response };
}
