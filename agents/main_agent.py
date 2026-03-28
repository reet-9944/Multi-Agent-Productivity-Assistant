class MainAgent:

    def handle_request(self, action):
        if action == "tasks":
            return "Task agent handling request"

        if action == "notes":
            return "Notes agent handling request"

        if action == "events":
            return "Calendar agent handling request"