import { chat, chatId, generatingFlag, getLastHumanMessage, isLastHumanMessage } from "../stores/chat";
import { openAIAPIKey } from "../stores/settings";
import { get } from "svelte/store";
import { close, ask, newChat } from "./sidecar";



export const tellAI = (/** @type {string} */ message) => {
  chat.addHumanMessage(message)
}
// TODO: smooth scroll is buggy
// TODO: textarea not working as it should

const scrollToBottom = (element) => {
  element.scrollTo(0, element.scrollHeight);
};

export const resetChat = async () => {
  if (get(chatId) !== "") {
    close(get(chatId))
  }
  setTimeout(async ()=>  { // TODO: add PROPER retry polucy 
  const id = await newChat(get(openAIAPIKey));
  console.log(id)
  chatId.setId(id.conversationId);

  }, 1000)

  chat.reset();

  // chat.addAIMessage(`Hi! What's up, ${NICK}?`); // TODO: add in settings
};

export const setupChat = (chatWrapper) => { // ODO: refactor this shit please
  console.log(get(openAIAPIKey))
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
      console.log(response)
      scrollToBottom(chatWrapper);
      chat.addAIMessage(response.message);
      generatingFlag.unsetFlag();
      scrollToBottom(chatWrapper);
    } catch (error) {
      console.warn('Error invoking GPT-4');
    }
  });
};
