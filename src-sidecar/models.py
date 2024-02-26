from pydantic import BaseModel


class Prompt(BaseModel):
    prompt: str

class Document(BaseModel):
    content: str
    metadata: dict
