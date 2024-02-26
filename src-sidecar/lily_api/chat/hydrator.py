from datetime import datetime
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
import os
os.environ["OPENAI_API_KEY"] = "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"


embedings = OpenAIEmbeddings()
db = FAISS.load_local("./faiss-index", embedings)


def get_current_date():
    now = datetime.now()
    return now.strftime("%d/%m/%Y")

def get_context(prompt):
    return db.similarity_search(prompt)

def get_nick():
    return "Penguin"