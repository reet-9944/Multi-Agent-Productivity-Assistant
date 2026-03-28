from agents.task_agent import TaskAgent
from agents.notes_agent import NotesAgent
from agents.calendar_agent import CalendarAgent

class MainAgent:

    def __init__(self):
        self.task = TaskAgent()
        self.notes = NotesAgent()
        self.calendar = CalendarAgent()

    def handle(self,command,data):

        if command == "add_task":
            return self.task.add(data)

        if command == "list_tasks":
            return self.task.list()

        if command == "add_note":
            return self.notes.add(data)

        if command == "list_notes":
            return self.notes.list()

        if command == "add_event":
            title,date = data
            return self.calendar.add(title,date)

        if command == "list_events":
            return self.calendar.list()

        return {"error":"Unknown command"}