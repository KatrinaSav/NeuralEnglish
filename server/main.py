from fastapi import FastAPI, Response, status
from fastapi.responses import JSONResponse
from db_request import db_get_articles, db_get_article, db_post_article, db_login, db_register, db_get_settings, db_updateUserData, db_get_collections, db_add_collection, db_delete_collection, db_get_cards, db_edit_collection, db_add_card, db_delete_card, db_edit_card, db_get_remember_data
from fastapi.middleware.cors import CORSMiddleware

from lexicalFunctions import get_meaning, get_normal_form, get_usage
from test import create_test
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


@app.get("/testing/{article_id}")
def reading(article_id):
    # print()
    return create_test(article_id)


@app.get("/login/{name}/{password}")
def login(name, password):
    userId = db_login(name, password)
    return {"userId": userId[0][0]} if userId else {"userId": None}


@app.get("/register/{name}/{password}")
def register(name, password):
    userId = db_login(name, password)
    if userId == []:
        db_register(name, password)
        userId = db_login(name, password)
        return {"userId": userId[0][0]}
    else:
        return {"userId": None}


@app.get("/setting/{id}")
def get_settings(id):
    userName, userPass, userRating = db_get_settings(id)
    return {"userName": userName, "userPass": userPass, "userRating": userRating}


class UserDataUpdate(BaseModel):
    name: str
    password: str 

@app.post("/updateUserData/{user_id}")
def update_user_data(user_id, data: UserDataUpdate):
    user_name = data.name
    user_pass = data.password
    result = db_updateUserData(user_id, user_name, user_pass)
    print("result", result)
    return result


@app.get("/collections/{userId}")
def get_articles(userId):
    list_from_db = db_get_collections(userId)
    print(list_from_db)
    result = []
    for coll in list_from_db:
        tmp = {"id": coll[0],
               "name": coll[1]}
        result.append(tmp)
    return result


class AddCollectionData(BaseModel):
    name: str

@app.post("/addCollection/{id}")
def add_collection(id, data: AddCollectionData):
    db_add_collection(id, data.name)
    return {'ok': True}


@app.post("/deleteCollection/{id}")
def delete_collection(id):
    print('delete')
    db_delete_collection(id)
    return {'ok': True}

@app.get("/cards/{collId}")
def get_cards(collId):
    print("get_cards")
    list_from_db = db_get_cards(collId)
    print(list_from_db)
    result = []
    for card in list_from_db:
        tmp = {"id": card[0],
               "name": card[1],
               "def": card[2]}
        result.append(tmp)
    return result

class EditCollectionData(BaseModel):
    name: str

@app.post("/editCollection/{id}")
def edit_collection(id, data: EditCollectionData):
    db_edit_collection(id, data.name)
    return {'ok': True}

class AddCardData(BaseModel):
    word: str
    definition: str

@app.post("/addCard/{id}")
def add_card(id, data: AddCardData):
    db_add_card(id, data.word, data.definition)
    return {'ok': True}

@app.post("/deleteCard/{id}")
def delete_card(id):
    db_delete_card(id)
    return {'ok': True}

class EditCardData(BaseModel):
    word: str
    definition: str

@app.post("/editCard/{id}")
def edit_card(id, data: EditCardData):
    db_edit_card(id, data.word, data.definition)
    return {'ok': True}

class RememberData(BaseModel):
    status: str
    

@app.post("/sendRememberData/{id}")
def get_remember_data(id, data: RememberData):
    db_get_remember_data(id, data.status)
    return {'ok': True}