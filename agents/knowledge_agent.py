from tools.knowledge_tool import add_knowledge, get_knowledge

def store_note(note):
    return add_knowledge(note)

def fetch_notes():
    return get_knowledge()