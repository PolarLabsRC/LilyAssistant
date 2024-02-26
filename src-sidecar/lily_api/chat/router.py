from uuid import UUID
from fastapi import APIRouter
from pydantic import BaseModel
from lily_api.chat.conversation_manager import ConversationManager

chat_router = APIRouter(prefix="/chat")

conversation_manager = ConversationManager()

class AskIn(BaseModel):
    prompt: str
    conversationId: UUID


class AskOut(BaseModel):
    message: str


class NewOut(BaseModel):
    conversationId: UUID



@chat_router.post("/ask", response_model=AskOut)
def create_conversation(msg: AskIn):
    conversation = conversation_manager.get(msg.conversationId)
    response = conversation.ask(msg.prompt)
    return AskOut(message=response)

@chat_router.post("/new", response_model=NewOut)
def create_conversation():
    id = conversation_manager.new()
    return NewOut(conversationId=id)