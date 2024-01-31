import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";
import { writable } from "svelte/store";

// TODO: Scroll to bottom;
// TODO: wirting icon
const createChat = () => {
    const { subscribe, set, update } = writable([]);

    const reset = () => {
        set([]);
    }

    const addSystemMessage = (msg) => {
        update((chat) => {
            chat.push(new SystemMessage(msg));
            return chat;
        });
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

    return { subscribe, reset, addSystemMessage, addAIMessage: addAIMessage, addHumanMessage };
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

}

export const chat = createChat();
export const generatingFlag = createGeneratingFlag();
