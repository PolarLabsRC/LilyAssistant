import uuid
from lily_api.chat.conversation import Conversation


class ConversationManager:
    def __init__(self):
        self.conversations = {}
    
    def new(self):
        conversation_id = uuid.uuid4()
        self.conversations.update({conversation_id: Conversation()})
        return conversation_id

    def get(self, uuid):
        return self.conversations[uuid]