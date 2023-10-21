from fastapi import FastAPI, Response

app = FastAPI()
# разбить по файлам

@app.get("/articles/{account_id}")
def get_articles(account_id):
    return {"message": "articles"}


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


if __name__ == '__main__':
    'PyCharm'
