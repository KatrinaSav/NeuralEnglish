from fastapi import FastAPI, Response, status
from fastapi.responses import JSONResponse
from db_request import db_get_articles, db_get_article
from fastapi.middleware.cors import CORSMiddleware

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
# разбить по файлам

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

# Для отправкт нескольких аргументов можно использовать ссылку следующего типа
# http://127.0.0.1:8000/articles/some_id?arcticle=some_article_id&
# Т.е. параметры можно кидать через ссылку после знака вопроса
@app.get("/articles/{account_id}")
def get_article(account_id, article_id):

    return {"message": "article"}


@app.post("/articles/{account_id}", status_code=200)
def post_article(response: Response, account_id, article_id):
    return {"message": "article"}


@app.get("/account/{account_id}")
def user(account_id):
    return {"message": "Account"}


@app.get("/testing")
def reading():
    return {"message": "Testing"}


