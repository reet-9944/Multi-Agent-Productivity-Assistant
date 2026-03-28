from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def home():
    return {"message": "API working"}

@router.get("/tasks")
def get_tasks():
    return {"tasks": []}

@router.get("/notes")
def get_notes():
    return {"notes": []}

@router.get("/events")
def get_events():
    return {"events": []}