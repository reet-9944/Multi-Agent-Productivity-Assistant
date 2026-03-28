from fastapi import FastAPI
from api.routes import router

app = FastAPI()

app.include_router(router)

@app.get("/")
def home():
    return {"message": "Multi Agent Productivity Assistant is running"}