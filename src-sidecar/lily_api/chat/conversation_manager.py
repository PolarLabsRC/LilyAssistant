import uuid
from lily_api.chat.conversation import Conversation

class ConversationNotFoundException(Exception):
    pass

class ConversationManager:
    def __init__(self):
        self.conversations = {}
    
    def new(self, api_key):
        conversation_id = uuid.uuid4()
        self.conversations.update({conversation_id: Conversation(api_key)})
        return conversation_id

    def get(self, uuid):
        try:
            conversation = self.conversations[uuid]
        except:
            raise ConversationNotFoundException()
        return conversation
    
    def save(self, conversation_id):
        pass

    def close(self, conversation_id):
        self.conversations.pop(conversation_id)