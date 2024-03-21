from uuid import UUID
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from lily_api.chat.conversation_manager import ConversationManager, ConversationNotFoundException

chat_router = APIRouter(prefix="/chat")

conversation_manager = ConversationManager()


class AskIn(BaseModel):
    prompt: str
    conversationId: UUID

class AskOut(BaseModel):
    message: str

class NewIn(BaseModel):
    apiKey: str

class NewOut(BaseModel):
    conversationId: UUID

class ClearIn(BaseModel):
    conversationId: UUID

class ClearOut(BaseModel):
    saved: bool


@chat_router.post("/ask", response_model=AskOut)
def ask(msg: AskIn):
    try:
        conversation = conversation_manager.get(msg.conversationId)
    except ConversationNotFoundException as _:
        raise HTTPException(status_code=404, detail="Conversation not found.") # TODO: Does not work
    response = conversation.ask(msg.prompt)
    return AskOut(message=response)


@chat_router.post("/new", response_model=NewOut)
def new(msg: NewIn):
    id = conversation_manager.new(msg.apiKey)
    return NewOut(conversationId=id)

@chat_router.post("/close", response_model=ClearOut)
def close(msg: ClearIn):
    conversation_manager.save(msg.conversationId)
    conversation_manager.close(msg.conversationId)
    return ClearOut(saved=True) # TODO: Implement checking
