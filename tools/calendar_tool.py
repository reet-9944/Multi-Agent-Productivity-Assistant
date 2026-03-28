from database.db import cursor, conn

def add_event(title,date):
    cursor.execute("INSERT INTO events(title,date) VALUES(?,?)",(title,date))
    conn.commit()
    return {"message":"Event added"}

def get_events():
    cursor.execute("SELECT * FROM events")
    return cursor.fetchall()