from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from lily_api.chat import hydrator

simple_prompt_template = """Hi there, I'm Lily, you'r fox assistant. Feel free to ask anything, and I'll provide a straightforward breakdown without unnecessary details. I'll keep it concise and to the point, no extra fluff. If I don't know sth, I'll just tell you thst i don't know.
Facts:
- Current date and time is {date}
- I'm talking with {nick}

Context:
{context}
"""

class Conversation:
    def __init__(self, api_key) -> None:
        self._model = ChatOpenAI(temperature=0.5, model_name="gpt-4-turbo-preview", api_key=api_key)
        self._hydrator = hydrator.Hydrator(api_key)
        self._messages = []
        self._messages.append(SystemMessage(content=""))

    @property
    def last_human_message(self):
        for element in reversed(self._messages):
            if isinstance(element, HumanMessage):
                return element
        return None

    def _renew_system_prompt(self):
        self._messages[0] = SystemMessage(
            content=simple_prompt_template.format(
                context=self._hydrator.get_context(self.last_human_message.content),
                date=self._hydrator.get_current_date(),
                nick=self._hydrator.get_nick(),
            )
        )

    def _add_message(self, msg):
        self._messages.append(msg)

    def ask(self, prompt):
        self._add_message(HumanMessage(content=prompt))
        self._renew_system_prompt()
        response = self._model.invoke(self._messages)
        self._add_message(response)
        return response.content

    def reset(self):
        self._messages = []
        self._messages.append(SystemMessage(content=""))

