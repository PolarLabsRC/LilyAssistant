import { derived, writable } from 'svelte/store';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { openAIAPIKey } from './settings';

const createModel = (key, model) => {
    return new ChatOpenAI({
        openAIApiKey: key,
        temperature: 0.5,
        modelName: model, // 'gpt-4-1106-preview'
        streaming: false,
    })
}

export const openAIModels = derived(openAIAPIKey, ($openAIAPIKey) => { // TODO: this shit is one tick behind - why? needs 2 changes
    return {
        gpt35: createModel($openAIAPIKey, "gpt-4-1106-preview"),
        gpt4t: createModel($openAIAPIKey, "gpt-3.5-turbo")
    }
});

