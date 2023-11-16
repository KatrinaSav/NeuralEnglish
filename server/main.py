from fastapi import FastAPI, Response, status
from fastapi.responses import JSONResponse
from db_request import db_get_articles, db_get_article, db_post_article
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from lexicalFunctions import get_meaning, get_normal_form, get_usage, parse_article

app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Article_data(BaseModel):
    title: str
    url: str

@app.get("/articles/{account_id}")
def get_articles(account_id):
    list_from_db = db_get_articles(account_id)
    print(list_from_db)
    result = []
    for article in list_from_db:
        lol = {"id": article[0],
               "name": article[1],
               "progress": article[2],
               "pageCount": article[3]}
        result.append(lol)
    return result


@app.get("/article/{article_id}/{page}")
def get_article(article_id, page):
    list_from_db = db_get_article(article_id, page)
    print(list_from_db)
    result = []
    for article in list_from_db:
        lol = {"text": article[0]}
        result.append(lol)
    return result

@app.get("/meaning/{word}")
def get_mean(word):
    for char in '“.,!?"\'*()$%':
        word = word.replace(char, "")
    return get_meaning(word)

@app.get("/normal/{word}")
def get_normal(word):
    for char in '“.,!?"\'*()$%':
        word = word.replace(char, "")
    return get_normal_form(word).capitalize()

@app.get("/usage/{word}")
def get_use(word):
    for char in '“.,!?"\'*()$%':
        word = word.replace(char, "")
    return get_usage(word)


# Для отправкт нескольких аргументов можно использовать ссылку следующего типа
# http://127.0.0.1:8000/articles/some_id?arcticle=some_article_id&
# Т.е. параметры можно кидать через ссылку после знака вопроса

@app.post("/article/{account_id}", status_code=200)
def post_article(request: Article_data, account_id):
    paragraphs = parse_article(request.url)
    return db_post_article(account_id,request.url,request.title,paragraphs)


@app.get("/account/{account_id}")
def user(account_id):
    return {"message": "Account"}


@app.get("/testing")
def reading():
    return {"message": "Testing"}


