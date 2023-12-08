import psycopg2



def open_connection():
    connection = psycopg2.connect(dbname="NewEnglishApp", host="127.0.0.1", user="postgres", password="sTasiko1513")
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

def db_post_article(user_id, url, title, paragraphs):
    connection, cursor = open_connection()
    cursor.execute(f'''INSERT INTO public."Article"("Link", "Name", "Page_count")
  VALUES ('{url}', '{title}', {len(paragraphs)}) RETURNING "Id"''')
    connection.commit()
    article_id = cursor.fetchall()[0][0]
    for i in range(len(paragraphs)):
        print(i)
        cursor.execute(f'''INSERT INTO public."ArticleContent"("Id_article", "Page_number", "Text")
      VALUES ({article_id}, {i+1}, '{paragraphs[i]}')''')
        connection.commit()
    cursor.execute(f'''INSERT INTO public."UserToArticles"("Id_article","Id_user")
  VALUES ({article_id},{user_id});''')
    connection.commit()
    close_connection(connection, cursor)
    return {"id":article_id,"name":title,"pageCount":len(paragraphs)}

def update_progress(article_id, page):
    pass


def db_login(name, password):
    connection, cursor = open_connection()
    cursor.execute(f'''SELECT "User"."Id" FROM "User" WHERE "User"."Name" = '{name}' AND "User"."Password" = '{password}' ''')
    result = cursor.fetchall()
    close_connection(connection, cursor)
    return result


def db_register(name, password):
    connection, cursor = open_connection()
    cursor.execute(f'''INSERT INTO "User" ("Name", "Password") VALUES ('{name}', '{password}') ''')
    connection.commit()
    close_connection(connection, cursor)


def db_get_settings(id):
    connection, cursor = open_connection()
    cursor.execute(f'''SELECT "User"."Name", "User"."Password" FROM "User" WHERE "User"."Id" = {id}''')
    result = cursor.fetchall()
    print(result)
    close_connection(connection, cursor)
    return result[0][0], result[0][1]


def db_updateUserData(user_id, user_name, user_pass):
    print("rr", user_id, user_name, user_pass)
    connection, cursor = open_connection()
    success = False
    try:
        print("fff")
        cursor.execute(f'''UPDATE "User" SET "Name" = '{user_name}', "Password" = '{user_pass}' WHERE "User"."Id" = {user_id}''')

        connection.commit()

        success = True
    except Exception as e:
        connection.rollback()
    finally:
        close_connection(connection, cursor)
    return {"success": success}

