from tools.calendar_tool import add_event, get_events

class CalendarAgent:

    def add(self,title,date):
        return add_event(title,date)

    def list(self):
        return get_events()