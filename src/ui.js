export default class UI {

    static loadHomepage() {
        UI.loadProjects()
        UI.initProjectButtons()
        UI.openProject('Inbox', document.getElementById('button-inbox-projects'))
        document.addEventListener('keydown', UI.handleKeyboardInput)
      }

    static loadProjects() {
        Storage.getTodo()
        .getProjects()
        .forEach((project) => {
            if (
                project.name !== 'Today' && 
                project.name !== 'Week'
            ) {
                UI.createProject(project.name)
            }
        })
    }

    static loadProjectContent(projectName) {
        const projectPreview = document.getElementById('project-preview')
        projectPreview.innerHTML = `
            <h1 id="project-name">${projectName}</h1>
            <div class="tasks-list" id="tasks-list"></div>`
    
        if (projectName !== 'Today' && projectName !== 'This week') {
          projectPreview.innerHTML += `
            <button class="button-add-task" id="button-add-task">
              <i class="fas fa-plus"></i>
              Add Task
            </button>
            <div class="add-task-popup" id="add-task-popup">
              <input
                class="input-add-task-popup"
                id="input-add-task-popup"
                type="text"
              />
              <div class="add-task-popup-buttons">
                <button class="button-add-task-popup" id="button-add-task-popup">
                  Add
                </button>
                <button
                  class="button-cancel-task-popup"
                  id="button-cancel-task-popup"
                >
                  Cancel
                </button>
              </div>
            </div>`
        }
    }

    static listenTaskButtons() {
        const taskButton = document.getElementById("button-add-task")
        const taskPopupButton = document.getElementById("button-add-task-popup")
        const cancelTaskButton = document.getElementById("button-cancel-task-popup")
        const inputTask = document.getElementById("input-add-task-popup")

        taskButton.addEventListener("click", UI.openAddTaskPopup)
    }

    static openProject(projectName, projectButton) {
        const defaultProjectButtons = document.querySelectorAll(
          '.button-default-project'
        )
        const projectButtons = document.querySelectorAll('.button-project')
        const buttons = [...defaultProjectButtons, ...projectButtons]
    
        buttons.forEach((button) => button.classList.remove('active'))
        projectButton.classList.add('active')
        UI.closeAddProjectPopup()
        UI.loadProjectContent(projectName)
      }
}