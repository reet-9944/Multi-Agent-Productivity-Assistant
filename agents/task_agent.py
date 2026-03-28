from tools.task_tool import add_task, get_tasks

class TaskAgent:

    def add(self,task):
        return add_task(task)

    def list(self):
        return get_tasks()