import OpenAI from "openai";

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true 
  });

let azureOpenAi
if(import.meta.env.VITE_AZURE_OPENAI_API_KEY) {
    console.log("Azure Openai")
    azureOpenAi = new OpenAIClient(
        import.meta.env.VITE_AZURE_OPENAI_API_URL, 
        new AzureKeyCredential(import.meta.env.VITE_AZURE_OPENAI_API_KEY)
    );
}
else {
    console.log("Openai")
}


const AiClient = { 
    openai,
    azureOpenAi 
}

export default AiClient