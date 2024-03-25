from datetime import datetime
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS


class Hydrator:
    def __init__(self, api_key):
        self._embeddings = OpenAIEmbeddings(api_key=api_key)
        # self._db = FAISS.load_local("./faiss-index", self._embeddings)

    def get_current_date(self):
        now = datetime.now()
        return now.strftime("%d/%m/%Y")

    def get_context(self, prompt):
        return ""
        # return self._db.similarity_search(prompt)

    def get_nick(self):
        return "Penguin"
