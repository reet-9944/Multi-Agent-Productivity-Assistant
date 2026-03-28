from fastapi import APIRouter
from agents.main_agent import MainAgent

router = APIRouter()

agent = MainAgent()

@router.post("/add-task")
def add_task(task:str):
    return agent.handle("add_task",task)

@router.get("/tasks")
def tasks():
    return agent.handle("list_tasks",None)

@router.post("/add-note")
def add_note(note:str):
    return agent.handle("add_note",note)

@router.get("/notes")
def notes():
    return agent.handle("list_notes",None)

@router.post("/add-event")
def add_event(title:str,date:str):
    return agent.handle("add_event",(title,date))

@router.get("/events")
def events():
    return agent.handle("list_events",None)