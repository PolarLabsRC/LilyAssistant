import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from lily_api.chat.router import chat_router


app = FastAPI()
app.include_router(chat_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=1111)