import psycopg2



def open_connection():
    connection = psycopg2.connect(dbname="db_test", host="127.0.0.1", user="postgres", password="25072003")
    cursor = connection.cursor()
    return connection, cursor


def close_connection(connection, cursor):
    cursor.close()
    connection.close()


def db_get_articles(user):
    connection, cursor = open_connection()
    cursor.execute(f'''SELECT "Article"."Id", "Article"."Name","UserToArticles"."Progress", "Article"."Page_count" FROM "UserToArticles" 
    INNER JOIN "Article" ON "Article"."Id" = "UserToArticles"."Id_article" WHERE "UserToArticles"."Id_user" = {user}''')
    result = cursor.fetchall()
    close_connection(connection, cursor)
    return result

def db_get_article(id, page):
    connection, cursor = open_connection()
    cursor.execute(f'''SELECT "ArticleContent"."Text" FROM "Article"  INNER JOIN "ArticleContent" ON "ArticleContent"."Id_article" = "Article"."Id"
WHERE "Article"."Id" = {id} AND "ArticleContent"."Page_number" ={page}''')
    result = cursor.fetchall()
    close_connection(connection, cursor)
    return result



