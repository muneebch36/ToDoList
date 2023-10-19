import Project from "./project"
import Task from "./task"
import Todo from "./todo"

export default class Storage {
    static saveTodo(data) {
        localStorage.setItem('todo', JSON.stringify(data))
    }

    static getTodo() {
        const newTodo = Object.assign(
            new Todo(),JSON.parse(localStorage.getItem("todo")))

        newTodo.projects = newTodo.projects.map((project) => Object.assign(new Project(),project))
        newTodo.projects.forEach((project) => 
        project.tasks = newTodo.tasks.map((task) => Object.assign(new Task(), task)))
        return newTodo
        }
    
    static addProject(project) {
        const newTodo= Storage.getTodo().addProject(project)
        Storage.saveTodo(newTodo)
    }
     
    static deleteProject(project) {
        const newTodo = Storage.getTodo().deleteProject(project)
        Storage.saveTodo(newTodo)
    }

    static addTask(project, newTask) {
        const newTodo = Storage.getTodo()
        newTodo.getProject(project).addTask(newTask)
        Storage.saveTodo(newTodo)
    }

    static deleteTask(project, taskName) {
        const newTodo = Storage.getTodo()
        newTodo.getProject(project).deleteTask(taskName)
        Storage.saveTodo(newTodo)
    }

    static renameTask(project, taskName, newTaskName) {
        const newTodo = Storage.getTodo()
        newTodo.getProject(project).getTask(taskName).setName(newTaskName)
        Storage.saveTodo(newTodo)
    }

    static setTaskDate(project,task,dueDate) {
        const newTodo = Storage.getTodo()
        newTodo.getProject(project).getTask(task).setDate(dueDate)
        Storage.saveTodo(newTodo)
    }

    static updateTodayProject() {
        const newTodo = Storage.getTodo()
        newTodo.updateTodayProject()
        Storage.saveTodo(newTodo)
    }
    }




    