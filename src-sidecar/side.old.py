import os
from pprint import pprint
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from typing import List

from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings


model = ChatOpenAI(temperature=0)


# TODO: migration of whole ai to sidecar
# TODO: Sidecar as rest api
# { "action": "search", "query": "hello" }
# def generate_prompt_search(prompt):
#     class RAGTags(BaseModel):
#         tags: List[str] = Field(description="tags about information")

#     class RAGQueries(BaseModel):
#         queries: List[str] = Field(description="queries about needed informations")

#     tagsParser = JsonOutputParser(pydantic_object=RAGTags)
#     queriesParser = JsonOutputParser(pydantic_object=RAGQueries)

#     tagsPrompt = PromptTemplate(
#         template="Generate tags for query\n {format_instructions} \n Question: ### {question} ### ",
#         input_variables=["question"],
#         partial_variables={"format_instructions": tagsParser.get_format_instructions()},
#     )
#     queriesPrompt = PromptTemplate(
#         template="What do i need to know to answer question? IMPORTANT: Don't answer question!\n {format_instructions} \n Question: ### {question} ### ",
#         input_variables=["question"],
#         partial_variables={
#             "format_instructions": queriesParser.get_format_instructions()
#         },
#     )

#     tagsChain = tagsPrompt | model | tagsParser
#     queriesChain = queriesPrompt | model | tagsParser
#     tags = tagsChain.invoke(
#         {"question": prompt}
#     )

#     queries = queriesChain.invoke(
#         {"question": prompt}
#     )
#     return {**tags, **queries}


# query = "What is Faiss?"
# print(generate_prompt_search(query))
from operator import itemgetter

from langchain_community.vectorstores import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

loader = TextLoader("./faiss.txt")
documents = loader.load()
text_splitter = CharacterTextSplitter(chunk_size=100, chunk_overlap=0)
docs = text_splitter.split_documents(documents)
embeddings = OpenAIEmbeddings()
db = FAISS.from_documents(docs, embeddings)
db.save_local("faiss-index")

retriever = db.as_retriever()
template = """Answer the question based only on the following context:
{context}

Question: {question}
"""
prompt = ChatPromptTemplate.from_template(template)
chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | model
    | StrOutputParser()
)
print(chain.invoke("What subsriptions do i have"))


# for g in generate_prompt_search(query)["queries"]:
#     print(g)
#     print(retriever.invoke(g))



# l = [
#     SystemMessage(content="""Answer the following questions as best you can."""),
#     HumanMessage(content="Play spotify"),
# ]


# def main():
#     for _ in range(1):
#         llm = ChatOpenAI()
#         print(a := llm.invoke(l).content)

#         l.append(AIMessage(content=a))


# main()
# for x in l:
#     print(x.content)
#     print("\n\n\n")
