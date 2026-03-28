from tools.notes_tool import add_note, get_notes

class NotesAgent:

    def add(self,note):
        return add_note(note)

    def list(self):
        return get_notes()