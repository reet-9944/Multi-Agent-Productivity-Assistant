from database.db import cursor, conn

def add_note(note):
    cursor.execute("INSERT INTO notes(note) VALUES(?)",(note,))
    conn.commit()
    return {"message":"Note added"}

def get_notes():
    cursor.execute("SELECT * FROM notes")
    return cursor.fetchall()