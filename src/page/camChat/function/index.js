import { sendChat } from './chat';
import { speechToText } from './speechtotext';
import { textToSpeech } from './texttospeech';

const func = {
    speechToText: speechToText,
    sendChat: sendChat,
    textToSpeech: textToSpeech
}

export default func;