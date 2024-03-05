import { HumanMessage } from "langchain/schema";
import { chat, chatId, generatingFlag, getLastHumanMessage, isLastHumanMessage } from "../stores/chat";
import { openAIAPIKey } from "../stores/settings";
import { get } from "svelte/store";
import { ask, newChat } from "./sidecar";

const NICK = "Penguin"


export const tellAI = (/** @type {string} */ message) => {
  chat.addHumanMessage(message)
}
// TODO: add convo reseting
// TODO: smooth scroll is buggy
// TODO: textarea not working as it should

const scrollToBottom = (element) => {
  element.scrollTo(0, element.scrollHeight);
};

export const resetChat = async () => {
  const id = await newChat(get(openAIAPIKey))
  chatId.setId(id.conversationId)
  chat.reset()

  // chat.addAIMessage(`Hi! What's up, ${NICK}?`); // TODO: add in settings
};

export const setupChat = (chatWrapper) => { // ODO: refactor this shit please
  resetChat()

  chat.subscribe(async (ch) => { // TODO: ugly but works
    scrollToBottom(chatWrapper);
    if (!isLastHumanMessage(ch)) {
      return;
    }
    try {
      scrollToBottom(chatWrapper);
      generatingFlag.setFlag(); // TODO: could be derived store
      let response = await ask(getLastHumanMessage(ch).content, get(chatId))
      scrollToBottom(chatWrapper);
      chat.addAIMessage(response.message
      );
      generatingFlag.unsetFlag();
      scrollToBottom(chatWrapper);
    } catch (error) {
      console.warn('Error invoking GPT-4');
    }
  });
};