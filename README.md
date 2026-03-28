# Multi-Agent Productivity Assistant

A multi-agent AI system designed to help users manage tasks, schedules, and notes through coordinated agents.

## Overview

This project demonstrates a modular multi-agent architecture where a central system coordinates specialized agents responsible for different productivity tools such as tasks, notes, and calendar events.

The system exposes REST APIs using FastAPI and can be extended to integrate with external services.

## Architecture

Main Agent coordinates multiple sub-agents:

- Task Agent
- Notes Agent
- Calendar Agent

Each agent interacts with dedicated tools and database storage.

## Project Structure

```
multi-agent-productivity-assistant/
│
├── agents/
│   ├── main_agent.py
│   ├── task_agent.py
│   ├── notes_agent.py
│   └── calendar_agent.py
│
├── api/
│   └── routes.py
│
├── database/
│   └── db.py
│
├── tools/
│   ├── task_tool.py
│   ├── notes_tool.py
│   └── calendar_tool.py
│
├── main.py
└── requirements.txt
```

## Tech Stack

Python  
FastAPI  
SQLite  
REST APIs  

## API Endpoints

| Endpoint | Description |
|----------|-------------|
|   `/`    |    Home     |
| `/tasks` |  Get tasks  |
| `/notes` |  Get notes  |
| `/events`|  Get events |

## Running the Project

Install dependencies:

pip install fastapi uvicorn

Run the server:

uvicorn main:app --reload

Open API documentation:

http://127.0.0.1:8000/docs

## Goal

The goal of this project is to demonstrate coordination between agents, tools, and data sources to complete productivity workflows.