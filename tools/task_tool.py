from database.db import cursor, conn

def add_task(task):
    cursor.execute("INSERT INTO tasks(task) VALUES(?)",(task,))
    conn.commit()
    return {"message":"Task added"}

def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    return cursor.fetchall()