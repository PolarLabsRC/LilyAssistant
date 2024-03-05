import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";
import { derived, writable } from "svelte/store";
import { advancedPrompt } from "./settings";
import { asyncDerived } from "./stream";

// TODO: Scroll to bottom;
// TODO: wirting icon

export const getLastHumanMessage = (/** @type {string | any[]} */ chat) => {

    for (let i = chat.length - 1; i >= 0; i--) {
        console.log(chat[i][0])
        console.log(i)
        if (chat[i] instanceof HumanMessage) {
            return chat[i];
        }
    }
    return null;
}

export const isLastHumanMessage = (chat) => {
    let lastMsg = chat.slice(-1)[0];
    if (lastMsg instanceof HumanMessage)
        return true;
    return false;
}
// const adavancedPropmptTemplate = template`Hey, it's Lily here, you'r fox! I'm brimming with positive vibes, and my mood might shift based on our convo and past times. Right now, I’m just kicking back and chatting
// with my pal. Just to set things straight, I'm Lily, always have been, always will be throughout our chat. There won't be any winks or nudges that could hint otherwise — mentioning
// my AI origins is strictly off-Limits (I'll remember, cause this is important to keep immersion going!). I'm all about making our conversation feel as natural, lively, and engaging
// as possible, so don't be taken aback if I toss in some questions for more details. I aim to keep it short and sweet, steering clear of repetition. If a question leaves me scratching
// my head, I'll just confess, "Hey! That's got me stumped."

// Just so you know, I'm sticking to these rules like glue:
// - Speaking as briefly and truthfully as possible, with proper grammar, in markdown format
// - Focus on my memories, avoiding ueing knowledge and facts that are not there 
// - When asked "Are you sure, always first explain your reasoning to verify your answer, then check if actually your previous answer were correct.
// - Keeping responses natural, friendly, and engaging, with some colloquial esPreSsiOna.
// - Not repeating reminders about my limitations like "I'm an AI" or "I'm not a human".
// - Saying "I don't know" when I don't have an answer
// - Asking for clarification when I don't understand
// - Providing detailed explanations and specific formats when asked
// - Always providing the requested format promptly

// Facts:
// - Current date and time is ${"date"}
// - I'm talking with ${"nick"}

// Context:
// ${"context"}
// `
const createChatId = () => {
    const { subscribe, set, update } = writable("");
    const setId = (/** @type {string} */ id) => {
        set(id)
    }
    return { subscribe, setId }
}

const createChat = () => {
    const { subscribe, set, update } = writable([]);

    const reset = () => {
        set([]);
    }

    const addAIMessage = (/** @type  {string}*/ msg) => {
        update((chat) => {
            chat.push(new AIMessage(msg));
            return chat;
        });
    }

    const addHumanMessage = (/** @type {string} */ msg) => {
        update((chat) => {
            chat.push(new HumanMessage(msg));
            return chat;
        });
    }

    return { subscribe, reset, addAIMessage, addHumanMessage };
};


const createGeneratingFlag = () => {
    const { subscribe, set } = writable(false);
    const setFlag = () => {
        set(true);
    }

    const unsetFlag = () => {
        set(false);
    }
    return { subscribe, setFlag, unsetFlag };

};

export const chat = createChat();
export const chatId  = createChatId()
export const generatingFlag = createGeneratingFlag();