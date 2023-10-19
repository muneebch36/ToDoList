export default class Todo {
    constructor() {
        this.projects = []
        this.projects.push(new Project("Today"));
        this.projects.push(new Project("This week"));
    }

    setProjects(projects) {
        this.projects = projects
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectName) {
        return this.projects.find((project) => project.projects === projectName);
    }

    contains(projectName) {
        return this.projects.some((project) => project.projects === projectName);
    }

    addProject(newProject) {
        if (getProject(newProject) == (newProject)) {
            return;
        }
     this.projects.push(newProject);
    }

    deleteProject(projectName) {
        deletedProject = Object.entries(this.projects);
        deletedProject2 = deletedProject.filter((project) => project.name !== projectName)
        this.projects = Object.fromEntries(deletedProject2);
    }

    updateToday() {
        this.getProject('Today').tasks = []

        this.projects.forEach((project) => {
            if (project.getName() === 'Today' || project.getName() === 'This Week')
            return

            const todayTasks = project.getTasksToday()
            todayTasks.forEach((task) => {
                const taskName = `${task.getName()} (${project.getName()})`
                this.getProject('Today').addTask(new Task(taskName, task.getDate()))
            })
        })
    }
}