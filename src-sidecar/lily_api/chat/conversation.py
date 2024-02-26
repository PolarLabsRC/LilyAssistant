from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from lily_api.chat import hydrator
import os

os.environ["OPENAI_API_KEY"] = "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"

simple_prompt_template = """Hi there, I'm Lily, you'r fox assistant. Feel free to ask anything, and I'll provide a straightforward breakdown without unnecessary details. I'll keep it concise and to the point, no extra fluff. If I don't know sth, I'll just tell you thst i don't know.
Facts:
- Current date and time is {date}
- I'm talking with {nick}

Context:
{context}
"""

gpt = ChatOpenAI(temperature=0.5, model_name="gpt-4-turbo-preview")


class Conversation:
    def __init__(self) -> None:
        self.messages = []
        self.messages.append(SystemMessage(content=""))

    @property
    def last_human_message(self):
        for element in reversed(self.messages):
            if isinstance(element, HumanMessage):
                return element
        return None

    def _renew_system_prompt(self):
        self.messages[0] = SystemMessage(
            content=simple_prompt_template.format(
                context=hydrator.get_context(self.last_human_message.content),
                date=hydrator.get_current_date(),
                nick=hydrator.get_nick(),
            )
        )

    def _add_message(self, msg):
        self.messages.append(msg)

    def ask(self, prompt):
        self._add_message(HumanMessage(content=prompt))
        self._renew_system_prompt()
        response = gpt.invoke(self.messages)
        self._add_message(response)
        return response.content

    def reset(self):
        self.messages = []
        self.messages.append(SystemMessage(content=""))

