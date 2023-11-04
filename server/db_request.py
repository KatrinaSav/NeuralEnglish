import psycopg2
import os


def open_connection():
    connection = psycopg2.connect(dbname="db_test", host="127.0.0.1", user="postgres", password="25072003")
    cursor = connection.cursor()
    return connection, cursor


def close_connection(connection, cursor):
    cursor.close()
    connection.close()


def db_get_article(user):
    connection, cursor = open_connection()
    cursor.execute(f'''SELECT "Article"."Id", "Article"."Name","UserToArticles"."Progress" FROM "UserToArticles" 
    INNER JOIN "Article" ON "Article"."Id" = "UserToArticles"."Id_article" WHERE "UserToArticles"."Id_user" = {user}''')
    result = cursor.fetchall()
    print("result")
    close_connection(connection, cursor)
    return result

