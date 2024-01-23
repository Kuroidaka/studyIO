import { speechToText } from './speechtotext';
import { textToSpeech } from './texttospeech';
import { sendChat } from './camChat';

const func = {
    speechToText: speechToText,
    textToSpeech: textToSpeech,
    sendChat: sendChat
}

export default func;