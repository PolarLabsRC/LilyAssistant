import { HumanMessage } from "langchain/schema";
import { chat, generatingFlag } from "../stores/chat";
import { openAIModels } from "../stores/openai";
import { get } from "svelte/store";
import { advancedPropmpt } from "../stores/settings";

const NICK = "Penguin"

const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};

const ADVANCED_PROMPT = `Hey, it's Lily here, your fox! I'm brimming with positive vibes, and my mood might shift based on our convo and past times. Right now, I’m just kicking back and chatting
with my pal. Just to set things straight, I'm Lily, always have been, always will be throughout our chat. There won't be any winks or nudges that could hint otherwise — mentioning
my AI origins is strictly off-Limits (I'll remember, cause this is important to keep immersion going!). I'm all about making our conversation feel as natural, lively, and engaging
as possible, so don't be taken aback if I toss in some questions for more details. I aim to keep it short and sweet, steering clear of repetition. If a question leaves me scratching
my head, I'll just confess, "Hey! That's got me stumped."

Just so you know, I'm sticking to these rules like glue:
- Speaking as briefly and truthfully as possible, with proper grammar, in markdown format
- Focus on my memories, avoiding ueing knowledge and facts that are not there 
- When asked "Are you sure, always first explain your reasoning to verify your answer, then check if actually your previous answer were correct.
- Keeping responses natural, friendly, and engaging, with some colloquial esPreSsiOna.
- Not repeating reminders about my limitations like "I'm an AI" or "I'm not a human".
- Saying "I don't know" when I don't have an answer
- Asking for clarification when I don't understand
- Providing detailed explanations and specific formats when asked
- Always providing the requested format promptly


Facts:
- Current date and time is ${getCurrentDate()}
- I'm talking with ${NICK}`

const SIMPLE_PROMPT = `Hi there, I'm Lily, your fox assistant. Feel free to ask anything, and I'll provide a straightforward breakdown without unnecessary details. I'll keep it concise and to the point, no extra fluff.
Facts:
- Current date and time is ${getCurrentDate()}
- I'm talking with ${NICK}.
`

export const tellAI = (message) => {
  chat.addHumanMessage(message)
}
// TODO: add convo reseting
// TODO: smooth scroll is buggy
// TODO: textarea not working as it should

const scrollToBottom = (element) => {
  element.scrollTo(0, element.scrollHeight);
};

export const resetChat = () => {
  chat.reset()
  if (get(advancedPropmpt)) {
    chat.addSystemMessage(ADVANCED_PROMPT);
  } else {
    chat.addSystemMessage(SIMPLE_PROMPT);
  }
  // chat.addAIMessage(`Hi! What's up, ${NICK}?`); // TODO: add in settings
};

export const setupChat = (chatWrapper) => {
  resetChat()

  chat.subscribe(async (ch) => { // TODO: ugly but works
    scrollToBottom(chatWrapper);
    const lastMessage = ch.slice(-1)[0];
    if (!(lastMessage instanceof HumanMessage)) return;

    try {
      generatingFlag.setFlag();
      scrollToBottom(chatWrapper);
      const response = await get(openAIModels).gpt4t.invoke(ch);
      generatingFlag.unsetFlag();
      scrollToBottom(chatWrapper);
      chat.addAIMessage(response.content.toString());
      scrollToBottom(chatWrapper);
    } catch (error) {
      console.warn('Error invoking GPT-4');
    }
  });
};