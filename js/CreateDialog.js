class CreateDialog {
    infoFialogElement;
    title;
    description;
    priority;
    submitButton;
    form;
    constructor() {
        this.infoFialogElement = document.getElementById('infoDialog');
        this.description = document.querySelector("[name='description']");
        this.title = document.querySelector("[name='title']");
        this.priority = document.querySelector("[name='priority']");
        this.submitButton = document.querySelector("[save-btn]");
        this.form = document.getElementById('dialogForm');
    }

    open() {
        this.infoFialogElement.style.display = 'flex';
    }
    close() {
        this.infoFialogElement.style.display = 'none';
        this.clear();
    }
    clear() {
        this.description.value = "";
        this.title.value = "";

    }
    submit() {
        let data = new FormData();
        if (this.title.value !== "") {
            data.append("title", this.title.value);
        }
        if (this.description.value !== "") {
            data.append("description", this.description.value);
        }
        if (this.priority.length) {
            data.append("priority", this.priority.value);
        }
        this.createNewTask(data);
        this.close();
    }

    generateGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            var res = v.toString(16).replace(/\d/g, "");
            return res;
        });
    }
    createNewTask(data) {
        let taskTitle = document.createElement("p");
        taskTitle.className = "taskTitle";

        let descriptionTask = document.createElement("p");
        descriptionTask.className = "descriptionTask";

        let priority = document.createElement("p");
        priority.className = "levelTask";

        let selectAction = document.createElement("div");
        selectAction.className = "selectAction";
        let guid = this.generateGuid();
        let select = document.createElement("select");
        let array = ["...", "done", "edit", "delete"];
        select.setAttribute("id", "action");
        select.className = 'taskStatus';
        select.setAttribute("onchange", "setVerifyStatus(this)");
        select.setAttribute("task", guid);
        selectAction.appendChild(select);

        for (let i = 0; i < array.length; i++) {
            let option = document.createElement("option");
            option.setAttribute("value", array[i]);
            option.text = array[i];
            select.appendChild(option);
        }

        data.forEach(function(value, field) {
            if (field === "title") {
                taskTitle.innerText = value;
            }
            if (field === "description") {
                descriptionTask.innerText = value;
            }
            if (field === "priority") {
                priority.innerText = value;
            }
        });
        let tasks = document.getElementById("tasks");
        let div = document.createElement("div");
        div.style = "border:2px solid black;width: 15%;padding: 1%;margin-right: 2rem;";

        div.setAttribute("task", guid);
        div.className = "task";
        let currentTask = tasks.appendChild(div);
        currentTask.appendChild(taskTitle);
        currentTask.appendChild(descriptionTask);
        currentTask.appendChild(priority);
        currentTask.appendChild(selectAction);
    }
    
}
