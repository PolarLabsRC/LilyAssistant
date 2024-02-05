import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIMessage, HumanMessage, SystemMessage } from 'langchain/schema';
import { openAIModels } from '../stores/openai';
import { get } from 'svelte/store';


export const notify = async (body) => {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
        const permission = await requestPermission();
        permissionGranted = permission === 'granted';
    }
    if (permissionGranted) {
        sendNotification({ title: 'Lily', body: body })
    }
}


export const notifyAI = async (statement) => {
    const notificationMessages = [
        new SystemMessage(`You are my assistant, Lily. My name is Mateusz. Communicate statements in first person as you've just done it`), // TODO: integrate with main rag later
        new HumanMessage("Code refactoring is done!"),
        new AIMessage("Hi Mateusz, I've done refactoring for you!"),
        new HumanMessage("Email is done!"),
        new AIMessage("Email you've asking for is done!"),
        new HumanMessage(statement)
    ]
    const body = (await get(openAIModels).gpt35.call(notificationMessages)).content.toString()
    notify(body)
}

